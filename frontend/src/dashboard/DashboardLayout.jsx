import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Image,
  Layers,
  Mail,
  Dock,
  User,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { to: "/dashboard/gallery", label: "Gallery", icon: Image },
  { to: "/dashboard/tech-stack", label: "Tech Stack", icon: Layers },
  { to: "/dashboard/messages", label: "Messages", icon: Mail },
  { to: "/dashboard/resume", label: "Resume", icon: Dock },
  { to: "/dashboard/about", label: "About", icon: User },
];

const DashboardLayout = () => {
  return (
    <div className="h-screen flex bg-linear-to-br from-neutral-900 via-black to-neutral-900 text-white">
      
      {/* Sidebar */}
      <aside className="w-72 p-6 border-r border-white/10 backdrop-blur-xl bg-white/5 relative">
        
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Admin<span className="text-indigo-400">Panel</span>
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Portfolio CMS
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex flex-col bg-transparent">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-white/15 shadow-lg ring-1 ring-white/20"
                    : "hover:bg-white/10 text-white/70 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition" />
              <span className="font-medium tracking-wide">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 text-xs text-white/40">
          © {new Date().getFullYear()} Portfolio Admin
        </div>
      </aside>

      {/* Main Content */}
       <main className="flex-1 p-8 overflow-y-auto bg-linear-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
