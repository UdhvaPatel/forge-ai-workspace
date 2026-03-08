import { Home, Layers, Grid3X3, Settings, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Layers, label: "My Blueprints", path: "/blueprints" },
  { icon: Grid3X3, label: "Tool Directory", path: "/tools" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 glass-panel z-30 flex flex-col items-center py-6 gap-2">
      {/* Logo */}
      <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
        <div className="w-4 h-4 rounded-sm bg-primary animate-pulse-glow" />
      </button>

      {/* New forge button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors text-primary"
        title="New Forge"
      >
        <Plus size={16} />
      </button>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative w-10 h-10 rounded-lg flex items-center justify-center group transition-colors"
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-primary/10 glow-border-teal"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={`relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
                size={18}
              />
              {isActive && (
                <motion.div
                  layoutId="sidebar-glow"
                  className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-5 bg-primary rounded-full"
                  style={{ boxShadow: "0 0 8px hsl(168 100% 48% / 0.6)" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xs text-muted-foreground font-mono">A</span>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
