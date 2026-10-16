# ShinyHunters Claims 4.9M Charter Communications Accounts Stolen via Vishing Attack

**Severity:** high | **Category:** Data Breach,Threat Actor,Phishing | **Updated:** 2026-06-03 | **Reading time:** 6 min

U.S. telecom giant Charter Communications is investigating a significant data breach impacting 4.9 million customer accounts. The notorious extortion group ShinyHunters has claimed responsibility, alleging they initiated the breach on April 1, 2026, through a voice phishing (vishing) attack on an employee. This allowed them to compromise a Microsoft Entra account and gain access to the company's Salesforce instance, from which they claim to have exfiltrated customer data including names, addresses, and phone numbers. While Charter acknowledges the incident, it disputes that sensitive personal information was stolen, creating a conflict between the company's statement and the threat actor's claims, which are partially substantiated by data breach notification services.

## Executive Summary

**Charter Communications**, operating as Spectrum, is investigating a major data breach claimed by the notorious extortion group **[ShinyHunters](https://en.wikipedia.org/wiki/ShinyHunters)**. The group alleges it stole data from 4.9 million customer accounts after compromising an employee's **[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)** account via a voice phishing (vishing) attack. The initial access was reportedly used to pivot to the company's **Salesforce** instance and exfiltrate customer information. The compromised data, according to Have I Been Pwned, includes names, email and physical addresses, and phone numbers. Charter has acknowledged an incident but stated that no sensitive personal information or customer proprietary network information (CPNI) was exfiltrated, a claim that is contested by the threat actor's assertions and third-party analysis. This incident highlights the effectiveness of social engineering attacks against even large corporations and the significant downstream risk of a single compromised identity.

---

## Threat Overview

The attack, reportedly initiated on April 1, 2026, targeted **Charter Communications**, one of the largest telecommunications providers in the United States, with over 32 million customers. The threat actor, **ShinyHunters**, is a well-known cybercrime group with a history of large-scale data breaches and extortion.

- **Attack Vector**: The initial point of entry was a voice phishing (vishing) attack. The attackers deceived a Charter employee, convincing them to provide information that led to the compromise of their corporate **Microsoft Entra** account.
- **Lateral Movement & Exfiltration**: With credentials for the Entra account, ShinyHunters gained access to Charter's internal systems, specifically targeting and accessing the company's **Salesforce** environment. From there, they exfiltrated a large dataset containing information on approximately 4.9 million customers.
- **Data Compromised**: Analysis by Have I Been Pwned confirms the breached data contains personally identifiable information (PII), including full names, email addresses, physical addresses, and phone numbers. Additionally, an internal employee directory containing about 85,000 job titles was also exposed.

> The discrepancy between Charter's official statement (claiming no sensitive PI was lost) and the data analysis underscores the challenge organizations face in accurately assessing and communicating the scope of a breach in its early stages.

## Technical Analysis

The attack on Charter Communications follows a classic pattern of identity-driven compromise, leveraging social engineering to bypass technical controls.

1.  **Initial Access**: The attackers used voice phishing, a form of social engineering, to manipulate an employee. This is a highly effective technique that preys on human trust and is difficult to defend against with technology alone. This corresponds to MITRE ATT&CK [`T1598.001 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1598/001/).
2.  **Credential Access & Defense Evasion**: By obtaining the employee's credentials, the attackers gained access to a legitimate **Microsoft Entra** account. This allows them to operate with the privileges of that user, effectively blending in with normal network traffic and bypassing perimeter defenses. This aligns with [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
3.  **Discovery & Collection**: Once inside the network, the attackers likely performed discovery to identify high-value data repositories. They located and accessed the **Salesforce** instance, a common target due to the wealth of customer data it contains. This maps to [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/).
4.  **Exfiltration**: The final stage involved exfiltrating the collected data from the Salesforce environment to attacker-controlled infrastructure, likely using common web protocols to further evade detection, mapping to [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/).

## Impact Assessment

The breach carries significant potential impact for both Charter Communications and its 4.9 million affected customers.

- **For Customers**: The exposure of names, addresses, and phone numbers places affected individuals at high risk of targeted phishing, smishing, and other social engineering attacks. Scammers can use this data to craft highly convincing fraudulent communications pretending to be from Charter or other trusted entities.
- **For Charter**: The company faces substantial reputational damage, potential regulatory fines, and costs associated with incident response, customer notification, and credit monitoring services. The public contradiction of their official statement by a well-known data breach service could further erode customer trust. The compromise of an internal employee directory also exposes their staff to targeted recruitment or further social engineering attempts.

## IOCs — Directly from Articles

No specific technical Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for activity related to this type of attack. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| log_source | Microsoft Entra ID Sign-in logs | Monitor for anomalous sign-in events, such as logins from unfamiliar locations, impossible travel, or multiple failed login attempts followed by a success. |
| log_source | Salesforce Event Monitoring logs | Look for unusual data access patterns, such as a single user account accessing or exporting an abnormally large number of records. |
| command_line_pattern | `(Export-Csv|Out-File)` | In endpoint logs, look for PowerShell commands used to export large amounts of data, which could be a sign of internal data staging. |
| network_traffic_pattern | High-volume uploads to non-corporate domains | Monitor network traffic for large data transfers from internal systems to cloud storage providers or unknown external IP addresses. |

## Detection & Response

Detecting and responding to identity-driven breaches requires a multi-layered approach.

- **Detection**:
    - **Identity Threat Detection and Response (ITDR)**: Deploy solutions that monitor **[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)** for risky sign-ins, privilege escalations, and anomalous user behavior. This aligns with D3FEND's [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).
    - **CASB/SaaS Security**: Implement a Cloud Access Security Broker (CASB) or SaaS Security Posture Management (SSPM) tool to monitor activity within **Salesforce**. Configure policies to alert on mass data downloads or exports.
    - **Endpoint Detection and Response (EDR)**: Monitor endpoints for suspicious processes or commands that might be used for data staging or exfiltration.
- **Response**:
    1.  Immediately disable the compromised user account and invalidate all active sessions.
    2.  Initiate a review of all activity associated with the compromised account to determine the scope of access.
    3.  Analyze logs from both Entra ID and Salesforce to identify all data that was accessed or exfiltrated.
    4.  Preserve all relevant logs and system images for forensic analysis.

## Mitigation

- **User Training**: Conduct regular, realistic security awareness training that includes modules on phishing, smishing, and vishing. This is the primary defense against the initial attack vector and maps to MITRE Mitigation [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
- **Multi-Factor Authentication (MFA)**: Enforce phishing-resistant MFA (e.g., FIDO2/WebAuthn) for all user accounts, especially for access to critical systems like Entra ID and Salesforce. This is a critical control and maps to [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
- **Principle of Least Privilege**: Regularly review user permissions in both cloud and on-premise applications. Ensure users only have access to the data and systems absolutely necessary for their job roles. This maps to [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1018/).
- **Data Exfiltration Controls**: Implement Data Loss Prevention (DLP) policies to detect and block the unauthorized transfer of sensitive data outside the corporate network.

**Tags:** cloud security, extortion, identity and access management, social engineering, vishing

## Sources
- [Charter Communications data breach affects 4.9 million accounts](https://www.bleepingcomputer.com/news/security/charter-communications-data-breach-affects-49-million-accounts/) (2026-05-29)
- [May 28's Top Cyber News NOW! - Ep 1141](https://www.youtube.com/watch?v=exampleURL) (2026-05-28)

---
Source: https://cyber.netsecops.io/articles/charter-communications-breach-shinyhunters-claims-4-9m-accounts-stolen/
