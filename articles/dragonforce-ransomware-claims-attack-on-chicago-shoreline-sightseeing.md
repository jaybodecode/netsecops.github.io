# DragonForce Ransomware Targets Chicago Tour Company in Double Extortion Attack

**Severity:** medium | **Category:** Ransomware,Cyberattack,Data Breach | **Updated:** 2026-06-10

The DragonForce ransomware group has claimed responsibility for a cyberattack on Shoreline Sightseeing, a popular Chicago-based boat tour operator. On May 29, 2026, the group listed the company on its dark web leak site, threatening to publish a 'full leak' of stolen data unless a ransom is paid. The incident is a typical double extortion attack, where data is both encrypted and exfiltrated for leverage. The specifics of the stolen data have not been disclosed. This attack underscores the ongoing trend of ransomware gangs targeting small and mid-sized businesses.

## Executive Summary

The **DragonForce** ransomware group has publicly claimed an attack against **Shoreline Sightseeing**, a prominent boat tour and water taxi company in Chicago. On May 29, 2026, the threat actors added the company to their data leak site, a common tactic in double extortion schemes. **DragonForce** has threatened to release all exfiltrated data unless the company engages in ransom negotiations. This incident highlights the indiscriminate nature of ransomware gangs, who increasingly target small and medium-sized enterprises (SMEs) perceived to have valuable customer data and potentially weaker security postures.

---

## Threat Overview

On May 29, 2026, **Shoreline Sightseeing** appeared on the official data leak site operated by the **DragonForce** ransomware gang. The post included a direct threat to publish a 'full leak' of stolen data, indicating that the attackers have successfully exfiltrated information from the company's network in addition to any potential encryption.

This is a classic **[double extortion](https://en.wikipedia.org/wiki/Ransomware#Double_and_triple_extortion)** attack, designed to maximize pressure on the victim:
1.  **Data Encryption:** The primary attack involves encrypting files on the victim's network, disrupting operations ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
2.  **Data Exfiltration:** Before encryption, the attackers steal sensitive corporate or customer data ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)).
3.  **Extortion:** The attackers demand a ransom for both the decryption key and a promise to delete the stolen data. The threat of publicizing the data on their leak site is used as leverage.

The specific type and volume of data stolen from **Shoreline Sightseeing** have not been made public. However, for a tourism-focused company, this could include customer PII, payment card information, employee records, and internal financial data.

---

## Technical Analysis

While the specific TTPs for this attack are unknown, **DragonForce** and similar ransomware groups typically follow a well-established attack lifecycle:

- **Initial Access:** Often gained through phishing emails ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of unpatched public-facing services like VPNs or RDP ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or credentials purchased from initial access brokers.
- **Persistence and Privilege Escalation:** Once inside, they establish a foothold and seek to escalate privileges to a domain administrator level ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
- **Discovery and Lateral Movement:** Attackers map the network, identify critical servers and data stores, and move laterally using tools like PsExec or WMI.
- **Data Exfiltration and Impact:** Data is compressed and exfiltrated to cloud storage, followed by the deployment of the ransomware payload across the network.

> The targeting of a local, well-known business like Shoreline Sightseeing demonstrates that no organization is too small to be a target. Ransomware is an opportunistic crime, and any organization with digital assets is at risk.

---

## Impact Assessment

For a mid-sized business like **Shoreline Sightseeing**, the impact of such an attack can be devastating. Operational disruption from encrypted systems can halt ticket sales, scheduling, and administrative functions. The cost of incident response, recovery, and potential ransom payment can be financially crippling.

The public data leak threat poses a significant reputational risk, potentially eroding customer trust. Furthermore, if sensitive customer data (like PII or payment info) is leaked, the company could face regulatory penalties and legal action. This incident serves as a stark reminder for all SMEs to assess their cyber risk and invest in foundational security controls.

---

## IOCs — Directly from Articles

No specific technical Indicators of Compromise (IOCs) were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams can hunt for general ransomware precursor activity:

| Type | Value | Description |
|---|---|---|
| Log Source | VPN / RDP Logs | Monitor for brute-force attempts or successful logins from unusual IP addresses or at odd hours. |
| Command Line Pattern | `nltest /dclist` or `net group "Domain Admins"` | Look for reconnaissance commands used to map the Active Directory environment. |
| Process Name | `rclone.exe`, `megacmd.exe` | Watch for the execution of legitimate cloud storage command-line tools, which are frequently abused for data exfiltration. |
| File Name | `*.zip`, `*.7z`, `*.rar` | Monitor for the creation of large archive files on servers, which often precedes data exfiltration. |

---

## Detection & Response

- **EDR with Ransomware Canary Files:** Deploy EDR solutions that create 'canary' files or honeypot shares. Any modification of these files is a high-fidelity alert for ransomware activity, allowing for automated isolation of the offending host. This is a form of **D3FEND's Decoy Object** ([`D3-DO`](https://d3fend.mitre.org/technique/d3f:DecoyObject)).
- **Egress Traffic Monitoring:** Monitor outbound network traffic for large data transfers to non-standard destinations, especially cloud storage providers not used by the business. This can help detect data exfiltration in progress. This aligns with **D3FEND's Network Traffic Analysis** ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)).
- **Active Directory Monitoring:** Implement tools to monitor for changes in Active Directory, such as the creation of new admin accounts or modifications to privileged groups.

---

## Mitigation

- **Offline Backups:** The single most important mitigation is to have a robust, tested backup and recovery plan. Backups must be kept offline or immutable so they cannot be encrypted or deleted by the attackers.
- **Patch Management:** Consistently patch all internet-facing systems and software to close common initial access vectors. This is a direct application of **D3FEND's Software Update** ([`D3-SU`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
- **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services (VPN, RDP) and critical internal applications to prevent credential abuse. This corresponds to **D3FEND's Multi-factor Authentication** ([`D3-MFA`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Cybersecurity Fundamentals for SMEs:** Even with limited resources, SMEs should focus on foundational controls: user awareness training, strong password policies, network segmentation, and endpoint protection.

**Tags:** Chicago, Double Extortion, DragonForce, Ransomware, Shoreline Sightseeing

## Sources
- [DragonForce Ransomware Attack on Shoreline Sightseeing](https://www.dexpose.io/dragonforce-ransomware-attack-on-shoreline-sightseeing/) (2026-06-01)
- [Victim: Shoreline Sightseeing](https://ransomware.live/victim/shoreline-sightseeing/) (2026-05-29)
- [Nova Targets LTI Services and Larick Towing in Ransomware Attack](https://www.dexpose.io/nova-targets-lti-services-and-larick-towing-in-ransomware-attack/) (2026-06-01)
- [Ransomware.live](https://ransomware.live/) (2026-06-01)

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-claims-attack-on-chicago-shoreline-sightseeing/
