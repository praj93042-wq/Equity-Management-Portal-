import React, { useState } from 'react';
import {
  Persona,
  FounderTab,
  EmployeeTab,
  Shareholder,
  EmployeeGrant,
  DamodaranValuationParams,
} from './types/esop';
import {
  INITIAL_COMPANY_PROFILE,
  INITIAL_SHAREHOLDERS,
  INITIAL_EMPLOYEE_GRANTS,
  INITIAL_VALUATION_PARAMS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { CapTableValuation } from './components/founder/CapTableValuation';
import { StatutorySchemeGenerator } from './components/founder/StatutorySchemeGenerator';
import { AiRiskAuditor } from './components/founder/AiRiskAuditor';
import { VestingStudio } from './components/founder/VestingStudio';
import { LiquidityTrustManager } from './components/founder/LiquidityTrustManager';
import { EmployeeWealthPortal } from './components/employee/EmployeeWealthPortal';
import {
  ShieldCheck,
  UserCheck,
  Building,
  Sparkles,
  Download,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState<Persona>('founder');
  const [founderTab, setFounderTab] = useState<FounderTab>('captable');
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>('portfolio');

  // Company state
  const [companyProfile, setCompanyProfile] = useState(INITIAL_COMPANY_PROFILE);
  const [shareholders, setShareholders] = useState<Shareholder[]>(INITIAL_SHAREHOLDERS);
  const [valuationParams, setValuationParams] = useState<DamodaranValuationParams>(INITIAL_VALUATION_PARAMS);
  const [employeeGrants, setEmployeeGrants] = useState<EmployeeGrant[]>(INITIAL_EMPLOYEE_GRANTS);
  const [selectedGrantId, setSelectedGrantId] = useState<string>('emp-1');

  const selectedGrant = employeeGrants.find((g) => g.id === selectedGrantId) || employeeGrants[0];

  // Preset switchers
  const handleLoadPreset = (preset: 'high-growth' | 'early' | 'pre-ipo') => {
    if (preset === 'high-growth') {
      setCompanyProfile(INITIAL_COMPANY_PROFILE);
      setValuationParams(INITIAL_VALUATION_PARAMS);
    } else if (preset === 'early') {
      setCompanyProfile({
        ...INITIAL_COMPANY_PROFILE,
        name: 'Seedling Robotics Pvt Ltd',
        currentRound: 'Seed',
        currentFmv: 75,
      });
      setValuationParams({
        ...INITIAL_VALUATION_PARAMS,
        enterpriseValue: 450000000, // ₹45 Cr
        cash: 60000000,
        debt: 0,
        dlomPercent: 25,
        weightedAverageStrike: 10,
      });
    } else if (preset === 'pre-ipo') {
      setCompanyProfile({
        ...INITIAL_COMPANY_PROFILE,
        name: 'HyperScale Global Technologies',
        currentRound: 'Pre-IPO',
        currentFmv: 850,
      });
      setValuationParams({
        ...INITIAL_VALUATION_PARAMS,
        enterpriseValue: 24000000000, // ₹2,400 Cr
        cash: 3500000000,
        debt: 500000000,
        dlomPercent: 12,
        weightedAverageStrike: 50,
      });
    }
  };

  const handleExportSummary = () => {
    const summaryData = {
      company: companyProfile.name,
      dpiitExemption: companyProfile.isDpiitStartup,
      enterpriseValueINR: valuationParams.enterpriseValue,
      currentFmvINR: companyProfile.currentFmv,
      activeShareholdersCount: shareholders.length,
      activeGrantsCount: employeeGrants.length,
      exportTimestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyProfile.name.toLowerCase().replace(/\s+/g, '_')}_esop_report.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans">
      {/* Strict Top Bar Contract Navigation */}
      <Navbar
        currentPersona={currentPersona}
        onSelectPersona={setCurrentPersona}
        founderTab={founderTab}
        onSelectFounderTab={setFounderTab}
        employeeTab={employeeTab}
        onSelectEmployeeTab={setEmployeeTab}
        companyName={companyProfile.name}
        isDpiitStartup={companyProfile.isDpiitStartup}
      />

      {/* Top Banner: Quick Scenario Presets Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Scenario Presets:</span>
            <button
              onClick={() => handleLoadPreset('high-growth')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-colors font-mono"
            >
              High-Growth Tech (₹320 Cr)
            </button>
            <button
              onClick={() => handleLoadPreset('early')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-colors font-mono"
            >
              Early Seed (₹45 Cr)
            </button>
            <button
              onClick={() => handleLoadPreset('pre-ipo')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-colors font-mono"
            >
              Pre-IPO Scale (₹2,400 Cr)
            </button>
          </div>

          <div className="flex items-center gap-4">
            {currentPersona === 'employee' && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Viewing as Employee:</span>
                <select
                  value={selectedGrantId}
                  onChange={(e) => setSelectedGrantId(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-emerald-400 font-mono focus:outline-none"
                >
                  {employeeGrants.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.employeeName} ({g.tier.split(':')[0]})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleExportSummary}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-mono"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              Export JSON Report
            </button>
          </div>
        </div>
      </div>

      {/* Main App Viewport */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentPersona === 'founder' ? (
          <div>
            {founderTab === 'captable' && (
              <CapTableValuation
                shareholders={shareholders}
                valuationParams={valuationParams}
                onUpdateParams={setValuationParams}
              />
            )}

            {founderTab === 'scheme' && (
              <StatutorySchemeGenerator
                companyName={companyProfile.name}
                isDpiitStartup={companyProfile.isDpiitStartup}
                onToggleDpiit={(val) =>
                  setCompanyProfile({ ...companyProfile, isDpiitStartup: val })
                }
              />
            )}

            {founderTab === 'auditor' && (
              <AiRiskAuditor isDpiitStartup={companyProfile.isDpiitStartup} />
            )}

            {founderTab === 'vesting' && <VestingStudio />}

            {founderTab === 'liquidity' && <LiquidityTrustManager />}
          </div>
        ) : (
          <div>
            <EmployeeWealthPortal
              grant={selectedGrant}
              currentFmv={companyProfile.currentFmv}
            />
          </div>
        )}
      </main>

      {/* Grounded Executive Footer (Clean Anti-Slop Discipline) */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>EquiCraft AI &copy; 2026</span>
            <span aria-hidden="true">·</span>
            <span>Companies Act Rule 12 & DPIIT Framework</span>
            <span aria-hidden="true">·</span>
            <span>Damodaran Valuation Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>ROC Form MGT-14 30-Day Tracker</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Swiggy Precedent Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
