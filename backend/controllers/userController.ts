import type { Request, Response } from "express";
import User from "../database/models/User.ts";
import handleError from "../handleError.ts";

const getCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await User.find();
    res.status(200).json(restaurants);
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default getCard;
