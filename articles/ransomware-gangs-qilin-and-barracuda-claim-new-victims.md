# Ransomware Gangs Qilin and Barracuda Claim New Corporate Victims

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-11-01 | **Reading time:** 5 min

The ransomware landscape remains highly active, with the Qilin and Barracuda groups claiming new victims on November 1, 2026. The Qilin gang, one of 2026's most prolific groups, added U.S.-based company Danser to its list of victims. Meanwhile, the Barracuda ransomware group announced it had breached EVINOKS, a Turkish technology and manufacturing firm. Barracuda threatened to release the stolen data from EVINOKS for free on its dark web leak site. These incidents are part of a broader surge in ransomware attacks, which saw a 45% increase in the first half of 2026, with the manufacturing sector being the most frequent target.

## Executive Summary

On November 1, 2026, two prominent ransomware groups, **Qilin** and **Barracuda**, publicly claimed responsibility for separate attacks, underscoring the relentless pace of ransomware operations. The **[Qilin ransomware](https://malpedia.caad.fkie.fraunhofer.de/details/win.qilin)** group, a major threat actor in 2026, announced it had breached **Danser**, a U.S.-based company. Shortly after, the **Barracuda** ransomware group claimed an attack on **EVINOKS**, a Turkish manufacturer of hotel and restaurant equipment. The Barracuda gang threatened to leak the stolen data for free if a ransom was not paid. These attacks reflect a continuing trend of increased ransomware activity, with a reported 45% rise in incidents in the first half of 2026, heavily impacting the manufacturing, business services, and healthcare sectors.

## Threat Overview

These two incidents highlight the typical operations of modern **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** groups. Both Qilin and Barracuda operate leak sites on the dark web where they name their victims to apply pressure for ransom payments, a tactic known as double extortion.

-   **Qilin:** This group has been particularly active, establishing itself as one of the top ransomware gangs of the year. Their targeting of a U.S. company is consistent with their global operations.
-   **Barracuda:** This group's threat to release data for free is a psychological tactic designed to create urgency and panic within the victim organization, increasing the likelihood of payment.

The broader context, as reported by Flashpoint, shows a dramatic increase in attacks, with manufacturing being the most targeted industry. This is likely due to the sector's low tolerance for downtime, making them more likely to pay ransoms to restore operations.

## Technical Analysis

While the specific TTPs for these attacks were not detailed, ransomware groups like Qilin and Barracuda commonly use a combination of methods for initial access and execution:

1.  **Initial Access:** Often gained through phishing campaigns, exploiting unpatched vulnerabilities in public-facing services (e.g., VPNs, RDP), or purchasing stolen credentials from initial access brokers.
2.  **Execution & Lateral Movement:** Once inside, they deploy commodity tools like Cobalt Strike for command and control, move laterally across the network to identify high-value data and systems, and escalate privileges.
3.  **Impact:** Finally, they deploy their ransomware payload to encrypt files across the network and exfiltrate sensitive data to their servers before leaving a ransom note.

### MITRE ATT&CK Techniques

- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The core ransomware activity of encrypting files.
- [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/): The ultimate goal of extorting money from the victims.
- [`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/): A common vector for lateral movement within a compromised network.
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): A frequent initial access method for many ransomware groups.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Use of stolen credentials for initial access or privilege escalation.

## Impact Assessment

For Danser and EVINOKS, the immediate impacts are severe operational disruption, potential financial loss from ransom payments, and significant reputational damage. The exfiltration of data creates a long-term risk of fraud, competitive disadvantage, and regulatory fines. For the broader business community, these attacks are a stark reminder that ransomware remains a pervasive and indiscriminate threat, capable of affecting organizations of any size, in any industry, and in any country.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints

To detect ransomware activity early, security teams should hunt for:

| Type | Value | Description |
|---|---|---|
| `process_name` | `vssadmin.exe delete shadows` | A classic ransomware precursor command to delete volume shadow copies and prevent easy restoration. |
| `command_line_pattern` | `powershell.exe -enc` | Heavy use of encoded PowerShell commands is a common technique for defense evasion and lateral movement. |
| `network_traffic_pattern` | `Large outbound transfers to cloud storage` | Attackers often exfiltrate data to common cloud storage providers (e.g., Mega, pCloud) before encryption. |
| `file_name` | `*.qilin`, `*.barracuda` | The creation of files with extensions associated with the specific ransomware strain. |

## Detection & Response

1.  **Endpoint Detection and Response (EDR):** Deploy an EDR solution to detect common ransomware behaviors, such as rapid file modification, deletion of shadow copies, and disabling of security tools. This aligns with D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
2.  **Canary Files:** Place decoy files (canaries) on file shares. Monitor these files for any modification activity; an alert on a canary file can be a high-fidelity indicator of a ransomware attack in progress.
3.  **Network Monitoring:** Monitor for large, anomalous outbound data flows, which can indicate data exfiltration prior to encryption. This is an application of D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).

## Mitigation

1.  **Data Backup and Recovery:** The single most important mitigation is to maintain regular, immutable, and offline backups of critical data. Test your recovery process frequently.
2.  **Patch Management:** Aggressively patch internet-facing systems and software to close the vulnerabilities that ransomware groups commonly exploit for initial access.
3.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access services (VPNs, RDP), email accounts, and privileged accounts to prevent credential-based attacks.
4.  **User Training:** Train users to identify and report phishing emails, which remain a primary initial access vector for ransomware.

**Tags:** Ransomware, Qilin, Barracuda, Data Breach, Manufacturing

## Sources
- [Ransomware Group Qilin hits Danser](https://www.hookphish.com/blog/ransomware-group-qilin-hits-danser/) — HookPhish (2026-11-01)
- [Ransomware Group Barracuda hits EVINOKS](https://www.hookphish.com/blog/ransomware-group-barracuda-hits-evinoks/) — HookPhish (2026-11-01)
- [Ransomware in the Age of AI: How Defenders Can Break the Attack Chain](https://www.cybersecurity-insiders.com/ransomware-in-the-age-of-ai-how-defenders-can-break-the-attack-chain/) — Cybersecurity Insiders (2026-11-01)

---
Source: https://cyber.netsecops.io/articles/ransomware-gangs-qilin-and-barracuda-claim-new-victims/
