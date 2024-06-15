import express from "express";
import authorizeAccess from "../middleware/authorizeAccess.js";
import {getUsersForSidebar} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authorizeAccess, getUsersForSidebar);

export default router;