import express from "express";
import moduleController from "../controllers/moduleController.js";

const router = express.Router();

const controller = new moduleController();


router.post("/", (req, res) => controller.createModule(req, res));

router.delete("/", (req, res) => controller.deleteModule(req, res));

router.get("/", (req, res) => controller.getModules(req, res));

router.get("/documents", (req, res) => controller.getModuleDocuments(req, res));


export default router;
