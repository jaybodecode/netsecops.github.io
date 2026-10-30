# Ransomware Groups Pivot to 'Pure Extortion' as Victim Payment Rates Collapse

**Severity:** informational | **Category:** Ransomware,Threat Intelligence,Data Breach | **Updated:** 2026-06-11 | **Reading time:** 4 min

A significant trend is emerging in the cybercrime landscape as threat actors move away from traditional data encryption ransomware attacks to a 'pure extortion' model focused solely on data theft and the threat of public leaks. This strategic shift is reportedly driven by a steep decline in the rate of ransom payments by victims, which have fallen from 76% in 2019 to just 28% today, as organizations improve their backup and recovery capabilities.

## Executive Summary
Cybercrime tactics are evolving in response to improved enterprise defenses. A new report from **[Kaspersky](https://www.kaspersky.com)** indicates a major strategic shift among ransomware groups away from the hallmark tactic of data encryption. Instead, many are now adopting a "pure extortion" model. This involves breaching a network, stealing sensitive data, and forgoing the deployment of ransomware altogether. The leverage then comes not from operational disruption, but purely from the threat of leaking the exfiltrated data. This change is a direct result of economic pressures: with ransom payment rates collapsing to just 28%, attackers are finding data theft to be a more reliable and profitable monetization strategy.

---

## Threat Overview
The traditional ransomware model, known as double extortion, involves two threats: 1) data is encrypted, disrupting operations, and 2) data is exfiltrated, with a threat to leak it. The new "pure extortion" or "data theft extortion" model simplifies this by focusing only on the second part.

**Drivers for the Shift**:
-   **Declining Payments**: A **Kaspersky** report highlights that ransom payment rates have plummeted from 76% in 2019 to 28% today. As fewer than one in three victims pay for a decryption key, the return on investment for developing and deploying encryption malware has decreased.
-   **Improved Defenses**: Organizations have become much better at mitigating the impact of encryption. Robust, immutable backup and recovery strategies ([`M0916 - Data Backup`](https://attack.mitre.org/mitigations/ics/M0916/)) mean many companies can restore their systems without paying the ransom.
-   **Stealth and Speed**: Data exfiltration can be quieter and faster than encrypting hundreds or thousands of systems. Encrypting files is a noisy process that can trigger security alerts, while data theft can sometimes be blended with normal network traffic.

**The New Pressure Point**:
Threat actors are now betting that the fear of reputational damage, regulatory fines (e.g., under GDPR or HIPAA), and loss of competitive advantage from a public data leak is a stronger motivator for payment than operational downtime.

---

## Impact Assessment
This tactical shift has several implications for defenders:
-   **Detection Becomes Harder**: The focus shifts from detecting the noisy encryption process to detecting the stealthier data exfiltration phase. This requires a greater emphasis on monitoring outbound network traffic and identifying anomalous data transfers.
-   **Prevention is Even More Critical**: Once data has been exfiltrated, the damage is done. Unlike with encryption, where a successful restoration can fully mitigate the impact, stolen data cannot be 'un-stolen'. The leverage is permanent.
-   **Incident Response Changes**: The response to a pure extortion attack focuses less on system recovery and more on damage control: understanding what data was taken, notifying affected parties, and managing the public fallout.

---

## Detection and Mitigation
Defending against pure extortion requires a focus on preventing the initial breach and detecting data exfiltration.

### Detection
1.  **Network Traffic Analysis**: Implement Network Detection and Response (NDR) solutions to baseline normal traffic patterns and alert on anomalies, such as large data transfers to unexpected locations or the use of data staging tools. This is a direct application of [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **Data Loss Prevention (DLP)**: Deploy DLP solutions on endpoints, email gateways, and network egress points to identify and block the unauthorized transfer of sensitive data.
3.  **Deception Technology**: Use decoy systems and data (honeypots/honeytokens) to lure attackers. Any access to these decoy assets is a high-fidelity indicator of a breach.

### Mitigation
1.  **Strengthen Initial Access Defenses**: The best way to stop data theft is to prevent attackers from getting in. This means robust patch management, MFA everywhere, and strong email security.
2.  **Data Discovery and Classification**: Organizations must know where their sensitive data resides to properly protect it. Implement data classification policies and use discovery tools to find and secure crown jewel assets.
3.  **Zero Trust Architecture**: Adopt a Zero Trust mindset. Assume the network is hostile and require strict verification for every user and device trying to access resources. Implement network segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)) to limit an attacker's ability to move laterally and find valuable data.

**Tags:** Ransomware, Extortion, Data Theft, Cybercrime, Kaspersky, Threat Trends

## Sources
- [Cyber Daily News for May 24, 2026](https://www.youtube.com/watch?v=xxxxxxxxxx) — YouTube (2026-05-24)
- [DragonForce Strikes at HELIX INTERNATIONAL](https://www.dexpose.io/blog/dragonforce-strikes-at-helix-international) — DeXpose (2026-05-25)

---
Source: https://cyber.netsecops.io/articles/ransomware-groups-shift-to-pure-extortion-as-payment-rates-decline/
