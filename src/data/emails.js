// ──────────────────────────────────────────
// Atlas email header/footer HTML helpers
// ──────────────────────────────────────────
const emailHeader = (label) => `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">${label}</span>
  </div>
  <div style="padding: 24px 32px;">`

const emailFooter = `  </div>
  <div style="padding: 16px 32px; border-top: 1px solid #E8E0D4; text-align: center;">
    <span style="font-size: 11px; color: #9A8E7E;">Atlas — Tax Advisory Intelligence</span>
  </div>
</div>`

const fileMeta = `<div style="font-size: 13px; color: #6B6058; line-height: 1.5; margin-bottom: 20px;">
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div><span style="color: #9A8E7E; font-size: 11px;">FILE</span><br/><strong style="color: #1A1412;">R&D_Tax_Claim_FY2025.pdf</strong></div>
        <div><span style="color: #9A8E7E; font-size: 11px;">COMPANY</span><br/><strong style="color: #1A1412;">Nexagen Ltd</strong></div>
        <div><span style="color: #9A8E7E; font-size: 11px;">CHECKED</span><br/><strong style="color: #1A1412;">8 Mar 2026, 09:32</strong></div>
      </div>
    </div>`

// Reusable check row HTML
const checkPass = (name) => `<div style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">${name}</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </div>`

const checkPassLink = (name, href) => `<a href="${href}" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">${name}</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>`

// Rejection email building blocks
const rejectionParagraph = (text) => `<p style="font-size: 15px; color: #3C3636; line-height: 1.6; margin: 0 0 16px;">${text}</p>`

const rejectionInstructionCard = (heading, intro, items) => `<div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 16px 20px; margin: 0 0 20px;">
      <div style="font-size: 11px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 10px;">${heading}</div>
      <p style="font-size: 14px; color: #3C3636; line-height: 1.6; margin: 0 0 10px;">${intro}</p>
      <ul style="font-size: 14px; color: #3C3636; line-height: 1.8; margin: 0; padding-left: 22px; list-style-type: disc; list-style-position: outside;">
        ${items.map((item) => `<li style="padding-left: 4px;">${item}</li>`).join('\n        ')}
      </ul>
    </div>`

const rejectionSignOff = `<p style="font-size: 15px; color: #3C3636; line-height: 1.6; margin: 24px 0 0;">— The Atlas team</p>`

