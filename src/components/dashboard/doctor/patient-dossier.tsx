
import { motion } from "framer-motion";
import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  User, 
  FileText, 
  Pill, 
  Activity, 
  Upload,
  Edit,
  Calendar,
  Heart,
  AlertTriangle,
  Phone,
  Mail
} from "lucide-react";

interface PatientDossierProps {
  patientId: string | null;
  onBack: () => void;
}

const patientData = {
  id: "1",
  name: "Marie Dupont",
  age: 45,
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  phone: "06 12 34 56 78",
  email: "marie.dupont@email.com",
  address: "123 Rue de la Santé, 75014 Paris",
  bloodType: "A+",
  weight: "65 kg",
  height: "1.68 m",
  socialSecurity: "1 78 12 75 123 456 78",
  insurance: "CNAM",
  emergencyContact: "Pierre Dupont - 06 98 76 54 32",
  allergies: ["Pénicilline", "Acariens"],
  conditions: ["Hypertension", "Cholestérol élevé"],
};

const consultations = [
  {
    id: "1",
    date: "2024-01-20",
    type: "Consultation cardiologique",
    doctor: "Dr. Martin",
    summary: "Contrôle tension artérielle. TA stable à 130/85. Poursuite du traitement.",
    prescriptions: ["Amlodipine 5mg", "Atorvastatine 20mg"]
  },
  {
    id: "2", 
    date: "2024-01-15",
    type: "Bilan sanguin",
    doctor: "Dr. Martin",
    summary: "Résultats satisfaisants. Légère amélioration du cholestérol.",
    prescriptions: []
  },
];

const prescriptions = [
  {
    id: "1",
    medication: "Amlodipine 5mg",
    dosage: "1 comprimé par jour",
    duration: "3 mois",
    prescriber: "Dr. Martin",
    date: "2024-01-20",
    active: true
  },
  {
    id: "2",
    medication: "Atorvastatine 20mg", 
    dosage: "1 comprimé le soir",
    duration: "6 mois",
    prescriber: "Dr. Martin",
    date: "2024-01-20",
    active: true
  },
];

const analyses = [
  {
    id: "1",
    type: "Bilan lipidique",
    date: "2024-01-15",
    results: "Cholestérol total: 2.1 g/L",
    status: "Normal",
    file: "bilan-lipidique-2024-01-15.pdf"
  },
  {
    id: "2",
    type: "ECG",
    date: "2024-01-10", 
    results: "Rythme sinusal normal",
    status: "Normal",
    file: "ecg-2024-01-10.pdf"
  },
];

export const PatientDossier = ({ patientId, onBack }: PatientDossierProps) => {
  const [activeTab, setActiveTab] = useState("info");

  if (!patientId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Aucun patient sélectionné</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold medical-text-gradient">Dossier Patient</h1>
            <p className="text-gray-600">{patientData.name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Appeler
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Nouveau RDV
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </motion.div>

      {/* Patient Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MedicalCard className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={patientData.avatar} />
              <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{patientData.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{patientData.age} ans</p>
                  <p>Groupe sanguin: {patientData.bloodType}</p>
                  <p>{patientData.weight} • {patientData.height}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{patientData.phone}</p>
                  <p>{patientData.email}</p>
                  <p className="text-xs">{patientData.address}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Conditions</h4>
                <div className="space-y-1">
                  {patientData.conditions.map((condition, index) => (
                    <MedicalBadge key={index} variant="certified" className="text-xs mr-1">
                      {condition}
                    </MedicalBadge>
                  ))}
                </div>
                <div className="mt-2 space-y-1">
                  {patientData.allergies.map((allergy, index) => (
                    <MedicalBadge key={index} variant="urgent" className="text-xs mr-1">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {allergy}
                    </MedicalBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MedicalCard>
      </motion.div>

      {/* Detailed Information Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="analyses">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Informations personnelles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Sécurité sociale</label>
                    <p className="text-gray-900">{patientData.socialSecurity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assurance</label>
                    <MedicalBadge variant="available">{patientData.insurance}</MedicalBadge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact urgence</label>
                    <p className="text-gray-900">{patientData.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Antécédents médicaux</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Allergies</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {patientData.allergies.map((allergy, index) => (
                          <MedicalBadge key={index} variant="urgent" className="text-xs">
                            {allergy}
                          </MedicalBadge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Conditions chroniques</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {patientData.conditions.map((condition, index) => (
                          <MedicalBadge key={index} variant="certified" className="text-xs">
                            {condition}
                          </MedicalBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="mt-6">
            <div className="space-y-4">
              {consultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{consultation.type}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{consultation.date}</span>
                          <MedicalBadge variant="available">{consultation.doctor}</MedicalBadge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{consultation.summary}</p>
                      {consultation.prescriptions.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Prescriptions</label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {consultation.prescriptions.map((prescription, i) => (
                              <MedicalBadge key={i} variant="certified" className="text-xs">
                                {prescription}
                              </MedicalBadge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-full medical-gradient">
                            <Pill className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{prescription.medication}</h3>
                            <p className="text-gray-600">{prescription.dosage}</p>
                            <p className="text-sm text-gray-500">Durée: {prescription.duration}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-sm text-gray-600">Prescrit par {prescription.prescriber}</span>
                              <span className="text-sm text-gray-500">le {prescription.date}</span>
                            </div>
                          </div>
                        </div>
                        <MedicalBadge variant={prescription.active ? "available" : "default"}>
                          {prescription.active ? "Actif" : "Arrêté"}
                        </MedicalBadge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analyses" className="mt-6">
            <div className="space-y-4">
              {analyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-full medical-gradient">
                            <Activity className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{analysis.type}</h3>
                            <p className="text-gray-600">{analysis.results}</p>
                            <p className="text-sm text-gray-500">{analysis.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MedicalBadge variant="available">{analysis.status}</MedicalBadge>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Voir PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                  <CardContent className="p-8 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Ajouter un document</h3>
                    <p className="text-sm text-gray-600 mb-4">Téléchargez un nouveau résultat d'analyse</p>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
