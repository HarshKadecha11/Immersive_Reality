import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  index: number;
}

const StatsCard = ({ icon: Icon, title, value, index }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <motion.p
            className="text-2xl font-bold text-gray-800"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 * index, type: "spring" }}
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
