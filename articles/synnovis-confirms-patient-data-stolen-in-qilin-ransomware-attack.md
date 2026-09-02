# Synnovis Confirms Patient Data Stolen in Qilin Ransomware Attack on London Hospitals

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2025-11-13 | **Reading time:** 6 min

Pathology service provider Synnovis has officially confirmed that patient personal data, including names, NHS numbers, and dates of birth, was stolen during the June 2024 ransomware attack attributed to the Qilin gang. The attack caused widespread disruption to London hospitals, leading to the cancellation of over 1,100 procedures. After a lengthy forensic investigation, Synnovis acknowledged the data breach, which followed the attackers leaking approximately 400GB of data. Affected NHS trusts are now beginning the process of notifying individual patients whose information was compromised.

## Executive Summary
**[Synnovis](https://www.synnovis.co.uk/)**, a critical pathology services provider for the **[NHS](https://www.england.nhs.uk/)** in London, has confirmed that sensitive patient data was exfiltrated during the highly disruptive ransomware attack it sustained in June 2024. The attack, claimed by the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group, had a severe operational impact, crippling lab services and forcing the cancellation of more than 1,100 hospital procedures. After a complex, multi-month forensic investigation, **[Synnovis](https://www.synnovis.co.uk/)** has now acknowledged the data breach component of the attack. The stolen data includes patient names, dates of birth, and NHS numbers. The provider is working with affected NHS trusts to begin the difficult process of notifying impacted individuals.

---

## Threat Overview
On June 20, 2024, the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group, a prominent ransomware-as-a-service (RaaS) operator, launched a devastating attack against **[Synnovis](https://www.synnovis.co.uk/)**. The attack encrypted critical systems, rendering the pathology service unable to process blood tests and other diagnostics for its partner hospitals, including Guy's and St Thomas' NHS Foundation Trust and King's College Hospital NHS Foundation Trust. This is a classic example of a double-extortion attack, where the threat actor both encrypts data for disruption and exfiltrates it for leverage.

Following the initial encryption, the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** gang published approximately 400 GB of data on its dark web leak site, claiming it belonged to **[Synnovis](https://www.synnovis.co.uk/)**. The confirmation of the data theft on November 12, 2025, comes after a prolonged analysis of this leaked data, which the company described as "unstructured, incomplete and fragmented."

## Technical Analysis
While specific TTPs for the initial access have not been disclosed, **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware attacks typically follow a common pattern:
1.  **Initial Access** ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/) or [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)): **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** affiliates often gain entry through exposed remote services like RDP or by using credentials stolen via phishing campaigns.
2.  **Credential Access & Discovery**: Once inside, they use tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to harvest credentials and perform network reconnaissance to identify high-value targets like domain controllers and backup servers.
3.  **Lateral Movement** ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)): Attackers move across the network to deploy their ransomware widely.
4.  **Exfiltration** ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)): Before encryption, sensitive data is collected and exfiltrated to attacker-controlled storage.
5.  **Impact** ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)): The ransomware payload is executed across the network, encrypting files and disrupting operations.

## Impact Assessment
The impact of this attack was severe and multifaceted. Operationally, it caused a near-total shutdown of pathology services in southeast London, leading to the cancellation of over 1,100 elective surgeries and appointments and creating a public health crisis due to blood shortages. Financially, the costs of response, recovery, and rebuilding the IT infrastructure are substantial. From a data privacy perspective, the theft of patient PII (names, NHS numbers, dates of birth) and potentially test results constitutes a major breach of trust and creates a risk of fraud and identity theft for the affected individuals. The reputational damage to both **[Synnovis](https://www.synnovis.co.uk/)** and the NHS is significant.

## Detection & Response
- **Detecting Data Staging**: Monitor for large, unexpected data transfers from internal systems to a single staging server, or large outbound transfers to cloud storage providers. Use D3FEND's [`User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
- **Ransomware Canary Files**: Place decoy files (canaries) on file shares with specific alerts. If these files are modified or encrypted, it can provide an early warning of a ransomware attack in progress.
- **Active Directory Monitoring**: Monitor for unusual activity in Active Directory, such as the creation of new admin accounts or widespread credential dumping attempts. Use D3FEND's [`Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).

## Mitigation
1.  **Offline Backups** ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)): Maintain immutable, offline backups of all critical data and systems. Regularly test restoration procedures to ensure they are effective. This is the most crucial defense against the impact of encryption.
2.  **Network Segmentation** ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)): Segment the network to prevent ransomware from spreading from one part of the organization to another. Critical systems, like those used in pathology labs, should be isolated from general corporate networks.
3.  **Multi-Factor Authentication (MFA)** ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)): Enforce MFA on all remote access points (VPN, RDP) and for all privileged accounts to prevent attackers from using stolen credentials for initial access and lateral movement.
4.  **Limit Privileged Access** ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)): Implement just-in-time (JIT) access and the principle of least privilege to minimize the number of accounts that have administrative rights, reducing the attack surface.

**Tags:** Qilin, Ransomware, Data Breach, Healthcare, Synnovis, NHS, Double Extortion

## Sources
- [Synnovis Confirms Patient Information Stolen in Disruptive Ransomware Attack](https://www.securityweek.com/synnovis-confirms-patient-information-stolen-in-disruptive-ransomware-attack/) — SecurityWeek
- [Synnovis notifies of data breach after 2024 ransomware attack](https://www.bleepingcomputer.com/news/security/synnovis-notifies-of-data-breach-after-2024-ransomware-attack/) — BleepingComputer
- [Synnovis updates on data breach from 2024 ransomware attack](https://digit.fyi/synnovis-updates-on-data-breach-from-2024-ransomware-attack/) — DIGIT
- [Update on the Synnovis cyber incident: 10 November 2025](https://www.england.nhs.uk/2025/11/update-on-the-synnovis-cyber-incident-10-november-2025/) — NHS England

---
Source: https://cyber.netsecops.io/articles/synnovis-confirms-patient-data-stolen-in-qilin-ransomware-attack/
