import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRandomFunnyMessage } from "./FunnyToast";

interface LoadingScreenProps {
  isLoading: boolean;
  onFinish?: () => void;
}

const LoadingScreen = ({ isLoading, onFinish }: LoadingScreenProps) => {
  const [loadingMessage, setLoadingMessage] = useState(
    getRandomFunnyMessage("loading"),
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      if (onFinish) onFinish();
      return;
    }

    // Change message every 3 seconds
    const messageInterval = setInterval(() => {
      setLoadingMessage(getRandomFunnyMessage("loading"));
    }, 3000);

    // Simulate progress slower for better readability
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading, onFinish]);

  // When progress reaches 100, finish loading after a short delay
  useEffect(() => {
    if (progress >= 100 && isLoading) {
      const timer = setTimeout(() => {
        if (onFinish) onFinish();
        // Force loading to end even if onFinish isn't provided
        setProgress(0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading, onFinish]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-md px-4 text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-6xl mb-6"
        >
          🏠
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-2 text-primary"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          EstateVista
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={loadingMessage} // Force animation restart when message changes
        >
          {loadingMessage}
        </motion.p>

        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 15 }}
          />
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
