// app/api/saham/route.ts
import YahooFinance from "yahoo-finance2";
import sahamList from "../../Data/saham.json";

export async function GET() {
  const yahooFinance = new YahooFinance();

  const results = await Promise.all(
    sahamList.data.map(async (saham) => {
      try {
        // Ambil quote
        const quote = await yahooFinance.quote(saham.kode).catch(() => ({}));

        // Ambil summary dengan modules tertentu
        const summary = await yahooFinance
          .quoteSummary(saham.kode, {
            modules: ["assetProfile", "financialData", "defaultKeyStatistics"],
          })
          .catch(() => ({}));

        const assetProfile = summary.assetProfile ?? {};
        const financialData = summary.financialData ?? {};
        const keyStats = summary.defaultKeyStatistics ?? {};

        // Return data lengkap dengan fallback
        return {
          kode: saham.kode,
          nama: saham.nama,

          // Profil perusahaan
          description: assetProfile.longBusinessSummary ?? "-",
          sector: assetProfile.sector ?? "-",
          industry: assetProfile.industry ?? "-",
          fullTimeEmployees: assetProfile.fullTimeEmployees ?? "-",
          website: assetProfile.website ?? "-",

          // Market info
          price: quote.regularMarketPrice ?? 0,
          change: quote.regularMarketChange ?? 0,
          percent: quote.regularMarketChangePercent ?? 0,
          volume: quote.regularMarketVolume ?? 0,
          currency: quote.currency ?? "-",
          marketState: quote.marketState ?? "-",
          previousClose: quote.regularMarketPreviousClose ?? 0,
          open: quote.regularMarketOpen ?? 0,
          dayHigh: quote.regularMarketDayHigh ?? 0,
          dayLow: quote.regularMarketDayLow ?? 0,

          // 52-week
          fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? 0,
          fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? 0,

          // Financial
          marketCap: quote.marketCap ?? 0,
          trailingPE: quote.trailingPE ?? 0,
          forwardPE: quote.forwardPE ?? 0,
          epsTrailingTwelveMonths: quote.epsTrailingTwelveMonths ?? 0,
          epsForward: quote.epsForward ?? 0,
          beta: quote.beta ?? 0,
          dividendRate: quote.dividendRate ?? 0,
          dividendYield: quote.dividendYield ?? 0,

          // FinancialData module
          targetHighPrice: financialData.targetHighPrice ?? 0,
          targetLowPrice: financialData.targetLowPrice ?? 0,
          recommendationMean: financialData.recommendationMean ?? 0,
          revenuePerShare: financialData.revenuePerShare ?? 0,
          grossProfits: financialData.grossProfits ?? 0,
          profitMargins: financialData.profitMargins ?? 0,

          // Key statistics module
          sharesOutstanding: keyStats.sharesOutstanding ?? 0,
          bookValue: keyStats.bookValue ?? 0,
        };
      } catch (err) {
        console.error("Gagal fetch saham:", saham.kode, err);
        return {
          kode: saham.kode,
          nama: saham.nama,
          error: "Data tidak tersedia",
        };
      }
    })
  );

  return new Response(JSON.stringify({ data: results }), {
    headers: { "Content-Type": "application/json" },
  });
}
