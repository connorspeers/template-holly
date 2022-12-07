import "../css/_base.css";
import "../css/contact.css";
import "../css/expand.css";
import "../css/gallery.css";
import "../css/header.css";
import "../css/input.css";
import "../css/layout.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Component {...pageProps} />
  </>);
}
