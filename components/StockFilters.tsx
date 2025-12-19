"use client";

interface StockFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  marketCapFilter: string;
  setMarketCapFilter: (value: string) => void;
  changeFilter: string;
  setChangeFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  sectors: string[];
  resetFilters: () => void;
}

export default function StockFilters({
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
  marketCapFilter,
  setMarketCapFilter,
  changeFilter,
  setChangeFilter,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  sectors,
  resetFilters,
}: StockFiltersProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Symbol or Name..."
          />
        </div>

        {/* Sector Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sectors</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Market Cap Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Market Cap
          </label>
          <select
            value={marketCapFilter}
            onChange={(e) => setMarketCapFilter(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small Cap (&lt;$2B)</option>
            <option value="mid">Mid Cap ($2B-$10B)</option>
            <option value="large">Large Cap (&gt;$10B)</option>
          </select>
        </div>

        {/* Change Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Performance
          </label>
          <select
            value={changeFilter}
            onChange={(e) => setChangeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Stocks</option>
            <option value="gainers">Gainers Only</option>
            <option value="losers">Losers Only</option>
            <option value="neutral">Neutral (0%)</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
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
            <option value="marketcap-desc">Market Cap (High to Low)</option>
            <option value="marketcap-asc">Market Cap (Low to High)</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price Range: ${priceRange[0].toFixed(0)} - $
            {priceRange[1].toFixed(0)}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
