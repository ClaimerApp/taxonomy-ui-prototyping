# R&D Tax Report Checker — Implementation Spec

First concrete implementation of the Checks system (see `checks.md` for the general concept).

---

## Purpose

Auto-reviews R&D tax reports before they reach the partner, catching errors and suggesting corrections. Reduces partner time wasted reviewing poor junior work.

## Submission Flow

1. Junior emails report to `review@atlas.claimer.com`
2. System runs 10 automated checks
3. System decides routing: **back to junior** (critical issues) or **direct to partner** (clean/minor issues)
4. Result emailed back automatically; also appears in the Checks UI

---

## Data Model

### Checker

```
{ id, name, description, icon }
```

Single checker: "R&D Tax Report Checker"

### File Review

```
{ id, checkerId, fileName, fileType, entityId,
  submittedBy, submittedAt, reviewedAt,
  routing: 'back-to-junior' | 'direct-to-partner',
  routingReason,
  checks: [Check] }
```

### Check

```
{ id, category, name, result, summary, evidence, reasoning,
  regulatoryRef, suggestedFix, confidence,
  autoFixed?, originalValue?, correctedValue? }
```

- `result`: `pass` | `warning` | `critical`
- `confidence`: 0–1 float
- `autoFixed`: when true, shows before/after values with emerald badge

### Categories

- `company` — Company Details & Status (7 checks)
- `financials` — Financials (3 checks)

---

## 10 Checks

### Company Details & Status

1. **Company name present & CH match** — name in report vs Companies House
2. **Company number present & valid** — 8-digit format, CH lookup, correlates with name
3. **SIC codes present & plausible for R&D** — valid SIC, R&D probability assessment
4. **Accounting period(s) valid** — present, ≤12 months, consistent with prior filings
5. **Going concern & CH status** — active on CH, no insolvency/strike-off
6. **Currently trading & not dormant** — revenue reported, active payroll
7. **R&D relates to claimant's trade** — project descriptions linked to company's SIC activity

### Financials

8. **R&D expenditure < total company expenditure** — claim cannot exceed total opex
9. **Expenditure categories within bounds** — staff/subcontractor/consumables ratios vs sector norms
10. **No public grants/subsidies detected** — check Innovate UK, accounts notes

---

## Routing Logic

- Any **critical** result → `back-to-junior`
- All pass or warnings only → `direct-to-partner`

---

## Auto-Corrections

Some checks can auto-fix minor errors (e.g. company number typo, date format inconsistency). These show:
- Emerald "Auto-corrected" badge
- Before/after values inline

---

## Regulatory References Used

- CTA 2009 s1044, s1042, s1052, s1112G
- FA 1998 Sch 18 para 3
- CIRD81400, CIRD82000, CIRD191000

---

## UI Structure

### ChecksFeed (`/app/checks`)
- Page title "Checkers" + subtitle
- Email submission notice (review@atlas.claimer.com)
- `CheckerOverviewCard` — gold accent bar, shield icon, name, description, aggregate stat pills
- "Review Queue" — filters + staggered CheckRow list

### CheckRow
- Entity name heading, file name + type pill
- "Submitted by {name}" line
- Routing badge: red "Sent back for correction" / emerald "Direct to partner"
- Severity count badges + accent bar

### CheckDetail (`/app/checks/:id`)
- Back link "← Checkers"
- Routing info card (tinted red/emerald) with reason + submitter
- File info + entity link
- Checks grouped by category, collapsible headers showing "X/Y passed"
- Each check: expand/collapse with summary, evidence (gold border-l), reasoning (warmgrey border-l), regulatory ref, suggested fix, auto-correction display, confidence %

---

## Prototype Data

5 reviews across ent-1 through ent-5 with varied outcomes:

| Review | Entity | Critical | Warning | Routing |
|--------|--------|----------|---------|---------|
| rev-1 | Nexagen (ent-1) | 2 | 1 | back-to-junior |
| rev-2 | Arcline (ent-2) | 0 | 1 | direct-to-partner |
| rev-3 | Ferro (ent-3) | 1 | 2 | back-to-junior |
| rev-4 | Meridian (ent-4) | 0 | 0 | direct-to-partner |
| rev-5 | Helix (ent-5) | 0 | 1 | direct-to-partner |

Submitters: Sophie Clark, Tom Andrews.
Timestamps use `timeAgo()` helper relative to 2026-03-13.

---

## Files

- `src/data/checks.js` — `checkers`, `checkCategories`, `fileReviews`, `timeAgo()`
- `src/components/checks/CheckerOverviewCard.jsx` — checker summary card
- `src/components/checks/ChecksFeed.jsx` — landing page
- `src/components/checks/CheckRow.jsx` — list row
- `src/components/checks/CheckDetail.jsx` — detail view with grouped checks
- `src/components/checks/CheckFilters.jsx` — filter bar (All/Critical/Warnings/Passed)
