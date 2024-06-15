import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorizeAccess = async (req, res, next) => {
    try {
        const authToken = req.cookies.jwt;

        if (!authToken) {
            return res.status(401).json({ error: "Authorization token missing" });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid authorization token" });
        }

        const user = await User.findById(decodedToken.userID).select("-password");

        if (!user) {
            console.log("User not found with ID:", decodedToken.userId); // Enhanced logging
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (err) {
        console.log("Error in authorizeAccess middleware: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default authorizeAccess;
