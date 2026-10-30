# BeyondTrust Patches Critical Flaws in Remote Support and Privileged Access Tools

**Severity:** critical | **Category:** Vulnerability,Patch Management,Security Operations | **Updated:** 2026-07-08 | **Reading time:** 4 min

BeyondTrust has released urgent security patches for two critical authentication bypass vulnerabilities, CVE-2026-40138 and CVE-2026-40139, affecting its Remote Support and Privileged Remote Access platforms. The flaws could allow an unauthenticated remote attacker to gain privileged access to the management appliances. Given that these platforms are high-value targets for ransomware actors and the exploit probability is rated as extremely high, administrators are strongly advised to apply the updates immediately or implement network-level mitigations.

## Executive Summary
**[BeyondTrust](https://www.beyondtrust.com/)** has issued a security advisory for a pair of critical authentication bypass vulnerabilities in its Remote Support and Privileged Remote Access products. The vulnerabilities, tracked as **[CVE-2026-40138](https://nvd.nist.gov/vuln/detail/CVE-2026-40138)** and **[CVE-2026-40139](https://nvd.nist.gov/vuln/detail/CVE-2026-40139)**, could allow a remote, unauthenticated attacker to gain access to the core appliance, potentially leading to a full compromise of managed systems. These platforms are powerful tools used to manage privileged access across an enterprise, making them a prime target for threat actors, especially ransomware groups seeking to escalate privileges and move laterally. With an exploit probability rated at the 100th percentile, immediate action is required to prevent what experts consider an imminent threat.

---

## Vulnerability Details
The two critical vulnerabilities could allow an attacker to bypass authentication and gain control of the BeyondTrust appliance:
- **CVE-2026-40138**: An improper authentication vulnerability that could allow an unprivileged attacker to gain access to the appliance. This suggests a flaw in the logic that verifies user permissions, potentially allowing for privilege escalation to an administrative level.

- **CVE-2026-40139**: This flaw stems from the mishandling of remote support authentication requests. It could grant a completely unauthenticated remote attacker direct access to the appliance. This is the more severe of the two, as it requires no prior access or credentials.

Successful exploitation of either vulnerability would give an attacker a strategic foothold from which to control privileged sessions, steal credentials, and access any system managed by the BeyondTrust platform.

## Affected Systems
- **Product**: BeyondTrust Remote Support
- **Affected Versions**: `25.3.2` and earlier

- **Product**: BeyondTrust Privileged Remote Access
- **Affected Versions**: `25.3.2` and earlier

## Exploitation Status
While there is no public confirmation of active exploitation in the wild at this time, the exploit probability has been rated at the 100th percentile by security experts. This indicates that the vulnerabilities are likely easy to exploit and a proof-of-concept exploit is expected to be developed and used by threat actors imminently. Organizations should treat this as an active threat.

## Impact Assessment
A compromise of a BeyondTrust appliance is a worst-case scenario for many organizations:
- **Complete Infrastructure Compromise**: Attackers gaining control of a Privileged Access Management (PAM) solution can access every critical server, database, and network device managed by it.
- **Ransomware Deployment**: Ransomware groups frequently target remote access and PAM tools to deploy their payloads across an entire network simultaneously.
- **Data Exfiltration**: Attackers can steal credentials for all managed systems and use them to exfiltrate vast amounts of sensitive data.
- **Loss of Control**: The very tool used to secure and manage the environment becomes the primary weapon used against it.

## Cyber Observables — Hunting Hints
Security teams should hunt for signs of compromise on their BeyondTrust appliances:
| Type | Value | Description |
|---|---|---|
| log_source | `BeyondTrust Appliance Audit Logs` | Look for any successful administrative logins from unknown or suspicious IP addresses. |
| network_traffic_pattern | `Anomalous outbound connections from appliance` | The BeyondTrust appliance should generally only communicate with known endpoints. Any new, unexpected outbound connections could indicate a C2 channel. |
| other | `Unexplained user accounts or configuration changes` | Audit the appliance configuration for any new user accounts, modified permissions, or changes to security settings that were not made by authorized administrators. |

## Detection Methods
1.  **Version Checking**: The most straightforward detection method is to check the version number of all BeyondTrust appliances in the environment to see if they are `25.3.2` or earlier.
2.  **Log Analysis**: Ingest appliance logs into a SIEM. Create alerts for any successful login that bypasses expected authentication steps or originates from an untrusted network, if such data is available in the logs.
3.  **Network Monitoring**: Monitor all network traffic to and from the BeyondTrust appliances. Any connections on non-standard ports or to suspicious external IPs should be investigated immediately.

## Remediation Steps
1.  **Patch Immediately (D3-SU: Software Update)**: The primary and most urgent recommendation is to apply the patches released by BeyondTrust. This is the only way to fully remediate the vulnerabilities. Reference **[MITRE M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
2.  **Mitigation - Restrict Access**: For organizations that cannot patch immediately, BeyondTrust recommends a critical compensating control: restrict all network access to the appliance's management interface to a trusted, internal network segment. This means blocking all access from the internet and other untrusted parts of the corporate network until the patch can be deployed. Reference **[MITRE M1035 - Limit Access to Resource Over Network](https://attack.mitre.org/mitigations/M1035/)**.
3.  **Review Logs**: After patching, review all authentication and session logs on the appliance for any signs of suspicious activity that may have occurred before the patch was applied.

## CVEs
- CVE-2026-40138
- CVE-2026-40139

**Tags:** BeyondTrust, Vulnerability, Authentication Bypass, CVE-2026-40138, CVE-2026-40139, PAM, Patch Management

## Sources
- [Daily DefSec Brief - Cyber Security News for July 7 2026](https://www.youtube.com/watch?v=M43OzpqzfLc) — YouTube (2026-07-07)

---
Source: https://cyber.netsecops.io/articles/beyondtrust-patches-critical-authentication-bypass-flaws-in-remote-access-tools/
