import express from "express";
import {getGames, getLeaderboard, submitScore, updateScore} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/", getGames);
router.post('/scores', updateScore);
router.get('/leaderboard', getLeaderboard);

export default router;
