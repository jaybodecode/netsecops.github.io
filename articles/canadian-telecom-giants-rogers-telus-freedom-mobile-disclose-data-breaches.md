# Triple Threat: Canada's Top Telecoms Rogers, Telus, and Freedom Mobile Hit by Data Breaches

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cyberattack | **Updated:** 2026-03-28 | **Reading time:** 5 min

Canada's telecommunications sector is under fire after three of its largest carriers—Rogers, Telus, and Freedom Mobile—each reported significant data breaches. The incidents, which occurred within the same week, exposed customer information such as names, contact details, and account numbers. The breaches highlight systemic vulnerabilities, particularly related to third-party and subcontractor access. Rogers and its subsidiary Fido confirmed unauthorized access to customer data, while Telus was targeted by the 'ShinyHunters' hacking group, which claimed to have stolen nearly a petabyte of data. Freedom Mobile suffered its second breach in six months due to compromised subcontractor credentials, prompting all three companies to enhance their security protocols.

## Executive Summary

Three of Canada's largest telecommunications providers, **[Rogers Communications](https://www.rogers.com/)**, **Telus**, and **Freedom Mobile**, have separately disclosed data breaches, exposing the personal information of an unconfirmed number of customers. The incidents underscore a systemic risk within the industry, particularly concerning the security of third-party and supply chain partners. While the companies have stated that highly sensitive financial data was not compromised in all cases, the breaches exposed names, contact information, and account details. The attack on Telus was claimed by the notorious hacking group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**, highlighting the persistent threat from organized cybercrime groups targeting critical infrastructure.

---

## Threat Overview

The series of breaches reveals multiple points of failure across the Canadian telecom landscape:

- **Rogers Communications:** The company, along with its subsidiary **Fido**, discovered that an unauthorized third party had gained access to customer information. The exposed data includes customer names, contact details, account numbers, and language preferences. Rogers asserts that more sensitive information like financial data, Social Insurance Numbers (SINs), and passwords were not accessed. The breach was identified through proactive monitoring.

- **Telus:** The hacking group **ShinyHunters** claimed responsibility for a major breach at Telus, alleging the theft of nearly 1 petabyte of data, including customer records from Telus Digital. The group issued a ransom demand, threatening to leak the data. This incident aligns with recent warnings from Canada's Cyber Security Centre about state-sponsored threats targeting telecom infrastructure.

- **Freedom Mobile:** This **Quebecor** subsidiary suffered its second breach in six months. The latest incident, occurring in January 2026, resulted from the exploitation of subcontractor credentials. The compromised data includes customer names, addresses, phone numbers, and account details.

These attacks demonstrate a clear pattern of threat actors targeting telecoms as high-value targets, both for the customer data they hold and their critical role in national infrastructure.

## Technical Analysis

The reported breaches stem from different, yet common, attack vectors, primarily focusing on exploiting trusted relationships and weak access controls.

**TTPs Observed:**
- **Trusted Relationship (`T1199`):** The breach at **Freedom Mobile** is a classic example of a supply chain attack, where attackers compromised a third-party subcontractor to gain access to the primary target's network. This technique bypasses perimeter defenses by exploiting a trusted connection.
- **Valid Accounts (`T1078`):** The exploitation of subcontractor credentials falls under this technique. Attackers likely obtained these credentials through phishing, password spraying, or credential stuffing attacks against the less-secure third party.
- **Data from Information Repositories (`T1213`):** In all three cases, the attackers targeted and successfully exfiltrated data from customer information databases.
- **Exfiltration Over C2 Channel (`T1041`):** **ShinyHunters**' claim of stealing nearly 1 petabyte of data from Telus implies a large-scale, sustained exfiltration effort, likely over a covert command-and-control channel.

> The recurring theme across these incidents is the failure to adequately secure and monitor third-party access. This highlights a critical gap in many organizations' security postures, as they often have less visibility and control over the security practices of their partners and suppliers.

## Impact Assessment

The collective impact of these breaches on the Canadian public is significant. While the exposed data may not include financial details in all cases, the stolen personal information is highly valuable for follow-on attacks such as targeted phishing, identity theft, and SIM-swapping fraud. For the telecom companies, the breaches result in regulatory scrutiny, reputational damage, and the high cost of incident response, customer notification, and security enhancements. The targeting of critical telecom infrastructure also poses a national security risk, as it could be a precursor to more disruptive attacks.

## Detection & Response

**Detection Strategies:**
1.  **Third-Party Access Monitoring:** Implement strict monitoring of all third-party and subcontractor connections to the corporate network. Analyze logs for unusual access patterns, such as access outside of normal business hours or access to data not relevant to the subcontractor's function. This can be achieved using a Security Information and Event Management (SIEM) system. Reference D3FEND technique [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
2.  **Data Exfiltration Detection:** Deploy network traffic analysis and data loss prevention (DLP) tools to detect and alert on large or unusual outbound data transfers, especially from sensitive database servers. Reference D3FEND technique [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Credential Abuse Detection:** Use identity and access management (IAM) solutions to detect anomalous authentication events, such as logins from impossible locations or multiple failed login attempts followed by a success, which could indicate credential abuse.

**Response Actions:**
- Immediately revoke compromised credentials and terminate all active sessions associated with the suspicious accounts.
- Isolate the network segments accessed by the third party to prevent lateral movement.
- Conduct a thorough investigation to determine the full scope of the breach, including all data that was accessed or exfiltrated.

## Mitigation

**Strategic Mitigations:**
- **Third-Party Risk Management (TPRM):** Establish a comprehensive TPRM program that includes rigorous security assessments of all vendors, suppliers, and subcontractors before granting them network access. Contracts should include specific cybersecurity requirements and right-to-audit clauses.
- **Zero Trust Architecture:** Adopt a Zero Trust security model where no user or system is trusted by default. All access requests should be authenticated, authorized, and encrypted based on dynamic policies. This is particularly important for third-party connections.
- **Multi-Factor Authentication (MFA):** Enforce MFA for all user accounts, especially for remote access and access to sensitive systems. This is a critical control to prevent credential abuse. Reference [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).

**Tactical Mitigations:**
- **Least Privilege Access:** Ensure that third parties are granted the minimum level of access necessary to perform their duties. Access should be regularly reviewed and revoked when no longer needed.
- **Network Segmentation:** Segment the network to isolate third-party access from critical internal systems and sensitive data repositories.
- **Enhanced Monitoring:** Increase logging and monitoring of all third-party connections and activities within the network to quickly detect any signs of compromise.

**Tags:** third-party risk, subcontractor, customer data, telecom, Canada

## Sources
- [Rogers, Fido customer info accessed in data breach](https://mobilesyrup.com/2026/03/27/rogers-fido-customer-info-accessed-in-data-breach/) — MobileSyrup (2026-03-27)
- [Cybersecurity Incidents and Alerts March 28, 2026 A Roundup of Recent Threats, Data Breaches, and Fraud Schemes](https://www.kcnet-global.com/2026/03/28/cybersecurity-incidents-and-alerts-march-28-2026-a-roundup-of-recent-threats-data-breaches-and-fraud-schemes/) — KCNET Global (2026-03-28)

---
Source: https://cyber.netsecops.io/articles/canadian-telecom-giants-rogers-telus-freedom-mobile-disclose-data-breaches/
