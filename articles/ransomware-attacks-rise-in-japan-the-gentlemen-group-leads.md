# Ransomware Attacks in Japan Rise; 'The Gentlemen' Group Dominates

**Severity:** high | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2026-09-17 | **Reading time:** 4 min

A Cisco Talos report reveals that ransomware incidents in Japan increased by 4.7% in the first half of 2026 compared to the previous year. The ransomware group known as 'The Gentlemen' has emerged as the most active threat actor, primarily targeting small-to-medium enterprises (SMEs), which accounted for 80% of all victims. The group operates a Ransomware-as-a-Service (RaaS) model and employs double-extortion tactics.

## Executive Summary
A new report from **[Cisco Talos](https://www.talosintelligence.com/)** published on September 17, 2026, highlights a continued and growing ransomware threat in Japan. The research indicates a 4.7% increase in ransomware incidents during the first six months of 2026 compared to the same period in 2025, with 90 Japanese organizations impacted. The most prolific threat actor was a group known as **The Gentlemen**, responsible for 14 of the incidents. The report underscores a significant focus on small- and medium-sized enterprises (SMEs), which constituted 80% of the victims. **[Cisco Talos](https://www.talosintelligence.com/)** also uncovered infrastructure used by the group, containing tools for attacks against both Windows and VMware ESXi environments.

---

## Threat Overview
The ransomware landscape in Japan is characterized by a steady increase in attacks and the emergence of new, aggressive players. **The Gentlemen**, a group active since mid-2025, has quickly become the dominant force. The group operates a **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** model, which lowers the barrier to entry for less-skilled affiliates and accelerates the scale of their campaigns. They employ a double-extortion strategy, not only encrypting victim data but also exfiltrating it and threatening to publish it on their data leak site to increase pressure on victims to pay.

Other active groups targeting Japan include **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and SafePay, each responsible for seven incidents. The primary targets are SMEs (organizations with capital under JPY 1 billion), likely because they are perceived as having fewer security resources and are still able to make significant ransom payments to avoid business disruption.

## Technical Analysis
**[Cisco Talos](https://www.talosintelligence.com/)**'s investigation provided insight into the operational infrastructure of **The Gentlemen**. Researchers discovered an open directory believed to be used by an affiliate of the group. This directory contained a toolkit with various malicious payloads and scripts, indicating a degree of operational sophistication. The tools were designed to target both Windows and VMware ESXi environments, a common tactic among modern ransomware groups to maximize impact by encrypting not just workstations and servers, but also the virtual infrastructure they run on.

Common TTPs associated with these groups include:
- **[Initial Access](https://attack.mitre.org/tactics/TA0001/)**: Gained through exploiting vulnerabilities in public-facing services (e.g., VPNs, RDP) or through phishing campaigns.
- **[Lateral Movement](https://attack.mitre.org/tactics/TA0008/)**: Using stolen credentials and tools like Cobalt Strike to move through the network.
- **[Impact](https://attack.mitre.org/tactics/TA0040/)**: Encrypting files on both individual systems (**[T1486](https://attack.mitre.org/techniques/T1486/)**) and virtual machines on ESXi servers (**[T1486](https://attack.mitre.org/techniques/T1486/)**), and deleting backups to inhibit recovery (**[T1490](https://attack.mitre.org/techniques/T1490/)**).

The report also notes linguistic evidence suggesting the potential involvement of Russian-speaking individuals in the group's operations.

## Impact Assessment
The targeting of SMEs has a significant economic impact. While individual ransoms may be smaller than those demanded from large corporations, the cumulative effect can be devastating for a critical segment of Japan's economy. For each victim, the impact includes:
- **Business Disruption**: Complete halt of operations, leading to direct revenue loss.
- **Data Loss**: Permanent loss of data if backups are also compromised and the ransom is not paid.
- **Reputational Harm**: Loss of trust from customers and partners.
- **High Recovery Costs**: Expenses for incident response, system rebuilding, and security improvements.

The focus on ESXi is particularly damaging, as compromising a single hypervisor can allow attackers to encrypt dozens or hundreds of virtual machines simultaneously, causing widespread and rapid paralysis of an organization's IT infrastructure.

## Detection & Response
- **Monitor for RaaS Tools**: Security teams should monitor for the presence of common ransomware tools, including legitimate software often abused by attackers like PsExec, and known RaaS payloads.
- **ESXi Logging**: Ensure logging is enabled on VMware ESXi hosts and that logs are shipped to a central SIEM. Monitor for unusual SSH activity, unauthorized VIB package installations, and commands like `esxcli` being used to manipulate VMs.
- **Network Baselining**: Analyze internal network traffic to detect anomalous lateral movement, such as a workstation connecting to an ESXi management interface for the first time.

## Mitigation
1.  **Secure ESXi**: Harden VMware ESXi hosts by disabling unused services (like the SLP service), using strong and unique passwords, enabling lockdown mode, and restricting access to management interfaces to a dedicated management network.
2.  **Backup Strategy**: Implement a 3-2-1 backup strategy with offline and immutable copies of critical data and VM images. Regularly test the restoration process.
3.  **Patch Management**: Aggressively patch all systems, especially public-facing services and hypervisors, to close initial access vectors.
4.  **Network Segmentation**: Segment the network to prevent attackers from easily moving from the IT environment to critical server infrastructure like ESXi hosts.

**Tags:** ransomware, Japan, SME, RaaS, double extortion, Cisco Talos, The Gentlemen

## Sources
- [Ransomware incidents in Japan in the first half of 2026: Investigation of The Gentlemen's infrastructure and evidence of Qilin's AI use](https://blog.talosintelligence.com/ransomware-incidents-in-japan-in-the-first-half-of-2026/) — Cisco Talos (2026-09-17)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-rise-in-japan-the-gentlemen-group-leads/
