import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import type { Request, Response } from "express";
import userRoute from "../../routes/userRoute";

jest.mock("../../controllers/userController", () => {
  return jest.fn((req: Request, res: Response) => {
    res.status(200).json({ message: "Test response" });
  });
});

describe.skip("User Route", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(userRoute);
  });

  it("should respond to GET /users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Test response" });
  });

  it("should not respond to POST /users", async () => {
    const response = await request(app).post("/users");

    expect(response.status).toBe(404);
  });
});
