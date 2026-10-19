# New Stealthy Python Backdoor 'DEEP#DOOR' Steals Credentials Using Legitimate Tunneling Service

**Severity:** high | **Category:** Malware,Threat Intelligence,Cyberattack | **Updated:** 2026-04-30 | **Reading time:** 5 min

Security researchers from Securonix have discovered a sophisticated, multi-stage Python backdoor named DEEP#DOOR. The malware operates as a full-featured Remote Access Trojan (RAT), beginning with an obfuscated batch script that embeds the Python payload. It disables Windows security controls, establishes persistence through multiple methods (Startup folder, Run keys, Scheduled Tasks, WMI), and uses the legitimate 'bore.pub' tunneling service for stealthy command-and-control and data exfiltration, focusing on browser and cloud credentials.

## Executive Summary

Researchers at **[Securonix](https://www.securonix.com/)** have detailed a new and stealthy Python-based backdoor framework they have named **DEEP#DOOR**. This malware is a full-featured Remote Access Trojan (RAT) designed to gain persistent access to Windows systems and exfiltrate sensitive data. The attack chain begins with an obfuscated batch script that contains the core Python implant, a technique that minimizes its network footprint. Upon execution, **DEEP#DOOR** disables Windows security features and establishes persistence using at least four different methods to ensure its survival. A key feature of the malware is its use of `bore.pub`, a legitimate tunneling service, for its command and control (C2) communications. This allows it to bypass network security controls and stealthily exfiltrate stolen browser and cloud credentials.

---

## Threat Overview

**DEEP#DOOR** is a sophisticated RAT that demonstrates a trend towards fileless and script-based malware that abuses legitimate system tools and services to evade detection. The initial access vector is believed to be phishing or a similar social engineering tactic to trick a user into running the initial dropper.

The malware's primary objectives are to:
1.  Establish a persistent foothold on the victim's machine.
2.  Disable security software.
3.  Steal credentials, particularly from web browsers and cloud service applications.
4.  Provide the attacker with remote access for further post-exploitation activities.

## Technical Analysis

The attack chain unfolds in several stages:

1.  **Initial Dropper (`install_obf.bat`):** The attack starts with an obfuscated batch script. This script contains the embedded and encoded Python payload, avoiding the need to download a second stage from the internet.
2.  **Defense Evasion:** The batch script first attempts to disable Windows security controls, likely including Windows Defender and other monitoring services.
3.  **Payload Extraction:** The script then decodes and writes the embedded Python implant (`svc.py`) to the disk and executes it.
4.  **Persistence ([`T1547.001`](https://attack.mitre.org/techniques/T1547/001/), [`T1543.003`](https://attack.mitre.org/techniques/T1543/003/)):** **DEEP#DOOR** is highly resilient, establishing persistence through multiple redundant methods simultaneously:
    - Creating scripts in the user's Startup folder.
    - Adding entries to the `Registry Run` keys.
    - Creating a `Scheduled Task`.
    - Using `Windows Management Instrumentation (WMI)` event subscriptions.
5.  **Command and Control ([`T1572`](https://attack.mitre.org/techniques/T1572/)):** The Python implant communicates with `bore.pub`, a legitimate, Rust-based tunneling service. It uses this service to create a reverse tunnel from the victim's machine to the attacker's C2 server. This makes the C2 traffic appear as legitimate outbound web traffic to a known service, helping it bypass firewalls and network monitoring tools.
6.  **Credential Theft ([`T1555`](https://attack.mitre.org/techniques/T1555/)):** Once active, the RAT can receive commands to execute various modules, including those designed to steal credentials from browsers, email clients, and cloud applications.

## Impact Assessment

A successful **DEEP#DOOR** infection can have severe consequences:
- **Complete System Compromise:** As a RAT, it gives the attacker full control over the infected machine, allowing them to install other malware (like ransomware), spy on the user, and use the machine as a pivot point for lateral movement.
- **Widespread Credential Theft:** The theft of saved browser and cloud credentials can lead to the compromise of numerous other online accounts, both personal and corporate.
- **Data Exfiltration:** The attacker can use their remote access to search for and exfiltrate any sensitive files or data on the compromised system or accessible network shares.
- **Difficult Detection:** The use of legitimate services (`bore.pub`), script-based execution (`Python`, `Batch`), and multiple persistence mechanisms makes the malware difficult to detect and fully eradicate.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| File Name | `install_obf.bat` | The initial obfuscated batch script dropper. |
| File Name | `svc.py` | The name of the core Python implant payload. |
| Domain | `bore.pub` | The legitimate tunneling service abused for C2 communications. |

## Detection & Response

1.  **Monitor for Tunneling Services:** Monitor network traffic for connections to known tunneling services like `bore.pub`, `ngrok.io`, or `localtunnel.me`. While these have legitimate uses, an unexpected connection from a user workstation or server is highly suspicious and should be investigated.
2.  **Script-Block Logging:** Enable PowerShell and other script-block logging and forward the logs to a SIEM. This can capture the content of malicious scripts like the initial batch file, even if they are obfuscated.
3.  **Persistence Mechanism Auditing ([D3-SFA](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis)):** Regularly audit the common persistence locations used by **DEEP#DOOR** (Startup folders, Run keys, Scheduled Tasks, WMI subscriptions) for any unauthorized or suspicious entries.

## Mitigation

1.  **Application Control ([D3-EAL](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)):** Use application control solutions like AppLocker to restrict the execution of batch scripts and unsigned Python scripts in user-writable directories. This can prevent the initial dropper from running.
2.  **Endpoint Protection:** Deploy a modern EDR solution capable of detecting and blocking suspicious script execution and fileless malware techniques.
3.  **Egress Traffic Filtering ([D3-OTF](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)):** If your organization does not have a business need for tunneling services, explicitly block the domains of services like `bore.pub` at your web proxy or firewall.
4.  **User Training:** Educate users about the dangers of running unsolicited scripts or attachments from emails.

**Tags:** DEEP#DOOR, Python, Backdoor, RAT, Securonix, WMI Persistence, Tunneling

## Sources
- [New Python Backdoor Uses Tunneling Service to Steal Browser and Cloud Credentials](https://thehackernews.com/2026/04/new-python-backdoor-uses-tunneling.html) — The Hacker News (2026-04-30)
- [April 2026 Cybersecurity News](https://www.cimetrics.com/blog-posts/2026/04/29/april-2026-cybersecurity-news) — Cimetrics (2026-04-29)

---
Source: https://cyber.netsecops.io/articles/stealthy-python-backdoor-deepdoor-steals-credentials-via-tunneling/
