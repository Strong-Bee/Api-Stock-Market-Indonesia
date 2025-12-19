import { Stock } from "@/types/stock";
import { formatNumber, formatVolume } from "@/lib/utils";
import Pagination from "./Pagination";

interface StockTableProps {
  stocks: Stock[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  onSelectStock: (stock: Stock) => void;
}

export default function StockTable({
  stocks,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  onSelectStock,
}: StockTableProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="overflow-x-auto p-6">
        {stocks.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No stocks found matching your filters
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
                <th className="text-right px-4 py-3 font-semibold text-slate-700 text-sm">
                  Market Cap
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
              {stocks.map((stock) => (
                <tr
                  key={stock.kode}
                  className="border-b border-slate-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {stock.kode}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{stock.nama}</td>
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
                  <td className="px-4 py-4 text-right text-slate-700">
                    {formatNumber(stock.marketCap)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {stock.sector}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => onSelectStock(stock)}
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
