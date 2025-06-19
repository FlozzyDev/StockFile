import mongoose, { Schema, Document } from 'mongoose';
import { IOAuthUser } from '../types/oauth.types.js';

const oauthUserSchema = new Schema<IOAuthUser & Document>({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: false,
  },
  displayName: {
    type: String,
    required: false,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
  profileUrl: {
    type: String,
    required: false,
  },
});

const OAuthUser = mongoose.model<IOAuthUser>('OAuthUser', oauthUserSchema);
export default OAuthUser; 