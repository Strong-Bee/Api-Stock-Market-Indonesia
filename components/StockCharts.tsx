"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartData } from "@/types/stock";
import { formatVolume } from "@/lib/utils";

interface StockChartsProps {
  topGainersData: ChartData[];
  topLosersData: ChartData[];
  volumeLeaders: ChartData[];
  sectorDistribution: ChartData[];
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export default function StockCharts({
  topGainersData,
  topLosersData,
  volumeLeaders,
  sectorDistribution,
}: StockChartsProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Top Gainers Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Top 10 Gainers
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topGainersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="change" fill="#10b981" name="Change %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Losers Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Top 10 Losers
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topLosersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="change" fill="#ef4444" name="Change %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Leaders Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Top 10 Volume Leaders
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volumeLeaders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatVolume(value)} />
            <Legend />
            <Bar dataKey="volume" fill="#3b82f6" name="Volume" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Distribution Pie Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Sector Distribution
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={sectorDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {sectorDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
