import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RestaurandCard from "@/app/restaurants/[slug]/RestaurantCard";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import { ImageProps } from "next/image";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

type RestaurantsQueryType = ReturnType<typeof useGetRestaurantsQuery>;

vi.mock("@/lib/services/api", () => ({
  useGetRestaurantsQuery: vi.fn(),
}));

describe("Restaurants Card", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render loading state", () => {
    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
      refetch: vi.fn(),
    } as RestaurantsQueryType);

    render(<RestaurandCard slug="test-restaurant" />);
    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
  it("should render error state", () => {
    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
      isError: true,
      isSuccess: false,
      refetch: vi.fn(),
    } as RestaurantsQueryType);

    render(<RestaurandCard slug="test-restaurant" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
  it("should verify restaurant data", () => {
    const restaurantData = [
      {
        _id: "test-restaurant",
        title: "Test Restaurant",
        img: "/test.jpg",
        delivery_time: "30-40 min",
        rating: "4.5",
      },
    ];

    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: restaurantData,
      error: false,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: vi.fn(),
    } as RestaurantsQueryType);

    render(<RestaurandCard slug="test-restaurant" />);
    expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
    expect(screen.getByAltText("Test Restaurant")).toBeInTheDocument();
    expect(screen.getByText("30-40 min")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });
  it("should handle restaurant not found", () => {
    const restaurantData = [{}];

    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: restaurantData,
      error: false,
      isLoading: false,
      isError: false,
      isSuccess: false,
      refetch: vi.fn(),
    } as RestaurantsQueryType);
    render(<RestaurandCard slug="test-restaurant" />);
    expect(screen.getByText("The restaurant not found")).toBeInTheDocument();
  });
});
