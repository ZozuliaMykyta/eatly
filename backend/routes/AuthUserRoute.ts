import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../database/models/User";
import * as AuthService from "../services/AuthService";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../utils/sendEmail";
import { verifyEmail } from "../controllers/userVerController";

const router = Router();

router.post("/simpleSignUp", async (req: Request, res: Response) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      console.log("Missing fields");
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use");
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const jwtSecureCode = uuidv4();

    const user = new User({
      email,
      fullName,
      password: hashedPassword,
      jwtSecureCode,
      isVerified: false,
    });

    await user.save({ validateBeforeSave: false });

    // Generate verification token
    const verificationToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/verifyemail/${verificationToken}`;
    const message = `Please verify your email by clicking the following link: ${verificationUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Email Verification",
      message,
    });

    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      emailSent: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Registration failed" });
    return;
  }
});

router.post("/simpleSignIn", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Missing email or password" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check if email is verified
    if (!user.isVerified) {
      res
        .status(401)
        .json({ message: "Please verify your email before signing in" });
      return;
    }

    const { authToken } = AuthService.handleCallback({
      id: user._id,
      jwtSecureCode: user.jwtSecureCode,
    });
    res.status(200).json({ accessToken: authToken });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ error: "Sign in failed" });
  }
});

// Email verification route
router.get("/verifyemail/:token", verifyEmail);

export default router;
