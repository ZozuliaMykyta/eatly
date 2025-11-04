import React from "react";
import DiscountForm from "@/components/DiscountForm";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe.skip("DiscountForm", () => {
  afterEach(() => cleanup());
  it("check if isWide class is applied", () => {
    window.innerWidth = 601;
    render(<DiscountForm />);
    expect(
      screen.getByPlaceholderText("enter your email address")
    ).toBeInTheDocument();
  });
  it("check if isWide class is not applied", () => {
    window.innerWidth = 600;
    render(<DiscountForm />);
    expect(screen.getByPlaceholderText("email address")).toBeInTheDocument();
  });
  it("shows error for invalid email", async () => {
    window.innerWidth = 601;
    render(<DiscountForm />);
    const input = screen.getByPlaceholderText("enter your email address");
    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.click(screen.getByText("subscribe"));
    expect(
      await screen.findByText("Invalid email address")
    ).toBeInTheDocument();
  });
  it("submits with valid email", async () => {
    render(<DiscountForm />);
    const input = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByText(/subscribe/i));
    expect(
      screen.queryByText(/Invalid email address/i)
    ).not.toBeInTheDocument();
  });
});
