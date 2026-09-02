# SCADA Hacking Tool 'TRK25' Source Code Leaked, Lowering Bar for ICS Attacks

**Severity:** high | **Category:** Industrial Control Systems,Malware,Threat Actor | **Updated:** 2026-07-04 | **Reading time:** 6 min

The source code for TRK25 ADVANCED SCADA, a Python-based tool for attacking industrial control systems (ICS), has been leaked online. The tool, originally sold by a group called 'Infrastructure Destruction Squad,' automates the discovery and compromise of exposed operational technology (OT) devices. TRK25 targets common industrial protocols like Modbus and administrative protocols like RDP and VNC, primarily by exploiting weak or default credentials. The leak significantly lowers the barrier to entry for less-skilled actors to target critical infrastructure, as the tool provides an easy-to-use interface for finding and compromising vulnerable systems like Siemens S7 HMIs.

## Executive Summary
The source code for **TRK25 ADVANCED SCADA**, a malicious tool designed for attacking Industrial Control Systems (ICS), has been leaked to the public. The tool, developed by a threat actor known as **Infrastructure Destruction Squad** (or Dark Engine), automates the process of finding and compromising internet-exposed Operational Technology (OT) assets. TRK25 focuses on exploiting weak credentials for common industrial and remote access protocols rather than zero-day vulnerabilities. The public availability of this tool's source code dramatically lowers the skill threshold required to launch attacks against critical infrastructure, creating a significant risk for any organization with internet-facing OT equipment.

## Threat Overview
TRK25 is a user-friendly hacking utility built with Python and PyQt5. It was originally sold on underground forums for approximately $500. Its purpose is to streamline attacks against ICS environments.
- **Functionality:** The tool scans for devices, fingerprints services, and attempts to compromise them using credential stuffing or default passwords.
- **Targeted Protocols:** It specifically targets common industrial protocols like Modbus (`TCP/502`) and remote administration services such as VNC (`TCP/5900`), RDP (`TCP/3389`), and SSH (`TCP/22`).
- **Target Prioritization:** TRK25 includes a scoring algorithm to prioritize high-value targets, with a specific focus on **[Siemens](https://www.siemens.com/)** S7 systems.
- **Payload:** Upon successful compromise, the tool captures screenshots from the Human-Machine Interface (HMI), collects system metadata, and exfiltrates this information to the attacker. This access is often sold to other threat actors, including ransomware groups and state-sponsored APTs.

## Technical Analysis
TRK25 automates several initial stages of an ICS attack.
- **Reconnaissance:** The tool performs broad network scanning to find exposed devices, aligning with [`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/).
- **Initial Access:** The primary access vector is [`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/) and [`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/) against exposed remote services ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)). In an ICS context, this maps to [`T0861 - Brute Force`](https://attack.mitre.org/techniques/T0861/).
- **Collection:** After gaining access, it collects data from the HMI, which is a form of [`T0882 - Screen Capture`](https://attack.mitre.org/techniques/T0882/) in the ICS framework.
- **Exfiltration:** The captured screenshots and metadata are then exfiltrated to the attacker ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).

> The danger of TRK25 is not its technical sophistication, but its automation and ease of use. It commoditizes the initial access phase of ICS attacks, enabling a wider range of adversaries to target critical infrastructure.

## Impact Assessment
The leak of TRK25's source code significantly increases the threat to under-secured industrial environments. The potential impacts include:
- **Increased Attack Volume:** Less-skilled actors can now easily scan the internet for vulnerable OT devices and attempt to compromise them.
- **Access Brokering:** Compromised access gained via TRK25 can be sold to more capable threat actors, who could then cause physical disruption, sabotage industrial processes, or deploy ransomware like EKANS or LockerGoga.
- **Safety Risks:** Unauthorized access to HMIs controlling physical processes can lead to unsafe operating conditions, potentially causing equipment damage, environmental incidents, or even loss of life.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams for industrial environments should hunt for signs of scanning and brute-force attempts. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Port | `502`, `5900`, `3389`, `22` | Monitor for a high volume of inbound connection attempts to these common industrial and admin ports from unknown IP addresses. |
| Log Source | `Authentication logs` | A spike in failed login attempts for VNC, RDP, or SSH services on an HMI or engineering workstation is a strong indicator of a brute-force attack. |
| Network Traffic Pattern | `Modbus traffic from external IPs` | Any Modbus traffic originating from the public internet is highly anomalous and should be blocked and investigated immediately. |

## Detection & Response
1.  **Network Intrusion Detection System (NIDS):** Deploy a NIDS with signatures for common industrial protocols. Configure it to alert on any communication attempts from the internet to OT network segments. This is a core part of D3FEND's [**Network Traffic Analysis (D3-NTA)**](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **Authentication Log Monitoring:** Centralize and monitor authentication logs from all remote access services. Use a SIEM to create alerts for high rates of failed logins from a single source IP.
3.  **Asset Inventory:** Maintain a complete and accurate inventory of all internet-facing devices. Regularly scan your public IP space to identify any accidentally exposed OT assets.

## Mitigation
Basic cybersecurity hygiene is the most effective defense against tools like TRK25.
1.  **Eliminate Internet Exposure:** The most critical mitigation is to ensure that no ICS/OT devices, especially HMIs and PLCs, are directly accessible from the internet. Use a properly configured firewall and a DMZ for any necessary remote access. This is a form of [**Network Isolation (D3-NI)**](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
2.  **Strong Credentials:** Immediately change all default passwords on ICS devices and enforce a strong, unique password policy for all accounts. This directly counters the tool's primary attack method and aligns with [**Strong Password Policy (D3-SPP)**](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy).
3.  **Network Segmentation:** Implement robust network segmentation between IT and OT networks to prevent attackers from pivoting from a compromised IT system to the industrial environment ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
4.  **Multi-Factor Authentication (MFA):** Where possible, enable MFA for all remote access to the OT network to provide a critical layer of defense against credential stuffing ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).

**Tags:** ICS, SCADA, TRK25, Source Code Leak, Hacking Tool, Critical Infrastructure, OT Security, Modbus

## Sources
- [TRK25 SCADA Malware: Industrial Security Risk Analysis](https://femtosec.io/threat-intelligence/trk25-advanced-scada-malware-industrial-threat) — FemtoSec (2026-07-03)
- [Hacktivists and cybercriminals expand attacks on ICS, OT, and AI systems across critical infrastructure](https://industrialcyber.co/reports/hacktivists-and-cybercriminals-expand-attacks-on-ics-ot-and-ai-systems-across-critical-infrastructure/) — Industrial Cyber (2026-01-20)
- [Hacktivist Attacks On Critical Infrastructure Surge In Q3 2025](https://cyble.com/blog/hacktivist-attacks-critical-infrastructure-q3-2025/) — Cyble (2025-10-31)

---
Source: https://cyber.netsecops.io/articles/scada-hacking-tool-trk25-source-code-leaked-online/
