# EquiCraft AI — Intelligent ESOP Governance & Equity Management Platform

EquiCraft AI is an enterprise-grade equity compensation and statutory governance platform for unlisted high-growth companies. It automates Rule 12 and DPIIT compliance, executes Damodaran-aligned corporate valuations with option overhang deductions, audits grant contracts for fine-print governance risks using Gemini AI, and empowers employees with real-time multi-stage tax and wealth simulation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural parameters have been established based on your responses:

- **Dual-Sided Experience Confirmed**: Unified system providing both the **Founder & Legal Admin Suite** (cap table, pool sizing, scheme generation, risk auditor, liquidity events) and the **Employee Wealth Portal** (vesting tracker, cashless exercise simulator, 3-stage TDS & capital gains tax breakdown).
- **Full AI Suite Confirmed**: Deep integration of Gemini AI (`gemini-3.8-flash`) acting as:
  1. *Grant & Fine-Print Risk Auditor* (detecting ambiguous cause definitions, cliff non-compliance, defective post-resignation exercise windows, and trustee disqualifications).
  2. *Statutory Scheme & Resolution Generator* (Rule 12 scheme rules, EGM Special Resolutions, Section 102 notes, ROC Form MGT-14 filing packages).
  3. *Damodaran Valuation Copilot* (Total Beta derivations, Black-Scholes option overhang, DLOM calculations, and scenario forecasts).
- **Target Company Profile**: Pre-configured with a High-Growth Tech Venture dataset ("HyperScale Dynamics Inc.", DPIIT-recognized startup, Series A-to-C cap table, tiered pool allocations, and Swiggy/Zomato vesting models).

---

## 1. Overview & Core Concept

### What It Does
EquiCraft AI replaces brittle, error-prone manual spreadsheets with a deterministic equity management and compliance engine. It guides founders, legal counsels, and CFOs through the statutory lifecycle of an ESOP scheme—from Board and shareholder resolutions to ROC filings—while providing mathematical cap table modeling and automated contract auditing. Concurrently, it grants employees total transparency over their options with interactive exercise and tax modeling.

### Target Audience & Personas
- **Founders & CEOs**: Model pool dilution, preserve founder control, and align executive incentives without legal blind spots.
- **Legal & Company Secretaries (CS)**: Generate bulletproof Rule 12 documentation, enforce DPIIT 10-year startup exemptions, and audit grant agreements against governance flaws.
- **CFOs & Finance Teams**: Perform Damodaran intrinsic valuations deducting Black-Scholes option overhang, manage Employee Welfare Trust loan flows, and calculate withholding TDS.
- **Employees & Option Holders**: Model personal wealth realization across exercise costs, TDS perquisite taxes (Stage 2), and capital gains (Stage 3 STCG vs. LTCG).

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [EquiCraft AI] ── [Console / Portal Switcher] ── [Active Company]     │
├────────────────────────────────────────────────────────────────────────┤
│ Founder Admin Suite:                                                   │
│  ├─ 1. Statutory Scheme & MGT-14 Workflow (Rule 12, Board, EGM)        │
│  ├─ 2. Fine-Print Legal & Contract Risk Auditor (Gemini AI NLP)        │
│  ├─ 3. Cap Table & Dilution Simulator (Damodaran Total Beta & Overhang)│
│  ├─ 4. Vesting Architectures Engine (Swiggy Uniform vs Zomato Graded)  │
│  └─ 5. Liquidity & Trust Event Manager (Cashless TDS & Post-IPO window)│
├────────────────────────────────────────────────────────────────────────┤
│ Employee Wealth Portal:                                                │
│  ├─ Option Portfolio & Real-Time Vesting Schedule                      │
│  ├─ Three-Stage Tax & Cashless Exercise Simulator                     │
│  └─ Post-IPO & Secondary Liquidity Realization Forecaster              │
└────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme (SaaS Dashboard Guidelines)
- **Aesthetic Direction**: High-density executive financial terminal with typographic restraint, single-elevation depth, and tabular precision.
- **Color Palette (60-30-10 Rule)**:
  - *60% Canvas*: Crisp, low-strain neutral canvas (`#090D16` dark slate / `#F8FAFC` light mode support; default sleek dark executive theme).
  - *30% Structural Surfaces*: Deep indigo-tinted slate containers (`#111827`, `#1E293B`) with 1px hairline borders (`rgba(255,255,255,0.08)`).
  - *10% Accent Intent*: Precision Emerald (`#10B981`) for equity growth, Electric Cobalt (`#3B82F6`) for active controls, and Amber (`#F59E0B`) for compliance alerts.
- **Zero-Pill & Tabular Discipline**:
  - No candy pill enclosures or badge sandwiches on metadata. Statuses and dates displayed as clean inline text with subtle bullet/slash dividers (`·`, `/`).
  - Strict enforcement of `font-variant-numeric: tabular-nums` and `font-mono` on all share counts, valuations, tax figures, strike prices, and percentages.
- **Typography**:
  - *Display / Headings*: Plus Jakarta Sans (bold, modern executive clarity).
  - *Body Prose*: Satoshi / Inter-refined for dense scannability.
  - *Financial & Mathematical Telemetry*: JetBrains Mono with tabular numbers.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Deterministic Math Engine vs. AI Hallucination Guardrails**
  - *Chosen Approach*: All cap table dilution, Black-Scholes option overhang, Damodaran Total Beta ($ \beta / R_{\text{Market}} $), perquisite tax, and capital gains math are computed via deterministic TypeScript corporate finance algorithms. Gemini AI is strictly utilized for unstructured text auditing, regulatory explanation, and draft synthesis.
  - *Why*: Financial and tax calculations require exact decimal precision and auditability; AI models should never perform raw multiplication on cap tables.
