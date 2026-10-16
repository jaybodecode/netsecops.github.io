# ShinyHunters Bypasses WAFs in Renewed Oracle PeopleSoft Attacks

**Severity:** critical | **Category:** Vulnerability,Threat Actor,Cyberattack | **Updated:** 2026-09-26 | **Reading time:** 5 min

The threat actor group ShinyHunters (UNC6240) has resumed mass exploitation of a critical Oracle PeopleSoft vulnerability, CVE-2026-35273. The new campaign uses a URL-encoding trick to bypass Web Application Firewall (WAF) rules previously implemented as a mitigation. Google has notified over 100 organizations of their risk, with dozens already compromised. The attackers are deploying a new backdoor called SIDEEYE and using the legitimate remote management tool MeshCentral for persistence, expanding their targeting from universities to healthcare, technology, and government sectors.

## Executive Summary
On September 26, 2026, Google's Mandiant and Threat Intelligence Group (GTIG) reported a renewed mass exploitation campaign by the threat actor **[UNC6240](https://attack.mitre.org/groups/G1025)**, also known as **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**. The group is targeting a **critical** remote code execution (RCE) vulnerability, **CVE-2026-35273** (CVSS 9.8), in **[Oracle](https://www.oracle.com/)** PeopleSoft. The new attack wave successfully bypasses Web Application Firewall (WAF) rules that many organizations implemented after the initial exploitation in May-June 2026. The attackers are using a simple URL-encoding trick to circumvent these defenses, deploying web shells and a new backdoor named **SIDEEYE** on unpatched, internet-facing servers. The campaign has expanded beyond higher education to include healthcare, technology, and government entities, with dozens of systems already compromised.

---

## Threat Overview
The vulnerability, **CVE-2026-35273**, is an unauthenticated RCE flaw in **Oracle**'s PeopleSoft platform. The initial exploitation campaign occurred between May 27 and June 9, 2026, primarily targeting universities. In response, **Oracle** released an out-of-band patch on June 10, 2026. Organizations that failed to patch often resorted to implementing WAF rules to block malicious requests targeting the vulnerable `/PSEMHUB/*` endpoint.

However, **ShinyHunters** has adapted its tactics. The current campaign, which began in September 2026, leverages a WAF bypass technique. By encoding characters in the URL path (e.g., replacing 'P' with `%50`), the attackers can craft requests that are not blocked by pattern-matching WAF rules. The underlying **Oracle** WebLogic server decodes the URL, allowing the malicious request to reach the vulnerable component, leading to code execution. **[Google](httpswww.google.com)** has since alerted over 100 organizations to their exposure, confirming active compromises on dozens of systems.

## Technical Analysis
The core of the attack is the exploitation of **CVE-2026-35273** combined with a WAF bypass. The threat actors are using URL encoding to evade simple string-based firewall rules.

