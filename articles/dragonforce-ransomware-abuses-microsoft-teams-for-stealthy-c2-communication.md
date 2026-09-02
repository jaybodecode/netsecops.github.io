# DragonForce Ransomware Hides C2 Traffic in Microsoft Teams to Evade Detection for Months

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-06-19 | **Reading time:** 5 min

The DragonForce ransomware group has deployed a novel Go-based backdoor, 'Backdoor.Turn', that abuses Microsoft Teams' TURN relay servers to disguise its command-and-control (C2) communications. This sophisticated technique allowed the threat actors to remain undetected on a victim's network for up to two months by making their malicious traffic appear as legitimate Teams activity. The attack highlights a new level of tradecraft for the group, making detection through traditional network filtering methods exceptionally difficult.

## Executive Summary

The **[DragonForce](https://malpedia.caad.fkie.fraunhofer.de/actor/dragonforce)** ransomware group has demonstrated a significant evolution in its technical capabilities by using **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** infrastructure for covert command-and-control (C2) communications. In a recent incident targeting a U.S. services firm, the group deployed a custom Go-based backdoor known as **Backdoor.Turn**. This malware cleverly abuses the Traversal Using Relays around NAT (TURN) protocol and legitimate **[Microsoft](https://www.microsoft.com/security)** relay servers to establish a C2 channel. By wrapping its traffic to look like standard Teams activity, the threat actor was able to persist on the network for one to two months before detection. This technique represents a sophisticated method of defense evasion that challenges conventional network security monitoring and requires advanced behavioral analysis to uncover.

---

## Threat Overview

**[DragonForce](https://malpedia.caad.fkie.fraunhofer.de/actor/dragonforce)**, a threat actor active since at least June 2023, has escalated its operations from a standard ransomware-as-a-service (RaaS) model to a more organized and technically proficient group. The attack began with an initial intrusion into a U.S. services firm in December 2025, likely through an unpatched SQL server. After gaining a foothold, the attackers used a multi-stage process involving DLL sideloading and exploitation of a **[Huawei](https://www.huawei.com/en/psirt)** driver vulnerability to escalate privileges.

The most notable aspect of the attack is the deployment of **Backdoor.Turn**. This malware is specifically designed to abuse **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)**' TURN relay servers. The malware first obtains an anonymous visitor token from **[Microsoft](https://www.microsoft.com/security)**'s Skype services, then uses a legitimate TURN server to broker a connection. This initial communication appears as normal Teams traffic. Once the connection is relayed, the backdoor establishes a direct, encrypted QUIC session with the true C2 server, effectively bypassing perimeter security controls that might otherwise block connections to suspicious IPs.

## Technical Analysis

The attack chain demonstrates a high level of operational security and technical skill:

1.  **Initial Access:** Believed to be via an unknown vulnerability in an SQL or MSSQL server. The possibility of access being purchased from an initial access broker has not been ruled out.
2.  **Defense Evasion & Privilege Escalation:** The attackers used [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/), loading their malicious code using a legitimate executable (`DbgView64.exe`). They then exploited a then-undocumented vulnerability in a **[Huawei](https://www.huawei.com/en/psirt)** driver to escalate privileges to SYSTEM.
3.  **Command and Control:** This is the most innovative part of the attack, leveraging [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/) and [`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/).
    *   **Backdoor.Turn** authenticates to **[Microsoft](https://www.microsoft.com/security)**'s identity services to get a temporary token.
    *   It uses this token to connect to a legitimate **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** TURN server.
    *   The TURN server relays the connection setup to the attacker's C2 server.
    *   A direct peer-to-peer QUIC session is then established between the implant and the C2 server, with the TURN server dropping out of the communication path. From a firewall or proxy perspective, the initial connection is to a trusted **[Microsoft](https://www.microsoft.com/security)** IP, making it difficult to block.
4.  **Actions on Objectives:** The **Backdoor.Turn** malware provides standard RAT capabilities, including remote command execution ([`T1059.003 - Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/)), network scanning ([`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/)), and credential theft ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)).

## Impact Assessment

The primary impact of this technique is prolonged and stealthy network persistence. By masquerading C2 traffic as legitimate **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** activity, **[DragonForce](https://malpedia.caad.fkie.fraunhofer.de/actor/dragonforce)** can evade detection for extended periods, allowing them ample time to conduct reconnaissance, move laterally, and exfiltrate large volumes of data before deploying ransomware. This significantly increases the dwell time and the potential damage from an intrusion. For the victimized U.S. services firm, this meant the attackers were active on their network for up to two months, likely resulting in a comprehensive compromise of their environment before the final ransomware payload was executed.

### IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this type of activity:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Outbound UDP/3478 | Monitor for unexpected or high-volume traffic on port 3478 (STUN/TURN) from servers or endpoints that do not typically use real-time communication applications. |
| Network Traffic Pattern | QUIC traffic to non-Microsoft IPs | After an initial TURN handshake with a Microsoft IP, look for subsequent direct QUIC (UDP/443) sessions to unknown or untrusted IP addresses. |
| Process Name | `DbgView64.exe` | Monitor for the execution of this legitimate Sysinternals tool, especially if it is running from an unusual directory or has unexpected network connections. |
| Log Source | `Firewall/Proxy Logs` | Analyze logs for patterns where an internal host communicates with a known Microsoft TURN server IP and then immediately initiates a long-lived, high-volume UDP session to an unrelated external IP. |

## Detection & Response

Detecting this attack requires moving beyond simple IP/domain blocklists.

1.  **Network Traffic Analysis:** Employ **[D3FEND](https://d3fend.mitre.org/)**'s [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) (NTA). Baseline normal **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** traffic patterns within your environment. Look for outliers, such as servers initiating TURN sessions or endpoints with unusual data transfer volumes within QUIC sessions that follow a TURN handshake.
2.  **TLS/SSL Inspection:** Where possible, decrypt and inspect traffic to identify anomalies in protocol usage. While the QUIC session is encrypted, the initial setup might reveal clues.
3.  **Endpoint Behavioral Analysis:** Use an EDR solution to detect the initial stages of the attack. Monitor for legitimate processes like `DbgView64.exe` loading unusual DLLs or making network connections. Look for processes that exploit driver vulnerabilities for privilege escalation.
4.  **Log Aggregation:** Correlate endpoint process logs with network flow data. An EDR alert for DLL sideloading followed by anomalous TURN/QUIC network activity from the same host is a strong indicator of a **Backdoor.Turn** compromise.

## Mitigation

1.  **Egress Traffic Filtering:** Implement strict egress filtering rules. While blocking all **[Microsoft](https://www.microsoft.com/security)** IPs is not feasible, restrict outbound TURN (UDP/3478) and QUIC (UDP/443) traffic from servers and systems that have no business need for real-time communication applications like Teams. This is a key **[D3FEND](https://d3fend.mitre.org/)** [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) strategy.
2.  **Patch Management:** Ensure all public-facing applications, especially SQL/MSSQL servers, are fully patched to prevent initial access. This aligns with [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
3.  **Application Control:** Use application control solutions to prevent the execution of unauthorized or suspicious tools like `DbgView64.exe` from non-standard locations. This maps to [`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/).
4.  **Driver Blacklisting:** Maintain a blacklist of known vulnerable drivers to prevent their loading, which would block the privilege escalation vector used in this attack.

**Tags:** DragonForce, Ransomware, Backdoor.Turn, Microsoft Teams, C2, TURN, QUIC, Defense Evasion

## Sources
- [Microsoft Teams Relay Servers Abused in DragonForce Ransomware Attack](https://www.securityweek.com/microsoft-teams-relay-servers-abused-in-dragonforce-ransomware-attack/) — SecurityWeek
- [DragonForce Hid Inside Microsoft Teams and Nobody Noticed for Two Months](https://securityaffairs.com/193801/security/dragonforce-hid-inside-microsoft-teams-and-nobody-noticed-for-two-months.html) — Security Affairs
- [DragonForce Hackers Abuse Microsoft Teams Relays to Hide Backdoor.Turn C2 Traffic](https://thehackernews.com/2026/06/dragonforce-hackers-abuse-microsoft.html) — The Hacker News
- [DragonForce Ransomware Exploited Microsoft Teams to Hide Attack](https://www.infosecurity-magazine.com/news/dragonforce-ransomware-hidden/) — Infosecurity Magazine

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-abuses-microsoft-teams-for-stealthy-c2-communication/
