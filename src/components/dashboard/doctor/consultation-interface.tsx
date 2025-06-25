
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  FileText, 
  Pill, 
  Activity,
  Save,
  Send,
  AlertTriangle,
  Heart,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsultationInterfaceProps {
  patientId: string;
  appointmentId: string;
  onClose: () => void;
}

interface ConsultationData {
  symptoms: string;
  examination: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  followUp: string;
}

const patientData = {
  id: "1",
  name: "Marie Dupont",
  age: 45,
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  bloodType: "A+",
  lastVisit: "2024-01-15",
  conditions: ["Hypertension", "Cholestérol élevé"],
  allergies: ["Pénicilline"],
  currentMedications: ["Amlodipine 5mg", "Atorvastatine 20mg"]
};

export const ConsultationInterface = ({ patientId, appointmentId, onClose }: ConsultationInterfaceProps) => {
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    symptoms: "",
    examination: "",
    diagnosis: "",
    prescription: "",
    notes: "",
    followUp: ""
  });
  
  const [consultationTime, setConsultationTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setConsultationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    // Simuler des suggestions IA basées sur les symptômes
    if (consultationData.symptoms.length > 10) {
      setAiSuggestions([
        "Vérifier la tension artérielle",
        "Examiner les réflexes",
        "Contrôler le poids",
        "Évaluer l'observance médicamenteuse"
      ]);
    }
  }, [consultationData.symptoms]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateConsultationData = (field: keyof ConsultationData, value: string) => {
    setConsultationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Consultation sauvegardée",
      description: "Les données de la consultation ont été sauvegardées.",
    });
  };

  const handleComplete = async () => {
    setIsTimerRunning(false);
    
    // Simuler la finalisation de la consultation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Consultation terminée",
      description: "Le compte-rendu a été généré et envoyé au patient.",
    });
    
    onClose();
  };

  const generatePrescription = () => {
    const prescription = `
Prescriptions pour ${patientData.name}:

1. Amlodipine 5mg - 1 comprimé par jour le matin
2. Atorvastatine 20mg - 1 comprimé le soir au coucher
3. Contrôle biologique dans 3 mois

Conseils:
- Régime pauvre en sel
- Activité physique modérée 30min/jour
- Surveillance tension artérielle

Prochain RDV: Dans 3 mois
    `.trim();
    
    updateConsultationData("prescription", prescription);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={patientData.avatar} />
                  <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{patientData.name}</h2>
                  <p className="text-gray-600">{patientData.age} ans • Consultation en cours</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2 text-2xl font-mono font-bold text-blue-600">
                  <Clock className="w-6 h-6" />
                  <span>{formatTime(consultationTime)}</span>
                </div>
                <p className="text-sm text-gray-600">Durée consultation</p>
              </div>
              <Button
                variant={isTimerRunning ? "destructive" : "default"}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? "Pause" : "Reprendre"}
              </Button>
            </div>
          </div>

          {/* Alertes patient */}
          <div className="flex space-x-2">
            {patientData.allergies.map((allergy, index) => (
              <MedicalBadge key={index} variant="urgent" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Allergie: {allergy}
              </MedicalBadge>
            ))}
            {patientData.conditions.map((condition, index) => (
              <MedicalBadge key={index} variant="certified" className="text-xs">
                <Heart className="w-3 h-3 mr-1" />
                {condition}
              </MedicalBadge>
            ))}
          </div>
        </div>

        <div className="flex h-[calc(95vh-200px)]">
          {/* Sidebar - Résumé patient */}
          <div className="w-80 p-6 border-r bg-gray-50 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Résumé médical</h3>
            
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm">Dernière visite</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{patientData.lastVisit}</p>
                <p className="text-sm">Contrôle hypertension - TA stable</p>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm">Traitements actuels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {patientData.currentMedications.map((med, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Pill className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{med}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {aiSuggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-blue-600">Suggestions IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <Activity className="w-3 h-3 mt-1 text-blue-500" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main consultation area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Motif de consultation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Motif de consultation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Décrivez les symptômes et motifs de consultation..."
                    value={consultationData.symptoms}
                    onChange={(e) => updateConsultationData("symptoms", e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Examen clinique */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Examen clinique</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Observations lors de l'examen physique..."
                    value={consultationData.examination}
                    onChange={(e) => updateConsultationData("examination", e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Diagnostic */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Diagnostic</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Diagnostic et conclusions..."
                    value={consultationData.diagnosis}
                    onChange={(e) => updateConsultationData("diagnosis", e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Prescription */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5" />
                    <span>Prescription</span>
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={generatePrescription}>
                    Générer prescription
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Prescriptions et recommandations..."
                    value={consultationData.prescription}
                    onChange={(e) => updateConsultationData("prescription", e.target.value)}
                    rows={6}
                  />
                </CardContent>
              </Card>

              {/* Notes privées */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Notes privées</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Notes personnelles (non partagées avec le patient)..."
                    value={consultationData.notes}
                    onChange={(e) => updateConsultationData("notes", e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Fermer sans terminer
            </Button>
            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4 mr-2" />
              Terminer la consultation
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
