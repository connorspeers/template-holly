import { useState, useEffect } from "react";
import { client } from "../lib/client";
import { ApiError } from "../lib/error";
import { Input } from "../components/input";
import { cx } from "../lib/util";
import Script from "next/script";
import type { NextPage, GetServerSideProps } from "next";
import * as env from "../lib/env";
import { Layout } from "../components/layout";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    hcaptchaSitekey: env.hcaptchaSitekey,
  },
});

type FieldErrors = {
  [x: string]: { _errors: string[] }; // Zod field errors
} & {
  _errors?: string[]; // Zod top level errors
};

export const ContactPage: NextPage<{
  hcaptchaSitekey: string;
}> = ({ hcaptchaSitekey: sitekey }) => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"sending" | "success" | "fail" | "">("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [focusError, setFocusError] = useState(false);

  const onInput = (field: string, val: string) => {
    delete errors[field];
    setErrors(errors);
    setFields({ ...fields, [field]: val });
  };

  // Keep the captcha response token in-sync with the form submission fields
  useEffect(() => {
    if (status === "fail" && !Object.keys(errors).length) {
      setStatus("");
    }
    const pollCaptcha = () => {
      const captcha = document.querySelector<HTMLTextAreaElement>(
        "#captcha textarea[name='h-captcha-response']",
      );
      if (!fields.captcha && captcha && captcha.value) {
        setTimeout(() => {
          delete errors.captcha;
          setErrors(errors);
          setFields({ ...fields, captcha: captcha.value });
        }, 500);
        return;
      }
      if (fields.captcha && captcha && !captcha.value) {
        setFields({ ...fields, captcha: "" });
      }
    };
    const interval = setInterval(pollCaptcha, 500);
    return () => clearInterval(interval);
  }, [status, fields, errors]);

  // Render the captcha once the remote script loads successfully
  useEffect(() => {
    try {
      if (!document.querySelector("#captcha iframe")) {
        eval(`
          hcaptcha.render("captcha", { sitekey: "${sitekey}" });
        `);
      }
    } catch {
      // continue
    }
  }, [captchaReady, sitekey]);

  // Scroll to the first invalid input (if any) after a failed form submission
  useEffect(() => {
    if (focusError) {
      setFocusError(false);
      const input = document.querySelector<HTMLInputElement>(
        ".input.--error",
      );
      if (!input) {
        return;
      }
      input.focus();
      const rect = input.getBoundingClientRect();
      document.body.scrollTo(0, document.body.scrollTop + rect.top);
    }
  }, [focusError]);

  return (<>
    <Script
      src="https://js.hcaptcha.com/1/api.js?render=explicit"
      async
      defer
      onLoad={() => setCaptchaReady(true)}
    ></Script>
    <Layout
      title="Contact"
      slug="contact"
      desc="Please get in touch if you have any feedback regarding this NextJS template."
    >
      {status !== "success" && (<>
        <h2>See any room for improvement?</h2>
        <h3>Please <a href="mailto:connor@speers.dev">email me</a> or fill out the form below</h3>
        <form
          onSubmit={async evt => {
            evt.preventDefault();
            setStatus("sending");
            try {
              await client("/api/contact", fields);
              setStatus("success");
            } catch (err) {
              if (err instanceof ApiError && err.message === "bad_input") {
                const fieldErrors = err.expose as FieldErrors;
                delete fieldErrors._errors; // Ignore top-level errors
                if (fieldErrors.captcha) {
                  eval(`hcaptcha.reset();`);
                  setFields({ ...fields, captcha: "" });
                }
                setErrors(fieldErrors);
                if (Object.keys(fieldErrors)) {
                  setFocusError(true);
                }
              }
              setStatus("fail");
            }
          }}
        >
          <Input
            type="text"
            label="Your name"
            value={fields.name ?? ""}
            disabled={status === "sending"}
            error={errors.name?._errors[0]}
            maxLength={150}
            onInput={(val) => onInput("name", val)}
          />
          <Input
            type="text"
            label="Your email"
            value={fields.email ?? ""}
            disabled={status === "sending"}
            error={errors.email?._errors[0]}
            maxLength={254}
            onInput={val => onInput("email", val)}
          />
          <Input
            type="text"
            label="Subject"
            value={fields.subject ?? ""}
            disabled={status === "sending"}
            error={errors.subject?._errors[0]}
            maxLength={150}
            onInput={val => onInput("subject", val)}
          />
          <Input
            type="textarea"
            label="Message"
            value={fields.message ?? ""}
            disabled={status === "sending"}
            error={errors.message?._errors[0]}
            maxLength={1000}
            onInput={val => onInput("message", val)}
          />
          <div className="contact-submit">
            <div className={cx("contact-captcha", fields.captcha && "--hide")}>
              {errors.captcha && (
                <div className="contact-captchaError">
                  {errors.captcha._errors[0]}
                </div>
              )}
              <div id="captcha" className="h-captcha"></div>
            </div>
            <button
              className={cx(
                !fields.captcha && "--hide",
                status === "fail" && "--fail",
              )}
              type="submit"
              disabled={(
                !fields.name || !fields.email || !fields.subject ||
                !fields.message || status === "sending" ||
                !!Object.keys(errors).length
              )}
            >{
              status === "sending" ? "Sending..."
              : !!Object.keys(errors).length ? "Invalid input"
              : status === "fail" ? "Failed to send. Try again?"
              : "Send"
            }</button>
          </div>
        </form>
      </>)}
      {status === "success" && (<>
        <h2>Thank you for your message!</h2>
        <h3>I&apos;ll be in touch with you soon.</h3>
      </>)}
    </Layout>
  </>);
};

export default ContactPage;
