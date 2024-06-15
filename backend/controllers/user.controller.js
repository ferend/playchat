import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUserProfile: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { email, profilePicture, newUsername } = req.body;
        let updatedFields = {};

        if (email) updatedFields.email = email;
        if (profilePicture) updatedFields.profilePicture = profilePicture;
        if (newUsername) updatedFields.username = newUsername;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updatedFields,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateUserProfile: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const updateUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { username: newUsername },
            { new: true, runValidators: true }
        ).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateUsername: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

