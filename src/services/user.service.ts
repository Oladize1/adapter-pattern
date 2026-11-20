import {EmailService} from "../domain/interfaces/email.service"

export class UserService {
  constructor(private emailService: EmailService) {}

  async welcome(body: string, email: string) {
    await this.emailService.send(email, `Welcome ${email}!`, body)
  }
}