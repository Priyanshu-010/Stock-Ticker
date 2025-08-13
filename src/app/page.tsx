import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mt-10 mb-3">
        Welcome to the Stock Ticker App
      </h1>
      <div className="flex justify-center mb-5">
        <SearchBar />
      </div>
      <p className="text-center mt-5 ">Explore stock data and trends.</p>
    </div>
  );
}
