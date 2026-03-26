import React from "react";
import { Toaster } from "react-hot-toast";
import { LayoutDashboard } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15,12,41,0.95)",
            color: "#e2e8f0",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "12px",
            backdropFilter: "blur(16px)",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#8b5cf6", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />

      <header className="glass sticky top-0 z-50 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-purple-700 p-2 rounded-lg">
                <LayoutDashboard size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-purple-300 bg-clip-text text-transparent leading-none">
                  Budget Wow Tracker
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">Personal Finance Dashboard</p>
              </div>
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Live Tracking
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-white/[0.06] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Budget Wow Tracker — All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
