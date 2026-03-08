import { useState } from "react";
import { motion } from "framer-motion";
import { User, Key, CreditCard, Camera, Copy, Check, RefreshCw } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import DashboardSidebar from "@/components/DashboardSidebar";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "api", label: "API Keys", icon: Key },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const fakeApiKey = "sf_live_k8x2mN4pQ7rT9wJ...";

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "API key copied to clipboard." });
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <GridBackground />
      <DashboardSidebar />

      <div className="ml-16 h-screen flex flex-col relative z-10">
        <AppHeader />

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-2xl font-bold metallic-text mb-1">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </motion.div>

            <div className="flex gap-8">
              {/* Tabs */}
              <div className="flex flex-col gap-1 w-40 shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <tab.icon size={15} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                {activeTab === "profile" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Avatar */}
                    <div className="glass-panel rounded-xl p-6">
                      <h3 className="text-sm font-semibold text-foreground mb-4">Profile Photo</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative group cursor-pointer">
                          <span className="text-xl font-bold text-foreground">A</span>
                          <div className="absolute inset-0 rounded-xl bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={18} className="text-foreground" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-foreground font-medium">Architect</p>
                          <p className="text-xs text-muted-foreground">architect@stackforge.ai</p>
                        </div>
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="glass-panel rounded-xl p-6 space-y-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Preferences</h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive updates about your workflows</p>
                        </div>
                        <button
                          onClick={() => setNotifications(!notifications)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? "bg-primary" : "bg-muted"}`}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-full bg-foreground absolute top-0.5"
                            animate={{ left: notifications ? 22 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground">Beta Features</p>
                          <p className="text-xs text-muted-foreground">Try experimental StackForge features</p>
                        </div>
                        <button
                          onClick={() => setBetaFeatures(!betaFeatures)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${betaFeatures ? "bg-primary" : "bg-muted"}`}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-full bg-foreground absolute top-0.5"
                            animate={{ left: betaFeatures ? 22 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "api" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Status */}
                    <div className="glass-panel rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-foreground">Supabase Status</h3>
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-xs text-primary font-mono">Live</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Connected to your project database with 19,329 tools indexed.</p>
                    </div>

                    {/* API Key */}
                    <div className="glass-panel rounded-xl p-6">
                      <h3 className="text-sm font-semibold text-foreground mb-4">API Key</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 glass-panel rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground">
                          {fakeApiKey}
                        </div>
                        <button onClick={handleCopy} className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                        </button>
                        <button className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          <RefreshCw size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 mt-2">This key provides read access to the tool directory API.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "subscription" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="glass-panel rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">Current Plan</h3>
                          <p className="text-2xl font-bold text-gradient-teal mt-1">Pro</p>
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: "Queries", value: "847 / 1,000" },
                          { label: "Blueprints", value: "3 / 50" },
                          { label: "API Calls", value: "2.4k / 10k" },
                        ].map((stat) => (
                          <div key={stat.label} className="glass-panel rounded-lg p-3 text-center">
                            <p className="text-[10px] text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-2.5 rounded-xl glass-panel text-sm text-foreground hover:bg-muted/30 transition-colors">
                        Manage Subscription
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
