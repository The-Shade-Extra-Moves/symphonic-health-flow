
import { MedicalNavigation } from "@/components/medical-navigation";
import { MedicalHero } from "@/components/medical-hero";
import { MedicalFeatures } from "@/components/medical-features";
import { MedicalTestimonials } from "@/components/medical-testimonials";
import { MedicalCTA } from "@/components/medical-cta";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MedicalNavigation />
      
      <main className="pt-20">
        <MedicalHero />
        <MedicalFeatures />
        <MedicalTestimonials />
        <MedicalCTA />
      </main>

      <footer className="glass-card py-12 border-t border-white/20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="medical-text-gradient text-2xl font-bold mb-4">
            Symphonic Health
          </div>
          <p className="text-gray-600 mb-6">
            Votre santé, notre intelligence artificielle
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Conditions</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
