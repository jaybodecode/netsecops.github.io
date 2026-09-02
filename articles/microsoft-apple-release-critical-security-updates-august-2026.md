# Microsoft & Apple Patch Critical Flaws, Including CVSS 10.0 Bugs

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-08-16 | **Reading time:** 5 min

Microsoft and Apple released a wave of security updates, with Microsoft addressing over a dozen vulnerabilities, including three with a perfect 10.0 CVSS score. The critical flaws affect Azure, Microsoft Teams, and Planetary Computer Pro, allowing for remote exploitation. Other 9.9-rated bugs were fixed in Azure Service Bus and Active Directory. Apple patched a significant authentication bypass (CVE-2026-65400) in macOS Screen Sharing. Google also contributed, fixing 41 flaws in Chrome 151. Organizations are urged to apply these patches immediately.

## Executive Summary

On August 6-7, 2026, **[Microsoft](https://www.microsoft.com/security)** and **[Apple](https://support.apple.com/en-us/HT201222)** released a significant set of security updates addressing numerous high-severity vulnerabilities across their product lines. **Microsoft** patched a slate of flaws, most notably three with a maximum CVSS score of 10.0: **`CVE-2026-63508`** in Planetary Computer Pro, **`CVE-2026-56162`** in Azure SQL Database, and **`CVE-2026-65667`** in Microsoft Teams. These vulnerabilities could allow for remote, unauthenticated privilege escalation. Four additional flaws rated 9.9 were also fixed in Azure and Active Directory. **Apple** addressed **`CVE-2026-65400`**, a 7.5 CVSS score vulnerability in macOS that could allow an attacker to bypass Screen Sharing authentication. Given the critical nature of these vulnerabilities, organizations are strongly advised to prioritize the deployment of these patches to all affected systems.

---

## Vulnerability Details

### Microsoft Vulnerabilities
**Microsoft**'s updates addressed a wide range of products, with the most severe vulnerabilities allowing for remote code execution (RCE) or elevation of privilege (EoP).

**CVSS 10.0 Vulnerabilities:**
- **`CVE-2026-63508`**: A missing authentication vulnerability in Microsoft Planetary Computer Pro that could lead to privilege escalation.
- **`CVE-2026-56162`**: An improper authentication issue in Azure SQL Database, allowing for privilege escalation.
- **`CVE-2026-65667`**: A missing authorization vulnerability in Microsoft Teams. **Microsoft** patched this on the server-side, so no end-user action is required.

**CVSS 9.9 Vulnerabilities:**
- **`CVE-2026-50515`**: A remote code execution (RCE) vulnerability in Azure Service Bus.
- **`CVE-2026-62830`**: An elevation of privilege (EoP) vulnerability in Azure SRE Agent.
- **`CVE-2026-59115`**: An elevation of privilege (EoP) vulnerability in Microsoft Entra Provisioning Service.
- **`CVE-2026-50481`**: An elevation of privilege (EoP) vulnerability in Active Directory.

### Apple Vulnerability
- **`CVE-2026-65400`** (CVSS 7.5): An authentication bypass vulnerability in the Screen Sharing feature of macOS. A remote attacker on the same network could potentially gain access to a user's screen without providing valid credentials.

### Google Vulnerability
- **Chrome 151**: **[Google](https://www.google.com)** released an update for its Chrome browser fixing 41 flaws, including six critical use-after-free vulnerabilities.

---

## Affected Systems

- **Microsoft:**
  - Microsoft Azure (multiple services including SQL Database, Service Bus, SRE Agent)
  - Microsoft Teams
  - Microsoft Planetary Computer Pro
  - Microsoft Entra Provisioning Service
  - Active Directory
  - SharePoint
- **Apple:**
  - macOS Tahoe (versions before 26.6.1)
  - macOS Sequoia (versions before 15.7.9)
  - macOS Sonoma (versions before 14.8.9)
- **Google:**
  - Google Chrome (versions before 151)

---

## Exploitation Status

The source articles do not state that any of these specific vulnerabilities are being actively exploited in the wild. However, given their severity, particularly the CVSS 10.0 and 9.9 flaws, exploitation is highly likely in the near future. Proof-of-concept (PoC) code will almost certainly be developed by security researchers and threat actors.

---

## Impact Assessment

The impact of these vulnerabilities, if exploited, is severe. The **Microsoft** flaws rated 10.0 and 9.9 could grant attackers complete control over affected cloud services or on-premise servers, leading to data theft, service disruption, and lateral movement across corporate networks. The **Apple** vulnerability, while lower in severity, could lead to the compromise of sensitive information displayed on a user's screen and could be used as a stepping stone for further attacks within a network. Organizations that rely heavily on these ecosystems are at high risk until patches are applied.

---

## Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Azure Activity Logs | Monitor for anomalous authentication or provisioning events related to Azure SQL, Service Bus, and Entra that could indicate exploitation attempts. | Azure Monitor, Microsoft Sentinel | medium |
| port | 5900 | Monitor for unusual or unauthorized connection attempts to port 5900 (VNC/Screen Sharing) on macOS devices. | Network traffic logs, endpoint firewall logs | medium |
| process_name | `screensharingd` | On macOS, look for unexpected child processes or network connections originating from the `screensharingd` process. | EDR logs | medium |
| log_source | Active Directory logs | Monitor for unusual privilege escalation events or modifications related to service accounts. | Windows Event Logs (Security) | medium |

---

## Detection Methods

1.  **Vulnerability Scanners:** Use vulnerability management tools to scan internal and external assets for the presence of these vulnerabilities. Ensure scanner plugins are updated to detect the specific CVEs.
2.  **Asset Inventory:** Maintain an accurate inventory of all software and operating system versions to quickly identify all systems affected by the **Apple** and **Google** patches.
3.  **Cloud Configuration Review:** For the Azure vulnerabilities, use cloud security posture management (CSPM) tools to audit configurations and detect signs of misconfiguration or compromise related to the affected services.
4.  **Log Analysis:** Proactively hunt for indicators of exploitation in Azure, Active Directory, and macOS logs, focusing on authentication and privilege escalation events. This aligns with D3FEND's **[`Domain Account Monitoring (D3-DAM)`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.

---

## Remediation Steps

Immediate patching is the primary remediation for these vulnerabilities.

1.  **Microsoft Updates:** Apply the August 2026 security updates from **Microsoft** as soon as possible, prioritizing critical systems, internet-facing servers, and domain controllers. The Teams vulnerability (**`CVE-2026-65667`**) is patched server-side and requires no action.
2.  **Apple Updates:** Update all affected macOS devices to macOS Tahoe 26.6.1, macOS Sequoia 15.7.9, or macOS Sonoma 14.8.9.
3.  **Google Chrome Update:** Ensure all instances of Google Chrome are updated to version 151 or later.
4.  **Verification:** After deploying patches, use vulnerability scanners to verify that the vulnerabilities have been successfully remediated.
5.  **Workarounds:** If patching is not immediately possible for the macOS flaw, consider disabling Screen Sharing service on vulnerable machines as a temporary mitigation. This is a form of **[`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

## CVEs
- CVE-2026-50481 (CVSS 9.9)
- CVE-2026-50515 (CVSS 9.9)
- CVE-2026-56162 (CVSS 10)
- CVE-2026-59115 (CVSS 9.9)
- CVE-2026-62830 (CVSS 9.9)
- CVE-2026-63508 (CVSS 10)
- CVE-2026-65400 (CVSS 7.5)
- CVE-2026-65667 (CVSS 10)

**Tags:** Active Directory, Apple, Azure, CVE, Google, Microsoft, Patch Management, Vulnerability, macOS

## Sources
- [Microsoft, Apple Release Fresh Security Updates](https://www.securityweek.com/microsoft-apple-release-fresh-security-updates/)
- [August 2026 Patch Tuesday forecast: How do we deal with the patch apocalypse?](https://www.helpnetsecurity.com/2026/08/07/august-2026-patch-tuesday-forecast/)
- [Cyber Security News for August 7 2026 - Daily DefSec Brief](https://www.youtube.com/watch?v=GHYXM5kqWmE)
- [August 2026 Early security update: 10 critical vulnerabilities amid 20 CVEs](https://feedly.com/cve/security-advisories/microsoft/2026-08-06-august-2026-early-security-update-10-critical-vulnerabilities-amid-20-cves)

---
Source: https://cyber.netsecops.io/articles/microsoft-apple-release-critical-security-updates-august-2026/
