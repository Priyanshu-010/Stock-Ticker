export interface StockData {
symbol: string
name: string
price: number
change: number
changePercent: number
volume: number
marketCap?: number
high: number
low: number
open: number
previousClose: number
sector?: string
industry?: string
description?: string
website?: string
ceo?: string
employees?: number
headquarters?: string
}

export interface SearchResult {
symbol: string
name: string
sector?: string
exchange?: string
}

export interface PriceData {
date: string
price: number
volume: number
open?: number
high?: number
low?: number
close?: number
}

export interface TickerData {
symbol: string
name: string
price: number
change: number
changePercent: number
}

export interface StockDetailsProps {
symbol: string
}

export interface ChartData {
labels: string[]
datasets: {
label: string
data: number[]
borderColor: string
backgroundColor: string
tension: number
}[]
}

export interface FavoriteStock {
symbol: string
name: string
addedAt: string
}

export interface StockAPIResponse {
symbol: string
name: string
price: number
change: number
volume: number
marketCap: number
high: number
low: number
open: number
previousClose: number
}

export interface SearchAPIResponse {
results: SearchResult[]
total: number
}

export interface PriceAPIResponse {
symbol: string
prices: PriceData[]
}

// Component Props Types
export interface StockCardProps {
stock: StockData
onFavoriteToggle?: (symbol: string) => void
isFavorite?: boolean
}

export interface SearchBarProps {
onSearch: (query: string) => void
onResultSelect: (result: SearchResult) => void
results: SearchResult[]
loading?: boolean
placeholder?: string
}

export interface ThemeProviderProps {
children: React.ReactNode
defaultTheme?: string
storageKey?: string
}

export interface TickerBarProps {
stocks: TickerData[]
speed?: number
}

export interface StockChartProps {
data: PriceData[]
symbol: string
period?: string
height?: number
}

export interface LoadingSkeletonProps {
className?: string
count?: number
}

// API Error Types
export interface APIError {
message: string
code?: string
status?: number
}