import {EmailService} from "../domain/interfaces/email.service.ts"
import nodemailer from "nodemailer";
import {env} from "../config/env"

export class NodemailerAdapter implements EmailService {

  private transporter
  constructor(user: string, pass: string) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass}})
  }
  async send(to:string, subject:string, body:string): Promise<void>{
  try {
  const info = await this.transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject, // subject line
    text: body, // plain text body
  });

  console.log("Message sent: %s", info.messageId);

} catch (err) {
  console.error("Error while sending mail:", err);
}
  }
  
}