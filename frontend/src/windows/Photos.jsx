import { WindowControls } from "#components";
import { photosLinks } from "#constants"; // keep dummy sidebar
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Mail, Search } from "lucide-react";
import { useEffect } from "react";
import usePhotoStore from "../store/photos"; // your Zustand store

const Photos = () => {
  const { openWindow } = useWindowStore();
  const { photos, loadPhotos } = usePhotoStore();

  // Load gallery images from API
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return (
    <>
      <div id="window-header">
        <WindowControls target={"photos"} />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full">
        {/* Sidebar - keep dummy */}
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map((item) => (
              <li key={item.id}>
                <img src={item.icon} alt={item.title} />
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery - dynamic from API */}
       <div className="gallery flex-1 p-4 overflow-y-auto">
          <ul className="flex flex-wrap">
            {photos.map(({ _id, url, title }) => (
              <li
                key={_id}
                onClick={() =>
                  openWindow("imgfile", {
                    id: _id,
                    name: title || "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: url,
                  })
                }
                className="flex flex-col items-center m-2 w-20 cursor-pointer"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition">
                  <img src={url} alt={title} className="object-cover w-full h-full" />
                </div>
                <p className="text-xs text-center truncate w-full mt-1">{title || "Gallery image"}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotoWindow = WindowWrapper(Photos, "photos");
export default PhotoWindow;
