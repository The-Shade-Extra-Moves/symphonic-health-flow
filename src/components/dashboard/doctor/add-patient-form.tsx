
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Heart, 
  FileText, 
  Upload,
  Check,
  Calendar,
  Scan
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPatientFormProps {
  onClose: () => void;
  onPatientAdded?: (patientId: string) => void;
}

interface PatientData {
  // Informations générales
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  
  // Informations médicales
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  
  // Informations administratives
  socialSecurity: string;
  insurance: string;
  insuranceNumber: string;
  
  // Documents
  documents: File[];
}

const steps = [
  { id: 1, title: "Informations générales", icon: User },
  { id: 2, title: "Informations médicales", icon: Heart },
  { id: 3, title: "Informations administratives", icon: FileText },
  { id: 4, title: "Récapitulatif", icon: Check }
];

export const AddPatientForm = ({ onClose, onPatientAdded }: AddPatientFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    bloodType: "",
    allergies: [],
    chronicConditions: [],
    socialSecurity: "",
    insurance: "",
    insuranceNumber: "",
    documents: []
  });
  
  const { toast } = useToast();

  const updatePatientData = (field: keyof PatientData, value: any) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const addAllergy = (allergy: string) => {
    if (allergy && !patientData.allergies.includes(allergy)) {
      updatePatientData("allergies", [...patientData.allergies, allergy]);
    }
  };

  const removeAllergy = (allergy: string) => {
    updatePatientData("allergies", patientData.allergies.filter(a => a !== allergy));
  };

  const addCondition = (condition: string) => {
    if (condition && !patientData.chronicConditions.includes(condition)) {
      updatePatientData("chronicConditions", [...patientData.chronicConditions, condition]);
    }
  };

  const removeCondition = (condition: string) => {
    updatePatientData("chronicConditions", patientData.chronicConditions.filter(c => c !== condition));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simuler l'ajout du patient
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const patientId = `patient_${Date.now()}`;
      
      toast({
        title: "Patient ajouté avec succès",
        description: `${patientData.firstName} ${patientData.lastName} a été ajouté à votre patientèle.`,
      });
      
      onPatientAdded?.(patientId);
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du patient.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={patientData.firstName}
                  onChange={(e) => updatePatientData("firstName", e.target.value)}
                  placeholder="Prénom du patient"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={patientData.lastName}
                  onChange={(e) => updatePatientData("lastName", e.target.value)}
                  placeholder="Nom du patient"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Sexe</Label>
                <select
                  id="gender"
                  value={patientData.gender}
                  onChange={(e) => updatePatientData("gender", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <div>
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={patientData.birthDate}
                  onChange={(e) => updatePatientData("birthDate", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={patientData.phone}
                  onChange={(e) => updatePatientData("phone", e.target.value)}
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={patientData.email}
                  onChange={(e) => updatePatientData("email", e.target.value)}
                  placeholder="patient@email.com"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="bloodType">Groupe sanguin</Label>
              <select
                id="bloodType"
                value={patientData.bloodType}
                onChange={(e) => updatePatientData("bloodType", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Sélectionner</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div>
              <Label>Allergies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {patientData.allergies.map((allergy, index) => (
                  <MedicalBadge key={index} variant="urgent" className="cursor-pointer" onClick={() => removeAllergy(allergy)}>
                    {allergy} ×
                  </MedicalBadge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une allergie"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addAllergy(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
            
            <div>
              <Label>Pathologies chroniques</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {patientData.chronicConditions.map((condition, index) => (
                  <MedicalBadge key={index} variant="certified" className="cursor-pointer" onClick={() => removeCondition(condition)}>
                    {condition} ×
                  </MedicalBadge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une pathologie"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addCondition(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="socialSecurity">Numéro de sécurité sociale</Label>
              <Input
                id="socialSecurity"
                value={patientData.socialSecurity}
                onChange={(e) => updatePatientData("socialSecurity", e.target.value)}
                placeholder="1 78 12 75 123 456 78"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insurance">Type d'assurance</Label>
                <select
                  id="insurance"
                  value={patientData.insurance}
                  onChange={(e) => updatePatientData("insurance", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="CNAM">CNAM</option>
                  <option value="Privé">Privé</option>
                  <option value="Mixte">Mixte</option>
                </select>
              </div>
              <div>
                <Label htmlFor="insuranceNumber">Numéro d'adhérent</Label>
                <Input
                  id="insuranceNumber"
                  value={patientData.insuranceNumber}
                  onChange={(e) => updatePatientData("insuranceNumber", e.target.value)}
                  placeholder="Numéro d'adhérent"
                />
              </div>
            </div>
            
            <div>
              <Label>Documents initiaux</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Glissez vos documents ici ou cliquez pour sélectionner</p>
                <Button variant="outline" size="sm">
                  <Scan className="w-4 h-4 mr-2" />
                  Scanner carte CNAM
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl">
                  {patientData.firstName[0]}{patientData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold text-gray-900">
                {patientData.firstName} {patientData.lastName}
              </h3>
              <p className="text-gray-600">{patientData.gender === 'M' ? 'Masculin' : 'Féminin'} • {patientData.birthDate}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Téléphone:</strong> {patientData.phone}</p>
                  <p><strong>Email:</strong> {patientData.email}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Médical</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Groupe sanguin:</strong> {patientData.bloodType}</p>
                  <div>
                    <strong>Allergies:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patientData.allergies.map((allergy, index) => (
                        <MedicalBadge key={index} variant="urgent" className="text-xs">
                          {allergy}
                        </MedicalBadge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assurance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Type:</strong> {patientData.insurance}</p>
                <p><strong>Sécurité sociale:</strong> {patientData.socialSecurity}</p>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ajouter un patient</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>
          
          {/* Progress bar */}
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 rounded-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mt-4">
            {steps[currentStep - 1]?.title}
          </h3>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>
        
        <div className="p-6 border-t flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>
          
          <div className="flex space-x-2">
            {currentStep < 4 ? (
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Créer RDV maintenant
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Ajout en cours..." : "Ajouter le patient"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
