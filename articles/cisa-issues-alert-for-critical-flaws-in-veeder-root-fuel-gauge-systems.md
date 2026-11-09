# CISA Warns of Critical Flaws in Global Fuel Gauge Systems, Risking Infrastructure Disruption

**Severity:** critical | **Category:** Industrial Control Systems,Vulnerability,Patch Management | **Updated:** 2025-10-28 | **Reading time:** 5 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued a critical advisory for two vulnerabilities in Veeder-Root's TLS4B Automatic Tank Gauge (ATG) systems, which are used globally to monitor fuel levels. The most severe flaw, CVE-2025-58428, has a CVSS score of 9.9 and could allow a remote, authenticated attacker to execute system-level commands, potentially causing widespread disruption to fuel infrastructure. A second flaw, CVE-2025-55067, relates to the 'Year 2038' problem and could cause denial-of-service conditions.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has released a security advisory highlighting two severe vulnerabilities in **Veeder-Root**'s TLS4B Automatic Tank Gauge (ATG) System, a critical component used worldwide in the energy sector to monitor fuel storage tanks. The most critical of these flaws, **[CVE-2025-58428](https://www.cve.org/CVERecord?id=CVE-2025-58428)**, is a command injection vulnerability rated 9.9 on the CVSS scale. It could allow a remote attacker with valid credentials to gain full control of the industrial control system (ICS), creating risks of fuel supply disruption, inaccurate inventory, and potential safety hazards. A second flaw, **[CVE-2025-55067](https://www.cve.org/CVERecord?id=CVE-2025-55067)**, is an integer overflow issue tied to the Y2038 epoch rollover that could lead to a denial-of-service. Veeder-Root has released a patch for the critical command injection flaw, and CISA is urging all affected organizations to take immediate action.

---

## Vulnerability Details

### CVE-2025-58428: Command Injection (CVSS 9.9 - Critical)
This vulnerability, discovered by researchers at Bitsight, exists in the SOAP-based web services interface of the TLS4B system. An authenticated attacker can send a specially crafted request to inject and execute arbitrary commands on the underlying Linux operating system with root privileges. The low complexity of exploitation, combined with the potential for full system takeover, contributes to its near-maximum severity score. A successful exploit could allow an attacker to manipulate fuel level readings, disable leak detection alarms, or disrupt fuel dispensing operations.

### CVE-2025-55067: Integer Overflow (CVSS 7.1 - High)
This flaw is a manifestation of the 'Year 2038 problem,' where systems using 32-bit signed integers to store Unix time will experience an overflow on January 19, 2038. When the system clock reaches this date, it will reset to December 13, 1901. This time manipulation can cause critical functions to fail, including authentication mechanisms and leak detection algorithms. It can also be triggered prematurely by an attacker to induce a denial-of-service (DoS) condition, potentially locking administrators out of the system.

## Affected Systems
- **CVE-2025-58428:** All versions of the Veeder-Root TLS4B Automatic Tank Gauge System prior to Version 11.A.
- **CVE-2025-55067:** All versions of the Veeder-Root TLS4B Automatic Tank Gauge System. A patch is still in development.

These systems are deployed globally at gas stations, airports, and other facilities that manage large quantities of fuel.

## Exploitation Status
There is no known public exploitation of these vulnerabilities at this time. However, given their severity and the criticality of the affected systems, they are attractive targets for both cybercriminals and nation-state actors.

## Impact Assessment
Compromise of a TLS4B ATG system could have significant consequences:
- **Operational Disruption:** Attackers could halt fuel dispensing or manipulate inventory data, causing supply chain disruptions.
- **Financial Loss:** Inaccurate readings could lead to theft or mismanagement of fuel, a valuable commodity.
- **Safety and Environmental Hazards:** Disabling leak detection or other safety alarms could result in undetected fuel spills, posing serious environmental and safety risks.
- **Denial of Service:** The integer overflow flaw could render the system inoperable, requiring manual intervention and causing significant downtime.

## Cyber Observables for Detection

| Type                   | Value                                      | Description                                                                                                                            |
|:-----------------------|:-------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------|
| url_pattern            | SOAP web service endpoints                 | Monitor for unusual or malformed requests to the device's web interface, particularly any that contain shell metacharacters (`|`, `&`, `;`). |
| command_line_pattern   | Shell commands spawned by web service process | On the device, monitor the web server process for any child processes corresponding to shell commands (`sh`, `bash`, `ls`, `cat`, etc.).     |
| log_source             | System clock logs                          | Anomalous, large jumps in the system time, especially to dates in the past like 1901, are a direct indicator of CVE-2025-55067 abuse. |

## Detection Methods
- **Vulnerability Scanning:** Use network scanners with ICS/OT capabilities to identify vulnerable Veeder-Root systems on the network.
- **Log Analysis:** Review web service and system logs on TLS4B devices for evidence of command injection attempts or anomalous time changes.
- **Network Traffic Analysis:** As recommended by CISA, monitor network traffic for any attempts to access these devices from untrusted networks. Employ [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to detect suspicious connections.

## Remediation Steps
Veeder-Root and CISA have provided the following recommendations:

1.  **Update Firmware:** Immediately upgrade all TLS4B systems to **Version 11.A** or later to remediate the critical command injection vulnerability (CVE-2025-58428).
2.  **Network Segmentation:** Isolate control system networks and devices from business networks. These systems should never be directly accessible from the internet.
3.  **Secure Remote Access:** If remote access is required, use a secure method such as a **[Virtual Private Network (VPN)](https://en.wikipedia.org/wiki/Virtual_private_network)** with strong authentication.
4.  **Monitor for Y2038:** For CVE-2025-55067, organizations should be aware of the 2038 deadline and plan for the eventual patch release from Veeder-Root. In the interim, monitor system clocks for unexpected changes.
5.  **D3FEND Countermeasures:**
    -   Apply [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) as the primary remediation for CVE-2025-58428.
    -   Utilize [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) as a critical compensating control for all ICS/OT devices.

## CVEs
- CVE-2025-58428 (CVSS 9.9)
- CVE-2025-55067 (CVSS 7.1)

**Tags:** ICS, OT, CISA, Veeder-Root, Critical Infrastructure, Energy Sector, Command Injection, Y2038

## Sources
- [CISA Alerts on Critical Veeder-Root Flaws Allowing Attackers to Execute System Commands](https://gbhackers.com/cisa-alerts-on-critical-veeder-root-flaws/) — GBHackers (2025-10-28)
- [Veeder-Root TLS4B Automatic Tank Gauge System](https://www.cisa.gov/news-events/ics-advisories/icsa-25-296-03) — CISA (2025-10-23)
- [CISA Warns Of Critical Veeder-Root Vulnerabilities Let Attackers Execute System-level Commands](https://cybersecuritynews.com/cisa-warns-of-critical-veeder-root-vulnerabilities/) — Cybersecurity News (2025-10-28)
- [CISA Warns: Critical Veeder-Root TLS4B RCE (CVE-2025-58428) Exposes Tank Gauge Systems to Command Injection](https://www.u-cyber.com/news/cisa-warns-critical-veeder-root-tls4b-rce-cve-2025-58428-exposes-tank-gauge-systems-command-injection) — U-Cyber (2025-10-28)

---
Source: https://cyber.netsecops.io/articles/cisa-issues-alert-for-critical-flaws-in-veeder-root-fuel-gauge-systems/
