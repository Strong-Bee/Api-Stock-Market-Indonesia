import { Stock } from "@/types/stock";
import { formatNumber, formatVolume } from "@/lib/utils";
import Pagination from "./Pagination";

interface StockCardsProps {
  stocks: Stock[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  onSelectStock: (stock: Stock) => void;
}

export default function StockCards({
  stocks,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  onSelectStock,
}: StockCardsProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="p-6">
        {stocks.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No stocks found matching your filters
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
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
                    <span className="text-slate-600 text-sm">Market Cap</span>
                    <span className="font-semibold text-slate-900">
                      {formatNumber(stock.marketCap)}
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
                  onClick={() => onSelectStock(stock)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {stocks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </>
  );
}
