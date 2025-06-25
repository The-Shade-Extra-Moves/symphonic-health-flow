
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Stethoscope,
  Settings as SettingsIcon,
  X,
  Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Button } from "@/components/ui/button";
import type { DoctorDashboardSection } from "@/pages/DoctorDashboard";

interface DoctorSidebarProps {
  activeSection: DoctorDashboardSection;
  setActiveSection: (section: DoctorDashboardSection) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const sidebarItems = [
  { id: "overview" as const, label: "Tableau de bord", icon: Home },
  { id: "patients" as const, label: "Patients", icon: Users },
  { id: "consultations" as const, label: "Consultations", icon: Stethoscope },
  { id: "agenda" as const, label: "Agenda", icon: Calendar },
  { id: "patient-dossier" as const, label: "Dossier patient", icon: FileText },
  { id: "settings" as const, label: "Paramètres", icon: SettingsIcon },
];

export const DoctorSidebar = ({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: DoctorSidebarProps) => {
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
          {/* Doctor Profile */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3 mb-8"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">Dr. Martin</h3>
              <MedicalBadge variant="certified" className="mt-1">
                Cardiologue
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
                      ? "bg-green-100 text-green-600 shadow-sm"
                      : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "patients" && (
                    <MedicalBadge variant="certified" className="ml-auto text-xs">
                      24
                    </MedicalBadge>
                  )}
                  {item.id === "consultations" && (
                    <MedicalBadge variant="urgent" className="ml-auto text-xs">
                      3
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
