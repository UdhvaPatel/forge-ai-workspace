import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Download, Share2, ArrowRight, X, Bot } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import DashboardSidebar from "@/components/DashboardSidebar";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";

interface Blueprint {
  id: string;
  name: string;
  tools: string[];
  createdAt: string;
  description: string;
}

const MOCK_BLUEPRINTS: Blueprint[] = [
  { id: "1", name: "AI Chatbot Stack", tools: ["LangChain", "Pinecone", "OpenAI API", "Redis"], createdAt: "2026-03-05", description: "Full conversational AI pipeline with memory and retrieval." },
  { id: "2", name: "Image Gen Pipeline", tools: ["Stable Diffusion", "Replicate", "Cloudinary"], createdAt: "2026-03-02", description: "End-to-end image generation with hosting and CDN." },
  { id: "3", name: "Data Analytics Suite", tools: ["Apache Spark", "dbt", "Snowflake", "Metabase"], createdAt: "2026-02-28", description: "Modern data stack for analytics and business intelligence." },
];

const Blueprints = () => {
  const [blueprints] = useState<Blueprint[]>(MOCK_BLUEPRINTS);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const { toast } = useToast();
  const isEmpty = blueprints.length === 0;

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <GridBackground />
      <DashboardSidebar />

      <div className="ml-16 h-screen flex flex-col relative z-10">
        <AppHeader />

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-2xl font-bold metallic-text mb-1">My Blueprints</h1>
              <p className="text-sm text-muted-foreground">Your saved AI tool workflows</p>
            </motion.div>

            {isEmpty ? (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-2xl glass-panel flex items-center justify-center mb-6"
                >
                  <Bot size={40} className="text-muted-foreground/40" />
                </motion.div>
                <h2 className="text-lg font-semibold text-foreground mb-2">No blueprints yet</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Your forged tool stacks will appear here. Start a conversation to build your first workflow.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = "/dashboard"}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 glow-teal"
                >
                  Start Forging <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            ) : (
              /* Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blueprints.map((bp, i) => (
                  <motion.div
                    key={bp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedBlueprint(bp)}
                    className="glass-panel rounded-xl p-5 cursor-pointer group hover:glow-teal transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <FolderOpen size={20} className="text-primary" />
                      <span className="text-[10px] font-mono text-muted-foreground">{bp.createdAt}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{bp.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{bp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bp.tools.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blueprint detail modal */}
      <AnimatePresence>
        {selectedBlueprint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedBlueprint(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{selectedBlueprint.name}</h2>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{selectedBlueprint.createdAt}</p>
                </div>
                <button onClick={() => setSelectedBlueprint(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{selectedBlueprint.description}</p>

              {/* Timeline */}
              <div className="relative pl-6 mb-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent" />
                {selectedBlueprint.tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative mb-4 last:mb-0"
                  >
                    <div className="absolute -left-[18px] top-2 w-3 h-3 rounded-full border-2 border-primary bg-background" />
                    <div className="glass-panel rounded-lg p-3">
                      <span className="text-sm font-medium text-foreground">{tool}</span>
                      <span className="text-[10px] text-muted-foreground ml-2 font-mono">Step {i + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toast({ title: "Exported!", description: "Blueprint PDF downloaded." })}
                  className="flex-1 py-2 rounded-xl glass-panel text-sm text-foreground flex items-center justify-center gap-2 hover:bg-muted/30 transition-colors"
                >
                  <Download size={14} /> Export PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { navigator.clipboard.writeText(`Blueprint: ${selectedBlueprint.name}`); toast({ title: "Link copied!", description: "Share link copied to clipboard." }); }}
                  className="flex-1 py-2 rounded-xl glass-panel text-sm text-foreground flex items-center justify-center gap-2 hover:bg-muted/30 transition-colors"
                >
                  <Share2 size={14} /> Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blueprints;
