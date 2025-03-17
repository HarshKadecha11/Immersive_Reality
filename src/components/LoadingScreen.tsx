import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

    // Simulate progress with smoother acceleration
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Accelerate progress as it gets closer to 100
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining * 0.08);
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100); // More frequent updates for smoother animation

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
      }, 500); // Reduced delay for faster transition
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading, onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-md px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-6"
            >
              🏠
            </motion.div>

            <motion.h2
              className="text-2xl font-bold mb-2 text-primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              EstateVista
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={loadingMessage} // Force animation restart when message changes
            >
              {loadingMessage}
            </motion.p>

            <motion.div
              className="w-full bg-muted h-2 rounded-full overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ type: "tween" }}
              />
            </motion.div>

            <motion.p
              className="mt-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {Math.round(progress)}% complete
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
