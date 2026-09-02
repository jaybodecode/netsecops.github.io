# Boggy Serpens (MuddyWater) APT Targets UAE Energy Firm in Sustained Espionage Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Threat Intelligence | **Updated:** 2026-03-07 | **Reading time:** 6 min

Researchers from Palo Alto Networks' Unit 42 have detailed a long-running cyber-espionage campaign targeting a national marine and energy company in the United Arab Emirates. The campaign, attributed to the APT group Boggy Serpens (also known as MuddyWater), was active from August 2025 through February 11, 2026. The threat actor conducted four distinct attack waves, using hijacked email accounts from legitimate government and corporate entities for its spear-phishing operations. The campaign deployed a diverse arsenal of malware, including GhostBackDoor, Nuso (HTTP_VIP), UDPGangster, and LampoRAT, showcasing the group's maturing and persistent operational methodology aimed at long-term intelligence gathering.

## Executive Summary
In a report published on February 11, 2026, **[Palo Alto Networks' Unit 42](https://unit42.paloaltonetworks.com/)** threat intelligence team has exposed a sophisticated and sustained cyber-espionage campaign against a national marine and energy company in the United Arab Emirates (U.A.E.). The campaign is attributed to **Boggy Serpens**, an advanced persistent threat (APT) group publicly tracked as **[MuddyWater](https://attack.mitre.org/groups/G0069/)**. The operation spanned several months, from August 2025 to February 2026, and involved four distinct waves of attacks. A key tactic was the use of compromised email accounts from trusted government and corporate entities to deliver spear-phishing emails, thereby bypassing security filters. The attackers deployed a wide range of custom malware, including **GhostBackDoor**, **Nuso**, **UDPGangster**, and **LampoRAT**, demonstrating a mature and evolving toolset focused on long-term intelligence gathering from a high-value target in the energy sector.

---

## Threat Overview
- **Threat Actor:** **Boggy Serpens** (also known as MuddyWater, linked to Iran's Ministry of Intelligence and Security).
- **Target:** A national marine and energy company in the U.A.E.
- **Timeline:** August 16, 2025 – February 11, 2026.
- **Objective:** Cyber-espionage and long-term intelligence gathering.
- **Key Tactic:** Use of compromised email accounts from trusted third parties for spear-phishing.
- **Malware Arsenal:**
  - **GhostBackDoor**
  - **Nuso** (also called HTTP_VIP)
  - **UDPGangster**
  - **LampoRAT** (also called CHAR)

---

## Technical Analysis
The campaign's methodology highlights the maturity of the Boggy Serpens group. Their TTPs indicate a patient and persistent adversary.

1.  **Initial Access ([`T1566.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1566/003/)):** The core of their initial access strategy was not just spear-phishing, but spear-phishing from already-compromised, legitimate email accounts of other government and corporate entities. This abuse of trusted relationships is highly effective at bypassing both technical controls (spam filters, domain reputation) and human suspicion.

2.  **Execution & Persistence:** Upon a successful phish, the group deployed its malware. The use of multiple, distinct malware families suggests a modular approach. They likely use a lightweight first-stage implant like **Nuso** or **LampoRAT** to establish a foothold and perform initial reconnaissance. These backdoors provide capabilities for command execution, file transfer, and basic system enumeration.

3.  **Command and Control ([`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)):** The backdoors used, such as Nuso (HTTP_VIP), communicate over standard web protocols (HTTP/HTTPS) to blend in with normal network traffic, making C2 detection more difficult. **UDPGangster** suggests the use of UDP for C2, which can be faster and harder to inspect than TCP.

4.  **Payload Deployment:** More feature-rich implants like **GhostBackDoor** are likely deployed on high-value systems after the network has been mapped. This tool is probably used for the primary intelligence gathering and data exfiltration tasks.

The four distinct waves of attacks over six months show that the group is resilient. Even if one implant is detected and removed, they have the operational capacity to re-tool and re-engage the target with a different approach.

### MITRE ATT&CK Mapping
- [`T1586.002 - Compromise Accounts: Email Accounts`](https://attack.mitre.org/techniques/T1586/002/): To acquire the email accounts used for phishing.
- [`T1566.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1566/003/): The primary initial access vector.
- [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/): MuddyWater is known to heavily use PowerShell for execution and fileless attacks.
- [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): To download their various malware families onto the compromised system.
- [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/): For C2 communication.
- [`T1573.001 - Encrypted Channel: Symmetric Cryptography`](https://attack.mitre.org/techniques/T1573/001/): To protect C2 communications.

---

## Impact Assessment
The primary impact of this campaign is espionage. The compromise of a national marine and energy company can lead to the theft of sensitive intellectual property, proprietary operational data, geological survey information, and strategic business plans. This information can provide a significant economic and strategic advantage to the nation-state sponsoring the APT group. The long-term persistence achieved by the group means they could potentially have access to real-time operational data, which could be used for future disruptive or destructive attacks, particularly given the critical nature of the energy sector.

## Detection & Response
- **Enhanced Email Scrutiny:** Do not automatically trust emails, even if they come from a known partner or government entity. Pay close attention to emails that have an unusual tone, unexpected attachments, or links that deviate from normal business correspondence.
- **Monitor for Malware Artifacts:** Use the IOCs and detection signatures provided by Unit 42 to hunt for GhostBackDoor, Nuso, and LampoRAT in your environment.
- **Network Egress Filtering:** MuddyWater often uses common ports like 80, 443, and 53 for C2. Monitor for anomalous or long-lived connections on these ports, especially from servers.
- **PowerShell Logging:** Enable enhanced PowerShell logging (Module, Script Block, and Transcription) and forward logs to a SIEM. Hunt for obfuscated or suspicious PowerShell commands, a key part of MuddyWater's playbook.

## Mitigation
1.  **Email Security:** Implement advanced email security solutions that can detect impersonation and analyze link/attachment behavior, rather than just relying on sender reputation.
2.  **User Training:** Train users to be suspicious of emails that create a sense of urgency or are unexpected, regardless of the sender. Encourage a 'verify by phone' culture for unusual requests.
3.  **Network Segmentation:** Segment networks to prevent attackers from moving laterally from a less-sensitive system to critical operational technology (OT) or engineering networks.
4.  **Application Control:** Use application allowlisting to prevent the execution of unauthorized malware like the various backdoors used in this campaign.

**Tags:** APT, Boggy Serpens, MuddyWater, Cyber Espionage, Threat Actor, Energy Sector, UAE, Malware

## Sources
- [Boggy Serpens: Mature APT Group Targets UAE Marine and Energy Sector in Sustained Campaign](https://thehackernews.com/2026/02/11/boggy-serpens-apt-uae-marine.html) — The Hacker News (2026-02-11)
- [Boggy Serpens' Recent Activity Exemplifies a Maturing Threat Profile](https://unit42.paloaltonetworks.com/boggy-serpens-update/) — Unit 42 (2026-02-11)

---
Source: https://cyber.netsecops.io/articles/palo-alto-networks-details-new-boggy-serpens-apt-campaign-targeting-uae/
