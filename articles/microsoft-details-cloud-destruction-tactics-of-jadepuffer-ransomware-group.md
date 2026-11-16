# Microsoft Details Destructive Cloud Tactics of JADEPUFFER

**Severity:** critical | **Category:** Cloud Security,Ransomware,Threat Actor | **Updated:** 2026-09-26 | **Reading time:** 5 min

Microsoft has detailed a destructive cloud campaign in Microsoft Azure by the threat actor Storm-3168 (JADEPUFFER). This 'agentic ransomware' group used compromised service principals for automated attacks. After a 15-hour reconnaissance phase, the actor executed a destructive phase lasting just seven minutes, deleting storage accounts, an Azure Key Vault, and attempting to wipe recovery backups. The attack highlights a shift towards highly automated, rapid-destruction cloud attacks that aim to cripple victims and prevent recovery.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** Security Research has released a detailed analysis of a highly destructive cloud attack campaign targeting **[Microsoft Azure](https://azure.microsoft.com/)** environments. The campaign is attributed to **Storm-3168**, a threat actor also known as **JADEPUFFER**, which has been described as the first "agentic ransomware" group due to its use of automation. The attack leveraged compromised Azure service principals to conduct rapid, automated reconnaissance and destruction. In a destructive phase lasting only seven minutes, the actor wiped numerous cloud resources, including storage accounts and an Azure Key Vault, and critically, attempted to delete Azure backups to prevent recovery. This incident signifies a dangerous evolution in cloud attacks, where automated scripts can cause catastrophic damage in minutes, leaving little time for human-led intervention.

---

## Threat Overview
The threat actor, **Storm-3168**/**JADEPUFFER**, gained initial access by compromising at least two service principals within a single Azure tenant. **Microsoft** notes one of these may have been compromised via credentials accidentally exposed in a public **[GitHub](https://github.com)** issue. This highlights the critical risk of secret leakage in public code repositories.

The attack proceeded in two distinct phases:
1.  **Reconnaissance (15 hours):** Using a compromised identity, the actor performed over 300 successful read operations. This slow, low-profile activity was designed to map the victim's entire cloud environment, enumerating virtual machines, subscriptions, resource groups, and storage accounts ([`T1526 - Cloud Service Discovery`](https://attack.mitre.org/techniques/T1526/)).
2.  **Destruction (7 minutes):** The attack then switched to a high-speed, automated destructive phase. In just seven minutes, the attacker used scripted commands to issue over 100 deletion requests for storage accounts, successfully deleting most of them. They also deleted an Azure Key Vault, a Function App, and an App Service plan. This rapid deletion of resources is a form of [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/).

Crucially, the attackers' actions aligned with a ransomware objective. They specifically targeted and attempted to delete Azure Site Recovery locks and Azure Backup protection ([`T1561 - Disk Wipe`](https://attack.mitre.org/techniques/T1561/)). This shows a clear intent to not only destroy data but also to eliminate the victim's ability to recover, thereby increasing leverage for a ransom demand.

## Technical Analysis
The attack's effectiveness stemmed from the abuse of legitimate, high-privilege cloud identities—service principals.

**Key TTPs:**
-   **Initial Access:** The attack began with [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/), specifically compromised service principals. This is a shift from user-centric attacks to machine-identity-centric attacks.
-   **Automated Reconnaissance:** The long reconnaissance phase using read-only operations was likely scripted to avoid detection thresholds while building a complete picture of the target environment.
-   **Automated Destruction:** The speed and parallelism of the destructive phase (100+ deletion attempts in 7 minutes) strongly indicate the use of an automated script or tool—an "agentic" attack. The script likely iterated through the list of resources gathered during reconnaissance and issued deletion commands for each.
-   **Impairing Defenses:** The targeting of Azure Key Vault ([`T1552.005 - Cloud-based Password Stores`](https://attack.mitre.org/techniques/T1552/005/)) and Azure Backup protection demonstrates a sophisticated understanding of cloud environments and a focus on maximizing damage and preventing recovery.

**MITRE ATT&CK Techniques Observed:**
- [`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)
- [`T1526 - Cloud Service Discovery`](https://attack.mitre.org/techniques/T1526/)
- [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)
- [`T1561 - Disk Wipe`](https://attack.mitre.org/techniques/T1561/)
- [`T1552.005 - Cloud-based Password Stores`](https://attack.mitre.org/techniques/T1552/005/)
- [`T1114.002 - Remote Data Staging`](https://attack.mitre.org/techniques/T1114/002/) (implied by retrieving storage account keys)

## Impact Assessment
The impact of such an attack is catastrophic and immediate. The destruction of primary storage accounts and backups can lead to irreversible data loss and prolonged business outage. For a cloud-native organization, this is an extinction-level event. The speed of the attack makes manual response nearly impossible. By the time an alert is triaged, the damage is already done. This incident serves as a stark warning for all organizations using public cloud services: the security of machine identities (like service principals) is as critical, if not more so, than the security of user identities. The financial and reputational damage from such an attack would be immense.

## IOCs — Directly from Articles
No specific IOCs were provided in the public reports.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns which could indicate related activity:

| Type | Value | Description |
|---|---|---|
| log_source | `Azure Activity Logs` | Monitor for service principals performing an unusually high number of read operations across different resource types (VMs, storage, networking). |
| command_line_pattern | `az storage account delete` | Look for rapid, successive deletion commands for critical resources, especially when initiated by a service principal. |
| api_endpoint | `Microsoft.RecoveryServices/vaults/backupFabrics/protectionContainers/protectedItems` | Monitor for API calls attempting to delete or disable backup protection. This is a highly malicious indicator. |
| event_id | `Get Storage Account Keys` | An alert should be triggered when a service principal, especially one not associated with a secrets management role, retrieves storage account keys. |

## Detection & Response
- **Identity-Based Anomaly Detection:** Implement user and entity behavior analytics (UEBA) for cloud identities. Baseline the normal activity of service principals and alert on deviations, such as a dormant account becoming active or an application identity suddenly performing broad reconnaissance. This aligns with D3FEND's [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
- **Automated Response:** The speed of this attack necessitates automated responses. For example, an alert for a service principal attempting to delete a backup could automatically trigger a temporary suspension of that identity's permissions pending review.
- **Log Monitoring:** Ingest Azure Activity Logs, Azure AD sign-in logs, and other cloud logs into a SIEM. Create high-severity alerts for deletion events on critical resources (storage accounts, databases, backups, key vaults).

## Mitigation
1.  **Secure Service Principals:** Treat service principals like privileged user accounts. Apply the principle of least privilege, granting them only the specific permissions needed for their function. Regularly audit their permissions. This aligns with D3FEND's [`D3-UAP - User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions).
2.  **Implement MFA for Service Principals:** Where possible, use certificate-based authentication for service principals instead of client secrets, as secrets are more easily leaked. Use Azure AD Conditional Access policies to restrict their use to trusted locations.
3.  **Protect Backups:** Use Azure's built-in features like resource locks (`CanNotDelete`) and soft delete for backups and critical resources. This can prevent accidental or malicious deletion and provide a recovery window.
4.  **Secrets Management:** Do not hardcode credentials or secrets in code. Use a secure secrets management solution like Azure Key Vault and scan code repositories for exposed secrets.

**Tags:** Agentic Ransomware, Cloud Attack, Service Principal, Data Destruction, Azure

## Sources
- [Storm-3168: Agentic-driven cloud attacks using compromised service principals](https://www.microsoft.com/en-us/security/blog/2026/09/25/storm-3168-agentic-driven-cloud-attacks-using-compromised-service-principals/) — Microsoft Security (2026-09-25)
- [Microsoft Uncovers Destructive Azure Campaign by Abusing Service Principals](https://gbhackers.com/storm-3168-hackers-abuse-compromised-service-principals/amp/) — GBHackers on Security (2026-09-26)
- [Storm-3168 Uses Compromised Service Principals](https://cyberpress.org/storm-3168-uses-compromised-service-principals/) — Cyberpress

---
Source: https://cyber.netsecops.io/articles/microsoft-details-cloud-destruction-tactics-of-jadepuffer-ransomware-group/
