# GAME OVER: 'Operation Endgame' Dismantles Global Cybercrime Services

**Severity:** high | **Category:** Threat Actor,Malware,Incident Response | **Updated:** 2025-11-13 | **Reading time:** 5 min

In a massive international crackdown dubbed 'Operation Endgame,' law enforcement agencies from 11 countries, coordinated by Europol, have dismantled the infrastructure of three major cybercrime-as-a-service platforms: the Rhadamanthys information stealer, the VenomRAT remote access trojan, and the Elysium botnet. The operation resulted in the seizure of over 1,025 servers, the takedown of 20 domains, and the arrest of the main suspect behind VenomRAT. The targeted malware was responsible for infecting hundreds of thousands of computers worldwide, stealing vast amounts of data, including millions in cryptocurrency.

## Executive Summary
A landmark international law enforcement effort, named **Operation Endgame**, has successfully dismantled the infrastructure of several prominent malware-as-a-service (MaaS) operations. Coordinated by **[Europol](https://www.europol.europa.eu)** between November 10 and 14, 2025, the operation targeted the **[Rhadamanthys](https://malpedia.caad.fkie.fraunhofer.de/details/win.rhadamanthys)** information stealer, the **[VenomRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.venomrat)** remote access trojan, and the Elysium botnet. The coordinated action involved authorities from 11 nations and resulted in the seizure of over 1,025 servers, the disruption of 20 domains, and one key arrest. This takedown represents a significant blow to the cybercrime ecosystem that relies on these tools for initial access, data theft, and further malware deployment.

---

## Threat Overview
**Operation Endgame** was a meticulously planned and executed takedown targeting the core infrastructure that enabled thousands of cybercriminals globally. The three primary targets were:
- **[Rhadamanthys](https://malpedia.caad.fkie.fraunhofer.de/details/win.rhadamanthys)**: A sophisticated information stealer sold on a subscription basis. It was designed to exfiltrate a wide range of sensitive data from infected systems, including browser credentials, cryptocurrency wallet data, and system information. Authorities found evidence of over 100,000 compromised crypto wallets linked to its main operator.
- **[VenomRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.venomrat)**: A remote access trojan that provided attackers with full control over a victim's computer. It was used for surveillance, data exfiltration, and as a dropper for other malware, such as ransomware.
- **Elysium Botnet**: A network of compromised computers used to facilitate the criminal operations, likely for proxying traffic and hosting malicious content.

The operation was a collaborative effort involving law enforcement from the US, UK, Germany, France, the Netherlands, and others, with crucial intelligence support from private sector partners like **[Proofpoint](https://www.proofpoint.com/us)**, **[CrowdStrike](https://www.crowdstrike.com/)**, and Have I Been Pwned.

## Technical Analysis
The targeted malware families employed common but effective TTPs to achieve their objectives. The typical attack chain involved:
1.  **Initial Access** ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)): Malware was often distributed via phishing emails containing malicious attachments or links.
2.  **Execution** ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)): The user is tricked into executing the malware payload.
3.  **Credential Access** ([`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)): **[Rhadamanthys](https://malpedia.caad.fkie.fraunhofer.de/details/win.rhadamanthys)** would systematically harvest credentials from web browsers, email clients, and FTP applications.
4.  **Collection** ([`T1560 - Archive Collected Data`](https://attack.mitre.org/techniques/T1560/)): Stolen data was staged and compressed for exfiltration.
5.  **Command and Control** ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)): Both **[Rhadamanthys](https://malpedia.caad.fkie.fraunhofer.de/details/win.rhadamanthys)** and **[VenomRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.venomrat)** communicated with C2 servers over standard web protocols (HTTP/HTTPS) to receive commands and exfiltrate data.
6.  **Impact** ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)): While not their primary function, RATs like **[VenomRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.venomrat)** are frequently used to deploy secondary payloads like ransomware.

## Impact Assessment
The impact of these malware operations was vast. The seized infrastructure revealed over 525,000 infections across 226 countries between March and November 2025 alone, with 86 million individual records collected. The financial impact is estimated to be in the millions of euros, particularly from drained cryptocurrency wallets. The disruption of these services will have a significant, albeit potentially temporary, effect on the cybercrime economy, forcing many threat actors to seek alternative tools and infrastructure. As part of the remediation, 2 million email addresses and 7.4 million passwords were shared with the Have I Been Pwned service to notify victims.

## IOCs
No specific file hashes or IP addresses were released in the public announcements. The focus was on the takedown of the backend infrastructure.

## Detection & Response
While the primary C2 infrastructure for these families has been dismantled, copycat versions or resurgent operations may appear.
- **Network Monitoring**: Monitor for and block traffic to known malicious domains and IPs associated with malware families. Use D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to identify anomalous outbound connections.
- **Endpoint Detection**: Use EDR solutions to detect common infostealer and RAT behaviors, such as hooking browser processes, accessing credential stores, and making suspicious network connections. Look for process injection and unusual file creation in user profile directories. Use D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Credential Monitoring**: Monitor for credential dumps and use services like Have I Been Pwned to be alerted if company credentials appear in breaches.

## Mitigation
1.  **User Training** ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)): Since phishing is the primary initial access vector, robust and continuous security awareness training is crucial to teach employees how to identify and report suspicious emails.
2.  **Email Security Gateways**: Implement advanced email filtering solutions that can scan for malicious attachments, links, and sender reputation to block phishing attempts before they reach the user's inbox.
3.  **Multi-Factor Authentication (MFA)** ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)): Enforce MFA on all external and internal services, especially for email, VPN, and critical applications. This is the single most effective control against credential theft.
4.  **Endpoint Protection**: Deploy a modern EDR/XDR solution capable of behavior-based detection to identify and block malware like infostealers and RATs, even if their signatures are unknown. This aligns with [`M1049 - Antivirus/Antimalware`](https://attack.mitre.org/mitigations/M1049/).

**Tags:** Operation Endgame, Rhadamanthys, VenomRAT, Europol, Cybercrime, Takedown, Infostealer, RAT

## Sources
- [End of the game for cybercrime infrastructure: 1025 servers taken down - Operation Endgame's latest phase targeted the infostealer Rhadamanthys, Remote Access Trojan VenomRAT, and the botnet Elysium](https://www.europol.europa.eu/media-press/newsroom/news/end-of-game-for-cybercrime-infrastructure-1025-servers-taken-down) — Europol
- [Rhadamanthys infostealer operation disrupted by law enforcement](https://www.helpnetsecurity.com/2025/11/13/operation-endgame-rhadamanthys/) — Help Net Security
- [Operation Endgame Dismantles Rhadamanthys, Venom RAT, and Elysium Botnet in Global Crackdown](https://thehackernews.com/2025/11/operation-endgame-dismantles.html) — The Hacker News
- [Cops take down Rhadamanthys infostealer, VenomRAT](https://www.theregister.com/2025/11/13/operation_endgame_rhadamanthys_takedown/) — The Register

---
Source: https://cyber.netsecops.io/articles/operation-endgame-dismantles-rhadamanthys-venomrat-cybercrime-infrastructure/
