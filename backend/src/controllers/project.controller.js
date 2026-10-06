import Project from "../models/project.model.js";
import uploadImage from "../utils/upload.js";

export const setProject = async (req, res) => {
    try {
        const { title, summary, description, skills, github, live } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const imageUrl = await uploadImage(req.file.path);

        const project = await Project.create({
            title,
            summary,
            description,
            skills,
            github,
            live,
            image: imageUrl,
        });

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({
            message: "Error creating project",
            error: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({
            message: "Error fetching projects",
            error: error.message,
        });
    }
};