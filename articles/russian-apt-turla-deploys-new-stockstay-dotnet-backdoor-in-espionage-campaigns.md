# Russian APT Turla Unleashes New 'STOCKSTAY' Backdoor in Ukraine Espionage Attacks

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-06-26 | **Reading time:** 5 min

The Russian state-sponsored threat group Turla has been observed deploying a new, continuously developed .NET backdoor named STOCKSTAY. According to Google's Threat Analysis Group (GTIG), the malware targets Windows systems and has been used in cyber espionage campaigns against government and military entities in Ukraine. STOCKSTAY shares significant code similarities with Kazuar, another known Turla implant, suggesting it may be its successor. The malware communicates with its C2 via secure WebSockets and leverages a multi-hop infrastructure, including a public GitHub repository, to obfuscate its operations. GTIG assesses that Turla may be deploying STOCKSTAY alongside Kazuar to test its new capabilities in live environments.

## Executive Summary
**[Google](https://cloud.google.com/blog/topics/threat-intelligence)**'s Threat Analysis Group (GTIG) has identified a new, sophisticated .NET backdoor named **STOCKSTAY**, attributed to the Russian state-sponsored group **[Turla](https://attack.mitre.org/groups/G0010/)** (also known as Waterbug or Venomous Bear). This malware is being actively used in cyber espionage campaigns targeting government and military organizations in Ukraine, as well as entities with interests in Italian foreign policy. STOCKSTAY is a multi-component implant that communicates over secure WebSockets and shares substantial code overlap with **[Kazuar](https://attack.mitre.org/software/S0265/)**, a long-standing tool in Turla's arsenal. The development and deployment of this new malware indicate a continued evolution of the group's capabilities and a persistent focus on high-value intelligence gathering from strategic targets.

## Threat Overview
- **Threat Actor:** **Turla** (APT), a highly sophisticated Russian state-sponsored group known for its complex malware and stealthy operations targeting governments, militaries, and diplomatic entities worldwide.
- **Malware:** **STOCKSTAY**, a new backdoor written in .NET using the Windows Forms framework. Its primary function is to establish persistent access, execute commands, and exfiltrate data from compromised Windows systems.
- **Targeting:** The campaign has been observed targeting government and military entities in Ukraine, demonstrating a clear alignment with Russian geopolitical interests. Secondary targeting of organizations related to Italian foreign policy has also been noted.

Turla is leveraging STOCKSTAY as a primary implant for espionage. The malware's design suggests a focus on stealth and resilience, incorporating encrypted communications and a C2 architecture designed to evade detection. The significant code similarity with Kazuar suggests that STOCKSTAY is an evolutionary step, possibly intended to replace or augment the older implant with more modern features and a lower detection rate.

## Technical Analysis
STOCKSTAY's operations are characterized by several key technical features:

1.  **Implant Architecture:** The backdoor is written in .NET and uses Windows Forms. This choice allows for rapid development and potential cross-compatibility, though current observations are limited to Windows systems.
2.  **Command and Control (C2):** The malware communicates with its C2 servers using a secure WebSocket connection ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)). This provides a persistent, full-duplex communication channel that can be difficult to distinguish from legitimate web traffic.
3.  **Infrastructure Obfuscation:** Turla employs a multi-hop C2 infrastructure to hide the true location of its servers. Researchers discovered a public GitHub repository containing a Python script acting as a victim-side WebSocket server controller. This suggests victims may connect to intermediate nodes (potentially compromised servers or public infrastructure) that then proxy traffic to the final C2, a technique consistent with Turla's established TTPs ([`T1090.003 - Multi-hop Proxy`](https://attack.mitre.org/techniques/T1090/003/)).
4.  **Code Reuse:** The significant code overlap between STOCKSTAY and Kazuar points to a shared development team. Both malware families are built on .NET and have been observed using compromised WordPress sites for operational purposes ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). This reuse allows the threat actor to leverage proven code while introducing new features.

Google's analysis suggests Turla may be co-deploying STOCKSTAY and Kazuar, potentially as a way to A/B test the new implant's effectiveness and evasion capabilities in a live operational environment before fully retiring the older tool.

