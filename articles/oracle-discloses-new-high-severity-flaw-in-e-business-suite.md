# Oracle Issues Emergency Patch for High-Severity EBS Flaw Amid Active Clop Attacks

**Severity:** high | **Category:** Vulnerability,Patch Management,Ransomware | **Updated:** 2025-10-12 | **Reading time:** 4 min

Oracle has released an emergency security patch for a high-severity vulnerability, CVE-2025-61884, in its E-Business Suite (EBS). The flaw, which has a CVSS score of 7.5, allows an unauthenticated, remote attacker to access sensitive data within the Oracle Configurator module. It affects EBS versions 12.2.3 through 12.2.14. This alert is especially critical as it comes while the Clop ransomware group is actively exploiting a separate, critical zero-day (CVE-2025-61882) in EBS for an executive extortion campaign. While there's no confirmed link, the active targeting of EBS by Clop significantly increases the risk that this new vulnerability will be weaponized. Administrators are urged to apply the patch immediately.

## Executive Summary
On October 11, 2025, **[Oracle](https://www.oracle.com)** released an out-of-band security alert for a high-severity vulnerability, **[CVE-2025-61884](https://nvd.nist.gov/vuln/detail/CVE-2025-61884)**, in its E-Business Suite (EBS). The flaw allows for unauthenticated remote data exposure and has a CVSS 3.1 score of 7.5. It resides in the Oracle Configurator component and affects EBS versions 12.2.3 through 12.2.14. Successful exploitation could allow an attacker to access sensitive business data, including pricing models and customer information.

The urgency of this patch is amplified by an ongoing campaign where the **[Clop](https://malpedia.caad.fkie.fraunhofer.de/details/win.clop)** ransomware group is actively exploiting a different critical zero-day, `CVE-2025-61882` (CVSS 9.8), in the same product suite. Although Oracle has not linked **CVE-2025-61884** to the Clop campaign, the active interest of a sophisticated threat actor in EBS significantly elevates the risk profile. All organizations using the affected EBS versions are strongly advised to apply the patch immediately and implement mitigating controls.

---

## Vulnerability Details
*   **CVE ID**: `CVE-2025-61884`
*   **CVSS 3.1 Score**: 7.5 (High) - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`
*   **Affected Component**: Oracle Configurator (Runtime User Interface)
*   **Attack Vector**: The vulnerability is remotely exploitable over HTTP without any authentication or user interaction.
*   **Impact**: The primary impact is on confidentiality. An attacker can gain access to all data accessible through the Oracle Configurator module, which can include proprietary business logic, product configurations, and pricing data. The flaw does not impact system integrity or availability.

This vulnerability is considered 'easily exploitable' due to its low attack complexity and lack of prerequisites. The disclosure comes at a time of heightened threat for EBS customers, as **Google's Threat Intelligence Group (GTIG)** has been tracking an active extortion campaign by Clop targeting EBS systems since late September 2025.

## Affected Systems
*   **Product**: **[Oracle E-Business Suite](https://www.oracle.com/applications/ebusiness-suite/)**
*   **Affected Versions**: 12.2.3 through 12.2.14

Organizations across various sectors, including manufacturing, retail, and finance, rely on Oracle EBS for critical business functions like enterprise resource planning (ERP), supply chain management, and customer relationship management (CRM), making the potential impact widespread.

## Exploitation Status
As of the disclosure, there is no public evidence that `CVE-2025-61884` is being actively exploited in the wild. However, the concurrent exploitation of `CVE-2025-61882` by Clop creates a high-risk environment. Threat actors who have already developed tools and methods to target EBS are well-positioned to reverse-engineer the patch for `CVE-2025-61884` and develop an exploit quickly.

## Impact Assessment
*   **Data Theft**: The primary risk is the theft of sensitive and proprietary business data stored within the Oracle Configurator. This could lead to loss of competitive advantage and exposure of customer information.
*   **Reconnaissance for Further Attacks**: Attackers could use the information gathered from exploiting this vulnerability to plan more sophisticated, targeted attacks against the organization.
*   **Compliance Violations**: The exposure of sensitive data could result in violations of data protection regulations like GDPR or CCPA, leading to significant fines.

## Cyber Observables for Detection
Security teams should hunt for anomalous requests to the Oracle Configurator UI.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| url_pattern | `*/OA_HTML/configurator/UiServlet*` | The path for the vulnerable Oracle Configurator Runtime UI servlet. | Web server access logs, WAF logs. | high |
| network_traffic_pattern | Access to Configurator UI from external/untrusted IPs | Legitimate access to this UI is typically restricted to internal networks. | Firewall logs, reverse proxy logs. | high |
| log_source | `Oracle EBS Access Logs` | Logs from the application server hosting EBS can reveal anomalous access patterns. | Log management platform, SIEM. | high |

## Detection Methods
1.  **Vulnerability Scanning**: Use vulnerability scanners with updated plugins to identify affected Oracle EBS instances within the environment.
2.  **Log Analysis**: Ingest Oracle EBS web access logs into a SIEM. Search for any access attempts to the `/OA_HTML/configurator/UiServlet` endpoint originating from external IP addresses. This aligns with **[D3FEND Inbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.
3.  **Threat Intelligence**: Monitor threat intelligence feeds for any published Proof-of-Concept (PoC) code or indicators of compromise related to `CVE-2025-61884`.

## Remediation Steps
1.  **Apply the Patch ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/))**: The most critical step is to apply the emergency patch provided by Oracle on October 11, 2025, to all affected Oracle E-Business Suite instances.
2.  **Restrict Network Access ([`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/))**: As a compensating control, restrict network access to the Oracle Configurator Runtime UI. If possible, it should not be accessible from the internet. Access should be limited to trusted internal networks only. This is a form of **[D3FEND Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
3.  **Web Application Firewall (WAF)**: Deploy a WAF with rules designed to inspect and block malicious requests targeting the Oracle Configurator servlet. This can serve as a virtual patch until the official update can be applied.

## CVEs
- CVE-2025-61884 (CVSS 7.5)
- CVE-2025-61882 (CVSS 9.8) — CISA KEV

**Tags:** Vulnerability, Oracle, E-Business Suite, CVE-2025-61884, CVE-2025-61882, Clop, Zero-Day, Patch Management

## Sources
- [Oracle E-Business Suite RCE Vulnerability Exposes Sensitive Data to Hackers Without Authentication](https://cybersecuritynews.com/oracle-e-business-suite-rce/) — Cybersecurity News (2025-10-11)
- [Oracle E-Business Suite CVE-2025-61884: Brief Summary of Unauthenticated Data Exposure in Configurator Runtime UI](https://www.zeropath.io/blog/oracle-e-business-suite-cve-2025-61884-brief-summary-of-unauthenticated-data-exposure-in-configurator-runtime-ui) — ZeroPath (2025-10-12)
- [Oracle EBS CVE-2025-61884 Allows Unauthenticated Access](https://ampcus.com/cyber/oracle-ebs-cve-2025-61884-allows-unauthenticated-access/) — Ampcus Cyber (2025-10-12)
- [CVE-2025-61884: Oracle Releases Emergency Patch for Information Disclosure Flaw](https://www.arcticwolf.com/resources/blog/cve-2025-61884/) — Arctic Wolf (2025-10-11)

---
Source: https://cyber.netsecops.io/articles/oracle-discloses-new-high-severity-flaw-in-e-business-suite/
