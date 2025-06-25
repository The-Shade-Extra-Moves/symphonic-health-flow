
import { useState } from "react";
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Video, Plus } from "lucide-react";

type AppointmentStatus = "confirmed" | "pending" | "teleconsult" | "cancelled";
type AppointmentFilter = "upcoming" | "past" | "teleconsult" | "cancelled";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: AppointmentStatus;
  type: "physical" | "teleconsult";
  reason: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Martin",
    specialty: "Cardiologie",
    date: "2024-01-15",
    time: "14:30",
    location: "Clinique Saint-Jean",
    status: "confirmed",
    type: "physical",
    reason: "Consultation de suivi"
  },
  {
    id: "2",
    doctorName: "Dr. Dubois",
    specialty: "Dermatologie",
    date: "2024-01-10",
    time: "10:00",
    location: "Téléconsultation",
    status: "teleconsult",
    type: "teleconsult",
    reason: "Contrôle routine"
  },
];

const statusConfig = {
  confirmed: { label: "Confirmé", variant: "available" as const, color: "text-green-600" },
  pending: { label: "En attente", variant: "default" as const, color: "text-yellow-600" },
  teleconsult: { label: "Téléconsultation", variant: "certified" as const, color: "text-blue-600" },
  cancelled: { label: "Annulé", variant: "urgent" as const, color: "text-red-600" },
};

export const AppointmentsSection = () => {
  const [filter, setFilter] = useState<AppointmentFilter>("upcoming");
  
  const filteredAppointments = mockAppointments.filter(apt => {
    switch (filter) {
      case "upcoming":
        return new Date(apt.date) >= new Date() && apt.status !== "cancelled";
      case "past":
        return new Date(apt.date) < new Date();
      case "teleconsult":
        return apt.type === "teleconsult";
      case "cancelled":
        return apt.status === "cancelled";
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Rendez-vous</h1>
        <Button className="medical-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau RDV
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MedicalCard className="p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "upcoming", label: "À venir" },
              { key: "past", label: "Passés" },
              { key: "teleconsult", label: "Téléconsultations" },
              { key: "cancelled", label: "Annulés" },
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "ghost"}
                onClick={() => setFilter(filterOption.key as AppointmentFilter)}
                className={filter === filterOption.key ? "medical-gradient text-white" : ""}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </MedicalCard>
      </motion.div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredAppointments.map((appointment, index) => {
          const statusInfo = statusConfig[appointment.status];
          
          return (
            <motion.div
              key={appointment.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <MedicalCard className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full medical-gradient">
                      {appointment.type === "teleconsult" ? (
                        <Video className="w-5 h-5 text-white" />
                      ) : (
                        <Calendar className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <MedicalBadge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </MedicalBadge>
                      </div>
                      
                      <p className="text-blue-600 font-medium mb-1">{appointment.specialty}</p>
                      <p className="text-gray-600 mb-2">{appointment.reason}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {appointment.type === "teleconsult" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {appointment.type === "teleconsult" && appointment.status === "confirmed" && (
                      <Button size="sm" className="medical-gradient text-white">
                        <Video className="w-4 h-4 mr-2" />
                        Rejoindre
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    
                    {appointment.status !== "cancelled" && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Annuler
                      </Button>
                    )}
                  </div>
                </div>
              </MedicalCard>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredAppointments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MedicalCard className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun rendez-vous trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas de rendez-vous dans cette catégorie.
            </p>
            <Button className="medical-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Prendre un rendez-vous
            </Button>
          </MedicalCard>
        </motion.div>
      )}
    </div>
  );
};
