
import { useState } from "react";
import { PatientSidebar } from "@/components/dashboard/patient-sidebar";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { AppointmentsSection } from "@/components/dashboard/appointments-section";
import { MedicalRecords } from "@/components/dashboard/medical-records";
import { HealthTracking } from "@/components/dashboard/health-tracking";
import { MentalHealth } from "@/components/dashboard/mental-health";
import { DentalHealth } from "@/components/dashboard/dental-health";
import { Medications } from "@/components/dashboard/medications";
import { ChatAI } from "@/components/dashboard/chat-ai";
import { Settings } from "@/components/dashboard/settings";

export type DashboardSection = 
  | "home" 
  | "appointments" 
  | "medical-records" 
  | "health-tracking" 
  | "mental-health" 
  | "dental-health" 
  | "medications" 
  | "chat-ai" 
  | "settings";

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome />;
      case "appointments":
        return <AppointmentsSection />;
      case "medical-records":
        return <MedicalRecords />;
      case "health-tracking":
        return <HealthTracking />;
      case "mental-health":
        return <MentalHealth />;
      case "dental-health":
        return <DentalHealth />;
      case "medications":
        return <Medications />;
      case "chat-ai":
        return <ChatAI />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PatientSidebar
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

export default PatientDashboard;
