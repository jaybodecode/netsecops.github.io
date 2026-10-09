# CISA Discovers 'FIRESTARTER' Backdoor on Federal Cisco Firewall; Malware Survives Patches

**Severity:** critical | **Category:** Malware,Vulnerability,Cyberattack | **Updated:** 2026-04-28 | **Reading time:** 6 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has disclosed that a Cisco Firepower device at an unnamed federal agency was compromised with a new, sophisticated backdoor named FIRESTARTER. An Advanced Persistent Threat (APT) actor exploited two critical vulnerabilities, CVE-2025-20333 and CVE-2025-20362, to deploy the malware. The most alarming feature of FIRESTARTER is its persistence mechanism, which allows it to survive firmware updates and security patches by hooking into the device's core processing engine. The attackers used this persistent access to deploy a post-exploitation toolkit called LINE VIPER and re-entered the network months after the initial compromise.

## Executive Summary

The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/)**, in collaboration with the U.K.'s **[NCSC](https://www.ncsc.gov.uk/)**, has issued a critical alert regarding a newly discovered backdoor named **FIRESTARTER**. This malware was found on a **[Cisco](https://www.cisco.com/)** Firepower device within a U.S. federal civilian executive branch (FCEB) agency. The malware provides persistent, remote access to the compromised firewall. The initial intrusion, occurring in September 2025, was achieved by exploiting two since-patched vulnerabilities: **CVE-2025-20333** (a critical 9.9 CVSS RCE flaw) and **CVE-2025-20362**. The key threat posed by FIRESTARTER is its ability to maintain persistence even after the device's firmware is updated, rendering standard patching insufficient for remediation. Attackers were confirmed to have used this backdoor to regain access as recently as March 2026.

---

## Threat Overview

An unidentified Advanced Persistent Threat (APT) actor conducted a widespread campaign targeting Cisco Adaptive Security Appliance (ASA) and Firepower Threat Defense (FTD) software. The initial access vector was the exploitation of **CVE-2025-20333** and **CVE-2025-20362**. Once on the device, the APT deployed the FIRESTARTER backdoor.

FIRESTARTER's primary function is to provide a persistent foothold. It achieves this by installing a hook within LINA, the core processing engine of the Cisco device's operating system. This hook allows the malware to intercept system functions and execute arbitrary shell code supplied by the attacker via specially crafted network packets. Because this hook is installed in the underlying system and not as a simple file, it is not removed during a standard firmware update or patching process.

CISA's investigation revealed that the attackers used this persistent access to deploy a secondary payload, a post-exploitation toolkit named **LINE VIPER**. This toolkit enabled the threat actors to:
*   Execute arbitrary command-line interface (CLI) commands.
*   Conduct packet captures to monitor network traffic.
*   Bypass VPN authentication for attacker-controlled devices.
*   Harvest user credentials from the device.

---

## Technical Analysis

The attack showcases a high level of sophistication, targeting the core of a network security appliance. The TTPs map to the MITRE ATT&CK framework as follows:

