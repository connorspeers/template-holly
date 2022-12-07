import type { Gallery } from "./gallery";

export const arizona: Gallery = {
  title: "Arizona",
  subtitle: "Cactii and sunshine",
  desc: "Photos from a trip I took to Arizona in Spring 2022.",
  items: [{
    id: "me",
    src: "/media/arizona/me.webp",
    alt: "Me, standing on a rock high up in the mountains surrounding Mt. Lemmon. Only the cloudless sky is visible in the background",
    objectPos: "center top",
  }, {
    id: "valley",
    src: "/media/arizona/valley.webp",
    alt: "A shallow valley river in the middle of the desert. The hills carved by the river are speckled with cactii and other desert vegetation",
    objectPos: "right center",
  }, {
    id: "hut",
    src: "/media/arizona/hut.webp",
    alt: "A hut carved into a stacked rock structure in the mountains. There's a window for taking photos",
    objectPos: "center top",
  }, {
    id: "burrito",
    src: "/media/arizona/burrito.webp",
    alt: "A tinfoil wrapped burrito I ate in New Mexico on the trip down",
    objectPos: "left bottom",
  }, {
    id: "branches",
    src: "/media/arizona/branches.webp",
    alt: "Branches of a desert plant reaching into the sky, covered in leaves and tipped with conical bunches of flowers. The viewing angle is up from the ground towards the sun",
  }, {
    id: "eggplant",
    src: "/media/arizona/eggplant.webp",
    alt: "A suspiciously shaped cactus plopped over on the ground, with flowers coming out of the end of it",
    objectPos: "right center",
  }]
}
