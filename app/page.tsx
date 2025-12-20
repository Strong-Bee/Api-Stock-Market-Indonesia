"use client";

import { useEffect, useState } from "react";

interface Stock {
  kode: string;
  nama: string;
  price?: number;
  change?: number;
  percent?: number;
  volume?: number;
}

interface NewsItem {
  title: string;
  link: string;
  date: string;
  summary: string;
}

export default function HomePage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [stockError, setStockError] = useState("");
  const [newsError, setNewsError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch saham
  useEffect(() => {
    const fetchStocks = async () => {
      setLoadingStocks(true);
      setStockError("");
      try {
        const res = await fetch("/Api/stock");
        if (!res.ok) throw new Error("Gagal load data saham");
        const data = await res.json();
        setStocks(data.data);
        setFilteredStocks(data.data);
      } catch (err) {
        setStockError((err as Error).message);
      } finally {
        setLoadingStocks(false);
      }
    };
    fetchStocks();
  }, []);

  // Filter saham berdasarkan search
  useEffect(() => {
    const filtered = stocks.filter(
      (s) =>
        s.kode.toLowerCase().includes(search.toLowerCase()) ||
        s.nama.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [search, stocks]);

  // Fetch berita
  const fetchNews = async (stock: Stock) => {
    setSelectedStock(stock);
    setNews([]);
    setLoadingNews(true);
    setNewsError("");
    try {
      const res = await fetch(`/Api/news/${stock.kode}`);
      if (!res.ok) throw new Error("Gagal load berita");
      const data = await res.json();
      setNews(data.news);
    } catch (err) {
      setNewsError((err as Error).message);
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Saham & Berita Terkini
      </h1>

      {/* Search */}
      <div className="text-black mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Cari saham..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Tabel Saham */}
      {loadingStocks ? (
        <p className="text-center text-gray-600">Loading saham...</p>
      ) : stockError ? (
        <p className="text-center text-red-500">{stockError}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Kode Saham</th>
                <th className="py-3 px-4 text-left">Nama</th>
                <th className="py-3 px-4 text-left">Harga</th>
                <th className="py-3 px-4 text-left">Perubahan</th>
                <th className="py-3 px-4 text-left">%</th>
                <th className="py-3 px-4 text-left">Volume</th>
                <th className="py-3 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredStocks.map((stock, index) => (
                <tr
                  key={stock.kode}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{stock.kode}</td>
                  <td className="py-3 px-4">{stock.nama}</td>
                  <td className="py-3 px-4">{stock.price ?? "-"}</td>
                  <td
                    className={`py-3 px-4 ${
                      stock.change && stock.change > 0
                        ? "text-green-600"
                        : stock.change && stock.change < 0
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {stock.change ?? "-"}
                  </td>
                  <td className="py-3 px-4">{stock.percent ?? "-"}</td>
                  <td className="py-3 px-4">{stock.volume ?? "-"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => fetchNews(stock)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Berita
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Berita Saham */}
      {selectedStock && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Berita: {selectedStock.nama} ({selectedStock.kode})
          </h2>

          {loadingNews && <p className="text-gray-600">Loading berita...</p>}
          {!loadingNews && newsError && (
            <p className="text-red-500">{newsError}</p>
          )}
          {!loadingNews && !newsError && news.length === 0 && (
            <p className="text-gray-500">Tidak ada berita.</p>
          )}

          <ul className="space-y-4">
            {news.map((item, idx) => (
              <li
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
              >
                <button
                  className="w-full text-left focus:outline-none"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <h3 className="text-lg font-medium text-blue-600 hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                  <p className="text-gray-700 mt-2 line-clamp-3">
                    {item.summary}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
