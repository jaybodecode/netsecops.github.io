# Oracle's July 2026 CPU Delivers a Record 1,449 Security Patches

**Severity:** critical | **Category:** Patch Management,Vulnerability | **Updated:** 2026-07-28 | **Reading time:** 5 min

Oracle has released its July 2026 Critical Patch Update (CPU), an unprecedented release containing 1,449 new security patches for 1,235 unique CVEs across 32 product families. This is a nearly fivefold increase from the previous year's update. The Oracle E-Business Suite received the most fixes at 410. Among the vulnerabilities is CVE-2026-60880, a critical 9.8 CVSS flaw in the Work in Process module that allows for remote takeover. Due to the increasing volume, Oracle is also introducing a new monthly patching cadence to supplement the quarterly CPUs, urging customers to prioritize these updates.

## Executive Summary
On July 21, 2026, **[Oracle](https://www.oracle.com/)** released its July 2026 Critical Patch Update (CPU), a historically massive security release that addresses 1,449 new vulnerabilities across its extensive product portfolio. The update resolves 1,235 unique CVEs, with 261 patches rated as critical. The sheer volume of fixes, nearly five times that of the previous year's equivalent update, underscores a significant increase in vulnerability discovery and reporting, partly attributed to AI-powered code analysis. The **Oracle E-Business Suite** was the most patched product. A standout vulnerability is **`CVE-2026-60880`**, a CVSS 9.8 flaw allowing remote takeover of a key module. In response to this scale, Oracle announced a new parallel monthly patching cycle, signaling a major shift in its security update strategy.

## Vulnerability Details
The July 2026 CPU is notable for both its size and the severity of the flaws addressed. Many of the vulnerabilities are remotely exploitable without authentication, posing a severe risk to organizations.

-   **Total Patches**: 1,449 new security patches.
-   **Unique CVEs**: 1,235.
-   **Critical Patches (CVSS 9.0-10.0)**: 261 patches for 228 CVEs (18% of total).
-   **High Severity Patches (CVSS 7.0-8.9)**: Constituted 52.7% of the release.

One of the most severe vulnerabilities highlighted is:
-   **`CVE-2026-60880`**: A critical (CVSS 9.8) vulnerability in the Work in Process module of the Oracle E-Business Suite. This flaw can be exploited by an unauthenticated attacker with network access, potentially leading to a complete takeover of the targeted component.

## Affected Systems
The patches span 32 different Oracle product families. Key affected products include:

-   **Oracle E-Business Suite**: Received the highest number of patches (410, or 28.3% of the total).
-   **Oracle Database Server**: A core product with numerous critical fixes.
-   **Oracle SQL Developer**: Patches address flaws in this widely used database IDE.
-   **Oracle Coherence**: Fixes for the in-memory data grid product.
-   **TimesTen In-Memory Database**: Vulnerabilities addressed in the high-performance database.

Given the broad range of affected products, nearly all Oracle customers are impacted and must review the advisory to determine their specific exposure.

## Exploitation Status
While the advisory does not specify if any of the 1,235 CVEs are actively exploited in the wild, the presence of numerous remotely exploitable, no-authentication-required vulnerabilities means that exploitation is highly likely. Threat actors routinely reverse-engineer patches to develop exploits, making rapid deployment critical. Organizations like **[NHS England](https://digital.nhs.uk/)** have issued alerts emphasizing the urgency of applying these updates.

## Impact Assessment
Failing to apply these patches exposes organizations to significant risk, including data breaches, system takeovers, and severe business disruption. A successful exploit of a critical vulnerability like `CVE-2026-60880` in the E-Business Suite could allow an attacker to manipulate financial data, steal sensitive information, or disrupt core business processes. The sheer number of patches presents a major operational challenge for IT and security teams, requiring careful planning and prioritization. The introduction of a new monthly patching cadence, while intended to be more agile, will require organizations to adapt their vulnerability management programs to a more frequent update cycle.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Port | 1521/TCP | Default Oracle DB listener port. Scans targeting this port may indicate reconnaissance for vulnerable database instances. |
| URL Pattern | `/OA_HTML/` | Common path for Oracle E-Business Suite web components. Unusual requests to this path could indicate exploit attempts. |
| File Path | `ORACLE_HOME/` | Monitor for unauthorized modifications to files within the Oracle installation directory, which could indicate a successful compromise. |
| Log Source | Oracle Audit Vault and Database Firewall logs | Look for failed login attempts or execution of suspicious PL/SQL packages against critical databases. |

## Detection Methods
-   **Vulnerability Scanning**: Use authenticated scans from vendors like **[Tenable](https://www.tenable.com/)** to accurately identify vulnerable Oracle product versions across the environment.
-   **Version Checking**: Manually check the versions of installed Oracle products against the detailed list in the CPU advisory to identify affected systems.
-   **Log Analysis**: Monitor database and application logs for anomalous activity, such as connections from untrusted IP addresses or unusual SQL queries, which could indicate an attempted or successful exploit. Utilize **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to detect suspicious network connections to database servers.

## Remediation Steps
1.  **Prioritize Patching**: Focus first on patching internet-facing systems, followed by critical internal systems like the E-Business Suite and core databases. Use the CVSS scores to guide prioritization, addressing the 261 critical patches first.
2.  **Apply Updates**: Follow Oracle's documentation to apply the relevant patches for your specific products and versions. The CPU advisory provides detailed information on affected components and patch availability.
3.  **Test Patches**: Before deploying to production, test patches in a non-production environment to ensure they do not cause operational issues.
4.  **Implement Compensating Controls**: If patching cannot be done immediately, implement compensating controls such as restricting network access to vulnerable systems, enhancing monitoring, and using a Web Application Firewall (WAF) to block exploit attempts. This aligns with **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

## CVEs
- CVE-2026-60880 (CVSS 9.8)
- CVE-2026-60217

**Tags:** Oracle, Patch Tuesday, Vulnerability, CVE, Critical Patch Update, E-Business Suite, Database Security

## Sources
- [Critical Patch Update for July 2026 Now Available](https://blogs.oracle.com/ebstech/critical-patch-update-for-july-2026-now-available) — Oracle (2026-07-22)
- [27th July – Threat Intelligence Report](https://research.checkpoint.com/2026/27th-july-threat-intelligence-report/) — Check Point Research (2026-07-27)
- [Cybersecurity Bulletin: Critical Vulnerabilities, Major Data Breaches & Emerging Threat Intelligence](https://www.crowe.com/ae/news/critical-cves-and-data-breaches) — Crowe (2026-07-28)
- [Oracle July 2026 Critical Patch Update Addresses 1235 CVEs](https://www.tenable.com/blog/oracle-july-2026-critical-patch-update-addresses-1235-cves) — Tenable (2026-07-21)
- [Oracle Releases July 2026 Critical Patch Update Advisory](https://digital.nhs.uk/cyber-alerts/2026/cc-4819) — NHS Digital (2026-07-22)
- [Oracle July 2026 CPU Explained — 1449 Patches & New Patching Cadence Guide](https://lanverse.in/blog/oracle-july-2026-cpu-explained-1-449-patches-new-patching-cadence-guide-1785217631352) — The CPA Guide (2026-07-28)

---
Source: https://cyber.netsecops.io/articles/oracle-july-2026-critical-patch-update-includes-1449-patches/
