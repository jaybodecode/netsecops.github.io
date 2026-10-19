# Under Armour Sued Over Data Breach Attributed to 'Everest' Cybercrime Group

**Severity:** high | **Category:** Data Breach,Threat Actor,Policy and Compliance | **Updated:** 2025-12-04 | **Reading time:** 4 min

Athletic apparel giant Under Armour is the target of a new class action lawsuit following a November 2025 data breach. The suit, reported on December 4, 2025, claims the company was negligent in protecting the personal information of consumers and employees. The breach was allegedly carried out by the 'Everest' cybercriminal group, which claims to have stolen and leaked hundreds of gigabytes of data. The lawsuit asserts that Under Armour failed to implement basic cybersecurity measures like encryption and did not provide timely notification to victims, who now face a heightened risk of identity theft and fraud.

## Executive Summary
**[Under Armour, Inc.](https://www.underarmour.com/)**, a major global athletic apparel brand, is now facing a proposed class action lawsuit stemming from a data breach that occurred in November 2025. The lawsuit alleges that the company acted negligently by failing to implement adequate security measures to protect the sensitive personal and private information of its customers and employees. The breach has been attributed to the **Everest** cybercriminal group, which reportedly exfiltrated and leaked hundreds of gigabytes of data. The complaint argues that Under Armour failed in its duty to safeguard this data, including by not encrypting it, and did not provide timely or adequate notice to affected individuals, leaving them vulnerable to identity theft and other forms of fraud.

---

## Threat Overview
- **Threat Actor:** The attack is attributed to the **Everest** cybercriminal group. This group is known for data theft and extortion, often leaking stolen data on the dark web to pressure victims.
- **Attack Type:** This was a data breach focused on the mass exfiltration of sensitive information. The lawsuit implies it was not a ransomware attack, but rather a smash-and-grab data theft.
- **Victim:** Under Armour, Inc., a large retail and e-commerce company holding vast amounts of customer and employee data.

## Legal and Compliance Details
The 40-page lawsuit lays out several key allegations against Under Armour:
- **Negligence:** The core claim is that the company failed to exercise reasonable care in securing the private information it collected, breaching its common law and statutory duties.
- **Failure to Meet Standards:** The suit alleges that Under Armour did not comply with minimum cybersecurity standards, such as encrypting sensitive data at rest.
- **Inadequate Notification:** The complaint accuses the company of failing to provide timely, accurate, and sufficient notification to breach victims, preventing them from taking prompt action to protect themselves.
- **Damages Sought:** The lawsuit seeks to cover all U.S. residents whose data was compromised and is likely seeking monetary damages, credit monitoring services, and a court order forcing Under Armour to improve its security practices.

## Impact Assessment
The impact of this breach is twofold, affecting both the company and the individuals whose data was stolen.

**For Victims:**
- **Increased Risk of Fraud:** The leaked data can be used by criminals for identity theft, opening fraudulent lines of credit, and conducting targeted phishing attacks.
- **Emotional Distress:** Victims often suffer from anxiety and stress due to the uncertainty and potential financial harm caused by the exposure of their personal information.

**For Under Armour:**
- **Legal and Financial Costs:** The company faces significant costs from the class action lawsuit, potential regulatory fines, and incident response expenses.
- **Reputational Damage:** A major data breach can erode consumer trust and damage the brand's reputation, potentially impacting sales.
- **Operational Disruption:** Responding to the breach and lawsuit diverts resources from core business activities.

## Detection & Response
While details of Under Armour's internal response are not public, the lawsuit's allegations suggest potential gaps:
- **Data Loss Prevention (DLP):** Effective DLP solutions should have been in place to detect and block the mass exfiltration of hundreds of gigabytes of data. The success of the exfiltration points to a possible failure in this area.
- **Security Monitoring:** The lawsuit implies that the company may not have detected the intrusion in a timely manner, allowing the Everest group sufficient time to exfiltrate a large volume of data.
- **Incident Communication:** The claim of inadequate notification is a common issue in breach response. A well-defined communication plan is critical for meeting legal requirements and managing public perception.

## Mitigation Recommendations
Based on the allegations in the lawsuit, the following mitigations are critical for any organization handling large volumes of PII:
1.  **Data Encryption:** All sensitive personal and financial data should be encrypted both at rest (in databases and file storage) and in transit (over the network). This is a fundamental control that renders stolen data useless to attackers. This maps to D3FEND's [`D3-FE: File Encryption`](https://d3fend.mitre.org/technique/d3f:FileEncryption).
2.  **Data Minimization:** Collect and retain only the data that is absolutely necessary for business operations. Regularly purge data that is no longer needed to reduce the potential impact of a future breach.
3.  **Access Control:** Implement the principle of least privilege. Employees and systems should only have access to the data required for their specific roles. This limits the scope of what an attacker can access with a single compromised account.
4.  **Egress Traffic Filtering and Monitoring:** Monitor outbound network traffic for anomalies that could indicate large-scale data exfiltration. Configure firewalls and DLP tools to alert on and potentially block unusually large data transfers to external destinations.

**Tags:** Data Breach, Under Armour, Class Action, Lawsuit, Everest, Negligence, PII

## Sources
- [Under Armour Failed to Protect Sensitive Info from November 2025 Data Breach, Class Action Lawsuit Says](https://www.classaction.org/news/under-armour-failed-to-protect-sensitive-info-from-november-2025-data-breach-class-action-lawsuit-says) — ClassAction.org (2025-12-04)
- [Breach News](https://www.forecight.com/breach) — Forecight (2025-12-04)
- [Class Action Lawsuits and Settlements: Stay Informed and Get Legal Help](https://www.classaction.org/) — ClassAction.org (2025-12-04)

---
Source: https://cyber.netsecops.io/articles/under-armour-faces-class-action-lawsuit-over-november-2025-data-breach/
