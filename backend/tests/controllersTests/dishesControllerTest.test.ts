import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Request, Response } from "express";
import getCard from "../../controllers/dishesController";
import DishesCard from "../../models/dishesModel";
import handleError from "../../handleError";

// Mock dependencies
jest.mock("../../models/dishesModel");
jest.mock("../../handleError");

const mockDishesCard = DishesCard as jest.Mocked<typeof DishesCard>;
const mockHandleError = handleError as jest.MockedFunction<typeof handleError>;

describe("dishesController", () => {
  let mockRequest: any;
  let mockResponse: any;
  let consoleSpy: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup request mock
    mockRequest = {} as Request;

    // Setup response mock
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Setup console spy
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  describe("getCard", () => {
    it("should successfully return all dishes", async () => {
      // Arrange
      const mockDishes = [
        {
          _id: "dish1",
          theme: "Italian",
          title: "Margherita Pizza",
          time: "25 min",
          rating: 4.6,
          price: 15.99,
          image: "margherita-pizza.jpg",
        },
        {
          _id: "dish2",
          theme: "Chinese",
          title: "Sweet and Sour Chicken",
          time: "20 min",
          rating: 4.3,
          price: 12.5,
          image: "sweet-sour-chicken.jpg",
        },
      ];

      mockDishesCard.find.mockResolvedValue(mockDishes as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDishes);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should return empty array when no dishes found", async () => {
      // Arrange
      const emptyDishes: any[] = [];
      mockDishesCard.find.mockResolvedValue(emptyDishes);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(emptyDishes);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const dbError = new Error("Database connection failed");
      mockDishesCard.find.mockRejectedValue(dbError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        dbError
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should handle unknown errors", async () => {
      // Arrange
      const unknownError = "Unknown error occurred";
      mockDishesCard.find.mockRejectedValue(unknownError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        unknownError
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should handle null response from database", async () => {
      // Arrange
      mockDishesCard.find.mockResolvedValue(null as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(null);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle timeout errors", async () => {
      // Arrange
      const timeoutError = new Error("Query timeout");
      timeoutError.name = "MongooseError";
      mockDishesCard.find.mockRejectedValue(timeoutError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        timeoutError
      );
    });

    it("should handle dishes with various themes", async () => {
      // Arrange
      const mockDishesWithVariousThemes = [
        {
          _id: "dish1",
          theme: "Fast Food",
          title: "Classic Burger",
          time: "15 min",
          rating: 4.1,
          price: 8.99,
          image: "classic-burger.jpg",
        },
        {
          _id: "dish2",
          theme: "Mexican",
          title: "Chicken Tacos",
          time: "18 min",
          rating: 4.4,
          price: 11.25,
          image: "chicken-tacos.jpg",
        },
        {
          _id: "dish3",
          theme: "Japanese",
          title: "Salmon Sushi Roll",
          time: "12 min",
          rating: 4.8,
          price: 16.5,
          image: "salmon-sushi.jpg",
        },
      ];

      mockDishesCard.find.mockResolvedValue(mockDishesWithVariousThemes as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockDishesWithVariousThemes
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle dishes with different price ranges", async () => {
      // Arrange
      const mockDishesWithDifferentPrices = [
        {
          _id: "dish1",
          theme: "Budget",
          title: "Simple Sandwich",
          time: "5 min",
          rating: 3.8,
          price: 4.99,
          image: "simple-sandwich.jpg",
        },
        {
          _id: "dish2",
          theme: "Premium",
          title: "Wagyu Steak",
          time: "45 min",
          rating: 4.9,
          price: 89.99,
          image: "wagyu-steak.jpg",
        },
      ];

      mockDishesCard.find.mockResolvedValue(
        mockDishesWithDifferentPrices as any
      );

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockDishesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockDishesWithDifferentPrices
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });
  });
});
