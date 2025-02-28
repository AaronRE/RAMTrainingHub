import express from "express";
import quizController from "../controllers/quizController.js";

const router = express.Router();

const controller = new quizController();


router.post("/", (req, res) => controller.createQuiz(req, res));

router.delete("/", (req, res) => controller.deleteQuiz(req, res));

router.get("/", (req, res) => controller.getQuizzes(req, res));


export default router;
