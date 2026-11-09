# APT-C-60 Targets Japan with 'SpyGlace' Malware, Abusing Trusted Cloud Services

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-07-13 | **Reading time:** 5 min

The threat group APT-C-60 is continuing its cyber-espionage campaigns against organizations in Japan, employing updated tactics to deliver the 'SpyGlace' malware. According to JPCERT/CC, the attackers are abusing a chain of legitimate online services—including Proton Drive, jsDelivr, GitHub, GitLab, and Codeberg—to host and retrieve malicious components. This 'living off the trusted service' approach helps the attackers evade network-based detection by blending their traffic with legitimate developer and cloud service activity. The campaign begins with spear-phishing and uses a multi-stage infection process to deploy the final SpyGlace payload.

## Executive Summary
The Japanese Computer Emergency Response Team Coordination Center (**[JPCERT/CC](https://www.jpcert.or.jp/english/)**) has issued a report on an ongoing cyber-espionage campaign by the threat group **APT-C-60**. The campaign targets unspecified organizations in Japan with the **SpyGlace** malware. A key feature of the group's updated tactics is the extensive abuse of legitimate, trusted online services for command and control (C2) and payload delivery. The attackers leverage **[Proton Drive](https://proton.me/drive)**, **[jsDelivr](https://www.jsdelivr.com/)**, **[GitHub](https://github.com/)**, GitLab, and Codeberg to host malicious files and blend their C2 traffic, making detection significantly more challenging for network defenders.

---

## Threat Overview
APT-C-60 is a persistent threat actor focused on espionage against Japanese entities. This campaign demonstrates the group's evolution, adopting techniques to bypass network security controls by 'living off the trusted service.'

- **Threat Actor:** APT-C-60.
- **Target:** Organizations in Japan.
- **Malware:** SpyGlace (versions v3.1.15, v3.1.17, v3.1.18 identified).
- **Primary Tactic:** Abusing legitimate cloud and developer platforms for payload staging and C2, a technique often called Domain Fronting or using legitimate services as a content delivery network.

## Technical Analysis
The attack follows a multi-stage infection chain designed for stealth:

1.  **Initial Access:** The campaign begins with a spear-phishing email. The email either contains a link to a malicious file hosted on Proton Drive or has a malicious RAR archive attached.
2.  **Execution:** Inside the archive is a `.LNK` shortcut file. When the user clicks the LNK file, it executes `mshta.exe` to run embedded JavaScript code.
3.  **Staging:** The `mshta.exe` script fetches the next stage from jsDelivr, a popular content delivery network for open-source projects. This makes the download appear as legitimate web traffic.
4.  **Payload Assembly:** The malware then uses a legitimate `git.exe` binary, likely bundled with the malware, to connect to repositories on GitHub, GitLab, or Codeberg. It pulls down various components and assembles the final downloader and payload on the victim's machine.
5.  **Final Payload:** The ultimate goal is to execute the SpyGlace malware, a backdoor used for espionage and data theft.

This chain of using trusted services (`Proton Drive` -> `jsDelivr` -> `GitHub`) makes each step of the infection process difficult to block without impacting legitimate business operations.

### MITRE ATT&CK Mapping
- **[`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/):** Using links to malicious files on Proton Drive.
- **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** Relies on the user clicking the malicious LNK file.
- **[`T1218.005 - Signed Binary Proxy Execution: Mshta`](https://attack.mitre.org/techniques/T1218/005/):** Abusing `mshta.exe` to run malicious scripts.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** Downloading payloads from Proton Drive, jsDelivr, and GitHub.
- **[`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** Using standard HTTPS traffic to trusted domains to mask C2 and payload delivery.

## Impact Assessment
A successful compromise with SpyGlace malware can lead to long-term espionage. The attackers can gain persistent access to the victim's network, allowing them to:
- Exfiltrate sensitive corporate data, intellectual property, and government documents.
- Monitor internal communications.
- Pivot to other systems within the network.
- Deploy additional malicious tools.

The abuse of trusted services makes attribution and remediation more complex, as blocking the domains involved (e.g., `github.com`) is often not feasible for organizations that rely on them for development.

## IOCs — Directly from Articles
JPCERT/CC has published IOCs, but they were not detailed in the source articles. These would include C2 domains, file hashes, and attacker-controlled repository URLs.

## Cyber Observables — Hunting Hints
Detecting this activity requires looking for unusual uses of legitimate tools and services:

| Type | Value | Description | Context |
|---|---|---|---|
| process_name | `mshta.exe` | Monitor for `mshta.exe` making network connections, especially when launched by an Office application or from an LNK file. | EDR, Process creation logs |
| process_name | `git.exe` | Look for `git.exe` running outside of expected developer directories or being executed by non-developer user accounts. | EDR, Process creation logs |
| network_traffic_pattern | `jsdelivr.net`, `proton.me`, `codeberg.org` | While these are legitimate domains, traffic to them from unexpected processes or user accounts should be investigated. | Proxy logs, DNS logs, SIEM |
| command_line_pattern | `git clone` | Monitor for `git clone` commands that point to suspicious or newly created repositories. | EDR, Command-line logging |

## Detection & Response
- **Endpoint Detection and Response (EDR):** EDR is critical for detecting this attack chain. It can identify the suspicious process execution flow (e.g., LNK -> `mshta.exe` -> `git.exe`) and alert on the abuse of legitimate binaries.
- **TLS/SSL Inspection:** To detect malicious payloads being downloaded from trusted services, organizations need the ability to inspect encrypted traffic. This allows security tools to see the actual files being transferred from sites like GitHub and Proton Drive.
- **DNS and Proxy Log Analysis:** Correlate DNS queries and web proxy logs. A user's machine making a request to `proton.me` followed by `jsdelivr.net` and then `github.com`, when initiated by `mshta.exe`, is a high-confidence indicator of this campaign.

## Mitigation
- **Block LNK Attachments:** Configure email gateways to block or quarantine `.LNK` files within archives, as they are a common vector for malware delivery.
- **Attack Surface Reduction (ASR):** Use ASR rules to block `mshta.exe` from executing untrusted code and to prevent Office applications from creating child processes.
- **Restrict `git.exe` Execution:** Use application control policies (like AppLocker) to restrict where `git.exe` can be executed from and by which users. It should generally not be run from a user's `Downloads` folder.
- **Educate Users:** Train users to be suspicious of emails prompting them to download files from cloud storage services, even if the service itself is legitimate.

**Tags:** APT, APT-C-60, SpyGlace, Japan, JPCERT/CC, Espionage, GitHub

## Sources
- [APT-C-60 Phishing Campaign in Japan Abused GitHub, Proton Drive, and jsDelivr](https://mallory.ai/stories/019f59e0-245f-7119-b412-fd2d64c58eda) — Mallory (2026-07-13)
- [SpyGlace Attacks Abuse Trusted Developer Services to Evade Network Detection](https://cybersecuritynews.com/armored-likho-apt-uses-ai-generated-loaders/) — Cybersecurity News (2026-07-13)

---
Source: https://cyber.netsecops.io/articles/japan-based-apt-c-60-campaign-leverages-trusted-services-for-evasion/
