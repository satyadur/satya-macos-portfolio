import { create } from "zustand";
import { fetchAbout } from "../api/about";

const useAboutStore = create((set) => ({
  about: null,
  loadAbout: async () => {
    const data = await fetchAbout();
    set({ about: data });
  },
}));

export default useAboutStore;
