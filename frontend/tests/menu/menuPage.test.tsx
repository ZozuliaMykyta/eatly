import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Page from "@/app/menu/page";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import { IRestaurants } from "@/interfaces/IRestaurants";

vi.mock("@/lib/services/api", () => ({
  useGetRestaurantsQuery: vi.fn(),
}));

vi.mock("@/components/restaurants/RestaurantCard", () => ({
  default: ({ item }: { item: IRestaurants }) => (
    <div data-testid="restaurant-card">RestaurantCard {item.title}</div>
  ),
}));

type RestaurantsQueryType = ReturnType<typeof useGetRestaurantsQuery>;

describe("Menu Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it.skip("should render loading state", () => {
    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
      refetch: vi.fn(),
    } as RestaurantsQueryType);
    render(<Page />);
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
    render(<Page />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
  it("should render restaurant card", () => {
    const restaurantData = [
      {
        _id: "test-restaurant-1",
        title: "RestaurantCard 1",
        img: "/test.jpg",
        delivery_time: "30-40 min",
        rating: "4.5",
      },
      {
        _id: "test-restaurant-2",
        title: "RestaurantCard 2",
        img: "/test2.jpg",
        delivery_time: "20-30 min",
        rating: "4.0",
      },
    ];

    vi.mocked(useGetRestaurantsQuery).mockReturnValue({
      data: restaurantData,
      error: undefined,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: vi.fn(),
    } as RestaurantsQueryType);
    render(<Page />);
    expect(screen.getAllByTestId("restaurant-card")).toHaveLength(2);
    expect(
      screen.getByText("RestaurantCard RestaurantCard 1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("RestaurantCard RestaurantCard 2")
    ).toBeInTheDocument();
    const cards = screen.getAllByTestId("restaurant-card");
    expect(cards[0]).toHaveTextContent("RestaurantCard 1");
    expect(cards[1]).toHaveTextContent("RestaurantCard 2");
    expect(useGetRestaurantsQuery).toHaveBeenCalledTimes(1);
  });
});
