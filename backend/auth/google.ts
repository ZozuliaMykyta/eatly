import GoogleOAuth from "passport-google-oauth20";
const GoogleStrategy = GoogleOAuth.Strategy;
type VerifyCallback = GoogleOAuth.VerifyCallback;
type Profile = GoogleOAuth.Profile;
import User from "../database/models/User.ts"; // mock user class
import { v4 as uuidv4 } from "uuid";

const options = {
  clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
  callbackURL: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/google/callback`,
};

async function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  try {
    let user = await User.findOne({
      googleId: profile.id,
    });
    if (!user) {
      // create new user if doesn't exist
      user = await User.create({
        googleId: profile.id,
        email: profile.emails?.[0]?.value,
        fullName: profile.displayName,
        jwtSecureCode: uuidv4(),
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error as Error);
  }
}
export default new GoogleStrategy(options, verify);
