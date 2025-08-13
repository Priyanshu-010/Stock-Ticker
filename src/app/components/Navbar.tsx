import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="font-bold">STOCK TICKER</Link>
      <div className="flex items-center">
        <Link href='/favorites' className="mr-4">
          Favorites
        </Link>
        <p className="mr-4 font-bold">Trade Brains</p>
      </div>
    </nav>
  );
}

export default Navbar;
