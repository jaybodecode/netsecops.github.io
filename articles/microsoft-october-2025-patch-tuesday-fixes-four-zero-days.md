# Patch Now: Microsoft Fixes 170+ Flaws, Including Four Actively Exploited Zero-Days

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2025-10-25 | **Reading time:** 5 min

Microsoft has released its October 2025 Patch Tuesday update, a massive release fixing over 170 security vulnerabilities across its product ecosystem. The update is critical for all users, as it contains patches for four zero-day vulnerabilities that are being actively exploited in the wild. Two of these flaws, CVE-2025-24990 and CVE-2025-59230, allow for local privilege escalation to Administrator or SYSTEM rights. CISA has added the exploited vulnerabilities to its KEV catalog, mandating urgent patching for federal agencies.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)**'s October 2025 Patch Tuesday is one of the largest in recent memory, addressing over 170 vulnerabilities, including nine rated as critical. The urgency of this update is underscored by the inclusion of patches for four zero-day vulnerabilities confirmed to be under active exploitation. The most severe of these are two privilege escalation flaws: **[CVE-2025-24990](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-24990)** (CVSS 7.8) in a legacy Windows modem driver and **[CVE-2025-59230](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59230)** (CVSS 7.8) in the Windows Remote Access Connection Manager (RasMan). Both can be used by an attacker with local access to gain elevated system privileges. A third exploited flaw, **[CVE-2025-47827](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-47827)**, is a Secure Boot bypass related to a vulnerable IGEL OS component. **[CISA](https://www.cisa.gov)** has added these three to its Known Exploited Vulnerabilities (**[KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)**) catalog, requiring federal agencies to patch by November 4, 2025. All organizations are strongly advised to prioritize the deployment of these critical updates to prevent exploitation.

---

## Vulnerabilities Addressed
This month's release is extensive, but the primary focus is on the actively exploited zero-days. Attackers are leveraging these flaws in attack chains to take full control of compromised systems.

### Actively Exploited Zero-Day Vulnerabilities:
- **[CVE-2025-24990](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-24990)** - **Windows Agere Modem Driver Elevation of Privilege (CVSS 7.8):** A flaw in the legacy `ltmdm64.sys` driver, which is shipped with all versions of Windows. A local attacker can exploit this to gain administrator privileges. Microsoft's fix involves removing this outdated driver.
- **[CVE-2025-59230](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59230)** - **Windows RasMan Elevation of Privilege (CVSS 7.8):** A vulnerability in the Remote Access Connection Manager that allows a local attacker to escalate to SYSTEM-level rights. This is the first time a RasMan flaw has been seen exploited as a zero-day.
- **[CVE-2025-47827](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-47827)** - **IGEL OS Secure Boot Bypass (CVSS 4.6):** A flaw in IGEL OS that was trusted by Microsoft's Secure Boot. The update revokes the trust for the vulnerable component, preventing a bypass of the Secure Boot security feature.
- A fourth, undisclosed zero-day was also patched.

### Other Critical Vulnerabilities:
- **[CVE-2025-59287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59287)** - **Windows Server Update Service (WSUS) RCE (CVSS 9.8):** A critical remote code execution vulnerability in WSUS that could be leveraged for devastating supply-chain attacks, allowing an attacker to push malicious updates to clients.
- **[CVE-2025-59234](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59234)** & **[CVE-2025-59236](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59236)** - **Microsoft Office/Excel RCE:** Remote code execution flaws that can be triggered by opening a malicious document.
- **[CVE-2025-49708](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-49708)** - **Microsoft Graphics Component EoP:** A critical elevation of privilege flaw that can be exploited over the network.

---

