"use client";

import {
  Plus,
  Download,
  Code,
  Terminal,
  Key,
  BookOpen,
  LineChart,
  TrendingUp,
  Database,
  AlertCircle,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Buat API Key",
      description: "Generate kunci API untuk akses data",
      icon: Key,
      color: "bg-green-100 text-green-600",
      href: "#",
    },
    {
      title: "Download SDK",
      description: "Library Python, JS, Java, etc.",
      icon: Download,
      color: "bg-blue-100 text-blue-600",
      href: "#",
    },
    {
      title: "API Playground",
      description: "Test API langsung di browser",
      icon: Terminal,
      color: "bg-purple-100 text-purple-600",
      href: "#",
    },
    {
      title: "Contoh Trading Bot",
      description: "Sample code untuk trading",
      icon: Code,
      color: "bg-yellow-100 text-yellow-600",
      href: "#",
    },
    {
      title: "Chart Library",
      description: "Integrasi chart interaktif",
      icon: LineChart,
      color: "bg-pink-100 text-pink-600",
      href: "#",
    },
    {
      title: "Dokumentasi",
      description: "Panduan lengkap API",
      icon: BookOpen,
      color: "bg-indigo-100 text-indigo-600",
      href: "#",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Aksi Cepat</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`${action.color} p-3 rounded-full mb-3`}>
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
              <p className="text-xs text-gray-600">{action.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
          Update Terbaru
        </h3>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-blue-900">
              v2.1.0 Released
            </div>
            <div className="text-xs text-blue-700 mt-1">
              Added real-time options data & technical indicators
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-green-900">
              New: WebSocket API
            </div>
            <div className="text-xs text-green-700 mt-1">
              Real-time streaming for price updates
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Panduan Cepat</h3>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center text-sm text-green-600 hover:text-green-800"
          >
            <TrendingUp className="h-3 w-3 mr-2" />
            Memulai dengan API Saham
          </a>
          <a
            href="#"
            className="flex items-center text-sm text-green-600 hover:text-green-800"
          >
            <Database className="h-3 w-3 mr-2" />
            Mengakses Data Historis
          </a>
          <a
            href="#"
            className="flex items-center text-sm text-green-600 hover:text-green-800"
          >
            <LineChart className="h-3 w-3 mr-2" />
            Analisis Teknikal dengan API
          </a>
          <a
            href="#"
            className="flex items-center text-sm text-green-600 hover:text-green-800"
          >
            <Terminal className="h-3 w-3 mr-2" />
            Rate Limiting & Best Practices
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
