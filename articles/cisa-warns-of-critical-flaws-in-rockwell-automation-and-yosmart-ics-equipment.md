# CISA Warns of Critical Flaws in Rockwell & YoSmart ICS Equipment

**Severity:** high | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2026-01-14 | **Reading time:** 4 min

CISA has released several Industrial Control Systems (ICS) advisories, warning of significant vulnerabilities in widely deployed equipment from Rockwell Automation and YoSmart. A high-severity SQL injection flaw (CVE-2025-12807) in Rockwell's FactoryTalk platform could allow for database takeover, while another flaw (CVE-2025-9368) can cause a denial-of-service condition. Separately, multiple flaws in YoSmart smart home hubs could permit remote device control and data interception, posing risks to both manufacturing and communications sectors.

## Executive Summary
The U.S. Cybersecurity and Infrastructure Security Agency (**[CISA](https://www.cisa.gov)**) has published a series of important advisories for Industrial Control Systems (ICS), bringing attention to vulnerabilities in products from **[Rockwell Automation](https://www.rockwellautomation.com/)** and **YoSmart**. These flaws pose a significant risk to organizations in the Critical Manufacturing and Communications sectors. The advisories detail a high-severity SQL injection vulnerability (**CVE-2025-12807**) in Rockwell's FactoryTalk DataMosaix Private Cloud, a denial-of-service flaw (**CVE-2025-9368**) in its GuardLink EtherNet/IP Interface, and multiple critical vulnerabilities in YoSmart's YoLink Smart Hub ecosystem that could allow for complete device takeover and data interception. Owners of this equipment are urged to review the advisories and apply patches or mitigations immediately.

## Vulnerability Details

### Rockwell Automation Vulnerabilities
1.  **CVE-2025-12807 - SQL Injection (CVSS 8.8 - High)**
    -   **Affected Product:** FactoryTalk DataMosaix Private Cloud versions 7.11, 8.00, and 8.01.
    -   **Description:** A SQL injection vulnerability that can be exploited by an unauthenticated attacker. Successful exploitation could allow the attacker to execute unauthorized SQL commands, potentially leading to data exfiltration, modification, or a full compromise of the database.
    -   **Attack Vector:** The attack is executed remotely and requires no user interaction.

2.  **CVE-2025-9368 - Denial of Service (CVSS 7.5 - High)**
    -   **Affected Product:** 432ES-IG3 Series A GuardLink EtherNet/IP Interface.
    -   **Description:** A resource allocation vulnerability. An attacker can send specially crafted packets to the device, causing it to enter a denial-of-service (DoS) state. The device becomes unresponsive and requires a manual power cycle to restore functionality.
    -   **Remediation:** Rockwell Automation has released firmware version V2.001.9 to address this issue.

### YoSmart Vulnerabilities
CISA's advisory for YoSmart products, which are used in the global communications sector, details several vulnerabilities discovered by researcher Nick Cerne of **Bishop Fox**.
-   **Affected Products:** YoLink Smart Hub, YoLink mobile application, and the backend YoSmart server.
-   **CVEs:** `CVE-2025-59449`, `CVE-2025-59451` (Server), `CVE-2025-59452` (Smart Hub), `CVE-2025-59448` (Mobile App).
-   **Description:** The combination of these vulnerabilities could allow a threat actor to achieve a full compromise of a user's smart home environment. According to CISA, successful exploitation could allow an attacker to "remotely control other users' smart home devices, intercept sensitive data, and hijack sessions."

## Impact Assessment
The vulnerabilities present distinct but serious risks to industrial and commercial environments:
-   The Rockwell FactoryTalk SQL injection flaw (**CVE-2025-12807**) could lead to the theft or manipulation of sensitive operational data, impacting production processes and business intelligence in manufacturing environments.
-   The GuardLink DoS flaw (**CVE-2025-9368**) could disrupt safety-critical processes on a factory floor. Since GuardLink is used to connect safety devices, a DoS attack could shut down production lines or, in a worst-case scenario, create an unsafe operating condition.
-   The YoSmart vulnerabilities represent a significant privacy and security risk. An attacker could control smart locks, sensors, and other devices, enabling physical intrusion, surveillance, or further network-based attacks.

## Detection Methods
-   **Network Traffic Analysis:** For **CVE-2025-9368**, monitor for an unusual volume of traffic directed at GuardLink devices. For the Rockwell SQLi flaw, inspect traffic to the FactoryTalk server for suspicious SQL syntax using a Web Application Firewall (WAF) or Network Intrusion Detection System (NIDS). This aligns with [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
-   **Log Analysis:** Review FactoryTalk application and database logs for malformed SQL queries or access attempts from unauthorized IP addresses.
-   **Asset Inventory:** Maintain a detailed inventory of all ICS/OT and IoT devices on the network to quickly identify affected Rockwell and YoSmart products.

## Remediation Steps
1.  **Apply Patches:** Asset owners should immediately apply the patches and firmware updates provided by the vendors. Rockwell has released a new version for the GuardLink interface, and users of FactoryTalk should contact Rockwell for remediation guidance. YoSmart users should ensure their mobile app and hub firmware are updated to the latest versions.
2.  **Network Segmentation:** As a critical compensating control, isolate ICS and IoT networks from corporate IT and the internet. Restrict access to affected devices to only authorized personnel and systems. This is a primary recommendation for all industrial environments and is a key part of [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
3.  **Minimize Exposure:** Do not expose ICS or IoT management interfaces directly to the internet. Access should be managed through a secure VPN with multi-factor authentication.
4.  **Monitor and Audit:** Implement continuous monitoring of ICS networks to detect anomalous activity that could indicate an attempted or successful exploitation.

## CVEs
- CVE-2025-12807 (CVSS 8.8)
- CVE-2025-9368 (CVSS 7.5)
- CVE-2025-59449
- CVE-2025-59451
- CVE-2025-59452
- CVE-2025-59448

**Tags:** ICS, SCADA, CISA, Rockwell Automation, YoSmart, Vulnerability, SQL Injection, DoS

## Sources
- [CISA issues multiple ICS advisories, details DoS vulnerability risk in Rockwell devices used in critical manufacturing](https://industrialcyber.co/news/cisa-issues-multiple-ics-advisories-details-dos-vulnerability-risk-in-rockwell-devices-used-in-critical-manufacturing/) — Industrial Cyber (2026-01-14)
- [Cybersecurity Alerts & Advisories](https://www.cisa.gov/news-events/cybersecurity-advisories) — CISA (2026-01-14)

---
Source: https://cyber.netsecops.io/articles/cisa-warns-of-critical-flaws-in-rockwell-automation-and-yosmart-ics-equipment/
