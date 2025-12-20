"use client";

import {
  BarChart3,
  Cpu,
  Clock,
  CheckCircle,
  Users,
  Database,
  TrendingUp,
  Zap,
  Server,
} from "lucide-react";

const ApiStats = () => {
  const stats = [
    {
      label: "Total Endpoint",
      value: "24",
      icon: BarChart3,
      color: "bg-blue-500",
      description: "API endpoints",
    },
    {
      label: "Uptime",
      value: "99.97%",
      icon: Cpu,
      color: "bg-green-500",
      description: "30 hari terakhir",
    },
    {
      label: "Avg Latency",
      value: "85ms",
      icon: Clock,
      color: "bg-purple-500",
      description: "Response time",
    },
    {
      label: "Data Points",
      value: "5.2B",
      icon: Database,
      color: "bg-yellow-500",
      description: "Historical data",
    },
  ];

  const usageStats = [
    { label: "API Calls", value: "12.4M", change: "+15%", icon: TrendingUp },
    { label: "Active Users", value: "2,845", change: "+8%", icon: Users },
    { label: "Peak QPS", value: "1,250", change: "+22%", icon: Zap },
    { label: "Data Fresh", value: "<1s", change: "", icon: Server },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Statistik API Saham
      </h2>

      <div className="space-y-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-2 rounded-lg mr-3`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{stat.label}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Penggunaan Bulan Ini</h3>
        <div className="space-y-4">
          {usageStats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <stat.icon className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{stat.label}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{stat.value}</div>
                {stat.change && (
                  <div className="text-xs text-green-600">{stat.change}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Ketersediaan Data</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Saham Indonesia</span>
            <span className="text-sm font-medium">712</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Saham US</span>
            <span className="text-sm font-medium">8,500</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "95%" }}
            ></div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Cryptocurrency</span>
            <span className="text-sm font-medium">2,300</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStats;
