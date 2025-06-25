
import { useState } from "react";
import { DoctorSidebar } from "@/components/dashboard/doctor/doctor-sidebar";
import { DoctorOverview } from "@/components/dashboard/doctor/doctor-overview";
import { PatientList } from "@/components/dashboard/doctor/patient-list";
import { PatientDossier } from "@/components/dashboard/doctor/patient-dossier";
import { DoctorAgenda } from "@/components/dashboard/doctor/doctor-agenda";

export type DoctorDashboardSection = 
  | "overview" 
  | "patients" 
  | "consultations" 
  | "agenda" 
  | "patient-dossier" 
  | "settings";

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState<DoctorDashboardSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DoctorOverview onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "patients":
        return <PatientList onPatientSelect={(patientId) => {
          setSelectedPatientId(patientId);
          setActiveSection("patient-dossier");
        }} />;
      case "consultations":
        return <DoctorOverview onPatientSelect={(patientId) => {
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
    </div>
  );
};

export default DoctorDashboard;
