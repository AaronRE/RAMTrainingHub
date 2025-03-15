import express from "express";
import quizAttemptController from "../controllers/quizAttemptController.js";

const router = express.Router();

const controller = new quizAttemptController();


router.post("/", (req, res) => controller.createQuizAttempt(req, res));

router.delete("/", (req, res) => controller.deleteQuizAttempt(req, res));

router.get("/", (req, res) => controller.getQuizAttempts(req, res));

router.post("/update", (req, res) => controller.updateQuizAttemptScore(req, res));


export default router;
