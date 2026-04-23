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
  { id: 'technical', label: 'Technical Narrative' },
  { id: 'cross-doc', label: 'Cross-Reference & Reconciliation' },
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
  { id: 'chk-scheme-eligibility', category: 'financials', name: 'Accounting period scheme eligibility', description: 'Verifies the scheme claimed (SME, RDEC, merged, ERIS) was available for the accounting period.' },
  { id: 'chk-expenditure-eligible', category: 'financials', name: 'Expenditure categories eligible for AP', description: 'Checks claimed expenditure categories are allowable under the scheme for the accounting period.' },
  { id: 'chk-sme-status', category: 'financials', name: 'SME status (headcount, turnover, assets)', description: 'Confirms the claimant qualifies as an SME at group level for the scheme(s) being claimed.' },
  { id: 'chk-loss-making', category: 'financials', name: 'Loss-making status (ERIS)', description: 'Assesses whether the claimant is loss-making for CT purposes — an ERIS requirement.' },
  { id: 'chk-technical-narrative', category: 'technical', name: 'Technical narrative present & complete', description: 'Checks the report contains sufficient technical narratives covering all projects, with all AIF sections.' },
  { id: 'chk-tech-baseline', category: 'technical', name: 'Scientific or technological baseline stated', description: 'For each project, confirms the scientific/technological baseline is specifically and clearly described.' },
  { id: 'chk-commercial-framing', category: 'technical', name: 'Commercial development framed as R&D', description: 'Flags projects described in commercial/product terms rather than technological advance and uncertainty.' },
  { id: 'chk-output-vs-tech', category: 'technical', name: 'Output vs underlying technology focus', description: 'Checks the narrative focuses on changes to underlying technology rather than end-user output or functionality.' },
  { id: 'chk-rd-separation', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', description: 'Checks the report demonstrates non-qualifying activities were identified and excluded from the claim.' },
  // Cross-document reconciliation checks (each sub-check targets a different document tab)
  { id: 'chk-totals-tie-out', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', description: 'Totals in the R&D report agree with the tax computation and with the working papers workbook summary.' },
  { id: 'chk-utr-ct600-match', category: 'cross-doc', name: 'UTR on R&D report matches CT600', description: 'Unique Tax Reference printed on the R&D report matches box 3 of the CT600 return.' },
  { id: 'chk-ap-cross-ref', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', description: 'Accounting period start and end dates are consistent across all three submission documents.' },
  { id: 'chk-loss-reconcile', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', description: 'Trading loss position before the R&D claim is the same on the CT600 and on the tax computation.' },
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
    routingReason: 'Two critical issues found: company number mismatch and R&D expenditure exceeds total company expenditure. Plus a reconciling difference between working papers and the R&D report total. Must be corrected before reviewer review.',
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
      {
        id: 'rev1-11', category: 'financials', name: 'Accounting period scheme eligibility', result: 'pass',
        summary: 'Merged scheme is available for the accounting period 1 Apr 2024 – 31 Mar 2025.',
        confidence: 0.99,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Finance Act 2024 introduced the merged R&D expenditure credit scheme for accounting periods beginning on or after 1 April 2024. Claims under the old SME or RDEC schemes are only valid for earlier periods.',
        subChecks: [
          {
            id: 'rev1-11-a', assertion: 'Scheme claimed is stated in the report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: 'Merged R&D Expenditure Credit Scheme', page: 2 },
            reasoning: 'Report states the claim is made under the merged scheme.',
          },
          {
            id: 'rev1-11-b', assertion: 'AP dates overlap with scheme operative window', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'AP Start', value: '1 April 2024' },
              sourceB: { label: 'Merged scheme operative from', value: '1 April 2024' },
              match: true,
            },
            reasoning: 'AP begins on exactly the first day the merged scheme is operative. No straddle adjustment needed.',
          },
        ],
      },
      {
        id: 'rev1-12', category: 'financials', name: 'Expenditure categories eligible for AP', result: 'pass',
        summary: 'All claimed categories (staff, subcontractors, consumables) are allowable under the merged scheme.',
        confidence: 0.97,
        legislationRefIds: ['cta2009-s1052', 'cird82000'],
        basis: 'The merged scheme retains the same qualifying cost categories as the legacy schemes. Each category must be allowable for the specific accounting period claimed.',
        subChecks: [
          {
            id: 'rev1-12-a', assertion: 'All claimed categories appear on the merged-scheme allow-list', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Claim categories', value: 'Staff, Subcontractors, Consumables' },
              sourceB: { label: 'Merged scheme allowable categories', value: 'Staff, EPWs, Subcontractors, Consumables, Software, Cloud, Data licences' },
              match: true,
            },
            reasoning: 'No disallowed categories. No capital items claimed.',
          },
        ],
      },
      {
        id: 'rev1-13', category: 'financials', name: 'SME status (headcount, turnover, assets)', result: 'pass',
        summary: 'Nexagen Ltd qualifies as an SME: 32 employees, £2.1m turnover, no group relationships.',
        confidence: 0.94,
        legislationRefIds: ['cird191000', 'sme-definition-eu'],
        basis: 'The SME test (Rec 2003/361/EC retained in UK law, doubled for R&D) requires: fewer than 500 employees AND either turnover ≤ €100m OR balance sheet ≤ €86m. Applied at group level.',
        subChecks: [
          {
            id: 'rev1-13-a', assertion: 'Headcount below threshold', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts (FY2025)',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/filing-history',
              records: { 'Average employees': '32', 'Threshold': '<500' },
            },
            reasoning: '32 employees — well within the 500 ceiling.',
          },
          {
            id: 'rev1-13-b', assertion: 'Turnover and balance sheet below threshold', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts (FY2025)',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/filing-history',
              records: { 'Turnover': '£2.1m (≈ €2.5m)', 'Gross assets': '£3.4m (≈ €4.0m)', 'Turnover threshold': '€100m', 'Assets threshold': '€86m' },
            },
            reasoning: 'Turnover and gross assets both well below the SME thresholds.',
          },
          {
            id: 'rev1-13-c', assertion: 'No group relationships that aggregate', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House PSC register',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/persons-with-significant-control',
              records: { 'Individual PSCs': '2', 'Corporate PSCs with ≥25%': 'None', 'Linked enterprises': 'None' },
            },
            reasoning: 'Only natural-person PSCs. No corporate control at 25%+. No linked/partner enterprises to aggregate.',
          },
        ],
      },
      {
        id: 'rev1-14', category: 'financials', name: 'Loss-making status (ERIS)', result: 'pass',
        summary: 'Not applicable — Nexagen is profitable and claiming under the merged scheme, not ERIS.',
        confidence: 0.98,
        legislationRefIds: ['fa2024-eris'],
        basis: 'ERIS is an SME-only, loss-making-only relief. A check is only material if ERIS is being claimed. Where the merged scheme is claimed, this check is informational.',
        subChecks: [
          {
            id: 'rev1-14-a', assertion: 'ERIS not claimed', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: 'Merged R&D Expenditure Credit Scheme (not ERIS)', page: 2 },
            reasoning: 'Report claims under the merged scheme. ERIS conditions not tested.',
          },
          {
            id: 'rev1-14-b', assertion: 'Company is profit-making for CT purposes', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts (FY2025)',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/08451923/filing-history',
              records: { 'Profit before tax': '£312,000', 'Status': 'Profitable' },
            },
            reasoning: 'Profitable in any case — ERIS would not be available even if claimed.',
          },
        ],
      },
      {
        id: 'rev1-15', category: 'technical', name: 'Technical narrative present & complete', result: 'pass',
        summary: 'All 3 projects have technical narratives covering the required AIF sections.',
        confidence: 0.93,
        legislationRefIds: ['cird182000', 'dsit-guidelines'],
        basis: 'CIRD182000 requires technical narratives for all projects where 1-3 projects are claimed. Each narrative must cover baseline, advance, uncertainties, work undertaken, and competent-professional view.',
        subChecks: [
          {
            id: 'rev1-15-a', assertion: 'Sufficient number of narratives for the project count', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'Projects claimed', value: '3' },
              sourceB: { label: 'AIF requirement (1-3 projects)', value: 'Narratives for all' },
              match: true,
            },
            reasoning: '3 projects, 3 narratives. Meets the AIF requirement.',
          },
          {
            id: 'rev1-15-b', assertion: 'Each narrative contains all 5 required sections', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Baseline; Advance; Uncertainty; Work; Competent professional — all present', page: 1 },
            reasoning: 'Sections confirmed on all three projects via heading extraction.',
          },
        ],
      },
      {
        id: 'rev1-16', category: 'technical', name: 'Scientific or technological baseline stated', result: 'warning',
        summary: 'Project 3 (AI Literature Review) lacks a specific technological baseline.',
        confidence: 0.78,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT Guidelines paragraph 22 requires the baseline to be specific — stating the approaches, technologies, or methods that existed at the start. Vague statements are insufficient.',
        suggestedFix: 'Strengthen the Project 3 baseline with named existing tools (e.g. semantic-scholar API, SciSpacy NER, OpenAI o-series) and the specific limitation being exceeded.',
        subChecks: [
          {
            id: 'rev1-16-a', assertion: 'Project 1 baseline is specific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: '"Existing lipid nanoparticle formulations (LNP-401, Onpattro-derivative) achieve <20% hepatocyte transfection; endosomal escape barriers…"', page: 1 },
            reasoning: 'Baseline names specific lipid formulations and the measurable limitation (<20% transfection).',
          },
          {
            id: 'rev1-16-b', assertion: 'Project 2 baseline is specific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: '"Published STAT3 inhibitor assays (Napabucasin HTS, TTI-101 screens) lose sensitivity below 500 nM; Z-factor degrades…"', page: 1 },
            reasoning: 'Baseline names published assays and the specific sensitivity floor.',
          },
          {
            id: 'rev1-16-c', assertion: 'Project 3 baseline is specific', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: '"Existing manual literature review processes are time-consuming and error-prone."', page: 1 },
            reasoning: 'Vague. No named existing tools (e.g. Elicit, scite.ai, Semantic Scholar), no measurable baseline metric. Fails para 22 specificity.',
          },
        ],
      },
      {
        id: 'rev1-17', category: 'technical', name: 'Commercial development framed as R&D', result: 'warning',
        summary: 'Project 3 reads as commercial productivity tooling rather than a technological advance.',
        confidence: 0.74,
        legislationRefIds: ['dsit-guidelines', 'cird81400'],
        basis: 'HMRC flags narratives that describe commercial product development rather than resolving technological uncertainty. "We built X to save time" is not R&D.',
        suggestedFix: 'Reframe Project 3 around the specific NLP research problem (e.g. domain-adaptive entity linking under weak supervision), not around internal productivity gains.',
        subChecks: [
          {
            id: 'rev1-17-a', assertion: 'Project 1 uncertainties are technological', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'uncertainty framed around tissue-specific transfection rates and endosomal escape', page: 1 },
            reasoning: 'Uncertainty is scientific — not commercial.',
          },
          {
            id: 'rev1-17-b', assertion: 'Project 3 uncertainties are technological', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: '"reducing manual review time by an estimated 70%"', page: 1 },
            reasoning: 'Framing is efficiency/commercial (time saved), not technological (advance in NLP). HMRC will challenge.',
          },
        ],
      },
      {
        id: 'rev1-18', category: 'technical', name: 'Output vs underlying technology focus', result: 'pass',
        summary: 'Narratives describe changes to underlying systems, not just end-user outputs.',
        confidence: 0.89,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 9a requires the project to demonstrate new or extended knowledge or capability in the technological components used, not just in the output delivered.',
        subChecks: [
          {
            id: 'rev1-18-a', assertion: 'Narratives describe architectural / component-level change', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'lipid nanoparticle composition, endosomal buffering moieties, targeting ligand chemistry', page: 1 },
            reasoning: 'Project 1 and 2 describe specific technological components being changed.',
          },
        ],
      },
      {
        id: 'rev1-19', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', result: 'pass',
        summary: 'Report explicitly excludes routine manufacturing, QA release testing, and sales support.',
        confidence: 0.91,
        legislationRefIds: ['cird81400', 'dsit-guidelines'],
        basis: 'HMRC expects evidence that non-qualifying activities (routine production, pre-existing QA, commercial support) were identified and excluded — not simply absent from the narrative.',
        subChecks: [
          {
            id: 'rev1-19-a', assertion: 'Report contains explicit exclusion statement', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-declaration', extractedValue: '"Excluded activities: routine hepatocyte culturing, commercial lot release testing, and sales-support work."', page: 2 },
            reasoning: 'Named exclusions shown. Passes CIRD81400 separation expectation.',
          },
        ],
      },
      // ── Cross-document reconciliation checks ──
      {
        id: 'rev1-20', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', result: 'warning',
        summary: 'Report and tax computation agree at £770,438.50, but working papers Summary total shows a £32k shortfall. Workbook likely out of date.',
        confidence: 0.91,
        legislationRefIds: ['cird82500'],
        basis: 'HMRC expects the R&D report, tax computation, and underlying working papers to tie out. Any reconciling difference must be explained or corrected before submission (CIRD82500 on apportionment).',
        subChecks: [
          {
            id: 'rev1-20-a', assertion: 'Total qualifying R&D expenditure on R&D report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'rnd-report', fieldId: 'f-total-rd', extractedValue: '£770,438.50', page: 9 },
            reasoning: 'R&D report Summary shows Total Qualifying R&D Expenditure of £770,438.50.',
          },
          {
            id: 'rev1-20-b', assertion: 'Tax computation QEE matches R&D report', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'tax-comp', fieldId: 'tc-rd-total-qee', extractedValue: '£770,438.50' },
            reasoning: 'Tax computation shows Total Qualifying Expenditure of £770,438.50 — exact match with R&D report.',
          },
          {
            id: 'rev1-20-c', assertion: 'Working papers Summary total ties to report', result: 'warning',
            evidenceType: 'document_field',
            evidence: { documentId: 'working-papers', sheetId: 'summary', cellRef: 'F9', extractedValue: 'Workbook qualifying total' },
            reasoning: 'Working papers Summary sheet cell F9 shows a value that diverges from the R&D report total. Reconciling difference to be reviewed before submission.',
          },
        ],
      },
      {
        id: 'rev1-21', category: 'cross-doc', name: 'UTR on R&D report matches CT600', result: 'pass',
        summary: 'UTR 1234567890 on R&D report matches CT600 box 3.',
        confidence: 0.99,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'The Unique Tax Reference is HMRC\'s primary identifier for the return. An inconsistent UTR across documents is grounds for rejection.',
        subChecks: [
          {
            id: 'rev1-21-a', assertion: 'UTR on R&D report Claim Summary', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'rnd-report', fieldId: 'f-utr', extractedValue: '1234567890', page: 3 },
            reasoning: 'UTR printed in R&D report Claim Summary panel.',
          },
          {
            id: 'rev1-21-b', assertion: 'UTR on CT600 box 3', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'ct600', fieldId: 'ct-f-utr', extractedValue: '2748 3910 5562', box: '3' },
            reasoning: 'UTR on CT600 box 3 read as 2748 3910 5562.',
          },
          {
            id: 'rev1-21-c', assertion: 'UTRs agree on R&D report and CT600', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D report UTR', value: '1234567890' },
              sourceB: { label: 'CT600 box 3 UTR', value: '2748 3910 5562' },
              match: true,
            },
            reasoning: 'Both documents carry a ten-digit UTR for the same entity; formatting normalised to numeric string for comparison.',
          },
        ],
      },
      {
        id: 'rev1-22', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', result: 'pass',
        summary: 'All three documents show AP 1 Apr 2024 – 31 Mar 2025.',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'The accounting period is load-bearing for R&D claim eligibility — scheme availability, enhancement rates, and time limits all depend on the AP dates. Any inconsistency across documents is a filing error.',
        subChecks: [
          {
            id: 'rev1-22-a', assertion: 'AP on R&D report Claim Summary', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'rnd-report', fieldId: 'f-accounting-period-body', extractedValue: '1 Apr 2024 – 31 Mar 2025', page: 3 },
            reasoning: 'R&D report Claim Summary shows AP ending 31 March 2025.',
          },
          {
            id: 'rev1-22-b', assertion: 'AP on CT600 boxes 30 / 35', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'ct600', fieldId: 'ct-f-period-start', extractedValue: '01/04/2024', box: '30' },
            reasoning: 'CT600 period start box 30 reads 01/04/2024 and box 35 reads 31/03/2025 — aligned with report.',
          },
          {
            id: 'rev1-22-c', assertion: 'AP on tax computation', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'tax-comp', fieldId: 'tc-period', extractedValue: '1 Apr 2024 – 31 Mar 2025' },
            reasoning: 'Tax computation header confirms matching accounting period.',
          },
        ],
      },
      {
        id: 'rev1-23', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', result: 'pass',
        summary: 'Trading loss before R&D relief consistent between CT600 and tax computation.',
        confidence: 0.95,
        legislationRefIds: ['fa2024-eris'],
        basis: 'The loss-making test for ERIS eligibility must be applied to consistent figures. HMRC cross-checks the CT600 trading profit/loss against the tax computation; any divergence must be reconciled.',
        subChecks: [
          {
            id: 'rev1-23-a', assertion: 'Trading profit on CT600 box 155', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'ct600', fieldId: 'ct-f-trading-profits', extractedValue: '£2,104,600', box: '155' },
            reasoning: 'CT600 box 155 shows trading profit of £2,104,600 before R&D deduction.',
          },
          {
            id: 'rev1-23-b', assertion: 'Trading profit on tax computation before R&D', result: 'pass',
            evidenceType: 'document_field',
            evidence: { documentId: 'tax-comp', fieldId: 'tc-adj-trading-profit', extractedValue: '£2,353,200' },
            reasoning: 'Tax computation adjusted trading profit before R&D deduction reconciles with CT600 after removing bank interest and other non-trading income.',
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
      {
        id: 'rev2-11', category: 'financials', name: 'Accounting period scheme eligibility', result: 'pass',
        summary: 'Merged scheme valid for AP 1 Jan 2025 – 31 Dec 2025.',
        confidence: 0.99,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Merged scheme applies to APs starting on or after 1 April 2024.',
        subChecks: [
          {
            id: 'rev2-11-a', assertion: 'AP starts after 1 Apr 2024', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'AP Start', value: '1 Jan 2025' }, sourceB: { label: 'Merged scheme operative from', value: '1 Apr 2024' }, match: true },
            reasoning: 'AP sits entirely within the merged-scheme window.',
          },
        ],
      },
      {
        id: 'rev2-12', category: 'financials', name: 'Expenditure categories eligible for AP', result: 'pass',
        summary: 'Staff, subcontractors, consumables and software all allowable.',
        confidence: 0.97,
        legislationRefIds: ['cta2009-s1052', 'cird82000'],
        basis: 'All merged-scheme categories are allowable.',
        subChecks: [
          {
            id: 'rev2-12-a', assertion: 'Categories on allow-list', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'Claim', value: 'Staff / Subs / Consumables / Software' }, sourceB: { label: 'Allowed', value: 'All four eligible' }, match: true },
            reasoning: 'No disallowed items.',
          },
        ],
      },
      {
        id: 'rev2-13', category: 'financials', name: 'SME status (headcount, turnover, assets)', result: 'pass',
        summary: 'Arcline qualifies as SME: 42 employees, £4.8m turnover, no group links.',
        confidence: 0.96,
        legislationRefIds: ['cird191000', 'sme-definition-eu'],
        basis: 'SME thresholds tested at group level.',
        subChecks: [
          {
            id: 'rev2-13-a', assertion: 'All thresholds passed', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/12847561/filing-history',
              records: { 'Employees': '42', 'Turnover': '£4.8m', 'Gross assets': '£5.9m', 'Corporate PSCs ≥25%': 'None' },
            },
            reasoning: 'Well inside all thresholds. No group aggregation needed.',
          },
        ],
      },
      {
        id: 'rev2-14', category: 'financials', name: 'Loss-making status (ERIS)', result: 'pass',
        summary: 'ERIS not claimed; company is profitable.',
        confidence: 0.98,
        legislationRefIds: ['fa2024-eris'],
        basis: 'ERIS only applies where specifically claimed and the company is loss-making for CT purposes.',
        subChecks: [
          {
            id: 'rev2-14-a', assertion: 'ERIS not claimed', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: 'Merged scheme (not ERIS)', page: 2 },
            reasoning: 'Claim is under merged scheme.',
          },
        ],
      },
      {
        id: 'rev2-15', category: 'technical', name: 'Technical narrative present & complete', result: 'pass',
        summary: 'All 3 projects have narratives with required AIF sections.',
        confidence: 0.95,
        legislationRefIds: ['cird182000', 'dsit-guidelines'],
        basis: 'CIRD182000 requires narratives for all projects when 1-3 are claimed.',
        subChecks: [
          {
            id: 'rev2-15-a', assertion: 'All 5 AIF sections present on each project', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'Baseline / Advance / Uncertainty / Work / Competent professional — all present', page: 1 },
            reasoning: 'Section headings detected on all three projects.',
          },
        ],
      },
      {
        id: 'rev2-16', category: 'technical', name: 'Scientific or technological baseline stated', result: 'pass',
        summary: 'All three projects state specific baseline technologies and measurable limitations.',
        confidence: 0.92,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 22 — baseline must name specific approaches and limitations.',
        subChecks: [
          {
            id: 'rev2-16-a', assertion: 'Baselines are specific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: '"Commercial seam-tracking controllers (Fronius AI, Panasonic TAWERS) lose tracking accuracy above 1.0 m/min."', page: 1 },
            reasoning: 'Named commercial systems + quantified limit. Project 2 names stereo-vision SDKs; Project 3 names harmonic-drive SKUs.',
          },
        ],
      },
      {
        id: 'rev2-17', category: 'technical', name: 'Commercial development framed as R&D', result: 'pass',
        summary: 'All projects focus on technological uncertainty, not commercial positioning.',
        confidence: 0.93,
        legislationRefIds: ['dsit-guidelines', 'cird81400'],
        basis: 'HMRC flags narratives centred on "winning customers" rather than advancing technology.',
        subChecks: [
          {
            id: 'rev2-17-a', assertion: 'Uncertainties are technological not commercial', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'uncertainty around maintaining weld quality at high traverse speeds', page: 1 },
            reasoning: 'Each project states a discrete technical uncertainty (weld quality at high traverse; deformable grasp planning; torque/weight trade-off).',
          },
        ],
      },
      {
        id: 'rev2-18', category: 'technical', name: 'Output vs underlying technology focus', result: 'pass',
        summary: 'Narratives describe changes to underlying mechanical, control and vision components.',
        confidence: 0.91,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 9a — advance must be in underlying technology.',
        subChecks: [
          {
            id: 'rev2-18-a', assertion: 'Component-level changes described', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'harmonic drive gear tooth profile, integrated torque sensor bridge, strain-gauge substrate', page: 1 },
            reasoning: 'Components and their changes explicitly named.',
          },
        ],
      },
      {
        id: 'rev2-19', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', result: 'pass',
        summary: 'Report excludes routine assembly, commissioning, and after-sales support.',
        confidence: 0.90,
        legislationRefIds: ['cird81400', 'dsit-guidelines'],
        basis: 'Non-qualifying activities must be identified and excluded.',
        subChecks: [
          {
            id: 'rev2-19-a', assertion: 'Exclusion statement present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-declaration', extractedValue: '"Excluded: routine production assembly, on-site commissioning, after-sales maintenance visits."', page: 2 },
            reasoning: 'Clear named exclusions.',
          },
        ],
      },
      // ── Cross-document reconciliation checks ──
      {
        id: 'rev2-20', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', result: 'pass',
        summary: 'Report, tax computation and working papers all agree on qualifying R&D total.',
        confidence: 0.97,
        legislationRefIds: ['cird82500'],
        basis: 'Totals must tie out across the three submission documents; HMRC will expect exact agreement at the grand-total level.',
        subChecks: [
          { id: 'rev2-20-a', assertion: 'R&D report total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-total-rd', extractedValue: '£620,000' }, reasoning: 'Report total matches tax comp.' },
          { id: 'rev2-20-b', assertion: 'Tax computation QEE', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-rd-total-qee' }, reasoning: 'Tax comp QEE line agrees.' },
          { id: 'rev2-20-c', assertion: 'Working papers Summary total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'working-papers', sheetId: 'summary', cellRef: 'F9' }, reasoning: 'Summary sheet grand total matches report and tax comp.' },
        ],
      },
      {
        id: 'rev2-21', category: 'cross-doc', name: 'UTR on R&D report matches CT600', result: 'pass',
        summary: 'UTR consistent across R&D report and CT600.',
        confidence: 0.98,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'UTR is HMRC\'s primary identifier for the return; inconsistency is grounds for rejection.',
        subChecks: [
          { id: 'rev2-21-a', assertion: 'UTR on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-utr' }, reasoning: 'UTR on R&D report.' },
          { id: 'rev2-21-b', assertion: 'UTR on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-utr' }, reasoning: 'UTR on CT600 box 3.' },
        ],
      },
      {
        id: 'rev2-22', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', result: 'pass',
        summary: 'AP 1 Jan 2025 – 31 Dec 2025 consistent across all three documents.',
        confidence: 0.97,
        legislationRefIds: ['cta2009-s1044'],
        basis: 'AP dates govern scheme eligibility and rate; must be exactly aligned.',
        subChecks: [
          { id: 'rev2-22-a', assertion: 'AP on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-accounting-period' }, reasoning: 'AP on R&D report.' },
          { id: 'rev2-22-b', assertion: 'AP on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-period-start' }, reasoning: 'CT600 period box 30/35.' },
          { id: 'rev2-22-c', assertion: 'AP on tax comp', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-period' }, reasoning: 'Tax comp AP header.' },
        ],
      },
      {
        id: 'rev2-23', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', result: 'pass',
        summary: 'Trading position before R&D reconciles between CT600 and tax comp.',
        confidence: 0.95,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Loss-making test must be applied to consistent pre-R&D figures.',
        subChecks: [
          { id: 'rev2-23-a', assertion: 'CT600 trading profit box 155', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-trading-profits' }, reasoning: 'CT600 box 155.' },
          { id: 'rev2-23-b', assertion: 'Tax comp trading profit before R&D', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-adj-trading-profit' }, reasoning: 'Tax comp adjusted trading profit.' },
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
      {
        id: 'rev3-11', category: 'financials', name: 'Accounting period scheme eligibility', result: 'pass',
        summary: 'Merged scheme valid for AP 1 Jul 2024 – 30 Jun 2025.',
        confidence: 0.99,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Merged scheme applies to APs starting on or after 1 April 2024.',
        subChecks: [
          {
            id: 'rev3-11-a', assertion: 'AP fully within merged-scheme window', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'AP Start', value: '1 Jul 2024' }, sourceB: { label: 'Merged operative', value: '1 Apr 2024' }, match: true },
            reasoning: 'AP starts three months after scheme start. No straddle adjustment.',
          },
        ],
      },
      {
        id: 'rev3-12', category: 'financials', name: 'Expenditure categories eligible for AP', result: 'warning',
        summary: 'Consumables at 28% is high for aerospace machining — categorisation borderline.',
        confidence: 0.71,
        legislationRefIds: ['cta2009-s1052', 'cird82000'],
        basis: 'Consumables must be items consumed or transformed in the R&D process, not items delivered to customers as product.',
        suggestedFix: 'Review the consumables breakdown — titanium stock for customer parts is not consumed in R&D. Reclassify as COGS or exclude.',
        subChecks: [
          {
            id: 'rev3-12-a', assertion: 'Consumables are R&D-consumed, not customer-delivered', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-consumables', extractedValue: '£117,600 (28%) — "titanium billets, tool inserts, cutting fluids, coating feedstock"', page: 2 },
            reasoning: 'Titanium billets may be delivered in customer parts rather than consumed in R&D. Needs evidence of R&D-only consumption.',
          },
        ],
      },
      {
        id: 'rev3-13', category: 'financials', name: 'SME status (headcount, turnover, assets)', result: 'pass',
        summary: 'Ferro qualifies as SME: 78 employees, £9.2m turnover, no group links.',
        confidence: 0.95,
        legislationRefIds: ['cird191000', 'sme-definition-eu'],
        basis: 'SME thresholds tested at group level.',
        subChecks: [
          {
            id: 'rev3-13-a', assertion: 'All SME thresholds passed', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/09273641/filing-history',
              records: { 'Employees': '78', 'Turnover': '£9.2m', 'Gross assets': '£11.4m', 'Corporate PSCs ≥25%': 'None' },
            },
            reasoning: 'All metrics well inside SME thresholds.',
          },
        ],
      },
      {
        id: 'rev3-14', category: 'financials', name: 'Loss-making status (ERIS)', result: 'pass',
        summary: 'ERIS not claimed; company is profitable.',
        confidence: 0.97,
        legislationRefIds: ['fa2024-eris'],
        basis: 'ERIS requires loss-making status plus a claim.',
        subChecks: [
          {
            id: 'rev3-14-a', assertion: 'Not claiming ERIS', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: 'Merged scheme', page: 2 },
            reasoning: 'Report states merged scheme.',
          },
        ],
      },
      {
        id: 'rev3-15', category: 'technical', name: 'Technical narrative present & complete', result: 'pass',
        summary: 'All 3 projects have narratives with required AIF sections.',
        confidence: 0.92,
        legislationRefIds: ['cird182000', 'dsit-guidelines'],
        basis: 'All 5 AIF sections detected per project.',
        subChecks: [
          {
            id: 'rev3-15-a', assertion: 'AIF sections present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'All 5 AIF sections detected across Projects 1-3', page: 1 },
            reasoning: 'Structure passes.',
          },
        ],
      },
      {
        id: 'rev3-16', category: 'technical', name: 'Scientific or technological baseline stated', result: 'pass',
        summary: 'Baselines name specific CNC platforms and measurable limits.',
        confidence: 0.88,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 22.',
        subChecks: [
          {
            id: 'rev3-16-a', assertion: 'Baselines are specific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: '"Mastercam 2024 and Hypermill 2023 toolpaths produce tool deflection of 42-58 µm on thin titanium walls; surface finish Ra 1.2-1.6 µm."', page: 1 },
            reasoning: 'Named CAM tools + quantified starting point.',
          },
        ],
      },
      {
        id: 'rev3-17', category: 'technical', name: 'Commercial development framed as R&D', result: 'pass',
        summary: 'Projects described in terms of scientific uncertainty, not commercial positioning.',
        confidence: 0.87,
        legislationRefIds: ['dsit-guidelines', 'cird81400'],
        basis: 'Narratives should focus on technological uncertainty.',
        subChecks: [
          {
            id: 'rev3-17-a', assertion: 'Uncertainties are technological', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'graded porosity in plasma-sprayed TBC; thermal cycling fatigue', page: 1 },
            reasoning: 'Technological uncertainty clearly stated.',
          },
        ],
      },
      {
        id: 'rev3-18', category: 'technical', name: 'Output vs underlying technology focus', result: 'pass',
        summary: 'Narratives describe changes to underlying materials science and tooling geometry.',
        confidence: 0.89,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT 9a.',
        subChecks: [
          {
            id: 'rev3-18-a', assertion: 'Underlying tech is addressed', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: 'laser head alignment model, probe-less calibration, positional feedback latency', page: 1 },
            reasoning: 'Components and changes named explicitly.',
          },
        ],
      },
      {
        id: 'rev3-19', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', result: 'warning',
        summary: 'Report does not explicitly call out non-qualifying activities that were excluded.',
        confidence: 0.68,
        legislationRefIds: ['cird81400', 'dsit-guidelines'],
        basis: 'HMRC expects a positive statement identifying non-qualifying activities that were assessed and excluded.',
        suggestedFix: 'Add a short "Activities excluded from the claim" subsection (e.g. production machining after prototype sign-off; tooling maintenance; customer commissioning).',
        subChecks: [
          {
            id: 'rev3-19-a', assertion: 'Explicit exclusion statement present', result: 'warning',
            evidenceType: 'declaration',
            evidence: { expectedStatement: 'Non-qualifying activities were identified and excluded', extractedText: null, found: false },
            reasoning: 'Absent. HMRC sees this as a weak-control indicator even if exclusions were in fact made.',
          },
        ],
      },
      // ── Cross-document reconciliation checks ──
      {
        id: 'rev3-20', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', result: 'pass',
        summary: 'All three documents agree on qualifying R&D total.',
        confidence: 0.96,
        legislationRefIds: ['cird82500'],
        basis: 'Totals must tie out across report, tax comp and working papers.',
        subChecks: [
          { id: 'rev3-20-a', assertion: 'R&D report total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-total-rd' }, reasoning: 'R&D report total.' },
          { id: 'rev3-20-b', assertion: 'Tax computation QEE', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-rd-total-qee' }, reasoning: 'Tax comp QEE.' },
          { id: 'rev3-20-c', assertion: 'Working papers Summary total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'working-papers', sheetId: 'summary', cellRef: 'F9' }, reasoning: 'Working papers Summary grand total.' },
        ],
      },
      {
        id: 'rev3-21', category: 'cross-doc', name: 'UTR on R&D report matches CT600', result: 'pass',
        summary: 'UTR consistent across R&D report and CT600.',
        confidence: 0.98, legislationRefIds: ['cta2009-s1044'],
        basis: 'UTR must agree across documents.',
        subChecks: [
          { id: 'rev3-21-a', assertion: 'UTR on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-utr' }, reasoning: 'Report UTR.' },
          { id: 'rev3-21-b', assertion: 'UTR on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-utr' }, reasoning: 'CT600 box 3 UTR.' },
        ],
      },
      {
        id: 'rev3-22', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', result: 'pass',
        summary: 'AP 1 Jul 2024 – 30 Jun 2025 consistent across documents.',
        confidence: 0.97, legislationRefIds: ['cta2009-s1044'],
        basis: 'AP dates must align.',
        subChecks: [
          { id: 'rev3-22-a', assertion: 'AP on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-accounting-period' }, reasoning: 'R&D report AP.' },
          { id: 'rev3-22-b', assertion: 'AP on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-period-start' }, reasoning: 'CT600 period boxes.' },
          { id: 'rev3-22-c', assertion: 'AP on tax comp', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-period' }, reasoning: 'Tax comp AP header.' },
        ],
      },
      {
        id: 'rev3-23', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', result: 'pass',
        summary: 'Trading position before R&D consistent on CT600 and tax comp.',
        confidence: 0.94, legislationRefIds: ['fa2024-eris'],
        basis: 'Pre-R&D trading figure must agree between documents.',
        subChecks: [
          { id: 'rev3-23-a', assertion: 'CT600 trading profit box 155', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-trading-profits' }, reasoning: 'CT600 box 155.' },
          { id: 'rev3-23-b', assertion: 'Tax comp trading profit before R&D', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-adj-trading-profit' }, reasoning: 'Tax comp adjusted trading profit.' },
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
    routingReason: 'Minor warning on Project 3 (NL Query Engine) commercial framing. Otherwise clean — ready for reviewer sign-off.',
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
      {
        id: 'rev4-11', category: 'financials', name: 'Accounting period scheme eligibility', result: 'pass',
        summary: 'Merged scheme valid for AP 1 Apr 2024 – 31 Mar 2025.',
        confidence: 0.99,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Merged scheme operative from 1 Apr 2024.',
        subChecks: [
          {
            id: 'rev4-11-a', assertion: 'AP starts on merged operative date', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'AP Start', value: '1 Apr 2024' }, sourceB: { label: 'Merged operative', value: '1 Apr 2024' }, match: true },
            reasoning: 'AP aligns with scheme start.',
          },
        ],
      },
      {
        id: 'rev4-12', category: 'financials', name: 'Expenditure categories eligible for AP', result: 'pass',
        summary: 'Staff, subcontractors and software all allowable.',
        confidence: 0.97,
        legislationRefIds: ['cta2009-s1052', 'cird82000'],
        basis: 'All claimed categories allowable under merged scheme.',
        subChecks: [
          {
            id: 'rev4-12-a', assertion: 'Categories on allow-list', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'Claim', value: 'Staff / Subs / Software' }, sourceB: { label: 'Allowed', value: 'All three eligible' }, match: true },
            reasoning: 'Clean.',
          },
        ],
      },
      {
        id: 'rev4-13', category: 'financials', name: 'SME status (headcount, turnover, assets)', result: 'pass',
        summary: 'Meridian qualifies as SME: 24 employees, £1.9m turnover, no group.',
        confidence: 0.97,
        legislationRefIds: ['cird191000', 'sme-definition-eu'],
        basis: 'SME thresholds tested at group level.',
        subChecks: [
          {
            id: 'rev4-13-a', assertion: 'SME thresholds passed', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/11384726/filing-history',
              records: { 'Employees': '24', 'Turnover': '£1.9m', 'Gross assets': '£820k', 'Corporate PSCs ≥25%': 'None' },
            },
            reasoning: 'Well within SME thresholds.',
          },
        ],
      },
      {
        id: 'rev4-14', category: 'financials', name: 'Loss-making status (ERIS)', result: 'pass',
        summary: 'ERIS not claimed; company broke even for CT purposes.',
        confidence: 0.95,
        legislationRefIds: ['fa2024-eris'],
        basis: 'ERIS is not claimed — informational check.',
        subChecks: [
          {
            id: 'rev4-14-a', assertion: 'ERIS not claimed', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-total-rd', extractedValue: 'Merged scheme', page: 2 },
            reasoning: 'Merged-scheme claim.',
          },
        ],
      },
      {
        id: 'rev4-15', category: 'technical', name: 'Technical narrative present & complete', result: 'pass',
        summary: 'All 3 projects have complete AIF narratives.',
        confidence: 0.94,
        legislationRefIds: ['cird182000', 'dsit-guidelines'],
        basis: 'CIRD182000.',
        subChecks: [
          {
            id: 'rev4-15-a', assertion: 'All AIF sections present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'All sections present', page: 1 },
            reasoning: 'Structure passes.',
          },
        ],
      },
      {
        id: 'rev4-16', category: 'technical', name: 'Scientific or technological baseline stated', result: 'pass',
        summary: 'Baselines reference specific libraries, SOTA papers, and measurable latency/throughput targets.',
        confidence: 0.90,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 22 — baselines must be specific.',
        subChecks: [
          {
            id: 'rev4-16-a', assertion: 'Baselines cite specific tools and metrics', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: '"PyOD IsolationForest baseline: 850ms p99 at 12K events/s."', page: 1 },
            reasoning: 'Library + quantified baseline stated.',
          },
        ],
      },
      {
        id: 'rev4-17', category: 'technical', name: 'Commercial development framed as R&D', result: 'warning',
        summary: 'Project 3 (NL Query Engine) reads as product feature development, not technological advance.',
        confidence: 0.70,
        legislationRefIds: ['dsit-guidelines', 'cird81400'],
        basis: 'Software claims are at high risk of HMRC challenge where the narrative describes product features rather than resolving technological uncertainty in the underlying methods.',
        suggestedFix: 'Refocus Project 3 on the specific uncertainty (e.g. semantic parsing of ambiguous joins against multi-tenant schemas under schema drift). Remove language about "business users" and "self-service analytics".',
        subChecks: [
          {
            id: 'rev4-17-a', assertion: 'Project 1 is R&D-framed', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'uncertainty around sub-200ms inference at 50k events/s', page: 1 },
            reasoning: 'Clear technological uncertainty.',
          },
          {
            id: 'rev4-17-b', assertion: 'Project 3 is R&D-framed', result: 'warning',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project3', extractedValue: '"empower business users to self-serve analytics without SQL expertise"', page: 1 },
            reasoning: 'Framing emphasises end-user benefit. HMRC sees this as commercial positioning, not R&D.',
          },
        ],
      },
      {
        id: 'rev4-18', category: 'technical', name: 'Output vs underlying technology focus', result: 'pass',
        summary: 'Narratives describe changes to pipelines, schedulers, and parsers — not just output features.',
        confidence: 0.87,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT 9a.',
        subChecks: [
          {
            id: 'rev4-18-a', assertion: 'Changes described at component level', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'DAG scheduler, task-spec language, resource-shadow matching', page: 1 },
            reasoning: 'Underlying tech named.',
          },
        ],
      },
      {
        id: 'rev4-19', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', result: 'pass',
        summary: 'Report excludes feature polish, UI work, and customer onboarding.',
        confidence: 0.89,
        legislationRefIds: ['cird81400', 'dsit-guidelines'],
        basis: 'Non-qualifying activities should be identified.',
        subChecks: [
          {
            id: 'rev4-19-a', assertion: 'Exclusions stated', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-declaration', extractedValue: '"Excluded from the claim: UI/UX refinement, customer onboarding, SRE incident response."', page: 2 },
            reasoning: 'Explicit exclusions.',
          },
        ],
      },
      // ── Cross-document reconciliation checks ──
      {
        id: 'rev4-20', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', result: 'pass',
        summary: 'Totals agree across report, tax comp and working papers.',
        confidence: 0.98, legislationRefIds: ['cird82500'],
        basis: 'Totals must tie out across submission documents.',
        subChecks: [
          { id: 'rev4-20-a', assertion: 'R&D report total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-total-rd' }, reasoning: 'R&D report total.' },
          { id: 'rev4-20-b', assertion: 'Tax computation QEE', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-rd-total-qee' }, reasoning: 'Tax comp QEE.' },
          { id: 'rev4-20-c', assertion: 'Working papers Summary total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'working-papers', sheetId: 'summary', cellRef: 'F9' }, reasoning: 'Working papers grand total.' },
        ],
      },
      {
        id: 'rev4-21', category: 'cross-doc', name: 'UTR on R&D report matches CT600', result: 'pass',
        summary: 'UTR consistent.', confidence: 0.99, legislationRefIds: ['cta2009-s1044'],
        basis: 'UTR must agree.',
        subChecks: [
          { id: 'rev4-21-a', assertion: 'UTR on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-utr' }, reasoning: 'Report UTR.' },
          { id: 'rev4-21-b', assertion: 'UTR on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-utr' }, reasoning: 'CT600 UTR.' },
        ],
      },
      {
        id: 'rev4-22', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', result: 'pass',
        summary: 'AP 1 Apr 2024 – 31 Mar 2025 consistent.', confidence: 0.97, legislationRefIds: ['cta2009-s1044'],
        basis: 'AP dates must align.',
        subChecks: [
          { id: 'rev4-22-a', assertion: 'AP on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-accounting-period' }, reasoning: 'Report AP.' },
          { id: 'rev4-22-b', assertion: 'AP on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-period-start' }, reasoning: 'CT600 boxes 30/35.' },
          { id: 'rev4-22-c', assertion: 'AP on tax comp', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-period' }, reasoning: 'Tax comp AP.' },
        ],
      },
      {
        id: 'rev4-23', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', result: 'pass',
        summary: 'Trading position before R&D consistent.', confidence: 0.95, legislationRefIds: ['fa2024-eris'],
        basis: 'Pre-R&D trading figure must agree.',
        subChecks: [
          { id: 'rev4-23-a', assertion: 'CT600 trading profit box 155', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-trading-profits' }, reasoning: 'CT600 box 155.' },
          { id: 'rev4-23-b', assertion: 'Tax comp trading profit before R&D', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-adj-trading-profit' }, reasoning: 'Tax comp adjusted trading profit.' },
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
      {
        id: 'rev5-11', category: 'financials', name: 'Accounting period scheme eligibility', result: 'pass',
        summary: 'Merged scheme valid for AP 1 Jan 2025 – 31 Dec 2025.',
        confidence: 0.99,
        legislationRefIds: ['fa2024-eris'],
        basis: 'Merged scheme operative from 1 April 2024.',
        subChecks: [
          {
            id: 'rev5-11-a', assertion: 'AP sits in merged-scheme window', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'AP Start', value: '1 Jan 2025' }, sourceB: { label: 'Merged operative', value: '1 Apr 2024' }, match: true },
            reasoning: 'AP starts 9 months after scheme start.',
          },
        ],
      },
      {
        id: 'rev5-12', category: 'financials', name: 'Expenditure categories eligible for AP', result: 'pass',
        summary: 'Staff, subcontractors and consumables allowable under merged scheme.',
        confidence: 0.96,
        legislationRefIds: ['cta2009-s1052', 'cird82000'],
        basis: 'All categories allowed.',
        subChecks: [
          {
            id: 'rev5-12-a', assertion: 'Categories allowable', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: { sourceA: { label: 'Claim', value: 'Staff / Subs / Consumables' }, sourceB: { label: 'Allowed', value: 'All three eligible' }, match: true },
            reasoning: 'No disallowed items.',
          },
        ],
      },
      {
        id: 'rev5-13', category: 'financials', name: 'SME status (headcount, turnover, assets)', result: 'pass',
        summary: 'Helix qualifies as SME: 14 employees, £620k turnover (pre-revenue trajectory), £4.8m balance sheet.',
        confidence: 0.93,
        legislationRefIds: ['cird191000', 'sme-definition-eu'],
        basis: 'Early-stage biotech — test against thresholds carefully.',
        subChecks: [
          {
            id: 'rev5-13-a', assertion: 'SME thresholds passed', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839/filing-history',
              records: { 'Employees': '14', 'Turnover': '£620k', 'Gross assets': '£4.8m', 'Corporate PSCs ≥25%': '1 VC (28%)', 'Linked enterprise aggregation required?': 'No — VC is a minority investor, not a parent enterprise' },
            },
            reasoning: 'Even after VC PSC check, no aggregation needed. Well under SME thresholds.',
          },
        ],
      },
      {
        id: 'rev5-14', category: 'financials', name: 'Loss-making status (ERIS)', result: 'pass',
        summary: 'Helix is loss-making but has not claimed under ERIS — opportunity to review scheme choice.',
        confidence: 0.82,
        legislationRefIds: ['fa2024-eris'],
        basis: 'ERIS requires loss-making status + R&D intensity ≥ 30% of total expenditure. Where both are met, ERIS typically delivers a higher cash credit than the merged scheme.',
        suggestedFix: 'Review whether Helix qualifies for ERIS — loss-making, R&D spend (£580k) is likely >30% of total company expenditure for a pre-revenue biotech. ERIS could deliver ~£25-40k additional credit.',
        subChecks: [
          {
            id: 'rev5-14-a', assertion: 'Company is loss-making for CT purposes', result: 'pass',
            evidenceType: 'external',
            evidence: {
              source: 'Companies House Accounts (FY2024)',
              sourceUrl: 'https://find-and-update.company-information.service.gov.uk/company/10572839/filing-history',
              records: { 'Loss before tax': '(£1.42m)', 'Trading loss (CT adj)': '(£1.36m)' },
            },
            reasoning: 'Loss-making confirmed.',
          },
          {
            id: 'rev5-14-b', assertion: 'R&D intensity test passed', result: 'pass',
            evidenceType: 'cross_reference',
            evidence: {
              sourceA: { label: 'R&D spend', value: '£580,000' },
              sourceB: { label: 'Total relevant expenditure (est.)', value: '£1,620,000' },
              match: true,
              discrepancy: 'R&D intensity ~35.8% — above the 30% ERIS threshold.',
            },
            reasoning: 'Both ERIS conditions met. Not claimed, but available.',
          },
        ],
      },
      {
        id: 'rev5-15', category: 'technical', name: 'Technical narrative present & complete', result: 'pass',
        summary: 'Both projects have complete AIF narratives.',
        confidence: 0.94,
        legislationRefIds: ['cird182000', 'dsit-guidelines'],
        basis: 'CIRD182000 — 2 projects, narratives required for both.',
        subChecks: [
          {
            id: 'rev5-15-a', assertion: 'All AIF sections present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'All sections present', page: 1 },
            reasoning: 'Structure passes.',
          },
        ],
      },
      {
        id: 'rev5-16', category: 'technical', name: 'Scientific or technological baseline stated', result: 'pass',
        summary: 'Baselines name specific published assays and quantified starting points.',
        confidence: 0.91,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT paragraph 22.',
        subChecks: [
          {
            id: 'rev5-16-a', assertion: 'Baselines are specific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: '"Existing multiplex immunoassays (Quanterix Simoa, MSD U-plex) achieve CVs of 18-24% on dried blood spots for IL-6, TNF-α."', page: 1 },
            reasoning: 'Named platforms + quantified baseline.',
          },
        ],
      },
      {
        id: 'rev5-17', category: 'technical', name: 'Commercial development framed as R&D', result: 'pass',
        summary: 'Projects framed around scientific uncertainty (assay CV, protocol adaptation).',
        confidence: 0.89,
        legislationRefIds: ['dsit-guidelines', 'cird81400'],
        basis: 'DSIT Guidelines.',
        subChecks: [
          {
            id: 'rev5-17-a', assertion: 'Uncertainties are scientific', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project2', extractedValue: 'adaptive Bayesian trial design, response-adaptive randomisation, interim futility', page: 1 },
            reasoning: 'Statistical uncertainty in trial design — qualifying R&D.',
          },
        ],
      },
      {
        id: 'rev5-18', category: 'technical', name: 'Output vs underlying technology focus', result: 'pass',
        summary: 'Narratives describe assay chemistry and trial statistics, not commercial output.',
        confidence: 0.88,
        legislationRefIds: ['dsit-guidelines'],
        basis: 'DSIT 9a.',
        subChecks: [
          {
            id: 'rev5-18-a', assertion: 'Component-level changes described', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-project1', extractedValue: 'antibody pair selection, substrate chemistry, signal amplification', page: 1 },
            reasoning: 'Underlying biochemistry changes described.',
          },
        ],
      },
      {
        id: 'rev5-19', category: 'technical', name: 'Evidenced separation of R&D from non-R&D', result: 'pass',
        summary: 'Report excludes routine clinical-trial operations and regulatory submission prep.',
        confidence: 0.88,
        legislationRefIds: ['cird81400', 'dsit-guidelines'],
        basis: 'Non-qualifying activities must be identified and excluded.',
        subChecks: [
          {
            id: 'rev5-19-a', assertion: 'Exclusion statement present', result: 'pass',
            evidenceType: 'document_field',
            evidence: { fieldId: 'f-declaration', extractedValue: '"Excluded: routine GCP site monitoring, regulatory submission administration, data cleaning for non-interim analyses."', page: 2 },
            reasoning: 'Clear named exclusions.',
          },
        ],
      },
      // ── Cross-document reconciliation checks ──
      {
        id: 'rev5-20', category: 'cross-doc', name: 'Qualifying expenditure reconciles across report, tax comp, working papers', result: 'pass',
        summary: 'Totals tie out across documents.',
        confidence: 0.97, legislationRefIds: ['cird82500'],
        basis: 'Totals must tie out across submission documents.',
        subChecks: [
          { id: 'rev5-20-a', assertion: 'R&D report total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-total-rd' }, reasoning: 'R&D report total.' },
          { id: 'rev5-20-b', assertion: 'Tax computation QEE', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-rd-total-qee' }, reasoning: 'Tax comp QEE.' },
          { id: 'rev5-20-c', assertion: 'Working papers Summary total', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'working-papers', sheetId: 'summary', cellRef: 'F9' }, reasoning: 'Working papers grand total.' },
        ],
      },
      {
        id: 'rev5-21', category: 'cross-doc', name: 'UTR on R&D report matches CT600', result: 'pass',
        summary: 'UTR consistent.', confidence: 0.98, legislationRefIds: ['cta2009-s1044'],
        basis: 'UTR must agree.',
        subChecks: [
          { id: 'rev5-21-a', assertion: 'UTR on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-utr' }, reasoning: 'Report UTR.' },
          { id: 'rev5-21-b', assertion: 'UTR on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-utr' }, reasoning: 'CT600 UTR.' },
        ],
      },
      {
        id: 'rev5-22', category: 'cross-doc', name: 'Accounting period matches across R&D report, CT600 & tax comp', result: 'pass',
        summary: 'AP consistent across documents.', confidence: 0.97, legislationRefIds: ['cta2009-s1044'],
        basis: 'AP dates must align.',
        subChecks: [
          { id: 'rev5-22-a', assertion: 'AP on R&D report', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'rnd-report', fieldId: 'f-accounting-period' }, reasoning: 'Report AP.' },
          { id: 'rev5-22-b', assertion: 'AP on CT600', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-period-start' }, reasoning: 'CT600 period boxes.' },
          { id: 'rev5-22-c', assertion: 'AP on tax comp', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-period' }, reasoning: 'Tax comp AP.' },
        ],
      },
      {
        id: 'rev5-23', category: 'cross-doc', name: 'Trading loss reconciles between CT600 & tax comp', result: 'pass',
        summary: 'Trading position before R&D consistent on CT600 and tax comp.',
        confidence: 0.94, legislationRefIds: ['fa2024-eris'],
        basis: 'Pre-R&D trading figure must agree.',
        subChecks: [
          { id: 'rev5-23-a', assertion: 'CT600 trading profit box 155', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'ct600', fieldId: 'ct-f-trading-profits' }, reasoning: 'CT600 box 155.' },
          { id: 'rev5-23-b', assertion: 'Tax comp trading profit before R&D', result: 'pass', evidenceType: 'document_field', evidence: { documentId: 'tax-comp', fieldId: 'tc-adj-trading-profit' }, reasoning: 'Tax comp adjusted trading profit.' },
        ],
      },
    ],
  },
]
