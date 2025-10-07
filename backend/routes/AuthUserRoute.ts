import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../database/models/User.ts";
import * as AuthService from "../services/AuthService.ts";
import { v4 as uuidv4 } from "uuid";

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
    });

    await user.save();
    console.log("User saved:", user);

    const { authToken } = AuthService.handleCallback({
      id: user._id,
      jwtSecureCode: user.jwtSecureCode,
    });
    console.log("Generated authToken:", authToken);

    res.status(201).json({ accessToken: authToken });
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

export default router;
