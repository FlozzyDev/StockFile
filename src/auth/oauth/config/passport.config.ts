import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import OAuthUser from '../models/oauth.model.js';

const isProduction = process.env.NODE_ENV === "production";

const clientID = isProduction
  ? process.env.GITHUB_CLIENT_ID
  : process.env.GITHUB_CLIENT_ID_DEV;

const clientSecret = isProduction
  ? process.env.GITHUB_CLIENT_SECRET
  : process.env.GITHUB_CLIENT_SECRET_DEV;

const baseUrl = isProduction
  ? 'https://stockfile.onrender.com'
  : 'http://localhost:3000';

const callbackURL = `${baseUrl}/auth/oauth/github/callback`;

passport.serializeUser((user: any, done) => {
    done(null, user._id || user.id);
  });
  
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await OAuthUser.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

passport.use(
  new GitHubStrategy(
    {
        clientID: clientID || '',
        clientSecret: clientSecret || '',
        callbackURL: callbackURL || '',
        scope: ['user:email'],
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await OAuthUser.findOne({ githubId: profile.id });
        if (!user) {
          const email = profile.emails?.[0]?.value || undefined;

          user = await OAuthUser.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                avatarUrl: profile.photos[0]?.value,
                profileUrl: profile.profileUrl,
                ...(email && { email })
          });
        }
        console.log("Located user");
        return done(null, user);
      } catch (error) {
        console.error('Error in GitHub OAuth callback:', error);
        return done(error, null);
      }
    }
  )
);

export default passport;
