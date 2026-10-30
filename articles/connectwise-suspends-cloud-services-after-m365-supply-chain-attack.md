# ConnectWise Suspends Services After M365 Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Cloud Security,Cyberattack | **Updated:** 2026-10-24 | **Reading time:** 4 min

IT software provider ConnectWise suspended its Cloud Backup and other cloud services following a major supply chain attack. An attacker used a compromised API secret for the ConnectWise Cloud Backup service to gain unauthorized access to the Microsoft 365 tenants of hundreds of its customers. The breach allowed the threat actor to access sensitive data in Exchange, Teams, and SharePoint. ConnectWise has shut down the affected services to investigate, leaving customers unable to access backups or perform restorations for several days.

## Executive Summary
IT management software provider **[ConnectWise](https://www.connectwise.com/)** has suspended several of its cloud services, including Cloud Backup, following a significant supply chain attack that began on October 15, 2026. An unidentified threat actor obtained a highly privileged API secret for the ConnectWise Cloud Backup application. This credential allowed the attacker to bypass normal authentication and directly access the **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** environments of hundreds of ConnectWise's partners and their downstream clients. Security firm **[Huntress](https://www.huntress.com/)** reported observing malicious sign-ins across nearly 1,000 tenants. In response, ConnectWise took the affected services offline to contain the breach, leaving customers unable to access or restore backups.

## Threat Overview
This incident is a classic example of a supply chain attack targeting a Managed Service Provider (MSP) to gain access to its customers. The attacker's method was both simple and highly effective:
1.  **Initial Compromise:** The attacker gained access to a sensitive API secret for the ConnectWise Cloud Backup service. The method of this initial compromise has not been disclosed.
2.  **Abuse of Trusted Relationship:** The compromised API secret was associated with a multi-tenant application that had been granted extensive permissions within customer Microsoft 365 environments. These permissions are necessary for the backup service to function but also create a powerful vector for abuse.
3.  **Unauthorized Access:** Using the secret, the attacker authenticated as the ConnectWise application and accessed customer data within Microsoft Exchange Online, Teams, and SharePoint Online. This access did not require compromising individual user accounts and would not have been blocked by traditional MFA.

Security firm Huntress detected the initial malicious activity and observed successful sign-ins to over 300 tenants, with at least 162 of its own partners confirmed to be affected.

## Technical Analysis
The core of this attack is the abuse of OAuth application permissions in Microsoft 365, a technique classified under MITRE ATT&CK as [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/). The ConnectWise Cloud Backup application, by design, requires high-level permissions such as `Mail.ReadWrite`, `Files.ReadWrite.All`, and `Sites.ReadWrite.All` to back up and restore data. When the API secret for this application was compromised, the attacker inherited these permissions for every tenant that had granted consent to the application.

This allowed the attacker to perform actions such as:
-   Reading and exfiltrating emails from any user's mailbox.
-   Accessing and downloading files from SharePoint sites and OneDrive accounts.
-   Viewing sensitive conversations in Microsoft Teams.

The attack is particularly insidious because the sign-in activity would appear in logs as coming from the legitimate, consented 'ConnectWise Cloud Backup' application, making it difficult to distinguish from normal service activity without additional context, such as the source IP address of the sign-in.

## Impact Assessment
The impact of this supply chain attack is multi-faceted and severe:
-   **Data Breach for Downstream Customers:** Hundreds of organizations may have had sensitive data within their M365 tenants accessed and potentially exfiltrated by the threat actor.
-   **Service Outage:** ConnectWise's decision to suspend Cloud Backup, SaaS Security, and Cloud Management services has left customers without critical backup and security functionality for days. This prevents them from performing scheduled backups or restoring data, increasing their risk exposure to other unrelated incidents.
-   **Erosion of Trust:** The incident damages the trust between MSPs and their software providers, as well as between MSPs and their end-clients. It highlights the significant downstream risk associated with granting third-party applications broad access to sensitive environments.

ConnectWise has stated that backup data itself remains encrypted and was not breached, but the primary risk is the access gained to the live production data in customer M365 tenants.

## Cyber Observables — Hunting Hints
Security teams, especially MSPs, should hunt for the following patterns:
| Type | Value | Description |
|---|---|---|
| log_source | `Azure AD Sign-in Logs` | Review sign-in logs for the 'ConnectWise Cloud Backup' service principal. Look for sign-ins from anomalous IP addresses or geographic locations. |
| api_endpoint | `graph.microsoft.com` | Monitor for unusual access patterns to the Microsoft Graph API by the ConnectWise application, such as an abnormally high volume of read operations. |
| user_account_pattern | `ConnectWise Cloud Backup` | This is the service principal name. Correlate its activity with known malicious IP infrastructure if available. |

## Detection & Response
-   **Review Azure AD Logs:** Immediately review Azure AD sign-in logs for the `ConnectWise Cloud Backup` service principal, focusing on the period around October 15, 2026. Look for sign-ins from unexpected IP addresses. Huntress identified malicious activity originating from specific IPs, which partners should use for historical searches.
-   **Audit Application Permissions:** Regularly audit the permissions granted to all third-party applications in your Microsoft 365 tenant. Remove any applications that are no longer needed and question applications that have overly broad permissions. Reference D3FEND technique [`Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
-   **Monitor for Anomalous Activity:** Use tools like Microsoft Sentinel or other SIEMs to baseline normal activity for service principals. Alert on unusual behaviors, such as an application that normally only writes data suddenly performing mass read/export operations.

## Mitigation
-   **Credential Management for APIs:** Vendors like ConnectWise must treat API secrets with the same level of security as root credentials, implementing strict access controls, rotation policies, and monitoring for their use.
-   **Principle of Least Privilege for Apps:** When granting consent to third-party apps, administrators should ensure the application is only requesting the minimum permissions necessary for its function. If possible, scope permissions to specific mailboxes or sites rather than granting tenant-wide access.
-   **Conditional Access Policies:** Apply Conditional Access policies to service principals where possible, restricting access to known IP ranges. This could have blocked the attacker's access even with a valid secret.
-   **Third-Party Risk Management:** This incident highlights the need for robust third-party risk management programs. Organizations must understand the access their vendors have and the security posture of those vendors.

**Tags:** Supply Chain Attack, ConnectWise, MSP, Microsoft 365, Cloud Security, API Security

## Sources
- [ConnectWise Cloud Backup outage stretches for days after customer compromises](https://cyberscoop.com/connectwise-cloud-backup-supply-chain-attack/) — Cyberscoop (2026-10-20)
- [ConnectWise suspends Cloud Backup service amid supply chain attack](https://www.cybersecuritydive.com/news/connecwise-suspends-cloud-backup-hacker-microsoft-365/833345/) — Cybersecurity Dive (2026-10-19)

---
Source: https://cyber.netsecops.io/articles/connectwise-suspends-cloud-services-after-m365-supply-chain-attack/
