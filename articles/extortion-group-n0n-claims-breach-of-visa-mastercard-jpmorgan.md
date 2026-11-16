# 'n0n' Extortion Group Claims Breach of Visa, Mastercard, JPMorgan

**Severity:** high | **Category:** Threat Actor,Data Breach,Ransomware | **Updated:** 2026-11-16 | **Reading time:** 4 min

The data extortion group 'n0n' has made an unverified claim of stealing a trove of customer and marketing data from financial giants Visa, Mastercard, and JPMorgan Chase. The group, which operates by stealing data and threatening to leak it without deploying ransomware, has not provided proof. The allegedly stolen data includes cardholder profiles and booking information. None of the named companies have confirmed a breach.

## Executive Summary
A data extortion group calling itself **n0n** has claimed to have breached and stolen sensitive data from three major financial institutions: **[Visa](https://usa.visa.com/)**, **[Mastercard](https://www.mastercard.us/en-us.html)**, and **[JPMorgan Chase](https://www.jpmorganchase.com/)**. The claim, reported on November 16, 2026, is currently **unverified**, and none of the companies have confirmed an incident. The **n0n** group practices a form of extortion where data is exfiltrated and held for ransom under threat of public release, without the corresponding file encryption typical of ransomware. The alleged data includes customer profiles, contact details, and marketing engagement logs. The cybersecurity community is monitoring the situation, but as of now, the claim lacks independent validation.

---

## Threat Overview
The **n0n** group is a data extortion actor, meaning their primary tactic is [`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/) followed by coercion, rather than [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/). On November 16, 2026, the threat intelligence firm **Hackmanac** reported **n0n**'s claim to have stolen a significant volume of data from Visa, Mastercard, and JPMorgan Chase.

According to the threat actor's unverified claims, the stolen data set includes:
- Cardholder profiles and personal contact details.
- Booking information for travel and high-end restaurants.
- Logs of customer engagement with marketing campaigns, allegedly covering millions of interactions.
- Information on "banking associations" linking customers to their issuing banks.

The group is threatening to leak this data unless a settlement is reached. **Hackmanac**'s platform assigned the incident a severity score of 6.12 (out of 10) and has marked it as "awaiting verification."

---

## Technical Analysis
Without confirmation or technical details, analysis is speculative. However, an attack of this scale against mature financial institutions would likely involve sophisticated TTPs. Potential vectors include:
- **Supply Chain Attack ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/))**: Compromising a third-party vendor or software provider that serves all three financial giants is a plausible vector for a widespread breach.
- **Exploitation of a Zero-Day Vulnerability**: A previously unknown vulnerability in a shared software platform or appliance could grant initial access.
- **Sophisticated Phishing Campaign**: A highly targeted spearphishing campaign aimed at privileged employees could have yielded the necessary credentials for initial access and lateral movement ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).

Once inside, the actors would have focused on identifying and exfiltrating large databases containing customer and marketing information, likely using encrypted channels to avoid detection ([`T1573.002 - DOH`](https://attack.mitre.org/techniques/T1573/002/)).

> **Important**: These are analyst-assessed possibilities. At present, there is no evidence to support any specific attack vector, and the entire claim remains unverified.

---

## Impact Assessment
If the breach is confirmed, the impact would be catastrophic:
- **Financial and Identity Theft**: The release of cardholder profiles and personal information would fuel a massive wave of fraud and identity theft targeting millions of consumers globally.
- **Loss of Consumer Trust**: A simultaneous breach of three of the world's largest financial entities would severely undermine trust in the digital payment ecosystem.
- **Regulatory and Legal Consequences**: The companies would face intense scrutiny from regulators worldwide (e.g., under GDPR, CCPA), leading to potentially billions in fines and numerous class-action lawsuits.
- **Market Disruption**: The incident could cause significant volatility in the stock market and disrupt payment processing services.

Even as an unverified claim, it can cause consumer anxiety and force the targeted companies to expend significant resources on investigation and communication.

---

## IOCs — Directly from Articles
No Indicators of Compromise (IOCs) are available as the claim is unverified and no technical details have been released.

---

## Detection & Response
Financial institutions should maintain a constant state of vigilance.
- **Data Loss Prevention (DLP)**: Robust DLP solutions should be in place to monitor and block unauthorized exfiltration of sensitive data matching predefined patterns (e.g., credit card numbers, PII).
- **User and Entity Behavior Analytics (UEBA)**: Monitor for anomalous access to large databases, especially by service accounts or from unusual locations. Use D3FEND's [`Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
- **Threat Intelligence Monitoring**: Actively monitor dark web forums and threat actor leak sites for mentions of the organization's name or data.

---

## Mitigation
Defenses against such large-scale data theft rely on a multi-layered security posture.
1.  **Encrypt Sensitive Information**: All sensitive customer data must be encrypted both at rest and in transit ([`M1041 - Encrypt Sensitive Information`](https://attack.mitre.org/mitigations/M1041/)).
2.  **Limit Access to Resources**: Implement the principle of least privilege. Access to sensitive databases should be strictly controlled and logged.
3.  **Third-Party Risk Management**: Rigorously vet and monitor the security posture of all third-party vendors and partners who have access to sensitive data or networks.
4.  **Network Segmentation**: Isolate critical data stores in highly secured network segments with strict ingress and egress filtering.

**Tags:** data extortion, unverified claim, financial services, n0n, Visa, Mastercard, JPMorgan Chase

## Sources
- [Extortion group n0n says it stole customer and marketing data from Visa, Mastercard and JPMorgan Chase. The claim, reported November 16, 2026, is unverified.](https://pasqualepillitteri.it/en/news/34013/n0n-group-claims-attack-on-visa-mastercard-and-jpmorgan) — Pascuale Pillitteri IT (2026-11-16)

---
Source: https://cyber.netsecops.io/articles/extortion-group-n0n-claims-breach-of-visa-mastercard-jpmorgan/
