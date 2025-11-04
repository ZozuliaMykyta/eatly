import React from "react";
import DishesCards from "@/components/DishesCards";
import { useGetDishesQuery } from "@/lib/services/api";
import { render, screen } from "@testing-library/react";
import { ImageProps } from "next/image";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

type useGetDishesQueryType = ReturnType<typeof useGetDishesQuery>;

vi.mock("@/lib/services/api", () => ({
  useGetDishesQuery: vi.fn(),
}));

describe.skip("DishesCardsTest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render cards correctly", () => {
    const dishCardData = [
      {
        _id: "test-dish",
        title: "Test Dish",
        theme: "Italian",
        time: "20-30 min",
        rating: 4.5,
        price: 15,
        image: "/test-dish.jpg",
      },
    ];

    vi.mocked(useGetDishesQuery).mockReturnValue({
      data: dishCardData,
      error: false,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: vi.fn(),
    } as useGetDishesQueryType);
    render(<DishesCards />);
    expect(screen.getByText("Test Dish")).toBeInTheDocument();
    expect(screen.getByText("20-30 min")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(screen.getByText("$15")).toBeInTheDocument();
  });
  it("should render loading state", () => {
    vi.mocked(useGetDishesQuery).mockReturnValue({
      data: [],
      error: false,
      isLoading: true,
      isError: false,
      isSuccess: false,
      refetch: vi.fn(),
    } as useGetDishesQueryType);
    render(<DishesCards />);
    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
  it("should render error state", () => {
    vi.mocked(useGetDishesQuery).mockReturnValue({
      data: [],
      error: true,
      isLoading: false,
      isError: true,
      isSuccess: false,
      refetch: vi.fn(),
    } as useGetDishesQueryType);
    render(<DishesCards />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
