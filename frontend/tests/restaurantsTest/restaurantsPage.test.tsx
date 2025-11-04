import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import Page from "@/app/restaurants/[slug]/page";

vi.mock("@/app/restaurants/[slug]/RestaurantCard", () => ({
  default: ({ slug }: { slug: string }) => (
    <div data-testid="restaurant-card">RestaurantCard {slug}</div>
  ),
}));
vi.mock("@/components/restaurants/Popular", () => ({
  default: () => <div data-testid="popular">Popular</div>,
}));

vi.mock("@/components/Questions", () => ({
  default: () => <div data-testid="questions">Questions</div>,
}));
describe.skip("Restaurants Page", () => {
  it("should render restaurant card, popular section, and questions section", async () => {
    const params = Promise.resolve({ slug: "test-restaurant" });

    render(await Page({ params }));

    expect(screen.getByTestId("restaurant-card")).toBeInTheDocument();
    expect(screen.getByTestId("popular")).toBeInTheDocument();
    expect(screen.getByTestId("questions")).toBeInTheDocument();
  });
});
