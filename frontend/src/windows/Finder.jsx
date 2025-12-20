import { useEffect } from "react";
import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Search } from "lucide-react";
import useAboutStore from "../store/about";

const Finder = () => {
  const workChildren = useLocationStore((s) => s.workChildren);
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const { about, loadAbout } = useAboutStore();

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  const aboutChildren = about
    ? [
        {
          id: "about-me-text",
          name: "about-me.txt",
          kind: "file",
          fileType: "txt",
          icon: "/images/txt.png",
           image: about.images[0].url,
          subtitle: about.subtitle,
          description: about.description,
        },
        ...about.images.map((img, index) => ({
          id: `about-image-${index}`,
          name: img.key + ".png",
          kind: "file",
          fileType: "img",
          icon: img.url,
          imageUrl: img.url,
          position: `top-${10 + index * 20} left-${5 + index * 20}`,
        })),
      ]
    : [];

  const finderLocations = {
    ...locations,
    about: {
      ...locations.about,
      children: aboutChildren,
    },
  };

  const openItem = (item) => {
    if (item.kind === "folder") return setActiveLocation(item);
    if (item.fileType === "pdf") return openWindow("resume");
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div className="mb-4">
      <h3 className="text-gray-500 uppercase text-xs font-semibold mb-2">{name}</h3>
      <ul>
        {Object.values(items).map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation?.id
                ? "bg-blue-100 rounded p-1"
                : "hover:bg-gray-100 rounded p-1",
              "flex items-center space-x-2 cursor-pointer mb-1 transition-colors duration-200"
            )}
          >
            <img src={item.icon} className="w-5 h-5" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b shadow-sm">
        <WindowControls target={"finder"} />
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Main Finder */}
      <div className="flex h-full bg-white">
        {/* Sidebar */}
        <div className="w-52 border-r border-gray-200 p-3 bg-gray-50 overflow-y-auto">
          {renderList("Favorites", finderLocations)}
          {renderList("My Projects", workChildren)}
        </div>

        {/* Content */}
        <ul className="flex-1 p-4 grid grid-cols-4 gap-4 overflow-y-auto">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
              onClick={() => openItem(item)}
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={
                    item.kind === "file" && item.fileType === "img"
                      ? item.imageUrl
                      : item.icon
                  }
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-xs text-center truncate w-20">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
