
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Heart, User, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Médecins", href: "#doctors" },
    { name: "À propos", href: "#about" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold medical-text-gradient">
              Symphonic Health
            </span>
          </motion.div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
            <Button className="medical-gradient text-white rounded-full">
              <Calendar className="w-4 h-4 mr-2" />
              Rendez-vous
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu mobile ouvert */}
        {isOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <Button variant="ghost" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
                <Button className="medical-gradient text-white justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Rendez-vous
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