## Affected Products
The vulnerabilities impact a wide range of Microsoft products, including but not limited to:
- All supported versions of **[Microsoft Windows](https://www.microsoft.com/en-us/windows)** and Windows Server
- **[Microsoft Office](https://www.microsoft.com/en-us/microsoft-365/office)** and Excel
- Windows Server Update Service (WSUS)
- Azure Container Instances and Azure Compute Gallery
- Microsoft Graphics Component
- Windows Remote Access Connection Manager (RasMan)

---

## Impact Assessment
The active exploitation of four zero-days makes this a high-risk patch cycle. The privilege escalation vulnerabilities (**[CVE-2025-24990](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-24990)** and **[CVE-2025-59230](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59230)**) are particularly dangerous. Threat actors, including ransomware groups, often use such flaws after gaining an initial foothold (e.g., via phishing) to escalate their privileges and take full control of a device and the network. The Secure Boot bypass (**[CVE-2025-47827](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-47827)**) undermines a fundamental platform security feature, allowing attackers to load unsigned, malicious code during the boot process. The critical WSUS vulnerability (**[CVE-2025-59287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59287)**) poses a systemic risk, as a compromise could lead to a widespread supply chain attack within an organization.

---

## Cyber Observables for Detection
To hunt for exploitation of these vulnerabilities pre-patch, security teams can look for the following:

| Type | Value | Description |
|---|---|---|
| `file_name` | `ltmdm64.sys` | The vulnerable Agere modem driver. Monitor for any processes accessing or loading this driver, as it is legacy hardware. The patch removes it. |
| `process_name` | `svchost.exe -k netsvcs -p` | The process hosting the RasMan service. Monitor for anomalous child processes or network connections originating from it. |
| `event_id` | `4688` | Windows Security Event ID for Process Creation. Monitor for suspicious command lines or processes being spawned by unusual parent processes. |
| `log_source` | `Microsoft-Windows-CodeIntegrity/Operational` | Windows Event Log for Code Integrity. Look for events related to Secure Boot policy or boot failures which might indicate bypass attempts. |
| `registry_key` | `HKLM\SYSTEM\CurrentControlSet\Services\RasMan` | Monitor for unauthorized modifications to the RasMan service configuration. |

---

## Deployment Priority
Given the active exploitation, a risk-based patching priority is essential.

1.  **Critical Priority (Patch within 72 hours):** All workstations and servers. The privilege escalation flaws affect nearly all Windows systems and are being used now. Internet-facing servers are also at high risk.
2.  **High Priority (Patch within 1 week):** WSUS servers. The **[CVE-2025-59287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59287)** flaw is critical and a compromise would be catastrophic.
3.  **Medium Priority (Patch within standard cycle):** Internal servers and other less-critical systems.

Federal agencies must adhere to the November 4, 2025, deadline set by CISA for the KEV-listed vulnerabilities.

---

## Installation Instructions
Deploy the October 2025 security updates via standard channels:
- **Windows Update:** For individual users and small businesses.
- **Windows Server Update Services (WSUS):** For managed enterprise environments.
- **Microsoft Update Catalog:** For manual download and deployment.

It is recommended to test the updates in a pilot group before broad deployment to identify any potential operational issues. After deployment, use vulnerability management tools to verify that the patches have been successfully applied and the vulnerabilities are remediated.

## CVEs
- CVE-2025-24990 (CVSS 7.8) — CISA KEV
- CVE-2025-59230 (CVSS 7.8) — CISA KEV
- CVE-2025-47827 (CVSS 4.6) — CISA KEV
- CVE-2025-59287 (CVSS 9.8)
- CVE-2025-59234
- CVE-2025-59236
- CVE-2025-49708
- CVE-2025-59291
- CVE-2025-59292

**Tags:** Patch Tuesday, Microsoft, Zero-Day, Vulnerability, CVE-2025-24990, CVE-2025-59230, CVE-2025-47827, Privilege Escalation, KEV, CISA

## Sources
- [Two New Windows Zero-Days Exploited in the Wild — One Affects Every Version Ever Shipped](https://www.thehackernews.com/2025/10/two-new-windows-zero-days-exploited-in.html) — The Hacker News (2025-10-15)
- [Microsoft and Adobe Patch Tuesday, October 2025 Security Update Review](https://blog.qualys.com/vulnerabilities-threat-research/2025/10/16/microsoft-and-adobe-patch-tuesday-october-2025-security-update-review) — Qualys (2025-10-16)
- [Microsoft Patch Tuesday – October 2025](https://www.lansweeper.com/patch-tuesday/microsoft-patch-tuesday-october-2025/) — Lansweeper (2025-10-14)
- [Microsoft Patch Tuesday October 2025: 4 Zero-Days and 172 Vulnerabilities Fixed](https://www.bleepingcomputer.com/news/microsoft/microsoft-october-2025-patch-tuesday-fixes-4-zero-days-172-vulnerabilities/) — BleepingComputer (2025-10-15)

---
Source: https://cyber.netsecops.io/articles/microsoft-october-2025-patch-tuesday-fixes-four-zero-days/
