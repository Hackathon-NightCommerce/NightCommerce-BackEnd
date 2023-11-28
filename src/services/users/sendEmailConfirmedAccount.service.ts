import { randomUUID } from "crypto";
import { AppError } from "../../errors";
import { emailservice } from "../../utils/sendEmail.utils"; 
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";


export const sendEmailConfirmedAccount = async (email: string) => {
  const userRepository = AppDataSource.getRepository(Users); 

  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const resetToken = randomUUID();

 
    user.reset_token = resetToken;
    await userRepository.save(user);

    const confirmedAccountTemplate = emailservice.sendEmailConfirmedAccountTemplate(
      user.email,
      user.name,
      user.id
    );

    await emailservice.sendEmail(confirmedAccountTemplate);

  } catch (error) {
    console.error("Erro ao enviar email de redefinição:", error);
    throw new AppError("Erro ao enviar email de redefinição.", 500);
  }
};