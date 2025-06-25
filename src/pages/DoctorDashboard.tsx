
import { useState } from "react";
import { DoctorSidebar } from "@/components/dashboard/doctor/doctor-sidebar";
import { DoctorOverview } from "@/components/dashboard/doctor/doctor-overview";
import { PatientList } from "@/components/dashboard/doctor/patient-list";
import { PatientDossier } from "@/components/dashboard/doctor/patient-dossier";
import { DoctorAgenda } from "@/components/dashboard/doctor/doctor-agenda";
import { AddPatientForm } from "@/components/dashboard/doctor/add-patient-form";
import { AppointmentManagement } from "@/components/dashboard/doctor/appointment-management";
import { AnimatePresence } from "framer-motion";

export type DoctorDashboardSection = 
  | "overview" 
  | "patients" 
  | "consultations" 
  | "agenda" 
  | "patient-dossier" 
  | "appointment-management"
  | "settings";

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState<DoctorDashboardSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showAddPatient, setShowAddPatient] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DoctorOverview 
          onPatientSelect={(patientId) => {
            setSelectedPatientId(patientId);
            setActiveSection("patient-dossier");
          }}
          onAddPatient={() => setShowAddPatient(true)}
        />;
      case "patients":
        return <PatientList onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "consultations":
        return <AppointmentManagement onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "agenda":
        return <DoctorAgenda onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "patient-dossier":
        return <PatientDossier 
          patientId={selectedPatientId} 
          onBack={() => setActiveSection("patients")} 
        />;
      case "appointment-management":
        return <AppointmentManagement onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "settings":
        return <DoctorOverview onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      default:
        return <DoctorOverview onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DoctorSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="lg:pl-64 transition-all duration-300">
        <main className="p-4 lg:p-8">
          {renderActiveSection()}
        </main>
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddPatient && (
          <AddPatientForm
            onClose={() => setShowAddPatient(false)}
            onPatientAdded={(patientId) => {
              setSelectedPatientId(patientId);
              setActiveSection("patient-dossier");
              setShowAddPatient(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDashboard;
