# Ransomware Evolves in 2026: Attackers Adopt Post-Quantum Crypto and Encryptionless Extortion

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Threat Actor | **Updated:** 2026-05-25

Kaspersky's 2026 ransomware report reveals major tactical shifts. While the number of affected organizations has slightly decreased, the threat has intensified. Advanced groups are now deploying ransomware with post-quantum cryptography to future-proof their extortion. A growing trend is 'encryptionless extortion,' where attackers like ShinyHunters skip encryption and focus solely on data theft and the threat of public leaks. Attackers also continue to rely on Initial Access Brokers and increasingly use 'EDR killers' and BYOVD techniques to neutralize endpoint security as a standard attack phase.

## Executive Summary
On International Anti-Ransomware Day, **[Kaspersky](https://www.kaspersky.com)** released its annual report on the ransomware threat landscape, highlighting profound tactical evolutions in 2026. While the overall percentage of organizations impacted by ransomware saw a slight decline in 2025, the nature of the threat has become more sophisticated and dangerous. The report identifies three key trends: the adoption of post-quantum cryptography by advanced groups to ensure long-term data decryption impossibility; a significant shift towards 'encryptionless extortion' where data theft and public leakage is the sole threat; and the methodical, widespread use of tools and techniques like 'EDR killers' and Bring Your Own Vulnerable Driver (BYOVD) to disable security measures before payload deployment.

## Threat Overview
The 2026 ransomware ecosystem is characterized by adaptation and specialization. Threat actors are not just encrypting data; they are building multi-faceted extortion schemes.

1.  **Post-Quantum Cryptography (PQC):** For the first time, ransomware families have been observed in the wild using quantum-resistant encryption algorithms. This is a forward-looking strategy. Attackers are encrypting data today knowing that even if victims back it up, the data will remain securely encrypted against future quantum computers, making the extortion demand perpetually relevant.

2.  **Encryptionless Extortion:** Groups like **[ShinyHunters](https://www.google.com/search?q=ShinyHunters+threat+actor)** are pioneering a model that bypasses the encryption step altogether. They gain access, exfiltrate sensitive data, and then threaten to leak it publicly. This approach is faster, stealthier (as it avoids noisy encryption processes that might trigger alerts), and removes the need for the attackers to maintain complex and potentially buggy encryption software.

3.  **Systematic Evasion:** The neutralization of endpoint security is no longer an opportunistic step but a core, planned phase of the attack. Ransomware operators are heavily utilizing 'EDR killers' (tools designed to terminate security agent processes) and BYOVD techniques. The BYOVD method involves using a legitimate, signed (but vulnerable) driver to execute malicious code with kernel-level privileges, effectively blinding EDR and antivirus solutions.

4.  **Initial Access:** The reliance on **[Initial Access Brokers (IABs)](https://en.wikipedia.org/wiki/Initial_access_brokerage)** remains strong. IABs continue to sell access to corporate networks, with compromised Remote Desktop Protocol (RDP), VPNs, and especially RDWeb being the most common entry points.

## Technical Analysis
### Post-Quantum Cryptography
- **Implementation:** Involves using algorithms like CRYSTALS-Kyber (for key exchange) and CRYSTALS-Dilithium (for digital signatures), which are standardized by NIST.
- **Impact:** Makes encrypted data theoretically immune to decryption by future quantum computers, increasing the long-term leverage of the extortion.

### BYOVD (Bring Your Own Vulnerable Driver)
- **Process:**
    1. Attacker gains initial access and elevates privileges to administrator.
    2. Attacker drops a known-vulnerable but legitimately signed driver (e.g., from a hardware vendor) onto the system.
    3. The attacker loads this driver into the kernel.
    4. They exploit the vulnerability in the driver to run their own malicious code with kernel-level permissions.
    5. This kernel-level code is then used to terminate security processes (e.g., `MsMpEng.exe`, `SentinelAgent.exe`) in a way that the EDR cannot protect itself.

### MITRE ATT&CK Techniques
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): The classic ransomware encryption tactic, now being augmented with PQC.
- [`T1657 - Data Exfiltration as a Service`](https://attack.mitre.org/techniques/T1657/): The core of the 'encryptionless extortion' model, focusing on stealing data for leverage.
- [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/): The use of 'EDR killers' to terminate security software.
- [`T1068 - Exploitation for Privilege Escalation`](https://attack.mitre.org/techniques/T1068/): Leveraged in BYOVD attacks to gain kernel-level execution.
- [`T1589.002 - Gather Victim Identity Information: Email Addresses`](https://attack.mitre.org/techniques/T1589/002/): A common tactic for IABs and phishing campaigns that lead to initial access.

## Impact Assessment
These evolving tactics have significant implications for organizations:
- **Future-Proofed Extortion:** Data encrypted with PQC may be permanently lost if the key is not paid for, as future technological advances won't be able to break it.
- **Increased Reputational Damage:** The shift to encryptionless extortion makes every ransomware attack a data breach by default. The primary impact shifts from operational downtime to severe reputational damage, regulatory fines (GDPR, HIPAA), and loss of customer trust.
- **Evasion of Modern Defenses:** The systematic targeting of EDR solutions means that organizations relying solely on endpoint protection are increasingly blind to the most critical stages of a ransomware attack.

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns related to these new trends:
- **Driver Loading:** Monitor for the loading of unusual or known-vulnerable drivers. Track driver load events (e.g., Windows Event ID 7045) and correlate them with process termination events for security agents.
- **Data Staging:** For encryptionless extortion, hunt for large-scale data aggregation. Look for the creation of large archive files (`.zip`, `.rar`, `.7z`) on servers or workstations, followed by large outbound data transfers to cloud storage or unfamiliar IP addresses.
- **Security Service Tampering:** Create alerts for the termination or modification of critical security services and processes. Any attempt to stop an EDR agent should be a high-priority alert.

## Detection & Response
- **Detection:**
  - **Tamper Protection:** Ensure that all endpoint security solutions have tamper protection enabled and monitored. This is a critical feature to defend against 'EDR killers'.
  - **Driver Control:** Use application control policies to restrict the loading of all but a pre-approved list of drivers. This is a core principle of **[D3FEND Driver Load Integrity Checking (D3-DLIC)](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking)**.
  - **Data Loss Prevention (DLP):** Deploy and tune DLP solutions to detect and block the unauthorized exfiltration of large volumes of sensitive data.

- **Response:**
  - If EDR tampering is detected, assume the host is fully compromised and move to isolate it from the network immediately.
  - In an encryptionless extortion scenario, the response plan must pivot from data recovery to crisis communication, legal counsel engagement, and regulatory notification.

## Mitigation
- **Backup and Recovery:** While less effective against encryptionless extortion, immutable, offline backups remain the single most important defense against data encryption attacks.
- **Harden Access Vectors:** Aggressively patch VPNs and other edge devices. Enforce strong, phishing-resistant MFA on all external access points, especially RDP and RDWeb. This aligns with **[D3FEND Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
- **Kernel Protection:** Enable virtualization-based security (VBS) and Hypervisor-Protected Code Integrity (HVCI) on Windows systems to protect the kernel from malicious code injection via vulnerable drivers.
- **Network Segmentation:** Segment networks to prevent attackers from moving laterally after gaining initial access. This can contain the blast radius of an attack and hinder data exfiltration from sensitive data stores.

**Tags:** BYOVD, EDR Evasion, Encryptionless Extortion, Kaspersky, PQC, Post-Quantum Cryptography, Ransomware, ShinyHunters

## Sources
- [Reviewing the trends in ransomware attacks in 2026](https://securelist.com/reviewing-the-trends-in-ransomware-attacks-in-2026/112674/) (2026-05-12)
- [AI and Phishing-as-a-Service Drive Increase in Email Attacks, Barracuda Reports](https://www.barracuda.com/news-release/ai-and-phishing-as-a-service-drive-increase-in-email-attacks-barracuda-reports) (2026-05-12)
- [Ransomware in 2026: EDR Killers, Post-Quantum Crypto, and Encryption-Less Extortion](https://www.csoonline.com/article/2099354/ransomware-in-2026-edr-killers-post-quantum-crypto-and-encryption-less-extortion.html) (2026-05-22)
- [Kaspersky Report Details Alarming Ransomware Trends for 2026](https://www.techrepublic.com/article/kaspersky-report-ransomware-trends-2026/) (2026-05-22)

---
Source: https://cyber.netsecops.io/articles/ransomware-trends-2026-post-quantum-encryption-and-data-leak-extortion/
