export const emails = [
  {
    id: 'email-1',
    from: { name: 'Atlas Signals', email: 'noreply@atlas.ai', initials: 'AT' },
    to: 'you@firm.co.uk',
    subject: 'Atlas — 1 Critical Alert, 2 Opportunities · 8 March 2026',
    date: '2026-03-08T07:00:00Z',
    read: false,
    starred: true,
    isAtlas: true,
    type: 'digest',
    preview: '3 new signals detected: R&D relief opportunity, HMRC deadline, grant eligibility...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">Daily Digest</span>
  </div>
  <div style="padding: 24px 32px;">
    <p style="color: #6B6058; font-size: 15px; margin: 0 0 24px 0;">Good morning, here are your signals for today.</p>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #c9a84c; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #1b5e20; color: #a5d6a7; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">OPPORTUNITY</span>
        <span style="color: #9A8E7E; font-size: 12px;">High confidence</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">R&D Tax Relief Opportunity Identified</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Alpha Robotics Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">£42k potential saving — qualifying R&D expenditure of £210k identified in latest accounts with no prior claims filed.</div>
      <a href="#/app/signals/sig-1" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #e53935; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #b71c1c; color: #ef9a9a; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">CRITICAL RISK</span>
        <span style="color: #9A8E7E; font-size: 12px;">Due 13 March</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">HMRC Inquiry — Response Deadline Critical</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Cobalt Engineering Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">s.9A inquiry response due Friday 13 March. Outstanding documentation required from client. Risk of HMRC determination — £85k additional tax.</div>
      <a href="#/app/signals/sig-9" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #c9a84c; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #1b5e20; color: #a5d6a7; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">OPPORTUNITY</span>
        <span style="color: #9A8E7E; font-size: 12px;">High confidence</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Innovate UK Grant Eligibility — Smart Grants Round 14</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">GreenGrid Energy Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">£150k grant — battery storage project aligns with Smart Grants Round 14 net zero criteria. Applications close 30 April 2026.</div>
      <a href="#/app/signals/sig-3" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
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
    subject: '🚨 URGENT: HMRC Inquiry Deadline — Cobalt Engineering',
    date: '2026-03-07T16:30:00Z',
    read: false,
    starred: true,
    isAtlas: true,
    type: 'alert',
    preview: 'Immediate attention required: HMRC s.9A response deadline is Friday 13 March...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #b71c1c, #e53935); padding: 20px 32px; text-align: center;">
    <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: 2px; margin-bottom: 4px;">ATLAS ALERT</div>
    <div style="font-size: 20px; font-weight: 700; color: #fff;">Immediate Attention Required</div>
  </div>
  <div style="padding: 24px 32px;">
    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 17px; font-weight: 600; color: #1A1412; margin-bottom: 8px;">HMRC Inquiry — Response Deadline Critical</div>
      <div style="font-size: 14px; color: #B8941E; margin-bottom: 16px;">Cobalt Engineering Ltd</div>
      <div style="display: flex; gap: 24px; margin-bottom: 16px;">
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">DEADLINE</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">Friday 13 March 2026</div>
        </div>
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">DAYS REMAINING</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">5 working days</div>
        </div>
        <div>
          <div style="font-size: 11px; color: #9A8E7E; margin-bottom: 2px;">RISK</div>
          <div style="font-size: 14px; color: #e53935; font-weight: 600;">£85k additional tax</div>
        </div>
      </div>
      <div style="font-size: 13px; color: #6B6058; line-height: 1.5;">
        <p style="margin: 0 0 8px 0;">Cobalt Engineering Ltd has an HMRC s.9A inquiry response due by <strong style="color: #e53935;">Friday 13 March 2026</strong>. Failure to respond will result in HMRC issuing a determination.</p>
        <p style="margin: 0 0 8px 0;"><strong style="color: #1A1412;">Outstanding items:</strong> Project technical narratives and time allocation records from Sarah Mitchell.</p>
        <p style="margin: 0;">Client last contacted 28 February — no response received in 7 days.</p>
      </div>
    </div>
    <div style="background: #F5F0E8; border: 1px solid #E8E0D4; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
      <div style="font-size: 12px; color: #9A8E7E; margin-bottom: 8px; font-weight: 600;">RECOMMENDED ACTION</div>
      <div style="font-size: 13px; color: #6B6058;">Escalate immediately. Contact Sarah Mitchell at Cobalt Engineering today to obtain outstanding documentation. Prepare draft response for review.</div>
    </div>
    <div style="text-align: center;">
      <a href="#/app/signals/sig-9" style="display: inline-block; background: #c9a84c; color: #FFFBF5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View in Atlas →</a>
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
    subject: 'Atlas — 2 Risks Detected · 7 March 2026',
    date: '2026-03-07T07:00:00Z',
    read: true,
    starred: false,
    isAtlas: true,
    type: 'digest',
    preview: '2 new signals detected: Filing inconsistency for Cobalt Engineering, Director change at Nexus Digital...',
    body: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; color: #3C3636; border-radius: 8px; overflow: hidden;">
  <div style="padding: 24px 32px; border-bottom: 3px solid #c9a84c;">
    <span style="font-size: 24px; font-weight: 700; color: #c9a84c; letter-spacing: 1px;">Atlas</span>
    <span style="font-size: 13px; color: #9A8E7E; margin-left: 12px;">Daily Digest</span>
  </div>
  <div style="padding: 24px 32px;">
    <p style="color: #6B6058; font-size: 15px; margin: 0 0 24px 0;">Good morning, here are your signals for today.</p>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #e53935; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #b71c1c; color: #ef9a9a; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">RISK</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Filing Inconsistency — CT600 vs Accounts</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Cobalt Engineering Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">£34k turnover discrepancy detected between draft CT600 and filed accounts.</div>
      <a href="#/app/signals/sig-13" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 16px; cursor: pointer;">Dismiss</span>
      <span style="color: #9A8E7E; font-size: 12px; margin-left: 12px; cursor: pointer;">Mark viewed</span>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #E8E0D4; border-left: 4px solid #ff9800; border-radius: 6px; padding: 16px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #e65100; color: #ffcc80; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;">RISK</span>
      </div>
      <div style="font-size: 15px; font-weight: 600; color: #1A1412; margin-bottom: 4px;">Director Resignation Filed</div>
      <div style="font-size: 13px; color: #B8941E; margin-bottom: 8px;">Nexus Digital Ltd</div>
      <div style="font-size: 13px; color: #6B6058; margin-bottom: 12px;">Marcus Webb resigned as Finance Director. Engagement letter and signing authority need updating.</div>
      <a href="#/app/signals/sig-11" style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 600;">View in Atlas →</a>
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
