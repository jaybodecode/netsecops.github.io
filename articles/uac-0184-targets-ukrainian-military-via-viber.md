# Russia-Aligned UAC-0184 Uses Viber to Target Ukrainian Military

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2026-01-06 | **Reading time:** 6 min

The Russia-aligned threat group UAC-0184 (also tracked as Hive0156) has evolved its tactics to include the Viber messaging platform for malware distribution. The group is targeting Ukrainian military and government departments with malicious ZIP archives containing LNK files. When opened, these files deploy the Remcos Remote Administration Tool (RAT), enabling the attackers to conduct espionage. This new vector supplements their previous methods of using phishing emails and other messaging apps like Signal and Telegram.

## Executive Summary
The Russia-aligned threat actor **UAC-0184** (also known as Hive0156) is continuing its intelligence-gathering campaigns against Ukrainian military and government entities. In a tactical evolution, the group is now leveraging the **Viber** messaging application as an initial access vector. According to a report from the 360 Threat Intelligence Center, the attackers distribute malicious ZIP archives containing booby-trapped Windows Shortcut (LNK) files. Executing these shortcuts triggers a multi-stage infection process that culminates in the installation of the **[Remcos](https://attack.mitre.org/software/S0332/)** Remote Administration Tool (RAT). This provides the attackers with persistent access for data theft, surveillance, and remote control of compromised systems.

## Threat Overview
**UAC-0184** is a persistent threat actor focused on cyberespionage against Ukrainian targets. Their latest campaign demonstrates an adaptation to their targets' communication habits, moving to popular messaging platforms like **Viber** to increase the likelihood of success. This shift away from traditional email-based phishing shows tactical agility.

The attack begins with a social engineering lure, where the target receives a ZIP archive via a message on **Viber**. The archive contains an LNK file disguised with an icon for a common document type, such as a Microsoft Word or Excel file. The filename is likely themed around military or official government business to entice the recipient to open it.

Once the victim clicks the LNK file, it executes a hidden script. This script initiates a download of the next stage payload from an attacker-controlled server, leading to the installation and execution of the **Remcos** RAT. **Remcos** is a commercially available RAT that is widely abused by criminals and state-sponsored actors for its powerful feature set, including keylogging, screen capture, file system access, and remote command execution.

## Technical Analysis
The use of LNK files as a malware dropper is a well-established technique. These files can be configured to execute arbitrary commands, including PowerShell or command prompt scripts that download and run malware from the internet. The entire process is designed to bypass simple email gateways that might flag executable files.

### MITRE ATT&CK Techniques
- **[`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566.001/)**: Although delivered via Viber, the tactic of sending a malicious file in a targeted message is analogous to spearphishing with an attachment.
- **[`T1204.002 - User Execution: Malicious Link`](https://attack.mitre.org/techniques/T1204.002/)**: The victim must be tricked into clicking the malicious LNK file to initiate the attack.
- **[`T1059.001 - Command and Scripting Interpreter: PowerShell`](https://attack.mitre.org/techniques/T1059.001/)**: LNK files often invoke PowerShell to perform fileless downloads of subsequent payloads.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)**: The script executed by the LNK file downloads the **Remcos** RAT from an external server.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)**: The final payload is the **Remcos** RAT, a commercial tool used for malicious remote control.

## Impact Assessment
A successful infection provides **UAC-0184** with complete control over the compromised endpoint within a Ukrainian military or government department. This access can be used to exfiltrate sensitive documents, steal credentials for lateral movement, monitor communications, and gain strategic intelligence relevant to the ongoing conflict. The impact of such a breach is severe, potentially compromising operational security, troop movements, and government plans. Each compromised machine serves as a potential pivot point for deeper intrusion into sensitive government and military networks.

## Detection & Response
- **Endpoint Monitoring**: Use an EDR solution to monitor for suspicious process chains. A legitimate application like `Viber.exe` should not spawn `cmd.exe` or `powershell.exe` which in turn makes a network connection to download a file. This is a key detection opportunity.
- **LNK File Analysis**: Configure security policies to show file extensions by default. Suspicious LNK files can be analyzed with tools to inspect the command they are configured to execute. Use **[File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** (D3-FA) to inspect file metadata and content.
- **Network Traffic Analysis**: Monitor for network connections from endpoints to unknown or uncategorized domains, especially following alerts for suspicious process execution. Block known C2 domains associated with **Remcos** and other RATs.

## Mitigation
- **User Training**: This is the most critical mitigation. Personnel must be trained to be suspicious of unsolicited files received via any communication platform, including trusted apps like Viber, Signal, or Telegram. They should be taught to never open files from unknown senders and to verify the legitimacy of files from known contacts. This aligns with MITRE mitigation **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
- **Execution Prevention**: Configure Attack Surface Reduction (ASR) rules on Windows to block script execution from LNK files or to block untrusted and unsigned processes from running. This is a form of **[Executable Denylisting](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting)** (D3-EDL).
- **Application Whitelisting**: Where possible, implement application whitelisting solutions like AppLocker to prevent unauthorized executables like **Remcos** from running, even if they are successfully downloaded to the system.

**Tags:** UAC-0184, Threat Actor, Espionage, Ukraine, Remcos RAT, Viber

## Sources
- [Russia-Aligned Hackers Abuse Viber to Target Ukrainian Military and Government](https://thehackernews.com/2026/01/russia-aligned-hackers-abuse-viber-to.html) — The Hacker News (2026-01-05)
- [5th January – Threat Intelligence Report](https://research.checkpoint.com/2026/5th-january-threat-intelligence-report/) — Check Point Research (2026-01-05)

---
Source: https://cyber.netsecops.io/articles/uac-0184-targets-ukrainian-military-via-viber/
