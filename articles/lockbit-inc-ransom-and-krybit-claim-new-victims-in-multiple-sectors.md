# Ransomware Groups Claim New Victims in Healthcare, Tech, and Mfg

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-11-20 | **Reading time:** 4 min

On November 19, 2026, multiple ransomware and extortion groups disclosed a new wave of victims across various sectors. The notorious LockBit group claimed an attack on City International Hospital in Vietnam. Other threat actors, including INC_RANSOM, KRYBIT, and DireWolf, listed victims in the software, manufacturing, and hospitality industries, highlighting the persistent and widespread nature of the ransomware-as-a-service (RaaS) ecosystem.

## Executive Summary
November 19, 2026, saw a flurry of activity on ransomware leak sites, with several threat actor groups adding new organizations to their list of victims. The disclosures span multiple industries and geographic regions, demonstrating the broad and indiscriminate nature of modern cyber extortion. The notorious **[LockBit](https://attack.mitre.org/groups/G0115/)** ransomware gang claimed an attack against a Vietnamese hospital, while other groups like **INC_RANSOM**, **KRYBIT**, **DireWolf**, **SETTRA**, and **HYFLOCK** announced breaches of companies in sectors ranging from software and manufacturing to hospitality and real estate. These incidents underscore the continuous threat posed by the thriving Ransomware-as-a-Service (RaaS) model.

---

## Threat Overview
The following is a summary of the newly claimed attacks:

| Threat Actor | Victim | Industry | Country |
|---|---|---|---|
| **LockBit** | **City International Hospital** | Healthcare | Vietnam |
| **DireWolf** | **CobbleStone Software** | Technology (Software) | USA |
| **KRYBIT** | **Alumil S.A.** | Manufacturing | Greece |
| **INC_RANSOM** | **Centered Co., Ltd.** | Technology (Advertising) | Japan |
| **SETTRA** | Albuquerque Plumbing, Heating & Cooling | Home Services | USA |
| **SETTRA** | Biokinetics and Associates | Engineering | Canada |
| **SETTRA** | Crystal Springs Resort | Hospitality | USA |
| **HYFLOCK** | Africapital Management | Financial Services | N/A |
| **HYFLOCK** | Alberto Álvarez | Real Estate | Colombia |

This diverse list of victims highlights that no industry is immune. The attacks range from critical infrastructure like healthcare to enterprise software providers and local service companies.

## Technical Analysis
While specific technical details for each breach were not provided in the source reports, these incidents are characteristic of the RaaS model. The primary goal of these groups is financial extortion, achieved through a combination of data encryption and data theft (double extortion).

The core MITRE ATT&CK techniques employed in these attacks are:
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): All these groups use a ransomware payload to encrypt files on the victim's network, causing operational disruption.
- [`T1048 - Exfiltration Over Alternative Medium`](https://attack.mitre.org/techniques/T1048/): Before encryption, the actors steal sensitive data and upload it to their own servers. They then threaten to leak this data publicly if the ransom is not paid.
- [`T1657 - Financial Extortion`](https://attack.mitre.org/techniques/T1657/): This is the overarching tactic, leveraging both encryption and the threat of data leakage to pressure victims into payment.

## Impact Assessment
The impact of these attacks is significant and multifaceted. For **City International Hospital**, a ransomware attack can disrupt patient care, compromise sensitive health information, and endanger lives. For a software company like **CobbleStone Software**, a breach could expose source code or customer data, leading to supply chain concerns. For manufacturing firms like **Alumil S.A.**, the impact is primarily production downtime and financial loss. The wide range of victims demonstrates the pervasive risk to businesses of all sizes and sectors globally.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source articles for these individual breaches.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for general indicators of ransomware precursor activity:
- **Unusual Logins**: Monitor for logins to critical systems from unfamiliar sources or at odd hours.
- **Suspicious Tools**: Look for the presence or execution of legitimate tools often abused by attackers, such as `PsExec`, `AdFind`, or credential dumpers like `Mimikatz`.
- **Large Data Transfers**: Monitor for unusually large data uploads from internal servers to external cloud storage providers or unknown IP addresses, which could be a sign of data exfiltration.

## Detection & Response
- **EDR/XDR**: Deploy endpoint and extended detection and response tools to identify ransomware behaviors, such as mass file encryption or attempts to delete shadow copies.
- **Network Monitoring**: Implement network traffic analysis to detect C2 communications and data exfiltration. D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is a key defensive technique.
- **IR Plan**: Maintain and test an incident response plan that specifically addresses ransomware attacks, including steps for isolation, communication, and recovery.

## Mitigation
- **Backups**: Maintain offline, immutable, and regularly tested backups. This is the most critical defense against data encryption.
- **Patching**: Aggressively patch vulnerabilities, especially on internet-facing systems, to prevent initial access.
- **MFA**: Enforce **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** across all remote access points and for all privileged accounts to prevent credential abuse.
- **Network Segmentation**: Segment the network to prevent ransomware from spreading from workstations to critical servers and backup systems.

**Tags:** Ransomware, Data Breach, LockBit, INC_RANSOM, KRYBIT, Threat Actor

## Sources
- [City International Hospital](https://socradar.io/data-breach/city-international-hospital/) — SOCRadar
- [BreachSense](https://www.breachsense.com/breaches/) — BreachSense

---
Source: https://cyber.netsecops.io/articles/lockbit-inc-ransom-and-krybit-claim-new-victims-in-multiple-sectors/
