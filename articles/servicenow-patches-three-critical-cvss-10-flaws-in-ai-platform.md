# ServiceNow Patches Three Critical CVSS 10.0 Flaws in AI Platform

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-08-29 | **Reading time:** 5 min

ServiceNow has issued urgent patches for three critical, unauthenticated vulnerabilities in its AI and Now Platforms, each rated with a CVSS score of 10.0. The flaws, identified as CVE-2026-18885, CVE-2026-18886, and CVE-2026-74820, could allow a remote attacker to execute arbitrary code, escalate privileges to gain full control, and run malicious SQL commands against the instance database. These vulnerabilities affect the enterprise-grade PaaS used by 85% of Fortune 500 companies and require no user interaction to exploit. ServiceNow has deployed fixes to its hosted environments and released patches for self-hosted customers, who are urged to apply the updates immediately. A fourth high-severity sandbox escape flaw was also addressed. Currently, there is no evidence of these vulnerabilities being exploited in the wild.

## Executive Summary
On August 27, 2026, **[ServiceNow](https://www.servicenow.com/)** released security updates for four vulnerabilities affecting its **[ServiceNow AI Platform](https://www.servicenow.com/now-platform/what-is-generative-ai.html)** and **[Now Platform](https://www.servicenow.com/now-platform.html)**. Three of these vulnerabilities are rated **critical** with a CVSS score of 10.0 out of 10.0. These flaws—a code injection (**[CVE-2026-18885](#)**), an improper access control flaw (**[CVE-2026-18886](#)**), and a SQL injection (**[CVE-2026-74820](#)**)—can be exploited by an unauthenticated remote attacker in low-complexity attacks. Successful exploitation could lead to arbitrary code execution, full privilege escalation, and complete database control. Given that ServiceNow's platforms underpin critical business operations for a majority of Fortune 500 companies, the potential impact is severe. ServiceNow has patched its hosted instances and provided updates for on-premise customers. No active exploitation has been reported.

---

## Vulnerability Details
The three critical vulnerabilities pose a significant threat due to their high impact and ease of exploitation:

*   **[CVE-2026-18885](#)**: A code injection vulnerability in the GraphQL Composite Data API. An unauthenticated, remote attacker can send a specially crafted request to execute arbitrary code on the instance, allowing them to access or modify any data.
*   **[CVE-2026-18886](#)**: An improper access control vulnerability in the system configuration image upload processor. This flaw allows an unauthenticated attacker to upload malicious files, which can be leveraged to create or modify data, ultimately leading to a full privilege escalation to an administrator-level account.
*   **[CVE-2026-74820](#)**: A SQL injection vulnerability within a dynamic schema `ORDER BY` clause. An unauthenticated attacker can exploit this to execute arbitrary SQL commands, enabling them to read, modify, or delete data from the underlying database.

A fourth, high-severity vulnerability, **[CVE-2026-6876](#)** (CVSS 8.7), was also patched. This flaw is a sandbox escape in the Now Platform that could also permit arbitrary code execution.

All three critical flaws were assigned the CVSS 4.0 vector `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H`, signifying a network-based attack with no privileges or user interaction required, and a high impact on the confidentiality, integrity, and availability of both the vulnerable platform and logically separate systems.

## Affected Systems
The vulnerabilities affect multiple versions of the ServiceNow AI and Now Platforms. Organizations using self-hosted (on-premise) instances must apply patches manually. The following versions are impacted:

*   **Xanadu:** Versions prior to Patch 11 Hot Fix 7a
*   **Yokohama:** Versions prior to Patch 12 Hot Fix 3b, Patch 13 Hot Fix 4
*   **Zurich:** Versions prior to Patch 7b Hot Fix 3, Patch 8 Hot Fix 5, Patch 9 Hot Fix 6, and Patch 10 Hot Fix 2m/3

ServiceNow has already applied the necessary security updates to all its cloud-hosted customer instances.

## Exploitation Status
As of the disclosure on August 28, 2026, ServiceNow has stated that it is **not aware of any malicious exploitation** of these vulnerabilities in the wild. However, the publication of these details, combined with the critical 10.0 CVSS scores, significantly increases the likelihood of threat actors developing and deploying exploits. The low attack complexity makes these flaws prime targets for widespread scanning and automated attacks.

## Impact Assessment
A successful exploit of any of the three critical vulnerabilities would grant an attacker complete control over a ServiceNow instance. This could lead to:

*   **Data Theft:** Exfiltration of sensitive business data, customer information, employee records, and intellectual property stored within the platform.
*   **Business Disruption:** Malicious modification or deletion of data, workflows, and configurations, potentially halting critical business processes that rely on ServiceNow for IT service management, HR, and customer service operations.
*   **Lateral Movement:** A compromised ServiceNow instance, which is often deeply integrated with other enterprise systems like Active Directory, ERPs, and cloud services, could serve as a powerful pivot point for attackers to move laterally across the corporate network.
*   **Ransomware Deployment:** Attackers could leverage their control to deploy ransomware across connected systems, causing widespread operational shutdown and financial damage.

Given that 85% of Fortune 500 companies use ServiceNow, a widespread exploitation campaign could have significant economic and operational consequences across multiple industries.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

Security teams should monitor for unusual activity related to the following components:

| Type | Value | Description |
|---|---|---|
| url_pattern | `/api/now/graphql` | Monitor for anomalous or malformed requests to the GraphQL API endpoint, which could indicate attempts to exploit CVE-2026-18885. |
| url_pattern | `/sys_attachment.do` | Scrutinize file uploads, particularly from unauthenticated sources, to endpoints handling image or configuration uploads for signs of CVE-2026-18886 exploitation. |
| log_source | `ServiceNow System Logs` | Search for SQL errors or unusually complex `ORDER BY` clauses in queries, which may indicate attempts to exploit CVE-2026-74820. |
| process_name | `node` or `java` | Monitor for unexpected child processes spawned by ServiceNow's core processes, which could be a sign of successful code execution. |

## Detection & Response
Security teams should implement the following detection and response strategies:

1.  **Log Analysis:** Ingest and analyze ServiceNow transaction logs, system logs, and web server access logs. Look for requests to the `GraphQL Composite Data API` from unknown or suspicious IP addresses. Hunt for unusual file upload activities, especially those involving non-image file types or unexpected file names being uploaded via the image processor. For **[CVE-2026-74820](#)**, filter logs for SQL-related errors or queries with complex, nested `ORDER BY` statements that appear anomalous. D3FEND's [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) and [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) are relevant here.

2.  **Endpoint Detection and Response (EDR):** On self-hosted ServiceNow servers, monitor for suspicious process execution. The ServiceNow application runs on Java and Node.js; any unexpected child processes spawned from these, such as shells (`sh`, `bash`, `powershell.exe`) or network utility tools (`curl`, `wget`), are strong indicators of compromise.

3.  **Network Monitoring:** Monitor network traffic to and from ServiceNow instances. A sudden increase in outbound traffic or connections to unusual IP addresses could indicate data exfiltration following a compromise.

## Mitigation
**Immediate action is required for all self-hosted customers.**

1.  **Patch Immediately:** The primary mitigation is to apply the security patches released by ServiceNow as soon as possible. This is a critical application of D3FEND's [`Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) countermeasure.

2.  **Restrict Access:** As a temporary compensating control if patching is delayed, restrict network access to ServiceNow instances. Ensure that management interfaces are not exposed to the public internet. Access should be limited to trusted internal networks and administrative jump boxes. This aligns with D3FEND's [`Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) principle.

3.  **Web Application Firewall (WAF):** Deploy a WAF with rules designed to inspect and block malicious GraphQL and SQL injection patterns. While not a substitute for patching, a properly configured WAF can provide a valuable layer of defense against exploitation attempts.

4.  **Regular Audits:** Regularly audit ServiceNow configurations, user roles, and permissions to ensure adherence to the principle of least privilege. This can help limit the impact of a potential compromise.

## CVEs
- CVE-2026-18885 (CVSS 10)
- CVE-2026-18886 (CVSS 10)
- CVE-2026-6876 (CVSS 8.7)
- CVE-2026-74820 (CVSS 10)

**Tags:** CVSS 10, Patch Management, Privilege Escalation, RCE, SQL Injection, ServiceNow, Vulnerability

## Sources
- [Three CVSS 10.0 ServiceNow Flaws Could Let Unauthenticated Attackers Execute Code and SQL](https://thehackernews.com/2026/08/three-cvss-100-servicenow-flaws-could.html) (2026-08-28)
- [ServiceNow warns of three max severity security vulnerabilities](https://www.bleepingcomputer.com/news/security/servicenow-warns-of-three-max-severity-security-vulnerabilities/) (2026-08-28)
- [ServiceNow fixes three critical AI Platform vulnerabilities](https://www.secure-iss.com/newsroom/servicenow-fixes-three-critical-ai-platform-vulnerabilities) (2026-08-28)
- [CVE-2026-74820 ServiceNow AI Platform sql injection](https://vuldb.com/vuln/396382) (2026-08-27)

---
Source: https://cyber.netsecops.io/articles/servicenow-patches-three-critical-cvss-10-flaws-in-ai-platform/
