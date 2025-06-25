
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Eye, Download, User, Heart, AlertTriangle } from "lucide-react";

export const MedicalRecords = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Dossier médical</h1>
        <Button className="medical-gradient text-white">
          <Upload className="w-4 h-4 mr-2" />
          Ajouter un document
        </Button>
      </motion.div>

      {/* Personal Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
        <MedicalCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Groupe sanguin</label>
              <p className="text-lg font-semibold">O+</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Taille</label>
              <p className="text-lg font-semibold">165 cm</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Poids</label>
              <p className="text-lg font-semibold">62 kg</p>
            </div>
          </div>
        </MedicalCard>
      </motion.section>

      {/* Medical History */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Antécédents médicaux</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MedicalCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold">Antécédents familiaux</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Hypertension</span>
                <MedicalBadge variant="urgent">Père</MedicalBadge>
              </li>
              <li className="flex justify-between">
                <span>Diabète type 2</span>
                <MedicalBadge variant="default">Mère</MedicalBadge>
              </li>
            </ul>
          </MedicalCard>

          <MedicalCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Allergies</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Pénicilline</span>
                <MedicalBadge variant="urgent">Sévère</MedicalBadge>
              </li>
              <li className="flex justify-between">
                <span>Pollen</span>
                <MedicalBadge variant="default">Modérée</MedicalBadge>
              </li>
            </ul>
          </MedicalCard>
        </div>
      </motion.section>

      {/* Documents */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Documents médicaux</h2>
        <div className="space-y-4">
          {[
            { title: "Analyse de sang - Janvier 2024", date: "15/01/2024", type: "Analyse" },
            { title: "Radio thoracique", date: "10/01/2024", type: "Imagerie" },
            { title: "Consultation cardiologie", date: "05/01/2024", type: "Consultation" },
          ].map((doc, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <MedicalCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-600">{doc.date}</p>
                    </div>
                    <MedicalBadge variant="certified">{doc.type}</MedicalBadge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </MedicalCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
