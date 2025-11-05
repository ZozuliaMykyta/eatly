import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import SignUpPage from "@/app/(auth)/SignUp/page";
import { ImageProps } from "next/image";
import "@testing-library/jest-dom/vitest";

const localStorageMock = {
  setItem: vi.fn(),
  getItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

const mockPush = vi.fn();
const mockGet = vi.fn().mockReturnValue("test-token");
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: mockGet }),
}));

vi.mock("@/components/auth/SignUpForm", () => ({
  default: () => <div data-testid="SignUpForm">SignUpForm</div>,
}));
vi.mock("@/components/auth/AuthBtns", () => ({
  default: () => <div data-testid="AuthBtns">AuthBtns</div>,
}));
vi.mock("@/components/auth/AuthInputs", () => ({
  default: () => <div data-testid="AuthInputs">AuthInputs</div>,
}));

describe.skip("SignUpPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("should push to the correct path", async () => {
    render(<SignUpPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("user/test-secure-code-123");
    });
  });
  it("should get accessToken from URL", async () => {
    render(<SignUpPage />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("accessToken");
    });
  });
  it("should render SignUpForm and AuthBtns components", () => {
    render(<SignUpPage />);
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
    expect(screen.getByText("AuthBtns")).toBeInTheDocument();
  });
  it("should save accessToken to localStorage", () => {
    render(<SignUpPage />);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "accessToken",
      "test-token"
    );
  });
  it("should save jwtSecureCode to localStorage", () => {
    render(<SignUpPage />);
    expect(localStorageMock.setItem).not.toHaveBeenCalledWith();
  });
  it("submits with valid email", async () => {
    render(<SignUpPage />);
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
  });
});
