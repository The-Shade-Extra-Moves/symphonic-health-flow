
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MedicalCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const MedicalCard = ({ children, className, hover = true, glow = false }: MedicalCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && "hover:scale-105 hover:shadow-xl",
        glow && "animate-glow",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  );
};
