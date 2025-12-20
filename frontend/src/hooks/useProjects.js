import { useEffect, useState } from "react";
import useLocationStore from "#store/location";
import api from "../lib/axios";
import { mapProjectsToFinder } from "../utils/mapProjectsToFinder";

const useProjects = () => {
  const setWorkChildren = useLocationStore((s) => s.setWorkChildren);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        setWorkChildren(mapProjectsToFinder(res.data));
      } catch (err) {
        console.error("PROJECT FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [setWorkChildren]);

  return loading;
};

export default useProjects;
