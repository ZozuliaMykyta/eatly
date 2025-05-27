import type { Request, Response } from "express";
import AuthGoogleModel from "../models/AuthGoogleModel.ts";
import handleError from "../handleError.ts";

const getAuthGoogle = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.body;
  if (!code) {
    return handleError(res, "Code is required");
  }
  try {
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default getAuthGoogle;