**Attack Chain:**
1.  **Initial Access:** The attacker sends a specially crafted HTTP request to an internet-facing **Oracle** PeopleSoft server. The request targets the `/PSEMHUB/` endpoint but with URL-encoded characters, such as `/%50SEMHUB/`, to bypass WAF rules looking for the literal string `/PSEMHUB/`. This leverages the [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) technique.
2.  **Execution:** The WebLogic server processes the request, decodes the URL, and passes it to the vulnerable PeopleSoft component, triggering the RCE flaw. This allows the attacker to execute arbitrary commands on the server.
3.  **Persistence & C2:** Post-exploitation, **ShinyHunters** deploys web shells for initial persistence. They have also been observed installing the legitimate remote management tool **MeshCentral** for secondary access and command and control ([`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)).
4.  **Payload Deployment:** In the latest intrusions, a new multi-stage backdoor called **SIDEEYE** is deployed on compromised Windows PeopleSoft servers. This backdoor provides extensive capabilities, including credential theft ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)), file and process management, and acting as a network proxy ([`T1090 - Proxy`](https://attack.mitre.org/techniques/T1090/)).

**MITRE ATT&CK Techniques Observed:**
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)
- [`T1499.004 - Web Application Firewall Bypass`](https://attack.mitre.org/techniques/T1499/004/)
- [`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/)
- [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)
- [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/)
- [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)
- [`T1090 - Proxy`](https://attack.mitre.org/techniques/T1090/)

## Impact Assessment
The business impact of this campaign is severe. Successful exploitation grants attackers full control over the PeopleSoft server, which often contains sensitive HR, financial, and student data. The expansion of targeting to healthcare, technology, and transportation sectors increases the risk of significant data breaches and operational disruption. The use of a WAF bypass demonstrates the unreliability of virtual patching as a long-term solution. Organizations that relied on WAF rules instead of applying the official **Oracle** patch are now fully exposed. The deployment of the **SIDEEYE** backdoor indicates a long-term interest in compromised networks for data exfiltration, lateral movement, and potentially ransomware deployment.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were listed in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns which could indicate related activity:

| Type | Value | Description |
|---|---|---|
| url_pattern | `/%50SEMHUB/` | A URL-encoded pattern used to bypass WAF rules. Monitor web server logs for variations of URL-encoded paths to `/PSEMHUB/`. |
| url_pattern | `/*/PSEMHUB/*` | Suspicious requests to the PeopleSoft PSEMHUB endpoint. |
| process_name | `MeshCentral.exe` | The presence of MeshCentral on a PeopleSoft server where it is not an authorized tool is highly suspicious. |
| file_name | `sideeye.dll` | Hypothetical filename for the SIDEEYE backdoor. Search for newly created suspicious DLLs or executables in PeopleSoft directories. |
| network_traffic_pattern | `Outbound traffic to meshcentral.com` | Monitor for unexpected outbound connections from PeopleSoft servers to MeshCentral C2 domains. |

## Detection & Response
- **Log Analysis:** Scrutinize web server and WAF logs for requests to the `/PSEMHUB/` endpoint, specifically looking for URL-encoded variations or requests that were passed through by the WAF. Enable logging for decoded URL requests if possible. D3FEND's [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is critical here.
- **Endpoint Detection:** Monitor PeopleSoft servers for the creation of new files, especially web shells (e.g., `.jsp`, `.aspx`) in web-accessible directories. Look for suspicious child processes spawned by the PeopleSoft application server process (e.g., `cmd.exe`, `powershell.exe`).
- **Threat Hunting:** Proactively hunt for the presence of **MeshCentral** agents or other unauthorized remote access tools on critical servers. Check for suspicious scheduled tasks or services configured for persistence.

## Mitigation
> Relying on WAF rules as a primary mitigation for a critical RCE vulnerability is insufficient. Patching should always be the priority.

1.  **Patch Immediately:** The most critical action is to apply **Oracle**'s security update for **CVE-2026-35273**. This is the only way to fully remediate the vulnerability. This aligns with D3FEND's [`D3-SU - Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Strengthen WAF Rules:** If patching cannot be immediately applied, update WAF rules to detect URL-encoded bypass attempts. Rules should normalize or decode URL paths before applying pattern matching. This is a temporary compensating control, not a substitute for patching.
3.  **Egress Filtering:** Implement strict egress filtering to block unauthorized outbound connections from PeopleSoft servers to the internet, which can prevent tools like **MeshCentral** from connecting to their C2 servers.
4.  **Assume Breach:** For organizations with unpatched, internet-facing PeopleSoft servers, assume a compromise has occurred. Initiate incident response procedures, hunt for web shells, backdoors, and unauthorized accounts.
5.  **Network Segmentation:** Isolate PeopleSoft servers from the rest of the network to limit the blast radius of a potential compromise. Restrict access to management ports and interfaces. This relates to D3FEND's [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).

## CVEs
- CVE-2026-35273 (CVSS 9.8) — CISA KEV

**Tags:** WAF Bypass, Remote Code Execution, URL Encoding, Virtual Patching, Mass Exploitation

## Sources
- [UNC6240 (ShinyHunters) Mass-Exploits Oracle PeopleSoft (CVE-2026-35273) by Bypassing WAF Rules](https://cloud.google.com/blog/topics/threat-intelligence/shinyhunters-renewed-mass-exploitation-campaign-targeting-oracle-peoplesoft) — Google Threat Intelligence (2026-09-26)
- [ShinyHunters bypass WAF to resume Oracle PeopleSoft CVE-2026-35273 attacks](https://www.bleepingcomputer.com/news/security/shinyhunters-uses-waf-bypass-trick-in-oracle-peoplesoft-attacks/) — BleepingComputer (2026-09-26)
- [Attackers Bypass WAFs to Exploit Oracle PeopleSoft Flaw in Renewed Attacks](https://thehackernews.com/2026/09/attackers-bypass-wafs-to-exploit-oracle.html) — The Hacker News
- [ShinyHunters Oracle zero-day: FBI attack just the start, Google warns](https://cybernews.com/security/shinyhunters-oracle-zero-day-fbi-attack-google-warning/) — Cybernews
- [ShinyHunters Bypass WAF Rules in New Oracle PeopleSoft Attacks](https://hackread.com/shinyhunters-bypass-waf-rules-oracle-peoplesoft-attacks/) — HackRead

---
Source: https://cyber.netsecops.io/articles/shinyhunters-bypasses-firewalls-in-renewed-oracle-peoplesoft-attacks/
