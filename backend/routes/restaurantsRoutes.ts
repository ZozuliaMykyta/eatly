import express from "express";
import getRestaurantCard from "../controllers/restaurantsController.ts";

const router = express.Router();

router.get("/restaurants", getRestaurantCard);

export default router;
