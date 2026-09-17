# CISA Adds Actively Exploited Cisco and Acronis Flaws to KEV Catalog

**Severity:** high | **Category:** Vulnerability,Regulatory,Patch Management | **Updated:** 2026-09-17 | **Reading time:** 3 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added two actively exploited vulnerabilities to its KEV catalog. The flaws, a critical authentication bypass in Cisco's Identity Services Engine (CVE-2026-76460) and an incorrect permissions flaw in Acronis Backup (CVE-2026-87886), now require remediation by U.S. federal agencies under a binding directive.

## Executive Summary
On September 16, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** took action to address two significant vulnerabilities being actively exploited in the wild by adding them to its Known Exploited Vulnerabilities (KEV) catalog. The additions are **[CVE-2026-76460](https://www.cisa.gov/news-events/alerts/2026/09/16/cisa-adds-two-known-exploited-vulnerabilities-catalog)**, a CVSS 10.0 authentication bypass in **[Cisco](https://www.cisco.com)** Identity Services Engine (ISE), and **CVE-2026-87886**, an incorrect default permissions vulnerability in **[Acronis](https://www.acronis.com/)** Backup. This action triggers Binding Operational Directive (BOD) 26-04, which mandates that Federal Civilian Executive Branch (FCEB) agencies must remediate these flaws within a specified timeframe to protect federal networks from active threats.

---

## Regulatory Details
The KEV catalog is a cornerstone of **[CISA](https://www.cisa.gov)**'s strategy to focus defensive efforts on vulnerabilities that pose the most immediate risk. A vulnerability is added to the catalog only when there is reliable evidence of active exploitation. Under BOD 26-04, once a flaw is added, FCEB agencies are given a specific deadline to apply patches or mitigations.

For the newly added vulnerabilities:
- **CVE-2026-76460 (Cisco ISE)**: A critical flaw allowing a complete authentication bypass. Due to its severity, FCEB agencies are required to apply patches by September 19, 2026.
- **CVE-2026-87886 (Acronis Backup)**: An incorrect default permissions flaw. The specific remediation deadline for this vulnerability was also set by CISA to drive prompt action.

While the directive is only mandatory for FCEB agencies, CISA strongly urges all public and private sector organizations to review the KEV catalog and prioritize the remediation of these vulnerabilities to reduce their exposure to active cyber threats.

## Affected Organizations
The primary group mandated to act are U.S. **[Federal Civilian Executive Branch (FCEB)](https://www.whitehouse.gov/omb/information-for-agencies/memoranda/)** agencies. However, the inclusion of these vulnerabilities serves as a strong advisory for all organizations, including state and local governments, critical infrastructure operators, and private companies globally. Any organization using the affected **[Cisco](https://www.cisco.com)** or **[Acronis](https://www.acronis.com/)** products is at risk and should prioritize remediation.

## Compliance Requirements
For FCEB agencies, compliance with BOD 26-04 is not optional. They must take the following actions:
1.  **Identify**: Identify all affected assets on their networks.
2.  **Remediate**: Apply the vendor-supplied patches by the CISA-mandated deadline.
3.  **Report**: Report the status of remediation back to CISA through established channels.

The directive also requires agencies to check for signs of system compromise before applying patches and to take appropriate incident response measures if a breach is suspected.

## Implementation Timeline
- **CVE-2026-76460**: Remediation deadline is **September 19, 2026**.
- **CVE-2026-87886**: Remediation deadline is **October 7, 2026**.

These tight deadlines reflect the high risk associated with actively exploited vulnerabilities, especially for a flaw as critical as the Cisco ISE authentication bypass.

## Impact Assessment
By maintaining the KEV catalog, **[CISA](https://www.cisa.gov)** helps organizations move beyond a purely CVSS-based vulnerability management model to a threat-informed approach. Prioritizing KEVs allows security teams to focus limited resources on the flaws that are actively being used by adversaries, significantly reducing the organization's attack surface and the likelihood of a successful breach. For federal agencies, adherence to the directive is a key metric of their cybersecurity posture and resilience.

## Compliance Guidance
All organizations, not just federal agencies, should incorporate the KEV catalog into their vulnerability management programs.

1.  **Subscribe to Updates**: Regularly monitor the KEV catalog for new additions. CISA provides automated feeds for this purpose.
2.  **Prioritize Patching**: When a vulnerability present in your environment is added to the KEV, it should be elevated to the highest priority for patching, overriding standard schedules.
3.  **Enhance Monitoring**: For systems that cannot be patched immediately, implement enhanced monitoring and compensating controls to detect and block exploitation attempts. This aligns with D3FEND's **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
4.  **Assume Breach**: When patching a KEV, especially on an internet-facing system, it is prudent to hunt for signs of compromise, as the system may have been breached before the patch was applied.

## CVEs
- CVE-2026-76460 (CVSS 10) — CISA KEV
- CVE-2026-87886 — CISA KEV

**Tags:** CISA, KEV, BOD 26-04, vulnerability management, patching, federal government

## Sources
- [CISA Adds Two Known Exploited Vulnerabilities to Catalog](https://www.cisa.gov/news-events/alerts/2026/09/16/cisa-adds-two-known-exploited-vulnerabilities-catalog) — CISA (2026-09-16)
- [Cisco Warns of New Zero-Day ISE Auth Bypass (CVSS 10.0) Exploited in Active Attacks](https://thehackernews.com/2026/09/cisco-warns-of-new-zero-day-ise-auth.html) — The Hacker News (2026-09-17)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-cisco-acronis-flaws-to-kev-catalog/
