export const taxAreas = {
  "jurisdiction": "UK",
  "taxonomy_type": "tax_areas",
  "areas": [
    {"code": "corporation_tax", "label": "Corporation Tax", "subcategories": [
      {"code": "rd_relief", "label": "R&D Tax Relief", "subcategories": [
        {"code": "sme_rd_relief", "label": "SME R&D relief"},
        {"code": "rdec", "label": "RDEC"},
        {"code": "merged_rd_scheme", "label": "Merged R&D scheme"},
        {"code": "eris", "label": "ERIS"}
      ]},
      {"code": "corporate_loss_relief", "label": "Corporate Loss Relief", "subcategories": [
        {"code": "losses_carry_forward", "label": "Carry forward losses"},
        {"code": "losses_carry_back", "label": "Carry back losses"},
        {"code": "group_relief", "label": "Group relief"}
      ]},
      {"code": "corporate_interest_restriction", "label": "Corporate Interest Restriction"},
      {"code": "controlled_foreign_companies", "label": "Controlled Foreign Companies"},
      {"code": "hybrid_mismatch_rules", "label": "Hybrid Mismatch Rules"},
      {"code": "patent_box", "label": "Patent Box"},
      {"code": "transfer_pricing", "label": "Transfer Pricing"},
      {"code": "capital_allowances", "label": "Capital Allowances", "subcategories": [
        {"code": "full_expensing", "label": "Full Expensing"},
        {"code": "annual_investment_allowance", "label": "Annual Investment Allowance"},
        {"code": "writing_down_allowances", "label": "Writing Down Allowances"},
        {"code": "structures_buildings_allowance", "label": "Structures and Buildings Allowance"},
        {"code": "first_year_allowances", "label": "First Year Allowances"}
      ]},
      {"code": "group_taxation", "label": "Group Taxation"},
      {"code": "close_company_rules", "label": "Close Company Rules"},
      {"code": "intangible_fixed_assets", "label": "Intangible Fixed Assets regime"}
    ]},
    {"code": "income_tax", "label": "Income Tax", "subcategories": [
      {"code": "employment_income", "label": "Employment Income"},
      {"code": "self_employment", "label": "Self-Employment / Trading Income"},
      {"code": "property_income", "label": "Property Income"},
      {"code": "savings_income", "label": "Savings Income"},
      {"code": "dividend_income", "label": "Dividend Income"},
      {"code": "pensions_income", "label": "Pensions Income"},
      {"code": "ir35", "label": "Off-Payroll Working / IR35"}
    ]},
    {"code": "capital_gains_tax", "label": "Capital Gains Tax", "subcategories": [
      {"code": "business_asset_disposal_relief", "label": "Business Asset Disposal Relief"},
      {"code": "investors_relief", "label": "Investors' Relief"},
      {"code": "rollover_relief", "label": "Rollover Relief"},
      {"code": "share_disposals", "label": "Share disposals"},
      {"code": "property_disposals", "label": "Property disposals"}
    ]},
    {"code": "vat", "label": "Value Added Tax", "subcategories": [
      {"code": "vat_registration_thresholds", "label": "VAT Registration and Thresholds"},
      {"code": "input_output_vat", "label": "Input VAT and Output VAT"},
      {"code": "vat_schemes", "label": "VAT Schemes"},
      {"code": "partial_exemption", "label": "Partial Exemption"},
      {"code": "cross_border_vat", "label": "Cross-border VAT"}
    ]},
    {"code": "payroll_and_employment_taxes", "label": "Payroll and Employment Taxes", "subcategories": [
      {"code": "paye", "label": "PAYE"},
      {"code": "national_insurance_contributions", "label": "National Insurance Contributions"},
      {"code": "apprenticeship_levy", "label": "Apprenticeship Levy"}
    ]},
    {"code": "inheritance_tax", "label": "Inheritance Tax"},
    {"code": "stamp_taxes", "label": "Stamp Taxes"},
    {"code": "environmental_and_sector_specific_taxes", "label": "Environmental and Sector-Specific Taxes"},
    {"code": "international_and_cross_border_tax", "label": "International and Cross-Border Tax"}
  ]
};
