import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale, Workflow, Globe, PiggyBank, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animated 3D wireframe sphere using CSS
const WireframeSphere = () => {
  return (
    <div className="relative w-[400px] h-[400px] mx-auto" style={{ perspective: "800px" }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${i * 30}deg)`,
          }}
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute rounded-full border border-secondary/15"
          style={{
            top: `${20 + i * 20}%`,
            left: "10%",
            right: "10%",
            height: "1px",
            transformStyle: "preserve-3d",
            transform: `rotateX(${70 + i * 5}deg)`,
          }}
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 15 + i * 3, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Core glow */}
      <div className="absolute inset-[30%] rounded-full bg-primary/5 blur-xl animate-pulse-glow" />
      <div className="absolute inset-[40%] rounded-full bg-primary/10 blur-md" />
    </div>
  );
};

// Live demo floating cards
const demoTools = [
  { name: "LangChain", domain: "LLM Orchestration", delay: 0.3 },
  { name: "Pinecone", domain: "Vector Database", delay: 0.6 },
  { name: "Hugging Face", domain: "Model Hub", delay: 0.9 },
];

const features = [
  { icon: Scale, title: "Scalable Architecture", desc: "Build workflows that scale from prototype to production with battle-tested tools." },
  { icon: Workflow, title: "Intelligent Matching", desc: "AI-powered recommendations from 19,000+ tools, matched to your exact needs." },
  { icon: Globe, title: "API-First Design", desc: "Every tool recommendation comes with integration guides and API documentation." },
  { icon: PiggyBank, title: "Cost Optimization", desc: "Compare pricing tiers and find the most cost-effective stack for your budget." },
];

const Landing = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  // Starfield background
  const [stars] = useState(() =>
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/30"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-semibold metallic-text tracking-tight">StackForge AI</span>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            <button
              onClick={() => navigate("/auth")}
              className="text-sm px-4 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <WireframeSphere />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-primary mb-8"
          >
            <Sparkles size={12} />
            19,329 AI tools indexed
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient-teal">Architect</span>
            <br />
            <span className="metallic-text">Your AI Future</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Describe what you're building. Our AI alchemist forges the perfect tool stack from thousands of possibilities.
          </p>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 glow-teal"
            >
              Start Forging <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-xl glass-panel text-foreground font-medium text-sm"
            >
              See Live Demo
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <ChevronDown size={20} className="text-muted-foreground/50" />
        </motion.div>
      </motion.section>

      {/* Live Demo */}
      <section id="demo" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold metallic-text mb-3">See It In Action</h2>
            <p className="text-muted-foreground">Type a goal. Get a stack. Build faster.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Fake input */}
            <div className="glass-panel rounded-xl p-3 mb-8 glow-border-teal">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground font-mono">
                  "I want to build an AI-powered chatbot with memory..."
                </span>
                <motion.div className="w-0.5 h-4 bg-primary" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
              </div>
            </div>

            {/* Floating cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {demoTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: tool.delay,
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-panel rounded-xl p-4 text-center cursor-pointer hover:glow-teal transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-sm">{tool.name[0]}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tool.name}</h3>
                  <span className="text-[10px] font-mono text-secondary">{tool.domain}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold metallic-text mb-3">Built for Builders</h2>
            <p className="text-muted-foreground">Everything you need to architect production-ready AI systems.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-xl p-6 group hover:glow-teal transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm metallic-text font-semibold">StackForge AI</span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
          <span className="text-xs text-muted-foreground/50 font-mono">© 2026 StackForge</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
