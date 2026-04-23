export const documentContent = {
  'rev-1': {
    title: 'Nexagen Ltd FY2025 R&D Tax Credit Claim Report',
    sections: [
      // Page 1 — Cover
      {
        id: 'sec-cover',
        type: 'cover',
        page: 1,
        clientName: 'Nexagen Limited',
        title: 'R&D Tax Credit Claim Report',
        subtitle: 'Prepared under Section 1042 Corporation Tax Act 2009 and the BEIS/DSIT Guidelines on the Meaning of Research and Development for Tax Purposes.',
        preparedBy: 'Meridian Tax Partners LLP',
        financialYear: '1 April 2024 – 31 March 2025',
      },
      // Page 2 — Table of Contents
      {
        id: 'sec-toc',
        type: 'toc',
        page: 2,
        entries: [
          { label: 'Claim Summary', page: 3 },
          { label: 'Project 1 — CRISPR Delivery Optimisation', page: 3 },
          { label: 'Project 2 — STAT3 Screening Platform', page: 5 },
          { label: 'Project 3 — AI Literature Review Tool', page: 6 },
          { label: 'Qualifying Costs', page: 7 },
          { label: 'Summary & Declaration', page: 9 },
          { label: 'Appendix 1 — Submission Summary', page: 10 },
        ],
      },
      // Page 3 — Claim Summary + Project 1
      {
        id: 'sec-claim-summary',
        type: 'details-panel',
        page: 3,
        title: 'Claim Summary',
        lines: [
          { id: 'f-company-number', label: 'Company Number', value: '08451293' },
          { id: 'f-utr', label: 'UTR', value: '1234567890' },
          { id: 'f-sic', label: 'SIC Code', value: '72110 — Biotechnology R&D' },
          { id: 'f-accounting-period-body', label: 'Accounting Period', value: '1 Apr 2024 – 31 Mar 2025' },
        ],
      },
      {
        id: 'sec-project1',
        type: 'narrative',
        page: 3,
        fieldId: 'f-project1',
        heading: 'Project 1 — CRISPR Delivery Optimisation',
        questions: [
          {
            id: 'p1-field',
            q: 'What is the main field of science or technology?',
            body: [
              'The main field of science and technology of this project is molecular therapeutics and drug-delivery bioengineering, within the biotechnology industry.',
            ],
          },
          {
            id: 'p1-baseline',
            q: 'What scientific or technological knowledge existed at the start of the project?',
            body: [
              'At the outset of the project, the state of the art in lipid nanoparticle (LNP) delivery of CRISPR-Cas9 ribonucleoproteins to hepatocytes was well documented but constrained. Published LNP formulations — including LNP-401 and Onpattro-derivatives — were reported to achieve hepatocyte transfection rates below 20% in vivo, with the limiting factors being endosomal escape and off-target uptake by Kupffer cells.',
              'Available commercial reagents (e.g. Invitrogen Lipofectamine MessengerMAX, Precision Nanosystems NanoAssemblr formulations) were designed for mRNA delivery rather than RNP cargos, and did not address the protein-RNA complex\'s particular sensitivity to pH and charge environment. No off-the-shelf formulation offered the combination of hepatocyte selectivity, endosomal escape efficiency, and RNP stability needed for the intended therapeutic application.',
            ],
          },
          {
            id: 'p1-advance',
            q: 'What advance in scientific or technological knowledge did the company aim to achieve?',
            body: [
              'The project aimed to develop an ionisable-lipid LNP formulation capable of delivering Cas9 RNPs to hepatocytes with a transfection rate above 60%, with endosomal escape efficiency sufficient to produce meaningful gene-editing activity at clinically relevant doses. This represents a material advance over published formulations and addresses a gap in publicly available know-how.',
            ],
          },
          {
            id: 'p1-uncertainty',
            q: 'What scientific or technological uncertainties did the project seek to resolve?',
            body: [
              'Several interlocking uncertainties were identified. The optimal ionisable-lipid pKa for hepatocyte endosomal escape was not readily deducible; literature values for comparable cargos ranged from 6.2 to 6.8 with no consensus on RNP-specific behaviour. The stability of the Cas9 RNP complex within the LNP under varying lipid ratios was uncertain, with a risk of dissociation during self-assembly. Finally, the effect of surface PEGylation density on hepatocyte-selective uptake versus macrophage clearance could not be predicted from first principles.',
            ],
          },
          {
            id: 'p1-overcome',
            q: 'How did the project seek to overcome these uncertainties?',
            body: [
              'A systematic design-of-experiments (DoE) campaign was undertaken across 84 candidate formulations, varying ionisable lipid pKa, helper-lipid molar ratio, PEG-lipid density, and RNP:lipid stoichiometry. Candidate LNPs were screened in primary hepatocyte cultures and subsequently in hepatocyte-humanised mouse models. Cryo-EM was used to confirm RNP encapsulation integrity. An in-house Python pipeline aggregated assay outputs and fit response-surface models to guide iterative formulation rounds.',
              'By the end of the accounting period, lead candidate LNP-7c achieved a hepatocyte transfection rate of 64% in vivo, with sustained Cas9 expression for 72 hours and no observed off-target editing above background. The work remains pre-clinical; additional toxicology and dose-response studies are planned for the next period.',
            ],
          },
        ],
      },
      // Page 5 — Project 2
      {
        id: 'sec-project2',
        type: 'narrative',
        page: 5,
        fieldId: 'f-project2',
        heading: 'Project 2 — STAT3 Screening Platform',
        questions: [
          {
            id: 'p2-field',
            q: 'What is the main field of science or technology?',
            body: [
              'The main field of science and technology of this project is high-throughput biochemical assay development, within the drug-discovery and biotechnology industry.',
            ],
          },
          {
            id: 'p2-baseline',
            q: 'What scientific or technological knowledge existed at the start of the project?',
            body: [
              'At the outset, published STAT3 inhibitor assay platforms — including the Napabucasin HTS and TTI-101 screening campaigns — demonstrated robust performance above 500 nM inhibitor concentration but reported degraded Z-factors (typically below 0.4) at sub-micromolar concentrations. This limited their utility for early-stage lead discovery where hit affinity is an important selection criterion.',
              'Commercially available STAT3 binding assay kits (e.g. Cisbio HTRF, Active Motif TransAM STAT3) relied on either antibody-based detection with known specificity issues at low concentrations, or GFP-tagged constructs that did not accurately represent endogenous dimerisation kinetics. No publicly available platform offered the combination of sensitivity, throughput, and mechanism-relevant readout required.',
            ],
          },
          {
            id: 'p2-advance',
            q: 'What advance in scientific or technological knowledge did the company aim to achieve?',
            body: [
              'The project aimed to develop a novel biochemical assay capable of detecting STAT3 dimerisation inhibition at concentrations down to 50 nM with a Z-factor above 0.6, enabling screening of focused libraries for micromolar-or-better hits. The advance sought was methodological: a novel combination of BRET-based dimerisation readout with engineered STAT3 reporter constructs optimised for assay sensitivity.',
            ],
          },
          {
            id: 'p2-uncertainty',
            q: 'What scientific or technological uncertainties did the project seek to resolve?',
            body: [
              'Key uncertainties included the signal-to-noise characteristics of custom BRET pairs under the intended buffer conditions, the impact of reporter-tag placement on native STAT3 dimerisation kinetics, and the extent to which false-positive hits arising from fluorescence interference of compound libraries could be mitigated at low concentrations.',
            ],
          },
          {
            id: 'p2-overcome',
            q: 'How did the project seek to overcome these uncertainties?',
            body: [
              'The team engineered six reporter-construct variants with varying linker lengths and BRET pair orientations, screened them for dimerisation responsiveness, and validated the lead construct against a set of 48 known STAT3 modulators. Assay conditions were iteratively refined through a Plackett-Burman screen of 12 buffer and additive variables. A blue-wavelength counter-screen was introduced to detect fluorescence interference.',
              'By period end, the platform achieved Z-factors of 0.68 at 100 nM across a validation set of 2,400 compounds, with an estimated 2.1% fluorescence-interference false-positive rate. The platform is now in use for lead discovery on two internal programmes.',
            ],
          },
        ],
      },
      // Page 6 — Project 3
      {
        id: 'sec-project3',
        type: 'narrative',
        page: 6,
        fieldId: 'f-project3',
        heading: 'Project 3 — AI Literature Review Tool',
        questions: [
          {
            id: 'p3-field',
            q: 'What is the main field of science or technology?',
            body: [
              'The main field of science and technology of this project is natural-language processing applied to biomedical-literature triage, within the software engineering and biotechnology industries.',
            ],
          },
          {
            id: 'p3-baseline',
            q: 'What scientific or technological knowledge existed at the start of the project?',
            body: [
              'At the outset, existing manual literature review processes at Nexagen required approximately 15–20 hours of scientist time per discovery programme per month. Commercial NLP tooling — including general-purpose large language models and domain-adapted products such as SciBERT and BioBERT — performed well on abstract-level tagging but showed documented weaknesses on structured extraction of experimental conditions, assay methodologies, and quantitative results from full-text papers.',
              'The team evaluated off-the-shelf literature-triage platforms but found that none offered the combination of biomedical domain specificity, customisable extraction schemas, and low enough cost-per-paper to be operationally viable for Nexagen\'s programme portfolio.',
            ],
          },
          {
            id: 'p3-advance',
            q: 'What advance in scientific or technological knowledge did the company aim to achieve?',
            body: [
              'The project aimed to develop an NLP pipeline capable of extracting structured experimental metadata from full-text biomedical papers with F1 scores comparable to those achieved on abstract-level tasks by state-of-the-art domain-adapted LLMs — a reduction of manual review time by an estimated 70%. The methodological advance was the development of a chunked-context prompting strategy paired with a custom supervised classifier head, not a straightforward application of existing tooling.',
            ],
          },
          {
            id: 'p3-uncertainty',
            q: 'What scientific or technological uncertainties did the project seek to resolve?',
            body: [
              'Uncertainty centred on whether extraction F1 scores above 0.75 could be achieved for the target schema (assay type, target, cell line, observed effect, concentration) across a diverse corpus of biomedical papers, and whether the pipeline could be run at production throughput within commercially viable compute costs.',
            ],
          },
          {
            id: 'p3-overcome',
            q: 'How did the project seek to overcome these uncertainties?',
            body: [
              'The team assembled a labelled corpus of 400 papers annotated by in-house domain experts, trained a prototype extraction pipeline combining sliding-window context and a lightweight classifier head, and benchmarked iteratively against the held-out test set. A production pipeline was then built on AWS using Bedrock-hosted models for inference with cost controls, and integrated with the internal discovery database.',
              'By period end, the pipeline achieved an F1 of 0.78 on the target schema and is estimated to have reduced per-programme literature-review effort from 18 to 5 hours per month. Further work on recall improvements is planned.',
            ],
          },
        ],
      },
      // Page 7 — Qualifying Costs intro + Staff table
      {
        id: 'sec-costs-intro',
        type: 'narrative-intro',
        page: 7,
        heading: 'Qualifying Costs',
        paragraphs: [
          'The following is a breakdown of qualifying expenditure for the accounting period ending 31 March 2025. Apportionments have been derived from timesheet records where available and, in their absence, from reasoned estimates by the relevant Competent Professional based on the published BEIS/DSIT guidelines. Time spent on ineligible activities — including routine production scale-up, commercial lot release testing, market research, and after-sales support — has been excluded from the calculations.',
          'Where utilities and licensed software are apportioned to R&D, the apportionment rate has been derived from the proportion of total full-time-equivalent staff engaged on R&D during the accounting period (64.2%). This approach follows the CIRD guidance on apportionment (CIRD82500).',
        ],
      },
      {
        id: 'sec-staff-costs',
        type: 'costs-table',
        page: 7,
        fieldId: 'f-staff-costs',
        title: 'Employed Staff',
        columns: [
          { key: 'name', label: 'Name', align: 'left' },
          { key: 'emoluments', label: 'Total Emoluments\n(Gross + NI + Pension)', align: 'right' },
          { key: 'pct', label: '% R&D', align: 'right' },
          { key: 'claimable', label: 'Claimable Sum', align: 'right' },
        ],
        rows: [
          { id: 'st-liu', cells: { name: 'Dr Mei-Lin Liu (CSO)', emoluments: '£142,800.00', pct: '80%', claimable: '£114,240.00' } },
          { id: 'st-patel', cells: { name: 'Dr Arjun Patel (Head of Delivery)', emoluments: '£118,500.00', pct: '90%', claimable: '£106,650.00' } },
          { id: 'st-okafor', cells: { name: 'Dr Chika Okafor (Lead Scientist)', emoluments: '£96,200.00', pct: '85%', claimable: '£81,770.00' } },
          { id: 'st-hartmann', cells: { name: 'Dr Lena Hartmann (Screening Lead)', emoluments: '£92,400.00', pct: '80%', claimable: '£73,920.00' } },
          { id: 'st-mackenzie', cells: { name: 'Dr Euan MacKenzie (Senior Chemist)', emoluments: '£78,100.00', pct: '60%', claimable: '£46,860.00' } },
          { id: 'st-sato', cells: { name: 'Dr Hana Sato (ML Engineer)', emoluments: '£86,400.00', pct: '65%', claimable: '£56,160.00' } },
          { id: 'st-rossi', cells: { name: 'Gianluca Rossi (Bioinformatician)', emoluments: '£62,300.00', pct: '70%', claimable: '£43,610.00' } },
          { id: 'st-ahmed', cells: { name: 'Yasmin Ahmed (Research Associate)', emoluments: '£48,900.00', pct: '70%', claimable: '£34,230.00' } },
          { id: 'st-nguyen', cells: { name: 'Tran Nguyen (Lab Technician)', emoluments: '£41,600.00', pct: '60%', claimable: '£24,960.00' } },
          { id: 'st-mccann', cells: { name: 'Rory McCann (Software Engineer)', emoluments: '£72,800.00', pct: '55%', claimable: '£40,040.00' } },
        ],
        totalRow: {
          id: 'f-staff-costs-total',
          cells: { name: '', emoluments: '', pct: 'Total', claimable: '£622,440.00' },
        },
      },
      // Page 8 — Subcontractors, Consumables, Software
      {
        id: 'sec-subcon-costs',
        type: 'costs-table',
        page: 8,
        fieldId: 'f-subcontractors',
        title: 'R&D Subcontractors (65% cap applied)',
        columns: [
          { key: 'name', label: 'Supplier', align: 'left' },
          { key: 'desc', label: 'Description', align: 'left' },
          { key: 'expense', label: 'Total Expense', align: 'right' },
          { key: 'pct', label: '% R&D', align: 'right' },
          { key: 'claimable', label: 'Claimable (at 65%)', align: 'right' },
        ],
        rows: [
          { id: 'sc-cambridge', cells: { name: 'Cambridge CRO Services Ltd', desc: 'In vivo hepatocyte mouse studies — Project 1', expense: '£64,000.00', pct: '100%', claimable: '£41,600.00' } },
          { id: 'sc-peptide', cells: { name: 'PeptideSynth UK Ltd', desc: 'Custom Cas9 guide RNA synthesis', expense: '£28,400.00', pct: '100%', claimable: '£18,460.00' } },
          { id: 'sc-oxford', cells: { name: 'Oxford Bio-Diagnostics', desc: 'STAT3 dimerisation reference assays', expense: '£18,200.00', pct: '100%', claimable: '£11,830.00' } },
        ],
        totalRow: {
          id: 'f-subcontractors-total',
          cells: { name: '', desc: '', expense: '£110,600.00', pct: 'Total', claimable: '£71,890.00' },
        },
      },
      {
        id: 'sec-consum-costs',
        type: 'costs-table',
        page: 8,
        fieldId: 'f-consumables',
        title: 'R&D Consumables',
        columns: [
          { key: 'name', label: 'Item', align: 'left' },
          { key: 'expense', label: 'Total Expense', align: 'right' },
          { key: 'pct', label: '% R&D', align: 'right' },
          { key: 'claimable', label: 'Claimable Sum', align: 'right' },
        ],
        rows: [
          { id: 'cn-lipids', cells: { name: 'Ionisable and helper lipids (Avanti / Corden)', expense: '£22,400.00', pct: '100%', claimable: '£22,400.00' } },
          { id: 'cn-cas9', cells: { name: 'Cas9 protein & gRNA reagents', expense: '£14,100.00', pct: '100%', claimable: '£14,100.00' } },
          { id: 'cn-cells', cells: { name: 'Primary hepatocytes & cell-culture media', expense: '£8,900.00', pct: '100%', claimable: '£8,900.00' } },
          { id: 'cn-qpcr', cells: { name: 'qPCR reagents and plates', expense: '£4,200.00', pct: '100%', claimable: '£4,200.00' } },
          { id: 'cn-utilities', cells: { name: 'Light, heat & lab utilities (apportioned 64.2%)', expense: '£6,800.00', pct: '64.2%', claimable: '£4,366.00' } },
        ],
        totalRow: {
          id: 'f-consumables-total',
          cells: { name: '', expense: '£56,400.00', pct: 'Total', claimable: '£53,966.00' },
        },
      },
      {
        id: 'sec-software-costs',
        type: 'costs-table',
        page: 8,
        fieldId: 'f-software',
        title: 'R&D Software Licences',
        columns: [
          { key: 'name', label: 'Licence', align: 'left' },
          { key: 'expense', label: 'Total Expense', align: 'right' },
          { key: 'pct', label: '% R&D', align: 'right' },
          { key: 'claimable', label: 'Claimable Sum', align: 'right' },
        ],
        rows: [
          { id: 'sw-aws', cells: { name: 'AWS (compute for Project 3 NLP pipeline)', expense: '£14,400.00', pct: '80%', claimable: '£11,520.00' } },
          { id: 'sw-benchling', cells: { name: 'Benchling (lab informatics)', expense: '£6,300.00', pct: '65%', claimable: '£4,095.00' } },
          { id: 'sw-geneious', cells: { name: 'Geneious Prime (sequence analysis)', expense: '£2,400.00', pct: '100%', claimable: '£2,400.00' } },
          { id: 'sw-prism', cells: { name: 'GraphPad Prism (biostatistics)', expense: '£1,800.00', pct: '50%', claimable: '£900.00' } },
          { id: 'sw-copilot', cells: { name: 'GitHub Copilot (dev productivity)', expense: '£1,650.00', pct: '55%', claimable: '£907.50' } },
          { id: 'sw-openai', cells: { name: 'OpenAI API (Project 3 experiments)', expense: '£2,900.00', pct: '80%', claimable: '£2,320.00' } },
        ],
        totalRow: {
          id: 'f-software-total',
          cells: { name: '', expense: '£29,450.00', pct: 'Total', claimable: '£22,142.50' },
        },
      },
      // Page 9 — Summary & Declaration
      {
        id: 'sec-summary',
        type: 'summary-block',
        page: 9,
        title: 'Summary of Qualifying Expenditure',
        lines: [
          { id: 'f-total-staff', label: 'Staff costs', value: '£622,440.00' },
          { id: 'f-total-sub', label: 'Subcontractors (capped at 65%)', value: '£71,890.00' },
          { id: 'f-total-consum', label: 'Consumables', value: '£53,966.00' },
          { id: 'f-total-software', label: 'Software licences', value: '£22,142.50' },
          { id: 'f-total-rd', label: 'Total qualifying R&D expenditure', value: '£770,438.50', bold: true },
          { id: 'f-enhancement', label: 'Enhancement at 86% (merged scheme)', value: '£662,577.11', bold: true },
          { id: 'f-trading-loss', label: 'Trading loss before R&D claim', value: '(£124,137.00)' },
          { id: 'f-surrender', label: 'Surrenderable loss', value: '(£597,054.00)' },
          { id: 'f-credit-due', label: 'Total R&D Credit due', value: '£96,074.58', highlight: true },
        ],
      },
      {
        id: 'sec-declaration',
        type: 'narrative-intro',
        page: 9,
        heading: 'Declaration',
        paragraphs: [
          'I declare that the information provided in this report is correct and complete to the best of my knowledge and belief. The expenditure claimed relates wholly to qualifying R&D activities as defined under the BEIS/DSIT Guidelines on the Meaning of Research and Development for Tax Purposes. Excluded activities — including routine hepatocyte culturing, commercial lot release testing, and sales-support work — have not been included in this claim.',
          'Signed: Sophie Clark, Director — Nexagen Limited. Date: 23 April 2026.',
        ],
      },
      {
        id: 'sec-declaration-signoff',
        type: 'details-panel',
        page: 9,
        title: 'Signed',
        lines: [
          { id: 'f-declaration', label: 'Declaration', value: 'Signed as correct by the Director' },
          { id: 'f-signatory', label: 'Signatory', value: 'Sophie Clark, Director' },
        ],
      },
      // Page 10 — Appendix
      {
        id: 'sec-appendix',
        type: 'appendix-table',
        page: 10,
        fieldId: 'f-appendix',
        heading: 'Appendix 1 — Submission Summary',
        columns: [
          { key: 'cat', label: 'Category of Qualifying R&D Expenditure', align: 'left' },
          { key: 'p1', label: 'Project 1 (GBP)', align: 'right' },
          { key: 'p2', label: 'Project 2 (GBP)', align: 'right' },
          { key: 'p3', label: 'Project 3 (GBP)', align: 'right' },
          { key: 'total', label: 'Total Costs (GBP)', align: 'right' },
        ],
        rows: [
          { id: 'ap-staff', cells: { cat: 'Staffing costs', p1: '£254,600', p2: '£206,200', p3: '£161,640', total: '£622,440' } },
          { id: 'ap-sub', cells: { cat: 'Subcontractors (capped)', p1: '£41,600', p2: '£19,140', p3: '£11,150', total: '£71,890' } },
          { id: 'ap-consum', cells: { cat: 'Consumables', p1: '£38,700', p2: '£12,100', p3: '£3,166', total: '£53,966' } },
          { id: 'ap-software', cells: { cat: 'Software licences', p1: '£6,200', p2: '£4,200', p3: '£11,742.50', total: '£22,142.50' } },
          { id: 'ap-total', bold: true, cells: { cat: 'Total', p1: '£341,100', p2: '£241,640', p3: '£187,698.50', total: '£770,438.50' } },
        ],
      },
    ],
  },

  'rev-2': {
    title: 'R&D Tax Claim FY2025 — Arcline Robotics Ltd',
    sections: [
      {
        id: 'sec-1',
        heading: 'Company Information',
        page: 1,
        fields: [
          { id: 'f-company-name', label: 'Company Name', value: 'Arcline Robotics Ltd' },
          { id: 'f-company-number', label: 'Company Number', value: '12847561' },
          { id: 'f-sic', label: 'SIC Code', value: '28990 — Other Special-Purpose Machinery' },
          { id: 'f-accounting-period', label: 'Accounting Period', value: '1/1/25 to 31/12/25' },
          { id: 'f-registered-address', label: 'Registered Address', value: '7 Avon Gate Business Park, Bristol, BS4 3EH' },
        ],
      },
      {
        id: 'sec-2',
        heading: 'R&D Project Descriptions',
        page: 1,
        fields: [
          { id: 'f-project1', label: 'Project 1 — Adaptive Welding Control System', value: 'Development of a real-time adaptive control system for robotic MIG welding that compensates for joint gap variation using laser seam-tracking feedback. The technological uncertainty centred on achieving consistent weld quality at traverse speeds above 1.2 m/min.' },
          { id: 'f-project2', label: 'Project 2 — Vision-Guided Assembly Cell', value: 'Integration of stereo-vision and deep-learning object detection to enable a 6-axis robot to assemble non-rigid components without fixturing. Work addressed uncertainties in grasp planning for deformable parts.' },
          { id: 'f-project3', label: 'Project 3 — Lightweight Actuator Development', value: 'Design of a compact harmonic-drive actuator with integrated torque sensing for collaborative robot joints, targeting a 30% weight reduction over existing units while maintaining ISO 10218 force limits.' },
        ],
      },
      {
        id: 'sec-3',
        heading: 'R&D Expenditure Summary',
        page: 2,
        fields: [
          { id: 'f-total-rd', label: 'Total R&D Expenditure', value: '£620,000' },
          { id: 'f-staff-costs', label: 'Staff Costs', value: '£341,000 (55%)' },
          { id: 'f-subcontractors', label: 'Subcontractors', value: '£186,000 (30%)' },
          { id: 'f-consumables', label: 'Consumables', value: '£74,400 (12%)' },
          { id: 'f-software', label: 'Software', value: '£18,600 (3%)' },
        ],
      },
      {
        id: 'sec-4',
        heading: 'Declaration',
        page: 2,
        fields: [
          { id: 'f-declaration', label: 'Declaration', value: 'I declare that the information provided in this claim is correct and complete to the best of my knowledge and belief. The expenditure claimed relates wholly to qualifying R&D activities as defined under the BIS Guidelines.' },
          { id: 'f-signatory', label: 'Signatory', value: 'Tom Andrews, Finance Director' },
        ],
      },
    ],
  },

  'rev-3': {
    title: 'R&D Tax Claim FY2025 — Ferro Dynamics Ltd',
    sections: [
      {
        id: 'sec-1',
        heading: 'Company Information',
        page: 1,
        fields: [
          { id: 'f-company-name', label: 'Company Name', value: 'Ferro Dynamics Ltd' },
          { id: 'f-company-number', label: 'Company Number', value: '09273641' },
          { id: 'f-sic', label: 'SIC Code', value: '25620 — Machining' },
          { id: 'f-accounting-period', label: 'Accounting Period', value: '1 Jul 2024 – 30 Jun 2025' },
          { id: 'f-registered-address', label: 'Registered Address', value: '22 Attercliffe Road, Sheffield, S9 3QS' },
        ],
      },
      {
        id: 'sec-2',
        heading: 'R&D Project Descriptions',
        page: 1,
        fields: [
          { id: 'f-project1', label: 'Project 1 — 5-Axis CNC Toolpath Optimisation', value: 'Development of proprietary toolpath algorithms for simultaneous 5-axis CNC machining of freeform titanium aerospace components. The uncertainty lay in minimising tool deflection while maintaining surface finish below Ra 0.8 µm.' },
          { id: 'f-project2', label: 'Project 2 — Surface Coating for Turbine Blades', value: 'Investigation of plasma-sprayed thermal barrier coatings with graded porosity for improved thermal cycling resistance on nickel-superalloy turbine blades.' },
          { id: 'f-project3', label: 'Project 3 — In-Process Metrology System', value: 'Design of an on-machine laser scanning system for real-time dimensional verification during CNC operations, aiming to eliminate post-process CMM inspection for medium-batch production.' },
        ],
      },
      {
        id: 'sec-3',
        heading: 'R&D Expenditure Summary',
        page: 2,
        fields: [
          { id: 'f-total-rd', label: 'Total R&D Expenditure', value: '£420,000' },
          { id: 'f-staff-costs', label: 'Staff Costs', value: '£210,000 (50%)' },
          { id: 'f-subcontractors', label: 'Subcontractors', value: '£63,000 (15%)' },
          { id: 'f-consumables', label: 'Consumables', value: '£117,600 (28%)' },
          { id: 'f-software', label: 'Software', value: '£29,400 (7%)' },
        ],
      },
      {
        id: 'sec-4',
        heading: 'Declaration',
        page: 2,
        fields: [
          { id: 'f-declaration', label: 'Declaration', value: 'I declare that the information provided in this claim is correct and complete to the best of my knowledge and belief. The expenditure claimed relates wholly to qualifying R&D activities as defined under the BIS Guidelines.' },
          { id: 'f-signatory', label: 'Signatory', value: 'Sophie Clark, Director' },
        ],
      },
    ],
  },

  'rev-4': {
    title: 'R&D Tax Claim FY2025 — Meridian Software Ltd',
    sections: [
      {
        id: 'sec-1',
        heading: 'Company Information',
        page: 1,
        fields: [
          { id: 'f-company-name', label: 'Company Name', value: 'Meridian Software Ltd' },
          { id: 'f-company-number', label: 'Company Number', value: '11384726' },
          { id: 'f-sic', label: 'SIC Code', value: '62012 — Business and Domestic Software Development' },
          { id: 'f-accounting-period', label: 'Accounting Period', value: '1 Apr 2024 – 31 Mar 2025' },
          { id: 'f-registered-address', label: 'Registered Address', value: '3rd Floor, 90 Whitfield Street, London, W1T 4EZ' },
        ],
      },
      {
        id: 'sec-2',
        heading: 'R&D Project Descriptions',
        page: 1,
        fields: [
          { id: 'f-project1', label: 'Project 1 — ML Anomaly Detection Engine', value: 'Development of an unsupervised machine-learning pipeline for detecting anomalous transaction patterns in real-time payment streams. The uncertainty centred on achieving sub-200ms inference latency at volumes exceeding 50K events per second.' },
          { id: 'f-project2', label: 'Project 2 — Data Pipeline Optimisation', value: 'Research into novel DAG scheduling strategies for distributed ETL pipelines, targeting a 4x throughput improvement on heterogeneous compute clusters without increasing infrastructure cost.' },
          { id: 'f-project3', label: 'Project 3 — Natural Language Query Engine', value: 'Construction of a semantic parsing layer that translates free-text business questions into optimised SQL against a multi-tenant analytics schema, handling ambiguous column references and implicit joins.' },
        ],
      },
      {
        id: 'sec-3',
        heading: 'R&D Expenditure Summary',
        page: 2,
        fields: [
          { id: 'f-total-rd', label: 'Total R&D Expenditure', value: '£340,000' },
          { id: 'f-staff-costs', label: 'Staff Costs', value: '£289,000 (85%)' },
          { id: 'f-subcontractors', label: 'Subcontractors', value: '£27,200 (8%)' },
          { id: 'f-software', label: 'Software', value: '£23,800 (7%)' },
        ],
      },
      {
        id: 'sec-4',
        heading: 'Declaration',
        page: 2,
        fields: [
          { id: 'f-declaration', label: 'Declaration', value: 'I declare that the information provided in this claim is correct and complete to the best of my knowledge and belief. The expenditure claimed relates wholly to qualifying R&D activities as defined under the BIS Guidelines.' },
          { id: 'f-signatory', label: 'Signatory', value: 'Tom Andrews, Finance Director' },
        ],
      },
    ],
  },

  'rev-5': {
    title: 'R&D Tax Claim FY2025 — Helix BioSciences Ltd',
    sections: [
      {
        id: 'sec-1',
        heading: 'Company Information',
        page: 1,
        fields: [
          { id: 'f-company-name', label: 'Company Name', value: 'Helix BioSciences Ltd' },
          { id: 'f-company-number', label: 'Company Number', value: '10572839' },
          { id: 'f-sic', label: 'SIC Code', value: '72190 — Other R&D on Natural Sciences and Engineering' },
          { id: 'f-accounting-period', label: 'Accounting Period', value: '1 Jan 2025 – 31 Dec 2025' },
          { id: 'f-registered-address', label: 'Registered Address', value: '8 Osney Mead, Oxford, OX2 0ES' },
        ],
      },
      {
        id: 'sec-2',
        heading: 'R&D Project Descriptions',
        page: 1,
        fields: [
          { id: 'f-project1', label: 'Project 1 — Biomarker Assay Development', value: 'Development of a multiplexed immunoassay panel for simultaneous quantification of six inflammatory biomarkers from dried blood spots. The uncertainty focused on achieving clinically acceptable CVs below 15% across all analytes in a point-of-care format.' },
          { id: 'f-project2', label: 'Project 2 — Phase II Trial Protocol Optimisation', value: 'Design of an adaptive Bayesian trial protocol for a novel anti-fibrotic compound, incorporating interim futility analyses and response-adaptive randomisation to reduce required sample size while maintaining statistical power above 80%.' },
        ],
      },
      {
        id: 'sec-3',
        heading: 'R&D Expenditure Summary',
        page: 2,
        fields: [
          { id: 'f-total-rd', label: 'Total R&D Expenditure', value: '£580,000' },
          { id: 'f-staff-costs', label: 'Staff Costs', value: '£232,000 (40%)' },
          { id: 'f-subcontractors', label: 'Subcontractors', value: '£261,000 (45%)' },
          { id: 'f-consumables', label: 'Consumables', value: '£87,000 (15%)' },
        ],
      },
      {
        id: 'sec-4',
        heading: 'Declaration',
        page: 2,
        fields: [
          { id: 'f-declaration', label: 'Declaration', value: 'I declare that the information provided in this claim is correct and complete to the best of my knowledge and belief. The expenditure claimed relates wholly to qualifying R&D activities as defined under the BIS Guidelines.' },
          { id: 'f-signatory', label: 'Signatory', value: 'Sophie Clark, Director' },
        ],
      },
    ],
  },
};

