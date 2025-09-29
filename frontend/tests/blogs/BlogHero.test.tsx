import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetArticlesQuery } from "@/lib/services/api";
import BlogHero from "@/components/blog/BlogHero";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

vi.mock("@/lib/services/api", () => ({
  useGetArticlesQuery: vi.fn(),
}));

describe("Blog Hero Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render loading state", () => {
    vi.mocked(useGetArticlesQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
    } as any);

    render(<BlogHero slug="test-slug" />);
    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
  it("should render error state", () => {
    vi.mocked(useGetArticlesQuery).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
      isError: true,
      isSuccess: false,
    } as any);

    render(<BlogHero slug="test-slug" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
