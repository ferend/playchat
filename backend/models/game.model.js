import mongoose from "mongoose";

const leaderboardEntrySchema = new mongoose.Schema(
    {
        playerName: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const gameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        leaderboard: [leaderboardEntrySchema],
    },
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
