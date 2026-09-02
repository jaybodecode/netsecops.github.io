# Ransomware Frenzy: INC, ANUBIS, Qilin and Bashe Hit Raft of Global Firms

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-07-04 | **Reading time:** 5 min

A significant number of data breaches were disclosed on July 3, 2026, as multiple ransomware groups listed new victims. The attacks span numerous industries and countries, showcasing the relentless pace of cyber extortion. The INC_RANSOM group claimed responsibility for attacks on Brazilian logistics firms, a US eye institute, and two US city governments. The ANUBIS gang targeted a Swiss manufacturer and US healthcare providers. A threat actor known as 'Bashe' hit a SaaS firm in Italy and a conglomerate in Vietnam, while the Qilin group attacked a golf club in Australia. The sheer volume and diversity of victims highlight the widespread, ongoing threat from these organized cybercriminal syndicates.

## Executive Summary
On July 3, 2026, breach monitoring services reported a surge in data breach disclosures, attributed to the activities of several prominent ransomware gangs. Threat actors including **INC_RANSOM**, **ANUBIS**, **Bashe**, and **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin_ransomware)** have publicly listed a diverse set of new victims on their data leak sites. The targets span multiple continents and a wide array of industries, including logistics, manufacturing, healthcare, government, and technology. This wave of attacks underscores the persistent and global nature of the ransomware-as-a-service (RaaS) ecosystem, where multiple syndicates operate in parallel to extort organizations of all sizes.

## Threat Overview
The attacks represent classic double-extortion ransomware campaigns, where data is first stolen and then encrypted. The public listing of victims is a tactic to pressure them into paying the ransom.

### INC_RANSOM
This group was highly active, claiming responsibility for breaches at:
- **Carvalima Transportes** (Brazilian logistics firm)
- **Estrutural Zortéa** (Brazilian industrial engineering company)
- **Hamilton Eye Institute** (US healthcare provider)
- **City of Acworth, Georgia** (US municipal government)
- **Oak Park, Michigan** (US municipal government)

### ANUBIS
This gang targeted organizations in Europe and the US:
- **Ferrum Group** (Swiss industrial manufacturer)
- **Quest Healthcare Solutions** (US healthcare staffing agency)
- **Northeast Pediatrics & Adolescent Medicine** (US healthcare provider)

### Bashe
This actor claimed victims in Europe and Asia:
- **Flazio** (Italian SaaS website-building platform)
- **Rita Võ Group** (Vietnamese business conglomerate)

### Qilin
This well-known RaaS group added an Australian entity to its list:
- **Pennant Hills Golf Club** (Australian private golf course)

## Technical Analysis
While specific TTPs for each breach are not detailed, these ransomware groups generally follow a similar attack lifecycle:
1.  **Initial Access:** Often gained through phishing emails ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), exploitation of public-facing applications like VPNs or RDP ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or through credentials purchased from initial access brokers.
2.  **Execution and Persistence:** Deploying tools like **[Cobalt Strike](https://attack.mitre.org/software/S0154/)** to maintain access and move laterally.
3.  **Privilege Escalation:** Exploiting local vulnerabilities or using tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to gain administrative privileges.
4.  **Data Exfiltration:** Identifying and stealing large volumes of sensitive data before encryption ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
5.  **Impact:** Encrypting systems across the network ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and deleting backups ([`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/)).

## Impact Assessment
The impact on the victim organizations is severe, encompassing operational downtime, significant financial costs for recovery and potential ransom payments, regulatory fines for data breaches, and long-term reputational damage. The diversity of victims—from municipal governments and healthcare providers to manufacturing and logistics companies—demonstrates that no industry is safe. The global distribution of victims (Brazil, USA, Switzerland, Italy, Vietnam, Australia) highlights the international reach of these ransomware syndicates.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were disclosed in the reports.

## Cyber Observables — Hunting Hints
Security teams can hunt for common ransomware TTPs to detect these groups. The following patterns could indicate related activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `powershell.exe` | Look for PowerShell processes downloading Cobalt Strike beacons or running obfuscated commands. |
| Network Traffic Pattern | Large outbound transfers to cloud storage | Ransomware groups often use legitimate services like Mega or Dropbox for data exfiltration. |
| Log Source | `Windows Security Event Logs` | Monitor for Event ID 4625 (failed logins) for signs of password spraying, and Event ID 1102 (Audit log cleared) as a defense evasion technique. |
| Command Line Pattern | `wmic.exe shadowcopy delete` | Command used to delete Volume Shadow Copies to prevent easy recovery. |

## Detection & Response
1.  **EDR/XDR:** Deploy advanced endpoint protection that uses behavioral analysis to detect and block ransomware activities like mass file encryption and backup deletion. This aligns with D3FEND's [**Process Analysis (D3-PA)**](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
2.  **SIEM Monitoring:** Use a SIEM to correlate events from multiple sources (endpoints, firewalls, Active Directory) to detect the full attack chain, from initial access to lateral movement and impact.
3.  **Deception Technology:** Deploy honeypots and decoy accounts to detect lateral movement early. When a threat actor interacts with a decoy, it generates a high-fidelity alert.

## Mitigation
1.  **Secure Remote Access:** Harden all remote access points. Enforce MFA on all VPN and RDP connections, and regularly patch any vulnerabilities in these services ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
2.  **Immutable Backups:** Maintain offline, air-gapped, or immutable backups of all critical data. Regularly test the restoration process to ensure you can recover without paying a ransom.
3.  **Network Segmentation:** Segment the network to contain a potential ransomware infection and prevent it from spreading from the IT network to OT systems or backup infrastructure ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).
4.  **User Training:** Conduct regular phishing simulation and security awareness training to help employees spot and report initial access attempts ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).

**Tags:** Ransomware, INC_RANSOM, ANUBIS, Bashe, Qilin, Data Breach, Cybercrime

## Sources
- [Data Breaches in July 2026](https://www.breachsense.com/breaches/) — Breachsense (2026-07-03)

---
Source: https://cyber.netsecops.io/articles/wave-of-data-breaches-hits-global-firms-in-early-july/
