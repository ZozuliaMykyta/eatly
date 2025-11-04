import mongoose, { Document, Schema } from "mongoose";
import { getVerificationToken } from "../../models/userVerModel";

export interface IUser extends Document {
  googleId?: string;
  email: string;
  fullName: string;
  password?: string;
  jwtSecureCode: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpire?: number;
  getVerificationToken(): string;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, required: true },
  fullName: { type: String },
  password: { type: String },
  jwtSecureCode: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpire: { type: Number },
});

UserSchema.methods.getVerificationToken = function () {
  const { token, hashedToken, verificationTokenExpire } =
    getVerificationToken();

  this.verificationToken = hashedToken;
  this.verificationTokenExpire = verificationTokenExpire;

  return token;
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
