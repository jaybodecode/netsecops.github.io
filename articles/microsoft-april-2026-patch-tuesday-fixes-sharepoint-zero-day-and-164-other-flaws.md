# Microsoft's Massive April Patch Tuesday Fixes Actively Exploited SharePoint Zero-Day and 164 Other Flaws

**Severity:** medium | **Category:**  | **Updated:** 2026-04-22 | **Reading time:** 5 min

Microsoft's April 2026 Patch Tuesday release was one of its largest ever, addressing 165 vulnerabilities across its product suite. The most urgent fix targets CVE-2026-32201, a SharePoint Server spoofing vulnerability that was actively exploited in the wild prior to the patch. CISA has added the flaw to its KEV catalog, mandating a swift response. The update also includes patches for eight critical remote code execution vulnerabilities, including a potentially 'wormable' bug in the Windows TCP/IP stack, making this a high-priority update for all organizations.

## Executive Summary
Microsoft's April 2026 Patch Tuesday is one of the most significant security updates in recent history, addressing a total of **165 vulnerabilities**. The centerpiece of this release is a patch for **[CVE-2026-32201](https://www.cve.org/CVERecord?id=CVE-2026-32201)**, a spoofing vulnerability in **[Microsoft SharePoint Server](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)** that was under active exploitation before the fix became available. Due to its in-the-wild exploitation, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has added it to its Known Exploited Vulnerabilities (KEV) catalog, underscoring the urgency for immediate patching. The update also remediates eight other critical flaws, including multiple remote code execution (RCE) vulnerabilities in core Windows components like the TCP/IP stack and Internet Key Exchange (IKE) service. Given the scale of the update and the presence of an actively exploited zero-day, security teams must prioritize the deployment of these patches to mitigate significant risk.

---

## Vulnerability Details
This month's Patch Tuesday addresses a wide array of flaws, with the most notable being:

*   **CVE-2026-32201 - Microsoft SharePoint Server Spoofing Vulnerability (CVSS 6.5, Actively Exploited):** This is the most critical issue this month. It's a spoofing vulnerability resulting from improper input validation. An unauthenticated attacker can exploit this flaw over a network to view and modify sensitive information. Security researchers note that such flaws in SharePoint often manifest as cross-site scripting (XSS) attacks, allowing an attacker to execute malicious scripts in the context of a victim's browser.

*   **CVE-2026-33827 - Windows TCP/IP Remote Code Execution Vulnerability (CVSS 8.1, Critical):** This is a potentially "wormable" vulnerability. A remote, unauthenticated attacker could execute arbitrary code without any user interaction on systems where both IPv6 and IPSec are enabled. The potential for self-propagation across a network makes this extremely dangerous.

*   **CVE-2026-33824 - Windows Internet Key Exchange (IKE) Service Extensions Remote Code Execution Vulnerability (CVSS 9.8, Critical):** This flaw in the Windows IKE service, which is used for VPN connections, could allow an unauthenticated attacker to achieve RCE on an affected server. This poses a severe risk to network perimeter security.

*   **CVE-2026-33825 - Microsoft Defender Elevation of Privilege Vulnerability (CVSS 7.8, Publicly Disclosed):** This vulnerability was publicly disclosed and had a proof-of-concept exploit named "BlueHammer" published on GitHub prior to the patch. While exploitation may be unreliable, the public availability of the code increases the risk of attacks aiming to gain higher privileges on a compromised system.

