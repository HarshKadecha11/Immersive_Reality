import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useStats = () => {
  const [stats, setStats] = useState({
    totalProperties: 5000,
    averagePrice: 75,
    activeUsers: 0,
  });

  // Track active users through Supabase presence
  useEffect(() => {
    const channel = supabase.channel("online-users");

    channel
      .on("presence", { event: "sync" }, () => {
        const presenceState = channel.presenceState();
        const onlineUsers = Object.keys(presenceState).length;
        setStats((prev) => ({ ...prev, activeUsers: onlineUsers }));
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Simulate real-time updates for active users
    const userInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 4, // Random fluctuation
      }));
    }, 3000);

    // Simulate property additions
    const propertyInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalProperties: prev.totalProperties + 1,
      }));
    }, 15000); // New property every 15 seconds

    return () => {
      clearInterval(userInterval);
      clearInterval(propertyInterval);
    };
  }, []);

  return stats;
};
