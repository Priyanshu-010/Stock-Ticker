'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Fav = { symbol: string; company: string };

export default function Favorites() {
  const [favs, setFavs] = useState<Fav[]>([]);

  useEffect(() => {
    const fetchFav = () => {
      const stocks = localStorage.getItem("favStocks");
      setFavs(stocks ? JSON.parse(stocks) : []);
    };

    fetchFav();
    window.addEventListener("storage", fetchFav);

    return () => window.removeEventListener("storage", fetchFav);
  }, []);

  if (!favs.length) return null;

  return (
    <section className="mt-8">
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
    </section>
  );
}
