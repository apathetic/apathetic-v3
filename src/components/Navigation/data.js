// @flow
export type NavigationItem = {|
  title: string,
  path: string
|};

export const navItems: Array<NavigationItem> = [
  {
    title: "About",
    path: "/about"
  },
  {
    title: "Work",
    path: "/work"
  },
  {
    title: "Contact",
    path: "/contact"
  }
];