# Law Firms Holland & Knight, Squire Patton Boggs Disclose Breaches

**Severity:** high | **Category:** Data Breach,Phishing,Other | **Updated:** 2026-10-10 | **Reading time:** 6 min

Two prominent global law firms, Holland & Knight and Squire Patton Boggs, have disclosed separate data breaches that exposed sensitive information, including Social Security numbers. Holland & Knight attributed their incident, which affected 14 clients, to a social engineering attack that granted an attacker remote access. Squire Patton Boggs reported that an unauthorized third party obtained a 'limited set' of information. These incidents highlight the legal sector's status as a high-value target for cybercriminals.

## Executive Summary
Two major global law firms, **[Holland & Knight LLP](https://www.hklaw.com/)** and **Squire Patton Boggs LLP**, have separately reported data security incidents, adding to a growing list of law firms targeted by cyberattacks in 2026. The breaches, disclosed in early October 2026, resulted in the exposure of sensitive personal information, including Social Security numbers (SSNs). Holland & Knight identified a social engineering attack as the root cause, which led to unauthorized remote access and the compromise of files related to 14 clients. Squire Patton Boggs' disclosure was less specific, stating a limited set of information was obtained by an unauthorized party. These events underscore the significant risk faced by the legal sector, which holds vast amounts of confidential client and corporate data.

## Threat Overview
**Holland & Knight**, a firm with over 2,200 professionals, revealed that an attacker used social engineering to gain remote access to a firm computer. This access was then used to exfiltrate a small number of files containing sensitive data, including SSNs. The firm has notified the 14 affected clients and engaged law enforcement. The attack vector points to a targeted effort against a specific individual to gain an initial foothold within the network.

**Squire Patton Boggs**, a firm with around 1,500 lawyers, reported its breach on October 8, 2026. A filing with the Vermont Attorney General's office indicates that at least two Vermont residents were among those whose SSNs were compromised. The firm has not publicly detailed the attack vector but confirmed that client services were not disrupted.

There is no evidence to suggest the two incidents are related. They are, however, part of a clear trend of attacks against the legal industry, which is often seen as a soft target with highly valuable data for extortion or corporate espionage.

## Technical Analysis
The attack on Holland & Knight was explicitly attributed to social engineering. This is a broad term, but it likely involved phishing or a pretexting phone call to trick an employee into revealing credentials, installing malware, or granting remote access.

### MITRE ATT&CK Techniques
- **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/):** (Assessed) The most common form of social engineering, likely used to deliver a malicious link or attachment to gain initial access.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Once credentials were stolen via social engineering, the attacker used them to gain legitimate remote access to the firm's systems.
- **[`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/):** The attacker leveraged a remote access capability to connect to a firm computer, indicating that remote access ports or services were likely exposed.
- **[`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/):** After accessing the files, the attacker exfiltrated them. This could have been done via encrypted channels or common protocols to blend in with normal traffic.

## Impact Assessment
Data breaches at law firms are particularly damaging due to the nature of the information they hold. The compromised data can include privileged client communications, M&A details, intellectual property, and litigation strategies, in addition to PII like SSNs. The exposure of SSNs creates a risk of identity theft for the affected individuals. For the firms, the impact includes reputational damage, loss of client trust, potential regulatory fines, and the cost of incident response and litigation. The growing number of such attacks could lead to increased cybersecurity insurance premiums for the entire legal sector and may result in class-action lawsuits from affected clients and individuals.

## IOCs — Directly from Articles
No specific IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect activity related to law firm targeting, security teams should monitor for the following:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `log_source` | `VPN/Remote Access Logs` | Look for logins from unusual geographic locations, multiple failed login attempts followed by a success, or logins outside of normal business hours. | VPN concentrator logs, RADIUS logs, SIEM | high |
| `command_line_pattern` | `powershell.exe -enc` | Encoded PowerShell commands are frequently used by attackers after initial access to download additional tools or execute commands. | EDR logs, Windows Event ID 4688 | medium |
| `network_traffic_pattern` | `Unusual access to document management systems` | Monitor for a single user account accessing an abnormally large number of files or client matters in a short period. | Application logs, SIEM | medium |
| `email_address` | `lookalike-domain.com` | Be vigilant for phishing emails from domains that mimic the firm's own domain or that of a known client. | Email security gateway logs | high |

## Detection & Response
- **User and Entity Behavior Analytics (UEBA):** Deploy UEBA solutions to baseline normal user activity and detect anomalies, such as an account accessing unusual files or logging in from a new location. This directly applies **[D3FEND User Geolocation Logon Pattern Analysis (D3-UGLPA)](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
- **Endpoint Detection and Response (EDR):** An EDR solution can detect malicious processes or scripts executed after a successful social engineering attack, providing an opportunity to contain the breach before data is exfiltrated.
- **Data Loss Prevention (DLP):** Implement DLP policies to monitor and block the unauthorized transfer of sensitive data, such as documents containing multiple SSNs, outside the corporate network.
- **Security Awareness Training:** Since the initial vector was social engineering, continuous training for all employees on how to spot and report phishing attempts is crucial. This is a key part of **[D3FEND User Training](https://d3fend.mitre.org/technique/d3f:UserTraining)**.

## Mitigation
- **Multi-Factor Authentication (MFA):** Enforce **[MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** on all remote access services (VPN, RDP, etc.) and email accounts. This is the single most effective control against credential theft via social engineering.
- **Principle of Least Privilege:** Ensure users only have access to the client files and data necessary for their job function. This can limit the amount of data an attacker can access if a single account is compromised.
- **Email Filtering:** Use an advanced email security gateway to block phishing emails, malicious attachments, and links before they reach employee inboxes.
- **Egress Traffic Filtering:** Restrict outbound network connections to prevent attackers from easily exfiltrating data. Block traffic to known malicious domains and monitor for large, unexpected data transfers.

**Tags:** Data Breach, Legal Services, Social Engineering, Phishing, SSN

## Sources
- [Multiple major US law firms hit by data breaches, Social Security numbers exposed](https://cybernews.com/news/us-law-firms-hit-by-data-breaches/) — Cybernews (2026-10-10)
- [Two More BigLaw Firms Disclose Data Breaches: Holland & Knight and Squire Patton Boggs](https://shattered.io/holland-knight-breach-14-clients-ssns-2026/) — Shattered (2026-10-10)
- [Holland & Knight Discloses Data Breach Amid Spate of Law-Firm Attacks [2026]](https://tech-insider.org/holland-knight-law-firm-data-breaches-2026/) — Tech Insider (2026-10-10)
- [Holland & Knight, other firms disclose data security breaches](https://content.next.westlaw.com/Document/Ie45627b0c40811f1b7d4acd334a7a991/View/FullText.html?productData=categoryPageUrl%3AHome%2F&transitionType=CategoryPageItem&contextData=(sc.Default)) — Reuters (2026-10-09)

---
Source: https://cyber.netsecops.io/articles/law-firms-holland-knight-squire-patton-boggs-disclose-data-breaches/
