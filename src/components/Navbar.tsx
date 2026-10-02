import React from 'react';
import { Persona, FounderTab, EmployeeTab } from '../types/esop';
import { ShieldCheck, UserCheck, Layers, Sparkles, Building2 } from 'lucide-react';

interface NavbarProps {
  currentPersona: Persona;
  onSelectPersona: (p: Persona) => void;
  founderTab: FounderTab;
  onSelectFounderTab: (tab: FounderTab) => void;
  employeeTab: EmployeeTab;
  onSelectEmployeeTab: (tab: EmployeeTab) => void;
  companyName: string;
  isDpiitStartup: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPersona,
  onSelectPersona,
  founderTab,
  onSelectFounderTab,
  employeeTab,
  onSelectEmployeeTab,
  companyName,
  isDpiitStartup,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#090D16]/95 backdrop-blur-md">
      {/* Zone 1: Brand, Zone 2: Navigation Links, Zone 3: Primary Actions (Strict Top Bar Contract) */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              EquiCraft AI
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">ESOP Engine</span>
            </span>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>{companyName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">DPIIT Exemption Active</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Persona & Primary Module Switcher */}
        <nav className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => onSelectPersona('founder')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentPersona === 'founder'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Founder & Legal Console
          </button>
          <button
            onClick={() => onSelectPersona('employee')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentPersona === 'employee'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            Employee Wealth Portal
          </button>
        </nav>

        {/* Zone 3: Actions & System Status */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tabular-nums">Rule 12 & Damodaran Synced</span>
          </div>
          <div className="h-4 w-px bg-slate-800 hidden md:block" />
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Building2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Valuation:</span>
            <span className="font-mono text-slate-200 font-semibold tabular-nums">₹320 Cr</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Ribbon */}
      <div className="border-t border-slate-800/70 bg-slate-950/60 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between overflow-x-auto py-2">
          {currentPersona === 'founder' ? (
            <div className="flex items-center gap-2 text-xs font-medium">
              <button
                onClick={() => onSelectFounderTab('captable')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  founderTab === 'captable'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Cap Table & Damodaran Valuation
              </button>
              <button
                onClick={() => onSelectFounderTab('scheme')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  founderTab === 'scheme'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Scheme Rules & MGT-14 Generator
              </button>
              <button
                onClick={() => onSelectFounderTab('auditor')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  founderTab === 'auditor'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-3 w-3 text-emerald-400" />
                3. AI Fine-Print Risk Auditor
              </button>
              <button
                onClick={() => onSelectFounderTab('vesting')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  founderTab === 'vesting'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                4. Vesting Studio (Swiggy vs Zomato)
              </button>
              <button
                onClick={() => onSelectFounderTab('liquidity')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  founderTab === 'liquidity'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                5. Liquidity & Trust Secondary Manager
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium">
              <button
                onClick={() => onSelectEmployeeTab('portfolio')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  employeeTab === 'portfolio'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                My Equity Portfolio & Cliff Tracker
              </button>
              <button
                onClick={() => onSelectEmployeeTab('tax-sim')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  employeeTab === 'tax-sim'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Three-Stage Tax & Cashless Exercise Solver
              </button>
              <button
                onClick={() => onSelectEmployeeTab('post-ipo')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  employeeTab === 'post-ipo'
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Swiggy 1-Month Post-IPO Liquidity Window
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
