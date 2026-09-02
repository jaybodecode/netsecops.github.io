# Everest Ransomware Awakens Sleeping PCs with Wake-on-LAN to Maximize Attack Surface

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-07-09 | **Reading time:** 6 min

The Everest ransomware group has adopted a novel and aggressive tactic to maximize its impact: using Wake-on-LAN (WoL) 'magic packets' to awaken sleeping or dormant computers on a victim's network. According to research from AttackIQ, this technique allows the ransomware to significantly expand its attack surface, ensuring that machines in low-power states are powered on and encrypted. The malware first parses the network's ARP cache to identify potential targets before broadcasting the WoL packets, demonstrating a sophisticated approach to network-wide compromise.

## Executive Summary

The **[Everest](https://attack.mitre.org/software/S0646/)** ransomware group, a double-extortion operation active since late 2020, has integrated a clever and concerning new tactic into its attacks. According to threat emulation research by AttackIQ, the group's malware now uses **[Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN)** (WoL) functionality to power on dormant and sleeping endpoints across a compromised network. This allows the ransomware to encrypt a much larger number of devices than would otherwise be possible, significantly increasing the disruptive impact of an attack. This technique, while not new in concept, is rarely seen in major ransomware campaigns and demonstrates a focus on maximizing damage and pressure on the victim.

## Threat Overview

The **[Everest](https://attack.mitre.org/software/S0646/)** group's updated malware employs a multi-stage process to ensure a comprehensive network compromise. The most notable stage is its use of Wake-on-LAN. The process is as follows:
1.  **Discovery**: On a compromised host, the malware parses the local Address Resolution Protocol (ARP) cache. The ARP cache contains a map of recently contacted IP addresses to their corresponding MAC (Media Access Control) addresses on the local network segment. This provides the malware with a list of potential targets, including those that are currently offline or sleeping. This is a form of [`T1018 - Remote System Discovery`](https://attack.mitre.org/techniques/T1018/).
2.  **Activation**: The ransomware then broadcasts WoL 'magic packets' over the network, typically using UDP ports 7 and 9. These packets contain the MAC addresses of the discovered devices. If a device is configured to support WoL, it will power on when it receives a magic packet addressed to it.
3.  **Impact**: By waking up these dormant machines, the ransomware ensures they are online and accessible for the subsequent encryption phase, dramatically increasing the number of affected systems.

This novel approach turns a common power-saving feature into a security liability.

## Technical Analysis

Before initiating the WoL sequence, the **[Everest](https://attack.mitre.org/software/S0646/)** malware performs several actions to prepare the environment and weaken defenses, showcasing a well-thought-out attack chain:
- **Defense Evasion**: It disables Windows Defender's Controlled Folder Access feature, which is designed to protect files from unauthorized modification by ransomware ([`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).
- **Lateral Movement Preparation**: It enables File and Printer Sharing and re-enables the legacy SMBv1 protocol. This is done to facilitate its own propagation and encryption of network shares ([`T1021.002 - Remote Services: SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)).
- **Encryption**: After waking devices and preparing the network, it maps all discovered local and remote network shares and proceeds with file encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
- **Cleanup**: Finally, it drops a ransom note, changes the desktop wallpaper, and executes a self-deletion script to erase its own executable, hindering forensic analysis ([`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/)).

## Impact Assessment

The use of Wake-on-LAN significantly increases the potential impact of an Everest ransomware attack. In many organizations, a substantial portion of workstations are powered down or in a sleep state outside of business hours. These machines would normally be safe from a ransomware attack that spreads across the network at night or on a weekend. By waking these machines up, Everest ensures they are also encrypted, leading to a much larger-scale business disruption. This can turn a partial outage into a complete shutdown, putting more pressure on the victim to pay the ransom. It forces organizations to reconsider the security implications of network features like WoL.

## IOCs — Directly from Articles

No specific file hashes or C2 domains were provided in the source articles.

## Cyber Observables — Hunting Hints

Security teams can hunt for this specific activity by monitoring network traffic:

| Type | Value | Description |
|---|---|---|
| Port | 7 (UDP), 9 (UDP) | These are the standard ports for Wake-on-LAN 'magic packets'. A sudden broadcast storm of traffic on these ports is highly suspicious. |
| Network Traffic Pattern | Broadcast traffic to ff:ff:ff:ff:ff:ff | WoL packets are sent as broadcast frames. A spike in broadcast traffic from an unusual source could indicate this activity. |
| Command Line Pattern | `arp -a` | The command to display the ARP cache. A malware process executing this command could be a precursor to the WoL tactic. |
| Log Source | DHCP Server Logs | Correlating DHCP lease information with ARP cache data can help identify all devices on a subnet, similar to how the malware discovers targets. |

## Detection & Response

- **Network Traffic Monitoring**: Use a network intrusion detection system (NIDS) or a SIEM to monitor for and alert on unusual spikes in UDP traffic on ports 7 and 9. This is a direct and high-fidelity indicator of this attack technique. This falls under [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Behavioral Analysis on Endpoint**: An EDR solution should be configured to detect the full chain of Everest's behavior: disabling Controlled Folder Access, enabling SMBv1, querying the ARP cache, and then making network connections to other devices. This sequence of events is highly indicative of a ransomware attack.
- **ARP Cache Monitoring**: While difficult to do in real-time, periodic snapshots of a machine's ARP cache that show it has recently resolved a large number of hosts on the network could be a sign of reconnaissance.

## Mitigation

- **Disable Wake-on-LAN**: The most direct mitigation is to disable WoL in the BIOS/UEFI settings of endpoints and in the network adapter properties within the operating system, especially for devices in sensitive network segments. If WoL is a business requirement, its use should be restricted to specific administrative subnets.
- **Network Segmentation**: Proper network segmentation can limit the effectiveness of this attack. By placing devices in separate VLANs, a broadcast WoL packet sent in one segment will not reach devices in another, containing the spread. This is a practical application of [`D3-BDI: Broadcast Domain Isolation`](https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation).
- **Control Egress Traffic**: While this attack focuses on internal movement, Everest is a double-extortion group. Strict egress filtering and monitoring for large data transfers to unknown destinations can help prevent the data theft portion of the attack.
- **Disable SMBv1**: SMBv1 is a deprecated and insecure protocol. It should be disabled across the entire environment. The fact that Everest enables it shows that attackers still see it as a viable pathway for lateral movement.

**Tags:** Ransomware, Everest, Wake-on-LAN, Malware, TTP

## Sources
- [Everest Ransomware Uses Wake-on-LAN to Wake Dormant Hosts Before Encryption](https://cyberpress.org/everest-wakes-dormant-hosts/) — Cyber Press (2026-07-09)

---
Source: https://cyber.netsecops.io/articles/everest-ransomware-uses-wake-on-lan-to-attack-sleeping-devices/
