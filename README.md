# Holly

Holly is a photography portfolio template I extracted from a website I built for a client. They were kind enough to let me publish the code as open source.

Holly's "thing" is a multi-state photo viewer that aims for an optimal viewing experience regardless of screen resolution. It's built with [NextJS](https://nextjs.org) + [TypeScript](https://typescriptlang.org) and includes a contact form backed by [Nodemailer](https://nodemailer.com/), [hCaptcha](https://www.hcaptcha.com/), and [Zod](https://github.com/colinhacks/zod).

Holly is named after a village in Michigan.

https://user-images.githubusercontent.com/112015359/197926851-2caff5b9-1eeb-44f9-bad4-939bcb1d9328.mp4


## Setup

1. Copy the `.env.example` file to a new `.env.local` file
2. Fill in the environment variables
   - For the email-related variables, I recommend using [Postmark](https://postmarkapp.com/) for delivering email (using [an SMTP token](https://postmarkapp.com/developer/user-guide/send-email-with-smtp)) and [Cloudflare](https://www.cloudflare.com/products/email-routing/) for setting up email DNS and routing received email to a preferred inbox
   - [See here](https://docs.hcaptcha.com/switch#get-your-hcaptcha-sitekey-and-secret-key) for how to get the hCaptcha related variables

## Development

1. Run `npm run dev` to start in development mode on localhost
2. Visit https://localhost:3000 in your browser to see it in action

## Production

1. Run `npm run build` to generate an optimized production build
2. Run `npm start` to start in production mode on localhost
3. Visit https://localhost:3000 in your browser to see it in action

This template can be deployed with [Vercel](https://vercel.com). When hosting with Vercel, you'll need to [set up the environment variables in the settings of your Vercel project](https://vercel.com/docs/concepts/projects/environment-variables) instead of using a `.env.local` file.
