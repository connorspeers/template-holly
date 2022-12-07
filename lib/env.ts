const required = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
  "DOMAIN",
  "HCAPTCHA_SECRET",
  "HCAPTCHA_SITEKEY",
];
for (const env of required) {
  if (!process.env[env]) {
    console.log(process.env[env]);
    throw new Error(`Missing env: ${env}`);
  }
}

export const emailHost = process.env.EMAIL_HOST!;
export const emailPort = process.env.EMAIL_HOST!;
export const emailUser = process.env.EMAIL_USER!;
export const emailPass = process.env.EMAIL_PASS!;
export const contactToEmail = process.env.CONTACT_TO_EMAIL!;
export const contactFromEmail = process.env.CONTACT_FROM_EMAIL!;
export const domain = process.env.DOMAIN!;
export const hcaptchaSecret = process.env.HCAPTCHA_SECRET!;
export const hcaptchaSitekey = process.env.HCAPTCHA_SITEKEY!;
