export interface StockSearchResult {
  type: string;
  symbol: string;
  company: string;
}

export interface StockPrice {
  date: string;  
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
}