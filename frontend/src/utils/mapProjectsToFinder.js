const DEFAULT_PROJECT_ICON = "/images/folder.png";
const POSITIONS = [
  "top-5 left-10",
  "top-[7.5rem] left-10",

  "top-5 left-56",
  "top-[7.5rem] left-36",

  "top-5 left-64",
  "top-[7.5rem] left-64",

  "top-5 left-96",
  "top-[7.5rem] left-96",

  "top-5 left-[30rem]",
  "top-[7.5rem] left-[30rem]",
];

export const mapProjectsToFinder = (projects = []) => {
  return projects.map((project, index) => ({
    id: project._id,
    name: project.title,
    icon: DEFAULT_PROJECT_ICON,

    kind: "folder",
    fileType: "folder",

    // Finder grid positioning
    position: POSITIONS[index % POSITIONS.length],

    // Desktop window position
    windowPosition: project.windowPosition || "top-[5vh] left-5",

    children: [
      // 📄 Description TXT file
      project.description?.length > 0 && {
        id: `${project._id}-txt`,
        name: `${project.title}.txt`,
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-5 left-10",
        description: project.description,
      },

      // 🌐 Live URL
      project.liveUrl && {
        id: `${project._id}-live`,
        name: "Live Preview",
        icon: "/images/safari.png",
        kind: "file",
        fileType: "url",
        href: project.liveUrl,
        position: "top-10 right-20",
      },

      // 🎥 Video URL
      project.videoUrl && {
        id: `${project._id}-video`,
        name: "Demo Video",
        icon: "/images/video.png",
        kind: "file",
        fileType: "url",
        href: project.videoUrl,
        position: "top-42 right-40",
      },

      // 🖼 Project Image (Cloudinary)
      project.thumbnail?.url && {
        id: `${project._id}-image`,
        name: `${project.title}.png`,
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        imageUrl: project.thumbnail.url,
        position: "top-52 right-80",
      },

      // 🎨 Design file (optional)
      project.designUrl && {
        id: `${project._id}-figma`,
        name: "Design.fig",
        icon: "/images/plain.png",
        kind: "file",
        fileType: "fig",
        href: project.designUrl,
        position: "top-60 right-20",
      },
    ].filter(Boolean),
  }));
};