export function getReviewDocuments(entityName) {
  const safeName = entityName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  return [
    { id: 'rnd-report', title: 'R&D Report', filename: `R&D_Tax_Claim_${safeName}_FY2025.pdf`, typeLabel: 'PDF' },
    { id: 'ct600', title: 'CT600', filename: `CT600_${safeName}_FY2025.pdf`, typeLabel: 'PDF' },
    { id: 'tax-comp', title: 'Tax Computations', filename: `Tax_Computations_${safeName}_FY2025.pdf`, typeLabel: 'PDF' },
    { id: 'working-papers', title: 'Working Papers', filename: `Working_Papers_${safeName}_FY2025.xlsx`, typeLabel: 'XLS' },
  ]
}

export const ct600Content = {
  title: 'Corporation Tax Return CT600 — Nexagen Ltd',
  sections: [
    // PAGE 1 — Company information
    {
      id: 'ct-sec-1',
      heading: 'Company information',
      page: 1,
      fields: [
        { id: 'ct-f-company-name', box: '1', label: 'Company name', type: 'text', value: 'Nexagen Ltd' },
        { id: 'ct-f-company-number', box: '2', label: 'Company registration number', type: 'text', value: '08451293' },
        { id: 'ct-f-utr', box: '3', label: 'Tax reference', type: 'text', value: '2748 3910 5562' },
        { id: 'ct-f-type', box: '4', label: 'Type of company', type: 'text', value: '0' },
      ],
    },
    {
      id: 'ct-sec-2',
      heading: 'Northern Ireland (NI)',
      page: 1,
      intro: "Put an 'X' in the appropriate boxes below",
      fields: [
        { id: 'ct-f-ni-trading', box: '5', label: 'NI trading activity', type: 'checkbox', checked: false },
        { id: 'ct-f-sme', box: '6', label: 'SME', type: 'checkbox', checked: false },
        { id: 'ct-f-ni-employer', box: '7', label: 'NI employer', type: 'checkbox', checked: false },
        { id: 'ct-f-special', box: '8', label: 'Special circumstances', type: 'checkbox', checked: false },
      ],
    },
    {
      id: 'ct-sec-3',
      heading: 'About this return',
      page: 1,
      intro: 'This is the tax return for the company named above, for the period below',
      fields: [
        { id: 'ct-f-period-start', box: '30', label: 'from', type: 'date', value: '01/04/2024' },
        { id: 'ct-f-period-end', box: '35', label: 'to', type: 'date', value: '31/03/2025' },
        { id: 'ct-f-repayment', box: '40', label: 'A repayment is due for this return period', type: 'checkbox', checked: false },
        { id: 'ct-f-earlier-period', box: '45', label: 'Claim or relief affecting an earlier period', type: 'checkbox', checked: false },
        { id: 'ct-f-more-than-one', box: '50', label: 'Making more than one return for this company now', type: 'checkbox', checked: false },
        { id: 'ct-f-estimated', box: '55', label: 'This return contains estimated figures', type: 'checkbox', checked: false },
        { id: 'ct-f-group', box: '60', label: 'Company part of a group that is not small', type: 'checkbox', checked: false },
        { id: 'ct-f-avoidance', box: '65', label: 'Notice of disclosable avoidance schemes', type: 'checkbox', checked: false },
        { id: 'ct-f-transfer-pricing', box: '70', label: 'Compensating adjustment claimed (transfer pricing)', type: 'checkbox', checked: false },
        { id: 'ct-f-sme-exempt', box: '75', label: 'Company qualifies for SME exemption', type: 'checkbox', checked: true },
      ],
    },

    // PAGE 2 — About this return continued + Tax calculation start
    {
      id: 'ct-sec-4',
      heading: 'About this return — continued',
      page: 2,
      intro: 'Accounts and computations',
      fields: [
        { id: 'ct-f-accounts-attach', box: '80', label: 'I attach accounts and computations for the period to which this return relates', type: 'checkbox', checked: true },
        { id: 'ct-f-accounts-diff', box: '85', label: 'I attach accounts and computations for a different period', type: 'checkbox', checked: false },
        { id: 'ct-f-rd-supp', box: '142', label: 'Research and Development — form CT600L', type: 'checkbox', checked: true, note: 'Required to claim R&D tax relief / credits' },
      ],
    },
    {
      id: 'ct-sec-5',
      heading: 'Tax calculation — Turnover',
      page: 2,
      fields: [
        { id: 'ct-f-turnover', box: '145', label: 'Total turnover from trade', type: 'money', value: 3842000 },
        { id: 'ct-f-no-turnover', box: '150', label: 'Banks, building societies, insurance companies and other financial concerns', type: 'checkbox', checked: false },
      ],
    },
    {
      id: 'ct-sec-6',
      heading: 'Income',
      page: 2,
      fields: [
        { id: 'ct-f-trading-profits', box: '155', label: 'Trading profits', type: 'money', value: 2104600 },
        { id: 'ct-f-trading-losses', box: '160', label: 'Trading losses brought forward set against trading profits', type: 'money', value: 0 },
        { id: 'ct-f-net-trading', box: '165', label: 'Net trading profits — box 155 minus box 160', type: 'money', value: 2104600 },
        { id: 'ct-f-bank-interest', box: '170', label: 'Bank, building society or other interest', type: 'money', value: 18400 },
      ],
    },

    // PAGE 3 — Income continued + Chargeable gains + Profits before
    {
      id: 'ct-sec-7',
      heading: 'Income — continued',
      page: 3,
      fields: [
        { id: 'ct-f-annual-payments', box: '175', label: 'Annual payments not otherwise charged to CT', type: 'money', value: 0 },
        { id: 'ct-f-foreign-dividends', box: '180', label: 'Non-exempt dividends from non-UK resident companies', type: 'money', value: 0 },
        { id: 'ct-f-itdeducted', box: '185', label: 'Income from which Income Tax has been deducted', type: 'money', value: 0 },
        { id: 'ct-f-property', box: '190', label: 'Income from a property business', type: 'money', value: 0 },
        { id: 'ct-f-other-income', box: '205', label: 'Income not falling under any other heading', type: 'money', value: 0 },
      ],
    },
    {
      id: 'ct-sec-8',
      heading: 'Chargeable gains',
      page: 3,
      fields: [
        { id: 'ct-f-gross-gains', box: '210', label: 'Gross chargeable gains', type: 'money', value: 0 },
        { id: 'ct-f-allowable-losses', box: '215', label: 'Allowable losses including losses brought forward', type: 'money', value: 0 },
        { id: 'ct-f-net-gains', box: '220', label: 'Net chargeable gains — box 210 minus box 215', type: 'money', value: 0 },
      ],
    },
    {
      id: 'ct-sec-9',
      heading: 'Profits before deductions and reliefs',
      page: 3,
      fields: [
        { id: 'ct-f-losses-bf', box: '225', label: 'Losses brought forward against certain investment income', type: 'money', value: 0 },
        { id: 'ct-f-deficits-bf', box: '230', label: 'Non-trade deficits on loan relationships brought forward', type: 'money', value: 0 },
        { id: 'ct-f-profits-before', box: '235', label: 'Profits before other deductions and reliefs', type: 'money', value: 2123000 },
      ],
    },

    // PAGE 4 — Deductions + Tax calculation
    {
      id: 'ct-sec-10',
      heading: 'Deductions and reliefs',
      page: 4,
      fields: [
        { id: 'ct-f-charitable', box: '305', label: 'Qualifying donations', type: 'money', value: 5000 },
        { id: 'ct-f-group-relief', box: '310', label: 'Group relief', type: 'money', value: 0 },
        { id: 'ct-f-profits-chargeable', box: '315', label: 'Profits chargeable to Corporation Tax', type: 'money', value: 2118000, note: 'box 300 minus boxes 305, 310 and 312' },
      ],
    },
    {
      id: 'ct-sec-11',
      heading: 'Tax calculation',
      page: 4,
      fields: [
        { id: 'ct-f-associated', box: '326', label: 'Number of associated companies in this period', type: 'text', value: '0' },
        { id: 'ct-f-small-profit', box: '329', label: 'Company chargeable at small profits rate or entitled to marginal relief', type: 'checkbox', checked: false },
        { id: 'ct-f-ct-amount', box: '345', label: 'Corporation Tax (25% × profits chargeable)', type: 'money', value: 529500 },
      ],
    },

    // PAGE 5 — Tax calculation continued + Reliefs in terms of tax + R&D
    {
      id: 'ct-sec-12',
      heading: 'Tax calculation — continued',
      page: 5,
      fields: [
        { id: 'ct-f-ct-before-credits', box: '430', label: 'Corporation Tax — total of boxes 345, 360, 375, 395, 410 and 425', type: 'money', value: 529500 },
        { id: 'ct-f-marginal-relief', box: '435', label: 'Marginal relief', type: 'money', value: 0 },
        { id: 'ct-f-ct-chargeable', box: '440', label: 'Corporation Tax chargeable — box 430 minus box 435', type: 'money', value: 529500 },
      ],
    },
    {
      id: 'ct-sec-13',
      heading: 'Research and Development (CT600L reference)',
      page: 5,
      intro: 'Figures reported on supplementary form CT600L — shown here for cross-reference',
      fields: [
        { id: 'ct-f-rd-expenditure', box: 'L205', label: 'Qualifying R&D expenditure (merged scheme)', type: 'money', value: 412000 },
        { id: 'ct-f-rd-enhanced', box: 'L210', label: 'Enhanced expenditure credit (20% of qualifying)', type: 'money', value: 82400 },
        { id: 'ct-f-rdec-net', box: 'L215', label: 'Net benefit after 25% notional tax on credit', type: 'money', value: 61800 },
      ],
    },
    {
      id: 'ct-sec-14',
      heading: 'Calculation of tax outstanding or overpaid',
      page: 5,
      fields: [
        { id: 'ct-f-net-ct', box: '475', label: 'Net Corporation Tax liability — box 440 minus box 470', type: 'money', value: 447100 },
        { id: 'ct-f-tax-already-paid', box: '510', label: 'Tax already paid (QIPs)', type: 'money', value: 440000 },
        { id: 'ct-f-tax-outstanding', box: '525', label: 'Tax outstanding', type: 'money', value: 7100 },
      ],
    },
    {
      id: 'ct-sec-15',
      heading: 'Declaration',
      page: 5,
      groupStyle: 'plain',
      fields: [
        { id: 'ct-f-declaration', box: '—', label: 'I declare that the information I have given on this return is correct and complete to the best of my knowledge and belief.', type: 'text', value: 'Signed: Sophie Clark, Director   ·   Date: 14/07/2025' },
      ],
    },
  ],
}

