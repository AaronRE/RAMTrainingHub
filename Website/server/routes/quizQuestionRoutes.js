import express from "express";
import quizQuestionController from "../controllers/quizQuestionController.js";

const router = express.Router();

const controller = new quizQuestionController();


router.post("/", (req, res) => controller.createQuizQuestion(req, res));

router.delete("/", (req, res) => controller.deleteQuizQuestion(req, res));

router.get("/", (req, res) => controller.getQuizQuestions(req, res));


export default router;
