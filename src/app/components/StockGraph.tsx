"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StockPrice } from '@/app/types';


interface Props { data: StockPrice[]; }

export default function StockGraph({ data }: Props) {
  if (data.length === 0) return <p className="text-gray-400">No price data available</p>;

  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(), 
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <XAxis dataKey="date" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#FFFFFF' }} />
        <Line type="monotone" dataKey="close" stroke="#3B82F6" />
      </LineChart>
    </ResponsiveContainer>
  );
}