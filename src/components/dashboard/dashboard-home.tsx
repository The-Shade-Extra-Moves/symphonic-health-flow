import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalBadge } from "@/components/ui/medical-badge";
import { Calendar, Activity, Heart, Pill, TrendingUp } from "lucide-react";

const healthMetrics = [
  { label: "Tension", value: "120/80", status: "normal", color: "bg-green-100 text-green-800" },
  { label: "IMC", value: "22.5", status: "normal", color: "bg-green-100 text-green-800" },
  { label: "Humeur", value: "Bonne", status: "positive", color: "bg-blue-100 text-blue-800" },
];

const upcomingActions = [
  { type: "rdv", title: "Consultation cardiologue", date: "Demain 14h30", icon: Calendar },
  { type: "analyse", title: "Prise de sang", date: "Vendredi 9h00", icon: Activity },
  { type: "vaccin", title: "Rappel grippe", date: "Dans 2 semaines", icon: Heart },
];

const kpiData = [
  { title: "Prochains RDV", value: "3", icon: Calendar, trend: "+1" },
  { title: "Médicaments actifs", value: "2", icon: Pill, trend: "stable" },
  { title: "Consultations ce mois", value: "4", icon: Activity, trend: "+2" },
  { title: "Points fidélité", value: "150", icon: TrendingUp, trend: "+25" },
];

export const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold medical-text-gradient mb-2">
          Bonjour Marie 👋
        </h1>
        <p className="text-gray-600">Voici un aperçu de votre état de santé</p>
      </motion.div>

      {/* Health Status Widget */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">État de santé actuel</h2>
        <MedicalCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-white to-gray-50"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${metric.color} mb-2`}>
                  {metric.label}
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              </motion.div>
            ))}
          </div>
        </MedicalCard>
      </motion.section>

      {/* Timeline of Upcoming Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Prochaines actions</h2>
        <div className="space-y-4">
          {upcomingActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <MedicalCard className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full medical-gradient">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-gray-600">{action.date}</p>
                    </div>
                    <MedicalBadge variant="default">
                      {action.type}
                    </MedicalBadge>
                  </div>
                </MedicalCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* KPI Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Statistiques rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <MedicalCard className="p-6 text-center">
                  <div className="p-3 rounded-full medical-gradient mx-auto mb-4 w-fit">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{kpi.title}</div>
                  <MedicalBadge variant="available" className="text-xs">
                    {kpi.trend}
                  </MedicalBadge>
                </MedicalCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Notifications intelligentes</h2>
        <div className="space-y-3">
          <MedicalCard className="p-4 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Pill className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Rappel traitement</h3>
                <p className="text-sm text-gray-600">N'oubliez pas de prendre votre médicament ce soir</p>
              </div>
            </div>
          </MedicalCard>
          
          <MedicalCard className="p-4 border-l-4 border-green-500">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-green-100">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Résultats disponibles</h3>
                <p className="text-sm text-gray-600">Vos analyses de sang sont prêtes à consulter</p>
              </div>
            </div>
          </MedicalCard>
        </div>
      </motion.section>
    </div>
  );
};
