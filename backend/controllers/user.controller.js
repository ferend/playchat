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
        const { email, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { email, profilePicture },
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
