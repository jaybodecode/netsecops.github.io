# Fortra Patches Critical Flaws in BoKS Privileged Access Manager

**Severity:** critical | **Category:** Vulnerability,Patch Management | **Updated:** 2026-10-04 | **Reading time:** 4 min

Fortra has released security updates for its Core Privileged Access Manager (BoKS) platform, addressing eight vulnerabilities, three of which are critical. The most severe flaw, CVE-2026-79901 (CVSS 9.9), allows for a full authentication bypass. Other critical bugs include a command injection vulnerability (CVE-2026-79898, CVSS 9.1) leading to root-level command execution, and a stack buffer overflow (CVE-2026-12627, CVSS 9.8) that could cause arbitrary code execution. Fortra is not aware of any active exploitation and urges customers to apply the patches immediately.

## Executive Summary
**[Fortra](https://www.fortra.com/)** has issued patches for eight vulnerabilities in its Core Privileged Access Manager (BoKS) solution, a platform for managing access control on Unix and Linux systems. Three of these vulnerabilities are rated critical and expose customers to significant risk, including authentication bypass, remote command execution with root privileges, and system compromise. The most severe flaw, **[CVE-2026-79901](https://nvd.nist.gov/vuln/detail/CVE-2026-79901)**, is an authentication bypass with a CVSS score of 9.9. The other critical issues are **[CVE-2026-79898](https://nvd.nist.gov/vuln/detail/CVE-2026-79898)** (CVSS 9.1) and **[CVE-2026-12627](https://nvd.nist.gov/vuln/detail/CVE-2026-12627)** (CVSS 9.8). Fortra has stated it has no evidence of these flaws being exploited in the wild, but due to their severity, immediate patching is strongly recommended.

---

## Vulnerability Details
The three critical vulnerabilities present distinct paths to system compromise:

- **CVE-2026-79901 (CVSS 9.9) - Authentication Bypass:** This flaw exists in BoKS Manager deployments using BoKS keytab for managing Active Directory service account passwords. The password generation process uses a predictable pseudo-random number generator seeded with the current Unix timestamp. An attacker who knows the service principal name and can estimate the time of a password change can generate a list of possible passwords and validate them offline, eventually gaining unauthorized access without triggering failed login alerts.

- **CVE-2026-79898 (CVSS 9.1) - Command Injection:** A command injection vulnerability in the `crlserver` component allows an authenticated user to execute arbitrary shell commands with root privileges on the BoKS Master server. This can be exploited remotely via the BCC and WSI REST or SOAP APIs, bypassing the need for local sudo rules.

- **CVE-2026-12627 (CVSS 9.8) - Stack Buffer Overflow:** This flaw in the autoregistration function of BoKS can be triggered by a remote, unauthenticated attacker. It leads to memory corruption, which could cause a denial of service or, potentially, allow for arbitrary code execution.

## Affected Systems
- Fortra Core Privileged Access Manager (BoKS)
- Specific versions affected have been detailed in Fortra's security advisory.

## Exploitation Status
As of October 3, 2026, Fortra is not aware of any of these vulnerabilities being actively exploited in the wild. However, due to the public disclosure and the critical nature of the flaws, the risk of future exploitation is high.

## Impact Assessment
Successful exploitation of these vulnerabilities could lead to a complete compromise of the BoKS management platform and, by extension, the entire fleet of Unix and Linux systems it manages. An attacker could gain root-level access across the environment, steal sensitive data, deploy ransomware, and establish persistent control. The authentication bypass flaw is particularly dangerous as it allows for stealthy initial access.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to identify vulnerable systems or exploitation attempts:
| Type | Value | Description | Context |
|---|---|---|---|
| process_name | `crlserver` | Monitor for unusual child processes spawned by the crlserver process, which could indicate command injection. | EDR, Sysmon (Event ID 1) |
| url_pattern | `/bcc/`, `/wsi/` | Look for anomalous requests to the BCC and WSI REST/SOAP APIs. | Web server logs, API Gateway Logs |
| network_traffic_pattern | Traffic to BoKS autoregistration port from untrusted sources. | Could indicate attempts to trigger the buffer overflow. | Firewall logs, IDS/IPS |

## Detection Methods
- **Log Analysis:** Monitor BoKS Manager logs for any unusual authentication patterns or errors, especially related to keytab management. Review API logs for the `crlserver` for any suspicious commands or parameters.
- **File Integrity Monitoring:** Monitor critical BoKS binaries and configuration files for any unauthorized changes.
- **Vulnerability Scanning:** Use vulnerability scanners with updated plugins to identify unpatched BoKS instances within the environment.

## Remediation Steps
1.  **Apply Patches:** The primary and most effective remediation is to apply the security patches provided by Fortra immediately. This is a critical action, as per [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Restrict Network Access:** As a compensating control, restrict network access to the BoKS Manager and its API endpoints. Access should be limited to trusted administrative workstations and servers only, following the principle of [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).
3.  **Review Accounts:** Audit all accounts within BoKS, especially service accounts, to ensure they adhere to the principle of least privilege.

## CVEs
- CVE-2026-79901 (CVSS 9.9)
- CVE-2026-79898 (CVSS 9.1)
- CVE-2026-12627 (CVSS 9.8)

**Tags:** Vulnerability, Fortra, BoKS, PAM, CVE, Linux, Unix, Patch Management

## Sources
- [Fortra Patches Critical Vulnerabilities in BoKS](https://www.securityweek.com/fortra-patches-critical-vulnerabilities-in-boks/) — SecurityWeek (2026-10-03)
- [Fortra Releases Security Patches to Address Critical BoKS Vulnerabilities](https://www.news4hackers.com/fortra-releases-security-patches-to-address-critical-boks-vulnerabilities/) — News4Hackers (2026-10-03)
- [Fortra patches BoKS flaws in the tool that guards Linux admin access](https://pulse.adyog.com/insights/fortra-boks-privileged-access-flaws) — Adyog Pulse

---
Source: https://cyber.netsecops.io/articles/fortra-patches-critical-vulnerabilities-in-boks-pam/
