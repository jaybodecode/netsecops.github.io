# Conduent Proposes $80M Settlement for Breach of 62M Records

**Severity:** high | **Category:** Data Breach,Regulatory,Threat Intelligence | **Updated:** 2026-10-25 | **Reading time:** 5 min

Business services provider Conduent has proposed an $80 million settlement for a class-action lawsuit following a major data breach. The incident, which occurred between October 2024 and January 2025, exposed the personal and medical data of approximately 62 million individuals. The breach was notable for the prolonged attacker dwell time and the nine-month delay in notifying victims. The settlement fund aims to cover cash payments for documented losses, credit monitoring services, and legal fees for affected customers of Conduent's clients, which include major health insurers.

## Executive Summary
**[Conduent](https://www.conduent.com/)** Business Services has agreed to a proposed $80 million, non-reversionary settlement to resolve class-action lawsuits related to a massive data breach. The incident, which took place between October 2024 and January 2025, resulted in the compromise of sensitive personal and medical information for an estimated 62 million people. The breach exposed data including names, Social Security numbers, and health insurance details. The lawsuits against the company alleged negligence in its security practices and an unreasonable delay in notifying victims, which began nine months after the breach was discovered. The settlement, which awaits court approval, is intended to compensate victims for losses and provide credit monitoring services.

---

## Threat Overview
- **What Happened**: An unauthorized third party gained and maintained access to Conduent's IT network for approximately three months, from October 2024 to January 2025. During this period, the attackers exfiltrated large volumes of sensitive data belonging to the customers of Conduent's clients.
- **Who Was Affected**: The breach impacted an estimated 62 million individuals. These were customers of major health insurance providers that use Conduent for business process services, including **AIG**, **The Cigna Group**, **Elevance Health**, and **Humana**.
- **Attack Vector**: The specific initial access vector was not detailed in the source articles. However, the prolonged dwell time suggests a failure in detection and response capabilities, allowing the attacker to remain hidden while exfiltrating data.

## Technical Analysis
The available information does not provide deep technical details on the attacker's TTPs. However, based on the incident's characteristics, we can assess likely techniques.
- **Initial Access**: Could have included exploiting a public-facing application ([`T1190`](https://attack.mitre.org/techniques/T1190/)), a phishing campaign ([`T1566`](https://attack.mitre.org/techniques/T1566/)), or the use of valid accounts ([`T1078`](https://attack.mitre.org/techniques/T1078/)).
- **Persistence**: With a dwell time of several months, the actor likely established persistence using techniques such as creating new accounts ([`T1136`](https://attack.mitre.org/techniques/T1136/)) or installing scheduled tasks/jobs ([`T1053`](https://attack.mitre.org/techniques/T1053/)).
- **Defense Evasion**: The long period of undetected access points to successful defense evasion ([`T1562`](https://attack.mitre.org/techniques/T1562/)), possibly by disabling security tools or clearing logs.
- **Exfiltration**: The primary goal was data theft. The actor likely compressed the data ([`T1560.001`](https://attack.mitre.org/techniques/T1560/001/)) before exfiltrating it over an encrypted channel ([`T1048`](https://attack.mitre.org/techniques/T1048/)) to avoid detection.

## Impact Assessment
The impact of this breach is substantial. The exposure of 62 million individuals' Social Security numbers and medical information creates a significant risk of identity theft, financial fraud, and targeted phishing attacks for years to come. For Conduent, the financial impact includes the $80 million settlement, plus legal fees, and significant reputational damage. The nine-month delay in notification exacerbated the harm to victims, leaving them unaware and unable to take protective measures. This delay also carries regulatory risk, as laws like GDPR and CCPA have strict breach notification timelines. The incident underscores the systemic risk posed by third-party service providers that handle large volumes of sensitive data for multiple clients.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Detection & Response
This incident highlights critical gaps in detection and response.
- **Detection**: Organizations must deploy EDR and SIEM solutions to monitor for anomalous behavior. A three-month dwell time is unacceptable. Key detection strategies include monitoring for large data transfers to external destinations, unusual account login patterns, and the disabling of security services. This requires **[D3FEND User Data Transfer Analysis](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**.
- **Response**: The nine-month notification delay indicates a slow and likely under-resourced incident response and data discovery process. Organizations must have a well-practiced incident response plan that includes pre-vetted third-party forensics and legal counsel. Data classification and discovery tools are essential to quickly determine the scope of a breach and meet notification deadlines.

## Mitigation
1.  **Reduce Dwell Time**: Implement 24/7 security monitoring with a focus on detecting lateral movement and data exfiltration. The goal should be to detect and respond to intrusions in hours or days, not months.
2.  **Network Segmentation**: Implement **[D3FEND Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** to segregate networks containing sensitive client data from the general corporate network. This can limit the blast radius of a compromise.
3.  **Data Governance**: Implement strong data governance and classification policies. Knowing where your most sensitive data resides is critical for both protection and rapid incident response.
4.  **Incident Response Planning**: Regularly test and update the corporate incident response plan with tabletop exercises that simulate a large-scale data breach.

**Tags:** Data Breach, Settlement, Class Action, PII, PHI, Healthcare

## Sources
- [Conduent's massive data breach leads to proposed $80 million class action settlement](https://topclassactions.com/lawsuit-settlements/lawsuit-news/conduents-massive-data-breach-leads-to-proposed-80-million-class-action-settlement/) — Top Class Actions (2026-10-26)
- [Conduent Data Breach Settlement: $80 Million Proposed, No Website or Deadline Yet](https://settlementinsight.com/news/conduent-data-breach-settlement-80-million-signed-october-16-judge-asks-for-more-october-22-up-to-3500-cash-only-subclass-b-no-claim-form) — Settlement Insight (2026-10-27)
- [The Biggest Data Breaches of 2026, So Far](https://tech.co/news/data-breaches-updated-list) — Tech.co (2026-10-23)

---
Source: https://cyber.netsecops.io/articles/conduent-proposes-80-million-settlement-for-data-breach-affecting-62-million/
