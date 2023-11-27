import { createTransport } from "nodemailer";
import { IEmailRequest, TUserSendEmailNotificationSales } from "../interfaces/user.interfaces";
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
        name: "Night Commerce",
        link: "http://localhost:5173/",
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
            link: `http://localhost:5173/recoverPassword/${resetToken}`
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






  sendEmailConfirmedAccountTemplate(
    userEmail: string,
    userName: string,
    idUser:number
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Night Commerce",
        link: "http://localhost:5173/",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          `Seja bem vindo ${userName}, estamos felizes em ser juntar a Night Commerce, voce esta recebendo esse email para confirmar a sua conta`,
        action: {
          instructions: "Clique no botão abaixo para confirmar a conta",
          button: {
            color: "#4529E6",
            text: "Confirmar Email",
            link: `http://localhost:5173/confirmAccont/${idUser}`
          },
        },
        outro:
          "Se você não solicitou uma Confirmação de Email, nenhuma ação adicional será necessária de sua parte.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailtemplate = {
      to: userEmail,
      subject: "Confirmar Conta",
      text: emailBody,
    };
    return emailtemplate;
  }





  async sendEmailNotificationSalesTemplate(
    emails:Array<TUserSendEmailNotificationSales>
  ){
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Night Commerce",
        link: "http://localhost:5173/",
      },
    });

    await Promise.all(
      emails.map(async (user)=>{
        const email = {
          body: {
            name: user.name,
            intro:
              `Parabens ${user.name}, voce acaba de fazer uma venda`,
            action: {
              instructions: `Voce vendeu o produto ${user.nameProduct}, quantidade: ${user.qtd}`,
              button: {
                color: "#4529E6",
                text: "Entra no site",
                link: `http://localhost:5173/`
              },
            },
            outro:
              `Detalhes da entrega:Estado: ${user.userAddress.address.state} Cidade:${user.userAddress.address.city} Rua: ${user.userAddress.address.road} Numero: ${user.userAddress.address.number} Cep:${user.userAddress.address.cep}`,
          },
        };
    
        const emailBody = mailGenerator.generate(email);
    
        const emailtemplate = {
          to: user.email,
          subject: "Venda",
          text: emailBody,
        };
  
        await emailservice.sendEmail(emailtemplate);
  
      })
    )
  }






  async sendEmailNoticeProductStockDown
  (
    nameSeller:string,
    emailSeller:string,
    nameProduct:string,
    qtd:number
  ){
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Night Commerce",
        link: "http://localhost:5173/",
      },
    });

    const email = {
      body: {
        name: nameSeller,
        intro:
          `Ola ${nameSeller}, voce esta com estoque baixo no produto ${nameProduct}`,
        action: {
          instructions: `O produto ${nameProduct} esta com apenas ${qtd}`,
          button: {
            color: "#4529E6",
            text: "Atualizar estoque",
            link: `http://localhost:5173/`
          },
        },
        outro:
          "sempre deixei os estoques dos seus produtos acima de 5 unidade",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailtemplate = {
      to: emailSeller,
      subject: "Aviso estoque baixo",
      text: emailBody,
    };
    await emailservice.sendEmail(emailtemplate);
  }
}

const emailservice = new EmailService();

export { emailservice };
