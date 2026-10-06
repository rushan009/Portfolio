import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import resumeUpload from "../middleware/resumeUpload.middleware.js";
import {
  downloadResume,
  getResume,
  uploadResume,
} from "../controllers/resume.controller.js";

const resumeRouter = Router();

resumeRouter.post(
  "/resume",
  authenticate,
  resumeUpload.single("resume"),
  uploadResume
);
resumeRouter.get("/resume", getResume);
resumeRouter.get("/resume/download", downloadResume);

export default resumeRouter;