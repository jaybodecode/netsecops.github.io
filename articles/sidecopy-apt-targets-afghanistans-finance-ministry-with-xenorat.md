# SideCopy APT Targets Afghanistan's Finance Ministry in 'XENOFISCAL' Espionage Campaign

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-06-02 | **Reading time:** 6 min

The Pakistan-aligned threat group SideCopy, part of the Transparent Tribe (APT36) umbrella, is conducting a targeted cyber-espionage campaign dubbed 'Operation XENOFISCAL' against Afghanistan's Ministry of Finance. The campaign uses spear-phishing emails with Pashto-language lures to trick government officials into executing a malicious LNK file. This initiates a multi-stage infection chain that ultimately deploys the open-source XenoRAT trojan. The malware establishes persistence and provides the attackers with full remote access for data theft and surveillance, highlighting the group's continued focus on government and military targets in South Asia.

## Executive Summary
The Pakistan-linked Advanced Persistent Threat (APT) group **[SideCopy](https://attack.mitre.org/groups/G1008/)**, a subgroup of **Transparent Tribe (APT36)**, has been identified as the actor behind a new cyber-espionage campaign named **Operation XENOFISCAL**. This highly targeted operation is aimed at the Afghanistan Ministry of Finance, specifically its provincial directorates and Pashto-speaking officials. The attack employs a classic spear-phishing vector, using a ZIP archive containing a malicious LNK file disguised with a Pashto filename. The infection chain is designed to be evasive, leveraging legitimate Windows processes and a compromised Afghan educational domain to download and execute the final payload: the open-source **XenoRAT** remote access trojan. The campaign's goal is espionage, enabling the attackers to conduct surveillance and exfiltrate sensitive government data.

---

## Threat Overview
**Operation XENOFISCAL** demonstrates SideCopy's deep understanding of its target environment. The campaign is not a wide-net phishing attack but a carefully crafted operation focused on specific individuals within the Afghan government.

*   **Targeting**: The attack specifically targets all 34 provincial revenue and finance directorates (Mustoufiats) of Afghanistan's Ministry of Finance.
*   **Social Engineering**: The lure is highly tailored, using the Pashto language and a document listing real provincial finance directors invited to a seminar. This suggests significant pre-operational intelligence gathering.
*   **Initial Access**: The attack begins with a spear-phishing email containing a ZIP file. Inside is a malicious Windows Shortcut (LNK) file.
*   **Payload Delivery**: When the victim clicks the LNK file, it executes `mshta.exe` to fetch and run a remote HTML Application (HTA) file from a compromised Afghan education domain (`abimj.edu.af`).
*   **Final Payload**: The HTA file initiates a multi-stage, in-memory infection process that culminates in the deployment of **XenoRAT** version 1.8.7, a powerful open-source RAT.

This campaign is consistent with SideCopy's known TTPs, which involve using lures relevant to South Asian politics and military affairs and customizing open-source malware for their operations.

---

## Technical Analysis
The infection chain is designed for stealth and persistence:

1.  **Spear-phishing ([`T1566.001`](https://attack.mitre.org/techniques/T1566/001/))**: The user receives a ZIP file via email.
2.  **Malicious LNK File ([`T1204.002`](https://attack.mitre.org/techniques/T1204/002/))**: The user opens the LNK file within the ZIP.
3.  **HTA Execution via `mshta.exe` ([`T1218.005`](https://attack.mitre.org/techniques/T1218/005/))**: The LNK file's command line executes `mshta.exe` to download and run an HTA file from a remote, compromised server.
4.  **In-Memory Loader**: The HTA file contains obfuscated JavaScript that downloads and executes a .NET-based loader DLL in memory.
5.  **RAT Deployment**: The loader DLL decrypts and deploys the final payload, **XenoRAT**, into memory.
6.  **Persistence ([`T1547.001`](https://attack.mitre.org/techniques/T1547/001/))**: The malware creates a registry run key, often mimicking a legitimate application like Microsoft Edge, to ensure it runs every time the system starts.
7.  **Decoy Document**: To avoid suspicion, a benign decoy document (the seminar invitation list) is opened for the victim.
8.  **C2 Communication ([`T1071.001`](https://attack.mitre.org/techniques/T1071/001/))**: XenoRAT connects to its command-and-control server (e.g., `185.235.137.106`) over TCP to receive commands and exfiltrate data.

**XenoRAT Capabilities**: Once active, XenoRAT provides the attacker with extensive control over the victim's machine, including keylogging, screen capture, file system access, webcam and microphone activation, and the ability to drop additional malware.

---

## Impact Assessment
The successful compromise of systems within Afghanistan's Ministry of Finance could have significant geopolitical and security implications. The impact includes:
*   **Espionage**: Theft of sensitive government financial data, strategic plans, and internal communications.
*   **Intelligence Gathering**: Gaining insight into the financial stability and operations of the Afghan government.
*   **Surveillance**: Monitoring the activities and communications of key government officials.
*   **Further Intrusion**: Using the compromised ministry as a beachhead to launch further attacks against other Afghan government entities.

The campaign highlights the persistent cyber-threats faced by government institutions in geopolitically sensitive regions.

---

## IOCs — Directly from Articles

| Type | Value | Description |
| :--- | :--- | :--- |
| domain | `abimj.edu.af` | Compromised domain used to host the malicious HTA file. |
| ip_address_v4 | `185.235.137.106` | Command and Control (C2) server for XenoRAT. |

---

## Cyber Observables — Hunting Hints
Security teams can hunt for this activity using the following clues:

| Type | Value | Description & Context |
| :--- | :--- | :--- |
| command_line_pattern | `mshta.exe http://*` or `mshta.exe https://*` | Look for `mshta.exe` making network connections to download remote HTA or JS files, a common TTP for this and other threat actors. |
| file_name | `*.lnk` in `*.zip` | Monitor email gateway logs for ZIP attachments containing LNK files, especially if the LNK filename uses non-standard character sets. |
| registry_key | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Monitor this registry key for the creation of new persistence entries, especially those with suspicious executable paths or names mimicking legitimate software. |
| network_traffic_pattern | Outbound TCP connections to `185.235.137.106` | Block and alert on any traffic to known SideCopy C2 infrastructure. |

---

## Detection & Response
1.  **Email Security**: Use email security gateways to block or quarantine emails with ZIP attachments containing LNK files. Scan attachments for known malicious indicators.
2.  **Endpoint Detection (EDR)**: Monitor for suspicious process chains, such as `outlook.exe` -> `explorer.exe` -> `mshta.exe`. EDR rules can be created to alert on `mshta.exe` spawning from an Office application or a LNK file execution and making a network connection. This is an application of **[Process Lineage Analysis](https://d3fend.mitre.org/technique/d3f:ProcessLineageAnalysis)**.
3.  **Network Filtering**: Block known malicious domains and IPs at the firewall or web proxy. Use **[DNS Denylisting (D3-DNSDL)](https://d3fend.mitre.org/technique/d3f:DNSDenylisting)** for domains like `abimj.edu.af`.
4.  **Scripting Protection**: Use tools like Windows Defender Attack Surface Reduction (ASR) rules to block or audit the execution of obfuscated scripts and HTA files.

---

## Mitigation
1.  **User Training ([`M1017`](https://attack.mitre.org/mitigations/M1017/))**: Train users to be suspicious of unsolicited emails, especially those with attachments. Teach them to recognize the dangers of LNK files and other script-based attachments.
2.  **Attack Surface Reduction**: Implement ASR rules to block `mshta.exe` from executing potentially malicious code. For example, the rule "Block all Office applications from creating child processes" can be highly effective.
3.  **Application Control**: Use application allow-listing (e.g., AppLocker) to prevent the execution of unauthorized scripts and executables like `mshta.exe` in user directories.
4.  **Change File Associations**: As a hardening measure, consider changing the default file handler for `.hta` and `.js` files from `mshta.exe`/`wscript.exe` to a benign application like `notepad.exe`. This prevents accidental execution by the user.

**Tags:** SideCopy, APT36, Transparent Tribe, XenoRAT, APT, Espionage, Afghanistan, Pakistan, Phishing

## Sources
- [Pakistan-Linked SideCopy Targets Afghanistan Finance Ministry with Xeno RAT](https://thehackernews.com/2026/06/pakistan-linked-sidecopy-targets.html) — The Hacker News (2026-06-02)
- [SideCopy Hackers Deploy Persistent XenoRAT Malware to Target Afghanistan Finance Ministry](https://cybersecuritynews.com/sidecopy-hackers-deploy-persistent-xenorat-malware/) — Cybersecurity News (2026-06-01)
- [SideCopy Deploys Persistent XenoRAT Against Afghanistan Finance Ministry](https://gbhackers.com/sidecopy-deploys-persistent-xenorat/) — GBHackers on Security (2026-05-30)

---
Source: https://cyber.netsecops.io/articles/sidecopy-apt-targets-afghanistans-finance-ministry-with-xenorat/
