import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId?: string;
  email?: string;
  fullName?: string;
  password?: string;
  jwtSecureCode: string;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String },
  fullName: { type: String },
  password: { type: String },
  jwtSecureCode: { type: String },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
