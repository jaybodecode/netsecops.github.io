# Tomiris APT Refines Toolkit, Using Discord and Telegram for C2 in Diplomatic Attacks

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2025-11-28 | **Reading time:** 6 min

The cyber-espionage group 'Tomiris' has upgraded its tactical arsenal in a new wave of attacks targeting diplomatic and government organizations in Russia and Commonwealth of Independent States (CIS) countries. According to a new report from Kaspersky, the APT group is now using public services like Discord and Telegram for command-and-control (C2) communications to better evade detection. The group uses tailored spear-phishing emails to deliver a variety of payloads, including reverse shells and custom backdoors, and deploys specialized 'FileGrabber' malware to steal documents, demonstrating a focus on long-term intelligence gathering.

## Executive Summary
The Advanced Persistent Threat (APT) group known as **Tomiris** has launched a new series of highly targeted cyber-espionage campaigns in 2025, refining its tools and techniques to enhance stealth. According to a report by **[Kaspersky](https://www.kaspersky.com)**, the group is targeting foreign ministries and government bodies in Russia and several Commonwealth of Independent States (CIS) countries, including Turkmenistan, Kyrgyzstan, Tajikistan, and Uzbekistan. A key evolution in their tactics is the use of legitimate public services, specifically **[Discord](https://discord.com/)** and **[Telegram](https://telegram.org/)**, for command-and-control (C2) communications. This allows the group to blend its malicious traffic with legitimate network activity, complicating detection efforts. The campaign's goal remains long-term intelligence gathering from high-value diplomatic targets.

---

## Threat Overview
Tomiris continues to rely on spear-phishing as its initial access vector, using emails with content carefully crafted in Russian and other national languages to appear legitimate to its targets. These emails deliver a diverse range of malware payloads.

The group's updated toolkit includes:
- **Reverse Shells:** Written in multiple languages (C/C++, Go, Rust, Python) for flexibility across different target environments.
- **Custom Backdoors:** Provides persistent access and control over compromised systems.
- **Open-Source C2 Frameworks:** The group has been observed using the **Havoc** framework.
- **FileGrabber Malware:** Specialized tools designed to search for and exfiltrate specific file types, such as PDFs and Word documents.

The most notable tactical shift is the adoption of Discord and Telegram for C2. By using the APIs of these popular services, the malware can send and receive commands and exfiltrate data over standard, encrypted HTTPS connections, making it difficult for network security tools to distinguish from benign user activity.

---

## Technical Analysis
Tomiris's TTPs demonstrate a focus on stealth, persistence, and adaptability.

- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** The use of tailored emails with malicious attachments to gain initial access.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The core of their new C2 strategy. Using Discord and Telegram APIs for C2 communication over HTTPS.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** After initial access, the first-stage payload downloads further tools like backdoors and file grabbers.
- **[`T1059 - Command and Scripting Interpreter`](https://attack.mitre.org/techniques/T1059/):** The use of reverse shells in various scripting languages (Python, Go) for execution.
- **[`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/):** The 'FileGrabber' malware is used to collect documents from the compromised host.
- **[`T1573.001 - Symmetric Cryptography`](https://attack.mitre.org/techniques/T1573/001/):** Traffic to Discord/Telegram is encrypted by default (TLS), which is a form of encrypted C2 channel.

> The use of legitimate public services for C2 is a growing trend among APTs. It offloads infrastructure management to reputable providers and makes blocking C2 traffic challenging, as blocking all of Discord or Telegram is not feasible for most organizations.

---

## Impact Assessment
The impact of this campaign is focused on espionage and intelligence theft. By targeting diplomatic and government entities, Tomiris aims to steal sensitive state secrets, including political strategies, negotiation positions, and classified documents. A successful breach can provide the group's sponsors with a significant strategic advantage in international relations. The long-term persistence achieved through stealthy C2 channels means that the targeted organizations could be compromised for extended periods, leading to a continuous drain of sensitive information.

---

## Cyber Observables for Detection
Detecting C2 over legitimate services requires looking for subtle anomalies.

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | `discord.com/api` or `api.telegram.org` | Monitor for connections to these API endpoints from unusual processes (e.g., a standalone executable in `TEMP` folder) or from servers that should not be running chat clients. |
| network_traffic_pattern | High-frequency, small data packets | Look for beaconing behavior to these services, characterized by regular, small data transfers, which is indicative of C2 heartbeats. |
| process_name | Unusual process names making web requests | An unknown or strangely named process (`doc_viewer.exe`) making API calls to Discord is highly suspicious. |
| command_line_pattern | `curl` or `wget` to Discord/Telegram | Command-line execution of tools to download payloads from or exfiltrate data to these services. |

---

## Detection & Response
1.  **TLS/SSL Inspection:** Implementing TLS inspection (also known as SSL decryption) on outbound network traffic is essential to gain visibility into the content of encrypted C2 channels like Discord and Telegram. This allows for the detection of malicious commands or exfiltrated data within the HTTPS traffic. This is **D3FEND's** [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **Restrict Web-Based Content:** For servers and sensitive workstations, create strict allowlists for outbound web traffic. If there is no business reason for a server to connect to `discord.com` or `telegram.org`, block it. This is **D3FEND's** [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
3.  **Endpoint Behavioral Analysis:** Use an EDR to detect the malware's behavior on the endpoint. For example, a process that opens, reads, and then sends multiple PDF and DOCX files to a Discord API endpoint is a strong indicator of the FileGrabber malware.

**Response:** If a compromise is detected, the C2 channel must be blocked at the firewall. The infected host should be isolated, and a forensic analysis should be performed to identify all malware components. All credentials on the host must be considered compromised and rotated.

---

## Mitigation
1.  **Email Security and User Training:** Strengthen email security gateways to block sophisticated phishing attempts. Train employees in diplomatic and government roles to be extremely cautious of unsolicited emails and attachments, as they are high-value targets.
2.  **Application Control:** Use application control policies to block the use of Discord, Telegram, and other similar applications on corporate devices where they are not required for business purposes. This is a form of **D3FEND's** [`Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting).
3.  **Egress Traffic Filtering:** As mentioned in detection, creating and enforcing a strict egress filtering policy is a powerful mitigation. The default policy should be to deny all outbound traffic, with explicit rules created for what is allowed.
4.  **Endpoint Hardening:** Reduce the attack surface on endpoints by removing unnecessary interpreters like Python if they are not required for the user's role.

**Tags:** Tomiris, APT, Cyber Espionage, Discord, Telegram, C2, Kaspersky, Havoc

## Sources
- [Tomiris wreaks Havoc: New tools and techniques of the APT group](https://www.cybersecurity-review.com/news/tomiris-wreaks-havoc-new-tools-and-techniques-of-the-apt-group) — Cybersecurity Review (2025-11-28)
- [Tomiris Hacker Group Unveils New Tools and Techniques for Global Attacks](https://gbhackers.com/tomiris-hacker-group/) — GBHackers on Security (2025-11-29)
- [Tomiris Shifts to Public-Service Implants for Stealthier C2 in Attacks on Government Targets](https://thehackernews.com/2025/12/tomiris-shifts-to-public-service.html) — The Hacker News (2025-12-01)

---
Source: https://cyber.netsecops.io/articles/tomiris-apt-upgrades-toolkit-for-espionage-against-diplomatic-targets/
