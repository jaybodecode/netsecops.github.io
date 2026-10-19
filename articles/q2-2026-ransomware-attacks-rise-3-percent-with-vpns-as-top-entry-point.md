# Q2 Ransomware Attacks Up 3%; VPNs Remain Top Initial Access Vector

**Severity:** high | **Category:** Ransomware,Vulnerability,Threat Intelligence | **Updated:** 2026-07-29

According to NCC Group's Q2 2026 threat report, global ransomware attacks increased by 3% to 2,229 incidents. The industrial sector was most targeted, and North America remained the most impacted region. For the fifth straight quarter, the Qilin ransomware group was the most active. The report critically highlights that corporate VPNs and internet-facing edge devices are the primary initial access vector, with groups like Qilin and Akira actively exploiting vulnerabilities in products from Fortinet, Citrix, SonicWall, and Check Point.

## Executive Summary
Global ransomware attacks continued to climb in the second quarter of 2026, increasing by 3% to a total of 2,229 incidents, as reported by **[NCC Group](https://www.nccgroup.com/)**. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group maintained its position as the most prolific threat actor. A critical finding from the report is the continued dominance of corporate **[VPN](https://en.wikipedia.org/wiki/Virtual_private_network)**s and other edge devices as the primary initial access vector for these attacks. Threat actors are systematically exploiting vulnerabilities in widely used VPN products to bypass perimeter defenses and gain an initial foothold in target networks. This underscores the urgent need for organizations to prioritize patching and hardening of all internet-facing infrastructure.

## Threat Overview
The second quarter of 2026 saw a sustained high tempo of ransomware operations. NCC Group recorded 2,229 attacks, with 665 in June alone. The industrial sector was the most heavily impacted, accounting for 30% of all incidents, followed by consumer discretionary and information technology.

The key players in Q2 2026 were:
1.  **Qilin**: 301 victims (14% of total)
2.  **The Gentlemen**: 238 victims
3.  **DragonForce**: 145 victims

A new Ransomware-as-a-Service (RaaS) group named **KryBit** also made its debut, claiming 56 victims. Geographically, North America was the most targeted region, suffering 44% of the attacks.

## Technical Analysis
The report's most actionable intelligence for defenders is the focus on edge devices as the primary initial access vector. Ransomware groups including **Qilin**, **[Akira](https://malpedia.caad.fkie.fraunhofer.de/actor/akira)**, and **The Gentlemen** are actively exploiting vulnerabilities in VPN products from major vendors such as **[Fortinet](https://www.fortinet.com/)**, **[SonicWall](https://www.sonicwall.com/)**, **[Citrix](https://www.citrix.com/)**, and **[Check Point](https://www.checkpoint.com/)**. This tactic aligns with the MITRE ATT&CK technique [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).

By exploiting a flaw in a VPN appliance, attackers can often bypass authentication mechanisms, including MFA, and gain direct access to the internal corporate network. This corresponds to [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/). Once inside, they proceed with standard ransomware TTPs: reconnaissance, lateral movement, privilege escalation, and eventual data exfiltration ([`T1048 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1048/)) and encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)). NCC Group noted that VPN vulnerabilities accounted for roughly 15% of its high-priority threat alerts in 2026, indicating the severity and frequency of this attack vector.

## Impact Assessment
The reliance on VPNs for remote work makes their exploitation a high-impact event. A successful breach can provide an attacker with a significant foothold inside the network perimeter, effectively neutralizing a key layer of defense. For the industrial sector, this is particularly dangerous as it can lead to attackers moving from the IT network to the OT network, potentially causing disruption to physical processes, production downtime, and safety risks. The financial and reputational damage from a successful ransomware attack remains substantial.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for signs of VPN exploitation and compromise:
| Type | Value | Description | Context |
|---|---|---|---|
| log_source | `VPN Server Logs` | The primary source for detecting anomalous login activity. | Ingest into SIEM for correlation and alerting. |
| network_traffic_pattern | Logins from multiple geolocations for a single user in a short time | Indicates potential credential stuffing or account takeover. | VPN logs, Identity and Access Management (IAM) logs. |
| url_pattern | `/api/v1/remediation` (example for a specific CVE) | Exploit attempts often target specific, vulnerable API endpoints on VPN devices. | Web Application Firewall (WAF) logs, web server logs on the VPN appliance. |
| process_name | `w3wp.exe` or `httpd` spawning `cmd.exe` or `powershell.exe` | A web server process on the VPN appliance spawning a shell could indicate successful RCE. | EDR logs on the VPN appliance (if available). |

## Detection & Response
- **VPN Log Analysis**: Continuously monitor VPN logs for failed login spikes, successful logins from suspicious IPs or countries, and impossible travel scenarios ([D3-UGLPA: User Geolocation Logon Pattern Analysis](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)).
- **Network Baselining**: Establish a baseline of normal traffic patterns for VPN user activity. Alert on significant deviations, such as a user accessing unusual internal resources or transferring large amounts of data.
- **Endpoint Monitoring**: Monitor endpoints for signs of lateral movement originating from the VPN user pool, such as widespread use of `PsExec` or `WMI`.

## Mitigation
- **Urgent Patching**: Prioritize and accelerate the patching of all internet-facing edge devices, especially VPN concentrators. Subscribe to vendor security advisories ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)).
- **MFA on VPN**: Ensure that MFA is enabled for all VPN users. While some exploits can bypass MFA, it remains a critical defense against credential-based attacks ([D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Network Segmentation**: Do not treat the VPN user network as fully trusted. Implement network segmentation to limit which resources VPN users can access, restricting lateral movement opportunities post-compromise ([D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)).
- **Reduce Attack Surface**: If possible, replace broad VPN access with a Zero Trust Network Access (ZTNA) solution that grants access to specific applications rather than the entire network.

**Tags:** Fortinet, Initial Access, NCC Group, Qilin, Ransomware, VPN Security

## Sources
- [Ransomware Attacks Rise 3% in Q2 as Supply Chain Compromises Escalate, NCC Group Warns](https://www.itsecurityguru.org/2026/07/22/ransomware-attacks-rise-3-in-q2-as-supply-chain-compromises-escalate-ncc-group-warns/)
- [Forescout reports 51% surge in vulnerabilities as AI, supply chain attacks drive threats across IoT, OT infrastructure](https://industrialcyber.co/industrial-cyber-attacks/forescout-reports-51-surge-in-vulnerabilities-as-ai-supply-chain-attacks-drive-threats-across-iot-ot-infrastructure/)

---
Source: https://cyber.netsecops.io/articles/q2-2026-ransomware-attacks-rise-3-percent-with-vpns-as-top-entry-point/
