# Silver Fox APT Expands Reach, Targets Japan and Malaysia with New RAT

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2025-10-19 | **Reading time:** 5 min

The Chinese-nexus cybercrime group known as "Silver Fox" has expanded its targeting beyond China and Taiwan to include organizations in Japan and Malaysia. Researchers report the group is using phishing emails with malicious PDFs to distribute the HoldingHands RAT. This expansion follows previous campaigns where the group used diverse tactics, including SEO poisoning to spread the Winos 4.0 (ValleyRAT) malware and Bring Your Own Vulnerable Driver (BYOVD) attacks to disable security software. The group's evolving tactics and widening geographic scope indicate an increased threat to government and commercial entities across Asia.

## Executive Summary
The aggressive Chinese cybercrime group known as **Silver Fox** (also tracked as **SwimSnake** and **Void Arachne**) has expanded its operational focus to include Japan and Malaysia. Previously concentrated on targets in China and Taiwan, the group is now using phishing campaigns to deploy a remote access trojan (RAT) called **HoldingHands RAT** (or **Gh0stBins**). This activity is part of a broader set of operations by the group, which also distributes the **Winos 4.0** (**ValleyRAT**) malware. The group's diverse and evolving tactics, which include SEO poisoning and BYOVD attacks, signal a growing and sophisticated threat to organizations across the Asia-Pacific region.

---

## Threat Overview
According to researchers at **[Fortinet](https://www.fortinet.com/)**'s FortiGuard Labs, the latest campaign involves phishing emails containing PDF documents. These PDFs are designed as lures, such as a document masquerading as a Taiwanese tax regulation draft. The PDFs contain embedded links that, when clicked, lead the victim to a malicious webpage, for example, `twsww[.]xin/download[.]html`. This page, written in Japanese, prompts the user to download a ZIP archive containing the **HoldingHands RAT**.

This expansion follows a pattern of versatile and aggressive behavior from **Silver Fox**. The group is known for:
- **SEO Poisoning:** Manipulating search results to direct users to fake download sites for popular software like Google Chrome and Telegram, which then deliver malware like **Winos 4.0**.
- **Bring Your Own Vulnerable Driver (BYOVD):** In September 2025, **[Check Point](https://www.checkpoint.com/)** research linked the group to an attack that abused a legitimate driver from WatchDog Anti-malware to disable security products on compromised systems.
- **Targeted Phishing:** In a separate campaign dubbed "Operation Silk Lure," **Seqrite Labs** observed the group targeting HR departments in Chinese fintech and crypto firms with job-themed lures to deliver **Winos 4.0**.

---

## Technical Analysis
**Silver Fox** employs a variety of TTPs to achieve its objectives, which appear to be a mix of cybercrime and espionage. The attack chain for the **HoldingHands RAT** campaign is a classic phishing-to-malware pipeline.

**Attack Chain:**
1.  **Initial Access:** A phishing email with a malicious PDF attachment is sent to the target.
2.  **User Execution:** The victim opens the PDF and clicks a malicious link.
3.  **Drive-by Compromise:** The link directs the user to a malicious webpage that hosts the malware.
4.  **Execution:** The user is tricked into downloading and executing a ZIP file, which deploys the **HoldingHands RAT**.
5.  **Command and Control:** The RAT establishes a connection to an actor-controlled server for remote access and data exfiltration.

**MITRE ATT&CK Techniques:**
- [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): Use of malicious PDF attachments in phishing emails.
- [`T1204.001 - User Execution: Malicious Link`](https://attack.mitre.org/techniques/T1204/001/): Relies on the user clicking a link within the PDF document.
- [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/): Luring users to a malicious site to download malware.
- [`T1548.002 - Bypass User Account Control`](https://attack.mitre.org/techniques/T1548/002/): The BYOVD technique is a sophisticated method to bypass UAC and gain kernel-level privileges.
- [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/): The BYOVD attack was used to disable security software.

---

## Impact Assessment
The expansion of **Silver Fox**'s operations poses a significant threat to organizations in Japan and Malaysia. The deployment of RATs like **HoldingHands** and **Winos 4.0** can lead to the complete compromise of infected systems, resulting in the theft of sensitive corporate data, intellectual property, and financial information. The group's targeting of government-related themes (Ministry of Finance) suggests a potential cyber espionage motive in addition to financial crime. Their proven ability to disable security software makes them a particularly dangerous and persistent adversary.

---

## IOCs
| Type | Value | Description |
|---|---|---|
| url | `twsww[.]xin/download[.]html` | Malicious webpage used to distribute the HoldingHands RAT. |

---

## Detection & Response
1.  **Email and Web Filtering:** Block emails containing suspicious PDF attachments and deny access to known malicious domains and URLs like the one identified.
2.  **Endpoint Monitoring:** Use EDR solutions to monitor for the execution of unsigned binaries and scripts, especially those originating from downloaded ZIP files. Look for behaviors associated with RATs, such as registry modifications for persistence, process injection, and unusual network connections.
3.  **Driver Monitoring:** Monitor for the loading of unusual or known-vulnerable drivers. Enabling Windows Defender's vulnerable driver blocklist can help mitigate BYOVD attacks.

**D3FEND Techniques for Detection:**
- [`D3-FA - File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis): Statically and dynamically analyzing PDFs and downloaded ZIP archives to identify malicious links and payloads.
- [`D3-DLIC - Driver Load Integrity Checking`](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking): A key defense against the BYOVD TTP used by **Silver Fox**.

---

## Mitigation
1.  **User Awareness Training:** Train employees to be suspicious of unsolicited emails, especially those with attachments or links, even if they appear to be from official sources.
2.  **Restrict Web Content:** Use web proxies to block access to uncategorized or newly registered domains, which are often used in phishing campaigns.
3.  **Application Hardening:** Configure PDF readers to disable the automatic execution of links or scripts.
4.  **Endpoint Security:** Ensure endpoint security solutions are kept up-to-date and that tamper protection features are enabled to prevent attackers from disabling them.

**D3FEND Countermeasures:**
- **Harden:** Implement [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by configuring PDF viewers to warn users before opening external links.
- **Isolate:** Use [`D3-DA - Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis) in a sandbox environment to inspect suspicious files and URLs before they reach the user's endpoint.

**Tags:** Silver Fox, APT, Winos 4.0, HoldingHands RAT, cyber espionage, BYOVD, phishing

## Sources
- [Silver Fox Expands Winos 4.0 Attacks to Japan and Malaysia via HoldingHands RAT](https://thehackernews.com/2025/10/silver-fox-expands-winos-40-attacks-to.html) — The Hacker News (2025-10-18)
- [WIU Cybersecurity Center - Western Illinois University](https://www.wiu.edu/cbt/cybersecurity_center/news.php) — WIU Cybersecurity Center (2025-10-18)
- [Winos 4.0 hackers expand to Japan and Malaysia with new malware](https://securityaffairs.com/169707/apt/winos-4-0-holdinghands-rat.html) — Security Affairs (2025-10-18)

---
Source: https://cyber.netsecops.io/articles/silver-fox-apt-expands-attacks-to-japan-malaysia/
