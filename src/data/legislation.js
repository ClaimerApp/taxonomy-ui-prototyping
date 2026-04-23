export const legislationRefs = {
  'cta2009-s1044': {
    id: 'cta2009-s1044',
    type: 'legislation',
    title: 'Corporation Tax Act 2009, Section 1044 — Company qualifying for R&D relief',
    shortTitle: 'CTA 2009 s1044',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2009/4/section/1044',
    highlightParagraphs: [0, 1],
    text: `A company qualifies for relief under this Chapter for an accounting period if the following conditions are met.

The company must be a going concern at the end of the accounting period. A company is not a going concern if it is in administration or liquidation, unless the administration or liquidation is solely for the purposes of being wound up and dissolved without any further business being carried on.

The company must carry on a trade during the accounting period, and that trade must involve research and development activities that are relevant to the trade, either directly or by virtue of being connected to the trade.

The R&D activities must be undertaken by the company itself, or on its behalf, and the company must be entitled to the results of the R&D. Where a company carries on more than one trade, the relief is available separately in respect of each trade.

The company must not be a member of a group where the parent undertaking is a large company, unless the company itself meets the SME thresholds independently. Relief under this Chapter is not available for accounting periods in which the company is controlled by a company that could not itself qualify.

A company that has been struck off the register at Companies House is not eligible to make a claim under this section, regardless of whether the striking off occurred before or after the end of the relevant accounting period.`,
    exampleQueries: [
      'Does a company in administration qualify for R&D relief?',
      'Can a dormant company claim R&D tax relief?',
      'What does "going concern" mean for R&D relief eligibility?',
    ],
    cannedResponses: [
      {
        query: 'Does a company in administration qualify for R&D relief?',
        response: 'Generally no. Under s1044, the company must be a going concern, and a company in administration or liquidation does not meet this test. The only exception is where the administration exists solely for the purpose of winding up without further trading.',
      },
      {
        query: 'Can a dormant company claim R&D tax relief?',
        response: 'No. Section 1044 requires the company to carry on a trade during the accounting period in question, and that trade must involve R&D activities. A dormant company by definition is not carrying on a trade.',
      },
      {
        query: 'What does "going concern" mean for R&D relief eligibility?',
        response: 'A going concern is a company that is not in administration or liquidation. The test is applied at the end of the accounting period. If the company enters administration mid-period, it will fail the going concern test for that entire period.',
      },
    ],
  },

  'cta2009-s1042': {
    id: 'cta2009-s1042',
    type: 'legislation',
    title: 'Corporation Tax Act 2009, Section 1042 — Meaning of research and development',
    shortTitle: 'CTA 2009 s1042',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2009/4/section/1042',
    highlightParagraphs: [1, 3],
    text: `In this Part "research and development" has the meaning given by section 1006 of the Income Tax Act 2007, which provides that R&D has the meaning given by generally accepted accounting practice (GAAP), as read with any guidelines issued by the Department for Science, Innovation and Technology (DSIT).

The DSIT Guidelines on the Meaning of Research and Development for Tax Purposes define R&D as activities that seek to achieve an advance in overall knowledge or capability in a field of science or technology through the resolution of scientific or technological uncertainty.

An advance in science or technology means an advance in the overall knowledge or capability in a field of science or technology, not a company's own state of knowledge or capability alone. The advance must be one that is not readily deducible by a competent professional working in the field.

Scientific or technological uncertainty exists when knowledge of whether something is scientifically possible or technologically feasible, or how to achieve it in practice, is not readily available or deducible by a competent professional working in the field.

Activities that do not directly contribute to the resolution of scientific or technological uncertainty are not R&D. This includes work to apply existing techniques or technology in a straightforward way, even if the project as a whole is novel to the company.

The definition encompasses activities in the natural or applied sciences but does not extend to advances in the arts, humanities, or social sciences, including economics.`,
    exampleQueries: [
      'What counts as an "advance in science or technology"?',
      'Does implementing existing technology count as R&D?',
      'Who defines what R&D means for tax purposes?',
      'Can social science research qualify as R&D?',
    ],
    cannedResponses: [
      {
        query: 'What counts as an "advance in science or technology"?',
        response: 'An advance must extend overall knowledge or capability in the field, not just the company\'s own knowledge. It must not be readily deducible by a competent professional — meaning a skilled person in the field could not easily work it out from publicly available information.',
      },
      {
        query: 'Does implementing existing technology count as R&D?',
        response: 'No. Applying existing techniques or technology in a straightforward way does not qualify, even if the resulting product or service is new to the company. There must be genuine scientific or technological uncertainty to resolve.',
      },
      {
        query: 'Who defines what R&D means for tax purposes?',
        response: 'The definition derives from GAAP as modified by DSIT (formerly BEIS) Guidelines. Section 1042 of CTA 2009 refers to s1006 ITA 2007, which in turn points to these guidelines as the authoritative source.',
      },
      {
        query: 'Can social science research qualify as R&D?',
        response: 'No. The DSIT guidelines explicitly restrict qualifying R&D to advances in natural or applied sciences. Work in arts, humanities, social sciences, and economics falls outside scope regardless of its novelty or rigour.',
      },
    ],
  },

  'cta2009-s1052': {
    id: 'cta2009-s1052',
    type: 'legislation',
    title: 'Corporation Tax Act 2009, Section 1052 — Qualifying expenditure on research and development',
    shortTitle: 'CTA 2009 s1052',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2009/4/section/1052',
    highlightParagraphs: [0, 4],
    text: `Expenditure qualifies for R&D relief under this Chapter if it falls within one or more of the following categories and is attributable to relevant research and development undertaken by the company.

Staff costs: emoluments paid to directors or employees directly and actively engaged in relevant R&D, including earnings, employer NICs, and employer pension contributions. The proportion of staff costs attributable to R&D must reflect the time spent on qualifying activities.

Externally provided workers (EPWs): payments to staff providers, agencies, or individuals contracted to carry out R&D activities. The qualifying amount is limited to 65% of the payment made to the staff provider.

Software: expenditure on computer software used directly in carrying out qualifying R&D activities, including licences and subscriptions. General-purpose office software does not qualify.

Consumable items: materials, utilities, and other physical items used up or transformed in the R&D process. Items that become part of a product delivered to a customer may not qualify unless consumed during the R&D itself.

The total amount of qualifying expenditure claimed must not exceed the company's total relevant expenditure for the period. Where expenditure is partly attributable to R&D and partly to other activities, a just and reasonable apportionment must be made.

Expenditure on capital items does not qualify under this section, nor does expenditure on the acquisition of land or rights over land.`,
    exampleQueries: [
      'What staff costs qualify for R&D relief?',
      'Can we claim software licences as R&D expenditure?',
      'What is the EPW 65% restriction?',
    ],
    cannedResponses: [
      {
        query: 'What staff costs qualify for R&D relief?',
        response: 'Staff costs include earnings, employer NICs, and employer pension contributions for employees directly and actively engaged in R&D. The claim must be apportioned to reflect actual time spent on qualifying activities — you cannot claim 100% of salary if the employee also does non-R&D work.',
      },
      {
        query: 'Can we claim software licences as R&D expenditure?',
        response: 'Yes, software licences and subscriptions qualify if the software is used directly in carrying out R&D activities. However, general-purpose office software (e.g. email, word processing) does not qualify even if used by R&D staff.',
      },
      {
        query: 'What is the EPW 65% restriction?',
        response: 'When you use externally provided workers, only 65% of the amount paid to the staff provider counts as qualifying expenditure. This restriction reflects that the remaining 35% is treated as the provider\'s margin and overheads.',
      },
    ],
  },

  'fa1998-sch18-para3': {
    id: 'fa1998-sch18-para3',
    type: 'legislation',
    title: 'Finance Act 1998, Schedule 18, Paragraph 3 — Accounting periods',
    shortTitle: 'FA 1998 Sch18 para 3',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/1998/36/schedule/18/paragraph/3',
    highlightParagraphs: [1, 3],
    text: `An accounting period of a company begins when the company comes within the charge to corporation tax, or immediately after the end of the previous accounting period, whichever is applicable.

An accounting period ends on the first occurrence of any of the following: the expiry of 12 months from the beginning of the accounting period; an accounting date of the company; the company beginning or ceasing to trade; the company beginning or ceasing to be within the charge to corporation tax; the company entering or leaving administration.

Where a company draws up accounts for a period exceeding 12 months, the accounting period is split. The first accounting period covers the initial 12 months and the second covers the remainder. Each resulting period is treated as a separate accounting period for corporation tax purposes.

A company cannot have an accounting period longer than 12 months. Any purported return or claim based on a period exceeding 12 months is treated as relating to two or more separate accounting periods as determined above.

Where a company changes its accounting reference date, the resulting period is similarly split if it would otherwise exceed 12 months. Each split period requires its own corporation tax return and any R&D relief claim must be made for each period separately.

The company must notify HMRC of the beginning and end of each accounting period. Failure to do so does not invalidate the period but may result in estimated assessments under paragraph 36.`,
    exampleQueries: [
      'What happens if our accounts cover more than 12 months?',
      'Can we submit one R&D claim for an 18-month period?',
      'When does an accounting period start and end?',
    ],
    cannedResponses: [
      {
        query: 'What happens if our accounts cover more than 12 months?',
        response: 'The period is automatically split into a 12-month period and the remainder. Each is treated as a separate accounting period for corporation tax, requiring its own CT600 return and separate R&D relief calculations.',
      },
      {
        query: 'Can we submit one R&D claim for an 18-month period?',
        response: 'No. An accounting period cannot exceed 12 months. An 18-month set of accounts would be split into a 12-month period and a 6-month period, each requiring a separate R&D claim with expenditure apportioned accordingly.',
      },
      {
        query: 'When does an accounting period start and end?',
        response: 'It starts when the company first comes within corporation tax charge or immediately after the prior period ends. It ends at the earliest of: 12 months elapsing, the company\'s accounting date, or the company starting/ceasing to trade or entering administration.',
      },
    ],
  },

  cird81400: {
    id: 'cird81400',
    type: 'hmrc_guidance',
    title: 'CIRD81400 — R&D Tax Relief: Identifying R&D activities',
    shortTitle: 'CIRD81400',
    sourceUrl: 'https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development/cird81400',
    highlightParagraphs: [0, 3],
    text: `When identifying whether a project involves qualifying R&D, HMRC applies two core tests. First, does the project seek to achieve an advance in overall knowledge or capability in a field of science or technology? Second, does the project involve the resolution of scientific or technological uncertainty?

Both tests must be satisfied. A project that applies well-understood science in a novel commercial context does not qualify unless there is genuine uncertainty about whether the science or technology will work in the particular application.

The advance must be in the field as a whole, not merely in the company's own knowledge. If a competent professional in the field could readily deduce the solution, there is no qualifying uncertainty even if the company itself did not know the answer.

HMRC uses SIC code analysis as part of its risk assessment. Certain sectors have a higher baseline probability of genuine R&D activity. Technology, pharmaceutical, and manufacturing sectors typically fall into higher-probability categories, while sectors such as retail, hospitality, and recruitment fall into lower-probability categories.

A low-probability SIC code does not preclude a valid claim, but it increases the likelihood of HMRC enquiry. Claimants in low-probability sectors should ensure their technical narrative clearly articulates the specific scientific or technological uncertainties addressed.

The burden of proof lies with the claimant. HMRC expects a contemporaneous record of the uncertainties faced, the work done to resolve them, and the conclusions reached. Retrospective narratives prepared solely for the purpose of a claim are given less weight.

Qualifying R&D includes direct R&D activities and qualifying indirect activities (QIAs) such as maintenance, security, and administrative support that are undertaken for the R&D project.`,
    exampleQueries: [
      'What are the two tests for identifying R&D?',
      'Does our SIC code affect R&D claim risk?',
      'What evidence does HMRC expect for R&D claims?',
      'Can support activities count as R&D?',
    ],
    cannedResponses: [
      {
        query: 'What are the two tests for identifying R&D?',
        response: 'HMRC applies two tests: (1) does the project seek an advance in overall knowledge or capability in science or technology, and (2) does it involve resolving scientific or technological uncertainty? Both must be met — commercial novelty alone is insufficient.',
      },
      {
        query: 'Does our SIC code affect R&D claim risk?',
        response: 'Yes. HMRC categorises SIC codes by probability of genuine R&D. Tech, pharma, and manufacturing are higher-probability; retail, hospitality, and recruitment are lower. A low-probability code doesn\'t block a claim but makes enquiry more likely.',
      },
      {
        query: 'What evidence does HMRC expect for R&D claims?',
        response: 'HMRC expects contemporaneous records showing the uncertainties faced, work undertaken to resolve them, and conclusions reached. Retrospective narratives written solely for the claim carry less evidential weight.',
      },
      {
        query: 'Can support activities count as R&D?',
        response: 'Yes. Qualifying indirect activities (QIAs) such as maintenance, security, and admin support undertaken specifically for the R&D project can be included. However, general business overheads do not qualify.',
      },
    ],
  },

  cird82000: {
    id: 'cird82000',
    type: 'hmrc_guidance',
    title: 'CIRD82000 — R&D Tax Relief: Qualifying expenditure categories',
    shortTitle: 'CIRD82000',
    sourceUrl: 'https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development/cird82000',
    highlightParagraphs: [0, 5],
    text: `Qualifying expenditure for R&D tax relief falls into several defined categories. Each category has specific rules governing what may be included in a claim.

Staff costs comprise gross salaries, wages, employer NICs, and employer pension contributions for employees directly and actively engaged in qualifying R&D. Where an employee splits time between R&D and non-R&D activities, an apportionment must be made on a just and reasonable basis. HMRC accepts timesheets, project records, or other contemporaneous evidence as support.

Externally provided workers (EPWs) are individuals provided through a staffing company or agency to work on R&D. The qualifying amount is restricted to 65% of the relevant payment. For connected party EPWs, the qualifying cost is limited to the lower of the payment or the staff costs that would have arisen had the worker been directly employed.

Subcontractor costs are available under the SME scheme at 65% of the payment for unconnected subcontractors. Under the RDEC scheme, subcontractor costs do not qualify directly but may be reflected through EPW rules.

Consumables include materials, utilities (water, fuel, power), and other items consumed or transformed by the R&D process. Items that become part of a product sold to a customer do not generally qualify unless they were genuinely consumed during the R&D phase.

Software used directly in R&D qualifies, including licence fees and cloud computing costs where the service is integral to the R&D activity. General business software does not qualify.

HMRC maintains internal benchmark ratios by sector. Claims that significantly exceed these benchmarks may be subject to enhanced scrutiny. For example, software companies claiming staff costs above 80% of total R&D expenditure, or manufacturing firms claiming consumables above 40%, may attract additional review.`,
    exampleQueries: [
      'What are the main qualifying expenditure categories?',
      'How should we apportion staff time for R&D claims?',
      'Do cloud computing costs qualify as R&D expenditure?',
    ],
    cannedResponses: [
      {
        query: 'What are the main qualifying expenditure categories?',
        response: 'The main categories are staff costs (salaries, NICs, pensions), externally provided workers (at 65%), subcontractors (SME scheme only, at 65%), consumable items, and software. Capital expenditure and land costs are excluded.',
      },
      {
        query: 'How should we apportion staff time for R&D claims?',
        response: 'Apportionment must be on a just and reasonable basis, reflecting actual time spent on qualifying R&D. HMRC accepts timesheets, project management records, or other contemporaneous evidence. Blanket percentage estimates without supporting records are likely to be challenged.',
      },
      {
        query: 'Do cloud computing costs qualify as R&D expenditure?',
        response: 'Yes, where the cloud computing service is integral to and used directly in the R&D activity, it qualifies under the software category. General-purpose cloud services (e.g. email hosting, file storage) used across the business do not qualify.',
      },
    ],
  },

  'cta2009-s1112g': {
    id: 'cta2009-s1112g',
    type: 'legislation',
    title: 'Corporation Tax Act 2009, Section 1112G — Subsidised expenditure',
    shortTitle: 'CTA 2009 s1112G',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2009/4/section/1112G',
    highlightParagraphs: [0, 3],
    text: `Expenditure is subsidised for the purposes of this Part if a notified State aid has been, or is to be, obtained in respect of the expenditure. This includes grants, subsidised loans, and other forms of financial assistance from public bodies.

Where expenditure is subsidised, it may not be included in a claim for R&D relief under the SME scheme. The company may instead be able to claim under the RDEC scheme for the subsidised portion, subject to meeting the conditions of that scheme.

A grant or subsidy received from any source — including Innovate UK, regional growth funds, EU framework programmes, or other public funding bodies — that is designated as notified State aid will cause the related expenditure to be treated as subsidised.

The company must disclose all grants and subsidies received in respect of R&D activities when making a claim. Failure to disclose subsidised expenditure may result in the entire claim being withdrawn and penalties under Schedule 24 of the Finance Act 2007.

Where only part of the expenditure on a project is subsidised, the unsubsidised portion may still qualify under the SME scheme provided it can be separately identified. A just and reasonable apportionment should be applied.

The definition of notified State aid is that given in EU Regulation 651/2014 (the General Block Exemption Regulation) as retained in UK law. HMRC guidance at CIRD89760 provides further detail on how State aid rules apply to R&D claims.

Companies in receipt of subsidies should consider whether the RDEC scheme offers a more beneficial outcome, particularly where the subsidy covers a substantial proportion of project costs.`,
    exampleQueries: [
      'Can we claim R&D relief on grant-funded expenditure?',
      'What happens if we don\'t disclose a grant?',
      'How does subsidised expenditure affect SME vs RDEC?',
    ],
    cannedResponses: [
      {
        query: 'Can we claim R&D relief on grant-funded expenditure?',
        response: 'Not under the SME scheme. Expenditure funded by notified State aid (including Innovate UK grants) is treated as subsidised and must be excluded from an SME claim. However, the subsidised expenditure may qualify under the RDEC scheme instead.',
      },
      {
        query: 'What happens if we don\'t disclose a grant?',
        response: 'Failure to disclose subsidised expenditure can result in the entire R&D claim being withdrawn and penalties under FA 2007 Schedule 24. Full disclosure of all grants and public funding is mandatory when submitting a claim.',
      },
      {
        query: 'How does subsidised expenditure affect SME vs RDEC?',
        response: 'Subsidised expenditure cannot be claimed under the SME scheme but may qualify under RDEC. Where a project is partly funded by a grant, the unsubsidised portion can remain in the SME claim and the subsidised portion can go through RDEC.',
      },
    ],
  },

  'fa2024-eris': {
    id: 'fa2024-eris',
    type: 'legislation',
    title: 'Finance Act 2024 — Enhanced R&D Intensive Support (ERIS)',
    shortTitle: 'FA 2024 — ERIS',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2024/3/contents',
    highlightParagraphs: [0, 2],
    text: `Finance Act 2024 introduced the merged R&D expenditure credit scheme and, alongside it, Enhanced R&D Intensive Support (ERIS) for loss-making SMEs whose qualifying R&D expenditure constitutes a high proportion of their total expenditure.

ERIS is available only to companies that meet the SME thresholds (fewer than 500 employees, and either turnover not exceeding €100m or balance sheet total not exceeding €86m), are loss-making for corporation tax purposes, and whose qualifying R&D expenditure is at least 30% of their total expenditure for the accounting period.

Loss-making for CT purposes is distinct from an accounting loss. A company can report an accounting profit but still be loss-making for CT purposes after adjustments (e.g. enhanced R&D deduction, capital allowances, losses brought forward). The test is applied to the tax-adjusted trading position.

ERIS applies to accounting periods beginning on or after 1 April 2024. For periods that straddle this date, the relief must be apportioned.

A company that exceeds the SME thresholds, or becomes profitable for CT purposes, must claim under the merged RDEC scheme instead. There is no hybrid.`,
    exampleQueries: [
      'What are the conditions for ERIS?',
      'When did ERIS come into effect?',
      'What does "loss-making for CT purposes" mean?',
    ],
    cannedResponses: [
      {
        query: 'What are the conditions for ERIS?',
        response: 'ERIS requires SME status, loss-making status for CT purposes, and qualifying R&D expenditure of at least 30% of total expenditure in the accounting period.',
      },
      {
        query: 'When did ERIS come into effect?',
        response: 'For accounting periods beginning on or after 1 April 2024. Periods straddling this date must be apportioned.',
      },
    ],
  },

  'dsit-guidelines': {
    id: 'dsit-guidelines',
    type: 'hmrc_guidance',
    title: 'DSIT Guidelines on the Meaning of R&D for Tax Purposes',
    shortTitle: 'DSIT Guidelines',
    sourceUrl: 'https://www.gov.uk/government/publications/guidelines-on-the-meaning-of-research-and-development-for-tax-purposes',
    highlightParagraphs: [0, 4],
    text: `The DSIT Guidelines (formerly BEIS Guidelines) are the authoritative source, cited by CTA 2009 s1006 ITA 2007, on what constitutes qualifying R&D for tax purposes. They sit at the heart of every R&D claim.

Paragraph 9 of the Guidelines sets out that an advance in science or technology means an advance in the overall knowledge or capability in a field — not a company's own state of knowledge. The work must seek to extend what is known or achievable in the field as a whole.

Paragraph 9a requires that the project demonstrate new or extended knowledge or capability in the technological components being used. Paragraph 9c requires evidence of scientific or technological change in the underlying build.

Paragraph 13 defines scientific or technological uncertainty: uncertainty exists when knowledge of whether something is scientifically possible or technologically feasible, or how to achieve it in practice, is not readily available or deducible by a competent professional working in the field.

Paragraph 22 requires that the baseline for the project be specific — stating the approaches, technologies, or methods that existed at the start against which the advance is to be measured. Vague assertions ("no existing solutions") are insufficient.

Paragraphs 27-28 cover qualifying indirect activities (QIA). These include activities such as scientific and technical information services, indirect supporting activities, and training required to support R&D.

A common failure mode identified by HMRC in claim scrutiny is narratives that describe commercial product development rather than technological advance. The Guidelines specifically call out that developing a new product is not itself R&D — R&D is the resolution of technological uncertainty in how to produce that product.`,
    exampleQueries: [
      'What paragraph of the DSIT Guidelines defines the baseline?',
      'How are QIAs treated under DSIT Guidelines?',
      'What is the test for scientific or technological uncertainty?',
    ],
    cannedResponses: [
      {
        query: 'What paragraph of the DSIT Guidelines defines the baseline?',
        response: 'Paragraph 22. It requires the baseline to be specific — stating the approaches, technologies, or methods that existed at the start of the project.',
      },
      {
        query: 'How are QIAs treated under DSIT Guidelines?',
        response: 'Paragraphs 27-28 define QIAs. Scientific and technical information services, indirect supporting activities, and training required for R&D all qualify as QIAs and can be included in the claim.',
      },
    ],
  },

  cird182000: {
    id: 'cird182000',
    type: 'hmrc_guidance',
    title: 'CIRD182000 — Additional Information Form (AIF) requirements',
    shortTitle: 'CIRD182000',
    sourceUrl: 'https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development/cird182000',
    highlightParagraphs: [0, 2],
    text: `From 8 August 2023 all R&D claims must be supported by an Additional Information Form (AIF) submitted in advance of, or at the same time as, the CT600. Claims without an AIF are invalid and will be rejected.

The AIF requires, per project, a technical narrative covering: the baseline, the advance sought, the scientific or technological uncertainties, the work undertaken to resolve those uncertainties, and the extent to which the competent professional view was that the solution was not readily deducible.

For claims involving 1-3 projects, a technical narrative must be provided for every project claimed. For claims with 4-10 projects, narratives covering at least 50% of the total qualifying expenditure are required, and these narratives must be for the largest projects by expenditure. For claims with more than 10 projects, narratives covering at least 10 projects and at least 50% of the qualifying expenditure are required, again starting with the largest.

Each narrative must address each of the five sections above. Narratives that omit any of these sections do not meet the AIF requirements and the claim may be rejected or enquired into.

The AIF also requires disclosure of all scheme types claimed under (SME, RDEC, merged, ERIS), the accounting period covered, the identity of any agent preparing the claim, and contact details for a named officer of the company.`,
    exampleQueries: [
      'How many technical narratives does the AIF require?',
      'What sections must each narrative contain?',
      'When did the AIF requirement start?',
    ],
    cannedResponses: [
      {
        query: 'How many technical narratives does the AIF require?',
        response: 'For 1-3 projects: narratives for all. For 4-10 projects: narratives covering at least 50% of qualifying expenditure, starting with the largest. For 10+ projects: at least 10 narratives and at least 50% of expenditure, starting with the largest.',
      },
      {
        query: 'What sections must each narrative contain?',
        response: 'Baseline, advance sought, scientific/technological uncertainties, work undertaken to resolve the uncertainties, and the competent-professional view that the solution was not readily deducible.',
      },
    ],
  },

  'sme-definition-eu': {
    id: 'sme-definition-eu',
    type: 'legislation',
    title: 'Commission Recommendation 2003/361/EC — SME definition',
    shortTitle: 'Rec 2003/361/EC',
    sourceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32003H0361',
    highlightParagraphs: [0, 2],
    text: `The EU SME definition, retained in UK law for R&D relief purposes, sets the thresholds for small and medium-sized enterprises. An SME is an enterprise with fewer than 500 employees and either annual turnover not exceeding €100 million or annual balance sheet total not exceeding €86 million (UK R&D doubles the EU baseline thresholds of 250 employees / €50m / €43m).

The test is applied at the group level. Where the company is part of a larger structure, the figures of all linked and partner enterprises must be aggregated.

A linked enterprise is one where a majority of the capital or voting rights is held, or where there is dominant influence. A partner enterprise is one where 25% or more (but less than 50%) of capital or voting rights is held. Both relationships aggregate data into the SME test.

The test is applied on the basis of the last approved accounts. Where a company has been in existence for less than two approved periods, estimates based on a bona fide forecast may be used.

Status changes only take effect when the thresholds are exceeded (or fallen below) for two consecutive periods. This prevents single-year fluctuations from causing a loss of SME status.`,
    exampleQueries: [
      'What are the UK R&D SME thresholds?',
      'When does SME status change?',
      'How is the group level defined?',
    ],
    cannedResponses: [
      {
        query: 'What are the UK R&D SME thresholds?',
        response: 'Fewer than 500 employees, and either annual turnover ≤ €100m or balance sheet total ≤ €86m. Tested at group level.',
      },
      {
        query: 'When does SME status change?',
        response: 'Only when thresholds are exceeded (or fallen below) for two consecutive periods. Single-year fluctuations do not trigger a change.',
      },
    ],
  },

  cird191000: {
    id: 'cird191000',
    type: 'hmrc_guidance',
    title: 'CIRD191000 — SME thresholds and group companies',
    shortTitle: 'CIRD191000',
    sourceUrl: 'https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development/cird191000',
    highlightParagraphs: [0, 1],
    text: `To qualify for R&D relief under the SME scheme, the company must meet the EU definition of a small or medium-sized enterprise as retained in UK law. The thresholds are applied at a group level where the company is part of a group.

An SME is defined as an enterprise with fewer than 500 employees and either an annual turnover not exceeding €100 million or an annual balance sheet total not exceeding €86 million. These thresholds are assessed at the group level by aggregating the data of all linked and partner enterprises.

Where a company is a member of a group, the headcount, turnover, and balance sheet figures of all group companies must be combined. A group relationship exists where one enterprise holds 25% or more of the capital or voting rights of another, or where enterprises are linked through a natural person or group of natural persons acting jointly.

The thresholds are assessed at the date of the last approved accounts. If a company exceeds the thresholds in one year but falls back below them in the following year, it retains SME status only if it was below the thresholds in two consecutive preceding periods.

Companies that exceed the SME thresholds must claim R&D relief under the RDEC scheme instead. There is no partial SME relief — the company either qualifies in full or must use RDEC for the entire claim.

Where a company is acquired or disposed of mid-period, the thresholds are tested at the point of acquisition or disposal. HMRC guidance recommends that companies monitor their status on an ongoing basis, particularly where they are close to the thresholds.

Joint ventures and consortium arrangements may create linked enterprise relationships that push the combined entity above the SME thresholds. Professional advice should be sought where these structures exist.`,
    exampleQueries: [
      'What are the SME thresholds for R&D relief?',
      'How are thresholds applied to group companies?',
      'What happens if we exceed SME thresholds mid-year?',
      'Can we claim partial SME relief if we are borderline?',
    ],
    cannedResponses: [
      {
        query: 'What are the SME thresholds for R&D relief?',
        response: 'An SME must have fewer than 500 employees and either annual turnover not exceeding €100m or balance sheet total not exceeding €86m. These are assessed on a group basis, aggregating all linked and partner enterprises.',
      },
      {
        query: 'How are thresholds applied to group companies?',
        response: 'Headcount, turnover, and balance sheet figures of all group members are combined. A group relationship is triggered at 25% or more of capital or voting rights. This includes indirect links through natural persons acting jointly.',
      },
      {
        query: 'What happens if we exceed SME thresholds mid-year?',
        response: 'If a company is acquired mid-period and the combined group exceeds thresholds, it loses SME status from that point. The company retains SME status only if it was below thresholds in two consecutive prior periods before the breach.',
      },
      {
        query: 'Can we claim partial SME relief if we are borderline?',
        response: 'No. There is no partial SME relief. A company either qualifies in full under the SME scheme or must use the RDEC scheme for its entire R&D claim. The test is binary, assessed at the group level.',
      },
    ],
  },
};
