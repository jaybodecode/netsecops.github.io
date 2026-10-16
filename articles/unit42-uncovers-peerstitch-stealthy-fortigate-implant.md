# PEERSTITCH: Stealthy Implant Hits FortiGate via Chained CVEs

**Severity:** critical | **Category:** Malware,Vulnerability,Threat Actor | **Updated:** 2026-10-15 | **Reading time:** 14 min

Unit 42 researchers have uncovered a sophisticated attack targeting Fortinet appliances with a novel memory-resident malware dubbed PEERSTITCH. The threat actors, tracked as CL-STA-0954, exploited CVE-2024-47575 on a FortiManager device for initial access, allowing them to exfiltrate configuration and credential data for over 500 managed FortiGate firewalls. Following a dwell period, the attackers leveraged a second vulnerability, CVE-2025-61624, to achieve root access and deploy the PEERSTITCH implant. This ARM64 malware is designed for stealth, operating entirely in memory to patch legitimate FortiOS daemons, leaving no artifacts on disk and making detection extremely difficult.

## Executive Summary

Palo Alto Networks' **[Unit 42](https://unit42.paloaltonetworks.com/)** has identified a sophisticated, multi-stage intrusion campaign targeting a telecommunications managed service provider. The attackers, tracked as threat cluster **[CL-STA-0954](https://unit42.paloaltonetworks.com/fortimanager-cve-2024-47575-peerstitch-malware/)** (also known as UNC5820), demonstrated advanced tradecraft by exploiting two vulnerabilities—**[CVE-2024-47575](https://www.cve.org/CVERecord?id=CVE-2024-47575)** and **[CVE-2025-61624](https://www.cve.org/CVERecord?id=CVE-2025-61624)**—to deploy a novel, memory-resident malware named **[PEERSTITCH](https://unit42.paloaltonetworks.com/fortimanager-cve-2024-47575-peerstitch-malware/)**. The primary targets were **[Fortinet](https://www.fortinet.com/)** **[FortiManager](https://www.fortinet.com/products/management/fortimanager)** and **[FortiGate](https://www.fortinet.com/products/next-generation-firewall)** appliances. The initial compromise led to the exfiltration of configuration data for over 500 firewalls, exposing the provider and its clients to significant risk. PEERSTITCH is an ARM64-based implant that operates entirely in memory, patching legitimate system daemons to evade detection and establish stealthy persistence.

## Threat Overview

The attack began in September 2024 when the CL-STA-0954 threat actor exploited **CVE-2024-47575**, a command injection vulnerability in FortiManager's management channel (`TCP port 541`). This allowed the unauthenticated, remote attacker to register a rogue virtual appliance and exfiltrate a configuration archive containing sensitive data from over 500 managed FortiGate firewalls. This data included cryptographic material and reversible ciphertext credentials.

