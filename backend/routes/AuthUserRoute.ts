import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../database/models/User.ts";
import * as AuthService from "../services/AuthService.ts";

const router = Router();

router.post("/simpleSignUp", async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, fullName });
    user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/simpleSignIn", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Sing in failed" });
    }
    const { authToken } = AuthService.handleCallback({
      id: user.id,
      jwtSecureCode: user.jwtSecureCode,
    });
    res.status(200).json(authToken);
  } catch (error) {
    res.status(500).json({ error: "Sign in failed" });
  }
});

router.post;
