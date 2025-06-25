
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { Pills, Clock, AlertTriangle } from "lucide-react";
import { MedicalBadge } from "@/components/ui/medical-badge";

const medications = [
  {
    name: "Doliprane 1000mg",
    dosage: "1 comprimé, 3 fois par jour",
    prescriber: "Dr. Martin",
    remaining: 15,
    nextDose: "14:00",
  },
  {
    name: "Aspirine 100mg",
    dosage: "1 comprimé le matin",
    prescriber: "Dr. Dubois", 
    remaining: 28,
    nextDose: "08:00",
  },
];

export const Medications = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Médicaments</h1>
        <p className="text-gray-600">Gérez vos traitements et rappels</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {medications.map((med, index) => (
          <motion.div
            key={med.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <MedicalCard className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full medical-gradient">
                    <Pills className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{med.name}</h3>
                    <p className="text-gray-600 mb-2">{med.dosage}</p>
                    <p className="text-sm text-gray-500">Prescrit par {med.prescriber}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>Prochaine prise: {med.nextDose}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span>{med.remaining} restants</span>
                      </div>
                    </div>
                  </div>
                </div>
                <MedicalBadge variant="available">
                  Actif
                </MedicalBadge>
              </div>
            </MedicalCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
