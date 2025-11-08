import { Request, Response } from "express";
import handleError from "../handleError";
import ArticlesCard from "../models/ArticlesModel";

const getCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await ArticlesCard.find();
    res.status(200).json(articles);
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};

export default getCard;
