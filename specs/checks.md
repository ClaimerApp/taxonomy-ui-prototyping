## Checks → File Reviews

### Purpose

File Reviews provide automated quality and risk checks on **artefacts produced by the firm** before they are sent to clients, regulators, or other external parties.

Where **Signals** surface important events or insights across the firm’s data, **File Reviews** operate directly on the **files and artefacts that leave the firm**, acting as an AI reviewer that verifies accuracy, consistency, and compliance before submission.

This ensures that important issues are detected **before work leaves the firm**, reducing risk, preventing errors, and increasing confidence in deliverables.

This capability sits under the **Checks** section of the application.

---

# Concept

Professional work ultimately produces **artefacts**:

* Reports
* Spreadsheets
* Emails
* Filing documents
* Attachments

These artefacts represent the **final output of a job** and are therefore the primary point of risk.

File Reviews attach checks to these artefacts rather than abstract concepts such as “a claim” or “an engagement”.

Example:

```
R&D Claim
   ├ Technical Report.pdf
   ├ Financial Breakdown.xlsx
   ├ AIF submission
   └ Client email
```

Each artefact may have **multiple checks applied to it**.

Example:

```
Technical Report.pdf

✓ Legislative reference check
✓ Internal consistency check
⚠ Subcontractor eligibility issue
✓ Financial reconciliation
```

This model aligns with how advisors naturally think:

> “Check the report before sending.”

Rather than:

> “Validate the conceptual claim.”

---

# Location in Product

Navigation:

```
Signals
Checks
   ├ File Reviews
Clients
Sources
```

The **File Reviews** section lists files that have been analysed and the checks applied to them.

---

# Core Capabilities

## 1. Automatic File Detection

Files are automatically detected from connected sources such as:

* Email attachments
* Document storage systems
* Practice management systems
* Local file uploads
* Generated reports

Supported file types include:

* PDF
* Word documents
* Excel spreadsheets
* Email bodies
* Filing documents

When a file appears, Taxonomy automatically runs relevant checks based on the **file type**.

---

# 2. Multi-Check Framework

Each file can have **multiple checks applied simultaneously**.

Checks are grouped by the file they apply to.

Example UI:

```
Technical Report.pdf

4 checks completed

✓ Structure check
✓ Legislative references valid
⚠ Subcontractor eligibility unclear
✓ Financial summary reconciles with spreadsheet
```

Checks are modular and can be expanded over time.

---

# 3. File-Type Specific Checks

Different artefact types support different checks.

## Reports (Word / PDF)

Examples:

* Legislative reference validation
* Claim wording review
* Narrative plausibility analysis
* Internal consistency checks
* Cross-reference validation
* Risky or unsupported statements

---

## Financial Spreadsheets

Examples:

* Cost categorisation validation
* Totals reconciliation
* Financial threshold checks
* Cost eligibility analysis
* Spreadsheet structure validation

---

## Emails

Examples:

* Risky claim statements
* Incorrect regulatory claims
* Missing attachments referenced in the email
* Tone or communication risk
* Client question detection

---

## Filing Documents

Examples:

* Missing required fields
* Filing inconsistency checks
* Claim threshold validation
* CNF / AIF requirement detection

---

# 4. Check Results

Each check produces one of three results:

| Status   | Meaning                  |
| -------- | ------------------------ |
| Pass     | No issues detected       |
| Warning  | Potential issue detected |
| Critical | High-risk issue detected |

Example:

```
Financial Breakdown.xlsx

✓ Totals reconciliation
⚠ Cost categorisation unusual
✖ SME threshold likely exceeded
```

Users can expand each issue to see:

* explanation of the issue
* evidence from the file
* relevant regulatory reference
* suggested fix where applicable

---

# 5. Suggested Fixes

Where possible, Taxonomy proposes corrective actions.

Example:

```
Issue detected:
Subcontractor cost eligibility unclear.

Suggested fix:
Review subcontractor classification under SME scheme rules.
```

Future iterations may allow **one-click fixes or edits** where appropriate.

---

# 6. Manual Review

Users can manually run checks on any file.

Examples:

```
Check this document
Review before sending
```

Manual checks increase trust in the system and allow advisors to use the tool **on demand**.

---

# 7. Background Reviews

Checks may also run automatically when:

* files are uploaded
* documents are created
* emails are drafted
* attachments are added

This ensures issues are detected **without requiring user intervention**.

---

# 8. Review Timeline

The File Reviews page shows a timeline of recently checked artefacts.

Example:

```
Recent Reviews

Technical Report.pdf
4 checks completed
1 issue detected

Client Email
3 checks completed
No issues detected

Financial Breakdown.xlsx
3 checks completed
1 warning
```

Users can click any file to see detailed review results.

---

# 9. Relationship to Signals

Signals and Checks serve different purposes.

| Signals                         | Checks                                   |
| ------------------------------- | ---------------------------------------- |
| Detect important events         | Review artefacts before sending          |
| Surface opportunities and risks | Prevent mistakes                         |
| Triggered by data changes       | Triggered by file creation or submission |

Example:

Signal:

```
Client accounting period changed
```

Check:

```
R&D report contains claim inconsistent with new accounting period
```

Signals provide **awareness**, while Checks provide **quality control**.

---

# Future Extensions

Potential future capabilities include:

### Workflow Interceptors

Checks triggered directly inside tools such as:

* email clients
* document editors
* filing software

Example:

```
Before sending this email:
1 issue detected
```

---

### Portfolio-Level Review

Aggregate view of files requiring attention.

Example:

```
3 reports contain warnings
2 filings require review
```

---

### Custom Firm Checks

Firms may configure checks aligned to their methodology, risk tolerance, or advisory approach.

---

# Summary

File Reviews provide an automated quality assurance layer across the firm’s deliverables.

By attaching checks directly to the **artefacts produced by advisory work**, Taxonomy can detect issues exactly where risk occurs: in the documents, emails, and filings that leave the firm.

This transforms Checks into a continuous **AI review system for professional work**, helping advisors catch issues before they reach clients or regulators.
