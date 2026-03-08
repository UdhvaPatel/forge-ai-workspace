import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";
import type { ToolData } from "./ToolCard";
import { useToast } from "@/hooks/use-toast";

interface StackViewerProps {
  stack: ToolData[];
  onRemove: (id: string) => void;
}

const StackViewer = ({ stack, onRemove }: StackViewerProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Workflow Saved ✨",
      description: `Blueprint with ${stack.length} tools has been saved.`,
    });
  };

  return (
    <aside className="w-72 glass-panel rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Your Stack</h2>
          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
            {stack.length} tools selected
          </p>
        </div>
        {stack.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <Save size={12} />
            Save
          </motion.button>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto scrollbar-thin relative">
        {stack.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-3">
              <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30" />
            </div>
            <p className="text-xs text-muted-foreground">
              Click cards to add tools<br />to your workflow
            </p>
          </div>
        )}

        {/* Vertical line */}
        {stack.length > 0 && (
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent" />
        )}

        <AnimatePresence mode="popLayout">
          {stack.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="relative pl-8 mb-3 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-1.5 top-3 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />

              <div className="glass-panel rounded-lg p-3 border border-border hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{tool.ai_name}</p>
                    <span className="text-[9px] font-mono text-secondary">{tool.primary_domain}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemove(tool.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive ml-2"
                  >
                    <X size={12} />
                  </button>
                </div>
                {/* Connection line text */}
                {i < stack.length - 1 && (
                  <div className="absolute left-2.5 -bottom-1.5 text-[8px] text-primary/40 font-mono">↓</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default StackViewer;
