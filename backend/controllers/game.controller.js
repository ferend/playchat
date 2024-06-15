import Score from "../models/score.model.js";

export const getGames = (req, res) => {
    // Array of game links
    const gameLinks = [
        { name: "Gem Hunter", url: "https://gem-hunter.netlify.app/" },
        { name: "BlackSpider", url: "https://blackspider64.netlify.app/" },
    ];

    res.json(gameLinks);
};

export const updateScore = async (req, res) => {
    try {
        const { playerName, score } = req.body;

        let playerScore = await Score.findOne({ playerName });

        if (playerScore) {
            playerScore.score = Math.max(playerScore.score, score); // Update only if the new score is higher
            await playerScore.save();
        } else {
            const newScore = new Score({ playerName, score });
            await newScore.save();
        }

        res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const submitScore = async (req, res) => {
    try {
        const { playerName, score, game } = req.body;

        if (!playerName || !score || !game) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newScore = new Score({
            playerName,
            score,
            game
        });

        await newScore.save();
        res.status(201).json({ message: 'Score submitted successfully', score: newScore });
    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Score.find().sort({ score: -1 }).limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


