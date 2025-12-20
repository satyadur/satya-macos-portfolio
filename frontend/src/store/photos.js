import { create } from "zustand";
import api from "../lib/axios";

const usePhotoStore = create((set) => ({
  photos: [],
  loadPhotos: async () => {
    const { data } = await api.get("/gallery");
    set({ photos: data });
  },
  addPhoto: (photo) => set((state) => ({ photos: [photo, ...state.photos] })),
}));

export default usePhotoStore;
