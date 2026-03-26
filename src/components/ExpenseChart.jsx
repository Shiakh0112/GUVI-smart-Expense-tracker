import React, { useState } from "react";
import { getChartData, getExpensesByMonth } from "../utils/expense";
import { BarChart2, PieChart, TrendingUp } from "lucide-react";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseBarChart from "./ExpenseBarChart";
import { useExpenses } from "../context/Expensecontext";

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [chartType, setChartType] = useState("pie");

  const chartData = getChartData(expenses);
  const monthlyData = getExpensesByMonth(expenses);

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="bg-violet-500/15 p-2 rounded-lg">
            <TrendingUp size={16} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-none">Analytics</h2>
            <p className="text-xs text-slate-500 mt-0.5">Spending breakdown</p>
          </div>
        </div>

        <div className="flex bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 gap-1">
          {[
            { type: "pie", icon: PieChart, label: "Pie" },
            { type: "bar", icon: BarChart2, label: "Bar" },
          ].map(({ type, icon: Icon, label }) => (
            <button key={type} onClick={() => setChartType(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartType === type
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-glow"
                  : "text-slate-500 hover:text-slate-300"
              }`}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-white/5 p-4 rounded-2xl mb-3">
            <BarChart2 size={28} className="text-slate-600" />
          </div>
          <p className="font-semibold text-slate-400">No data to display</p>
          <p className="text-xs text-slate-600 mt-1">Add expenses to see your analytics</p>
        </div>
      ) : (
        <div>
          {chartType === "pie" ? <ExpensePieChart data={chartData} /> : <ExpenseBarChart data={monthlyData} />}
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
