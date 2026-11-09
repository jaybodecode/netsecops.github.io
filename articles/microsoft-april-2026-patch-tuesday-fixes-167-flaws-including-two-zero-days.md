# Microsoft's Colossal April 2026 Patch Tuesday: 167 Flaws Patched, Two Zero-Days Under Fire

**Severity:** critical | **Category:** Patch Management,Vulnerability,Cyberattack | **Updated:** 2026-04-20 | **Reading time:** 5 min

Microsoft has released one of its largest security updates ever for April 2026, patching 167 vulnerabilities across its product ecosystem. The update is critically important, as it addresses two zero-day vulnerabilities: an actively exploited spoofing flaw in SharePoint Server (CVE-2026-32201) which has been added to CISA's KEV catalog, and a publicly disclosed privilege escalation flaw in Microsoft Defender (CVE-2026-33825). The update also fixes eight critical vulnerabilities, including a near-perfect CVSS 9.8 RCE flaw in the Windows IKE Service (CVE-2026-33824), underscoring the urgent need for organizations to apply these patches immediately.

## Executive Summary
Microsoft's April 2026 Patch Tuesday is one of the most substantial security updates in recent history, addressing 167 distinct vulnerabilities. The update includes patches for eight critical flaws and, most notably, two zero-day vulnerabilities. The first, **[CVE-2026-32201](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)**, is a spoofing vulnerability in **[Microsoft SharePoint Server](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)** that is being actively exploited in the wild. The second, **CVE-2026-33825**, is a privilege escalation flaw in **[Microsoft Defender](https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint)** that was publicly disclosed before a patch was available. A record 57% of the patched flaws were for elevation of privilege, highlighting a significant focus area for attackers. Given the active exploitation and public disclosure, organizations are urged to prioritize the deployment of these updates to mitigate immediate risks.

---

## Vulnerabilities Addressed
This month's update is extensive, covering a wide range of products including Microsoft Windows, Office, .NET Framework, and Active Directory. The two zero-days represent the most immediate threat.

