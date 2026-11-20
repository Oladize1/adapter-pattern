import {NodemailerAdapter} from "../adapters/nodemailer.adapter"
import {env} from "../config/env"

type EmailProvider = "resend" | "nodemailer"

export class EmailFactory {
  static emailProvider(provider){
    switch(provider){
      case "nodemailer":
        return new NodemailerAdapter(env.SMTP_USER, env.SMTP_PASS);
      default: 
        throw new Error(`Invalid email provider ${provider}`)
    }
  }
  
}