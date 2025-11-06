import SignInForm from "@/components/auth/SignInForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

const localStorageMock = {
  setItem: vi.fn(),
  getItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/components/auth/AuthInputs", () => ({
  default: ({ register }: { register: (name: string) => object }) => (
    <div data-testid="AuthInputs">
      AuthInputs
      <input
        type="email"
        {...register("email")}
        defaultValue="test@example.com"
      />
      <input
        type="password"
        {...register("password")}
        defaultValue="password123"
      />
    </div>
  ),
}));

describe.skip("SignInForm", () => {
  it("should push to the correct path and save token", async () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );

    expect(mockPush).toHaveBeenCalledWith("user/test-secure-code-123");

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      expect.stringContaining("eyJ")
    );
  });
});
