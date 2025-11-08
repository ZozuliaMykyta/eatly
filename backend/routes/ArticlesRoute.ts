import express from "express";
import getArticlesCard from "../controllers/articlesController";

const router = express.Router();

router.get("/articles", getArticlesCard);

export default router;
