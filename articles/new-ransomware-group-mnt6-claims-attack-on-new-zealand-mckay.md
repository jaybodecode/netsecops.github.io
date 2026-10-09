# New Ransomware Group 'Mnt6' Surfaces, Claims Attack on New Zealand Contractor McKay

**Severity:** medium | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-05-04 | **Reading time:** 3 min

A new ransomware group, identifying itself as 'Mnt6', has claimed responsibility for a cyberattack against McKay, a major New Zealand-based electrical contractor. The attack occurred in January 2026, but the nascent threat group only listed McKay on its darknet leak site on April 30. McKay confirmed the incident, stating it detected and contained unauthorized access to a single internal device. In response to the threat of data disclosure, McKay has obtained a High Court injunction to block the publication of any stolen data. Little is known about Mnt6, which has only two other victims listed, suggesting it may be a new player in the ransomware ecosystem.

## Executive Summary

**McKay**, a prominent New Zealand electrical engineering firm, has confirmed it was the victim of a cyberattack in January 2026. A newly emerged ransomware group calling itself **Mnt6** has claimed responsibility, listing McKay on its darknet leak site on April 30, 2026. McKay stated that the incident involved unauthorized access to a single internal device, which was quickly contained. To prevent the dissemination of stolen data, the company has secured a court injunction. The Mnt6 group is a new and largely unknown entity, with this attack marking its emergence on the cybercrime scene. The incident highlights the continuous threat of ransomware to critical infrastructure service providers.

---

## Threat Overview

- **Victim**: McKay, a large New Zealand electrical contractor serving critical sectors.
- **Threat Actor**: Mnt6, a new ransomware group that appeared in late April 2026.
- **Timeline**:
    - January 2026: McKay detects and contains unauthorized access.
    - April 30, 2026: Mnt6 lists McKay on its darknet leak site.
- **Tactic**: The attack follows the standard double-extortion model, where data is exfiltrated with the threat of public release.

McKay's response was swift, involving immediate containment, engagement of third-party specialists, and notification to authorities, including the Office of the Privacy Commissioner and New Zealand's National Cyber Security Centre (NCSC). The company's proactive legal step to obtain a court injunction is a notable strategy to counter the data leak threat.

Little is known about the Mnt6 group. With only two other Canadian firms listed as victims, their capabilities, affiliations, and TTPs are still being analyzed by the security community. Some speculation suggests they may operate as a data broker in addition to ransomware.

---

## Technical Analysis

Details about the attack vector are sparse. McKay's statement mentioning access to "one internal device" could imply anything from a compromised user endpoint via phishing to a misconfigured internal server. The threat actor's ability to exfiltrate data suggests they had sufficient dwell time to perform reconnaissance and identify valuable information.

### MITRE ATT&CK Techniques (Inferred)
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: A common entry point for new groups, often using credentials purchased from infostealer logs.
- **[`T1560.001 - Archive via Utility`](https://attack.mitre.org/techniques/T1560/001/)**: Attackers typically compress and stage data before exfiltration.
- **[`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)**: Exfiltrating stolen data through their command-and-control infrastructure.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)**: Although not explicitly stated that files were encrypted on the device, this is the primary tactic of a ransomware group.

---

## Impact Assessment

While McKay claims its IT systems are operating securely, the breach still carries significant risk. The stolen data, if it pertains to critical infrastructure projects, could have national security implications. The business impact includes the cost of incident response, legal fees for the injunction, and potential reputational damage. The proactive communication and legal strategy may help mitigate some of the reputational harm. For the broader industry, the emergence of a new ransomware group, Mnt6, is a worrying development, indicating the low barrier to entry and the continued profitability of the ransomware ecosystem.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

As Mnt6 is a new group, specific observables are unknown. General ransomware hunting should be applied:

| Type | Value | Description |
| --- | --- | --- |
| `process_name` | `rclone.exe` | Monitor for the use of legitimate data transfer tools like rclone, which are often abused by attackers for data exfiltration. |
| `command_line_pattern` | `net use \\<IP>\C$ /user:<user> <pass>` | Look for lateral movement attempts using `net use` to map administrative shares. |
| `log_source` | `Firewall/Proxy Logs` | Hunt for connections to newly registered domains or IP addresses in untrusted geolocations, which could be C2 servers. |

---

## Detection & Response

1.  **Behavioral Monitoring**: Focus on detecting ransomware TTPs rather than just specific malware signatures. Monitor for credential dumping (e.g., Mimikatz), lateral movement (e.g., PsExec), and data staging. This aligns with D3FEND's **[`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**.
2.  **Egress Traffic Analysis**: Monitor outbound network traffic for unusually large transfers, especially to unfamiliar destinations. This uses **[`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
3.  **Isolate and Contain**: McKay's response to isolate the affected device is a textbook example of proper initial response. Have a clear plan to quickly isolate hosts or network segments upon detecting suspicious activity.

---

## Mitigation

Standard ransomware mitigations are recommended:

1.  **Secure Backups**: Maintain offline, immutable, and regularly tested backups. This is the single most important defense against ransomware's impact.
2.  **Access Control**: Enforce the principle of least privilege and utilize network segmentation to limit an attacker's ability to move laterally.
3.  **Patch Management**: Keep all systems, especially internet-facing ones, patched to prevent exploitation of known vulnerabilities.
4.  **Security Awareness**: Train employees to recognize and report phishing attempts, which remain a primary initial access vector.

**Tags:** Mnt6, Ransomware, McKay, New Zealand, Threat Actor, Cyberattack

## Sources
- [Exclusive: Kiwi electrical contractor confirms cyber attack](https://www.cyberdaily.au/security/10777-exclusive-kiwi-electrical-contractor-confirms-cyber-attack) — Cyber Daily (2026-05-04)
- [McKay.co.nz Data Breach: Industry Reaction and Fallout](https://www.ferbexloop.com/mckay-co-nz-data-breach-industry-reaction-and-fallout/) — Ferbexloop (2026-04-04)
- [Victim: McKay](https://ransomware.live/victim/mckay/) — Ransomware.live (2026-04-30)
- [mnt6 Ransomware Attack on Engineering Leader McKay](https://www.dexpose.io/blog/mnt6-ransomware-attack-on-engineering-leader-mckay) — DeXpose (2026-05-01)

---
Source: https://cyber.netsecops.io/articles/new-ransomware-group-mnt6-claims-attack-on-new-zealand-mckay/
