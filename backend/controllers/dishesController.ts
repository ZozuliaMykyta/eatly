import type { Request, Response } from "express";
import DishesCard from "../models/dishesModel.ts";
import handleError from "../handleError.ts";

const getCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await DishesCard.find();
    res.status(200).json(restaurants);
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default getCard;
