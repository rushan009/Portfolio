import Admin from "../models/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const safeAdmin = admin.toObject();
        delete safeAdmin.password;

        res.status(200).json({ message: "Login successful", token, admin: safeAdmin });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCurrentAdmin = async (req, res) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decodedToken.id).select("-password");
        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        res.status(200).json({ admin });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired session" });
    }
};