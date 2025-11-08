import {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { getVerificationToken } from "../../models/userVerModel";

// Mock CryptoJS модуль полностью
jest.mock("crypto-js", () => ({
  lib: {
    WordArray: {
      random: jest.fn(),
    },
  },
  SHA256: jest.fn(),
}));

import CryptoJS from "crypto-js";

describe("userVerModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getVerificationToken", () => {
    it("should return an object with token, hashedToken, and verificationTokenExpire", () => {
      const mockWordArray = {
        toString: jest.fn().mockReturnValue("mockRandomToken123"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
        toString: jest.fn().mockReturnValue("mockHashedToken456"),
      });

      const result = getVerificationToken();

      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("hashedToken");
      expect(result).toHaveProperty("verificationTokenExpire");
      expect(typeof result.token).toBe("string");
      expect(typeof result.hashedToken).toBe("string");
      expect(typeof result.verificationTokenExpire).toBe("number");
    });

    it("should generate a random token using CryptoJS", () => {
      const mockWordArray = {
        toString: jest.fn().mockReturnValue("testToken123"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
        toString: jest.fn().mockReturnValue("hashedTestToken"),
      });

      const result = getVerificationToken();

      expect(CryptoJS.lib.WordArray.random).toHaveBeenCalledWith(20);
      expect(mockWordArray.toString).toHaveBeenCalled();
      expect(result.token).toBe("testToken123");
    });

    it("should hash the token using SHA256", () => {
      const mockWordArray = {
        toString: jest.fn().mockReturnValue("originalToken"),
      };

      const mockHashResult = {
        toString: jest.fn().mockReturnValue("sha256HashedToken"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue(mockHashResult);

      const result = getVerificationToken();

      expect(CryptoJS.SHA256).toHaveBeenCalledWith("originalToken");
      expect(mockHashResult.toString).toHaveBeenCalled();
      expect(result.hashedToken).toBe("sha256HashedToken");
    });

    it("should set expiration time to 30 minutes from now", () => {
      const mockNow = 1609459200000;
      const dateSpy = jest.spyOn(Date, "now").mockReturnValue(mockNow);

      const mockWordArray = {
        toString: jest.fn().mockReturnValue("token"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
        toString: jest.fn().mockReturnValue("hashedToken"),
      });

      const result = getVerificationToken();

      const expectedExpire = mockNow + 30 * 60 * 1000;
      expect(result.verificationTokenExpire).toBe(expectedExpire);

      dateSpy.mockRestore();
    });

    it("should generate different tokens on multiple calls", () => {
      let callCount = 0;
      const mockWordArray = {
        toString: jest.fn().mockImplementation(() => `token${++callCount}`),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockImplementation((token) => ({
        toString: jest.fn().mockReturnValue(`hashed_${token}`),
      }));

      const result1 = getVerificationToken();
      const result2 = getVerificationToken();

      expect(result1.token).not.toBe(result2.token);
      expect(result1.hashedToken).not.toBe(result2.hashedToken);
      expect(CryptoJS.lib.WordArray.random).toHaveBeenCalledTimes(2);
    });

    it("should handle edge case when Date.now() returns different values", () => {
      const mockWordArray = {
        toString: jest.fn().mockReturnValue("token"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
        toString: jest.fn().mockReturnValue("hashedToken"),
      });

      const dateSpy1 = jest.spyOn(Date, "now").mockReturnValue(1000000);
      const result1 = getVerificationToken();
      dateSpy1.mockRestore();
      const dateSpy2 = jest.spyOn(Date, "now").mockReturnValue(2000000);
      const result2 = getVerificationToken();
      dateSpy2.mockRestore();

      expect(result1.verificationTokenExpire).toBe(1000000 + 30 * 60 * 1000);
      expect(result2.verificationTokenExpire).toBe(2000000 + 30 * 60 * 1000);
      expect(result1.verificationTokenExpire).not.toBe(
        result2.verificationTokenExpire
      );
    });

    it("should use the correct expiration duration (30 minutes)", () => {
      const mockWordArray = {
        toString: jest.fn().mockReturnValue("token"),
      };

      (CryptoJS.lib.WordArray.random as jest.Mock).mockReturnValue(
        mockWordArray
      );
      (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
        toString: jest.fn().mockReturnValue("hashedToken"),
      });

      const startTime = Date.now();
      const result = getVerificationToken();
      const endTime = Date.now();

      const thirtyMinutes = 30 * 60 * 1000;
      expect(result.verificationTokenExpire).toBeGreaterThanOrEqual(
        startTime + thirtyMinutes
      );
      expect(result.verificationTokenExpire).toBeLessThanOrEqual(
        endTime + thirtyMinutes
      );
    });
  });
});
