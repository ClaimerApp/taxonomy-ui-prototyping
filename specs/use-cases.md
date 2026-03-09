# question

Help me by thinking of specific use cases within the UK R&D tax advisory industry for us to proactively notify advisors of risks and possible opportunities that could exist within email (the body and attachments within email) and Companies House, and potentially other sources of information—but primarily those two to start with?

Ordered from most valuable to least valuable. This can be sourced from public and private, but more angled towards how we can combine the two to maximise value, in the context of 'tax/legislation intelligence'.

Utilising private data from emails and the attachments within those, which may contain engagement/transmittal letters, HMRC inquiry letters and correspondence, financial documents such as general ledgers, nominal ledgers, payroll information, accounts information, tax computations and tax returns that are management accounts rather than public filleted accounts, submission confirmations/references from filings such as Additional Information Form and Claim Notification Form filings, AML requests/responses (anti-money laundering for onboarding), R&D tax reports that contain financial information of the R&D claim and technical narratives that vindicate the R&D work, client approvals of work.

Examples: a reminder that a response is due to an HMRC caseworker next Friday, proactive determination of whether a Claim Notification is required for prospects/clients and alerting to upcoming deadlines if they do, group structure changes and how this might affect specific clients, threshold changes and applying this to specific clients.

# answer

This is a great exercise — mapping Taxonomy's intelligence layer onto the specific data flows in R&D tax advisory. Let me think through this carefully, combining the private email/attachment data with Companies House and regulatory sources to surface genuinely high-value proactive alerts.

Here are the use cases, ordered by value:

1. HMRC Inquiry Response Deadline Tracking

When an HMRC inquiry letter arrives via email, Taxonomy extracts the caseworker name, reference, and — critically — the response deadline. It then monitors for whether a response has been sent. If the deadline is approaching and no outbound correspondence to HMRC is detected, the advisor gets a push alert. This is the highest-value use case because missing an HMRC deadline can result in a determination being issued against the client, potentially wiping out the entire claim. The data is entirely within the email corpus and requires no external source, making it immediately implementable.

2. Claim Notification Form (CNF) Deadline Detection for New and Existing Clients

By cross-referencing a client's accounting period end date (from engagement letters, accounts, or prior filings) against the CNF deadline rules (6 months after period end for first-time or lapsed claimants), Taxonomy can proactively determine whether a CNF is required and when. For prospects in the pipeline — where engagement letters or initial emails reveal accounting dates — this becomes particularly powerful: the advisor gets alerted before they've even won the client that there's a ticking clock. Combine with Companies House data to pull accounting reference dates for any company being discussed in email, even if the firm doesn't yet hold the financial records.

3. Additional Information Form (AIF) Filing Compliance Tracking

Similar to the CNF, but tracking whether an AIF has been submitted alongside or ahead of the CT600 claim. Taxonomy can detect submission confirmation references in emails and cross-reference against known filing dates. If a claim is being prepared (evidenced by draft R&D reports circulating in email) but no AIF confirmation has been detected and the CT600 filing window is closing, the advisor is alerted. Missing the AIF renders the entire R&D claim invalid, so the stakes are existential for the claim value.

4. Accounting Period and Filing Deadline Monitoring via Companies House

Companies House publishes accounting reference dates and confirmation statement deadlines. By monitoring these against the firm's client list (extracted from engagement letters and email correspondences), Taxonomy can flag upcoming filing deadlines even when the advisor hasn't diarised them. More interestingly, if Companies House shows a client has changed their accounting reference date, Taxonomy can alert the advisor that this may affect the R&D claim period, the CNF deadline, and potentially the RDEC/SME scheme eligibility thresholds for that period.

5. Group Structure Changes Affecting SME Scheme Eligibility

This is where cross-referencing becomes transformative. Companies House filings reveal changes in shareholding, new subsidiary incorporations, or changes in PSC (Persons with Significant Control) records. If a client's group structure changes — say a new parent company acquires a majority stake — this could push them from SME to large company status, disqualifying them from the SME R&D scheme and requiring a switch to RDEC. Taxonomy detects the Companies House change, cross-references against the client's last known headcount and financial thresholds (from accounts or management accounts in emails), and alerts the advisor that scheme eligibility needs urgent review.

6. Threshold Breach Detection Against Budget/Legislative Changes

