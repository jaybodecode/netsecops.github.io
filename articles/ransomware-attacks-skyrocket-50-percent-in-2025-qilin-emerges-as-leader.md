# Ransomware Attacks Surge 50% in 2025; Qilin Group Takes the Lead

**Severity:** high | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2025-11-16 | **Reading time:** 5 min

Cybersecurity researchers report a staggering 50% increase in ransomware attacks in 2025, with over 5,000 incidents claimed on dark web leak sites by late October. This surge occurs amidst a significant realignment in the ransomware ecosystem, with formerly dominant groups fading while new and resurgent actors like Qilin take their place. The Qilin group has been particularly prolific, leading in victim counts for most of the past six months. The United States remains the most targeted nation, and the industrial sector is the most heavily impacted industry. PowerShell has become the primary tool for attackers, used in nearly 78% of observed campaigns.

## Executive Summary
The year 2025 has seen an alarming 50% rise in ransomware activity compared to 2024, with cybersecurity firm **[Cyble](https://cyble.com/)** tracking 5,010 claimed attacks as of October 21. This dramatic increase has occurred during a period of significant upheaval in the ransomware-as-a-service (RaaS) market. While established players like RansomHub have declined, new groups have risen to fill the void. The **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin_ransomware)** ransomware group has emerged as the current market leader, responsible for 441 victim posts between April and September. Another new group, **The Gentlemen**, has also made a notable entrance with 46 claimed victims. The United States continues to be the primary target, and the industrial sector is the most heavily victimized. The report highlights a tactical shift towards using **[PowerShell](https://attack.mitre.org/techniques/T1059/001/)** as the dominant tool for executing ransomware payloads.

---

## Threat Overview
The ransomware landscape is more dynamic and fragmented than ever. The 50% year-over-year increase indicates that law enforcement disruptions, while impactful, have not slowed the overall pace of attacks. Affiliates quickly migrate to new or rebranded RaaS operations, ensuring the business model's continuity.

**Key Threat Actors:**
- **Qilin:** The most active group, leading in victim claims for five of the last six months. Notably conducted the "KoreanLeak" campaign targeting South Korean asset management firms.
- **The Gentlemen:** A new but sophisticated group that has quickly established a presence.
- **Sinobi & Akira:** Other active groups contributing to the high volume of attacks.

**Primary Targets:**
- **Geographies:** The United States is disproportionately targeted, accounting for 55% of victims (1,285 incidents). Other major targets include Germany, France, Canada, and the UK.
- **Industries:** The industrial sector is the most affected, with 890 posts (36.57% of attacks), followed by manufacturing and chemical industries.

## Technical Analysis
Threat actors are leveraging common, legitimate tools to carry out their attacks, a tactic known as Living off the Land (LotL). This makes detection more challenging.

**Common TTPs:**
- **Execution:** [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) is the dominant vector, used in 77.7% of tool-based ransomware activity to execute malicious payloads and scripts.
- **Lateral Movement:** [`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/) using tools like **[PsExec](https://attack.mitre.org/software/S0029/)** was observed in 66.5% of campaigns.
- **Discovery:** SoftPerfect Network Scanner was used for network reconnaissance in 54.2% of cases to identify targets within a compromised network.
- **Command and Control:** Standard `net` commands were used for command execution in over 70% of attacks, often for creating accounts or modifying permissions.

This reliance on built-in and common administrative tools demonstrates a shift towards stealth and operational efficiency.

## Impact Assessment
The 50% surge in attacks translates to significant financial and operational damage for thousands of organizations globally. For the industrial sector, a ransomware attack can halt production lines, disrupt supply chains, and even create safety risks. The double extortion model, where data is both encrypted and stolen for public release on leak sites, adds the cost of data breach notification, regulatory fines, and long-term reputational damage to the immediate costs of system recovery and downtime.

## Detection & Response
- **PowerShell Logging:** Ensure enhanced PowerShell script block logging and module logging is enabled and forwarded to a central SIEM. Look for obfuscated scripts, commands that download content from the internet (`IEX (New-Object Net.WebClient).DownloadString`), and suspicious command-line arguments. Reference **[D3FEND Decoy File](https://d3fend.mitre.org/technique/d3f:DecoyFile)** by placing honey-scripts that trigger alerts when executed.
- **Monitor Admin Tools:** Closely monitor the usage of tools like `PsExec` and network scanners. While legitimate uses exist, their execution from non-administrator workstations or at unusual times should be a high-priority alert.
- **Behavioral Analysis:** Deploy EDR solutions that use behavioral analysis to detect ransomware activity, such as rapid file encryption (**[D3FEND File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**), deletion of volume shadow copies (`vssadmin.exe delete shadows`), and attempts to disable security software.

## Mitigation
1.  **Restrict PowerShell:** Use application control policies (like AppLocker or WDAC) to restrict PowerShell execution to only signed scripts and authorized administrators. Set the PowerShell execution policy to `AllSigned` or `Restricted`.
2.  **Network Segmentation:** Segment the network to prevent lateral movement. Critical systems, especially in industrial environments (OT/ICS), should be isolated from the corporate IT network.
3.  **Immutable Backups:** Maintain offline and immutable backups of critical data. Regularly test the restoration process to ensure recovery is possible after an attack.
4.  **Multi-Factor Authentication (MFA):** Enforce MFA on all remote access points (VPNs, RDP) and for all privileged accounts to prevent initial access via compromised credentials.

**Tags:** Ransomware, Qilin, The Gentlemen, PowerShell, Industrial Sector, Threat Intelligence, RaaS

## Sources
- [Newcomers Fuel Ransomware Explosion in 2025 as Old Groups Fade](https://www.cyble.com/blog/newcomers-fuel-ransomware-explosion-in-2025-as-old-groups-fade/) — Cyble
- [Ransomware Attacks Have Soared in 2025 as New Leaders Emerge](https://thecyberexpress.com/ransomware-attacks-soared-in-2025/) — The Cyber Express
- [Trellix reports nation-state espionage and AI-driven financial attacks converging, as industrial sector most targeted](https://industrialcyber.co/news/trellix-reports-nation-state-espionage-and-ai-driven-financial-attacks-converging-as-industrial-sector-most-targeted/) — Industrial Cyber

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-skyrocket-50-percent-in-2025-qilin-emerges-as-leader/
