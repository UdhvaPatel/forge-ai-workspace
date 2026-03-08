import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ExternalLink, X, ChevronDown } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import DashboardSidebar from "@/components/DashboardSidebar";
import AppHeader from "@/components/AppHeader";
import Sparkline from "@/components/Sparkline";

interface Tool {
  id: string;
  ai_name: string;
  intelligence_type: string;
  primary_domain: string;
  popularity_votes: number;
  key_functionality: string;
  website_url: string;
  is_free: boolean;
  popularity: number[];
}

// Mock 20 tools
const ALL_TOOLS: Tool[] = [
  { id: "1", ai_name: "LangChain", intelligence_type: "Framework", primary_domain: "LLM Orchestration", popularity_votes: 9420, key_functionality: "Build composable chains and agents for LLM-powered applications with memory and tools.", website_url: "https://langchain.com", is_free: true, popularity: [20, 35, 50, 65, 80, 95, 88, 92] },
  { id: "2", ai_name: "Pinecone", intelligence_type: "Database", primary_domain: "Vector Database", popularity_votes: 8150, key_functionality: "Managed vector database for high-performance similarity search at any scale.", website_url: "https://pinecone.io", is_free: false, popularity: [10, 25, 40, 55, 70, 85, 90, 95] },
  { id: "3", ai_name: "Hugging Face", intelligence_type: "Platform", primary_domain: "Model Hub", popularity_votes: 12300, key_functionality: "Community platform for sharing, discovering, and deploying ML models.", website_url: "https://huggingface.co", is_free: true, popularity: [30, 45, 60, 72, 85, 90, 88, 93] },
  { id: "4", ai_name: "Weights & Biases", intelligence_type: "Platform", primary_domain: "MLOps", popularity_votes: 6800, key_functionality: "Experiment tracking, model management, and dataset versioning for ML teams.", website_url: "https://wandb.ai", is_free: false, popularity: [15, 30, 42, 58, 65, 72, 80, 85] },
  { id: "5", ai_name: "OpenAI API", intelligence_type: "API", primary_domain: "Language Model", popularity_votes: 15200, key_functionality: "Access GPT models for text generation, embeddings, and multimodal AI tasks.", website_url: "https://openai.com", is_free: false, popularity: [40, 55, 65, 78, 85, 90, 93, 97] },
  { id: "6", ai_name: "Ollama", intelligence_type: "Runtime", primary_domain: "Local LLM", popularity_votes: 7600, key_functionality: "Run open-source large language models locally on your machine.", website_url: "https://ollama.ai", is_free: true, popularity: [5, 15, 35, 55, 70, 80, 88, 92] },
  { id: "7", ai_name: "ChromaDB", intelligence_type: "Database", primary_domain: "Vector Database", popularity_votes: 5400, key_functionality: "Open-source embedding database for AI applications with simple API.", website_url: "https://trychroma.com", is_free: true, popularity: [8, 20, 38, 52, 65, 75, 82, 86] },
  { id: "8", ai_name: "Replicate", intelligence_type: "Platform", primary_domain: "Model Deployment", popularity_votes: 4900, key_functionality: "Run and fine-tune open-source models in the cloud with one line of code.", website_url: "https://replicate.com", is_free: false, popularity: [12, 28, 42, 55, 62, 70, 76, 80] },
  { id: "9", ai_name: "Anthropic Claude", intelligence_type: "API", primary_domain: "Language Model", popularity_votes: 11500, key_functionality: "Advanced AI assistant API with strong reasoning and safety alignment.", website_url: "https://anthropic.com", is_free: false, popularity: [10, 25, 45, 65, 80, 88, 92, 95] },
  { id: "10", ai_name: "Stable Diffusion", intelligence_type: "Model", primary_domain: "Image Generation", popularity_votes: 9800, key_functionality: "Open-source text-to-image model for generating high-quality visuals.", website_url: "https://stability.ai", is_free: true, popularity: [20, 50, 70, 85, 90, 88, 85, 82] },
  { id: "11", ai_name: "LlamaIndex", intelligence_type: "Framework", primary_domain: "Data Framework", popularity_votes: 6200, key_functionality: "Data framework for connecting custom data sources to large language models.", website_url: "https://llamaindex.ai", is_free: true, popularity: [5, 18, 35, 52, 68, 78, 85, 90] },
  { id: "12", ai_name: "Midjourney", intelligence_type: "Service", primary_domain: "Image Generation", popularity_votes: 14100, key_functionality: "AI-powered image generation through Discord with artistic style control.", website_url: "https://midjourney.com", is_free: false, popularity: [15, 40, 65, 85, 92, 95, 93, 90] },
];

