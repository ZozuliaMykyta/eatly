import express from "express";
import AuthGoogleController from "../controllers/AuthGoogleController";

const router = express.Router();

router.post("/auth/google", AuthGoogleController);

export default router;
