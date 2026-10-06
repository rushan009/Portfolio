import { Router } from "express";
import { deleteSkill, getSkills, setSkill, updateSkill } from "../controllers/skill.controller.js";
import authenticate from "../middleware/auth.middleware.js";
const skillRouter = Router();
skillRouter.post("/skill", authenticate, setSkill);
skillRouter.put("/skill/:id", authenticate, updateSkill);
skillRouter.delete("/skill/:id", authenticate, deleteSkill);
skillRouter.get("/skill", getSkills);

export default skillRouter;