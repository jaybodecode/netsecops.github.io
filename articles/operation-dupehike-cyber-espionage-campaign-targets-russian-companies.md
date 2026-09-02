# "Operation DupeHike" Espionage Campaign Targets Russian Corporate HR Depts

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2025-12-11 | **Reading time:** 4 min

A highly targeted cyber-espionage campaign, dubbed "Operation DupeHike," has been identified targeting employees in Russian corporations. Attributed to the threat actor cluster UNG0902, the campaign uses convincing social engineering lures, such as decoy documents about employee bonuses, to infiltrate networks. The primary targets are staff in HR, payroll, and administrative departments, with the goal of achieving persistent surveillance and exfiltrating sensitive corporate data.

## Executive Summary
Seqrite's APT Research Team has uncovered a sophisticated cyber-espionage campaign named **Operation DupeHike**, which is actively targeting corporate entities in Russia. The campaign, attributed to a threat actor cluster tracked as **UNG0902**, employs highly realistic social engineering tactics to gain initial access. The attackers specifically target employees in Human Resources (HR), payroll, and administrative roles using decoy documents related to internal financial policies and employee bonuses. The ultimate goal is to establish a persistent foothold for long-term surveillance and data exfiltration, suggesting a strategic interest in Russian corporate affairs.

---

## Threat Overview
The campaign was first identified on November 21, 2025, after a malicious ZIP archive was uploaded to VirusTotal. The initial access vector is a spear-phishing email containing a malicious archive disguised as an official HR notification, for example, about a 15% annual bonus. This high degree of customization and mimicry of internal corporate communications makes the phishing attempts particularly effective.

The focused targeting on Russian organizations and specific corporate departments (HR, payroll) indicates that **UNG0902** has clear strategic objectives, which could be geopolitical or financial in nature. The actor demonstrates a high level of operational maturity and resourcefulness.

## Technical Analysis
**Operation DupeHike** showcases several advanced TTPs that point to a mature threat actor:

- **Initial Access:** The campaign uses **Spearphishing Attachment ([`T1566.001`](https://attack.mitre.org/techniques/T1566/001/))** as its primary entry point, delivering a malicious ZIP archive.
- **Social Engineering:** The attackers show significant reconnaissance and skill in crafting believable decoy documents ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)) that align with corporate events and communication styles.
- **Infrastructure Blending:** The C2 infrastructure is hosted on Russian Autonomous System Numbers (ASNs), specifically `VDSINA-AS` and `TIMEWEB-AS`. This tactic helps the malicious traffic blend in with legitimate local traffic, making it harder to detect through geographical filtering.
- **Adaptive C2:** The attackers have been observed moving their C2 communications between `port 80` (HTTP) and `port 443` (TLS/SSL) ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)). This adaptation, likely in response to detection, shows an ability to quickly modify infrastructure to maintain operational persistence.

The combination of these techniques suggests that **UNG0902** is a well-resourced and possibly state-sponsored group.

## Impact Assessment
A successful compromise by **Operation DupeHike** could lead to significant data loss for the targeted Russian corporations. By targeting HR and payroll departments, the attackers gain access to a treasure trove of sensitive information, including:
- Employee Personally Identifiable Information (PII)
- Salary and financial data
- Corporate strategic plans and internal policies
- Network credentials and access to other systems

This data could be used for financial fraud, further espionage activities, or to exert geopolitical leverage.

## IOCs
No specific IP addresses or file hashes were provided in the source reports, but the ASNs used for C2 infrastructure were mentioned.

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Outbound connections to `VDSINA-AS` or `TIMEWEB-AS` | Traffic to these Russian ASNs from sensitive corporate systems should be scrutinized, especially if it's from non-standard applications. |
| File Name | `*bonus*.zip`, `*policy*.zip` | Be wary of ZIP archives with HR-related themes received via email. |
| Network Behavior | Port hopping between 80 and 443 | A host communicating with the same IP address first on port 80 and later on port 443 (or vice versa) could be a sign of adaptive C2. |

## Detection & Response
1.  **Email Security:** Enhance email filtering to scan inside archives and identify suspicious files or links. Flag emails from external sources that impersonate internal departments like HR.
2.  **Egress Traffic Monitoring:** Implement network monitoring to detect and alert on traffic to suspicious ASNs or IPs. Baseline normal traffic patterns to spot anomalies. This aligns with **[D3FEND Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
3.  **User Training:** Train employees, especially those in high-value departments like HR and finance, to be vigilant about phishing attempts and to verify unusual requests through a separate, trusted communication channel.

## Mitigation
1.  **Principle of Least Privilege:** Ensure that employees only have access to the data and systems absolutely necessary for their job functions. This can limit the blast radius if an account is compromised.
2.  **Endpoint Protection:** Deploy an advanced EDR solution that can detect malicious scripts and processes initiated from documents or archives.
3.  **Network Segmentation:** Segment the network to prevent attackers from easily moving from a compromised workstation in the HR department to critical servers in a data center. This is a core tenet of **[D3FEND Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.

**Tags:** Operation DupeHike, UNG0902, Cyber Espionage, Russia, APT, Phishing

## Sources
- [Operation DupeHike targeting Russian employees: A rising wave of geopolitical cyber-espionage in 2026](https://etinsights.et-edge.com/operation-dupehike-targeting-russian-employees-a-rising-wave-of-geopolitical-cyber-espionage-in-2026/) — ET Edge (2025-12-11)
- [Operation DupeHike: A Deep Dive into the Cyber-Espionage Campaign Targeting Russian Entities](https://www.seqrite.com/blog/operation-dupehike-a-new-cyber-espionage-campaign-targeting-russian-organizations/) — Seqrite (2025-12-11)

---
Source: https://cyber.netsecops.io/articles/operation-dupehike-cyber-espionage-campaign-targets-russian-companies/
