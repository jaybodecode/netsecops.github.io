# CISA KEV Catalog Updated: Actively Exploited Langflow and Trend Micro Flaws Demand Urgent Patching

**Severity:** critical | **Category:** Vulnerability,Patch Management,Regulatory | **Updated:** 2026-05-22 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added two new vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, confirming they are under active exploitation. The flaws are CVE-2025-34291, an Origin Validation Error in Langflow, and CVE-2026-34926, a Directory Traversal vulnerability in on-premise versions of Trend Micro Apex One. Under Binding Operational Directive (BOD) 22-01, federal agencies are mandated to remediate these vulnerabilities by a specified deadline, and CISA strongly urges all organizations to prioritize patching immediately to mitigate risk.

## Executive Summary
On May 21, 2026, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added two new vulnerabilities to its Known Exploited Vulnerabilities (KEV) catalog, signaling that both are being actively exploited by malicious actors in the wild. The vulnerabilities impact products from **Langflow** and **[Trend Micro](https://www.trendmicro.com)**. The first, **`CVE-2025-34291`**, is an Origin Validation Error in Langflow. The second, **`CVE-2026-34926`**, is a Directory Traversal vulnerability affecting on-premise instances of Trend Micro Apex One. The inclusion in the KEV catalog triggers Binding Operational Directive (BOD) 22-01, which compels Federal Civilian Executive Branch (FCEB) agencies to patch these flaws by a set deadline. **CISA** strongly advises all public and private sector organizations to follow suit and remediate these vulnerabilities immediately to reduce their attack surface.

## Vulnerability Details

### CVE-2025-34291 - Langflow Origin Validation Error
*   **Product:** Langflow
*   **Vulnerability Type:** Origin Validation Error
*   **Impact:** While specific details of the impact are not provided, Origin Validation Errors typically lead to security bypasses. An attacker could potentially trick the application into trusting a malicious origin, allowing them to execute unauthorized actions, steal sensitive data, or perform cross-site scripting (XSS) attacks. Given its addition to the KEV, the exploit likely allows for significant unauthorized access or code execution.

### CVE-2026-34926 - Trend Micro Apex One Directory Traversal
*   **Product:** Trend Micro Apex One (On-Premise)
*   **Vulnerability Type:** Directory Traversal (Path Traversal)
*   **Impact:** This vulnerability allows an attacker to access files and directories stored outside the web root folder. By manipulating file path variables (e.g., with `../` sequences), an attacker could read sensitive configuration files, source code, or system files containing credentials. In some cases, directory traversal can also lead to arbitrary code execution if an attacker can write files to sensitive locations.

## Affected Systems
*   **`CVE-2025-34291`:** All installations of Langflow prior to the patched version.
*   **`CVE-2026-34926`:** On-premise installations of Trend Micro Apex One. Cloud-based versions are not affected.

## Exploitation Status
Both **`CVE-2025-34291`** and **`CVE-2026-34926`** are confirmed by **CISA** to be under active exploitation in the wild. This means that threat actors have developed working exploits and are actively using them to compromise vulnerable systems. The urgency for patching is therefore critical. Organizations that have not patched are at high risk of compromise.

## Impact Assessment
*   **Langflow:** As a UI for building with Large Language Models (LLMs), a compromise could lead to the theft of sensitive data processed by the LLM, API keys for services like OpenAI, or manipulation of the application's logic.
*   **Trend Micro Apex One:** As an endpoint security product, a vulnerability in the management server is extremely dangerous. An attacker compromising the Apex One server could potentially disable security controls across the entire fleet of endpoints it manages, rendering the organization blind and defenseless against further attacks. This could be a precursor to a widespread ransomware deployment.

> The compromise of a central security management tool like Apex One is a worst-case scenario. It's the digital equivalent of an intruder stealing the keys to every room in the building and disabling the alarm system.

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| `url_pattern` | `..%2f` or `..\` | In web server logs, look for URL patterns containing directory traversal sequences targeting systems running Trend Micro Apex One. |
| `log_source` | `Trend Micro Apex One Logs` | Audit logs for unexpected administrative actions, policy changes, or component updates that were not initiated by authorized administrators. |
| `log_source` | `Langflow Application Logs` | Review logs for anomalous requests or errors related to origin validation or session management. |

## Detection Methods
1.  **Vulnerability Scanning:** Use a vulnerability scanner to actively scan your network for instances of Langflow and on-premise Trend Micro Apex One servers. Ensure your scanner has updated plugins to detect **`CVE-2025-34291`** and **`CVE-2026-34926`**.
2.  **Log Analysis:** For Trend Micro Apex One, analyze web server access logs for suspicious requests containing directory traversal patterns. For Langflow, review application and web logs for requests from unexpected or malicious-looking origins. This aligns with **[D3FEND Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **EDR:** Monitor the Apex One server for any suspicious child processes spawned by the main application services, which could indicate post-exploitation activity.

## Remediation Steps
1.  **Patch Immediately:** The primary remediation is to apply the security updates provided by Langflow and Trend Micro as soon as possible. Due to active exploitation, this should be treated as an emergency change.
2.  **Verify Patch Installation:** After applying the patches, verify that the new version is correctly installed and running.
3.  **Hunt for Compromise:** Before and after patching, it is crucial to hunt for signs of compromise. Assume that you may have already been breached. Review logs for any suspicious activity pre-dating the patch.
4.  **Isolate if Unable to Patch:** If patching is not immediately possible, isolate the vulnerable servers from the internet and untrusted networks as a temporary compensating control. However, this is not a substitute for patching.

## CVEs
- CVE-2025-34291 — CISA KEV
- CVE-2026-34926 — CISA KEV

**Tags:** CISA, KEV, Vulnerability, CVE-2025-34291, CVE-2026-34926, Langflow, Trend Micro, Patch Management

## Sources
- [CISA Adds Two Known Exploited Vulnerabilities to Catalog](https://www.cisa.gov/news-events/alerts/2026/05/21/cisa-adds-two-known-exploited-vulnerabilities-catalog) — CISA (2026-05-21)
- [Cybersecurity Alerts & Advisories](https://www.cisa.gov/news-events/cybersecurity-advisories) — CISA (2026-05-21)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-langflow-and-trend-micro-bugs-to-kev-catalog/
