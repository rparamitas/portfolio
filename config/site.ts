interface listPage {
  title: string;
  url: string;
}

export const siteConfig = {
  name: "Rahmita Paramita Sudirman",
  url: "https://rahmita.my.id",
  description: "Personal website",
  author: "Rahmita Paramita Sudirman",
  email: "rparamitas@gmail.com",
  links: {
    instagram: "https://www.instagram.com/rahmitaaps/",
    linkedin: "https://www.linkedin.com/in/rahmita-paramita-763822154/",
    // TODO: replace with the real number — digits only, country code, no leading "+".
    whatsapp: "https://wa.me/6285110517036",
    maps: "https://maps.app.goo.gl/wRw4grjyeUpgTi5aA",
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
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  // TODOS
  // {
  //   title: "Contact",
  //   url: "/contact",
  // },
];