After a period of extended dwell time, the attackers used the stolen credentials to gain authenticated access to perimeter firewalls via SSL/VPN. From there, they exploited a second vulnerability, **CVE-2025-61624**, an authenticated path traversal flaw in the **[FortiOS](https://www.fortinet.com/products/fortios/fortios-operating-system)** auto-script engine. This vulnerability enabled them to escalate privileges from an administrative user to `root` on the underlying operating system. With root access, they deployed the **PEERSTITCH** malware, a highly stealthy implant designed specifically for FortiGate's ARM64 architecture.

**PEERSTITCH** is particularly dangerous due to its design: it is memory-resident, leaves no binary on disk, opens no listening ports, and initiates no outbound connections. It functions by patching the memory of two core FortiOS daemons, `sshd` and `httpslvpn`, allowing it to intercept and manipulate traffic through legitimate processes, thereby bypassing conventional detection methods.

## Technical Analysis

**PEERSTITCH** is a 64-bit Linux ARM64 executable written in C and statically linked against glibc. Its primary function is to act as a one-shot injector that patches the memory of legitimate processes.

### Attack Chain
1.  **Initial Access**: The attacker exploits **CVE-2024-47575** (`FortiJump`) against the FortiManager appliance from an external IP (`45.32.41.202`). This allows them to register a rogue device (`FMG-VMTM23017412`) and exfiltrate a configuration archive named `.tm`.
2.  **Credential Access & Reconnaissance**: The attackers brute-force credentials from the exfiltrated configuration files. They then use these legitimate credentials to establish SSL/VPN sessions from external staging infrastructure (`23.240.77.233`, `47.18.167.159`). They also deploy packet sniffer configurations to map the network and intercept traffic.
3.  **Privilege Escalation & Deployment**: The attacker, now with administrative access, exploits **CVE-2025-61624**. They create a malicious `system.auto-script` object with a name containing path traversal sequences (e.g., `../../../../setup`). This allows them to write an arbitrary script to the file system and execute it as `root`.
4.  **Malware Execution**: The executed script downloads the **PEERSTITCH** components from a C2 server (`hxxp[:]//23.240.77.233:8085/`) into the `/data2/template/` directory. The main executable then patches the `sshd` and `httpslvpn` daemons in memory, establishing stealthy persistence without writing a persistent binary to disk.

### MITRE ATT&CK Mapping
*   [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Exploitation of **CVE-2024-47575** on the internet-facing FortiManager.
*   [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/): Exfiltration of the FortiManager configuration archive.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Use of credentials recovered from the exfiltrated configuration files.
*   [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/): Accessing internal networks via FortiGate SSL/VPN sessions.
*   [`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/): Deployment of unauthorized packet capture configurations on managed firewalls.
*   [`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059.004/): Use of the malicious auto-script to execute shell commands for payload deployment.
*   [`T1055 - Process Injection`](https://attack.mitre.org/techniques/T1055/): **PEERSTITCH** patches the memory of legitimate `sshd` and `httpslvpn` processes.
*   [`T1556 - Modify Authentication Process`](https://attack.mitre.org/techniques/T1556/): By patching core daemons like `sshd`, the malware can intercept or alter authentication flows.

## Impact Assessment

The impact of this campaign is severe, particularly for the targeted telecommunications MSP and its downstream clients. The exfiltration of configuration and credential data for over 500 firewalls provides the attackers with a comprehensive blueprint of multiple network environments. This enables widespread, persistent, and difficult-to-detect access.

Key impacts include:
*   **Loss of Confidentiality**: Sensitive network configurations, cryptographic keys, and credentials were stolen.
*   **Compromised Integrity**: The ability to deploy a root-level implant allows attackers to modify system behavior, intercept traffic, and maintain long-term, stealthy control.
*   **Widespread Exposure**: Since the victim is a managed service provider, the compromise of its central management platform exposes all of its clients to follow-on attacks.
*   **Evasion of Defenses**: The memory-resident nature of **PEERSTITCH** makes it exceptionally difficult to detect with traditional file-based scanners and network monitoring tools, leading to long dwell times.

## IOCs — Directly from Articles

The following indicators of compromise were identified in the source report.

| Type            | Value                              | Description                                      |
|-----------------|------------------------------------|--------------------------------------------------|
| IP Address      | `45.32.41.202`                     | Attacker infrastructure for initial compromise   |
| IP Address      | `198.199.122.22`                   | Attacker infrastructure (modified)               |
| IP Address      | `23.240.77.233`                    | External staging and C2 infrastructure           |
| IP Address      | `47.18.167.159`                    | External staging infrastructure                  |
| URL             | `hxxp[:]//23.240.77.233:8085/`       | PEERSTITCH payload download URL                  |
| Other           | `FMG-VMTM23017412`                 | Serial number of rogue FortiGate appliance       |
| File Name       | `.tm`                              | Name of exfiltrated configuration archive        |

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns, which could indicate related activity:

| Type                   | Value                                        | Description                                                                        | Context                                      |
|------------------------|----------------------------------------------|------------------------------------------------------------------------------------|----------------------------------------------|
| Log Source             | `FortiManager Event Logs`                    | Look for device registration events from unknown or external IP addresses.         | SIEM, Log Management                         |
| Event ID               | `FortiManager device registration`           | Specifically hunt for new devices named `localhost` or with unusual serial numbers. | SIEM queries on FortiManager logs            |
| File Path              | `FortiManager file system`                   | Search for unusually named archive files, especially hidden files like `.tm`.      | File Integrity Monitoring, Manual Inspection |
| Command Line Pattern   | `system auto-script` with `../` in name      | Audit FortiOS configurations for auto-script objects containing path traversal attempts. | Configuration review, CLI audit              |
| Network Traffic Pattern| Outbound connections to IOC IPs              | Monitor for any traffic from management interfaces to the listed attacker IPs.     | Firewall logs, Netflow, IDS/IPS              |
| Process Analysis       | `sshd`, `httpslvpn`                          | Perform memory analysis on FortiGate appliances to detect unexpected hooks or patches. | EDR, Memory Forensics                        |

## Detection & Response

Detecting this threat requires moving beyond traditional file and network signature-based methods.

1.  **Memory Forensics**: The primary method for detecting an active **PEERSTITCH** infection is to perform memory analysis of FortiGate appliances. Security teams should dump the memory of the `sshd` and `httpslvpn` processes and analyze them for unauthorized modifications, hooks, or patched code segments. This can be achieved using specialized tools and techniques for embedded Linux systems.

2.  **Log Analysis**: Scrutinize **[FortiManager](https://www.fortinet.com/products/management/fortimanager)** logs for signs of the initial compromise. Look for unauthorized device registration events, especially from external IP addresses or with suspicious hostnames like `localhost`. Correlate these events with any large, unexpected data transfers from the appliance.

3.  **Configuration Audits**: Regularly audit FortiOS configurations for unauthorized changes. Specifically, review `system auto-script` configurations for any objects that have path traversal sequences (`../`) in their names. This is a direct indicator of an attempt to exploit **CVE-2025-61624**.

4.  **Network Monitoring**: While **PEERSTITCH** itself does not initiate outbound C2, the initial deployment does. Monitor network logs for connections from FortiGate appliances to the IOCs listed, particularly on ports like `8085`. Block these indicators at the network perimeter.

Defensive techniques from the **[D3FEND](https://d3fend.mitre.org/)** framework, such as [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) and [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis), are critical for identifying such activity.

## Mitigation

Organizations using Fortinet products should take immediate action to mitigate this threat.

1.  **Patch Vulnerabilities**: The most critical step is to apply patches for **CVE-2024-47575** and **CVE-2025-61624** immediately. Prioritize patching on internet-facing FortiManager appliances.

2.  **Credential Rotation**: Due to the exfiltration of configuration files, all administrative and SSL/VPN credentials stored on the compromised FortiManager and its managed FortiGates must be considered compromised. A full rotation of all passwords, keys, and certificates is required.

3.  **Restrict Management Access**: Limit access to the FortiManager management interface (`TCP port 541`) to a small set of trusted internal IP addresses. This interface should never be exposed to the public internet.

4.  **Network Segmentation**: Implement network segmentation to isolate management interfaces from general user and server networks. This can prevent attackers who gain a foothold elsewhere from pivoting to critical management appliances.

5.  **Enhanced Monitoring**: Implement the detection strategies outlined above, with a focus on memory analysis and deep log inspection for network appliances. Establish a baseline of normal behavior for these devices to better detect anomalies.

Applying D3FEND countermeasures like [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) and [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) are essential long-term strategies to prevent similar attacks.

## CVEs
- CVE-2024-47575
- CVE-2025-61624

**Tags:** PEERSTITCH, FortiGate, FortiManager, CVE-2024-47575, CVE-2025-61624, Memory-Resident Malware, ARM64, Nation-State Actor, Threat Research, CL-STA-0954

## Sources
- [Unit 42 Uncovers PEERSTITCH, a Stealthy FortiGate Implant](https://unit42.paloaltonetworks.com/fortimanager-cve-2024-47575-peerstitch-malware/) — Unit 42 (2026-10-14)

---
Source: https://cyber.netsecops.io/articles/unit42-uncovers-peerstitch-stealthy-fortigate-implant/
