# Second CVSS 10.0 RCE Hits n8n, Allows Authenticated Takeover

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Cloud Security | **Updated:** 2026-01-07 | **Reading time:** 4 min

A second maximum-severity vulnerability, CVE-2026-21877, has been disclosed in the n8n workflow automation platform, also rated CVSS 10.0. Unlike the recently revealed unauthenticated flaw, this vulnerability requires an attacker to be an authenticated user. A low-privileged user can exploit the flaw to achieve remote code execution (RCE), leading to a full takeover of the n8n instance. This could allow an attacker to steal credentials, disrupt workflows, and pivot into connected internal systems. The vulnerability affects both self-hosted and cloud versions of n8n. A patch was released in version 1.121.3 in November 2025, but organizations running older versions remain at high risk. This string of critical flaws puts immense pressure on n8n administrators to patch and secure their instances.

## Executive Summary
Hot on the heels of an unauthenticated RCE disclosure, a second critical vulnerability has been revealed in the **[n8n](https://n8n.io/)** open-source automation platform. Tracked as **[CVE-2026-21877](https://www.cve.org/CVERecord?id=CVE-2026-21877)**, this flaw also carries a CVSS score of 10.0 but requires the attacker to have valid credentials, even with low privileges. A successful exploit allows an authenticated user to execute arbitrary code on the server, resulting in a complete compromise of the **n8n** instance. This affects both self-hosted and official **n8n Cloud** deployments, posing a severe risk of credential theft, data exposure, and lateral movement. The vulnerability was responsibly disclosed and patched in version 1.121.3 in November 2025. However, any organization that has not upgraded is exposed, especially to insider threats or in scenarios where an attacker has already obtained low-level user credentials.

## Vulnerability Details
**CVE-2026-21877** is an authenticated remote code execution vulnerability. The CVSS 10.0 score is derived from the low attack complexity and the high impact on confidentiality, integrity, and availability, despite the authentication requirement. The attack vector is through the network. A malicious user with any level of authenticated access to an **n8n** instance can abuse certain application features (reportedly related to the Git node functionality) to cause the service to execute untrusted code. This means that a threat actor who has phished a low-privilege user's credentials can escalate their access to full control over the automation platform and the underlying server.

## Affected Systems
*   **Product**: **n8n** (self-hosted and n8n Cloud instances)
*   **Affected Versions**: All versions prior to `1.121.3`
*   **Unaffected Versions**: `1.121.3` and later

## Exploitation Status
The vulnerability was responsibly disclosed by security researcher Théo Lelasseux, and a patch was made available in November 2025. The public disclosure occurred on January 7, 2026. While active exploitation in the wild has not been confirmed, the availability of technical details means that threat actors will likely develop exploits. The primary threat comes from attackers who have already achieved an initial foothold and are looking to escalate privileges.

## Impact Assessment
The impact of exploiting **CVE-2026-21877** is identical to the unauthenticated RCE flaw for an attacker who has already gained initial access. It provides a powerful privilege escalation vector. An attacker can:
*   **Achieve Full System Control**: Gain shell access to the server running **n8n**.
*   **Access All Secrets**: Steal all API keys, database credentials, and other secrets managed by **n8n**.
*   **Pivot to Internal Systems**: Use the compromised server and its network connections to attack other parts of the corporate network.
*   **Manipulate Business Processes**: Alter or disrupt critical automation workflows, causing financial or operational damage.

## Cyber Observables for Detection
*   **Anomalous Git Node Usage**: Monitor **n8n** audit logs for unusual or unexpected configurations or executions of the Git node, especially by low-privileged users.
*   **Suspicious Process Execution**: As with the previous RCE, monitor for the **n8n** process spawning shells (`sh`, `bash`) or other unexpected child processes.
*   **User Behavior Analytics**: Look for a user account suddenly performing actions inconsistent with their role, particularly related to creating or modifying workflows with sensitive components like the Git node.

## Detection Methods
*   **Version Checking**: The most reliable detection method is to check the version of all **n8n** instances. Any instance not running `1.121.3` or later should be considered vulnerable.
*   **Audit Log Review**: Regularly review **n8n**'s internal audit logs for suspicious workflow modifications or executions, especially from non-administrative users.
*   **D3FEND Techniques**: Use [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) to detect when a user account begins interacting with application features or data in a way that deviates from its established baseline.

## Remediation Steps
1.  **Upgrade Immediately**: All users of self-hosted and Cloud **n8n** instances must ensure they are running version `1.121.3` or newer. This is the primary and most effective remediation. This is a direct application of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Apply Temporary Mitigation**: If patching is not immediately possible, **n8n** has suggested workarounds:
    *   Disable the Git node functionality within the instance.
    *   Strictly enforce the principle of least privilege. Review all user permissions and restrict access for non-administrative or untrusted users to prevent them from creating or modifying workflows. This aligns with [`M1018 - User Account Management`](https://attack.mitre.org/mitigations/M1018/).
3.  **Credential Rotation**: After patching, as a precautionary measure, consider rotating all credentials and secrets stored within the **n8n** instance.

## CVEs
- CVE-2026-21877 (CVSS 10)

**Tags:** n8n, CVE-2026-21877, RCE, Vulnerability, CVSS 10, Authenticated, Privilege Escalation, Cloud Security

## Sources
- [CVE-2026-21877: Max-Severity n8n Flaw Allows Authenticated RCE](https://socradar.io/cve-2026-21877-max-severity-n8n-flaw-allows-authenticated-rce/) — SOCRadar (2026-01-07)
- [Authenticated RCE in n8n](https://github.com/n8n-io/n8n/security/advisories/GHSA-56pq-h65v-w7x7) — GitHub (2026-01-07)

---
Source: https://cyber.netsecops.io/articles/second-critical-rce-flaw-in-n8n-disclosed-cvss-10-0/
