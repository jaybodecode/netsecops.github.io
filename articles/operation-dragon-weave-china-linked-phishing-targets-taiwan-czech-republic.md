# 'Operation Dragon Weave': China-Linked Espionage Campaign Targets Taiwan and Czech Republic

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2026-06-03 | **Reading time:** 5 min

A suspected China-linked cyberespionage campaign, dubbed "Operation Dragon Weave," has been uncovered targeting government, technology, and financial entities in Taiwan and the Czech Republic. The campaign, detailed by security firm Seqrite, employed highly customized spearphishing emails with malicious ZIP attachments. The lures were tailored to each region, impersonating official documents to trick victims into executing a multi-stage infection process designed to steal data and establish remote access.

## Executive Summary
Cybersecurity firm Seqrite has identified a sophisticated cyberespionage campaign, which they have named “Operation Dragon Weave.” The campaign, attributed to a suspected **China-linked threat actor**, has targeted government, technology, finance, and academic organizations in **Taiwan** and the **Czech Republic**. The attacks leverage highly targeted **[spearphishing](https://en.wikipedia.org/wiki/Phishing#Spear_phishing)** emails containing malicious ZIP archives. The attackers demonstrated significant effort in social engineering, crafting lure documents that were localized and contextually relevant to their targets. The ultimate goal of the campaign appears to be data exfiltration and establishing long-term remote access for espionage purposes.

## Threat Overview
Operation Dragon Weave is a classic cyberespionage campaign focused on intelligence gathering. The timing of the attacks against Czech targets notably coincided with a high-profile diplomatic visit to Taiwan by a Czech official, suggesting a geopolitical motive.

The attack vector is spearphishing emails with malicious ZIP attachments. The threat actor's methodology shows a deep understanding of their targets:
*   **In Taiwan:** The lure document was disguised as a project application review notice, written in traditional Chinese.
*   **In the Czech Republic:** The lure impersonated an official social security appointment notice, using specific, legitimate-sounding names and details to enhance its credibility.

This level of customization significantly increases the likelihood of a victim opening the malicious file.

## Technical Analysis
The infection chain is multi-staged, designed to evade initial detection.
1.  **Initial Delivery - [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** The victim receives a targeted email with a malicious ZIP file.
2.  **User Execution - [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** The user extracts and opens a file from the ZIP archive (e.g., a LNK file or a document with macros).
3.  **Execution & Defense Evasion:** This action triggers a script (e.g., PowerShell) that runs in the background. It downloads the next stage of the malware from an attacker-controlled server.
4.  **Payload Deployment:** The downloaded payload is a remote access trojan (RAT) or an info-stealer. This malware establishes persistence on the machine and connects to a command-and-control (C2) server.
5.  **Actions on Objectives - [`T1056.001 - Keylogging`](https://attack.mitre.org/techniques/T1056/001/) & [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/):** Once active, the malware can log keystrokes, steal files, and exfiltrate the collected data back to the attackers.

## Impact Assessment
The primary impact of this campaign is espionage. For the targeted government, technology, and finance organizations, the compromise could lead to the theft of:
*   State secrets and sensitive diplomatic communications.
*   Proprietary technology, intellectual property, and trade secrets.
*   Sensitive financial data or economic plans.

A successful intrusion provides the threat actor with long-term access, allowing them to monitor activity, steal data over extended periods, and potentially use the compromised network as a launchpad for other attacks.

## IOCs — Directly from Articles
No specific IOCs (hashes, domains, IPs) were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of this campaign by looking for:
| Type | Value | Description |
|---|---|---|
| file_name | `*.zip` | Monitor for incoming ZIP files in emails, especially those with enticing or urgent filenames related to official business. |
| process_name | `powershell.exe` | Look for PowerShell processes being spawned by office applications (Word, Excel) or `explorer.exe` after a user opens a file. |
| command_line_pattern | `powershell -enc` or `powershell -w hidden` | Attackers often use encoded commands or hidden windows to obscure PowerShell activity. |
| network_traffic_pattern | Connections to new/uncategorized domains | An outbound connection from a user workstation to a newly registered or uncategorized domain shortly after an email attachment was opened is highly suspicious. |

## Detection & Response
1.  **Email Security Gateway:** Use an advanced email security solution that can scan attachments within ZIP files and perform dynamic analysis (sandboxing) to identify malicious behavior.
2.  **Endpoint Detection and Response (EDR):** Deploy EDR to monitor process chains. A rule that alerts when `winword.exe` spawns `powershell.exe` which then makes a network connection is a high-fidelity indicator of this type of attack. This is an application of D3FEND's **[Process Spawn Analysis](https://d3fend.mitre.org/technique/d3f:ProcessSpawnAnalysis)**.
3.  **User Training:** Train users to be suspicious of unsolicited attachments, even if they appear to be from a legitimate source. Emphasize verifying unexpected requests through a separate communication channel.

## Mitigation
*   **Attachment Blocking:** Configure email gateways to block or quarantine certain file types within ZIP archives, such as `.lnk`, `.js`, or macro-enabled office documents.
*   **Attack Surface Reduction (ASR):** Implement ASR rules to block Office applications from creating child processes or injecting code into other processes.
*   **PowerShell Logging and Hardening:** Enable enhanced PowerShell logging (Module, Script Block, and Transcription logs) to capture malicious activity. Use Constrained Language Mode where possible to limit the commands available to attackers.
*   **User Awareness:** The high degree of social engineering in this campaign makes user awareness a critical layer of defense. Users should be trained to spot the signs of a sophisticated spearphishing attack.

**Tags:** Cyber Espionage, Phishing, Spearphishing, Threat Actor, China, Taiwan

## Sources
- [Taiwan and Czech Republic targeted in phishing campaign](https://www.taiwannews.com.tw/news/6375749) — Taiwan News (2026-06-03)
- [1st June – Threat Intelligence Report](https://research.checkpoint.com/2026/1st-june-threat-intelligence-report/) — Check Point Research (2026-06-01)

---
Source: https://cyber.netsecops.io/articles/operation-dragon-weave-china-linked-phishing-targets-taiwan-czech-republic/
