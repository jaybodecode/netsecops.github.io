# Gremlin Stealer Hides in Plain Sight, Using .NET Resources to Steal Crypto and Sessions

**Severity:** high | **Category:** Malware,Threat Intelligence,Threat Actor | **Updated:** 2026-05-15 | **Reading time:** 7 min

Unit 42 has analyzed a new, highly evolved variant of the Gremlin information stealer. This version marks a significant upgrade in stealth and capability, now embedding its malicious payload within the .NET resource section and using XOR encoding to bypass detection. The malware has expanded its targets beyond simple credential harvesting to include active session hijacking from Chromium-based browsers, a dedicated Discord token stealer, and a new clipboard hijacker that replaces cryptocurrency wallet addresses to commit financial fraud. The stealer exfiltrates stolen data in a ZIP archive to a command-and-control server, with recent samples showing zero initial detection on VirusTotal, highlighting its evasiveness.

## Executive Summary

This report details the analysis of a new, sophisticated variant of the **[Gremlin](https://malpedia.caad.fkie.fraunhofer.de/details/win.gremlin)** information stealer, identified by **[Unit 42](https://www.paloaltonetworks.com/unit42)**. The malware has evolved significantly, incorporating advanced anti-analysis and obfuscation techniques to evade detection. Key developments include hiding malicious payloads within the `.NET Resource` section, employing commercial-grade packers with instruction virtualization, and expanding its capabilities to include a cryptocurrency clipboard hijacker, session token theft from Chromium browsers, and a Discord token stealer. These enhancements transform Gremlin from a basic credential harvester into a modular, multi-faceted threat capable of direct financial fraud and comprehensive data compromise. The low detection rates of new samples underscore the increased risk posed to organizations and individuals.

---

## Threat Overview

Gremlin is an information stealer designed to siphon sensitive data from compromised systems. This latest iteration demonstrates a marked increase in sophistication, focusing on stealth and modularity. The primary attack vector involves tricking users into executing the malicious binary, which then harvests a wide range of data from web browsers, local storage, and active user sessions.

The malware bundles stolen data—including credentials, cookies, and system information—into a ZIP archive named after the victim's public IP address. This data is then exfiltrated to an attacker-controlled command-and-control (C2) server. A newly identified C2 endpoint is `194.87.92.109`, which had zero detections on **[VirusTotal](https://www.virustotal.com/)** at the time of discovery, highlighting the threat's evasiveness.

The evolution is clear: older versions were largely unobfuscated, while the new variant uses multi-stage loading and encryption to conceal its true purpose until runtime, making static analysis extremely difficult.

---

## Technical Analysis

The new Gremlin variant employs several advanced techniques to evade detection and analysis.

### Payload Obfuscation in .NET Resources
The most significant change is the relocation of the malicious payload into the `.NET Resource` section. The payload is encoded using a single-byte XOR operation, making it appear as an opaque, benign block of data to static analysis tools and signature-based antivirus engines. This technique, also used by malware like Agent Tesla and Formbook, effectively hides critical strings, API calls, and the C2 configuration until the malware decrypts them at runtime.

### Advanced Packing and Anti-Analysis
One analyzed sample (`2172dae9a5a695e00e0e4609e7db0207d8566d225f7e815fada246ae995c0f9b`) was protected by a commercial packing utility. This packer uses instruction virtualization, converting the original machine code into a custom bytecode that runs on a private virtual machine embedded within the malware. This is a powerful anti-debugging and anti-emulation technique.

Other anti-analysis methods include:
- **String Encryption:** Sensitive strings like C2 URLs (`hxxps://api[.]telegram[.]org`) and API function names are encrypted and only decrypted in memory when needed.
- **Control Flow Obfuscation:** The code's logic is intentionally convoluted with junk code and confusing jumps to hinder reverse engineering.
- **Staged Loading:** Critical functions are decrypted and mapped into memory from the resource section on-demand, forcing analysts to rely on dynamic analysis to observe program behavior.

### Modular Capabilities
Gremlin has transitioned to a modular architecture, with specialized components for different tasks:
1.  **Chromium Session Hijacking:** The malware now targets active session tokens directly from the memory of running **[Chromium](https://www.chromium.org/)**-based browser processes, bypassing the need to parse static database files.
2.  **Discord Token Stealer:** A dedicated module scans multiple file paths for **[Discord](https://discord.com/)** tokens and uses regex validation to ensure their authenticity before exfiltration.
3.  **Clipboard Hijacker:** This new module continuously monitors the system clipboard. When it detects a string matching the pattern of a cryptocurrency wallet address, it replaces it with an attacker-controlled address, enabling direct financial theft.

### MITRE ATT&CK Mapping
- [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/): The core technique of hiding the payload via XOR encoding in resources.
- [`T1027.002 - Software Packing`](https://attack.mitre.org/techniques/T1027/002/): Use of a commercial packer with instruction virtualization.
- [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/): Harvesting credentials, cookies, and other data from browser databases.
- [`T1552.004 - Web Session Cookie Theft`](https://attack.mitre.org/techniques/T1552/004/): Hijacking active session tokens directly from browser processes.
- [`T1115 - Clipboard Data`](https://attack.mitre.org/techniques/T1115/): Monitoring and modifying clipboard content to steal cryptocurrency.
- [`T1059.007 - JavaScript/JScript`](https://attack.mitre.org/techniques/T1059/007/): Although not explicitly stated, stealer modules often use scripts to interact with browser data.
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Uploading the stolen data in a ZIP archive to the C2 server.
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Using HTTP for C2 communication and data exfiltration.

---

## Impact Assessment

The evolution of Gremlin stealer presents a multi-faceted risk to organizations and individuals. The primary impact is financial, stemming directly from the new clipboard hijacking module that targets cryptocurrency transactions. This feature represents a direct and immediate path to monetization for the attackers.

Beyond direct financial loss, the compromise of credentials, session tokens, and communication platform data (e.g., Discord) can lead to significant follow-on attacks. Stolen credentials can be used to access corporate networks, cloud services, and financial accounts. Hijacked session tokens allow attackers to bypass **[multi-factor authentication (MFA)](https://www.cisa.gov/mfa)** and impersonate users, gaining access to sensitive enterprise applications and data. The theft of Discord tokens could lead to account takeovers, social engineering campaigns, or the compromise of developer communities.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `194.87.92.109` | Newly deployed Gremlin C2 server. |
| file_hash_sha256 | `2172dae9a5a695e00e0e4609e7db0207d8566d225f7e815fada246ae995c0f9b` | Packed Gremlin stealer sample. |
| file_hash_sha256 | `d09282b71850616147a3036979603099919018b1088a8f4c281a8b598d975871` | Gremlin stealer sample. |
| file_hash_sha256 | `54a96e95963f9bee19864a7a85818968953151b72e128104860b865672f10b0e` | Gremlin stealer sample. |
| url | `http://api.ipify.org/?format=json` | Used by malware to get victim's public IP. |
| url | `https://api.telegram.org` | Used for C2 communication in some variants. |

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns, which could indicate Gremlin stealer activity:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| network_traffic_pattern | `194.87.92.109` | Outbound HTTP POST requests to the known C2 IP. | Firewall, proxy, or NetFlow logs. | high |
| process_name | `*.exe` | Unsigned executables running from temporary user directories (`%APPDATA%`, `%TEMP%`). | EDR logs, Windows Event ID 4688. | medium |
| command_line_pattern | `powershell.exe -c "(New-Object System.Net.WebClient).DownloadFile(...)"` | PowerShell commands used to download secondary payloads. | EDR, PowerShell script block logging (Event ID 4104). | medium |
| api_endpoint | `/` | HTTP POST requests containing a ZIP file to an IP-based URL. | Web proxy logs, Network Security Monitoring (NSM) tools. | high |
| event_id | `12` | Sysmon Event ID 12 (RegistryEvent) showing modifications to clipboard-related keys. | Sysmon logs. | low |
| file_name | `*.zip` | Creation of ZIP archives with an IP address as the filename. | File integrity monitoring, EDR logs. | medium |

---

## Detection & Response

Detecting this evolved Gremlin variant requires a layered defense focusing on behavior rather than static signatures.

1.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions to monitor for suspicious process behaviors. Create rules to detect processes that: 
    *   Access credential stores of major browsers (e.g., Chrome's `Login Data` file).
    *   Read memory from browser processes (`chrome.exe`, `msedge.exe`).
    *   Make network connections to raw IP addresses, especially those with no associated domain.
    *   Exhibit signs of runtime unpacking, such as writing and executing code in a new memory region.

2.  **Network Monitoring:** Actively monitor and filter egress network traffic. Block all outbound connections to the known IOC `194.87.92.109`. Use a web proxy to inspect traffic and alert on POST requests containing `.zip` files to suspicious or uncategorized domains/IPs. D3FEND's [`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is critical here.

3.  **File and Memory Analysis:** Utilize endpoint security tools capable of performing memory scanning to detect malware components that are decrypted at runtime. For static analysis, D3FEND's [`File Analysis (D3-FA)`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) can be used with tools that can inspect `.NET` resource sections and apply automated XOR bruteforcing to uncover hidden payloads.

4.  **Incident Response:** If an infection is suspected, immediately isolate the affected endpoints from the network to prevent further data exfiltration and lateral movement. Initiate a forensic investigation to determine the scope of the compromise, including what data was stolen. All credentials for accounts used on the compromised machine should be rotated.

---

## Mitigation

Organizations can take several proactive steps to defend against Gremlin stealer and similar threats.

1.  **Enforce Multi-Factor Authentication (MFA):** The most effective defense against credential theft is strong MFA. This ensures that even if credentials are stolen, attackers cannot easily access accounts. This aligns with MITRE Mitigation [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).

2.  **User Education:** Train users to recognize and avoid phishing emails, malicious attachments, and suspicious downloads, which are the primary initial access vectors for stealers. This maps to [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

3.  **Software Patching:** Keep all software, especially web browsers and operating systems, up to date to protect against exploits that could be used for initial access. This aligns with [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).

4.  **Application Whitelisting:** Implement application control policies to restrict the execution of unauthorized or unsigned applications, particularly from user-writable locations like `%APPDATA%`. This is a form of [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).

5.  **Network Egress Filtering:** Restrict outbound network connections to only what is necessary for business operations. Deny all outbound traffic by default and only allow connections to approved services and domains. This corresponds to [`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/).

**Tags:** Gremlin Stealer, InfoStealer, Malware Analysis, Obfuscation, Cryptocurrency, Clipboard Hijacker, Session Hijacking, .NET Malware, Threat Research

## Sources
- [Gremlin Stealer's Evolved Tactics: Hiding in Plain Sight With Resource Files](https://unit42.paloaltonetworks.com/gremlin-stealer-evolution/) — Unit 42 (2026-05-15)

---
Source: https://cyber.netsecops.io/articles/gremlin-stealer-evolves-with-resource-file-obfuscation-tactics/
