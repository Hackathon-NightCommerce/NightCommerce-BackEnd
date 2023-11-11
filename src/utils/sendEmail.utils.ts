import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/user.interfaces";
import "dotenv/config";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: IEmailRequest) {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email send");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Web Custons",
        link: "http://localhost:3000/users",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "Você recebeu este e-mail porque foi recebida uma solicitação de redefinição de senha da sua conta.",
        action: {
          instructions: "Clique no botão abaixo para redefinir sua senha:",
          button: {
            color: "#4529E6",
            text: "Recover your password",
            link: `http://localhost:5173/recoverPassword/${resetToken}`,
          },
        },
        outro:
          "Se você não solicitou uma redefinição de senha, nenhuma ação adicional será necessária de sua parte.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailtemplate = {
      to: userEmail,
      subject: "Reset Password",
      text: emailBody,
    };
    return emailtemplate;
  }
}

const emailservice = new EmailService();

export { emailservice };
