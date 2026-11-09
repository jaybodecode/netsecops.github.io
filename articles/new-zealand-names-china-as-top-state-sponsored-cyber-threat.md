# New Zealand NCSC Report Names China as Top Cyber Threat

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Policy and Compliance | **Updated:** 2026-10-03 | **Reading time:** 4 min

New Zealand's National Cyber Security Centre (NCSC) has officially identified China as the most 'persistent and capable' state-sponsored cyber threat to the nation. An annual report reveals that state-backed actors were linked to 86 nationally significant cyber incidents in the past year, targeting critical sectors like government, healthcare, and IT as part of long-term espionage campaigns.

## Executive Summary

In a significant geopolitical statement, **[New Zealand's National Cyber Security Centre (NCSC)](https://www.ncsc.govt.nz/)** has officially named the People's Republic of **[China](https://attack.mitre.org/groups/G0096/)** as the primary state-sponsored cyber threat facing the country. The NCSC's annual Cyber Threat Report, covering the year to June 2026, states that China is the "most persistent and capable state actor" conducting cyber operations against New Zealand's interests. The report links state-sponsored actors to 86 of 369 nationally significant cyber incidents, highlighting a sustained campaign of espionage targeting critical sectors and national information.

## Threat Overview

The NCSC, part of New Zealand's intelligence apparatus, has observed a consistent pattern of cyber espionage targeting a broad range of organizations. The primary goal of these campaigns appears to be intelligence gathering, with threat actors establishing long-term, stealthy access to networks. This allows them to conduct reconnaissance and exfiltrate data over months or years before being detected.

The report also noted cyber activities linked to **Iran**, **North Korea**, and **Russia**, but singled out China for the scale and sophistication of its operations. This aligns with previous assessments from New Zealand's security agencies and reflects a growing trend of geopolitical competition playing out in cyberspace, particularly in the South Pacific region.

## Technical Analysis

The TTPs associated with state-sponsored espionage groups like those attributed to China are typically characterized by a "low-and-slow" approach, prioritizing stealth over speed. Analyst assessment suggests the following MITRE ATT&CK techniques are relevant:

*   **Reconnaissance:** Extensive open-source intelligence (OSINT) gathering ([`T1593 - Search Open Websites/Domains`](https://attack.mitre.org/techniques/T1593/)) to identify key personnel and infrastructure.
*   **Initial Access:** Sophisticated spearphishing campaigns ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)) and exploitation of public-facing applications ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) are common entry vectors.
*   **Persistence:** Actors establish multiple persistence mechanisms, such as creating new services ([`T1543.003 - Windows Service`](https://attack.mitre.org/techniques/T1543/003/)) or using scheduled tasks ([`T1053.005 - Scheduled Task`](https://attack.mitre.org/techniques/T1053/005/)), to ensure long-term access even if one method is discovered.
*   **Credential Access:** Techniques like OS credential dumping ([`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/)) are used to harvest credentials for lateral movement.
*   **Exfiltration:** Data is often compressed, encrypted, and exfiltrated over common protocols like HTTPS to blend in with normal network traffic ([`T1041 - Exfiltrate Data to C2`](https://attack.mitre.org/techniques/T1041/)).

## Impact Assessment

The primary impact of this state-sponsored activity is the long-term strategic loss for New Zealand. The theft of sensitive government information, intellectual property, and personal data can undermine national security, economic competitiveness, and diplomatic relationships. By targeting critical sectors like healthcare and IT service providers, these actors can also gain access to vast amounts of data and potentially disrupt essential services. The targeting of infrastructure in the wider South Pacific region indicates a broader effort to gain geopolitical influence.

## Affected Organizations

The report identifies a wide array of targeted sectors within New Zealand, including:
- Government agencies
- Healthcare providers
- Educational institutions
- Information Technology (IT) service providers

This broad targeting demonstrates an intent to gather intelligence across all facets of New Zealand's society and economy.

## Detection & Response

Detecting advanced persistent threats (APTs) requires a mature security program:
1.  **Behavioral Analysis:** Use [`D3-UBA - User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) to detect anomalous account activity, such as logins at unusual times or from strange locations, which could indicate a compromised account.
2.  **Threat Intelligence Integration:** Integrate high-quality threat intelligence feeds into SIEM and firewall technologies to block known malicious IPs and domains associated with state-sponsored actors.
3.  **Proactive Threat Hunting:** Assume a breach has occurred and proactively hunt for signs of compromise. This involves developing hypotheses based on known APT TTPs and searching for relevant artifacts in logs and endpoint data.

## Mitigation

Defending against well-resourced state actors requires a robust, defense-in-depth approach:
1.  **Secure the Supply Chain:** For IT service providers, securing their own environments is critical to prevent attacks on their downstream customers ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/)).
2.  **Network Segmentation:** Implement network segmentation to make it harder for attackers to move laterally from a compromised system to more sensitive parts of the network ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
3.  **Privileged Access Management (PAM):** Strictly control and monitor the use of privileged accounts. Implement just-in-time access and require MFA for all administrative functions ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/)).
4.  **Comprehensive Logging:** Ensure comprehensive logging is enabled for critical systems, including endpoints, servers, and network devices, and that logs are retained for a sufficient period to support incident investigation ([`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/)).

**Tags:** state-sponsored, APT, espionage, geopolitics, China, New Zealand

## Sources
- [China Biggest State-Backed Cyber Threat to New Zealand, Security Agency Says](https://ipdefenseforum.com/2026/10/china-biggest-state-backed-cyber-threat-to-new-zealand-security-agency-says/) — IP Defense Forum
- [Cyber Threats mounting for NZ](https://www.nzpillar.com/news/cyber-threats-mounting-for-nznbsp) — NZ Pillar

---
Source: https://cyber.netsecops.io/articles/new-zealand-names-china-as-top-state-sponsored-cyber-threat/
