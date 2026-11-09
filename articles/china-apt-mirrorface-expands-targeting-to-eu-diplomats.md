# China-Linked APT MirrorFace Expands Targeting to EU Diplomatic Entity

**Severity:** high | **Category:** Threat Actor,Threat Intelligence,Cyberattack | **Updated:** 2026-04-27 | **Reading time:** 4 min

The China-aligned advanced persistent threat (APT) group known as MirrorFace has expanded its targeting beyond its traditional focus on Japan, according to an April 2024 report from ESET. Researchers observed the group targeting a diplomatic organization within the European Union for the first time. This strategic shift suggests a broadening of the group's intelligence-gathering requirements. MirrorFace is known for its use of custom malware and sophisticated tactics to conduct espionage. The report also highlighted a wider trend among China-aligned groups of using the open-source SoftEther VPN tool for maintaining persistent access to victim networks.

## Executive Summary
In its April 2024 APT Activity Report, **[ESET](https://www.eset.com/)** researchers revealed a significant evolution in the targeting strategy of **MirrorFace**, a China-aligned advanced persistent threat (APT) group. The group, which has historically concentrated its espionage efforts on targets in Japan, was observed attacking a diplomatic organization in the European Union. This expansion of operations indicates a shift in the intelligence-gathering priorities of the group's sponsors. The attack highlights the persistent and evolving threat that nation-state actors pose to diplomatic and governmental bodies worldwide. ESET also noted a broader trend among Chinese APTs of leveraging the legitimate, open-source **SoftEther VPN** tool to maintain stealthy, persistent access to compromised networks.

## Threat Overview
**MirrorFace** is a sophisticated threat actor focused on cyber-espionage. Their campaigns are characterized by the use of custom malware, spear-phishing for initial access, and a focus on long-term intelligence gathering. The shift to targeting an EU diplomatic entity suggests that the group's mission has expanded to include gathering political and economic intelligence related to European affairs. This development is a direct threat to EU member states and their diplomatic missions globally.

## Technical Analysis
While the specific infection vector for the EU attack was not detailed, MirrorFace campaigns typically involve:
1.  **Spear-phishing:** Emails with malicious attachments or links tailored to the target's interests.
2.  **Custom Malware:** Use of unique backdoors and loaders to evade signature-based detection.
3.  **Living Off the Land:** The use of legitimate tools, like **SoftEther VPN**, for command and control (C2) and persistence. Using a legitimate VPN client for C2 makes the malicious traffic difficult to distinguish from normal network activity.

### MITRE ATT&CK Mapping
- **[`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** A likely initial access vector.
- **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/):** The victim is tricked into opening the malicious document.
- **[`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/):** The use of SoftEther VPN to tunnel C2 traffic.
- **[`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The C2 traffic is often disguised as normal HTTPS traffic.
- **[`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys`](https://attack.mitre.org/techniques/T1547/001/):** A common method for malware persistence.

## Impact Assessment
The expansion of MirrorFace's targeting has significant geopolitical and security implications:
- **Espionage:** The primary impact is the loss of sensitive diplomatic communications, negotiation strategies, and political intelligence, which can undermine the EU's foreign policy objectives.
- **Loss of Trust:** A breach of a diplomatic mission can erode trust between nations and compromise ongoing diplomatic efforts.
- **Escalation of Cyber Conflict:** The targeting of diplomatic missions is a serious escalation in cyberspace and can lead to retaliatory actions.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints
To hunt for MirrorFace and similar APT activity:

| Type | Value | Description |
|---|---|---|
| Process Name | `sevpn.exe` or `sevpnclient.exe` | The presence of the SoftEther VPN client on workstations or servers where it is not authorized is a major red flag. |
| Network Traffic Pattern | Encrypted traffic to unknown VPN servers | Monitor for persistent VPN connections to non-corporate VPN endpoints. |
| File Name | LNK files in startup folders | APTs often use LNK files for persistence. Scrutinize any LNK files in user or system startup directories. |

## Detection & Response
- **Application Control:** Use application allowlisting to prevent the execution of unauthorized software, including legitimate tools like SoftEther VPN that can be used maliciously.
- **Network Egress Filtering:** Block outbound traffic to known malicious IPs and domains. Also, consider blocking outbound traffic for common VPN protocols on non-standard ports.
- **Email Security:** Implement advanced email security solutions to detect and block spear-phishing emails with malicious attachments or links.

## Mitigation
1.  **User Training:** Train employees, especially those in sensitive diplomatic roles, to identify and report spear-phishing attempts.
2.  **Principle of Least Privilege:** Ensure that user accounts do not have administrative privileges, limiting an attacker's ability to install software or make system changes.
3.  **EDR and Network Monitoring:** Deploy and actively monitor EDR solutions on endpoints and NDR solutions on the network to detect the behavioral indicators of an APT attack, such as the installation of new software or unusual network connections.

**Tags:** APT, MirrorFace, China, cyber espionage, threat intelligence, ESET, diplomatic targeting

## Sources
- [ESET releases latest APT report: China-aligned groups expand targeting; Iran advances diplomatic espionage](https://www.eset.com/int/about/newsroom/press-releases/research/eset-releases-latest-apt-report-china-aligned-groups-expand-targeting-iran-advances-diplomatic-esp/) — ESET (2024-11-08)
- [ESET APT Activity Report Q2 2024–Q3 2024 - WeLiveSecurity](https://www.welivesecurity.com/en/eset-research/eset-apt-activity-report-q2-2024-q3-2024/) — WeLiveSecurity (2024-11-07)

---
Source: https://cyber.netsecops.io/articles/china-apt-mirrorface-expands-targeting-to-eu-diplomats/
