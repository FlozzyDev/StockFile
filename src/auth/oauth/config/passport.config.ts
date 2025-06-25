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

// Validate that required environment variables are set
if (!clientID) {
  throw new Error(`GitHub Client ID is required. Please set ${isProduction ? 'GITHUB_CLIENT_ID' : 'DEV_GITHUB_CLIENT_ID'} in your environment variables.`);
}

if (!clientSecret) {
  throw new Error(`GitHub Client Secret is required. Please set ${isProduction ? 'GITHUB_CLIENT_SECRET' : 'DEV_GITHUB_CLIENT_SECRET'} in your environment variables.`);
}

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
        clientID,
        clientSecret,
        callbackURL,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await OAuthUser.findOne({ githubId: profile.id });
        if (!user) {
          user = await OAuthUser.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                avatarUrl: profile.photos[0]?.value,
                profileUrl: profile.profileUrl
          });
        }
        return done(null, user);
      } catch (error) {
        console.error('Error in GitHub OAuth callback:', error);
        return done(error, null);
      }
    }
  )
);

export default passport;
