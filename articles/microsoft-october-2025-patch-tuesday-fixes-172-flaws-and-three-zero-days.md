# Microsoft Patches 172 Flaws, Including Three Actively Exploited Zero-Days

**Severity:** critical | **Category:** Patch Management,Vulnerability,Security Operations | **Updated:** 2025-10-19 | **Reading time:** 5 min

Microsoft's October 2025 Patch Tuesday update is one of the largest of the year, addressing over 172 vulnerabilities across its product suite. The release is critically important as it includes patches for three zero-day vulnerabilities under active attack. These include an elevation of privilege flaw in the Windows Remote Access Connection Manager (CVE-2025-59230), which has been added to CISA's KEV catalog. Additionally, a highly critical, pre-authentication remote code execution vulnerability (CVE-2025-59287) in the Windows Server Update Service (WSUS) with a 9.8 CVSS score requires immediate attention. The update also marks the final security patch for most versions of Windows 10, pushing organizations towards migration.

## Executive Summary
Microsoft's October 2025 Patch Tuesday is a critical security event, addressing a massive volume of over 172 vulnerabilities. The update's urgency is driven by the active exploitation of three zero-day vulnerabilities, including a privilege escalation flaw (**[CVE-2025-59230](https://www.cve.org/CVERecord?id=CVE-2025-59230)**) added to the **[CISA](https://www.cisa.gov)** KEV catalog. Furthermore, a critical, unauthenticated Remote Code Execution (RCE) vulnerability (**[CVE-2025-59287](https://www.cve.org/CVERecord?id=CVE-2025-59287)**) in the Windows Server Update Service (WSUS) poses a severe risk to enterprise patching infrastructure. This release also signifies the end-of-life for Windows 10 security updates, mandating a strategic shift to Windows 11 for continued protection. Security leaders must prioritize the immediate deployment of these patches, focusing on internet-facing systems, domain controllers, and WSUS servers.

---

## Vulnerability Details
This month's Patch Tuesday addresses a wide array of flaws, but several stand out due to their severity and active exploitation.

### Actively Exploited Zero-Day Vulnerabilities
1.  **[CVE-2025-59230](https://www.cve.org/CVERecord?id=CVE-2025-59230) - Windows Remote Access Connection Manager (RasMan) Elevation of Privilege:** This high-severity (CVSS 7.8) vulnerability allows a local attacker who is already authenticated to elevate their privileges to SYSTEM. This gives an attacker complete control over a compromised machine, making it a valuable link in an attack chain for lateral movement and persistence. Its confirmed use in the wild led CISA to add it to the KEV catalog.

2.  **[CVE-2025-24990](https://www.cve.org/CVERecord?id=CVE-2025-24990) - Agere Modem Driver Elevation of Privilege:** An unusual vulnerability in a legacy third-party modem driver bundled with Windows for two decades. Microsoft's fix was to completely remove the driver (`agrsms.sys`) from the OS, which also remediated a second publicly disclosed flaw, **[CVE-2025-24052](https://www.cve.org/CVERecord?id=CVE-2025-24052)**. This may impact legacy hardware relying on fax modem capabilities.

3.  **[CVE-2025-47827](https://www.cve.org/CVERecord?id=CVE-2025-47827) - IGEL OS Secure Boot Bypass:** This flaw affects the Linux-based **[IGEL OS](https://www.igel.com/)** used in thin client environments. A Secure Boot bypass allows an attacker to load an untrusted operating system or kernel, subverting a fundamental platform security control.

### Critical RCE Vulnerability
**[CVE-2025-59287](https://www.cve.org/CVERecord?id=CVE-2025-59287) - Windows Server Update Service (WSUS) Remote Code Execution:** This is arguably the most critical vulnerability patched this month. With a CVSS score of 9.8, it allows a remote, unauthenticated attacker to execute arbitrary code on a WSUS server. As WSUS servers are highly trusted and have privileged access to distribute updates across an entire enterprise network, their compromise could lead to a catastrophic supply chain attack within an organization.

---

## Affected Systems
-   **Operating Systems:** Windows 10 (all versions, final update), Windows 11, Windows Server (multiple versions)
-   **Services:** Windows Server Update Service (WSUS), Windows Remote Access Connection Manager (RasMan)
-   **Drivers:** Agere Modem Driver (now removed)
-   **Applications:** Microsoft Office, Microsoft Excel
-   **Cloud Services:** Azure Compute Gallery

## Impact Assessment
-   **WSUS Compromise:** An attacker exploiting **[CVE-2025-59287](https://www.cve.org/CVERecord?id=CVE-2025-59287)** could gain full control of a WSUS server. This would allow them to push malicious updates to all clients, effectively compromising the entire network in a single stroke. This represents a critical internal supply chain risk.
-   **Privilege Escalation:** The exploitation of **[CVE-2025-59230](https://www.cve.org/CVERecord?id=CVE-2025-59230)** allows attackers who have already gained an initial foothold (e.g., via phishing) to escalate to full administrative rights, bypassing security controls and establishing persistence.
-   **Windows 10 End of Life:** Organizations still running Windows 10 will no longer receive security updates, leaving them permanently vulnerable to any new flaws discovered after this patch. This creates significant compliance and security risks.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| file_name | `agrsms.sys` | The legacy Agere modem driver file. Its presence on systems post-patching indicates a failed update. |
| process_name | `svchost.exe -k netsvcs` | The parent process for RasMan. Monitor for anomalous child processes or network connections originating from it, which could indicate exploitation of CVE-2025-59230. |
| url_pattern | `/ClientWebService/client.asmx` | A common endpoint for WSUS. Monitor web logs on WSUS servers for unusual or malformed requests to this and other WSUS-related URLs. |
| event_id | `4688` | (Windows Security Log) Monitor for suspicious process creation events where a low-privileged user spawns a process running with SYSTEM integrity, potentially indicating successful privilege escalation. |

## Detection & Response
-   **Vulnerability Scanning:** Run authenticated scans against all Windows assets to identify missing patches for the October update, prioritizing the detection of the vulnerabilities listed above.
-   **EDR/SIEM Queries:**
    -   Hunt for command-line activity related to the RasMan service (`RasMan`) or processes running under its parent `svchost.exe` instance that exhibit suspicious behavior (e.g., executing `powershell.exe` or `cmd.exe`).
    -   Create alerts for any external network connections to your WSUS servers on ports `8530` or `8531` that do not originate from known Microsoft IP ranges or upstream WSUS servers.
-   **Log Analysis ([D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)):** Analyze web server logs (e.g., IIS logs) on WSUS servers. Look for anomalous requests, large POST bodies, or requests from untrusted internal or external IP addresses, which could indicate exploitation attempts against **[CVE-2025-59287](https://www.cve.org/CVERecord?id=CVE-2025-59287)**.

## Mitigation
-   **Patch Immediately ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)):** The primary mitigation is to apply the October 2025 security updates across all affected Windows systems. Prioritize patching based on risk: 1) WSUS Servers, 2) Internet-facing systems, 3) Domain Controllers and other critical servers, 4) Workstations.
-   **WSUS Hardening:** Restrict network access to WSUS servers. There should be no reason for these servers to be accessible from the internet. Limit access to only necessary client subnets and upstream update servers.
-   **Migrate from Windows 10:** Develop and execute a plan to migrate all remaining Windows 10 endpoints to Windows 11 to ensure continued security patching.
-   **Privileged Access Management:** Implement least privilege principles to limit the impact of privilege escalation vulnerabilities like **[CVE-2025-59230](https://www.cve.org/CVERecord?id=CVE-2025-59230)**. Standard users should not have local administrative rights.

## CVEs
- CVE-2025-24990 (CVSS 7.8) — CISA KEV
- CVE-2025-59230 (CVSS 7.8) — CISA KEV
- CVE-2025-47827 (CVSS 4.6) — CISA KEV
- CVE-2025-24052 (CVSS 7.8)
- CVE-2025-59287 (CVSS 9.8)

**Tags:** Patch Tuesday, Zero-Day, RCE, EoP, Windows 10, Windows 11, WSUS, CISA, KEV

## Sources
- [Microsoft patches three zero-days actively exploited by attackers](https://www.helpnetsecurity.com/2025/10/15/microsoft-patch-tuesday-october-2025-zero-days/) — Help Net Security (2025-10-15)
- [Patch Tuesday, October 2025 'End of 10' Edition](https://krebsonsecurity.com/2025/10/patch-tuesday-october-2025-end-of-10-edition/) — Krebs on Security (2025-10-14)
- [Microsoft and Adobe Patch Tuesday, October 2025 Security Update Review](https://blog.qualys.com/vulnerabilities-threat-research/2025/10/16/microsoft-and-adobe-patch-tuesday-october-2025-security-update-review) — Qualys (2025-10-16)
- [CISA Alerts on Actively Exploited Windows Improper Access Control Flaw](https://gbhackers.com/cisa-alerts-on-actively-exploited-windows-improper-access-control-flaw/) — GBHackers (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/microsoft-october-2025-patch-tuesday-fixes-172-flaws-and-three-zero-days/
