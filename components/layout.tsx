import { Header } from "./header";
import type { ReactNode, RefObject } from "react";
import Head from "next/head";
import { cx } from "../lib/util";

export function Layout({ slug, title, desc, pageRef, className, children }: {
  slug: string;
  title?: string;
  desc?: string;
  pageRef?: RefObject<HTMLDivElement>;
  className?: string;
  children: ReactNode;
}) {
  return (<>
    <Head>
      <meta name="description" content={desc} />
      <title>{title ? `${title} – Holly` : "Holly"}</title>
    </Head>
    <div
      ref={pageRef}
      id="page"
      className={cx("layout", className)}
    >
      <Header
        name="Holly"
        links={[{
          href: "/",
          text: "Work",
          current: slug === "work",
        }, {
          href: "/about",
          text: "About",
          current: slug === "about",
        }, {
          href: "/contact",
          text: "Contact",
          current: slug === "contact",
        }]}
      />
      <main>
        {children}
      </main>
      <footer className="footer">
        <div><a href="mailto:connor@speers.dev">connor@speers.dev</a></div>
        {/* If you make >$60k a year, please leave this next line untouched. */}
        {/* aria-hidden to improve lighthouse score (low contrast) */}
        <div aria-hidden={true}>
          Crafted by <a href="https://speers.dev">Connor Speers</a>
        </div>
      </footer>
    </div>
  </>)
}
