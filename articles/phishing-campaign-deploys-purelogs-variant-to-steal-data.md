# PureLogs Malware Variant Delivered via Multi-Stage Phishing Attack

**Severity:** high | **Category:** Phishing,Malware,Data Breach | **Updated:** 2026-05-27 | **Reading time:** 5 min

Security researchers at FortiGuard Labs have uncovered a new phishing campaign distributing a variant of the PureLogs data-stealing malware. The attack begins with a deceptive email containing a malicious RAR archive. The attack chain involves obfuscated JavaScript, PowerShell, and the process hollowing of a legitimate Windows process (MsBuild.exe) to inject and execute the malware. This multi-stage approach is designed to evade detection and steal a wide range of sensitive information from compromised Microsoft Windows systems.

## Executive Summary
A sophisticated phishing campaign is actively distributing a variant of the **PureLogs** data-stealing malware. The attack, analyzed by **[FortiGuard Labs](https://www.fortinet.com/fortiguard/labs)**, employs a multi-stage infection process to bypass security controls and achieve execution on target systems. The campaign starts with a classic social engineering lure—a fake purchase order email—and escalates through a chain of obfuscated scripts and advanced evasion techniques, including process hollowing. The ultimate goal of the campaign is to collect and exfiltrate sensitive data from victims using the modular capabilities of the PureLogs malware.

---

## Threat Overview
The campaign targets **[Microsoft](https://www.microsoft.com/security)** Windows users through phishing emails. These emails are crafted to appear as legitimate business communications, such as a purchase order, to entice the user to open a malicious attachment. The attachment is a RAR archive containing a malicious JavaScript file. The use of multiple stages and legitimate system tools like **[PowerShell](https://attack.mitre.org/techniques/T1059/001/)** and `MsBuild.exe` is a deliberate tactic to make the attack look like normal system activity and to evade signature-based detection tools. The modular nature of the final payload allows the attackers to dynamically extend its functionality post-compromise.

---

## Technical Analysis
The attack chain is a well-orchestrated sequence of events designed for stealth and effectiveness:

1.  **Initial Delivery:** The victim receives a phishing email with a RAR archive attachment (e.g., `PO 2026-P0803.rar`). This is a form of [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/).
2.  **JavaScript Execution:** Inside the archive is a malicious JavaScript file. When the user executes this file, it runs an obfuscated script ([`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/)).
3.  **PowerShell Invocation:** The JavaScript decrypts and executes a PowerShell script. This script acts as the second-stage loader ([`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)).
4.  **Process Hollowing:** The PowerShell script uses a technique known as process hollowing ([`T1055.012 - Process Hollowing`](https://attack.mitre.org/techniques/T1055/012/)). It starts a legitimate, trusted Windows process, `MsBuild.exe`, in a suspended state. It then carves out the memory of this legitimate process and injects a malicious .NET downloader module into it.
5.  **Payload Fetching:** The injected downloader, now running under the guise of `MsBuild.exe`, communicates with a remote command-and-control (C2) server.
6.  **Modular Execution:** The C2 server delivers additional plugins and the main PureLogs data-stealing payload, which are then executed by the compromised `MsBuild.exe` process. This modularity allows for flexible post-exploitation activities, including keylogging, credential theft, and file exfiltration.

---

## Impact Assessment
The PureLogs malware is designed for data theft, posing a significant risk to both individuals and organizations. A successful infection could lead to:
*   **Credential Compromise:** Theft of usernames, passwords, and session tokens for web browsers, email clients, and other applications.
*   **Financial Data Theft:** Exfiltration of credit card numbers, banking information, and cryptocurrency wallet data.
*   **Data Breach:** Loss of sensitive corporate or personal files.
*   **Further Compromise:** The stolen credentials can be used to facilitate lateral movement, further network intrusion, or be sold on dark web marketplaces.

---

## IOCs — Directly from Articles
The source articles mentioned the filename pattern `PO 2026-P0803.rar` as an example, but did not provide specific, actionable IOCs.

---

## Cyber Observables — Hunting Hints
Security teams can hunt for this activity by looking for the following patterns:

| Type | Value | Description |
| :--- | :--- | :--- |
| Process Anomaly | `wscript.exe` or `cscript.exe` spawning `powershell.exe` | The initial JavaScript execution often leads to PowerShell being launched. This parent-child relationship can be a strong indicator. |
| Process Anomaly | `powershell.exe` spawning `MsBuild.exe` | The PowerShell script launching the target for process hollowing is another suspicious event. |
| Network Traffic | `MsBuild.exe` making outbound network connections | `MsBuild.exe` is a build tool and should not typically make direct connections to the internet, especially to unknown IPs. This is a high-confidence indicator of compromise. |
| File Creation | `.rar` files in email attachments | While common, this can be correlated with other heuristics as part of an initial filter for malicious emails. |

---

## Detection & Response
*   **Email Security:** Use advanced email security gateways (like the mentioned FortiMail) to block emails with malicious attachments. Configure policies to scan inside archives like RAR and ZIP.
*   **Script Execution Policies:** Restrict the execution of JavaScript and PowerShell scripts. Use PowerShell Constrained Language Mode and enable script block logging.
*   **EDR and Behavioral Monitoring:** Deploy an EDR solution that can detect process hollowing by monitoring for suspicious API calls like `CreateProcess`, `WriteProcessMemory`, and `ResumeThread` being used in an unusual sequence. Alert on legitimate system utilities like `MsBuild.exe` making external network connections.
*   **D3FEND:** Utilize [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) to detect the abnormal behavior of `MsBuild.exe` and the process hollowing technique.

---

## Mitigation
*   **User Training:** Educate users to be suspicious of unsolicited emails, especially those with attachments that require them to extract files. Reinforce that purchase orders and other business documents are typically sent as PDFs, not scripts in RAR files.
*   **Attachment Blocking:** Configure email servers to block or quarantine potentially dangerous file types, including `.js`, `.vbs`, and executables within archives.
*   **Attack Surface Reduction (ASR):** Enable ASR rules on Windows endpoints, such as "Block JavaScript or VBScript from launching downloaded executable content" and "Block process creations originating from PSExec and WMI commands."
*   **D3FEND:** Implement [`D3-EAL - Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting) to prevent the initial JavaScript file from being executed by the script host.

**Tags:** purelogs, phishing, malware, infostealer, process hollowing, powershell, fortiguard

## Sources
- [Phishing Campaign Deploys JavaScript-Driven PureLogs Variant to Steal Sensitive Data | FortiGuard Labs](https://www.fortinet.com/fortiguard/labs/phishing-campaign-deploys-javascript-driven-purelogs-variant-to-steal-sensitive-data) — FortiGuard Labs (2026-05-26)
- [Major Cyber Attacks in May 2026: Fake Invitations, Agent Tesla, BlobPhish, and More](https://www.any.run/cybersecurity-blog/major-cyber-attacks-in-may-2026/) — ANY.RUN (2026-05-26)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-deploys-purelogs-variant-to-steal-data/
