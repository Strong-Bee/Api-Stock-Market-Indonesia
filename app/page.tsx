"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Stock {
  kode: string;
  nama: string;
  description: string;
  sector: string;
  industry: string;
  fullTimeEmployees: string | number;
  website: string;
  price: number;
  change: number;
  percent: number;
  volume: number;
  currency: string;
  marketState: string;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: number;
  trailingPE: number;
  forwardPE: number;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  beta: number;
  dividendRate: number;
  dividendYield: number;
  targetHighPrice: number;
  targetLowPrice: number;
  recommendationMean: number;
  revenuePerShare: number;
  grossProfits: number;
  profitMargins: number;
  sharesOutstanding: number;
  bookValue: number;
}

export default function Page() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-desc");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [updateTime, setUpdateTime] = useState<string>("");

  // Fetch stocks data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/Api/stock");
        const data = await response.json();
        setStocks(data.data);
        setFilteredStocks(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Update time
  useEffect(() => {
    const updateTimeDisplay = () => {
      const now = new Date();
      setUpdateTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTimeDisplay();
    const timer = setInterval(updateTimeDisplay, 1000);
    return () => clearInterval(timer);
  }, []);

  // Search and sort
  useEffect(() => {
    let result = stocks.filter(
      (stock) =>
        stock.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    switch (sortBy) {
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "change-desc":
        result.sort((a, b) => (b.percent || 0) - (a.percent || 0));
        break;
      case "change-asc":
        result.sort((a, b) => (a.percent || 0) - (b.percent || 0));
        break;
      case "volume-desc":
        result.sort((a, b) => (b.volume || 0) - (a.volume || 0));
        break;
      case "volume-asc":
        result.sort((a, b) => (a.volume || 0) - (b.volume || 0));
        break;
    }

    setFilteredStocks(result);
  }, [searchQuery, sortBy, stocks]);

  // Calculate statistics
  const stats = {
    total: filteredStocks.length,
    gainers: filteredStocks.filter((s) => (s.change || 0) > 0).length,
    losers: filteredStocks.filter((s) => (s.change || 0) < 0).length,
    avgChange:
      filteredStocks.length > 0
        ? (
            filteredStocks.reduce((sum, s) => sum + (s.percent || 0), 0) /
            filteredStocks.length
          ).toFixed(2)
        : 0,
  };

  const formatNumber = (value: number | undefined) => {
    if (!value) return "-";
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatVolume = (volume: number | undefined) => {
    if (!volume) return "-";
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  return (
    <div className="text-black min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Stock Market
                </h1>
                <p className="text-sm text-slate-500">Real-time Data Hub</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Last Updated</p>
              <p className="text-lg font-semibold text-slate-900">
                {updateTime}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-sm font-medium">Total Stocks</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {stats.total}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-sm font-medium">Average Change</p>
            <p
              className={`text-3xl font-bold mt-2 ${
                stats.avgChange > 0
                  ? "text-green-600"
                  : stats.avgChange < 0
                  ? "text-red-600"
                  : "text-slate-900"
              }`}
            >
              {stats.avgChange > 0 ? "+" : ""}
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
            <p className="text-3xl font-bold text-red-600 mt-2">
              {stats.losers}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search by Symbol or Name
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., AAPL, Apple Inc..."
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="price-desc">Price (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="change-desc">Change % (High to Low)</option>
                <option value="change-asc">Change % (Low to High)</option>
                <option value="volume-desc">Volume (High to Low)</option>
                <option value="volume-asc">Volume (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
                viewMode === "table"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-slate-600"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
                viewMode === "cards"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-slate-600"
              }`}
            >
              Cards View
            </button>
          </div>

          {/* Table View */}
          {viewMode === "table" && (
            <div className="overflow-x-auto p-6">
              {loading ? (
                <div className="text-center py-8 text-slate-500">
                  Loading stocks...
                </div>
              ) : filteredStocks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No stocks found
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 text-sm">
                        Symbol
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 text-sm">
                        Company
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-700 text-sm">
                        Price
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-700 text-sm">
                        Change
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-700 text-sm">
                        Change %
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-700 text-sm">
                        Volume
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 text-sm">
                        Sector
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((stock) => (
                      <tr
                        key={stock.kode}
                        className="border-b border-slate-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          {stock.kode}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {stock.nama}
                        </td>
                        <td className="px-4 py-4 text-right text-slate-900 font-semibold">
                          ${(stock.price || 0).toFixed(2)}
                        </td>
                        <td
                          className={`px-4 py-4 text-right font-semibold ${
                            (stock.change || 0) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(stock.change || 0) > 0 ? "+" : ""}
                          {(stock.change || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              (stock.percent || 0) > 0
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {(stock.percent || 0) > 0 ? "+" : ""}
                            {(stock.percent || 0).toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-slate-700">
                          {formatVolume(stock.volume)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {stock.sector}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelectedStock(stock)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Cards View */}
          {viewMode === "cards" && (
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8 text-slate-500">
                  Loading stocks...
                </div>
              ) : filteredStocks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No stocks found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.kode}
                      className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {stock.kode}
                          </h3>
                          <p className="text-sm text-slate-600">{stock.nama}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            (stock.percent || 0) > 0
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {(stock.percent || 0) > 0 ? "+" : ""}
                          {(stock.percent || 0).toFixed(2)}%
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Price</span>
                          <span className="font-bold text-slate-900">
                            ${(stock.price || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Change</span>
                          <span
                            className={`font-bold ${
                              (stock.change || 0) > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {(stock.change || 0) > 0 ? "+" : ""}
                            {(stock.change || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Volume</span>
                          <span className="font-semibold text-slate-900">
                            {formatVolume(stock.volume)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Sector</span>
                          <span className="text-blue-600 font-medium text-sm">
                            {stock.sector}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStock(stock)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedStock.kode}
                </h2>
                <p className="text-blue-100">{selectedStock.nama}</p>
              </div>
              <button
                onClick={() => setSelectedStock(null)}
                className="text-white hover:text-blue-200 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Current Price</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${(selectedStock.price || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Change</p>
                  <p
                    className={`text-2xl font-bold ${
                      (selectedStock.change || 0) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {(selectedStock.change || 0) > 0 ? "+" : ""}
                    {(selectedStock.change || 0).toFixed(2)} (
                    {(selectedStock.percent || 0).toFixed(2)}%)
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Day High</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${(selectedStock.dayHigh || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Day Low</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${(selectedStock.dayLow || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">52-Week High</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${(selectedStock.fiftyTwoWeekHigh || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">52-Week Low</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${(selectedStock.fiftyTwoWeekLow || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Market Cap</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatNumber(selectedStock.marketCap)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Volume</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatVolume(selectedStock.volume)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">P/E Ratio</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {(selectedStock.trailingPE || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Dividend Yield</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {((selectedStock.dividendYield || 0) * 100).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Beta</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {(selectedStock.beta || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">Profit Margin</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {((selectedStock.profitMargins || 0) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-slate-600 text-sm mb-2">Sector</p>
                <p className="text-lg font-semibold text-slate-900 mb-4">
                  {selectedStock.sector} - {selectedStock.industry}
                </p>
                <p className="text-slate-600 text-sm mb-2">Description</p>
                <p className="text-slate-700">{selectedStock.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600 text-sm">
          <p>
            Data powered by Yahoo Finance | Last updated:{" "}
            {new Date().toLocaleString("id-ID")}
          </p>
          <p className="mt-2">
            © 2025 Stock Market Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
