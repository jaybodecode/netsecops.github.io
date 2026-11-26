# Espionage Group TGR-STA-0049 Deploys Novel RATs with HTTP/3 C2

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-11-17 | **Reading time:** 26 min

The cyberespionage group TGR-STA-0049 (also known as Earth Alux) is targeting government entities across Southeast Asia, South America, and Europe in a campaign active since at least July 2025. The threat actor uses two new custom RATs, PerfectPioneer and its successor KUKURAT, which employ the HTTP/3 protocol for stealthy command and control. Initial access is gained through exploiting vulnerable servers to deploy web shells and through secondary phishing attacks with tailored decoys.

## Executive Summary

Unit 42 has identified a sophisticated cyberespionage campaign attributed to the threat actor **[TGR-STA-0049](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)** (also tracked as REF7707, **[Earth Alux](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**, and Ink Dragon). Active since at least July 2025, this campaign targets government organizations in Southeast Asia, South America, and Europe. The actor has deployed two previously undocumented Remote Access Trojans (RATs): **[PerfectPioneer RAT](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**, a Go-based malware, and its more advanced modular successor, **[KUKURAT](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**. A key feature of this campaign is the use of HTTP/3 for command and control (C2) communications, a novel technique designed to evade detection by blending in with legitimate QUIC protocol traffic. The primary infection vector involves exploiting vulnerable public-facing servers, such as **[Microsoft Exchange](https://www.microsoft.com/en-us/microsoft-365/exchange/)**, to install web shells, with phishing serving as a secondary access method. This activity indicates a well-resourced actor focused on long-term intelligence collection and stealth.

---

## Threat Overview

The threat actor **TGR-STA-0049** has a history of targeting high-value sectors dating back to at least March 2023. Previously, the group was known for deploying **[Squidoor](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)** (also known as FINALDRAFT), an advanced backdoor. This latest campaign, observed since mid-2025, marks a significant evolution in the group's tradecraft with the introduction of **PerfectPioneer RAT** and **KUKURAT**. The transition from PerfectPioneer to the modular KUKURAT in March 2026 demonstrates the actor's continuous development and refinement of their toolset.

The campaign's primary objective is cyberespionage, focusing on data collection and exfiltration from strategic government targets. The use of custom malware, advanced evasion techniques like HTTP/3 C2, and a dual-track infection strategy highlights the actor's sophistication and determination to maintain persistent access within compromised networks.

---

## Technical Analysis

The threat actor employs a multi-stage attack chain characterized by stealth and adaptability.

### Infection Vectors
1.  **Server Exploitation ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/))**: The primary method for initial access is the exploitation of unpatched, internet-facing applications, particularly **Microsoft Exchange** servers. Upon successful exploitation, the attackers deploy various web shells, including custom variants and publicly known tools like **[ASPXSpy](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**, **[Godzilla](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**, `Bysunue.aspx`, and `Suo5`. These web shells provide a foothold for executing reconnaissance commands and deploying the primary RAT payloads ([`T1505.003 - Server Software Component: Web Shell`](https://attack.mitre.org/techniques/T1505.003/)).

2.  **Phishing ([`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566.001/))**: As a secondary vector, the actor uses highly targeted phishing emails. These emails contain decoy PDF documents, such as one impersonating an official document from the **[Union Election Commission of the Republic of the Union of Myanmar](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/)**, to trick users into executing the malware.

### Malware and C2 Communication
The campaign's standout feature is its custom malware and C2 infrastructure.

-   **PerfectPioneer RAT**: A Go-based RAT first seen in July 2025. It is executed via multiple methods, including direct deployment from a web shell, **[DLL Side-Loading](https://attack.mitre.org/techniques/T1574/002/)** ([`T1574.002`](https://attack.mitre.org/techniques/T1574/002/)), and decoy installers.

-   **KUKURAT**: Deployed since March 2026, KUKURAT is a modular and more advanced successor to PerfectPioneer, indicating an active development cycle aimed at enhancing stealth and functionality.

-   **HTTP/3 C2 Communication**: Both RATs use HTTP/3 over the QUIC protocol for C2. This is a sophisticated choice that offers several advantages for evasion:
    -   **Encryption**: All traffic, including metadata, is encrypted by default using TLS 1.3, hindering inspection ([`T1573.002 - Encrypted Channel: Asymmetric Cryptography`](https://attack.mitre.org/techniques/T1573.002/)).
    -   **Evasion**: It operates over UDP port 443, which is often allowed through firewalls. The traffic can be difficult to distinguish from legitimate web traffic from browsers like Chrome and Edge.
    -   **Resilience**: QUIC's connection migration capabilities provide more stable C2 channels.

This use of a modern web protocol for C2 ([`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/)) is a clear attempt to bypass traditional network security controls that primarily focus on TCP-based traffic.

---

## Impact Assessment

The impact of this campaign is primarily strategic, centered on long-term intelligence gathering from sensitive government networks. The compromise of government entities in Southeast Asia and other regions could lead to the theft of classified information, diplomatic communications, and other state secrets. The actor's focus on stealth and persistence means that intrusions could go undetected for extended periods, allowing for continuous data exfiltration.

For affected organizations, the direct impact includes the cost of incident response, forensic analysis, and system remediation. The long-term consequences involve a loss of confidentiality and a potential compromise of national security interests. The actor's ability to rapidly evolve its toolset suggests a persistent and escalating threat to government and potentially other high-value sectors worldwide.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source report.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic | UDP Port 443 | Hunt for anomalous or non-browser-generated QUIC traffic. Profile legitimate QUIC sources and alert on deviations. |
| Process Execution | `w3wp.exe` or `httpd.exe` | Monitor for web server processes spawning suspicious child processes like `cmd.exe`, `powershell.exe`, or unknown binaries. |
| File Creation | `*.aspx` | Monitor for the creation of new `.aspx` files in web-accessible directories on Exchange and IIS servers. |
| File Name | `Bysunue.aspx`, `Suo5` | Search for the presence of these known web shell filenames on web servers. |
| Command Line | `whoami`, `ipconfig`, `net user` | Look for initial reconnaissance commands being executed by web server service accounts. |
| File Signature | Go-based executables | Identify and scrutinize unknown Go-lang binaries running on critical servers, as both RATs are written in Go. |

---

## Detection & Response

Detecting this threat requires a multi-layered approach focusing on network anomalies and endpoint behaviors.

1.  **Network Traffic Analysis**: Implement **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** (`D3-NTA`) to monitor egress traffic on UDP port 443. Establish a baseline for legitimate QUIC traffic from browsers and cloud services. Use tools with JA3/JA3S and JARM-like fingerprinting capabilities for QUIC (e.g., QUIC-fingerprinting) to identify anomalous clients that do not match standard browsers.

2.  **Endpoint Detection and Response (EDR)**: Deploy EDR solutions to monitor for suspicious process chains. Create rules to detect web server processes (e.g., `w3wp.exe`) spawning command-line interpreters or making outbound network connections to unusual destinations. This is a key part of **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** (`D3-PA`).

3.  **Log Analysis**: Ingest and analyze web server logs, Windows Event Logs (especially process creation 4688), and firewall logs. Look for unusual requests to `.aspx` pages, access from anomalous IP addresses, and unexpected UDP 443 connections from servers.

4.  **Threat Hunting**: Proactively hunt for web shells using file integrity monitoring and scanners. Hunt for evidence of DLL side-loading by monitoring for legitimate, signed executables loading unsigned or abnormally named DLLs from unusual directories.

---

## Mitigation

Defending against TGR-STA-0049 requires both immediate tactical actions and long-term strategic improvements.

1.  **Patch Management ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/))**: The most critical mitigation is to apply security patches to all internet-facing systems, especially **Microsoft Exchange**, web servers, and VPNs. Prioritize vulnerabilities known to be exploited in the wild.

2.  **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**: Isolate critical servers from each other and from the broader user network. Restrict communication from web servers to internal systems to prevent lateral movement after a breach.

3.  **Egress Traffic Filtering ([`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/))**: Deny all outbound traffic by default and only allow what is necessary. Specifically, restrict or heavily monitor outbound UDP 443 traffic from servers that have no business initiating QUIC connections.

4.  **Application Control ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))**: Use application allowlisting on critical servers to prevent the execution of unauthorized executables, including Go-based binaries dropped by the attacker. This can prevent the RATs from running even if the initial exploit is successful.

5.  **User Training and Awareness ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: To counter the phishing vector, conduct regular security awareness training to help users identify and report suspicious emails and attachments.

**Tags:** Cyberespionage, RAT, HTTP/3, QUIC, Go malware, Web Shell, DLL Sideloading, Phishing, TGR-STA-0049, Earth Alux

## Sources
- [QUIC and Covert: Novel HTTP/3-Powered RATs Target Southeast Asian Governments](https://unit42.paloaltonetworks.com/custom-rats-target-southeast-asia-governments/) — Unit 42 (2026-11-16)

---
Source: https://cyber.netsecops.io/articles/quic-and-covert-novel-http3-powered-rats-target-southeast-asian-governments/
