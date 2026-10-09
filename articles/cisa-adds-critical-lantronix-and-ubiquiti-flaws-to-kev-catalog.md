# CISA Mandates Urgent Patching for Actively Exploited Flaws in Lantronix and Ubiquiti Devices

**Severity:** critical | **Category:** Vulnerability,Threat Intelligence,Industrial Control Systems | **Updated:** 2026-06-25 | **Reading time:** 6 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added four critical vulnerabilities affecting Lantronix EDS5000 device servers and Ubiquiti UniFi OS to its Known Exploited Vulnerabilities (KEV) catalog. The flaws, including a 9.8 CVSS command injection in Lantronix and a 10.0 CVSS chain in Ubiquiti, allow for unauthenticated remote code execution and full system compromise. CISA has issued a directive for federal agencies to apply patches by June 26, 2026, highlighting the severe and immediate risk these flaws pose to both enterprise and Operational Technology (OT) networks.

## Executive Summary
On June 24, 2026, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** added four critical vulnerabilities affecting **[Lantronix](https://www.lantronix.com/)** and **[Ubiquiti](https://www.ui.com/)** networking equipment to its Known Exploited Vulnerabilities (KEV) catalog. This action confirms that threat actors are actively exploiting these flaws in the wild. The vulnerabilities include **CVE-2025-67038**, a 9.8 CVSS score command injection flaw in Lantronix EDS5000 series devices, and a chain of three flaws (**CVE-2026-34908**, **CVE-2026-34909**, **CVE-2026-34910**) in Ubiquiti UniFi OS, which collectively achieve a 10.0 CVSS score for unauthenticated remote code execution. Given the active exploitation and the critical role these devices play in network infrastructure, CISA has mandated that Federal Civilian Executive Branch (FCEB) agencies patch these vulnerabilities by June 26, 2026. This advisory underscores the urgent need for all organizations using these products to take immediate remedial action to prevent system compromise.

---

## Vulnerability Details

### Lantronix EDS5000 Series: CVE-2025-67038
This **critical vulnerability** (CVSS 9.8) is a command injection flaw within the HTTP RPC module of Lantronix EDS5000 series serial-to-IP device servers. Research from **[Forescout](https://www.forescout.com/)**'s Vedere Labs, part of their "BRIDGE:BREAK" study, revealed that the application insecurely concatenates a username into a shell command when logging failed authentication attempts. An unauthenticated, remote attacker can craft a malicious username containing shell commands. When an authentication attempt with this username fails, the server executes the injected commands with `root` privileges. This provides the attacker with complete control over the device.

### Ubiquiti UniFi OS: CVE-2026-34908, CVE-2026-34909, CVE-2026-34910
This set of three vulnerabilities, when chained together, allows for unauthenticated remote code execution with a maximum CVSS score of 10.0. The attack chain works as follows:
1.  **`CVE-2026-34908` (Improper Access Control):** Allows an attacker to bypass authentication checks.
2.  **`CVE-2026-34909` (Path Traversal):** Enables the authenticated (or bypass-authenticated) attacker to read and write arbitrary files on the system.
3.  **`CVE-2026-34910` (Improper Input Validation):** Allows the attacker to inject malicious commands, which can be executed via the file write capability from the path traversal flaw.

Together, these flaws enable a remote attacker to gain a reverse shell with `root` privileges, effectively taking full control of the UniFi OS device.

---

## Technical Analysis
Threat actors are leveraging these vulnerabilities to establish initial access and persistence within target networks. The attack patterns align with common tactics for compromising edge devices.

### Lantronix Attack Vector
The exploitation of `CVE-2025-67038` is a classic example of [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). The attacker sends a crafted HTTP request to the device's web interface, targeting the login function. The username field is the injection point. For example, a username like `';/bin/sh -c "<malicious_command>";'` would be executed by the system's shell. This allows for direct [`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059/004/) execution.

### Ubiquiti Attack Vector
The Ubiquiti exploit chain is more complex, demonstrating a multi-stage compromise. After bypassing authentication, attackers use the path traversal flaw to write a script or webshell to a predictable location on the device. They then use the input validation flaw to trigger the execution of this script. Reports of attackers creating rogue administrator accounts suggest a post-exploitation objective of [`T1078.001 - Valid Accounts: Default Accounts`](https://attack.mitre.org/techniques/T1078/001/) or creating new local accounts for persistence.

---

## Impact Assessment
The impact of compromising these devices is severe. Lantronix EDS5000 servers are often used as communication bridges in Industrial Control Systems (ICS) and Operational Technology (OT) environments. A breach could lead to disruption of physical processes, data exfiltration from sensitive industrial networks, or serve as a pivot point for wider attacks on corporate infrastructure. The potential for physical disruption elevates the risk beyond typical IT security incidents.

Ubiquiti UniFi devices are central management points for enterprise networks, controlling Wi-Fi, switching, and routing. A compromise of a UniFi controller grants an attacker a god-like view of the network, enabling widespread lateral movement, man-in-the-middle attacks, and deployment of ransomware across the entire organization. The reported creation of rogue admin accounts confirms that attackers are establishing long-term persistence, making remediation more difficult.

---

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| `url_pattern` | `POST /` with unusual `username` field | For Lantronix, monitor HTTP POST requests to the login page for shell metacharacters (e.g., `;`, `|`, `&`, `$(`, `` ` ``) in the username parameter. |
| `log_source` | `Lantronix device logs` | Review authentication failure logs on EDS5000 devices for usernames containing command syntax. |
| `process_name` | `sh`, `bash`, `wget`, `curl` | On Lantronix devices, look for unexpected child processes spawned by the web server process. |
| `log_source` | `UniFi OS logs` | Monitor for the creation of new administrator accounts, especially those created outside of normal business hours or by an unfamiliar source IP. |
| `file_path` | `/tmp/`, `/var/tmp/` | On UniFi devices, monitor for unexpected file creation or modification in temporary directories by the web server user. |
| `network_traffic_pattern` | `Outbound connections from UniFi device` | Look for unexpected outbound connections (e.g., reverse shells) from the UniFi device to external IP addresses. |

---

## Detection & Response
Security teams should prioritize detection of both exploitation attempts and post-compromise activity.

*   **Network Traffic Analysis (D3-NTA):** Implement network monitoring to detect anomalous traffic to and from Lantronix and Ubiquiti devices. For Lantronix, create rules to alert on HTTP requests containing shell metacharacters in POST bodies. For Ubiquiti, baseline normal administrative traffic and alert on connections from untrusted IP ranges or attempts to establish outbound connections.
*   **Log Analysis:** Forward logs from these devices to a central SIEM. For Lantronix, search for failed login events with suspicious usernames. For Ubiquiti, create alerts for `User Account Creation` events, especially for administrative accounts.
*   **File Integrity Monitoring:** If possible, deploy file integrity monitoring on Ubiquiti devices to detect the creation of unauthorized files or webshells in web-accessible directories.
*   **Incident Response:** If a compromise is suspected, immediately isolate the affected device from the network to prevent lateral movement. Preserve logs, memory dumps, and disk images for forensic analysis. Assume any credentials stored on or passed through the device are compromised and initiate a full credential rotation.

---

## Mitigation
Immediate patching is the most effective mitigation. However, if that is not possible, compensating controls are critical.

1.  **Patch Immediately:** Apply the latest firmware updates from Lantronix and Ubiquiti that address these vulnerabilities. This is the primary and most effective mitigation. (D3FEND: [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))
2.  **Restrict Network Access:** Limit access to the management interfaces of these devices. They should not be exposed to the public internet. If remote access is required, it should be strictly controlled via a **[VPN](https://en.wikipedia.org/wiki/Virtual_private_network)** with **[MFA](https://www.cisa.gov/mfa)**. (D3FEND: [`D3-ITF - Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering))
3.  **Network Segmentation:** Isolate these devices in a segmented network zone to limit the blast radius in case of a compromise. This is especially critical for Lantronix devices in OT environments. (D3FEND: [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))
4.  **Regular Audits:** Regularly audit device configurations and user accounts. Remove any unauthorized or suspicious administrator accounts on Ubiquiti devices.

## CVEs
- CVE-2025-67038 (CVSS 9.8) — CISA KEV
- CVE-2026-34908 (CVSS 10) — CISA KEV
- CVE-2026-34909 — CISA KEV
- CVE-2026-34910 (CVSS 10) — CISA KEV

**Tags:** KEV, CISA, Lantronix, Ubiquiti, Remote Code Execution, RCE, OT Security, Network Security, CVE-2025-67038, CVE-2026-34908

## Sources
- [CISA Warns Critical Lantronix EDS5000 Flaw Is Being Actively Exploited](https://thehackernews.com/2026/06/cisa-warns-critical-lantronix-eds5000.html) — The Hacker News (2026-06-24)
- [Critical Ubiquiti Vulnerabilities in Attackers' Crosshairs](https://www.securityweek.com/critical-ubiquiti-vulnerabilities-in-attackers-crosshairs/) — SecurityWeek (2026-06-24)
- [CISA warns of max severity Ubiquiti flaws exploited in attacks](https://www.bleepingcomputer.com/news/security/cisa-warns-of-max-severity-ubiquiti-flaws-exploited-in-attacks/) — BleepingComputer (2026-06-24)
- [U.S. CISA adds Ubiquiti UniFi OS and Lantronix EDS5000 plugin flaws to its Known Exploited Vulnerabilities catalog](https://securityaffairs.com/194142/security/u-s-cisa-adds-ubiquiti-unifi-os-and-lantronix-eds5000-plugin-flaws-to-its-known-exploited-vulnerabilities-catalog.html) — Security Affairs (2026-06-24)
- [Cyber Intel Brief: CVE-2025-67038](https://www.dataminr.com/resources/intel-brief/cve-2025-67038/) — Dataminr (2026-06-24)
- [Lantronix Serial-to-IP Converter Flaw Exploited in Attacks After OT Threat Warning](https://www.securityweek.com/lantronix-serial-to-ip-converter-flaw-exploited-in-attacks-after-ot-threat-warning/) — SecurityWeek (2026-06-25)

---
Source: https://cyber.netsecops.io/articles/cisa-adds-critical-lantronix-and-ubiquiti-flaws-to-kev-catalog/
