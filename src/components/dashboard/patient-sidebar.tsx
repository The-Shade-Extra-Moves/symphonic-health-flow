
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Calendar, 
  FileText, 
  Activity, 
  Heart, 
  Users, 
  Settings as SettingsIcon,
  MessageSquare,
  X,
  Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Button } from "@/components/ui/button";
import type { DashboardSection } from "@/pages/PatientDashboard";

interface PatientSidebarProps {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const sidebarItems = [
  { id: "home" as const, label: "Accueil", icon: Home },
  { id: "appointments" as const, label: "Rendez-vous", icon: Calendar },
  { id: "medical-records" as const, label: "Dossier médical", icon: FileText },
  { id: "health-tracking" as const, label: "Suivi santé", icon: Activity },
  { id: "mental-health" as const, label: "Santé mentale", icon: Heart },
  { id: "dental-health" as const, label: "Santé dentaire", icon: Users },
  { id: "medications" as const, label: "Médicaments", icon: Users },
  { id: "chat-ai" as const, label: "Chat IA", icon: MessageSquare },
  { id: "settings" as const, label: "Paramètres", icon: SettingsIcon },
];

export const PatientSidebar = ({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: PatientSidebarProps) => {
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card p-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/20 z-40 lg:z-auto lg:translate-x-0 lg:opacity-100"
      >
        <div className="p-6">
          {/* User Profile */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3 mb-8"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">Marie Dupont</h3>
              <MedicalBadge variant="available" className="mt-1">
                Stable
              </MedicalBadge>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "appointments" && (
                    <MedicalBadge variant="urgent" className="ml-auto text-xs">
                      2
                    </MedicalBadge>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};
