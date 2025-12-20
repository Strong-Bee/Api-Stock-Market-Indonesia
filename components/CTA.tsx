"use client";

import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const CTA = () => {
  const [email, setEmail] = useState("");

  const features = [
    "30-day free trial with full access",
    "Up to 10,000 API calls per month",
    "All major exchanges included",
    "24/7 technical support",
    "WebSocket & REST API access",
  ];

  return (
    <section className="py-16">
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

        <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full -translate-x-32 translate-y-32" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 mb-4">
                <Sparkles className="h-4 w-4 text-cyan-400 mr-2" />
                <span className="text-sm font-medium text-cyan-400">
                  Start Building Today
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="gradient-text">Financial Application?</span>
              </h2>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                Bergabung dengan 1,200+ perusahaan yang menggunakan QuantumStock
                API untuk data saham real-time dan analisis mendalam.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold mb-4">
                  Get Started in Minutes
                </h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30"
                  />
                  <button className="group w-full px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-sm text-slate-400 text-center">
                    No credit card required • Cancel anytime
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                SOC2 Compliant
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                Enterprise SLA
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                GDPR Ready
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
