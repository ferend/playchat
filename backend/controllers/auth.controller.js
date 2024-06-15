import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../helpers/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        // Log the request body to confirm all fields are present
        console.log('Signup request body:', req.body);

        if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            email,  // Ensure email is included here
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();

        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,  // Ensure email is included here
            profilePicture: newUser.profilePicture,
        });
    } catch (error) {
        console.error("Error in signup: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt"); // Clearing the JWT cookie
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.error("Error in logout controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
