import { Request, Response } from "express";
import { sendResetEmailPassword } from "../../services/users/sendEmailResetPassword.service";

export const sendResetEmailPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  await sendResetEmailPassword(email);

  return res.json({ message: "token send" });
};
