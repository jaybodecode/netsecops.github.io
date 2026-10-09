# Asimily Boosts Cisco ISE Integration with Enhanced Microsegmentation for IoT/OT Devices

**Severity:** informational | **Category:** IoT Security,Security Operations,Industrial Control Systems | **Updated:** 2026-01-17 | **Reading time:** 3 min

Asimily, a provider of cyber asset and exposure management, has launched enhanced microsegmentation capabilities, including new support for Security Group Access Control Lists (SGACL) in Cisco Identity Services Engine (ISE). This integration allows organizations to translate rich device context—such as risk, behavior, and classification—from the Asimily platform into dynamically enforced security policies in Cisco ISE. The goal is to automate the containment of threats across complex IT, IoT, and OT environments.

## Executive Summary
**Asimily**, a company specializing in cyber asset management for connected devices, has announced a significant enhancement to its platform's microsegmentation capabilities. The key development is the new native support for Security Group Access Control Lists (SGACL) within **[Cisco Identity Services Engine (ISE)](https://www.cisco.com/c/en/us/products/security/identity-services-engine/index.html)**. This deepens the existing integration between the two products, enabling security teams to automatically translate the detailed device intelligence gathered by Asimily into enforceable, granular access policies in Cisco ISE. This move aims to help organizations, particularly in sectors like healthcare and manufacturing, to move from passive device visibility to active risk reduction by containing threats and preventing lateral movement across their diverse and growing fleets of IoT, OT, and IoMT devices.

## Technical Overview
The integration between Asimily and Cisco ISE creates a powerful, automated workflow for network segmentation:
1.  **Device Discovery and Profiling (Asimily):** The Asimily platform discovers and inventories all connected devices on the network, including difficult-to-identify IoT and OT assets. It uses AI-driven analysis to classify each device (e.g., 'infusion pump,' 'HVAC controller'), understand its normal communication patterns, and assess its vulnerability and risk posture.
2.  **Policy Recommendation (Asimily):** Based on this rich context, Asimily recommends specific microsegmentation policies. For example, it might determine that an infusion pump only needs to communicate with a specific nurse station and a central management server on certain ports.
3.  **Policy Enforcement (Cisco ISE):** Through the new SGACL integration, these recommended policies are automatically translated and pushed to Cisco ISE. ISE then uses this information to assign the device to a specific Security Group Tag (SGT) and enforces the corresponding access control list (SGACL) across the network infrastructure (switches, routers, firewalls). 

This closed-loop process ensures that security policies are not only based on deep device context but are also dynamically updated as the device's risk profile changes.

## Impact Assessment
This enhanced integration provides several key benefits for organizations struggling with connected device security:
- **Automated Risk Reduction:** It automates the difficult process of creating and maintaining network access rules for thousands of diverse devices, reducing the manual burden on security teams and minimizing the chance of human error.
- **Containment of Threats:** By enforcing least-privilege network access, microsegmentation prevents an attacker who compromises a single vulnerable IoT device from moving laterally to attack other systems on the network. This is a critical defense against ransomware and other advanced threats. This directly supports MITRE ATT&CK Mitigation **[M1030 - Network Segmentation](https://attack.mitre.org/mitigations/M1030/)**.
- **Improved Security for Unpatchable Devices:** Many IoT and OT devices cannot be easily patched. Microsegmentation provides a vital compensating control by isolating these devices and limiting their exposure, even if they remain vulnerable.
- **Actionable Intelligence:** The integration turns the 'visibility' provided by asset management into 'action' by directly linking device intelligence to enforceable security controls.

## Affected Industries
This solution is particularly valuable for industries with a high proliferation of connected devices, including:
- **Healthcare:** Securing Internet of Medical Things (IoMT) devices like infusion pumps, patient monitors, and MRI machines.
- **Manufacturing:** Protecting Operational Technology (OT) and Industrial Control Systems (ICS) on the factory floor.
- **Critical Infrastructure:** Securing IoT devices used in energy grids, water treatment facilities, and transportation systems.
- **Financial Services and Government:** Managing the growing number of IoT devices within corporate and government facilities.

**Tags:** Asimily, Cisco ISE, Microsegmentation, IoT Security, OT Security, IoMT, Network Access Control

## Sources
- [Asimily Advances Complete Cyber Asset and Exposure Management Platform with New Microsegmentation Capabilities](https://www.globenewswire.com/news-release/2026/01/15/2810057/0/en/Asimily-Advances-Complete-Cyber-Asset-and-Exposure-Management-Platform-with-New-Microsegmentation-Capabilities.html) — GlobeNewswire (2026-01-15)
- [Endpoint Security and Network Monitoring News for the Week of January 16th: Asimily, OneSpan, Infoblox, and More](https://www.solutionsreview.com/endpoint-security/endpoint-security-and-network-monitoring-news-for-the-week-of-january-16th-asimily-onespan-infoblox-and-more/) — Solutions Review (2026-01-16)
- [Asimily boosts Cisco ISE with new device microsegmentation](https://securitybrief.asia/story/asimily-boosts-cisco-ise-with-new-device-microsegmentation) — SecurityBrief Asia (2026-01-16)
- [Asimily Expands Cisco ISE Integration With SGACL-Based Microsegmentation](https://www.msspalert.com/cybersecurity-news/asimily-expands-cisco-ise-integration-with-sgacl-based-microsegmentation/) — MSSP Alert (2026-01-15)

---
Source: https://cyber.netsecops.io/articles/asimily-enhances-cyber-asset-management-with-microsegmentation-for-cisco-ise/
