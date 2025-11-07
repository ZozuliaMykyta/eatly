import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { handleCallback } from "../../services/AuthService";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SECRET_KEY = "test-secret-key";
  });

  it("should return authToken when handleCallback is called", () => {
    (mockedJwt.sign as jest.Mock).mockReturnValue("test-auth-token");

    const testParams = {
      id: "user123",
      jwtSecureCode: "secure456",
    };

    const result = handleCallback(testParams);

    expect(mockedJwt.sign).toHaveBeenCalledWith(
      { id: "user123", jwtSecureCode: "secure456" },
      "test-secret-key",
      { expiresIn: "1h" }
    );

    expect(result).toEqual({ authToken: "test-auth-token" });
  });
});
