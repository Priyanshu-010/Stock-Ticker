import FavoriteButton from "@/app/components/FavoriteButton";
import StockGraph from "@/app/components/StockGraph";
import { StockPrice, StockSearchResult } from "@/app/types";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: { symbol: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const symbol = params.symbol;

  try {
    const res = await fetch(
      `https://portal.tradebrains.in/api/assignment/search?keyword=${symbol}&length=1`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) throw new Error("Search failed");
    const searchData = await res.json();
    const stock: StockSearchResult = searchData[0] || null;

    if (!stock) return { title: "Stock Not Found" };

    return {
      title: `${stock.company} (${stock.symbol})`,
      keywords: `stock, ${stock.symbol}, ${stock.company}, price, analysis`,
      description: `Details and price graph for ${stock.company}`,
    };
  } catch (err) {
    console.log("[Server] Error generating metadata:", err);
    return { title: "Error Loading Stock" };
  }
}

export default async function StockDetails(props: Props) {
  const { symbol } = await props.params;
  let stock: StockSearchResult | null = null;
  let prices: StockPrice[] = [];
  const error: string | null = null;

  try {
    console.log(`Symbol: ${symbol}`);

    const res = await fetch(
      `https://portal.tradebrains.in/api/assignment/search?keyword=${symbol}&length=1`,
      {
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`Search failed with status ${res.status}`);
    }

    const searchData = await res.json();
    console.log(`Search result for ${symbol}:`, searchData);
    stock = searchData[0] || null;

    if (!stock) {
      throw new Error(`No stock found for symbol: ${symbol}`);
    }

    const pricesResponse = await fetch(
      `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=30&type=DAILY&limit=100&format=json`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      }
    );

    if (!pricesResponse.ok) {
      throw new Error(`Prices failed with status ${pricesResponse.status}`);
    }
    prices = await pricesResponse.json();
    console.log(`Prices for ${symbol}:`, prices.length);
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    error = error instanceof Error ? error.message : "Unknown error";
  }

  if (error || !stock) {
    return <p className="text-red-500 p-4">{error || "Stock not found"}</p>;
  }

  return (
    <div>
      {stock ? (
        <div className="p-4 bg-gray-900 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              {stock.company} ({stock.symbol})
            </h1>
            <FavoriteButton symbol={stock.symbol} company={stock.company} />
          </div>
          {prices.length > 0 ? (
            <StockGraph data={prices} />
          ) : (
            <p className="text-gray-400">No price data available</p>
          )}
        </div>
      ) : (
        <p>No stock found for symbol: {symbol}</p>
      )}
    </div>
  );
}
