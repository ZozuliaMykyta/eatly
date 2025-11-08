import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import User from "../database/models/User";
import * as AuthService from "../services/AuthService";

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const hashedToken = CryptoJS.SHA256(req.params.token).toString();

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    // Generate auth token after successful verification
    const { authToken } = AuthService.handleCallback({
      id: user._id,
      jwtSecureCode: user.jwtSecureCode,
    });

    // Redirect to frontend with the token
    // Prefer NEXT_PUBLIC_FE_BASE_URL (used in tests/dev), then FRONTEND_URL (set in Render),
    // otherwise fall back to localhost for local development.
    const frontendUrl =
      process.env.NEXT_PUBLIC_FE_BASE_URL ||
      process.env.FRONTEND_URL ||
      "http://localhost:3000";

    res.redirect(`${frontendUrl}/SignUp?accessToken=${authToken}`);
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Email verification failed" });
  }
};

export { verifyEmail };
