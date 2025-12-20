// app/api/news/[symbol]/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import Parser from "rss-parser";

// Definisikan tipe data
interface SahamData {
  kode: string;
  nama: string;
}

interface SahamResponse {
  data: SahamData[];
}

interface NewsItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
}

interface FormattedNews {
  title: string;
  link: string;
  date: string;
  summary: string;
}

interface ApiResponse {
  kode: string;
  nama: string;
  news: FormattedNews[];
}

interface ApiError {
  error: string;
}

// Konfigurasi parser dengan tipe yang lebih spesifik
const parser: Parser<NewsItem> = new Parser();

// Cache untuk data saham (opsional, untuk mengurangi I/O)
let sahamCache: SahamResponse | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

async function getSahamData(): Promise<SahamResponse> {
  const now = Date.now();
  
  // Gunakan cache jika masih valid
  if (sahamCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return sahamCache;
  }
  
  try {
    const filePath = path.join(process.cwd(), "app", "Data", "saham.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData) as SahamResponse;
    
    // Update cache
    sahamCache = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error("Error reading saham data:", error);
    throw new Error("Failed to load stock data");
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
): Promise<NextResponse<ApiResponse | ApiError>> {
  try {
    const { symbol } = await params;
    const uppercaseSymbol = symbol.toUpperCase();

    // Ambil data saham
    const sahamList = await getSahamData();
    const saham = sahamList.data.find((s) => s.kode === uppercaseSymbol);

    if (!saham) {
      return NextResponse.json(
        { error: `Saham dengan kode ${uppercaseSymbol} tidak ditemukan` },
        { status: 404 }
      );
    }

    // Ambil berita dari RSS feed
    const feed = await parser.parseURL(
      `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${saham.kode}.JK&region=ID&lang=id-ID`
    );

    // Format berita
    const topNews: FormattedNews[] = (feed.items || [])
      .slice(0, 10)
      .map((item) => ({
        title: item.title?.trim() || "Tidak ada judul",
        link: item.link || "#",
        date: item.pubDate || new Date().toISOString(),
        summary: item.contentSnippet?.trim() || "-",
      }));

    // Response sukses
    const response: ApiResponse = {
      kode: saham.kode,
      nama: saham.nama,
      news: topNews,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error("Error fetching news:", err);
    
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    
    return NextResponse.json(
      { error: errorMessage },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  }
}