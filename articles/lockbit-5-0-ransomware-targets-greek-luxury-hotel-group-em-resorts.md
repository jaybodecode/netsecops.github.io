# LockBit 5.0 Ransomware Claims Attack on Greek Luxury Hotel Group EM Resorts

**Severity:** high | **Category:** Ransomware,Data Breach,Cyberattack | **Updated:** 2025-12-27 | **Reading time:** 4 min

On December 26, 2025, the prolific LockBit 5.0 ransomware group claimed responsibility for a cyberattack against EM Resorts, a luxury hotel operator based in Crete, Greece. The group posted a notice on its dark web leak site, threatening to publish exfiltrated data unless a company representative makes contact. This incident follows LockBit's typical double-extortion model, where they both encrypt victim data and steal it for leverage. The full scope of the breach and the type of data stolen have not yet been disclosed, but the attack highlights the ongoing threat ransomware poses to the hospitality industry.

## Executive Summary
The notorious **[LockBit](https://attack.mitre.org/groups/G0116/)** ransomware operation, using its 5.0 variant, has claimed a new victim in the high-end hospitality sector. On December 26, 2025, the group added **EM Resorts**, a luxury hotel brand in Crete, Greece, to its dark web leak site. The post included a threat to publish stolen data, indicating a classic double-extortion attack. This incident underscores the persistent and indiscriminate nature of major ransomware-as-a-service (RaaS) groups, which continue to target organizations of all sizes and sectors. For EM Resorts, the potential leak of guest information, financial records, and operational data poses a significant threat to its reputation and business continuity.

## Threat Overview
The attack was publicly claimed by the LockBit 5.0 group, which operates one of the most active RaaS platforms. The claim on their leak site is a standard tactic used to apply public pressure on victims to pay the ransom. By threatening to release exfiltrated data, the group employs a double-extortion strategy: the victim's systems are crippled by encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)), and they face a potential data breach if they refuse to pay ([`T1657 - Financial Extortion`](https://attack.mitre.org/techniques/T1657/)).

While the initial access vector for the EM Resorts breach is unknown, LockBit affiliates commonly use methods such as:
-   Exploiting unpatched vulnerabilities in public-facing services (e.g., VPNs, RDP).
-   Phishing campaigns to steal employee credentials.
-   Purchasing access from initial access brokers (IABs).

Once inside, the attackers would have moved laterally across the network, escalated privileges, and exfiltrated sensitive data before deploying the ransomware payload to encrypt servers and workstations.

## Technical Analysis
LockBit 5.0 is a sophisticated ransomware variant that includes features to evade security software and inhibit recovery. The attackers likely used legitimate administrative tools like **[PsExec](https://attack.mitre.org/software/S0029/)** or PowerShell for lateral movement ([`T1021.002 - Remote Services: SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/)). Before encryption, they would have exfiltrated data to a cloud storage provider or their own infrastructure ([`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)). Finally, the ransomware executable is deployed, often via Group Policy Objects (GPO) or other software deployment tools, to achieve widespread impact.

## Impact Assessment
For a luxury hospitality brand like EM Resorts, the impact of this attack is multi-faceted:
-   **Data Breach**: The potential leak of guest data, including personal identifiable information (PII) and payment details, could lead to significant regulatory fines under GDPR, reputational damage, and loss of customer trust.
-   **Business Disruption**: Encrypted systems for reservations, property management (PMS), and point-of-sale (POS) would severely disrupt hotel operations, potentially forcing a temporary shutdown.
-   **Financial Loss**: The costs associated with incident response, system restoration, potential ransom payment, legal fees, and lost revenue can be substantial.
-   **Reputational Damage**: Being listed on a prominent ransomware leak site damages the brand's image of security and exclusivity, which is critical in the luxury market.

## Detection & Response
1.  **Monitor for LockBit Indicators**: Security teams should monitor for TTPs associated with LockBit, including the use of tools like `PsExec`, abuse of `lsass.exe` for credential dumping, and large, unexpected outbound data transfers.
2.  **EDR and Antivirus**: Ensure endpoint protection is configured to detect and block LockBit 5.0 signatures and behaviors. Monitor for processes that attempt to disable security services or delete volume shadow copies.
3.  **Network Monitoring**: Look for connections to known LockBit C2 servers or data exfiltration endpoints. This aligns with **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.
4.  **Incident Response**: If an intrusion is suspected, immediately isolate affected systems to prevent further spread. Preserve logs and disk images for forensic analysis. Engage with a professional incident response firm to conduct a compromise assessment and eradicate the threat.

## Mitigation
1.  **Patch Management**: Aggressively patch all internet-facing systems and critical software to close the vulnerabilities that ransomware groups commonly exploit. This is a direct application of **[D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Multi-Factor Authentication (MFA)**: Enforce MFA on all remote access solutions (VPN, RDP), email accounts, and privileged administrative accounts. This is one of the most effective controls against credential-based attacks. This is **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
3.  **Immutable Backups**: Maintain and regularly test offline and immutable backups. This ensures that data can be restored without paying a ransom, neutralizing the encryption portion of the attack.
4.  **Network Segmentation**: Segment the network to limit an attacker's ability to move laterally. Isolate critical systems, such as property management and payment processing systems, from the general corporate network. This is a form of **[D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.

**Tags:** LockBit, Ransomware, Double Extortion, Hospitality, Greece, Data Breach

## Sources
- [LockBit 5.0 Ransomware Attack on EM Resorts in Greece](https://dexpose.io/lockbit-5-0-ransomware-attack-on-em-resorts-in-greece/) — dExpose (2025-12-26)

---
Source: https://cyber.netsecops.io/articles/lockbit-5-0-ransomware-targets-greek-luxury-hotel-group-em-resorts/
