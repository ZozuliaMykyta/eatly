import express from "express";
import getArticlesCard from "../controllers/articlesController.ts";

const router = express.Router();

router.get("/articles", getArticlesCard);

export default router;
