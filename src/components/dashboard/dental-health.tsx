
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { Smile } from "lucide-react";

export const DentalHealth = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Santé dentaire</h1>
        <p className="text-gray-600">Suivez vos soins dentaires</p>
      </motion.div>

      <MedicalCard className="p-6 text-center">
        <Smile className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Suivi dentaire</h3>
        <p className="text-gray-600">Cette section sera bientôt disponible</p>
      </MedicalCard>
    </div>
  );
};
