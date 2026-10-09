# Oracle's August Update Delivers Massive 943 Patches for 925 CVEs

**Severity:** high | **Category:** Patch Management,Vulnerability | **Updated:** 2026-08-22 | **Reading time:** 6 min

Oracle has released its August 2026 Critical Security Patch Update (CSPU), a massive release containing 943 patches for 925 unique CVEs across 23 product families. The Oracle Fusion Middleware and Hyperion product lines received the most fixes, each with 262. A significant portion of these are for critical, remotely exploitable vulnerabilities that require no user authentication. Nearly 90 of the fixed flaws have a CVSS score of 9.8 or higher. Oracle WebLogic Server was notably affected, with several critical bugs like CVE-2026-60702 (CVSS 9.9) being exploitable via T3, IIOP, and RMI protocols. Given the high number of critical flaws, organizations are urged to prioritize the deployment of these patches, especially on internet-facing systems.

## Executive Summary
**[Oracle](https://www.oracle.com/security-alerts/)** has released its August 2026 Critical Security Patch Update (CSPU), an exceptionally large security release containing 943 patches that address 925 unique CVEs. The update spans 23 product families, with **Oracle Fusion Middleware** and **Oracle Hyperion** receiving the largest share of fixes. A concerning number of the vulnerabilities—182 in Fusion Middleware alone—are remotely exploitable without authentication. With 154 patches rated critical and nearly 90 vulnerabilities scoring 9.8 or higher on the CVSS scale, this update demands immediate attention from system administrators. Critical flaws in **Oracle WebLogic Server**, such as **CVE-2026-60702** (CVSS 9.9), pose a severe risk to internet-facing applications.

---

## Vulnerabilities Addressed
This CSPU is one of the largest in Oracle's history. While it's impractical to detail all 925 CVEs, the key highlights demonstrate the urgency:
- **Total Patches:** 943 (for 925 CVEs)
- **Critical Patches:** 154
- **Vulnerabilities with CVSS 9.8+:** Nearly 90

Key affected product families include:
- **Oracle Fusion Middleware:** 262 patches (182 remotely exploitable without authentication)
- **Oracle Hyperion:** 262 patches
- **Oracle E-Business Suite:** 120 patches
- **Oracle Commerce:** 66 patches
- **Oracle Siebel CRM:** 50 patches
- **Oracle Supply Chain:** 46 patches

One of the most severe vulnerabilities is **CVE-2026-60702** in Oracle WebLogic Server, a component of Fusion Middleware. It has a CVSS score of 9.9 and is exploitable remotely without authentication via protocols like T3, IIOP, and RMI.

## Affected Products
This update impacts a vast array of Oracle's portfolio. Organizations must consult the official Oracle advisory to identify all relevant patches for their specific environment. The most heavily impacted products are enterprise staples, often deeply embedded in corporate infrastructure:
- Oracle Fusion Middleware (including WebLogic Server)
- Oracle Hyperion
- Oracle E-Business Suite
- Oracle Commerce
- Oracle PeopleSoft
- Oracle Siebel CRM
- Oracle Supply Chain Products
- Oracle Database Server

---

## Impact Assessment
The sheer volume of critical, remotely exploitable vulnerabilities presents a significant risk. Internet-facing systems running vulnerable Oracle products, particularly WebLogic Server, are at high risk of compromise. A successful exploit could lead to:
- **Complete System Takeover:** Many of the critical flaws allow for Remote Code Execution (RCE), giving an attacker full control of the affected server.
- **Widespread Data Breach:** Compromise of systems like E-Business Suite, Siebel CRM, or databases could lead to the theft of sensitive financial, customer, and employee data.
- **Business Disruption:** An attack on critical middleware or supply chain applications could halt core business operations.
- **Lateral Movement:** Once an initial foothold is gained on an Oracle system, attackers can pivot to other parts of the corporate network.

Oracle's own advisory notes that the company continues to receive reports of attackers targeting vulnerabilities for which patches have already been released, highlighting the danger of delayed patching.

## Deployment Priority
Given the scale of this update, a risk-based approach to patching is essential:
1.  **Internet-Facing Systems:** Prioritize patching all internet-exposed systems, especially those running Oracle WebLogic Server, Oracle Commerce, and other components of Fusion Middleware.
2.  **Critical Business Systems:** Immediately patch systems that support critical business functions, such as ERP (E-Business Suite), CRM (Siebel), and supply chain management.
3.  **Internal Systems:** Develop a plan to patch internal and less critical systems in a timely manner, as they can be targeted after an initial breach.
4.  **Database Servers:** While receiving fewer patches this cycle, database servers should always be a high priority due to the sensitive data they store.

## Cyber Observables — Hunting Hints
To identify potentially vulnerable systems or exploitation attempts, security teams can use the following hints:

| Type | Value | Description |
|---|---|---|
| port | `7001`, `7002` | Default ports for Oracle WebLogic Server admin consoles. Monitor for unusual traffic. |
| protocol | `T3`, `IIOP` | Protocols used by WebLogic. Exploits for CVE-2026-60702 and similar flaws often target these. Monitor for anomalous traffic over these protocols from untrusted sources. |
| file_path | `Oracle Inventory` | Review Oracle inventory files (`oraInst.loc`) to identify installed products and versions to determine patch status. |
| process_name | `java.exe` or `java` | On Windows/Linux, WebLogic runs as a Java process. Monitor these processes for suspicious child processes or network connections. |

## Remediation Steps
1.  **Review Oracle's Advisory:** The first step is to carefully read the August 2026 CSPU advisory to understand which patches apply to your organization's specific product deployments.
2.  **Test Patches:** Before deploying to production, test the patches in a non-production environment to ensure they do not negatively impact business applications.
3.  **Deploy Patches:** Roll out the patches according to the priority established above. Automate where possible to ensure timely deployment.
4.  **Verify Installation:** After deployment, use Oracle's tools (e.g., OPatch) to verify that the patches were successfully applied.
5.  **Compensating Controls:** For systems that cannot be patched immediately, implement compensating controls such as restricting network access to vulnerable ports (e.g., T3/IIOP) from untrusted networks and enhancing monitoring.

## CVEs
- CVE-2026-60702 (CVSS 9.9)

**Tags:** Oracle, Patch Tuesday, CSPU, WebLogic, Vulnerability, CVE-2026-60702

## Sources
- [Oracle August 2026 Critical Security Patch Update Addresses 925 CVEs](https://www.tenable.com/blog/oracle-august-2026-critical-security-patch-update-cspu-addresses-925-cves) — Tenable (2026-08-21)
- [Oracle Patches 943 Vulnerabilities, Including Critical WebLogic Bugs](https://www.esecurityplanet.com/threats/oracle-patches-943-vulnerabilities-including-critical-weblogic-bugs/) — eSecurity Planet (2026-08-21)
- [943 Patches Rolled Out With Oracle's August 2026 Security Update](https://www.securityweek.com/943-patches-rolled-out-with-oracles-august-2026-security-update/) — SecurityWeek (2026-08-21)

---
Source: https://cyber.netsecops.io/articles/oracle-august-2026-security-update-delivers-943-patches/
