import type { Gallery } from "./gallery";

export const michigan: Gallery = {
  title: "Michigan",
  subtitle: "Post cards from the mitten state",
  desc: "Photos I've taken from all over Michigan.",
  items: [{
    id: "bridge",
    src: "/media/michigan/bridge.webp",
    alt: "Photo taken from inside a car going over the Mackinac Bridge",
    objectPos: "left center"
  }, {
    id: "church",
    src: "/media/michigan/church.webp",
    alt: "St. Ann's Church on Mackinac Island",
    objectPos: "center top",
  }, {
    id: "vines",
    src: "/media/michigan/vines.webp",
    alt: "Orange door of a house through a front archway covered with vines",
  }, {
    id: "cabin",
    src: "/media/michigan/cabin.webp",
    alt: "Rustic cabin in northern michigan",
  }, {
    id: "saw",
    src: "/media/michigan/saw.webp",
    alt: "Cardboard man with large saw, part of a logging museum",
    objectPos: "center top",
  }],
};
