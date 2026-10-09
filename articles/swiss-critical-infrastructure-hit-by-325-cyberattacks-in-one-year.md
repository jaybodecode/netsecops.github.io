# Swiss Critical Infrastructure Hit by 325 Cyberattacks in One Year

**Severity:** medium | **Category:** Policy and Compliance,Cyberattack,Regulatory | **Updated:** 2026-03-30 | **Reading time:** 4 min

The Swiss Federal Office for Cybersecurity has revealed that it received 325 mandatory reports of cyberattacks against the nation's critical infrastructure in the past year, averaging nearly one incident per day. The report, which covers the first year of a new mandatory reporting law, shows the administrative sector was the most frequent target, followed by IT, telecommunications, and financial institutions. Hacking, DDoS attacks, and malware were among the most common attack vectors reported.

## Executive Summary
Switzerland's critical infrastructure is under persistent cyber threat, with the **[Swiss Federal Office for Cybersecurity](https://www.ncs.admin.ch/ncs/en/home.html)** (NCSC) receiving 325 mandatory reports of cyberattacks in the last twelve months. This averages to nearly one attack per day. The data comes from the first annual review since a new law mandated that operators of critical infrastructure report cyberattacks within 24 hours. The government's administrative sector was the most heavily targeted, accounting for approximately a quarter of all incidents. Other frequently targeted sectors include IT and telecommunications, banking, and insurance. The most common types of attacks reported were hacking, Distributed Denial of Service (DDoS), malware infections, and data leaks, painting a picture of a diverse and constant threat landscape facing the nation.

---

## Threat Overview
The report provides a statistical snapshot of the cyber threats facing Swiss critical infrastructure.

- **Total Mandatory Reports**: 325 in one year.
- **Average Frequency**: Nearly one attack per day.
- **Most Targeted Sector**: Government / Administrative Sector (~25% of incidents).
- **Other Key Sectors**: IT & Telecommunications, Banking, Insurance.
- **Common Attack Types**:
    - Hacking (~20%)
    - DDoS Attacks (16%)
    - Malware Infections
    - Data Leaks & Theft of Access Data
    - Ransomware

In addition to the mandatory reports, the NCSC also received nearly 65,000 voluntary reports of cyber incidents in 2025, primarily from private individuals. This indicates a high level of public awareness but also highlights the sheer volume of cyber threats at all levels of society.

---

## Technical Analysis
The report categorizes attacks rather than detailing specific technical incidents. However, the prevalence of certain attack types allows for an analysis based on common TTPs associated with them.

- **Hacking**: This broad category likely encompasses a range of techniques, from exploiting public-facing applications ([`T1190`](https://attack.mitre.org/techniques/T1190/)) to using valid accounts ([`T1078`](https://attack.mitre.org/techniques/T1078/)). The goal is typically to gain unauthorized access for espionage or further attacks.
- **DDoS Attacks**: These attacks aim to disrupt services by overwhelming them with traffic, a technique known as [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/). This is a common tactic used by hacktivists and state-sponsored actors to make a political statement or cause economic damage.
- **Malware Infections**: This involves the deployment of malicious software, including spyware, trojans, and ransomware. The initial access vectors are typically phishing ([`T1566`](https://attack.mitre.org/techniques/T1566/)) or exploitation of vulnerabilities.
- **Ransomware**: A specific type of malware attack that involves encrypting data and demanding a ransom for its release, corresponding to [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

---

## Impact Assessment
The persistent targeting of Swiss critical infrastructure has significant national security and economic implications.

- **Disruption of Essential Services**: Successful attacks on sectors like telecommunications, finance, and government administration can disrupt essential services that citizens and businesses rely on.
- **Economic Damage**: DDoS attacks can cause direct financial loss for businesses by taking their services offline. Ransomware attacks can lead to costly downtime and ransom payments.
- **Erosion of Trust**: Continuous attacks on government and financial institutions can erode public trust in their ability to operate securely and protect data.
- **Espionage**: Attacks on the administrative sector are likely aimed at espionage, seeking to steal sensitive government data for political or economic advantage.

---

## IOCs
This is a statistical report; no specific IOCs were provided.

---

## Detection & Response

**Detection:**
For organizations operating critical infrastructure, a multi-layered detection strategy is essential.
1.  **Network Monitoring**: Continuous network monitoring for DDoS traffic patterns, anomalous data flows, and signs of C2 communication.
2.  **Endpoint Detection and Response (EDR)**: EDR solutions are critical for detecting malware execution and suspicious processes on endpoints.
3.  **Log Aggregation and SIEM**: Centralized logging and analysis with a SIEM can help correlate events from different sources to identify a coordinated attack.

**Response:**
The mandatory reporting law is a key component of Switzerland's national cybersecurity response. It allows the NCSC to gain a clearer picture of the threat landscape, identify trends, and share relevant intelligence with other critical infrastructure operators.

---

## Mitigation

The NCSC report underscores the need for robust, foundational security controls across all critical sectors.

**Tactical (Immediate):**
1.  **DDoS Protection**: Implement a DDoS mitigation service for all public-facing websites and services. This is a direct countermeasure to a frequently reported attack type.
2.  **Patch Management**: Maintain a rigorous patch management program to close the vulnerabilities that are often exploited in hacking and malware attacks. This is a core part of [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
3.  **Email Security**: Deploy advanced email security solutions to filter out phishing attempts, a primary vector for malware and credential theft.

**Strategic (Long-Term):**
1.  **Zero Trust Architecture**: Adopt a Zero Trust security model that assumes no user or device is inherently trustworthy, requiring strict verification for every access request. This includes implementing strong authentication ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)) and network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
2.  **Resilience and Recovery**: Develop and regularly test incident response and disaster recovery plans. For ransomware, this means having secure, offline backups that can be used to restore systems without paying a ransom.
3.  **Information Sharing**: Actively participate in information sharing and analysis centers (ISACs) to receive and share timely threat intelligence with peers and government partners.

**Tags:** switzerland, critical infrastructure, cybersecurity report, government, ddos, hacking

## Sources
- [Almost one attack a day reported on critical Swiss infrastructures](https://www.swissinfo.ch/eng/business/almost-one-attack-a-day-reported-on-critical-swiss-infrastructures/74518836) — SWI swissinfo.ch
- [NCSC Semi-Annual Report: Second Half of 2025](https://www.ncs.admin.ch/ncs/en/home/aktuell/im-fokus/lagedarstellung-2-halbjahr-2025.html) — Swiss Federal Office for Cybersecurity

---
Source: https://cyber.netsecops.io/articles/swiss-critical-infrastructure-hit-by-325-cyberattacks-in-one-year/
