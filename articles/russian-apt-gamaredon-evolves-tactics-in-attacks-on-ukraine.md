# Russian APT Gamaredon Enhances Malware and Evasion Techniques in Ukraine War

**Severity:** high | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2026-06-30 | **Reading time:** 4 min

The Russian APT group Gamaredon has continued to evolve its malware arsenal and evasion tactics in its relentless cyber campaign against Ukraine. Recent analysis shows the group is increasingly using legitimate cloud services like Cloudflare for C2, collaborating with other Russian APTs like Turla, and using new malware variants like PteroSand. The campaigns, primarily targeting Ukrainian government and military entities, focus on espionage and data exfiltration.

## Executive Summary
The Russian-backed advanced persistent threat (APT) group **[Gamaredon](https://attack.mitre.org/groups/G0047/)** (also known as Shuckworm, Armageddon) has significantly upgraded its tactics, techniques, and procedures (TTPs) in its ongoing cyber espionage campaign against Ukraine. According to research from **[ESET](https://www.eset.com/)**, the group conducted at least 35 distinct spear-phishing campaigns throughout 2025 and into 2026. **Gamaredon** is now heavily leveraging legitimate cloud infrastructure, such as **[Cloudflare](https://www.cloudflare.com/)** tunnels, for command-and-control (C2) to evade detection. The group has also been observed providing initial access for other high-profile Russian APTs, including **[Turla](https://attack.mitre.org/groups/G0010/)**, indicating a more coordinated and dangerous level of cooperation among state-sponsored actors. The primary objectives remain unchanged: espionage and data exfiltration from Ukrainian government and military targets.

## Threat Overview
**Gamaredon** continues to be one of the most active and persistent threats targeting Ukraine. Their operations are characterized by high-volume spear-phishing campaigns designed to gain initial access. The group has refined its methods to increase their success rate and evade detection:
*   **Initial Access:** They employ spear-phishing emails containing malicious LNK or HTA files, often within archive files (`.zip`, `.rar`). They have also been seen exploiting patched vulnerabilities like **[`CVE-2025-8088`](https://www.cve.org/CVERecord?id=CVE-2025-8088)** (WinRAR) for payload delivery and persistence.
*   **Payload Delivery:** The initial droppers are typically PowerShell or VBS scripts that download next-stage malware, such as the **PteroSand** backdoor.
*   **C2 Infrastructure:** A key evolution is the abuse of legitimate cloud services. By using **Cloudflare** tunnels and serverless workers for C2, **Gamaredon**'s malicious traffic is masked within legitimate web traffic, making it difficult for network defenders to block.
*   **Collaboration:** In a significant development, **Gamaredon** has been observed acting as an 'access-as-a-service' provider for other APTs. After securing initial access, they have handed off control to the **Turla** group, which then deploys its own sophisticated **Kazuar** malware framework. This layering of threats complicates attribution and response.

## Technical Analysis
**Gamaredon's** updated TTPs can be mapped to the MITRE ATT&CK framework:
*   **Initial Access:** **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)** and **[`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)** are their primary vectors.
*   **Execution:** Heavy reliance on **[`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/)** and **[`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/)** for executing scripts and downloading payloads.
*   **Persistence:** Exploiting **CVE-2025-8088** to place downloaders in the Windows Startup folder is a form of **[`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/)**.
*   **Defense Evasion:** Using legitimate cloud services for C2 is a classic example of **[`T1102.002 - Web Service: Bidirectional Communication`](https://attack.mitre.org/techniques/T1102/002/)**. This technique makes their traffic blend in with normal user activity.
*   **Command and Control:** The use of **PteroSand** and **Kazuar** backdoors for C2 falls under **[`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)**.

> The collaboration between **Gamaredon** and **Turla** is a force multiplier. **Gamaredon's** high-volume, less sophisticated approach to gaining access is complemented by **Turla's** stealthy, advanced post-exploitation capabilities, creating a much greater threat to targeted organizations.

## Impact Assessment
The impact of **Gamaredon's** activities is directly tied to the geopolitical conflict between Russia and Ukraine. By successfully infiltrating Ukrainian government and military networks, the group provides the Russian state with critical intelligence that can be used to gain a strategic advantage. This includes:
*   Military plans and troop movements.
*   Government communications and policy decisions.
*   Sensitive personal information of government and military officials.
The collaboration with **Turla** amplifies this impact, as it allows for more deeply entrenched and harder-to-detect espionage operations within the most sensitive Ukrainian networks.

## IOCs — Directly from Articles
No specific file hashes or C2 domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams in the targeted region should hunt for the following activity:

| Type | Value | Description |
|:---|:---|:---|
| `command_line_pattern` | `powershell.exe -ExecutionPolicy Bypass -File` | Monitor for PowerShell being launched with a bypass policy to run an unsigned script, a common Gamaredon TTP. |
| `file_path` | `%APPDATA%\..\Startup\` | Monitor the user Startup folder for the creation of new LNK files or scripts, a persistence method used by the group. |
| `network_traffic_pattern` | `*.cloudflare.com` or `*.trycloudflare.com` | While broad, look for unexpected processes on servers making outbound connections to Cloudflare domains, especially if not associated with a known application. Context is key. |
| `file_name` | `*.hta`, `*.lnk` | Be suspicious of HTA or LNK files delivered via email attachments, especially within archives. |

## Detection & Response
**Detection:**
1.  **Email Security:** Implement advanced email security gateways that can scan inside archives and analyze links for malicious content.
2.  **Endpoint Script Control:** Use EDR or application control solutions to block or alert on the execution of PowerShell and VBS scripts originating from untrusted sources like email attachments. This aligns with **[D3FEND's Executable Denylisting (D3-EDL)](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting)**.
3.  **TLS/SSL Inspection:** Where possible, implement TLS inspection to gain visibility into encrypted C2 traffic. This is necessary to detect malicious patterns within traffic to legitimate services like **Cloudflare**. This is a form of **[D3FEND Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

**Response:**
1.  Isolate affected endpoints and block C2 communications at the firewall or proxy.
2.  Review all accounts and systems accessed by the threat actor.
3.  Assume that if **Gamaredon** was detected, other actors like **Turla** may also be present. A thorough threat hunt is required.

## Mitigation
**Immediate Actions:**
1.  **Patching:** Ensure all software, especially applications like WinRAR that handle external files, are fully patched (**[`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)**).
2.  **User Training:** Continuously train users to be suspicious of unsolicited emails with attachments, even if they appear to come from a known source.

**Strategic Improvements:**
1.  **Attack Surface Reduction:** Block HTA and LNK file attachments at the email gateway. Configure Office applications to disable macros by default.
2.  **PowerShell Hardening:** Implement constrained language mode for PowerShell to limit its capabilities for non-administrative users (**[`M1028 - Operating System Configuration`](https://attack.mitre.org/mitigations/M1028/)**).
3.  **Egress Filtering:** Deny all outbound traffic by default and only allow connections to known-good, necessary services. This makes it harder for attackers to establish C2 channels, even through legitimate services.

## CVEs
- CVE-2025-8088

**Tags:** APT, APT28, Cloudflare, Cyber War, ESET, Gamaredon, Russia, Turla, Ukraine

## Sources
- [Gamaredon Expands Ukraine Attacks with New Malware and Cloud Service Abuse](https://thehackernews.com/2026/06/gamaredon-expands-ukraine-attacks-with.html)
- [Russian APT Gamaredon Expands Cyber Arsenal With New Evasion Techniques](https://securityboulevard.com/2026/06/russian-apt-gamaredon-expands-cyber-arsenal-with-new-evasion-techniques/)

---
Source: https://cyber.netsecops.io/articles/russian-apt-gamaredon-evolves-tactics-in-attacks-on-ukraine/
