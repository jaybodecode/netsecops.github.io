# Microsoft August Patch Tuesday Fixes 400+ Flaws, Zero-Day

**Severity:** critical | **Category:** Patch Management,Vulnerability,Threat Actor | **Updated:** 2026-08-15 | **Reading time:** 5 min

Microsoft's August 2026 Patch Tuesday addresses over 400 vulnerabilities, including 42 rated critical. The update patches an actively exploited zero-day (CVE-2026-68820), a privilege escalation flaw in afd.sys used by the North Korea-linked Lazarus Group. Administrators are urged to prioritize patching to mitigate significant risks.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has released its August 2026 Patch Tuesday update, addressing a staggering volume of over 400 security vulnerabilities across its product portfolio, including **Windows**, Azure, Exchange, and SharePoint. The update includes patches for at least 42 critical flaws. The most pressing issue is the remediation of **[CVE-2026-68820](https://nvd.nist.gov/vuln/detail/CVE-2026-68820)**, a high-severity privilege escalation vulnerability that was actively exploited in the wild as a zero-day prior to the patch's release. This flaw has been linked to the North Korean state-sponsored threat actor, the **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, and is used to gain SYSTEM-level privileges on compromised machines. Given the active exploitation and the critical nature of many of the fixed vulnerabilities, organizations are strongly advised to apply these updates immediately.

---

## Vulnerability Details

### Actively Exploited Zero-Day: CVE-2026-68820
- **Description**: A use-after-free vulnerability in the Windows Ancillary Function Driver for WinSock (`afd.sys`), a core kernel-mode component.
- **Impact**: A locally authenticated attacker can execute a specially crafted application to trigger a race condition, leading to privilege escalation to `SYSTEM`.
- **CVSS Score**: 7.0 (High). The score reflects that an attacker must first have a low-privilege foothold on the target system.
- **Exploitation**: Researchers at **Check Point** have attributed the exploitation of this zero-day to the **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**. It was used in their "Operation Dream Job" campaign to deploy a new version of the `FudModule` kernel-mode rootkit. This rootkit allows the attackers to maintain persistence, escalate privileges, and disable EDR solutions ([T1562.001](https://attack.mitre.org/techniques/T1562/001/)).

### Publicly Disclosed Vulnerabilities
- **[CVE-2026-62832](https://nvd.nist.gov/vuln/detail/CVE-2026-62832)**: A privilege escalation flaw in the Windows User Profile Service. Microsoft notes this is "more likely to be exploited."
- **[CVE-2026-72971](https://nvd.nist.gov/vuln/detail/CVE-2026-72971)**: A low-impact tampering vulnerability in the Windows Container Isolation FS Filter Driver.

### Other Critical Vulnerabilities
- **[CVE-2026-62878](https://nvd.nist.gov/vuln/detail/CVE-2026-62878)**: A potentially wormable stack-based buffer overflow in Windows DNS Server that could lead to remote code execution.

---

## Affected Systems
- **Products**: A wide range of Microsoft products are affected, including but not limited to:
  - Windows Operating Systems (all supported versions)
  - Microsoft Azure
  - Microsoft Exchange Server
  - Microsoft SharePoint Server
  - Microsoft Office

---

## Impact Assessment
The primary risk is the active exploitation of **[CVE-2026-68820](https://nvd.nist.gov/vuln/detail/CVE-2026-68820)**. An attacker with initial access, perhaps gained through phishing or another vulnerability, can use this flaw to gain full control over a system. For organizations in the defense and aerospace sectors targeted by the Lazarus Group, this represents a severe and immediate threat. The ability to disable EDR solutions makes detection of subsequent malicious activity extremely difficult. The large number of other critical vulnerabilities, including a potentially wormable RCE in DNS, means that unpatched systems are exposed to a wide array of attack vectors, from remote takeover to denial of service.

## Cyber Observables — Hunting Hints
The following patterns may help identify systems where exploitation of CVE-2026-68820 might have occurred:

| Type | Value | Description |
|---|---|---|
| Process Name | `svchost.exe` | Look for `svchost.exe` processes with unexpected parent processes or those making unusual network connections, as this is a common target for injection after privilege escalation. |
| Event ID | `4688` | Monitor for processes being created with `SYSTEM` integrity from user-level parent processes. |
| File Name | `FudModule.sys` | Search for the presence of this rootkit file or related artifacts on disk and in memory. |
| Registry Key | `HKLM\SYSTEM\CurrentControlSet\Services` | Hunt for newly created or modified service entries that point to suspicious executables or drivers. |

## Detection Methods
- **EDR/AV**: Ensure endpoint security solutions are up-to-date. While the FudModule rootkit attempts to disable EDR, a fully updated and well-configured EDR may still detect the initial exploit activity or subsequent actions.
- **Log Analysis ([D3-PA](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))**: Analyze Windows Security Event Logs for signs of privilege escalation. Specifically, monitor for Event ID `4672` (Special privileges assigned to new logon) occurring for user accounts that should not have administrative rights.
- **Threat Hunting**: Proactively hunt for TTPs associated with the **[Lazarus Group](https://attack.mitre.org/groups/G0032/)**, such as the use of specific C2 frameworks, living-off-the-land binaries, and the `FudModule` rootkit indicators.

## Remediation Steps
1.  **Prioritize Patching ([D3-SU](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))**: Prioritize the deployment of the August 2026 security updates, starting with **[CVE-2026-68820](https://nvd.nist.gov/vuln/detail/CVE-2026-68820)**. Focus on internet-facing systems, domain controllers, and then all other workstations and servers.
2.  **Use a Risk-Based Approach**: Given the large number of patches, use a risk-based approach. Focus on the exploited zero-day, the publicly disclosed vulnerabilities, and the critical RCE flaws first.
3.  **Review Privileged Accounts**: Audit and limit the number of accounts with local administrative privileges. This contains the impact of privilege escalation vulnerabilities by reducing the number of accounts an attacker can use to gain an initial foothold.

## CVEs
- CVE-2026-68820 (CVSS 7) — CISA KEV
- CVE-2026-62832
- CVE-2026-72971
- CVE-2026-62878

**Tags:** Patch Tuesday, Zero-Day, Lazarus Group, Privilege Escalation, afd.sys

## Sources
- [Microsoft Plugs Nearly 400 Security Holes](https://krebsonsecurity.com/2026/08/microsoft-plugs-nearly-400-security-holes/) — Krebs on Security (2026-08-11)
- [August 2026 Patch Tuesday: Microsoft Fixes 421 CVEs, One Exploited Zero-Day](https://www.securityweek.com/august-2026-patch-tuesday-microsoft-fixes-421-cves-one-exploited-zero-day/) — SecurityWeek (2026-08-11)
- [Shattering the Dream - When a Job Offer Becomes a Zero-Day Attack](https://research.checkpoint.com/2026/shattering-the-dream-when-a-job-offer-becomes-a-zero-day-attack/) — Check Point Research (2026-08-11)
- [Microsoft patches 400+ vulnerabilities, one zero-day under attack (CVE-2026-68820)](https://www.helpnetsecurity.com/2026/08/12/august-2026-patch-tuesday-cve-2026-68820/) — Help Net Security (2026-08-12)

---
Source: https://cyber.netsecops.io/articles/microsoft-august-2026-patch-tuesday-fixes-400-flaws-and-zero-day/
