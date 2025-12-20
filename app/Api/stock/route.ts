// app/api/saham/route.ts
import YahooFinance from "yahoo-finance2";
import sahamList from "../../Data/saham.json";

// Type definitions for the JSON data
interface SahamItem {
  kode: string;
  nama: string;
}

interface SahamData {
  data: SahamItem[];
}

// Type definitions for Yahoo Finance response
interface YahooQuote {
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketVolume?: number;
  currency?: string;
  marketState?: string;
  regularMarketPreviousClose?: number;
  regularMarketOpen?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  marketCap?: number;
  trailingPE?: number;
  forwardPE?: number;
  epsTrailingTwelveMonths?: number;
  epsForward?: number;
  beta?: number;
  dividendRate?: number;
  dividendYield?: number;
  [key: string]: unknown;
}

interface AssetProfile {
  longBusinessSummary?: string;
  sector?: string;
  industry?: string;
  fullTimeEmployees?: number;
  website?: string;
  [key: string]: unknown;
}

interface FinancialData {
  targetHighPrice?: number;
  targetLowPrice?: number;
  recommendationMean?: number;
  revenuePerShare?: number;
  grossProfits?: number;
  profitMargins?: number;
  [key: string]: unknown;
}

interface KeyStatistics {
  sharesOutstanding?: number;
  bookValue?: number;
  [key: string]: unknown;
}

interface QuoteSummary {
  assetProfile?: AssetProfile;
  financialData?: FinancialData;
  defaultKeyStatistics?: KeyStatistics;
  [key: string]: unknown;
}

// Response data type
interface SahamResponseItem {
  kode: string;
  nama: string;
  description: string;
  sector: string;
  industry: string;
  fullTimeEmployees: number | string;
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
  error?: string;
}

interface SahamApiResponse {
  data: SahamResponseItem[];
}

export async function GET(): Promise<Response> {
  const yahooFinance = new YahooFinance();
  const sahamData = sahamList as SahamData;

  const results = await Promise.all(
    sahamData.data.map(async (saham: SahamItem): Promise<SahamResponseItem> => {
      try {
        // Ambil quote
        const quote: YahooQuote = await yahooFinance.quote(saham.kode).catch(() => ({}));

        // Ambil summary dengan modules tertentu
        const summary: QuoteSummary = await yahooFinance
          .quoteSummary(saham.kode, {
            modules: ["assetProfile", "financialData", "defaultKeyStatistics"],
          })
          .catch(() => ({}));

        const assetProfile: AssetProfile = summary.assetProfile ?? {};
        const financialData: FinancialData = summary.financialData ?? {};
        const keyStats: KeyStatistics = summary.defaultKeyStatistics ?? {};

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
          description: "-",
          sector: "-",
          industry: "-",
          fullTimeEmployees: "-",
          website: "-",
          price: 0,
          change: 0,
          percent: 0,
          volume: 0,
          currency: "-",
          marketState: "-",
          previousClose: 0,
          open: 0,
          dayHigh: 0,
          dayLow: 0,
          fiftyTwoWeekHigh: 0,
          fiftyTwoWeekLow: 0,
          marketCap: 0,
          trailingPE: 0,
          forwardPE: 0,
          epsTrailingTwelveMonths: 0,
          epsForward: 0,
          beta: 0,
          dividendRate: 0,
          dividendYield: 0,
          targetHighPrice: 0,
          targetLowPrice: 0,
          recommendationMean: 0,
          revenuePerShare: 0,
          grossProfits: 0,
          profitMargins: 0,
          sharesOutstanding: 0,
          bookValue: 0,
          error: "Data tidak tersedia",
        };
      }
    })
  );

  const response: SahamApiResponse = { data: results };

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}