import { cx } from "../lib/util";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Expand } from "../components/expand";
import { Layout } from "../components/layout";
import { useRouter } from "next/router";
import type { NextPage, GetServerSideProps } from "next";
import { 
  type Gallery,
  type GalleryItem,
  galleries,
} from "../galleries";

export const getServerSideProps: GetServerSideProps = async ctx => {
  let { gallery } = ctx.query;
  gallery = (
    Array.isArray(gallery) ? gallery[0]
    : !gallery ? ""
    : gallery
  );

  return (
    !galleries.has(gallery) ? { notFound: true }
    : { props: galleries.get(gallery)! }
  );
};

export const GalleryPage: NextPage<Gallery> = ({
  title, pageTitle,  subtitle,
  items, desc,
}) => {
  const { pathname } = useRouter();
  const [expand, setExpand] = useState<{
    i: number;
    item: GalleryItem;
    loaded: boolean;
    node: HTMLImageElement;
    imgDims: {
      width: number;
      height: number;
      top: number;
      left: number;
      naturalWidth: number;
      naturalHeight: number;
    };
  } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const closeExpand = () => {
    if (!expand) {
      return;
    }
    const url = new URL(self.location.href);
    url.hash = "";
    self.history.replaceState("", document.title, url.href);
    document.body.style.overflow = "auto";
    setExpand(null);
  };

  const openExpand = (i: number, item: GalleryItem, node: HTMLImageElement) => {
    const id = items[i].id ?? i.toString();
    const url = new URL(self.location.href);
    url.hash = `#${id}`;
    self.history.replaceState("", document.title, url.href);
    document.body.style.overflow = "hidden";
    const rect = node.getBoundingClientRect();
    setExpand({
      i,
      item,
      loaded: false,
      node,
      imgDims: {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        naturalHeight: node.naturalHeight,
        naturalWidth: node.naturalWidth,
      },
    });
  };

  const resize = () => {
    if (!expand) {
      return;
    }
    const rect = expand.node.getBoundingClientRect();
    setExpand({
      ...expand,
      imgDims: {
        ...expand.imgDims,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
      },
    });
  };

  useEffect(() => {
    self.addEventListener("popstate", closeExpand);
    self.addEventListener("resize", resize);
    return () => {
      self.removeEventListener("popstate", closeExpand);
      self.removeEventListener("resize", resize);
    };
  });

  // Because I'm preventing overscroll on the root element to keep the layout
  // consistent on ios, the body needs to be scrolled to the top when a gallery
  // is opened. (NextJS only auto scrolls the root element by default on page
  // switch)
  useEffect(() => document.body.scrollTo(0, 0), [pathname]);

  return (<>
    {expand && (
      <Expand
        {...expand}
        onLoad={() => expand && setExpand({ ...expand, loaded: true })}
        onLeave={() => expand && setExpand({ ...expand, loaded: false })}
        onClose={() => closeExpand()}
      />
    )}
    <Layout
      title={pageTitle ?? title}
      desc={desc}
      slug="work"
      pageRef={pageRef}
      className={cx("gallery", expand && expand.loaded && "--blurred")}
    >
      {title && <h2>{title}</h2>}
      {subtitle && <h3>{subtitle}</h3>}
      <div className="gallery-items">
        {items.map((item, i) => (
          <Link key={i} href={item.href ?? `#${item.id ?? i}`}>
            <a
              id={item.id ?? i.toString()}
              onClick={item.href ? undefined : (evt) => {
                evt.preventDefault();
                if (expand) {
                  return;
                }
                let target = evt.target as HTMLElement;
                while (!(target instanceof HTMLAnchorElement)) {
                  target = target.parentNode as HTMLElement;
                }
                const node = target.querySelector("img")!;
                openExpand(i, item, node);
              }}
            >
              <div
                className={cx(
                  "gallery-image",
                  expand && expand.i === i && "--hide",
                )}
              >
                {/* I chose not to use the <Image /> component because it's a PITA to get the image naturalWidth/Height as well as position from it and keep them in sync with the expand component. */}
                <img
                  ref={node => {
                    if (
                      expand && expand.i === i &&
                      node && expand.node !== node
                    ) {
                      setExpand({ ...expand, node });
                    }
                  }}
                  src={item.src}
                  alt={item.alt}
                  style={{ objectPosition: item.objectPos }}
                />
              </div>
              {item.text && (
                <h2 className="gallery-text">{item.text}</h2>
              )}
              {item.subtext && (
                <h3 className="gallery-subtext">{item.subtext}</h3>
              )}
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  </>);
};

export default GalleryPage;
