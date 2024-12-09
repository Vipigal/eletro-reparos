import { IEmailService } from "../../use-cases/interfaces/email-service.interface";

export class EmailService implements IEmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    console.log(
      `Enviando email para ${to} com o assunto ${subject} e corpo ${body}`
    );
  }
}
