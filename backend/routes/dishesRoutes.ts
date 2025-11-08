import express from "express";
import getDishesCard from "../controllers/dishesController";

const router = express.Router();

router.get("/dishes", getDishesCard);

export default router;
