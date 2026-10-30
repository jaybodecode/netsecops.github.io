# CISA & FBI Warn of Third-Party Risks to Industrial Control Systems

**Severity:** high | **Category:** Industrial Control Systems,Supply Chain Attack,Policy and Compliance | **Updated:** 2026-09-25

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) and the FBI have issued a joint advisory highlighting the significant cyber risks posed by third-party Industrial Control System (ICS) integrators. The guidance urges critical infrastructure operators to enforce the principle of least privilege, enhance contractual security requirements, and improve monitoring of remote access to protect sensitive operational technology (OT) environments from supply chain attacks.

## Executive Summary
On September 23, 2026, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** and the **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov/investigate/cyber)** released a joint fact sheet to warn critical infrastructure operators about the cybersecurity risks introduced by third-party Industrial Control System (ICS) integrators. The advisory emphasizes that these external partners, while essential for operations, can serve as a vector for malicious actors to access sensitive Operational Technology (OT) networks. The core recommendations focus on implementing the principle of least privilege, embedding robust security clauses into contracts, and diligently monitoring all remote connections to prevent disruptive and destructive attacks.

---

## Threat Overview
Third-party ICS integrators, which provide services ranging from system design and installation to maintenance and support, often require deep access to a client's OT environment. This access, if not properly secured, creates a significant supply chain risk. Malicious actors can compromise a trusted integrator to gain a foothold in the networks of multiple critical infrastructure operators.

The advisory references a 2025 incident where foreign cyber actors compromised a U.S. industrial automation solutions company. The attackers used their access to the integrator's network to search for sensitive client information, using terms like 'SCADA' and 'customers.' They successfully compiled approximately 800 files for exfiltration, containing ICS device details and schematics that could be used to plan future attacks against the integrator's clients. This highlights a direct pathway from a compromised third party to the potential disruption of critical national functions.

---

## Technical Analysis
The attack pattern described involves leveraging a trusted third-party relationship to bypass perimeter defenses. The primary tactic is the abuse of legitimate, pre-existing access granted to the ICS integrator.

### MITRE ATT&CK Techniques
- **[T1199 - Trusted Relationship](https://attack.mitre.org/techniques/T1199/):** The core of this threat involves attackers compromising a third-party integrator to exploit the trusted relationship it has with its clients (the critical infrastructure operators).
- **[T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/):** Once the integrator is compromised, attackers would likely use the integrator's legitimate credentials to access client networks.
- **[T1021.001 - Remote Services: Remote Desktop Protocol](https://attack.mitre.org/techniques/T1021/001/):** A common method for integrators to access client systems, which attackers would abuse for lateral movement and persistence.
- **[T1105 - Ingress Tool Transfer](https://attack.mitre.org/techniques/T1105/):** Attackers may use the integrator's access to transfer malicious tools into the target OT environment.
- **[T1048 - Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048/):** The act of compiling and exfiltrating 800 files suggests a planned data theft operation, likely using covert channels.

---

## Impact Assessment
A successful compromise via a third-party integrator could have severe consequences for critical infrastructure. Potential impacts include:
- **Operational Disruption:** Attackers could manipulate or shut down industrial processes, leading to service outages in sectors like energy, water, and transportation.
- **Physical Damage:** In some OT environments, unauthorized control could lead to equipment damage or catastrophic failures, posing a risk to public safety.
- **Intellectual Property Theft:** The exfiltration of ICS schematics, device configurations, and operational data represents a significant loss of sensitive intellectual property that could be used to engineer further attacks.
- **Espionage:** Foreign adversaries can use this access to gather intelligence on a nation's critical infrastructure capabilities and vulnerabilities.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect abuse of integrator access:
| Type | Value | Description |
|---|---|---|
| command_line_pattern | `net user * /domain` | Enumerating domain accounts from a session originating from a third-party IP range. |
| file_path | `C:\Windows\Temp\` | Monitoring for unusual script or binary execution from temporary directories by integrator accounts. |
| network_traffic_pattern | Unusual data flows to external IPs | Baselining normal integrator traffic and alerting on anomalies, especially large data transfers. |
| log_source | VPN or Remote Access Gateway Logs | Auditing connection times, durations, and source IPs for all third-party access, alerting on off-hours activity. |
| command_line_pattern | `findstr /s /i "SCADA" *.*` | Searching for file access logs or command-line logs showing searches for sensitive ICS-related keywords. |

---

## Detection & Response
Defenders should focus on gaining visibility into all third-party activities within their network.

1.  **Monitor Remote Access:** Implement robust logging for all VPN, RDP, and other remote access solutions. Analyze logs for unusual connection times, geographic locations, or multiple failed login attempts from integrator accounts. This aligns with **D3FEND** techniques like [`D3-LAM - Local Account Monitoring`](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring).
2.  **Network Traffic Analysis:** Use network monitoring tools to baseline normal traffic patterns associated with integrator activities. Set up alerts for anomalous data flows, such as large data transfers to unknown external destinations or connections to suspicious domains. This corresponds to [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions on jump boxes and other systems accessed by third parties. Monitor for suspicious process execution, command-line arguments, and file modifications indicative of reconnaissance or lateral movement.

---

## Mitigation
The CISA/FBI advisory provides several key mitigation strategies:

1.  **Enforce Principle of Least Privilege (PoLP):** Grant integrators only the minimum level of access required to perform their duties. This includes restricting access to specific systems, data, and time windows. This is a core part of **D3FEND**'s [`D3-UAP - User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions) hardening.
2.  **Incorporate Security in Contracts:** Legal agreements with integrators should explicitly define cybersecurity requirements, including data protection standards, incident notification timelines, secure remote access procedures, and rights to audit.
3.  **Secure and Monitor Remote Access:** All remote connections should be authenticated using **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)**. Where possible, use on-demand, session-based access that is terminated immediately after use. All sessions should be logged and reviewed.
4.  **Asset Management:** Maintain a comprehensive inventory of all hardware and software provided or managed by the integrator. This is crucial for patch management and vulnerability scanning.
5.  **Network Segmentation:** Isolate the OT network from the IT network and the internet. Use demilitarized zones (DMZs) to control access between network segments, limiting an attacker's ability to move laterally from a compromised IT system to the OT environment.

**Tags:** CISA, FBI, ICS, Least Privilege, OT Security, SCADA, Supply Chain, Third-Party Risk

## Sources
- [Considerations for Critical Infrastructure Operators Working With Third-Party ICS Integrators](https://www.cisa.gov/resources-tools/resources/considerations-critical-infrastructure-operators-working-third-party-ics-integrators) (2026-09-23)
- [CISA, FBI warn critical infrastructure operators of third-party ICS risks, urge least privilege and remote access controls](https://industrialcyber.co/industrial-cyber-attacks/cisa-fbi-warn-critical-infrastructure-operators-of-third-party-ics-risks-urge-least-privilege-and-remote-access-controls/) (2026-09-24)
- [The Cyber Threat](https://www.fbi.gov/investigate/cyber) (2026-09-23)

---
Source: https://cyber.netsecops.io/articles/cisa-fbi-warn-critical-infrastructure-on-third-party-ics-risks/
