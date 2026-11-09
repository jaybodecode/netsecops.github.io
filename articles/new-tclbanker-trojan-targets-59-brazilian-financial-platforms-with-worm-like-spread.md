# New TCLBANKER Trojan Spreads via WhatsApp and Outlook, Targeting 59 Brazilian Financial Apps

**Severity:** high | **Category:** Malware,Threat Actor,Phishing | **Updated:** 2026-06-07 | **Reading time:** 7 min

A new, highly advanced Brazilian banking trojan named TCLBANKER is targeting 59 different banking, fintech, and cryptocurrency platforms. The malware, an evolution of the 'Maverick' family linked to the threat actor 'Water Saci,' uses a worm component to spread via victims' WhatsApp and Outlook contacts. The attack chain begins with a malicious MSI installer that abuses a legitimate Logitech program via DLL side-loading. TCLBANKER employs robust anti-analysis features, including a watchdog subsystem to evade security tools, and will only execute its final payload on systems configured for Brazilian Portuguese.

## Executive Summary

Security researchers have identified a new and highly sophisticated Brazilian banking trojan named **TCLBANKER**. Tracked as REF3076 by Elastic Security Labs, the malware is an evolution of the 'Maverick' malware family, previously associated with the threat actor **[Water Saci](https://attack.mitre.org/groups/G1006/)**. TCLBANKER targets an extensive list of 59 financial, fintech, and cryptocurrency platforms primarily in Brazil. Its attack chain is notable for its use of **[DLL side-loading](https://attack.mitre.org/techniques/T1574/002/)** against a legitimate Logitech application, robust anti-analysis and anti-VM capabilities, and a worm-like propagation mechanism that hijacks a victim's WhatsApp and Microsoft Outlook applications to spread to new targets. The malware's final payload only activates on systems set to Brazilian Portuguese, indicating a highly targeted campaign.

---

## Threat Overview

TCLBANKER represents a significant threat to the Brazilian financial sector due to its sophistication and propagation method. The attack begins with a user downloading a ZIP file containing a malicious MSI installer. This installer bundles a legitimate, signed program, 'Logi AI Prompt Builder,' which is vulnerable to DLL side-loading.

The malware's propagation is particularly effective. It leverages a worm component, an evolution of the SORVEPOTEL worm, to spread through trusted communication channels. By hijacking active WhatsApp Web sessions and the Outlook desktop client, it sends phishing messages with the malicious installer to the victim's entire contact list—potentially up to 3,000 contacts. This method bypasses traditional security gateways and leverages social trust, dramatically increasing the likelihood of successful infection.

---

## Technical Analysis

The TCLBANKER attack chain is multi-staged and complex:

1.  **Initial Access**: The victim is lured into downloading and executing a malicious MSI installer from a ZIP file ([`T1566.001`](https://attack.mitre.org/techniques/T1566/001/)).
2.  **Defense Evasion (DLL Side-Loading)**: The MSI installer drops a legitimate, signed executable from Logitech (`Logi AI Prompt Builder.exe`) and a malicious DLL. When the executable is run, it loads the malicious DLL instead of the legitimate one ([`T1574.002`](https://attack.mitre.org/techniques/T1574/002/)).
3.  **Anti-Analysis**: The malicious loader is packed with extensive anti-analysis features. It includes a "watchdog subsystem" that continuously scans for debuggers, sandboxes, analysis tools, and antivirus software. It actively removes security software hooks from system libraries and disables Windows telemetry to avoid detection ([`T1497`](https://attack.mitre.org/techniques/T1497/), [`T1622`](https://attack.mitre.org/techniques/T1622/)).
4.  **Targeted Execution**: The malware performs several checks before deploying its final payload. It verifies it is being loaded by the correct process and confirms the system's default language is Brazilian Portuguese (`LANG_PORTUGUESE_BRAZILIAN`) ([`T1497.003`](https://attack.mitre.org/techniques/T1497/003/)).
5.  **Payload Deployment**: If all checks pass, two main components are deployed: the core banking trojan and the worm.
6.  **Lateral Movement (Worm)**: The worm component hijacks the victim's active WhatsApp Web session and Microsoft Outlook application. It iterates through the contact list and sends phishing messages containing the trojanized installer, facilitating its spread ([`T1598.003`](https://attack.mitre.org/techniques/T1598/003/)).
7.  **Credential Access**: The banking trojan component is designed to steal credentials and manipulate sessions for the 59 targeted financial applications.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Technique Name | Description |
|---|---|---|---|
| Initial Access | `T1566.001` | Phishing: Spearphishing Attachment | The attack begins with a malicious MSI installer delivered in a ZIP file. |
| Execution | `T1204.002` | User Execution: Malicious File | The user must be tricked into running the malicious installer. |
| Persistence / Privilege Escalation | `T1574.002` | Hijack Execution Flow: DLL Side-Loading | The malware abuses a legitimate Logitech executable to load its malicious DLL. |
| Defense Evasion | `T1497` | Virtualization/Sandbox Evasion | The loader includes a watchdog subsystem to detect and evade analysis environments. |
| Defense Evasion | `T1622` | Debugger Evasion | The malware actively scans for and avoids debuggers. |
| Defense Evasion | `T1497.003` | System Checks | The payload only executes if the system language is Brazilian Portuguese. |
| Lateral Movement | `T1598.003` | Phishing for Information: Spearphishing via Service | The worm component uses the victim's WhatsApp and Outlook to send phishing messages to contacts. |

---

## Impact Assessment

The potential impact of TCLBANKER on individuals and financial institutions in Brazil is substantial. For individuals, a successful infection can lead to direct financial loss through fraudulent transactions, theft of banking credentials, and compromise of cryptocurrency wallets. The worm's propagation method also carries a significant reputational risk for the victim, as their accounts are used to attack their own contacts.

For the 59 targeted financial institutions, this malware represents a major threat to their customers and their platform's integrity. The widespread nature of the attack could lead to a surge in fraud cases, increased operational costs for customer support and reimbursement, and a loss of customer trust in their digital banking platforms. The malware's ability to spam up to 3,000 contacts per infection means it can spread exponentially, quickly reaching a large portion of the user base.

---

## IOCs — Directly from Articles

No specific file hashes, IP addresses, or domains were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect TCLBANKER activity:

| Type | Value | Description | Context |
|---|---|---|---|
| `process_name` | `Logi AI Prompt Builder.exe` | Look for this process running in environments where it is not expected, or for instances that load unsigned or suspicious DLLs. | EDR, Process Auditing |
| `command_line_pattern` | `msiexec.exe` | Monitor for MSI installers being run from unusual locations (e.g., `Downloads` folder) that drop Logitech-related executables. | EDR, Windows Event ID 4688 |
| `network_traffic_pattern` | `web.whatsapp.com` | Correlate process activity from Outlook or other desktop apps with network traffic to WhatsApp Web, which could indicate session hijacking. | EDR, Network Flow, Proxy Logs |
| `log_source` | `Microsoft Outlook` | Audit for automated or scripted sending of messages from the Outlook client, especially if they contain ZIP files or links. | Application Logs, EDR Script Block Logging |

---

## Detection & Response

**Detection:**
1.  **Endpoint Detection and Response (EDR)**: Deploy EDR solutions capable of detecting DLL side-loading. Create rules to alert on legitimate, signed processes (like `Logi AI Prompt Builder.exe`) loading unsigned or untrusted DLLs from the same directory.
2.  **Behavioral Analysis**: Monitor for processes that attempt to read WhatsApp or Outlook data files and simultaneously make network connections. This behavior is highly indicative of session hijacking.
3.  **Script Logging**: Enable enhanced PowerShell and script block logging. The worm component may use scripting to automate interactions with Outlook and WhatsApp, which would be visible in these logs.
4.  **Language Check**: While specific to this malware, an EDR rule that flags any process checking the system language and then performing sensitive actions could be a useful heuristic for targeted threats.

**Response:**
1.  **Isolate**: Disconnect the infected machine from the network immediately to stop the worm from spreading.
2.  **Terminate Sessions**: Log out of all active web sessions, especially WhatsApp Web, and revoke any linked devices.
3.  **Change Passwords**: Change passwords for all financial applications, email, and other sensitive accounts accessed from the compromised machine.
4.  **Forensic Analysis**: Analyze the machine to identify the initial infection vector and ensure all components of the malware are removed.

---

## Mitigation

**Strategic Mitigation:**
*   **[Execution Prevention (M1038)](https://attack.mitre.org/mitigations/M1038/)**: Use application control solutions to prevent the execution of unauthorized applications and installers. This can block the initial MSI file from running.
*   **[Attack Surface Reduction Rules](https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/attack-surface-reduction)**: Enable ASR rules, such as "Block executable files from running unless they meet a prevalence, age, or trusted list criterion" and "Block Office applications from creating child processes."
*   **[User Training (M1017)](https://attack.mitre.org/mitigations/M1017/)**: Train users to be suspicious of unsolicited ZIP files and messages, even if they appear to come from a trusted contact.

**Tactical Mitigation:**
1.  **File Extension Visibility**: Ensure Windows is configured to show file extensions, so users can distinguish an executable from a document.
2.  **Limit Local Admin Rights**: Prevent users from installing software. This would stop the malicious MSI installer from running with the necessary privileges.
3.  **Regularly Review Linked Devices**: Periodically check the "Linked Devices" section in WhatsApp to ensure no unauthorized sessions are active.

**Tags:** TCLBANKER, banking trojan, Brazil, Water Saci, DLL side-loading, WhatsApp, Outlook, malware

## Sources
- [TCLBANKER Banking Trojan Targets Financial Platforms via WhatsApp and Outlook Worms](https://thehackernews.com/2026/05/tclbanker-banking-trojan-targets.html) — The Hacker News
- [Cyber Threat Intelligence Report: Top 4 Malware Targeting Finance](https://www.bitsight.com/blog/top-4-targeting-financial-sector) — Bitsight

---
Source: https://cyber.netsecops.io/articles/new-tclbanker-trojan-targets-59-brazilian-financial-platforms-with-worm-like-spread/
