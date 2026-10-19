# Microsoft's April Patch Tuesday Fixes 164 Flaws, Including Actively Exploited SharePoint Zero-Day

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-04-27 | **Reading time:** 6 min

Microsoft has released its April 2026 Patch Tuesday update, a massive release that fixes 164 vulnerabilities across its product portfolio. The update includes patches for eight critical flaws and two zero-days. One zero-day, a spoofing vulnerability in Microsoft SharePoint Server (CVE-2026-32201), is confirmed to be actively exploited. The second zero-day (CVE-2026-33825) is a publicly disclosed privilege escalation flaw in Microsoft Defender. Other critical fixes address a 9.8 CVSS RCE in the IKE service and an 8.8 CVSS RCE in the Remote Desktop Client.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has released its April 2026 Patch Tuesday security updates, delivering fixes for a substantial 164 new CVEs. This massive update addresses eight vulnerabilities rated as Critical and 154 as Important. Highlighting the urgency of this release, the patches include fixes for two zero-day vulnerabilities. The first, **`CVE-2026-32201`**, is a spoofing vulnerability in **[Microsoft SharePoint Server](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)** that is being actively exploited in the wild. The second, **`CVE-2026-33825`**, is a publicly disclosed privilege escalation flaw in **[Microsoft Defender](https://www.microsoft.com/en-us/security/business/microsoft-defender)**. Additionally, the update mitigates several other critical remote code execution (RCE) risks, including a 9.8 CVSS flaw in the Windows IKE service and a critical bug in the Remote Desktop Client, making this a critical patch cycle for all Windows administrators.

## Vulnerabilities Addressed
This Patch Tuesday is one of the largest in recent memory, underscoring a wide range of threats to the Windows ecosystem.

### Zero-Day Vulnerabilities
*   **`CVE-2026-32201` - Microsoft SharePoint Server Spoofing Vulnerability (CVSS 6.5, Actively Exploited):** This is the most urgent vulnerability to address. An unauthenticated attacker can exploit this flaw to view sensitive information and modify data on a vulnerable SharePoint server. While Microsoft labels it as "spoofing," security experts suggest the impact could be similar to Cross-Site Scripting (XSS), potentially allowing an attacker to execute scripts in a user's browser context, steal authentication tokens, and impersonate the user.
*   **`CVE-2026-33825` - Microsoft Defender Privilege Escalation Vulnerability (CVSS 7.8, Publicly Disclosed):** Also known as "BlueHammer," this flaw was publicly leaked before a patch was available. It allows a local attacker with basic user privileges to execute code with SYSTEM-level permissions. While local access is required, it's a powerful tool for attackers who have gained an initial foothold through other means.

### Critical Vulnerabilities
*   **`CVE-2026-33824` - Windows Internet Key Exchange (IKE) Service Extensions RCE (CVSS 9.8):** This is a network-based, low-complexity RCE vulnerability that requires no user interaction, making it potentially "wormable." A remote, unauthenticated attacker could send a specially crafted IPsec packet to a vulnerable server to achieve code execution.
*   **`CVE-2026-32157` - Remote Desktop Client Use-After-Free RCE (CVSS 8.8):** This vulnerability resides in the RDP client, not the server. An attacker would need to control a malicious RDP server and entice a user to connect to it. If successful, the attacker could achieve RCE on the client's machine.
*   **Other Critical Flaws:** The remaining critical vulnerabilities affect various components, including Windows TCP/IP and other system services, all of which could lead to remote code execution.

### Notable Important Vulnerability
*   **`CVE-2026-27913` - Windows BitLocker Security Feature Bypass:** This vulnerability could allow an attacker with physical access to a device to bypass the Secure Boot feature, potentially leading to the compromise of data encrypted with BitLocker.

## Affected Products
The vulnerabilities span a wide range of Microsoft products, including:
*   Microsoft Windows (all supported versions)
*   Microsoft SharePoint Server
*   Microsoft Defender
*   Windows Internet Key Exchange (IKE) Service
*   Remote Desktop Client
*   Windows BitLocker
*   Microsoft Office
*   Azure components

## Impact Assessment
The impact of this patch cycle is significant due to the sheer volume of fixes and the criticality of the vulnerabilities addressed. The actively exploited SharePoint zero-day (`CVE-2026-32201`) poses an immediate threat to organizations using on-premise SharePoint, potentially leading to data breaches and further network compromise. The critical, wormable RCE in the IKE service (`CVE-2026-33824`) represents a systemic risk to all unpatched Windows systems with the service exposed. Failure to apply these patches in a timely manner leaves organizations exposed to a wide array of attacks, from data theft and privilege escalation to full remote code execution and ransomware deployment.

## Deployment Priority
Patching should be prioritized based on risk and exposure:
1.  **Internet-Facing Systems:** Immediately patch all internet-facing SharePoint servers (`CVE-2026-32201`) and any systems running the IKE service (`CVE-2026-33824`).
2.  **Critical Servers and Workstations:** Deploy patches to all domain controllers, critical application servers, and privileged user workstations to mitigate the Defender LPE (`CVE-2026-33825`) and other RCE flaws.
3.  **General User Population:** Roll out the updates to the general user population to address the RDP client vulnerability and other remaining flaws.

## Installation Instructions
Updates are available via the standard Windows Update, Windows Server Update Services (WSUS), and the Microsoft Update Catalog. Administrators should test the patches in a non-production environment before broad deployment to check for any operational issues. Given the critical nature of these vulnerabilities, the risk of not patching far outweighs the risk of potential patch-related issues for most organizations. Verify successful installation by checking the update history or using a vulnerability management solution to rescan assets.

## Cyber Observables
*   **For `CVE-2026-32201` (SharePoint):** Monitor SharePoint ULS logs and IIS logs for unusual requests, especially those involving script execution or unexpected redirects, which could indicate XSS-like exploitation attempts.
*   **For `CVE-2026-33824` (IKE):** Monitor network traffic on UDP port 500 and 4500 for malformed or anomalous IKE packets from untrusted sources.

## CVEs
- CVE-2026-32201 (CVSS 6.5) — CISA KEV
- CVE-2026-33825 (CVSS 7.8)
- CVE-2026-33824 (CVSS 9.8)
- CVE-2026-32157 (CVSS 8.8)
- CVE-2026-27913
- CVE-2026-33827 (CVSS 8.1)

**Tags:** Patch Tuesday, Microsoft, ZeroDay, SharePoint, RDP, Vulnerability, CVE

## Sources
- [April 2026 Patch Tuesday: Two Zero-Days and Eight Critical Vulnerabilities Among 164 CVEs](https://www.crowdstrike.com/blog/april-2026-patch-tuesday/) — CrowdStrike (2026-04-17)
- [Warning: Microsoft Patch Tuesday April 2026 patches 163 vulnerabilities (8 Critical, 154 Important, 1 Moderate), patch Immediately!!](https://www.ccb.belgium.be/en/warning-microsoft-patch-tuesday-april-2026-patches-163-vulnerabilities-8-critical-154-important) — Centre for Cybersecurity Belgium (2026-04-17)
- [Microsoft Patch Tuesday April 2026: Critical Vulnerabilities, RDP and Secure Boot Zero-Days Impacting Windows Systems](https://www.rescana.com/blogs/microsoft-patch-tuesday-april-2026-critical-vulnerabilities) — Rescana (2026-04-17)
- [20th April – Threat Intelligence Report](https://research.checkpoint.com/2026/04/20/20th-april-threat-intelligence-report/) — Check Point Research (2026-04-18)

---
Source: https://cyber.netsecops.io/articles/microsoft-april-2026-patch-tuesday-addresses-164-cves-and-two-zero-days/
