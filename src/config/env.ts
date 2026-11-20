import dotenv from "dotenv"
dotenv.config()

function requiredConfig(key): string{
  const result = process.env[key]
  if(!result) throw new Error(`env variable ${key} is required for start app`)
  return result
}
export const env = {
  PORT: Number(process.env.PORT) ?? 4000,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_PROVIDER: requiredConfig("EMAIL_PROVIDER")
}