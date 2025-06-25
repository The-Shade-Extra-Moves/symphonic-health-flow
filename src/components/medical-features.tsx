
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Calendar, MapPin, MessageSquare, Activity, Shield } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";

export const MedicalFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: "IA Médicale Avancée",
      description: "Recommandations personnalisées basées sur votre profil et vos antécédents médicaux",
      color: "text-purple-500"
    },
    {
      icon: Calendar,
      title: "Réservation Intelligente",
      description: "Trouvez et réservez des créneaux avec les meilleurs spécialistes en temps réel",
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      title: "Carte Médicale Interactive",
      description: "Localisez médecins, hôpitaux et pharmacies près de chez vous avec indicateurs live",
      color: "text-green-500"
    },
    {
      icon: MessageSquare,
      title: "Consultation Virtuelle",
      description: "Téléconsultations sécurisées avec génération automatique d'ordonnances",
      color: "text-orange-500"
    },
    {
      icon: Activity,
      title: "Suivi Personnalisé",
      description: "Timeline de santé intelligente avec rappels et suggestions proactives",
      color: "text-red-500"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Données chiffrées et conformité RGPD pour protéger votre vie privée",
      color: "text-indigo-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 medical-text-gradient">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme complète qui révolutionne votre parcours de soins grâce à l'intelligence artificielle
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MedicalCard className="h-full text-center group">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center ${feature.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:medical-text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </MedicalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
