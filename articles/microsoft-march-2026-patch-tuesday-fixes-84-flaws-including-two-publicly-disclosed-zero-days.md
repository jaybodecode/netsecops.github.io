# Microsoft's March Patch Tuesday Fixes 84 Flaws, Including Two Publicly Known Zero-Days

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-03-08 | **Reading time:** 5 min

Microsoft has released its March 2026 security updates, addressing a total of 84 vulnerabilities across its product portfolio, including Windows, Office, Azure, and SQL Server. The update includes patches for eight critical flaws, primarily involving remote code execution and elevation of privilege. While none of the vulnerabilities were actively exploited at the time of release, two were publicly disclosed, increasing the urgency for remediation. These include a critical elevation of privilege bug in SQL Server (CVE-2026-21262) and a denial-of-service flaw in .NET (CVE-2026-26127). The patches cover a wide range of products, with elevation of privilege flaws representing the largest category of fixes.

## Executive Summary
Microsoft's March 2026 Patch Tuesday addresses 84 CVEs, including eight rated as critical. The release is notable for fixing two publicly disclosed vulnerabilities: **[CVE-2026-21262](https://nvd.nist.gov/vuln/detail/CVE-2026-21262)**, a critical elevation of privilege flaw in **[SQL Server](https://www.microsoft.com/en-us/sql-server)**, and **[CVE-2026-26127](https://nvd.nist.gov/vuln/detail/CVE-2026-26127)**, a denial-of-service vulnerability in **[.NET](https://dotnet.microsoft.com/)**. Although no active exploitation was reported at the time of release, the public nature of these two flaws requires immediate attention. The patches cover a broad spectrum of products, with 56% of the fixes addressing elevation of privilege vulnerabilities. Key critical flaws include a 9.8 CVSS RCE in Microsoft Devices Pricing Program and multiple RCEs in Microsoft Office that can be triggered via the Preview Pane.

## Vulnerability Details
This month's security update addresses 84 vulnerabilities, broken down as follows:
- 8 Critical
- 76 Important

The vulnerability types are dominated by Elevation of Privilege (46), followed by Remote Code Execution (16), and Information Disclosure (10).

### Publicly Disclosed Vulnerabilities:
- **`CVE-2026-21262`**: An 8.8 CVSS critical elevation of privilege vulnerability in SQL Server. An authenticated attacker with low privileges could exploit this flaw over the network to gain `sysadmin` rights, achieving complete control over the database. This is due to an improper access control weakness.
- **`CVE-2026-26127`**: A 7.5 CVSS denial-of-service (DoS) vulnerability in .NET 9 and 10. A remote, unauthenticated attacker could crash an application by sending a malformed request that triggers an out-of-bounds read in the Base64Url decoding logic. Microsoft assesses exploitation as unlikely.

### Critical Remote Code Execution Vulnerabilities:
- **`CVE-2026-21536`**: A 9.8 CVSS RCE in the Microsoft Devices Pricing Program. This flaw allows an unauthenticated attacker to execute arbitrary code via an unrestricted file upload. Microsoft has proactively remediated this in its cloud infrastructure.
- **`CVE-2026-26110` & `CVE-2026-26113`**: Two 8.4 CVSS RCEs in Microsoft Office. These are particularly dangerous as they can be exploited through the Preview Pane, meaning a user does not need to open the malicious file to be compromised. `CVE-2026-26110` is a type confusion issue, while `CVE-2026-26113` is an untrusted pointer dereference.

## Affected Systems
- **Operating Systems**: Microsoft Windows
- **Applications**: Microsoft Office, Microsoft Excel
- **Developer Platforms**: .NET, Hyper-V
- **Cloud Services**: Azure, Microsoft Devices Pricing Program, Payment Orchestrator Service
- **Databases**: SQL Server

## Impact Assessment
The most significant risk stems from the publicly disclosed SQL Server vulnerability (**`CVE-2026-21262`**), which could allow a low-privileged user to completely compromise a database server. This poses a severe threat to data integrity, confidentiality, and availability. The Office RCEs (**`CVE-2026-26110`**, **`CVE-2026-26113`**) also present a high risk, as they lower the bar for exploitation through simple user interaction like previewing a file. While Microsoft has patched the critical RCE in its cloud service, on-premise and unmanaged systems remain a concern. The information disclosure flaw in Excel (**`CVE-2026-26144`**) involving Copilot highlights the emerging attack surface of AI-assisted tools, potentially enabling zero-click data exfiltration.

