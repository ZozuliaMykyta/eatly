import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../database/models/User";
import * as AuthService from "../services/AuthService";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../utils/sendEmail";
import { verifyEmail } from "../controllers/userVerController";

const router = Router();

router.post("/simpleSignUp", async (req: Request, res: Response) => {
  console.log("🔥 SignUp request received:", req.body);
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      console.log("❌ Missing fields:", {
        email: !!email,
        fullName: !!fullName,
        password: !!password,
      });
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

    // Use environment variable for base URL or fallback to request host
    const baseUrl =
      process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    const verificationUrl = `${baseUrl}/api/verifyemail/${verificationToken}`;
    const message = `Please verify your email by clicking the following link: ${verificationUrl}`;

    try {
      console.log("Attempting to send verification email to:", user.email);
      console.log("Verification URL:", verificationUrl);
      console.log("Email config:", {
        service: process.env.EMAIL_SERVICE,
        username: process.env.EMAIL_USERNAME,
        fromName: process.env.FROM_NAME,
        fromEmail: process.env.FROM_EMAIL,
      });

      // Add timeout to email sending
      const emailPromise = sendEmail({
        email: user.email,
        subject: "Email Verification",
        message,
      });

      const timeoutPromise = new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Email timeout")), 10000) // 10 second timeout
      );

      await Promise.race([emailPromise, timeoutPromise]);

      console.log("✅ Verification email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError);
      // Don't fail registration if email fails, but log it
    }

    console.log("✅ Registration completed successfully for:", email);
    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      emailSent: true,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
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
