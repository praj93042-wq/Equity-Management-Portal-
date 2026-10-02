import { Shareholder, EmployeeGrant, DamodaranValuationParams } from '../types/esop';

export const INITIAL_COMPANY_PROFILE = {
  name: 'HyperScale Dynamics Inc.',
  cin: 'U72900KA2022PTC158912',
  incorporationDate: '2022-04-15',
  isDpiitStartup: true,
  dpiitNumber: 'DIPP114892',
  dpiitExemptionExpiry: '2032-04-15', // 10 years exemption
  currentRound: 'Series B',
  totalShares: 10000000,
  faceValue: 10,
  authorizedCapital: 120000000, // ₹12 Cr
  paidUpCapital: 100000000, // ₹10 Cr
  currentFmv: 345, // ₹345 per share
  last409aDate: '2026-06-30',
  registeredValuer: 'M/s V. K. Singhania & Associates (IBBI/RV/02/2019)',
};

export const INITIAL_SHAREHOLDERS: Shareholder[] = [
  {
    id: 'sh-1',
    name: 'Aarav Mehta (Co-Founder & CEO)',
    category: 'Founder',
    round: 'Founding',
    shares: 3200000,
    percentage: 32.0,
    votingPercentage: 35.5,
    investmentAmount: 32000000,
  },
  {
    id: 'sh-2',
    name: 'Rohan Deshmukh (Co-Founder & CTO)',
    category: 'Founder',
    round: 'Founding',
    shares: 2300000,
    percentage: 23.0,
    votingPercentage: 25.5,
    investmentAmount: 23000000,
  },
  {
    id: 'sh-3',
    name: 'Nexus Alpha Ventures (Series A)',
    category: 'Investor',
    round: 'Series A',
    shares: 1800000,
    percentage: 18.0,
    votingPercentage: 18.0,
    investmentAmount: 180000000,
  },
  {
    id: 'sh-4',
    name: 'Elevation Horizon Fund (Series B)',
    category: 'Investor',
    round: 'Series B',
    shares: 1700000,
    percentage: 17.0,
    votingPercentage: 17.0,
    investmentAmount: 340000000,
  },
  {
    id: 'sh-5',
    name: 'ESOP Welfare Trust Pool',
    category: 'Employee Pool',
    round: 'Founding',
    shares: 1000000,
    percentage: 10.0,
    votingPercentage: 4.0,
    investmentAmount: 10000000,
  },
];

export const INITIAL_EMPLOYEE_GRANTS: EmployeeGrant[] = [
  {
    id: 'emp-1',
    employeeName: 'Priya Sharma',
    role: 'Principal Staff Architect',
    tier: 'Tier 1: Leadership',
    totalGranted: 120000,
    vestedShares: 60000,
    exercisedShares: 15000,
    strikePrice: 25,
    grantDate: '2023-05-01',
    vestingModel: 'swiggy-uniform',
    monthsCompleted: 32,
  },
  {
    id: 'emp-2',
    employeeName: 'Vikramaditya Iyer',
    role: 'VP of AI Engineering',
    tier: 'Tier 1: Leadership',
    totalGranted: 200000,
    vestedShares: 70000,
    exercisedShares: 0,
    strikePrice: 35,
    grantDate: '2023-01-15',
    vestingModel: 'zomato-backloaded',
    monthsCompleted: 38,
  },
  {
    id: 'emp-3',
    employeeName: 'Ananya Verma',
    role: 'Staff Product Manager',
    tier: 'Tier 2: Key Functional',
    totalGranted: 45000,
    vestedShares: 22500,
    exercisedShares: 5000,
    strikePrice: 50,
    grantDate: '2024-02-01',
    vestingModel: 'swiggy-uniform',
    monthsCompleted: 24,
  },
  {
    id: 'emp-4',
    employeeName: 'Karthik Nambiar',
    role: 'Senior Backend Engineer',
    tier: 'Tier 3: Broad Staff',
    totalGranted: 20000,
    vestedShares: 5000,
    exercisedShares: 0,
    strikePrice: 75,
    grantDate: '2025-06-01',
    vestingModel: 'swiggy-uniform',
    monthsCompleted: 15,
  },
];

