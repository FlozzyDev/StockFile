import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';
import categoryRoutes from './routes/category.routes.js';
import session from 'express-session';
import passport from 'passport';
import './auth/oauth/config/passport.config.js';
import { errorHandler } from './middleware/errorHandler.js';
import locationRoutes from './routes/location.routes.js';

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
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoute);
app.use('/categories', categoryRoutes);
app.use('/locations', locationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    withCredentials: true,
  }
}));

app.use(errorHandler);

export default app;
