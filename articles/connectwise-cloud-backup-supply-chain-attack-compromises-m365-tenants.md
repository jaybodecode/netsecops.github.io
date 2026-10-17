# ConnectWise Cloud Backup Supply Chain Attack Hits M365 Tenants

**Severity:** high | **Category:** Supply Chain Attack,Cloud Security,Cyberattack | **Updated:** 2026-10-17 | **Reading time:** 5 min

An active supply chain attack is leveraging a compromised Microsoft 365 credential for the ConnectWise Cloud Backup application (AppId: 506e08f9-6e9a-4da4-942b-a099a03644ae). Threat actors are abusing the app's high-privilege OAuth permissions to access customer M365 environments, read mailboxes and files, and attempt to create backdoors. The activity was observed originating from the IP address 144.172.64.128.

## Executive Summary
An ongoing supply chain attack is targeting customers of **[ConnectWise](https://www.connectwise.com/)** Cloud Backup (formerly SkyKick). Threat actors have compromised a credential associated with the application's **[Microsoft](https://www.microsoft.com/security)** 365 OAuth App (`AppId: 506e08f9-6e9a-4da4-942b-a099a03644ae`) and are using its extensive permissions to gain unauthorized access to customer tenants. The attackers have been observed performing reconnaissance via the Microsoft Graph API and attempting to add new credentials to service principals to establish persistence. The activity, which originated from IP address `144.172.64.128`, has impacted at least 173 tenants, according to security firm **[Huntress](https://www.huntress.com/)**.

---

## Threat Overview
The attack represents a classic **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, where a trusted third-party application becomes the vector for compromise. The ConnectWise Cloud Backup app is granted highly permissive access to customer M365 environments, including `Directory.ReadWrite.All`, to perform its backup functions. By compromising the application's own credential, the threat actor can generate access tokens and inherit these permissions across all tenants where the application is installed and consented. This allows the actor to bypass traditional user-based authentication controls like MFA and access sensitive data such as emails, OneDrive files, SharePoint sites, and Teams messages.

---

## Technical Analysis
The attack was highly automated and swift. On October 15, 2026, between 06:13 and 08:34 UTC, the threat actor iterated through tenants in sorted GUID order, with only seconds between each compromise. All malicious activity originated from the IP address `144.172.64.128`.

Key TTPs observed include:
- **[T1528 - Steal Application Access Token](https://attack.mitre.org/techniques/T1528/)**: The actor authenticated to the legitimate OAuth application using a compromised credential to obtain access tokens for customer tenants.
- **[T1098.001 - Additional Cloud Credentials](https://attack.mitre.org/techniques/T1098/001/)**: Microsoft observed the actor attempting to add new credentials to the application's service principal within target tenants. This is a persistence technique designed to create a backdoor, allowing direct access even if the initial compromised credential is remediated.
- **Reconnaissance**: The actor used the Microsoft Graph API to perform reconnaissance within the compromised tenants, likely to identify high-value targets and data.

The same source IP was also linked to password spraying campaigns against law firms on October 13 and 14, suggesting the actor is involved in multiple concurrent operations.

---

## Impact Assessment
The impact of this attack is significant due to the broad permissions granted to the backup application. Potential consequences for affected organizations include:
- **Widespread Data Breach:** Unauthorized access to and potential exfiltration of all data within Microsoft 365, including emails, documents, and internal communications.
- **Business Email Compromise (BEC):** The ability to read and send emails from any compromised mailbox creates a high risk of sophisticated BEC attacks.
- **Persistence and Backdoors:** Successful creation of new credentials on the service principal would grant the attacker persistent, direct access to the tenant, which is difficult to detect and remove.
- **Loss of Trust:** The incident erodes trust in the security of third-party applications and the MSP ecosystem.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `144.172.64.128` | Source IP of the threat actor activity. |
| other | `506e08f9-6e9a-4da4-942b-a099a03644ae` | Application ID of the compromised ConnectWise Cloud Backup OAuth App. |

---

## Detection & Response
Organizations using ConnectWise Cloud Backup should take immediate action:

1.  **Hunt for IOCs:** Search Azure AD sign-in logs and Microsoft 365 unified audit logs for any activity from the IP address `144.172.64.128`.
2.  **Review App Sign-ins:** Specifically filter Azure AD sign-in logs for the Application ID `506e08f9-6e9a-4da4-942b-a099a03644ae` and scrutinize all sign-in events for anomalies.
3.  **Audit Service Principals:** Use PowerShell or the Azure portal to inspect the credentials associated with the ConnectWise Cloud Backup service principal in your tenant. Look for any recently added credentials that were not configured by your administrators. This can be achieved with **[D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.
4.  **Revoke Sessions:** If suspicious activity is found, immediately revoke all refresh tokens for the compromised application and consider temporarily disabling the application until the vendor provides a clear resolution.

---

## Mitigation
While the primary responsibility for securing the application lies with the vendor, customers can take steps to reduce their risk exposure:

1.  **Principle of Least Privilege:** Regularly audit the permissions granted to all third-party OAuth applications in your M365 environment. Remove any permissions that are not strictly necessary for the application's function. This is a key aspect of **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
2.  **Conditional Access Policies:** Implement Azure AD Conditional Access policies that can restrict application access based on factors like IP address, location, and device compliance. While this may not have stopped the initial token generation, it can help block subsequent abuse.
3.  **App Governance:** Utilize Microsoft 365's app governance features to set policies that alert on or block applications with overly permissive or risky permissions.
4.  **Monitor App Behavior:** Implement continuous monitoring for anomalous application behavior, such as an app accessing data it has never touched before or a sudden spike in API calls.

**Tags:** supply chain, OAuth, Microsoft 365, cloud security, MSP

## Sources
- [Hackers Use Compromised ConnectWise Cloud Backup App to Hit M365 Tenants](https://thehackernews.com/2026/10/hackers-use-compromised-connectwise.html) — The Hacker News (2026-10-17)

---
Source: https://cyber.netsecops.io/articles/connectwise-cloud-backup-supply-chain-attack-compromises-m365-tenants/