## Affected Systems
The vulnerabilities impact a broad range of **[Microsoft](https://www.microsoft.com/security)** products, with the most critical flaws affecting:
- **Microsoft SharePoint Server**
- **Windows TCP/IP Stack** (on systems with IPv6 and IPSec enabled)
- **Windows Internet Key Exchange (IKE) Service Extensions**
- **Microsoft Defender**
- **Windows Active Directory**
- **Windows Remote Desktop**

## Exploitation Status
**[CISA](https://www.cisa.gov)** has confirmed that **CVE-2026-32201** is being actively exploited in the wild. As a result, it has been added to the KEV catalog, with a directive for U.S. federal agencies to apply the patch by April 28, 2026. Additionally, **CVE-2026-33825** has been publicly disclosed with an available PoC, increasing its likelihood of exploitation.

## Impact Assessment
The business impact of these vulnerabilities is severe. Exploitation of **CVE-2026-32201** could lead to data theft, modification of sensitive corporate information stored on SharePoint sites, and phishing campaigns launched from a trusted internal platform. A successful attack on **CVE-2026-33827** or **CVE-2026-33824** could result in a full system compromise, allowing attackers to deploy ransomware, exfiltrate data, or establish a persistent foothold for lateral movement within the corporate network. The "wormable" nature of the TCP/IP flaw presents a catastrophic risk of a widespread, automated outbreak similar to past incidents like WannaCry.

## Cyber Observables for Detection
Security teams should hunt for the following indicators:
| Type | Value | Description |
|---|---|---|
| url_pattern | `/_layouts/` or `/pages/` with suspicious script tags | Potential SharePoint XSS attempts related to CVE-2026-32201. |
| log_source | SharePoint ULS Logs & IIS Logs | Monitor for anomalous requests, especially those resulting in 401/403 errors followed by a success, or requests containing script-like syntax. |
| network_traffic_pattern | Unusual outbound traffic from SharePoint servers | Could indicate data exfiltration or C2 communication post-compromise. |
| event_id | `5156` (Windows Filtering Platform) | Monitor for anomalous connections related to the IKE service (UDP port 500/4500) or unusual IPv6 traffic. |
| process_name | `MpOAV.exe` or `MsMpEng.exe` | Monitor for unexpected child processes or crashes related to Microsoft Defender, which could indicate exploitation of CVE-2026-33825. |

## Detection & Response
1.  **Vulnerability Scanning:** Immediately run authenticated vulnerability scans against all Windows assets to identify systems missing the April 2026 updates, prioritizing SharePoint servers.
2.  **Log Analysis (D3-NTA: Network Traffic Analysis):** Scrutinize web server logs for internet-facing SharePoint servers for any unusual requests, especially those containing HTML or JavaScript syntax in URL parameters. Monitor firewall and VPN logs for anomalous IKE traffic patterns.
3.  **Endpoint Detection and Response (EDR):** Deploy EDR queries to hunt for signs of privilege escalation related to Microsoft Defender processes. Look for `MsMpEng.exe` spawning suspicious child processes like `powershell.exe` or `cmd.exe`.
4.  **Threat Hunting:** Proactively hunt for evidence of XSS on SharePoint sites by reviewing recently modified pages and web parts for injected scripts.

## Mitigation
1.  **Patch Immediately (D3-SU: Software Update):** The highest priority is to apply the April 2026 security updates to all internet-facing **[Microsoft SharePoint Server](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)** instances to remediate **CVE-2026-32201**. Follow immediately with patches for servers running IKE and other critical systems.
2.  **Network Segmentation (D3-NI: Network Isolation):** Restrict access to SharePoint management interfaces and other critical services. Ensure that IKE/IPSec endpoints are only accessible from trusted IP ranges.
3.  **Web Application Firewall (WAF):** If patching is delayed, configure WAF rules to inspect and block suspicious requests to SharePoint containing patterns indicative of XSS or other injection attacks. This is a compensating control, not a replacement for patching.
4.  **Disable Unnecessary Services (D3-ACH: Application Configuration Hardening):** If IPv6 is not required on specific systems, consider disabling it to reduce the attack surface for **CVE-2026-33827**. This should be carefully tested to avoid operational disruption.

---
Source: https://cyber.netsecops.io/articles/microsoft-april-2026-patch-tuesday-fixes-sharepoint-zero-day-and-164-other-flaws/
