# Johnson Investment Counsel Discloses Data Breach via Third-Party MSP

**Severity:** high | **Category:** Data Breach,Ransomware,Supply Chain Attack | **Updated:** 2026-10-14 | **Reading time:** 3 min

Cincinnati-based wealth management firm Johnson Investment Counsel has reported a data breach that occurred via a third-party managed service provider (MSP). The incident exposed client PII, including names, Social Security numbers, and health information. The 'Storm' ransomware group has claimed responsibility, alleging the theft of 39.6 GB of data.

## Executive Summary
**[Johnson Investment Counsel](https://www.johnsoninv.com/)**, a wealth management firm, has disclosed a data breach that resulted from an unauthorized third party accessing its network through a remote-management platform operated by one of its managed service providers (MSPs). The breach, which occurred in early September 2026, led to the exfiltration of sensitive client information, including Social Security numbers. A ransomware group known as **Storm** has claimed responsibility on the dark web, stating it stole nearly 40 GB of data. This incident highlights the significant risks associated with the software supply chain and third-party service providers.

---

## Threat Overview
The attack took place between the evening of September 8 and the morning of September 9, 2026. The threat actor gained access to Johnson Investment Counsel's systems by compromising a remote-management tool used by a third-party MSP. This gave the attacker a direct pathway into the firm's network. On September 18, the **Storm** ransomware group posted a claim on a dark web forum, asserting they had exfiltrated 39.6 GB of data and threatened to leak it. The compromised data includes highly sensitive client information like names, Social Security numbers, and health insurance details.

## Technical Analysis
The primary attack vector was a supply chain compromise, specifically targeting a trusted third-party relationship ([T1199 - Trusted Relationship](https://attack.mitre.org/techniques/T1199/)). By compromising the MSP's remote management software, the attackers effectively inherited the trusted access that the MSP had to the client's network. This allowed them to bypass perimeter defenses. Once inside, the attackers engaged in data exfiltration ([T1567 - Exfiltration Over Web Service](https://attack.mitre.org/techniques/T1567/)), copying files containing sensitive client PII before their presence was detected.

## Impact Assessment
For the affected clients of Johnson Investment Counsel, the exposure of their Social Security numbers and other personal data creates a high risk of identity theft, financial fraud, and targeted phishing attacks. The firm itself faces significant reputational damage, potential regulatory fines, and the cost of incident response and providing credit monitoring services to victims. This breach underscores the critical importance of third-party risk management, as an organization's security posture is only as strong as its weakest link in the supply chain.

## IOCs — Directly from Articles
No specific technical IOCs such as IP addresses, domains, or file hashes were provided in the source articles.

## Detection & Response
Johnson Investment Counsel detected the breach on September 9, 2026, the morning after the intrusion began. Their response includes notifying affected individuals and offering 24 months of free credit monitoring services through **Epiq Privacy Solutions ID**. For other organizations, detection of such an attack requires robust monitoring of all third-party connections into the network. This includes applying D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to look for unusual data flows or access patterns originating from MSP accounts.

## Mitigation
1.  **Third-Party Risk Management**: Conduct thorough security assessments of all third-party vendors and MSPs before granting them network access. Ensure contracts include clear security requirements and right-to-audit clauses.
2.  **Least Privilege Access**: Grant third parties the minimum level of access necessary to perform their duties. Access should be restricted to specific systems and time windows.
3.  **Network Segmentation**: Segment the network to isolate systems managed by third parties from critical internal assets. This can limit the blast radius if a third-party provider is compromised.
4.  **Egress Filtering**: Implement strict egress filtering rules to block or alert on large or unusual outbound data transfers, which could indicate data exfiltration in progress. This is a core part of D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
5.  **Monitor Third-Party Accounts**: Closely monitor all activity from third-party accounts for any behavior that deviates from established patterns.

**Tags:** Data Breach, MSP, Supply Chain Attack, Ransomware, Storm, Finance

## Sources
- [Johnson Investment Counsel Data Breach Exposes Client SSNs](https://www.claimdepot.com/data-breach/johnson-investment-counsel-2026) — ClaimDepot (2026-10-13)

---
Source: https://cyber.netsecops.io/articles/johnson-investment-counsel-discloses-data-breach-via-msp/
