import { Dock, Home, Navbar, Welcome } from "#components";
import {
  Finder,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
  Contact,
  Photos,
  Query,
} from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useProjects from "./hooks/useProjects";
import BarLoader from "./components/BarLoader";
import { useEffect } from "react";
import api from "./lib/axios";
import CookieConsent from "./components/CookieConsent";

gsap.registerPlugin(Draggable);

const App = () => {
  const loading = useProjects();

  useEffect(() => {
    api.post("/visit").catch(() => {});
  }, []);

  if (loading) {
    return <BarLoader />;
  }
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Query />

      <Home />

      <CookieConsent />
    </main>
  );
};

export default App;
