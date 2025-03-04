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
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[80%] rounded-full bg-gradient-to-l from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-green-500/20 to-teal-500/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
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
