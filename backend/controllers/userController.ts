import { Request, Response } from "express";
import User from "../database/models/User";
import handleError from "../handleError";

const getCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await User.find();
    res.status(200).json(restaurants);
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default getCard;
