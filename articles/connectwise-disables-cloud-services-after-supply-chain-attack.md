# ConnectWise Disables Cloud Services After Supply Chain Attack on M365

**Severity:** critical | **Category:** Supply Chain Attack,Cloud Security,Cyberattack | **Updated:** 2026-10-26

ConnectWise has suspended its Cloud Backup services following a sophisticated supply chain attack. Threat actors compromised an application credential, gaining unauthorized access to the Microsoft 365 tenants of numerous Managed Service Providers (MSPs) and their customers. The attack, which bypasses user-level MFA, allowed for broad data access and privilege escalation. ConnectWise has disabled the affected application identities and is investigating the incident, which Microsoft has classified as an active supply chain attack.

## Executive Summary

On October 17, 2026, IT management software provider **[ConnectWise](https://www.connectwise.com/)** suspended its Cloud Backup services in response to a significant supply chain attack. Threat actors exploited a compromised application credential associated with the ConnectWise Cloud Backup service (formerly SkyKick) to gain unauthorized access to customer **[Microsoft](https://www.microsoft.com/security)** 365 tenants. This allowed the attackers to bypass standard user authentication, including MFA, and inherit the application's broad permissions to access sensitive data. The incident has impacted Managed Service Providers (MSPs) and their downstream customers, prompting ConnectWise to disable multiple application identities to contain the threat. The initial access vector for the credential compromise remains under investigation.

## Threat Overview

The attack began around October 15, 2026, when an unknown threat actor started using a compromised OAuth application credential for the ConnectWise Cloud Backup application (App ID: `506e08f9-6e9a-4da4-942b-a099a03644ae`). By authenticating as this trusted application, the attackers circumvented user-level security controls and gained access to Microsoft 365 environments with the permissions granted to the app. These permissions often include access to emails, SharePoint, Teams, and other sensitive directory data.

Security firm **[Huntress](https://www.huntress.com/)** reported observing unauthorized sign-ins across 173 partner and customer tenants, originating from the IP address `144.172.64.128`. The attack is a classic example of abusing the trust model of third-party application integrations in cloud environments, turning a legitimate, highly-privileged application into a powerful attack tool.

## Technical Analysis

The attack chain leverages the inherent trust between a Microsoft 365 tenant and its integrated third-party applications. The threat actor's tactics, techniques, and procedures (TTPs) include:

1.  **Initial Access - Steal Application Access Token ([`T1528`](https://attack.mitre.org/techniques/T1528/))**: The attackers obtained the credentials for the ConnectWise Cloud Backup application. The method of this initial compromise is currently unknown.
2.  **Defense Evasion - Valid Accounts: Cloud Accounts ([`T1078.004`](https://attack.mitre.org/techniques/T1078/004/))**: By using the legitimate, albeit stolen, application credentials, the attackers' sign-ins appeared as legitimate service-to-service communication, bypassing user-centric defenses like MFA.
3.  **Privilege Escalation & Persistence - Additional Cloud Credentials ([`T1098.001`](https://attack.mitre.org/techniques/T1098/001/))**: In at least one observed case, the attackers used the initial access to elevate the privileges of a related ConnectWise Cloud Management application to Global Administrator. They then added new client secrets to other applications within the tenant, creating multiple backdoors for persistent access.
4.  **Collection - Email Collection ([`T1114.002`](https://attack.mitre.org/techniques/T1114/002/))**: With access to the tenants, the attackers had the capability to access and exfiltrate data from various Microsoft 365 services, including Outlook, SharePoint, and Teams.

This attack highlights the critical risk posed by over-privileged OAuth applications in enterprise environments.

## Impact Assessment

The business impact of this supply chain attack is severe. For MSPs, it erodes trust and creates a significant security liability for all their downstream customers. The suspension of Cloud Backup, SaaS Security, and Cloud Management services causes operational disruption, preventing new backups and security management tasks. For affected customers, the breach means potential exposure of all data within their Microsoft 365 environment. Since the attack bypasses user MFA, organizations that believed they were secure are vulnerable. The costs of incident response, forensic analysis, and potential data loss are substantial for all parties involved.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `144.172.64.128` | Source IP of unauthorized sign-ins observed by Huntress. |
| other | `506e08f9-6e9a-4da4-942b-a099a03644ae` | Application ID of the compromised ConnectWise Cloud Backup application. |

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

*   **Azure AD Sign-in Logs**: Search for all sign-ins (interactive and non-interactive) where the `appId` is `506e08f9-6e9a-4da4-942b-a099a03644ae` and the source IP is not from a known service range.
*   **Azure AD Audit Logs**: Hunt for privilege escalation activities. Filter for operations like `Add-AzureADApplicationOwner`, `Add service principal credential`, or `Add owner to application` where the initiating user/principal is an application, especially one related to ConnectWise.
*   **Anomalous Application Behavior**: Look for applications granting themselves or other applications new `Application.ReadWrite.All` or `Directory.ReadWrite.All` permissions.

## Detection & Response

Defenders should implement the following detection and response strategies:

1.  **Audit Application Permissions**: Regularly review all applications integrated into your Microsoft 365 tenant, paying close attention to those with high-level permissions like `Mail.ReadWrite.All`, `Files.ReadWrite.All`, or `Directory.ReadWrite.All`. Use Microsoft's built-in tools or third-party solutions to assess application risk.
2.  **Monitor Sign-in Logs**: Implement SIEM rules to alert on suspicious sign-in patterns for service principals, such as sign-ins from unusual IP addresses, locations, or an impossible travel scenario. This can be achieved through **[Network Traffic Analysis (D3-NTA)](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Track Privilege Changes**: Create high-priority alerts for any event where an application elevates its own privileges or modifies the credentials of another application. This is a strong indicator of compromise. This involves **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
4.  **Incident Response Playbook**: If a compromised application is detected, the playbook should include steps to immediately disable the application, revoke its credentials and permissions, and initiate a forensic investigation to determine the scope of the breach.

## Mitigation

To mitigate the risk of similar attacks, organizations should adopt a defense-in-depth approach to cloud application security:

1.  **Least Privilege Principle**: When granting consent to third-party applications, only approve the minimum permissions necessary for the application to function. Avoid blanket approvals for highly permissive scopes. This is a form of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
2.  **Vendor Risk Management**: Thoroughly vet the security practices of any third-party vendor before integrating their applications into your environment. This includes reviewing their security certifications and incident response plans.
3.  **Conditional Access Policies for Applications**: Where possible, apply Conditional Access policies to service principals to restrict access based on IP range or other factors. This can help limit the blast radius if an application credential is compromised.
4.  **Regular Audits**: Conduct quarterly or semi-annual reviews of all enterprise applications and their permissions. Remove any applications that are no longer in use or have excessive permissions.

**Tags:** Cloud Security, Credential Compromise, MSP, Microsoft 365, OAuth, Supply Chain Attack

## Sources
- [ConnectWise Suspends Cloud Services After Microsoft 365 Tenant Compromise](https://www.infosecurity-magazine.com/news/connectwise-shuts-off-cloud/) (2026-10-19)
- [ConnectWise suspends Cloud Backup service after attackers abuse its Microsoft 365 access](https://www.helpnetsecurity.com/2026/10/19/connectwise-cloud-backup-suspended-security-incident/) (2026-10-19)
- [ConnectWise Cloud Backup Credential Compromise Hits Microsoft 365 Tenants](https://rodtrent.substack.com/p/security-check-in-quick-hits-connectwise) (2026-10-18)
- [Analyzing the ConnectWise/SkyKick Breach](https://specterops.io/blog/2026/10/17/connectwise-skykick-breach-microsoft-365/) (2026-10-17)

---
Source: https://cyber.netsecops.io/articles/connectwise-disables-cloud-services-after-supply-chain-attack/
