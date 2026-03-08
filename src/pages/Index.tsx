import { useState, useCallback } from "react";
import GridBackground from "@/components/GridBackground";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import ChatInterface from "@/components/ChatInterface";
import StackViewer from "@/components/StackViewer";
import type { ToolData } from "@/components/ToolCard";

const Index = () => {
  const [stack, setStack] = useState<ToolData[]>([]);

  const handleAddToStack = useCallback((tool: ToolData) => {
    setStack((prev) => {
      if (prev.find((t) => t.id === tool.id)) return prev;
      return [...prev, tool];
    });
  }, []);

  const handleRemoveFromStack = useCallback((id: string) => {
    setStack((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <GridBackground />
      <AppSidebar />

      <div className="ml-16 h-screen flex flex-col relative z-10">
        <AppHeader />

        <div className="flex-1 flex overflow-hidden">
          <ChatInterface onAddToStack={handleAddToStack} />
          <div className="p-4 hidden lg:block">
            <StackViewer stack={stack} onRemove={handleRemoveFromStack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
