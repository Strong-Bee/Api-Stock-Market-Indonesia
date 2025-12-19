import { StockStats as Stats } from "@/types/stock";

interface StockStatsProps {
  stats: Stats;
}

export default function StockStats({ stats }: StockStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <p className="text-slate-600 text-sm font-medium">Total Stocks</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
      </div>
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <p className="text-slate-600 text-sm font-medium">Average Change</p>
        <p
          className={`text-3xl font-bold mt-2 ${
            Number(stats.avgChange) > 0
              ? "text-green-600"
              : Number(stats.avgChange) < 0
              ? "text-red-600"
              : "text-slate-900"
          }`}
        >
          {Number(stats.avgChange) > 0 ? "+" : ""}
          {stats.avgChange}%
        </p>
      </div>
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <p className="text-slate-600 text-sm font-medium">Gainers</p>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stats.gainers}
        </p>
      </div>
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <p className="text-slate-600 text-sm font-medium">Losers</p>
        <p className="text-3xl font-bold text-red-600 mt-2">{stats.losers}</p>
      </div>
    </div>
  );
}
