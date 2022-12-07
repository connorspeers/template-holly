import type { GalleryItem } from "../galleries";
import { useState, useRef, useEffect } from "react";
import { cx } from "../lib/util";

// TODO: A lot of the animation stuff I do here (and elsewhere) can probably be
// done easier using framer motion: https://www.framer.com/motion/

const animationDuration = 250;
const expandMaxWidth = 0.9;
const expandMaxHeight = 0.85;
const transition = `all ${animationDuration}ms`;
const boxShadow = "0 0 0 0.5px #0005";

export interface ExpandProps {
  item: GalleryItem;
  imgDims: {
    width: number;
    height: number;
    top: number;
    left: number;
    naturalWidth: number;
    naturalHeight: number;
  };
  onLoad: () => void;
  onLeave: () => void;
  onClose: () => void;
}

type State = "init" | "expand" | "magnify";
type Style = Record<string, string | number>;

export function Expand({
  item,
  imgDims: dims,
  onLoad,
  onLeave,
  onClose,
}: ExpandProps) {
  const expandRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("init");
  const [imageStyle, setImageStyle] = useState<Style>({
    position: "fixed",
    width: dims.width,
    height: dims.height,
    top: dims.top,
    left: dims.left,
    transition,
  });

  const init = () => {
    setState("init");
    setImageStyle({
      position: "fixed",
      width: dims.width,
      height: dims.height,
      top: dims.top,
      left: dims.left,
      transition,
    });
  };

  const expand = () => {
    setState("expand");
    const vw = expandMaxWidth * document.documentElement.clientWidth;
    const vh = expandMaxHeight * document.documentElement.clientHeight;
    const widthRatio = 1 + (vw - dims.naturalWidth) / dims.naturalWidth;
    const heightRatio = (
      1 + (vh - dims.naturalHeight) / dims.naturalHeight
    );
    // If matching the expand viewport width causes overflow outside of viewport
    // height, use the height ratio. If not, use the width ratio.
    const ratio = (
      widthRatio * dims.naturalHeight > vh ? heightRatio
      : widthRatio
    );
    const width = ratio * dims.naturalWidth;
    const height = ratio * dims.naturalHeight;
    const style = {
      position: "fixed",
      width,
      height,
      top: (document.documentElement.clientHeight - height) / 2,
      left: (document.documentElement.clientWidth - width) / 2,
      transition,
      cursor: "zoom-in",
      boxShadow,
    };
    setImageStyle(style);
    setTimeout(() => {
      setImageStyle({ ...style, position: "absolute" });
    }, animationDuration);
  };

  const magnify = () => {
    setState("magnify");
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const widthRatio = 1 + (vw - dims.naturalWidth) / dims.naturalWidth;
    const heightRatio = (
      1 + (vh - dims.naturalHeight) / dims.naturalHeight
    );
    // If matching the expand viewport width causes overflow outside of viewport
    // height, use the width ratio. If not, use the height ratio.
    const ratio = (
      widthRatio * dims.naturalHeight > vh ? widthRatio
      : heightRatio
    );
    setImageStyle({
      position: "absolute",
      width: dims.naturalWidth * ratio,
      height: dims.naturalHeight * ratio,
      top: 0,
      left: 0,
      transition,
      cursor: "zoom-out",
      boxShadow,
    });
  };

  const demagnify = () => {
    const scrollTop = expandRef.current!.scrollTop;
    const scrollLeft = expandRef.current!.scrollLeft;
    setImageStyle({
      ...imageStyle,
      position: "fixed",
      top: -1 * scrollTop,
      left: -1 * scrollLeft,
      transition: "none",
    });
    setTimeout(() => expand(), 0);
  };

  const leave = () => {
    init();
    onLeave();
    setTimeout(() => onClose(), animationDuration);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const resize = () => {
      clearTimeout(timer ?? -1);
      timer = setTimeout(() => {
        switch (state) {
          case "init": init(); break;
          case "expand": expand(); break;
          case "magnify": magnify(); break;
          default:
        }
      }, 100);
    };
    self.addEventListener("resize", resize);
    return () => {
      self.removeEventListener("resize", resize);
    };
  });

  return (<>
    <div className="expand" ref={expandRef}>
      <div className="expand-underlay" onClick={leave}></div>
      <div
        className="expand-image"
        style={imageStyle}
        onClick={
          state === "init" ? expand
          : state === "expand" ? magnify
          : demagnify
        }
      >
        {(item.text || item.subtext) && (
          <div className={cx("expand-desc", state === "expand" && "--show")}>
            {item.text && <h2>{item.text}</h2>}
            {item.subtext && <h3>{item.subtext}</h3>}
          </div>
        )}
        <img
          src={item.src}
          alt={item.alt}
          style={{ objectPosition: item.objectPos }}
          onLoad={() => setTimeout(() => requestAnimationFrame(() => {
            onLoad();
            expand();
          }), 0)}
        />
        <button
          className={cx(state === "expand" && "--show")}
          onClick={evt => {
            evt.preventDefault();
            evt.stopPropagation();
            leave();
          }}
        ></button>
      </div>
    </div>
  </>);
}
