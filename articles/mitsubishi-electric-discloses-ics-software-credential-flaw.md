# Mitsubishi ICS Software Flaw Exposes Credentials in Plaintext

**Severity:** medium | **Category:** Vulnerability,Industrial Control Systems,Patch Management | **Updated:** 2025-11-27 | **Reading time:** 6 min

On November 27, 2025, Mitsubishi Electric issued a security advisory for CVE-2025-3784, an information disclosure vulnerability in its GX Works2 industrial control system (ICS) software. The flaw, which affects all versions of the software, involves the storage of credential information in plaintext within project files. An attacker with local access to a computer running the software could extract these credentials and use them to bypass authentication on project files, allowing them to view or modify critical industrial process information. The vulnerability has a CVSS score of 5.5. Mitsubishi is developing a patch and has provided interim mitigation guidance.

## Executive Summary
**[Mitsubishi Electric](https://www.mitsubishielectric.com/en/index.html)** has disclosed an information disclosure vulnerability, **[CVE-2025-3784](https://nvd.nist.gov/vuln/detail/CVE-2025-3784)**, in its **GX Works2** industrial automation software. The advisory, released on November 27, 2025, states that all versions of the software are affected. The vulnerability, classified as CWE-312 (Cleartext Storage of Sensitive Information), allows for the extraction of plaintext credentials from project files. An attacker with local access to an engineering workstation could steal these credentials to gain unauthorized access to sensitive project files, potentially enabling them to alter critical industrial processes. The flaw has a CVSS v3 base score of 5.5 (Medium). A patched version is in development, and Mitsubishi has provided mitigation advice to reduce the risk of exploitation.

## Vulnerability Details
The vulnerability is straightforward but has significant implications in an **[Industrial Control Systems (ICS)](https://en.wikipedia.org/wiki/Industrial_control_system)** environment. GX Works2, used for programming and maintaining Mitsubishi Electric automation controllers (PLCs), insecurely stores user credentials within its project files (`.gxwx`).
*   **CVE ID**: CVE-2025-3784
*   **CVSS Score**: 5.5 (Medium)
*   **Vulnerability Type**: CWE-312: Cleartext Storage of Sensitive Information
*   **Attack Vector**: Local
*   **Impact**: An attacker with read access to a project file can extract credentials. These credentials can then be used to bypass authentication mechanisms protecting the project file, leading to unauthorized viewing or modification of the project's logic.

While the attack requires initial local access to the workstation where the project files are stored, this is a common scenario in multi-stage ICS attacks where an attacker first compromises an engineer's machine.

## Affected Systems
*   **Product**: Mitsubishi Electric GX Works2
*   **Versions**: All versions are affected.

A fixed version of the software is currently under development.

## Exploitation Status
There is no indication that this vulnerability is being actively exploited in the wild. However, its disclosure could lead to threat actors incorporating it into their toolkits for targeting industrial environments. The researcher Jiho Shin is credited with discovering and reporting the flaw.

## Impact Assessment
An attacker who successfully exploits this vulnerability could gain the ability to modify the logic running on PLCs that control physical processes. This could lead to:
*   **Process Disruption**: Altering code to shut down a production line or cause equipment to malfunction ([`T0831 - Manipulation of Control`](https://attack.mitre.org/techniques/T0831/)).
*   **Sabotage**: Introducing subtle changes to a process that could damage equipment or create unsafe conditions.
*   **Intellectual Property Theft**: Stealing the proprietary logic and configurations that define a manufacturing process.

The requirement for local access lowers the CVSS score, but the potential impact on an OT environment remains high. In a targeted attack, gaining access to an engineering workstation is a key objective, making this vulnerability a valuable stepping stone for an adversary.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| file_path | `*.gxwx` | Monitor for unauthorized access, copying, or exfiltration of GX Works2 project files. |
| process_name | `GXW2.exe` | Monitor for unusual behavior from the main GX Works2 process. |
| user_account_pattern | Logins to engineering workstations from non-engineering staff or at unusual times. | Indicator of a compromised workstation. |

## Detection Methods
Detection should focus on protecting the engineering workstations and the project files themselves. Use File Integrity Monitoring (FIM) to alert on any unauthorized access or modification of `.gxwx` project files. EDR solutions on engineering workstations can detect suspicious activity, such as the exfiltration of these files to an external location. Network monitoring at the IT/OT boundary can also detect the transfer of these files out of the OT network. D3FEND's [`D3-LFP: Local File Permissions`](https://d3fend.mitre.org/technique/d3f:LocalFilePermissions) is the core defensive principle here.

## Remediation Steps
Since a patch is not yet available, Mitsubishi Electric has provided the following interim mitigations:
1.  **Restrict Access**: Implement strict physical and logical access controls for PCs running GX Works2. Only authorized engineers should have access to these workstations.
2.  **Network Hardening**: Operate the affected PCs on a trusted local network and use firewalls or VPNs to block access from untrusted networks. Prevent these workstations from having direct internet access.
3.  **File Permissions**: Use operating system access controls to restrict access to the folders where GX Works2 project files are stored. Only authorized users should have read/write permissions.
4.  **Antivirus Software**: Install and maintain up-to-date antivirus software on the workstations to prevent the initial compromise that would grant an attacker local access.
5.  **Apply Patch**: Once the fixed version of GX Works2 is released, organizations should prioritize its deployment to all engineering workstations.

## CVEs
- CVE-2025-3784 (CVSS 5.5)

**Tags:** CVE-2025-3784, Mitsubishi Electric, GX Works2, ICS, OT Security, Vulnerability, Credential Storage

## Sources
- [Information Disclosure Vulnerability in GX Works2](https://www.mitsubishielectric.com/en/psirt/vulnerability/pdf/2025-015_en.pdf) — Mitsubishi Electric (2025-11-27)

---
Source: https://cyber.netsecops.io/articles/mitsubishi-electric-discloses-ics-software-credential-flaw/
