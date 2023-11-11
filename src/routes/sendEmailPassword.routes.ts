import { Router } from "express";
import { sendResetEmailPasswordController } from "../controllers/User/sendEmailPassword.controller";
import { resetPasswordController } from "../controllers/User/resetPassword.controller";
import { sendEmailMiddleware } from "../middlewares/sendEmail.middleware";

export const sendRoutes = Router();
sendRoutes.post("/", sendEmailMiddleware, sendResetEmailPasswordController);
sendRoutes.patch("/:token", resetPasswordController);
