import { EmailService } from "./email.service";

export const serviceProviders = [
  {
    provide: "IEmailService",
    useClass: EmailService,
  },
];
