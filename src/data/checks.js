export { legislationRefs } from './legislation'
export { documentContent } from './document-content'

export const checkers = [
  {
    id: 'checker-rnd-tax',
    name: 'R&D Tax Report Checker',
    description: 'Auto-reviews R&D tax reports before they reach the reviewer, catching errors and suggesting corrections with a full audit trail.',
    icon: 'shield',
  },
]

export const checkCategories = [
  { id: 'company', label: 'Company Details & Status' },
  { id: 'financials', label: 'Financials' },
]

export const checkDefinitions = [
  { id: 'chk-company-name', category: 'company', name: 'Company name present & CH match', description: 'Verifies the company name appears in the report and matches Companies House records.' },
  { id: 'chk-company-number', category: 'company', name: 'Company number present & valid', description: 'Checks the company number is present and returns an active company on Companies House.' },
  { id: 'chk-sic-codes', category: 'company', name: 'SIC codes present & plausible for R&D', description: 'Confirms SIC codes are included and correlate with R&D activity.' },
  { id: 'chk-accounting-period', category: 'company', name: 'Accounting period(s) valid', description: 'Validates accounting period dates are present and logically consistent.' },
  { id: 'chk-going-concern', category: 'company', name: 'Going concern & CH status', description: 'Checks the company is not dissolved, in liquidation, or otherwise inactive.' },
  { id: 'chk-trading-status', category: 'company', name: 'Currently trading & not dormant', description: 'Confirms the company is actively trading and has not filed dormant accounts.' },
  { id: 'chk-rnd-trade', category: 'company', name: "R&D relates to claimant's trade", description: 'Assesses whether the described R&D activities relate to the company\'s trade.' },
  { id: 'chk-rnd-expenditure', category: 'financials', name: 'R&D expenditure < total company expenditure', description: 'Flags if claimed R&D spend exceeds the company\'s total reported expenditure.' },
  { id: 'chk-expenditure-bounds', category: 'financials', name: 'Expenditure categories within bounds', description: 'Checks individual expenditure categories fall within expected ranges.' },
  { id: 'chk-grants', category: 'financials', name: 'No public grants/subsidies detected', description: 'Screens for notified state aid or grants that could affect the claim.' },
]

