# AI-Assisted Campaign by GreyNoise13 Hits 22 Orgs via Check Point Flaws

**Severity:** high | **Category:** Threat Actor,Cyberattack,Vulnerability | **Updated:** 2026-11-25 | **Reading time:** 5 min

A threat actor tracked as GreyNoise13 (GT13) has compromised at least 22 organizations globally in a sophisticated, AI-assisted hacking campaign targeting Check Point Security Management servers since mid-October 2026. The attackers are leveraging a chain of critical vulnerabilities for initial access, including flaws in Check Point, Citrix, and Ivanti products, impacting critical sectors like energy, finance, and government across eight countries.

## Executive Summary
Since at least October 17, 2026, a threat actor designated **GreyNoise13 (GT13)** has been conducting a widespread and sophisticated campaign, compromising at least 22 organizations by targeting **[Check Point](https://www.checkpoint.com/)** Security Management servers. According to **[GreyNoise Intelligence](https://www.greynoise.io/)**, the campaign is notable for its use of AI-driven tooling to automate scanning and exploitation, combined with hands-on-keyboard activity for post-compromise actions. The attackers have successfully breached organizations in the energy, transportation, financial services, and government sectors across the U.S., U.K., Europe, and Asia. Initial access is gained by exploiting a number of known critical vulnerabilities, including a patched authentication bypass in Check Point SmartConsole (**CVE-2026-16232**). The actor's motives and attribution remain unknown.

---

## Threat Overview
The campaign, attributed to the previously unknown group **GreyNoise13 (GT13)**, demonstrates a blended approach of automation and manual intrusion. The attackers use AI-powered tools to efficiently scan for and exploit vulnerable internet-facing systems. Once initial access is achieved, the actor transitions to hands-on techniques for lateral movement and data exfiltration. The global reach of the campaign, spanning at least eight countries, and the targeting of critical infrastructure sectors, mark this as a significant threat.

The operational infrastructure consists of 99 IP addresses, including disposable servers and egress nodes routed through the **[ExpressVPN](https://www.expressvpn.com/)** service to obscure their origin. A compromised server was repurposed as an operational relay to manage command-and-control (C2) and aggregate stolen data from victims.

## Technical Analysis
The attack chain involves multiple stages and leverages several known vulnerabilities for initial access. The actor does not rely on a single entry point but opportunistically exploits a range of unpatched systems.

### Initial Access
GT13 exploits a series of critical vulnerabilities, including:
- **CVE-2026-16232:** A critical authentication bypass in Check Point SmartConsole, patched in July 2026, which allows an attacker to gain administrative privileges.
- **CVE-2025-5777:** A vulnerability in Citrix Netscaler.
- **CVE-2024-21893:** A flaw in Ivanti products.
- **CVE-2026-41089:** A vulnerability in Windows Netlogon.
- **CVE-2026-61500:** A vulnerability in Rejetto HFS (HTTP File Server), which was used as a relay after compromising Check Point servers.

This multi-vulnerability approach is mapped to MITRE ATT&CK technique [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).

### Post-Exploitation
Once inside the network, GT13 engages in hands-on-keyboard activity. Observed TTPs include:
- **Internal Reconnaissance:** Using tools like **[Nmap](https://nmap.org/)** to map the internal network. ([`T1046 - Network Service Discovery`](https://attack.mitre.org/techniques/T1046/)).
- **Lateral Movement & C2:** Employing **[Impacket](https://github.com/fortra/impacket)** for interacting with Windows network protocols, **Chisel** for creating secure tunnels, and **Paramiko** for SSH connections. This corresponds to techniques like [`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/) and [`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/).

## Impact Assessment
The compromise of 22 organizations, including those in critical sectors like energy and finance, represents a substantial security incident. The primary impact is the exfiltration of sensitive data from Check Point Security Management servers, which centrally manage an organization's security policies. This could expose firewall rules, network topology, and other critical security information, enabling more severe follow-on attacks. The use of AI for automation suggests the threat actor can operate at a scale and speed that challenges traditional defensive postures.

## IOCs — Directly from Articles
No specific file hashes or IP addresses were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `nmap.exe`, `chisel.exe` | Presence of these tools on servers, especially security management servers, is highly anomalous. |
| Command-Line Pattern | `impacket-` | Look for command-line arguments related to Impacket tools like `psexec.py`, `secretsdump.py`. |
| Network Traffic Pattern | Egress traffic to ExpressVPN IP ranges | Monitor for unexpected connections from sensitive internal servers to known VPN provider IP blocks. |
| Log Source | Check Point SmartConsole Logs | Scrutinize for anomalous login events, especially those bypassing expected authentication methods, related to CVE-2026-16232. |

## Detection & Response
1.  **Vulnerability Scanning:** Prioritize scanning for all CVEs mentioned, especially `CVE-2026-16232` on Check Point servers.
2.  **Log Analysis:** Ingest and analyze logs from Check Point devices, VPN concentrators, and Active Directory. Look for authentication anomalies and the execution of suspicious tools (`Nmap`, `Impacket`).
3.  **Network Monitoring:** Implement egress filtering and monitoring. Alerts should be generated for connections from management servers to known VPN or anonymizer services. D3FEND's `[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)` is key here.
4.  **Endpoint Detection:** Deploy EDR solutions on critical servers to detect suspicious process chains, such as a web server spawning `nmap.exe` or `powershell.exe`.

## Mitigation
1.  **Urgent Patching:** Immediately apply patches for all listed vulnerabilities: `CVE-2026-16232` (Check Point), `CVE-2025-5777` (Citrix), `CVE-2024-21893` (Ivanti), `CVE-2026-41089` (Windows), and `CVE-2026-61500` (Rejetto HFS).
2.  **Restrict Management Interface Access:** Check Point Security Management interfaces should not be exposed to the public internet. Access should be restricted to a limited set of trusted IP addresses via strict firewall rules.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA on all administrative accounts, especially for critical infrastructure like security management consoles.
4.  **Network Segmentation:** Segment management networks from general user networks to prevent lateral movement from less secure parts of the environment.

## CVEs
- CVE-2025-5777
- CVE-2024-21893
- CVE-2026-41089
- CVE-2026-61500
- CVE-2026-16232

**Tags:** GreyNoise13, GT13, AI, Check Point, Cyberattack, Threat Actor

## Sources
- [Check Point servers hacked in AI-enabled campaign](https://www.cybersecuritydive.com/news/ai-enabled-campaign-targets-check-point-security-management-servers/875622/) — Cybersecurity Dive (2026-11-24)
- [Check Point Security Management Servers Hacked in AI-Assisted Campaign](https://www.securityweek.com/check-point-security-management-servers-hacked-in-ai-assisted-campaign/) — SecurityWeek (2026-11-24)
- [Daily Cybersecurity News – November 25, 2026](https://cyberrecaps.com/news/cybersecurity-news-november-25-2026) — CyberRecaps (2026-11-25)

---
Source: https://cyber.netsecops.io/articles/ai-assisted-hacking-campaign-compromises-check-point-servers/
