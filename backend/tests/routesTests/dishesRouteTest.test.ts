import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import type { Request, Response } from "express";
import dishesRouter from "../../routes/dishesRoutes";

jest.mock("../../controllers/dishesController.ts", () => {
  return jest.fn((req: Request, res: Response) => {
    res.status(200).json({ message: "Test response" });
  });
});

describe("Dishes Route", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(dishesRouter);
  });

  it("should respond to GET /dishes", async () => {
    const response = await request(app).get("/dishes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Test response" });
  });

  it("should not respond to POST /dishes", async () => {
    const response = await request(app).post("/dishes");

    expect(response.status).toBe(404);
  });
});
