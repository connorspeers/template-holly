import type { NextPage } from "next";
import { GalleryPage } from "./[gallery]";
import { tagline } from "./about";
import { galleries } from "../galleries";

export const RootPage: NextPage = () => {
  return (<>
    <GalleryPage
      title={tagline}
      pageTitle={""}
      desc="Holly is a minimalist web template for photography portfolios."
      items={Array.from(galleries.entries()).map(item => ({
        ...item[1].items[0],
        text: item[1].title,
        subtext: undefined,
        href: `/${item[0]}`,
      }))}
    />
  </>);
};

export default RootPage;
