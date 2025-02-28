import express from "express";
import imageController from "../controllers/imageController.js";

const router = express.Router();

const controller = new imageController();


router.post("/", (req, res) => controller.createImage(req, res));

router.delete("/", (req, res) => controller.deleteImage(req, res));

router.get("/", (req, res) => controller.getImages(req, res));


export default router;
