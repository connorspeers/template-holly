import type { NextPage } from "next";
import { Layout } from "../components/layout";

export const tagline = `Holly is a minimalist web template for photography portfolios`;

export const AboutPage: NextPage = () => {
  return (<>
    <Layout
      title="About"
      slug="about"
      desc="Holly is a minimalist web template for photography portfolios. It's built with NextJS + TypeScript and prioritizes the user's photo viewing experience."
    >
      <h2>{tagline}</h2>
      <p>It features a mobile-first responsive design along with a multi-state photo viewer that aims for an optimal viewing experience regardless of screen resolution. It&apos;s built with <a href="https://nextjs.org">NextJS</a> + <a href="https://typescriptlang.org">TypeScript</a> and includes a contact form backed by <a href="https://nodemailer.com">Nodemailer</a>, <a href="https://www.hcaptcha.com/">hCaptcha</a>, and <a href="https://github.com/colinhacks/zod">Zod</a>.</p>
      <p>This template was created by <a href="https://speers.dev">Connor Speers</a> for a client project and is named after a village in Michigan. You can see the (open) source code <a href="https://github.com/cnnrsprs/holly">here.</a></p>
      <video controls>
        <source src="/media/holly-demo.mp4" type="video/mp4" />
        <p>Your browser doesn&apos;t support HTML video. Here&apos;s a <a href="/media/holly-demo.mp4">link to the demo video</a> instead.</p>
      </video>
    </Layout>
  </>);
};

export default AboutPage;
