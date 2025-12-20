"use client";

import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Real-time",
      description: "Data dengan latency <50ms",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Enterprise",
      description: "99.99% SLA guarantee",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Globe,
      title: "Global",
      description: "80+ bursa saham dunia",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
          <span className="text-sm font-medium text-cyan-400">
            🚀 v2.1.0 Released
          </span>
          <span className="ml-2 text-xs text-slate-400">
            WebSocket API Now Available
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block">Data Saham</span>
          <span className="block gradient-text">Enterprise-Grade</span>
          <span className="block">Untuk Aplikasi Modern</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Platform API data saham terdepan dengan real-time streaming, analisis
          mendalam, dan keandalan tingkat enterprise untuk aplikasi trading,
          fintech, dan analisis keuangan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center">
            Mulai Gratis 30 Hari
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group px-8 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center">
            <span className="group-hover:text-cyan-300 transition-colors">
              Jadwalkan Demo
            </span>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer group ${
                hoveredFeature === index ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
