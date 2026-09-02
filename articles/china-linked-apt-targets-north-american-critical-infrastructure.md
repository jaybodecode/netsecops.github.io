# China-Linked APT 'UAT-8837' Targets North American Critical Infrastructure

**Severity:** high | **Category:** Threat Actor,Cyberattack,Industrial Control Systems | **Updated:** 2026-01-23 | **Reading time:** 6 min

A new report from Cisco Talos has identified a China-nexus Advanced Persistent Threat (APT) group, tracked as UAT-8837, actively targeting critical infrastructure organizations in North America since at least 2025. The group gains initial access by exploiting public-facing vulnerabilities, including a zero-day in SiteCore products (CVE-2025-53690), and using compromised credentials. Once inside, UAT-8837 employs a variety of open-source tools, such as the Earthworm utility for creating reverse tunnels, to conduct reconnaissance, exfiltrate data, and maintain persistence. Cisco Talos assesses with medium confidence that the group is linked to China, highlighting the ongoing threat of state-sponsored espionage against vital sectors.

## Executive Summary
**[Cisco Talos](https://talosintelligence.com/)** has identified an ongoing campaign by a suspected Chinese state-sponsored threat actor, designated **UAT-8837**, targeting critical infrastructure in North America. The campaign, active since at least 2025, leverages a combination of zero-day exploits and open-source tooling to achieve initial access, maintain persistence, and exfiltrate data. The group has been observed exploiting **CVE-2025-53690**, a vulnerability in **[SiteCore](https://www.sitecore.com/)** products, to breach target networks. Post-compromise, UAT-8837 uses tools like the **Earthworm** tunneler to establish covert command-and-control channels. This activity aligns with a broader pattern of nation-state actors targeting vital sectors for espionage and potential disruption, posing a significant risk to national security.

---

## Threat Overview
UAT-8837 is an Advanced Persistent Threat (APT) group that exhibits tactics, techniques, and procedures (TTPs) consistent with other China-nexus actors. Their primary objective appears to be long-term intelligence gathering from high-value targets within North American critical infrastructure sectors. The group demonstrates operational flexibility, adapting its toolset to evade detection and leveraging both known and zero-day vulnerabilities for initial access.

The use of the Earthworm tool is particularly notable. Earthworm is a lightweight and versatile network tunneling utility popular among Chinese APT groups for creating SOCKS proxy connections and reverse shells. This allows attackers to pivot from a compromised external system to internal network segments, bypassing perimeter firewalls. By using such open-source tools, the group can blend in with legitimate network traffic and make attribution more challenging.

---

## Technical Analysis
The attack lifecycle of UAT-8837 follows a methodical, multi-stage process:

1.  **Initial Access:** The primary vector observed is the exploitation of public-facing web applications. The group has specifically targeted **CVE-2025-53690** in SiteCore products ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)). They also use compromised credentials, likely obtained through phishing or credential stuffing attacks ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).

2.  **Execution & Persistence:** After gaining a foothold, the attackers deploy various tools to execute commands and establish persistence. This includes dropping web shells on compromised servers ([`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/)) and creating scheduled tasks or services to ensure their malware survives a reboot.

3.  **Defense Evasion & Command and Control:** The group heavily relies on the **Earthworm** tool to create encrypted reverse tunnels to their C2 infrastructure. This technique, known as Protocol Tunneling ([`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/)), helps them evade network-based detection by encapsulating malicious traffic within a legitimate-looking protocol.

