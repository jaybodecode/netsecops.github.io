# Revolut Data Breach Exposes Data of Nearly 700 Customers

**Severity:** high | **Category:** Data Breach,Phishing,Threat Intelligence | **Updated:** 2026-09-21

Financial technology firm Revolut has disclosed a data breach affecting nearly 700 customers after falling victim to a 'sophisticated' social engineering attack. An unauthorized third party impersonated a government agency to trick the company into handing over sensitive customer data. The exposed information includes names, addresses, bank account numbers, and copies of identity documents like passports and driver's licenses. Revolut has blocked the attack vector and notified the affected agencies.

## Executive Summary
**[Revolut](https://www.revolut.com/)**, a leading European financial technology company, confirmed on September 12, 2026, that it suffered a data breach impacting nearly 700 customers. The breach was the result of a targeted social engineering attack where an unauthorized third party successfully impersonated a government agency. By deceiving the company, the attackers gained access to a trove of highly sensitive customer information, including not only personal data and bank account numbers but also copies of identity documents. Revolut stated it detected the attack, blocked the malicious access, and alerted the relevant government and enforcement agencies.

## Threat Overview
- **Victim:** Revolut, a major fintech firm.
- **Attack Vector:** Social Engineering / Impersonation. This was not a technical exploit of a software vulnerability, but rather a manipulation of human processes. The attacker posed as a legitimate government agency making a data request. This is a form of business email compromise (BEC) or spear phishing, targeting internal company procedures. ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/))
- **Impacted Population:** Nearly 700 customers.
- **Exposed Data:** The breach exposed a wide range of sensitive data, creating a significant risk for the affected individuals. The compromised data includes:
  - Full names
  - Dates of birth
  - Postal and email addresses
  - Phone numbers
  - Bank account numbers
  - Copies of identity documents (passports, driver's licenses)

## Technical Analysis
The core of this attack was deception. The threat actor likely researched Revolut's internal processes for handling Law Enforcement or Government Agency data requests. They then crafted a fraudulent request that appeared legitimate enough to bypass initial checks.

1.  **Reconnaissance:** The attacker likely studied Revolut's public information and possibly identified employees or departments responsible for handling official data requests. ([`T1591 - Gather Victim Org Information`](https://attack.mitre.org/techniques/T1591/))
2.  **Impersonation:** The attacker created and sent a request, likely via email, that convincingly mimicked one from a real government agency. This could involve using a typosquatted domain or a compromised email account from a legitimate entity. ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/))
3.  **Execution:** A Revolut employee or automated system processed the fraudulent request, believing it to be legitimate, and provided the requested data to the attacker.
4.  **Exfiltration:** The attacker received the sensitive customer data.

> This incident is a stark reminder that the human element is often the weakest link in the security chain. Even technologically advanced companies like Revolut can be vulnerable to well-executed social engineering campaigns.

## Impact Assessment
The exposure of this specific combination of data is particularly dangerous.
- **Identity Theft:** With names, dates of birth, addresses, and copies of official ID documents, attackers have a complete kit to perpetrate sophisticated identity theft. They could open new lines of credit, file fraudulent tax returns, or impersonate the victims in other transactions.
- **Financial Fraud:** Direct access to bank account numbers can facilitate fraudulent transactions.
- **Targeted Phishing:** Attackers can use the stolen information to launch highly convincing phishing attacks against the affected customers, pretending to be Revolut and citing specific personal details to gain trust.
- **Regulatory Fines:** As a European company, Revolut will face scrutiny under **[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)**, and could face significant fines for the breach.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs), such as malicious domains or email addresses, were provided in the source articles.

## Cyber Observables — Hunting Hints
Organizations can hunt for similar impersonation attempts by monitoring for the following:

| Type | Value | Description |
|---|---|---|
| Email Header | Mismatched `From:` and `Reply-To:` fields | A common sign of email spoofing or impersonation. |
| Domain | Typosquatted or lookalike domains | Monitor for incoming emails from domains that are slight variations of legitimate partner or government agency domains (e.g., `fbi-gov.com` instead of `fbi.gov`). |
| Other | Unusual data requests | Flag internal requests for bulk customer data, especially if they originate from an unusual source or deviate from standard procedure. |

## Detection & Response
- **Process Verification:** Implement a strict, multi-step verification process for all external requests for sensitive data, especially those from government or law enforcement. This should include an out-of-band confirmation step, such as a phone call to a known, verified number for the requesting agency.
- **Employee Training:** Continuously train employees, particularly those in roles that handle sensitive data, to recognize the signs of social engineering and impersonation. Empower them to question and escalate any suspicious requests.
- **DLP Solutions:** Data Loss Prevention (DLP) tools can be configured to alert on or block the transmission of large volumes of PII outside the organization, providing a technical backstop to a human error.

## Mitigation
- **Data Minimization:** Only collect and retain customer data that is absolutely necessary. The less data you hold, the lower the impact of a breach.
- **Access Controls:** Strictly limit access to bulk customer data. Employees should only have access to the information required to perform their specific job functions.
- **Strong Authentication:** While not the primary vector here, ensuring all internal systems require MFA can prevent an attacker who has stolen employee credentials from easily accessing data.
- **Response Protocol:** Revolut's quick action to block the address and alert agencies is a good example of a prepared response. All organizations should have a well-defined incident response plan for data breaches.

**Tags:** Data Breach, Fintech, GDPR, Impersonation, PII, Revolut, Social Engineering

## Sources
- [This Week's Top Five Stories in Cyber](https://cybermagazine.com/news/this-weeks-top-five-stories-in-cybersecurity-headlines-cyber-news) (2026-09-19)
- [Recent Data Breaches (Sep 2026): Latest Incidents - Scan My Shadow](https://www.scanmyshadow.com/blog/2026/09/recent-data-breaches-this-week.html) (2026-09-20)
- [Week in review: Cisco patches exploited email gateway 0-day, Revolut breach](https://www.helpnetsecurity.com/2026/09/20/week-in-review-cisco-patches-exploited-email-gateway-0-day-revolut-breach/) (2026-09-20)

---
Source: https://cyber.netsecops.io/articles/revolut-data-breach-exposes-data-of-nearly-700-customers/
