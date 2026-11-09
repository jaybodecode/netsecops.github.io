# Hundreds of Unauthenticated ICS Devices, Including for Power Grids, Found Exposed Online

**Severity:** high | **Category:** Industrial Control Systems,Vulnerability,Threat Intelligence | **Updated:** 2026-04-11 | **Reading time:** 5 min

New research from Comparitech reveals a startling lack of security in critical infrastructure, with at least 179 industrial control system (ICS) devices found exposed to the internet without any authentication. These devices, using the insecure-by-design Modbus protocol on its default port, are tied to critical entities including a national railway and two national power grids. The findings reinforce urgent warnings from government agencies about the growing threat of nation-state actors targeting operational technology (OT) and highlight a severe visibility gap, with fewer than 10% of OT networks having adequate monitoring.

## Executive Summary

Research conducted by technology evaluation firm **Comparitech** has uncovered at least 179 Industrial Control System (ICS) devices directly exposed to the public internet and configured to communicate using the insecure **Modbus** protocol without any form of authentication. These vulnerable systems are linked to highly critical entities, including a national railway and two national power grids, making them prime targets for disruption by malicious actors. The findings, which likely represent only a fraction of the total exposure, corroborate recent government warnings about nation-state adversaries targeting Operational Technology (OT). The research highlights a critical failure in security fundamentals and a pervasive lack of visibility, as noted by cybersecurity firm **[Dragos](https://www.dragos.com/)**, which estimates that over 90% of global OT networks lack the necessary monitoring to detect such threats.

---

## Threat Overview

**What Was Found:** The research identified 179 ICS devices (e.g., PLCs, RTUs) accessible from the internet that were actively listening for connections on `TCP port 502`, the default port for the Modbus protocol. 

**The Core Vulnerability:** Modbus is a serial communications protocol developed in 1979. Its common implementation over TCP/IP (`Modbus/TCP`) lacks any native security features like authentication or encryption. This means that anyone who can connect to the device on port 502 can send it valid commands, such as:
- Reading the device's status (coils and registers).
- Writing new values to the device, effectively changing its operational parameters.
- Forcing the device to restart or stop its process.

**Who's Affected:** The exposed devices were linked to critical infrastructure sectors globally, with specific mentions of:
- A national railway system.
- Two national power grids.

**Impact:** A successful attack on one of these devices could have severe physical consequences. An attacker could shut down a section of a power grid, change a railway switch, or disrupt a manufacturing process, leading to blackouts, accidents, or significant economic damage. This direct exposure allows attackers to bypass the traditional attack path of compromising an IT network first and then pivoting to the OT network.

---

## Technical Analysis

The vulnerability is not a software flaw in the traditional sense, but a critical architectural and configuration failure. The protocol is working as designed; the failure is in connecting a non-authenticated protocol to the world's most hostile network.

### Tactics, Techniques, and Procedures (TTPs) of a Potential Attacker

1.  **Reconnaissance ([`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/)):** Attackers use tools like Shodan, Censys, or masscan to search the entire internet for devices responding on `TCP port 502`.
2.  **Initial Access ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)):** The 'application' in this case is the Modbus service itself. Access is gained simply by connecting to the open port.
3.  **Discovery ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)):** Once connected, an attacker can send Modbus 'read' commands to query all available data points on the device, effectively mapping out its function and the process it controls.
4.  **Impact ([`T0829 - Control Device`](https://attack.mitre.org/techniques/T0829/)):** After discovery, the attacker can send Modbus 'write' commands to alter the device's configuration, shut it down, or manipulate its process, leading to a physical impact.

> The simplicity of this attack is what makes it so dangerous. It requires no exploit code, no zero-days, and no sophisticated tools—just a basic understanding of the Modbus protocol and the IP address of a target.

---

## Impact Assessment

The business impact of exploiting one of these exposed devices ranges from severe to catastrophic. For a national power grid, it could mean widespread blackouts, economic disruption, and even civil unrest. For a railway, it could lead to collisions or derailments, resulting in loss of life. The research from Comparitech, while focused on a small number of devices, points to a systemic problem. The lack of OT network visibility reported by Dragos means that most organizations are likely unaware of these exposures, making them ticking time bombs in the face of increased nation-state interest in targeting critical infrastructure.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| `port` | `502` | Default Modbus/TCP port. Any unsolicited inbound traffic from the internet to this port is a critical security finding. |
| `url_pattern` | `Shodan search: port:502` | Organizations should be proactively running searches like this, scoped to their own IP ranges, to find and remediate exposures. |
| `network_traffic_pattern` | `Internet -> DMZ -> OT Network on Port 502` | Even in a segmented network, allowing Modbus traffic from the internet into the OT environment is a high-risk configuration that should be eliminated. |
| `log_source` | `Perimeter Firewall Logs` | Regularly review logs for any traffic, allowed or denied, on port 502. Allowed traffic is a critical misconfiguration; denied traffic indicates active scanning by adversaries. |

---

## Detection & Response

- **Detection:** The primary detection method is proactive asset discovery and vulnerability scanning. Organizations must scan their own external-facing IP address space for open OT ports like `502` (Modbus), `44818` (EtherNet/IP), and `102` (S7comm). This is not an intrusion detection problem; it's a security hygiene problem. **(D3FEND Technique: [`D3-VSS: Vulnerability Scan Scrutiny`](https://d3fend.mitre.org/technique/d3f:VulnerabilityScanScrutiny))**
- **Response:** If an exposed device is found:
    1.  Immediately implement a firewall rule to block all internet access to the affected port and IP address.
    2.  Investigate the device and its logs (if available) to determine if it has been accessed or manipulated by unauthorized parties.
    3.  Develop a long-term plan to move the device behind a secure remote access solution, such as a VPN, if external access is required.

---

## Mitigation

1.  **Network Isolation:** As with all ICS/OT security, the number one priority is to ensure these devices are not on the public internet. Isolate the OT network from all other networks. **(MITRE Mitigation: [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**
2.  **Deny by Default:** Implement a default-deny firewall policy at the IT/OT boundary. No traffic should pass unless it is explicitly allowed, and no traffic should ever be allowed directly from the internet to the OT network.
3.  **Use Secure Protocols or Wrappers:** When possible, use more secure protocols. If legacy protocols like Modbus must be used, encapsulate them in a secure, authenticated, and encrypted tunnel (e.g., IPSec VPN). **(D3FEND Countermeasure: Encrypted Tunnels)**
4.  **Continuous Monitoring:** Implement continuous asset discovery and security monitoring for the OT environment to gain the visibility that most organizations currently lack. This allows for rapid detection of new, unauthorized, or misconfigured devices.

**Tags:** ICS, OT Security, Modbus, Comparitech, Critical Infrastructure, Vulnerability, Power Grid

## Sources
- [Industrial Controllers Still Vulnerable As Conflicts Move to Cyber](https://www.darkreading.com/ics-ot-security/industrial-controllers-still-vulnerable-as-conflicts-move-to-cyber) — Dark Reading (2026-04-10)
- [Internet-exposed ICS devices running insecure Modbus leave critical infrastructure open to disruption, Comparitech finds](https://www.industrialcyber.co/news/internet-exposed-ics-devices-running-insecure-modbus-leave-critical-infrastructure-open-to-disruption-comparitech-finds/) — Industrial Cyber (2026-04-10)

---
Source: https://cyber.netsecops.io/articles/hundreds-of-unauthenticated-industrial-control-devices-exposed-on-internet/
