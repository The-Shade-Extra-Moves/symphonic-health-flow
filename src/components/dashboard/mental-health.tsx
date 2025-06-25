
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { Heart, Smile, Frown, Meh } from "lucide-react";

export const MentalHealth = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Santé mentale</h1>
        <p className="text-gray-600">Suivez votre bien-être émotionnel</p>
      </motion.div>

      <MedicalCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Comment vous sentez-vous aujourd'hui ?</h3>
        <div className="flex justify-center space-x-8">
          {[
            { icon: Smile, label: "Très bien", color: "text-green-500" },
            { icon: Meh, label: "Moyen", color: "text-yellow-500" },
            { icon: Frown, label: "Pas bien", color: "text-red-500" },
          ].map((mood, index) => {
            const Icon = mood.icon;
            return (
              <motion.button
                key={mood.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 ${mood.color}`}
              >
                <Icon className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium">{mood.label}</span>
              </motion.button>
            );
          })}
        </div>
      </MedicalCard>
    </div>
  );
};
