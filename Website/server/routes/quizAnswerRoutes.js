import express from "express";
import quizAnswerController from "../controllers/quizAnswerController.js";

const router = express.Router();

const controller = new quizAnswerController();


router.post("/", (req, res) => controller.createQuizAnswer(req, res));

router.delete("/", (req, res) => controller.deleteQuizAnswer(req, res));

router.get("/", (req, res) => controller.getQuizAnswers(req, res));



export default router;
