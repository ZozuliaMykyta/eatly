import type { Request, Response } from "express";
import RestaurantsCard from "../models/restaurantsModel.ts";

const handleError = (res: Response, err: string, errorDetails?: unknown) => {
  if (errorDetails instanceof Error) {
    console.error(errorDetails.message, errorDetails.stack);
  } else {
    console.error(errorDetails);
  }
  res.status(500).json({ error: err, details: errorDetails });
};

const getCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await RestaurantsCard.find();
    res.status(200).json(restaurants);
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default getCard;
