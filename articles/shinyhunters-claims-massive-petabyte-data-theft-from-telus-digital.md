# ShinyHunters Claims Massive Data Theft from Telus Digital, Demands $65 Million

**Severity:** critical | **Category:** Data Breach,Threat Actor,Supply Chain Attack | **Updated:** 2026-03-14 | **Reading time:** 5 min

Canadian business process outsourcer Telus Digital is investigating a major security incident after the notorious 'ShinyHunters' hacking group claimed to have stolen nearly a petabyte of data. The attackers are demanding a $65 million ransom. The breach allegedly involves customer data, call records, and sensitive information from dozens of Telus Digital's corporate clients, which include banks and tech firms. ShinyHunters reportedly gained initial access using stolen Google Cloud Platform credentials from a previous third-party breach, highlighting a significant supply chain risk.

## Executive Summary
**Telus Digital**, the business process outsourcing (BPO) arm of Canadian telecom giant Telus, is currently investigating a massive data breach claimed by the notorious hacking group **[ShinyHunters](https://attack.mitre.org/groups/G1004/)**. The threat actors allege they have exfiltrated nearly a petabyte (1,000 TB) of data over several months and are demanding a $65 million ransom. The stolen data reportedly includes sensitive information from Telus Digital's clients—which span banking, technology, and government—as well as customer data and call records from Telus's consumer division. The initial access vector is believed to be a supply chain attack, where attackers leveraged stolen **[Google Cloud Platform](https://cloud.google.com/)** credentials obtained from a prior breach at Salesloft Drift. This incident underscores the cascading risk of supply chain security failures and the immense scale of modern data breaches.

## Threat Overview
The threat actor, **ShinyHunters**, is a well-known and financially motivated group famous for large-scale data breaches and selling stolen data on dark web forums. In this case, they targeted Telus Digital, a BPO provider with access to sensitive data from a wide array of prominent companies. The attackers claim to have maintained access to the network for an extended period, possibly since August 2025, allowing for the slow exfiltration of an enormous volume of data. The compromised data is said to affect 28 named companies that are clients of Telus Digital, posing a significant third-party risk to those organizations. The attackers are attempting to extort Telus Digital with a $65 million demand, fitting the pattern of a data theft and extortion campaign rather than a traditional ransomware attack.

## Technical Analysis
Based on reports, the attack chain involved a sophisticated supply chain compromise:
1.  **Initial Access**: The attackers did not breach Telus Digital directly. Instead, they leveraged credentials stolen from a third-party vendor, Salesloft Drift. These were reportedly **Google Cloud Platform (GCP)** credentials, which provided an initial foothold into Telus Digital's cloud environment. This is a classic example of [`T1195.002 - Compromise Software Supply Chain: Compromise Software Dependency`](https://attack.mitre.org/techniques/T1195/002/) or [`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/) obtained from a third party.
2.  **Persistence and Discovery**: After gaining access, ShinyHunters likely moved laterally within the cloud environment, discovered data repositories, and escalated privileges to gain broader access to storage buckets and databases.
3.  **Data Exfiltration**: The core of the attack was the massive data theft. Exfiltrating a petabyte of data is a non-trivial task and would require sustained, high-bandwidth connections over a long period. Attackers likely used techniques to blend the traffic with legitimate cloud operations to avoid detection, mapping to [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/) and [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/).

> The use of a cybersecurity tool, `trufflehog`, by the hackers is ironic. This open-source tool is designed to find leaked secrets and credentials in code repositories, suggesting the attackers may have used it to find further credentials within Telus Digital's environment to expand their access.

## Impact Assessment
The potential impact of this breach is colossal. For Telus Digital, it represents a catastrophic security failure that could lead to immense financial loss from the ransom demand, incident response costs, regulatory fines, and loss of business. For the 28+ client companies, this is a severe supply chain breach that has exposed their customer data and internal information, leading to their own incident response efforts and reputational damage. For individuals whose data was compromised—including customers of Telus and its clients—the breach poses a high risk of identity theft, fraud, and targeted phishing attacks. The sheer volume of data (1 petabyte) suggests that the stolen information is likely comprehensive and highly sensitive.

## Cyber Observables for Detection
To detect similar large-scale data exfiltration from a cloud environment:

| Type | Value | Description |
|---|---|---|
| log_source | GCP Audit Logs | Monitor for anomalous API calls, especially from service accounts, related to storage access (`storage.objects.get`, `storage.objects.list`). |
| network_traffic_pattern | Sustained high-volume egress traffic | Use VPC Flow Logs or network monitoring tools to detect unusually large and sustained data transfers from internal storage to external IP addresses or other cloud accounts. |
| command_line_pattern | `trufflehog` | EDR or command-line logging may detect the execution of security scanning tools like `trufflehog` by unauthorized users or processes. |
| log_source | Cloud IAM Logs | Alert on any changes to IAM policies, especially the creation of new service accounts or the addition of broad permissions like `storage.admin`. |

## Detection & Response
1.  **Cloud Security Posture Management (CSPM)**: Deploy CSPM tools to continuously monitor for misconfigurations, public-facing storage buckets, and overly permissive IAM roles in your cloud environment.
2.  **Egress Traffic Analysis**: Implement robust monitoring of all egress network traffic from your cloud environment. Baseline normal traffic patterns and set up alerts for high-volume transfers, especially to unknown destinations. This is a key D3FEND technique: `Network Traffic Analysis` (D3-NTA).
3.  **Credential Leakage Monitoring**: Use services that monitor public code repositories (like GitHub) and data breach dumps for leaked corporate credentials and API keys.
4.  **Supply Chain Auditing**: Regularly audit the security posture of critical third-party vendors who have access to your environment or data.

## Mitigation
1.  **Secure Cloud Credentials**: Enforce strict controls over cloud credentials and API keys. Use short-lived tokens instead of static keys wherever possible. Implement MFA for all human access to cloud consoles. Use tools to scan code repositories for inadvertently committed secrets before they are pushed.
2.  **Data Loss Prevention (DLP)**: Deploy cloud-native DLP solutions that can scan and classify data in storage buckets and databases. Configure policies to block or alert on the unauthorized movement of sensitive data.
3.  **Least Privilege in the Cloud**: Apply the principle of least privilege to all IAM roles and service accounts. A service account for one application should not have read access to data from another application or client.
4.  **Network Egress Controls**: Configure firewall rules and network controls to deny all outbound traffic by default, only allowing connections to known, trusted locations. This can prevent or at least complicate large-scale data exfiltration.

**Tags:** ShinyHunters, Data Breach, Extortion, Supply Chain Attack, Cloud Security, GCP

## Sources
- [Inside The Telus Data Breach: A Canadian Cybersecurity Crisis That Could Affect Millions](https://www.thecyberexpress.com/telus-data-breach-2026/) — The Cyber Express (2026-03-13)
- [Hackers reportedly stole nearly 1,000TB of data from Telus Digital](https://mobilesyrup.com/2026/03/12/hackers-reportedly-stole-nearly-1000tb-of-data-from-telus-digital/) — MobileSyrup (2026-03-12)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-claims-massive-petabyte-data-theft-from-telus-digital/
