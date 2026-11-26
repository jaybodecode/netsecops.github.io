# France Confirms Breach of 678,000 Taxpayer Records by Hacker 'ZeroBytes'

**Severity:** high | **Category:** Data Breach,Cyberattack,Threat Actor | **Updated:** 2026-08-16 | **Reading time:** 6 min

France's Directorate General of Public Finances (DGFiP) has confirmed a major data breach affecting approximately 678,000 taxpayers. The incident, which occurred in June and July 2026, was disclosed after a threat actor named 'ZeroBytes' began offering the stolen data for sale on a criminal forum. The attacker gained access via stolen professional credentials, compromising an internal VPN. The exfiltrated data includes highly sensitive personal and financial information, creating significant risks of fraud and identity theft. The Paris prosecutor's office has launched an investigation.

## Executive Summary
On August 15, 2026, the French government confirmed that its tax authority, the **[Direction Générale des Finances Publiques (DGFiP)](https://www.impots.gouv.fr/)**, suffered a significant data breach affecting approximately 678,000 individuals and professionals. The breach was perpetrated by a threat actor known as **ZeroBytes**, who gained access to an internal search tool via stolen credentials for a professional account and a third party, possibly involving an MFA bypass. The actor exfiltrated a trove of sensitive taxpayer data, including names, addresses, birth dates, and tax information. While the DGFiP asserts that direct access to taxpayer accounts was not compromised, the leaked data poses a severe risk of sophisticated phishing, fraud, and identity theft campaigns.

## Threat Overview
The threat actor, **ZeroBytes**, first advertised the stolen data on a criminal forum on August 12, 2026, claiming to possess records for over 2 million taxpayers. The French government and the monitoring platform FrenchBreaches later confirmed a lower but still substantial number of 678,000 affected parties (393,000 individuals and 286,000 professionals). The intrusion occurred between late June and early July 2026. The initial access vector was the compromise of legitimate login credentials, which gave the attacker access to an internal VPN and a powerful search tool that queries taxpayer databases. This method allowed the attacker to systematically exfiltrate data without breaching the main public-facing tax portal, `impots.gouv.fr`.

## Technical Analysis
The attack chain relied on credential compromise rather than software exploitation. The actor, **ZeroBytes**, leveraged stolen credentials to impersonate an authorized user and gain access to internal resources.

**Attack Chain:**
1.  **Initial Access:** The attacker obtained valid credentials for an employee and an authorized third party. This likely occurred through phishing, infostealer malware, or purchase from a credential marketplace. The actor may have also employed an **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** bypass technique. This corresponds to MITRE ATT&CK [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/).
2.  **Defense Evasion & Persistence:** Using the stolen credentials, the attacker connected to an internal company VPN. This is a classic example of [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/). This allowed them to appear as a legitimate user on the network.
3.  **Discovery & Collection:** Once inside the network, the attacker accessed an internal search application. This tool provided broad access to query and retrieve taxpayer data from both individual and business databases. This aligns with [`T1114 - Email Collection`](https://attack.mitre.org/techniques/T1114/) and data from local systems.
4.  **Exfiltration:** The actor systematically exfiltrated the collected data. The method is not specified, but it was likely done over the encrypted VPN tunnel, blending in with normal traffic, a form of [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).

The stolen data is extensive, including:
- Full names, addresses, dates of birth
- Family situation
- Reference tax income and withholding tax rates
- Property cadastral data
- Business SIREN numbers

## Impact Assessment
The primary impact is the heightened risk of identity theft and highly targeted fraud against French taxpayers. With this detailed personal and financial information, criminals can craft extremely convincing phishing emails or vishing calls impersonating the DGFiP or other official bodies. They could trick victims into making fraudulent payments, revealing banking details, or providing further sensitive information. Businesses are also at risk, as their SIREN numbers and financial data could be used for corporate identity theft or business email compromise (BEC) scams. The French government faces significant reputational damage due to the delayed disclosure, which only occurred after the hacker publicized the breach.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect similar activity:
| Type | Value | Description |
|---|---|---|
| `command_line_pattern` | `*search_tool.exe* --query * --export *` | Suspicious command-line usage of internal data query tools, especially with export flags. |
| `network_traffic_pattern` | `Unusual large data egress from internal tool IP to single external IP` | Monitoring for abnormal data transfer volumes from internal applications to unexpected destinations. |
| `log_source` | `VPN Logs` | Look for logins from unusual geolocations, multiple rapid logins from different locations with the same credentials, or logins outside of normal business hours. |
| `log_source` | `Application Logs` | Audit logs for internal search tools should be monitored for an unusually high volume of queries from a single user account. |

## Detection & Response
- **Monitor VPN and Remote Access Logs:** Implement robust monitoring for all remote access services. Look for anomalous login patterns, such as logins from geographically impossible locations, multiple concurrent logins with the same credentials, or access from non-standard IP ranges. This aligns with **D3FEND** techniques like [`User Geolocation Logon Pattern Analysis (D3-UGLPA)`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
- **Audit Internal Application Usage:** Critical internal applications, especially those with access to sensitive data, must have detailed audit logging. Security teams should establish a baseline of normal query behavior and alert on deviations, such as a single user account performing an unusually high number of searches or data exports.
- **Network Egress Monitoring:** Monitor outbound network traffic for large, unexpected data transfers, particularly from internal servers to external destinations. This can be achieved through **D3FEND**'s [`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

## Mitigation
- **Enforce Phishing-Resistant MFA:** The most critical mitigation is to enforce phishing-resistant Multi-Factor Authentication (MFA) for all accounts, especially those with access to VPNs and sensitive internal systems. This is a key aspect of **D3FEND**'s [`Multi-factor Authentication (D3-MFA)`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
- **Principle of Least Privilege:** Ensure that user accounts, including those of third-party partners, only have access to the data and systems strictly necessary for their roles. An account should not have the ability to query the entire taxpayer database unless it is a core job function.
- **Network Segmentation:** Isolate sensitive database systems and internal tools from the general corporate network. Access should be strictly controlled through internal firewalls and access control lists, following **D3FEND**'s [`Network Isolation (D3-NI)`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) principles.
- **Data Exfiltration Controls:** Implement Data Loss Prevention (DLP) solutions to detect and block the unauthorized transfer of sensitive data patterns (like tax IDs or SIREN numbers) outside the network.

**Tags:** Data Breach, ZeroBytes, DGFiP, Taxpayer Data, France, Credential Compromise, VPN

## Sources
- [France confirms taxpayer data stolen as hacker boasts of 2M records | Cybernews](https://cybernews.com/news/france-confirms-taxpayer-data-stolen/) — Cybernews (2026-08-15)
- [French Tax Agency Admits Data Breach as Hacker Steals 678K Records](https://news.bitcoin.com/security/french-tax-agency-admits-data-breach-as-hacker-steals-678k-records/) — Bitcoin.com News (2026-08-15)
- [France opens investigation into tax platform cyberattack affecting nearly 700,000 users](https://www.aa.com.tr/en/europe/france-opens-investigation-into-tax-platform-cyberattack-affecting-nearly-700-000-users/4028487) — Anadolu Ajansı (2026-08-15)

---
Source: https://cyber.netsecops.io/articles/france-tax-data-breach-zerobytes-leaks-taxpayer-records/
