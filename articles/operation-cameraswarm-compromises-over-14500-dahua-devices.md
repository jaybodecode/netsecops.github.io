# Over 14,500 Dahua Cameras Compromised in 'Operation CameraSwarm'

**Severity:** high | **Category:** IoT Security,Cyberattack,Vulnerability | **Updated:** 2026-08-20 | **Reading time:** 5 min

A hacking campaign dubbed "Operation CameraSwarm" compromised over 14,500 Dahua IP cameras and NVRs in a 35-day period, primarily in Ukraine and Russia. Researchers at Hunt.io discovered the campaign after the attacker left tools and logs on an exposed server. The operation used a combination of brute-force attacks on port 37777, exploitation of two known authentication-bypass vulnerabilities (CVE-2021-33044 and CVE-2021-33045), and a novel abuse of Dahua's P2P cloud service to compromise devices behind NAT.

## Executive Summary
Researchers at **Hunt.io** have uncovered a large-scale hacking campaign, named "Operation CameraSwarm," that compromised at least 14,530 **[Dahua](https://www.dahuasecurity.com/)**-manufactured surveillance devices between June and July 2026. The campaign, discovered via an operational security failure by the attacker, utilized a multi-pronged strategy involving brute-force attacks, exploitation of known vulnerabilities, and abuse of Dahua's P2P cloud architecture. The compromised devices, mostly IP cameras and Network Video Recorders (NVRs), were concentrated in Ukraine and Russia. The attack highlights the persistent risks associated with internet-exposed IoT devices, especially those with weak credentials or unpatched firmware.

## Threat Overview
The threat actor behind Operation CameraSwarm systematically targeted Dahua devices using three distinct methods. The campaign's details were exposed when the attacker left a working directory containing exploit scripts, logs, and compromised device lists on an open HTTP server. The compromised devices can be leveraged for various malicious purposes, including serving as a proxy network, launching DDoS attacks, or as a pivot point for deeper intrusions into connected corporate networks.

**Attack Vectors:**
1.  **Brute-Force Attack:** The most effective method, compromising 12,324 devices by targeting default or weak credentials on TCP port `37777`.
2.  **Vulnerability Exploitation:** The attacker used a tool named `p2pwn` to exploit two critical authentication-bypass flaws, **[CVE-2021-33044](https://nvd.nist.gov/vuln/detail/CVE-2021-33044)** and **[CVE-2021-33045](https://nvd.nist.gov/vuln/detail/CVE-2021-33045)**. This method compromised 1,923 cameras and installed a persistent backdoor account.
3.  **P2P Architecture Abuse:** A novel technique allowed the attacker to connect to 283 devices behind NAT firewalls by abusing Dahua's P2P cloud relay service, using only the device serial numbers.

## Technical Analysis
The attacker's toolkit, found on the exposed server at `154.86.119.60`, provided clear insight into their TTPs.

- **Reconnaissance:** The attacker used `masscan` to perform broad scans for open TCP port `37777`, the default port for Dahua devices. This is an example of [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/).
- **Initial Access (Brute Force):** A primary script attempted to log in using a list of common and default credentials, a classic [`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/) technique against an exposed service.
- **Initial Access (Exploitation):** The `p2pwn` tool exploited **CVE-2021-33044** and **CVE-2021-33045**. These vulnerabilities allow an attacker to bypass authentication and create a new admin-level user account. This is a direct application of [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).
- **Persistence:** The `p2pwn` tool created a backdoor user account named `p2pwn` with the password `p2password`. On many firmware versions, this account would persist even after a factory reset, demonstrating [`T1098 - Account Manipulation`](https://attack.mitre.org/techniques/T1098/).
- **Command and Control:** The abuse of the P2P relay service to connect to devices behind NAT represents a creative use of [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/) and abuse of a legitimate protocol for C2.

### MITRE ATT&CK Techniques
- [`T1110 - Brute Force`](https://attack.mitre.org/techniques/T1110/)
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)
- [`T1098 - Account Manipulation`](https://attack.mitre.org/techniques/T1098/)
- [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/)

## Impact Assessment
The compromise of over 14,500 cameras creates a significant botnet that can be used for malicious activities. For the owners of these devices, the immediate impact is a loss of privacy and the potential for espionage. For the broader internet community, these devices can be used to launch large-scale DDoS attacks, act as proxies to anonymize other criminal activities, and serve as initial access points into more secure corporate or home networks. The persistence of the backdoor account makes remediation difficult for non-technical users.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `154.86.119.60` | Exposed HTTP server hosting attacker's tools and logs. |
| user_agent | `p2pwn` | Username of the backdoor account created by the exploit tool. |
| other | `p2password` | Password for the backdoor `p2pwn` account. |

## Cyber Observables — Hunting Hints
Organizations using Dahua devices should hunt for the following indicators:

| Type | Value | Description |
|---|---|---|
| Port | `37777` | Inbound connection attempts to the default Dahua management port from unknown IPs. |
| User Account Pattern | `p2pwn` | Presence of an unauthorized user account with this name in the device's user list. |
| Log Source | Dahua device system logs | Look for multiple failed login attempts followed by a success from an unknown IP, or logs showing the creation of the `p2pwn` user. |
| Network Traffic Pattern | Outbound connections from cameras to unusual destinations | May indicate use of the camera as part of a botnet or proxy. |

## Detection & Response
- **User Account Auditing:** Regularly audit user accounts on all Dahua devices. Immediately remove any unauthorized accounts, especially one named `p2pwn`. This aligns with **[D3-LAM: Local Account Monitoring](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)**.
- **Network Monitoring:** Monitor for and alert on inbound connection attempts to TCP port `37777` from the internet. If the port must be exposed, restrict access to a small set of known-good IP addresses.
- **Vulnerability Scanning:** Scan for devices vulnerable to **CVE-2021-33044** and **CVE-2021-33045**. Both are included in CISA's KEV catalog and should be prioritized for remediation.

## Mitigation
- **Firmware Updates:** Immediately update all Dahua devices to the latest firmware version to patch **CVE-2021-33044** and **CVE-2021-33045**. This is a critical step of **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
- **Credential Hardening:** Change all default passwords to strong, unique passwords. Disable any default accounts that are not needed. This aligns with **[M1027 - Password Policies](https://attack.mitre.org/mitigations/M1027/)**.
- **Network Isolation:** Do not expose camera management interfaces directly to the internet. Place them on a segmented network and use a secure VPN with MFA for remote access. This is an application of **[M1035 - Limit Access to Resource Over Network](https://attack.mitre.org/mitigations/M1035/)**.
- **Factory Reset and Re-flash:** For devices suspected of compromise, a factory reset followed by a manual firmware re-flash is recommended to ensure removal of any persistent backdoors.

## CVEs
- CVE-2021-33044 — CISA KEV
- CVE-2021-33045 — CISA KEV

**Tags:** Dahua, IoT, CameraSwarm, Brute Force, CVE-2021-33044, CVE-2021-33045, Botnet

## Sources
- [Hackers compromise 14,500 Dahua web cameras in 35-day campaign](https://www.bleepingcomputer.com/news/security/hackers-compromise-14-500-dahua-web-cameras-in-35-day-campaign/) — BleepingComputer (2026-08-19)
- [Hackers Compromised 14,500+ Dahua Devices Using Credential Attacks, Auth Bypasses, and P2P](https://thehackernews.com/2026/08/hackers-compromised-14500-dahua-devices.html) — The Hacker News (2026-08-19)
- [Inside Operation CameraSwarm: How One Actor Took Over 14,000 Dahua Cameras](https://securityaffairs.com/197527/iot/inside-operation-cameraswarm-how-one-actor-took-over-14000-dahua-cameras.html) — Security Affairs (2026-08-19)
- [Operation CameraSwarm: 14,500+ Dahua Devices Compromised via Credential Attacks, Auth Bypasses, and P2P Relay — Detection and Hardening Guide](https://securityarsenal.com/blog/operation-cameraswarm-14500-dahua-devices-compromised-via-credential-attacks-auth-bypasses-and-p2p-relay-detection-and-hardening-guide) — Security Arsenal (2026-08-19)
- [14K+ Dahua cameras across Ukraine and Russia compromised; Slovakia found backdoor in traffic speed cameras](https://www.cybersecurity-help.cz/blog/5575.html) — Cybersecurity Help CZ (2026-08-19)

---
Source: https://cyber.netsecops.io/articles/operation-cameraswarm-compromises-over-14500-dahua-devices/
