# Major Wall Street Banks Exposed After Breach at Mortgage Vendor SitusAMC

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Incident Response | **Updated:** 2025-11-22 | **Reading time:** 5 min

SitusAMC, a critical technology and services provider for the real estate finance industry, has disclosed a significant data breach discovered on November 12, 2025. The cyberattack compromised corporate information and, more critically, data belonging to its clients' customers, which could include sensitive personal information from mortgage applications. Major financial institutions, including JPMorgan Chase, Citigroup, and Morgan Stanley, have reportedly been notified of their potential exposure. The FBI is investigating the incident, which highlights the systemic risk posed by third-party vendors in the financial sector.

## Executive Summary

**[SitusAMC](https://www.situsamc.com/)**, a pivotal vendor in the U.S. real estate finance ecosystem, has suffered a significant data breach. The company, which provides technology and services to hundreds of banks and lenders, announced on November 22, 2025, that it detected a cyberattack on November 12. The attackers gained unauthorized access to internal systems, compromising both corporate data and sensitive information belonging to the customers of its clients. Major Wall Street banks, including **[JPMorgan Chase](https://www.jpmorganchase.com/)**, **[Citigroup](https://www.citigroup.com/)**, and **[Morgan Stanley](https://www.morganstanley.com/)**, have been notified of their potential exposure. The **[FBI](https://www.fbi.gov)** is now investigating the incident, which serves as a stark reminder of the profound supply chain risks inherent in the financial services industry.

---

## Threat Overview

On November 12, 2025, SitusAMC became aware of unauthorized access to its network. The investigation, assisted by third-party forensic experts, confirmed that threat actors had compromised and accessed sensitive information. The company stated the incident did not involve ransomware, and its services remain operational. However, the scope of the data compromise is severe.

The breached data includes:
*   **Corporate Information**: Internal data related to SitusAMC's client relationships, such as accounting records and legal agreements.
*   **Client Customer Data**: This is the most critical aspect of the breach. As a major processor of mortgage loan applications, SitusAMC holds a vast trove of personally identifiable information (PII), which could include names, addresses, and Social Security numbers.

The incident is a classic example of a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**, where the compromise of a single, central vendor has a cascading impact on a multitude of its high-profile clients. The attackers targeted the "necessary plumbing" of the mortgage industry to gain access to data from some of the world's largest banks.

## Technical Analysis

While specific technical details of the intrusion vector have not been disclosed, the nature of the attack points to a compromise of SitusAMC's internal network, leading to data exfiltration. The threat actors' decision not to deploy ransomware suggests their primary motive was data theft for the purpose of fraud, extortion, or sale on underground markets, rather than operational disruption.

Potential attack vectors could include:
*   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Compromise of an internet-facing server or application.
*   [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): An employee falling victim to a phishing campaign, leading to credential theft.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Use of stolen or weak credentials to access the network.

Once inside, the attackers would have performed reconnaissance ([`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/), [`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)) to locate valuable data stores and then exfiltrated the data ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/) or [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).

## Impact Assessment

The impact of the SitusAMC breach is systemic. As a service provider for a significant portion of the mortgage industry, its compromise affects not only the company itself but also its extensive client base and, ultimately, millions of individual mortgage applicants.

*   **Financial Institutions**: Major banks like JPMorgan Chase, Citi, and Morgan Stanley now face reputational damage, regulatory scrutiny, and the costs associated with notifying their customers and providing credit monitoring services. While they were not directly hacked, their data was exposed due to their vendor's security failure.
*   **SitusAMC**: The company faces catastrophic reputational and financial damage, including loss of customer trust, potential lawsuits, and regulatory fines.
*   **Individuals**: The primary victims are the individuals whose sensitive personal and financial data was stolen. They are now at high risk of identity theft, financial fraud, and targeted phishing attacks.

This incident underscores the concentration risk in relying on a few key vendors for critical industry functions. The **[FBI](https://www.fbi.gov)**'s involvement signals the severity of the breach and its potential impact on the U.S. financial system.

## IOCs

No specific Indicators of Compromise have been publicly released.

## Cyber Observables for Detection

Since the breach occurred at a third-party vendor, direct detection by the affected banks is not possible. Detection relies on SitusAMC's internal security monitoring. For a similar incident, a company would hunt for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Database Access Logs | Monitor for unusual or large-scale queries against databases containing customer PII. | Database Activity Monitoring (DAM) | high |
| network_traffic_pattern | Large egress data transfers | Detect anomalous large data flows from internal servers to external destinations, especially those not on an allowlist. | Network Security Monitoring, DLP | high |
| user_account_pattern | Anomalous access patterns | A user account accessing data or systems outside of its normal job function or hours. | SIEM, UEBA | high |
| command_line_pattern | `7z.exe a -p[password] archive.7z [data_folder]` | Attackers often use archiving tools to compress and encrypt data before exfiltration. | EDR, Command-line logging | medium |

## Detection & Response

For the affected financial institutions, the response is primarily driven by third-party risk management protocols.

1.  **Communication**: Establish a clear line of communication with the compromised vendor (SitusAMC) to understand the scope of the breach and which specific customers are affected.
2.  **Impact Analysis**: Work with the vendor to obtain a list of impacted individuals to initiate notification procedures as required by state and federal breach notification laws.
3.  **Customer Support**: Prepare to offer identity theft protection and credit monitoring services to affected customers to mitigate the potential harm.

Internally, this incident should trigger a review of all critical vendors. This is an application of **[D3-SDA: Session Duration Analysis](https://d3fend.mitre.org/technique/d3f:SessionDurationAnalysis)** and **[D3-UDTA: User Data Transfer Analysis](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**, but applied to vendor connections rather than internal users.

## Mitigation

Preventing such incidents requires a robust Third-Party Risk Management (TPRM) program.

*   **Enhanced Due Diligence**: Organizations must move beyond simple questionnaires. Conduct in-depth security assessments of critical vendors, including penetration tests and reviews of their incident response capabilities.
*   **Contractual Obligations**: Ensure that vendor contracts include strong security requirements, breach notification SLAs (Service Level Agreements), and the right to audit the vendor's security controls.
*   **Data Minimization**: Only share the absolute minimum amount of data required for a vendor to perform its function. This falls under the **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** principle.
*   **Assume a Breach**: Develop and test incident response plans that specifically address a breach at a critical third-party vendor. Know who to contact, what the legal obligations are, and how to manage customer communications.

**Tags:** SitusAMC, Data Breach, Supply Chain Attack, JPMorgan Chase, Citigroup, Morgan Stanley, Financial Services, FBI

## Sources
- [Data Breach](https://www.situsamc.com/data-breach-notification-2025-11-22) — SitusAMC (2025-11-22)
- [Hackers Hit ‘Necessary Plumbing’ of Big Bank Mortgage Operations](https://www.pymnts.com/cybersecurity/2025/hackers-hit-necessary-plumbing-of-big-bank-mortgage-operations/) — PYMNTS.com (2025-11-21)
- [SitusAMC Cyberattack May Expose Client Data of Major Banks](https://www.phemex.com/news/situsamc-cyberattack-may-expose-client-data-of-major-banks) — Phemex (2025-11-22)
- [Major Banks Alerted by SitusAMC to Potential Data Breach](https://www.binance.com/en/square/post/2025-11-22-major-banks-alerted-by-situsamc-to-potential-data-breach-436321453123) — Binance (2025-11-22)

---
Source: https://cyber.netsecops.io/articles/mortgage-vendor-situsamc-discloses-breach-affecting-major-wall-street-banks/
