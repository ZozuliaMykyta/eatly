import express from "express";
import getRestaurantCard from "../controllers/restaurantsController";

const router = express.Router();

router.get("/restaurants", getRestaurantCard);

export default router;
