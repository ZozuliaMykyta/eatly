import { Request, Response, Router } from "express";
import passport from "../auth/passport"; // import passport from my custom passport file
import * as AuthService from "../services/AuthService";
import { IUser } from "../database/models/User";

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

      const { authToken } = AuthService.handleCallback({
        id: user.id,
        jwtSecureCode: user.jwtSecureCode,
      });

      // redirect to frontend with the accessToken as query param
      // Prefer NEXT_PUBLIC_FE_BASE_URL (dev/tests), then FRONTEND_URL (deployed), fallback to localhost
      const frontendBase =
        process.env.NEXT_PUBLIC_FE_BASE_URL ||
        process.env.FRONTEND_URL ||
        "http://localhost:3000";

      const redirectUrl = `${frontendBase}/SignUp?accessToken=${authToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred during authentication", error });
    }
  }
);

export default router;
