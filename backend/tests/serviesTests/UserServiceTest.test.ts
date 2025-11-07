import { beforeEach, describe, it, jest, expect } from "@jest/globals";
import UserService from "../../services/UserService";
import User from "../../database/models/User";

jest.mock("../../database/models/User");

describe.skip("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user when found", async () => {
    const expectedUser = {
      _id: "123",
      email: "test@example.com",
      name: "Test User",
    };
    (User.findById as any).mockImplementation(() => ({
      exec: () => Promise.resolve(expectedUser),
    }));

    const result = await UserService.getUser({ userId: "123" });

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(expectedUser);
  });
  it("should return null when user not found", async () => {
    (User.findById as any).mockImplementation(() => ({
      exec: () => Promise.resolve(null),
    }));
    const result = await UserService.getUser({ userId: "notfound" });
    expect(User.findById).toHaveBeenCalledWith("notfound");
    expect(result).toBeNull();
  });
  it("should show error", async () => {
    (User.findById as any).mockImplementation(() => ({
      exec: () => Promise.reject(new Error("Error")),
    }));
    expect(UserService.getUser({ userId: "error" })).rejects.toThrow(
      "Failed to fetch user information"
    );
  });
});
