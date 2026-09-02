# SonicWall Breach Far Worse Than Feared: All Cloud Backup Users' Firewall Configs Stolen

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cloud Security | **Updated:** 2025-11-08 | **Reading time:** 5 min

**[SonicWall](https://www.sonicwall.com)** has issued a major update on a September data breach, revealing its impact is far more severe than initially disclosed. The company confirmed that an unauthorized party accessed and exfiltrated firewall configuration backups for **all** customers of its MySonicWall cloud backup service, a stark revision from the initial estimate of less than 5%. The stolen `.EXP` files contain complete firewall configurations, including security rules and encrypted credentials. While the credentials remain encrypted, security experts warn that possession of these files significantly lowers the bar for future targeted attacks. SonicWall, assisted by **[Mandiant](https://www.mandiant.com/)**, is urging all affected customers to reset passwords and follow detailed mitigation guidance.

## Executive Summary
**[SonicWall](https://www.sonicwall.com)** has confirmed a significant escalation of a data breach first disclosed in September 2025. In an update on October 8, the network security vendor stated that an unauthorized third party successfully exploited a vulnerability in its `MSW Cloud Backup API` and exfiltrated firewall configuration backup files. Critically, the breach impacted **every customer** who has ever used the MySonicWall cloud backup service, a dramatic increase from the company's initial estimate that less than 5% of its firewall base was affected. The stolen configuration files (`.EXP`) contain a wealth of sensitive information, including firewall rules, security settings, and encrypted credentials. While SonicWall emphasizes that credentials remain encrypted, the incident provides potential attackers with a detailed blueprint of victim networks, significantly increasing the risk of future targeted attacks. The company is now notifying all customers and providing urgent remediation guidance.

---

## Threat Overview
The incident stems from the exploitation of an unspecified vulnerability in the API for the **MySonicWall Cloud Backup** platform. This allowed an unauthorized actor to systematically access and download `.EXP` backup files for the entire customer base of the service. These files are complete snapshots of a firewall's configuration.

The stolen data includes:
-   Firewall rules and policies
-   Network configuration and objects
-   Security service settings
-   Encrypted user credentials and pre-shared keys

While SonicWall has stated that sensitive data like passwords are encrypted (using `AES-256` on Gen 7 appliances), security experts warn that this is not a complete safeguard. Attackers in possession of both the configuration data and the encrypted values can mount offline attacks or use the configuration details to craft highly convincing social engineering campaigns. The investigation, supported by incident response firm **[Mandiant](https://www.mandiant.com/)**, is ongoing.

## Technical Analysis
The primary attack vector was a compromised API endpoint. This is a classic example of a breach in a supporting cloud service leading to a compromise of customer data, bordering on a supply chain attack.

### MITRE ATT&CK TTPs
- **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/)**: By compromising the cloud backup service, the attackers have acquired data that can be used to undermine the security of downstream customers.
- **[`T1213.002 - Data from Cloud Storage`](https://attack.mitre.org/techniques/T1213/002/)**: The core of the attack was the exfiltration of `.EXP` files from SonicWall's cloud infrastructure.
- **[`T1526 - Cloud Service Discovery`](https://attack.mitre.org/techniques/T1526/)**: Attackers likely probed SonicWall's cloud infrastructure to identify the vulnerable API endpoint.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: The stolen configuration files could enable future attacks using valid, albeit potentially weak or brute-forceable, credentials.

## Impact Assessment
The impact of this breach is potentially severe for all SonicWall customers who used the cloud backup feature. Attackers now possess a detailed roadmap of their network architecture and security posture. This information can be used to:
-   Identify weaknesses in firewall rule sets.
-   Craft targeted phishing and social engineering attacks.
-   Mount offline brute-force or dictionary attacks against the encrypted credentials.
-   Plan future intrusions with intimate knowledge of the target environment.

SonicWall has categorized the risk to help customers prioritize, labeling internet-facing firewalls as "Active – High Priority." The breach erodes trust in SonicWall's cloud services and places a significant remediation burden on its entire customer base.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| file_name | `*.exp` | SonicWall firewall configuration backup file extension. Monitor for these files in unusual locations or being exfiltrated. | DLP, File Integrity Monitoring, EDR | high |
| api_endpoint | `MSW Cloud Backup API` | The compromised API. While the specific endpoint is not public, logs related to this service should be reviewed for anomalous access. | Cloud audit logs, API gateway logs | high |
| network_traffic_pattern | `Anomalous login attempts post-breach` | Monitor firewall management interfaces for a spike in failed or unusual login attempts, which could indicate attackers trying to use information from the breach. | Firewall logs, SIEM | medium |

## Detection & Response
Since the breach occurred on SonicWall's infrastructure, customer-side detection of the initial event is impossible. Response efforts must focus on mitigating the consequences.
1.  **Identify Impacted Devices**: Customers must log into the MySonicWall portal to check the list of affected devices provided by the company.
2.  **Threat Hunting**: Proactively hunt for any signs of compromise on firewalls, especially those marked as "High Priority." Look for unauthorized configuration changes, new administrative accounts, or suspicious outbound traffic.
3.  **Log Review**: Analyze firewall logs for any anomalous access or activity since the breach period in September 2025. This involves leveraging D3FEND techniques like **[Authentication Event Thresholding](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)** (D3-ANET) to spot brute-force attempts.

## Mitigation
SonicWall has advised the following urgent actions, which align with D3FEND countermeasures:
1.  **Reset All Credentials**: Immediately reset all local and remote user passwords, pre-shared keys for VPNs, and any other secrets stored in the firewall configuration. This is a critical **[Credential Eviction](https://d3fend.mitre.org/technique/d3f:CredentialEviction)** step.
2.  **Enable MFA**: Enforce **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** (D3-MFA) on all administrative accounts and VPN access to prevent the use of potentially compromised credentials.
3.  **Review and Harden Configurations**: Use this opportunity to review all firewall rules and security settings. Remove any unnecessary rules and harden the configuration according to best practices. This falls under D3FEND's **[Platform Hardening](https://d3fend.mitre.org/technique/d3f:PlatformHardening)** (D3-PH) category.
4.  **Limit Management Access**: Restrict access to the firewall's management interface to a limited set of trusted IP addresses. This is a form of **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** (D3-NI).

**Tags:** data breach, SonicWall, firewall, cloud security, API security, configuration management

## Sources
- [Threat actors steal firewall configs, impacting all SonicWall Cloud Backup users](https://securityaffairs.co/169470/data-breach/sonicwall-cloud-backup-users-data-breach.html) — Security Affairs (2025-10-09)
- [All SonicWall Cloud Backup Users Had Firewall Configurations Stolen](https://www.securityweek.com/all-sonicwall-cloud-backup-users-had-firewall-configurations-stolen/) — SecurityWeek (2025-10-09)
- [SonicWall confirms all Cloud Backup Service users were compromised](https://www.scmagazine.com/news/sonicwall-confirms-all-cloud-backup-service-users-were-compromised) — SC Magazine (2025-10-09)

---
Source: https://cyber.netsecops.io/articles/sonicwall-breach-expands-compromising-all-cloud-backup-users/
