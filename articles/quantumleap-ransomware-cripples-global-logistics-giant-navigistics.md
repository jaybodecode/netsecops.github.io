# New QuantumLeap Ransomware Demands $50M, Halts Global Shipments at NaviGistics

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2026-01-26 | **Reading time:** 6 min

The global logistics firm NaviGistics has suffered a catastrophic cyberattack from a new ransomware strain dubbed 'QuantumLeap'. The attack, orchestrated by a group calling itself 'Entropy Collective', has encrypted critical systems and brought the company's worldwide shipping and freight operations to a standstill. The threat actors gained initial access via a compromised VPN account lacking multi-factor authentication, demonstrating a sophisticated lateral movement campaign before deploying the payload. The group is demanding a $50 million ransom and has threatened to leak over 2 terabytes of exfiltrated data, including sensitive customer and financial records. This incident highlights the extreme vulnerability of the global supply chain to targeted cyber-extortion and the devastating operational and financial impact of modern ransomware attacks.

## Executive Summary
On January 25, 2026, global logistics provider **NaviGistics** was hit by a severe ransomware attack, crippling its worldwide operations. The attack was carried out by a new threat group, **Entropy Collective**, using a previously unseen ransomware variant named **QuantumLeap**. The attackers encrypted critical servers, halted the company's core logistics platform, and exfiltrated over 2 terabytes of sensitive data. A ransom of $50 million has been demanded to prevent the public release of the stolen information and to provide a decryptor. The initial infection vector was a compromised VPN account without multi-factor authentication, highlighting a critical security gap. The incident has caused a complete shutdown of NaviGistics' shipping, tracking, and freight forwarding services, with recovery expected to take weeks and result in significant financial losses.

## Threat Overview
**Threat Actor:** **Entropy Collective** (newly identified group)
**Malware:** **QuantumLeap** (new ransomware strain)
**Victim:** **NaviGistics**, a global logistics and shipping company
**Impact:** Global operational shutdown, data encryption, data exfiltration, and a $50 million ransom demand.

The attack began with the compromise of a corporate VPN account that was not protected by multi-factor authentication. After gaining initial access, the **Entropy Collective** actors conducted a lengthy reconnaissance phase, moving laterally across the corporate network for several weeks to identify and map critical assets. Once they had established a deep foothold, they deployed the **QuantumLeap** ransomware across data centers in North America, Europe, and Asia. The ransomware is noted for its high speed and its ability to neutralize security defenses, including disabling endpoint protection software and deleting Volume Shadow Copies to frustrate recovery efforts. The attackers are employing a double-extortion tactic, leveraging the threat of releasing sensitive exfiltrated data to pressure **NaviGistics** into paying the ransom.

## Technical Analysis
The attack chain followed a common but effective pattern for enterprise-wide ransomware deployment.

1.  **Initial Access:** The threat actors exploited a weak security posture, using credentials for a VPN account that lacked multi-factor authentication ([`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/)).
2.  **Persistence & Discovery:** After gaining entry, the actors likely established persistence and spent weeks conducting network reconnaissance ([`T1082 - System Information Discovery`](https://attack.mitre.org/techniques/T1082/)) to understand the network topology and identify high-value targets like domain controllers and backup servers.
3.  **Lateral Movement:** The attackers moved laterally across the network, likely using tools such as RDP or PsExec to access different systems ([`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021.001/)).
4.  **Defense Evasion:** **QuantumLeap** malware includes capabilities to disable or modify security tools ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562.001/)) on endpoints before encryption.
5.  **Impact:** The core of the attack involved two key techniques:
    *   **Data Exfiltration:** Over 2 TB of data was exfiltrated to attacker-controlled infrastructure before encryption ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
    *   **Data Encryption & Recovery Inhibition:** The ransomware encrypted critical files ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and deleted Volume Shadow Copies to prevent system recovery ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
The attack on **NaviGistics** has immediate and far-reaching consequences. Operationally, the complete shutdown of its logistics platform means shipments cannot be tracked, processed, or forwarded, causing a major disruption to the global supply chain for its numerous clients. Financially, the company faces direct costs from the incident response and recovery efforts, potential regulatory fines for the data breach, and significant revenue loss for every day its systems remain offline. The $50 million ransom demand represents a substantial financial threat. Reputational damage will be severe, as trust from customers is eroded due to the operational failure and the exposure of their sensitive shipping and financial data. Full recovery is projected to take weeks, if not months, given the complexity of the interconnected global network.

