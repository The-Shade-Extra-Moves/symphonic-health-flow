
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicalCTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="glass-card text-center p-12 md:p-16 rounded-3xl medical-gradient relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Formes décoratives */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Prêt à transformer votre santé ?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Rejoignez des milliers de patients et professionnels qui utilisent déjà Symphonic Health pour optimiser leurs soins.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90 px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform group"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform"
              >
                Voir la démo
              </Button>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span>Application mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                <span>Interface web</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 text-center">🔒</span>
                <span>100% sécurisé</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
