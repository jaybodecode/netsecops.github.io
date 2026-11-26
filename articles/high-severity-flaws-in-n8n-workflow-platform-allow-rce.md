# Critical RCE Flaws in n8n Workflow Platform Put Thousands of Instances at Risk

**Severity:** critical | **Category:** Vulnerability,Cloud Security,Patch Management | **Updated:** 2026-01-28 | **Reading time:** 4 min

Two new high-severity vulnerabilities have been discovered in the n8n workflow automation platform, a tool that often holds credentials to critical corporate systems. The most severe flaw, CVE-2026-1470, is a critical eval injection vulnerability (CVSS 9.9) that allows an authenticated attacker to bypass the expression sandbox and achieve full remote code execution. A second flaw, CVE-2026-0863 (CVSS 8.5), allows for a similar sandbox escape in the Python execution environment. A compromise could provide an attacker with a 'skeleton key' to an organization's infrastructure. This news is compounded by data showing over 39,000 n8n instances remain unpatched for a previous critical flaw.

## Executive Summary
Security researchers have disclosed two high-severity vulnerabilities in the **[n8n](https://n8n.io/)** workflow automation platform, a popular open-source tool for connecting APIs and services. The most critical of these, **CVE-2026-1470**, is an eval injection flaw with a CVSS score of 9.9, which allows an authenticated attacker to break out of a security sandbox and achieve remote code execution (RCE). A second flaw, **CVE-2026-0863** (CVSS 8.5), enables a similar RCE via the Python execution sandbox. Because n8n instances often store credentials and API keys for databases, cloud services, and internal applications, a successful exploit could grant an attacker a "skeleton key" to an organization's entire technology stack. The disclosure is especially alarming as data from the Shadowserver Foundation indicates that over 39,000 instances remain vulnerable to a separate critical RCE flaw, Ni8mare (**CVE-2026-21858**), disclosed weeks ago.

---

## Vulnerability Details
The vulnerabilities, discovered by **[JFrog](https://jfrog.com/)**'s security team, exploit weaknesses in the sandboxing mechanisms used by n8n to isolate user-provided code.

-   **CVE-2026-1470 (CVSS 9.9 - Critical):** This is an eval injection vulnerability in the n8n Expression sandbox. An authenticated attacker can craft a malicious JavaScript expression that, when evaluated, bypasses the sandbox's restrictions. This allows the attacker to execute arbitrary code on the main node of the n8n instance with the full permissions of the application process.

-   **CVE-2026-0863 (CVSS 8.5 - High):** This is also an eval injection flaw, but it targets the `python-task-executor` sandbox. An authenticated attacker can execute arbitrary Python code that escapes the sandbox and runs directly on the underlying operating system of the worker node.

These flaws highlight the inherent difficulty and risk of executing untrusted code, even within supposedly secure sandboxes. Subtle features of dynamic languages like JavaScript and Python can be abused to dismantle security boundaries.

## Affected Systems
-   **n8n instances** are vulnerable if they are running versions prior to the patched releases. Users should update to the following versions or later:
    -   For **CVE-2026-1470**: `1.123.17`, `2.4.5`, or `2.5.1`
    -   For **CVE-2026-0863**: `1.123.14`, `2.3.5`, or `2.4.2`

## Exploitation Status
There is no evidence of active exploitation of these two new CVEs. However, the public disclosure of the technical details means that threat actors will likely begin scanning for and attempting to exploit vulnerable instances. The fact that 39,000+ instances remain unpatched for the recent **Ni8mare (CVE-2026-21858)** vulnerability suggests a large attack surface of slow-to-patch systems.

## Impact Assessment
A compromise of an n8n instance is a high-impact event. These platforms are central hubs of automation and are often configured with highly privileged credentials, API keys, and database connection strings for a wide array of services:
-   Cloud providers (AWS, GCP, Azure)
-   Databases (PostgreSQL, MySQL)
-   SaaS applications (Salesforce, Slack)
-   Internal IAM systems and LLM APIs

An attacker who gains RCE on an n8n server can likely exfiltrate these credentials, providing them with widespread access across an organization's infrastructure. This can lead to massive data breaches, financial theft, and compromise of core business systems.

## Cyber Observables for Detection
-   **Application Logs:** Monitor n8n application logs for errors or warnings related to expression evaluation or sandbox execution. Unhandled exceptions or crashes could indicate an exploitation attempt.
-   **Suspicious Workflows:** Audit n8n workflows for any recently added or modified nodes that contain complex or obfuscated JavaScript or Python code.
-   **Anomalous Processes:** On the n8n server, monitor for the n8n process spawning unexpected child processes, such as shells (`/bin/sh`, `cmd.exe`) or network utilities (`curl`, `wget`).

## Detection & Response
1.  **Code Review:** If possible, conduct a review of custom expressions and code nodes within your n8n workflows. Look for code that attempts to access the file system, environment variables, or make network connections in unexpected ways.

2.  **Endpoint Detection (EDR):** Deploy EDR on the server hosting n8n. Create rules to alert on the n8n process spawning shells or other suspicious binaries. Monitor for file creation in unusual directories.

3.  **Network Monitoring:** Monitor outbound network traffic from the n8n server. Alert on connections to unknown or suspicious IP addresses or domains, as this could be a sign of a reverse shell or data exfiltration.

## Remediation Steps
1.  **Update Immediately:** The only effective remediation is to update all n8n instances to a patched version. This should be treated as a critical priority.

2.  **Restrict Access:** Ensure that access to the n8n user interface is restricted. It should not be publicly accessible. Use a firewall to limit access to trusted IP ranges and place it behind a reverse proxy with strong authentication (e.g., MFA).

3.  **Credential Rotation:** As a precautionary measure, consider rotating all credentials and secrets stored within n8n. If an instance was compromised before being patched, these secrets should be considered stolen.

## CVEs
- CVE-2026-1470 (CVSS 9.9)
- CVE-2026-0863 (CVSS 8.5)
- CVE-2026-21858

**Tags:** n8n, RCE, sandbox escape, CVE-2026-1470, CVE-2026-0863, workflow automation, vulnerability

## Sources
- [Two High-Severity n8n Flaws Allow Authenticated Remote Code Execution](https://thehackernews.com/2026/01/two-high-severity-n8n-flaws-allow.html) — The Hacker News (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/high-severity-flaws-in-n8n-workflow-platform-allow-rce/
