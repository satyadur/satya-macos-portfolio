import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // 🔥 dynamic children from API
    workChildren: locations.work.children || [],

    setWorkChildren: (children) =>
      set((state) => {
        state.workChildren = children;

        // keep Finder + Sidebar in sync
        if (state.activeLocation?.type === "work") {
          state.activeLocation.children = children;
        }
      }),

    setActiveLocation: (location) =>
      set((state) => {
        if (!location) return;

        // inject API projects when opening Work
        if (location.type === "work") {
          state.activeLocation = {
            ...location,
            children: state.workChildren,
          };
        } else {
          state.activeLocation = location;
        }
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = {
          ...DEFAULT_LOCATION,
          children: state.workChildren,
        };
      }),
  }))
);

export default useLocationStore;
