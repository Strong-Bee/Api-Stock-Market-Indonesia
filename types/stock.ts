export interface Stock {
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

export interface StockStats {
  total: number;
  gainers: number;
  losers: number;
  avgChange: string;
}

export interface ChartData {
  name: string;
  change?: number;
  volume?: number;
  value?: number;
}
