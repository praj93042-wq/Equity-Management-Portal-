import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Landmark,
  Scale,
  Sparkles,
} from 'lucide-react';

export const LiquidityTrustManager: React.FC = () => {
  const [tenderPoolAmountCr, setTenderPoolAmountCr] = useState<number>(25); // ₹25 Cr
  const [discountToFmv, setDiscountToFmv] = useState<number>(10); // 10% discount
  const [trustLoanOutstandingCr, setTrustLoanOutstandingCr] = useState<number>(8.5); // ₹8.5 Cr
  const currentFmv = 345;
  const buybackPrice = Math.round(currentFmv * (1 - discountToFmv / 100));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>Capital Operations Module</span>
            <span aria-hidden="true">·</span>
            <span>Secondary Buybacks & Trust Administration</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Liquidity Events & Employee Welfare Trust Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Orchestrate secondary tender offers, manage Employee Welfare Trust loan accounting, enforce
            statutory trustee conflict rules, and model Swiggy-style post-IPO liquidity exemptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300">
            Current FMV: ₹{currentFmv} / share
          </div>
        </div>
      </div>

      {/* Trust vs. Direct Route Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Route */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Direct Route</span>
            <span className="text-[11px] text-slate-500">Traditional</span>
          </div>
          <h3 className="text-base font-bold text-white">Direct Company Issuance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The company issues fresh equity shares directly to the employee upon exercise. Simple to establish,
            but leads to direct cap table fragmentation and requires the employee to remit cash out-of-pocket for strike price and TDS.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Setup Complexity:</span>
              <span className="text-emerald-400 font-semibold">Low (Immediate)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cap Table Dilution:</span>
              <span className="text-amber-400">Direct on each exercise</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cashless Mechanism:</span>
              <span className="text-red-400">Not natively supported</span>
            </div>
          </div>
        </div>

        {/* Irrevocable Trust Route */}
        <div className="bg-emerald-950/10 border border-emerald-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-semibold">Recommended for Scaling</span>
            <span className="text-[11px] text-emerald-400/80">Cashless Enabled</span>
          </div>
          <h3 className="text-base font-bold text-white">Irrevocable Employee Welfare Trust</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Company funds an independent Trust via a statutory loan. The Trust holds the share pool and facilitates
            seamless cashless exercises by selling a fraction of shares to remit TDS and loan amounts.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/20 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Trust Loan Balance:</span>
              <span className="text-emerald-300 font-semibold">₹{trustLoanOutstandingCr} Cr Outstanding</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cap Table Hygiene:</span>
              <span className="text-emerald-400">Single consolidated entity</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Employee Experience:</span>
              <span className="text-emerald-400">Zero cash out-of-pocket</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Trustee Disqualification Warning Box */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Statutory Trustee Conflict & Disqualification Rules (Rule 12)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          To maintain fiduciary independence under Rule 12 of Companies (Share Capital & Debentures) Rules,
          the following persons are <strong className="text-amber-300">strictly barred by law from acting as Trustees of an Employee Welfare Trust</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs pt-1">
          <div className="bg-slate-950/60 p-2.5 rounded border border-amber-500/20 text-slate-300">
            <strong>1. Directors</strong> of the company or subsidiary
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-amber-500/20 text-slate-300">
            <strong>2. Relatives</strong> of any Director
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-amber-500/20 text-slate-300">
            <strong>3. Key Managerial Personnel</strong> (KMP / CFO / CS)
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-amber-500/20 text-slate-300">
            <strong>4. Major Shareholders</strong> holding &gt;10% equity
          </div>
        </div>
      </div>

      {/* Secondary Buyback & Tender Offer Orchestrator */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Secondary Buyback & Tender Offer Simulation
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Liquidity Window</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Total Tender Pool Size</span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                ₹{tenderPoolAmountCr} Crore
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={tenderPoolAmountCr}
              onChange={(e) => setTenderPoolAmountCr(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Tender Price Discount to FMV</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">
                {discountToFmv}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={discountToFmv}
              onChange={(e) => setDiscountToFmv(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-center">
            <div className="text-[11px] text-slate-400 font-mono">Simulated Buyback Price</div>
            <div className="text-xl font-bold font-mono text-white tabular-nums mt-0.5">
              ₹{buybackPrice} <span className="text-xs text-slate-400 font-normal">/ share</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono">
              Liquidity Absorbs: ~{Math.round((tenderPoolAmountCr * 10000000) / buybackPrice).toLocaleString()} shares
            </div>
          </div>
        </div>
      </div>

      {/* Case Study & Real-World Precedent: Swiggy Regulatory Exemption */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">
            Landmark Precedent: Swiggy's Approved 1-Month Post-IPO Liquidity Window
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          In standard Indian listings, unlisted employee shares are frozen under a mandatory 6-month lock-in post-IPO.
          In its landmark \$1B equity pool structuring, Swiggy secured explicit regulatory approval to grant option holders
          a <strong className="text-emerald-400">1-month exercise and sale window immediately following listing</strong>,
          providing immediate wealth monetization without lock-in friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono text-xs">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
            <div className="text-slate-400 font-sans font-semibold">Standard Regulatory Path</div>
            <div className="text-red-400">IPO Date &rarr; 6-Month Mandatory Lock-in &rarr; Delayed Liquidity</div>
            <div className="text-[11px] text-slate-500 font-sans">
              Employees bear price volatility risk while trapped in illiquid holdings.
            </div>
          </div>

          <div className="bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-500/30 space-y-1">
            <div className="text-emerald-400 font-sans font-semibold">Swiggy Exemption Model</div>
            <div className="text-emerald-300 font-bold">IPO Date &rarr; 1-Month Special Window &rarr; Immediate Liquidity</div>
            <div className="text-[11px] text-emerald-400/80 font-sans">
              Employees can exercise and liquidate in market within 30 days of IPO at listed tax rates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
