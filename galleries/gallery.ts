export interface Gallery {
  title?: string;
  subtitle?: string;
  pageTitle?: string;
  desc?: string;
  items: GalleryItem[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  id?: string;
  text?: string;
  subtext?: string;
  href?: string;
  objectPos?: string;
}
