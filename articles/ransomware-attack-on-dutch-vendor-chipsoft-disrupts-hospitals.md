# Ransomware Attack on Dutch Health-Tech Giant ChipSoft Disrupts 70% of Hospitals

**Severity:** high | **Category:** Ransomware,Data Breach,Supply Chain Attack | **Updated:** 2026-04-09 | **Reading time:** 5 min

A crippling ransomware attack has struck ChipSoft, a dominant provider of electronic health record (EHR) software in the Netherlands, causing widespread disruption across the nation's healthcare system. The attack, confirmed on April 7, 2026, forced ChipSoft to take its platforms offline and prompted at least 11 hospitals to sever connections as a precaution. The incident has created significant logistical challenges and raised concerns that sensitive patient data may have been compromised, highlighting the systemic risk posed by supply chain attacks in the healthcare sector.

## Executive Summary

**[ChipSoft](https://www.chipsoft.nl/)**, a leading Dutch software vendor whose Electronic Health Record (EHR) systems are integral to 70-80% of hospitals in the Netherlands, has fallen victim to a significant ransomware attack. The incident, which came to light on April 7, 2026, forced the company to disable key digital platforms, including its patient portal (`Zorgportaal`) and mobile application (`HiX Mobile`). In response, the Dutch healthcare CERT (Z-CERT) advised institutions to disconnect from ChipSoft's services, leading at least 11 hospitals to take their patient-facing systems offline. While no critical care processes have been halted, the attack has caused major operational disruptions and raised the possibility of a massive patient data breach.

---

## Threat Overview

The attack on ChipSoft is a classic example of a supply chain attack with far-reaching consequences. By targeting a single, central software provider, the unidentified threat actors have impacted a vast portion of the Dutch healthcare sector. The attack forced ChipSoft to take preemptive action by shutting down its public website and disabling connections to its `Zorgportaal`, `HiX Mobile`, and `Zorgplatform` services to contain the breach and prevent lateral movement into hospital networks.

Z-CERT, the Netherlands' computer emergency response team for healthcare, is coordinating the response. They issued a confidential memo urging all healthcare clients of ChipSoft to terminate connections and audit their internal systems for any signs of compromise. The identity of the ransomware group remains unknown, as no group has publicly claimed responsibility for the attack.

## Technical Analysis

While the specific ransomware variant and initial access vector have not been disclosed, the attackers' actions are consistent with modern double-extortion ransomware operations. The TTPs likely involved are:
- **Initial Access:** Could be anything from a phishing email ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) to exploitation of an unpatched vulnerability ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
- **Data Exfiltration:** Before encryption, ransomware groups typically steal large volumes of sensitive data for leverage. This aligns with [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/). ChipSoft's admission that they cannot rule out data access suggests this step occurred.
- **Encryption for Impact:** The core of the attack involves encrypting critical systems and data to disrupt operations, corresponding to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).
- **Inhibit System Recovery:** Attackers likely deleted backups and volume shadow copies to make recovery more difficult, a common tactic under [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).

## Impact Assessment

The immediate impact has been significant operational disruption. At least 11 hospitals, including Sint Jans Gasthuis and Laurentius Hospital, have taken patient portals offline. This forces a reversion to manual, less efficient processes, such as telephone calls and paper records, increasing staff workload and the potential for errors.

- **Patient Care:** While Z-CERT claims no "critical care processes" are stopped, the disruption to scheduling, record access, and communication can lead to delays in non-critical care and significant patient inconvenience. Leiden University Medical Center postponed a major system rollout due to the incident.
- **Data Breach Risk:** The most severe potential impact is the breach of patient data. ChipSoft's inability to rule out data exfiltration means that the personal and medical information of a large percentage of the Dutch population could be in the hands of criminals, leading to identity theft, fraud, and a profound loss of privacy.
- **Financial Cost:** The costs for ChipSoft and the affected hospitals will be substantial, including incident response, system restoration, increased staffing, potential regulatory fines under GDPR, and reputational damage.

## IOCs

No specific Indicators of Compromise (IOCs) have been publicly released at this time.

## Detection & Response

For healthcare organizations connected to ChipSoft or similar critical vendors:
1.  **Monitor Network Connections:** Closely scrutinize traffic between your network and the vendor's. A sudden spike in data transfer or connections to unusual endpoints could be an early warning sign.
2.  **Endpoint Monitoring:** Deploy EDR solutions to monitor for common ransomware behaviors, such as rapid file encryption, deletion of shadow copies (`vssadmin.exe delete shadows`), and disabling of security software.
3.  **Log Vendor Access:** Maintain detailed and immutable logs of all access to your systems by third-party vendors. This is crucial for scoping a breach if the vendor is compromised.
4.  **Isolate and Disconnect:** As demonstrated by the Dutch hospitals, have a plan to quickly and safely disconnect from a compromised vendor to prevent the attack from spreading into your environment.

**D3FEND Reference:** In a supply chain attack scenario, [`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) is critical to block potential data exfiltration, and [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) can detect the ransomware payload executing on endpoints.

## Mitigation

This incident underscores the importance of supply chain risk management.

- **Third-Party Risk Management (TPRM):** Hospitals and other organizations must conduct thorough security assessments of their critical vendors. This includes reviewing their security controls, incident response plans, and data protection policies.
- **Network Segmentation:** Segment the network to isolate systems that connect to third-party vendors. This can limit the blast radius if the vendor's network is breached.
- **Immutable Backups:** Maintain multiple, isolated, and immutable backups of all critical data. A common ransomware tactic is to target backups first, so ensuring they are protected is paramount for recovery. This aligns with [`M1029 - Data Backup`](https://attack.mitre.org/mitigations/M1029/).
- **Incident Response Plan:** Your IR plan must include scenarios for a critical supplier being compromised. This plan should detail the steps to disconnect from the supplier and switch to alternative or manual processes.

**D3FEND Reference:** A robust backup strategy is a form of [`D3-FR - File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration). Network segmentation aligns with [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).

**Tags:** Ransomware, Healthcare, ChipSoft, Netherlands, EHR, Supply Chain Attack, Data Breach

## Sources
- [Healthcare IT solutions provider ChipSoft hit by ransomware attack](https://www.bleepingcomputer.com/news/security/healthcare-it-solutions-provider-chipsoft-hit-by-ransomware-attack/) — BleepingComputer (2026-04-09)
- [Dutch hospitals face disruptions after ransomware attack on software provider ChipSoft](https://therecord.media/chipsoft-ransomware-attack-dutch-hospitals-disruptions) — The Record (2026-04-09)
- [Dutch healthcare software vendor ChipSoft hit by ransomware attack](https://www.scmagazine.com/brief/dutch-healthcare-software-vendor-chipsoft-hit-by-ransomware-attack) — SC Magazine (2026-04-09)
- [Cybersecurity News: ChipSoft popped, APT28 updates, CIA cyber espionage elevation](https://www.cshub.com/threats/news/cybersecurity-news-chipsoft-popped-apt28-updates-cia-cyber-espionage-elevation) — CSHub (2026-04-09)
- [Dutch healthcare software vendor goes dark after ransomware attack](https://www.theregister.com/2026/04/08/chipsoft_ransomware_attack/) — The Register (2026-04-08)
- [A ransomware attack on Dutch patient software has forced hospitals to disconnect their systems](https://cybernews.com/security/chipsoft-ransomware-attack-hospitals-disconnect/) — Cybernews (2026-04-09)

---
Source: https://cyber.netsecops.io/articles/ransomware-attack-on-dutch-vendor-chipsoft-disrupts-hospitals/