When HMRC or the government announces changes to R&D scheme thresholds (e.g., the merged scheme introduction, intensity threshold changes, subcontractor cost caps), Taxonomy can immediately cross-reference these against every client's financial profile from management accounts, general ledgers, and prior R&D reports in the email archive. Rather than the advisor manually reviewing their entire book of business against new rules, they receive a prioritised list of clients likely affected, with the specific financials that trigger the concern.

7. Subcontractor and Third-Party Cost Cap Monitoring

R&D reports and financial breakdowns in email attachments contain itemised subcontractor costs. When legislative changes alter the treatment of externally provided workers or subcontractor costs (as happened with the merged scheme), Taxonomy can identify which clients have significant subcontractor spend that would be affected, quantify the potential claim impact, and alert the advisor to re-scope those claims proactively.

8. Client Company Dissolution or Strike-Off Risk Detection

Companies House publishes gazette notices for companies facing strike-off. If a client company appears on a strike-off notice, the advisor needs to know immediately — there may be outstanding R&D claims that need filing before dissolution, or the client may need to object to the strike-off. This is a time-critical alert where the public data from Companies House, matched against the firm's client list from email, creates immediate actionable value.

9. Director/Officer Changes Signalling Engagement Risk

Companies House filings show director appointments and resignations. If the key contact at a client company — the person who signed the engagement letter, or who has been the primary correspondent — resigns as a director, that's a signal the advisor should reach out. There may be continuity risk for the engagement, or the departing director may be starting a new venture that represents a new business opportunity.

10. Prospect Intelligence from Companies House + Email Pipeline

When a prospect is in the pipeline (evidenced by introductory emails, proposals, or engagement letters being drafted), Taxonomy can automatically pull their Companies House profile to enrich the advisor's understanding: SIC codes revealing qualifying R&D activity sectors, financial history indicating claim size potential, group structures that affect scheme eligibility, and recent filings that might flag complexity. This turns every prospect conversation into a better-informed one, without the advisor doing manual research.

11. Prior Year Claim Opportunity Detection

By analysing a new client's financial history from Companies House (filed accounts going back several years) against the two-year amendment window for CT600s, Taxonomy can flag whether prior-year R&D claims might be viable. If management accounts or general ledgers in early engagement emails show qualifying expenditure patterns in previous periods, the advisor is alerted to a potential revenue opportunity they might otherwise only discover weeks into the engagement.

12. AML/Onboarding Completion Tracking

Engagement can't formally begin until AML checks are complete. Taxonomy can track whether AML request emails have been sent, whether responses and documentation have been received, and flag clients where onboarding has stalled. This is lower value per alert but high volume, and prevents the common situation where a signed engagement sits idle because AML documentation was never chased.

13. R&D Report Approval Chasing

When a draft R&D report is sent to a client for approval, Taxonomy tracks whether an approval response has been received. If the approval is outstanding and the filing deadline is approaching, the advisor is alerted to chase. Again, lower individual value but operationally important and easy to detect from email flow patterns.

14. Engagement Letter Renewal and Scope Monitoring

Taxonomy can detect when engagement letters are approaching their renewal dates, or when the scope of work described in the original engagement no longer matches the activity being performed (e.g., the firm is now handling HMRC inquiries for a client whose engagement letter only covers claim preparation). This surfaces both compliance risk and revenue opportunity — the chance to formalise and bill for expanded scope.

The through-line across all of these is that the most valuable use cases combine time-sensitivity with cross-source intelligence. The HMRC deadline cases are valuable because the consequences of missing them are severe and the data lives entirely in email. The Companies House cases become powerful when they're matched against the private client context — a group structure change is just a filing until you connect it to a specific client's SME scheme eligibility. That cross-referencing is exactly the capability gap you're describing in the vision document, and it's where a pure chatbot or dashboard approach falls apart.

# question

what about more internal facing things - e.g. clients that asked questions that do not have a reply, or something like that? Obviously want to avoid too many false positives but feels like that could be valuable

# answer
Good instinct — and you're right that the false positive risk is the main design challenge here, not the detection itself. The trick is being selective about which internal signals are high-confidence enough to act on. Here are the ones I think hold up, ordered by value:

1. Unanswered Client Questions with Aging Detection

This is the most obvious one but needs careful scoping to avoid noise. The highest-confidence version isn't "any email without a reply" — it's specifically detecting emails where the client has asked a direct question (identifiable through question marks, request language, or explicit asks like "can you confirm" / "please advise") and where no outbound response from anyone at the firm has been sent to that client within a configurable window. The value is reputational — a client chasing for a response they never got is a relationship-damaging moment. The key to avoiding false positives is threading: only flag when no one at the firm has replied to that thread or sent a separate email to that client addressing the topic. You'd also want to suppress alerts where the question was trivially administrative versus substantively advisory.