export function timeAgo(dateStr) {
  const now = new Date('2026-03-13T14:00:00Z')
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

// ──────────────────────────────────────────
// File Reviews with Sub-checks
// ──────────────────────────────────────────

export const fileReviews = [
  // ── Review 1: Nexagen Ltd ──
  {
    id: 'rev-1',
    checkerId: 'checker-rnd-tax',
    fileName: 'R&D_Tax_Claim_FY2025.pdf',
    fileType: 'pdf',
    entityId: 'ent-1',
    submittedBy: 'Sophie Clark',
    submittedAt: '2026-03-13T09:30:00Z',
    reviewedAt: '2026-03-13T09:32:00Z',
    routing: 'back-to-junior',
    routingReason: 'Two critical issues found: company number mismatch and R&D expenditure exceeds total company expenditure. Must be corrected before reviewer review.',
    checks: [
      {
        id: 'rev1-1', category: 'company', name: 'Company name present & CH match', result: 'pass',
        summary: 'Company name "Nexagen Ltd" matches Companies House record.',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires the claimant to be an identifiable, registered company. The company name must appear in the report and match the Companies House register exactly to ensure the claim is attributed to the correct legal entity.',
        subChecks: [
          {
            id: 'rev1-1-a', assertion: 'Company name field is present in report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-name', extractedValue: 'Nexagen Ltd', page: 1 },
            reasoning: 'Company name "Nexagen Ltd" found on page 1 of the report.',
          },
          {
            id: 'rev1-1-b', assertion: 'Company name exists on Companies House', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923',
              records: { 'Company Name': 'Nexagen Ltd', 'Company Number': '08451923', 'Status': 'Active', 'Incorporated': '12 March 2013', 'Type': 'Private limited' },
            },
            reasoning: 'Companies House confirms "Nexagen Ltd" is registered and active.',
          },
          {
            id: 'rev1-1-c', assertion: 'Report name matches CH record exactly', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report', value: 'Nexagen Ltd' },
              sourceB: { label: 'Companies House', value: 'Nexagen Ltd' },
              match: true,
            },
            reasoning: 'Exact string match between report and Companies House. No variations or typos.',
          },
        ],
      },
      {
        id: 'rev1-2', category: 'company', name: 'Company number present & valid', result: 'critical',
        summary: 'Company number in report does not match Companies House record.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'HMRC uses the company number as the primary identifier for corporation tax purposes. An incorrect or invalid number will cause the claim to be rejected at submission.',
        autoFixed: true, originalValue: '08451293', correctedValue: '08451923',
        suggestedFix: 'Correct company number from 08451293 to 08451923.',
        subChecks: [
          {
            id: 'rev1-2-a', assertion: 'Company number field is present in report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-number', extractedValue: '08451293', page: 1 },
            reasoning: 'Company number "08451293" found on page 1.',
          },
          {
            id: 'rev1-2-b', assertion: 'Company number returns active company on CH', result: 'critical',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451293',
              records: { 'Query': '08451293', 'Result': 'No active company found', 'Nearest Match': '08451923 — Nexagen Ltd' },
            },
            reasoning: 'The number 08451293 returns no active company. The name "Nexagen Ltd" is registered under 08451923 — digits 2 and 9 are transposed.',
          },
          {
            id: 'rev1-2-c', assertion: 'Company number correlates with company name', result: 'critical',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report Number', value: '08451293' },
              sourceB: { label: 'CH Number for Nexagen Ltd', value: '08451923' },
              match: false,
              discrepancy: 'Transposition of digits 2 and 9 in positions 6-7.',
            },
            reasoning: 'HMRC will reject the claim with an incorrect company number. This is a transposition error and has been auto-corrected.',
          },
        ],
      },
      {
        id: 'rev1-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass',
        summary: 'SIC code 72110 (Biotechnology R&D) is present and strongly correlates with R&D activity.',
        confidence: 0.97,
        legislationRefIds: ['cird81400'],
        basis: 'HMRC uses SIC codes to risk-assess R&D claims. Companies in low-probability sectors face higher scrutiny, so the SIC code must be present and consistent with the nature of the R&D described.',
        subChecks: [
          {
            id: 'rev1-3-a', assertion: 'SIC code field is present in report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-sic', extractedValue: '72110 — Biotechnology R&D', page: 1 },
            reasoning: 'SIC code found on page 1.',
          },
          {
            id: 'rev1-3-b', assertion: 'SIC code matches Companies House filing', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923',
              records: { 'SIC Code': '72110', 'Description': 'Research and experimental development on biotechnology' },
            },
            reasoning: 'SIC code matches CH records.',
          },
          {
            id: 'rev1-3-c', assertion: 'SIC code indicates R&D plausibility', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'SIC Code', value: '72110' },
              sourceB: { label: 'HMRC R&D Category', value: 'High probability' },
              match: true,
            },
            reasoning: 'SIC 72110 is in the "72xxx R&D" high-probability category per CIRD81400.',
          },
        ],
      },
      {
        id: 'rev1-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass',
        summary: 'Accounting period 1 Apr 2024 – 31 Mar 2025 is valid and within 12 months.',
        confidence: 0.99,
        legislationRefIds: ['fa1998-sch18-para3'],
        basis: 'FA 1998 Sch 18 para 3 requires that no accounting period exceeds 12 months. R&D relief must be claimed per accounting period, so dates must be present and logically valid.',
        subChecks: [
          {
            id: 'rev1-4-a', assertion: 'Accounting period dates are present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-accounting-period', extractedValue: '1 April 2024 to 31 March 2025', page: 1 },
            reasoning: 'Period dates clearly stated on page 1.',
          },
          {
            id: 'rev1-4-b', assertion: 'Period does not exceed 12 months', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Period Length', value: '365 days' },
              sourceB: { label: 'Maximum Allowed', value: '366 days (12 months)' },
              match: true,
            },
            reasoning: 'Standard 12-month period. Within legal maximum.',
          },
        ],
      },
      {
        id: 'rev1-5', category: 'company', name: 'Going concern & CH status', result: 'pass',
        summary: 'Company is active on Companies House. No going concern flags.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'CTA 2009 s1044 requires the company to be a going concern — not in administration or liquidation — at the end of the accounting period. A struck-off company cannot claim.',
        subChecks: [
          {
            id: 'rev1-5-a', assertion: 'Company is active on Companies House', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923',
              records: { 'Status': 'Active', 'Last Accounts Filed': 'September 2025', 'Next Accounts Due': 'September 2026' },
            },
            reasoning: 'Active status confirmed. Accounts are up to date.',
          },
          {
            id: 'rev1-5-b', assertion: 'No insolvency events in The Gazette', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'The Gazette',
              sourceUrl: 'https://www.thegazette.co.uk/',
              records: { 'Company': 'Nexagen Ltd', 'Winding-up Petitions': 'None', 'Strike-off Notices': 'None' },
            },
            reasoning: 'No insolvency notices found in The Gazette.',
          },
        ],
      },
      {
        id: 'rev1-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass',
        summary: 'Company is currently trading. Revenue reported in latest accounts.',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'R&D relief is only available to companies carrying on a trade during the accounting period. A dormant company by definition is not trading and cannot claim.',
        subChecks: [
          {
            id: 'rev1-6-a', assertion: 'Company has non-zero turnover', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/filing-history',
              records: { 'Turnover (FY2025)': '£2,100,000', 'Employees': '32' },
            },
            reasoning: 'Revenue of £2.1m and 32 employees confirms active trading.',
          },
        ],
      },
      {
        id: 'rev1-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'warning',
        summary: 'One project description lacks explicit link to the company\'s trade.',
        confidence: 0.72,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires R&D activities to be relevant to the company\'s own trade. The R&D must be undertaken for the purposes of the trade the company carries on.',
        suggestedFix: 'Strengthen the narrative for Project 3 to explicitly explain how the AI tool advances the company\'s drug discovery trade.',
        subChecks: [
          {
            id: 'rev1-7-a', assertion: 'Project 1 relates to company trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Novel CRISPR delivery mechanisms for targeted gene therapy...', page: 1 },
            reasoning: 'CRISPR gene therapy directly relates to biotech R&D (SIC 72110).',
          },
          {
            id: 'rev1-7-b', assertion: 'Project 2 relates to company trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'High-throughput screening platform for small molecule inhibitors...', page: 1 },
            reasoning: 'Drug screening platform is core biotech activity.',
          },
          {
            id: 'rev1-7-c', assertion: 'Project 3 relates to company trade', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'AI-assisted literature review tool for automated identification of relevant prior art...', page: 1 },
            reasoning: 'AI literature review tool could be seen as a general business tool rather than trade-specific R&D. HMRC may challenge this under s1044 unless the narrative explicitly connects it to drug discovery.',
          },
        ],
      },
      {
        id: 'rev1-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'critical',
        summary: 'Claimed R&D expenditure exceeds total company expenditure reported in accounts.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1052'],
        basis: 'CTA 2009 s1052 states that qualifying R&D expenditure must not exceed the company\'s total relevant expenditure for the period. This is a basic reasonableness check.',
        suggestedFix: 'Reconcile R&D expenditure with accounts. Either reduce claim to within total expenditure or verify accounts are complete.',
        subChecks: [
          {
            id: 'rev1-8-a', assertion: 'R&D expenditure figure is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: '£412,000', page: 2 },
            reasoning: 'Total R&D expenditure of £412,000 found on page 2.',
          },
          {
            id: 'rev1-8-b', assertion: 'Total company expenditure from accounts', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/filing-history',
              records: { 'Total Operating Expenditure': '£380,000', 'Period': 'Year ended 31 March 2025' },
            },
            reasoning: 'Accounts show total operating expenditure of £380,000.',
          },
          {
            id: 'rev1-8-c', assertion: 'R&D claim does not exceed total expenditure', result: 'critical',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D Claim', value: '£412,000' },
              sourceB: { label: 'Total Expenditure', value: '£380,000' },
              match: false,
              discrepancy: 'R&D claim exceeds total company expenditure by £32,000. This is mathematically impossible and indicates an error.',
            },
            reasoning: 'R&D expenditure cannot exceed total company expenditure per s1052. HMRC will automatically flag this. Either the claim figure is wrong or the accounts are incomplete.',
          },
        ],
      },
      {
        id: 'rev1-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass',
        summary: 'Staff costs, subcontractor costs, and consumables are within expected ratios.',
        confidence: 0.91,
        legislationRefIds: ['cird82000'],
        basis: 'HMRC maintains internal benchmark ratios by sector per CIRD82000. Claims with expenditure categories significantly outside these ranges attract enhanced scrutiny.',
        subChecks: [
          {
            id: 'rev1-9-a', assertion: 'Expenditure breakdown is provided', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-staff-costs', extractedValue: '£280,160 (68%)', page: 2 },
            reasoning: 'Expenditure categories found on page 2: Staff 68%, Subcontractors 22%, Consumables 10%.',
          },
          {
            id: 'rev1-9-b', assertion: 'Ratios are within HMRC sector benchmarks', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Claim Ratios', value: 'Staff 68% / Subs 22% / Consumables 10%' },
              sourceB: { label: 'Biotech Benchmarks', value: 'Staff 60-75% / Subs 15-25% / Consumables 5-15%' },
              match: true,
            },
            reasoning: 'All categories within expected ranges for biotech R&D.',
          },
        ],
      },
      {
        id: 'rev1-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass',
        summary: 'No notified state aid or grants found that would reduce the claim.',
        confidence: 0.88,
        legislationRefIds: ['cta2009-s1112g'],
        basis: 'CTA 2009 s1112G prohibits subsidised expenditure from being included in an SME R&D claim. Any grants or notified state aid must be disclosed and may require the claim to use the RDEC scheme instead.',
        subChecks: [
          {
            id: 'rev1-10-a', assertion: 'No grants disclosed in report', result: 'pass',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'No grant funding received for R&D activities', extractedText: null, found: false },
            reasoning: 'No explicit grant disclosure in the report. Absence noted (not declared either way).',
          },
          {
            id: 'rev1-10-b', assertion: 'No Innovate UK awards found', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Innovate UK',
              sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
              records: { 'Company': 'Nexagen Ltd', 'Active Awards': 'None found', 'Historical Awards': 'None found' },
            },
            reasoning: 'No Innovate UK funding identified for this company.',
          },
        ],
      },
    ],
  },

  // ── Review 2: Arcline Robotics ──
  {
    id: 'rev-2',
    checkerId: 'checker-rnd-tax',
    fileName: 'R&D_Claim_Report_FY2025.pdf',
    fileType: 'pdf',
    entityId: 'ent-2',
    submittedBy: 'Tom Andrews',
    submittedAt: '2026-03-13T10:15:00Z',
    reviewedAt: '2026-03-13T10:17:00Z',
    routing: 'direct-to-partner',
    routingReason: 'One minor warning only — accounting period date format inconsistency. Auto-corrected. Ready for reviewer sign-off.',
    checks: [
      {
        id: 'rev2-1', category: 'company', name: 'Company name present & CH match', result: 'pass',
        summary: 'Company name "Arcline Robotics Ltd" matches Companies House record.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires the claimant to be an identifiable, registered company. The company name must appear in the report and match the Companies House register exactly to ensure the claim is attributed to the correct legal entity.',
        subChecks: [
          {
            id: 'rev2-1-a', assertion: 'Company name field is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-name', extractedValue: 'Arcline Robotics Ltd', page: 1 },
            reasoning: 'Name found on page 1.',
          },
          {
            id: 'rev2-1-b', assertion: 'Name matches CH record', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561',
              records: { 'Company Name': 'Arcline Robotics Ltd', 'Status': 'Active' },
            },
            reasoning: 'Exact match confirmed.',
          },
          {
            id: 'rev2-1-c', assertion: 'Report name matches CH name', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report', value: 'Arcline Robotics Ltd' },
              sourceB: { label: 'Companies House', value: 'Arcline Robotics Ltd' },
              match: true,
            },
            reasoning: 'Exact string match.',
          },
        ],
      },
      {
        id: 'rev2-2', category: 'company', name: 'Company number present & valid', result: 'pass',
        summary: 'Company number 12847561 is valid and correlates with company name.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'HMRC uses the company number as the primary identifier for corporation tax purposes. An incorrect or invalid number will cause the claim to be rejected at submission.',
        subChecks: [
          {
            id: 'rev2-2-a', assertion: 'Company number field is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-number', extractedValue: '12847561', page: 1 },
            reasoning: 'Number found on page 1.',
          },
          {
            id: 'rev2-2-b', assertion: 'Number returns active company on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561',
              records: { 'Company': 'Arcline Robotics Ltd', 'Status': 'Active' },
            },
            reasoning: 'Valid and active.',
          },
          {
            id: 'rev2-2-c', assertion: 'Number matches company name on CH', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report Number', value: '12847561' },
              sourceB: { label: 'CH Number for Arcline Robotics Ltd', value: '12847561' },
              match: true,
            },
            reasoning: 'Company number and name are correctly paired.',
          },
        ],
      },
      {
        id: 'rev2-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass',
        summary: 'SIC code 28990 (Special-purpose machinery) is plausible for R&D.',
        confidence: 0.89,
        legislationRefIds: ['cird81400'],
        basis: 'HMRC uses SIC codes to risk-assess R&D claims. Companies in low-probability sectors face higher scrutiny, so the SIC code must be present and consistent with the nature of the R&D described.',
        subChecks: [
          {
            id: 'rev2-3-a', assertion: 'SIC code field is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-sic', extractedValue: '28990 — Special-purpose machinery manufacture', page: 1 },
            reasoning: 'SIC code on page 1.',
          },
          {
            id: 'rev2-3-b', assertion: 'SIC code is plausible for R&D', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'SIC Code', value: '28990' },
              sourceB: { label: 'HMRC R&D Category', value: 'Moderate probability' },
              match: true,
            },
            reasoning: 'SIC 28990 is moderate probability. Project descriptions confirm qualifying activity.',
          },
        ],
      },
      {
        id: 'rev2-4', category: 'company', name: 'Accounting period(s) valid', result: 'warning',
        summary: 'Accounting period dates use inconsistent format across the report.',
        confidence: 0.95,
        legislationRefIds: ['fa1998-sch18-para3'],
        basis: 'FA 1998 Sch 18 para 3 requires that no accounting period exceeds 12 months. R&D relief must be claimed per accounting period, so dates must be present and logically valid.',
        autoFixed: true, originalValue: '1/1/25 to 31/12/25', correctedValue: '1 January 2025 to 31 December 2025',
        suggestedFix: 'Standardise all date references to "1 January 2025 to 31 December 2025".',
        subChecks: [
          {
            id: 'rev2-4-a', assertion: 'Accounting period dates are present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-accounting-period', extractedValue: '1/1/25 to 31/12/25', page: 1 },
            reasoning: 'Period dates on page 1 use abbreviated format.',
          },
          {
            id: 'rev2-4-b', assertion: 'Period does not exceed 12 months', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Period Length', value: '365 days' },
              sourceB: { label: 'Maximum', value: '366 days' },
              match: true,
            },
            reasoning: 'Standard 12-month period.',
          },
          {
            id: 'rev2-4-c', assertion: 'Date format is consistent throughout report', result: 'warning',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Page 1 Format', value: '1/1/25 to 31/12/25' },
              sourceB: { label: 'Page 2 Format', value: '1 January 2025 to 31 December 2025' },
              match: false,
              discrepancy: 'Inconsistent date formatting between pages. Auto-corrected to full format.',
            },
            reasoning: 'While both refer to the same period, inconsistent formatting could cause confusion.',
          },
        ],
      },
      {
        id: 'rev2-5', category: 'company', name: 'Going concern & CH status', result: 'pass',
        summary: 'Company is active on Companies House. No insolvency proceedings.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'CTA 2009 s1044 requires the company to be a going concern — not in administration or liquidation — at the end of the accounting period. A struck-off company cannot claim.',
        subChecks: [
          {
            id: 'rev2-5-a', assertion: 'Company is active on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561',
              records: { 'Status': 'Active', 'Last Accounts': 'December 2025' },
            },
            reasoning: 'Active status confirmed.',
          },
        ],
      },
      {
        id: 'rev2-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass',
        summary: 'Company is trading with reported revenue of £4.8m.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'R&D relief is only available to companies carrying on a trade during the accounting period. A dormant company by definition is not trading and cannot claim.',
        subChecks: [
          {
            id: 'rev2-6-a', assertion: 'Company has non-zero turnover', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561/filing-history',
              records: { 'Turnover': '£4,800,000', 'Employees': '42' },
            },
            reasoning: 'Substantial trading activity.',
          },
        ],
      },
      {
        id: 'rev2-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass',
        summary: 'All three R&D projects directly relate to the company\'s robotic systems manufacturing trade.',
        confidence: 0.95,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires R&D activities to be relevant to the company\'s own trade. The R&D must be undertaken for the purposes of the trade the company carries on.',
        subChecks: [
          {
            id: 'rev2-7-a', assertion: 'Project 1 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Adaptive welding control system...', page: 1 },
            reasoning: 'Welding control directly relates to robotic manufacturing.',
          },
          {
            id: 'rev2-7-b', assertion: 'Project 2 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'Vision-guided robotic assembly...', page: 1 },
            reasoning: 'Robotic assembly is core trade activity.',
          },
          {
            id: 'rev2-7-c', assertion: 'Project 3 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'Lightweight actuator design...', page: 1 },
            reasoning: 'Actuator design for robotics is core trade.',
          },
        ],
      },
      {
        id: 'rev2-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass',
        summary: 'R&D expenditure (£620K) is well within total company expenditure (£4.2m).',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1052'],
        basis: 'CTA 2009 s1052 states that qualifying R&D expenditure must not exceed the company\'s total relevant expenditure for the period. This is a basic reasonableness check.',
        subChecks: [
          {
            id: 'rev2-8-a', assertion: 'R&D expenditure figure present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: '£620,000', page: 2 },
            reasoning: 'Found on page 2.',
          },
          {
            id: 'rev2-8-b', assertion: 'Total company expenditure from accounts', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561/filing-history',
              records: { 'Total Operating Expenditure': '£4,200,000', 'Period': 'Year ended 31 December 2025' },
            },
            reasoning: 'Accounts show total operating expenditure of £4.2m.',
          },
          {
            id: 'rev2-8-c', assertion: 'R&D within total expenditure', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D', value: '£620,000' },
              sourceB: { label: 'Total', value: '£4,200,000' },
              match: true,
            },
            reasoning: '14.8% — well within bounds.',
          },
        ],
      },
      {
        id: 'rev2-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass',
        summary: 'All expenditure categories within expected bounds.',
        confidence: 0.90,
        legislationRefIds: ['cird82000'],
        basis: 'HMRC maintains internal benchmark ratios by sector per CIRD82000. Claims with expenditure categories significantly outside these ranges attract enhanced scrutiny.',
        subChecks: [
          {
            id: 'rev2-9-a', assertion: 'Breakdown provided', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-staff-costs', extractedValue: '£341,000 (55%)', page: 2 },
            reasoning: 'Staff 55%, Subs 30%, Consumables 12%, Software 3%.',
          },
          {
            id: 'rev2-9-b', assertion: 'Within sector benchmarks', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Ratios', value: 'Staff 55% / Subs 30% / Consumables 12%' },
              sourceB: { label: 'Manufacturing Benchmarks', value: 'Staff 45-65% / Subs 20-35% / Consumables 8-18%' },
              match: true,
            },
            reasoning: 'All within expected ranges for manufacturing R&D.',
          },
        ],
      },
      {
        id: 'rev2-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass',
        summary: 'No state aid or grant funding identified.',
        confidence: 0.92,
        legislationRefIds: ['cta2009-s1112g'],
        basis: 'CTA 2009 s1112G prohibits subsidised expenditure from being included in an SME R&D claim. Any grants or notified state aid must be disclosed and may require the claim to use the RDEC scheme instead.',
        subChecks: [
          {
            id: 'rev2-10-a', assertion: 'No grants disclosed in report', result: 'pass',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'No grant funding received for R&D activities', extractedText: null, found: false },
            reasoning: 'No grant disclosure in report.',
          },
          {
            id: 'rev2-10-b', assertion: 'No Innovate UK awards found', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Innovate UK',
              sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
              records: { 'Company': 'Arcline Robotics Ltd', 'Awards': 'None found' },
            },
            reasoning: 'No grant funding identified.',
          },
        ],
      },
    ],
  },

  // ── Review 3: Ferro Dynamics ──
  {
    id: 'rev-3',
    checkerId: 'checker-rnd-tax',
    fileName: 'R&D_Report_FY2025_Draft.pdf',
    fileType: 'pdf',
    entityId: 'ent-3',
    submittedBy: 'Sophie Clark',
    submittedAt: '2026-03-12T16:45:00Z',
    reviewedAt: '2026-03-12T16:48:00Z',
    routing: 'back-to-junior',
    routingReason: 'Critical issue: company may no longer qualify as SME due to recent acquisition by Vantage Holdings. Two additional warnings require attention.',
    checks: [
      {
        id: 'rev3-1', category: 'company', name: 'Company name present & CH match', result: 'pass',
        summary: 'Company name "Ferro Dynamics Ltd" matches Companies House record.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires the claimant to be an identifiable, registered company. The company name must appear in the report and match the Companies House register exactly to ensure the claim is attributed to the correct legal entity.',
        subChecks: [
          {
            id: 'rev3-1-a', assertion: 'Company name is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-name', extractedValue: 'Ferro Dynamics Ltd', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev3-1-b', assertion: 'Name matches CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641',
              records: { 'Company': 'Ferro Dynamics Ltd', 'Status': 'Active' },
            },
            reasoning: 'Exact match.',
          },
          {
            id: 'rev3-1-c', assertion: 'Report name matches CH name', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report', value: 'Ferro Dynamics Ltd' },
              sourceB: { label: 'Companies House', value: 'Ferro Dynamics Ltd' },
              match: true,
            },
            reasoning: 'Exact string match.',
          },
        ],
      },
      {
        id: 'rev3-2', category: 'company', name: 'Company number present & valid', result: 'pass',
        summary: 'Company number 09273641 is valid and active.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'HMRC uses the company number as the primary identifier for corporation tax purposes. An incorrect or invalid number will cause the claim to be rejected at submission.',
        subChecks: [
          {
            id: 'rev3-2-a', assertion: 'Company number is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-number', extractedValue: '09273641', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev3-2-b', assertion: 'Number is valid on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641',
              records: { 'Company': 'Ferro Dynamics Ltd', 'Status': 'Active' },
            },
            reasoning: 'Valid and active.',
          },
          {
            id: 'rev3-2-c', assertion: 'Number matches company name on CH', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report Number', value: '09273641' },
              sourceB: { label: 'CH Number for Ferro Dynamics Ltd', value: '09273641' },
              match: true,
            },
            reasoning: 'Company number and name are correctly paired.',
          },
        ],
      },
      {
        id: 'rev3-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass',
        summary: 'SIC 25620 (Machining) is plausible for R&D in precision engineering.',
        confidence: 0.84,
        legislationRefIds: ['cird81400'],
        basis: 'HMRC uses SIC codes to risk-assess R&D claims. Companies in low-probability sectors face higher scrutiny, so the SIC code must be present and consistent with the nature of the R&D described.',
        subChecks: [
          {
            id: 'rev3-3-a', assertion: 'SIC code is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-sic', extractedValue: '25620 — Machining', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev3-3-b', assertion: 'SIC indicates R&D plausibility', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'SIC', value: '25620' },
              sourceB: { label: 'R&D Category', value: 'Low-moderate — project descriptions confirm qualifying activity' },
              match: true,
            },
            reasoning: 'While machining alone may not suggest R&D, the project descriptions confirm technological advance.',
          },
        ],
      },
      {
        id: 'rev3-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass',
        summary: 'Period 1 Jul 2024 – 30 Jun 2025. Valid 12-month period.',
        confidence: 0.99,
        legislationRefIds: ['fa1998-sch18-para3'],
        basis: 'FA 1998 Sch 18 para 3 requires that no accounting period exceeds 12 months. R&D relief must be claimed per accounting period, so dates must be present and logically valid.',
        subChecks: [
          {
            id: 'rev3-4-a', assertion: 'Period dates are present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-accounting-period', extractedValue: '1 July 2024 to 30 June 2025', page: 1 },
            reasoning: 'Dates on page 1.',
          },
          {
            id: 'rev3-4-b', assertion: 'Period within 12 months', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Length', value: '365 days' },
              sourceB: { label: 'Maximum', value: '366 days' },
              match: true,
            },
            reasoning: 'Standard period.',
          },
        ],
      },
      {
        id: 'rev3-5', category: 'company', name: 'Going concern & CH status', result: 'critical',
        summary: 'Recent acquisition by Vantage Holdings plc may change SME status — report still claims under SME scheme.',
        confidence: 0.91,
        legislationRefIds: ['cta2009-s1052', 'cird191000'],
        basis: 'CTA 2009 s1044 requires the company to be a going concern — not in administration or liquidation — at the end of the accounting period. A struck-off company cannot claim.',
        suggestedFix: 'Verify group headcount and financials post-acquisition. If SME thresholds are exceeded, rewrite claim under the merged R&D scheme.',
        subChecks: [
          {
            id: 'rev3-5-a', assertion: 'Company is active on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641',
              records: { 'Status': 'Active', 'Last Accounts': 'June 2025' },
            },
            reasoning: 'Company itself is active.',
          },
          {
            id: 'rev3-5-b', assertion: 'No recent ownership changes affecting SME status', result: 'critical',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House PSC Register',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641/persons-with-significant-control',
              records: { 'PSC Filing': '28 February 2026', 'New Controller': 'Vantage Holdings plc', 'Ownership': '50-75%', 'Vantage Employees': '800+', 'Vantage Turnover': '>€50m' },
            },
            reasoning: 'Vantage Holdings exceeds SME thresholds. If Ferro Dynamics is now part of this group, it cannot claim under the SME scheme. This is a fundamental eligibility question.',
          },
        ],
      },
      {
        id: 'rev3-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass',
        summary: 'Company is actively trading.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'R&D relief is only available to companies carrying on a trade during the accounting period. A dormant company by definition is not trading and cannot claim.',
        subChecks: [
          {
            id: 'rev3-6-a', assertion: 'Non-zero turnover', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641/filing-history',
              records: { 'Turnover': '£6,200,000', 'Employees': '85' },
            },
            reasoning: 'Active trading confirmed.',
          },
        ],
      },
      {
        id: 'rev3-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'warning',
        summary: 'One project may overlap with parent company R&D — risk of double-claiming.',
        confidence: 0.68,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires R&D activities to be relevant to the company\'s own trade. The R&D must be undertaken for the purposes of the trade the company carries on.',
        suggestedFix: 'Obtain written confirmation from Vantage Holdings that they are not claiming R&D relief for the same project.',
        subChecks: [
          {
            id: 'rev3-7-a', assertion: 'Project 1 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Development of novel 5-axis CNC toolpath algorithms...', page: 1 },
            reasoning: 'Core machining R&D, directly within trade.',
          },
          {
            id: 'rev3-7-b', assertion: 'Project 2 is not double-claimed', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'Advanced surface coating for turbine blades using plasma-enhanced chemical vapour deposition...', page: 1 },
            reasoning: 'This project overlaps with Vantage Holdings\' published R&D programme. Post-acquisition, there is a risk of double-claiming.',
          },
          {
            id: 'rev3-7-c', assertion: 'Project 3 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'In-process metrology system...', page: 1 },
            reasoning: 'Metrology directly relates to precision machining trade.',
          },
        ],
      },
      {
        id: 'rev3-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass',
        summary: 'R&D expenditure (£420K) is within total expenditure (£5.8m).',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1052'],
        basis: 'CTA 2009 s1052 states that qualifying R&D expenditure must not exceed the company\'s total relevant expenditure for the period. This is a basic reasonableness check.',
        subChecks: [
          {
            id: 'rev3-8-a', assertion: 'R&D figure present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: '£420,000', page: 2 },
            reasoning: 'Found on page 2.',
          },
          {
            id: 'rev3-8-b', assertion: 'Total company expenditure from accounts', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641/filing-history',
              records: { 'Total Operating Expenditure': '£5,800,000', 'Period': 'Year ended 30 June 2025' },
            },
            reasoning: 'Accounts show total operating expenditure of £5.8m.',
          },
          {
            id: 'rev3-8-c', assertion: 'Within total', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D', value: '£420,000' },
              sourceB: { label: 'Total', value: '£5,800,000' },
              match: true,
            },
            reasoning: '7.2% — conservative and credible.',
          },
        ],
      },
      {
        id: 'rev3-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'warning',
        summary: 'Consumables claim at 28% is unusually high for this sector.',
        confidence: 0.82,
        legislationRefIds: ['cird82000'],
        basis: 'HMRC maintains internal benchmark ratios by sector per CIRD82000. Claims with expenditure categories significantly outside these ranges attract enhanced scrutiny.',
        suggestedFix: 'Provide detailed consumables breakdown showing specific materials used in R&D. If some costs are misclassified, move to correct category.',
        subChecks: [
          {
            id: 'rev3-9-a', assertion: 'Breakdown provided', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-consumables', extractedValue: '£117,600 (28%)', page: 2 },
            reasoning: 'Consumables at 28%.',
          },
          {
            id: 'rev3-9-b', assertion: 'Consumables ratio within sector norms', result: 'warning',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Consumables %', value: '28%' },
              sourceB: { label: 'Precision Engineering Benchmark', value: '8-15%' },
              match: false,
              discrepancy: 'Consumables at 28% is nearly double the upper bound for precision engineering. HMRC will likely query this.',
            },
            reasoning: 'May be justified by specialist alloys and prototype materials, but needs supporting evidence.',
          },
        ],
      },
      {
        id: 'rev3-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass',
        summary: 'No public grants or subsidies identified.',
        confidence: 0.90,
        legislationRefIds: ['cta2009-s1112g'],
        basis: 'CTA 2009 s1112G prohibits subsidised expenditure from being included in an SME R&D claim. Any grants or notified state aid must be disclosed and may require the claim to use the RDEC scheme instead.',
        subChecks: [
          {
            id: 'rev3-10-a', assertion: 'No grants disclosed in report', result: 'pass',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'No grant funding received for R&D activities', extractedText: null, found: false },
            reasoning: 'No grant disclosure.',
          },
          {
            id: 'rev3-10-b', assertion: 'No Innovate UK awards found', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Innovate UK',
              sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
              records: { 'Company': 'Ferro Dynamics Ltd', 'Awards': 'None found' },
            },
            reasoning: 'Clean check.',
          },
        ],
      },
    ],
  },

  // ── Review 4: Meridian Software ──
  {
    id: 'rev-4',
    checkerId: 'checker-rnd-tax',
    fileName: 'R&D_Tax_Report_FY2025.pdf',
    fileType: 'pdf',
    entityId: 'ent-4',
    submittedBy: 'Tom Andrews',
    submittedAt: '2026-03-12T11:20:00Z',
    reviewedAt: '2026-03-12T11:22:00Z',
    routing: 'direct-to-partner',
    routingReason: 'All checks passed. Clean report ready for reviewer sign-off.',
    checks: [
      {
        id: 'rev4-1', category: 'company', name: 'Company name present & CH match', result: 'pass',
        summary: 'Company name "Meridian Software Ltd" matches Companies House record.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires the claimant to be an identifiable, registered company. The company name must appear in the report and match the Companies House register exactly to ensure the claim is attributed to the correct legal entity.',
        subChecks: [
          {
            id: 'rev4-1-a', assertion: 'Name is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-name', extractedValue: 'Meridian Software Ltd', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev4-1-b', assertion: 'Matches CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726',
              records: { 'Company': 'Meridian Software Ltd', 'Status': 'Active' },
            },
            reasoning: 'Exact match.',
          },
          {
            id: 'rev4-1-c', assertion: 'Report name matches CH name', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report', value: 'Meridian Software Ltd' },
              sourceB: { label: 'Companies House', value: 'Meridian Software Ltd' },
              match: true,
            },
            reasoning: 'Exact string match.',
          },
        ],
      },
      {
        id: 'rev4-2', category: 'company', name: 'Company number present & valid', result: 'pass',
        summary: 'Company number 11384726 is valid and active.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'HMRC uses the company number as the primary identifier for corporation tax purposes. An incorrect or invalid number will cause the claim to be rejected at submission.',
        subChecks: [
          {
            id: 'rev4-2-a', assertion: 'Number is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-number', extractedValue: '11384726', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev4-2-b', assertion: 'Valid on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726',
              records: { 'Company': 'Meridian Software Ltd', 'Status': 'Active' },
            },
            reasoning: 'Valid.',
          },
          {
            id: 'rev4-2-c', assertion: 'Number matches company name on CH', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report Number', value: '11384726' },
              sourceB: { label: 'CH Number for Meridian Software Ltd', value: '11384726' },
              match: true,
            },
            reasoning: 'Company number and name are correctly paired.',
          },
        ],
      },
      {
        id: 'rev4-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass',
        summary: 'SIC 62012 (Business and domestic software development) is highly plausible for R&D.',
        confidence: 0.96,
        legislationRefIds: ['cird81400'],
        basis: 'HMRC uses SIC codes to risk-assess R&D claims. Companies in low-probability sectors face higher scrutiny, so the SIC code must be present and consistent with the nature of the R&D described.',
        subChecks: [
          {
            id: 'rev4-3-a', assertion: 'SIC is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-sic', extractedValue: '62012 — Business and domestic software development', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev4-3-b', assertion: 'SIC is plausible', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'SIC', value: '62012' },
              sourceB: { label: 'R&D Category', value: 'Moderate-high probability' },
              match: true,
            },
            reasoning: 'Software is one of the most common R&D claim sectors.',
          },
        ],
      },
      {
        id: 'rev4-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass',
        summary: 'Period 1 Apr 2024 – 31 Mar 2025. Standard 12-month period.',
        confidence: 0.99,
        legislationRefIds: ['fa1998-sch18-para3'],
        basis: 'FA 1998 Sch 18 para 3 requires that no accounting period exceeds 12 months. R&D relief must be claimed per accounting period, so dates must be present and logically valid.',
        subChecks: [
          {
            id: 'rev4-4-a', assertion: 'Period dates present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-accounting-period', extractedValue: '1 April 2024 to 31 March 2025', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev4-4-b', assertion: 'Within 12 months', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Length', value: '365 days' },
              sourceB: { label: 'Max', value: '366 days' },
              match: true,
            },
            reasoning: 'Standard period.',
          },
        ],
      },
      {
        id: 'rev4-5', category: 'company', name: 'Going concern & CH status', result: 'pass',
        summary: 'Company is active, no adverse filings.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'CTA 2009 s1044 requires the company to be a going concern — not in administration or liquidation — at the end of the accounting period. A struck-off company cannot claim.',
        subChecks: [
          {
            id: 'rev4-5-a', assertion: 'Active on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726',
              records: { 'Status': 'Active', 'No insolvency events': 'Confirmed' },
            },
            reasoning: 'Clean status.',
          },
        ],
      },
      {
        id: 'rev4-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass',
        summary: 'Company is actively trading with £1.8m turnover.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'R&D relief is only available to companies carrying on a trade during the accounting period. A dormant company by definition is not trading and cannot claim.',
        subChecks: [
          {
            id: 'rev4-6-a', assertion: 'Non-zero turnover', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726/filing-history',
              records: { 'Turnover': '£1,800,000', 'Employees': '24', 'Growth': '15% YoY' },
            },
            reasoning: 'Active and growing.',
          },
        ],
      },
      {
        id: 'rev4-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass',
        summary: 'All R&D projects are core software development activities within the company\'s trade.',
        confidence: 0.94,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires R&D activities to be relevant to the company\'s own trade. The R&D must be undertaken for the purposes of the trade the company carries on.',
        subChecks: [
          {
            id: 'rev4-7-a', assertion: 'Project 1 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'ML-based anomaly detection engine...', page: 1 },
            reasoning: 'Core software R&D.',
          },
          {
            id: 'rev4-7-b', assertion: 'Project 2 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'Real-time data pipeline optimisation...', page: 1 },
            reasoning: 'Core software R&D.',
          },
          {
            id: 'rev4-7-c', assertion: 'Project 3 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'Natural language query engine...', page: 1 },
            reasoning: 'Core software R&D.',
          },
        ],
      },
      {
        id: 'rev4-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass',
        summary: 'R&D expenditure (£340K) is within total expenditure (£1.6m).',
        confidence: 0.96,
        legislationRefIds: ['cta2009-s1052'],
        basis: 'CTA 2009 s1052 states that qualifying R&D expenditure must not exceed the company\'s total relevant expenditure for the period. This is a basic reasonableness check.',
        subChecks: [
          {
            id: 'rev4-8-a', assertion: 'R&D figure present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: '£340,000', page: 2 },
            reasoning: 'Found on page 2.',
          },
          {
            id: 'rev4-8-b', assertion: 'Total company expenditure from accounts', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726/filing-history',
              records: { 'Total Operating Expenditure': '£1,600,000', 'Period': 'Year ended 31 March 2025' },
            },
            reasoning: 'Accounts show total operating expenditure of £1.6m.',
          },
          {
            id: 'rev4-8-c', assertion: 'Within total', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D', value: '£340,000' },
              sourceB: { label: 'Total', value: '£1,600,000' },
              match: true,
            },
            reasoning: '21.3% — higher ratio typical for software.',
          },
        ],
      },
      {
        id: 'rev4-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass',
        summary: 'Staff-heavy cost profile is typical for software R&D.',
        confidence: 0.95,
        legislationRefIds: ['cird82000'],
        basis: 'HMRC maintains internal benchmark ratios by sector per CIRD82000. Claims with expenditure categories significantly outside these ranges attract enhanced scrutiny.',
        subChecks: [
          {
            id: 'rev4-9-a', assertion: 'Breakdown provided', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-staff-costs', extractedValue: '£289,000 (85%)', page: 2 },
            reasoning: 'Staff 85%, Subs 8%, Software 7%.',
          },
          {
            id: 'rev4-9-b', assertion: 'Within benchmarks', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Ratios', value: 'Staff 85% / Subs 8% / Software 7%' },
              sourceB: { label: 'Software Benchmarks', value: 'Staff 75-90% / Subs 5-15% / Software 5-10%' },
              match: true,
            },
            reasoning: 'Textbook software R&D profile.',
          },
        ],
      },
      {
        id: 'rev4-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass',
        summary: 'No grants or subsidies found.',
        confidence: 0.94,
        legislationRefIds: ['cta2009-s1112g'],
        basis: 'CTA 2009 s1112G prohibits subsidised expenditure from being included in an SME R&D claim. Any grants or notified state aid must be disclosed and may require the claim to use the RDEC scheme instead.',
        subChecks: [
          {
            id: 'rev4-10-a', assertion: 'No grants disclosed in report', result: 'pass',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'No grant funding received for R&D activities', extractedText: null, found: false },
            reasoning: 'No grant disclosure.',
          },
          {
            id: 'rev4-10-b', assertion: 'No Innovate UK awards found', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Innovate UK',
              sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
              records: { 'Company': 'Meridian Software Ltd', 'Awards': 'None' },
            },
            reasoning: 'Clean check.',
          },
        ],
      },
    ],
  },

  // ── Review 5: Helix BioSciences ──
  {
    id: 'rev-5',
    checkerId: 'checker-rnd-tax',
    fileName: 'R&D_Claim_FY2025_Helix.pdf',
    fileType: 'pdf',
    entityId: 'ent-5',
    submittedBy: 'Sophie Clark',
    submittedAt: '2026-03-13T11:00:00Z',
    reviewedAt: '2026-03-13T11:02:00Z',
    routing: 'direct-to-partner',
    routingReason: 'One minor warning about subcontractor cost ratio. Otherwise clean — ready for reviewer review.',
    checks: [
      {
        id: 'rev5-1', category: 'company', name: 'Company name present & CH match', result: 'pass',
        summary: 'Company name "Helix BioSciences Ltd" matches Companies House record.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires the claimant to be an identifiable, registered company. The company name must appear in the report and match the Companies House register exactly to ensure the claim is attributed to the correct legal entity.',
        subChecks: [
          {
            id: 'rev5-1-a', assertion: 'Name is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-name', extractedValue: 'Helix BioSciences Ltd', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev5-1-b', assertion: 'Matches CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839',
              records: { 'Company': 'Helix BioSciences Ltd', 'Status': 'Active' },
            },
            reasoning: 'Exact match.',
          },
          {
            id: 'rev5-1-c', assertion: 'Report name matches CH name', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report', value: 'Helix BioSciences Ltd' },
              sourceB: { label: 'Companies House', value: 'Helix BioSciences Ltd' },
              match: true,
            },
            reasoning: 'Exact string match.',
          },
        ],
      },
      {
        id: 'rev5-2', category: 'company', name: 'Company number present & valid', result: 'pass',
        summary: 'Company number 10572839 is valid and active.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'HMRC uses the company number as the primary identifier for corporation tax purposes. An incorrect or invalid number will cause the claim to be rejected at submission.',
        subChecks: [
          {
            id: 'rev5-2-a', assertion: 'Number is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-company-number', extractedValue: '10572839', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev5-2-b', assertion: 'Valid on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839',
              records: { 'Company': 'Helix BioSciences Ltd', 'Status': 'Active' },
            },
            reasoning: 'Valid.',
          },
          {
            id: 'rev5-2-c', assertion: 'Number matches company name on CH', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Report Number', value: '10572839' },
              sourceB: { label: 'CH Number for Helix BioSciences Ltd', value: '10572839' },
              match: true,
            },
            reasoning: 'Company number and name are correctly paired.',
          },
        ],
      },
      {
        id: 'rev5-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass',
        summary: 'SIC 72190 (Other R&D on natural sciences) is strongly indicative of R&D activity.',
        confidence: 0.98,
        legislationRefIds: ['cird81400'],
        basis: 'HMRC uses SIC codes to risk-assess R&D claims. Companies in low-probability sectors face higher scrutiny, so the SIC code must be present and consistent with the nature of the R&D described.',
        subChecks: [
          {
            id: 'rev5-3-a', assertion: 'SIC is present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-sic', extractedValue: '72190 — Other R&D on natural sciences and engineering', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev5-3-b', assertion: 'SIC is plausible', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'SIC', value: '72190' },
              sourceB: { label: 'R&D Category', value: 'High probability (72xxx)' },
              match: true,
            },
            reasoning: 'SIC code is in the R&D classification itself.',
          },
        ],
      },
      {
        id: 'rev5-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass',
        summary: 'Period 1 Jan 2025 – 31 Dec 2025. Valid 12-month period.',
        confidence: 0.99,
        legislationRefIds: ['fa1998-sch18-para3'],
        basis: 'FA 1998 Sch 18 para 3 requires that no accounting period exceeds 12 months. R&D relief must be claimed per accounting period, so dates must be present and logically valid.',
        subChecks: [
          {
            id: 'rev5-4-a', assertion: 'Period dates present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-accounting-period', extractedValue: '1 January 2025 to 31 December 2025', page: 1 },
            reasoning: 'Found on page 1.',
          },
          {
            id: 'rev5-4-b', assertion: 'Within 12 months', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Length', value: '365 days' },
              sourceB: { label: 'Max', value: '366 days' },
              match: true,
            },
            reasoning: 'Standard calendar year.',
          },
        ],
      },
      {
        id: 'rev5-5', category: 'company', name: 'Going concern & CH status', result: 'pass',
        summary: 'Company is active on Companies House.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'CTA 2009 s1044 requires the company to be a going concern — not in administration or liquidation — at the end of the accounting period. A struck-off company cannot claim.',
        subChecks: [
          {
            id: 'rev5-5-a', assertion: 'Active on CH', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839',
              records: { 'Status': 'Active', 'No adverse filings': 'Confirmed' },
            },
            reasoning: 'Clean status.',
          },
        ],
      },
      {
        id: 'rev5-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass',
        summary: 'Company is actively trading with £3.2m turnover.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1042'],
        basis: 'R&D relief is only available to companies carrying on a trade during the accounting period. A dormant company by definition is not trading and cannot claim.',
        subChecks: [
          {
            id: 'rev5-6-a', assertion: 'Non-zero turnover', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839/filing-history',
              records: { 'Turnover': '£3,200,000', 'Employees': '38' },
            },
            reasoning: 'Active trading confirmed.',
          },
        ],
      },
      {
        id: 'rev5-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass',
        summary: 'All R&D projects are clinical research activities directly within the company\'s trade.',
        confidence: 0.96,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'CTA 2009 s1044 requires R&D activities to be relevant to the company\'s own trade. The R&D must be undertaken for the purposes of the trade the company carries on.',
        subChecks: [
          {
            id: 'rev5-7-a', assertion: 'Project 1 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Novel biomarker assay development...', page: 1 },
            reasoning: 'Core clinical research.',
          },
          {
            id: 'rev5-7-b', assertion: 'Project 2 relates to trade', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'Phase II clinical trial protocol optimisation...', page: 1 },
            reasoning: 'Core clinical research.',
          },
        ],
      },
      {
        id: 'rev5-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass',
        summary: 'R&D expenditure (£580K) is within total expenditure (£2.9m).',
        confidence: 0.97,
        legislationRefIds: ['cta2009-s1052'],
        basis: 'CTA 2009 s1052 states that qualifying R&D expenditure must not exceed the company\'s total relevant expenditure for the period. This is a basic reasonableness check.',
        subChecks: [
          {
            id: 'rev5-8-a', assertion: 'R&D figure present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: '£580,000', page: 2 },
            reasoning: 'Found on page 2.',
          },
          {
            id: 'rev5-8-b', assertion: 'Total company expenditure from accounts', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839/filing-history',
              records: { 'Total Operating Expenditure': '£2,900,000', 'Period': 'Year ended 31 December 2025' },
            },
            reasoning: 'Accounts show total operating expenditure of £2.9m.',
          },
          {
            id: 'rev5-8-c', assertion: 'Within total', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D', value: '£580,000' },
              sourceB: { label: 'Total', value: '£2,900,000' },
              match: true,
            },
            reasoning: '20% — typical for biotech.',
          },
        ],
      },
      {
        id: 'rev5-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'warning',
        summary: 'Subcontractor costs at 45% are above the 65% cap for connected parties — verify independence.',
        confidence: 0.78,
        legislationRefIds: ['cird82000'],
        basis: 'HMRC maintains internal benchmark ratios by sector per CIRD82000. Claims with expenditure categories significantly outside these ranges attract enhanced scrutiny.',
        suggestedFix: 'Confirm ClinRes Partners Ltd and BioAssay Solutions are unconnected parties. If connected, adjust qualifying expenditure to 65% of subcontractor payments.',
        subChecks: [
          {
            id: 'rev5-9-a', assertion: 'Breakdown provided', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-subcontractors', extractedValue: '£261,000 (45%)', page: 2 },
            reasoning: 'Subcontractors at 45%.',
          },
          {
            id: 'rev5-9-b', assertion: 'Subcontractor ratio within norms', result: 'warning',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Subcontractor %', value: '45%' },
              sourceB: { label: 'Biotech Benchmark', value: '20-35%' },
              match: false,
              discrepancy: 'Subcontractor costs are high. If ClinRes Partners Ltd or BioAssay Solutions are connected parties, the qualifying amount drops to 65% of payment.',
            },
            reasoning: 'Need to verify independence of subcontractors to determine correct qualifying amount.',
          },
        ],
      },
      {
        id: 'rev5-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass',
        summary: 'No grants or subsidies identified.',
        confidence: 0.91,
        legislationRefIds: ['cta2009-s1112g'],
        basis: 'CTA 2009 s1112G prohibits subsidised expenditure from being included in an SME R&D claim. Any grants or notified state aid must be disclosed and may require the claim to use the RDEC scheme instead.',
        subChecks: [
          {
            id: 'rev5-10-a', assertion: 'No grants disclosed in report', result: 'pass',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'No grant funding received for R&D activities', extractedText: null, found: false },
            reasoning: 'No grant disclosure.',
          },
          {
            id: 'rev5-10-b', assertion: 'No Innovate UK awards found', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Innovate UK / UKRI',
              sourceUrl: 'https://www.ukri.org/councils/innovate-uk/',
              records: { 'Company': 'Helix BioSciences Ltd', 'Awards': 'None found' },
            },
            reasoning: 'Clean check.',
          },
        ],
      },
    ],
  },
]
