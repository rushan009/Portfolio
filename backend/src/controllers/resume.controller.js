import fs from "fs/promises";
import Resume from "../models/resume.mode.js";

export const uploadResume = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Resume file is required" });
		}

		const existingResume = await Resume.findOne();
		const resume = await Resume.findOneAndUpdate(
			{},
			{
				originalName: req.file.originalname,
				filename: req.file.filename,
				path: req.file.path,
				mimetype: req.file.mimetype,
				size: req.file.size,
			},
			{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
		);

		if (existingResume?.path && existingResume.path !== req.file.path) {
			await fs.unlink(existingResume.path).catch(() => undefined);
		}

		return res.status(201).json({
			message: "Resume uploaded successfully",
			resume: {
				originalName: resume.originalName,
				size: resume.size,
				updatedAt: resume.updatedAt,
			},
		});
	} catch (error) {
		if (req.file?.path) {
			await fs.unlink(req.file.path).catch(() => undefined);
		}

		console.error("Error uploading resume:", error);
		return res.status(500).json({
			message: "Error uploading resume",
			error: error.message,
		});
	}
};

export const getResume = async (req, res) => {
	try {
		const resume = await Resume.findOne().select("originalName size updatedAt");

		if (!resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		return res.status(200).json({ resume });
	} catch (error) {
		console.error("Error fetching resume:", error);
		return res.status(500).json({ message: "Error fetching resume" });
	}
};

export const downloadResume = async (req, res) => {
	try {
		const resume = await Resume.findOne();

		if (!resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		return res.download(resume.path, resume.originalName, (error) => {
			if (error && !res.headersSent) {
				res.status(404).json({ message: "Resume file not found" });
			}
		});
	} catch (error) {
		console.error("Error downloading resume:", error);
		return res.status(500).json({ message: "Error downloading resume" });
	}
};