## Cyber Observables for Detection
- **Monitor SQL Server Logs**: Look for unusual authentication patterns or privilege escalation attempts from low-privileged accounts, particularly any activity related to `sysadmin` role changes that do not align with standard administrative actions. Check for connections from unexpected network segments.
- **Monitor .NET Application Logs**: For applications using .NET 9/10, monitor for application crashes or exceptions related to Base64Url decoding. Unexplained process terminations could indicate attempted exploitation of `CVE-2026-26127`.
- **File Integrity Monitoring**: On web servers hosting applications like the Microsoft Devices Pricing Program, monitor for unexpected file uploads to web-accessible directories. Rules should be in place to detect and alert on the creation of executable file types (`.aspx`, `.php`, `.jsp`).
- **Endpoint Detection (EDR)**: For Office RCEs, monitor for child processes spawned by Office applications (`WINWORD.EXE`, `EXCEL.EXE`, `OUTLOOK.EXE`) that are unusual, such as `cmd.exe` or `powershell.exe`, especially when initiated from the Preview Pane feature.

## Detection & Response
1. **Vulnerability Scanning**: Immediately scan all environments for the presence of the vulnerabilities addressed in this update, prioritizing the critical and publicly disclosed CVEs.
2. **SIEM/EDR Rule Implementation**: 
   - Create detection rules for the SQL Server privilege escalation. Monitor Windows Event ID `4672` (Special privileges assigned to new logon) for unexpected assignments to SQL Server service accounts.
   - Implement rules to detect Office applications spawning suspicious child processes. This can be mapped to [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/).
3. **Threat Hunting**: Proactively hunt for signs of exploitation. For SQL Server, query audit logs for failed login attempts followed by a successful login from the same source IP with a different, low-privileged account. For Office, hunt for recently created or modified files with suspicious extensions in user directories that were accessed via Outlook's Preview Pane.

## Mitigation
1. **Patch Immediately**: The primary mitigation is to apply the March 2026 security updates as soon as possible. Prioritize patching for internet-facing systems, SQL Servers, and workstations with Microsoft Office.
2. **Principle of Least Privilege**: For **`CVE-2026-21262`**, enforce the principle of least privilege for all database accounts. Restrict network access to SQL servers to only authorized application servers and administrative hosts. This is a core component of [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
3. **Disable Preview Pane**: As a temporary measure until patching is complete, consider disabling the Preview Pane in Microsoft Outlook and Windows Explorer to mitigate the risk from **`CVE-2026-26110`** and **`CVE-2026-26113`**. This can be done via Group Policy.
4. **Web Application Firewall (WAF)**: For web-facing applications, use a WAF to inspect and block malicious file uploads, which could help mitigate vulnerabilities like **`CVE-2026-21536`**.

## CVEs
- CVE-2026-21536 (CVSS 9.8)
- CVE-2026-26125 (CVSS 8.6)
- CVE-2026-26110 (CVSS 8.4)
- CVE-2026-26113 (CVSS 8.4)
- CVE-2026-21262 (CVSS 8.8)
- CVE-2026-26127 (CVSS 7.5)
- CVE-2026-26144 (CVSS 7.5)

**Tags:** Patch Tuesday, Microsoft, Vulnerability, RCE, Elevation of Privilege, Zero-Day, SQL Server, Microsoft Office

## Sources
- [March 2026 Patch Tuesday: Updates and Analysis | CrowdStrike](https://www.crowdstrike.com/blog/march-2026-patch-tuesday/) — CrowdStrike (2026-03-08)
- [Microsoft March Patch Tuesday: 8 Critical Bulletins and 2 Zero-Days - Redmondmag.com](https://redmondmag.com/articles/2026/03/10/microsoft-march-patch-tuesday.aspx) — Redmond Magazine (2026-03-08)
- [Microsoft's March 2026 Patch Tuesday Updates Fix 8 Critical Vulnerabilities](https://petri.com/microsofts-march-2026-patch-tuesday-updates-fix-8-critical-vulnerabilities) — Petri (2026-03-08)

---
Source: https://cyber.netsecops.io/articles/microsoft-march-2026-patch-tuesday-fixes-84-flaws-including-two-publicly-disclosed-zero-days/
