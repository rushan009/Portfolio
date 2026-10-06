import Skill from "../models/skills.model.js";
import mongoose from "mongoose";

export const setSkill = async (req, res) => {
    try {
        const { name, level, domain } = req.body;

        if (!name || !level) {
            return res.status(400).json({ message: "Name and level are required" });
        }

        const skill = await Skill.create({ name, level, domain: domain || "Other" });
        res.status(201).json({ message: "Skill created successfully", skill });
    } catch (error) {
        console.error("Error creating skill:", error);
        return res.status(500).json({
            message: "Error creating skill",
            error: error.message,
        });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { name, level, domain } = req.body;
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            { name, level, domain },
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        res.status(200).json({ message: "Skill updated successfully", skill });
    } catch (error) {
        return res.status(500).json({ message: "Error updating skill", error: error.message });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting skill", error: error.message });
    }
};

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({ skills });
    } catch (error) {
        console.error("Error fetching skills:", error);
        return res.status(500).json({
            message: "Error fetching skills",
            error: error.message,
        });
    }
};