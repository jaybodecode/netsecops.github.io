# DragonForce Ransomware Hid C2 Traffic Inside Microsoft Teams Infrastructure

**Severity:** high | **Category:** Ransomware,Malware,Threat Intelligence | **Updated:** 2026-06-17

The DragonForce ransomware group demonstrated a novel stealth technique by compromising a major US services firm and hiding its command-and-control (C2) traffic within legitimate Microsoft Teams infrastructure. The attackers used a custom Go-based RAT and dwelled in the network for up to two months, abusing Teams' TURN relay servers to evade detection. During this time, they escalated privileges, created new user accounts, and even used a then-undocumented Huawei driver vulnerability to further mask their activity.

## Executive Summary
A joint report from **[Symantec](https://www.symantec.com)** and **[Carbon Black](https://www.carbonblack.com/)** has detailed a sophisticated attack by the **DragonForce** ransomware group against a major US services firm. The attackers achieved a dwell time of up to two months by employing a novel technique to hide their command-and-control (C2) communications. They abused the TURN (Traversal Using Relays around NAT) relay servers that are part of **[Microsoft Teams'](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** legitimate infrastructure, effectively camouflaging their malicious traffic as legitimate collaboration tool activity. This incident highlights the increasing trend of attackers 'living off the trusted service' to evade detection.

## Threat Overview
The DragonForce group successfully infiltrated a large US services company and remained undetected for a prolonged period. Their key innovation was the use of a custom Go-based Remote Access Trojan (RAT) specifically designed to route its C2 traffic through Microsoft Teams' TURN servers. This made the malicious traffic nearly indistinguishable from the vast amounts of legitimate Teams traffic in a corporate environment.

-   **Threat Actor**: DragonForce
-   **Malware**: Custom Go-based RAT, DragonForce ransomware
-   **Key Tactic**: Abusing Microsoft Teams TURN servers for C2 communications.

During their two-month dwell time, the attackers performed extensive reconnaissance, privilege escalation, and persistence activities before finally deploying their ransomware.

## Technical Analysis
1.  **Initial Access**: The vector for initial compromise was not specified in the report.
2.  **Execution and C2 Camouflage ([T1071.001 - Web Protocols](https://attack.mitre.org/techniques/T1071/001/))**: The attackers deployed their custom Go-based RAT. This RAT was configured to use Microsoft Teams' TURN servers as a relay for its C2 traffic. TURN servers are legitimately used to facilitate real-time media (voice, video) for users behind NATs, meaning their traffic is common and often trusted by security appliances.
3.  **Defense Evasion ([T1562 - Impair Defenses](https://attack.mitre.org/techniques/T1562/))**: The attackers took several steps to solidify their position and evade detection:
    *   They altered the `LimitBlankPassword` security setting, allowing them to use accounts with blank passwords for remote access.
    *   They modified firewall rules to ensure their C2 traffic was not blocked.
    *   Crucially, they deployed an exploit for a then-undocumented vulnerability in a **[Huawei](https://www.huawei.com)** driver to help mask their activity on the network. This vulnerability was only publicly disclosed later by Huntress.
4.  **Privilege Escalation & Persistence**: The attackers created new user accounts ([T1136.001 - Local Account](https://attack.mitre.org/techniques/T1136/001/)) to maintain access.
5.  **Impact ([T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/))**: After extensive preparation, the group deployed the DragonForce ransomware to encrypt the victim's systems.

> This attack is a prime example of 'Living off the Trusted Service'. By blending in with legitimate, high-volume application traffic, attackers can significantly reduce their chances of being detected by traditional network monitoring.

## Impact Assessment
The long dwell time allowed the attackers to gain a deep understanding of the victim's network, identify the most critical assets, and exfiltrate large amounts of data before the final ransomware deployment. The impact includes:
-   **Significant Financial Loss**: Due to operational disruption, incident response costs, and a potential ransom payment.
-   **Data Breach**: The theft of corporate data before encryption leads to a double-extortion scenario.
-   **Erosion of Trust**: The abuse of a trusted service like Microsoft Teams for malicious purposes complicates detection and challenges the security models of many organizations.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Detecting this type of C2 channel is difficult, but not impossible. Security teams should focus on behavioral anomalies:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Connections to Microsoft TURN server IPs from servers or non-interactive service accounts. | Legitimate Teams traffic originates from user workstations. A server making a TURN connection is highly anomalous. |
| Process Name | `[custom_rat].exe` | Monitor for unknown Go-based executables making persistent network connections, especially to known cloud service IP ranges. |
| Log Source | EDR/Network Sensor | Baseline normal Teams traffic patterns. Look for connections to Teams infrastructure that lack a corresponding user-driven Teams process on the endpoint. |
| Command Line Pattern | `reg.exe add ... /v LimitBlankPasswordUse` | Monitor for command-line modifications to this specific registry key, which weakens security policy. |

## Detection & Response
-   **Behavioral Network Analysis**: The key to detection is context. While the destination IPs (Microsoft TURN servers) are legitimate, the source of the traffic is not. Deploy network traffic analysis tools that can correlate network flows with endpoint processes. Alert on server-to-Teams traffic or any process other than `teams.exe` communicating with Teams infrastructure.
-   **Go Malware Analysis**: Go-based malware can be difficult to analyze. Use specialized tools to reverse engineer Go binaries and extract C2 information and capabilities.
-   **Configuration Auditing**: Regularly audit system configurations for unauthorized changes, such as modifications to password policies (`LimitBlankPassword`) or firewall rules.
-   **D3FEND Techniques**: This scenario is a perfect use case for **[User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** and **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**. By baselining which users and processes normally interact with services like Teams, you can spot outliers like a server process communicating with a TURN relay.

## Mitigation
1.  **Egress Traffic Filtering**: While blocking all Microsoft IPs is not feasible, organizations can implement more granular egress filtering. Deny servers and service accounts from making direct outbound connections to the internet where possible. Route necessary traffic through an authenticated proxy.
2.  **Principle of Least Privilege**: Ensure service accounts have the minimum necessary permissions and cannot be used for interactive logon.
3.  **Harden Configurations**: Enforce strong security configurations via Group Policy and regularly audit for deviations. Settings like `LimitBlankPasswordUse` should never be disabled.
4.  **EDR Deployment**: A robust EDR solution is critical for detecting the post-exploitation activities (privilege escalation, persistence) that precede ransomware deployment.

**Tags:** C2, DragonForce, Go, Living off the Land, Microsoft Teams, RAT, Ransomware

## Sources
- [DragonForce Ransomware Exploited Microsoft Teams to Hide Attack](https://www.infosecurity-magazine.com/news/dragonforce-ransomware-hidden/)

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-abused-microsoft-teams-for-covert-c2/