4.  **Discovery & Collection:** Once persistence is established, UAT-8837 conducts extensive internal reconnaissance to map the network, identify domain controllers, and locate sensitive data repositories ([`T1018 - Remote System Discovery`](https://attack.mitre.org/techniques/T1018/)). Data is then staged and prepared for exfiltration.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Technique Name |
| :--- | :--- | :--- |
| Initial Access | `T1190` | Exploit Public-Facing Application |
| Initial Access | `T1078` | Valid Accounts |
| Execution | `T1059.003` | Windows Command Shell |
| Persistence | `T1505.003` | Web Shell |
| Command and Control | `T1572` | Protocol Tunneling |
| Discovery | `T1018` | Remote System Discovery |

---

## Impact Assessment
The targeting of critical infrastructure by a nation-state actor like UAT-8837 carries severe potential consequences:
*   **Espionage:** The primary goal is likely the theft of sensitive intellectual property, operational plans, and government data that could provide a strategic advantage to China.
*   **Disruption:** While the current campaign appears focused on espionage, the access and persistence established could be leveraged in the future to disrupt or sabotage critical services, such as power grids, water treatment facilities, or transportation networks.
*   **Pre-positioning:** The actor may be pre-positioning itself within these networks to maintain long-term access, which can be activated during a time of geopolitical tension or conflict.
*   **Loss of Confidence:** Successful intrusions into critical infrastructure can erode public trust in the government's and private sector's ability to protect essential services.

---

## Cyber Observables for Detection
Security teams should hunt for TTPs associated with UAT-8837:

| Type | Value | Description |
| :--- | :--- | :--- |
| process_name | `ew.exe`, `ew_for_linux` | The default filenames for the Earthworm tunneling tool. |
| network_traffic_pattern | Unusual outbound connections on high ports | Earthworm and other reverse tunnel tools often connect back to C2 servers on non-standard ports. |
| log_source | Web server logs | Look for requests exploiting CVE-2025-53690 in SiteCore or the presence of newly created ASPX/PHP files in web-accessible directories. |
| command_line_pattern | `ew -s rssocks -l 1080 -e 8888` | Example command line for starting an Earthworm reverse SOCKS proxy. Monitor for such patterns. |

---

## Detection & Response
*   **Network Traffic Analysis (D3-NTA):** Use **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to identify the covert channels created by tools like Earthworm. Look for long-lived, steady connections to unknown external IP addresses, a hallmark of reverse tunnels. Deep packet inspection can also help identify the specific protocol used by Earthworm.
*   **Endpoint Monitoring (D3-PA):** Deploy EDR solutions to monitor for the execution of suspicious binaries and command-line arguments. Use **[Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to create detection rules for the known execution patterns of Earthworm and other common open-source hacking tools.
*   **Vulnerability Scanning:** Regularly scan public-facing assets for known vulnerabilities, paying special attention to CVEs known to be exploited by APT groups, such as **CVE-2025-53690**.

---

## Mitigation
Defending against a persistent threat like UAT-8837 requires a proactive and layered security approach.

1.  **Patch Management (M1051):** Aggressively patch all internet-facing systems. Prioritize vulnerabilities that are known to be actively exploited by threat actors. For critical flaws like CVE-2025-53690, patching should be treated as an emergency. This maps to **[Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.

2.  **Restrict Web-Based Content (M1021):** Implement a web application firewall (WAF) to inspect incoming traffic to web servers and block malicious requests attempting to exploit vulnerabilities. This can serve as a compensating control if a patch is not yet available. This relates to **[Inbound Traffic Filtering (D3-ITF)](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.

3.  **Egress Traffic Filtering (M1037):** Enforce strict egress filtering rules to prevent tools like Earthworm from establishing outbound C2 connections. Deny all outbound traffic by default and only allow connections to known-good, necessary destinations on specific ports.

4.  **Application Whitelisting (M1038):** Use application control solutions to prevent the execution of unauthorized software, such as Earthworm or other hacking tools, on critical servers. This is a form of **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.

## CVEs
- CVE-2025-53690

**Tags:** APT, UAT-8837, China, Cisco Talos, Critical Infrastructure, CVE-2025-53690, Earthworm

## Sources
- [Chinese hackers targeting 'high value' North American critical infrastructure, Cisco says](https://therecord.media/cisco-talos-china-critical-infrastructure-sitecore-vulnerability) — The Record (2026-01-15)
- [Predicting 2026](https://blog.talosintelligence.com/predicting-2026/) — Cisco Talos (2026-01-15)

---
Source: https://cyber.netsecops.io/articles/china-linked-apt-targets-north-american-critical-infrastructure/
