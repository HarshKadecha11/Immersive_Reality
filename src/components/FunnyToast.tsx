import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FunnyToastProps {
  message: string;
  duration?: number;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  isVisible?: boolean;
}

const funnyLoadingMessages = [
  "Counting all the bricks in Gujarat...",
  "Teaching our agents how to make chai...",
  "Measuring houses with a really long tape...",
  "Convincing landlords to lower prices (wish us luck)...",
  "Polishing doorknobs for better photos...",
  "Asking neighbors about the gossip...",
  "Checking if ghosts come with the property...",
  "Making sure the WiFi reaches the bathroom...",
  "Calculating how many pizzas fit in each kitchen...",
  "Bribing the property to look its best...",
];

const funnySuccessMessages = [
  "House found! It's not haunted... probably.",
  "Success! We found a place with walls AND a roof!",
  "Good news! This one has indoor plumbing!",
  "Congrats! You're one step closer to being house-poor!",
  "Achievement unlocked: Potential debt for 30 years!",
];

const funnyErrorMessages = [
  "Oops! Our agent fell asleep during the search.",
  "Error: Property ran away when we tried to photograph it.",
  "Failed! The house doesn't want to be found right now.",
  "Houston, we have a problem... and a house shortage.",
  "Error 404: Affordable housing not found.",
];

export const getRandomFunnyMessage = (
  type: "loading" | "success" | "error",
) => {
  const messages =
    type === "loading"
      ? funnyLoadingMessages
      : type === "success"
        ? funnySuccessMessages
        : funnyErrorMessages;

  return messages[Math.floor(Math.random() * messages.length)];
};

const FunnyToast = ({
  message,
  duration = 4000,
  type = "info",
  onClose,
  isVisible = true,
}: FunnyToastProps) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);

    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "🎉";
      case "warning":
        return "⚠️";
      case "error":
        return "😅";
      default:
        return "🏠";
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${getBackgroundColor()} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 max-w-md`}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xl"
          >
            {getIcon()}
          </motion.span>
          <p className="flex-1">{message}</p>
          <button
            onClick={() => {
              setVisible(false);
              if (onClose) onClose();
            }}
            className="ml-2 text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FunnyToast;
