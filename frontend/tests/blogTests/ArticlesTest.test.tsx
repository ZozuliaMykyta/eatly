import React from "react";
import Articles from "@/components/blog/Articles";
import { useGetArticlesQuery } from "@/lib/services/api";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ImageProps } from "next/image";
import { IArticles } from "@/interfaces/IArticles";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

vi.mock("@/lib/services/api", () => ({
  useGetArticlesQuery: vi.fn(),
}));

type useGetArticlesQueryType = ReturnType<typeof useGetArticlesQuery>;

vi.mock("@/components/blog/ArticleCard", () => ({
  default: ({ article }: { article: IArticles }) => (
    <div data-testid="article-card">{article.article}</div>
  ),
}));

describe("ArticlesTest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render data correctly", () => {
    vi.mocked(useGetArticlesQuery).mockReturnValue({
      data: [
        {
          _id: "1",
          article: "Test Article 1",
          img: "/test1.jpg",
        },
      ],
      error: false,
      isLoading: false,
      refetch: vi.fn(),
    } as useGetArticlesQueryType);

    render(<Articles />);
    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
  });
  it("should render loading state", () => {
    vi.mocked(useGetArticlesQuery).mockReturnValue({
      data: [],
      error: false,
      isLoading: true,
      refetch: vi.fn(),
    } as useGetArticlesQueryType);

    render(<Articles />);
    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
  it("should render error state", () => {
    vi.mocked(useGetArticlesQuery).mockReturnValue({
      data: [],
      error: true,
      isLoading: false,
      refetch: vi.fn(),
    } as useGetArticlesQueryType);
    render(<Articles />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
  it("should render Article component", () => {
    expect(screen.getByTestId("article-card")).toBeInTheDocument();
  });
});
