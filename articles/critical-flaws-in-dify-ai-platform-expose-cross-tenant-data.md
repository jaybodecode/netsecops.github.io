# Critical 'DifyTap' Flaws in Dify AI Platform Expose Cross-Tenant Data in 1M+ Apps

**Severity:** critical | **Category:** Vulnerability,Cloud Security,Data Breach | **Updated:** 2026-06-25 | **Reading time:** 6 min

Four vulnerabilities, dubbed 'DifyTap,' have been discovered in the popular open-source AI application platform Dify. Two of the flaws are critical (CVE-2026-41947, CVE-2026-41948) and could allow attackers to break tenant isolation, enabling them to read private AI conversations, access documents from other users, and reach internal APIs. The vulnerabilities affect a platform used to build over one million AI applications, posing a significant data exposure risk for enterprises leveraging Dify's cloud service.

## Executive Summary
Researchers at **Zafran Security** have disclosed a set of four vulnerabilities, collectively named "DifyTap," in **Dify**, a widely used open-source AI application development platform. These flaws pose a significant threat to the confidentiality of data within the more than one million AI applications built on the platform. The most severe issues, **CVE-2026-41947** and **CVE-2026-41948**, are rated **critical** and enable attackers to bypass tenant isolation controls in Dify's cloud environment. This could allow a malicious user to access private AI chat logs, view and use documents uploaded by other tenants, and in some cases, make unauthenticated requests to internal Dify services. The findings highlight the growing security risks in the AI supply chain, where vulnerabilities in orchestration platforms can undermine the security of the AI models they manage. Dify has released patches for the flaws in version 1.14.2.

---

## Vulnerability Details
The DifyTap disclosure includes four distinct vulnerabilities, with the most critical ones affecting tenant isolation:

*   **CVE-2026-41947 (Critical):** This flaw allows a user to attach a file belonging to another user within the same tenant to their own chat session. This could lead to unauthorized access to sensitive documents.
*   **CVE-2026-41948 (Critical):** An unauthenticated vulnerability that could allow an attacker to access internal Plugin Daemon endpoints. This could potentially lead to further compromise of the Dify infrastructure.
*   **CVE-2026-41949:** A flaw that allowed a user to preview documents uploaded by other tenants, breaking data segregation between different customers on the cloud platform.
*   **CVE-2026-41950:** A logic flaw where the platform only validated a user's tenant ID when linking a file to a message, but not when accessing the file itself. This could allow a user from one tenant to access files belonging to another tenant if they could guess the file ID.

Additionally, the research highlighted that Dify was using a version of the PDFium library vulnerable to **CVE-2024-5846**, a use-after-free vulnerability, for over 18 months. This could have allowed an attacker to achieve code execution by uploading a malicious PDF file.

---

## Technical Analysis
The core of these vulnerabilities lies in insufficient access control and authorization checks within the Dify platform, particularly in how it handles multi-tenancy and file management. This is a classic example of [`T1087.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1087/004/) being abused, where a low-privileged but valid account in one tenant can access resources from another.

The ability to access data from other tenants is a form of [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/). The attackers are not breaking the underlying cloud storage security, but rather exploiting logic flaws in the application layer (Dify) that sits on top of it. The vulnerability where a user could attach another user's file is an Insecure Direct Object Reference (IDOR) flaw, where the application fails to verify that the user is authorized to access the requested object (in this case, a file).

The unauthenticated access to internal endpoints (`CVE-2026-41948`) is a form of Server-Side Request Forgery (SSRF) or improper network segmentation, allowing an external actor to interact with services that should only be accessible internally. This could be used for [`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/) of the internal network.

---

## Impact Assessment
The impact of the DifyTap vulnerabilities is severe, particularly for organizations using Dify's multi-tenant cloud service. The breakdown of tenant isolation is one of the most critical failures for a cloud provider.

