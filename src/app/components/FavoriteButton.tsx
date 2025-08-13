'use client';

import { useEffect, useState } from 'react';

type Fav = { symbol: string; company: string };

export default function FavoriteButton({ symbol, company }: Fav) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stocks = localStorage.getItem('favStocks');
    const arr: Fav[] = stocks ? JSON.parse(stocks) : [];
    setSaved(arr.some((fav) => fav.symbol === symbol));
  }, [symbol]);

  const toggle = () => {
    const stocks = localStorage.getItem('favStocks');
    const arr: Fav[] = stocks ? JSON.parse(stocks) : [];
    let next: Fav[];
    if (arr.some((fav) => fav.symbol === symbol)) {
      next = arr.filter((fav) => fav.symbol !== symbol);
      setSaved(false);
    } else {
      next = [...arr, { symbol, company }];
      setSaved(true);
    }
    localStorage.setItem('favStocks', JSON.stringify(next));
  };

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded-md text-sm border ${
        saved ? 'border-green-500 text-green-400' : 'border-gray-600 text-gray-300'
      } hover:bg-gray-800`}
      aria-pressed={saved}
    >
      {saved ? '★ Favorited' : '☆ Favorite'}
    </button>
  );
}
