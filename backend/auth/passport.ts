import passport from "passport";
import googleStrategy from "./google.ts";
import jwtStrategy from "./jwt.ts";

// initialize passport with Google and JWT strategies
passport.use("google", googleStrategy);
passport.use("jwtAuth", jwtStrategy);

export default passport;