## Impact Assessment
A successful STOCKSTAY infection provides the Turla group with long-term, stealthy access to a target's network. The primary impact is espionage and intelligence gathering. Specific consequences include:
-   **Theft of Sensitive Data:** The backdoor can be used to exfiltrate classified government documents, military plans, diplomatic communications, and other sensitive state secrets.
-   **Persistent Foothold:** Once established, STOCKSTAY allows the actor to maintain access for extended periods, enabling them to monitor internal communications, pivot to other systems, and deploy additional malicious tools.
-   **Strategic Advantage:** The intelligence gathered from these campaigns can provide the Russian government with significant strategic, military, and political advantages.

## IOCs — Directly from Articles
No specific file hashes, domains, or IP addresses were provided in the summarized articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify potential STOCKSTAY activity:
| Type                   | Value                                      | Description                                                                                               |
|------------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| network_traffic_pattern| `wss://*` or `ws://*`                      | Outbound WebSocket connections from non-browser processes, especially from servers or user workstations.    |
| process_name           | `rundll32.exe`                             | Turla has historically used rundll32.exe to launch its .NET payloads. Monitor for rundll32 spawning unusual child processes. |
| command_line_pattern   | `powershell -enc`                          | Look for encoded PowerShell commands used for initial execution or lateral movement, a common TTP for APTs. |
| log_source             | `Proxy Logs / Firewall Logs`               | Hunt for connections to known compromised WordPress hosting providers or unusual GitHub URLs.             |
| file_path              | `C:\Users\<user>\AppData\Local\Temp\*.dll` | Payloads are often dropped in temporary or user-profile directories. Monitor for newly created .NET DLLs. |

## Detection & Response
Detecting Turla's activity requires a defense-in-depth approach.

1.  **Network Traffic Analysis:** Implement **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** with SSL/TLS inspection to identify anomalous WebSocket connections. Create alerts for non-browser processes initiating `wss://` connections to untrusted domains.
2.  **Endpoint Detection and Response (EDR):** Use an EDR solution to monitor for suspicious process chains, such as `powershell.exe` or `rundll32.exe` loading .NET assemblies from disk or memory. EDR is crucial for implementing **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
3.  **Signature-Based Detection:** Deploy antivirus and network intrusion prevention systems with up-to-date signatures for Turla, Kazuar, and emerging threats like STOCKSTAY.
4.  **Threat Hunting:** Proactively hunt for PowerShell execution ([`T1059.001`](https://attack.mitre.org/techniques/T1059/001/)) and unusual .NET assembly loads in memory. Check for connections to public code repositories like GitHub from server infrastructure.

## Mitigation
Defending against a sophisticated actor like Turla requires a multi-layered security posture.

1.  **Application Control:** Use application control solutions like AppLocker to restrict the execution of unauthorized software, which aligns with **[M1038 - Execution Prevention](https://attack.mitre.org/mitigations/M1038/)**.
2.  **Egress Traffic Filtering:** Implement strict egress filtering to block outbound connections to unknown or uncategorized domains. Allow WebSocket traffic only to known-good, business-required services. This is a form of **[M1037 - Filter Network Traffic](https://attack.mitre.org/mitigations/M1037/)**.
3.  **PowerShell Hardening:** Constrain PowerShell language mode and enable robust script block and module logging to detect malicious usage, a key aspect of **[M1028 - Operating System Configuration](https://attack.mitre.org/mitigations/M1028/)**.
4.  **User Training:** Train users to recognize and report phishing attempts, which are often used as an initial access vector by APT groups ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).

**Tags:** Turla, STOCKSTAY, Kazuar, APT, Espionage, Ukraine, Google, Threat Intelligence, Malware

## Sources
- [Google Details Turla's New STOCKSTAY Backdoor Used in Ukraine Espionage Attacks](https://thehackernews.com/2026/06/google-details-turlas-new-stockstay.html) — The Hacker News (2026-06-26)
- [Weekly Intelligence Report - 26 Jun 2026](https://www.cyfirma.com/news/weekly-intelligence-report-26-jun-2026/) — CYFIRMA (2026-06-26)

---
Source: https://cyber.netsecops.io/articles/russian-apt-turla-deploys-new-stockstay-dotnet-backdoor-in-espionage-campaigns/
