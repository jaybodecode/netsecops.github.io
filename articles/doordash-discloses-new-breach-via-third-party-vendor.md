# DoorDash Discloses Another Breach via Third-Party Vendor

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Cloud Security | **Updated:** 2025-11-29 | **Reading time:** 5 min

Food delivery service DoorDash disclosed another data breach on November 27, 2025, resulting from a compromise at an unnamed third-party service provider. The incident, reported on November 28, exposed information belonging to both customers and delivery drivers. This breach marks the latest in a series of security incidents for DoorDash involving its supply chain, highlighting persistent vulnerabilities in its network of external vendors and raising concerns about the security of its platform.

## Executive Summary
On November 27, 2025, food delivery platform **[DoorDash](https://www.doordash.com/)** confirmed it had sustained another data breach. The incident originated not from a direct attack on DoorDash's own systems, but from a security compromise at one of its third-party vendors. The unauthorized access at the vendor allowed attackers to view and potentially exfiltrate data belonging to DoorDash customers and drivers ('Dashers'). This event is the latest in a pattern of supply-chain security failures for the company, renewing scrutiny of its vendor risk management practices and the overall security of its extensive partner ecosystem.

## Threat Overview
The breach exemplifies a classic supply-chain attack, where adversaries target a weaker link in the chain—in this case, a third-party service provider—to gain access to the data of a larger, more valuable target. While DoorDash has not named the compromised vendor, such partners often provide services like customer support, communications (e.g., SMS notifications), or marketing, and are frequently granted API access or credentials to the primary company's systems. By compromising the vendor, attackers effectively inherited their trusted access to DoorDash's data.

## Technical Analysis
The primary MITRE ATT&CK technique at play here is [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/). The attackers exploited the implicit trust and established access between DoorDash and its vendor. The attack likely unfolded as follows:
1.  **Vendor Compromise**: The attackers first breached the third-party vendor, possibly through phishing, malware, or exploiting a vulnerability in the vendor's own systems.
2.  **Abuse of Trusted Access**: Once inside the vendor's network, the attackers identified and stole the credentials, API keys, or access tokens that the vendor used to connect to DoorDash's environment.
3.  **Data Access and Exfiltration**: Using the vendor's legitimate credentials, the attackers authenticated to DoorDash's systems and accessed customer and driver data. This activity may appear legitimate to basic security monitoring, as it originates from a 'trusted' source.

## Impact Assessment
*   **Recurring Security Failures**: This incident further damages DoorDash's reputation for security, as it follows previous breaches, including a significant 2019 breach and another third-party incident in 2022. This pattern suggests a systemic issue in its vendor security program.
*   **Data Exposure**: The breach exposed an unspecified amount of customer and driver information, putting them at risk of phishing, scams, and identity theft.
*   **Regulatory Scrutiny**: As a company handling large volumes of personal data, DoorDash faces potential fines and regulatory action under privacy laws like the CCPA.

## Detection & Response
*   **API Monitoring**: Organizations must implement robust monitoring and anomaly detection for all API traffic, especially from third-party integrations. Alerts should be configured for unusual data query volumes, access to new or sensitive data endpoints, or API usage outside of normal business hours.
*   **Third-Party Account Auditing**: All service accounts and credentials used by vendors should be regularly audited. Implement **[Resource Access Pattern Analysis](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)** to baseline the normal behavior of these accounts and detect deviations that could indicate a compromise.
*   **Contractual Obligations**: Incident response plans should include clear contractual obligations for vendors to report security incidents promptly.

## Mitigation
*   **Vendor Risk Management**: Implement a comprehensive third-party risk management (TPRM) program that includes rigorous security assessments before onboarding vendors and periodic audits thereafter. This is a critical **[Pre-compromise](https://attack.mitre.org/mitigations/M1056/)** defense.
*   **Principle of Least Privilege for APIs**: Grant vendors the absolute minimum level of access required for their function. API keys should be scoped to specific actions (read-only vs. write) and data fields. Avoid granting broad, permissive access.
*   **Credential Rotation**: Enforce periodic rotation of all API keys and service account credentials shared with third parties.
*   **Network Segmentation**: If vendors require network access, they should be placed in a highly restricted, isolated network segment with strict traffic filtering rules, a form of **[Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.

**Tags:** data breach, supply chain attack, doordash, third party risk, api security

## Sources
- [Top Data Breaches of November 2025](https://strobes.co/blog/top-data-breaches-of-november-2025/) — Strobes Security (2025-11-28)
- [Cyber Briefing: 2025-11-28](https://www.youtube.com/watch?v=J_3rqB4f0Ew) — YouTube (2025-11-28)

---
Source: https://cyber.netsecops.io/articles/doordash-discloses-new-breach-via-third-party-vendor/
