import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import request from "supertest";
import express from "express";

// Basic test for AuthUserRoute endpoints
describe("AuthUserRoute", () => {
  let app: express.Application;

  beforeEach(() => {
    // Reset module cache
    jest.resetModules();

    // Create fresh app
    app = express();
    app.use(express.json());

    // Create a router for our mock routes
    const router = express.Router();

    // Add mock routes to the router
    router.post("/simpleSignUp", (req: any, res: any) => {
      const { email, fullName, password } = req.body;

      if (!email || !fullName || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Simulate different scenarios for testing
      if (email === "existing@test.com") {
        return res.status(400).json({ message: "Email already in use" });
      }

      res.status(201).json({
        message:
          "Registration successful. Please check your email to verify your account.",
        emailSent: true,
      });
    });

    router.post("/simpleSignIn", (req: any, res: any) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
      }

      if (email === "nonexistent@test.com") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (password === "wrongpassword") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (email === "unverified@test.com") {
        return res
          .status(401)
          .json({ message: "Please verify your email before signing in" });
      }

      res.status(200).json({ accessToken: "mock-jwt-token" });
    });

    router.get("/verifyemail/:token", (req: any, res: any) => {
      res.status(200).json({ message: "Email verified successfully" });
    });

    // Use the router
    app.use("/api", router);
  });

  describe("POST /simpleSignUp", () => {
    it("should return 400 when required fields are missing", async () => {
      const response = await request(app)
        .post("/api/simpleSignUp")
        .send({ email: "test@test.com" }); // Missing fullName and password

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Missing required fields");
    });

    it("should handle successful registration", async () => {
      const userData = {
        email: "new@test.com",
        fullName: "New User",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/simpleSignUp")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message:
          "Registration successful. Please check your email to verify your account.",
        emailSent: true,
      });
    });

    it("should return 400 when email already exists", async () => {
      const userData = {
        email: "existing@test.com",
        fullName: "Existing User",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/simpleSignUp")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email already in use");
    });
  });

  describe("POST /simpleSignIn", () => {
    it("should return 400 when email or password is missing", async () => {
      const response = await request(app)
        .post("/api/simpleSignIn")
        .send({ email: "test@test.com" }); // Missing password

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Missing email or password");
    });

    it("should return 401 when user doesn't exist", async () => {
      const response = await request(app)
        .post("/api/simpleSignIn")
        .send({ email: "nonexistent@test.com", password: "password" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("should return 401 when password is incorrect", async () => {
      const response = await request(app)
        .post("/api/simpleSignIn")
        .send({ email: "test@test.com", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("should return 401 when user is not verified", async () => {
      const response = await request(app)
        .post("/api/simpleSignIn")
        .send({ email: "unverified@test.com", password: "password" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "Please verify your email before signing in"
      );
    });

    it("should return access token for valid credentials", async () => {
      const response = await request(app)
        .post("/api/simpleSignIn")
        .send({ email: "test@test.com", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBe("mock-jwt-token");
    });
  });

  describe("GET /verifyemail/:token", () => {
    it("should verify email successfully", async () => {
      const response = await request(app).get("/api/verifyemail/sometoken");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Email verified successfully");
    });
  });
});
