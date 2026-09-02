# ADT Confirms Data Breach by ShinyHunters After Vishing Attack Compromises Okta and Salesforce

**Severity:** high | **Category:** Data Breach,Threat Actor,Phishing | **Updated:** 2026-04-25 | **Reading time:** 7 min

Home security giant ADT has confirmed a data breach orchestrated by the notorious ShinyHunters extortion group. The attackers gained initial access by compromising an employee's Okta single sign-on (SSO) account through a sophisticated voice phishing (vishing) attack. This access allowed them to pivot to ADT's Salesforce environment and exfiltrate a large volume of customer data. ShinyHunters listed ADT on its data leak site, claiming to have stolen 10 million records and threatening to release them if a ransom is not paid. ADT's investigation revealed that the compromised information includes names, phone numbers, addresses, and in some cases, dates of birth and the last four digits of Social Security numbers. The company has assured that no financial data or customer security system information was affected and is notifying all impacted individuals.

## Executive Summary

**[ADT Inc.](https://www.adt.com/)**, a leading home security provider, has confirmed a significant data breach following a threat from the **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** extortion group. The threat actors claim to have exfiltrated 10 million customer records and have threatened to leak the data. The initial attack vector was a voice phishing (vishing) campaign that successfully compromised an employee's **[Okta](https://www.okta.com/)** single sign-on (SSO) credentials. This allowed the attackers to gain unauthorized access to the company's **[Salesforce](https://www.salesforce.com/)** instance, from which customer and prospective customer data was stolen. ADT has stated that the breach was limited in scope, affecting personally identifiable information (PII) but not sensitive financial details or security system integrity. The company has engaged cybersecurity experts, notified law enforcement, and is providing identity protection services to affected individuals.

---

## Threat Overview

On April 20, 2026, ADT detected unauthorized access to its cloud environment. The incident was publicly disclosed after ShinyHunters, a well-known data extortion group, listed ADT on its dark web leak site. The group set a deadline of April 27, 2026, for ADT to make contact before they would release the stolen data, which they claim includes 10 million records.

The attack chain began with a social engineering tactic known as vishing. The attackers successfully manipulated an ADT employee over the phone to gain their Okta SSO credentials. With this authenticated access, ShinyHunters infiltrated ADT's Salesforce environment, a critical repository for customer relationship management. From there, they exfiltrated data containing customer PII. This TTP is a hallmark of ShinyHunters, which has a history of leveraging compromised SSO accounts to breach major corporations.

ADT's 8-K filing with the **[U.S. Securities and Exchange Commission](https://www.sec.gov/)** confirmed the breach but did not validate the 10 million record figure. The company specified that the exposed data includes names, phone numbers, and addresses, with a smaller subset also including dates of birth and the last four digits of Social Security or Tax IDs.

---

## Technical Analysis

The attack on ADT demonstrates a classic, multi-stage intrusion leveraging social engineering and abuse of legitimate cloud services. The threat actor's Tactics, Techniques, and Procedures (TTPs) can be mapped to the MITRE ATT&CK framework:

1.  **Initial Access:** The attackers used [`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/), commonly known as vishing. This social engineering technique bypassed technical controls by targeting the human element, tricking an employee into divulging their credentials.
2.  **Credential Access & Defense Evasion:** With the employee's credentials, the attackers gained access via [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/). By using valid credentials for the Okta SSO platform, their initial activity appeared legitimate, helping them evade immediate detection.
3.  **Collection:** Once inside the network, the attackers targeted the Salesforce environment. They performed [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/) by querying and collecting sensitive customer information stored within the CRM platform.
4.  **Exfiltration:** The collected data was then exfiltrated from the Salesforce cloud environment to attacker-controlled infrastructure, likely using standard HTTPS protocols to blend in with normal traffic, aligning with [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/).

> This incident highlights the critical vulnerability of SSO platforms when not protected by phishing-resistant Multi-Factor Authentication (MFA). A single credential compromise can provide broad access to multiple federated applications.

---

## Impact Assessment

The business impact of this breach is multifaceted. For a company whose brand is built on security and trust, the reputational damage is significant. The public disclosure that an employee of a security company fell for a vishing attack can erode customer confidence. Operationally, ADT faces substantial costs related to the incident response, investigation, legal fees, and the provision of complimentary identity protection services for affected individuals. The exfiltrated PII, especially the combination of names, addresses, and partial SSNs, puts affected customers at a heightened risk of targeted phishing campaigns, identity theft, and other forms of fraud. While ADT has confirmed that physical security systems were not compromised, the breach of customer data still represents a severe security failure.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for activity related to the TTPs used in this attack. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| log_source | `Okta System Log` | Monitor for anomalous MFA events, such as multiple push notifications to a user in a short time, MFA denials followed by a successful login from a new device/location, or enrollment of new MFA factors for existing users. |
| log_source | `Salesforce Event Monitoring` | Hunt for `ReportExport` events indicating unusually large data exports, especially by users who do not typically perform such actions. Correlate with logins from unfamiliar IP ranges or locations. |
| command_line_pattern | `Anomalous API Usage` | Analyze Salesforce API logs for high-volume `query` or `queryAll` calls from a single user session, which could indicate mass data scraping. |
| network_traffic_pattern | `Impossible Travel` | Implement and alert on impossible travel scenarios where a user logs in from geographically distant locations in a short period. |

---

## Detection & Response

Detecting this type of attack requires a defense-in-depth approach focused on identity and cloud application security. 

*   **Identity Threat Detection and Response (ITDR):** Deploy ITDR or User and Entity Behavior Analytics (UEBA) solutions to monitor identity provider logs (e.g., **[Okta](https://www.okta.com/)**). This can help baseline normal user behavior and detect anomalies such as logins from suspicious locations, unusual MFA activity, or session hijacking. This aligns with D3FEND techniques like [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
*   **Cloud Application Monitoring:** Continuously monitor activity within critical SaaS applications like **[Salesforce](https://www.salesforce.com/)**. Configure alerts for mass data exports, privilege escalations, or anomalous API access. This involves [`D3-RAPA: Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
*   **Log Correlation:** Ingest logs from SSO platforms, VPNs, and key SaaS applications into a SIEM. Correlate login events with data access events to build a comprehensive picture of user activity and spot suspicious chains of events.

Upon detection of a compromised SSO account, the immediate response should be to terminate all active sessions for the user, reset their password, and force re-enrollment of MFA to evict the attacker.

---

## Mitigation

Organizations can take several steps to mitigate the risk of similar attacks:

1.  **Implement Phishing-Resistant MFA:** The most effective mitigation is to move away from push-based or OTP-based MFA to phishing-resistant methods like FIDO2/WebAuthn. This is a key aspect of [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
2.  **Employee Training:** Conduct regular, realistic training focused on social engineering tactics, especially vishing. Train employees to be suspicious of unsolicited calls asking for credentials or requesting MFA approval and to verify such requests through a separate, trusted communication channel.
3.  **Principle of Least Privilege:** Enforce the principle of least privilege within SaaS applications. Users should only have access to the data and functions essential for their roles. Limit permissions for mass data exports to a small, authorized group of users.
4.  **Data Loss Prevention (DLP):** Implement DLP policies within Salesforce and other cloud applications to detect and block the exfiltration of large volumes of sensitive data.
5.  **Conditional Access Policies:** Configure conditional access policies in the identity provider to restrict logins based on risk, location, device compliance, and other signals.

**Tags:** Data Breach, ShinyHunters, Vishing, Okta, Salesforce, Social Engineering

## Sources
- [ADT confirms data breach after ShinyHunters leak threat](https://www.bleepingcomputer.com/news/security/adt-confirms-data-breach-after-shinyhunters-leak-threat/) — BleepingComputer (2026-04-24)
- [ADT Confirms Data Breach Following ShinyHunters Data Leak Claim](https://www.cybersecuritynews.net/adt-confirms-data-breach-following-shinyhunters-data-leak-claim/) — Cybersecurity News (2026-04-25)
- [ADT Suffers Data Breach, 'ShinyHunters' Hackers Say They Stole 10 Million Records](https://www.pcmag.com/news/adt-suffers-data-breach-shinyhunters-hackers-say-they-stole-10-million) — PCMag (2026-04-24)
- [America's largest home security brand ADT confirms data breach linked to ShinyHunters group](https://www.neowin.net/news/americas-largest-home-security-brand-adt-confirms-data-breach-linked-to-shinyhunters-group/) — Neowin (2026-04-25)
- [America's largest home security company confirms data breach](https://www.notebookcheck.net/America-s-largest-home-security-company-confirms-data-breach.828859.0.html) — NotebookCheck (2026-04-25)

---
Source: https://cyber.netsecops.io/articles/adt-confirms-data-breach-after-shinyhunters-leak-threat/
