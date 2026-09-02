# New Chinese APT 'Phantom Taurus' Targets Global Geopolitical Intel with 'NET-STAR' Malware

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2025-10-10 | **Reading time:** 6 min

A newly designated, sophisticated threat group aligned with China, named **Phantom Taurus**, has been identified conducting long-term cyber-espionage campaigns. Active for over two years, the group targets government, military, and telecommunications organizations across Africa, the Middle East, and Asia. Its operations focus on strategic intelligence gathering that aligns with China's geopolitical interests. **Phantom Taurus** is distinguished by its stealth and use of a custom malware suite called **NET-STAR**, which targets **[Microsoft Internet Information Services (IIS)](https://www.iis.net/)** servers. While showing some infrastructure overlap with known APTs like **[APT27](https://attack.mitre.org/groups/G0045/)** and **[Mustang Panda](https://attack.mitre.org/groups/G0129/)**, its unique tools and TTPs mark it as a distinct and advanced threat.

## Executive Summary
Security researchers have identified a new, highly sophisticated cyber-espionage group, **Phantom Taurus**, assessed to be aligned with the People's Republic of China (PRC). The group has been operational for at least two and a half years, engaging in long-term, stealthy campaigns aimed at intelligence collection. Its targets are primarily government ministries, military entities, and telecommunications providers in regions of strategic interest to China, including Africa, the Middle East, and Asia. **Phantom Taurus** employs a custom, previously undocumented malware suite named **NET-STAR**, which is specifically designed to compromise and persist on **[Microsoft Internet Information Services (IIS)](https://www.iis.net/)** web servers. The group's focus on long-term access, custom tooling, and strategic targeting distinguishes it as a significant and persistent threat, even though some of its infrastructure overlaps with other known Chinese APTs like **[APT27](https://attack.mitre.org/groups/G0045/)**, **[Winnti](https://attack.mitre.org/groups/G0044/)**, and **[Mustang Panda](https://attack.mitre.org/groups/G0129/)**.

---

## Threat Overview
**Phantom Taurus** is not a financially motivated group; its primary objective is cyber-espionage. The group's targeting profile and operational tempo closely mirror the PRC's geopolitical and economic objectives, with campaigns often coinciding with major international events. The group is characterized by its patience and focus on maintaining persistent, low-and-slow access to high-value networks.

### Tactical Evolution
-   **Early Operations**: Focused on targeted email theft from compromised servers.
-   **Recent Operations (since early 2025)**: Shifted tactics to directly targeting and exfiltrating data from databases, indicating a move towards more valuable, structured data.

### NET-STAR Malware Suite
The group's primary tool is the **NET-STAR** malware, a modular framework for IIS servers. It provides capabilities for:
-   **Persistence**: Installs as a malicious IIS module to ensure it survives reboots.
-   **Evasion**: Includes functions to disable security monitoring and logging features on the host.
-   **Reconnaissance**: Gathers information about the compromised system and network.
-   **Data Exfiltration**: Provides a covert channel to exfiltrate stolen data.

## Technical Analysis
The attack chain typically begins with the exploitation of vulnerabilities in public-facing web servers, particularly Microsoft IIS.

### MITRE ATT&CK TTPs
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)**: The likely initial access vector, targeting vulnerabilities in IIS servers to deploy the NET-STAR malware.
- **[`T1505.003 - Server Software Component: Web Shell`](https://attack.mitre.org/techniques/T1505/003/)**: The NET-STAR malware functions as a persistent backdoor, similar to a sophisticated web shell or malicious IIS module.
- **[`T1136.002 - Create Account: Domain Account`](https://attack.mitre.org/techniques/T1136/002/)**: APTs often create new accounts to maintain persistence within a network.
- **[`T1021.002 - Remote Services: SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)**: Used for lateral movement after gaining an initial foothold.
- **[`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)**: A common method for exfiltrating large volumes of data covertly.
- **[`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)**: A known capability of the NET-STAR malware is to disable security monitoring.

## Impact Assessment
The activities of **Phantom Taurus** pose a significant national security risk to the targeted countries. By stealing sensitive government, military, and telecommunications data, the group provides the PRC with strategic advantages in diplomatic negotiations, economic planning, and intelligence operations. The compromise of telecommunications providers is particularly damaging, as it can enable widespread surveillance. For private companies in these sectors, the theft of intellectual property and sensitive business data can result in substantial economic loss.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| process_name | `w3wp.exe` | The IIS worker process. Monitor for this process spawning anomalous child processes (e.g., `cmd.exe`, `powershell.exe`) or making outbound connections to untrusted IPs. | EDR, Sysmon Event ID 1 | high |
| file_path | `C:\Windows\System32\inetsrv\` | The default directory for IIS components. Monitor for new or modified DLLs in this directory, which could be the NET-STAR module. | File Integrity Monitoring (FIM) | high |
| log_source | `IIS Logs` | Look for suspicious requests to the server that may indicate exploitation or C2 communication. Also, check for gaps in logging, which may indicate tampering. | SIEM, Log Analysis | medium |
| event_id | `5156` | Windows Filtering Platform event ID that logs network connections. Monitor for `w3wp.exe` making connections to suspicious external IP addresses. | Windows Security Event Log | medium |

## Detection & Response
- **IIS Hardening & Monitoring**: Scrutinize IIS configurations. Use the `appcmd.exe list modules` command to inspect for any non-standard or suspicious IIS modules. This is a form of D3FEND's **[Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Process Analysis**: Implement D3FEND's **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** (D3-PA) by baselining the normal behavior of the `w3wp.exe` process and alerting on any deviations.
- **Network Traffic Analysis**: Use D3FEND's **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** (D3-NTA) to monitor all outbound traffic from IIS servers. Block and alert on any connections to known malicious infrastructure or destinations in China that are not expected.

## Mitigation
- **Patch Management**: Keep all internet-facing systems, especially web servers like IIS, fully patched to prevent initial exploitation. This is D3FEND's **[Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)** (D3-SU).
- **Network Segmentation**: Isolate web servers in a DMZ, separate from the internal corporate network, to prevent lateral movement.
- **Least Privilege**: Ensure the service account running the IIS application pool has the minimum necessary permissions to function, limiting the attacker's capabilities post-compromise.
- **Egress Filtering**: Strictly control and monitor outbound network traffic from servers, allowing connections only to known-good destinations.

**Tags:** APT, cyber-espionage, China, IIS, malware, threat actor

## Sources
- [Phantom Taurus: China-Linked Hackers Target Global Governments](https://www.esecurityplanet.com/threats/phantom-taurus-china-hackers/) — eSecurityPlanet (2025-10-09)
- [Weekly Intelligence Report – 10 October 2025](https://www.cyfirma.com/outofband/weekly-intelligence-report-10-october-2025/) — CYFIRMA (2025-10-10)
- [China-linked APT Phantom Taurus uses Net-Star malware in espionage campaigns against key sectors](https://securityaffairs.co/169041/apt/china-apt-phantom-taurus.html) — Security Affairs (2025-10-02)

---
Source: https://cyber.netsecops.io/articles/phantom-taurus-chinese-apt-targets-global-geopolitical-intel/
