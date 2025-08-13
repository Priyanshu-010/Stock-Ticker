"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Fav = { symbol: string; company: string };

export default function Favorites() {
  const [favs, setFavs] = useState<Fav[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFav = () => {
      const stocks = localStorage.getItem("favStocks");
      setFavs(stocks ? JSON.parse(stocks) : []);
      setLoading(false);
    };

    fetchFav();
    window.addEventListener("storage", fetchFav);

    return () => window.removeEventListener("storage", fetchFav);
  }, []);

  if(loading) {
    return <p className="text-gray-400">Loading favorites...</p>;
  }
  console.log("favs", favs);

  return (
    <section className="mt-8">
      {favs.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-3">Your favorites</h2>
          <div className="flex flex-wrap gap-2">
            {favs.map((f) => (
              <Link
                key={f.symbol}
                href={`/stock/${f.symbol}`}
                className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700 hover:bg-gray-700"
                title={f.company}
              >
                {f.symbol}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-lg text-gray-300 font-semibold mb-3">No favorites added</h2>
      )}
    </section>
  );
}
