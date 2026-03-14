# **Company details & status**

### **Company name**

- Contains a company name
- The company name exists on companies house as a UK company or branch subject to corporation tax (legislation backed)

**Applicable legislation/HMRC guidance**

- Taxes Management Act 1970, Schedule 18, paragraph 3 (inserted by Finance Act 1998 for Corporation Tax Self Assessment)
- CT600

### **Company number**

- If company number field is present, check it exists
- Is associated with a company that exists on companies house as a UK company or branch subject to corporation tax (legislation backed)
- The company number correlates with the company name specified

**Applicable legislation/HMRC guidance**

- Taxes Management Act 1970, Schedule 18, paragraph 3 (inserted by Finance Act 1998 for Corporation Tax Self Assessment)
- CT600

### **UTR**

- If a UTR field is present, check there is an associated UTR value
- Check it is 11 characters
- Check it matches HMRC’s algorithm for UTRs

**Additional validation based on available data**

- HMRC agent account *should* have this
- Any letters associated with this company from HMRC
- Non-draft CT600 or Tax Comps

**Applicable legislation/HMRC guidance**

- Taxes Management Act 1970, Schedule 18, paragraph 3 (inserted by Finance Act 1998 for Corporation Tax Self Assessment)
- CT600

### **SIC Codes**

- If SIC codes are present, check there is at least one value specified
- Check the SIC code(s) exists according to [the CSV provided](https://www.gov.uk/government/publications/standard-industrial-classification-of-economic-activities-sic) by Companies House
- Check the SIC code is not considered unlikely to be doing R&D according to the AIF (we have this list)

**Applicable legislation/HMRC guidance**

### **Accounting period(s)**

- Check there is at least one AP start and end date within the report
- Check the date values are valid date
- Check the AP does not span more than 12 months
- Check the accounting periods are within the range of the FY, as published at Companies House

**Additional validation based on available data**

- If we have associated non-draft CT600 or Tax Comps

**Applicable legislation/HMRC guidance**

- FA 1998, Schedule 18, paragraph 3(2)
- FA 1998, Schedule 18, paragraph 7(1)
- CT600

### **Claimant is a going concern**

- Check the report contains a declaration that the company is a going concern
- Check companies house status
- Check companies house for insolvency notices, late filings, or other risk indicators
- Review *published* accounts/financial statements on companies house for statements by directors or auditors about going concern disclosures

**Additional validation based on available data**

- Review *Management* Accounts/Financial statements for statements by directors or auditors about going concern disclosures
- Detect any emails, files (transcripts), or attachments where this question has been asked of the claimant about any known financial risks.

**Applicable legislation/HMRC guidance**

- CIRD191000 / CTA 2009 s.1112G

### The claimant is currently trading

- Check the report confirms a declaration that the company is currently trading, or if pre-revenue has an intent to trade.
- Companies House shows the company is not dormant

*Or - if pre-revenue - show intent to trade*

- The published accounts/companies house data shows an external investment

**Additional validation based on available data**

- Management accounts show the company is currently trading (i.e. to check it has not become dormant since the last public published set of accounts)
- OR we have activity/ledger/connecting bookkeeping software suggesting activity
- OR we have a business plan/investor deck/product development evidence that suggests intent to trade (may be other signals)

**Applicable legislation/HMRC guidance**

- CTA 2009 Part 13 s1044
- CIRD81400

### **Does the R&D relate to the Claimant’s trade?**

- Check the report contains a statement that the R&D work matches the claimant’s trade (preferably stating the trade)
- Check the website of the Claimant

**Additional validation based on available data**

**Applicable legislation/HMRC guidance**

- CTA 2009 Part 13 s1044
- CIRD81400

# **Financials**

### **Top level R&D expenditure check**

Top level check: is total R&D expenditure below **total** expenditure in the FY?

- Management accounts

**Additional validation based on available data**

**Applicable legislation/HMRC guidance**

### Category level check

Is R&D expenditure for each expenditure category below the total expenditure for the category in the FY?

- Director salaries, wages, social security/NI, pensions, software/hosting, rent(?)
- Management accounts, but is there a better source of truth for some of this? E.g. HMRC PAYE on agent account.
- Business tax account looks like this.

  ![Screenshot 2026-03-12 at 07.17.53.png](attachment:46bb8404-387e-418e-ac7e-b33f74b0bdc6:Screenshot_2026-03-12_at_07.17.53.png)