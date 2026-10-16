# Data-Wiping Attacks on the Rise, Abusing Legitimate Admin Tools

**Severity:** critical | **Category:** Cyberattack,Threat Actor,Cloud Security | **Updated:** 2026-07-22 | **Reading time:** 5 min

The supply chain industry is being warned about a rising trend of destructive data-wiping attacks. A key example is the March 2026 incident at medical tech firm Stryker, where the Iranian hacktivist group Handala Hack Team claimed to have used Microsoft Intune to issue remote wipe commands to 80,000 devices. This 'living off the land' technique, which abuses legitimate administrative tools for destructive purposes, marks a dangerous shift from financially motivated ransomware to pure, unrecoverable data destruction.

## Executive Summary
A dangerous trend is emerging in the threat landscape: data-wiping attacks where the primary goal is destruction, not financial extortion. A July 22, 2026 warning from **Source Logistics** highlighted this threat, citing the March 2026 cyberattack against medical technology company **[Stryker](https://www.stryker.com/us/en/index.html)** as a prime example. In that incident, the Iranian hacktivist group **Handala Hack Team** claimed to have gained Global Administrator access to Stryker's Microsoft environment and used the legitimate **[Microsoft Intune](https://www.microsoft.com/en-us/security/business/microsoft-intune)** mobile device management (MDM) platform to wipe an estimated 80,000 devices. This attack demonstrates a potent 'living off the land' (LotL) strategy, leveraging trusted enterprise tools to cause catastrophic damage, bypassing traditional malware-based defenses entirely.

## Threat Overview
The Stryker incident, which the company confirmed was not a ransomware attack, represents a tactical shift. Instead of encrypting data and demanding a ransom, the attackers aimed for maximum disruption and data destruction. The Handala Hack Team, a hacktivist group, claimed responsibility on March 11, 2026. Their alleged method was to abuse Global Administrator privileges to issue remote wipe commands via Microsoft Intune over a three-hour period.

This LotL approach is highly effective because it uses the organization's own management tools against it. The malicious commands are signed, authenticated, and delivered through trusted channels, making them extremely difficult to block with conventional security measures. Research from Outpost24 supports the initial access vector, revealing that 278 credentials linked to the `stryker.com` domain had been compromised in the months prior, suggesting the attackers gained their initial foothold through stolen credentials rather than malware.

## Technical Analysis
This attack is a textbook case of [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/). The novelty lies in the execution method, which is a sophisticated abuse of legitimate functionality.
1.  **Initial Access**: The attackers likely gained initial access by using one of the 278 previously compromised credentials, possibly through password spraying or credential stuffing attacks.
2.  **Privilege Escalation**: They escalated their privileges within the Microsoft environment to achieve Global Administrator status, the highest level of administrative rights. This likely involved further credential theft or exploitation of misconfigurations ([`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).
3.  **Destructive Action**: With Global Admin rights, the attackers accessed the Microsoft Intune portal and used its built-in functionality to issue a mass remote wipe command to all enrolled devices. This is an abuse of the `DeviceManagementManagedDevices` API and falls under the broader technique of [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/), where the 'tool' is the operating system on the endpoint.

Because the wipe command is a legitimate function of Intune, endpoint protection platforms (EPP) would not flag it as malicious. The only way to detect it is by monitoring the administrative plane itself.

## Impact Assessment
The impact of a mass data-wiping attack is catastrophic and potentially more damaging than a ransomware attack. There is no option for recovery by paying a ransom; the data is permanently gone. For a company like Stryker, this could mean the loss of critical corporate data, intellectual property, and operational capabilities across 80,000 endpoints. The recovery process would be immensely costly and time-consuming, requiring the re-imaging and re-provisioning of every affected device. For the supply chain industry, such an attack could halt logistics, manufacturing, and distribution, with far-reaching economic consequences.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Detecting this type of LotL attack requires monitoring the administrative control plane:
| Type | Value | Description | Context |
|---|---|---|---|
| log_source | `Microsoft Entra ID Audit Logs` | The source for all administrative activity in the Microsoft cloud environment. | Ingest into a SIEM. |
| api_endpoint | `POST /deviceManagement/managedDevices/wipe` | The Graph API call to remotely wipe a device. A large number of these calls in a short period is a critical indicator. | Microsoft 365 audit logs, CASB logs. |
| event_id | `Wipe` (in Intune Audit Logs) | The specific event name for a remote wipe action initiated from Intune. | Intune audit logs. |
| user_account_pattern | A new Global Administrator account is created and used almost immediately | A common attacker TTP is to create a new admin account for their activities. | Microsoft Entra ID audit logs. |

## Detection & Response
- **Admin Activity Monitoring**: Implement stringent monitoring and alerting on all Global Administrator activity within Microsoft 365/Entra ID. Any sensitive action, such as issuing a mass wipe command, should require a multi-person approval workflow or trigger a high-priority, automated response ([D3-DAM: Domain Account Monitoring](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)).
- **Behavioral Analytics**: Use UEBA (User and Entity Behavior Analytics) to detect anomalous administrative behavior, such as a Global Admin logging in from a new location and immediately performing destructive actions.
- **Threshold-Based Alerting**: Configure alerts for when a certain threshold of critical actions (like device wipes) is crossed in a specific time frame.

## Mitigation
- **Principle of Least Privilege (PoLP)**: Strictly limit the number of Global Administrator accounts. Use Privileged Identity Management (PIM) to provide just-in-time (JIT) administrative access that is time-bound and requires approval ([M1026 - Privileged Account Management](https://attack.mitre.org/mitigations/M1026/)).
- **Break-Glass Accounts**: Maintain a small number of emergency 'break-glass' accounts that are not used for daily operations and are heavily monitored.
- **Phishing-Resistant MFA**: Protect all administrative accounts with phishing-resistant MFA (e.g., FIDO2 security keys) to prevent credential theft ([M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)).
- **Layered Defense**: As recommended by Source Logistics, implement a layered defense strategy that includes strong credential hygiene, phishing awareness, and granular access controls to prevent attackers from gaining the elevated privileges needed to launch such an attack.

**Tags:** Data Wiper, Living off the Land, Stryker, Handala Hack Team, Microsoft Intune, Supply Chain

## Sources
- [Source Logistics Warns Supply Chain Industry About Rising Data-Wiping Cyberattacks, Outlines Layered Defense Strategy](https://www.globenewswire.com/news-release/2026/07/22/3331494/0/en/source-logistics-warns-supply-chain-industry-about-rising-data-wiping-cyberattacks-outlines-layered-defense-strategy.html) — GlobeNewswire

---
Source: https://cyber.netsecops.io/articles/data-wiping-attacks-rise-using-legitimate-tools-for-destruction/
