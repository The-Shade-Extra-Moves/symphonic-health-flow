
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, TrendingUp, Activity, Clock, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoctorOverviewProps {
  onPatientSelect: (patientId: string) => void;
}

const kpiData = [
  { title: "Patients actifs", value: "24", icon: Users, trend: "+3", color: "text-blue-600" },
  { title: "RDV aujourd'hui", value: "8", icon: Calendar, trend: "+2", color: "text-green-600" },
  { title: "Taux présence", value: "92%", icon: TrendingUp, trend: "+5%", color: "text-purple-600" },
  { title: "Consultations mois", value: "156", icon: Activity, trend: "+12", color: "text-orange-600" },
];

const todayAppointments = [
  {
    id: "1",
    time: "09:00",
    patient: "Marie Dupont",
    type: "Suivi cardiologique",
    status: "confirmed",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2", 
    time: "10:30",
    patient: "Jean Martin",
    type: "Consultation",
    status: "waiting",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    time: "14:00",
    patient: "Sophie Bernard",
    type: "Urgence",
    status: "urgent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
];

const notifications = [
  {
    id: "1",
    type: "patient",
    message: "Nouveau patient ajouté : Alex Dubois",
    time: "Il y a 5 min",
    urgent: false
  },
  {
    id: "2",
    type: "prescription",
    message: "Prescription en attente de validation",
    time: "Il y a 15 min",
    urgent: true
  },
  {
    id: "3",
    type: "appointment",
    message: "RDV 15h annulé par Pierre Durand",
    time: "Il y a 1h",
    urgent: false
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-green-100 text-green-800";
    case "waiting": return "bg-orange-100 text-orange-800";
    case "urgent": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirmed": return "Confirmé";
    case "waiting": return "En attente";
    case "urgent": return "Urgence";
    default: return "Inconnu";
  }
};

export const DoctorOverview = ({ onPatientSelect }: DoctorOverviewProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité médicale</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            >
              <MedicalCard className="p-6 text-center" hover glow>
                <div className={`inline-flex p-3 rounded-full medical-gradient mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                <p className="text-sm text-gray-600 mb-2">{kpi.title}</p>
                <MedicalBadge variant="available" className="text-xs">
                  {kpi.trend} ce mois
                </MedicalBadge>
              </MedicalCard>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timeline */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Planning d'aujourd'hui</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onPatientSelect(appointment.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 min-w-[50px]">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <MedicalBadge variant={appointment.status === "confirmed" ? "available" : appointment.status === "urgent" ? "urgent" : "default"}>
                      {getStatusLabel(appointment.status)}
                    </MedicalBadge>
                  </motion.div>
                ))}
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
                  <Bell className="w-5 h-5 text-orange-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${notification.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'} hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <p className={`text-sm font-medium ${notification.urgent ? 'text-red-800' : 'text-blue-800'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
