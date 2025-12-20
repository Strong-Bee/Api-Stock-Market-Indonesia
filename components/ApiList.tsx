"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Terminal,
  Zap,
  Database,
  LineChart,
  Shield,
  Check,
} from "lucide-react";

interface ApiEndpoint {
  id: number;
  name: string;
  description: string;
  method: "GET" | "POST" | "WS";
  endpoint: string;
  category: string;
  latency: string;
  requiresAuth: boolean;
  rateLimit: string;
  features: string[];
}

const ApiList = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedEndpoint, setCopiedEndpoint] = useState<number | null>(null);

  const apiEndpoints: ApiEndpoint[] = [
    {
      id: 1,
      name: "Real-time Quotes",
      description:
        "Streaming real-time harga saham dengan WebSocket. Mendukung 80+ bursa global dengan latency <50ms.",
      method: "WS",
      endpoint: "/ws/v1/quotes",
      category: "Real-time",
      latency: "<50ms",
      requiresAuth: true,
      rateLimit: "Unlimited (WS)",
      features: ["WebSocket", "Real-time", "<50ms latency", "80+ markets"],
    },
    {
      id: 2,
      name: "Historical Data",
      description:
        "Data historis lengkap dengan interval 1m, 5m, 1h, 1d. Tersedia sejak 1980 untuk major indices.",
      method: "GET",
      endpoint: "/api/v1/historical/{symbol}",
      category: "Historical",
      latency: "<100ms",
      requiresAuth: true,
      rateLimit: "1000/hour",
      features: [
        "Multi-interval",
        "Adjusted prices",
        "Split/dividend data",
        "30+ years history",
      ],
    },
    {
      id: 3,
      name: "Technical Indicators",
      description:
        "100+ indikator teknikal termasuk MA, RSI, MACD, Bollinger Bands dengan backtesting capabilities.",
      method: "GET",
      endpoint: "/api/v1/technical/{symbol}/{indicator}",
      category: "Analytics",
      latency: "<200ms",
      requiresAuth: true,
      rateLimit: "500/hour",
      features: [
        "100+ indicators",
        "Custom parameters",
        "Backtesting",
        "Multi-timeframe",
      ],
    },
    {
      id: 4,
      name: "Fundamental Data",
      description:
        "Data fundamental lengkap: laporan keuangan, rasio valuation, earnings reports, dan guidance.",
      method: "GET",
      endpoint: "/api/v1/fundamental/{symbol}",
      category: "Fundamental",
      latency: "<150ms",
      requiresAuth: true,
      rateLimit: "200/hour",
      features: [
        "Financial statements",
        "Valuation ratios",
        "Earnings data",
        "Analyst estimates",
      ],
    },
    {
      id: 5,
      name: "Market News & Sentiment",
      description:
        "Berita real-time dengan sentiment analysis dan impact scoring untuk 10,000+ companies.",
      method: "GET",
      endpoint: "/api/v1/news/{symbol}",
      category: "News",
      latency: "<100ms",
      requiresAuth: false,
      rateLimit: "100/minute",
      features: [
        "Real-time news",
        "Sentiment analysis",
        "Impact scoring",
        "10k+ companies",
      ],
    },
    {
      id: 6,
      name: "Options Data",
      description:
        "Data options chains, implied volatility, greeks, dan historical options data.",
      method: "GET",
      endpoint: "/api/v1/options/{symbol}",
      category: "Derivatives",
      latency: "<120ms",
      requiresAuth: true,
      rateLimit: "300/hour",
      features: [
        "Options chains",
        "IV calculations",
        "Greeks",
        "Historical data",
      ],
    },
  ];

  const handleCopyEndpoint = (id: number, endpoint: string) => {
    navigator.clipboard.writeText(`https://api.quantumstock.com${endpoint}`);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "from-emerald-500 to-green-500";
      case "POST":
        return "from-blue-500 to-cyan-500";
      case "WS":
        return "from-purple-500 to-violet-500";
      default:
        return "from-slate-600 to-slate-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Real-time":
        return Zap;
      case "Historical":
        return Database;
      case "Analytics":
        return LineChart;
      case "Fundamental":
        return Shield;
      default:
        return Terminal;
    }
  };

  return (
    <section id="api" className="py-12">
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              API Endpoints
            </h2>
            <p className="text-slate-400">
              Koleksi lengkap endpoint API untuk semua kebutuhan data saham Anda
            </p>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <select className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
              <option value="">All Categories</option>
              <option value="Real-time">Real-time</option>
              <option value="Historical">Historical</option>
              <option value="Analytics">Analytics</option>
              <option value="Fundamental">Fundamental</option>
            </select>
            <select className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
              <option value="">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="WS">WebSocket</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {apiEndpoints.map((api) => {
            const CategoryIcon = getCategoryIcon(api.category);

            return (
              <div
                key={api.id}
                className="rounded-xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === api.id ? null : api.id)
                  }
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span
                          className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${getMethodColor(
                            api.method
                          )} text-white font-semibold text-sm`}
                        >
                          {api.method}
                        </span>
                        <div className="flex items-center text-slate-400">
                          <CategoryIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{api.category}</span>
                        </div>
                        <span className="text-sm text-cyan-400 font-medium">
                          {api.latency}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-2">{api.name}</h3>
                      <p className="text-slate-400 mb-4">{api.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {api.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 text-sm text-slate-300"
                          >
                            <Check className="h-3 w-3 mr-1.5 text-emerald-400" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyEndpoint(api.id, api.endpoint);
                        }}
                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-sm font-medium transition-colors"
                      >
                        {copiedEndpoint === api.id
                          ? "Copied!"
                          : "Copy Endpoint"}
                      </button>
                      {expandedId === api.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedId === api.id && (
                  <div className="px-6 pb-6 border-t border-slate-800 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3">Endpoint Details</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Endpoint:</span>
                            <code className="font-mono text-cyan-400">
                              https://api.quantumstock.com{api.endpoint}
                            </code>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Rate Limit:</span>
                            <span className="font-medium">{api.rateLimit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">
                              Authentication:
                            </span>
                            <span className="font-medium">
                              {api.requiresAuth ? "API Key Required" : "Public"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Latency:</span>
                            <span className="font-medium text-emerald-400">
                              {api.latency}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Code Example</h4>
                        <div className="code-block">
                          <pre className="text-sm">
                            {`// ${api.name}
import { QuantumStock } from '@quantumstock/sdk';

const client = new QuantumStock({
  apiKey: 'your_api_key_here'
});

// Using the endpoint
const data = await client.${
                              api.method === "WS" ? "subscribe" : "fetch"
                            }('${api.endpoint.replace("{symbol}", "BBCA.JK")}');

console.log(data);`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-slate-400">
              Showing {apiEndpoints.length} of {apiEndpoints.length} endpoints
            </p>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm transition-colors">
                View All APIs
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm transition-all duration-300">
                Get API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiList;
