import express from "express";
import documentController from "../controllers/documentController.js";

const router = express.Router();

const controller = new documentController();


router.post("/", (req, res) => controller.createDocument(req, res));

router.delete("/", (req, res) => controller.deleteDocument(req, res));

router.get("/", (req, res) => controller.getDocuments(req, res));


export default router;
