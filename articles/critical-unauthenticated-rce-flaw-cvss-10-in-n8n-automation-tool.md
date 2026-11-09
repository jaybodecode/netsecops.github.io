# Ni8mare: Critical Unauthenticated RCE Flaw (CVSS 10.0) Hits n8n Automation Platform

**Severity:** critical | **Category:** Vulnerability,Cyberattack | **Updated:** 2026-01-07 | **Reading time:** 4 min

A critical, unauthenticated remote code execution (RCE) vulnerability, codenamed 'Ni8mare' and tracked as CVE-2026-21858, has been disclosed in the popular n8n workflow automation platform. The flaw, which carries the maximum possible CVSS score of 10.0, allows a remote attacker to gain complete control over a vulnerable, self-hosted n8n instance without any credentials. Discovered by Cyera Research Labs, the vulnerability stems from a Content-Type confusion issue where a file-handling function can be improperly invoked. A successful exploit could lead to the theft of sensitive credentials stored in workflows, full server compromise, and lateral movement into connected corporate systems. All self-hosted n8n versions prior to 1.121.0 are affected, and administrators are urged to patch immediately as proof-of-concept details are now public.

## Executive Summary
A critical unauthenticated remote code execution (RCE) vulnerability, assigned **[CVE-2026-21858](https://www.cve.org/CVERecord?id=CVE-2026-21858)** and codenamed "Ni8mare," affects self-hosted instances of the **[n8n](https://n8n.io/)** workflow automation platform. The vulnerability has been rated with a CVSS score of 10.0, signifying maximum severity. It allows an attacker to execute arbitrary code on the server without any authentication, leading to a complete system compromise. The flaw, discovered by **Cyera Research Labs**, is a Content-Type confusion bug that enables an attacker to manipulate file access on the underlying server. Given that many **n8n** instances are internet-facing and used to orchestrate sensitive business processes and handle credentials, this vulnerability poses an extreme risk. The issue was patched in version 1.121.0, and administrators of all prior versions must upgrade immediately to prevent exploitation.

## Vulnerability Details
The vulnerability exists in the way **n8n** processes certain incoming web requests, specifically those related to form submissions. According to the researchers at Cyera, a function responsible for handling form data incorrectly invokes a file-handling function without first verifying that the request's `Content-Type` header is `multipart/form-data`. This oversight creates a logical flaw where an attacker can send a specially crafted request with a different content type (e.g., `application/json`) to manipulate an object that is subsequently used in file path operations. By controlling this object, the attacker can traverse the filesystem and execute code on the server hosting the **n8n** instance. The attack vector is via the network, requires no user interaction, and has low complexity, justifying the 10.0 CVSS score.

## Affected Systems
*   **Product**: **n8n** (self-hosted instances)
*   **Affected Versions**: All versions prior to `1.121.0`
*   **Unaffected Versions**: `1.121.0` and later

## Exploitation Status
The vulnerability was responsibly disclosed to the **n8n** team on November 9, 2025, and a patch was released on November 18, 2025. However, the public disclosure, including technical details and proof-of-concept (PoC) information, occurred on January 7, 2026. The availability of a PoC significantly increases the likelihood of widespread exploitation attempts against unpatched, internet-facing **n8n** instances.

## Impact Assessment
A successful exploit of **CVE-2026-21858** would be catastrophic for an affected organization. The attacker would gain full control of the **n8n** server, equivalent to `root` or `administrator` privileges for the service. This access allows them to:
*   **Steal Sensitive Data**: Access and exfiltrate all credentials, API keys, and other secrets stored within **n8n** workflows and execution logs.
*   **Disrupt Business Operations**: Modify, delete, or disrupt critical business and IT automation workflows.
*   **Lateral Movement**: Use the compromised **n8n** server as a pivot point to attack other internal systems that **n8n** is connected to, such as databases, APIs, and cloud services.
*   **Deploy Malware**: Install ransomware, cryptominers, or other malicious software on the server.

## Cyber Observables for Detection
*   **Unusual Web Requests**: Monitor web server logs for requests to **n8n** webhook endpoints that have an unexpected `Content-Type` (e.g., `application/json` instead of `multipart/form-data`) but are processed by form-handling logic.
*   **Anomalous Process Execution**: On the **n8n** host, monitor for child processes spawned by the **n8n** service that are unusual or suspicious (e.g., `sh`, `bash`, `powershell.exe`, `curl`, `wget`).
*   **File System Monitoring**: Look for unexpected file creation or modification in sensitive directories by the **n8n** user account.

## Detection Methods
*   **Vulnerability Scanning**: Use vulnerability scanners with updated plugins to identify unpatched **n8n** instances in your environment.
*   **Log Analysis**: In your web application firewall (WAF) or reverse proxy logs, create rules to alert on requests to **n8n** endpoints where the `Content-Type` does not match the expected type for that endpoint's function.
*   **D3FEND Techniques**: Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to look for anomalous outbound connections from the **n8n** server, which could indicate a post-exploit C2 channel or data exfiltration.

## Remediation Steps
1.  **Upgrade Immediately**: The primary and most urgent action is to upgrade all self-hosted **n8n** instances to version `1.121.0` or newer. This is a direct application of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Restrict Access**: If immediate patching is not possible, restrict network access to the **n8n** instance to only trusted IP addresses. This is a temporary compensating control and not a substitute for patching.
3.  **Web Application Firewall (WAF)**: Deploy a WAF in front of the **n8n** instance with rules designed to block malformed requests or those with mismatched content types. This maps to [`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/).
4.  **Post-Patch Incident Review**: After patching, review logs for any signs of compromise prior to the update. If suspicious activity is found, assume a full breach and activate your incident response plan. Rotate all credentials and secrets stored in **n8n**.

## CVEs
- CVE-2026-21858 (CVSS 10)

**Tags:** n8n, CVE-2026-21858, RCE, Vulnerability, CVSS 10, Unauthenticated, Patch Management, Workflow Automation

## Sources
- [Critical unauthenticated RCE in n8n (CVE-2026-21858, CVSS 10.0) allows full instance takeover](https://www.orca.security/resources/blog/critical-unauthenticated-rce-in-n8n-cve-2026-21858-cvss-10-0-allows-full-instance-takeover/) — Orca Security (2026-01-07)
- [Critical n8n Vulnerability (CVSS 10.0) Allows Unauthenticated Attackers to Take Full Control](https://thehackernews.com/2026/01/critical-n8n-vulnerability-cvss-100.html) — The Hacker News (2026-01-07)

---
Source: https://cyber.netsecops.io/articles/critical-unauthenticated-rce-flaw-cvss-10-in-n8n-automation-tool/
