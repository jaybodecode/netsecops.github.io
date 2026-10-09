# CISA Urges OT Isolation in New 'CI Fortify' Critical Infrastructure Guide

**Severity:** informational | **Category:** Policy and Compliance,Industrial Control Systems,Regulatory | **Updated:** 2026-07-30 | **Reading time:** 5 min

CISA and international partners from the UK, Australia, and Canada have released new guidance, "CI Fortify – Advice for Isolating Vital Systems." It urges critical infrastructure (CI) operators to develop and practice plans for physically isolating operational technology (OT) from enterprise IT networks during a cyber crisis. The framework emphasizes identifying vital systems, mapping dependencies, and using physical separation or strong cryptography to protect essential services like water and energy from cyberattacks.

## Executive Summary
On July 28, 2026, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, along with its international partners—the Australian Cyber Security Centre (ACSC), the UK's National Cyber Security Centre (NCSC-UK), and the Canadian Centre for Cyber Security (CCCS)—published joint guidance for **[Critical Infrastructure (CI)](https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience)** operators. The guidance, titled **“CI Fortify – Advice for Isolating Vital Systems,”** provides a strategic framework for organizations to plan, prepare for, and execute the isolation of their vital **[Operational Technology (OT)](https://www.cisa.gov/topics/industrial-control-systems)** systems from corporate Information Technology (IT) networks. This initiative is a direct response to the escalating threat of disruptive cyberattacks from both nation-state actors and cybercriminals targeting essential services. The guidance strongly recommends physical separation as the most robust defense and provides a model for maintaining critical functions even when under attack.

---

## Regulatory Details
The **CI Fortify** guidance is not a legally binding regulation but rather a set of strong recommendations and best practices. It provides a structured approach for CI operators to enhance their resilience against high-impact cyber events.

The core components of the framework include:
1.  **Identify Vital Systems**: Organizations must first identify the absolute minimum set of OT assets and systems required to provide their most critical services to the public (e.g., maintaining water pressure, generating electricity).
2.  **Map Dependencies**: Thoroughly map all communication paths, data flows, and dependencies for these vital systems, including connections to IT networks, the internet, and third-party vendors.
3.  **Establish an Isolation Strategy**: Develop a pre-planned strategy for isolating these vital systems during a crisis. The guidance presents a spectrum of isolation options, from full physical separation to logical segmentation using cryptographic controls.
4.  **Practice and Maintain**: The plan must be regularly tested, practiced, and updated. It is not a one-time project but an ongoing capability that must be maintained.

---

## Affected Organizations
This guidance is aimed at owners and operators of critical infrastructure across all sectors, with a particular focus on those that rely heavily on OT and **[Industrial Control Systems (ICS)](https://www.cisa.gov/topics/industrial-control-systems)**. This includes, but is not limited to:
- Energy (Electric Grid, Oil & Gas)
- Water and Wastewater Systems
- Transportation Systems
- Manufacturing
- Healthcare
- Telecommunications

---

## Compliance Requirements
While not a mandate, the guidance outlines specific technical and procedural controls that organizations should implement:
- **Physical Isolation**: The guidance strongly advocates for creating a true "air gap" by using dedicated infrastructure (e.g., separate fiber pairs) and eliminating any shared components between OT and IT networks.
- **Cryptographic Enclaves**: Where complete physical isolation is not feasible, organizations should use strong cryptographic methods like IPsec or MACsec to create secure, logically isolated enclaves for OT traffic.
- **Secure Remote Access**: All remote access to the OT environment must be strictly controlled, monitored, and disabled by default. When needed, it should be enabled only for specific, time-bound sessions through a secure jump host.
- **Incident Response and Recovery Plan**: The isolation plan must be integrated into the organization's broader incident response and disaster recovery plans. This includes procedures for operating in a degraded, isolated state and for safely reconnecting systems after a threat has been neutralized.

---

## Implementation Timeline
There is no formal deadline for implementation. However, CISA and its partners are urging CI operators to begin adopting these principles immediately due to the current threat landscape. The guidance is intended to be a foundational document for long-term strategic planning and investment in OT security and resilience.

---

## Impact Assessment
For many CI organizations, implementing this guidance will require significant strategic, operational, and financial investment. 
- **Architectural Changes**: Many organizations will need to re-architect their networks to achieve the recommended level of segmentation, moving away from the historically flat networks where IT and OT were interconnected for convenience.
- **Resource Allocation**: This will require budget for new hardware (firewalls, switches), software (secure remote access solutions), and personnel with expertise in both cybersecurity and industrial control systems.
- **Operational Disruption**: The process of identifying and isolating systems can be complex and may require planned downtime. It will also change long-standing workflows for operators and maintenance staff.
- **Improved Resilience**: The long-term impact is a significant improvement in resilience. An organization that can successfully isolate its vital systems can continue to provide essential services to the public even while its corporate IT network is dealing with a major ransomware attack or other compromise.

---

## Compliance Guidance
1.  **Start with a Crown Jewel Analysis**: Begin by following the CI Fortify model to identify your most critical processes and the vital systems that support them.
2.  **Conduct a Network Architecture Review**: Analyze your current network architecture to identify all connection points between your IT and OT environments. Pay close attention to undocumented or forgotten links.
3.  **Develop a Phased Implementation Plan**: Create a multi-year roadmap. Start with high-impact, low-cost measures like strengthening firewall rules and implementing secure remote access. Then, plan for larger architectural projects like full network segmentation.
4.  **Tabletop Exercises**: Regularly conduct incident response exercises that specifically simulate a scenario requiring OT isolation. This will test your plan and train your staff on the procedures.

**Tags:** CI Fortify, CISA, Critical Infrastructure, ICS Security, Network Segmentation, OT Security

## Sources
- [CISA Joins Australia and Others to Publish Guidance to Isolate Operational Technology and Enabling Systems in Critical Infrastructure](https://www.cisa.gov/news-events/news/cisa-joins-australia-and-others-publish-guidance-isolate-operational-technology-and-enabling-systems) (2026-07-28)
- [CI Fortify – Advice for isolating vital systems](https://www.cisa.gov/resources-tools/resources/ci-fortify-advice-isolating-vital-systems) (2026-07-28)
- [CISA shares advice on isolating vital systems during cyberattacks](https://www.bleepingcomputer.com/news/security/cisa-shares-advice-on-isolating-vital-systems-during-cyberattacks/) (2026-07-28)
- [CISA Urges Critical Infrastructure Operators to Isolate Vital OT Systems During Cyberattacks](https://gbhackers.com/cisa-urges-critical-infrastructure-operators-to-isolate-vital-ot-systems/) (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/cisa-releases-ci-fortify-guidance-for-isolating-critical-ot-systems/
