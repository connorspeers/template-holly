import { cx } from "../lib/util";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export interface HeaderLink {
  href: string;
  text: string;
  current?: boolean;
}

export function Header({ name, links }: {
  name: string;
  links: HeaderLink[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const resize = () => setMenuOpen(false);
    const click = (evt: MouseEvent) => {
      if (!headerRef.current?.contains(evt.target as Node | null)) {
        setMenuOpen(false);
      }
    };

    self.addEventListener("resize", resize);
    self.addEventListener("click", click);
    return () => {
      self.removeEventListener("resize", resize);
      self.removeEventListener("click", click);
    };
  }, []);

  return (<>
    <header className="header" ref={headerRef}>
      <h1 className={cx(menuOpen && "--hide")}>
        <Link href="/">{name}</Link>
      </h1>
      <nav className={cx(menuOpen && "--open")}>
        {links.map((link, i) => (
          <Link key={i} href={link.href}>
            <a className={cx(link.current && "--current")}>{link.text}</a>
          </Link>
        ))}
      </nav>
      <button
        className={cx(menuOpen && "--open")}
        aria-hidden={true}
        tabIndex={-1}
        onClick={() => setMenuOpen(!menuOpen)}
      ></button>
    </header>
  </>);
}
