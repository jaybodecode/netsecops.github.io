# Iran's MuddyWater APT Targets 100+ Governments with Phoenix Backdoor

**Severity:** high | **Category:** Threat Actor,Cyberattack,Phishing | **Updated:** 2025-10-24 | **Reading time:** 6 min

The Iranian state-sponsored threat group MuddyWater is conducting a large-scale cyber-espionage campaign targeting over 100 government entities, primarily in the Middle East and North Africa (MENA). According to Group-IB, the attackers are using phishing emails sent from a compromised mailbox, leveraging the NordVPN service for anonymity. The emails contain malicious Word documents that use macros to deploy version 4 of the 'Phoenix' backdoor, a payload designed for foreign intelligence gathering. The campaign highlights the group's return to classic macro-based attack vectors.

## Executive Summary
The Iranian state-sponsored Advanced Persistent Threat (APT) group **[MuddyWater](https://attack.mitre.org/groups/G0069/)** has launched a significant cyber-espionage campaign targeting more than 100 government organizations, with a primary focus on the Middle East and North Africa (MENA) region. A report from **[Group-IB](https://www.group-ib.com/)** details how the threat actor, linked to Iran's Ministry of Intelligence and Security (MOIS), is using phishing emails to deliver version 4 of its **Phoenix** backdoor. The attack leverages a compromised mailbox for distribution and abuses the legitimate **[NordVPN](https://nordvpn.com/)** service to conceal its origin, demonstrating a continued effort to infiltrate high-value government targets for intelligence collection purposes.

---

## Threat Overview
The campaign, attributed to MuddyWater with high confidence by Group-IB, showcases a refined attack chain designed for stealth and persistence. The group, also known as Earth Vetala and Static Kitten, initiates the attack with spear-phishing emails that appear to be legitimate correspondence. These emails originate from a mailbox that MuddyWater had previously compromised, adding a layer of authenticity to the lure. The use of NordVPN to access this mailbox makes attribution and tracking more difficult for defenders.

The emails contain a malicious **[Microsoft](https://www.microsoft.com)** Word document attachment. When a victim opens the document, they are prompted to enable macros to view the content. This social engineering tactic is a classic method that has seen a resurgence despite Microsoft's efforts to block macros by default.

## Technical Analysis
The attack chain follows a well-defined sequence of TTPs:
1.  **Initial Access**: The campaign begins with [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/). The use of a compromised, legitimate mailbox enhances the credibility of the phishing lure.
2.  **Execution**: Once the victim enables macros ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/)), a malicious Visual Basic for Application (VBA) script executes ([`T1059.005 - Visual Basic`](https://attack.mitre.org/techniques/T1059/005/)).
3.  **Payload Delivery**: The VBA code is responsible for downloading and installing the Phoenix backdoor on the victim's system.
4.  **Persistence and C2**: Version 4 of the **Phoenix** backdoor reportedly uses a new persistence technique, distinct from prior versions. It establishes a command-and-control channel to allow the attackers to exfiltrate data and issue further commands ([`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/)).

Group-IB also found evidence suggesting the potential use of a new Remote Monitoring and Management (RMM) tool for [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/) and a custom browser credential stealer, indicating that MuddyWater continues to evolve its toolkit.

## Impact Assessment
The primary objective of this campaign is cyber-espionage. The impact on the targeted government entities includes:
*   **Intelligence Loss**: The theft of sensitive government documents, diplomatic communications, and strategic information.
*   **Long-Term Compromise**: The Phoenix backdoor provides persistent access, allowing MuddyWater to maintain a long-term presence within the target network for continuous intelligence gathering.
*   **Foundation for Future Attacks**: The access and information gained could be used to facilitate more disruptive attacks or to compromise other related organizations.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| `process_name` | `WINWORD.EXE` | A Word process spawning child processes like `powershell.exe` or `cmd.exe` is a strong indicator of a malicious macro. |
| `network_traffic_pattern` | Outbound connections from internal government hosts to known NordVPN IP ranges. | While not inherently malicious, this could be anomalous and warrants investigation in the context of this campaign. |
| `registry_key` | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Monitor for new, suspicious entries used by malware for persistence. |
| `file_name` | Suspicious `.docm` or `.doc` files received from external sources. | Files requiring macros to be enabled should be treated with extreme caution. |

## Detection & Response
*   **Email Security Gateway**: Configure email filters to block or quarantine attachments with macros, especially from external senders. Use D3FEND's [`D3-MFI - Message-based Filtering`](https://d3fend.mitre.org/technique/d3f:Message-basedFiltering).
*   **Endpoint Detection (EDR)**: Deploy EDR to monitor for suspicious process chains, such as `WINWORD.EXE` spawning `powershell.exe`. Create rules to alert on the execution of VBA scripts that write to disk or initiate network connections. This aligns with D3FEND's [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
*   **Network Monitoring**: Monitor for and alert on network traffic to known anonymizing services like NordVPN from servers or sensitive workstations. While this can generate false positives, it's a valuable hunting starting point.

## Mitigation
1.  **Disable Macros**: Implement a group policy to block all macros from Office files originating from the internet. This is the most effective defense against this attack vector ([`M1042 - Disable or Remove Feature or Program`](https://attack.mitre.org/mitigations/M1042/)).
2.  **User Training**: Train users to be suspicious of any email, even those from seemingly trusted sources, that asks them to enable macros or open unexpected attachments ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
3.  **Application Control**: Use application control solutions to restrict the execution of unauthorized scripts and executables, preventing the Phoenix backdoor from running even if it is successfully dropped on a system ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/)).
4.  **Attack Surface Reduction**: Implement Attack Surface Reduction (ASR) rules in Microsoft Defender to block Office applications from creating child processes.

**Tags:** MuddyWater, APT, Iran, Phoenix, cyber-espionage, phishing, macros, MENA

## Sources
- [Unmasking MuddyWater's New Malware Toolkit Driving International Espionage](https://www.group-ib.com/blog/muddywater-phoenix/) — Group-IB (2025-10-22)
- [MuddyWater Targets 100+ Gov Entities in MEA with Phoenix Backdoor](https://www.darkreading.com/cyberattacks-data-breaches/muddywater-100-gov-entites-mea-phoenix-backdoor) — Dark Reading (2025-10-22)
- [Iranian government-sponsored hackers target government, commercial networks using MuddyWater malware](https://iranian-government-sponsored-hackers-target-government-commercial-networks-using-muddywater-malware.industrialcyber.co/) — Industrial Cyber (2025-10-22)

---
Source: https://cyber.netsecops.io/articles/iran-linked-muddywater-apt-targets-governments-with-phoenix-backdoor/
