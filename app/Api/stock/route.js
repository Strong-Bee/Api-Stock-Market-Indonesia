import YahooFinance from "yahoo-finance2";
import sahamList from "../../Data/saham.json";

export async function GET() {
  const yahooFinance = new YahooFinance();

  const results = await Promise.allSettled(
    sahamList.data.map((saham) =>
      (async () => {
        const quote = await yahooFinance.quote(saham.kode);

        const summary = await yahooFinance.quoteSummary(saham.kode, {
          modules: ["assetProfile", "financialData", "defaultKeyStatistics"],
        });

        const assetProfile = summary.assetProfile ?? {};
        const financialData = summary.financialData ?? {};
        const keyStats = summary.defaultKeyStatistics ?? {};

        return {
          // Basic
          kode: saham.kode,
          nama: saham.nama,
          description: assetProfile.longBusinessSummary ?? "-",
          sector: assetProfile.sector ?? "-",
          industry: assetProfile.industry ?? "-",
          fullTimeEmployees: assetProfile.fullTimeEmployees ?? "-",
          website: assetProfile.website ?? "-",

          // Market info
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          percent: quote.regularMarketChangePercent,
          volume: quote.regularMarketVolume,
          currency: quote.currency,
          marketState: quote.marketState,
          previousClose: quote.regularMarketPreviousClose,
          open: quote.regularMarketOpen,
          dayHigh: quote.regularMarketDayHigh,
          dayLow: quote.regularMarketDayLow,

          // 52-week
          fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
          fiftyTwoWeekLow: quote.fiftyTwoWeekLow,

          // Financial
          marketCap: quote.marketCap,
          trailingPE: quote.trailingPE,
          forwardPE: quote.forwardPE,
          epsTrailingTwelveMonths: quote.epsTrailingTwelveMonths,
          epsForward: quote.epsForward,
          beta: quote.beta,
          dividendRate: quote.dividendRate,
          dividendYield: quote.dividendYield,

          // FinancialData module
          targetHighPrice: financialData.targetHighPrice,
          targetLowPrice: financialData.targetLowPrice,
          recommendationMean: financialData.recommendationMean,
          revenuePerShare: financialData.revenuePerShare,
          grossProfits: financialData.grossProfits,
          profitMargins: financialData.profitMargins,

          // Key statistics module
          sharesOutstanding: keyStats.sharesOutstanding,
          bookValue: keyStats.bookValue,
        };
      })()
    )
  );

  const data = results
    .map((res) => (res.status === "fulfilled" ? res.value : null))
    .filter(Boolean);

  return Response.json({ data });
}