2. Stalled Engagements — Work That's Gone Quiet

Where an engagement is clearly active (signed engagement letter, AML completed, initial data requested) but all email activity with that client has dropped off for an unusual period. This detects the situation every practice manager dreads: work that's fallen between the cracks because the advisor got busy with other clients. The signal is the absence of communication relative to the expected cadence for the stage of the engagement. A client who sent their general ledger three weeks ago and hasn't heard back is a much higher-priority flag than one where the firm is waiting on the client.

3. Client Data Received but Not Actioned

A more specific variant of stalled engagements. The client has sent attachments — general ledgers, payroll data, management accounts — but no outbound activity suggests the work has started. This is detectable by looking for inbound emails with financial document attachments where no subsequent internal or external correspondence references that data. This is particularly valuable around peak periods when data arrives faster than advisors can process it, and things get buried.

4. Internal Commitments Not Followed Through

When an advisor emails a client saying "I'll get back to you by Friday" or "we'll send the report next week" and no corresponding outbound delivery is detected within that timeframe. This requires natural language understanding of commitment language and date references, but it's a high-value signal because it catches broken promises before the client has to chase. The false positive risk is manageable because you're looking for a very specific pattern: explicit time-bound commitment + no matching delivery.

5. Fee Proposal Sent but No Follow-Up

When a proposal or fee quote has been sent to a prospect or client and no response has been received within a reasonable window, and — critically — no one at the firm has followed up. This surfaces both business development pipeline leakage and the common scenario where an advisor assumes silence means disinterest, when actually the email just got buried on the client's side.

6. HMRC Correspondence Received but Not Circulated Internally

When an email containing HMRC correspondence (inquiry letters, information notices, determination letters) is received by one person at the firm but hasn't been forwarded to or discussed with the relevant engagement lead or tax manager. This catches the dangerous scenario where a junior team member receives something critical and it sits in their inbox. The detection pattern is: HMRC-related content identified + no internal forwarding or discussion thread within a short window.

7. Client Approval Bottlenecks Across the Book

A portfolio-level view rather than individual alerts: which clients currently have outstanding approvals, ranked by how long they've been waiting and how close the filing deadline is. This gives practice managers a dashboard-style signal but delivered proactively — "you have 7 clients with R&D reports awaiting approval, 2 of which have filing deadlines within 30 days." The value is in the aggregation and prioritisation, not any single alert.

8. Duplicate or Conflicting Advice Detection

Where multiple advisors at the firm have communicated with the same client or about the same topic, and the advice or information given appears inconsistent. This is harder to implement well but extremely valuable at larger firms — it catches the scenario where one advisor tells the client their subcontractor costs qualify while another is preparing the claim on a different basis. The signal is multiple outbound threads to the same client from different team members covering overlapping subject matter.

9. Scope Creep Without Fee Adjustment

When the volume or complexity of correspondence with a client has materially increased relative to the original engagement scope — for instance, the firm is now handling an HMRC inquiry that wasn't in the original engagement letter — but no updated fee proposal or scope amendment has been sent. This surfaces revenue leakage from work being done but not billed.

10. Knowledge Sharing Gaps — Repeated Research

When multiple advisors across the firm are separately researching or answering the same technical question (e.g., treatment of cloud computing costs under the merged scheme) without awareness of each other's work. Taxonomy could detect when outbound emails to different clients contain substantially similar technical advice, suggesting the firm would benefit from an internal briefing note or template rather than each advisor reinventing the wheel.

You're right to flag the false positive concern. The design principle I'd suggest is that every internal-facing alert should have a confidence threshold based on the severity of the consequence. Missed HMRC correspondence getting a low threshold (better to over-alert), while unanswered general questions getting a higher one (only flag when it's clearly a substantive question that's been sitting for several days). The advisor should also be able to dismiss alerts with a single click and Taxonomy should learn from dismissal patterns to calibrate over time.

The other thing worth noting is that many of these internal signals become significantly more valuable when combined with the external intelligence from the first list. A stalled engagement is one thing; a stalled engagement where Companies House shows the client's accounting reference date is 6 weeks away and a CNF deadline is looming is a completely different level of urgency.

