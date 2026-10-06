import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (req, res) => {
    try {
        const username = "Rushan";
        const email = "rushanofficial1.com";
        const password = "password";
        const adminCount = await Admin.countDocuments();

        if (adminCount > 0) {
            return res.status(409).json({ message: "Only one admin is allowed" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "Admin created successfully", adminId: admin._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Only one admin is allowed" });
        }

        return res.status(500).json({ message: "Error creating admin" });
    }
}