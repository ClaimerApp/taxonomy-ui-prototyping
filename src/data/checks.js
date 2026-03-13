export const checkers = [
  {
    id: 'checker-rnd-tax',
    name: 'R&D Tax Report Checker',
    description: 'Auto-reviews R&D tax reports before they reach the partner, catching errors and suggesting corrections with full audit trail.',
    icon: 'shield',
  },
]

export const checkCategories = [
  { id: 'company', label: 'Company Details & Status' },
  { id: 'financials', label: 'Financials' },
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

export const fileReviews = [
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
    routingReason: 'Two critical issues found: company number mismatch and R&D expenditure exceeds total company expenditure. Must be corrected before partner review.',
    checks: [
      { id: 'rev1-1', category: 'company', name: 'Company name present & CH match', result: 'pass', summary: 'Company name "Nexagen Ltd" matches Companies House record.', evidence: 'Report states "Nexagen Ltd"; CH record confirms registration under company number 08451923.', reasoning: 'Verified company name against Companies House API. Exact match found, no variations or typos detected.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.98 },
      { id: 'rev1-2', category: 'company', name: 'Company number present & valid', result: 'critical', summary: 'Company number in report does not match Companies House record.', evidence: 'Report states 08451293; CH record shows 08451923. Transposition of digits 2 and 9.', reasoning: 'The company number 08451293 returns no active company on Companies House. The name matches 08451923. This is likely a transposition error but must be corrected as HMRC will reject the claim.', regulatoryRef: 'CTA 2009 s1044', suggestedFix: 'Correct company number from 08451293 to 08451923.', autoFixed: true, originalValue: '08451293', correctedValue: '08451923', confidence: 0.99 },
      { id: 'rev1-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass', summary: 'SIC code 72110 (Biotechnology R&D) is present and strongly correlates with R&D activity.', evidence: 'SIC 72110 is classified under "Research and experimental development on biotechnology".', reasoning: 'SIC code 72110 is in the high-probability R&D category. No further review needed.', regulatoryRef: 'CIRD81400', confidence: 0.97 },
      { id: 'rev1-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass', summary: 'Accounting period 1 Apr 2024 – 31 Mar 2025 is valid and within 12 months.', evidence: 'Period length: 365 days. Consistent with prior year filings.', reasoning: 'Standard 12-month period aligned with previous filings. No split periods or anomalies detected.', regulatoryRef: 'FA 1998 Sch 18 para 3', confidence: 0.99 },
      { id: 'rev1-5', category: 'company', name: 'Going concern & CH status', result: 'pass', summary: 'Company is active on Companies House. No going concern flags.', evidence: 'CH status: Active. Last accounts filed Sep 2025. No winding-up petitions or strike-off action.', reasoning: 'Checked Companies House status and Gazette for any insolvency notices. None found.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev1-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass', summary: 'Company is currently trading. Revenue reported in latest accounts.', evidence: 'FY2025 accounts show turnover of £2.1m. Payroll data confirms active employees.', reasoning: 'Non-zero turnover and active payroll confirm ongoing trade. Dormant company exemptions do not apply.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.98 },
      { id: 'rev1-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'warning', summary: 'One project description lacks explicit link to the company\'s trade.', evidence: 'Project 3 ("AI-assisted literature review tool") does not clearly connect to biotechnology drug discovery.', reasoning: 'While the other two projects clearly relate to the company\'s core biotech R&D, the AI tool project could be seen as a general business tool rather than trade-specific R&D. HMRC may challenge this under s1044.', regulatoryRef: 'CTA 2009 s1044', suggestedFix: 'Strengthen the narrative for Project 3 to explicitly explain how the AI tool advances the company\'s drug discovery trade.', confidence: 0.72 },
      { id: 'rev1-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'critical', summary: 'Claimed R&D expenditure exceeds total company expenditure reported in accounts.', evidence: 'R&D claim: £412,000. Total operating expenditure per accounts: £380,000.', reasoning: 'R&D expenditure cannot exceed total company expenditure — this indicates either an error in the claim figure or missing cost categories in the accounts. HMRC will flag this automatically.', regulatoryRef: 'CTA 2009 s1052', suggestedFix: 'Reconcile R&D expenditure with accounts. Either reduce claim to within total expenditure or verify accounts are complete.', confidence: 0.99 },
      { id: 'rev1-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass', summary: 'Staff costs, subcontractor costs, and consumables are within expected ratios.', evidence: 'Staff: 68%, Subcontractors: 22%, Consumables: 10%. All within HMRC norms for biotech.', reasoning: 'Compared against sector benchmarks. Staff-heavy cost profile is typical for biotech R&D.', regulatoryRef: 'CIRD82000', confidence: 0.91 },
      { id: 'rev1-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass', summary: 'No notified state aid or grants found that would reduce the claim.', evidence: 'Checked Innovate UK database and company accounts notes. No grant income disclosed.', reasoning: 'Under the merged R&D scheme, subsidised expenditure may need separate treatment. No subsidies detected for this claimant.', regulatoryRef: 'CTA 2009 s1112G', confidence: 0.88 },
    ],
  },
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
    routingReason: 'One minor warning only — accounting period date format inconsistency. Auto-corrected. Ready for partner sign-off.',
    checks: [
      { id: 'rev2-1', category: 'company', name: 'Company name present & CH match', result: 'pass', summary: 'Company name "Arcline Robotics Ltd" matches Companies House record.', evidence: 'Exact match confirmed against CH record for company number 12847561.', reasoning: 'Direct API match. No variations detected.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev2-2', category: 'company', name: 'Company number present & valid', result: 'pass', summary: 'Company number 12847561 is valid and correlates with company name.', evidence: 'CH lookup confirms active company "Arcline Robotics Ltd" at this number.', reasoning: 'Valid 8-digit format, active company, name matches.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev2-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass', summary: 'SIC code 28990 (Special-purpose machinery) is plausible for R&D.', evidence: 'Manufacturing of novel robotic assembly systems qualifies under the scheme.', reasoning: 'SIC 28990 is in the moderate-probability R&D category. Project descriptions confirm qualifying activity.', regulatoryRef: 'CIRD81400', confidence: 0.89 },
      { id: 'rev2-4', category: 'company', name: 'Accounting period(s) valid', result: 'warning', summary: 'Accounting period dates use inconsistent format — "1/1/25" and "31 December 2025" in different sections.', evidence: 'Page 1: "1/1/25 to 31/12/25". Page 4: "1 January 2025 to 31 December 2025".', reasoning: 'While both refer to the same period, inconsistent formatting looks unprofessional and could cause confusion. Auto-corrected to standard format.', regulatoryRef: 'FA 1998 Sch 18 para 3', suggestedFix: 'Standardise all date references to "1 January 2025 to 31 December 2025".', autoFixed: true, originalValue: '1/1/25 to 31/12/25', correctedValue: '1 January 2025 to 31 December 2025', confidence: 0.95 },
      { id: 'rev2-5', category: 'company', name: 'Going concern & CH status', result: 'pass', summary: 'Company is active on Companies House. No insolvency proceedings.', evidence: 'CH status: Active. No winding-up petitions. Last accounts filed Dec 2025.', reasoning: 'Standard active company status confirmed.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev2-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass', summary: 'Company is trading with reported revenue of £4.8m.', evidence: 'Turnover per latest accounts: £4,800,000. Active payroll with 42 employees.', reasoning: 'Substantial trading activity confirmed.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev2-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass', summary: 'All three R&D projects directly relate to the company\'s robotic systems manufacturing trade.', evidence: 'Projects: adaptive welding control, vision-guided assembly, lightweight actuator design.', reasoning: 'All projects are core to the company\'s SIC 28990 activity. Clear technological uncertainty and advance sought in each.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.95 },
      { id: 'rev2-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass', summary: 'R&D expenditure (£620K) is well within total company expenditure (£4.2m).', evidence: 'R&D as % of total expenditure: 14.8%. Within normal range for manufacturing R&D.', reasoning: 'Ratio is reasonable and consistent with sector norms.', regulatoryRef: 'CTA 2009 s1052', confidence: 0.98 },
      { id: 'rev2-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass', summary: 'All expenditure categories within expected bounds.', evidence: 'Staff: 55%, Subcontractors: 30%, Consumables: 12%, Software: 3%.', reasoning: 'Higher subcontractor ratio is expected for manufacturing — specialist tooling and prototyping.', regulatoryRef: 'CIRD82000', confidence: 0.90 },
      { id: 'rev2-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass', summary: 'No state aid or grant funding identified.', evidence: 'No grant income in accounts. No Innovate UK awards found.', reasoning: 'Clean check — no subsidised expenditure adjustments needed.', regulatoryRef: 'CTA 2009 s1112G', confidence: 0.92 },
    ],
  },
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
      { id: 'rev3-1', category: 'company', name: 'Company name present & CH match', result: 'pass', summary: 'Company name "Ferro Dynamics Ltd" matches Companies House record.', evidence: 'Exact match against CH record for company number 09273641.', reasoning: 'Direct match confirmed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev3-2', category: 'company', name: 'Company number present & valid', result: 'pass', summary: 'Company number 09273641 is valid and active.', evidence: 'CH confirms active company at this registration number.', reasoning: 'Standard validation passed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev3-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass', summary: 'SIC 25620 (Machining) is plausible for R&D in precision engineering.', evidence: 'Projects involve novel manufacturing techniques for aerospace-grade components.', reasoning: 'While machining alone may not suggest R&D, the project descriptions confirm technological advance beyond standard practice.', regulatoryRef: 'CIRD81400', confidence: 0.84 },
      { id: 'rev3-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass', summary: 'Period 1 Jul 2024 – 30 Jun 2025. Valid 12-month period.', evidence: 'Consistent with prior year filings. No split periods.', reasoning: 'Standard period, no issues.', regulatoryRef: 'FA 1998 Sch 18 para 3', confidence: 0.99 },
      { id: 'rev3-5', category: 'company', name: 'Going concern & CH status', result: 'critical', summary: 'Recent acquisition by Vantage Holdings plc may change SME status — report still claims under SME scheme.', evidence: 'CH PSC filing 28 Feb 2026: Vantage Holdings plc acquired 50-75% ownership. Vantage Holdings has 800+ employees and turnover >€50m.', reasoning: 'If the company is now part of a group exceeding EU SME thresholds (staff headcount ≥250, turnover >€50m, or balance sheet >€43m), it cannot claim under the SME R&D scheme. The report must be reviewed against the merged scheme or RDEC rules. This is a fundamental eligibility question.', regulatoryRef: 'CTA 2009 s1052; CIRD191000', suggestedFix: 'Verify group headcount and financials post-acquisition. If SME thresholds are exceeded, rewrite claim under the merged R&D scheme.', confidence: 0.91 },
      { id: 'rev3-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass', summary: 'Company is actively trading.', evidence: 'Latest accounts show turnover of £6.2m. 85 employees on payroll.', reasoning: 'Clearly an active trading company.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev3-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'warning', summary: 'One project may overlap with parent company R&D — risk of double-claiming.', evidence: 'Project 2 ("Advanced surface coating for turbine blades") is similar to Vantage Holdings\' published R&D programme.', reasoning: 'Post-acquisition, there is a risk that the same R&D is being claimed by both the subsidiary and the parent. HMRC would view this very unfavourably. Need confirmation that Vantage is not claiming for the same work.', regulatoryRef: 'CTA 2009 s1044', suggestedFix: 'Obtain written confirmation from Vantage Holdings that they are not claiming R&D relief for the same project.', confidence: 0.68 },
      { id: 'rev3-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass', summary: 'R&D expenditure (£420K) is within total expenditure (£5.8m).', evidence: 'R&D as % of total: 7.2%. Conservative and credible.', reasoning: 'Well within bounds. No concerns.', regulatoryRef: 'CTA 2009 s1052', confidence: 0.98 },
      { id: 'rev3-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'warning', summary: 'Consumables claim at 28% is unusually high for this sector.', evidence: 'Staff: 50%, Subcontractors: 15%, Consumables: 28%, Software: 7%.', reasoning: 'HMRC benchmarks for precision engineering typically show consumables at 8-15%. A 28% consumables figure will likely trigger an enquiry. Need supporting evidence for material usage.', regulatoryRef: 'CIRD82000', suggestedFix: 'Provide detailed consumables breakdown showing specific materials used in R&D (e.g. specialist alloys, prototype materials). If some costs are misclassified, move to correct category.', confidence: 0.82 },
      { id: 'rev3-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass', summary: 'No public grants or subsidies identified.', evidence: 'No grant income in accounts or Innovate UK records.', reasoning: 'Clean check.', regulatoryRef: 'CTA 2009 s1112G', confidence: 0.90 },
    ],
  },
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
    routingReason: 'All checks passed. Clean report ready for partner sign-off.',
    checks: [
      { id: 'rev4-1', category: 'company', name: 'Company name present & CH match', result: 'pass', summary: 'Company name "Meridian Software Ltd" matches Companies House record.', evidence: 'Exact match for company number 11384726.', reasoning: 'Direct match confirmed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev4-2', category: 'company', name: 'Company number present & valid', result: 'pass', summary: 'Company number 11384726 is valid and active.', evidence: 'CH confirms active registration.', reasoning: 'Standard validation passed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev4-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass', summary: 'SIC 62012 (Business and domestic software development) is highly plausible for R&D.', evidence: 'Software development is one of the most common R&D claim sectors.', reasoning: 'SIC 62012 is in the high-probability R&D category. No further review needed.', regulatoryRef: 'CIRD81400', confidence: 0.96 },
      { id: 'rev4-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass', summary: 'Period 1 Apr 2024 – 31 Mar 2025. Standard 12-month period.', evidence: 'Consistent with prior year filings.', reasoning: 'No issues detected.', regulatoryRef: 'FA 1998 Sch 18 para 3', confidence: 0.99 },
      { id: 'rev4-5', category: 'company', name: 'Going concern & CH status', result: 'pass', summary: 'Company is active, no adverse filings.', evidence: 'CH status: Active. No insolvency events.', reasoning: 'Clean company status.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev4-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass', summary: 'Company is actively trading with £1.8m turnover.', evidence: 'Latest accounts show revenue growth of 15% YoY. 24 employees.', reasoning: 'Active trading company, comfortably within SME thresholds.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev4-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass', summary: 'All R&D projects are core software development activities within the company\'s trade.', evidence: 'Projects: ML-based anomaly detection, real-time data pipeline optimisation, natural language query engine.', reasoning: 'All projects directly advance the company\'s software products. Clear technological uncertainty in each case.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.94 },
      { id: 'rev4-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass', summary: 'R&D expenditure (£340K) is within total expenditure (£1.6m).', evidence: 'R&D as % of total: 21.3%. Higher ratio typical for software companies.', reasoning: 'Software companies often have R&D as a large portion of expenditure due to high staff costs. This ratio is within norms.', regulatoryRef: 'CTA 2009 s1052', confidence: 0.96 },
      { id: 'rev4-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'pass', summary: 'Staff-heavy cost profile is typical for software R&D.', evidence: 'Staff: 85%, Subcontractors: 8%, Software/Cloud: 7%.', reasoning: 'Software R&D is almost entirely staff costs. This breakdown is textbook.', regulatoryRef: 'CIRD82000', confidence: 0.95 },
      { id: 'rev4-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass', summary: 'No grants or subsidies found.', evidence: 'No grant income disclosed. No Innovate UK records.', reasoning: 'Clean check.', regulatoryRef: 'CTA 2009 s1112G', confidence: 0.94 },
    ],
  },
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
    routingReason: 'One minor warning about subcontractor cost ratio. Otherwise clean — ready for partner review.',
    checks: [
      { id: 'rev5-1', category: 'company', name: 'Company name present & CH match', result: 'pass', summary: 'Company name "Helix BioSciences Ltd" matches Companies House record.', evidence: 'Exact match for company number 10572839.', reasoning: 'Direct match confirmed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev5-2', category: 'company', name: 'Company number present & valid', result: 'pass', summary: 'Company number 10572839 is valid and active.', evidence: 'CH confirms active registration.', reasoning: 'Standard validation passed.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.99 },
      { id: 'rev5-3', category: 'company', name: 'SIC codes present & plausible for R&D', result: 'pass', summary: 'SIC 72190 (Other R&D on natural sciences) is strongly indicative of R&D activity.', evidence: 'Clinical research is core R&D activity.', reasoning: 'SIC code is in the R&D classification itself. No further review needed.', regulatoryRef: 'CIRD81400', confidence: 0.98 },
      { id: 'rev5-4', category: 'company', name: 'Accounting period(s) valid', result: 'pass', summary: 'Period 1 Jan 2025 – 31 Dec 2025. Valid 12-month period.', evidence: 'Standard calendar year period. Consistent with prior years.', reasoning: 'No issues.', regulatoryRef: 'FA 1998 Sch 18 para 3', confidence: 0.99 },
      { id: 'rev5-5', category: 'company', name: 'Going concern & CH status', result: 'pass', summary: 'Company is active on Companies House.', evidence: 'CH status: Active. No adverse filings.', reasoning: 'Clean status check.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev5-6', category: 'company', name: 'Currently trading & not dormant', result: 'pass', summary: 'Company is actively trading with £3.2m turnover.', evidence: 'Revenue from clinical research contracts. 38 employees.', reasoning: 'Active trading confirmed.', regulatoryRef: 'CTA 2009 s1042', confidence: 0.99 },
      { id: 'rev5-7', category: 'company', name: 'R&D relates to claimant\'s trade', result: 'pass', summary: 'All R&D projects are clinical research activities directly within the company\'s trade.', evidence: 'Projects: novel biomarker assay development, Phase II trial protocol optimisation.', reasoning: 'Both projects are core to the company\'s clinical research trade. Strong technological uncertainty demonstrated.', regulatoryRef: 'CTA 2009 s1044', confidence: 0.96 },
      { id: 'rev5-8', category: 'financials', name: 'R&D expenditure < total company expenditure', result: 'pass', summary: 'R&D expenditure (£580K) is within total expenditure (£2.9m).', evidence: 'R&D as % of total: 20%. Typical for biotech.', reasoning: 'Reasonable ratio for a research-focused company.', regulatoryRef: 'CTA 2009 s1052', confidence: 0.97 },
      { id: 'rev5-9', category: 'financials', name: 'Expenditure categories within bounds', result: 'warning', summary: 'Subcontractor costs at 45% are above the 65% cap for connected parties — verify independence.', evidence: 'Staff: 40%, Subcontractors: 45% (ClinRes Partners Ltd: £180K, BioAssay Solutions: £82K), Consumables: 15%.', reasoning: 'Subcontractor costs are high. Under the merged scheme, unconnected subcontractors are capped at 65% of the payment. Need to verify ClinRes Partners is not a connected party, as this would reduce the qualifying amount.', regulatoryRef: 'CIRD82000', suggestedFix: 'Confirm ClinRes Partners Ltd and BioAssay Solutions are unconnected parties. If connected, adjust qualifying expenditure to 65% of subcontractor payments.', confidence: 0.78 },
      { id: 'rev5-10', category: 'financials', name: 'No public grants/subsidies detected', result: 'pass', summary: 'No grants or subsidies identified.', evidence: 'No grant income in accounts. No UKRI or Innovate UK awards found.', reasoning: 'Clean check. No subsidised expenditure adjustments required.', regulatoryRef: 'CTA 2009 s1112G', confidence: 0.91 },
    ],
  },
]
