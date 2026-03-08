import { motion } from "framer-motion";
import Sparkline from "./Sparkline";

export interface ToolData {
  id: string;
  ai_name: string;
  primary_domain: string;
  popularity: number[];
  description: string;
}

interface ToolCardProps {
  tool: ToolData;
  index: number;
  onAdd?: (tool: ToolData) => void;
}

const ToolCard = ({ tool, index, onAdd }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="glass-panel rounded-xl p-4 cursor-pointer group transition-shadow hover:glow-teal"
      onClick={() => onAdd?.(tool)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {tool.ai_name}
          </h3>
          <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
            {tool.primary_domain}
          </span>
        </div>
        <div className="ml-3 flex flex-col items-end">
          <span className="text-[10px] text-muted-foreground mb-1">Popularity</span>
          <Sparkline data={tool.popularity} />
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {tool.description}
      </p>
      <div className="mt-3 flex items-center justify-end">
        <span className="text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
          + Add to Stack →
        </span>
      </div>
    </motion.div>
  );
};

export default ToolCard;
