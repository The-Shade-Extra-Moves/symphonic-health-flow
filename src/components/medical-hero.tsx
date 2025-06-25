
import { motion } from "framer-motion";
import { Activity, Heart, Brain, Users, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicalHero = () => {
  const floatingIcons = [
    { Icon: Heart, delay: 0, position: "top-20 left-20" },
    { Icon: Brain, delay: 0.5, position: "top-32 right-32" },
    { Icon: Activity, delay: 1, position: "bottom-32 left-32" },
    { Icon: Shield, delay: 1.5, position: "bottom-20 right-20" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond animé avec SVG médical */}
      <div className="absolute inset-0 opacity-10">
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 1 }}
          >
            <Icon className="w-16 h-16 text-blue-500 animate-float" />
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 medical-text-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Symphonic Health
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Votre santé orchestrée par l'intelligence artificielle. 
            Prenez rendez-vous, consultez vos médecins et suivez votre parcours santé en toute simplicité.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="medical-gradient text-white px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Prendre rendez-vous
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-white/30 px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform"
            >
              <Users className="mr-2 w-5 h-5" />
              Trouver mon médecin
            </Button>
          </motion.div>
        </motion.div>

        {/* Statistiques animées */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { number: "50K+", label: "Patients satisfaits", icon: Users },
            { number: "1200+", label: "Médecins certifiés", icon: Shield },
            { number: "24/7", label: "Assistance IA", icon: Brain },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card text-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-3xl font-bold medical-text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 pointer-events-none" />
    </section>
  );
};
