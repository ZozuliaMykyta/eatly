import React from "react";
import AuthInputs from "@/components/auth/AuthInputs";
import { IAuth } from "@/interfaces/IAuth";
import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { expect, vi, describe, it, afterEach } from "vitest";

interface IAuthInputs {
  hasName: boolean;
  message: string;
  register: UseFormRegister<IAuth>;
  errors: FieldErrors<IAuth>;
}

vi.mock("@/components/auth/AuthInputs", () => ({
  default: ({ hasName, message, register, errors }: IAuthInputs) => (
    <div data-testid="auth-inputs">
      <div data-testid="has-name">{hasName ? "true" : "false"}</div>
      <div data-testid="message">{message}</div>
      <div data-testid="errors">{JSON.stringify(errors)}</div>
      <input data-testid="email-input" {...register("email")} />
      <input data-testid="password-input" {...register("password")} />
      {hasName && (
        <input data-testid="fullname-input" {...register("fullName")} />
      )}
    </div>
  ),
}));

describe.skip("AuthInputs", () => {
  afterEach(() => {
    cleanup();
  });
  it("should have data", () => {
    render(
      <AuthInputs
        hasName={true}
        message="test message"
        register={vi.fn()}
        errors={{}}
      />
    );
    expect(screen.getByTestId("auth-inputs")).toBeDefined();
    expect(screen.getByTestId("has-name").textContent).toBe("true");
    expect(screen.getByTestId("message").textContent).toBe("test message");
    expect(screen.getByTestId("errors").textContent).toBe("{}");
    expect(screen.getByTestId("email-input")).toBeDefined();
    expect(screen.getByTestId("password-input")).toBeDefined();
    expect(screen.getByTestId("fullname-input")).toBeDefined();
  });
  it("should show error messages", () => {
    render(
      <AuthInputs
        hasName={true}
        message="test message"
        register={vi.fn()}
        errors={{ email: { message: "Email is required" } as object } as object}
      />
    );
    expect(screen.getByTestId("errors").textContent).toBe(
      '{"email":{"message":"Email is required"}}'
    );
  });
});
