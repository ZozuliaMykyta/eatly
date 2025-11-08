import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Request, Response } from "express";
import getCard from "../../controllers/userController";
import User from "../../database/models/User";
import handleError from "../../handleError";

// Mock dependencies
jest.mock("../../database/models/User");
jest.mock("../../handleError");

const mockUser = User as jest.Mocked<typeof User>;
const mockHandleError = handleError as jest.MockedFunction<typeof handleError>;

describe("userController", () => {
  let mockRequest: any;
  let mockResponse: any;
  let consoleSpy: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup request mock
    mockRequest = {} as Request;

    // Setup response mock
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Setup console spy
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  describe("getCard", () => {
    it("should successfully return all users", async () => {
      // Arrange
      const mockUsers = [
        {
          _id: "user1",
          email: "user1@example.com",
          fullName: "User One",
          isVerified: true,
        },
        {
          _id: "user2",
          email: "user2@example.com",
          fullName: "User Two",
          isVerified: false,
        },
      ];

      mockUser.find.mockResolvedValue(mockUsers as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should return empty array when no users found", async () => {
      // Arrange
      const emptyUsers: any[] = [];
      mockUser.find.mockResolvedValue(emptyUsers);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(emptyUsers);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const dbError = new Error("Database connection failed");
      mockUser.find.mockRejectedValue(dbError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        dbError
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should handle unknown errors", async () => {
      // Arrange
      const unknownError = "Unknown error occurred";
      mockUser.find.mockRejectedValue(unknownError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        unknownError
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should handle null response from database", async () => {
      // Arrange
      mockUser.find.mockResolvedValue(null as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(null);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle timeout errors", async () => {
      // Arrange
      const timeoutError = new Error("Query timeout");
      timeoutError.name = "MongooseError";
      mockUser.find.mockRejectedValue(timeoutError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUser.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        timeoutError
      );
    });
  });
});
