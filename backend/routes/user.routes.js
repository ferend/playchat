import express from "express";
import authorizeAccess from "../middleware/authorizeAccess.js";
import {getUserProfile, getUsersForSidebar, updateUserProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authorizeAccess, getUsersForSidebar);
router.get("/profile", authorizeAccess, getUserProfile);
router.put("/profile", authorizeAccess, updateUserProfile);

export default router;