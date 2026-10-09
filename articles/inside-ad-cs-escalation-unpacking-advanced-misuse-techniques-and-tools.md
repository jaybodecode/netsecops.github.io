# AD CS Escalation Deep Dive: How Attackers Abuse Certificate Templates for Domain Dominance

**Severity:** high | **Category:** Threat Intelligence,Vulnerability,Threat Actor | **Updated:** 2026-05-12 | **Reading time:** 14 min

Security researchers from Unit 42 have published a detailed analysis of advanced attacks targeting Active Directory Certificate Services (AD CS). The report highlights how threat actors, from ransomware groups to state-sponsored entities, are exploiting common misconfigurations in certificate templates and abusing shadow credentials to escalate privileges and achieve complete domain control. The research focuses on techniques like ESC1, where attackers can request certificates to impersonate high-privilege accounts. Rather than relying on malware, these attacks leverage native Windows functionality, making them difficult to detect with traditional signature-based tools. The analysis emphasizes the need for behavioral analytics and provides actionable guidance for defenders to identify and mitigate these stealthy but highly impactful threats to enterprise identity infrastructure.

## Executive Summary

Active Directory Certificate Services (AD CS) has emerged as a critical, yet frequently under-monitored, attack surface within enterprise environments. Adversaries are not leveraging zero-day vulnerabilities but are instead abusing insecure default settings, design complexities, and misconfigured certificate templates to escalate privileges, impersonate identities, and establish persistent access. This analysis from **[Unit 42](https://unit42.paloaltonetworks.com)** details the common TTPs used in these attacks, focusing on certificate template abuse (such as the ESC1 technique) and shadow credential misuse. These methods allow an attacker with low-level access to potentially gain full domain administrator privileges. The key takeaway for defenders is that traditional, signature-based detection is insufficient. Effective defense requires a shift towards behavioral analytics, diligent auditing of AD CS configurations, and a deep understanding of the legitimate-looking activities that can mask malicious intent.

---

## Threat Overview

**[Active Directory Certificate Services (AD CS)](https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/active-directory-certificate-services-overview)** is a core component of Windows enterprise infrastructure, managing the Public Key Infrastructure (PKI) that underpins authentication and encryption. However, its complexity and often-insecure default configurations make it a prime target for attackers. Instead of deploying malware, adversaries exploit the native functionality of AD CS to issue certificates that grant them the privileges of other users, including domain administrators.

This method of attack has become a standard part of the playbook for both financially motivated groups and state-sponsored actors like **[Fighting Ursa](https://attack.mitre.org/groups/G0007/)**. The attack lifecycle typically involves five phases:
1.  **Reconnaissance:** Identifying the AD CS server.
2.  **Enumeration:** Discovering vulnerable certificate templates using tools like **[Certipy](https://github.com/ly4k/Certipy)**.
3.  **Request:** Requesting a malicious certificate based on a weak template.
4.  **Impersonation:** Using the obtained certificate to impersonate a privileged user or computer.
5.  **Persistence:** Maintaining access through the newly acquired credentials or by creating shadow credentials.

This approach is particularly dangerous because the malicious activity is often indistinguishable from legitimate administrative tasks, allowing attackers to operate undetected for long periods.

---

## Technical Analysis

Adversaries primarily exploit two key weaknesses in AD CS: misconfigured certificate templates and shadow credential abuse.

### Certificate Template Misconfigurations (ESC1)

The most common and impactful technique, first cataloged by **SpecterOps** researchers, is known as ESC1. This attack is possible when a certificate template has a specific combination of weak settings:

*   **Enrollee Supplies Subject:** The `CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT` flag is enabled, allowing the requester to specify any Subject Alternative Name (SAN) in the Certificate Signing Request (CSR).
*   **Permissive Enrollment Rights:** A low-privileged user or group (like 'Domain Users') has permission to enroll in the template.
*   **Grants Privileged Access:** The certificate allows for authentication (e.g., 'Client Authentication' EKU) or is configured for a template like 'Subordinate Certification Authority'.

An attacker can use a tool like `Certipy` to enumerate these templates. Once a vulnerable template is found, the attacker requests a certificate, specifying a domain administrator's account in the SAN. The CA, trusting the template's configuration, issues the certificate. The attacker can then use this certificate with a tool like `Rubeus` to request a Kerberos Ticket-Granting Ticket (TGT) for the impersonated administrator, effectively granting them full domain admin rights.

This is consistent with the abuse of **[CVE-2022-26923](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-26923)**, where attackers could elevate privileges by acquiring a certificate from AD CS. The report notes an instance where the file `update6.exe` was used in an attempt to exploit this vulnerability.

### Shadow Credential Abuse

Shadow credentials are a persistence technique where an attacker, having already gained high privileges, modifies an attribute on a user or computer object (e.g., `msDS-KeyCredentialLink`) to add their own credential, such as a certificate. This allows the attacker to authenticate as that user without knowing their password. This modification is often not logged by default and can be extremely difficult to detect, providing the attacker with durable, stealthy persistence.

### MITRE ATT&CK TTPs

*   **[`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/):** The core purpose of abusing AD CS is to escalate from a low-privilege account to a high-privilege one.
*   **[`T1648.003 - Certificate-based Authentication`](https://attack.mitre.org/techniques/T1648/003/):** Attackers leverage certificates obtained from AD CS to authenticate as privileged users.
*   **[`T1087.002 - Domain Account`](https://attack.mitre.org/techniques/T1087/002/):** Attackers enumerate domain accounts to identify high-privilege targets for impersonation.
*   **[`T1558.003 - Kerberoasting`](https://attack.mitre.org/techniques/T1558/003/):** While not directly AD CS, obtaining a privileged TGT via a certificate is a similar end-goal.
*   **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The ultimate goal is to gain access to and use valid, privileged accounts.

---

## Impact Assessment

The successful exploitation of AD CS can lead to a full compromise of the Active Directory domain. The business impact is severe and includes:

*   **Complete Domain Takeover:** Attackers can gain control of Domain Admin accounts, giving them unrestricted access to all systems, data, and resources on the network.
*   **Data Exfiltration:** With full access, attackers can exfiltrate sensitive corporate data, intellectual property, and customer information.
*   **Ransomware Deployment:** Privileged access allows for the widespread deployment of ransomware across the entire enterprise, leading to catastrophic operational disruption.
*   **Stealthy Persistence:** Techniques like shadow credentials provide attackers with long-term, hard-to-detect access, allowing them to remain in the network even after initial remediation efforts.

---

## IOCs — Directly from Articles

No traditional IOCs like IP addresses or hashes were provided, but the following file name was associated with exploitation attempts.

| Type | Value | Description |
|---|---|---|
| File Name | `update6.exe` | Dropped file used in an attempt to exploit CVE-2022-26923 for privilege escalation. |

---

## Cyber Observables — Hunting Hints

The following patterns could indicate related activity and can be used for threat hunting:

*   **Unusual Certificate Requests:** Monitor for a surge in certificate requests from unusual users or endpoints. Look for requests for templates that grant authentication from non-administrative accounts.
*   **SAN Mismatches:** Correlate the machine account making a certificate request with the Subject Alternative Name (SAN) in the request. A mismatch (e.g., `PC1$` requesting a cert for `DomainAdmin`) is a strong indicator of an ESC1 attack.
*   **Tool Usage:** Search for command-line execution of tools like `Certipy`, `Certify`, or `Rubeus`. Look for command line arguments like `find -vulnerable` or `request -ca`.
*   **Network Traffic:** Monitor for traffic to the AD CS web enrollment pages (e.g., `/certsrv/`) from unusual client workstations.
*   **Event Logs:** Scrutinize Windows Event Logs on the CA server, particularly Event ID `4882` (request created), `4887` (request approved and certificate issued), and `4888` (request denied).

---

## Detection & Response

Detecting AD CS abuse requires moving beyond signatures and focusing on behavior. Products like **[Cortex XDR](https://www.paloaltonetworks.com/cortex/cortex-xdr)** and **Cortex XSIAM** leverage User Entity Behavior Analytics (UEBA) to identify these attacks.

1.  **Monitor CA Event Logs:** Forward AD CS logs to a SIEM. Create alerts for high-risk events, such as the issuance of certificates from templates that allow subject name to be supplied by the requester. Specifically, monitor Event IDs `4882`, `4887`, and `5136` (Directory Service Object modified, for shadow credentials).
2.  **Behavioral Analytics ([D3-UBA](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)):** Deploy UEBA solutions to establish a baseline of normal user and entity behavior. Anomalies, such as a user account that has never interacted with AD CS suddenly requesting a certificate, should trigger an alert.
3.  **Network Traffic Analysis ([D3-NTA](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)):** Analyze traffic to and from the CA. Any non-standard communication or connections from unexpected sources should be investigated.
4.  **Endpoint Detection:** Use an EDR solution to monitor for the execution of suspicious processes and command-line arguments related to certificate enumeration and request tools (`certipy.exe`, `certreq.exe`).

---

## Mitigation

Strengthening AD CS security involves a combination of configuration hardening, access control, and monitoring.

1.  **Audit and Harden Certificate Templates:** This is the most critical step. Review all certificate templates and disable or remove any that are not required. For those in use, ensure they are configured securely:
    *   Disable the `Enrollee Supplies Subject` setting (`CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT`) on templates where it is not absolutely necessary.
    *   If required, enable the 'Manager Approval' setting to add a human verification step.
    *   Use the `Restrict enrollment agents` setting.
2.  **Apply Principle of Least Privilege ([D3-UAP](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)):** Tightly control who has enrollment permissions on certificate templates. Avoid granting these rights to broad groups like 'Authenticated Users' or 'Domain Users'.
3.  **Patching ([D3-SU](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)):** Ensure all domain controllers and CA servers are fully patched to protect against known vulnerabilities like **CVE-2022-26923**.
4.  **Enable Enhanced Logging:** Increase logging levels for AD CS and Active Directory to capture detailed information about certificate requests and object modifications.
5.  **Restrict NTLM:** Where possible, disable NTLM authentication and enforce Kerberos, which can help mitigate some relay-style attacks associated with certificate abuse.

## CVEs
- CVE-2022-26923 (CVSS 8.8)

**Tags:** AD CS, Active Directory, Privilege Escalation, Certificate Templates, ESC1, Shadow Credentials, UEBA, PKI, CVE-2022-26923, Certipy

## Sources
- [Inside AD CS Escalation: Unpacking Advanced Misuse Techniques and Tools](https://unit42.paloaltonetworks.com/active-directory-certificate-services-exploitation/) — Unit 42 (2026-05-11)

---
Source: https://cyber.netsecops.io/articles/inside-ad-cs-escalation-unpacking-advanced-misuse-techniques-and-tools/