### Actively Exploited SharePoint Spoofing Vulnerability (CVE-2026-32201)
- **CVE ID:** `CVE-2026-32201`
- **CVSS Score:** 6.5 (Medium)
- **Description:** A spoofing vulnerability exists in Microsoft SharePoint Server due to improper input validation. An unauthenticated, remote attacker can exploit this to perform a spoofing attack, potentially tricking users into trusting malicious content or revealing sensitive information. The attack vector allows an adversary to modify some sensitive information within the SharePoint environment.
- **Exploitation Status:** Confirmed active exploitation in the wild. **[CISA](https://www.cisa.gov)** has added this to its Known Exploited Vulnerabilities (KEV) catalog, with a remediation deadline of April 28, 2026, for federal agencies.

### Publicly Disclosed Defender Privilege Escalation (CVE-2026-33825)
- **CVE ID:** `CVE-2026-33825`
- **CVSS Score:** 7.8 (High)
- **Description:** A privilege escalation vulnerability in the Microsoft Defender anti-malware platform. A locally authenticated attacker can exploit this flaw to gain SYSTEM-level privileges, enabling them to disable security controls, install persistent malware, or take full control of the host. An exploit for this vulnerability, known as "BlueHammer," was published on GitHub prior to the patch release.
- **Exploitation Status:** Publicly disclosed, with PoC exploit code available. Microsoft notes that Defender typically updates automatically, mitigating risk for many users.

### Critical Remote Code Execution Vulnerabilities
Among the eight critical vulnerabilities, two are particularly concerning:
- **`CVE-2026-33824` (CVSS 9.8):** A remote code execution (RCE) vulnerability in the Windows Internet Key Exchange (IKE) Service. An unauthenticated attacker could send a specially crafted IP packet to a target machine, potentially leading to remote code execution.
- **`CVE-2026-33827` (CVSS 8.1):** A race condition vulnerability in the Windows TCP/IP stack that could also lead to RCE.

---

## Impact Assessment
The active exploitation of **CVE-2026-32201** poses a direct threat to organizations using on-premise SharePoint servers for collaboration and document management. A successful spoofing attack could lead to phishing, credential theft, or the distribution of malware within a trusted corporate environment. The business impact could range from data leakage to significant operational disruption if users are deceived by malicious content.

The public availability of the **BlueHammer** exploit for **CVE-2026-33825** significantly increases the risk of post-compromise privilege escalation. Attackers who have already gained an initial foothold can use this flaw to quickly achieve full system control, bypassing security measures and establishing a persistent presence. This is a critical link in the attack chain for ransomware and APT groups.

## Cyber Observables for Detection
Security teams should hunt for signs of exploitation related to these vulnerabilities:

| Type | Value | Description |
|---|---|---|
| Log Source | SharePoint ULS Logs | Monitor for unusual or malformed requests that could indicate attempts to exploit `CVE-2026-32201`. |
| Process Execution | `powershell.exe` or `cmd.exe` spawning from Defender processes | Suspicious child processes from `MsMpEng.exe` could indicate exploitation of `CVE-2026-33825`. |
| Network Traffic | Unusual traffic on UDP port 500/4500 | Monitor for malformed IKE packets targeting the Windows IKE service related to `CVE-2026-33824`. |
| EDR/Endpoint Logs | `MsMpEng.exe` crashes or restarts | Instability in the Defender service could be a sign of exploitation attempts. |

## Deployment Priority
1.  **Internet-Facing SharePoint Servers:** These are the highest priority and must be patched immediately to defend against active exploitation of `CVE-2026-32201`.
2.  **All Windows Endpoints and Servers:** The Microsoft Defender patch for `CVE-2026-33825` should be verified. While automatic updates should handle this, manual verification is prudent, especially on critical assets.
3.  **VPN Servers and Perimeter Devices:** Systems running the Windows IKE service must be patched to prevent RCE attacks via `CVE-2026-33824`.
4.  **All Other Systems:** A phased rollout should be completed as quickly as possible, prioritizing critical servers and then general user workstations.

## Mitigation and Remediation
**Immediate Actions:**
1.  **Apply Patches:** The primary mitigation is to apply the April 2026 security updates from Microsoft immediately. Use Windows Update, WSUS, or your standard patch management solution.
2.  **Verify Defender Updates:** For `CVE-2026-33825`, ensure Microsoft Defender anti-malware platform and engine versions are up-to-date. This typically happens automatically but should be confirmed.
3.  **Monitor Logs:** Increase monitoring of SharePoint and Windows logs for any signs of anomalous activity, especially related to the observables listed above.

**Strategic Recommendations:**
- **Reduce Attack Surface:** Restrict access to SharePoint management interfaces and limit exposure of the Windows IKE service to trusted networks only. This is a key D3FEND hardening technique.
- **Assume Breach:** Hunt for evidence of post-compromise activity. The availability of the BlueHammer exploit means attackers may already be inside your network looking to elevate privileges.
- **Review Privilege Model:** The high number of privilege escalation flaws patched this month reinforces the need for least-privilege access controls and robust privileged account management (PAM) solutions.

## CVEs
- CVE-2026-32201 (CVSS 6.5)
- CVE-2026-33825 (CVSS 7.8)
- CVE-2026-33824 (CVSS 9.8)
- CVE-2026-33827 (CVSS 8.1)
- CVE-2026-23666
- CVE-2026-32157
- CVE-2026-32190
- CVE-2026-33114
- CVE-2026-33826

**Tags:** Patch Tuesday, Zero-Day, Microsoft, SharePoint, Microsoft Defender, CVE-2026-32201, CVE-2026-33825, CISA, KEV

## Sources
- [Microsoft April 2026 Patch Tuesday fixes 167 flaws, 2 zero-days](https://www.bleepingcomputer.com/news/microsoft/microsoft-april-2026-patch-tuesday-fixes-167-flaws-2-zero-days/) — BleepingComputer
- [Microsoft Patches Exploited SharePoint Zero-Day and 160 Other Vulnerabilities](https://www.securityweek.com/microsoft-patches-exploited-sharepoint-zero-day-and-160-other-vulnerabilities/) — SecurityWeek
- [Microsoft Issues Patches for SharePoint Zero-Day and 168 Other New Vulnerabilities](https://thehackernews.com/2026/04/microsoft-issues-patches-for-sharepoint.html) — The Hacker News
- [April Patch Tuesday fixes two-zero-days, including one under active attack](https://blog.malwarebytes.com/threat-intelligence/2026/04/april-patch-tuesday-fixes-two-zero-days-including-one-under-active-attack/) — Malwarebytes

---
Source: https://cyber.netsecops.io/articles/microsoft-april-2026-patch-tuesday-fixes-167-flaws-including-two-zero-days/
