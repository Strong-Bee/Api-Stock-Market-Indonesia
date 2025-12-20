"use client";

import {
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Clock,
  LineChart,
} from "lucide-react";
import { useState } from "react";

const MarketOverview = () => {
  const [activeTab, setActiveTab] = useState("indices");

  const marketIndices = [
    {
      symbol: "^JKSE",
      name: "IHSG",
      price: "7,210.45",
      change: "+125.30",
      changePercent: "+1.77%",
      isPositive: true,
      volume: "12.5B",
    },
    {
      symbol: "^LQ45",
      name: "LQ45",
      price: "945.67",
      change: "+12.45",
      changePercent: "+1.33%",
      isPositive: true,
      volume: "8.2B",
    },
    {
      symbol: "^GSPC",
      name: "S&P 500",
      price: "5,150.48",
      change: "+52.60",
      changePercent: "+1.03%",
      isPositive: true,
      volume: "3.8B",
    },
    {
      symbol: "^IXIC",
      name: "NASDAQ",
      price: "16,245.67",
      change: "+245.67",
      changePercent: "+1.53%",
      isPositive: true,
      volume: "5.2B",
    },
  ];

  const topMovers = [
    {
      symbol: "BBCA.JK",
      name: "Bank Central Asia",
      price: "9,850",
      change: "+125",
      changePercent: "+1.29%",
      isGainer: true,
      sector: "Financial",
    },
    {
      symbol: "TLKM.JK",
      name: "Telkom Indonesia",
      price: "3,780",
      change: "+45",
      changePercent: "+1.20%",
      isGainer: true,
      sector: "Telecom",
    },
    {
      symbol: "BMRI.JK",
      name: "Bank Mandiri",
      price: "6,450",
      change: "-75",
      changePercent: "-1.15%",
      isGainer: false,
      sector: "Financial",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "173.50",
      change: "+2.45",
      changePercent: "+1.43%",
      isGainer: true,
      sector: "Technology",
    },
  ];

  const marketStats = [
    {
      label: "Total Volume",
      value: "28.4B",
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      label: "Advancers",
      value: "1,245",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "Decliners",
      value: "856",
      icon: TrendingDown,
      color: "text-rose-400",
    },
    {
      label: "Unchanged",
      value: "312",
      icon: Activity,
      color: "text-slate-400",
    },
  ];

  return (
    <section id="market" className="py-12">
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Market Overview
            </h2>
            <p className="text-slate-400 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Real-time data • Updated: Today, 10:30 WIB
            </p>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            {["indices", "gainers", "losers", "global"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Globe className="h-5 w-5 mr-2 text-cyan-400" />
              Major Indices
            </h3>
            {marketIndices.map((index, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-lg">
                        {index.name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400">
                        {index.symbol}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Volume: {index.volume}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">{index.price}</div>
                    <div
                      className={`text-sm font-semibold flex items-center justify-end ${
                        index.isPositive ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {index.isPositive ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {index.change} ({index.changePercent})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-purple-400" />
              Top Movers
            </h3>
            {topMovers.map((stock, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 truncate max-w-[180px]">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{stock.price}</div>
                    <div
                      className={`text-sm font-semibold ${
                        stock.isGainer ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {stock.change} ({stock.changePercent})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Stats */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-lg font-semibold mb-4">Market Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-slate-800"
              >
                <div className="flex items-center mb-2">
                  <stat.icon className={`h-5 w-5 mr-2 ${stat.color}`} />
                  <span className="text-sm text-slate-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Call Example */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h4 className="text-lg font-semibold mb-2 md:mb-0">
              Real-time API Example
            </h4>
            <span className="text-sm text-slate-400">
              GET /api/v1/market/quote
            </span>
          </div>
          <div className="code-block">
            <pre className="text-sm">
              {`fetch('https://api.quantumstock.com/v1/market/quote/BBCA.JK', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
