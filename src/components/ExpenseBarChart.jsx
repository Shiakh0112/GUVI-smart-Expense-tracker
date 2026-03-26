import React from "react";
import { formatCurrency } from "../utils/expense";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExpenseBarChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse();

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No expense data to display
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1040] p-4 rounded-xl shadow-glass border border-white/10 text-slate-200">
          <p className="font-medium">{label}</p>
          <p className="text-lg font-bold text-violet-300">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.07)" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12, fill: "#94a3b8" }}
        />
        <YAxis
          tickFormatter={(value) => `₹${value}`}
          tick={{ fontSize: 12, fill: "#94a3b8" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="amount"
          fill="#9b87f5"
          radius={[4, 4, 0, 0]}
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
