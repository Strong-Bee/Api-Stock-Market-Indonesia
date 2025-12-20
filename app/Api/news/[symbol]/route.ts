import { NextResponse } from "next/server";
import Parser from "rss-parser";
import sahamList from "@/app/Data/saham.json";

/* =======================
   TYPES
======================= */
interface SahamData {
  kode: string;
  nama: string;
}

interface SahamResponse {
  data: SahamData[];
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

/* =======================
   RSS PARSER
======================= */
const parser = new Parser();

/* =======================
   GET HANDLER
======================= */
export async function GET(
  _req: Request,
  { params }: { params: { symbol: string } }
): Promise<NextResponse<ApiResponse | ApiError>> {
  try {
    const symbol = params.symbol.toUpperCase();

    /* =======================
       FIND STOCK
    ======================= */
    const saham = (sahamList as SahamResponse).data.find(
      (s) => s.kode === symbol
    );

    if (!saham) {
      return NextResponse.json(
        { error: `Saham ${symbol} tidak ditemukan` },
        { status: 404 }
      );
    }

    /* =======================
       FETCH RSS NEWS
    ======================= */
    const rssUrl = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${saham.kode}.JK&region=ID&lang=id-ID`;

    let feed;
    try {
      feed = await parser.parseURL(rssUrl);
    } catch {
      feed = { items: [] };
    }

    /* =======================
       FORMAT NEWS
    ======================= */
    const news: FormattedNews[] = (feed.items || [])
      .slice(0, 10)
      .map((item: any) => ({
        title: item.title ?? "Tidak ada judul",
        link: item.link ?? "#",
        date: item.pubDate ?? new Date().toISOString(),
        summary: item.contentSnippet ?? "-",
      }));

    /* =======================
       RESPONSE
    ======================= */
    return NextResponse.json(
      {
        kode: saham.kode,
        nama: saham.nama,
        news,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("NEWS API ERROR:", error);

    return NextResponse.json(
      { error: "Gagal mengambil berita saham" },
      { status: 500 }
    );
  }
}