1.  **Initial Access:** The attackers exploited a known vulnerability in a public-facing application, corresponding to [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).
2.  **Execution:** The LINE VIPER toolkit's ability to run CLI commands falls under [`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/).
3.  **Persistence:** FIRESTARTER's LINA hooking mechanism is a form of [`T1546 - Event Triggered Execution`](https://attack.mitre.org/techniques/T1546/). By hooking a core process, it ensures its code is executed whenever specific system events occur, guaranteeing its survival across reboots and updates.
4.  **Defense Evasion:** The entire mechanism is a powerful form of defense evasion ([`T1574 - Hijack Execution Flow`](https://attack.mitre.org/techniques/T1574/)). By embedding itself deep within a trusted system process, the malware avoids detection by conventional file-based scanners.
5.  **Credential Access:** The harvesting of user credentials via LINE VIPER aligns with [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/).

> The persistence mechanism is the most critical aspect of this threat. It means that simply patching the initial vulnerabilities is not enough to remediate a compromised device. Organizations must actively hunt for evidence of the backdoor itself.

---

## Impact Assessment

The impact of this attack is severe. A persistent backdoor on a perimeter firewall grants an attacker a privileged position within the network. From here, they can monitor all traffic passing through the device, bypass security controls like VPNs, pivot to other internal systems, and maintain long-term, stealthy access to the victim's environment. For a federal agency, this could lead to the exfiltration of sensitive government data, espionage, and a complete loss of network integrity. The fact that the attackers were able to return months later demonstrates the effectiveness of their persistence and the significant challenge defenders face in fully eradicating such threats.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles. CISA's advisory likely contains specific hunting guidance for federal agencies.

---

## Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| command_line_pattern | `show memory region | i LINA` | On a Cisco ASA/FTD device, analyzing memory regions for unexpected executable sections or hooks related to the LINA process could reveal the backdoor. This requires advanced forensics. |
| network_traffic_pattern | `Anomalous management traffic` | Monitor for unexpected inbound connections to the device's management interface or outbound connections from the firewall itself to unknown destinations. |
| log_source | `Cisco ASA/FTD Syslog` | Scrutinize logs for unauthorized configuration changes, unexpected device reloads, or commands being executed outside of normal administrative sessions. |
| file_path | `/ngfw/var/log/lina.log` | While the backdoor is fileless, its execution might generate anomalous entries in the LINA process log. |

---

## Detection & Response

Detection requires more than just vulnerability scanning. Organizations with affected Cisco devices should:

*   **Follow CISA Guidance:** CISA has issued specific directives and hunting guidance. Federal agencies and other organizations should follow these instructions precisely.
*   **Memory Forensics:** The most reliable way to detect this fileless malware is through memory analysis of the running device. This involves capturing a memory image and searching for known indicators of FIRESTARTER's hooks and code, a process that typically requires specialized expertise. This is a form of [`D3-DA: Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
*   **Network Behavior Analysis:** Monitor for network traffic anomalies associated with the LINE VIPER toolkit, such as unexpected packet captures or VPN bypass activity. This aligns with [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

If a device is confirmed to be compromised, the recommended response is to isolate it from the network and perform a complete re-imaging from a trusted source, followed by restoring a clean configuration. Simply patching is insufficient.

---

## Mitigation

Mitigation requires a multi-step approach:

1.  **Patch Urgently:** Immediately apply the security updates from **[Cisco](https://www.cisco.com/)** that address **CVE-2025-20333** and **CVE-2025-20362**. This is the first step in preventing new infections ([`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
2.  **Assume Breach and Hunt:** For any device that was unpatched and exposed to the internet, organizations must assume it could be compromised. Proactively hunt for indicators of FIRESTARTER and LINE VIPER using the guidance from CISA.
3.  **Restrict Management Access:** Harden firewall configurations by restricting access to management interfaces. They should not be exposed to the internet and should only be accessible from a secure, internal management network.
4.  **Integrity Monitoring:** Implement integrity monitoring solutions that can detect unauthorized changes to the firmware and critical system files of network devices.

## CVEs
- CVE-2025-20333 (CVSS 9.9) — CISA KEV
- CVE-2025-20362 (CVSS 6.5) — CISA KEV

**Tags:** FIRESTARTER, LINE VIPER, CISA, Cisco, Backdoor, Vulnerability, APT, CVE-2025-20333

## Sources
- [FIRESTARTER Backdoor Hit Federal Cisco Firepower Device, Survives Security Patches](https://thehackernews.com/2026/04/firestarter-backdoor-hit-federal-cisco.html) — The Hacker News (2026-04-24)
- [US Federal Agency’s Cisco Firewall Infected With ‘Firestarter’ Backdoor](https://www.securityweek.com/us-federal-agencys-cisco-firewall-infected-with-firestarter-backdoor/) — SecurityWeek (2026-04-24)
- [CISA: US agency breached through Cisco vulnerability, FIRESTARTER backdoor allowed access through March](https://therecord.media/cisa-us-agency-breached-cisco-vulnerability-firestarter) — The Record (2026-04-24)
- [Continued Evolution of Persistence Mechanism Against Cisco Secure Firewall Adaptive Security Appliance and Secure Firewall Threat Defense](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-CISAED25-03) — Cisco (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/cisa-reveals-firestarter-backdoor-on-federal-cisco-firewall/
