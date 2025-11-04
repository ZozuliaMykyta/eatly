import React from "react";
import { ImageProps } from "next/image";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Questions from "@/components/Questions";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

describe.skip("QuestionsTests", () => {
  it("should render data correctly", () => {
    const questionsData = {
      id: 1,
      question: "How does your food delivery service work?",
      answer:
        "Once you place an order, we immediately notify the restaurant. A delivery partner picks up your food and delivers it to your doorstep, usually within the estimated delivery time shown during checkout.",
    };
    render(<Questions />);
    expect(screen.getByText(questionsData.question)).toBeInTheDocument();
    expect(screen.getByText(questionsData.answer)).toBeInTheDocument();
  });
  it("should toggle openedList state", () => {
    render(<Questions />);
    const question = screen.getAllByText(
      "How does your food delivery service work?"
    )[0];
    const answer = screen.getAllByText(/Once you place an order/)[0];
    expect(answer).toHaveClass("max-h-0");
    fireEvent.click(question);
    expect(answer).toHaveClass("max-h-96");
    fireEvent.click(question);
    expect(answer).toHaveClass("max-h-0");
  });
});
