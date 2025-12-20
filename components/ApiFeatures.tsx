"use client";

import {
  Zap,
  Database,
  Shield,
  LineChart,
  Globe,
  Cpu,
  Clock,
  Users,
} from "lucide-react";

const ApiFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Ultra Low Latency",
      description: "Real-time data dengan latency <50ms menggunakan WebSocket",
      color: "from-cyan-500 to-blue-500",
      stats: "<50ms",
    },
    {
      icon: Database,
      title: "Comprehensive Coverage",
      description: "80+ bursa saham global dengan data historis lengkap",
      color: "from-emerald-500 to-green-500",
      stats: "80+ Markets",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, DDoS protection, dan SOC2 compliance",
      color: "from-violet-500 to-purple-500",
      stats: "99.99% SLA",
    },
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description: "100+ indikator teknikal dan analisis fundamental",
      color: "from-rose-500 to-pink-500",
      stats: "100+ Indicators",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Edge nodes di 15 region untuk performa optimal",
      color: "from-orange-500 to-amber-500",
      stats: "15 Regions",
    },
    {
      icon: Cpu,
      title: "High Throughput",
      description: "Mendukung hingga 10,000 requests per second",
      color: "from-indigo-500 to-blue-500",
      stats: "10k RPS",
    },
  ];

  const metrics = [
    { label: "Active Customers", value: "1,200+", icon: Users },
    { label: "Uptime (30 days)", value: "99.97%", icon: Shield },
    { label: "Avg Response Time", value: "85ms", icon: Clock },
    { label: "Data Points", value: "5.2B", icon: Database },
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-4">
          <span className="text-sm font-medium text-cyan-400">
            ✨ Enterprise Features
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Built for <span className="gradient-text">High-Performance</span>{" "}
          Applications
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Platform API yang dirancang khusus untuk aplikasi trading, fintech,
          dan analisis keuangan dengan kebutuhan real-time dan skalabilitas
          tinggi.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold bg-slate-800/50 px-3 py-1 rounded-full">
                {feature.stats}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-slate-800 p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <metric.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-2">{metric.value}</div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApiFeatures;
