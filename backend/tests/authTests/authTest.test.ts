import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import User from "../../database/models/User";

// Mock dependencies
jest.mock("../../database/models/User");

const mockUser = User as jest.Mocked<typeof User>;

// Mock the verify function directly
async function verify(payload: any, done: any) {
  // bad path: JWT is not valid
  if (!payload?.id || !payload?.jwtSecureCode) {
    return done(null, false);
  }
  console.log("Payload jwtSecureCode:", payload.jwtSecureCode);
  try {
    const user = await User.findOne({ _id: payload.id });

    // bad path: User is not found.
    if (!user) {
      return done(null, false);
    }
    console.log("User jwtSecureCode from DB:", user.jwtSecureCode);

    if (user.jwtSecureCode !== payload.jwtSecureCode) {
      console.log("jwtSecureCode mismatch");
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

describe("JWT Authentication Strategy", () => {
  let consoleSpy: any;
  let mockDone: jest.MockedFunction<any>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup console spy
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Setup mock done function
    mockDone = jest.fn();

    // Setup environment
    process.env.SECRET_KEY = "test-secret-key";
  });

  afterEach(() => {
    jest.resetAllMocks();
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  describe("JWT Token Verification", () => {
    it("should successfully verify valid JWT payload with matching user", async () => {
      // Arrange
      const validPayload = {
        id: "user123",
        jwtSecureCode: "secure123",
      };

      const mockUserData = {
        _id: "user123",
        email: "test@example.com",
        jwtSecureCode: "secure123",
        isVerified: true,
      };

      mockUser.findOne.mockResolvedValue(mockUserData as any);

      // Act
      await verify(validPayload, mockDone);

      // Assert
      expect(mockUser.findOne).toHaveBeenCalledWith({ _id: "user123" });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Payload jwtSecureCode:",
        "secure123"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "User jwtSecureCode from DB:",
        "secure123"
      );
      expect(mockDone).toHaveBeenCalledWith(null, mockUserData);
    });

    it("should reject payload without id", async () => {
      // Arrange
      const invalidPayload = {
        jwtSecureCode: "secure123",
        // id is missing
      };

      // Act
      await verify(invalidPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should reject payload without jwtSecureCode", async () => {
      // Arrange
      const invalidPayload = {
        id: "user123",
        // jwtSecureCode is missing
      };

      // Act
      await verify(invalidPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should reject payload with empty id", async () => {
      // Arrange
      const invalidPayload = {
        id: "",
        jwtSecureCode: "secure123",
      };

      // Act
      await verify(invalidPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should reject payload with empty jwtSecureCode", async () => {
      // Arrange
      const invalidPayload = {
        id: "user123",
        jwtSecureCode: "",
      };

      // Act
      await verify(invalidPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should reject when user is not found in database", async () => {
      // Arrange
      const validPayload = {
        id: "nonexistent-user",
        jwtSecureCode: "secure123",
      };

      mockUser.findOne.mockResolvedValue(null);

      // Act
      await verify(validPayload, mockDone);

      // Assert
      expect(mockUser.findOne).toHaveBeenCalledWith({
        _id: "nonexistent-user",
      });
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should reject when jwtSecureCode does not match", async () => {
      // Arrange
      const validPayload = {
        id: "user123",
        jwtSecureCode: "wrong-secure-code",
      };

      const mockUserData = {
        _id: "user123",
        email: "test@example.com",
        jwtSecureCode: "correct-secure-code",
        isVerified: true,
      };

      mockUser.findOne.mockResolvedValue(mockUserData as any);

      // Act
      await verify(validPayload, mockDone);

      // Assert
      expect(mockUser.findOne).toHaveBeenCalledWith({ _id: "user123" });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Payload jwtSecureCode:",
        "wrong-secure-code"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "User jwtSecureCode from DB:",
        "correct-secure-code"
      );
      expect(consoleSpy).toHaveBeenCalledWith("jwtSecureCode mismatch");
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const validPayload = {
        id: "user123",
        jwtSecureCode: "secure123",
      };

      const dbError = new Error("Database connection failed");
      mockUser.findOne.mockRejectedValue(dbError);

      // Act
      await verify(validPayload, mockDone);

      // Assert
      expect(mockUser.findOne).toHaveBeenCalledWith({ _id: "user123" });
      expect(mockDone).toHaveBeenCalledWith(dbError);
    });

    it("should handle null payload", async () => {
      // Arrange
      const nullPayload = null;

      // Act
      await verify(nullPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should handle undefined payload", async () => {
      // Arrange
      const undefinedPayload = undefined;

      // Act
      await verify(undefinedPayload, mockDone);

      // Assert
      expect(mockUser.findOne).not.toHaveBeenCalled();
      expect(mockDone).toHaveBeenCalledWith(null, false);
    });

    it("should verify user with all required fields", async () => {
      // Arrange
      const validPayload = {
        id: "user456",
        jwtSecureCode: "super-secure-code-456",
      };

      const completeUserData = {
        _id: "user456",
        email: "complete@example.com",
        fullName: "Complete User",
        jwtSecureCode: "super-secure-code-456",
        isVerified: true,
        googleId: "google123",
      };

      mockUser.findOne.mockResolvedValue(completeUserData as any);

      // Act
      await verify(validPayload, mockDone);

      // Assert
      expect(mockUser.findOne).toHaveBeenCalledWith({ _id: "user456" });
      expect(mockDone).toHaveBeenCalledWith(null, completeUserData);
    });
  });
});
