import mongoose, { Document, Schema } from "mongoose";

interface IAuthGoogle extends Document {
  code: string;
  googleId: string;
  email: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
}

const AuthGoogleSchema = new Schema<IAuthGoogle>({
  code: {
    type: String,
    required: true,
  },
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  accessToken: String,
  refreshToken: String,
});

const AuthGoogle = mongoose.model<IAuthGoogle>("AuthGoogle", AuthGoogleSchema);
export default AuthGoogle;
