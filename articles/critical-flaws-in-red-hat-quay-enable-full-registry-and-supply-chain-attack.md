# Critical Flaws in Red Hat Quay Enable Full Registry and Supply Chain Attack

**Severity:** critical | **Category:** Vulnerability,Supply Chain Attack,Cloud Security | **Updated:** 2026-11-13 | **Reading time:** 5 min

Red Hat has patched two critical vulnerabilities in its Quay container registry, CVE-2026-123710 (CVSS 9.8) and CVE-2026-110697 (CVSS 9.9). These flaws could allow an attacker to achieve a full supply chain compromise by injecting malicious container images. The vulnerabilities enable an unauthenticated attacker to gain read/write access to any repository or a low-privileged user to steal tokens and manipulate images across tenants. All users of Quay 3 and 5 are urged to patch immediately.

## Executive Summary
**[Red Hat](https://www.redhat.com)** has disclosed and patched two **critical vulnerabilities** in its **Quay** container registry, a popular platform for storing, building, and deploying container images. The vulnerabilities, **[CVE-2026-123710](https://nvd.nist.gov/vuln/detail/CVE-2026-123710)** (CVSS 9.8) and **[CVE-2026-110697](https://nvd.nist.gov/vuln/detail/CVE-2026-110697)** (CVSS 9.9), create a severe risk of a software supply chain attack. When combined, they could allow a remote attacker to read, overwrite, and inject malicious code into any container image stored in the registry. This would lead to the deployment of compromised images into production environments. All versions of Quay 3 and Quay 5 are affected, and administrators are strongly advised to apply the available patches immediately.

---

## Vulnerability Details
The two vulnerabilities can be chained together or exploited separately to achieve a full compromise of the container registry.

### CVE-2026-123710: Trust-Key Injection (CVSS 9.8)
This is a critical flaw that allows a remote, unauthenticated attacker to install their own service signing key into the Quay registry. Due to improper input validation, an attacker can craft a request that causes the registry to accept and store a malicious, non-expiring key. Using this key, the attacker can then sign and issue their own registry tokens, granting them full read and write access to **any repository** on the Quay instance. This would allow them to, for example, replace the `latest` tag of a legitimate application image with a malicious one.

### CVE-2026-110697: SQL Injection leading to Token Theft (CVSS 9.9)
This vulnerability is an SQL injection flaw in the namespace lookup function, specifically related to an unescaped SQL `LIKE` wildcard. It allows any authenticated user, even one with very low privileges, to craft a query that can steal robot account tokens belonging to other tenants on the same multi-tenant Quay instance. Once an attacker has these tokens, they can impersonate the robot account and use its permissions to manipulate images, potentially poisoning a CI/CD pipeline.

---

## Affected Systems
- **Red Hat Quay 3:** All versions are affected.
- **Red Hat Quay 5:** All versions are affected.

Given Quay's role as a central artifact repository, it is often integrated with CI/CD platforms like **[OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift)**, Jenkins, or GitLab. A compromise of Quay can therefore lead to a widespread compromise of an organization's entire software delivery pipeline.

---

## Exploitation Status
As of November 13, 2026, there are no public reports of these vulnerabilities being exploited in the wild. However, given their critical severity and the detailed public disclosure, the risk of exploitation is high. Security researchers and threat actors will likely move quickly to develop exploits.

---

## Cyber Observables — Hunting Hints
The following patterns may help identify vulnerable systems or exploitation attempts:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Quay registry audit logs` | Monitor for the creation of new service signing keys, especially if they are unexpected or have unusual properties (e.g., non-expiring). | Quay application logs, SIEM. | high |
| log_source | `Quay database logs` | Monitor for malformed SQL queries containing wildcards (`%`, `_`) in unexpected places, which could indicate an SQLi attempt. | Database audit logs. | medium |
| network_traffic_pattern | `Anomalous image pushes` | An alert on an image being pushed to a repository from an unknown IP address or by an account that does not normally contribute to it. | Quay audit logs, network monitoring. | medium |

---

## Detection Methods
- **Version Scanning:** The most reliable method of detection is to check the version of your Quay instances. Use asset management or vulnerability scanning tools to identify all deployed Quay registries and verify if they are running a patched version.
- **Audit Log Review:** Actively review Quay's audit logs for any unauthorized or suspicious activity, such as unexpected token generation, key injection, or image pushes to critical repositories.
- **Image Signing and Verification:** If you are using image signing (e.g., Cosign), monitor for any images that are not signed or are signed with an untrusted key. An attacker might replace a signed image with an unsigned one.

---

## Remediation Steps
1.  **Patch Immediately:** The primary and most urgent action is to upgrade all Quay instances to a patched version as released by Red Hat. This is a critical vulnerability that requires immediate attention.
2.  **Rotate Credentials:** After patching, it is highly recommended to rotate all secrets, robot account tokens, and signing keys associated with the Quay registry as a precautionary measure. Assume that if your system was vulnerable, tokens may have been compromised.
3.  **Audit Repositories:** Review critical repositories and image tags (especially `latest`) to ensure that the image digests are what you expect them to be. Check the history of recent pushes for any signs of tampering.
4.  **Enforce Image Signing:** As a long-term mitigation, implement a strict policy of signing all container images and configuring your container runtime (e.g., Kubernetes) to only pull and run images that are signed with a trusted key. This is a key defense against supply chain attacks.

## CVEs
- CVE-2026-123710 (CVSS 9.8)
- CVE-2026-110697 (CVSS 9.9)

**Tags:** Vulnerability, Red Hat, Quay, CVE-2026-123710, CVE-2026-110697, Supply Chain Attack, Container Security

## Sources
- [Critical Red Hat Quay CVEs (CVSS 9.8/9.9): Comprehensive Threat Summary](https://aviatrix.ai/threat-research-center/critical-red-hat-quay-flaw-cve-2026-123710-cve-2026-110697-container-registry-compromise/) — Aviatrix (2026-11-13)
- [CVE-2026-123710 (Red Hat Quay)](https://nflo.tech/knowledge-base/2026-11-11-cve-2026-123710-en/) — nflo.tech (2026-11-11)
- [CVE-2026-123710](https://www.ionix.io/threat-center/cve-2026-123710/) — Ionix (2026-11-12)
- [wizardcyber.com](https://wizardcyber.com/november-2026-patch-tuesday-outlook-ntlm-zero-day/)
- [rapid7.com](https://www.rapid7.com/blog/post/em-patch-tuesday-november-2026/)
- [threatdefence.com](https://threatdefence.com/article/microsoft-outlook-cve-2026-124194-ntlm-zero-day-patching-hunting)
- [zerodayinitiative.com](https://www.zerodayinitiative.com/blog/2026/11/10/the-november-2026-security-update-review)
- [socprime.com](https://socprime.com/blog/cve-2026-124194-microsoft-outlook-zero-day-exploited-to-steal-ntlm-hashes/)

---
Source: https://cyber.netsecops.io/articles/critical-flaws-in-red-hat-quay-enable-full-registry-and-supply-chain-attack/
