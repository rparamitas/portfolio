interface listPage {
  title: string;
  url: string;
}

export const siteConfig = {
  name: "Rahmita Paramita Sudirman",
  url: "https://localhost:3000",
  description: "Personal website",
  author: "Rahmita Paramita Sudirman",
};

export const listPage: listPage[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  // TODOS
  // {
  //   title: "Projects",
  //   url: "/projects",
  // },
  // {
  //   title: "Contact",
  //   url: "/contact",
  // },
];
