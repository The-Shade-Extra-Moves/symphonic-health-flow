
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  User, 
  Video,
  Phone,
  FileText,
  Play,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Share
} from "lucide-react";
import { ConsultationInterface } from "./consultation-interface";

interface AppointmentManagementProps {
  onPatientSelect: (patientId: string) => void;
}

const appointments = [
  {
    id: "1",
    time: "09:00",
    duration: 30,
    patient: {
      id: "1",
      name: "Marie Dupont",
      age: 45,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      phone: "06 12 34 56 78",
    },
    type: "consultation",
    mode: "presentiel",
    status: "waiting", // waiting, in-progress, completed, confirmed
    reason: "Suivi hypertension",
    isNew: false,
    lastVisit: "2024-01-15",
    aiSummary: "Patiente hypertensive sous traitement. Dernière TA: 130/85. Bon observance."
  },
  {
    id: "2", 
    time: "09:30",
    duration: 30,
    patient: {
      id: "2",
      name: "Jean Martin",
      age: 62,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      phone: "06 98 76 54 32",
    },
    type: "consultation",
    mode: "teleconsultation",
    status: "confirmed",
    reason: "Contrôle diabète",
    isNew: false,
    lastVisit: "2024-01-10",
    aiSummary: "Patient diabétique type 2. HbA1c stable. Surveillance glycémie."
  },
  {
    id: "3",
    time: "10:00",
    duration: 45,
    patient: {
      id: "3",
      name: "Sophie Bernard", 
      age: 28,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      phone: "06 45 67 89 01",
    },
    type: "urgence",
    mode: "presentiel",
    status: "in-progress",
    reason: "Douleurs thoraciques",
    isNew: true,
    lastVisit: null,
    aiSummary: "Nouveau patient. Douleurs thoraciques à évaluer. Aucun antécédent connu."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
    case "waiting": return "bg-orange-100 text-orange-800 border-orange-200";
    case "in-progress": return "bg-green-100 text-green-800 border-green-200";
    case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirmed": return "Confirmé";
    case "waiting": return "En attente";
    case "in-progress": return "En cours";
    case "completed": return "Terminé";
    default: return "Inconnu";
  }
};

export const AppointmentManagement = ({ onPatientSelect }: AppointmentManagementProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const startConsultation = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setShowConsultation(true);
  };

  const completeAppointment = (appointmentId: string) => {
    // Logique pour marquer le RDV comme terminé
    console.log("Marking appointment as completed:", appointmentId);
  };

  const renderAppointmentCard = (appointment: any, index: number) => (
    <motion.div
      key={appointment.id}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <MedicalCard className="p-6 mb-4" hover>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <Clock className="w-5 h-5 text-blue-500" />
                {appointment.time}
              </div>
              <span className="text-sm text-gray-500">{appointment.duration} min</span>
            </div>
            
            <Avatar className="w-12 h-12">
              <AvatarImage src={appointment.patient.avatar} />
              <AvatarFallback>{appointment.patient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-900">{appointment.patient.name}</h4>
                {appointment.isNew && (
                  <MedicalBadge variant="urgent" className="text-xs">
                    Nouveau
                  </MedicalBadge>
                )}
                {appointment.type === "urgence" && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                {appointment.mode === "teleconsultation" && (
                  <Video className="w-4 h-4 text-blue-500" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{appointment.reason}</p>
              
              {/* IA Summary */}
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-blue-800">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  IA: {appointment.aiSummary}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Âge: {appointment.patient.age} ans</span>
                {appointment.lastVisit && <span>Dernière visite: {appointment.lastVisit}</span>}
                <span>{appointment.mode}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <MedicalBadge variant={
              appointment.status === "confirmed" ? "available" : 
              appointment.status === "waiting" ? "default" :
              appointment.status === "in-progress" ? "certified" : "default"
            }>
              {getStatusLabel(appointment.status)}
            </MedicalBadge>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onPatientSelect(appointment.patient.id)}>
                <FileText className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              
              {appointment.status === "waiting" && (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => startConsultation(appointment.id)}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Démarrer
                </Button>
              )}
              
              {appointment.status === "in-progress" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => startConsultation(appointment.id)}
                >
                  Reprendre
                </Button>
              )}
              
              {appointment.status === "completed" && (
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Workflow Timeline */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${appointment.status !== "confirmed" ? "text-green-600" : "text-gray-400"}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Confirmé</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${appointment.status === "in-progress" ? "text-blue-600" : appointment.status === "completed" ? "text-green-600" : "text-gray-400"}`}>
              <Play className="w-4 h-4" />
              <span className="text-sm">En consultation</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${appointment.status === "completed" ? "text-green-600" : "text-gray-400"}`}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Terminé</span>
            </div>
          </div>
        </div>
      </MedicalCard>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Gestion des rendez-vous</h1>
        <p className="text-gray-600">Workflow complet de consultation</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
          <TabsTrigger value="week">Cette semaine</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {appointments.map((appointment, index) => renderAppointmentCard(appointment, index))}
          </motion.div>
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-center text-gray-600 py-8">Vue hebdomadaire en développement</p>
          </motion.div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-center text-gray-600 py-8">Consultations terminées</p>
          </motion.div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-center text-gray-600 py-8">Rendez-vous à venir</p>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Consultation Interface Modal */}
      <AnimatePresence>
        {showConsultation && selectedAppointment && (
          <ConsultationInterface
            patientId={selectedAppointment}
            appointmentId={selectedAppointment}
            onClose={() => {
              setShowConsultation(false);
              setSelectedAppointment(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
