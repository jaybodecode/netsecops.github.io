# Microsoft's Record September Patch Tuesday Fixes 974 Vulnerabilities

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-09-14 | **Reading time:** 5 min

Microsoft has released its largest-ever Patch Tuesday, addressing 974 CVEs across its product portfolio. The update includes patches for two actively exploited zero-day elevation-of-privilege vulnerabilities, CVE-2026-81963 and CVE-2026-85880. Both flaws, which allow attackers to gain SYSTEM privileges, have been added to CISA's Known Exploited Vulnerabilities (KEV) catalog, mandating urgent patching for federal agencies. The release also fixes 113 critical vulnerabilities, including several 'wormable' RCE bugs in core Windows services.

## Executive Summary
On September 8, 2026, **[Microsoft](https://www.microsoft.com/security)** released its largest security update in history, addressing a total of 974 distinct vulnerabilities in its September Patch Tuesday. The release is headlined by patches for two **critical** zero-day vulnerabilities (**[CVE-2026-81963](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)** and **[CVE-2026-85880](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)**) that were under active exploitation in the wild. Both are elevation-of-privilege (EoP) flaws in **[Microsoft Windows](https://www.microsoft.com/en-us/windows)** that allow a locally authenticated attacker to gain SYSTEM-level permissions. Due to their active exploitation, **[CISA](https://www.cisa.gov)** has added both to its Known Exploited Vulnerabilities (KEV) catalog, requiring federal agencies to patch by September 22, 2026. The update also includes fixes for 113 critical and 860 important vulnerabilities, including several potentially 'wormable' Remote Code Execution (RCE) flaws in Windows DNS Server and other services, making immediate and comprehensive patching a top priority for all organizations.

---

## Vulnerabilities Addressed
The September 2026 Patch Tuesday is unprecedented in scale, with 974 CVEs fixed. The most critical among them are the two actively exploited zero-days:

*   **`CVE-2026-81963`**: An EoP vulnerability in the Windows Update Stack with a CVSS score of 7.8. The flaw arises from an improper link resolution, which a locally authenticated attacker can leverage to execute code with SYSTEM privileges. Its low attack complexity and lack of required user interaction make it a potent tool for post-compromise privilege escalation.
*   **`CVE-2026-85880`**: An EoP vulnerability in the Windows Advanced Local Procedure Call (ALPC) system, also with a CVSS of 7.8. This heap-based buffer overflow allows an attacker who has already achieved code execution, even within a highly restricted AppContainer sandbox, to escape and elevate their privileges to SYSTEM. This is particularly dangerous as it can be chained with browser or application exploits to achieve full system compromise.

Beyond the zero-days, other highly critical vulnerabilities include:

*   **`CVE-2026-69730`**: A use-after-free RCE vulnerability in the Windows DNS Server, rated with a CVSS score of 9.8. This flaw is 'wormable,' meaning it could be used to propagate malware across a network without user interaction. An unauthenticated attacker could exploit it to execute code on a domain controller.
*   **`CVE-2026-69829`**, **`CVE-2026-69595`**, and **`CVE-2026-78510`**: A cluster of critical RCE vulnerabilities (CVSS 9.8) in Windows Shell, Windows Services for NFS, and Microsoft Word, respectively, which could allow for arbitrary code execution.

---

## Affected Products
The vulnerabilities impact a vast array of Microsoft products. Organizations should assume broad exposure and prioritize patching across their entire Microsoft estate. Key affected product families include:

*   **Operating Systems**: All supported versions of Microsoft Windows and Windows Server.
*   **Productivity Software**: Microsoft Office Suite, including Microsoft Word.
*   **Server Applications**: Microsoft SQL Server, Microsoft Exchange Server.
*   **Core Components**: Windows DNS Server, Windows Kerberos, Windows Update Stack, Windows Advanced Local Procedure Call (ALPC).
*   **Developer Tools**

---

## Impact Assessment
The immediate risk is high due to the active exploitation of `CVE-2026-81963` and `CVE-2026-85880`. Threat actors are already using these flaws to escalate privileges after gaining an initial foothold through other means (e.g., phishing, other exploits). The ability to escape sandboxes and gain SYSTEM privileges turns low-impact initial compromises into full system takeovers. The presence of 'wormable' RCEs like the one in the DNS Server (`CVE-2026-69730`) introduces the risk of rapid, self-propagating attacks that could cripple internal networks, similar to past incidents like WannaCry and NotPetya. The sheer volume of patches (974) will strain IT and security teams, increasing the likelihood of gaps in coverage and creating a wide window of opportunity for attackers to exploit unpatched systems.

---

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

Security teams can hunt for post-exploitation activity related to these EoP vulnerabilities. Since they require prior access, hunting should focus on detecting the initial compromise and subsequent privilege escalation attempts.

*   **Monitor ALPC Activity**: Look for anomalous process creation or behavior originating from services that heavily use ALPC. Un-sandboxing events or unexpected processes spawning with SYSTEM privileges from a user-level process could indicate exploitation of `CVE-2026-85880`.
*   **Windows Update Stack Logs**: Examine logs related to the Windows Update service (`C:\Windows\SoftwareDistribution\ReportingEvents.log`) for unusual errors or file operations that could suggest exploitation of `CVE-2026-81963`.
*   **DNS Server Queries**: For `CVE-2026-69730`, monitor DNS server logs for malformed or unusually long queries that could be exploitation attempts. Network traffic analysis may reveal anomalous responses from DNS servers.
*   **Endpoint Detection and Response (EDR) Alerts**: EDR solutions should be configured to alert on processes spawning with elevated privileges from unexpected parent processes (e.g., a browser or Office application spawning `cmd.exe` or `powershell.exe` which then gains SYSTEM rights).

---

## Deployment Priority
Patching should be prioritized based on risk and exposure:

1.  **Internet-Facing Systems**: Any Windows servers exposed to the internet, especially DNS servers, should be patched immediately.
2.  **Critical Servers**: Domain Controllers, Exchange Servers, and SQL Servers are high-value targets and should be next.
3.  **Workstations**: Given the EoP nature of the zero-days, all user workstations should be patched urgently to prevent privilege escalation after a successful phishing attack.
4.  **All Other Systems**: A comprehensive rollout should be completed as quickly as possible, adhering to the CISA deadline of September 22, 2026, as a benchmark.

---

## Remediation Steps
The primary remediation is to apply the September 2026 security updates from Microsoft via Windows Update, WSUS, or the Microsoft Update Catalog. There are no known workarounds for the zero-day vulnerabilities; patching is mandatory.

**Verification:**
After deployment, use vulnerability management tools or run commands on endpoints to verify the patches have been successfully installed. For example, using PowerShell:
```powershell
Get-Hotfix | Where-Object { $_.HotFixID -eq 'KBXXXXXXX' } 
```
(Replace `KBXXXXXXX` with the relevant Knowledge Base article number for your OS version).

As a compensating control, ensure that EDR and antivirus solutions are updated with the latest signatures and behavioral detection rules to help detect and block exploitation attempts against unpatched systems. Restricting user permissions and implementing application control can also limit the impact of a successful EoP exploit.

## CVEs
- CVE-2026-81963 (CVSS 7.8) — CISA KEV
- CVE-2026-85880 (CVSS 7.8) — CISA KEV
- CVE-2026-69730 (CVSS 9.8)
- CVE-2026-69829 (CVSS 9.8)
- CVE-2026-69595 (CVSS 9.8)
- CVE-2026-78510 (CVSS 9.8)
- CVE-2026-69676 (CVSS 8.8)
- CVE-2026-69380 (CVSS 8.1)

**Tags:** Patch Tuesday, Zero-Day, Vulnerability, Microsoft, Windows, Privilege Escalation, RCE

## Sources
- [Microsoft fixes record 964 flaws, including 2 exploited zero-days](https://www.malwarebytes.com/blog/news/2026/09/microsoft-fixes-record-964-flaws-including-2-exploited-zero-days) — Malwarebytes (2026-09-09)
- [CVE-2026-85880 and CVE-2026-81963: Microsoft Patches Two Actively Exploited Windows Zero-Days](https://socprime.com/blog/cve-2026-85880-and-cve-2026-81963-analysis/) — SOC Prime (2026-09-09)
- [Microsoft and Adobe Patch Tuesday, September 2026 Security Update Review](https://blog.qualys.com/vulnerabilities-threat-research/2026/09/08/microsoft-patch-tuesday-september-2026-security-update-review) — Qualys (2026-09-09)
- [Microsoft Patches 974 Bugs, 2 Zero-Days Exploited](https://shattered.io/microsoft-patch-tuesday-974-bugs-2-zero-days-2026/) — Shattered (2026-09-10)

---
Source: https://cyber.netsecops.io/articles/microsoft-september-2026-patch-tuesday-fixes-974-vulnerabilities-two-zero-days/