## Cyber Observables for Detection
Security teams should hunt for the following activities associated with this type of attack:

| Type | Value | Description | Context |
| --- | --- | --- | --- |
| `command_line_pattern` | `vssadmin.exe delete shadows /all /quiet` | Command to delete Volume Shadow Copies, inhibiting recovery. | Windows Endpoint Logs (ID 4688) |
| `network_traffic_pattern` | Large, anomalous data egress to unknown IP ranges. | Potential data exfiltration activity. | Netflow data, Firewall logs |
| `log_source` | VPN Authentication Logs | Multiple failed logins followed by a success from an unusual location. | VPN Concentrator Logs |
| `process_name` | `PsExec.exe`, `wmic.exe` | Tools commonly used for lateral movement. | EDR / SIEM Process Creation Logs |
| `event_id` | `4625` (Failed Logon), `4624` (Successful Logon) | Correlating logon events to track lateral movement attempts. | Windows Security Event Log |

## Detection & Response
Defenders should focus on early-stage detection to prevent widespread impact.

-   **Monitor VPN Access:** Implement robust monitoring for VPN connections. Alert on logins from unusual geographic locations, multiple failed login attempts from a single IP, or a successful login after a series of failures. **D3FEND Technique:** [`User Geolocation Logon Pattern Analysis (D3-UGLPA)`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
-   **Detect Lateral Movement:** Use EDR and SIEM solutions to detect common lateral movement techniques. Create alerts for the use of tools like `PsExec.exe` or `wmic.exe` originating from non-administrative workstations. Monitor for an account making numerous logon attempts across multiple systems in a short period. **D3FEND Technique:** [`Remote Terminal Session Detection (D3-RTSD)`](https://d3fend.mitre.org/technique/d3f:RemoteTerminalSessionDetection).
-   **Identify Defense Evasion:** Endpoint protection solutions should have anti-tampering features enabled. Monitor for any attempts to stop or disable security services or execute commands like `vssadmin.exe delete shadows`. **D3FEND Technique:** [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

## Mitigation
Organizations should implement layered defenses to protect against similar attacks.

1.  **Secure Remote Access:** Mandate multi-factor authentication (MFA) for all remote access, especially for VPNs and other internet-facing systems. This is the single most effective control to prevent the initial access vector used in this attack. **D3FEND Countermeasure:** [`Multi-factor Authentication (D3-MFA)`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
2.  **Network Segmentation:** Segment networks to prevent attackers from moving laterally from the IT environment to critical OT or data center environments. Restrict communication between network zones to only what is strictly necessary. **D3FEND Countermeasure:** [`Network Isolation (D3-NI)`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
3.  **Immutable Backups:** Maintain offline and immutable backups of critical data. Follow the 3-2-1 rule (three copies, on two different media, with one offsite). Regularly test backup restoration procedures to ensure they are effective in a real-world incident.
4.  **Endpoint Security:** Deploy a modern Endpoint Detection and Response (EDR) solution with behavioral analysis capabilities to detect and block ransomware activity, such as rapid file encryption and the deletion of shadow copies.
5.  **Privileged Access Management (PAM):** Strictly control and monitor the use of privileged accounts. Implement Just-In-Time (JIT) access to limit the window of opportunity for attackers to compromise administrative credentials.

**Tags:** ransomware, double extortion, supply chain, logistics, cyber extortion, VPN security

## Sources
- [NaviGistics Halts Global Shipments After $50M QuantumLeap Ransomware Attack](https://www.techcrunch.com/2026/01/26/navigistics-ransomware-quantumleap) — TechCrunch (2026-01-26)
- [New QuantumLeap ransomware hits logistics giant NaviGistics, demands $50 million](https://www.bleepingcomputer.com/news/security/new-quantumleap-ransomware-hits-logistics-giant-navigistics/) — BleepingComputer (2026-01-26)

---
Source: https://cyber.netsecops.io/articles/quantumleap-ransomware-cripples-global-logistics-giant-navigistics/
