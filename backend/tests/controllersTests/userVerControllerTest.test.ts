import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import * as userVerController from "../../controllers/userVerController";
import User from "../../database/models/User";
import * as AuthService from "../../services/AuthService";

// Mock dependencies
jest.mock("../../database/models/User");
jest.mock("../../services/AuthService");
jest.mock("crypto-js");

const mockUser = User as jest.Mocked<typeof User>;
const mockAuthService = AuthService as jest.Mocked<typeof AuthService>;
const mockCryptoJS = CryptoJS as jest.Mocked<typeof CryptoJS>;

describe("userVerController", () => {
  let mockRequest: any;
  let mockResponse: any;
  let userInstance: any;
  let consoleSpy: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup request mock
    mockRequest = {
      params: {
        token: "test-token",
      },
    };

    // Setup response mock
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
    };

    // Setup user instance mock
    userInstance = {
      _id: "user-id-123",
      email: "test@example.com",
      isVerified: false,
      jwtSecureCode: "secure-code-123",
      verificationToken: "hashed-token",
      verificationTokenExpire: Date.now() + 3600000, // 1 hour from now
      save: jest.fn(),
    };

    // Setup environment
    process.env.NEXT_PUBLIC_FE_BASE_URL = "http://localhost:3000";
    process.env.SECRET_KEY = "test-secret-key";

    // Setup console spy
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  describe("verifyEmail", () => {
    it("should successfully verify email with valid token", async () => {
      // Arrange
      const hashedToken = "hashed-test-token";
      const authToken = "generated-auth-token";

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockResolvedValue(userInstance);
      mockAuthService.handleCallback.mockReturnValue({ authToken });

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockCryptoJS.SHA256).toHaveBeenCalledWith("test-token");
      expect(mockUser.findOne).toHaveBeenCalledWith({
        verificationToken: hashedToken,
        verificationTokenExpire: { $gt: expect.any(Number) },
      });
      expect(userInstance.save).toHaveBeenCalled();
      expect(userInstance.isVerified).toBe(true);
      expect(userInstance.verificationToken).toBeUndefined();
      expect(userInstance.verificationTokenExpire).toBeUndefined();
      expect(mockAuthService.handleCallback).toHaveBeenCalledWith({
        id: "user-id-123",
        jwtSecureCode: "secure-code-123",
      });
      expect(mockResponse.redirect).toHaveBeenCalledWith(
        `http://localhost:3000/SignUp?accessToken=${authToken}`
      );
    });

    it("should return 400 when token is invalid", async () => {
      // Arrange
      const hashedToken = "hashed-test-token";

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockResolvedValue(null);

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid or expired token",
      });
      expect(userInstance.save).not.toHaveBeenCalled();
      expect(mockAuthService.handleCallback).not.toHaveBeenCalled();
      expect(mockResponse.redirect).not.toHaveBeenCalled();
    });

    it("should return 400 when token is expired", async () => {
      // Arrange
      const hashedToken = "hashed-test-token";

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockResolvedValue(null); // Expired token won't be found

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid or expired token",
      });
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const hashedToken = "hashed-test-token";

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockRejectedValue(
        new Error("Database connection error")
      );

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        "Email verification error:",
        expect.any(Error)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Email verification failed",
      });
    });

    it("should handle user save errors", async () => {
      // Arrange
      const hashedToken = "hashed-test-token";
      const userWithFailingSave = {
        ...userInstance,
        save: jest.fn(() => Promise.reject(new Error("Save failed"))),
      };

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockResolvedValue(userWithFailingSave);

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        "Email verification error:",
        expect.any(Error)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Email verification failed",
      });
    });

    it("should use default frontend URL when environment variable is not set", async () => {
      // Arrange
      delete process.env.NEXT_PUBLIC_FE_BASE_URL;
      const hashedToken = "hashed-test-token";
      const authToken = "generated-auth-token";

      mockCryptoJS.SHA256.mockReturnValue({
        toString: jest.fn().mockReturnValue(hashedToken),
      } as any);

      mockUser.findOne.mockResolvedValue(userInstance);
      mockAuthService.handleCallback.mockReturnValue({ authToken });

      // Act
      await userVerController.verifyEmail(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.redirect).toHaveBeenCalledWith(
        `http://localhost:3000/SignUp?accessToken=${authToken}`
      );
    });
  });
});
