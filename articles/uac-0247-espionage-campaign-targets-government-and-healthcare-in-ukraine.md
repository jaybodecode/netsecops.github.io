# UAC-0247 Espionage Campaign Targets Ukrainian Government and Healthcare with Data-Stealing Malware

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2026-04-18 | **Reading time:** 6 min

The Computer Emergency Response Team of Ukraine (CERT-UA) is warning of an ongoing cyber-espionage campaign by the threat actor UAC-0247. Active since March 2026, the campaign targets Ukrainian government bodies and healthcare facilities with phishing emails. The attack uses a multi-stage infection chain involving LNK and HTA files to deploy a data-stealing payload that injects into legitimate processes like RuntimeBroker.exe. The malware, similar to the RAVENSHELL backdoor, is designed to exfiltrate data from web browsers and the WhatsApp desktop application.

## Executive Summary
The Computer Emergency Response Team of Ukraine (**[CERT-UA](https://cert.gov.ua/)**) has issued an alert (CERT-UA#9240) detailing a targeted cyber-espionage campaign conducted by the threat actor group **UAC-0247**. Active from March to April 2026, the campaign has focused on Ukrainian government organizations and municipal healthcare facilities, including clinics and hospitals. The attackers use phishing lures, often themed around humanitarian aid, to trick victims into executing a malicious payload. The malware's primary objective is to steal sensitive data, specifically targeting information from Chromium-based web browsers and the **[WhatsApp](https://www.whatsapp.com/)** desktop application. The complex infection chain utilizes LNK and HTA files to ultimately inject a backdoor, similar to **RAVENSHELL**, into trusted system processes to evade detection.

## Threat Overview
**UAC-0247** is conducting a classic espionage operation with a focus on data exfiltration from specific, high-value targets within Ukraine. The choice of targets—government and healthcare—suggests a motive of gathering intelligence on government operations and the state of civilian services during a time of conflict.

The attack begins with a socially engineered phishing email. The email contains a link that, when clicked, downloads a ZIP archive. To enhance credibility, the attackers have been observed using AI-generated websites or exploiting XSS vulnerabilities on legitimate sites to host their malicious files. Inside the ZIP archive is a Windows Shortcut file (`.LNK`). This reliance on user execution of a file from an archive is a common and effective TTP.

## Technical Analysis
The infection process is multi-staged, designed to bypass security controls and obfuscate the final payload.

1.  **Phishing ([`T1566.002`](https://attack.mitre.org/techniques/T1566/002/) - Spearphishing Link):** The attack is initiated via a malicious link in a phishing email.
2.  **User Execution ([`T1204.002`](https://attack.mitre.org/techniques/T1204/002/) - Malicious File):** The victim is tricked into extracting a ZIP archive and clicking on a malicious `.LNK` shortcut file.
3.  **Command and Scripting Interpreter ([`T1059.001`](https://attack.mitre.org/techniques/T1059/001/) - PowerShell):** The LNK file executes a command, which in turn launches an HTA file. HTA files are often used to run scripts (like VBScript or JScript) that can download and execute further payloads.
4.  **Scheduled Task/Job ([`T1053.005`](https://attack.mitre.org/techniques/T1053/005/)):** The HTA script creates a scheduled task to launch the main executable payload, establishing persistence and running with system privileges.
5.  **Process Injection ([`T1055`](https://attack.mitre.org/techniques/T1055/)):** To evade detection by EDR and antivirus, the malware injects its malicious shellcode into a legitimate, trusted Windows process, `RuntimeBroker.exe`.
6.  **Data from Local System ([`T1005`](https://attack.mitre.org/techniques/T1005/)):** The injected payload, a reverse TCP shell similar to **RAVENSHELL**, then begins its primary task: stealing data. It specifically targets credential files, cookies, and history from Chromium-based browsers and data from the local WhatsApp desktop client.
7.  **Exfiltration Over C2 Channel ([`T1041`](https://attack.mitre.org/techniques/T1041/)):** The stolen data is exfiltrated back to an attacker-controlled command-and-control server.

> The use of process injection into `RuntimeBroker.exe` is a notable defense evasion technique. As `RuntimeBroker.exe` is a legitimate Windows process that manages app permissions, its network activity might be considered normal by less sophisticated security tools, allowing the malware to blend in.

## Impact Assessment
The impact of this campaign is primarily intelligence loss for the targeted Ukrainian entities. The theft of browser data can expose sensitive communications, usernames, passwords, and session cookies, allowing the attackers to access other government systems or personal accounts of employees. Stealing data from WhatsApp provides insight into real-time communications. This intelligence can be used for strategic advantage, to plan future attacks, or for disinformation purposes. For the healthcare facilities, the compromise of patient data or administrative systems could have serious consequences for their ability to provide care.

## IOCs
CERT-UA's advisory contains specific IOCs. While not listed in the summary articles, a full investigation would retrieve them from the official source.

## Cyber Observables for Detection
| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| file_name | `*.lnk` in `.zip` | The delivery mechanism involves tricking users into opening a LNK file from a ZIP archive. | Email security gateway logs, EDR file creation events. |
| process_name | `mshta.exe` | The HTA file is executed by `mshta.exe`. This process spawning from an email or browser is suspicious. | EDR process lineage analysis. |
| parent_process | `RuntimeBroker.exe` | Monitor for `RuntimeBroker.exe` making outbound network connections, which is atypical behavior. | EDR, firewall logs. |
| command_line_pattern | `schtasks.exe /create` | Monitor for the creation of scheduled tasks by suspicious scripts or processes. | EDR, Windows Event ID 4698. |

## Detection & Response
**Detection Strategies:**
*   **Attack Surface Reduction (ASR) Rules:** Enable Microsoft Defender ASR rules, specifically the rule that blocks script files like `.LNK` and `.HTA` from launching downloaded executable content.
*   **Process Lineage Analysis:** Use an EDR to monitor process chains. A chain like `Outlook.exe` -> `mshta.exe` -> `powershell.exe` -> `schtasks.exe` is highly indicative of this attack.
*   **D3FEND: [Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis):** Specifically focus on the behavior of `RuntimeBroker.exe`. This process should not be making persistent outbound network connections or spawning other processes. Alert on any such behavior.

**Response Actions:**
1.  Isolate the compromised host from the network.
2.  Investigate the user account for other signs of compromise.
3.  Block the C2 domains/IPs identified during analysis at the network perimeter.
4.  Reset passwords for the affected user and any services they accessed.

## Mitigation
**Strategic Controls:**
*   **User Training ([`M1017`](https://attack.mitre.org/mitigations/M1017/)):** Train users to be suspicious of unsolicited emails, especially those with attachments or links, and to never open files from untrusted ZIP archives.
*   **D3FEND: [Executable Denylisting (D3-EDL)](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting):** Block the execution of script interpreters for file types that are not required for business purposes. For most users, `mshta.exe` (for HTA files) can be blocked entirely.
*   **Email Security:** Implement an advanced email security gateway that can scan links and attachments, and sandbox potentially malicious files to detect threats before they reach the user's inbox.

**Tags:** Espionage, Ukraine, UAC-0247, CERT-UA, Phishing, Healthcare, Government

## Sources
- [From clinics to government: UAC-0247 expands cyber campaign across Ukraine](https://securityaffairs.com/161942/apt/uac-0247-expands-cyber-campaign-across-ukraine.html) — Security Affairs (2026-04-17)
- [(UAC-0247) Розповсюдження шкідливого програмного забезпечення з метою викрадення даних (CERT-UA#9240)](https://cert.gov.ua/article/6280370) — CERT-UA (2026-04-17)

---
Source: https://cyber.netsecops.io/articles/uac-0247-espionage-campaign-targets-government-and-healthcare-in-ukraine/
