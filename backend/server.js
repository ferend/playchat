import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js";
import mongoDBConnect from "./db/mongoDBConnect.js";
import messageRoutes from "./routes/message.routes.js";
import gameRoutes from "./routes/game.routes.js";
import userRoutes from "./routes/user.routes.js";
import {app, server} from "./socket/socket.js";
import path from "path";
import scoreRoutes from "./routes/score.routes.js";

dotenv.config();
const __dirname = path.resolve();

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use('/api/scores', scoreRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
//
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// Connect to the database and start the server
server.listen(PORT, () => {
    mongoDBConnect().then(r => console.log("MongoDB handshake"));
    console.log(`Server is running on port ${PORT}`);
});

