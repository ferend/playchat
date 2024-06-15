import express from "express";
import {getMessages, sendMessage} from "../controllers/message.controller.js";
import authorizeAccess from "../middleware/authorizeAccess.js";

const router = express.Router();

router.get("/:id", authorizeAccess, getMessages);
router.post("/send/:id", authorizeAccess, sendMessage);

export default router;