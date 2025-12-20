import api from "../lib/axios";

export const fetchAbout = async () => {
  const { data } = await api.get("/about");
  return data;
};
