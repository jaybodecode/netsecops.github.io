# Scattered Spider Launches Massive Tax-Season Phishing Campaign Impersonating IRS, HMRC, and CRA

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-02-23 | **Reading time:** 4 min

A large-scale phishing campaign attributed to the cybercrime group "Scattered Spider" is targeting taxpayers in the United States, United Kingdom, and Canada. The attackers are using convincing emails and SMS messages that impersonate the IRS, HMRC, and CRA, luring victims with fake tax refund notifications. The goal is to steal a wide range of personal and financial information through high-quality, geo-targeted phishing portals.

## Executive Summary
Security researchers at **[Proofpoint](https://www.proofpoint.com/us)** have uncovered a massive, multi-national phishing campaign timed to coincide with tax season. The campaign, attributed to the notorious cybercrime group **Scattered Spider**, is targeting individuals and businesses in the United States, the United Kingdom, and Canada. Attackers are sending fraudulent emails and SMS messages (smishing) that convincingly impersonate major tax agencies: the U.S. Internal Revenue Service (IRS), the U.K. His Majesty's Revenue and Customs (HMRC), and the Canada Revenue Agency (CRA). The lures promise significant tax refunds to trick victims into visiting sophisticated phishing sites and surrendering sensitive personal and financial data. The scale and quality of the campaign pose a significant threat to the public in all three countries.

## Threat Overview
- **Threat Actor**: Scattered Spider (also known for credential theft and SIM swapping).
- **Attack Type**: Phishing and Smishing.
- **Targets**: General public and businesses in the USA, UK, and Canada.
- **Impersonated Entities**: IRS, HMRC, and CRA.
- **Lure**: Notification of eligibility for a large tax refund.
- **Objective**: Mass theft of Personally Identifiable Information (PII) and financial data, including full names, addresses, Social Security Numbers (or equivalents), birth dates, and banking details.
- **Infrastructure**: The campaign uses high-quality, geo-targeted phishing kits that are difficult for standard email filters to detect.

## Technical Analysis
The campaign's effectiveness relies on social engineering and technical evasion:
1.  **Distribution**: The attackers use large-scale email and SMS blasts. The messages are crafted to look official, using logos and language copied from legitimate tax agency communications.
2.  **Geo-Targeting**: The links within the messages direct victims to a routing server that identifies the victim's geographic location based on their IP address.
3.  **Phishing Portal**: The victim is then redirected to a high-fidelity phishing portal that is a near-perfect replica of the official tax agency website for their country (e.g., a U.S. victim sees a fake IRS site).
4.  **Data Harvesting**: The victim is presented with a multi-page form that requests an exhaustive amount of personal and financial information under the guise of processing their refund.
5.  **Evasion**: The phishing kits employ techniques to evade detection, such as dynamically generating URLs and using content to bypass spam filters.

### MITRE ATT&CK TTPs
- **[`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)**: The primary delivery mechanism for the phishing attack.
- **[`T1608.001 - Stage Capabilities: Upload Malware`](https://attack.mitre.org/techniques/T1608/001/)**: The attackers stage and maintain their sophisticated phishing kits on compromised or attacker-controlled infrastructure.
- **[`T1598.003 - Phishing for Information: Spearphishing Link`](https://attack.mitre.org/techniques/T1598/003/)**: The core of the attack is to trick users into entering information on a fraudulent website.
- **[`T1204.002 - User Execution: Malicious Link`](https://attack.mitre.org/techniques/T1204/002/)**: The attack relies on the user clicking the malicious link in the email or SMS.

## Impact Assessment
This campaign poses a significant risk of identity theft and financial fraud to a large population. The theft of comprehensive PII, including SSNs and banking details, allows criminals to open fraudulent lines of credit, file fake tax returns to steal legitimate refunds, and drain bank accounts. For businesses, compromised employee credentials can lead to follow-on attacks, including Business Email Compromise (BEC) and ransomware. The campaign also erodes public trust in official government communications.

## Detection & Response
- **Email Security Gateways**: Use email security solutions with advanced phishing detection capabilities that can analyze URLs and sender reputation.
- **URL Analysis**: Security teams should analyze suspicious URLs reported by users. Tools that can render a webpage in a sandbox and analyze its content are valuable for identifying phishing sites.
- **Web Filtering**: Block access to known phishing domains and categories. The domains used in these campaigns are often newly registered.
- **D3FEND**: **[`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis)** is the primary defensive technique, used by security products to inspect links and identify malicious destinations. **[`D3-DNSDL: DNS Denylisting`](https://d3fend.mitre.org/technique/d3f:DNSDenylisting)** is used to block access to the phishing domains once they are identified.

## Mitigation
1.  **Public and Employee Awareness**: The number one mitigation is education. Remind users that tax agencies like the IRS, HMRC, and CRA will **never** initiate contact via email, text, or social media to request personal or financial information.
2.  **Do Not Click Links**: Advise users to never click on links in unsolicited emails or texts, especially those related to finances or taxes. Instead, they should always navigate directly to the official government website by typing the address into their browser.
3.  **Report Phishing**: Encourage users to report suspicious messages to the respective tax agencies and their internal IT/security department.
4.  **SMS Spam Filtering**: Mobile carriers and security apps offer services to filter and block known spam and smishing messages.

**Tags:** Phishing, Smishing, Scattered Spider, IRS, HMRC, CRA, Tax Scam

## Sources
- [Tax Season Phishing Frenzy: Scattered Spider Impersonates IRS, HMRC, and CRA](https://www.proofpoint.com/us/blog/threat-insight/tax-season-phishing-frenzy-scattered-spider-impersonates-irs-hmrc-and-cra) — Proofpoint (2026-02-23)
- [IRS Warns of Massive Tax Refund Phishing Scam](https://www.cbsnews.com/news/tax-refund-scam-irs-warning-phishing-2026-02-23/) — CBS News (2026-02-23)

---
Source: https://cyber.netsecops.io/articles/widespread-phishing-campaign-spoofs-tax-agencies-ahead-of-deadlines/
