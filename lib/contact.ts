import nodemailer from "nodemailer";
import { z } from "zod";
import { parse } from "./parse";
import { escapeHtml } from "./util";
import * as env from "./env";
import h from "hcaptcha";
import { handler } from "./handler";

const transporter = nodemailer.createTransport({
  host: env.emailHost,
  port: env.emailPort,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
} as any); // Weird TS error without the any

const contactArg = z.object({
  name: z.string().min(1).max(150).transform(escapeHtml),
  email: z.string().email().transform(escapeHtml),
  subject: z.string().min(1).max(150).transform(escapeHtml),
  message: z.string().min(1).max(1000).transform(escapeHtml),
  // At time of writing, the captcha response token seems to be around 5600
  // characters. Setting the max length to be 10000 just to be safe
  captcha: z.string().min(1).max(10000).refine(async token => {
    try {
      const data = await h.verify(env.hcaptchaSecret, token);
      return data.success;
    } catch (err) {
      return false;
    }
  }, "Invalid captcha"),
});

export type ContactArg = z.input<typeof contactArg>;

export async function contact(arg: ContactArg) {
  arg = await parse(contactArg, arg);

  const text = `${arg.message}\n\n----------\n${arg.name} <${arg.email}> sent this message from ${process.env.DOMAIN}\n(To send a response, reply to this email)`;

  const html = `${arg.message.split("\n").map(line => `<p>${line}</p>`).join("")}<p style="opacity:0.75;font-size:0.85em;">----------<br />${arg.name} &lt;<a href="mailto:${arg.email}">${arg.email}</a>&gt; sent this message from ${process.env.DOMAIN}<br />(To send a response, reply to this email)<br />`;

  const info = await transporter.sendMail({
    to: env.contactToEmail,
    from: `"${arg.name}" <${env.contactFromEmail}>`,
    replyTo: arg.email,
    subject: arg.subject,
    text,
    html,
  });
  console.info("Contact email sent", info);
}

export const contactHandler = handler(contact);
