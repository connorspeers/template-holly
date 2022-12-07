import type { Gallery } from "./gallery";

export const random: Gallery = {
  title: "Random",
  subtitle: "I closed my eyes while picking these",
  desc: "Random photos from my photo albums.",
  items: [{
    id: "juicy",
    src: "/media/random/juicy.webp",
    alt: "Closeup of strawberries and kiwis reducing in a pot",
    text: "Juicy jam",
    subtext: "It wasn't very good tbh",
    objectPos: "center bottom",
  }, {
    id: "gold",
    src: "/media/random/gold.webp",
    alt: "Small dog looking directly into the camera with a curious face",
    text: "Gold",
    subtext: "Zoomies abound",
  }, {
    id: "sammy",
    src: "/media/random/sammy.webp",
    alt: "Fat cat balancing on the back of a chair",
    text: "Sammy",
    subtext: "Many folds, much grip",
    objectPos: "center 30%",
  }, {
    id: "headstone",
    src: "/media/random/headstone.webp",
    alt: "A photo of a really old headstone embedded in the ground at a cemetary in the summer",
    text: "Estella",
    subtext: "RIP",
  }, {
    id: "rage",
    src: "/media/random/rage.webp",
    alt: "Rage room window surrounded by graffiti artwork",
    text: "My happy place",
    subtext: "Nerd smash",
  }],
}
