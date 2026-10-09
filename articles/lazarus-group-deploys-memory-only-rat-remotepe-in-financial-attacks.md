# Lazarus Group Unleashes 'RemotePE' Memory-Only RAT in Attacks on Financial and Crypto Firms

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-05-27

The North Korean state-sponsored threat actor, Lazarus Group, is deploying a sophisticated new memory-only Remote Access Trojan (RAT) named 'RemotePE'. Delivered via a multi-stage infection chain that begins with social engineering, the malware targets financial and cryptocurrency firms, executing entirely in memory to evade filesystem-based security tools and analysis.

## Executive Summary
Researchers have identified a new, sophisticated malware campaign attributed to the **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, a threat actor linked to North Korea. The campaign utilizes a previously unseen, cross-platform Remote Access Trojan (RAT) called **RemotePE**. This malware is designed for stealth, operating entirely in memory to evade detection by traditional, file-based antivirus solutions. The attacks target organizations in the financial and cryptocurrency sectors, leveraging a multi-stage infection process that begins with social engineering. The final **RemotePE** payload provides the attackers with full control over the compromised system, including capabilities for file manipulation, process management, and secure data deletion.

---

## Threat Overview
The attack begins with social engineering, where **Lazarus Group** operatives engage with targets on platforms like Telegram, posing as recruiters or business partners. They lure victims into scheduling meetings on fraudulent domains, which ultimately leads to the compromise of an employee's device. This initial access is used to deliver the first stage of the malware, a loader named `DPAPILoader`.

`DPAPILoader`'s sole purpose is to decrypt and execute the second-stage loader, `RemotePELoader`, from the disk. It uses the legitimate Windows Data Protection API (DPAPI) for decryption, a technique that helps it blend in with normal system activity. `RemotePELoader` then communicates with a command-and-control (C2) server (e.g., `aes-secure[.]net`) to fetch the final payload, the **RemotePE** RAT. Crucially, this payload is loaded directly into the process's memory and is never written to the disk, making it a fileless threat.

---

## Technical Analysis
The infection chain is meticulously crafted to evade detection at each step:

1.  **Initial Access**: The campaign uses [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/), with social engineering on messaging platforms directing victims to malicious sites.

2.  **Defense Evasion & Execution**: The `DPAPILoader` uses the Windows DPAPI to decrypt the next stage. This is a known technique for defense evasion and credential access, tracked as [`T1555.001 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/001/), as DPAPI is used to protect secrets. The most critical evasion technique is loading the final payload directly into memory, a form of [`T1620 - Reflective Code Loading`](https://attack.mitre.org/techniques/T1620/). This fileless approach bypasses security products that rely on scanning files on disk.

3.  **Command and Control**: `RemotePELoader` establishes a C2 channel using [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) to download the **RemotePE** module.

4.  **Impact**: The **RemotePE** RAT is a full-featured C++ trojan. It allows for file operations, process execution, and configuration changes. A notable feature is its secure file deletion command, which overwrites files with constant bytes seven times before deletion. This anti-forensics technique, a form of [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/), has also been observed in other **Lazarus Group** tools like `PondRAT` and `POOLRAT`, strengthening the attribution.

---

## Impact Assessment
The use of a memory-only RAT poses a significant threat to the targeted financial and cryptocurrency firms. The malware's stealthy nature allows it to persist undetected for longer periods, giving attackers ample time to conduct reconnaissance, steal credentials, and exfiltrate sensitive financial data or digital assets. The cross-platform nature of the malware suggests that it could be deployed against a variety of operating systems, broadening its potential impact. The established link to **Lazarus Group** indicates that the motive is likely financial theft to fund the North Korean regime.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| `domain` | `aes-secure[.]net` | Command-and-control (C2) server used by RemotePELoader. |

---

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns to detect **RemotePE** activity:

| Type | Value | Description |
|---|---|---|
| `process_name` | Anomalous processes making network connections, especially those spawned by office applications or browsers. | Look for processes that have no on-disk executable file (fileless). |
| `api_endpoint` | `CryptUnprotectData` | Monitoring calls to this Windows API function could indicate the `DPAPILoader` is attempting to decrypt its next stage. |
| `network_traffic_pattern` | Outbound connections to `aes-secure[.]net` or other newly registered/suspicious domains. | Egress traffic filtering and analysis is key to spotting C2 communications. |
| `memory_pattern` | Strings related to file management, process creation, or configuration settings within a process's memory that has no corresponding file. | Memory forensics or live memory scanning with YARA rules can uncover the in-memory RAT. |

---

## Detection & Response
1.  **Memory Analysis**: Since **RemotePE** is fileless, detection hinges on memory analysis. EDR solutions with capabilities for scanning process memory and identifying reflective loading are essential. D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is the primary defensive technique.

2.  **Behavioral Monitoring**: Monitor for chains of suspicious behavior, such as a user on Telegram downloading a file, which then spawns a loader that makes a network connection. EDR tools can correlate these events to detect the infection chain.

3.  **Network Traffic Analysis**: Decrypt and inspect outbound network traffic. Look for connections to known malicious domains like `aes-secure[.]net` or other suspicious indicators. This is an application of [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

---

## Mitigation
1.  **User Training**: Train employees to be skeptical of unsolicited contact on social media and messaging platforms, especially those involving job offers or business proposals that lead to downloading files. This directly counters the initial access vector and maps to [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

2.  **Endpoint Hardening**: Implement Attack Surface Reduction (ASR) rules to block or audit suspicious behaviors, such as office applications creating executable content or script-based attacks.

3.  **Advanced Endpoint Protection**: Deploy an EDR solution that provides visibility into memory and process behavior, not just file-based threats. This is critical for detecting fileless malware like **RemotePE**. This aligns with [`M1049 - Antivirus/Antimalware`](https://attack.mitre.org/mitigations/M1049/) and [`M1040 - Behavior Prevention on Endpoint`](https://attack.mitre.org/mitigations/M1040/).

**Tags:** Cryptocurrency, Fileless Malware, Finance, Lazarus Group, Memory-only RAT, North Korea, RemotePE

## Sources
- [Lazarus Deploys RemotePE Memory-Only RAT Against Financial and Crypto Firms](https://thehackernews.com/2026/05/lazarus-deploys-remotepe-memory-only.html) (2026-05-25)
- [DragonForce Strikes at HELIX INTERNATIONAL](https://www.dexpose.io/blog/dragonforce-strikes-at-helix-international) (2026-05-25)

---
Source: https://cyber.netsecops.io/articles/lazarus-group-deploys-memory-only-rat-remotepe-in-financial-attacks/
