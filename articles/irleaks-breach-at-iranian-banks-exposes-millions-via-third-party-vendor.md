# "IRLeaks" Supply Chain Attack Hits Iranian Banks, Exposing Millions of Customer Records

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cyberattack | **Updated:** 2025-12-18 | **Reading time:** 4 min

A major supply chain attack dubbed "IRLeaks" has resulted in a significant data breach affecting several prominent Iranian banks and millions of their customers. Attackers first compromised a third-party IT vendor in October 2025, using it as a pivot point to infiltrate the banks' networks. Over the following month, they exfiltrated vast amounts of financial data and personally identifiable information (PII), including national IDs and bank account numbers, before the breach was discovered in late November. The incident highlights the critical risks associated with third-party vendor security and inadequate patch management.

## Executive Summary
A significant supply chain cyberattack, named **IRLeaks**, has caused a massive data breach at several major Iranian banks, exposing the sensitive data of millions of customers. The attack originated with the compromise of a third-party IT vendor in October 2025. Using this foothold, the threat actors moved laterally into the interconnected banking networks. For weeks, they exfiltrated large volumes of data before the breach was discovered and disclosed in late November 2025. The stolen data includes highly sensitive customer PII and financial records. This incident serves as a stark reminder of the systemic risk posed by third-party vendors and the critical need for robust supply chain security management.

---

## Threat Overview
The **IRLeaks** attack was a classic supply chain compromise, where the attackers targeted a weaker link in the ecosystem to gain access to their ultimate, higher-value targets.

- **Initial Access ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/))**: The attackers first breached a third-party IT vendor that provided services to the Iranian banking sector. This was reportedly achieved by exploiting unpatched vulnerabilities and using stolen credentials.
- **Lateral Movement ([`T1021 - Remote Services`](https://attack.mitre.org/techniques/T1021/))**: From the compromised vendor's network, the attackers pivoted into the internal networks of the connected banks, likely using the vendor's legitimate access privileges.
- **Privilege Escalation**: Once inside the bank networks, the attackers escalated their privileges to gain widespread access to sensitive systems and databases.
- **Data Exfiltration ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/))**: Throughout November 2025, the attackers exfiltrated large quantities of data using encrypted outbound connections to avoid detection.

### Incident Timeline
- **October 2025**: Initial compromise of the third-party IT vendor.
- **November 2025**: Attackers move laterally into bank networks and begin data exfiltration.
- **Late November 2025**: The breach is discovered and publicly disclosed by the affected banks.
- **December 2025**: Formal investigation and mitigation efforts commence.

## Technical Analysis
The success of the **IRLeaks** attack hinged on weaknesses in the third-party vendor's security posture, specifically inadequate patch management and credential security. By targeting the vendor, the attackers bypassed the banks' potentially stronger perimeter defenses. The use of encrypted channels for data exfiltration is a common technique to blend malicious traffic with legitimate SSL/TLS traffic, making it harder for network security tools to detect.

The compromised data is extensive and highly sensitive:
- **Personally Identifiable Information (PII)**: National IDs, phone numbers, email addresses.
- **Financial Data**: Bank account numbers, transaction records.

It is currently unconfirmed if this data was encrypted at rest within the banks' databases before being stolen.

## Impact Assessment
This is one of the most significant financial sector breaches in Iran's history, with severe consequences:
- **Massive Customer Risk**: Millions of individuals are now at high risk of identity theft, phishing attacks, and financial fraud.
- **Economic Disruption**: The breach erodes public trust in the banking system and could lead to significant costs for the banks in terms of fraud reimbursement, regulatory fines, and security upgrades.
- **National Security Implications**: The theft of a large database of citizen and financial data could be leveraged for intelligence gathering or to create social and economic instability.

## IOCs
The source articles mention that specific IP addresses and phishing domains were identified as indicators of compromise, but the values were not provided in the reports.

## Detection & Response
- **Third-Party Monitoring**: Continuously monitor all network connections between your organization and third-party vendors. Baseline normal traffic patterns and alert on any anomalies, such as connections to unusual ports, unexpected data volumes, or traffic to suspicious external IP addresses.
- **Egress Filtering**: Implement strict egress filtering rules to block outbound connections to unapproved destinations. This can prevent or disrupt data exfiltration attempts. This is a key part of [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
- **Log Analysis**: Correlate network logs with authentication logs. An alert should be triggered if a vendor's service account is used to access systems or data outside of its normal operational parameters.

## Mitigation
- **Vendor Risk Management ([`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/))**: Implement a comprehensive third-party risk management program. This must include rigorous security assessments before onboarding a vendor and continuous monitoring throughout the relationship. Mandate that vendors adhere to your organization's security standards.
- **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**: Do not allow vendors to have flat access to your network. Segment vendor access into isolated enclaves with strict access controls, allowing them to reach only the specific systems and services they need to manage. This prevents lateral movement in the event of a vendor compromise.
- **Principle of Least Privilege**: Apply the principle of least privilege to all third-party accounts and connections. Vendor accounts should have the minimum level of access required to perform their duties, and for the shortest time necessary.

**Tags:** Data Breach, Supply Chain Attack, Third-Party Risk, Financial Services, Iran, IRLeaks

## Sources
- [IRLeaks Data Breach: What Happened, Impact, and Lessons](https://www.huntress.com/blog/irleaks-data-breach) — Huntress (2025-12-17)
- [IRLeaks Attack on Iranian Banks Data Breach Explained](https://thecyberexpress.com/irleaks-iranian-banks-data-breach/) — The Cyber Express (2025-12-17)

---
Source: https://cyber.netsecops.io/articles/irleaks-breach-at-iranian-banks-exposes-millions-via-third-party-vendor/
