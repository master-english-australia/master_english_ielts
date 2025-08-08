import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailArgs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendEmailViaResend({
  name,
  email,
  subject,
  message,
}: SendEmailArgs) {
  return await resend.emails.send({
    from: `${name} <${email}>`,
    to: "shion.maruko.s@gmail.com",
    subject: `Submitted by ${name} - ${subject}`,
    html: `<p>${message}</p>`,
  });
}
