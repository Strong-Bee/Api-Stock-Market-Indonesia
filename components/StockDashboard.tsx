"use client";

import { useEffect, useState, useMemo } from "react";
import { Stock } from "@/types/stock";
import StockStats from "./StockStats";
import StockFilters from "./StockFilters";
import StockTable from "./StockTable";
import StockCards from "./StockCards";
import StockCharts from "./StockCharts";
import StockModal from "./StockModal";
import { TrendingUp } from "lucide-react";

type ViewMode = "table" | "cards" | "charts";

export default function StockDashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-desc");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [updateTime, setUpdateTime] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filter states
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [marketCapFilter, setMarketCapFilter] = useState<string>("all");
  const [changeFilter, setChangeFilter] = useState<string>("all");

  // Fetch stocks data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/Api/stock");
        const data = await response.json();
        setStocks(data.data);
        setFilteredStocks(data.data);

        if (data.data.length > 0) {
          const prices = data.data.map((s: Stock) => s.price || 0);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
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

  // Get unique sectors
  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(stocks.map((s) => s.sector))].filter(
      (s) => s
    );
    return uniqueSectors.sort();
  }, [stocks]);

  // Apply filters
  useEffect(() => {
    let result = [...stocks].filter((stock) => {
      const matchesSearch =
        stock.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.nama.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector =
        selectedSector === "all" || stock.sector === selectedSector;

      const matchesPrice =
        (stock.price || 0) >= priceRange[0] &&
        (stock.price || 0) <= priceRange[1];

      let matchesMarketCap = true;
      if (marketCapFilter === "small") {
        matchesMarketCap = (stock.marketCap || 0) < 2000000000;
      } else if (marketCapFilter === "mid") {
        matchesMarketCap =
          (stock.marketCap || 0) >= 2000000000 &&
          (stock.marketCap || 0) < 10000000000;
      } else if (marketCapFilter === "large") {
        matchesMarketCap = (stock.marketCap || 0) >= 10000000000;
      }

      let matchesChange = true;
      if (changeFilter === "gainers") {
        matchesChange = (stock.percent || 0) > 0;
      } else if (changeFilter === "losers") {
        matchesChange = (stock.percent || 0) < 0;
      } else if (changeFilter === "neutral") {
        matchesChange = (stock.percent || 0) === 0;
      }

      return (
        matchesSearch &&
        matchesSector &&
        matchesPrice &&
        matchesMarketCap &&
        matchesChange
      );
    });

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
      case "marketcap-desc":
        result.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
        break;
      case "marketcap-asc":
        result.sort((a, b) => (a.marketCap || 0) - (b.marketCap || 0));
        break;
    }

    setFilteredStocks(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [
    searchQuery,
    sortBy,
    stocks,
    selectedSector,
    priceRange,
    marketCapFilter,
    changeFilter,
  ]);

  // Calculate pagination
  const paginatedStocks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStocks.slice(startIndex, endIndex);
  }, [filteredStocks, currentPage, itemsPerPage]);

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
        : "0",
  };

  // Chart data
  const topGainersData = useMemo(() => {
    return [...filteredStocks]
      .filter((s) => s.percent > 0)
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 10)
      .map((s) => ({
        name: s.kode,
        change: Number(s.percent.toFixed(2)),
      }));
  }, [filteredStocks]);

  const topLosersData = useMemo(() => {
    return [...filteredStocks]
      .filter((s) => s.percent < 0)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 10)
      .map((s) => ({
        name: s.kode,
        change: Number(s.percent.toFixed(2)),
      }));
  }, [filteredStocks]);

  const sectorDistribution = useMemo(() => {
    const distribution: { [key: string]: number } = {};
    filteredStocks.forEach((stock) => {
      if (stock.sector) {
        distribution[stock.sector] = (distribution[stock.sector] || 0) + 1;
      }
    });
    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredStocks]);

  const volumeLeaders = useMemo(() => {
    return [...filteredStocks]
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, 10)
      .map((s) => ({
        name: s.kode,
        volume: s.volume,
      }));
  }, [filteredStocks]);

  const resetFilters = () => {
    setSelectedSector("all");
    setMarketCapFilter("all");
    setChangeFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
    if (stocks.length > 0) {
      const prices = stocks.map((s) => s.price || 0);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="text-black min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
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
        <StockStats stats={stats} />

        <StockFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          marketCapFilter={marketCapFilter}
          setMarketCapFilter={setMarketCapFilter}
          changeFilter={changeFilter}
          setChangeFilter={setChangeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sectors={sectors}
          resetFilters={resetFilters}
        />

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
                viewMode === "table"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
                viewMode === "cards"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cards View
            </button>
            <button
              onClick={() => setViewMode("charts")}
              className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
                viewMode === "charts"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              Charts View
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              Loading stocks...
            </div>
          ) : (
            <>
              {viewMode === "table" && (
                <StockTable
                  stocks={paginatedStocks}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredStocks.length}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  onSelectStock={setSelectedStock}
                />
              )}
              {viewMode === "cards" && (
                <StockCards
                  stocks={paginatedStocks}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredStocks.length}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  onSelectStock={setSelectedStock}
                />
              )}
              {viewMode === "charts" && (
                <StockCharts
                  topGainersData={topGainersData}
                  topLosersData={topLosersData}
                  volumeLeaders={volumeLeaders}
                  sectorDistribution={sectorDistribution}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedStock && (
        <StockModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
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
