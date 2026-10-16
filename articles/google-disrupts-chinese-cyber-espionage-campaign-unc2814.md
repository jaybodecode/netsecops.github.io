# Google and Partners Dismantle Chinese Espionage Campaign (UNC2814) Targeting Global Telecoms

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2026-03-15 | **Reading time:** 5 min

Google's Threat Intelligence Group (GTIG), with partners including Mandiant, has disrupted a major cyber-espionage campaign attributed to UNC2814, a hacking group linked to the People's Republic of China. Active since at least 2017, the campaign compromised at least 53 telecommunication and government organizations in 42 countries across multiple continents. The group's goal was intelligence collection and monitoring communications. The takedown involved sinkholing attacker domains and blocking their use of Google Sheets for command-and-control (C2) communications. Google has notified the victims and released Indicators of Compromise (IOCs).

## Executive Summary
**[Google's Threat Intelligence Group (GTIG)](https://cloud.google.com/blog/topics/threat-intelligence)**, in collaboration with **[Mandiant](https://www.mandiant.com/)** and other partners, has taken significant action to disrupt a long-running, global cyber-espionage campaign attributed to the Chinese state-affiliated threat actor **UNC2814**. The campaign, active since at least 2017, has compromised a minimum of 53 organizations, primarily in the telecommunications and government sectors, across 42 countries. The group's primary objective is believed to be intelligence gathering. The disruption efforts included sinkholing the actor's command-and-control (C2) domains and disabling their abuse of **Google Sheets** as a covert C2 channel. Google has notified the identified victims and publicly shared IOCs to aid in broader defense efforts.

---

## Threat Overview
**UNC2814** is a sophisticated threat actor with a clear focus on strategic intelligence collection. Their targeting of telecommunication providers is a classic espionage tactic, as it provides access to a vast amount of communications data and a potential pathway into the networks of the providers' high-value customers.

*   **Scale:** The campaign's known scope is extensive, with 53 confirmed victim organizations in 42 countries spanning Central and South America, Africa, Europe, and Asia.
*   **Targets:** The primary targets are telecommunication companies and government entities.
*   **Motive:** Cyber-espionage, focused on monitoring communications and exfiltrating sensitive data.
*   **TTPs:** The group is notable for its use of legitimate cloud services for C2, a technique known as 'living off the cloud,' which helps their traffic blend in with normal enterprise activity.

## Technical Analysis
The use of Google Sheets for C2 is a key technical aspect of this campaign, demonstrating the actor's efforts to evade network-based detection.

### Attack Chain & TTPs
1.  **Initial Access:** The specific initial access vectors were not detailed in the reports, but for this type of actor, they typically include exploiting public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or spearphishing ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
2.  **Execution & Persistence:** Once inside a network, the actor deploys malware that establishes persistence on the compromised systems.
3.  **Command and Control ([`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/)):** The actor's malware used the **Google Sheets API** as its C2 channel. The malware would periodically connect to a specific, attacker-controlled Google Sheet to receive new commands and exfiltrate stolen data. This traffic is encrypted via **[HTTPS](https://en.wikipedia.org/wiki/HTTPS)** and directed to a legitimate Google domain (`sheets.googleapis.com`), making it extremely difficult to distinguish from legitimate business traffic without deep packet inspection or endpoint analysis.
4.  **Collection ([`T1119 - Automated Collection`](https://attack.mitre.org/techniques/T1119/)):** The malware would execute commands to collect data from compromised hosts and networks.
5.  **Exfiltration ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)):** Collected data was likely sent back to the attackers through the same Google Sheets channel.

### Disruption Efforts
*   **Infrastructure Takedown:** Google and its partners sinkholed the custom domains used by UNC2814 for other operational tasks.
*   **C2 Disruption:** Google blocked the attacker-controlled Google Sheets API and their associated C2 traffic, effectively severing the connection between the malware and its operators.
*   **Victim Notification:** Google directly notified the 53 identified victim organizations.
*   **Intelligence Sharing:** IOCs were publicly released to the security community.

## Impact Assessment
The long-running nature of this campaign suggests a significant intelligence loss for the affected organizations and nations.

*   **Strategic Espionage:** The compromise of national telecommunication providers and government bodies can lead to the loss of state secrets, economic data, and sensitive diplomatic communications.
*   **Widespread Surveillance:** By compromising telecoms, UNC2814 could potentially monitor the communications of millions of individuals and businesses.
*   **Long-Term Persistence:** An actor with a seven-year operational history likely established deep and resilient access within victim networks, making full remediation a complex and costly challenge.

## Detection & Response
Detecting the use of legitimate services for C2 is a major challenge for defenders.

### Detection Strategies
*   **Egress Traffic Analysis ([`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)):** While the destination (`google.com`) is legitimate, the pattern of traffic may be anomalous. Monitor for servers or workstations making regular, beacon-like connections to cloud storage or spreadsheet APIs. Legitimate use by a human is typically sporadic; automated malware C2 is often periodic (e.g., every 5 minutes).
*   **Endpoint Analysis:** Use EDR to look for non-browser processes (e.g., `svchost.exe`, `powershell.exe`, or an unknown binary) making API calls to `sheets.googleapis.com`.
*   **SSL/TLS Inspection:** Where possible and permissible by policy, decrypt outbound SSL/TLS traffic to inspect the content of API calls to services like Google Sheets, looking for suspicious commands or data structures.

## Mitigation
*   **Restrict Cloud Service Access ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/)):** For servers and systems that have no business reason to access public cloud services like Google Sheets, create firewall or proxy rules to deny access to those domains and APIs. This is a key part of an egress filtering strategy.
*   **Application Allowlisting:** Implement application allowlisting to prevent unauthorized or unknown malware from running on endpoints and servers.
*   **Assume Breach Mentality:** Given the stealth of actors like UNC2814, organizations, especially in targeted sectors, should assume they are compromised and actively hunt for threats within their networks rather than just trying to keep them out.

**Tags:** cyber-espionage, APT, China, C2, living off the land, Google Sheets, telecom, takedown

## Sources
- [Suspected Chinese Cyberespionage Operation Hits 53 Telecoms](https://www.bankinfosecurity.com/suspected-chinese-cyberespionage-operation-hits-53-telecoms-a-24452) — BankInfoSecurity (2026-02-27)
- [Google Shuts Down Chinese Hackers’ Infrastructure Behind Telecom and Government Breach](https://www.cyberpress.com/google-shuts-down-chinese-hackers-infrastructure-behind-telecom-and-government-breach/) — Cyberpress (2026-02-26)

---
Source: https://cyber.netsecops.io/articles/google-disrupts-chinese-cyber-espionage-campaign-unc2814/
