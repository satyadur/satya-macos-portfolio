export const mapAboutToFinder = (about) => {
  if (!about) return null;

  const img = (key) =>
    about.images.find((i) => i.key === key)?.url;

  return {
    id: 2,
    type: "about",
    name: about.title,
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-10 left-5",
        imageUrl: img("me"),
      },
      {
        id: 2,
        name: "casual-me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-28 right-72",
        imageUrl: img("casual"),
      },
      {
        id: 3,
        name: "conference-me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-52 left-80",
        imageUrl: img("conference"),
      },
      {
        id: 4,
        name: "about-me.txt",
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-60 left-5",
        subtitle: about.subtitle,
        image: img("me"),
        description: about.description,
      },
    ],
  };
};
