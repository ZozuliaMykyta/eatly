import express from "express";
import AuthGoogleController from "../controllers/AuthGoogleController";

const router = express.Router();

router.get("/auth/google/callback", AuthGoogleController);

export default router;
