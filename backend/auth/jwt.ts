import passportJwt from "passport-jwt";
import User from "../database/models/User.ts"; // mock user class
import bcrypt from "bcrypt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || "secret-test",
};
type DoneFunction = (error: any, user?: any, info?: any) => void;
async function verify(payload: any, done: DoneFunction) {
  // bad path: JWT is not valid
  if (!payload?.id || !payload?.jwtSecureCode) {
    return done(null, false);
  }
  const user = await User.findOne({ _id: payload.id });

  // bad path: User is not found.
  if (!user) {
    return done(null, false);
  }
  // if (!bcrypt.compareSync(user.jwtSecureCode, payload.jwtSecureCode)) {
  //   return done(null, false);
  // }
  if (user.jwtSecureCode !== payload.jwtSecureCode) {
    return done(null, false);
  }
  return done(null, user);
}
export default new JwtStrategy(options, verify);
