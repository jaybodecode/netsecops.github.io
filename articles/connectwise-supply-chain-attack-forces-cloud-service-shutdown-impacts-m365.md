# ConnectWise Shuts Down Cloud Services After Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Cloud Security,Data Breach | **Updated:** 2026-10-21 | **Reading time:** 6 min

IT software provider ConnectWise has suspended its Cloud Backup, SaaS Security, and Cloud Management services following a significant supply-chain attack. The incident involved a compromised application credential for its multitenant OAuth application, which threat actors used to gain unauthorized, high-privilege access to the Microsoft 365 environments of its Managed Service Provider (MSP) partners and their customers. The attack bypassed user-based MFA, leading ConnectWise to take services offline and reset credentials.

## Executive Summary
IT management software provider **[ConnectWise](https://www.connectwise.com/)** is responding to a critical **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** that has forced the company to suspend several of its cloud services, including Cloud Backup. The incident, detected around October 15-16, 2026, stemmed from the compromise of an application credential (a client assertion) for a multitenant OAuth application. Threat actors leveraged this compromised credential to gain unauthorized access to the **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365/)** tenants of ConnectWise's Managed Service Provider (MSP) partners. Because the authentication was application-based, it bypassed user-level security controls like multi-factor authentication (MFA). In response, ConnectWise has taken affected services offline, reset credentials, and is working to restore operations.

---

## Threat Overview

The attack represents a classic and highly impactful supply chain compromise. The threat actor targeted **ConnectWise**, a central provider in the MSP ecosystem, to gain access to a multitude of downstream customers. The core of the attack was the compromise of a credential for the **ConnectWise** Cloud Backup application (formerly known as SkyKick). This was not a user password but an application credential used for server-to-server authentication within the OAuth framework.

By abusing this credential, the attacker could authenticate as the **ConnectWise** application itself. Because customers had previously granted this application extensive permissions to perform backups, the attacker inherited these permissions. This included access to mailboxes, OneDrive, SharePoint, and Teams data across numerous M365 tenants. **[Microsoft](https://www.microsoft.com/security)** Threat Intelligence confirmed it was tracking the activity and noted the actor "likely abused permissions previously granted by customers."

Security firm **Huntress** observed suspicious sign-in activity from the IP address `144.172.64.128` against at least 162 M365 tenants between October 15 and 16, indicating the potential scale of the reconnaissance or intrusion phase.

---

## Technical Analysis

The attack vector is a sophisticated abuse of modern cloud authentication mechanisms:

*   **Initial Compromise**: The root cause was the compromise of a **ConnectWise** application credential. The method of this initial compromise has not been disclosed but could range from a leaked secret in a public repository to a flaw in **ConnectWise**'s own infrastructure.
*   **Authentication Bypass**: The attackers used the compromised credential to generate a client assertion, a method for an application to prove its identity to an identity provider (in this case, Microsoft Entra ID). This is part of the OAuth 2.0 client credentials flow ([`T1111 - Access Token Manipulation`](https://attack.mitre.org/techniques/T1111/)).
*   **Privilege Escalation**: Since the authentication was at the application level (a trusted service principal) and not the user level, it bypassed user-centric controls like MFA. The attacker immediately gained the highly privileged permissions that MSPs and their customers had consented to grant the backup application ([`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).
*   **Trusted Relationship Abuse**: This is a clear example of abusing a trusted relationship ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)). The attackers leveraged the trust between MSPs, their customers, and the **ConnectWise** platform to pivot into hundreds of otherwise secure environments.

In response, **ConnectWise** disabled seven application identities associated with the compromised services and began a full credential rotation.

---

## Impact Assessment

The business impact of this incident is severe and multi-faceted:

*   **Service Disruption**: The suspension of Cloud Backup, SaaS Security, and Cloud Management services directly impacts MSP operations. Backups are not running, data restoration is unavailable, and security monitoring is degraded, leaving partners and their customers in a vulnerable state.
*   **Data Exposure Risk**: While **ConnectWise** stated there is "no indication" that encrypted backup data was compromised, the attackers had access to live M365 environments. This creates a significant risk of data exfiltration of sensitive emails, files, and internal communications from an unknown number of organizations.
*   **Erosion of Trust**: The incident severely damages trust in the MSP supply chain. Customers of MSPs rely on them to vet their software vendors. A compromise of a major platform like **ConnectWise** has cascading reputational effects for all parties involved.
*   **Incident Response Costs**: **ConnectWise** faces significant costs for incident response, remediation, and customer support. Its MSP partners also incur costs as they must investigate potential breaches within their own customer tenants and communicate with their clients.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `144.172.64.128` | IP address observed conducting suspicious sign-in activity against M365 tenants. |

---

## Cyber Observables — Hunting Hints
Security teams, especially MSPs and their customers, should hunt for the following:

| Type | Value | Description |
|---|---|---|
| Log Source | Microsoft Entra ID Sign-in Logs | Hunt for all sign-ins from IP `144.172.64.128` between Oct 15-17, 2026. |
| Log Source | Microsoft Entra ID Audit Logs | Search for anomalous activity by the ConnectWise service principal, such as `Add app role assignment` or unusual data access patterns. |
| API Endpoint | `graph.microsoft.com` | Monitor for unusual access patterns or data enumeration via the Graph API from third-party application service principals. |
| Command_line_pattern | `Get-MgAuditLogSignIn` | Use PowerShell to query for sign-ins from the malicious IP or by the ConnectWise application ID during the incident window. |

---

## Detection & Response

1.  **Review Sign-in Logs**: All **ConnectWise** partners and their customers should immediately review their Microsoft Entra ID sign-in logs for any activity from the IOC IP address (`144.172.64.128`) or any other suspicious sources, particularly between October 15-17, 2026. **D3FEND**: [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
2.  **Audit OAuth Applications**: Regularly audit all third-party OAuth applications and their permissions in your M365 tenant. Remove any unused or overly permissive applications. Pay close attention to high-privilege permissions like `Mail.ReadWrite.All` or `Files.ReadWrite.All`. **D3FEND**: [`D3-AZET: Authorization Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthorizationEventThresholding).
3.  **Monitor Service Principal Activity**: Use SIEM and M365 audit logs to monitor for anomalous behavior by service principals. Alert on unusual sign-in locations, spikes in activity, or access to sensitive data outside of normal patterns. **D3FEND**: [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).

---

## Mitigation

1.  **OAuth Application Governance**: Implement a strict governance policy for consenting to new OAuth applications. Use Microsoft's tools to require admin consent for new apps and regularly review existing consents. **D3FEND Hardening**: [`D3-UAP: User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions).
2.  **Principle of Least Privilege**: When granting permissions to third-party apps, always adhere to the principle of least privilege. If an application requests `ReadWrite.All`, question if it truly needs that level of access.
3.  **Credential Rotation**: For software vendors, implement automated and frequent rotation of all application credentials and secrets. Store them securely in a managed vault like Azure Key Vault.
4.  **Conditional Access Policies**: While user-based MFA was bypassed, Conditional Access policies can still be used to restrict access by service principals based on IP address, location, or risk level.

**Tags:** ConnectWise, Supply Chain Attack, MSP, Microsoft 365, OAuth, Cloud Security, Data Breach

## Sources
- [ConnectWise breach: Cloud services disruption continues three days after initial intrusion detected](https://www.itpro.com/security/connectwise-breach-cloud-services-disruption-continues-three-days-after-initial-intrusion-detected) — ITPro (2026-10-20)
- [ConnectWise Resets Credentials as Cloud Backup Remains Offline After Security Incident](https://thehackernews.com/2026/10/connectwise-resets-credentials-as-cloud.html) — The Hacker News (2026-10-20)
- [ConnectWise Suspends Cloud Services After M365 Tenant Breach](https://www.infosecurity-magazine.com/news/connectwise-shuts-off-cloud/) — Infosecurity Magazine (2026-10-19)
- [ConnectWise suspends cloud services after Microsoft 365 supply chain attack](https://www.cybersecuritydive.com/news/connecwise-suspends-cloud-backup-hacker-microsoft-365/833345/) — Cybersecurity Dive (2026-10-19)

---
Source: https://cyber.netsecops.io/articles/connectwise-supply-chain-attack-forces-cloud-service-shutdown-impacts-m365/
