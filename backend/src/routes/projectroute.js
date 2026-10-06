import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { getProjects, setProject } from "../controllers/project.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const projectRouter = Router();

projectRouter.post("/project", authenticate,upload.single("image"), setProject);
projectRouter.get("/project", getProjects);

export default projectRouter;