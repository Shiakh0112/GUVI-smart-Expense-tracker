import React from "react";
import { formatCurrency, getExpensesByCategory, getTotalExpenses } from "../utils/expense";
import { TrendingUp, Wallet, Receipt } from "lucide-react";
import { useExpenses } from "../context/Expensecontext";

const StatCard = ({ icon: Icon, label, value, sub, accentColor, iconBg }) => (
  <div className="glass rounded-2xl p-5 animate-fade-in hover:shadow-glow transition-all duration-300 group relative overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentColor}`} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
      <div className={`p-2.5 rounded-xl ${iconBg}`}>
        <Icon size={20} className="text-white/80" />
      </div>
    </div>
  </div>
);

const ExpenseSummary = () => {
  const { expenses } = useExpenses();
  const totalExpenses = getTotalExpenses(expenses);
  const categoriesData = getExpensesByCategory(expenses);

  let highestCategory = { name: "none", amount: 0 };
  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) highestCategory = { name: category, amount };
  });

  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatCard
        icon={Wallet}
        label="Total Spent"
        value={formatCurrency(totalExpenses)}
        sub={`Avg. ${formatCurrency(avgExpense)} per entry`}
        accentColor="bg-gradient-to-r from-violet-500 to-purple-500"
        iconBg="bg-violet-500/20"
      />
      <StatCard
        icon={TrendingUp}
        label="Top Category"
        value={highestCategory.name !== "none"
          ? highestCategory.name.charAt(0).toUpperCase() + highestCategory.name.slice(1)
          : "—"}
        sub={highestCategory.amount > 0 ? formatCurrency(highestCategory.amount) : "No data yet"}
        accentColor="bg-gradient-to-r from-rose-500 to-pink-500"
        iconBg="bg-rose-500/20"
      />
      <StatCard
        icon={Receipt}
        label="Total Entries"
        value={expenses.length}
        sub={expenses.length === 1 ? "1 transaction recorded" : `${expenses.length} transactions recorded`}
        accentColor="bg-gradient-to-r from-emerald-500 to-teal-500"
        iconBg="bg-emerald-500/20"
      />
    </div>
  );
};

export default ExpenseSummary;