export const taxCompContent = {
  title: 'Tax Computations FY2025 — Nexagen Ltd',
  sections: [
    {
      id: 'tc-sec-1',
      heading: 'Company & Period',
      page: 1,
      fields: [
        { id: 'tc-company', label: 'Company', value: 'Nexagen Ltd' },
        { id: 'tc-company-number', label: 'Company Number', value: '08451293' },
        { id: 'tc-period', label: 'Accounting Period', value: '1 Apr 2024 – 31 Mar 2025' },
        { id: 'tc-ct-ref', label: 'CT Reference', value: '2748193726' },
      ],
    },
    {
      id: 'tc-sec-2',
      heading: 'Profit & Loss Account Adjustments',
      page: 1,
      fields: [
        { id: 'tc-turnover', label: 'Turnover', value: '£8,412,600' },
        { id: 'tc-cos', label: 'Less: Cost of Sales', value: '(£4,873,200)' },
        { id: 'tc-gross-profit', label: 'Gross Profit', value: '£3,539,400' },
        { id: 'tc-admin', label: 'Less: Administrative Expenses', value: '(£1,284,100)' },
        { id: 'tc-other-income', label: 'Other Operating Income', value: '£37,500' },
        { id: 'tc-pnl-profit', label: 'Net Profit per Accounts', value: '£2,292,800' },
        { id: 'tc-depreciation', label: 'Add back: Depreciation', value: '£186,400' },
        { id: 'tc-entertaining', label: 'Add back: Entertaining', value: '£12,350' },
        { id: 'tc-general-provisions', label: 'Add back: General Provisions', value: '£8,600' },
        { id: 'tc-capital-allowances', label: 'Less: Capital Allowances (AIA + WDA)', value: '(£142,750)' },
        { id: 'tc-lease-adj', label: 'Less: Lease Rental Restriction Adjustment', value: '(£4,200)' },
        { id: 'tc-adj-trading-profit', label: 'Adjusted Trading Profit', value: '£2,353,200' },
      ],
    },
    {
      id: 'tc-sec-3',
      heading: 'R&D Qualifying Expenditure — Merged Scheme',
      page: 2,
      fields: [
        { id: 'tc-rd-staff', label: 'Qualifying Staff Costs', value: '£412,800' },
        { id: 'tc-rd-epp', label: 'Less: EPP Staff Costs Adjustment (65%)', value: '(£0)' },
        { id: 'tc-rd-sub', label: 'Subcontractor Costs', value: '£148,200' },
        { id: 'tc-rd-sub-restrict', label: 'Less: Subcontractor Restriction (65%)', value: '(£51,870)' },
        { id: 'tc-rd-consumables', label: 'Consumables', value: '£74,600' },
        { id: 'tc-rd-software', label: 'Software Licences', value: '£42,350' },
        { id: 'tc-rd-cloud', label: 'Cloud Computing / Data Costs', value: '£6,120' },
        { id: 'tc-rd-total-qee', label: 'Total Qualifying Expenditure (QEE)', value: '£770,438.50' },
        { id: 'tc-rd-rate', label: 'Enhancement Rate (merged scheme)', value: '86%' },
        { id: 'tc-rd-enhanced', label: 'Enhanced Deduction (£770,438.50 × 86%)', value: '£662,577.11' },
      ],
    },
    {
      id: 'tc-sec-4',
      heading: 'Corporation Tax Computation',
      page: 3,
      fields: [
        { id: 'tc-adj-profit', label: 'Adjusted Trading Profit', value: '£2,353,200' },
        { id: 'tc-less-rd', label: 'Less: R&D Enhanced Deduction', value: '(£543,692)' },
        { id: 'tc-taxable-trading', label: 'Taxable Trading Profit', value: '£1,809,508' },
        { id: 'tc-investment-income', label: 'Add: Investment Income', value: '£14,200' },
        { id: 'tc-total-profits', label: 'Total Profits Chargeable to CT', value: '£1,823,708' },
        { id: 'tc-ct-rate', label: 'Corporation Tax @ 25%', value: '£455,927' },
        { id: 'tc-rdec-credit', label: 'Less: RDEC Credit (20% × £632,200)', value: '(£126,440)' },
        { id: 'tc-rdec-tax', label: 'Less: Tax on RDEC (25% × £126,440)', value: '£31,610' },
        { id: 'tc-rdec-net', label: 'Net RDEC Benefit', value: '(£94,830)' },
        { id: 'tc-ct-payable', label: 'Corporation Tax Payable', value: '£361,097' },
      ],
    },
    {
      id: 'tc-sec-5',
      heading: 'Prepared By',
      page: 3,
      fields: [
        { id: 'tc-prepared', label: 'Prepared By', value: 'Sophie Clark, Tax Manager' },
        { id: 'tc-date', label: 'Date', value: '18 June 2025' },
        { id: 'tc-status', label: 'Status', value: 'Draft — Subject to Review' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// Working-papers workbook — modelled on a real R&D claim workbook
// Staff rows drive Spend-by-Project totals (computed below)
// ─────────────────────────────────────────────────────────────────

const staffRaw = [
  // [Name, Position, Dept, AnnualSalary, PAYE, EmpEeNI, EmpErNI, Pension, P1%, P2%, P3%]
  ['Dr Sarah Chen',       'Principal Scientist',      'R&D',         92000, 20400, 5970, 11685, 4600, 60, 20, 10],
  ['James Whitfield',     'Senior Chemical Engineer', 'R&D',         78000, 16200, 4890,  9753, 3900, 40, 35, 15],
  ['Dr Amara Osei',       'Research Chemist',         'R&D',         65000, 13200, 3930,  7959, 3250, 70, 15,  5],
  ['Tom Brennan',         'Process Engineer',         'Engineering', 62000, 12500, 3810,  7545, 3100, 25, 50, 10],
  ['Lucy Hargreaves',     'Lab Technician',           'R&D',         34000,  6020, 2130,  3681, 1700, 45, 25, 20],
  ['Raj Patel',           'Senior Software Engineer', 'Digital',     74000, 15200, 4650,  9201, 3700,  0,  0, 70],
  ['Fiona McCarthy',      'R&D Project Manager',      'R&D',         68000, 13900, 4170,  8373, 3400, 35, 30, 15],
  ['Dr Kwame Asante',     'Materials Scientist',      'R&D',         71000, 14600, 4380,  8787, 3550, 55, 10, 25],
  ['Emma Gallagher',      'Lab Technician',           'R&D',         32000,  5600, 1980,  3405, 1600, 40, 30, 20],
  ['Ben Holloway',        'Mechanical Engineer',      'Engineering', 58000, 11400, 3570,  6993, 2900, 20, 45,  5],
  ['Priya Sharma',        'Data Analyst',             'Digital',     45000,  8800, 2700,  5199, 2250,  0,  5, 45],
  ['Dr Neil Ashworth',    'Research Scientist',       'R&D',         82000, 17500, 5160, 10305, 4100, 50, 25, 15],
  ['Katie Oldham',        'Quality Engineer',         'Engineering', 48000,  9400, 2850,  5613, 2400, 10, 20, 15],
  ['Marcus Fry',          'Electronics Engineer',     'Engineering', 55000, 10800, 3300,  6579, 2750, 20, 35, 10],
  ['Hannah Lowe',         'Junior Research Chemist',  'R&D',         36000,  6450, 2220,  3957, 1800, 50, 20, 15],
  ['Oliver Dunn',         'R&D Technician',           'R&D',         30000,  5200, 1860,  3129, 1500, 35, 25, 30],
  ['Zara Iqbal',          'Bioprocess Engineer',      'R&D',         60000, 12000, 3660,  7269, 3000, 45, 30, 10],
]

function buildStaffSheet() {
  const rows = []
  let totalGross = 0, totalPAYE = 0, totalEENI = 0, totalERNI = 0, totalPension = 0, totalTotal = 0
  let totalRDCost = 0
  let totalP1 = 0, totalP2 = 0, totalP3 = 0

  for (const s of staffRaw) {
    const [name, pos, dept, salary, paye, eeni, erni, pension, p1, p2, p3] = s
    const total = salary + erni + pension
    const rdPct = p1 + p2 + p3
    const rdCost = Math.round((total * rdPct) / 100)
    const p1Cost = Math.round((total * p1) / 100)
    const p2Cost = Math.round((total * p2) / 100)
    const p3Cost = Math.round((total * p3) / 100)
    totalGross += salary; totalPAYE += paye; totalEENI += eeni; totalERNI += erni; totalPension += pension
    totalTotal += total; totalRDCost += rdCost
    totalP1 += p1Cost; totalP2 += p2Cost; totalP3 += p3Cost
    const rowN = rows.length + 2 // header row = 1, data starts at 2
    rows.push({
      cells: {
        name, position: pos, department: dept,
        salary, paye, eeni, erni, pension,
        total: { value: total, formula: `=D${rowN}+G${rowN}+H${rowN}` },
        p1, p2, p3,
        rdpct: { value: rdPct, formula: `=I${rowN}+J${rowN}+K${rowN}` },
        rdcost: { value: rdCost, formula: `=I${rowN}*$I$1+J${rowN}*$J$1+K${rowN}*$K$1 (simplified)` },
      },
    })
  }
  rows.push({
    style: 'total',
    cells: {
      name: 'TOTALS', position: '', department: '',
      salary: { value: totalGross, formula: '=SUM(D2:D18)' },
      paye: { value: totalPAYE, formula: '=SUM(E2:E18)' },
      eeni: { value: totalEENI, formula: '=SUM(F2:F18)' },
      erni: { value: totalERNI, formula: '=SUM(G2:G18)' },
      pension: { value: totalPension, formula: '=SUM(H2:H18)' },
      total: { value: totalTotal, formula: '=SUM(I2:I18)' },
      rdpct: '',
      rdcost: { value: totalRDCost, formula: '=SUM(M2:M18)' },
    },
  })
  return { rows, totals: { totalGross, totalPAYE, totalEENI, totalERNI, totalPension, totalTotal, totalRDCost, totalP1, totalP2, totalP3 } }
}

const { rows: staffRows, totals: staffTotals } = buildStaffSheet()

// Subcontractors
const subRows = [
  { cells: { date: '2024-05-14', type: 'Invoice', transaction: 'Oxford CRISPR Therapeutics — Cas9 gRNA library screen (Project 1)', reference: 'OCT-2024-0118', debit: 38400, nominal: '5200 R&D subcon', xero: 'PROJ-1', labour: 70, materials: 30, rdpct: 100, rdcost: 38400 } },
  { cells: { date: '2024-07-22', type: 'Invoice', transaction: 'GenScript — guide RNA oligo synthesis (Project 1)', reference: 'GS-824-1102', debit: 12600, nominal: '5200 R&D subcon', xero: 'PROJ-1', labour: 0, materials: 100, rdpct: 100, rdcost: 12600 } },
  { cells: { date: '2024-09-03', type: 'Invoice', transaction: 'Dr M. Lindqvist — LNP formulation consulting (Project 1)', reference: 'ML-2024-009', debit: 18250, nominal: '5200 R&D subcon', xero: 'PROJ-1', labour: 100, materials: 0, rdpct: 100, rdcost: 18250 } },
  { cells: { date: '2024-10-18', type: 'Invoice', transaction: 'Reaction Biology UK — STAT3 HTS panel screen (Project 2)', reference: 'RBUK-45821', debit: 23400, nominal: '5200 R&D subcon', xero: 'PROJ-2', labour: 40, materials: 60, rdpct: 100, rdcost: 23400 } },
  { cells: { date: '2024-11-29', type: 'Invoice', transaction: 'BioTools Consulting — STAT3 assay optimisation (Project 2)', reference: 'BTC-0331', debit: 8800, nominal: '5200 R&D subcon', xero: 'PROJ-2', labour: 100, materials: 0, rdpct: 100, rdcost: 8800 } },
  { cells: { date: '2025-01-14', type: 'Invoice', transaction: 'Ensembl Partners — biomedical literature corpus licence (Project 3)', reference: 'EP-24-1198', debit: 6200, nominal: '5200 R&D subcon', xero: 'PROJ-3', labour: 0, materials: 100, rdpct: 100, rdcost: 6200 } },
  { cells: { date: '2025-02-02', type: 'Invoice', transaction: 'Dr A. Tomasina — NLP model evaluation (Project 3)', reference: 'AT-2025-01', debit: 11500, nominal: '5200 R&D subcon', xero: 'PROJ-3', labour: 100, materials: 0, rdpct: 100, rdcost: 11500 } },
  { cells: { date: '2025-03-15', type: 'Invoice', transaction: 'BioStats Ltd — trial data cleaning (non-R&D)', reference: 'BS-25-0341', debit: 3400, nominal: '7100 Admin', xero: '', labour: 100, materials: 0, rdpct: 0, rdcost: 0 } },
]
const subTotal = subRows.reduce((a, r) => a + r.cells.debit, 0)
const subRDTotal = subRows.reduce((a, r) => a + r.cells.rdcost, 0)
// Restricted subcontractor amount @ 65% (for SME scheme) — purely illustrative
const subRestricted65 = Math.round(subRDTotal * 0.65)
subRows.push({ style: 'total', cells: { date: '', type: '', transaction: 'Total', reference: '', debit: { value: subTotal, formula: '=SUM(E2:E9)' }, nominal: '', xero: '', labour: '', materials: '', rdpct: '', rdcost: { value: subRDTotal, formula: '=SUMIF(J2:J9,">0",E2:E9)' } } })
subRows.push({ cells: { date: '', type: '', transaction: 'Restricted at 65% (Ch.2 Pt.13 CTA 2009)', reference: '', debit: '', nominal: '', xero: '', labour: '', materials: '', rdpct: '', rdcost: { value: subRestricted65, formula: '=K10*0.65' } } })

// Materials & consumables
const materialsRows = [
  { cells: { date: '2024-04-08', type: 'Invoice', transaction: 'Avanti Polar Lipids — DOPE, DSPC, cholesterol (Project 1)', reference: 'APL-24-812', debit: 8420, nominal: '5100 Consumables', xero: 'PROJ-1', rdpct: 100, rdcost: 8420 } },
  { cells: { date: '2024-04-19', type: 'Invoice', transaction: 'IDT DNA — synthetic gRNAs, primers', reference: 'IDT-24-4431', debit: 6280, nominal: '5100 Consumables', xero: 'PROJ-1', rdpct: 100, rdcost: 6280 } },
  { cells: { date: '2024-05-02', type: 'Invoice', transaction: 'Thermo Fisher — Cas9 protein, electroporation buffer', reference: 'TF-55821', debit: 12100, nominal: '5100 Consumables', xero: 'PROJ-1', rdpct: 100, rdcost: 12100 } },
  { cells: { date: '2024-05-17', type: 'Invoice', transaction: 'ATCC — HEK293FT, HepG2 cell lines', reference: 'ATCC-2438', debit: 2340, nominal: '5100 Consumables', xero: 'PROJ-1,2', rdpct: 100, rdcost: 2340 } },
  { cells: { date: '2024-06-06', type: 'Invoice', transaction: 'Gibco — DMEM, Opti-MEM, FBS (media)', reference: 'GB-24-3391', debit: 4180, nominal: '5100 Consumables', xero: 'PROJ-1,2', rdpct: 100, rdcost: 4180 } },
  { cells: { date: '2024-07-12', type: 'Invoice', transaction: 'Sarstedt — serological pipettes, T75 flasks, 96-well', reference: 'SS-24-9912', debit: 3680, nominal: '5100 Consumables', xero: 'PROJ-1,2', rdpct: 100, rdcost: 3680 } },
  { cells: { date: '2024-08-05', type: 'Invoice', transaction: 'Roche — LightCycler qPCR probes & master mix', reference: 'RO-24-1201', debit: 5420, nominal: '5100 Consumables', xero: 'PROJ-1,2', rdpct: 100, rdcost: 5420 } },
  { cells: { date: '2024-09-14', type: 'Invoice', transaction: 'New England Biolabs — restriction enzymes, Phusion polymerase', reference: 'NEB-24-773', debit: 3110, nominal: '5100 Consumables', xero: 'PROJ-1', rdpct: 100, rdcost: 3110 } },
  { cells: { date: '2024-10-22', type: 'Invoice', transaction: 'Selleck Chemicals — STAT3 inhibitor compound library (360 cpds)', reference: 'SC-24-4419', debit: 9840, nominal: '5100 Consumables', xero: 'PROJ-2', rdpct: 100, rdcost: 9840 } },
  { cells: { date: '2024-11-08', type: 'Invoice', transaction: 'Cell Signaling Technology — STAT3/p-STAT3 antibody panel', reference: 'CST-24-2213', debit: 4180, nominal: '5100 Consumables', xero: 'PROJ-2', rdpct: 100, rdcost: 4180 } },
  { cells: { date: '2024-12-03', type: 'Invoice', transaction: 'Nimrod Labs — custom fluorescent reporter plasmids', reference: 'NL-24-117', debit: 6750, nominal: '5100 Consumables', xero: 'PROJ-2', rdpct: 100, rdcost: 6750 } },
  { cells: { date: '2025-01-19', type: 'Invoice', transaction: 'Oxford Nanopore — sequencing flow cells (MinION)', reference: 'ON-25-0042', debit: 4500, nominal: '5100 Consumables', xero: 'PROJ-1', rdpct: 100, rdcost: 4500 } },
  { cells: { date: '2025-02-07', type: 'Invoice', transaction: 'Starstedt — general labware (office kitchen supplies mixed in)', reference: 'SS-25-0198', debit: 1400, nominal: '5100 Consumables', xero: '', rdpct: 50, rdcost: 700 } },
  { cells: { date: '2025-03-01', type: 'Invoice', transaction: 'VWR — pH buffers, weighing paper', reference: 'VWR-25-1244', debit: 860, nominal: '5100 Consumables', xero: 'PROJ-1,2', rdpct: 100, rdcost: 860 } },
]
const materialsTotal = materialsRows.reduce((a, r) => a + r.cells.debit, 0)
const materialsRDTotal = materialsRows.reduce((a, r) => a + r.cells.rdcost, 0)
materialsRows.push({ style: 'total', cells: { date: '', type: '', transaction: 'Total', reference: '', debit: { value: materialsTotal, formula: '=SUM(E2:E15)' }, nominal: '', xero: '', rdpct: '', rdcost: { value: materialsRDTotal, formula: '=SUMPRODUCT(E2:E15,H2:H15)/100' } } })

// Software & cloud
const softwareRows = [
  { cells: { date: '2024-04-01', type: 'Subscription', transaction: 'AWS — EC2 g5.xlarge GPU instances + S3 (R&D workloads)', reference: 'AWS-2024-Q2', debit: 9640, nominal: '5300 Software', xero: 'PROJ-1,2,3', rdpct: 95, rdcost: 9158 } },
  { cells: { date: '2024-04-15', type: 'Subscription', transaction: 'Benchling — ELN platform, enterprise tier', reference: 'BL-2024-YR', debit: 11400, nominal: '5300 Software', xero: 'PROJ-1,2', rdpct: 100, rdcost: 11400 } },
  { cells: { date: '2024-05-01', type: 'Licence', transaction: 'Geneious Prime — 10 seats', reference: 'GP-24-SEAT10', debit: 4100, nominal: '5300 Software', xero: 'PROJ-1,2', rdpct: 100, rdcost: 4100 } },
  { cells: { date: '2024-06-01', type: 'Licence', transaction: 'GraphPad Prism — 6 seats', reference: 'GP-PRISM-6', debit: 1740, nominal: '5300 Software', xero: 'PROJ-1,2', rdpct: 100, rdcost: 1740 } },
  { cells: { date: '2024-07-01', type: 'Subscription', transaction: 'GitHub Copilot Business — 5 seats', reference: 'GH-CP-5', debit: 1140, nominal: '5300 Software', xero: 'PROJ-3', rdpct: 100, rdcost: 1140 } },
  { cells: { date: '2024-07-15', type: 'Subscription', transaction: 'OpenAI API — GPT-4o / embeddings credits (lit-review pipeline)', reference: 'OAI-24-1134', debit: 4620, nominal: '5300 Software', xero: 'PROJ-3', rdpct: 100, rdcost: 4620 } },
  { cells: { date: '2024-08-01', type: 'Subscription', transaction: 'Microsoft 365 — 38 seats (general business software)', reference: 'MS-24-ALL', debit: 3960, nominal: '5300 Software', xero: '', rdpct: 0, rdcost: 0 } },
  { cells: { date: '2024-10-01', type: 'Licence', transaction: 'CollabWare — project management (CLOUD, R&D ops support)', reference: 'CW-24-0431', debit: 2100, nominal: '5300 Software', xero: 'PROJ-1,2', rdpct: 80, rdcost: 1680 } },
]
const softwareTotal = softwareRows.reduce((a, r) => a + r.cells.debit, 0)
const softwareRDTotal = softwareRows.reduce((a, r) => a + r.cells.rdcost, 0)
softwareRows.push({ style: 'total', cells: { date: '', type: '', transaction: 'Total', reference: '', debit: { value: softwareTotal, formula: '=SUM(E2:E9)' }, nominal: '', xero: '', rdpct: '', rdcost: { value: softwareRDTotal, formula: '=SUMPRODUCT(E2:E9,H2:H9)/100' } } })

// ── Summary — derive totals from constituent sheets ──
const staffRDTotal = staffTotals.totalRDCost
const qualifyingTotal = staffRDTotal + subRestricted65 + materialsRDTotal + softwareRDTotal

const summaryRows = [
  { style: 'header', cells: { category: 'Nexagen Ltd — AP 1 Apr 2024 to 31 Mar 2025', p1: '', p2: '', p3: '', total: '', qualifying: '' } },
  { cells: { category: 'Scheme claimed', p1: '', p2: '', p3: '', total: '', qualifying: 'Merged (FA 2024)' } },
  { cells: { category: '—', p1: 'CRISPR Delivery', p2: 'STAT3 Screening', p3: 'AI Lit Review', total: 'Total', qualifying: 'Qualifying' } },
  {
    cells: {
      category: 'Staff costs',
      p1: { value: staffTotals.totalP1, formula: '=SUMPRODUCT(Staff!I2:I18,Staff!M2:M18)/100' },
      p2: { value: staffTotals.totalP2, formula: '=SUMPRODUCT(Staff!J2:J18,Staff!M2:M18)/100' },
      p3: { value: staffTotals.totalP3, formula: '=SUMPRODUCT(Staff!K2:K18,Staff!M2:M18)/100' },
      total: { value: staffTotals.totalP1 + staffTotals.totalP2 + staffTotals.totalP3, formula: '=SUM(B4:D4)' },
      qualifying: { value: staffRDTotal, formula: '=Staff!M19' },
    },
  },
  {
    cells: {
      category: 'Subcontractors (gross)',
      p1: 69250, p2: 32200, p3: 17700,
      total: { value: subRDTotal, formula: '=SUM(B5:D5)' },
      qualifying: { value: subRestricted65, formula: '=Subcontractors!K11' },
    },
  },
  {
    cells: {
      category: 'Materials & consumables',
      p1: 46630, p2: 18730, p3: 0,
      total: { value: materialsRDTotal, formula: '=SUM(B6:D6)' },
      qualifying: { value: materialsRDTotal, formula: "='Materials'!K15" },
    },
  },
  {
    cells: {
      category: 'Software / cloud',
      p1: 8900, p2: 11400, p3: 13558,
      total: { value: softwareRDTotal, formula: '=SUM(B7:D7)' },
      qualifying: { value: softwareRDTotal, formula: "='Software'!K10" },
    },
  },
  { style: 'blank' },
  {
    style: 'total',
    cells: {
      category: 'Total qualifying R&D expenditure',
      p1: '', p2: '', p3: '',
      total: '',
      qualifying: { value: qualifyingTotal, formula: '=SUM(F4:F7)' },
    },
  },
  { style: 'blank' },
  { cells: { category: 'Enhanced credit @ 20% (merged scheme)', p1: '', p2: '', p3: '', total: '', qualifying: { value: Math.round(qualifyingTotal * 0.20), formula: '=F9*0.20' } } },
  { cells: { category: 'Net benefit after 25% notional tax', p1: '', p2: '', p3: '', total: '', qualifying: { value: Math.round(qualifyingTotal * 0.20 * 0.75), formula: '=F11*0.75' } } },
]

// ── Spend by Project matrix (simpler view — categories × projects) ──
const spendByProjectRows = [
  { style: 'header', cells: { category: 'Spend by project (gross, pre-restriction)', p1: '', p2: '', p3: '', total: '' } },
  { cells: { category: 'Project start', p1: '01/06/2023', p2: '01/01/2024', p3: '01/03/2024', total: '—' } },
  { cells: { category: 'Project end', p1: '31/12/2024', p2: '31/12/2024', p3: '31/12/2024', total: '—' } },
  { cells: { category: 'Scientific lead', p1: 'Dr Sarah Chen', p2: 'Dr Neil Ashworth', p3: 'Fiona McCarthy', total: '—' } },
  { cells: { category: 'Location', p1: 'Cambridge lab', p2: 'Cambridge lab', p3: 'Cambridge HQ', total: '—' } },
  { style: 'blank' },
  { cells: { category: 'Staff (qualifying)', p1: staffTotals.totalP1, p2: staffTotals.totalP2, p3: staffTotals.totalP3, total: staffRDTotal } },
  { cells: { category: 'Subcontractors (gross)', p1: 69250, p2: 32200, p3: 17700, total: subRDTotal } },
  { cells: { category: 'Materials & consumables', p1: 46630, p2: 18730, p3: 0, total: materialsRDTotal } },
  { cells: { category: 'Software / cloud', p1: 8900, p2: 11400, p3: 13558, total: softwareRDTotal } },
  {
    style: 'total',
    cells: {
      category: 'Total (gross)',
      p1: { value: staffTotals.totalP1 + 69250 + 46630 + 8900, formula: '=SUM(B7:B10)' },
      p2: { value: staffTotals.totalP2 + 32200 + 18730 + 11400, formula: '=SUM(C7:C10)' },
      p3: { value: staffTotals.totalP3 + 17700 + 0 + 13558, formula: '=SUM(D7:D10)' },
      total: { value: staffRDTotal + subRDTotal + materialsRDTotal + softwareRDTotal, formula: '=SUM(E7:E10)' },
    },
  },
  { style: 'blank' },
  { cells: { category: 'Apportionment method', p1: 'Timesheet %', p2: 'Timesheet %', p3: 'Direct attribution', total: '—' } },
]

export const workingPapersWorkbook = {
  filename: 'Nexagen Ltd - R&D Tax Credits 01.04.2024 to 31.03.2025.xlsx',
  activeSheetId: 'summary',
  sheets: [
    {
      id: 'summary',
      name: 'Summary',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'category',   label: 'Cost category',            width: 290, format: 'text' },
        { key: 'p1',         label: 'CRISPR Delivery',          width: 140, format: 'currency0' },
        { key: 'p2',         label: 'STAT3 Screening',          width: 140, format: 'currency0' },
        { key: 'p3',         label: 'AI Lit Review',            width: 140, format: 'currency0' },
        { key: 'total',      label: 'Total',                    width: 130, format: 'currency0' },
        { key: 'qualifying', label: 'Qualifying',               width: 140, format: 'currency0' },
      ],
      rows: summaryRows,
    },
    {
      id: 'spend-by-project',
      name: 'Spend by Project',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'category', label: 'Item',               width: 260, format: 'text' },
        { key: 'p1',       label: 'Project 1',          width: 180, format: 'currency0' },
        { key: 'p2',       label: 'Project 2',          width: 180, format: 'currency0' },
        { key: 'p3',       label: 'Project 3',          width: 180, format: 'currency0' },
        { key: 'total',    label: 'Total',              width: 130, format: 'currency0' },
      ],
      rows: spendByProjectRows,
    },
    {
      id: 'staff',
      name: 'Staff',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'name',       label: 'Employee',          width: 180, format: 'text' },
        { key: 'position',   label: 'Position',          width: 190, format: 'text' },
        { key: 'department', label: 'Dept',              width: 110, format: 'text' },
        { key: 'salary',     label: 'Gross pay',         width: 110, format: 'currency0' },
        { key: 'paye',       label: 'PAYE',              width: 100, format: 'currency0' },
        { key: 'eeni',       label: "Employee NI",       width: 110, format: 'currency0' },
        { key: 'erni',       label: "Employer NI",       width: 110, format: 'currency0' },
        { key: 'pension',    label: 'Pension',           width: 100, format: 'currency0' },
        { key: 'total',      label: 'Total cost',        width: 120, format: 'currency0' },
        { key: 'p1',         label: 'P1 %',              width: 70,  format: 'percent' },
        { key: 'p2',         label: 'P2 %',              width: 70,  format: 'percent' },
        { key: 'p3',         label: 'P3 %',              width: 70,  format: 'percent' },
        { key: 'rdpct',      label: 'R&D %',             width: 80,  format: 'percent' },
        { key: 'rdcost',     label: 'R&D qualifying',    width: 130, format: 'currency0' },
      ],
      rows: staffRows,
    },
    {
      id: 'subcontractors',
      name: 'Subcontractors',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'date',        label: 'Date',          width: 100, format: 'date' },
        { key: 'type',        label: 'Type',          width: 100, format: 'text' },
        { key: 'transaction', label: 'Transaction',   width: 360, format: 'text' },
        { key: 'reference',   label: 'Reference',     width: 140, format: 'text' },
        { key: 'debit',       label: 'Debit',         width: 110, format: 'currency0' },
        { key: 'nominal',     label: 'Nominal code',  width: 150, format: 'text' },
        { key: 'xero',        label: 'Xero project',  width: 100, format: 'text' },
        { key: 'labour',      label: 'Labour %',      width: 80,  format: 'percent' },
        { key: 'materials',   label: 'Materials %',   width: 90,  format: 'percent' },
        { key: 'rdpct',       label: 'R&D %',         width: 80,  format: 'percent' },
        { key: 'rdcost',      label: 'R&D qualifying', width: 130, format: 'currency0' },
      ],
      rows: subRows,
    },
    {
      id: 'materials',
      name: 'Materials & Consumables',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'date',        label: 'Date',          width: 100, format: 'date' },
        { key: 'type',        label: 'Type',          width: 100, format: 'text' },
        { key: 'transaction', label: 'Transaction',   width: 380, format: 'text' },
        { key: 'reference',   label: 'Reference',     width: 140, format: 'text' },
        { key: 'debit',       label: 'Debit',         width: 110, format: 'currency0' },
        { key: 'nominal',     label: 'Nominal code',  width: 160, format: 'text' },
        { key: 'xero',        label: 'Xero project',  width: 110, format: 'text' },
        { key: 'rdpct',       label: 'R&D %',         width: 80,  format: 'percent' },
        { key: 'rdcost',      label: 'R&D qualifying', width: 130, format: 'currency0' },
      ],
      rows: materialsRows,
    },
    {
      id: 'software',
      name: 'Software & Cloud',
      frozenRows: 1,
      frozenCols: 1,
      columns: [
        { key: 'date',        label: 'Date',          width: 100, format: 'date' },
        { key: 'type',        label: 'Type',          width: 110, format: 'text' },
        { key: 'transaction', label: 'Transaction',   width: 380, format: 'text' },
        { key: 'reference',   label: 'Reference',     width: 140, format: 'text' },
        { key: 'debit',       label: 'Debit',         width: 110, format: 'currency0' },
        { key: 'nominal',     label: 'Nominal code',  width: 160, format: 'text' },
        { key: 'xero',        label: 'Xero project',  width: 110, format: 'text' },
        { key: 'rdpct',       label: 'R&D %',         width: 80,  format: 'percent' },
        { key: 'rdcost',      label: 'R&D qualifying', width: 130, format: 'currency0' },
      ],
      rows: softwareRows,
    },
  ],
}

// Backwards-compat: keep the old `workingPapersData` export so CheckDetail can still import it.
// SpreadsheetWorkbook will prefer `workingPapersWorkbook` when both are passed.
export const workingPapersData = workingPapersWorkbook
