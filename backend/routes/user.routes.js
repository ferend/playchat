import express from "express";
import authorizeAccess from "../middleware/authorizeAccess.js";
import {getUserProfile, getUsersForSidebar, updateUsername, updateUserProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authorizeAccess, getUsersForSidebar);
router.get("/profile", authorizeAccess, getUserProfile);
router.put("/profile", authorizeAccess, updateUserProfile);
router.put("/profile/username", authorizeAccess, updateUsername); // Handle username change
export default router;