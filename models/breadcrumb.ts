export interface Breadcrumb {
  text: string;
  url?: string;   // If no URL, assumes text is associated with current url
}