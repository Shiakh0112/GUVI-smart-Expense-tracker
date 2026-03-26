import React, { useState } from "react";
import toast from "react-hot-toast";
import { useExpenses } from "../context/Expensecontext";
import { Plus, FileText, IndianRupee, Tag, CalendarDays } from "lucide-react";

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <Icon size={15} />
      </div>
      {children}
    </div>
  </div>
);

const inputClass =
  "w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 focus:bg-white/[0.07] transition-all text-sm";

const categoryOptions = [
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "health", label: "Health & Medical" },
  { value: "other", label: "Other" },
];

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!description.trim()) throw new Error("Please enter a description");
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
        throw new Error("Please enter a valid amount");

      addExpense({ description: description.trim(), amount: Number(amount), category, date });
      toast.success("Expense recorded successfully");
      setDescription("");
      setAmount("");
      setCategory("food");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 w-full animate-fade-in">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="bg-violet-500/15 p-2 rounded-lg">
          <Plus size={16} className="text-violet-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white leading-none">New Expense</h2>
          <p className="text-xs text-slate-500 mt-0.5">Record a transaction</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Description" icon={FileText}>
          <input type="text" placeholder="e.g. Grocery shopping" value={description}
            onChange={(e) => setDescription(e.target.value)} className={inputClass} disabled={isSubmitting} />
        </Field>

        <Field label="Amount" icon={IndianRupee}>
          <input type="number" placeholder="0.00" value={amount}
            onChange={(e) => setAmount(e.target.value)} className={inputClass} disabled={isSubmitting} />
        </Field>

        <Field label="Category" icon={Tag}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className={inputClass} disabled={isSubmitting}>
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-[#1a1035]">{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Date" icon={CalendarDays}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className={inputClass} disabled={isSubmitting} />
        </Field>

        <button type="submit" disabled={isSubmitting}
          className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-glow transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <Plus size={16} />
          {isSubmitting ? "Recording..." : "Record Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
