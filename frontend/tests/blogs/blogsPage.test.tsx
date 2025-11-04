import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Page from "@/app/blogs/[slug]/page";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/blog/BlogHero", () => ({
  default: ({ slug }: { slug: string }) => (
    <div data-testid="blog-hero">BlogHero {slug}</div>
  ),
}));

vi.mock("@/components/blog/TopArticles", () => ({
  default: () => <div data-testid="top-articles">TopArticles</div>,
}));

describe.skip("Blogs Page", () => {
  it("should render BlogHero and TopArticles components", async () => {
    const params = Promise.resolve({ slug: "test-blog" });

    render(await Page({ params }));

    expect(screen.getByTestId("blog-hero")).toBeInTheDocument();
    expect(screen.getByTestId("top-articles")).toBeInTheDocument();
  });
});
