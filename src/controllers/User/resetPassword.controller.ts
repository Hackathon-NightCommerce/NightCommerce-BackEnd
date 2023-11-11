import { Request, Response } from "express";
import { resetPassword } from "../../services/users/resetPassword.service";

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    await resetPassword(password, token);
    res.json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    res.status(500).json({ error: "Erro ao redefinir a senha" });
  }
};
