
import { motion } from "framer-motion";
import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Video,
  AlertTriangle,
  User,
  Phone
} from "lucide-react";

interface DoctorAgendaProps {
  onPatientSelect: (patientId: string) => void;
}

const appointments = [
  {
    id: "1",
    time: "09:00",
    duration: 30,
    patient: "Marie Dupont",
    type: "consultation",
    mode: "presentiel",
    status: "confirmed",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "06 12 34 56 78",
    reason: "Suivi hypertension"
  },
  {
    id: "2", 
    time: "09:30",
    duration: 30,
    patient: "Jean Martin",
    type: "consultation",
    mode: "teleconsultation",
    status: "waiting",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    phone: "06 98 76 54 32",
    reason: "Contrôle diabète"
  },
  {
    id: "3",
    time: "10:00",
    duration: 45,
    patient: "Sophie Bernard", 
    type: "urgence",
    mode: "presentiel",
    status: "urgent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    phone: "06 45 67 89 01",
    reason: "Douleurs thoraciques"
  },
  {
    id: "4",
    time: "14:00",
    duration: 30,
    patient: "Pierre Durand",
    type: "consultation",
    mode: "presentiel", 
    status: "confirmed",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "06 23 45 67 89",
    reason: "Suivi arthrose"
  },
  {
    id: "5",
    time: "15:00",
    duration: 30,
    patient: "Libre",
    type: "free",
    mode: "",
    status: "free",
    avatar: "",
    phone: "",
    reason: "Créneau libre"
  },
];

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-green-100 text-green-800 border-green-200";
    case "waiting": return "bg-orange-100 text-orange-800 border-orange-200";
    case "urgent": return "bg-red-100 text-red-800 border-red-200";
    case "free": return "bg-gray-50 text-gray-400 border-gray-200 border-dashed";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeIcon = (type: string, mode: string) => {
  if (type === "urgence") return <AlertTriangle className="w-4 h-4 text-red-500" />;
  if (mode === "teleconsultation") return <Video className="w-4 h-4 text-blue-500" />;
  return <User className="w-4 h-4 text-gray-500" />;
};

export const DoctorAgenda = ({ onPatientSelect }: DoctorAgendaProps) => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold medical-text-gradient">Agenda</h1>
          <p className="text-gray-600">{formatDate(currentDate)}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}>
            <TabsList>
              <TabsTrigger value="day">Jour</TabsTrigger>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="month">Mois</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar View */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Planning du jour</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {appointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer hover:shadow-md ${getStatusColor(appointment.status)}`}
                      onClick={() => appointment.patient !== "Libre" && onPatientSelect(appointment.id)}
                      whileHover={{ scale: appointment.status !== "free" ? 1.02 : 1 }}
                    >
                      {appointment.status === "free" ? (
                        <div className="text-center py-4">
                          <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">{appointment.time} - Créneau libre</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Réserver
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm font-medium min-w-[80px]">
                              <Clock className="w-4 h-4" />
                              {appointment.time}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={appointment.avatar} />
                              <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                                {getTypeIcon(appointment.type, appointment.mode)}
                              </div>
                              <p className="text-sm text-gray-600">{appointment.reason}</p>
                              <p className="text-xs text-gray-500">{appointment.duration} min • {appointment.mode}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MedicalBadge variant={appointment.status === "confirmed" ? "available" : appointment.status === "urgent" ? "urgent" : "default"}>
                              {appointment.status === "confirmed" ? "Confirmé" : 
                               appointment.status === "waiting" ? "En attente" :
                               appointment.status === "urgent" ? "Urgence" : "Inconnu"}
                            </MedicalBadge>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4" />
                              </Button>
                              {appointment.mode === "teleconsultation" && (
                                <Button size="sm" variant="outline">
                                  <Video className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mini Calendar & Stats */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Janvier 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`aspect-square text-sm rounded hover:bg-blue-100 transition-colors ${
                        i + 1 === 22 ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">RDV confirmés</span>
                  <MedicalBadge variant="available">3</MedicalBadge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En attente</span>
                  <MedicalBadge variant="default">1</MedicalBadge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Urgences</span>
                  <MedicalBadge variant="urgent">1</MedicalBadge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Créneaux libres</span>
                  <MedicalBadge variant="default">1</MedicalBadge>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Bloquer créneau
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