*   **Data Breach:** Malicious tenants could systematically steal sensitive data from other customers on the same platform. This could include proprietary business documents, private AI conversations containing intellectual property, and personally identifiable information (PII).
*   **Loss of Trust:** For a platform like Dify, which is used by major enterprises like Volvo and Panasonic, a breach of tenant isolation can cause irreparable damage to its reputation and lead to customer churn.
*   **Compliance Violations:** The unauthorized exposure of data could lead to significant regulatory fines under frameworks like GDPR, especially if PII is involved.
*   **Further Compromise:** The ability to access internal APIs could allow an attacker to pivot from a single compromised tenant to a full compromise of the Dify service infrastructure, affecting all customers.
*   **AI Supply Chain Risk:** This incident demonstrates that even if the underlying AI models (e.g., from OpenAI or Anthropic) are secure, vulnerabilities in the surrounding orchestration and application layers can create significant security holes.

---

## Cyber Observables — Hunting Hints
Organizations using Dify should review historical logs for signs of exploitation:

| Type | Value | Description |
|---|---|---|
| `log_source` | `Dify Application Logs` | Look for instances where a user account accessed or attached a file ID that does not belong to its own tenant or user space. This requires correlation of file IDs with user/tenant IDs. |
| `api_endpoint` | `Dify Plugin Daemon endpoints` | Analyze web server and API gateway logs for any requests to internal Plugin Daemon endpoints that originated from an external, unauthenticated IP address. |
| `log_source` | `Cloud Storage Access Logs` | Review access logs for the underlying storage (e.g., S3 buckets) for patterns where an object is accessed by a role or user from a different tenant than the one that uploaded it. |

---

## Detection & Response
*   **Log Analysis:** Organizations self-hosting Dify should centralize application, web server, and infrastructure logs. Search for the anomalous access patterns described above. Correlate API requests with user sessions to identify if a user from Tenant A is making calls for resources belonging to Tenant B.
*   **Vulnerability Scanning:** Scan container images and server dependencies to identify outdated libraries like the vulnerable version of PDFium. (D3FEND: [`D3-DA - Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis))
*   **Incident Response:** If a cross-tenant data access event is detected, the immediate priority is to identify the scope of the exposure. Determine which tenants were affected and what specific data was accessed. Notify affected customers and legal/compliance teams. Isolate the malicious actor's account and preserve all relevant logs for investigation.

---

## Mitigation
1.  **Update Immediately:** All users of Dify, both cloud and self-hosted, must upgrade to version 1.14.2 or later. This version contains the patches for `CVE-2026-41947`, `CVE-2026-41949`, and `CVE-2026-41950`. (D3FEND: [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))
2.  **Network Segmentation:** For self-hosted deployments, ensure that internal service endpoints like the Plugin Daemon are not exposed to the internet. Use strict network policies and firewalls to isolate internal components. (D3FEND: [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))
3.  **Code Review and Security Testing:** Developers building on platforms like Dify should conduct their own security testing and code reviews. Do not implicitly trust that the platform is secure. This incident highlights the need for a defense-in-depth approach to application security.
4.  **Dependency Management:** Regularly scan for and update third-party libraries. The use of a vulnerable PDFium library for 18 months demonstrates a gap in dependency management that could have been caught with automated Software Composition Analysis (SCA) tools.

## CVEs
- CVE-2026-41947
- CVE-2026-41948
- CVE-2026-41949
- CVE-2026-41950
- CVE-2024-5846

**Tags:** Dify, AI Security, Cloud Security, Vulnerability, Data Exposure, Multi-tenancy, CVE-2026-41947

## Sources
- [Dify flaws expose cross-tenant AI data, Zafran says](https://securitybrief.com.au/story/dify-flaws-expose-cross-tenant-ai-data-zafran-says) — SecurityBrief Australia (2026-06-25)
- [Daily Drop (1325)](https://bragg.substack.com/p/daily-drop-1325) — Substack (2026-06-24)

---
Source: https://cyber.netsecops.io/articles/critical-flaws-in-dify-ai-platform-expose-cross-tenant-data/
