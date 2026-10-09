# Microsoft 365 Admins Locked Out of Tenant After Attacker Removes All Global Admin Roles

**Severity:** critical | **Category:** Security Operations,Cyberattack,Cloud Security | **Updated:** 2026-04-14 | **Reading time:** 7 min

An organization has reported a 'business-critical security incident' after a malicious actor gained access to their Microsoft 365 tenant and systematically removed the 'Global Administrator' role from all assigned user accounts. This action resulted in a complete administrative lockout, preventing legitimate administrators from accessing the Microsoft 365 Admin Center and Microsoft Entra ID. The attack highlights a potent technique where attackers, after compromising a single privileged account, can cement their control and prevent remediation by decapitating the tenant's administrative structure. The organization is now reliant on Microsoft's Data Protection team to verify ownership and restore access.

## Executive Summary
An organization has suffered a complete administrative lockout from its **[Microsoft 365](https://docs.microsoft.com/en-us/microsoft-365)** tenant after a threat actor compromised an administrative account and then maliciously removed the 'Global Administrator' role from all other privileged users. This devastating attack left the organization's IT staff unable to access critical management portals, including the Microsoft 365 Admin Center and **[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/microsoft-entra)**. The incident, described by the victim as a "business-critical security incident," effectively paralyzes identity management, security, and compliance functions. This scenario, known as a 'tenant lockout,' is a worst-case scenario for cloud administrators and underscores the critical need for emergency access controls and robust monitoring of privileged role assignments.

## Threat Overview
The attack is a simple but highly effective method for an attacker to escalate and maintain control after an initial compromise.

**Attack Chain:**
1.  **Initial Compromise:** The attacker first gains access to a single account with the Global Administrator role. This is typically achieved through phishing, password spraying, or exploiting the lack of Multi-Factor Authentication (MFA).
2.  **Privilege Escalation / Defense Evasion:** The attacker logs into the Microsoft Entra ID portal.
3.  **Execution:** The attacker navigates to the 'Roles and administrators' section and systematically removes the Global Administrator role assignment from every other user account, including the one they originally compromised to cover their tracks.
4.  **Impact:** The organization is now completely locked out. No legitimate user has the permissions necessary to manage the tenant, reset passwords, or restore the removed roles. The attacker may retain access through a backdoor account they created or may simply leave the organization in a state of chaos.

The organization's only recourse is to contact the Microsoft Data Protection team via phone, a process that involves a lengthy identity and tenant ownership verification procedure before access can be restored.

## Technical Analysis
This attack abuses legitimate administrative functionality. The key TTPs are:
- **Valid Accounts: Cloud Accounts:** [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/) - The entire attack hinges on first obtaining access to a legitimate Global Admin account.
- **Cloud Administration Command:** [`T1098.001 - Cloud Administration Command`](https://attack.mitre.org/techniques/T1098/001/) - The attacker uses standard Entra ID portal functions or PowerShell commands (`Remove-MsolRoleMember` or similar) to modify role assignments.
- **Impair Defenses: Disable or Modify Tools:** [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/) - By removing all other administrators, the attacker is impairing the organization's primary defensive tool: its own IT staff.

## Impact Assessment
- **Business Paralysis:** Without administrative access, the organization cannot manage user accounts, respond to security alerts, configure applications, or manage compliance. Business operations can grind to a halt.
- **Significant Downtime:** The process of regaining access through Microsoft support can be slow and arduous, leading to extended periods of administrative downtime and lost productivity.
- **High Risk of Further Damage:** During the lockout period, the attacker may have free rein within the tenant to exfiltrate data, deploy malware via SharePoint, or send phishing emails from trusted internal accounts.
- **Loss of Confidence:** Such an incident severely undermines confidence in the IT department's ability to secure critical cloud infrastructure.

## Cyber Observables for Detection
Detection must be real-time, as the attack can be executed in minutes.
| Type | Value | Description |
|---|---|---|
| log_source | Microsoft Entra ID Audit Logs | The critical log event is `Remove member from role`. Monitor for this action, especially when it targets the 'Global Administrator' role. |
| event_id | `Directory-Role-Member-Removed` | This is the specific activity name in the audit logs that corresponds to the malicious action. |
| user_account_pattern | Anomalous login to a Global Admin account | A Global Admin account logging in from an unfamiliar IP, country, or device is a precursor and a critical alert. |

## Detection & Response
- **D3FEND: Domain Account Monitoring:** This is the most critical defense. Configure a high-priority, non-ignorable alert in your SIEM or Microsoft Sentinel that triggers *immediately* whenever a member is removed from the Global Administrator role. The alert should be sent to multiple people via multiple channels (email, SMS, Teams). This is a direct application of [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).
- **Real-Time Alerts:** The alert rule should be something like: `AzureActivity | where OperationNameValue == 'Microsoft.Directory/roleManagement/directory/roleAssignments/delete' and properties_roleDefinitionId_g == '62e90394-69f5-4237-9190-012177145e10'`. This rule specifically targets the removal of the Global Admin role.
- **Automated Response:** If possible, use a SOAR playbook to respond to the alert by attempting to re-add the user to the role or by temporarily disabling the account that performed the action.

## Mitigation
> **CRITICAL MITIGATION:** Implement Emergency Access or 'Break-Glass' accounts.

- **Break-Glass Accounts:** Create two or more emergency access accounts that are excluded from all standard policies (like MFA requirements, conditional access). These accounts should have the Global Administrator role. Their credentials should be extremely complex and stored securely offline (e.g., in a physical safe). They are to be used *only* in an emergency, like this lockout scenario. This is the single most important mitigation and is a core part of [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
- **Enforce MFA on All Admins:** All standard administrative accounts (and all users) must have phishing-resistant MFA enforced. This would have likely prevented the initial compromise.
- **Privileged Identity Management (PIM):** Use Microsoft Entra ID PIM. This feature ensures that administrators do not have standing, persistent access. They must request and justify temporary elevation to the Global Admin role (Just-In-Time access), which is logged and can require approval. This dramatically reduces the window of opportunity for an attacker.
- **Limit Number of Global Admins:** Adhere to the principle of least privilege. Most administrators do not need standing Global Admin rights. Use more granular roles (e.g., Exchange Admin, Teams Admin) for daily tasks and keep the number of Global Admins to a bare minimum (e.g., 2-4 plus break-glass accounts).

**Tags:** Microsoft 365, Entra ID, Azure AD, Tenant Lockout, Cloud Security, Incident Response, Global Administrator

## Sources
- [Security Incident – Global Administrator Access Compromised / Removed](https://learn.microsoft.com/en-us/answers/questions/1709403/security-incident-global-administrator-access-com) — Microsoft Learn (2026-04-13)
- [Microsoft 365 admins locked out of tenants after all Global Admins removed](https://www.bleepingcomputer.com/news/microsoft/microsoft-365-admins-locked-out-of-tenants-after-all-global-admins-removed/) — BleepingComputer (2026-04-14)

---
Source: https://cyber.netsecops.io/articles/microsoft-365-tenant-lockout-after-unauthorized-admin-removal/
