# Android Patch Fixes Critical RCEs; New Ransomware & Data Breaches Emerge

**Published:** 2026-11-07 | **Articles:** 7

**Critical Vulnerabilities and Exploits:**

*   **Android's November Patch Fixes Critical Zero-Click RCE, 'SMS of Death':** Android's November 2026 patch addresses CVE-2026-58868, a critical heap buffer overflow in `FrameDecoder.cpp` enabling remote code execution without user interaction. The update also resolves two additional critical RCEs, CVE-2026-58876 and CVE-2026-58936, in the System component. Detection methods include monitoring `FrameDecoder.cpp` for crashes and analyzing `logcat` for framework errors, with remediation emphasizing immediate patching and MDM deployment.

**Emerging Threats and Malware:**

*   **New 'Has' Ransomware and 'LunexLoader' Malware Emerge:** 'Has Ransomware' has been identified as a Dharma Ransomware-as-a-Service (RaaS) variant targeting SMBs through phishing and unpatched RDP services. It employs double-extortion tactics, exfiltrating data before encryption and threatening public release if ransom is not paid.

**Recent Data Breaches and Incidents:**

*   **Russian Hosting Provider Begot Hit by Destructive Data-Wiping Attack:** Russian web hosting provider Begot experienced a destructive cyberattack that erased data from its cloud infrastructure after attackers gained access to management systems. The incident has impacted hundreds of websites, and recovery is complicated by the loss of binary backups.
*   **K-Pop Agency HYBE Discloses Breach Exposing Employee, Partner Data:** HYBE, a South Korean entertainment agency, reported a data breach originating from a vulnerable third-party document preview software. The incident exposed sensitive personal information of employees and business partners, including medical records and passport details, and provided access to the company's expense management system.
*   **Amplifon Reports Data Breach Months After Initial Intrusion:** Amplifon (USA) has disclosed a data breach that occurred between January and February 2026, with personal data confirmed to be impacted on October 6. The compromised data may include Social Security numbers or financial information for a limited number of individuals.
*   **DreamHost Confirms Months-Long Breach; Customer Credentials Stolen:** Web hosting provider DreamHost confirmed a breach that began in August 2026 and lasted for several months, resulting in the theft of customer emails and credentials. The company is implementing mandatory password resets for some customers as its investigation continues.
*   **Qilin and Akira Ransomware Gangs Claim Flurry of New Victims:** The Qilin and Akira ransomware gangs have claimed responsibility for multiple new data breaches on November 6, 2026. Qilin's new victims include Calvary Christian College and Insurance Audit Services, while Akira listed accounting firm David L. Wade and Associates on its leak site, indicating ongoing activity across various industries.

## Articles in this publication
- [Android's November Patch Fixes Critical Zero-Click RCE, 'SMS of Death'](https://cyber.netsecops.io/articles/android-november-2026-security-update-patches-critical-zero-click-rce/) (critical)
  Google and Samsung have rolled out the November 2026 Android security update, addressing over 200 vulnerabilities. The patch fixes several critical flaws, including CVE-2026-58868, a zero-click remote code execution (RCE) vulnerability in the Android Framework that requires no user interaction to exploit. Another critical fix, CVE-2026-58882, resolves the 'SMS of Death' bug that could allow an attacker to remotely crash devices via a text message. The update covers Android versions 14 through 17 and includes specific patches for Samsung Galaxy devices.
- [New 'Has' Ransomware and 'LunexLoader' Malware Emerge](https://cyber.netsecops.io/articles/new-has-ransomware-and-lunexloader-malware-emerge-as-new-threats/) (high)
  Researchers have identified two new emerging threats: 'Has' ransomware and the 'LunexLoader' malware. 'Has' is a new variant of the Dharma ransomware family that uses double extortion tactics, encrypting files and threatening to leak exfiltrated data. 'LunexLoader' is a stealthy, modular malware loader delivered via phishing, designed for sandbox evasion and deploying secondary payloads. These threats highlight the continued evolution of ransomware and the sophisticated, multi-stage nature of modern malware attacks.
- [Russian Hosting Provider Begot Hit by Destructive Data-Wiping Attack](https://cyber.netsecops.io/articles/russian-hosting-provider-begot-suffers-destructive-data-wiping-attack/) (high)
  Russian domain registrar and web hosting provider Begot has been targeted by a destructive cyberattack that wiped data from its cloud infrastructure. The attackers gained access to infrastructure management systems and deployed scripts to erase server data, affecting hundreds of websites. Recovery efforts are severely hampered by the loss of binary backups, with the company facing a lengthy manual restoration process.
- [K-Pop Agency HYBE Discloses Breach Exposing Employee, Partner Data](https://cyber.netsecops.io/articles/k-pop-agency-hybe-discloses-breach-via-third-party-software/) (high)
  HYBE, the South Korean entertainment agency managing K-pop group BTS, has disclosed a data breach originating from a vulnerable third-party document preview software. The incident exposed a wide range of sensitive personal information of employees and business partners, including medical records, passport details, and financial data. The attackers also gained similar access to the company's expense management system.
- [Amplifon Reports Data Breach Months After Initial Intrusion](https://cyber.netsecops.io/articles/amplifon-reports-data-breach-months-after-initial-intrusion/) (medium)
  Amplifon (USA), a global provider of hearing products, has reported a data breach that occurred between January and February 2026. The company detected suspicious activity in February but only confirmed that personal data was impacted on October 6 after a lengthy investigation. The compromised data may include Social Security numbers or financial information for a limited number of individuals. Amplifon filed a notice with the Texas Attorney General on November 6.
- [DreamHost Confirms Months-Long Breach; Customer Credentials Stolen](https://cyber.netsecops.io/articles/dreamhost-confirms-prolonged-breach-stealing-customer-credentials/) (high)
  Web hosting provider DreamHost has confirmed a prolonged security breach that began in August 2026 and persisted for several months. The attackers stole customer emails and credentials, among other files. The disclosure followed a recent multi-day service outage. In response, DreamHost is forcing a password reset for some customers as its investigation continues.
- [Qilin and Akira Ransomware Gangs Claim Flurry of New Victims](https://cyber.netsecops.io/articles/qilin-and-akira-ransomware-gangs-claim-multiple-new-breaches/) (high)
  The Qilin and Akira ransomware gangs have been highly active, claiming responsibility for a series of new data breaches on November 6, 2026. Qilin's new victims include Calvary Christian College and Insurance Audit Services. The Akira gang listed accounting firm David L. Wade and Associates on its leak site. Other groups, including INC_RANSOM, also announced new targets, highlighting a relentless wave of attacks across diverse industries.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-07/
