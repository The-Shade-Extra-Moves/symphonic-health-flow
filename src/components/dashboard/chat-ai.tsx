
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatAI = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Assistant IA</h1>
        <p className="text-gray-600">Posez vos questions santé à notre IA</p>
      </motion.div>

      <MedicalCard className="p-6 h-96 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Assistant médical IA</h3>
            <p className="text-gray-600 mb-6">Comment puis-je vous aider aujourd'hui ?</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                "Puis-je annuler mon RDV de demain ?"
              </Button>
              <Button variant="outline" className="w-full">
                "Quand dois-je prendre mon prochain médicament ?"
              </Button>
              <Button variant="outline" className="w-full">
                "Mes résultats d'analyses sont-ils normaux ?"
              </Button>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="medical-gradient text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </MedicalCard>
    </div>
  );
};
