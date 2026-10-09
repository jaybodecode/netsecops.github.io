# FBI Warns of Sophisticated Phishing Scam Impersonating City Officials to Steal Permit Fees

**Severity:** medium | **Category:** Phishing,Threat Intelligence,Regulatory | **Updated:** 2026-03-10 | **Reading time:** 4 min

The FBI's Internet Crime Complaint Center (IC3) has issued a public service announcement about a sophisticated, nationwide phishing campaign. Scammers are impersonating city and county officials, using publicly available permit data to create highly convincing emails that trick individuals and businesses into paying fraudulent fees. The attackers request payment via non-standard methods like wire transfers, P2P apps, and cryptocurrency, creating a significant financial risk for those engaged in the permitting process.

## Executive Summary
The **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)**, through its **[Internet Crime Complaint Center (IC3)](https://www.ic3.gov)**, has issued a Public Service Announcement (PSA) on March 9, 2026, warning of a widespread phishing scam targeting individuals and businesses across the United States. Threat actors are impersonating city and county officials to fraudulently collect fees associated with planning and zoning permits. This scheme is particularly effective as it leverages publicly accessible permit data to lend credibility to the fraudulent communications. The FBI urges extreme caution and verification before making any payments for government services, especially when requested via unconventional methods.

---

## Threat Overview
This nationwide phishing campaign represents a sophisticated form of spear-phishing. The attackers conduct reconnaissance by scraping public records for active planning and zoning permit applications. This allows them to craft highly targeted and convincing emails that include legitimate details such as:
- Correct property addresses
- Specific permit case numbers
- Real names of city or county officials

By including this accurate information, the fraudulent emails bypass the skepticism typically associated with generic phishing attempts. The timing of the emails may also coincide with legitimate stages of the permitting process, further lowering the target's defenses. The goal is simple: trick the victim into paying a fake invoice for a purported permit fee.

## Technical Analysis
The attack relies primarily on social engineering and impersonation rather than technical exploits. Key characteristics of the attack include:

- **Impersonation:** Attackers use the names and titles of real government officials.
- **Reconnaissance:** Publicly available permit data is used to personalize the phishing emails, a technique that aligns with [`T1592 - Gather Victim Host Information`](https://attack.mitre.org/techniques/T1592/).
- **Social Engineering:** The emails create a sense of urgency, often threatening delays in the permitting process if payment is not made promptly, aligning with [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/).
- **Evasion:** A key red flag is the sender's email address. While the display name may appear legitimate, the domain is a non-governmental one, such as `@usa.com`.
- **Fraudulent Payment Channels:** Victims are instructed to pay via wire transfer, peer-to-peer (P2P) payment apps (e.g., Zelle, Venmo), or cryptocurrency. These methods are favored by criminals as they are difficult to trace and reverse.

## Impact Assessment
The primary impact is financial loss for individuals and businesses, which can range from hundreds to thousands of dollars per incident. Beyond direct financial loss, victims may experience significant delays in their legitimate permitting process while they resolve the issue. This can have cascading effects on construction projects and business operations. The scam also erodes public trust in government communications and processes. The nationwide scope indicates a well-organized effort targeting a wide range of victims in the construction and real estate sectors.

## Detection & Response
- **Scrutinize Sender Information:** Always inspect the full email address of the sender, not just the display name. Legitimate government communications will almost always come from a `.gov` or other official state/local domain.
- **Verify Payment Requests:** Before making any payment, independently verify the request by contacting the relevant city or county office using an official phone number or website found through a trusted search. Do not use contact information provided in the suspicious email.
- **Analyze Payment Methods:** Be immediately suspicious of any government agency requesting payment via wire transfer, P2P apps, or cryptocurrency. These are not standard payment methods for official fees.
- **Report Incidents:** All suspected fraudulent activity should be reported to the FBI's **[IC3](https://www.ic3.gov)** to help law enforcement track the campaign and warn others.

## Mitigation
- **User Training:** Organizations in the construction, real estate, and legal sectors should provide specific training to employees who handle permits and payments, highlighting the tactics of this specific scam.
- **Email Filtering:** Configure email security gateways to flag or block emails from domains that impersonate government entities but do not originate from known `.gov` TLDs.
- **Financial Controls:** Implement multi-person approval processes for all outgoing payments and wire transfers, requiring secondary verification for any unexpected or unusual invoices.
- **Public Awareness:** Government agencies should proactively inform permit applicants about their official communication channels and payment procedures to preempt these scams.

**Tags:** Phishing, Scam, FBI, IC3, Social Engineering, Government Impersonation

## Sources
- [Criminals Impersonating City and County Officials in Phishing Emails for Planning and Zoning Permits](https://www.ic3.gov/Media/Y2026/PSA260309) — FBI Internet Crime Complaint Center (2026-03-09)
- [FBI warns of phishing scams impersonating city officials for permit fees | brief](https://www.scmagazine.com/brief/fbi-warns-of-phishing-scams-impersonating-city-officials-for-permit-fees) — SC Media (2026-03-10)

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-nationwide-phishing-scam-impersonating-city-officials-for-permit-fees/
