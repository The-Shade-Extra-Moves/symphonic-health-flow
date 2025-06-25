
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, User, MapPin, Video, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  avatar: string;
  available: boolean;
  consultationType: "physical" | "video" | "both";
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Marie Dubois",
    specialty: "Cardiologie",
    rating: 4.8,
    location: "Paris 8ème",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    available: true,
    consultationType: "both"
  },
  {
    id: "2",
    name: "Dr. Pierre Martin",
    specialty: "Dermatologie",
    rating: 4.9,
    location: "Paris 16ème",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    available: true,
    consultationType: "physical"
  }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

type BookingStep = "doctor" | "datetime" | "confirmation";

export const AppointmentBooking = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<"physical" | "video">("physical");

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep("datetime");
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep("confirmation");
    }
  };

  const handleBookingConfirm = () => {
    console.log("Booking confirmed:", {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      type: consultationType
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {["doctor", "datetime", "confirmation"].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentStep === step || (index < ["doctor", "datetime", "confirmation"].indexOf(currentStep)) 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-300 text-gray-600"
              }`}>
                {index + 1}
              </div>
              {index < 2 && (
                <div className={`w-16 h-1 mx-2 transition-colors ${
                  index < ["doctor", "datetime", "confirmation"].indexOf(currentStep)
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === "doctor" && (
            <div>
              <h1 className="text-3xl font-bold medical-text-gradient text-center mb-8">
                Choisissez votre médecin
              </h1>
              <div className="grid gap-6">
                {mockDoctors.map((doctor) => (
                  <MedicalCard
                    key={doctor.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{doctor.name}</h3>
                          {doctor.available && (
                            <MedicalBadge variant="available">Disponible</MedicalBadge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {doctor.location}
                          </div>
                          <div className="flex items-center gap-1">
                            ⭐ {doctor.rating}
                          </div>
                          <div className="flex items-center gap-2">
                            {doctor.consultationType === "both" || doctor.consultationType === "physical" ? (
                              <User className="w-4 h-4" />
                            ) : null}
                            {doctor.consultationType === "both" || doctor.consultationType === "video" ? (
                              <Video className="w-4 h-4" />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MedicalCard>
                ))}
              </div>
            </div>
          )}

          {currentStep === "datetime" && selectedDoctor && (
            <div>
              <h1 className="text-3xl font-bold medical-text-gradient text-center mb-8">
                Choisissez votre créneau
              </h1>
              <div className="grid lg:grid-cols-2 gap-8">
                <MedicalCard>
                  <h3 className="text-xl font-semibold mb-4">Sélectionnez une date</h3>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </MedicalCard>

                <MedicalCard>
                  <h3 className="text-xl font-semibold mb-4">Créneaux disponibles</h3>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? "bg-blue-600 text-white border-blue-600 animate-pulse-slow"
                            : "bg-white border-gray-300 hover:border-blue-400"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>

                  {selectedDoctor.consultationType === "both" && (
                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium">Type de consultation</h4>
                      <div className="flex gap-2">
                        <Button
                          variant={consultationType === "physical" ? "default" : "outline"}
                          onClick={() => setConsultationType("physical")}
                          className="flex-1"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Présentiel
                        </Button>
                        <Button
                          variant={consultationType === "video" ? "default" : "outline"}
                          onClick={() => setConsultationType("video")}
                          className="flex-1"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Vidéo
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleDateTimeConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full medical-gradient text-white"
                  >
                    Confirmer le créneau
                  </Button>
                </MedicalCard>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && selectedDoctor && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-8"
              >
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold medical-text-gradient mb-4">
                  Récapitulatif de votre rendez-vous
                </h1>
              </motion.div>

              <MedicalCard className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedDoctor.name}</h3>
                      <p className="text-gray-600">{selectedDoctor.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {selectedDate?.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {selectedTime}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    {consultationType === "physical" ? <User className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    {consultationType === "physical" ? "Consultation en présentiel" : "Téléconsultation"}
                  </div>
                </div>

                <Button
                  onClick={handleBookingConfirm}
                  className="w-full mt-6 medical-gradient text-white"
                >
                  Confirmer le rendez-vous
                </Button>
              </MedicalCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
