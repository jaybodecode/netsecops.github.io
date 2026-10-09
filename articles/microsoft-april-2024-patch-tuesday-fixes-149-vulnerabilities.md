# Microsoft Unleashes Massive April 2024 Patch Tuesday, Fixing 149 Flaws Including Critical RCEs

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-03-12 | **Reading time:** 4 min

Microsoft has released its April 2024 Patch Tuesday update, a substantial release addressing 149 vulnerabilities across its product portfolio. Of these, three are rated as critical: a remote code execution (RCE) flaw in Microsoft SQL Server (CVE-2024-21422), a Windows Secure Boot bypass (CVE-2024-29053), and an RCE in the Microsoft RPC runtime (CVE-2024-21323). The update also covers numerous important-rated flaws in Windows, Office, Azure, and Dynamics 365. Given the volume and criticality of the fixes, organizations are urged to prioritize deployment of these updates to protect against potential exploitation.

## Executive Summary
[**Microsoft**](https://www.microsoft.com/security) has released a very large security update for its April 2024 Patch Tuesday, addressing a total of **149 vulnerabilities**. This extensive patch set covers a wide range of products, including [**Windows**](https://www.microsoft.com/en-us/windows), [**Microsoft SQL Server**](https://www.microsoft.com/en-us/sql-server), [**Office**](https://www.microsoft.com/en-us/microsoft-365), and [**Azure**](https://azure.microsoft.com/). Among the fixes, three vulnerabilities are rated as Critical, the highest severity level. These include remote code execution (RCE) flaws that could allow attackers to take control of affected systems. While none of the vulnerabilities were listed as actively exploited at the time of release, the sheer number and severity of the flaws make this a high-priority patch cycle for all system administrators.

---

## Vulnerabilities Addressed
This month's update is one of the largest in recent memory. While the majority are rated 'Important', the three 'Critical' vulnerabilities demand immediate attention:

- **[CVE-2024-21422](https://nvd.nist.gov/vuln/detail/CVE-2024-21422)** - **Microsoft SQL Server Remote Code Execution Vulnerability**: A critical flaw that could allow a remote, unauthenticated attacker to execute arbitrary code on a vulnerable SQL server. Details on the attack vector are limited, but it likely involves sending a specially crafted network packet or query.

- **[CVE-2024-29053](https://nvd.nist.gov/vuln/detail/CVE-2024-29053)** - **Windows Secure Boot Security Feature Bypass Vulnerability**: This vulnerability could allow an attacker to bypass the Secure Boot feature, which is designed to ensure that a device boots using only software that is trusted by the OEM. A successful exploit could enable an attacker to load a malicious or untrusted operating system, bootkit, or kernel-level malware.

- **[CVE-2024-21323](https://nvd.nist.gov/vuln/detail/CVE-2024-21323)** - **Microsoft Remote Procedure Call (RPC) Runtime Remote Code Execution Vulnerability**: This flaw in the RPC runtime could be exploited by a remote attacker to achieve RCE on a target system. RPC vulnerabilities have historically been a popular target for worms and network-based attacks.

In addition to these, the update patches 146 'Important' and 'Moderate' vulnerabilities, including numerous privilege escalation, spoofing, and information disclosure flaws across the Microsoft ecosystem.

## Affected Products
- Microsoft Windows and Windows Components
- Microsoft Office and Office Components
- Azure
- Microsoft SQL Server
- Microsoft Dynamics 365
- Windows Secure Boot
- Microsoft RPC

## Impact Assessment
- The RCE flaw in **SQL Server** is particularly dangerous as it could lead to a complete compromise of a database server, resulting in a massive data breach.
- The **Secure Boot bypass** is a serious threat to platform integrity, undermining a fundamental hardware-based security control and allowing for stealthy, persistent malware (bootkits).
- The **RPC RCE** vulnerability raises concerns of a potential 'wormable' exploit that could spread rapidly across networks, similar to past threats like Blaster and Conficker.

The large number of privilege escalation flaws also poses a significant risk, as they can be used by attackers who have already gained an initial foothold to elevate their access to administrator level.

## Deployment Priority
Given the critical nature of the RCEs and the Secure Boot bypass, a risk-based patching strategy should be adopted:
1.  **Critical Priority (Patch within 72 hours)**: Internet-facing systems, especially those running SQL Server. Domain Controllers and other critical infrastructure servers.
2.  **High Priority (Patch within one week)**: All other servers and privileged user workstations.
3.  **Medium Priority (Patch within 30 days)**: General user workstations.

Organizations should leverage Windows Update, WSUS, or their enterprise patch management solution to deploy these updates.

## Installation Instructions
- Updates are available via the standard Microsoft distribution channels: Windows Update, Windows Server Update Services (WSUS), and the Microsoft Update Catalog.
- It is recommended to test the updates on a small, non-production set of systems first to check for any compatibility issues before rolling them out to the entire environment.
- After deployment, use a vulnerability scanner to verify that the patches have been successfully applied and the vulnerabilities are remediated.

## CVEs
- CVE-2024-21422
- CVE-2024-29053
- CVE-2024-21323

**Tags:** Patch Tuesday, Microsoft, Vulnerability, RCE, SQL Server, Secure Boot, Windows

## Sources
- [Microsoft April 2024 Patch Tuesday fixes 149 flaws, 3 critical](https://www.bleepingcomputer.com/news/microsoft/microsoft-april-2024-patch-tuesday-fixes-149-flaws-3-critical/) — BleepingComputer
- [Patch Tuesday: Microsoft Plugs 149 Holes, Including Critical SQL Flaw](https://www.securityweek.com/patch-tuesday-microsoft-plugs-149-holes-including-critical-sql-flaw/) — SecurityWeek

---
Source: https://cyber.netsecops.io/articles/microsoft-april-2024-patch-tuesday-fixes-149-vulnerabilities/
