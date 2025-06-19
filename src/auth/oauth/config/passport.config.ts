import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import OAuthUser from '../models/oauth.model.js';
import dotenv from "dotenv";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_CLIENT_ID_DEV = process.env.GITHUB_CLIENT_ID_DEV;
const GITHUB_CLIENT_SECRET_DEV = process.env.GITHUB_CLIENT_SECRET_DEV;

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
        clientID: process.env.NODE_ENV === "production" ? GITHUB_CLIENT_ID! : GITHUB_CLIENT_ID_DEV!,
        clientSecret: process.env.NODE_ENV === "production" ? GITHUB_CLIENT_SECRET! : GITHUB_CLIENT_SECRET_DEV!,
        callbackURL: "/auth/oauth/github/callback"
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
