// app/api/news/[symbol]/route.ts
import path from "path";
import { promises as fs } from "fs";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET(req: Request, context: { params: any }) {
  const params = await context.params;
  const { symbol } = params;

  // ambil data saham dari JSON
  const filePath = path.join(process.cwd(), "app", "Data", "saham.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const sahamList = JSON.parse(jsonData);

  const saham = sahamList.data.find((s: any) => s.kode === symbol);
  if (!saham) return new Response(JSON.stringify({ error: "Saham tidak ditemukan" }), { status: 404 });

  try {
    // Ambil berita menggunakan RSS feed Yahoo Finance
    const feed = await parser.parseURL(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${saham.kode}&region=ID&lang=id-ID`);
    
    const topNews = feed.items.slice(0, 10).map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      summary: item.contentSnippet ?? "-",
    }));

    return new Response(JSON.stringify({
      kode: saham.kode,
      nama: saham.nama,
      news: topNews,
    }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}
