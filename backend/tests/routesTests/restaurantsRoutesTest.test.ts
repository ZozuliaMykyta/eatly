import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import type { Request, Response } from "express";
import restaurantsRoutes from "../../routes/restaurantsRoutes";

jest.mock("../../controllers/restaurantsController", () => {
  return jest.fn((req: Request, res: Response) => {
    res.status(200).json({ message: "Test response" });
  });
});

describe("Restaurants Route", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(restaurantsRoutes);
  });

  it("should respond to GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Test response" });
  });

  it("should not respond to POST /restaurants", async () => {
    const response = await request(app).post("/restaurants");

    expect(response.status).toBe(404);
  });
});
