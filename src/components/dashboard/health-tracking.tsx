
import { motion } from "framer-motion";
import { MedicalCard } from "@/components/ui/medical-card";
import { Activity, Heart, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "01/01", tension: 120, poids: 62, sommeil: 8 },
  { date: "02/01", tension: 125, poids: 61.8, sommeil: 7.5 },
  { date: "03/01", tension: 118, poids: 62.2, sommeil: 8.5 },
  { date: "04/01", tension: 122, poids: 61.5, sommeil: 7 },
  { date: "05/01", tension: 119, poids: 61.3, sommeil: 8 },
];

export const HealthTracking = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold medical-text-gradient mb-2">Suivi santé</h1>
        <p className="text-gray-600">Visualisez l'évolution de vos constantes vitales</p>
      </motion.div>

      {/* Health Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { title: "Tension artérielle", value: "120/80", trend: "stable", color: "text-green-600", icon: Heart },
          { title: "Poids", value: "61.3 kg", trend: "down", color: "text-blue-600", icon: TrendingDown },
          { title: "Sommeil", value: "8h/nuit", trend: "up", color: "text-purple-600", icon: TrendingUp },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <MedicalCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                  <div className={`text-sm font-medium ${metric.color}`}>
                    {metric.trend === "up" && "↗"}
                    {metric.trend === "down" && "↘"}
                    {metric.trend === "stable" && "→"}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
              </MedicalCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <MedicalCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Évolution de la tension</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tension" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </MedicalCard>

        <MedicalCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Évolution du poids</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="poids" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </MedicalCard>
      </div>

      {/* AI Suggestions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Suggestions IA</h2>
        <MedicalCard className="p-6 border-l-4 border-blue-500">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                Courbe de tension instable détectée
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Vos mesures de tension montrent une légère variabilité. Nous recommandons de consulter un cardiologue pour un suivi préventif.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Prendre rendez-vous →
              </button>
            </div>
          </div>
        </MedicalCard>
      </motion.section>
    </div>
  );
};
