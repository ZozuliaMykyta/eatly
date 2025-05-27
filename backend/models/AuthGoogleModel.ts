import mongoose, { Document, Schema } from "mongoose";

interface IAuthGoogle extends Document {
  code: string;
}

const AuthGoogleSchema = new Schema<IAuthGoogle>({
  code: {
    type: String,
    required: true,
  },
});

const AuthGoogle = mongoose.model<IAuthGoogle>("AuthGoogle", AuthGoogleSchema);
export default AuthGoogle;
