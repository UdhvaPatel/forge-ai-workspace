import { Bell, Search } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="h-14 glass-panel border-b border-border flex items-center justify-between px-6 z-20 relative">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold metallic-text tracking-tight">
          StackForge AI
        </h1>
        <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
          v0.1
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
          <Search size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
            <span className="text-[11px] font-medium text-foreground">A</span>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">Architect</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
