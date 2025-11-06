import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";

vi.mock("@/components/auth/AuthInputs", () => ({
  default: vi.fn(
    ({
      hasName,
      message,
      register,
      errors = { error: "An error occurred" },
    }) => (
      <div data-testid="AuthInputs">
        AuthInputs - hasName: {hasName ? "true" : "false"}, message: {message}
        <div>
          {Object.keys(errors).length > 0 ? `An error occurred` : "No errors"}
        </div>
        <input type="email" {...register("email")} />
      </div>
    )
  ),
}));

describe.skip("SignUpForm", () => {
  afterEach(() => {
    cleanup();
  });
  it("shows success message when response.data.emailSent is true ", async () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(
        screen.getByText(
          /Registration successful! Please check your email to verify your account/i
        )
      ).toBeInTheDocument();
    });
  });
  it("shows error message when axios throws an error", async () => {
    server.use(
      http.post("http://localhost:5000/api/simpleSignUp", () => {
        return HttpResponse.json(
          { message: "An error occurred" },
          { status: 500 }
        );
      })
    );

    render(<SignUpForm />);
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(
        screen.getByText(/An error occurred|An unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });
});
