# New Ransomware Group 'Inception' Claims 1TB Data Theft from Verisk

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-11-26 | **Reading time:** 4 min

A newly emerged ransomware group named 'Inception' has claimed responsibility for a major cyberattack against Verisk, a leading data analytics and risk assessment firm. In a leak site post on November 26, 2026, the group alleges it exfiltrated 1.01 TB of highly sensitive data, including millions of client insurance contracts, database records, and proprietary loss models. The claim, which mentions major Verisk clients, has not yet been confirmed by the company. The group has set a short deadline for contact before releasing the data.

## Executive Summary
A new ransomware group, identifying itself as **Inception**, has emerged with a significant claim of a successful cyberattack against **[Verisk](https://www.verisk.com/)**, a major American data analytics and risk assessment firm. On November 26, 2026, the group posted on its dark web leak site that it had exfiltrated 1.01 terabytes of sensitive data from Verisk's network. The alleged stolen data includes millions of client insurance contracts, extensive database records, and proprietary financial models. The group has threatened to release the data if Verisk does not make contact by November 27, 2026. Verisk has not yet publicly commented on the claim, which remains unverified.

## Threat Overview
The emergence of the **[Inception Ransomware](https://malpedia.caad.fkie.fraunhofer.de/details/win.inception)** group with such a high-profile claim marks a potentially significant new threat in the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** ecosystem. The group is employing a double-extortion model, focusing on data theft and the threat of public release to pressure the victim into paying a ransom.

*   **Threat Actor:** Inception (newly emerged group).
*   **Victim:** Verisk, a data analytics and risk assessment firm.
*   **Claimed Data Exfiltration:** 1.01 TB of data, including:
    *   854.6 million rows from 4,062 database tables.
    *   17.5 million client insurance contracts from the London market, allegedly including data related to Victoria's Secret, Marsh, and AON.
    *   De-identified location data for 6.91 million USAA customers.
    *   458 modeled-loss analyses and 123 stochastic event catalogs.
*   **Tactic:** Double extortion, with a short deadline to create urgency.

## Technical Analysis
As the claim is unverified and Inception is a new group, technical details about their TTPs are not yet available. However, based on the modus operandi of similar ransomware groups, the attack likely followed a standard enterprise intrusion lifecycle:

1.  **Initial Access:** The actors likely gained entry through a common vector such as exploiting a public-facing vulnerability ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), a phishing campaign ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)), or stolen credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).
2.  **Persistence and Discovery:** Once inside, the group would have established persistence and begun internal reconnaissance to identify high-value data stores, such as the database servers and file shares mentioned in their claim ([`T1083 - File and Directory Discovery`](https://attack.mitre.org/techniques/T1083/)).
3.  **Data Staging and Exfiltration:** Before deploying the ransomware, the actors would have collected and staged the targeted 1.01 TB of data ([`T1074 - Data Staged`](https://attack.mitre.org/techniques/T1074/)) and then exfiltrated it to their own servers ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
4.  **Impact:** The final stage would be the deployment of the Inception ransomware to encrypt Verisk's systems ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) to disrupt operations and add further pressure for payment.

> The specificity of the claims—mentioning database table counts, row numbers, and specific client names—is a tactic used by ransomware groups to add credibility to their claims and increase pressure on the victim.

## Impact Assessment
If the claims are true, the impact on Verisk and its clients would be catastrophic.

*   **For Verisk:** The exfiltration of proprietary modeled-loss analyses and event catalogs represents a theft of core intellectual property. The operational disruption from a ransomware attack, combined with the immense reputational damage and potential regulatory fines for a breach of this scale, would be devastating.
*   **For Verisk's Clients (Insurers, etc.):** The exposure of 17.5 million insurance contracts and other sensitive client data (e.g., from Marsh, AON, USAA) would trigger a massive third-party data breach crisis. These firms would face their own regulatory obligations, customer notification requirements, and reputational fallout.
*   **Systemic Risk:** Verisk is a central player in the global insurance and financial risk industry. A compromise of this magnitude could have systemic effects, exposing sensitive data and methodologies used across the sector.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
As Inception is a new group, there are no known specific observables. However, general ransomware defense involves hunting for pre-cursor activities:

| Type | Value | Description |
|---|---|---|
| process_name | `rclone.exe`, `megacopy.exe` | Monitor for the use of legitimate data transfer tools, which are commonly abused by ransomware groups for data exfiltration. |
| network_traffic_pattern | Large, sustained data egress to unknown cloud storage providers | A key indicator of data exfiltration prior to ransomware deployment. |
| command_line_pattern | `vssadmin delete shadows` | A common command used by ransomware to delete volume shadow copies and prevent easy recovery. |
| event_id | `4688` (Windows) | Monitor for the execution of suspicious PowerShell commands or the use of tools like Cobalt Strike or Mimikatz. |

## Detection & Response
Detecting a ransomware attack before encryption is key.

1.  **Data Exfiltration Detection:** Deploy network monitoring and data loss prevention (DLP) solutions to detect and alert on large-scale data transfers leaving the network. This corresponds to D3FEND's [`User Data Transfer Analysis (D3-UDTA)`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis).
2.  **EDR and Behavioral Analysis:** Use an EDR solution to detect common ransomware precursor activities, such as the disabling of security tools, deletion of shadow copies, and lateral movement using tools like PsExec. This aligns with D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **Decoy Data:** Place decoy files and accounts (honeypots/honeytokens) in the network. Any interaction with these decoys should trigger a high-priority alert, as it indicates an intruder is performing reconnaissance. This is a direct application of D3FEND's [`Decoy Object (D3-DO)`](https://d3fend.mitre.org/technique/d3f:DecoyObject).

## Mitigation
A defense-in-depth strategy is required to protect against ransomware.

1.  **Immutable Backups:** Maintain offline and immutable backups of critical data. This is the most important mitigation for recovering from a destructive ransomware attack without paying the ransom.
2.  **Network Segmentation:** Segment the network to prevent attackers from moving laterally from an initial point of compromise to critical data stores.
3.  **Attack Surface Reduction:** Proactively manage the external attack surface by patching vulnerabilities, securing remote access with MFA, and closing unnecessary ports.
4.  **User Training:** Train users to recognize and report phishing attempts, a primary initial access vector for ransomware groups.

**Tags:** Ransomware, Inception, Verisk, Data Breach, Double Extortion, Threat Actor

## Sources
- [Inception Ransomware claims Verisk](https://www.ransomware.live/id/VmVyaXNrQEluY2VwdGlvbg) — Ransomware.live

---
Source: https://cyber.netsecops.io/articles/new-ransomware-group-inception-claims-attack-on-verisk/
