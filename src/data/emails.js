export const emails = [
  {
    id: 'email-8',
    from: { name: 'Atlas Checks', email: 'checks@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: 'Nexagen Ltd — R&D Tax Report Checker: 2 issues, correction needed',
    date: '2026-03-08T09:35:00Z',
    read: false,
    starred: false,
    isAtlas: true,
    type: 'check',
    preview: '2 critical issues found in R&D_Tax_Claim_FY2025.pdf. Company number auto-corrected. Expenditure mismatch requires attention...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">Checks Report</span>
  </div>
  <div style="padding: 24px 32px;">

    <div style="font-size: 13px; color: #6B6058; line-height: 1.5; margin-bottom: 20px;">
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div><span style="color: #9A8E7E; font-size: 11px;">FILE</span><br/><strong style="color: #1A1412;">R&D_Tax_Claim_FY2025.pdf</strong></div>
        <div><span style="color: #9A8E7E; font-size: 11px;">SUBMITTED BY</span><br/><strong style="color: #1A1412;">Sophie Clark</strong></div>
        <div><span style="color: #9A8E7E; font-size: 11px;">CHECKED</span><br/><strong style="color: #1A1412;">8 Mar 2026, 09:32</strong></div>
      </div>
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

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Company Name Present & CH Match</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fecaca; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #dc2626; font-size: 15px;">✖</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Company Number Present & Valid</span>
          <span style="background: #e8d5f5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500; background: #d1fae5;">auto-corrected</span>
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

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">SIC Codes Present & Plausible for R&D</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Accounting Period(s) Valid</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Going Concern & CH Status</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Currently Trading & Not Dormant</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #fde68a; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #d97706; font-size: 15px;">⚠</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">R&D Relates to Claimant's Trade</span>
          <span style="background: #ffedd5; color: #9a3412; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 600;">warning</span>
        </div>
        <div style="font-size: 12px; color: #6B6058; padding-left: 23px; margin-bottom: 6px;">One project description lacks explicit link to the company's trade.</div>
        <div style="background: #FFFBF5; border: 1px solid #E8E0D4; border-radius: 8px; padding: 8px 12px; font-size: 12px; margin-left: 23px; color: #6B6058;">Suggested fix: Strengthen the narrative for Project 3 (AI-assisted literature review tool) to explicitly explain how it advances the company's drug discovery trade.</div>
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

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">Expenditure Categories Within Bounds</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>

      <a href="#/app/checks/rev-1" style="display: block; background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; text-decoration: none; color: inherit;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #16a34a; font-size: 15px;">✓</span>
          <span style="font-size: 13px; font-weight: 500; color: #1A1412; flex: 1;">No Public Grants/Subsidies Detected</span>
          <span style="background: #d1fae5; color: #065f46; font-size: 11px; padding: 2px 8px; border-radius: 99px; font-weight: 500;">pass</span>
        </div>
      </a>
    </div>

    <div style="text-align: center; padding: 8px 0 16px;">
      <a href="#/app/checks/rev-1" style="display: inline-block; background: #c9a84c; color: #FFFBF5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View full report in Atlas →</a>
    </div>
  </div>
  <div style="padding: 16px 32px; border-top: 1px solid #E8E0D4; text-align: center;">
    <span style="font-size: 11px; color: #9A8E7E;">Atlas — Tax Advisory Intelligence</span>
  </div>
</div>`,
  },
  {
    id: 'email-1',
    from: { name: 'Atlas Signals', email: 'noreply@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: '2 Critical Alerts, 1 Opportunity · 8 March 2026',
    date: '2026-03-08T07:00:00Z',
    read: false,
    starred: true,
    isAtlas: true,
    type: 'digest',
    preview: '3 new signals detected: HMRC inquiry overdue, CNF deadline approaching, prior year claim opportunity...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">Daily Digest</span>
  </div>
  <div style="padding: 24px 32px;">
    <p style="color: #6B6058; font-size: 15px; margin: 0 0 24px 0;">Good morning, here are your top signals for today.</p>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #e53935; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #b71c1c; color: #ef9a9a; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">CRITICAL</span>
        <span style="color: #9A8E7E; font-size: 12px;">30-day deadline expires Friday</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">HMRC Inquiry Response Overdue — Nexagen Ltd</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Nexagen Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">HMRC caseworker requested additional documentation for 2023 R&D claim. 30-day response window expires this Friday. No outbound correspondence detected.</div>
      <a href="#/app/signals/sig-1" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #e53935; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #b71c1c; color: #ef9a9a; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">CRITICAL</span>
        <span style="color: #9A8E7E; font-size: 12px;">18 days remaining</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">CNF Deadline in 18 Days — Prospect: Arcline Robotics Ltd</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Arcline Robotics Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">First R&D claim — Claim Notification Form must be filed by 31 March 2026. No CNF submission detected.</div>
      <a href="#/app/signals/sig-2" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #c9a84c; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #1b5e20; color: #a5d6a7; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">OPPORTUNITY</span>
        <span style="color: #9A8E7E; font-size: 12px;">High confidence</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Prior Year Claim Opportunity — Meridian Software Ltd</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Meridian Software Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">£285K and £340K capitalised dev costs in FY2024 and FY2025 with no R&D credit claimed. 2024 still within amendment window until 31 March 2026.</div>
      <a href="#/app/signals/sig-4" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="text-align: center; padding: 16px 0 8px;">
      <a href="#/app/signals" style="color: #c9a84c; font-size: 14px; text-decoration: none; font-weight: 600;">View all signals in Atlas →</a>
    </div>
  </div>
  <div style="padding: 16px 32px; border-top: 1px solid #E8E0D4; text-align: center;">
    <span style="font-size: 11px; color: #9A8E7E;">Atlas — Tax Advisory Intelligence</span>
  </div>
</div>`,
  },
  {
    id: 'email-2',
    from: { name: 'Atlas Alerts', email: 'alerts@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: '\u{1F6A8} URGENT: HMRC Inquiry Overdue — Nexagen Ltd',
    date: '2026-03-07T16:30:00Z',
    read: false,
    starred: true,
    isAtlas: true,
    type: 'alert',
    preview: 'Immediate attention required: HMRC 30-day response window expires Friday 7 March...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #b71c1c, #e53935); padding: 20px 32px; text-align: center;">
    <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: 2px; margin-bottom: 4px;">ATLAS ALERT</div>
    <div style="font-size: 20px; font-weight: 700; color: #fff;">Immediate Attention Required</div>
  </div>
  <div style="padding: 24px 32px;">
    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 17px; font-weight: 600; color: #1A1412; margin-bottom: 8px;">HMRC Inquiry Response Overdue — Nexagen Ltd</div>
      <div style="font-size: 14px; color: #B8941E; margin-bottom: 16px;">Nexagen Ltd</div>
      <div style="display: flex; gap: 24px; margin-bottom: 16px;">
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">DEADLINE</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">Friday 7 March 2026</div>
        </div>
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">DAYS REMAINING</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">0 — expires today</div>
        </div>
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">RISK</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">£300 + £60/day penalty</div>
        </div>
      </div>
      <div style="font-size: 13px; color: #6B6058; line-height: 1.5;">
        <p style="margin: 0 0 8px 0;">HMRC caseworker Sarah Mitchell requested additional documentation for the Nexagen Ltd 2023 R&D claim (ref: CT/RD/2024/00847). The <strong style="color: #e53935;">30-day response window expires this Friday</strong>.</p>
        <p style="margin: 0 0 8px 0;">No outbound correspondence to HMRC or to the client has been detected since the inquiry letter was received on 5 February.</p>
        <p style="margin: 0;"><strong style="color: #1A1412;">Penalty risk:</strong> Failure to respond may result in a £300 initial penalty plus £60/day thereafter (FA 2004 Sch 24).</p>
      </div>
    </div>
    <div style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
      <div style="font-size: 12px; color: #9A8E7E; margin-bottom: 8px; font-weight: 600;">RECOMMENDED ACTION</div>
      <div style="font-size: 13px; color: #6B6058;">Draft response reminder to advisor immediately. Review original inquiry letter and open client timeline.</div>
    </div>
    <div style="text-align: center;">
      <a href="#/app/signals/sig-1" style="display: inline-block; background: #c9a84c; color: #FFFBF5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>
  </div>
  <div style="padding: 16px 32px; border-top: 1px solid #E8E0D4; text-align: center;">
    <span style="font-size: 11px; color: #9A8E7E;">Atlas — Tax Advisory Intelligence</span>
  </div>
</div>`,
  },
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
  {
    id: 'email-7',
    from: { name: 'Atlas Signals', email: 'noreply@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: '1 Critical, 1 Info · 7 March 2026',
    date: '2026-03-07T07:00:00Z',
    read: true,
    starred: false,
    isAtlas: true,
    type: 'digest',
    preview: '2 new signals detected: Group structure change affecting Ferro Dynamics, stalled engagement at QuantumLeap AI...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">Daily Digest</span>
  </div>
  <div style="padding: 24px 32px;">
    <p style="color: #6B6058; font-size: 15px; margin: 0 0 24px 0;">Good morning, here are your top signals for today.</p>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #e53935; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #b71c1c; color: #ef9a9a; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">CRITICAL</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Group Structure Change May Affect SME Eligibility</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Ferro Dynamics Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">Vantage Holdings plc acquired 55% — combined group likely exceeds SME thresholds. Current claim prepared under merged scheme SME rate.</div>
      <a href="#/app/signals/sig-3" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #9E9E9E; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #424242; color: #BDBDBD; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">INFO</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Stalled Engagement — QuantumLeap AI</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">QuantumLeap AI Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">Client data received 14 Feb but no action taken in 19 days. Filing deadline YE 30 Sep 2025 is 30 Sep 2026.</div>
      <a href="#/app/signals/sig-7" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="text-align: center; padding: 16px 0 8px;">
      <a href="#/app/signals" style="color: #c9a84c; font-size: 14px; text-decoration: none; font-weight: 600;">View all signals in Atlas →</a>
    </div>
  </div>
  <div style="padding: 16px 32px; border-top: 1px solid #E8E0D4; text-align: center;">
    <span style="font-size: 11px; color: #9A8E7E;">Atlas — Tax Advisory Intelligence</span>
  </div>
</div>`,
  },
];

export const sentEmails = [
  {
    id: 'email-sent-1',
    from: { name: 'You', email: 'you@firm.co.uk', initials: 'YO' },
    to: 'view@atlas.claimer.com',
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
];