- **Decision 2: Express Server Proxy Architecture for Gemini API**
  - *Chosen Approach*: Server-side API endpoint (`/api/ai/audit-contract`, `/api/ai/generate-scheme`) using `@google/genai` with `gemini-3.8-flash`, keeping API keys secure on the backend and streaming responses.
  - *Why*: Conforms strictly to AI Studio security guidelines; zero client-side API key exposure.
- **Decision 3: Interactive Dynamic Scenario Presets**
  - *Chosen Approach*: Users can toggle between realistic startup presets (Early Seed, High-Growth Series B, Pre-IPO Unicorn) or customize individual variables (Valuation, Strike Price, Exercise Window, Employee Tax Slab).
  - *Why*: Enables immediate executive discovery while allowing granular customization for real-world cap tables.

---

## 4. Technical Architecture & Data Strategy

### System Component Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Frontend (React 19 + Vite)                      │
│                                                                        │
│  ┌───────────────────────┐              ┌───────────────────────────┐  │
│  │ Founder Console       │              │ Employee Wealth Portal    │  │
│  │ - Cap Table Simulator │              │ - Vesting Tracker         │  │
│  │ - Scheme Generator    │              │ - Tax & Exercise Sim      │  │
│  │ - Contract Auditor    │              │ - Liquidity Realization   │  │
│  └──────────┬────────────┘              └─────────────┬─────────────┘  │
│             │                                         │                │
│  ┌──────────▼─────────────────────────────────────────▼─────────────┐  │
│  │ Core Financial Engine (TypeScript)                               │  │
│  │ - Black-Scholes Option Overhang Evaluator                        │  │
│  │ - Damodaran Total Beta & DLOM Reinvestment Modeler               │  │
│  │ - 3-Stage Tax Calculator (Stage 2 TDS Perk, Stage 3 STCG/LTCG)   │  │
│  │ - Trust Cashless Exercise Net Settlement Solver                  │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ fetch('/api/ai/*')
┌─────────────────────────────────────▼──────────────────────────────────┐
│                      Express Backend (Node.js + tsx)                   │
│                                                                        │
│  ┌──────────────────────┐               ┌───────────────────────────┐  │
│  │ /api/ai/audit-grant  │               │ /api/ai/generate-scheme   │  │
│  │ - Flags Cause Ambigu.│               │ - Rule 12 Compliant Specs │  │
│  │ - Trustee Disqualif. │               │ - Board/EGM Resolutions   │  │
│  │ - Cliff & Window Gap │               │ - MGT-14 Checklist        │  │
│  └──────────┬───────────┘               └─────────────┬─────────────┘  │
│             │                                         │                │
│             └───────────────────┬─────────────────────┘                │
│                                 ▼                                      │
│                @google/genai (gemini-3.8-flash)                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Module Specifications to Build

1. **Top Bar & Dual Persona Switcher**:
   - Executive header with quick toggle between "Founder & Legal Console" and "Employee Wealth Portal", plus quick-scenario selectors.
2. **Cap Table Dilution & Damodaran Valuation Modeler**:
   - Multi-round funding simulator (Seed, Series A, Series B, Pre-IPO).
   - Intrinsic DCF with Cost of Equity adjusted for Total Beta ($ \beta_{\text{Total}} = \beta_{\text{Market}} / R_{\text{Market}} $).
   - Real-time Black-Scholes Option Overhang deduction:
     $$ \text{Net Equity Value} = \text{Enterprise Value} + \text{Cash} - \text{Debt} - \text{Value of Option Overhang} $$
   - Illiquidity haircut (DLOM 15% - 30%) and failure probability weighting.
3. **Statutory Scheme & Governance Generator (Rule 12 & DPIIT)**:
   - Automated generator for Board Resolutions, EGM Special Resolutions ($\ge 75\%$), Section 102 Explanatory Statements, and ROC Form MGT-14 30-day compliance timeline checklist.
   - Interactive toggle for DPIIT 10-year startup exemption for promoters and $>10\%$ shareholders.
4. **AI Fine-Print Risk & Governance Auditor**:
   - Scans uploaded or sample grant agreements for critical corporate traps:
     - Ambiguous "Cause" termination definitions (missing fraud/IP breach exclusions).
     - Statutory 1-year cliff violations.
     - Trustee disqualification breaches (directors, KMPs, relatives, $>10\%$ owners).
     - Defective post-resignation exercise windows (e.g. 30 vs 90 days).
   - Severity scoring (High/Medium/Low) with instant AI redline fix recommendations.
5. **Vesting Architectures Engine**:
   - Side-by-side visualization of Graded Vesting:
     - *Uniform Model (Swiggy)*: 25% / 25% / 25% / 25%.
     - *Back-Loaded Model (Zomato)*: 5% / 15% / 30% / 50% post-1-year cliff.
     - *Milestone/KPI Hybrid*: 50% tenure + 50% revenue/delivery milestones.
6. **Employee Wealth & Three-Stage Tax Simulator**:
   - Stage 1 (Grant): ₹0 tax.
   - Stage 2 (Exercise): Perquisite Tax = $(\text{FMV} - \text{Strike}) \times \text{Shares} \times \text{Slab Rate}$.
   - Stage 3 (Sale): Capital Gains Tax comparing unlisted 24-month rule (STCG at slab vs. LTCG) vs. Swiggy-style 1-month post-IPO listed liquidity window.
   - Cashless Trust exercise solver: calculates exact share liquidation needed to remit TDS and loan without out-of-pocket cash from employee.
7. **Secondary Liquidity & Tender Offer Orchestrator**:
   - Models company buyback rounds, employee tender pools, tag-along minority rights, and drag-along acquisition thresholds.
