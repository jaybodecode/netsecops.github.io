# Russian APT BlueDelta Targets European Governments with HOOKEDGE

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2026-08-29 | **Reading time:** 6 min

The Russian GRU-linked threat group BlueDelta, also known as APT28, has been observed in a recent espionage campaign targeting European government and diplomatic organizations in Romania, Spain, and Türkiye. The campaign, detailed by Recorded Future, uses a new lightweight backdoor called HOOKEDGE. This backdoor is delivered via macro-enabled Word documents with diplomatic lures. In a novel technique, HOOKEDGE uses the legitimate developer service 'webhook.site' for its command and control (C2) communications, allowing it to blend in with normal web traffic and evade detection.

## Executive Summary
Insikt Group, the research division of **[Recorded Future](https://www.recordedfuture.com/)**, has identified a targeted espionage campaign attributed to **[BlueDelta](https://attack.mitre.org/groups/G0007/)**, a Russian state-sponsored threat group linked to the GRU and also tracked as **[APT28](https://attack.mitre.org/groups/G0007/)** and Fancy Bear. The campaign, active from late 2025 to early 2026, targeted government and diplomatic entities in Romania, Spain, and Türkiye. The attackers used a new, simple backdoor named **HOOKEDGE**, delivered through spear-phishing emails with malicious macro-enabled documents. A key feature of this campaign is the abuse of `webhook.site`, a legitimate web service, for command and control (C2), making the malicious traffic difficult to distinguish from benign developer activity.

## Threat Overview
**What Happened:** A Russian APT group conducted a cyber-espionage campaign against European government targets using a new backdoor that leverages a legitimate web service for C2.

**Attacker:** **[BlueDelta](https://attack.mitre.org/groups/G0007/)** (**[APT28](https://attack.mitre.org/groups/G0007/)**, Fancy Bear, Forest Blizzard). This is a highly sophisticated threat actor associated with Russia's General Staff Main Intelligence Directorate (GRU). They are known for conducting espionage, disruption, and disinformation campaigns aligned with Russian strategic interests.

**Victims:** Government and diplomatic organizations in Romania, Spain, and Türkiye.

**Malware:** **HOOKEDGE**, a lightweight backdoor written as a Windows batch script. Its primary function is to establish a C2 channel, download commands, execute them, and exfiltrate the results.

## Technical Analysis
The attack chain begins with a spear-phishing email containing a malicious Microsoft Word document. The document uses diplomatic-themed lures to trick the target into enabling macros.

1.  **Delivery:** A macro-enabled Word document (`.docm`) is sent to the target. One observed lure impersonated Spain's Ministry of the Presidency.
2.  **Execution:** When macros are enabled, the **HOOKEDGE** batch script is dropped and executed.
3.  **Persistence:** The malware establishes persistence by creating a scheduled task that runs every 30 minutes.
4.  **Command and Control (C2):** This is the most innovative part of the attack. **HOOKEDGE** uses two unique URLs on the legitimate `webhook.site` service.
    - One URL is used to fetch commands from the attacker.
    - The other URL is used to exfiltrate stolen data and command output via HTTP POST requests.
    - The script uses **[Microsoft Edge](https://www.microsoft.com/en-us/edge)** in headless mode (`--headless`) to perform the C2 communication, further blending in with normal user activity.

This abuse of a legitimate service for C2 is a clever defense evasion technique, as blocking the domain `webhook.site` would impact legitimate developers and users.

### MITRE ATT&CK Techniques
- **Initial Access:**
  - [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): The use of malicious Word documents sent via email.
- **Execution:**
  - [`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/): The malicious macros in the Word document.
  - [`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): The **HOOKEDGE** backdoor is a batch script.
- **Persistence:**
  - [`T1053.005 - Scheduled Task`](https://attack.mitre.org/techniques/T1053/005/): Used to run the backdoor every 30 minutes.
- **Defense Evasion:**
  - [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/): Macros are typically obfuscated.
  - [`T1140 - Deobfuscate/Decode Files or Information`](https://attack.mitre.org/techniques/T1140/): The macro decodes and drops the batch script.
  - [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): Using HTTP/HTTPS for C2.
  - [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): Abusing the legitimate `webhook.site` service for C2 functions.
- **Command and Control:**
  - [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): Downloading commands from the webhook URL.

## Impact Assessment
This campaign represents a continued effort by Russian intelligence services to conduct espionage against NATO members and European government entities. The theft of diplomatic and government documents can provide Russia with strategic advantages, insight into policy decisions, and material for future influence operations. The use of a simple yet effective backdoor that abuses a legitimate service demonstrates the actor's ability to innovate and adapt its TTPs to bypass traditional security controls. Organizations that do not have granular control and visibility over their network traffic may completely miss this type of C2 activity.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as file hashes or webhook URLs were provided in the source articles.

## Cyber Observables — Hunting Hints
- **Network Traffic:** Monitor for any outbound connections to `webhook.site` from servers or user workstations that do not belong to developers or have a legitimate business need. This is the strongest indicator.
- **Process Creation:** Look for instances of `schtasks.exe` creating tasks with suspicious command lines, especially those executing batch scripts from temporary directories.
- **Command Line Pattern:** Hunt for `msedge.exe` or `chrome.exe` being executed with the `--headless` flag, especially when initiated by a script or scheduled task. This is highly anomalous for typical user activity.
- **File System:** Search for recently created batch files (`.bat`, `.cmd`) in user profile directories (`%APPDATA%`, `%TEMP%`).

## Detection & Response
- **Network Traffic Analysis:** The key to detection is monitoring and scrutinizing traffic to legitimate-but-abusable services like `webhook.site`. Implement D3FEND's **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** and create specific alerts for any non-developer systems communicating with such sites.
- **Endpoint Detection (EDR):** Use an EDR to monitor for the full attack chain: Word spawning a command shell, which in turn creates a scheduled task, which then executes **[Microsoft Edge](https://www.microsoft.com/en-us/edge)** in headless mode. This chain of events is highly suspicious.
- **Macro Security:** Configure Microsoft Office applications to block macros from the internet and enforce macro signing.

## Mitigation
- **Application Control:** Use application control solutions like AppLocker to restrict the execution of batch scripts from user-writable directories. This aligns with **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
- **Email Security:** Employ advanced email security gateways to block malicious attachments and scan for suspicious macros.
- **User Training:** Train users, especially those in high-risk departments like government and diplomacy, to be skeptical of unsolicited attachments and to report suspicious emails.
- **Egress Filtering:** While blocking `webhook.site` entirely may be disruptive, consider logging all connections to it and similar services for manual review. For high-security environments, deny access by default and only allow it for specific users or systems with a justified need.

**Tags:** APT28, BlueDelta, GRU, Espionage, HOOKEDGE, Malware, Threat Actor

## Sources
- [Russian APT BlueDelta Uses HOOKEDGE to Target Defense and Diplomatic Organizations](https://securityaffairs.com/197996/apt/russian-apt-bluedelta-uses-hookedge-to-target-defense-and-diplomatic-organizations.html) — Security Affairs (2026-08-28)

---
Source: https://cyber.netsecops.io/articles/russian-apt-bluedelta-targets-european-governments-with-hookedge-backdoor/
