import { motion } from "framer-motion";

const AlchemistLoading = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
        </motion.div>

        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-secondary/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary" />
        </motion.div>

        {/* Inner core */}
        <motion.div
          className="absolute inset-4 rounded-full bg-primary/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary glow-teal" />
        </div>
      </div>
    </div>
  );
};

export default AlchemistLoading;
