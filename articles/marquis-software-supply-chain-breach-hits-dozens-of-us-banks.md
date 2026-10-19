# Supply Chain Breach at Vendor Marquis Exposes Data From Dozens of US Banks

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Ransomware | **Updated:** 2025-12-08 | **Reading time:** 6 min

A ransomware attack on Marquis Software Solutions, a marketing and data analytics vendor for the financial industry, has resulted in a significant supply chain data breach affecting dozens of U.S. banks and credit unions. Marquis began notifying its clients on November 26, 2025, about the incident, which was first detected in August. The breach exposed highly sensitive customer information, including names, Social Security numbers, taxpayer IDs, and financial account details, that the financial institutions had entrusted to the vendor. While the banks' internal systems were not compromised, the incident highlights the profound risks associated with third-party vendors. At least 42,000 individuals in Maine alone have been affected, and Marquis is offering credit monitoring services to impacted customers.

## Executive Summary
A significant supply chain data breach has impacted the U.S. financial sector following a ransomware attack on **Marquis Software Solutions**, a Texas-based marketing vendor. On November 26, 2025, Marquis began informing its clients—dozens of U.S. banks and credit unions—that a network intrusion first detected on August 14, 2025, resulted in the compromise of sensitive customer data. The exposed information includes names, Social Security numbers (SSNs), financial account information, and other PII. This incident is a classic supply chain attack where the vendor, not the financial institutions themselves, was the point of failure. The breach affects a large number of individuals, with one filing indicating over 42,000 victims in Maine alone. Marquis is working with law enforcement and providing identity theft protection services to those affected.

## Threat Overview
The attack targeted **Marquis Software Solutions**, which provides data analytics and marketing services to financial institutions. By compromising this single vendor, the attackers gained access to a treasure trove of aggregated customer data from many different banks. The incident was identified as a ransomware attack, which implies a double-extortion scenario: attackers likely exfiltrated the data before encrypting Marquis' systems. The long delay between the detection in August and the public notification in November is concerning and may have given attackers ample time to misuse the stolen data. The compromised data is of the highest sensitivity, making it extremely valuable on the dark web for identity theft, financial fraud, and targeted phishing campaigns.

## Technical Analysis
The initial vector for the ransomware attack on Marquis is unknown but likely involved common methods such as a phishing email, exploitation of an unpatched vulnerability, or compromised remote access credentials. The attack chain would have followed a standard pattern:
1.  **Initial Access**: Gaining a foothold in the Marquis network.
2.  **Discovery & Lateral Movement**: Mapping the network to locate the servers and databases storing client data ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)).
3.  **Collection & Staging**: Aggregating large volumes of sensitive customer data from various sources into a centralized location for exfiltration.
4.  **Exfiltration**: Transferring the stolen data out of the network to an attacker-controlled server ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)).
5.  **Impact**: Deploying ransomware to encrypt Marquis' systems to extort a payment ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

The core of this incident from the banks' perspective is a failure of third-party risk management, falling under [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/), where the trust placed in Marquis was exploited.

### MITRE ATT&CK Techniques Observed:
*   [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): The core of the supply chain attack, where banks were impacted via their vendor.
*   [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/): Attackers targeted and stole data from Marquis' databases.
*   [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/): A likely method for exfiltrating terabytes of customer data.
*   [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The attack was identified as a ransomware incident.

## Impact Assessment
The impact on the affected bank customers is severe. The theft of SSNs, financial account information, and other PII puts them at high risk of identity theft, loan fraud, and account takeovers for years to come. For the affected banks and credit unions, such as **CoVantage Credit Union**, the incident causes significant reputational damage and erodes customer trust, even though their own systems were not breached. They will also face increased operational costs from customer support and fraud monitoring. For Marquis, the financial and legal repercussions will be substantial, including the cost of recovery, potential lawsuits from both clients and individuals, and a devastating loss of business. This event is a powerful illustration of the systemic risk inherent in modern digital supply chains.

## Cyber Observables for Detection
For financial institutions to detect potential breaches at their vendors:
| Type | Value | Description |
|---|---|---|
| other | Third-party risk intelligence feeds | Monitor for reports of breaches or security incidents at critical vendors. |
| other | Dark web monitoring | Scan for mentions of the vendor or the institution's data on criminal forums. |
| network_traffic_pattern | Anomalous API access patterns from vendor IP ranges. | A sudden spike in data access from a vendor could indicate a problem on their end. |

## Detection & Response
Financial institutions often have limited visibility into their vendors' security, making direct detection difficult. The primary 'detection' method is often the breach notification from the vendor itself. However, organizations can be more proactive. Continuous monitoring of third-party risk through specialized services can provide early warnings. Response to a vendor breach involves activating the incident response plan, communicating clearly with customers, providing them with credit monitoring and support, and reviewing the legal and contractual relationship with the compromised vendor. Internally, security teams should monitor for any signs that the breached data is being used to target their own systems or customers (e.g., in sophisticated phishing campaigns).

## Mitigation
1.  **Third-Party Risk Management (TPRM)**: Implement a robust TPRM program. This includes comprehensive security assessments during vendor onboarding, requiring security certifications (e.g., SOC 2), and including strong security clauses, audit rights, and breach notification SLAs in all contracts.
2.  **Data Minimization**: Only share the absolute minimum amount of customer data necessary for the vendor to perform its function. Question whether a marketing vendor truly needs access to SSNs and full account numbers.
3.  **Data Encryption**: Mandate that any shared sensitive data be encrypted by the vendor, both at rest and in transit.
4.  **Incident Response Planning**: Develop and test incident response playbooks specifically for supply chain breaches. These should outline steps for communication, customer support, and legal action.
5.  **Continuous Monitoring**: Use services to continuously monitor the security posture of critical vendors and receive alerts on emerging risks.

**Tags:** Marquis Software, Supply Chain Attack, Data Breach, Ransomware, Financial Services, PII, SSN

## Sources
- [Marquis Data Breach Exposes Dozens of U.S. Banks and Credit Unions](https://gbhackers.com/marquis-data-breach/) — GBHackers (2025-11-26)
- [Marquis Software Solutions Data Breach Lawsuit Investigation](https://www.jointhecase.com/marquis-software-solutions-data-breach-lawsuit-investigation/) — JoinTheCase (2025-11-26)
- [NOTICE OF DATA BREACH](https://oag.ca.gov/system/files/CoVantage%20-%20Sample%20NBL.pdf) — California Office of the Attorney General (2025-11-26)

---
Source: https://cyber.netsecops.io/articles/marquis-software-supply-chain-breach-hits-dozens-of-us-banks/
