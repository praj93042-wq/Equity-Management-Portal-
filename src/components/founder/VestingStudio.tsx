import React, { useState } from 'react';
import { calculateVestedPortion } from '../../utils/taxMath';
import {
  Clock,
  ShieldCheck,
  Award,
  Layers,
  BarChart3,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';

export const VestingStudio: React.FC = () => {
  const [tenureMonths, setTenureMonths] = useState<number>(24);
  const [sampleGrant, setSampleGrant] = useState<number>(100000);

  // Computations for models
  const swiggyUniform = calculateVestedPortion(sampleGrant, tenureMonths, 'swiggy-uniform');
  const zomatoBackloaded = calculateVestedPortion(sampleGrant, tenureMonths, 'zomato-backloaded');
  const milestoneHybrid = calculateVestedPortion(sampleGrant, tenureMonths, 'milestone-hybrid');

  const yearsCompleted = (tenureMonths / 12).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>Talent Architecture Module</span>
            <span aria-hidden="true">·</span>
            <span>Statutory Cliff & Graded Models</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Vesting Architectures & Tiered Grant Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Compare Uniform (Swiggy), Back-Loaded (Zomato), and Milestone Hybrid vesting schedules,
            while enforcing the mandatory Rule 12 statutory 1-year cliff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400">Sample Grant: </span>
            <span className="text-emerald-400 font-bold">{sampleGrant.toLocaleString()} options</span>
          </div>
        </div>
      </div>

      {/* Interactive Tenure Simulator Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-slate-300">
              Interactive Employee Tenure Simulation
            </div>
            <div className="text-xs text-slate-500">
              Slide to observe vesting across 4 years of continuous service.
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-xs text-slate-400">Tenure:</span>
            <span className="text-base font-bold text-emerald-400 tabular-nums">
              {tenureMonths} Months ({yearsCompleted} Yrs)
            </span>
            {tenureMonths < 12 ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                Pre-Cliff (0% Vested)
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Post-Cliff Unlocked
              </span>
            )}
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="48"
          step="1"
          value={tenureMonths}
          onChange={(e) => setTenureMonths(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span className={tenureMonths === 0 ? 'text-emerald-400 font-bold' : ''}>Day 0: Grant</span>
          <span className={tenureMonths === 12 ? 'text-emerald-400 font-bold' : ''}>Month 12: Statutory Cliff</span>
          <span className={tenureMonths === 24 ? 'text-emerald-400 font-bold' : ''}>Month 24: Year 2</span>
          <span className={tenureMonths === 36 ? 'text-emerald-400 font-bold' : ''}>Month 36: Year 3</span>
          <span className={tenureMonths === 48 ? 'text-emerald-400 font-bold' : ''}>Month 48: 100% Vested</span>
        </div>
      </div>

      {/* Side-by-Side Model Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Model 1: Swiggy Uniform */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-semibold">Linear Incentive</span>
            <span className="text-[11px] text-slate-500">25% / 25% / 25% / 25%</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Uniform Graded (Swiggy)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Equal 25% vesting per year post-cliff. Ideal for steady executive retention and balanced incentives.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-2 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vesting Percentage:</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {swiggyUniform.vestingPercentage}%
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vested Options:</span>
              <span className="text-white font-bold tabular-nums">
                {swiggyUniform.vestedShares.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Unvested Overhang:</span>
              <span>{(sampleGrant - swiggyUniform.vestedShares).toLocaleString()}</span>
            </div>
          </div>

          {/* Visual progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${swiggyUniform.vestingPercentage}%` }}
            />
          </div>
        </div>

        {/* Model 2: Zomato Back-Loaded */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-400 font-semibold">Retention Anchor</span>
            <span className="text-[11px] text-slate-500">5% / 15% / 30% / 50%</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Back-Loaded (Zomato)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Concentrates 80% of equity in Years 3 & 4. Powerful retention hook for high-growth tech hires.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-2 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vesting Percentage:</span>
              <span className="text-blue-400 font-bold tabular-nums">
                {zomatoBackloaded.vestingPercentage}%
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vested Options:</span>
              <span className="text-white font-bold tabular-nums">
                {zomatoBackloaded.vestedShares.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Unvested Overhang:</span>
              <span>{(sampleGrant - zomatoBackloaded.vestedShares).toLocaleString()}</span>
            </div>
          </div>

          {/* Visual progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${zomatoBackloaded.vestingPercentage}%` }}
            />
          </div>
        </div>

        {/* Model 3: Milestone Hybrid */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 font-semibold">Outcome-Linked</span>
            <span className="text-[11px] text-slate-500">50% Time + 50% KPI</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Milestone / Hybrid</h3>
            <p className="text-xs text-slate-400 mt-1">
              Combines baseline tenure with ARR and product release milestones. Aligns rewards directly with growth.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-2 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vesting Percentage:</span>
              <span className="text-purple-400 font-bold tabular-nums">
                {milestoneHybrid.vestingPercentage}%
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Vested Options:</span>
              <span className="text-white font-bold tabular-nums">
                {milestoneHybrid.vestedShares.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Unvested Overhang:</span>
              <span>{(sampleGrant - milestoneHybrid.vestedShares).toLocaleString()}</span>
            </div>
          </div>

          {/* Visual progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-300"
              style={{ width: `${milestoneHybrid.vestingPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tiered Grant Strategy Guidelines */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-400" />
          Organizational Tier Allocation Benchmark Framework
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 space-y-2">
            <div className="font-bold text-emerald-400 font-mono">Tier 1: Leadership & C-Suite</div>
            <p className="text-slate-400">
              <strong>Allocation:</strong> 0.5% – 2.0% per officer.<br />
              <strong>Recommended Model:</strong> Zomato back-loaded or hybrid KPI vesting to link realization to exit valuation.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 space-y-2">
            <div className="font-bold text-blue-400 font-mono">Tier 2: Functional Leads & Staff</div>
            <p className="text-slate-400">
              <strong>Allocation:</strong> 0.1% – 0.4% per lead.<br />
              <strong>Recommended Model:</strong> Swiggy uniform 25% annual or quarterly post-cliff to establish dependable retention hooks.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 space-y-2">
            <div className="font-bold text-purple-400 font-mono">Tier 3: Broad Engineering & All-Hands</div>
            <p className="text-slate-400">
              <strong>Allocation:</strong> 0.01% – 0.05% per engineer.<br />
              <strong>Recommended Model:</strong> Uniform 4-year vesting with Face Value strike price (₹10) to foster an authentic owner mindset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
