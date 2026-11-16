# Veradigm Discloses Third Data Breach, Exposing Patient SSNs

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Regulatory | **Updated:** 2026-09-10 | **Reading time:** 4 min

Health IT company Veradigm has disclosed its third security incident in less than two years, revealing in an SEC filing that an attacker used stolen vendor credentials to access a patient-facing API. The breach resulted in the exfiltration of personal data, including, in some cases, Social Security numbers. The disclosure coincides with a claim from a ransomware group called 'The Gentlemen', which alleges it stole 3.5 million patient records, although this claim has not been confirmed by Veradigm.

## Executive Summary
Chicago-based health technology firm **[Veradigm](https://veradigm.com/)** has reported its third data breach in under two years. In a Form 8-K filing with the U.S. Securities and Exchange Commission (SEC) on September 8, 2026, the company disclosed that an unauthorized party gained access to a patient-facing API using stolen credentials from a third-party vendor. This access allowed the attacker to exfiltrate patient personal identifiers, critically including Social Security numbers (SSNs) in some instances. The incident highlights significant ongoing security challenges at the company and poses a serious risk of identity theft and fraud for the affected patients. The situation is complicated by an unverified claim from a ransomware group named 'The Gentlemen', which asserts it stole 3.5 million records.

---

## Threat Overview
The attack vector was compromised credentials belonging to a third-party vendor. This is another example of a **[supply chain attack](https://www.cisa.gov/supply-chain-risk-management)**, where the security posture of a partner organization becomes the weak link. The attacker used these stolen credentials to directly access and query a patient-facing API, allowing them to systematically extract sensitive data.

While Veradigm stated that clinical or medical information was not compromised, the exposure of SSNs is highly significant. This type of data is immutable and highly prized by cybercriminals for creating synthetic identities, opening fraudulent lines of credit, and committing financial fraud.

Adding to the complexity, a group calling itself 'The Gentlemen' listed Veradigm on its dark web leak site around September 4-5, claiming to have stolen 3.5 million patient records. This claim has not been confirmed by Veradigm and could be an exaggeration or an entirely separate incident. However, it suggests that the company may be under pressure from an extortion attempt.

### MITRE ATT&CK Techniques
*   [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/): The attacker used stolen vendor credentials to access a cloud-hosted API.
*   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): The patient-facing API was the public-facing asset that was abused.
*   [`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/): The attacker likely used scripts to systematically query the API and exfiltrate data.
*   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): If the 'The Gentlemen' claim is related, ransomware could be involved, although not confirmed by Veradigm.

---

## Impact Assessment
The primary impact is on the patients whose Social Security numbers were exposed. They are now at high risk of long-term identity theft and financial fraud. The number of affected individuals has not yet been disclosed by Veradigm, but the claim of 3.5 million records, if accurate, would make this a major breach.

For Veradigm, this third breach in two years indicates a pattern of security failures that will likely attract intense regulatory scrutiny from the SEC and HHS (under HIPAA). The company faces significant financial penalties, legal liability from class-action lawsuits, and severe reputational damage. The ongoing costs of incident response, forensics, credit monitoring for victims, and legal fees will be substantial. The fact that the company is still managing fallout from a previous breach, including sending settlement checks, compounds the operational and financial strain.

---

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

---

## Detection & Response
*   **API Security Monitoring**: Organizations must implement robust monitoring for all APIs, especially those that are internet-facing and handle sensitive data. This includes anomaly detection for API requests, such as unusual request volumes, unexpected user agents, or requests from atypical geographic locations.
*   **Rate Limiting and Throttling**: Implement rate limiting on APIs to prevent attackers from rapidly exfiltrating large amounts of data through automated scripts.
*   **Vendor Account Monitoring**: All third-party and vendor accounts should be subject to heightened monitoring. Alerts should be configured for any suspicious activity associated with these accounts.

---

## Mitigation
1.  **Third-Party Credential Management**: Stolen vendor credentials were the root cause. Veradigm and its partners must enforce strong security controls for all privileged accounts. This includes mandating phishing-resistant MFA, regular credential rotation, and just-in-time access.
2.  **API Security Best Practices**: Secure APIs by implementing strong authentication (e.g., OAuth 2.0), authorization, and input validation. Ensure that APIs do not expose more data than is absolutely necessary for their function.
3.  **Vendor Risk Management**: Continuously assess the security posture of all third-party vendors with access to your systems or data. This is not a one-time check but an ongoing process.
4.  **Data Minimization**: Review all data exposed via APIs and other systems to ensure that sensitive information like SSNs is only accessible when strictly required and is protected by additional layers of security.

**Tags:** Data Breach, Veradigm, Healthcare, API Security, Supply Chain, Ransomware

## Sources
- [Veradigm Data Breach 2026: New SEC Filing Exposes SSNs](https://shattered.io/veradigm-third-breach-2026-vendor-api-ssn-exposed/) — Shattered (2026-09-09)

---
Source: https://cyber.netsecops.io/articles/veradigm-discloses-third-data-breach-exposing-patient-ssns/
