# Allies Expose Chinese Hacking Contractor 'Integrity Technology Group'

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Supply Chain Attack | **Updated:** 2026-10-11 | **Reading time:** 5 min

An international coalition of cybersecurity agencies, including those from the U.S. and U.K., has issued a joint advisory on Integrity Technology Group (ITG), a sanctioned Chinese company. The alert details how ITG provides hacking tools and services for state-sponsored espionage campaigns, acting as a contractor for threat groups like Flax Typhoon. The advisory exposes ITG's TTPs, including the use of custom tools like 'MicroScan' and 'EBurst' to target critical infrastructure and government entities worldwide.

## Executive Summary
A coalition of cybersecurity agencies from the U.S., U.K., and other allied nations has published a detailed joint advisory on **Integrity Technology Group (ITG)**, a China-based company sanctioned for its role in global cyber espionage. The advisory, released on October 8, 2026, dissects ITG's function as a for-profit hacking contractor, developing and deploying cyber capabilities on behalf of Chinese state-sponsored threat actors, including the group known as **[Flax Typhoon](https://attack.mitre.org/groups/G1017/)** (aka Ethereal Panda). The U.S. Department of Justice also announced the seizure of domains and hacking tools used by ITG, providing a rare public look into the commercial supply chain supporting China's state hacking operations.

## Threat Overview
The advisory provides a clear picture of the public-private partnership model used by China for its cyber operations. ITG acts as a 'hacker-for-hire' entity, providing the tools, infrastructure, and operational support for state-directed campaigns. Their targets are widespread and align with China's strategic interests, including critical infrastructure, government, healthcare, and manufacturing sectors across North America, Southeast Asia, and Africa.

The group's activities mimic those previously attributed to Flax Typhoon, a threat actor known for targeting entities in Taiwan and other regions. The U.S. government's seizure of ITG's tools, including `FishHub` and `MicroScan`, represents a direct disruption of their operations.

## Technical Analysis
ITG employs a mix of open-source and custom-built tools to conduct its operations. Their methodology is systematic, beginning with broad scanning and progressing to targeted exploitation.

### Tools and TTPs:
- **Scanning:** ITG uses open-source tools and a custom utility called `MicroScan`, which contains over 1,300 penetration testing scripts, to scan networks for specific vulnerabilities.
- **Exploitation:** The group has been observed exploiting cross-site scripting (XSS) vulnerabilities to gain initial access.
- **Credential Access:** A tool named `EBurst` is used to conduct password spraying attacks against **[Microsoft](https://www.microsoft.com/)** 365 accounts.
- **Collection:** After gaining access to email accounts, the attackers use a command-line utility called `office-cli` to target Outlook 365 and exfiltrate emails.

### MITRE ATT&CK Techniques
- **[`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/):** The use of `MicroScan` and other tools to actively scan for weaknesses is a key part of their reconnaissance phase.
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** The advisory mentions the exploitation of vulnerabilities like XSS in web applications.
- **[`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/):** The tool `EBurst` is explicitly used for password spraying against Microsoft 365, a common technique to compromise accounts with weak passwords.
- **[`T1114.002 - Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/):** The use of the `office-cli` tool to steal emails from compromised Outlook 365 accounts falls under this technique.
- **[`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/):** As a contractor, ITG's entire purpose is to 'Obtain Capabilities' by developing and acquiring tools like `FishHub` and `MicroScan` for use in attacks.

## Impact Assessment
The activities of ITG and Flax Typhoon pose a significant threat to global critical infrastructure and government entities. The targets listed—including a power company in South Carolina, a Polish airport, and Taiwanese gas and power companies—demonstrate a clear focus on sectors with strategic importance. A successful compromise of these entities could lead to operational disruptions, espionage, or pre-positioning for future disruptive attacks. The joint advisory and DOJ action represent a coordinated effort by Western governments to expose and disrupt this state-sponsored commercial hacking ecosystem.

## IOCs — Directly from Articles
The articles mention the names of tools but do not provide specific file hashes, domains, or IPs.
- **Tools:** `FishHub`, `MicroScan`, `EBurst`, `office-cli`

## Cyber Observables — Hunting Hints
Security teams can hunt for TTPs associated with ITG and Flax Typhoon:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `command_line_pattern` | `office-cli` | The presence or execution of the `office-cli` utility is a strong indicator of this actor's activity. | EDR logs, file system analysis | high |
| `log_source` | `Microsoft 365 unified audit log` | Search for a high volume of failed login attempts from a single IP followed by a success, indicative of a password spray attack using `EBurst`. | SIEM, M365 Security Center | high |
| `network_traffic_pattern` | `Anomalous PowerShell to graph.microsoft.com` | Attackers often use PowerShell to interact with the Microsoft Graph API for email exfiltration after compromising an account. | EDR logs, proxy logs | medium |
| `vulnerability_signature` | `XSS patterns in web logs` | Monitor WAF and web server logs for common cross-site scripting payloads, which ITG is known to use for initial access. | WAF logs, web server logs | medium |

## Detection & Response
- **Monitor M365 Logs:** Closely monitor Microsoft 365 audit logs for signs of password spraying, impossible travel alerts, and anomalous mailbox access rules being created. This aligns with **[D3FEND Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
- **Endpoint Detection:** Use an EDR solution to detect the execution of suspicious command-line utilities or PowerShell scripts used for email collection, such as `office-cli`.
- **Web Application Firewall (WAF):** Implement a WAF to detect and block attempts to exploit web vulnerabilities like XSS.

## Mitigation
- **Multi-Factor Authentication (MFA):** Enforce phishing-resistant **[MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** on all user accounts, especially for cloud services like Microsoft 365. This is the most effective defense against password spraying attacks.
- **Patch Management:** Aggressively patch public-facing applications to prevent exploitation of known vulnerabilities. This is a fundamental aspect of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
- **Block Legacy Authentication:** Disable legacy authentication protocols (e.g., POP, IMAP, SMTP AUTH) in Microsoft 365, as these protocols do not support MFA and are frequently abused in password spraying campaigns.
- **Threat Intelligence Integration:** Integrate threat intelligence feeds from government advisories (like this one) into security tools to automatically block known malicious indicators and detect TTPs associated with actors like Flax Typhoon.

**Tags:** Threat Actor, Flax Typhoon, State-Sponsored, China, Critical Infrastructure, Espionage

## Sources
- [UK and Allies Warn of Cyber Threat from China's Integrity Technology Group](https://www.infosecurity-magazine.com/news/uk-allies-threat-china-integrity/) — Infosecurity Magazine (2026-10-09)
- [DOJ seizes hacking tools used in China-backed critical infrastructure attacks](https://www.cybersecuritydive.com/news/fbi-seizes-domains-china-botnet-flax-typhoon/832611/) — Cybersecurity Dive (2026-10-09)
- [Cyber / Brief — 9 Oct 2026](https://www.cyberverso.net/brief/cyber-brief-9-oct-2026/) — Cyberverso (2026-10-09)

---
Source: https://cyber.netsecops.io/articles/us-uk-issue-alert-on-chinese-hacking-contractor-integrity-technology-group/
