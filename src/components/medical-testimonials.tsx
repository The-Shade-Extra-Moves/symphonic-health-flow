
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";

export const MedicalTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Sarah Martin",
      role: "Cardiologue",
      type: "doctor",
      content: "Symphonic Health a révolutionné ma pratique. L'IA m'aide à identifier les patients à risque et à optimiser mes consultations. Mes patients sont plus engagés dans leur suivi.",
      rating: 5,
      avatar: "👩‍⚕️"
    },
    {
      name: "Marie Dubois",
      role: "Patiente",
      type: "patient", 
      content: "Enfin une app santé qui comprend mes besoins ! Les rappels intelligents et les recommandations personnalisées m'ont aidée à mieux gérer mon diabète.",
      rating: 5,
      avatar: "👩"
    },
    {
      name: "Dr. Antoine Leroy",
      role: "Médecin généraliste",
      type: "doctor",
      content: "La timeline des patients et les suggestions de l'IA me font gagner un temps précieux. Je peux me concentrer sur ce qui compte vraiment : soigner.",
      rating: 5,
      avatar: "👨‍⚕️"
    },
    {
      name: "Pierre Lambert",
      role: "Patient chronique",
      type: "patient",
      content: "Le suivi de mes traitements n'a jamais été aussi simple. L'IA détecte même les interactions médicamenteuses que j'aurais pu manquer.",
      rating: 5,
      avatar: "👨"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 medical-text-gradient">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que disent nos patients et professionnels de santé
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <MedicalCard className="text-center relative">
              <Quote className="w-12 h-12 text-blue-200 mx-auto mb-6" />
              
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="text-4xl">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600 mb-2">
                    {testimonials[currentIndex].role}
                  </div>
                  <MedicalBadge 
                    variant={testimonials[currentIndex].type === 'doctor' ? 'certified' : 'default'}
                  >
                    {testimonials[currentIndex].type === 'doctor' ? 'Professionnel vérifié' : 'Patient vérifié'}
                  </MedicalBadge>
                </div>
              </div>
            </MedicalCard>
          </motion.div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
