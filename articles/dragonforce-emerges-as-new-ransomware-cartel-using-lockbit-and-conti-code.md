# 'DragonForce' Emerges as New Ransomware Cartel Built on LockBit and Conti DNA

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-01-20 | **Reading time:** 5 min

A new Ransomware-as-a-Service (RaaS) operation named DragonForce has emerged, positioning itself as a "ransomware cartel." The group is reportedly building its operations on the leaked source code of the notorious LockBit 3.0 and Conti ransomware variants. Operating a RaaS platform called 'Ransombay,' DragonForce's strategy includes absorbing smaller rival operations, signaling a trend towards consolidation in the cybercrime ecosystem.

## Executive Summary
A new Ransomware-as-a-Service (RaaS) group, **DragonForce**, has been identified and is being monitored by security analysts. The group is notable for its strategy, which involves building its malware on the leaked source code of two of the most infamous ransomware families in history: **[LockBit](https://attack.mitre.org/software/S0615/)** 3.0 and **[Conti](https://attack.mitre.org/groups/G0105/)**. DragonForce is marketing its services to affiliates via a platform named 'Ransombay' and appears to be consolidating power by absorbing smaller ransomware operations. This development highlights the continued evolution and industrialization of the ransomware threat, where dismantled groups' tools are quickly repurposed by new actors.

## Threat Overview
The emergence of DragonForce as a self-proclaimed "ransomware cartel" is a significant development. By leveraging the proven and effective codebases of LockBit and Conti, the group can bypass much of the initial development effort and immediately deploy a sophisticated and feature-rich ransomware payload. This allows them to focus on recruitment, operations, and marketing their 'Ransombay' platform to a wide pool of potential affiliates. The strategy of absorbing rival groups suggests an ambition to quickly become a dominant player in the RaaS market, similar to how Conti operated at its peak.

## Technical Analysis
While specific attacks have not yet been detailed, the malware's lineage provides insight into its likely capabilities:
- **Inherited TTPs:** The ransomware payload will likely incorporate the most effective features from both LockBit and Conti.
  - From **Conti**: Advanced lateral movement capabilities using tools like PsExec, multi-threading for rapid encryption, and the double-extortion model with a dedicated leak site.
  - From **LockBit 3.0**: Highly efficient and fast encryption, advanced anti-debugging and evasion techniques, and the ability to delete Volume Shadow Copies to inhibit recovery ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).
- **RaaS Platform ('Ransombay'):** This platform will provide affiliates with the ransomware builder, a management panel to track victims, and a negotiation portal. This lowers the barrier to entry for less skilled criminals to conduct ransomware attacks ([`T1608.003 - Install Digital Certificate`](https://attack.mitre.org/techniques/T1608/003/)).
- **Likely Attack Chain:** Affiliates will use common initial access vectors (phishing, stolen credentials, vulnerability exploitation) to gain entry, then use the DragonForce payload to encrypt the network and exfiltrate data.

## Impact Assessment
The emergence of a well-organized group like DragonForce, armed with top-tier ransomware code, increases the threat level for organizations globally. The group's professionalized approach and RaaS model mean we can expect an increase in the frequency and scale of attacks as they onboard more affiliates. The use of proven code means that many existing defenses may be challenged. The cartel-like strategy could also lead to less competition and more collaboration among top-tier criminals, further refining their TTPs and increasing their success rate.

## IOCs
| Type | Value | Description |
|---|---|---|
| Threat Actor | DragonForce | The name of the new RaaS group. |
| Malware | Ransombay | The name of the RaaS platform operated by DragonForce. |

## Cyber Observables for Detection
As DragonForce uses Conti and LockBit code, observables for those families are relevant for hunting:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| command_line_pattern | `vssadmin.exe delete shadows /all /quiet` | Classic ransomware behavior to prevent system restore. A key indicator for LockBit and Conti. | EDR logs, PowerShell logs | high |
| file_name | `*.lockbit` | The file extension used by LockBit. DragonForce may adopt a similar or new unique extension. | File integrity monitoring | medium |
| process_name | `rundll32.exe` | Conti was known to use rundll32.exe to execute its malicious DLL. Monitor for this process spawning from unusual parent processes. | EDR process relationship monitoring | medium |
| string_pattern | `Conti` or `LockBit` | The leaked source code may still contain strings or artifacts from the original malware families. | Memory scanning with YARA, static file analysis | low |

## Detection & Response
- **Behavioral Detection**: Focus on detecting the *behaviors* of ransomware, not just signatures. EDR tools should be configured to alert on processes that rapidly read/write/rename large numbers of files, delete shadow copies, or disable security tools.
- **D3FEND: Process Analysis ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis))**: Since the code is based on known families, existing behavioral rules in EDRs for detecting Conti and LockBit should be effective against DragonForce, provided they haven't significantly altered the core logic.
- **Threat Intelligence**: Monitor threat intelligence feeds for new IOCs (hashes, C2 domains, wallet addresses) associated with DragonForce and its Ransombay platform as they become available.

## Mitigation
Defenses against DragonForce are the same as for other top-tier ransomware groups:
- **Security Fundamentals**: Implement robust patch management, enforce MFA on all external services, and maintain a principle of least privilege.
- **Immutable Backups**: This is the single most important mitigation. Maintain tested, offline, and immutable backups to ensure you can recover without paying a ransom.
- **Network Segmentation**: Prevent lateral movement by segmenting the network. This can contain an infection to a single segment and prevent a full-scale enterprise-wide encryption event.
- **User Training**: Train users to spot and report phishing, a primary initial access vector for ransomware affiliates.

**Tags:** ransomware, RaaS, DragonForce, Ransombay, LockBit, Conti, cybercrime

## Sources
- [Daily Ransomware Report January 19 2026](https://purpleops.com/daily-ransomware-report-2026-01-19) — Purple Ops (2026-01-20)
- [Ingram Micro says ransomware attack affected 42,000 people (Context on RaaS evolution)](https://www.bleepingcomputer.com/news/security/ingram-micro-says-ransomware-attack-affected-42-000-people/) — BleepingComputer (2026-01-19)

---
Source: https://cyber.netsecops.io/articles/dragonforce-emerges-as-new-ransomware-cartel-using-lockbit-and-conti-code/
