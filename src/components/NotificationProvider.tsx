import React, { createContext, useContext, useState, useCallback } from "react";
import FunnyToast from "./FunnyToast";
import { getRandomFunnyMessage } from "./FunnyToast";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type?: NotificationType,
    duration?: number,
  ) => void;
  showRandomNotification: (type?: NotificationType) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info", duration = 7000) => {
      try {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, message, type, duration }]);

        // Auto remove after duration
        if (duration > 0) {
          setTimeout(() => {
            setNotifications((prev) =>
              prev.filter((notification) => notification.id !== id),
            );
          }, duration);
        }
      } catch (error) {
        console.error("Error showing notification:", error);
      }
    },
    [],
  );

  const showRandomNotification = useCallback(
    (type: NotificationType = "info") => {
      const message = getRandomFunnyMessage(
        type === "success" ? "success" : type === "error" ? "error" : "loading",
      );
      showNotification(message, type);
    },
    [showNotification],
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  return (
    <NotificationContext.Provider
      value={{ showNotification, showRandomNotification, clearNotifications }}
    >
      {children}

      {/* Render notifications */}
      {notifications.map((notification, index) => (
        <FunnyToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
          isVisible={true}
        />
      ))}
    </NotificationContext.Provider>
  );
};
