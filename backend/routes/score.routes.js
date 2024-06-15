import {submitScore} from "../controllers/game.controller.js";
import express from "express";

const router = express.Router();

router.post('/submit', submitScore);

export default router;
