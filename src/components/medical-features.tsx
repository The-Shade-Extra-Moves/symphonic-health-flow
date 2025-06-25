
import { motion } from "framer-motion";
import { Brain, Shield, Clock, Users, Stethoscope, Zap } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";

const features = [
  {
    icon: Brain,
    title: "IA Médicale Avancée",
    description: "Diagnostic assisté par intelligence artificielle pour une précision optimale",
    badge: "Premium",
    color: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description: "Données médicales chiffrées et conformes RGPD pour votre tranquillité",
    badge: "Certifié",
    color: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Suivi en Temps Réel",
    description: "Monitoring continu de votre santé avec alertes intelligentes",
    badge: "Disponible",
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "Réseau Médical",
    description: "Accès à un réseau de professionnels de santé qualifiés",
    badge: "Default",
    color: "text-indigo-600",
  },
  {
    icon: Stethoscope,
    title: "Téléconsultation",
    description: "Consultations à distance sécurisées avec vos praticiens",
    badge: "Urgent",
    color: "text-red-600",
  },
  {
    icon: Zap,
    title: "Réactivité Instantanée",
    description: "Réponses immédiates pour vos urgences médicales",
    badge: "Premium",
    color: "text-yellow-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75] as any,
    },
  },
};

export const MedicalFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold medical-text-gradient mb-6">
            Technologies de Pointe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment notre plateforme révolutionne votre expérience de santé
            grâce à l'intelligence artificielle et aux dernières innovations médicales.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MedicalCard hover glow={index % 2 === 0}>
                <div className="text-center">
                  <div className={`w-16 h-16 ${feature.color} bg-gradient-to-br from-current to-current/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <MedicalBadge 
                      variant={feature.badge.toLowerCase() as any}
                      pulse={feature.badge === "Urgent"}
                    >
                      {feature.badge}
                    </MedicalBadge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </MedicalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
