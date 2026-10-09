# Ransomware Groups Pivot to Healthcare Vendors, Attacks Surge 30%

**Severity:** high | **Category:** Ransomware,Supply Chain Attack,Threat Actor | **Updated:** 2025-10-13 | **Reading time:** 4 min

A new report from Comparitech reveals a significant strategic shift in ransomware attacks targeting the healthcare sector. While attacks on direct care providers remained steady, incidents involving healthcare-affiliated businesses and vendors surged by 30% in the first nine months of 2025. Threat actors like Qilin and INC are increasingly targeting less-secure partners such as medical billing services and pharmaceutical manufacturers to disrupt the healthcare supply chain, leading to the breach of over 6 million records from confirmed attacks on these adjacent businesses alone.

## Executive Summary
A new report from **Comparitech** reveals a concerning trend in the healthcare sector: ransomware actors are shifting their focus from direct patient care providers to their less-secure vendors and business partners. In the first three quarters of 2025, attacks on these healthcare-affiliated businesses surged by 30%. This strategic pivot allows threat actors like **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and **INC** to exploit the supply chain, causing widespread disruption and accessing sensitive patient data indirectly. This shift follows several high-profile, disruptive attacks on major hospital systems, suggesting that attackers are now targeting the softer underbelly of the healthcare ecosystem to achieve their goals.

---

## Threat Overview
The data, covering the first nine months of 2025, shows a clear and deliberate change in ransomware targeting strategy.
-   **Direct Provider Attacks**: There were 293 recorded attacks on direct healthcare providers (hospitals, clinics), a number consistent with the previous year.
-   **Vendor Attacks**: In contrast, attacks on adjacent businesses (pharmaceuticals, medical billing, tech companies) rose to 130 incidents, a 30% increase.
-   **Rationale**: This shift is likely a response to improved security at major hospitals following major incidents like the 2024 attacks on Ascension and Synnovis. Attackers perceive vendors as easier targets that still provide access to valuable data and create significant disruption.

This tactic is a classic example of abusing a [`Trusted Relationship (T1199)`](https://attack.mitre.org/techniques/T1199/) to bypass the defenses of a primary target.

---

## Threat Actor Activity
Several prominent ransomware groups have been active in this space:
-   **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)**: The most prolific group targeting healthcare vendors, responsible for 19 total attacks (four confirmed).
-   **KillSec**: The second most active, with 12 attacks on the healthcare supply chain.
-   **INC Ransomware**: The most active group against direct healthcare providers, but also heavily involved in vendor attacks, claiming to have stolen over 20.1 TB of data from these businesses.

---

## Impact Assessment
The impact of this strategic shift is substantial and multifaceted.
-   **Data Breaches**: The 23 confirmed attacks on vendors have already led to the breach of over 6 million patient and employee records.
-   **Supply Chain Disruption**: An attack on a critical vendor, such as a medical billing or pharmaceutical company, can have a cascading effect, disrupting services for numerous healthcare providers simultaneously.
-   **Increased Attack Surface**: Every vendor connected to a healthcare provider represents an additional potential entry point for attackers, vastly expanding the attack surface that providers must defend.
-   **Overall Ransomware Increase**: The report notes a broader trend of escalating ransomware activity, with 5,186 attacks recorded globally in 2025 so far, a 36% increase from the same period in 2024.

---

## Detection & Response
Healthcare organizations must expand their security focus beyond their own perimeters.
-   **Vendor Monitoring**: Implement continuous monitoring of network connections and data flows between the organization and its vendors. D3FEND's [`User Data Transfer Analysis (D3-UDTA)`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis) can help detect anomalous data exfiltration to or from a vendor.
-   **Threat Intelligence Sharing**: Participate in healthcare-specific information sharing and analysis centers (ISACs) to receive timely intelligence on threats targeting vendors in the sector.
-   **Incident Response Planning**: Update incident response plans to include scenarios involving a compromise at a critical vendor. This includes communication plans, data breach notification procedures, and manual workarounds for disrupted services.

---

## Mitigation
Defending against these supply chain attacks requires a proactive and collaborative approach.
-   **Third-Party Risk Management (TPRM)**: Healthcare providers must implement rigorous TPRM programs. This involves conducting thorough security assessments of all vendors, scrutinizing their security controls, and demanding strong contractual security obligations. This is a key aspect of [`Pre-compromise (M1056)`](https://attack.mitre.org/mitigations/M1056/).
-   **Network Segmentation**: Implement [`Network Segmentation (M1030)`](https://attack.mitre.org/mitigations/M1030/) to isolate systems that interact with third-party vendors. This can limit the blast radius if a vendor's connection is compromised, preventing attackers from moving laterally into core clinical networks.
-   **Principle of Least Privilege**: Enforce the principle of least privilege for all vendor connections and accounts. Vendors should only have access to the specific data and systems necessary for their function, and for the minimum time required.
-   **Resilience and Redundancy**: For critical services provided by a single vendor, develop contingency plans and, where possible, identify alternative vendors to ensure operational resilience in the event of an outage.

**Tags:** Ransomware, Healthcare, Supply Chain Attack, Qilin, INC Ransomware, Data Breach, Comparitech

## Sources
- [Healthcare ransomware attacks surge 30% in 2025, as cybercriminals shift focus to vendors and service partners](https://industrialcyber.co/healthcare/healthcare-ransomware-attacks-surge-30-in-2025-as-cybercriminals-shift-focus-to-vendors-and-service-partners/) — Industrial Cyber (2025-10-13)
- [Cyber & AI Weekly - October 13th](https://strongestlayer.com/cyber-ai-weekly-october-13th/) — Strongest Layer (2025-10-13)

---
Source: https://cyber.netsecops.io/articles/healthcare-ransomware-attacks-shift-to-vendors-surging-30-percent/
