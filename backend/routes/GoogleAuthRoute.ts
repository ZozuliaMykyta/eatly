import { Request, Response, Router } from "express";
import passport from "../auth/passport.ts"; // import passport from my custom passport file
import * as AuthService from "../services/AuthService.ts";
import { IUser } from "../database/models/User.ts";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    try {
      const user = req.user as IUser;
      if (!user.jwtSecureCode) {
        res.status(400).json({ message: "Missing jwtSecureCode in user data" });
        return;
      }

      const { authToken } = AuthService.handleGoogleCallback({
        id: user.id,
        jwtSecureCode: user.jwtSecureCode,
      });

      // redirect to frontend with the accessToken as query param
      const redirectUrl = `${process.env.NEXT_PUBLIC_FE_BASE_URL}?accessToken=${authToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred during authentication", error });
    }
  }
);

export default router;
