# Software Supply Chain Attacks Skyrocket to Record High, Driven by Ransomware Gangs

**Severity:** high | **Category:** Supply Chain Attack,Ransomware,Threat Intelligence | **Updated:** 2025-11-07 | **Reading time:** 5 min

Software supply chain attacks reached an all-time high in October 2025, with 41 claimed incidents, according to a new report from Cyble. This figure is over 30% higher than the previous monthly record. Ransomware groups, particularly Qilin and Akira, are identified as the primary drivers of this trend, responsible for a majority of attacks in 2025. The information technology, finance, and energy sectors are the most heavily targeted, highlighting a strategic shift by attackers to compromise organizations through their trusted third-party suppliers.

## Executive Summary
Threat intelligence firm **[Cyble](https://cyble.com/)** reports that software supply chain attacks surged to a new record in October 2025, with 41 attacks claimed on dark web data leak sites. This represents a more than 30% increase over the previous monthly peak and more than double the average monthly rate seen prior to April 2025. The report identifies ransomware groups **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and **[Akira](https://malpedia.caad.fkie.fraunhofer.de/details/win.akira)** as the dominant forces behind this escalation. These groups are strategically targeting third-party technology providers to gain access to their downstream customers. The most impacted industries include information technology, finance, energy, and government, signaling a dangerous and widespread threat to organizations through their trusted digital supply chains.

---

## Threat Overview
The data, compiled from ransomware leak sites, shows a clear and sustained increase in supply chain attacks throughout 2025. After averaging 13 attacks per month from early 2024 to March 2025, the rate spiked and has averaged over 28 per month since April 2025, culminating in the record 41 incidents in October.

This trend reflects a strategic shift by threat actors. Instead of attacking hardened targets directly, they are finding it more efficient to compromise a single, less-secure software vendor or service provider and leverage that access to attack their entire customer base. This provides a significant return on investment for the attackers.

### Key Threat Actors
- **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin):** This ransomware group has been highly active, recently claiming an attack on a U.S. technology provider for law enforcement, where they allegedly stole source code and client data. They also claimed responsibility for attacks on three U.S. energy cooperatives.
- **[Akira](https://malpedia.caad.fkie.fraunhofer.de/details/win.akira):** Alongside Qilin, Akira is a leading perpetrator of supply chain attacks in 2025.
- **Kyber:** A newly identified ransomware group that contributed to the trend by leaking 141GB of data allegedly stolen from a major U.S. defense and aerospace contractor.

## Technical Analysis
The attacks fall under the broad MITRE ATT&CK Tactic of Initial Access, specifically [`T1195 - Supply Chain Compromise`](https://attack.mitre.org/techniques/T1195/). This can manifest in several ways:
- **[`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/):** Similar to the NuGet attack, this involves poisoning open-source libraries.
- **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/):** This involves compromising a vendor's build or distribution environment to inject malicious code into legitimate software updates.
- **[`T1195.003 - Compromise Web-based Services`](https://attack.mitre.org/techniques/T1195/003/):** This involves compromising a third-party service (like a managed service provider) that has privileged access to customer environments.

Once the ransomware groups gain access to the downstream victims, they proceed with their standard playbook: lateral movement ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/)), defense evasion ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)), data exfiltration ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)), and encryption for impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
Supply chain attacks have a cascading effect, multiplying the impact of a single breach. A compromise at one software provider can lead to dozens or hundreds of downstream victims. The most targeted sectors—IT, finance, energy, and government—are critical to national infrastructure and the economy, making these attacks particularly damaging. For victim organizations, the result is often a full-scale ransomware incident, leading to operational shutdown, data loss, regulatory fines, and severe reputational harm. The attack on the law enforcement tech provider, for example, could expose sensitive police data and compromise ongoing investigations.

## Detection & Response
- **Third-Party Risk Management:** Detection begins before the attack. Organizations must have a robust third-party risk management (TPRM) program to assess the security posture of their critical suppliers. **D3FEND Technique:** [`D3-VAM: Vendor Assessment and Monitoring`](https://d3fend.mitre.org/technique/d3f:VendorAssessmentandMonitoring).
- **Egress Traffic Monitoring:** Monitor outbound network traffic for signs of data exfiltration or connections to known ransomware C2 infrastructure. A compromised third-party tool making anomalous connections is a major red flag. **D3FEND Technique:** [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
- **Behavioral Monitoring:** Use EDR and identity management solutions to monitor for suspicious behavior originating from trusted third-party software or service accounts. An alert on a service account suddenly accessing large volumes of data is a key indicator. **D3FEND Technique:** [`D3-RAPA: Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).

## Mitigation and Recommendations
1.  **Zero Trust Architecture:** Do not implicitly trust traffic or processes originating from third-party software. Enforce the principle of least privilege, ensuring that third-party tools have only the absolute minimum access required to function. **D3FEND Technique:** [`D3-UAP: User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions).
2.  **Software Bill of Materials (SBOM):** Demand SBOMs from your software vendors. An SBOM provides a detailed inventory of all components in a piece of software, allowing you to quickly identify if you are affected when a vulnerability is discovered in a dependency.
3.  **Network Segmentation:** Segment the network to isolate third-party tools and services. This can prevent a compromise in one vendor's tool from spreading across the entire corporate network. **D3FEND Technique:** [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
4.  **Incident Response Planning:** Update incident response plans to specifically include supply chain attack scenarios. This should involve clear communication plans with vendors and a process for rapidly disabling or isolating compromised third-party connections.

**Tags:** Supply Chain Attack, Ransomware, Qilin, Akira, Cyble, Dark Web

## Sources
- [Software supply chain attacks surge, as ransomware groups escalate and industrial sectors face more exposure](https://industrialcyber.co/news/software-supply-chain-attacks-surge-as-ransomware-groups-escalate-and-industrial-sectors-face-more-exposure/) — Industrial Cyber (2025-11-07)
- [Software Supply Chain Attacks Surge to Record High in October 2025](https://cyble.com/blog/software-supply-chain-attacks-surge-to-record-high-in-october-2025/) — Cyble (2025-11-04)
- [Leak Site Ransomware Victims Spike 13% in a Year](https://www.infosecurity-magazine.com/news/leak-site-ransomware-victims-spike/) — Infosecurity Magazine (2025-11-06)

---
Source: https://cyber.netsecops.io/articles/software-supply-chain-attacks-hit-record-high-cyble-report-reveals/
