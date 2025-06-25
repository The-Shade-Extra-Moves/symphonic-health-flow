
import { motion } from "framer-motion";
import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Phone, 
  Calendar, 
  FileText, 
  Grid3X3, 
  List,
  Heart,
  AlertTriangle,
  Clock
} from "lucide-react";

interface PatientListProps {
  onPatientSelect: (patientId: string) => void;
}

const patients = [
  {
    id: "1",
    name: "Marie Dupont",
    age: 45,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "chronic",
    lastVisit: "2024-01-15",
    condition: "Hypertension",
    insurance: "CNAM",
    urgency: "low",
    phone: "06 12 34 56 78"
  },
  {
    id: "2",
    name: "Jean Martin",
    age: 62,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "follow-up",
    lastVisit: "2024-01-20",
    condition: "Diabète type 2",
    insurance: "Privé",
    urgency: "medium",
    phone: "06 98 76 54 32"
  },
  {
    id: "3",
    name: "Sophie Bernard",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "urgent",
    lastVisit: "2024-01-22",
    condition: "Tachycardie",
    insurance: "CNAM",
    urgency: "high",
    phone: "06 45 67 89 01"
  },
  {
    id: "4",
    name: "Pierre Durand",
    age: 55,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "chronic",
    lastVisit: "2024-01-10",
    condition: "Arthrose",
    insurance: "Privé",
    urgency: "low",
    phone: "06 23 45 67 89"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "chronic": return "bg-blue-100 text-blue-800";
    case "follow-up": return "bg-green-100 text-green-800";
    case "urgent": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "chronic": return "Chronique";
    case "follow-up": return "Suivi";
    case "urgent": return "Urgence";
    default: return "Normal";
  }
};

const getUrgencyIcon = (urgency: string) => {
  switch (urgency) {
    case "high": return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case "medium": return <Clock className="w-4 h-4 text-orange-500" />;
    case "low": return <Heart className="w-4 h-4 text-green-500" />;
    default: return null;
  }
};

export const PatientList = ({ onPatientSelect }: PatientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient">Patients</h1>
        <p className="text-gray-600">Gérez votre patientèle</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher un patient ou une pathologie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="chronic">Chroniques</TabsTrigger>
              <TabsTrigger value="follow-up">Suivi</TabsTrigger>
              <TabsTrigger value="urgent">Urgences</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Patient List/Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <MedicalCard className="p-6" hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          {getUrgencyIcon(patient.urgency)}
                        </div>
                        <p className="text-sm text-gray-600">{patient.age} ans • {patient.condition}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-gray-500">Dernière visite: {patient.lastVisit}</span>
                          <MedicalBadge variant={patient.insurance === "CNAM" ? "available" : "premium"} className="text-xs">
                            {patient.insurance}
                          </MedicalBadge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MedicalBadge variant={patient.status === "urgent" ? "urgent" : patient.status === "chronic" ? "certified" : "available"}>
                        {getStatusLabel(patient.status)}
                      </MedicalBadge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => onPatientSelect(patient.id)}>
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </MedicalCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              >
                <MedicalCard className="p-6 text-center" hover onClick={() => onPatientSelect(patient.id)}>
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    {getUrgencyIcon(patient.urgency)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{patient.age} ans</p>
                  <p className="text-sm text-gray-800 mb-3">{patient.condition}</p>
                  <div className="space-y-2">
                    <MedicalBadge variant={patient.status === "urgent" ? "urgent" : patient.status === "chronic" ? "certified" : "available"}>
                      {getStatusLabel(patient.status)}
                    </MedicalBadge>
                    <MedicalBadge variant={patient.insurance === "CNAM" ? "available" : "premium"} className="text-xs">
                      {patient.insurance}
                    </MedicalBadge>
                  </div>
                </MedicalCard>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