export const INITIAL_VALUATION_PARAMS: DamodaranValuationParams = {
  enterpriseValue: 3200000000, // ₹320 Cr
  cash: 450000000, // ₹45 Cr
  debt: 150000000, // ₹15 Cr
  marketBeta: 1.25,
  rMarket: 0.55, // correlation with broad market index
  riskFreeRate: 0.071, // 7.1% 10-Yr India G-Sec
  equityRiskPremium: 0.055, // 5.5%
  optionVolatility: 0.48, // 48% annualized volatility
  optionAverageLifeYears: 3.5,
  weightedAverageStrike: 45, // ₹45
  totalPoolOptions: 1000000,
  primarySharesOutstanding: 9000000,
  dlomPercent: 20, // 20% Discount for Lack of Marketability
  failureProbabilityPercent: 8, // 8% failure rate
  liquidationValue: 600000000, // ₹60 Cr
};

export const SAMPLE_CONTRACTS = {
  risky: `GRANT AGREEMENT & OPTION POLICY (EXECUTIVE DRAFT)

SECTION 4. VESTING SCHEDULE
The Options granted hereunder shall vest in quarterly increments of 6.25% commencing ninety (90) days from the Grant Date. The Board reserves the unilateral right to freeze or accelerate vesting at its sole discretion.

SECTION 7. TERMINATION FOR CAUSE
If the Optionee's employment is terminated for 'Cause', all vested and unvested Options shall immediately be forfeited. 'Cause' shall be determined by the Board of Directors in its sole discretion if the Employee acts contrary to the best commercial interests, reputation, or strategic goals of the Company.

SECTION 9. POST-TERMINATION EXERCISE
Upon voluntary resignation, the Optionee must formally tender the exercise price for all vested Options within fourteen (14) calendar days of the separation date. Any Option not exercised within this 14-day period shall immediately lapse and revert to the Company.

SECTION 11. TRUST ADMINISTRATION
The Company has constituted the HyperScale Employee Welfare Trust. The Board of Directors has nominated the Managing Director and the Chief Financial Officer to serve as the sole Managing Trustees of said Trust.`,

  compliant: `EMPLOYEE STOCK OPTION GRANT AGREEMENT (RULE 12 COMPLIANT)

SECTION 4. STATUTORY CLIFF & VESTING SCHEDULE
Pursuant to Rule 12(6)(a) of the Companies (Share Capital and Debentures) Rules, 2014, there shall be a mandatory statutory cliff period of not less than one (1) year between the Grant Date and the vesting of Options. No Option shall vest or become exercisable prior to the completion of twelve (12) months of continuous service. Thereafter, Options shall vest in accordance with Schedule A (Uniform 25% annual tranches).

SECTION 7. TERMINATION FOR CAUSE & CLAWBACK
In the event of Termination for Cause, all unvested and unexercised Options shall lapse immediately. 'Cause' shall strictly and objectively mean: (a) final judicial conviction of a felony involving moral turpitude or fraud, (b) material, documented breach of confidentiality or IP Assignment Agreement, or (c) intentional embezzlement of corporate assets verified by external audit. The Board retains clawback rights over net financial proceeds realized within twelve (12) months prior to such discovery.

SECTION 9. POST-RESIGNATION EXERCISE WINDOW
Upon voluntary resignation in good standing, the Optionee shall have a period of ninety (90) calendar days from the last working date to exercise vested Options into Equity Shares, or participate in the Trust cashless exercise facility.

SECTION 11. INDEPENDENT TRUSTEE GOVERNANCE
Under Rule 12(1) statutory requirements, no Director of the Company, relative of a Director, or Key Managerial Personnel (KMP) shall act as a Trustee of the Employee Welfare Trust. Independent professional trustees have been formally appointed.`,
};
