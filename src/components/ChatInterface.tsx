import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import ToolCard, { type ToolData } from "./ToolCard";
import AlchemistLoading from "./AlchemistLoading";

// Mock tools for demo
const MOCK_TOOLS: Record<string, ToolData[]> = {
  default: [
    { id: "1", ai_name: "LangChain", primary_domain: "LLM Orchestration", popularity: [20, 35, 50, 65, 80, 95, 88, 92], description: "Framework for building applications powered by language models with composable chains and agents." },
    { id: "2", ai_name: "Pinecone", primary_domain: "Vector Database", popularity: [10, 25, 40, 55, 70, 85, 90, 95], description: "High-performance vector database for similarity search at scale with real-time updates." },
    { id: "3", ai_name: "Hugging Face", primary_domain: "Model Hub", popularity: [30, 45, 60, 72, 85, 90, 88, 93], description: "The AI community's platform for sharing and deploying machine learning models." },
    { id: "4", ai_name: "Weights & Biases", primary_domain: "MLOps", popularity: [15, 30, 42, 58, 65, 72, 80, 85], description: "Experiment tracking, model management, and dataset versioning for ML teams." },
  ],
  web: [
    { id: "5", ai_name: "Next.js", primary_domain: "Web Framework", popularity: [40, 55, 65, 78, 85, 90, 93, 97], description: "The React framework for production with hybrid static & server rendering." },
    { id: "6", ai_name: "Vercel", primary_domain: "Deployment", popularity: [30, 48, 60, 72, 82, 88, 92, 95], description: "Platform for frontend frameworks and static sites with edge functions." },
    { id: "7", ai_name: "Tailwind CSS", primary_domain: "Styling", popularity: [25, 45, 60, 75, 85, 90, 94, 96], description: "Utility-first CSS framework for rapidly building custom user interfaces." },
  ],
  data: [
    { id: "8", ai_name: "Apache Spark", primary_domain: "Data Processing", popularity: [60, 65, 68, 72, 75, 78, 80, 82], description: "Unified analytics engine for large-scale data processing and machine learning." },
    { id: "9", ai_name: "dbt", primary_domain: "Data Transform", popularity: [15, 30, 50, 65, 78, 85, 90, 93], description: "Analytics engineering tool that enables data analysts to transform data in their warehouse." },
    { id: "10", ai_name: "Snowflake", primary_domain: "Data Warehouse", popularity: [20, 40, 55, 70, 80, 88, 91, 94], description: "Cloud-native data platform for data warehousing, data lakes, and data sharing." },
  ],
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  tools?: ToolData[];
}

interface ChatInterfaceProps {
  onAddToStack: (tool: ToolData) => void;
}

const ChatInterface = ({ onAddToStack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (query: string) => {
    const q = query.toLowerCase();
    let tools = MOCK_TOOLS.default;
    let response = "Based on your requirements, I've identified these powerful tools for your AI workflow. Click any card to add it to your stack.";

    if (q.includes("web") || q.includes("frontend") || q.includes("website")) {
      tools = MOCK_TOOLS.web;
      response = "Here's a battle-tested web development stack. These tools work beautifully together for modern web applications.";
    } else if (q.includes("data") || q.includes("analytics") || q.includes("pipeline")) {
      tools = MOCK_TOOLS.data;
      response = "For data engineering, these are the industry's top choices. Each excels at a different stage of the data pipeline.";
    }

    return { response, tools };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowWelcome(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1500));

    const { response, tools } = simulateResponse(userMessage.content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      tools,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
        {/* Welcome */}
        <AnimatePresence>
          {showWelcome && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
                  <Sparkles className="text-primary" size={28} />
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-semibold metallic-text mb-2"
              >
                Welcome, Architect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-sm text-muted-foreground max-w-md leading-relaxed"
              >
                Describe the workflow you want to build, and I'll forge the perfect tool stack for you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex gap-2 mt-6"
              >
                {["Build an AI chatbot", "Web app stack", "Data pipeline"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full glass-panel text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors font-mono"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat messages */}
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`}
            >
              {msg.role === "user" ? (
                <div className="glass-panel rounded-2xl rounded-br-md px-4 py-2.5 max-w-md">
                  <p className="text-sm text-foreground">{msg.content}</p>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                      <Sparkles size={11} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-primary/70">StackForge</span>
                  </div>
                  <TypingText text={msg.content} />
                  {msg.tools && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {msg.tools.map((tool, i) => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          index={i}
                          onAdd={onAddToStack}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && <AlchemistLoading />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="px-6 pb-4 pt-2">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`glass-panel rounded-2xl transition-all duration-300 ${
              isFocused ? "glow-border-teal animate-pulse-glow" : ""
            }`}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Describe your ideal workflow..."
              rows={1}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground px-4 py-3 pr-12 resize-none outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 text-center mt-2 font-mono">
            Press Enter to send · Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

// Typing effect component
const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse" />
      )}
    </p>
  );
};

export default ChatInterface;
