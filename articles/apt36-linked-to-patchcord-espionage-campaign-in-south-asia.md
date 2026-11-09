# APT36 Linked to 'PATCHCORD' Espionage Campaign in South Asia

**Severity:** high | **Category:** Threat Actor,Malware,Threat Intelligence | **Updated:** 2026-08-21

A cyber-espionage campaign targeting telecom, government, and critical infrastructure in South Asia has been attributed with moderate confidence to APT36 (Transparent Tribe). The operation uses a new custom C/C++ backdoor called 'PATCHCORD' and a Go-based variant, 'SHEETCORD.' The SHEETCORD malware innovatively abuses legitimate public cloud services, including Google Sheets and GitHub Gists, for command-and-control (C2) communications to evade detection. The campaign has been active since at least March 2026.

## Executive Summary
Security researchers have uncovered an ongoing cyber-espionage campaign attributed with moderate confidence to **[APT36](https://attack.mitre.org/groups/G0062/)** (also known as Transparent Tribe), a threat actor aligned with Pakistani interests. The campaign, active since at least March 2026, targets high-value entities in South Asia, including telecommunications providers in Afghanistan and government and critical infrastructure in India. The operation employs a new, custom C/C++ backdoor named **PATCHCORD**. A more advanced, Go-based variant called **SHEETCORD** has also been discovered, which cleverly uses **[Google Sheets](https://www.google.com/sheets/about/)** and **GitHub Gists** for command-and-control (C2), demonstrating the actor's evolving tradecraft to blend in with legitimate traffic and evade detection.

## Threat Overview
The campaign showcases **APT36**'s focus on intelligence gathering against strategic targets in neighboring countries. The actor uses targeted social engineering lures, such as fake VPN installers impersonating software from the **Afghan Telecom (AFTEL)** company, to deliver its malware. This indicates thorough pre-attack reconnaissance.

The malware suite consists of two main components:
- **PATCHCORD:** A custom C/C++ backdoor that establishes persistence, fingerprints the host, and executes remote commands.
- **SHEETCORD:** A more sophisticated Go-based implant that uses a technique known as "living off the trusted land." It abuses legitimate public cloud services for C2, making its traffic difficult to block or identify as malicious. It retrieves commands from a public **Google Sheet** and exfiltrates data to **GitHub Gists**.

This use of legitimate services for C2 is a key tactic for evading network-based security controls and is a hallmark of increasingly sophisticated APT groups.

## Technical Analysis
**APT36**'s attack chain combines social engineering with custom malware that leverages trusted services.

1.  **Delivery & Initial Access:** The malware is delivered via malicious files disguised as legitimate software, such as a fake VPN installer for **AFTEL**. This is a classic example of [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
2.  **Execution & Persistence:** Once executed, the **PATCHCORD** or **SHEETCORD** malware is installed. It establishes persistence on the host, for example, by hijacking browser shortcuts to ensure it is re-executed regularly.
3.  **Command and Control:** This is the most innovative part of the campaign. The **SHEETCORD** variant communicates with its operators using legitimate web services, a technique known as [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/).
    - It periodically queries a specific public **Google Sheet**.
    - The operators place encoded commands in the cells of this sheet.
    - The malware retrieves, decodes, and executes these commands (e.g., run shell command, download file, exfiltrate data).
    - Exfiltrated data is uploaded to **GitHub Gists**.
4.  **Actions on Objectives:** The malware's capabilities include system fingerprinting ([`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)), executing arbitrary commands ([`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/)), and stealing data.

Researchers also noted that some malware components may have been developed with the assistance of Large Language Models (LLMs), indicating the actor is adopting modern development tools.

## Impact Assessment
The primary goal of this campaign is espionage. By targeting telecommunications, government, and critical infrastructure, **APT36** aims to gather sensitive political, military, and economic intelligence. A successful compromise of a telecom provider could allow the actor to monitor communications, while a breach of a government entity could expose state secrets. The use of stealthy C2 channels like **Google Sheets** allows the actor to maintain long-term persistence in victim networks, quietly exfiltrating data over extended periods. This poses a significant national security threat to the targeted countries.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this type of activity:
| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | `Repetitive connections to docs.google.com/spreadsheets/d/.../export?format=csv` | Look for non-browser processes (e.g., unknown executables) making repeated, scripted connections to a specific Google Sheet URL. |
| `network_traffic_pattern` | `Anomalous POST requests to api.github.com/gists` | Monitor for unusual processes making API calls to create or update GitHub Gists, which could be a sign of data exfiltration. |
| `file_name` | `AFTEL-VPN.exe` | An example of a lure file name. Hunt for executables that impersonate legitimate software relevant to your organization. |
| `command_line_pattern` | `powershell.exe -enc <base64_string>` | Attackers often use encoded PowerShell commands to download and execute malware payloads. Monitor for this behavior. |

## Detection & Response
- **Egress Traffic Analysis:** The key to detection is analyzing outbound network traffic. Since blocking `docs.google.com` or `api.github.com` is not feasible for most organizations, focus on the context of the connections. Use an EDR or a sophisticated network proxy to identify which *processes* are making these connections. A non-browser process making repeated calls to **Google Sheets** is highly suspicious. This is an advanced application of **D3FEND**'s [`Outbound Traffic Filtering (D3-OTF)`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
- **TLS/SSL Inspection:** To gain visibility into the specific URLs and content being accessed (e.g., the specific Google Sheet ID), TLS/SSL inspection is necessary at the network perimeter.
- **Endpoint Monitoring:** Use an EDR to monitor for the malware's persistence techniques, such as modifications to browser shortcuts or the creation of suspicious scheduled tasks.

## Mitigation
- **Application Control:** Use application control solutions like AppLocker or WDAC to restrict the execution of unauthorized software, which can prevent the initial malware delivery from succeeding. This aligns with [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
- **Restrict Web-Based Content:** While blocking Google and GitHub entirely is impractical, it is possible to use proxy categories to block access to "Personal Cloud Storage" or similar categories for servers and sensitive workstations that have no business need for them. This is a targeted form of [`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/).
- **User Training:** Educate users about the risks of downloading and running software from untrusted sources, especially those delivered via email. This is a key part of [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** APT36, C2, Espionage, Google Sheets, Malware, PATCHCORD, SHEETCORD, Transparent Tribe

## Sources
- [APT36 Suspected in PATCHCORD Espionage Campaign Using Google Sheets C2](https://securityaffairs.com/197266/intelligence/apt36-suspected-in-patchcord-espionage-campaign-using-google-sheets-c2.html) (2026-08-16)
- [New PATCHCORD Backdoor Targets Afghan Telecom and Indian Critical Infrastructure](https://thehackernews.com/2026/08/new-patchcord-backdoor-targets-afghan.html) (2026-08-13)
- [Acronis exposes PATCHCORD cyber-espionage campaign targeting telecom and critical infrastructure in South Asia](https://industrialcyber.co/critical-infrastructure/acronis-exposes-patchcord-cyber-espionage-campaign-targeting-telecom-and-critical-infrastructure-in-south-asia/) (2026-08-14)
- [PATCHCORD](https://mallory.ai/stories/01a0002f-781c-7bba-90b1-dcc3d0ee96e2) (2026-08-14)

---
Source: https://cyber.netsecops.io/articles/apt36-linked-to-patchcord-espionage-campaign-in-south-asia/
