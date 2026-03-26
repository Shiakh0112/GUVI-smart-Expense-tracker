import React, { useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency, formatDate } from "../utils/expense";
import {
  Trash2, History, Utensils, Car, Clapperboard,
  ShoppingBag, Zap, HeartPulse, MoreHorizontal, ChevronDown, InboxIcon,
} from "lucide-react";
import { useExpenses } from "../context/Expensecontext";

const categoryConfig = {
  food:          { icon: Utensils,      badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25" },
  transport:     { icon: Car,           badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  entertainment: { icon: Clapperboard,  badge: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
  utilities:     { icon: Zap,           badge: "bg-teal-500/15 text-teal-300 border-teal-500/25" },
  health:        { icon: HeartPulse,    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  shopping:      { icon: ShoppingBag,   badge: "bg-orange-500/15 text-orange-300 border-orange-500/25" },
  other:         { icon: MoreHorizontal,badge: "bg-slate-500/15 text-slate-300 border-slate-500/25" },
};

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "health", label: "Health & Medical" },
  { value: "other", label: "Other" },
];

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const sortedExpenses = [...expenses]
    .filter((e) => categoryFilter === "all" || e.category === categoryFilter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense removed");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-violet-500/15 p-2 rounded-lg">
            <History size={16} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-none">Transaction History</h2>
            <p className="text-xs text-slate-500 mt-0.5">{sortedExpenses.length} records</p>
          </div>
        </div>

        <div className="relative">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/60 cursor-pointer">
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-[#1a1035]">{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="glass rounded-2xl py-16 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white/5 p-4 rounded-2xl">
              <InboxIcon size={28} className="text-slate-600" />
            </div>
          </div>
          <p className="font-semibold text-slate-400">No transactions found</p>
          <p className="text-xs text-slate-600 mt-1">
            {categoryFilter !== "all" ? "Try a different category filter" : "Add your first expense above"}
          </p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Date", "Description", "Category", "Amount", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {sortedExpenses.map((expense) => {
                  const config = categoryConfig[expense.category] || categoryConfig.other;
                  const CategoryIcon = config.icon;
                  return (
                    <tr key={expense.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap font-medium">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-medium text-slate-200 whitespace-nowrap">
                        {expense.description}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
                          <CategoryIcon size={11} />
                          {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold text-violet-300 whitespace-nowrap">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button onClick={() => handleDelete(expense.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all p-1.5 rounded-lg hover:bg-red-500/10">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
