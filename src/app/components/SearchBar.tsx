'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface StockSearchResult {
  type: string;
  symbol: string;
  company: string;
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query.length < 3) return setSearchResults([]);
    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://portal.tradebrains.in/api/assignment/search?keyword=${query}&length=10`
        );
        setSearchResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (!mounted) return null; 

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        placeholder="Search for stocks..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-gray-400">Loading...</p>}
      {searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded mt-1 max-h-60 overflow-auto">
          {searchResults.map((stock) => (
            <li key={stock.symbol}>
              <Link
                href={`/stock/${stock.symbol}`}
                className="block p-2 hover:bg-gray-700 text-white"
              >
                {stock.company} ({stock.symbol})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
