# Microsoft's Record-Breaking June Patch Tuesday: Over 200 Flaws and Three Zero-Days Patched

**Severity:** critical | **Category:** Patch Management,Vulnerability,Cyberattack | **Updated:** 2026-07-04 | **Reading time:** 5 min

Microsoft has released its largest-ever Patch Tuesday for June 2026, addressing a staggering 200 vulnerabilities across its product ecosystem. The update includes fixes for 33 critical flaws and three publicly disclosed zero-day vulnerabilities. Among the most severe are a wormable Windows Kernel RCE (CVE-2026-45657), a critical HTTP.sys flaw (CVE-2026-47291), and a DHCP Client bug (CVE-2026-44815), all rated 9.8. The zero-days, while not actively exploited, affect BitLocker (CVE-2026-50507), HTTP.sys (CVE-2026-49160), and the Windows Collaborative Translation Framework (CVE-2026-45586). This massive release underscores the accelerating pace of vulnerability discovery and places significant pressure on IT teams for rapid remediation.

## Executive Summary
On June 9, 2026, **[Microsoft](https://www.microsoft.com/security)** released its largest security update in history, addressing nearly 200 vulnerabilities in its June 2026 Patch Tuesday. This unprecedented volume includes fixes for 33 critical vulnerabilities and three publicly disclosed zero-days. The sheer number of patches highlights a new operational tempo for security teams, likely driven by advanced bug detection by both researchers and Microsoft's internal teams using AI. The most urgent fixes address critical Remote Code Execution (RCE) vulnerabilities in core Windows components, including a potentially "wormable" flaw in the Windows Kernel (`CVE-2026-45657`). While the zero-days are not yet exploited in the wild, their public disclosure increases the risk, necessitating immediate and prioritized patching. Organizations must focus on internet-facing systems and critical infrastructure to mitigate the significant risk posed by this historic update.

## Vulnerabilities Addressed
This Patch Tuesday is notable for both its volume and the severity of the flaws addressed. Key vulnerabilities include:

### Zero-Day Vulnerabilities (Publicly Disclosed)
- **`CVE-2026-50507`** (CVSS 6.8): A BitLocker Security Feature Bypass vulnerability. An attacker with physical access could potentially bypass BitLocker encryption to access user data. This is believed to be a patch for the "YellowKey" exploit.
- **`CVE-2026-49160`** (CVSS 7.5): A Denial-of-Service (DoS) vulnerability in `HTTP.sys`, which can be triggered by a specially crafted HTTP/2 request, leading to what researchers call an "HTTP/2 Bomb" attack against web servers like **[Microsoft Internet Information Services (IIS)](https://www.iis.net/)**.
- **`CVE-2026-45586`** (CVSS 7.8): An Elevation of Privilege vulnerability in the Windows Collaborative Translation Framework. This is suspected to be the fix for the "GreenPlasma" exploit.

### Critical Remote Code Execution (RCE) Vulnerabilities
- **`CVE-2026-45657`** (CVSS 9.8): A critical RCE vulnerability in the Windows Kernel's handling of TCP/IP. Security experts have flagged this as potentially "wormable," meaning it could be used to create a self-propagating attack across a network without user interaction.
- **`CVE-2026-47291`** (CVSS 9.8): An integer overflow vulnerability in `HTTP.sys` that allows an unauthenticated, remote attacker to execute arbitrary code.
- **`CVE-2026-44815`** (CVSS 9.8): A stack-based buffer overflow in the Windows DHCP Client Service. An attacker on the same network segment could exploit this to achieve RCE on client machines.

Other notable vulnerabilities include `CVE-2026-42897` and `CVE-2026-45585`, which also pose significant risks.

## Affected Products
This update impacts a wide range of Microsoft products, including but not limited to:
- Microsoft Windows (all supported versions)
- Microsoft Windows Server
- Microsoft Exchange Server
- Microsoft Office and Microsoft 365 Apps
- Microsoft Edge (Chromium-based)
- Microsoft Visual Studio Code
- Windows BitLocker
- Windows Kernel
- Windows DHCP Client
- Windows HTTP.sys
- Windows Collaborative Translation Framework

## Impact Assessment
The primary impact is the significant operational strain on IT and security teams responsible for patch management. The record number of vulnerabilities, including 33 critical ones, requires a rapid and effective triage and deployment strategy. The presence of a "wormable" kernel vulnerability (`CVE-2026-45657`) elevates the risk profile significantly, as a successful exploit could lead to widespread and rapid compromise of an entire network, reminiscent of past incidents like WannaCry. The critical RCEs in `HTTP.sys` and the DHCP Client expose both servers and endpoints to unauthenticated remote attacks, making internet-facing and core network services high-priority targets. Failure to patch these vulnerabilities in a timely manner could result in system compromise, data breaches, denial-of-service, and significant business disruption.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles, as the zero-days were not reported as actively exploited.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for activity related to the exploitation of these vulnerabilities. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Unusual or malformed HTTP/2 requests | Could indicate attempts to exploit `CVE-2026-49160` (HTTP/2 Bomb). Monitor web server logs for high volumes of small `SETTINGS` frames. |
| Network Traffic Pattern | Malformed DHCP packets on network segments | Could suggest attempts to exploit the DHCP Client RCE `CVE-2026-44815`. Monitor for unusual DHCP `OFFER` or `ACK` packets. |
| Process Analysis | Anomalous child processes spawned by `lsass.exe` or kernel-mode processes | May indicate successful privilege escalation or RCE from `CVE-2026-45657` or `CVE-2026-45586`. |
| Log Analysis | Review Windows Event Logs (System, Security) for unexpected crashes or reboots of services | Specifically monitor `HTTP.sys` (`Event ID 15300-15301`), DHCP Client service, and general system instability. |

## Detection & Response
Security teams should focus on both identifying vulnerable systems and detecting exploitation attempts.

1.  **Vulnerability Identification**: Use vulnerability management solutions to scan the environment and identify all systems requiring these critical updates. Prioritize based on exposure (internet-facing) and criticality.
2.  **Network Monitoring**: Implement network monitoring rules to detect anomalous traffic patterns. For `CVE-2026-49160`, monitor for an excessive number of HTTP/2 `SETTINGS` frames sent to web servers. For `CVE-2026-44815`, monitor for unusual DHCP traffic from non-authoritative DHCP servers. This aligns with D3FEND's **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Endpoint Detection and Response (EDR)**: Deploy EDR solutions to monitor for suspicious process behavior. For the kernel vulnerability (`CVE-2026-45657`), look for unusual system calls or kernel-mode activity. For the privilege escalation flaw (`CVE-2026-45586`), monitor for processes gaining higher privileges unexpectedly. This leverages D3FEND's **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
4.  **Log Analysis**: Ingest relevant Windows Event Logs into a SIEM. Correlate network alerts with endpoint logs to identify a potential attack chain. Look for system crashes or service failures that could indicate failed exploitation attempts.

## Mitigation
Immediate patching is the primary mitigation. Organizations should follow a risk-based approach.

1.  **Prioritized Patching**: Apply updates immediately to internet-facing systems (e.g., web servers running IIS, Exchange servers) and critical infrastructure (e.g., Domain Controllers, DHCP servers). This is a direct application of D3FEND's **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Network Segmentation**: As a compensating control, isolate critical systems from general user networks. Restrict access to management interfaces and services. For the DHCP flaw, use DHCP snooping on switches to prevent rogue DHCP servers. This aligns with D3FEND's **[Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
3.  **Physical Security**: For the BitLocker bypass (`CVE-2026-50507`), reinforce physical security controls for laptops and mobile devices, as the exploit requires physical access.
4.  **Web Application Firewall (WAF)**: Deploy a WAF in front of web servers to inspect and filter malicious HTTP/2 traffic, which may help mitigate `CVE-2026-49160` until patches can be applied.

## CVEs
- CVE-2020-17103
- CVE-2026-42897
- CVE-2026-44815 (CVSS 9.8)
- CVE-2026-45585
- CVE-2026-45586 (CVSS 7.8)
- CVE-2026-45657 (CVSS 9.8)
- CVE-2026-47291 (CVSS 9.8)
- CVE-2026-49160 (CVSS 7.5)
- CVE-2026-50507 (CVSS 6.8)

**Tags:** Cybersecurity, Microsoft, Patch Tuesday, RCE, Vulnerability, Windows Kernel, Wormable, Zero-Day

## Sources
- [Microsoft June 2026 Patch Tuesday fixes 3 zero-day, 200 flaws](https://www.bleepingcomputer.com/news/microsoft/microsoft-june-2026-patch-tuesday-fixes-3-zero-day-200-flaws/) (2026-06-09)
- [A Record-Breaking Patch Tuesday for June 2026](https://krebsonsecurity.com/2026/06/a-record-breaking-patch-tuesday-for-june-2026/) (2026-06-09)
- [Record Microsoft Patch Tuesday, fresh zero-day](https://www.helpnetsecurity.com/2026/06/10/microsoft-patch-tuesday-rogueplanet/) (2026-06-10)
- [Microsoft Patches Record 206 Flaws, Including Three Zero-Days and Critical RCE Bugs](https://thehackernews.com/2026/06/microsoft-patches-record-206-flaws.html) (2026-06-10)

---
Source: https://cyber.netsecops.io/articles/microsoft-june-2026-patch-tuesday-fixes-record-200-flaws-and-three-zero-days/
