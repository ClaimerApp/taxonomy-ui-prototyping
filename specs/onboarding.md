# Onboarding

## Social login
Users can login or sign up with their Microsoft or Google account.

If there is no associated account with the user (matched on email), it goes through the setup flow. If they are the first user associated with their company (based on the email domain), they go through the Admin account setup flow, otherwise they skip to the user setup flow.

If the email is already in the system, it logs them in.

## Setup flow
### Admin account setup

- **Step 1: Firm details**
    - Enter URL/domain of firm
    - Confirm enriched name
    - Services offered (R&D tax preparation, Patent box, Grants, […])
- **Step 2: Team authentication**
    - Flag to set whether employees can join automatically via logging in or whether invitation only
    - Little note to say SSO will be available soon
- **Step 3: Import data (optional step)**
    - Optionally upload the client list as CSV (companies house numbers?)

*User is then directed to go through user setup, see below*

### User setup

- **Step 1: Your details**
    - Confirm first/last name
    - Enter job title
    - What primary area of UK tax do you deal with? (can select multiple, required to select at least one, put coropration tax as the placeholder) - see below for list
    - Secondary area of tax (optional, and derived from the primary selection - put R&D tax as placeholder) - see below for list
- **Step 2: connect email**
    - Connect to Office 365 (delegated permissions to start with)
    - Indicate email access is only for the purpose of delivering this service.  
    - Provide privacy and security reassurances (adherance to GDPR and ISO27001 certified) and a link to our security policy here https://www.claimer.com/privacy-and-security
- **Step 3: invite other users (optional)**
    - Indicate the more of your colleagues that use the system, the more powerful it becomes
    - Add ability to add emails of colleagues

*The user is then redirect to the web UI, where it presents them with the web UI, with an indicator showing the processing of emails*


## Primary and secondary areas of tax

