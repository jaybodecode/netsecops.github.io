# North Korean Hackers Abuse GitHub for C2 in Campaign Targeting South Korea

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2026-04-06 | **Reading time:** 5 min

A sophisticated, multi-stage phishing campaign attributed to North Korean state-sponsored actors is targeting organizations in South Korea. The attackers use malicious Windows shortcut (LNK) files disguised as business documents to deliver a PowerShell-based payload. A key feature of the campaign is the abuse of GitHub as a command-and-control (C2) channel, allowing the malware to exfiltrate data and receive commands by communicating with attacker-controlled repositories. This tactic helps the malicious traffic blend in with legitimate web activity, evading detection. The campaign shows links to known North Korean groups like Kimsuky and Lazarus.

## Executive Summary

Security researchers have identified an ongoing, stealthy malware campaign targeting organizations in South Korea, with strong evidence linking it to North Korean state-sponsored threat actors such as **[Kimsuky](https://attack.mitre.org/groups/G0094/)** and **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**. The campaign leverages malicious Windows shortcut (`.lnk`) files, often delivered via phishing, as the initial infection vector. Upon execution, a hidden **[PowerShell](https://attack.mitre.org/techniques/T1059/001/)** script is run, which uses **[GitHub](https://github.com/)** as a command-and-control (C2) platform. By abusing the legitimate and widely trusted GitHub service, the attackers' C2 communications are effectively camouflaged within normal network traffic, making detection extremely difficult. The ultimate goal of the campaign appears to be espionage and long-term intelligence gathering.

---

## Threat Overview

**Attribution:** Suspected North Korean state-sponsored groups (Kimsuky, APT37, Lazarus).

This campaign demonstrates the continuing evolution of North Korean TTPs, focusing on stealth and the abuse of legitimate services:

- **Initial Access:** The use of malicious LNK files ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)) delivered via phishing. These files are disguised with icons and names of common document types (e.g., PDFs) to trick users.
- **Execution:** The LNK file contains obfuscated commands that launch a PowerShell script to perform the main malicious activities.
- **Command and Control:** The most notable feature is the use of GitHub as a C2 channel ([`T1102.002 - Web Service`](https://attack.mitre.org/techniques/T1102/002/)). The PowerShell script communicates with attacker-controlled GitHub repositories, posting stolen data and pulling down new commands or payloads. This is a form of 'Living off the Trusted Site' (LOTS).
- **Defense Evasion:** By using PowerShell and GitHub, the attack minimizes its footprint on the infected system and makes its network traffic appear benign to most security solutions.

---

## Technical Analysis

The attack unfolds in several stages:

1.  **Delivery:** A user receives a malicious LNK file, likely as an email attachment or a download from a compromised site.
2.  **Execution:** The user clicks the LNK file. The file is configured to execute a PowerShell command hidden in its 'Target' properties. To maintain the guise, it also opens a legitimate-looking decoy document.
3.  **C2 Communication:** The PowerShell script collects initial system information (e.g., hostname, username, IP address). It then makes API calls to GitHub, often creating or updating a file in a public or private repository controlled by the attacker, with the collected information encoded within.
4.  **Tasking:** The script periodically polls the GitHub repository for new instructions. The attacker can update a file in the repository with new PowerShell commands, which the implant will then download and execute.
5.  **Payload Delivery:** This C2 channel can be used to download further malware, such as Remote Access Trojans (RATs) like XenoRAT, for long-term control and more extensive data theft.

Recent versions of the malware have shown increased obfuscation, removing metadata that previously linked them to North Korean actors and hiding C2 instructions more deeply within the LNK file's arguments.

---

## Impact Assessment

The primary goal of this campaign is espionage. By gaining a persistent foothold within South Korean organizations, the attackers can:

- Collect political, military, and economic intelligence.
- Steal intellectual property and sensitive corporate data.
- Monitor communications of targeted individuals.
- Use the compromised networks as a launchpad for further attacks.

While not financially destructive in the way ransomware is, the long-term strategic damage from such intelligence gathering can be immense.

---

## Detection & Response

**Detection Strategies:**
1.  **PowerShell Logging:** Enable and monitor PowerShell script block logging (Windows Event ID 4104). Look for obfuscated PowerShell commands and scripts that make web requests to `api.github.com`. This is a core component of **[D3FEND Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Network Traffic Analysis:** While the traffic is encrypted (HTTPS), monitoring DNS queries and creating alerts for processes connecting to `github.com` or `api.github.com` that are not known developer tools or web browsers can be an effective detection method. This is an application of **[D3FEND Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Endpoint Analysis:** Scan for LNK files with unusual target paths, especially those that contain `powershell.exe` or `cmd.exe`. EDR solutions can be configured to alert on the execution of PowerShell from a LNK file shortcut.

**Response Actions:**
- If detected, block network access to the specific GitHub repositories being used for C2.
- Isolate the affected endpoint and analyze the PowerShell script to understand its full capabilities and what data may have been exfiltrated.
- Report the malicious repositories to GitHub for takedown.

---

## Mitigation

1.  **Block LNK Attachments:** Configure email gateways to block or quarantine emails with LNK file attachments, as they have few legitimate use cases in email.
2.  **Attack Surface Reduction (ASR) Rules:** Enable the ASR rule "Block execution of potentially obfuscated scripts" to prevent the execution of the malicious PowerShell.
3.  **User Training:** Educate users about the dangers of LNK files and to be suspicious of any unexpected document attachments.
4.  **Restrict PowerShell Execution:** Use PowerShell Constrained Language Mode where possible, which limits the dangerous capabilities that can be invoked by scripts.

**Tags:** North Korea, Kimsuky, Lazarus, GitHub, C2, LNK file, PowerShell, espionage, South Korea

## Sources
- [GitHub-Backed Malware Spread via LNK Files in South Korea](https://gbhackers.com/github-backed-malware-spread-via-lnk-files-in-south-korea/) — GBHackers
- [GitHub-Hosted Malware Delivered Through LNK Files In South Korea Attack Wave](https://cyberpress.com/github-hosted-malware-delivered-through-lnk-files-in-south-korea-attack-wave/) — Cyberpress
- [North Korea–Related Campaign Abuses GitHub as C2 in New LNK Phishing Attacks](https://www.securityweek.com/north-korea-related-campaign-abuses-github-as-c2-in-new-lnk-phishing-attacks/) — SecurityWeek

---
Source: https://cyber.netsecops.io/articles/north-korean-hackers-use-github-as-c2-in-south-korea-campaign/
