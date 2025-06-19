import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import './auth/oauth/config/passport.config.js';

const app = express();
app.set('trust proxy', 1); // needed for both render and local development

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = isProduction 
  ? ['https://stockfile.onrender.com']
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'wtfakfbkajbtrwhert31!#123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);

app.use('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the StockFile API. Redirecting to /api-docs...',
    redirect: '/api-docs',
  });
});

export default app;