```json
{
  "jurisdiction": "UK",
  "taxonomy_type": "tax_areas",
  "areas": [
    {
      "code": "corporation_tax",
      "label": "Corporation Tax",
      "description": "Tax on company profits.",
      "subcategories": [
        {
          "code": "rd_relief",
          "label": "R&D Tax Relief",
          "subcategories": [
            {
              "code": "sme_rd_relief",
              "label": "SME R&D relief"
            },
            {
              "code": "rdec",
              "label": "RDEC"
            },
            {
              "code": "merged_rd_scheme",
              "label": "Merged R&D scheme"
            },
            {
              "code": "eris",
              "label": "ERIS"
            }
          ]
        },
        {
          "code": "corporate_loss_relief",
          "label": "Corporate Loss Relief",
          "subcategories": [
            {
              "code": "losses_carry_forward",
              "label": "Carry forward losses"
            },
            {
              "code": "losses_carry_back",
              "label": "Carry back losses"
            },
            {
              "code": "group_relief",
              "label": "Group relief"
            }
          ]
        },
        {
          "code": "corporate_interest_restriction",
          "label": "Corporate Interest Restriction"
        },
        {
          "code": "controlled_foreign_companies",
          "label": "Controlled Foreign Companies"
        },
        {
          "code": "hybrid_mismatch_rules",
          "label": "Hybrid Mismatch Rules"
        },
        {
          "code": "patent_box",
          "label": "Patent Box"
        },
        {
          "code": "transfer_pricing",
          "label": "Transfer Pricing"
        },
        {
          "code": "diverted_profits_tax_related",
          "label": "Diverted Profits Tax",
          "description": "Closely related to corporation tax, but often treated separately."
        },
        {
          "code": "capital_allowances",
          "label": "Capital Allowances",
          "subcategories": [
            {
              "code": "full_expensing",
              "label": "Full Expensing"
            },
            {
              "code": "annual_investment_allowance",
              "label": "Annual Investment Allowance"
            },
            {
              "code": "writing_down_allowances",
              "label": "Writing Down Allowances"
            },
            {
              "code": "structures_buildings_allowance",
              "label": "Structures and Buildings Allowance"
            },
            {
              "code": "first_year_allowances",
              "label": "First Year Allowances"
            }
          ]
        },
        {
          "code": "group_taxation",
          "label": "Group Taxation",
          "subcategories": [
            {
              "code": "group_relief",
              "label": "Group relief"
            },
            {
              "code": "consortium_relief",
              "label": "Consortium relief"
            }
          ]
        },
        {
          "code": "close_company_rules",
          "label": "Close Company Rules",
          "subcategories": [
            {
              "code": "loans_to_participators_s455",
              "label": "Loans to participators (s455)"
            }
          ]
        },
        {
          "code": "corporate_distributions",
          "label": "Corporate distributions"
        },
        {
          "code": "intangible_fixed_assets",
          "label": "Intangible Fixed Assets regime"
        }
      ]
    },
    {
      "code": "income_tax",
      "label": "Income Tax",
      "description": "Tax on individuals' income.",
      "subcategories": [
        {
          "code": "employment_income",
          "label": "Employment Income",
          "subcategories": [
            {
              "code": "paye",
              "label": "PAYE"
            },
            {
              "code": "benefits_in_kind",
              "label": "Benefits in kind"
            },
            {
              "code": "termination_payments",
              "label": "Termination payments"
            },
            {
              "code": "share_schemes",
              "label": "Share schemes"
            }
          ]
        },
        {
          "code": "self_employment",
          "label": "Self-Employment / Trading Income"
        },
        {
          "code": "property_income",
          "label": "Property Income",
          "subcategories": [
            {
              "code": "rental_income",
              "label": "Rental income"
            },
            {
              "code": "furnished_holiday_lets",
              "label": "Furnished holiday lets"
            }
          ]
        },
        {
          "code": "savings_income",
          "label": "Savings Income"
        },
        {
          "code": "dividend_income",
          "label": "Dividend Income"
        },
        {
          "code": "pensions_income",
          "label": "Pensions Income"
        },
        {
          "code": "ir35",
          "label": "Off-Payroll Working / IR35"
        }
      ]
    },
    {
      "code": "capital_gains_tax",
      "label": "Capital Gains Tax",
      "description": "Tax on gains from disposal of assets.",
      "subcategories": [
        {
          "code": "business_asset_disposal_relief",
          "label": "Business Asset Disposal Relief"
        },
        {
          "code": "investors_relief",
          "label": "Investors' Relief"
        },
        {
          "code": "gift_hold_over_relief",
          "label": "Gift Hold-Over Relief"
        },
        {
          "code": "rollover_relief",
          "label": "Rollover Relief"
        },
        {
          "code": "private_residence_relief",
          "label": "Private Residence Relief"
        },
        {
          "code": "entrepreneur_disposals",
          "label": "Entrepreneur disposals"
        },
        {
          "code": "share_disposals",
          "label": "Share disposals"
        },
        {
          "code": "property_disposals",
          "label": "Property disposals"
        }
      ]
    },
    {
      "code": "vat",
      "label": "Value Added Tax",
      "description": "Consumption tax on goods and services.",
      "subcategories": [
        {
          "code": "vat_registration_thresholds",
          "label": "VAT Registration and Thresholds"
        },
        {
          "code": "input_output_vat",
          "label": "Input VAT and Output VAT"
        },
        {
          "code": "vat_schemes",
          "label": "VAT Schemes",
          "subcategories": [
            {
              "code": "flat_rate_scheme",
              "label": "Flat Rate Scheme"
            },
            {
              "code": "cash_accounting_scheme",
              "label": "Cash Accounting Scheme"
            },
            {
              "code": "annual_accounting_scheme",
              "label": "Annual Accounting Scheme"
            },
            {
              "code": "margin_schemes",
              "label": "Margin Schemes"
            }
          ]
        },
        {
          "code": "partial_exemption",
          "label": "Partial Exemption"
        },
        {
          "code": "capital_goods_scheme",
          "label": "Capital Goods Scheme"
        },
        {
          "code": "cross_border_vat",
          "label": "Cross-border VAT",
          "subcategories": [
            {
              "code": "imports",
              "label": "Imports"
            },
            {
              "code": "exports",
              "label": "Exports"
            },
            {
              "code": "reverse_charge",
              "label": "Reverse charge"
            },
            {
              "code": "eu_distance_selling",
              "label": "EU distance selling rules"
            },
            {
              "code": "digital_services_vat",
              "label": "Digital services"
            }
          ]
        }
      ]
    },
    {
      "code": "payroll_and_employment_taxes",
      "label": "Payroll and Employment Taxes",
      "subcategories": [
        {
          "code": "paye",
          "label": "PAYE"
        },
        {
          "code": "national_insurance_contributions",
          "label": "National Insurance Contributions",
          "subcategories": [
            {
              "code": "class_1_nics",
              "label": "Class 1"
            },
            {
              "code": "class_2_nics",
              "label": "Class 2"
            },
            {
              "code": "class_4_nics",
              "label": "Class 4"
            },
            {
              "code": "employer_nics",
              "label": "Employer NICs"
            }
          ]
        },
        {
          "code": "apprenticeship_levy",
          "label": "Apprenticeship Levy"
        },
        {
          "code": "student_loan_deductions",
          "label": "Student Loan deductions"
        }
      ]
    },
    {
      "code": "inheritance_tax",
      "label": "Inheritance Tax",
      "description": "Tax on transfers of wealth.",
      "subcategories": [
        {
          "code": "estate_tax_on_death",
          "label": "Estate tax on death"
        },
        {
          "code": "lifetime_transfers",
          "label": "Lifetime transfers"
        },
        {
          "code": "business_property_relief",
          "label": "Business Property Relief"
        },
        {
          "code": "agricultural_property_relief",
          "label": "Agricultural Property Relief"
        },
        {
          "code": "trust_taxation",
          "label": "Trust taxation"
        }
      ]
    },
    {
      "code": "stamp_taxes",
      "label": "Stamp Taxes",
      "subcategories": [
        {
          "code": "sdlt",
          "label": "Stamp Duty Land Tax",
          "subcategories": [
            {
              "code": "sdlt_residential",
              "label": "Residential property"
            },
            {
              "code": "sdlt_non_residential",
              "label": "Non-residential property"
            },
            {
              "code": "sdlt_additional_dwelling_surcharge",
              "label": "Additional dwelling surcharge"
            }
          ]
        },
        {
          "code": "stamp_duty_on_shares",
          "label": "Stamp Duty on Shares"
        },
        {
          "code": "sdrt",
          "label": "Stamp Duty Reserve Tax"
        }
      ]
    },
    {
      "code": "environmental_and_sector_specific_taxes",
      "label": "Environmental and Sector-Specific Taxes",
      "subcategories": [
        {
          "code": "energy_profits_levy",
          "label": "Energy Profits Levy"
        },
        {
          "code": "petroleum_revenue_tax",
          "label": "Petroleum Revenue Tax"
        },
        {
          "code": "aggregates_levy",
          "label": "Aggregates Levy"
        },
        {
          "code": "landfill_tax",
          "label": "Landfill Tax"
        },
        {
          "code": "climate_change_levy",
          "label": "Climate Change Levy"
        },
        {
          "code": "plastic_packaging_tax",
          "label": "Plastic Packaging Tax"
        },
        {
          "code": "air_passenger_duty",
          "label": "Air Passenger Duty"
        },
        {
          "code": "vehicle_excise_duty",
          "label": "Vehicle Excise Duty"
        }
      ]
    },
    {
      "code": "digital_and_anti_avoidance_taxes",
      "label": "Digital and Anti-Avoidance Taxes",
      "subcategories": [
        {
          "code": "diverted_profits_tax",
          "label": "Diverted Profits Tax"
        },
        {
          "code": "digital_services_tax",
          "label": "Digital Services Tax"
        },
        {
          "code": "pillar_two_global_minimum_tax",
          "label": "Pillar Two / Global Minimum Tax"
        },
        {
          "code": "gaar",
          "label": "General Anti-Abuse Rule"
        }
      ]
    },
    {
      "code": "international_and_cross_border_tax",
      "label": "International and Cross-Border Tax",
      "subcategories": [
        {
          "code": "transfer_pricing",
          "label": "Transfer Pricing"
        },
        {
          "code": "double_tax_treaties",
          "label": "Double Tax Treaties"
        },
        {
          "code": "permanent_establishment_rules",
          "label": "Permanent Establishment rules"
        },
        {
          "code": "withholding_taxes",
          "label": "Withholding Taxes"
        },
        {
          "code": "pillar_two",
          "label": "OECD Pillar Two"
        }
      ]
    }
  ]
}
```