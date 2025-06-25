
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MedicalBadgeProps {
  children: React.ReactNode;
  variant?: "available" | "certified" | "premium" | "urgent" | "default";
  className?: string;
  pulse?: boolean;
}

export const MedicalBadge = ({ 
  children, 
  variant = "default", 
  className, 
  pulse = false 
}: MedicalBadgeProps) => {
  const variants = {
    available: "bg-green-100 text-green-800 border-green-200",
    certified: "bg-blue-100 text-blue-800 border-blue-200", 
    premium: "bg-purple-100 text-purple-800 border-purple-200",
    urgent: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        pulse && "animate-pulse-slow",
        className
      )}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.span>
  );
};
