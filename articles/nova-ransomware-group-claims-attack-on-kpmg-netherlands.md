# Nova Ransomware Group Claims Cyberattack on KPMG Netherlands, Sets 10-Day Deadline

**Severity:** high | **Category:** Ransomware,Threat Actor,Data Breach | **Updated:** 2026-01-28 | **Reading time:** 4 min

The Nova ransomware group has claimed responsibility for a cyberattack against the Netherlands division of global professional services firm KPMG. The claim, which appeared on ransomware monitoring services on January 23, 2026, alleges that the group successfully breached KPMG's systems and exfiltrated sensitive data. In a classic double-extortion tactic, the Nova group has reportedly set a ten-day deadline for KPMG Netherlands to enter into ransom negotiations before they potentially leak the stolen data. KPMG has not yet publicly confirmed the attack.

## Executive Summary
The **Nova ransomware** group has listed **[KPMG](https://kpmg.com/) Netherlands** on its data leak site, claiming to have successfully breached the professional services giant on January 23, 2026. The attackers allege they have exfiltrated sensitive data and have initiated a ten-day countdown for the firm to make contact and pay a ransom. This incident follows a well-established pattern of "double extortion," where threat actors both encrypt a victim's files and steal sensitive data to use as leverage. An attack on a major professional services firm like KPMG is highly significant, as it could expose confidential data belonging to a multitude of corporate clients.

---

## Threat Overview
-   **Threat Actor:** The **Nova ransomware** group is the perpetrator behind this claimed attack. While not as prolific as some top-tier groups, Nova employs the standard Ransomware-as-a-Service (RaaS) model and focuses on high-value corporate targets.
-   **Victim:** KPMG Netherlands, a major division of the global accounting and consulting firm.
-   **Tactic:** The attack is a clear case of double extortion. The threat actors claim to have exfiltrated data and are using the threat of public release to pressure KPMG into paying the ransom. The ten-day deadline is a common psychological tactic to create urgency and force a quick decision.

As of this report, KPMG has not issued a public statement confirming or denying the breach. The information comes from third-party services that monitor ransomware leak sites.

## Technical Analysis
While specific details of the intrusion vector are unknown, ransomware groups like Nova typically gain initial access through common methods:
-   **Phishing:** Sending malicious emails to employees to steal credentials.
-   **Vulnerability Exploitation:** Exploiting unpatched vulnerabilities in internet-facing systems like VPNs or remote desktop services.
-   **Stolen Credentials:** Purchasing valid credentials from the dark web.

Once inside the network, the attackers would have performed reconnaissance, escalated privileges, and moved laterally to identify and access high-value data repositories. After exfiltrating the data to their own servers, they would have deployed the Nova ransomware payload to encrypt files across the network, causing business disruption.

## Impact Assessment
An attack on a firm like KPMG has cascading impacts:
-   **Client Data Exposure:** The primary risk is the exposure of sensitive data belonging to KPMG's clients. This could include financial statements, audit details, M&A plans, and other confidential corporate information. This could lead to legal liability for KPMG and security risks for its clients.
-   **Reputational Damage:** A confirmed breach would severely damage KPMG's reputation as a trusted advisor on risk and security.
-   **Business Disruption:** The encryption of internal systems would disrupt KPMG's ability to serve its clients, leading to operational downtime and financial losses.
-   **Regulatory Fines:** Under GDPR, a breach of this magnitude could result in significant fines for KPMG.

## Detection & Response
KPMG's internal security team is likely engaged in a full-scale incident response. For other organizations, this incident is a reminder of key detection strategies for ransomware:

1.  **Monitor for Data Exfiltration:** Use Data Loss Prevention (DLP) tools and network traffic analysis to detect large, anomalous outbound data transfers, which often precede the encryption phase of a ransomware attack.

2.  **Endpoint Detection and Response (EDR):** EDR tools can detect ransomware behaviors, such as rapid file modification/encryption, deletion of volume shadow copies (`vssadmin.exe delete shadows`), and the execution of suspicious PowerShell commands.

3.  **Active Directory Monitoring:** Monitor for unusual activity in Active Directory, such as the creation of new admin accounts or mass changes to group policies, which are often precursors to a domain-wide ransomware deployment.

## Mitigation
Standard ransomware mitigations are critical for defending against groups like Nova:
1.  **Immutable Backups:** Maintain offline, encrypted, and immutable backups of critical data. The 3-2-1 backup rule (3 copies, 2 different media, 1 offsite) is essential.

2.  **Network Segmentation:** Segment the network to prevent attackers from moving laterally. Critical data servers should be in isolated network zones with strict access controls.

3.  **Patch Management:** Aggressively patch all internet-facing systems and critical internal servers to close the vulnerabilities that ransomware groups exploit for initial access.

4.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access solutions (VPNs, RDP) and for all privileged accounts to protect against credential theft.

**Tags:** ransomware, Nova ransomware, KPMG, data breach, double extortion

## Sources
- [Cyber Threat Intelligence 28 January 2026](https://ncsa.web.th/2026/01/28/cyber-threat-intelligence-28-january-2026/) — NCSA Webboard (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/nova-ransomware-group-claims-attack-on-kpmg-netherlands/
