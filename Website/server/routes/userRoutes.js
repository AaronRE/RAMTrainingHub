import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

const controller = new userController();


router.post("/create", (req, res) => controller.createUser(req, res));

router.delete("/", (req, res) => controller.deleteUser(req, res));

router.post("/login", (req, res) => controller.userLogin(req, res));

router.get("/", (req, res) => controller.getUserData(req, res));


export default router;
