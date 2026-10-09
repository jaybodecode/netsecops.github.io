# ShinyHunters Leaks Data of 4.9M Charter Customers After Vishing Attack

**Severity:** high | **Category:** Data Breach,Phishing,Threat Actor | **Updated:** 2026-06-02 | **Reading time:** 6 min

The ShinyHunters cybercrime group has leaked a database containing the records of 4.9 million customers of Charter Communications (Spectrum) after a ransom demand was apparently refused. The breach was initiated on April 1, 2026, through a voice phishing (vishing) attack that compromised an employee's Microsoft Entra account. This access allowed the attackers to infiltrate Charter's Salesforce environment and exfiltrate customer data, including names, addresses, phone numbers, and account details. While Charter confirmed the incident, it disputes that sensitive personal information was stolen. This attack is part of a wider ShinyHunters campaign targeting corporate Salesforce instances.

## Executive Summary

The **[ShinyHunters](https://attack.mitre.org/groups/G1001/)** extortion group has publicly released data allegedly stolen from U.S. telecommunications provider **[Charter Communications](https://corporate.charter.com/)** (operating as Spectrum). The leak, which affects 4.9 million unique accounts, follows a failed extortion attempt. The initial intrusion occurred via a voice phishing (vishing) attack that compromised an employee's **[Microsoft Entra](https://www.microsoft.com/en-us/security/business/microsoft-entra)** account. This gave the attackers access to the company's **[Salesforce](https://www.salesforce.com/)** instance, from which they exported customer records. The leaked data includes names, contact information, and addresses. The incident highlights the effectiveness of social engineering and the significant risk posed by compromised access to major cloud platforms like Salesforce.

---

## Threat Overview

The attack on **Charter Communications** began on April 1, 2026, with a vishing attack—a form of social engineering conducted over the phone. The threat actor successfully deceived an employee, leading to the compromise of their corporate credentials for **Microsoft Entra**.

### Attack Chain:
1.  **Initial Access (Vishing):** The attacker impersonated a legitimate entity (e.g., IT support) in a phone call to an employee, tricking them into divulging their credentials or performing an action that granted access ([`T1566.002 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/002/)).
2.  **Credential Access & Cloud Infiltration:** Using the stolen credentials, **ShinyHunters** accessed Charter's corporate environment, specifically targeting their **Salesforce** CRM platform ([`T1552.006 - Cloud Accounts`](https://attack.mitre.org/techniques/T1552/006/)).
3.  **Collection & Exfiltration:** The attackers used the legitimate functionalities within Salesforce to query and export a large volume of customer data ([`T1213.002 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1213/002/)).
4.  **Extortion and Leak:** After exfiltrating the data, **ShinyHunters** attempted to extort Charter. When the ransom was not paid, the group leaked the data on a criminal forum.

The leaked dataset was analyzed by the HaveIBeenPwned service, which confirmed it contains 4.9 million unique email addresses along with customer names, physical addresses, phone numbers, and account plan details. An additional 85,000 internal employee records were also exposed.

---

## Technical Analysis

This incident is a textbook example of a modern, cloud-focused data breach. The attackers did not need to deploy malware or exploit a software vulnerability. Instead, they exploited the 'human firewall' and abused the legitimate, trusted functionality of a major SaaS platform.

- **Vishing ([`T1566.002`](https://attack.mitre.org/techniques/T1566/002/)):** The use of voice calls adds a layer of credibility and urgency that can bypass user suspicion more effectively than email phishing.
- **Abuse of Cloud Platforms:** By gaining access to Salesforce, the attackers operated within a trusted environment, making their activities difficult to distinguish from legitimate business operations. Standard network security tools would be blind to this activity, as it would appear as normal API calls to `salesforce.com`.

> This attack underscores a critical shift in threat actor methodology: why break down the door with malware when you can trick someone into giving you the keys to the kingdom? Securing cloud identities and monitoring SaaS platforms for anomalous activity is now as critical as traditional network security.

---

## Impact Assessment

While **Charter Communications** claims no 'sensitive personal information' was stolen, the leaked data (names, addresses, phone numbers) is more than sufficient for criminals to launch highly targeted phishing, smishing, and vishing campaigns against the 4.9 million affected customers. This data can be used to impersonate Spectrum support, leading to further fraud and account takeovers.

The breach also has significant reputational consequences for Charter and exposes a weakness in their internal security controls and employee training. It serves as a case study for a wider campaign by **ShinyHunters**, who claim to have breached hundreds of companies by targeting their Salesforce instances, indicating a systemic risk for many organizations.

---

## IOCs — Directly from Articles

No specific technical Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams should hunt for signs of SaaS platform abuse:

| Type | Value | Description |
|---|---|---|
| Log Source | Salesforce Event Monitoring Logs | Look for large data exports, especially by users who do not normally perform this function, or exports initiated outside of business hours. |
| Log Source | Microsoft Entra Sign-in Logs | Hunt for 'impossible travel' alerts, logins from unfamiliar locations/IPs, or multiple failed logins followed by a success for a single account. |
| API Endpoint | `salesforce.com/services/data/vXX.X/query` | Monitor for an unusually high volume of API query calls from a single user or source IP, which could indicate data enumeration. |
| User Account Pattern | Employee reports of suspicious calls | An increase in employees reporting unsolicited calls from 'IT support' can be an early warning of a vishing campaign. |

---

## Detection & Response

- **SaaS Security Posture Management (SSPM):** Deploy SSPM tools to monitor for misconfigurations and anomalous activity within Salesforce, Microsoft 365, and other critical SaaS applications. This can provide alerts on unusual data exports or permission changes. This is an application of **D3FEND's Cloud User Activity Monitoring**.
- **Cloud Access Security Broker (CASB):** Use a CASB to enforce policies on cloud application usage and to detect anomalous behavior between users and cloud services.
- **Enhanced Identity Monitoring:** Implement risk-based authentication for Entra ID that challenges users with MFA when they log in from a new device or location. Correlate sign-in logs with HR data to detect activity from terminated employees. This is part of **D3FEND's User Geolocation Logon Pattern Analysis** ([`D3-UGLPA`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)).

---

## Mitigation

- **Phishing-Resistant MFA:** The most critical mitigation is the enforcement of phishing-resistant MFA (e.g., FIDO2/WebAuthn) for all employees, especially for access to critical systems like Entra ID and Salesforce. This would have likely prevented the initial compromise. This is the core of **D3FEND's Multi-factor Authentication** ([`D3-MFA`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Vishing Awareness Training:** Update security awareness programs to specifically address vishing threats. Train employees to be skeptical of unsolicited calls, to verify identities through a separate, known channel, and to never provide credentials or perform actions over the phone on request.
- **Salesforce Data Export Controls:** Implement policies within Salesforce to limit who can export large amounts of data. Configure alerts that trigger when export thresholds are exceeded. This is a form of **D3FEND's Application Configuration Hardening** ([`D3-ACH`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)).
- **Principle of Least Privilege in SaaS:** Regularly audit user permissions within Salesforce and other SaaS platforms to ensure users only have the access required for their roles.

**Tags:** ShinyHunters, Charter Communications, Spectrum, Data Breach, Vishing, Salesforce, Microsoft Entra

## Sources
- [ShinyHunters Leaks Charter Communications Data, Potentially Impacting 5 Million Customers](https://securityaffairs.com/192892/uncategorized/shinyhunters-leaks-charter-communications-data-potentially-impacting-5-million-customers.html) — Security Affairs (2026-05-30)
- [Charter communications data breach affects 4.9 million accounts](https://www.bleepingcomputer.com/news/security/charter-communications-data-breach-affects-49-million-accounts/) — BleepingComputer (2026-05-29)
- [ShinyHunters Alleges 42M Records Stolen from Charter Communications](https://www.esecurityplanet.com/threats/shinyhunters-charter-communications-data-breach/) — eSecurity Planet (2026-05-27)
- [ShinyHunters Alleges 42M Records Stolen from Charter Communications](https://www.techrepublic.com/article/shinyhunters-alleges-charter-communications-breach/) — TechRepublic (2026-05-29)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-leaks-charter-communications-data-after-failed-extortion/