// ──────────────────────────────────────────
// Inbox emails
// ──────────────────────────────────────────
export const emails = [
  // ── Type 3: Full check report (most recent — user replied with files) ──
  {
    id: 'email-check-full',
    from: { name: 'Atlas Reviews', email: 'reviews@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: 'Nexagen Ltd — Full R&D Report Review: 2 issues, correction needed',
    date: '2026-03-08T11:15:00Z',
    read: false,
    starred: false,
    isAtlas: true,
    type: 'check',
    preview: 'Full review complete across 4 files. 2 critical issues found: company number mismatch (auto-corrected), expenditure exceeds total...',
    body: `${emailHeader('Full Review Report')}

    ${fileMeta}

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #065f46; margin-bottom: 20px;">
      <strong>Full report</strong> — cross-referenced against CT600, management accounts, and Companies House records.
    </div>

    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #16a34a;">7</div>
        <div style="font-size: 11px; color: #6B6058;">Passed</div>
      </div>
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #d97706;">1</div>
        <div style="font-size: 11px; color: #6B6058;">Warning</div>
      </div>
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #dc2626;">2</div>
        <div style="font-size: 11px; color: #6B6058;">Critical</div>
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 12px;">COMPANY DETAILS & STATUS</div>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fecaca; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #dc2626; font-size: 15px;">✖</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Company Number Present & Valid</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">auto-corrected</span>
          <span style="background: #fee2e2; color: #991b1b; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">critical</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; margin-bottom: 8px; padding-left: 23px;">Company number in report does not match Companies House record.</div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px;">
          <span style="color: #6B6058;">Corrected:</span>
          <span style="color: #dc2626; text-decoration: line-through; margin: 0 4px;">08451293</span>
          <span style="color: #9A8E7E;">→</span>
          <span style="color: #16a34a; font-weight: 600; margin-left: 4px;">08451923</span>
        </div>
      </a>

      ${checkPassLink('Company Name Present & CH Match', '#/app/checks/rev-1')}
      ${checkPassLink('SIC Codes Present & Plausible for R&D', '#/app/checks/rev-1')}
      ${checkPassLink('Accounting Period(s) Valid', '#/app/checks/rev-1')}
      ${checkPassLink('Going Concern & CH Status', '#/app/checks/rev-1')}
      ${checkPassLink('Currently Trading & Not Dormant', '#/app/checks/rev-1')}

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fde68a; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #d97706; font-size: 15px;">⚠</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">R&D Relates to Claimant's Trade</span>
          <span style="background: #ffedd5; color: #9a3412; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">warning</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; padding-left: 23px; margin-bottom: 6px;">One project description lacks explicit link to the company's trade.</div>
        <div style="background: #FFFBF5; border: 1px solid #E8E0D4; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px; color: #6B6058;">Suggested fix: Strengthen the narrative for Project 3 to explicitly explain how it advances the company's drug discovery trade.</div>
      </a>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 12px;">FINANCIALS</div>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fecaca; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #dc2626; font-size: 15px;">✖</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">R&D Expenditure &lt; Total Company Expenditure</span>
          <span style="background: #fee2e2; color: #991b1b; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">critical</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; padding-left: 23px; margin-bottom: 6px;">R&D claim (£412,000) exceeds total company expenditure (£380,000) by £32,000.</div>
        <div style="background: #FFFBF5; border: 1px solid #E8E0D4; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px; color: #6B6058;">Suggested fix: Reconcile R&D expenditure with accounts. Either reduce claim to within total expenditure or verify accounts are complete.</div>
      </a>

      ${checkPassLink('Expenditure Categories Within Bounds', '#/app/checks/rev-1')}
      ${checkPassLink('No Public Grants/Subsidies Detected', '#/app/checks/rev-1')}
    </div>

    <div style="text-align: center; padding: 8px 0 16px;">
      <a href="#/app/checks/rev-1" style="display: inline-block; background: #c9a84c; color: #FFFBF5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View full report in Atlas →</a>
    </div>

${emailFooter}`,
  },

  // ── Type 2: AIF basic checks — signed-up user, first time seeing file ──
  {
    id: 'email-check-basic',
    from: { name: 'Atlas Reviews', email: 'reviews@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: 'Nexagen Ltd — R&D Report: basic review complete',
    date: '2026-03-08T09:35:00Z',
    read: false,
    starred: false,
    isAtlas: true,
    type: 'check',
    preview: 'Basic review on R&D_Tax_Claim_FY2025.pdf. Company number mismatch found. Reply with additional files for a deeper report...',
    body: `${emailHeader('Basic Review')}

    ${fileMeta}

    <div style="background: #FFFFFF; border: 2px solid #c9a84c; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 8px;">Want a deeper review?</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 16px;">Reply to this email with any of the following files and we'll cross-reference them against your R&D report for a more comprehensive check:</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <span style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #3C3636; font-weight: 500;">CT600 Tax Return</span>
        <span style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #3C3636; font-weight: 500;">Tax computations</span>
        <span style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #3C3636; font-weight: 500;">Full Accounts</span>
        <span style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #3C3636; font-weight: 500;">Working papers / costings</span>
      </div>
    </div>

    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #16a34a;">5</div>
        <div style="font-size: 11px; color: #6B6058;">Passed</div>
      </div>
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #dc2626;">1</div>
        <div style="font-size: 11px; color: #6B6058;">Critical</div>
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 12px;">COMPANY DETAILS & STATUS</div>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fecaca; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #dc2626; font-size: 15px;">✖</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Company Number Present & Valid</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">auto-corrected</span>
          <span style="background: #fee2e2; color: #991b1b; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">critical</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; margin-bottom: 8px; padding-left: 23px;">Company number in report does not match Companies House record.</div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px;">
          <span style="color: #6B6058;">Corrected:</span>
          <span style="color: #dc2626; text-decoration: line-through; margin: 0 4px;">08451293</span>
          <span style="color: #9A8E7E;">→</span>
          <span style="color: #16a34a; font-weight: 600; margin-left: 4px;">08451923</span>
        </div>
      </a>

      ${checkPassLink('Company Name Present & CH Match', '#/app/checks/rev-1')}
      ${checkPassLink('SIC Codes Present & Plausible for R&D', '#/app/checks/rev-1')}
      ${checkPassLink('Accounting Period(s) Valid', '#/app/checks/rev-1')}
      ${checkPassLink('Going Concern & CH Status', '#/app/checks/rev-1')}
      ${checkPassLink('Currently Trading & Not Dormant', '#/app/checks/rev-1')}
    </div>

    <div style="text-align: center; padding: 4px 0 16px;">
      <a href="#/app/checks/rev-1" style="display: inline-block; background: #c9a84c; color: #FFFBF5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View basic report in Atlas →</a>
    </div>

${emailFooter}`,
  },

  // ── Type 1: AIF basic checks — non-signed-up user ──
  {
    id: 'email-check-aif',
    from: { name: 'Atlas Reviews', email: 'reviews@atlas.ai', initials: 'AT' },
    to: 'advisor@example.co.uk',
    subject: 'Nexagen Ltd — R&D Report Review: 1 issue found',
    date: '2026-03-08T09:35:00Z',
    read: false,
    starred: false,
    isAtlas: true,
    type: 'check',
    preview: 'We reviewed the R&D report submitted with the AIF for Nexagen Ltd. Company number mismatch detected...',
    body: `${emailHeader('Review Report')}

    ${fileMeta}

    <div style="background: linear-gradient(135deg, #1A1412, #3C3636); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 17px; font-weight: 600; color: #FFFBF5; margin-bottom: 8px;">Want a deeper review?</div>
      <div style="font-size: 13px; color: #C4B8A8; margin-bottom: 16px; line-height: 1.6;">Unlock more comprehensive financial cross-checks, expenditure analysis, scheme eligibility, and technical narrative review by signing up to Atlas.</div>
      <a href="#/mvp-onboarding/login?user=demo" style="display: inline-block; background: #FFC832; color: #1A1412; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">See the full report →</a>
      <div style="font-size: 11px; color: #E8DFCE; margin-top: 12px;">Free to use · Covered by your existing Claimer agreement · Takes 10 seconds</div>
    </div>

    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #16a34a;">5</div>
        <div style="font-size: 11px; color: #6B6058;">Passed</div>
      </div>
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 16px; text-align: center; flex: 1;">
        <div style="font-size: 20px; font-weight: 700; color: #dc2626;">1</div>
        <div style="font-size: 11px; color: #6B6058;">Critical</div>
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 12px;">COMPANY DETAILS & STATUS</div>

      <div style="display: block; background: #FFFFFF; border: 1px solid #fecaca; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #dc2626; font-size: 15px;">✖</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Company Number Present & Valid</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">auto-corrected</span>
          <span style="background: #fee2e2; color: #991b1b; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">critical</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; margin-bottom: 8px; padding-left: 23px;">Company number in report does not match Companies House record.</div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px;">
          <span style="color: #6B6058;">Corrected:</span>
          <span style="color: #dc2626; text-decoration: line-through; margin: 0 4px;">08451293</span>
          <span style="color: #9A8E7E;">→</span>
          <span style="color: #16a34a; font-weight: 600; margin-left: 4px;">08451923</span>
        </div>
      </div>

      ${checkPass('Company Name Present & CH Match')}
      ${checkPass('SIC Codes Present & Plausible for R&D')}
      ${checkPass('Accounting Period(s) Valid')}
      ${checkPass('Going Concern & CH Status')}
      ${checkPass('Currently Trading & Not Dormant')}
    </div>

${emailFooter}`,
  },

  // ── Type 5: Cold-submission rejection — supporting docs without R&D report (TAX-699) ──
  {
    id: 'email-rejection-supporting-docs',
    from: { name: 'Atlas Reviews', email: 'reviews@atlas.ai', initials: 'AT' },
    to: 'advisor@example.co.uk',
    subject: 'Unsuccessful submission',
    date: '2026-03-07T16:10:00Z',
    read: false,
    starred: false,
    isAtlas: true,
    type: 'rejection',
    preview: 'Sorry, your submission could not be processed for checks. We only received supporting documents; checks require the R&D report too...',
    body: `${emailHeader('Submission not processed')}

    ${rejectionParagraph('Hi {firstname},')}

    ${rejectionParagraph('Sorry, your submission could not be processed for checks.')}

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 18px 22px; margin: 0 0 20px;">
      <div style="font-size: 11px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 10px;">WHAT HAPPENED</div>
      <p style="font-size: 14px; color: #3C3636; line-height: 1.6; margin: 0 0 22px;"><strong style="font-weight: 600; color: #1A1412;">We only received supporting documents; checks require the R&D report too.</strong> The supporting documents on their own aren't enough for us to check anything.</p>

      <div style="font-size: 11px; font-weight: 600; color: #9A8E7E; letter-spacing: 1px; margin-bottom: 10px;">HOW TO FIX THIS</div>
      <p style="font-size: 14px; color: #3C3636; line-height: 1.6; margin: 0 0 10px;">Reply to this email and attach your R&D report alongside any supporting documents in a single email:</p>
      <ul style="font-size: 14px; color: #3C3636; line-height: 1.8; margin: 0; padding-left: 22px; list-style-type: disc; list-style-position: outside;">
        <li style="padding-left: 4px;">CT600 Tax Return (PDF)</li>
        <li style="padding-left: 4px;">Tax Computations (PDF)</li>
        <li style="padding-left: 4px;">Full Accounts (PDF)</li>
        <li style="padding-left: 4px;">Working papers/costings (Spreadsheet)</li>
      </ul>
    </div>

    ${rejectionParagraph('If you have any feedback or questions for us, please contact us via <a href="mailto:customer.support@claimer.com" style="color: #946B00;">customer.support@claimer.com</a>')}

    <p style="font-size: 15px; color: #3C3636; line-height: 1.6; margin: 24px 0 0;">Thanks,<br/>The Atlas Team</p>

${emailFooter}`,
    bodyPlaintext: `Hi {firstname},

Sorry, your submission could not be processed for checks.

WHAT HAPPENED
**We only received supporting documents; checks require the R&D report too.** The supporting documents on their own aren't enough for us to check anything.

HOW TO FIX THIS
Reply to this email and attach your R&D report alongside any supporting documents in a single email:

  * CT600 Tax Return (PDF)
  * Tax Computations (PDF)
  * Full Accounts (PDF)
  * Working papers/costings (Spreadsheet)

If you have any feedback or questions for us, please contact us via customer.support@claimer.com

Thanks,
The Atlas Team
`,
  },

  // ── Personal emails (unchanged) ──
  {
    id: 'email-3',
    from: { name: 'Lucy Harper', email: 'l.harper@whiteoakgroup.co.uk', initials: 'LH' },
    to: 'you@firm.co.uk',
    subject: 'RE: Year-end accounts timeline',
    date: '2026-03-07T14:20:00Z',
    read: true,
    starred: false,
    isAtlas: false,
    type: 'regular',
    preview: 'Hi, just wanted to check in on the timeline for the draft accounts...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; max-width: 600px;">
  <p>Hi,</p>
  <p>Just wanted to check in on the timeline for the draft accounts. Our year-end was 31 December and the board would ideally like to review the drafts before Easter if possible.</p>
  <p>We've uploaded everything to the shared folder — bank statements, purchase ledger, and the fixed asset register. Let me know if anything's missing.</p>
  <p>Also, could you confirm the filing deadline? I want to make sure we've got plenty of breathing room.</p>
  <p>Thanks,<br/>Lucy Harper<br/>Office Manager, White Oak Group Ltd</p>
</div>`,
  },
  {
    id: 'email-4',
    from: { name: 'Mark Ellis', email: 'm.ellis@smithandco.tax', initials: 'ME' },
    to: 'you@firm.co.uk',
    subject: 'FW: Team lunch Friday',
    date: '2026-03-07T11:05:00Z',
    read: true,
    starred: false,
    isAtlas: false,
    type: 'regular',
    preview: 'Hi all — just a reminder about the team lunch this Friday...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; max-width: 600px;">
  <p>Hi all,</p>
  <p>Just a reminder about the team lunch this Friday at 12:30. We've booked the usual place on King Street — the Thai restaurant.</p>
  <p>Please let me know by end of day Wednesday if you have any dietary requirements so I can update the booking. Last count we had 14 people confirmed.</p>
  <p>See you there!</p>
  <p>Cheers,<br/>Mark Ellis<br/>Senior Manager, Smith & Co Tax Advisors</p>
</div>`,
  },
  {
    id: 'email-5',
    from: { name: 'Priya Kapoor', email: 'p.kapoor@thorntonmfg.co.uk', initials: 'PK' },
    to: 'you@firm.co.uk',
    subject: 'VAT flat rate scheme query',
    date: '2026-03-06T10:30:00Z',
    read: true,
    starred: false,
    isAtlas: false,
    type: 'regular',
    preview: 'Hi — quick question about the flat rate scheme. We\'re wondering whether it still makes sense...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; max-width: 600px;">
  <p>Hi,</p>
  <p>Quick question about the VAT flat rate scheme. We've been on it for a couple of years now but our turnover has grown quite a bit and I'm wondering whether it still makes sense for us.</p>
  <p>Our annual turnover is around £420k and we spend roughly £85k on materials. Could you run the numbers and let us know if we'd be better off on standard VAT?</p>
  <p>No rush — just whenever you get a chance.</p>
  <p>Thanks,<br/>Priya Kapoor<br/>Finance Manager, Thornton Manufacturing Ltd</p>
</div>`,
  },
  {
    id: 'email-6',
    from: { name: 'Helen Cross', email: 'h.cross@smithandco.tax', initials: 'HC' },
    to: 'you@firm.co.uk',
    subject: 'Meeting notes — Q4 review',
    date: '2026-03-06T09:15:00Z',
    read: false,
    starred: false,
    isAtlas: false,
    type: 'regular',
    preview: 'Hi — attached are the meeting notes from yesterday\'s Q4 review. Key actions below...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; max-width: 600px;">
  <p>Hi,</p>
  <p>Attached are the meeting notes from yesterday's Q4 review. Key actions for our team:</p>
  <ul>
    <li>Finalise billing reconciliation for December — Margaret to complete by Friday</li>
    <li>Chase outstanding fee proposals for three new clients (see list in notes)</li>
    <li>Update the capacity planner ahead of busy season — I'll send the template round</li>
  </ul>
  <p>Next review meeting is booked for 2 April. Let me know if there's anything I've missed.</p>
  <p>Best,<br/>Helen Cross<br/>Partner, Smith & Co Tax Advisors</p>
</div>`,
  },
];

// ──────────────────────────────────────────
// Sent emails
// ──────────────────────────────────────────
export const sentEmails = [
  {
    id: 'email-sent-1',
    from: { name: 'You', email: 'you@firm.co.uk', initials: 'YO' },
    to: 'review@atlas.claimer.com',
    subject: '(no subject)',
    date: '2026-03-08T09:30:00Z',
    read: true,
    starred: false,
    isAtlas: false,
    type: 'sent',
    folder: 'sent',
    preview: '',
    attachments: [{ name: 'R&D_Tax_Claim_FY2025.pdf', size: '2.4 MB', type: 'pdf' }],
    body: '',
  },
  {
    id: 'email-sent-2',
    from: { name: 'You', email: 'you@firm.co.uk', initials: 'YO' },
    to: 'review@atlas.claimer.com',
    subject: 'RE: Nexagen Ltd — R&D Report: basic review complete',
    date: '2026-03-08T10:45:00Z',
    read: true,
    starred: false,
    isAtlas: false,
    type: 'sent',
    folder: 'sent',
    preview: 'Attaching the CT600, management accounts, and tax computations for the full check.',
    attachments: [
      { name: 'CT600_Nexagen_FY2025.pdf', size: '1.1 MB', type: 'pdf' },
      { name: 'Nexagen_Mgmt_Accounts_FY2025.pdf', size: '3.2 MB', type: 'pdf' },
      { name: 'Tax_Computations_FY2025.xlsx', size: '890 KB', type: 'xlsx' },
    ],
    body: '',
  },
];
