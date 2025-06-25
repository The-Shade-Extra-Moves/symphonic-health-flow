
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { Settings as SettingsIcon, User, Bell, Shield, Moon } from "lucide-react";

export const Settings = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et votre compte</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: User, title: "Profil", description: "Informations personnelles" },
          { icon: Bell, title: "Notifications", description: "Rappels et alertes" },
          { icon: Shield, title: "Confidentialité", description: "Données et sécurité" },
          { icon: Moon, title: "Apparence", description: "Thème et affichage" },
        ].map((setting, index) => {
          const Icon = setting.icon;
          return (
            <motion.div
              key={setting.title}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <MedicalCard className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full medical-gradient">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{setting.title}</h3>
                    <p className="text-gray-600">{setting.description}</p>
                  </div>
                </div>
              </MedicalCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
