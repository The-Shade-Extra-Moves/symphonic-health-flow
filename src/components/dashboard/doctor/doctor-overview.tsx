
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  User,
  Phone,
  FileText,
  Plus,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface DoctorOverviewProps {
  onPatientSelect: (patientId: string) => void;
  onAddPatient?: () => void;
}

const kpiData = [
  {
    title: "Patients actifs",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "RDV aujourd'hui",
    value: "8",
    change: "6 terminés",
    trend: "neutral",
    icon: Calendar,
    color: "text-green-600"
  },
  {
    title: "Taux de présence",
    value: "92%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    title: "Temps moyen",
    value: "28min",
    change: "-3min",
    trend: "down",
    icon: Clock,
    color: "text-orange-600"
  }
];

const todayAppointments = [
  {
    id: "1",
    time: "14:00",
    patient: "Pierre Durand",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    reason: "Suivi arthrose",
    status: "confirmed"
  },
  {
    id: "2",
    time: "14:30",
    patient: "Anne Moreau",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    reason: "Consultation générale",
    status: "waiting"
  },
  {
    id: "3",
    time: "15:00",
    patient: "Libre",
    avatar: "",
    reason: "Créneau disponible",
    status: "free"
  }
];

const notifications = [
  {
    id: "1",
    type: "new-patient",
    title: "Nouveau patient ajouté",
    message: "Marie Bernard a été ajoutée à votre patientèle",
    time: "Il y a 2h",
    icon: User,
    color: "text-blue-600"
  },
  {
    id: "2",
    type: "prescription",
    title: "Prescription en attente",
    message: "Ordonnance de Jean Martin à valider",
    time: "Il y a 4h",
    icon: FileText,
    color: "text-orange-600"
  },
  {
    id: "3",
    type: "urgent",
    title: "RDV urgent demandé",
    message: "Sophie Dubois demande un RDV en urgence",
    time: "Il y a 1h",
    icon: AlertTriangle,
    color: "text-red-600"
  }
];

export const DoctorOverview = ({ onPatientSelect, onAddPatient }: DoctorOverviewProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold medical-text-gradient">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre pratique</p>
        </div>
        <Button onClick={onAddPatient} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un patient
        </Button>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MedicalCard className="p-6" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <p className={`text-sm ${
                      kpi.trend === "up" ? "text-green-600" : 
                      kpi.trend === "down" ? "text-red-600" : 
                      "text-gray-600"
                    }`}>
                      {kpi.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full medical-gradient ${kpi.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </MedicalCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline du jour */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Planning du jour</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer hover:shadow-md ${
                        appointment.status === "free" 
                          ? "bg-gray-50 border-dashed border-gray-300" 
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => appointment.status !== "free" && onPatientSelect(appointment.id)}
                    >
                      {appointment.status === "free" ? (
                        <div className="text-center py-2">
                          <Plus className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">{appointment.time} - Créneau libre</p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium text-blue-600 min-w-[50px]">
                              {appointment.time}
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={appointment.avatar} />
                              <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.patient}</p>
                              <p className="text-sm text-gray-600">{appointment.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MedicalBadge variant={appointment.status === "confirmed" ? "available" : "default"}>
                              {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
                            </MedicalBadge>
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
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

        {/* Notifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full bg-white ${notification.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
