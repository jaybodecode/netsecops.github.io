# Vishing Attackers Impersonate IT on Teams, Trick Users into Running Fileless Malware

**Severity:** medium | **Category:** Phishing,Malware,Security Operations | **Updated:** 2025-12-09 | **Reading time:** 5 min

A sophisticated vishing (voice phishing) campaign is abusing trusted enterprise tools to deploy stealthy malware. Attackers impersonate IT support staff on Microsoft Teams, convincing users to initiate a Windows Quick Assist session. Once they have remote access, the attackers direct the user to a malicious site to download a loader. This loader then fetches an encrypted payload and executes it directly in memory using .NET reflection, a fileless technique designed to evade traditional antivirus and endpoint detection solutions. The campaign highlights the increasing trend of blending social engineering with the abuse of legitimate software.

## Executive Summary
A cunning vishing (voice phishing) campaign is exploiting the trust users place in corporate communication and support tools. Threat actors are impersonating IT support personnel on **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** and socially engineering employees into granting them remote access via the legitimate **Windows Quick Assist** tool. Once connected, the attackers guide the victim to download a malicious loader, which then deploys a multi-stage, fileless .NET payload. This payload is decrypted and executed entirely in memory, making it invisible to traditional file-based security scanners. This attack, analyzed by **[Trustwave SpiderLabs](https://www.trustwave.com/en-us/resources/spiderlabs/)**, demonstrates how attackers can chain together legitimate tools to bypass technical defenses, making user awareness and behavioral detection more critical than ever.

---

## Threat Overview
The attack is a textbook example of blending social engineering with living-off-the-land techniques. The stages are as follows:
1.  **Impersonation & Lure**: The attacker, using a spoofed display name of a senior IT employee, initiates a call or chat with the target via Microsoft Teams.
2.  **Social Engineering**: The attacker uses a pretext (e.g., "We need to perform a security update") to convince the user to launch the built-in Windows Quick Assist application and share the access code.
3.  **Remote Access**: With the code, the attacker gains full remote control of the user's desktop.
4.  **Malicious Download**: The attacker, now controlling the machine, opens a web browser and navigates to a malicious domain (`ciscocyber[.]com`) to download a file named `updater.exe`.
5.  **Fileless Execution**: The `updater.exe` is a .NET Core 8.0 loader. It connects to a second domain (`jysync[.]info`) to fetch an encryption key and an encrypted payload. The payload is then decrypted (using AES-CBC and XOR) and executed directly in memory using .NET reflection, never touching the disk in its final, malicious form.

## Technical Analysis
This campaign leverages several MITRE ATT&CK techniques:
- **Initial Access**: [`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/) (Vishing).
- **Execution**: [`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/), as the user is guided to download and run the initial loader.
- **Defense Evasion**: The core of the attack. It uses [`T1027.002 - Software Packing`](https://attack.mitre.org/techniques/T1027/002/) (the .NET wrapper) and [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/) (encrypted payload). The primary technique is [`T1620 - Reflective Code Loading`](https://attack.mitre.org/techniques/T1620/), where the malware is executed from memory.
- **Command and Control**: [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/) is used to download the initial loader and the second-stage payload.
- **Remote Access Software**: [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/) is used by abusing the legitimate Quick Assist tool.

## Impact Assessment
While the final payload was not detailed, a successful intrusion of this type can lead to significant consequences. The fileless nature of the malware allows it to operate undetected for longer periods. Potential impacts include:
- **Credential Theft**: The malware could be an infostealer designed to harvest browser passwords, application credentials, and session cookies.
- **Ransomware Deployment**: The initial access could be sold or used to deploy ransomware across the network.
- **Data Exfiltration**: The attacker has control of an endpoint inside the network, which can be used to access and exfiltrate sensitive data from network shares or internal applications.
- **Business Email Compromise (BEC)**: The compromised user account could be used to launch BEC attacks against other employees or business partners.

## IOCs
| Type | Value | Description |
|---|---|---|
| `domain` | `ciscocyber[.]com` | Malicious domain used to host the initial loader (`updater.exe`). |
| `domain` | `jysync[.]info` | Malicious domain used to host the encrypted payload and decryption key. |
| `file_name` | `updater.exe` | The name of the .NET loader downloaded by the victim. |

## Detection & Response
- **Monitor Quick Assist Usage**: Log and alert on all executions of `QuickAssist.exe`. While it is a legitimate tool, its usage may be rare in some organizations. Correlate its execution with subsequent suspicious activity, such as downloads of new executables or PowerShell activity. This is an application of D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Network Monitoring**: Block and alert on any network connections to the known malicious domains (`ciscocyber[.]com`, `jysync[.]info`). Monitor for .NET processes making external network connections, which can be anomalous.
- **.NET Logging**: Enable and monitor .NET runtime logging. This can provide visibility into reflectively loaded assemblies, even if they are not written to disk.
- **User Education & Reporting**: Train users to be highly skeptical of unsolicited requests for remote access, even if they appear to come from internal IT. Establish a clear and simple process for users to verify such requests and report suspicious activity.

## Mitigation
1.  **Restrict or Block Quick Assist**: If your organization does not use Windows Quick Assist for legitimate support, consider blocking its execution entirely using application control policies like AppLocker or WDAC. This removes the abused tool from the equation. This maps to [`D3-EDL: Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting).
2.  **User Awareness Training**: Conduct targeted training on vishing and social engineering. Specifically, instruct users to never grant remote access or install software based on an unsolicited Teams, email, or phone call. All support requests should be verified through a separate, trusted channel.
3.  **Endpoint Hardening**: Use Attack Surface Reduction (ASR) rules to block executable files from running unless they meet specific age, prevalence, or trusted list criteria. This can prevent the initial `updater.exe` from running.
4.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all accounts. While it would not stop this specific attack flow (which compromises a session, not credentials), it is a foundational defense against account takeover.

**Tags:** Vishing, Social Engineering, Microsoft Teams, QuickAssist, Fileless Malware, .NET

## Sources
- [New Vishing Attack Exploits Microsoft Teams and QuickAssist to Deploy .NET Malware](https://gbhackers.on-security/2025/12/new-vishing-attack-exploits-microsoft.html) — GBHackers (2025-12-09)
- [Microsoft Teams and QuickAssist Exploited in New Vishing Attack to Spread .NET Malware](https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/microsoft-teams-and-quickassist-exploited-in-vishing-attack/) — Trustwave (2025-12-09)

---
Source: https://cyber.netsecops.io/articles/vishing-campaign-abuses-microsoft-teams-and-quickassist/
