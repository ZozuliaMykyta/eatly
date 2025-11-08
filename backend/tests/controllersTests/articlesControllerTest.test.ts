import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Request, Response } from "express";
import getCard from "../../controllers/articlesController";
import ArticlesCard from "../../models/ArticlesModel";
import handleError from "../../handleError";

// Mock dependencies
jest.mock("../../models/ArticlesModel");
jest.mock("../../handleError");

const mockArticlesCard = ArticlesCard as jest.Mocked<typeof ArticlesCard>;
const mockHandleError = handleError as jest.MockedFunction<typeof handleError>;

describe("articlesController", () => {
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
    it("should successfully return all articles", async () => {
      // Arrange
      const mockArticles = [
        {
          _id: "article1",
          article: "How to Cook Perfect Pasta",
          img: "pasta-cooking.jpg",
          titles: ["Cooking Tips", "Italian Cuisine", "Pasta Guide"],
        },
        {
          _id: "article2",
          article: "The Best Pizza Places in Town",
          img: "pizza-places.jpg",
          titles: ["Restaurant Reviews", "Pizza", "Local Food"],
        },
      ];

      mockArticlesCard.find.mockResolvedValue(mockArticles as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockArticles);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should return empty array when no articles found", async () => {
      // Arrange
      const emptyArticles: any[] = [];
      mockArticlesCard.find.mockResolvedValue(emptyArticles);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(emptyArticles);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
      // Arrange
      const dbError = new Error("Database connection failed");
      mockArticlesCard.find.mockRejectedValue(dbError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
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
      mockArticlesCard.find.mockRejectedValue(unknownError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
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
      mockArticlesCard.find.mockResolvedValue(null as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(null);
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle timeout errors", async () => {
      // Arrange
      const timeoutError = new Error("Query timeout");
      timeoutError.name = "MongooseError";
      mockArticlesCard.find.mockRejectedValue(timeoutError);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockHandleError).toHaveBeenCalledWith(
        mockResponse,
        "Something went wrong",
        timeoutError
      );
    });

    it("should handle articles with multiple titles", async () => {
      // Arrange
      const mockArticlesWithMultipleTitles = [
        {
          _id: "article1",
          article: "Comprehensive Guide to Mediterranean Diet",
          img: "mediterranean-diet.jpg",
          titles: [
            "Health",
            "Diet",
            "Mediterranean",
            "Nutrition",
            "Wellness",
            "Lifestyle",
          ],
        },
        {
          _id: "article2",
          article: "Quick Breakfast Ideas",
          img: "breakfast-ideas.jpg",
          titles: ["Breakfast", "Quick Recipes"],
        },
      ];

      mockArticlesCard.find.mockResolvedValue(
        mockArticlesWithMultipleTitles as any
      );

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockArticlesWithMultipleTitles
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle articles with empty titles array", async () => {
      // Arrange
      const mockArticlesWithEmptyTitles = [
        {
          _id: "article1",
          article: "Article without categories",
          img: "no-category.jpg",
          titles: [],
        },
      ];

      mockArticlesCard.find.mockResolvedValue(
        mockArticlesWithEmptyTitles as any
      );

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockArticlesWithEmptyTitles
      );
      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it("should handle articles with long content", async () => {
      // Arrange
      const longArticleContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50);
      const mockLongArticles = [
        {
          _id: "long-article1",
          article: longArticleContent,
          img: "long-article.jpg",
          titles: ["Long Form", "Detailed Guide", "In-depth Analysis"],
        },
      ];

      mockArticlesCard.find.mockResolvedValue(mockLongArticles as any);

      // Act
      await getCard(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockArticlesCard.find).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLongArticles);
      expect(mockHandleError).not.toHaveBeenCalled();
    });
  });
});
