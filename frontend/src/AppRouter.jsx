import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

// Dashboard pages
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/pages/DashboardHome";
import ProjectsPage from "./dashboard/pages/ProjectsPage";
import BlogsPage from "./dashboard/pages/BlogsPage";
import GalleryPage from "./dashboard/pages/GalleryPage";
import TechStackPage from "./dashboard/pages/TechStackPage";
import MessagesPage from "./dashboard/pages/MessagesPage";
import ResumePage from "./dashboard/pages/ResumePage";
import AboutDashboard from "./dashboard/pages/AboutPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* macOS Portfolio */}
        <Route path="/" element={<App />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="tech-stack" element={<TechStackPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="about" element={<AboutDashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
