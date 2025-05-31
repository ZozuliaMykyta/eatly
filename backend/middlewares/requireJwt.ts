import passport from "../auth/passport.ts"; // import passport from my custom passport file

// requireJwt middleware to authenticate the request using JWT
const requireJwt = passport.authenticate("jwtAuth", { session: false });

export default requireJwt;
