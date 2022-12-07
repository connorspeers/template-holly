import type { Gallery } from "./gallery";

export const nyc: Gallery = {
  title: "NYC",
  subtitle: "The big apple",
  desc: "Photos I took during a trip to New York City.",
  items: [{
    id: "brooklyn",
    src: "/media/nyc/brooklyn.webp",
    alt: "Flag waving in the wind, taken while walking over the Brooklyn bridge",
  }, {
    id: "drain",
    src: "/media/nyc/drain.webp",
    alt: "'City of New York' storm drain cover",
  }, {
    id: "dumbo",
    src: "/media/nyc/dumbo.webp",
    alt: "The Brooklyn bridge viewed from that street in Dumbo where the tourists gather",
  }, {
    id: "junction",
    src: "/media/nyc/junction.webp",
    alt: "Tiled subway wall with the labels 'junction' and 'broadway'",
    objectPos: "left center",
  }, {
    id: "one",
    src: "/media/nyc/one.webp",
    alt: "One World Trade Center",
    objectPos: "center top",
  }, {
    id: "progress",
    src: "/media/nyc/progress.webp",
    alt: "Sculpture in progress facing away from the camera somewhere in the heart of NYC",
    objectPos: "right center",
  }],
}
