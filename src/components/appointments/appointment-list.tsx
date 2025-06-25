
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, Video, User, MoreVertical, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  type: "physical" | "video";
  location?: string;
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Marie Dubois",
    specialty: "Cardiologie",
    date: new Date(2024, 0, 15, 10, 0),
    time: "10:00",
    status: "confirmed",
    type: "physical",
    location: "Paris 8ème",
  },
  {
    id: "2",
    doctorName: "Dr. Pierre Martin",
    specialty: "Dermatologie",
    date: new Date(2024, 0, 20, 14, 30),
    time: "14:30",
    status: "pending",
    type: "video",
  },
  {
    id: "3",
    doctorName: "Dr. Sophie Laurent",
    specialty: "Gynécologie",
    date: new Date(2023, 11, 28, 9, 0),
    time: "09:00",
    status: "completed",
    type: "physical",
    location: "Paris 16ème",
    notes: "Contrôle annuel effectué"
  }
];

type FilterType = "all" | "upcoming" | "past" | "cancelled";

export const AppointmentList = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [appointments] = useState(mockAppointments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "available";
      case "pending": return "default";
      case "cancelled": return "urgent";
      case "completed": return "certified";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmé";
      case "pending": return "En attente";
      case "cancelled": return "Annulé";
      case "completed": return "Terminé";
      default: return status;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date();
    switch (filter) {
      case "upcoming":
        return apt.date > now && apt.status !== "cancelled";
      case "past":
        return apt.date < now || apt.status === "completed";
      case "cancelled":
        return apt.status === "cancelled";
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold medical-text-gradient">
            Mes rendez-vous
          </h1>
          <Button className="medical-gradient text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>

        {/* Filters */}
        <MedicalCard className="mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Filtrer:</span>
            </div>
            {[
              { key: "all" as FilterType, label: "Tous" },
              { key: "upcoming" as FilterType, label: "À venir" },
              { key: "past" as FilterType, label: "Passés" },
              { key: "cancelled" as FilterType, label: "Annulés" }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </MedicalCard>

        {/* Appointments Timeline */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MedicalCard hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {appointment.doctorName.split(" ")[1]?.[0] || "D"}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                        <MedicalBadge 
                          variant={getStatusColor(appointment.status) as any}
                          pulse={appointment.status === "pending"}
                        >
                          {getStatusLabel(appointment.status)}
                        </MedicalBadge>
                      </div>
                      
                      <p className="text-gray-600">{appointment.specialty}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date.toLocaleDateString("fr-FR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center gap-1">
                          {appointment.type === "physical" ? (
                            <>
                              <MapPin className="w-4 h-4" />
                              {appointment.location}
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4" />
                              Téléconsultation
                            </>
                          )}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {appointment.status === "confirmed" && appointment.date > new Date() && (
                      <>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Annuler
                        </Button>
                      </>
                    )}
                    {appointment.type === "video" && appointment.status === "confirmed" && appointment.date <= new Date() && (
                      <Button className="medical-gradient text-white" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Rejoindre
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </MedicalCard>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <MedicalCard className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun rendez-vous trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              {filter === "all" 
                ? "Vous n'avez pas encore de rendez-vous planifiés."
                : `Aucun rendez-vous ${filter === "upcoming" ? "à venir" : filter === "past" ? "passé" : "annulé"}.`
              }
            </p>
            <Button className="medical-gradient text-white">
              Prendre un rendez-vous
            </Button>
          </MedicalCard>
        )}
      </div>
    </div>
  );
};
