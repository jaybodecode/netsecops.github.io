# SAP Patches Four Critical Flaws with Maximum 10.0 CVSS Score

**Severity:** critical | **Category:** Vulnerability,Patch Management,Threat Intelligence | **Updated:** 2026-11-10 | **Reading time:** 4 min

SAP's November Security Patch Day includes fixes for 35 vulnerabilities, four of which are rated with the maximum CVSS score of 10.0. These critical flaws, discovered by security firm Onapsis and named ICM2SHELL and PROXYGATE, could allow an unauthenticated attacker to achieve remote code execution on affected SAP NetWeaver, Web Dispatcher, and Gateway systems. While not yet exploited in the wild, a working exploit has been developed, and customers are urged to patch immediately.

## Executive Summary
**[SAP](https://www.sap.com/index.html)** has released its November 2026 Security Patch Day updates, addressing 35 new vulnerabilities. Among them are four critical flaws that have each received the maximum possible CVSS score of 10.0. These vulnerabilities, if exploited, could allow an unauthenticated, remote attacker to completely compromise affected SAP systems. The security firm **[Onapsis](https://onapsis.com/)** is credited with discovering three of the four flaws. Given the criticality of these issues and the history of rapid exploitation of SAP vulnerabilities, organizations are strongly advised to prioritize the application of these patches to protect their mission-critical business systems.

## Vulnerability Details
The four maximum-severity vulnerabilities pose a significant risk to organizations running SAP software. They allow for remote, unauthenticated attacks.

-   **ICM2SHELL:** This name covers two distinct vulnerabilities:
    -   **[CVE-2026-76964](https://nvd.nist.gov/vuln/detail/CVE-2026-76964)**: A vulnerability in the Internet Communication Manager (ICM) of SAP NetWeaver AS ABAP.
    -   **[CVE-2026-89126](https://nvd.nist.gov/vuln/detail/CVE-2026-89126)**: A vulnerability in the SAP Web Dispatcher.
-   **PROXYGATE ([CVE-2026-89103](https://nvd.nist.gov/vuln/detail/CVE-2026-89103))**: A broken access control vulnerability in the SAP Gateway.
-   **[CVE-2026-120017](https://nvd.nist.gov/vuln/detail/CVE-2026-120017)**: A missing authentication check vulnerability in the SAML2 Service Provider component of NetWeaver AS ABAP and ABAP Platform.

Exploitation of these vulnerabilities could lead to a full system takeover, allowing an attacker to steal sensitive business data, disrupt operations, or use the compromised SAP system as a pivot point for further attacks within the corporate network.

## Affected Systems
The vulnerabilities impact some of SAP's most widely deployed products, which form the core of many large enterprises:
- SAP NetWeaver Application Server (AS) ABAP
- SAP ABAP Platform
- SAP Web Dispatcher
- SAP Gateway

Organizations must review the specific SAP Security Notes corresponding to each CVE to identify the exact product versions and patch levels required.

## Exploitation Status
According to Onapsis, there is no evidence that these specific vulnerabilities are being exploited in the wild at this time. However, the security firm has successfully developed a working proof-of-concept exploit for ICM2SHELL, confirming the viability of an attack. Threat actors specializing in SAP are known to reverse-engineer patches quickly to develop exploits. Therefore, the window of opportunity for defenders to patch is likely to be very short.

> The existence of a working PoC for CVSS 10.0 vulnerabilities means that exploitation is not a matter of 'if' but 'when'. Patching should be considered an emergency-level priority.

## Cyber Observables — Hunting Hints
The following patterns can help identify vulnerable systems or exploitation attempts:

| Type | Value | Description |
|---|---|---|
| url_pattern | `/sap/public/icman` | Default path for the ICM component. Monitor for unusual requests or payloads sent to this and related paths. |
| log_source | `SAP ICM Access Logs (icm_access_log)` | Scrutinize logs for unexpected GET/POST requests from external IPs, especially those resulting in 500 errors or showing unusual user-agents. |
| process_name | `disp+work.exe` (Windows), `dw.sap` (Linux) | Monitor the SAP dispatcher and worker processes for anomalous behavior, such as spawning shells or making outbound network connections. |
| network_traffic_pattern | Traffic to SAP Dispatcher port from untrusted networks | Monitor for connections to the SAP message server and dispatcher ports (e.g., 32xx, 33xx, 81xx) from the internet. |

## Detection Methods
1.  **Vulnerability Scanning:** Use a vulnerability scanner with up-to-date plugins for SAP to identify all affected systems in the environment. Prioritize internet-facing systems like SAP Web Dispatcher and SAP Gateway.
2.  **Log Analysis:** Ingest SAP logs (e.g., ICM, Gateway, Security Audit Log) into a SIEM. Create rules to detect anomalies, such as successful logins from external IPs, execution of sensitive function modules, or changes to critical configurations. This is a form of D3FEND's [`Platform-based Analysis`](https://d3fend.mitre.org/technique/d3f:Platform-basedAnalysis).
3.  **Network Traffic Analysis:** Monitor traffic to and from SAP systems. Look for probes against common SAP ports or unusual payloads that could indicate an exploitation attempt. This aligns with D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) (D3-NTA).

## Remediation Steps
1.  **Apply SAP Security Notes:** The primary remediation is to apply the security patches released by SAP on November's Patch Day. Organizations should identify all vulnerable systems and deploy the relevant notes as quickly as possible.
2.  **Restrict Network Access:** Review network firewall and access control lists. Ensure that SAP systems, particularly the application servers, are not directly exposed to the internet. Access should be restricted to trusted internal networks and authorized users.
3.  **Virtual Patching:** If immediate patching is not feasible, use an Intrusion Prevention System (IPS) or a Web Application Firewall (WAF) to implement virtual patches that can block known exploitation patterns. This should be considered a temporary compensating control, not a substitute for patching.

## CVEs
- CVE-2026-76964 (CVSS 10)
- CVE-2026-89126 (CVSS 10)
- CVE-2026-89103 (CVSS 10)
- CVE-2026-120017 (CVSS 10)

**Tags:** SAP, vulnerability, CVSS 10, critical vulnerability, patch management, Onapsis, ICM2SHELL, PROXYGATE, RCE

## Sources
- [SAP patches four maximum-severity flaws, including Onapsis-found ICM2SHELL and PROXYGATE](https://mlq.ai/news/sap-patches-four-maximum-severity-flaws-including-onapsis-found-icm2shell-and-proxygate/) — MLQ.ai (2026-11-10)

---
Source: https://cyber.netsecops.io/articles/sap-patches-four-maximum-severity-vulnerabilities-cvss-10/
