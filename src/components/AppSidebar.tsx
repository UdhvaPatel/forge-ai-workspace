import { Home, Layers, Grid3X3, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Layers, label: "My Blueprints", id: "blueprints" },
  { icon: Grid3X3, label: "Tool Directory", id: "tools" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const AppSidebar = () => {
  const [active, setActive] = useState("home");

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 glass-panel z-30 flex flex-col items-center py-6 gap-2">
      {/* Logo mark */}
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
        <div className="w-4 h-4 rounded-sm bg-primary animate-pulse-glow" />
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
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
                className={`w-4.5 h-4.5 relative z-10 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                size={18}
              />
              {/* Glow indicator */}
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

      {/* Bottom avatar placeholder */}
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xs text-muted-foreground font-mono">U</span>
      </div>
    </aside>
  );
};

export default AppSidebar;