const DOMAINS = [...new Set(ALL_TOOLS.map((t) => t.primary_domain))];

const ToolDirectory = () => {
  const [search, setSearch] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((t) => {
      if (search && !t.ai_name.toLowerCase().includes(search.toLowerCase()) && !t.primary_domain.toLowerCase().includes(search.toLowerCase())) return false;
      if (showFreeOnly && !t.is_free) return false;
      if (selectedDomains.length > 0 && !selectedDomains.includes(t.primary_domain)) return false;
      return true;
    });
  }, [search, showFreeOnly, selectedDomains]);

  const visible = filtered.slice(0, visibleCount);

  const toggleDomain = (d: string) => {
    setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <GridBackground />
      <DashboardSidebar />

      <div className="ml-16 h-screen flex flex-col relative z-10">
        <AppHeader />

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-2xl font-bold metallic-text mb-1">Tool Directory</h1>
              <p className="text-sm text-muted-foreground">Browse and discover from 19,329 AI tools</p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex gap-3"
            >
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools by name or domain..."
                  className="w-full glass-panel rounded-xl py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:glow-border-teal transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`glass-panel rounded-xl px-4 flex items-center gap-2 text-sm transition-colors ${showFilters ? "text-primary border-primary/30" : "text-muted-foreground"}`}
              >
                <Filter size={14} />
                Filters
                <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
            </motion.div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="glass-panel rounded-xl p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showFreeOnly}
                          onChange={(e) => setShowFreeOnly(e.target.checked)}
                          className="accent-primary"
                        />
                        Free only
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {DOMAINS.map((d) => (
                        <button
                          key={d}
                          onClick={() => toggleDomain(d)}
                          className={`text-[11px] px-2.5 py-1 rounded-full font-mono transition-colors ${
                            selectedDomains.includes(d)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "glass-panel text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <AnimatePresence mode="popLayout">
                {visible.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="perspective-1000"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      className="relative w-full h-48 cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: flippedCard === tool.id ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setFlippedCard(flippedCard === tool.id ? null : tool.id)}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 glass-panel rounded-xl p-4 flex flex-col justify-between hover:glow-teal transition-shadow"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-sm font-semibold text-foreground">{tool.ai_name}</h3>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${tool.is_free ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                              {tool.is_free ? "Free" : "Paid"}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-secondary">{tool.intelligence_type} · {tool.primary_domain}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-[10px] text-muted-foreground">Votes</span>
                            <p className="text-lg font-bold text-foreground">{tool.popularity_votes.toLocaleString()}</p>
                          </div>
                          <Sparkline data={tool.popularity} />
                        </div>
                      </div>

                      {/* Back */}
                      <div
                        className="absolute inset-0 glass-panel rounded-xl p-4 flex flex-col justify-between"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-foreground">{tool.ai_name}</h3>
                            <button onClick={(e) => { e.stopPropagation(); setFlippedCard(null); }} className="text-muted-foreground hover:text-foreground">
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tool.key_functionality}</p>
                        </div>
                        <a
                          href={tool.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <ExternalLink size={12} />
                          Visit Website
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="text-center pb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisibleCount((v) => v + 6)}
                  className="px-6 py-2.5 rounded-xl glass-panel text-sm text-foreground font-medium animate-pulse-glow"
                >
                  Load More ({filtered.length - visibleCount} remaining)
                </motion.button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No tools found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDirectory;
