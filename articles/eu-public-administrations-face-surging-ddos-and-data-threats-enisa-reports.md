# EU Governments Under Siege: ENISA Reports Massive Surge in DDoS and Data Attacks

**Severity:** high | **Category:** Threat Intelligence,Policy and Compliance,Cyberattack | **Updated:** 2025-11-10 | **Reading time:** 5 min

A new threat landscape report from the EU Agency for Cybersecurity (ENISA) reveals that public administrations across the European Union are facing a dramatic increase in cyberattacks. DDoS attacks, largely driven by pro-Russia hacktivist groups like NoName057(16), account for 60% of all incidents, primarily targeting central governments. While disruptive, the report warns that data breaches (17.4%) and ransomware (10%) pose a more significant threat to the continuity of essential public services. ENISA also highlights ongoing espionage campaigns by Russian and Chinese state actors, and notes that the sector's immaturity under the new NIS2 Directive places it in a high-risk zone.

## Executive Summary

Public administrations across the European Union are increasingly under fire from a diverse range of cyber threats, according to a new sector-specific threat landscape report from the **[European Union Agency for Cybersecurity (ENISA)](https://www.enisa.europa.eu/)**. The report, published in November 2025, identifies Distributed Denial-of-Service (DDoS) attacks as the most frequent threat, accounting for 60% of incidents, with pro-Russian hacktivist group **[NoName057(16)](https://attack.mitre.org/groups/G1022/)** being the primary perpetrator. However, **ENISA** warns that data-related threats and ransomware, while less frequent, cause more substantial damage and disruption to essential public services. The report also highlights persistent cyber-espionage campaigns from state-sponsored actors linked to Russia and China. With the public sector newly regulated under the **[NIS2 Directive](https://en.wikipedia.org/wiki/NIS2_Directive)**, ENISA assesses that these institutions are in a vulnerable transition period and require urgent security enhancements.

---

## Threat Overview

The report paints a picture of a sector under siege from multiple angles:

*   **Hacktivism (DDoS)**: The most voluminous threat comes from politically motivated hacktivist groups. These actors launch high-volume [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/) attacks to disrupt the availability of government websites and services, aiming to make a political statement and erode public trust. **NoName057(16)** alone was responsible for 46% of these DDoS attacks.
*   **Data-Related Threats**: Accounting for 17.4% of incidents, these include data breaches and data exposures. These attacks are more severe, as they compromise sensitive citizen data from platforms like employment services and law enforcement portals, leading to privacy violations and a high risk of fraud.
*   **Ransomware**: Making up 10% of cases, ransomware attacks cause significant operational disruption, locking up critical systems and halting the delivery of public services. These attacks combine data encryption with the threat of data leakage.
*   **Cyber-espionage**: Nation-state actors, particularly those from Russia and China, continue to target EU governmental bodies for intelligence-gathering purposes, seeking to gain political and economic advantages.

Central governments are the primary target, bearing the brunt of 69% of all recorded incidents.

---

## Impact Assessment

The consequences of these attacks on public administrations are severe and multifaceted:

*   **Disruption of Essential Services**: DDoS and ransomware attacks can bring government operations to a standstill, preventing citizens from accessing critical services related to healthcare, social security, and law enforcement.
*   **Erosion of Public Trust**: Successful cyberattacks against government institutions damage public confidence in the state's ability to protect their data and provide reliable services.
*   **Compromise of Sensitive Data**: The theft of personal, financial, and health information from government databases can lead to widespread identity theft and fraud, affecting millions of citizens.
*   **National Security Risks**: Espionage campaigns can expose sensitive government strategies, diplomatic communications, and economic data, undermining national security and the EU's geopolitical standing.
*   **Regulatory and Financial Costs**: Breaches under the NIS2 Directive will lead to significant regulatory fines and high costs for incident response, recovery, and security upgrades.

---

## Compliance Guidance (NIS2)

The ENISA report underscores the challenges public administrations face in complying with the NIS2 Directive. Key recommendations for these organizations include:

1.  **Conduct Risk Assessments**: Perform comprehensive risk assessments to identify critical assets, data repositories, and key services. Map threats identified in the ENISA report to the organization's specific environment.
2.  **Develop Incident Response Plans**: Establish and regularly test incident response plans specifically for DDoS, ransomware, and data breach scenarios. This is a core requirement of NIS2.
3.  **Implement Baseline Security Measures**: NIS2 mandates a range of security measures. Prioritize the implementation of multi-factor authentication, robust access control, network segmentation, and regular software patching.
4.  **Strengthen Supply Chain Security**: Assess the security posture of all third-party suppliers and service providers, as they represent a significant vector for attack.
5.  **Report Incidents Promptly**: Establish clear procedures for reporting significant incidents to the national CSIRT or competent authority within the deadlines stipulated by NIS2 (24 hours for an early warning, 72 hours for a full notification).

---

## Detection & Response

To counter the threats highlighted by ENISA, public administrations should focus on:

*   **DDoS Detection and Mitigation**: Implement a DDoS mitigation service, either on-premises or cloud-based. Monitor network traffic for unusual spikes in volume or specific traffic patterns associated with DDoS tools. This aligns with D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **Data Exfiltration Detection**: Use Data Loss Prevention (DLP) tools and network traffic analysis to detect and block unauthorized outbound transfers of large volumes of data. This relates to D3FEND's [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
*   **Behavioral Monitoring**: Deploy EDR and SIEM solutions to monitor for ransomware pre-cursors, such as the use of tools like `PsExec` for lateral movement or attempts to disable security software. This is an application of D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

---

## Mitigation

ENISA's report implicitly calls for a defense-in-depth strategy:

1.  **Architectural Resilience**: Adopt a Zero Trust architecture. Implement robust network segmentation to contain breaches and prevent lateral movement. This is a key principle of D3FEND's [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
2.  **Harden Public-Facing Services**: Secure all web applications and APIs against common vulnerabilities (e.g., OWASP Top 10). Use a Web Application Firewall (WAF) to protect against common attack patterns. This is a form of D3FEND's [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
3.  **User Training and Awareness**: Conduct regular training for employees to recognize phishing attempts, which are a common initial access vector for both ransomware and espionage campaigns.
4.  **Multi-Factor Authentication (MFA)**: Mandate MFA for all employees and contractors to protect against credential theft and abuse. This is a direct implementation of D3FEND's [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).

**Tags:** ENISA, DDoS, Hacktivism, NoName057(16), Ransomware, NIS2, EU, Government

## Sources
- [ENISA report reveals surge in DDoS and data breaches against EU public administration](https://www.industrialcyber.co/attacks-vulnerabilities/enisa-report-reveals-surge-in-ddos-and-data-breaches-against-eu-public-administration/) — Industrial Cyber (2025-11-10)
- [Public administration increasingly targeted by DDoS attacks - ENISA — European Union Agency for Cybersecurity](https://www.enisa.europa.eu/news/public-administration-increasingly-targeted-by-ddos-attacks) — ENISA (2025-11-06)
- [Hacktivist-Driven DDoS Dominates Attacks on Public Sector - Infosecurity Magazine](https://www.infosecurity-magazine.com/news/hacktivist-ddos-public-sector/) — Infosecurity Magazine (2025-11-06)
- [ENISA Sectorial Threat Landscape - Public Administration](https://www.enisa.europa.eu/publications/enisa-sectorial-threat-landscape-public-administration) — ENISA (2025-11-06)

---
Source: https://cyber.netsecops.io/articles/eu-public-administrations-face-surging-ddos-and-data-threats-enisa-reports/
