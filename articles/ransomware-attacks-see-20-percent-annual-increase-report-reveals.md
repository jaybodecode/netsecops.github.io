# Ransomware attacks up 20% year-over-year in H1 2026, says report

**Severity:** high | **Category:** Ransomware,Threat Intelligence | **Updated:** 2026-07-20 | **Reading time:** 4 min

A new report from NordStellar indicates that ransomware attacks increased by 20% in the first half of 2026 compared to the same period in 2025, with 5,257 incidents recorded. While Q2 2026 saw a slight 4% dip from Q1, the attack volume remains at a high baseline of over 2,500 incidents per quarter. The ransomware groups Qilin and The Gentlemen were the most active. The report also noted a significant 74% surge in attacks targeting large enterprises with over $1 billion in revenue, signaling a shift in focus for some groups.

## Executive Summary
A report from cybersecurity firm **NordStellar** indicates a persistent and growing ransomware threat landscape, with a 20% year-over-year increase in attacks during the first half of 2026. Researchers documented 5,257 ransomware incidents between January and June 2026. Although the second quarter experienced a minor 4% decrease compared to the first, the overall volume establishes a new and alarmingly high baseline. The report highlights intense activity from ransomware groups **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and **The Gentlemen**. A particularly concerning trend is a 74% quarterly increase in attacks targeting large enterprises, suggesting that major corporations are increasingly in the crosshairs of sophisticated ransomware operations.

## Threat Overview
- **Total Attacks (H1 2026):** 5,257 incidents
- **Year-over-Year Growth:** 20% increase compared to H1 2025 (4,387 incidents)
- **Quarterly Trend:** Q2 2026 saw 2,581 incidents, a 4% decrease from Q1 2026, but established a high baseline.
- **Most Active Groups (Q2 2026):**
  1.  **Qilin:** 299 attacks
  2.  **The Gentlemen:** 284 attacks
  3.  **DragonForce:** 147 attacks

While small and medium-sized businesses (SMBs) remain the primary targets, the report identifies a significant strategic shift towards more lucrative, large enterprise targets.

## Technical Analysis
The high volume of attacks is driven by the Ransomware-as-a-Service (RaaS) model, which lowers the barrier to entry for less skilled affiliates. The TTPs used by these groups are well-established:
- **Initial Access:** The most common vectors continue to be phishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), and the use of stolen credentials, particularly for remote access services like RDP and VPNs ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
- **Execution and Impact:** Groups like Qilin are known for their sophisticated encryptors and double-extortion tactics. After gaining access, they move laterally to compromise as much of the network as possible before deploying the ransomware payload ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and exfiltrating data to their leak sites.

## Impact Assessment
- **Increased Targeting of Large Enterprises:** The 74% surge in attacks against companies with over $1 billion in revenue is a critical finding. These attacks are more complex but offer a much higher potential payout for threat actors. This trend suggests that top-tier ransomware groups are becoming more ambitious and capable.
- **Sustained High Volume:** The establishment of a baseline of over 2,500 attacks per quarter indicates that ransomware is a consistent, high-volume threat that is not diminishing, despite law enforcement actions against some groups.
- **Economic Damage:** The continued high rate of attacks translates to billions of dollars in economic damage globally, from ransom payments, recovery costs, and business interruption.

--- 

### IOCs — Directly from Articles
This is a trend report and does not contain specific IOCs.

### Cyber Observables — Hunting Hints
To detect activity from prevalent groups like Qilin, defenders can hunt for:

| Type | Value | Description | Context |
|---|---|---|---|
| `file_name` | `README.txt` | Qilin ransomware often uses this generic name for its ransom notes. | File system monitoring |
| `command_line_pattern` | `reg.exe add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender"` | Command used to disable Microsoft Defender via the registry. | EDR, Process creation logs |
| `process_name` | `adfind.exe` | A legitimate Active Directory query tool often abused by ransomware actors for reconnaissance. | EDR, Process creation logs |
| `service_name` | `PsExec` | Service created by the PsExec tool, which is commonly used for lateral movement and ransomware deployment. | Windows System Event Log (ID 7045) |

## Detection & Response
1.  **Behavioral-Based Detection:** Rely on EDR and NDR solutions that use behavioral analysis to detect ransomware activities, rather than just static signatures. This includes detecting credential dumping, lateral movement, and mass file encryption. This aligns with **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Threat Intelligence Integration:** Integrate threat intelligence feeds that provide IOCs and TTPs for active groups like Qilin and The Gentlemen into SIEM and SOAR platforms to automate detection and response.
3.  **Deception Technology:** Deploy decoys and honeypots within the network. An attacker interacting with a decoy can trigger a high-fidelity alert, providing early warning of a breach. This is an application of **[D3-DO: Decoy Object](https://d3fend.mitre.org/technique/d3f:DecoyObject)**.

## Mitigation
1.  **Attack Surface Management:** Continuously scan and remediate the external attack surface. This includes patching vulnerabilities, closing unnecessary ports, and securing remote access services. This is a key part of **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
2.  **Identity Security:** Given the rise in attacks on large enterprises, focus on securing privileged accounts and implementing robust identity and access management (IAM) controls.
3.  **Immutable Backups:** This remains the most critical defense. Ensure backups are offline or immutable and test the restoration process regularly.
4.  **Network Segmentation:** Segment the network to prevent ransomware from spreading from workstations to critical servers and from IT to OT environments. This is a direct application of **[D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.

**Tags:** Ransomware, Threat Intelligence, NordStellar, Qilin, The Gentlemen, DragonForce

## Sources
- [Ransomware Attacks up 20% Year-Over-Year](https://www.sdcexec.com/safety-security/risk-compliance/news/22970671/nordstellar-ransomware-attacks-up-20-yearoveryear) — Supply & Demand Chain Executive (2026-07-17)
- [Ransomware Attacks See 20% Increase in First Half of 2026](https://www.securityweek.com/nightmare-eclipse-drops-legacyhive-windows-zero-day/) — SecurityWeek (2026-07-17)

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-see-20-percent-annual-increase-report-reveals/
