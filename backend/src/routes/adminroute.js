import { Router } from "express";   
import { createAdmin } from "../seed/createAdmin.js";
import { getCurrentAdmin, loginAdmin } from "../controllers/admin.controller.js";

const authRouter = Router();

authRouter.get("/admin/create-admin", createAdmin);
authRouter.post("/admin/login", loginAdmin);
authRouter.get("/admin/me", getCurrentAdmin);

export default authRouter;