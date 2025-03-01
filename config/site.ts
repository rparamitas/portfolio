interface listPage {
  title: string;
  url: string;
}

export const siteConfig = {
  name: "Rahmita Paramita Sudirman",
  url: "https://rahmita.my.id",
  description: "Personal website",
  author: "Rahmita Paramita Sudirman",
  links: {
    instagram: "https://www.instagram.com/rahmitaaps/",
    linkedin: "https://www.linkedin.com/in/rahmita-paramita-763822154/",
  },
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
