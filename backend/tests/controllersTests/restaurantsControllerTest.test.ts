import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Request, Response } from "express";
import getCard from "../../controllers/restaurantsController";
import RestaurantsCard from "../../models/restaurantsModel";
import handleError from "../../handleError";

// Mock dependencies
jest.mock("../../models/restaurantsModel");
jest.mock("../../handleError");

const mockRestaurantsCard = RestaurantsCard as jest.Mocked<
  typeof RestaurantsCard
>;
const mockHandleError = handleError as jest.MockedFunction<typeof handleError>;

describe("restaurantsController", () => {
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
    it("should successfully return all restaurants", async () => {
      // Arrange
      const mockRestaurants = [
        {
          _id: "restaurant1",
          theme: "Italian",
          title: "Pizza Palace",
          delivery_time: "30-45 min",
          rating: 4.5,
          img: "pizza-palace.jpg",
        },
        {
          _id: "restaurant2",
          theme: "Chinese",
          title: "Dragon Garden",
          delivery_time: "25-40 min",
          rating: 4.2,
          img: "dragon-garden.jpg",
        },
      ];

      mockRestaurantsCard.find.mockResolvedValue(mockRestaurants as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRestaurants);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should return empty array when no restaurants found", async () => {
      // Arrange
      const emptyRestaurants: any[] = [];
      mockRestaurantsCard.find.mockResolvedValue(emptyRestaurants);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(emptyRestaurants);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const dbError = new Error("Database connection failed");
      mockRestaurantsCard.find.mockRejectedValue(dbError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
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
      mockRestaurantsCard.find.mockRejectedValue(unknownError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
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
      mockRestaurantsCard.find.mockResolvedValue(null as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(null);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle timeout errors", async () => {
      // Arrange
      const timeoutError = new Error("Query timeout");
      timeoutError.name = "MongooseError";
      mockRestaurantsCard.find.mockRejectedValue(timeoutError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        timeoutError
      );
    });

    it("should handle restaurants with missing fields", async () => {
      // Arrange
      const mockRestaurantsWithMissingFields = [
        {
          _id: "restaurant1",
          theme: "Italian",
          title: "Pizza Palace",
          delivery_time: "30-45 min",
          rating: 4.5,
          // img field missing
        },
      ];

      mockRestaurantsCard.find.mockResolvedValue(
        mockRestaurantsWithMissingFields as any
      );

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockRestaurantsWithMissingFields
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle restaurants with different themes", async () => {
      // Arrange
      const mockRestaurantsWithVariousThemes = [
        {
          _id: "restaurant1",
          theme: "Fast Food",
          title: "Burger King",
          delivery_time: "15-25 min",
          rating: 3.8,
          img: "burger-king.jpg",
        },
        {
          _id: "restaurant2",
          theme: "Mediterranean",
          title: "Olive Garden",
          delivery_time: "35-50 min",
          rating: 4.7,
          img: "olive-garden.jpg",
        },
        {
          _id: "restaurant3",
          theme: "Japanese",
          title: "Sushi Master",
          delivery_time: "20-35 min",
          rating: 4.9,
          img: "sushi-master.jpg",
        },
      ];

      mockRestaurantsCard.find.mockResolvedValue(
        mockRestaurantsWithVariousThemes as any
      );

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockRestaurantsCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockRestaurantsWithVariousThemes
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });
  });
});
