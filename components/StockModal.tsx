import { Stock } from "@/types/stock";
import { formatNumber, formatVolume } from "@/lib/utils";
import { X } from "lucide-react";

interface StockModalProps {
  stock: Stock;
  onClose: () => void;
}

export default function StockModal({ stock, onClose }: StockModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{stock.kode}</h2>
            <p className="text-blue-100">{stock.nama}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-slate-600 text-sm mb-1">Current Price</p>
              <p className="text-2xl font-bold text-slate-900">
                ${(stock.price || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Change</p>
              <p
                className={`text-2xl font-bold ${
                  (stock.change || 0) > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {(stock.change || 0) > 0 ? "+" : ""}
                {(stock.change || 0).toFixed(2)} (
                {(stock.percent || 0).toFixed(2)}%)
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Day High</p>
              <p className="text-lg font-semibold text-slate-900">
                ${(stock.dayHigh || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Day Low</p>
              <p className="text-lg font-semibold text-slate-900">
                ${(stock.dayLow || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">52-Week High</p>
              <p className="text-lg font-semibold text-slate-900">
                ${(stock.fiftyTwoWeekHigh || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">52-Week Low</p>
              <p className="text-lg font-semibold text-slate-900">
                ${(stock.fiftyTwoWeekLow || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Market Cap</p>
              <p className="text-lg font-semibold text-slate-900">
                {formatNumber(stock.marketCap)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Volume</p>
              <p className="text-lg font-semibold text-slate-900">
                {formatVolume(stock.volume)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">P/E Ratio</p>
              <p className="text-lg font-semibold text-slate-900">
                {stock.trailingPE ? stock.trailingPE.toFixed(2) : "-"}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Dividend Yield</p>
              <p className="text-lg font-semibold text-slate-900">
                {stock.dividendYield
                  ? ((stock.dividendYield || 0) * 100).toFixed(2) + "%"
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Beta</p>
              <p className="text-lg font-semibold text-slate-900">
                {stock.beta ? stock.beta.toFixed(2) : "-"}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Profit Margin</p>
              <p className="text-lg font-semibold text-slate-900">
                {stock.profitMargins
                  ? ((stock.profitMargins || 0) * 100).toFixed(2) + "%"
                  : "-"}
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-slate-600 text-sm mb-2">Sector</p>
            <p className="text-lg font-semibold text-slate-900 mb-4">
              {stock.sector} - {stock.industry}
            </p>
            <p className="text-slate-600 text-sm mb-2">Description</p>
            <p className="text-slate-700">
              {stock.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
