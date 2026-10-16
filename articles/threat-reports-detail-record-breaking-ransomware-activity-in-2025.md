# Ransomware Attacks Skyrocket 58% in 2025, Setting New Records

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Threat Actor | **Updated:** 2026-02-14 | **Reading time:** 7 min

Multiple cybersecurity reports released in January 2026 confirm that 2025 was the most active year for ransomware on record. A report from GuidePoint Security's GRIT team documented a staggering 58% year-over-year increase in publicly claimed ransomware victims. December 2025 alone saw 814 attacks, the highest monthly total ever recorded. Despite law enforcement takedowns of major players like LockBit, the ransomware ecosystem proved resilient. Affiliates quickly migrated to other operations, with the Qilin and Akira ransomware groups emerging as the dominant forces, collectively responsible for a significant portion of all attacks. The United States remained the primary target, and the manufacturing sector was the most heavily impacted industry.

## Executive Summary
Threat intelligence reports from **[GuidePoint Security](https://www.guidepointsecurity.com/)** and **[Symantec](https://www.broadcom.com/products/cyber-security)** have confirmed that 2025 was a landmark year for ransomware, with attack volumes surging to unprecedented levels. GuidePoint's research indicates a 58% increase in victims compared to 2024, culminating in a record-breaking December with 814 claimed attacks. The data shows that law enforcement disruptions against major groups like **[LockBit](https://attack.mitre.org/groups/G0094/)** (Syrphid) and RansomHub had only a temporary effect, as the flexible affiliate-based model allowed attackers to quickly pivot to new or emerging Ransomware-as-a-Service (RaaS) platforms. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and **[Akira](https://malpedia.caad.fkie.fraunhofer.de/actor/akira)** groups rose to prominence, becoming the most prolific operators. The United States continued to be the most targeted nation, and the manufacturing industry bore the brunt of these attacks.

---

## Threat Overview
The key trend of 2025 was the resilience and adaptability of the ransomware ecosystem. The **[RaaS](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** model enables a fluid marketplace where skilled affiliates (attack operators) can switch allegiances to whichever RaaS platform offers the best tools and profit-sharing. When LockBit's infrastructure was disrupted, its affiliates did not cease operations; they simply migrated to other groups.

**Qilin** emerged as a particularly aggressive and successful group, with GuidePoint noting it became the most active group they have ever tracked, even surpassing LockBit's peak activity. **Akira** also maintained a high operational tempo. Together, these two groups accounted for 16% of all attacks in 2025 according to Symantec.

The reports also highlight a diversification of extortion tactics. While data encryption remains a core component, pure data theft extortion—where attackers steal data and threaten to leak it without deploying encryption—is growing. This tactic targets organizations with robust backup strategies, as the threat is purely reputational and financial rather than operational.

**Key Statistics for 2025:**
- **58%** year-over-year increase in claimed victims (GuidePoint).
- **814** attacks in December 2025, the most active month on record.
- **55%** of all victims were located in the United States.
- **Top Targeted Industries:** Manufacturing (14%), Technology (9%), Retail/Wholesale (7%).

---

## Technical Analysis
The TTPs of dominant groups like Qilin and Akira are well-documented and follow a common enterprise ransomware pattern:

1.  **Initial Access:** Affiliates use a variety of methods, with compromised credentials for VPNs and other remote services being a primary vector ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)). Exploitation of public-facing applications, particularly in networking devices and virtualization software, is also common ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).

2.  **Credential Access & Discovery:** Once inside, attackers use tools like **[Mimikatz](https://attack.mitre.org/software/S0002/)** to dump credentials and move laterally. They perform extensive network discovery to identify domain controllers, backup servers, and high-value data stores.

3.  **Defense Evasion:** A key step is disabling or tampering with security software. Attackers use scripts to stop services associated with EDR and antivirus products ([`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)).

4.  **Impact:** Before deploying the ransomware payload ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)), attackers exfiltrate large volumes of sensitive data ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)) to enable the double-extortion threat.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Technique Name |
| :--- | :--- | :--- |
| Initial Access | `T1133` | External Remote Services |
| Credential Access | `T1003` | OS Credential Dumping |
| Defense Evasion | `T1562.001` | Disable or Modify Tools |
| Lateral Movement | `T1021.001` | Remote Desktop Protocol |
| Exfiltration | `T1041` | Exfiltration Over C2 Channel |
| Impact | `T1486` | Data Encrypted for Impact |

---

## Impact Assessment
The record-breaking surge in ransomware has profound economic and societal impacts:
*   **Economic Drain:** Billions of dollars are lost annually to ransom payments, recovery costs, and lost productivity. The manufacturing sector's targeting disrupts physical supply chains, causing cascading economic effects.
*   **Threat to Critical Services:** Attacks on healthcare, government, and critical infrastructure put public safety at risk.
*   **Data Breach Proliferation:** The double-extortion model means that every ransomware attack is now also a data breach, exposing vast amounts of corporate and personal information on the dark web.
*   **Cyber Insurance Strain:** The high frequency and cost of attacks are driving up cyber insurance premiums and making coverage harder to obtain, placing more financial strain on businesses.

---

## Detection & Response
*   **Behavioral Detections:** Focus on detecting attacker behaviors rather than just malware signatures. Use an EDR to alert on credential dumping attempts, lateral movement via RDP/SMB, and the disabling of security tools. This aligns with **[Behavior Prevention on Endpoint (M1040)](https://attack.mitre.org/mitigations/M1040/)**.
*   **Network Monitoring (D3-NTA):** Implement **[Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)** to detect data exfiltration. Monitor for large, unexpected outbound data flows, especially to cloud storage services or unknown IP addresses.
*   **Active Directory Security:** Monitor AD for signs of compromise, such as the creation of new admin accounts, changes to group policies, or Kerberoasting attempts. This is a form of **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.

---

## Mitigation
Combating the industrialized ransomware threat requires fundamental security hygiene and modern defenses.

1.  **Secure Remote Access (M1032):** Enforce phishing-resistant **[Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** on all VPNs and remote access points. This is the single most effective control against credential-based intrusions.

2.  **Patch Management (M1051):** Aggressively patch internet-facing systems and critical vulnerabilities. Ransomware groups are quick to weaponize new exploits.

3.  **Immutable Backups:** Implement a 3-2-1 backup strategy with at least one copy offline or immutable. Regularly test your restoration process to ensure you can recover without paying the ransom.

4.  **Privileged Access Management (M1026):** Implement PAM solutions and a tiered administrative model to limit the scope of privileged accounts. This contains the damage if an admin account is compromised.

**Tags:** Ransomware, Threat Intelligence, GuidePoint Security, Symantec, Qilin, Akira, LockBit, RaaS

## Sources
- [Ransomware Victims and Threat Groups Surge to Record Levels, GuidePoint Security Finds](https://www.guidepointsecurity.com/blog/ransomware-victims-and-threat-groups-surge-to-record-levels-guidepoint-security-finds/) — GuidePoint Security (2026-01-15)
- [Ransomware activity never dies, it multiplies](https://www.helpnetsecurity.com/2026/01/16/ransomware-attacks-trends/) — Help Net Security (2026-01-16)

---
Source: https://cyber.netsecops.io/articles/threat-reports-detail-record-breaking-ransomware-activity-in-2025/
