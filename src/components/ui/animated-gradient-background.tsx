import React from "react";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedGradientBackground = ({
  children,
  className = "",
}: AnimatedGradientBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/30 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[60%] left-[60%] w-[30%] h-[40%] rounded-full bg-green-300/20 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-400/10 blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradientBackground;
