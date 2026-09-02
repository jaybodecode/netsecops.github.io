# Over-Privileged Active Directory Domain-Join Accounts Create Major Security Risk

**Severity:** high | **Category:** Security Operations,Vulnerability,Threat Intelligence | **Updated:** 2025-10-28 | **Reading time:** 5 min

A new security analysis reveals that Active Directory (AD) domain-join accounts, even when configured according to official guidance, often inherit excessive privileges that create a reliable pathway for attackers to achieve full domain compromise. These specialized accounts, used for automated machine provisioning, can have their credentials exposed during deployment. Attackers can then abuse the account's powerful default permissions, such as object ownership and rights related to Resource-Based Constrained Delegation (RBCD), to escalate privileges and take over computer objects.

## Executive Summary
A security analysis published on October 28, 2025, details a systemic weakness in **[Microsoft](https://www.microsoft.com/security)** **Active Directory** environments related to the use of domain-join accounts. These accounts, designed to automate the process of joining computers to a domain at scale, are frequently over-privileged by default. Even when following official guidance, these accounts inherit powerful permissions that threat actors can abuse for privilege escalation and full domain compromise. The risk is twofold: the credentials for these accounts are often exposed in plaintext during deployment processes, and their default rights allow for the takeover of the computer objects they create, creating a reliable vector for attackers to expand their foothold within a network.

---

## Vulnerability Details
The issue is not a single CVE but a systemic configuration weakness in how Active Directory handles permissions for accounts delegated the right to join computers to the domain.

1.  **Credential Exposure:** During automated OS deployments using tools like Microsoft Configuration Manager (MCM) or PXE boot processes, the credentials for the domain-join account are often stored in plaintext within configuration files like `unattend.xml` or in deployment scripts. An attacker with initial access to the network can often easily recover these credentials.

2.  **Excessive Inherited Privileges:** Once an attacker has the credentials, they can abuse the permissions the domain-join account holds over the computer objects it creates:
    -   **Object Ownership:** The domain-join account automatically becomes the 'owner' of the computer object it creates. This grants it powerful rights, including `Read` access to all attributes, which can expose sensitive information like the LAPS password (`ms-Mcs-AdmPwd`).
    -   **Resource-Based Constrained Delegation (RBCD) Abuse:** The account also gains `Write` permission to the `msDS-AllowedToActOnBehalfOfOtherIdentity` attribute on the computer object. This allows an attacker to configure RBCD, effectively granting them the ability to impersonate any user and authenticate to that computer, leading to a full takeover of the machine ([`T1558.003 - Kerberoasting`](https://attack.mitre.org/techniques/T1558/003/)).

This creates a repeatable attack path: obtain domain-join credentials -> use them to create a new computer object -> abuse ownership and RBCD rights to take over that computer -> escalate privileges further.

## Affected Systems
This is a configuration and architectural weakness affecting virtually all **Active Directory Domain Services** environments that use dedicated accounts for automated domain joins, a common practice in medium to large enterprises.

## Exploitation Status
This attack path has been known in the security community for some time, with initial reports dating back to 2021. It is a well-documented technique used by penetration testers and likely by advanced threat actors. Microsoft acknowledged the complexity and risks in official guidance published in August 2025.

## Impact Assessment
The impact of this misconfiguration is severe, as it provides a direct and often easy path to privilege escalation.
-   **Privilege Escalation:** An attacker with a low-privileged domain-join account can escalate to `SYSTEM` privileges on any machine they are able to create.
-   **Lateral Movement:** By taking over computer objects, attackers can move laterally across the network.
-   **Domain Compromise:** If the compromised computer has privileged users logged in, the attacker can harvest their credentials and potentially escalate to full Domain Admin, leading to a complete network takeover.

## Cyber Observables for Detection

| Type                   | Value                                                | Description                                                                                                                                   |
|:-----------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| event_id               | `4741`                                               | A new computer account was created. Monitor for creation by the designated domain-join account, especially outside of normal provisioning hours. |
| event_id               | `5136`                                               | A directory service object was modified. Look for modifications to the `msDS-AllowedToActOnBehalfOfOtherIdentity` attribute.                  |
| command_line_pattern   | `PowerView.ps1`, `Add-DomainComputer`                | Use of common offensive security tools or PowerShell cmdlets to add computer accounts or modify their delegation rights.                      |
| log_source             | `unattend.xml`, `cct-provisioning-data.xml`          | Scan network shares and deployment servers for these files containing plaintext credentials.                                                  |

## Detection Methods
-   **Audit AD Permissions:** Regularly audit the permissions of your domain-join accounts. Use tools like `BloodHound` or PowerShell scripts to identify accounts with excessive rights.
-   **Monitor AD Events:** In your SIEM, create alerts for the modification of the `msDS-AllowedToActOnBehalfOfOtherIdentity` attribute (Event ID 5136), especially when performed by a service account or outside of expected administrative activity.
-   **Hunt for Exposed Credentials:** Proactively search deployment shares and configuration files for plaintext credentials.
-   **D3FEND Techniques:**
    -   [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) is key to detecting abuse of these accounts.
    -   [`D3-AZET: Authorization Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthorizationEventThresholding) can help detect when an account performs an unusual number of privileged actions.

## Remediation Steps
Microsoft and security researchers recommend a layered defense to mitigate this risk.
1.  **Secure Credentials:** Treat domain-join account credentials as highly sensitive. Avoid storing them in plaintext. Use Group Managed Service Accounts (gMSAs) or other secure methods where possible.
2.  **Reassign Object Ownership:** After a computer is joined to the domain, run an automated script to reassign the ownership of the computer object from the domain-join account to a protected group like 'Domain Admins'.
3.  **Implement Deny Permissions:** Explicitly add a 'Deny' ACE (Access Control Entry) on the `msDS-AllowedToActOnBehalfOfOtherIdentity` attribute for the domain-join account on the OU where computer objects are created. This directly blocks the RBCD attack vector.
4.  **Principle of Least Privilege:** Ensure the domain-join account has only the specific permissions needed to create and configure a computer object, and nothing more.
5.  **D3FEND Countermeasures:**
    -   [`D3-UAP: User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions) is the core principle for hardening these accounts.
    -   [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) applies to securing the deployment tools that use these credentials.

**Tags:** Active Directory, Privilege Escalation, RBCD, Misconfiguration, Kerberos, Security Operations

## Sources
- [Active Directory at Risk Due to Domain-Join Account Misconfigurations](https://gbhackers.com/active-directory-at-risk-due-to-domain-join-account-misconfigurations/) — GBHackers (2025-10-28)
- [Misconfigured Domain-Join Accounts Enable Active Directory Exploitation](https://cyberpress.com/misconfigured-domain-join-accounts-enable-active-directory-exploitation/) — Cyberpress (2025-10-28)
- [Active Directory domain (join)own accounts revisited 2025](https://dirkjanm.io/active-directory-domain-join-accounts-revisited-2025/) — Dirk-jan Mollema's Blog (2025-10-11)
- [Secure Configuration and Hardening of Active Directory Certificate Services](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/secure-configuration-and-hardening-of-active-directory/ba-p/4259837) — Microsoft Tech Community (2025-10-21)

---
Source: https://cyber.netsecops.io/articles/active-directory-at-risk-from-over-privileged-domain-join-accounts/
