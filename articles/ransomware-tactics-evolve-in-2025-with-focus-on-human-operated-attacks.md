# Ransomware Evolves: "ClickFix" Social Engineering and Threat Actor Alliances on the Rise

**Severity:** high | **Category:** Ransomware,Threat Actor,Threat Intelligence | **Updated:** 2025-12-18 | **Reading time:** 4 min

A December 2025 threat report from NCC Group indicates that while ransomware attack volumes plateaued in November with 583 incidents, their sophistication markedly increased. Attackers are increasingly adopting the "ClickFix" (also known as ClearFake) social engineering technique, which tricks users into manually running malicious commands, bypassing many automated defenses. The report also highlights a trend of collaboration, with groups like DragonForce forming alliances with skilled affiliates from other networks. The Qilin ransomware group remained the most prolific actor, with the industrials sector and North America being the most targeted.

## Executive Summary
The ransomware landscape continued to mature in November 2025, with threat actors compensating for a slight plateau in attack volume by increasing their tactical sophistication. According to the latest Cyber Threat Intelligence Report from **[NCC Group](https://www.nccgroup.com)**, attackers are shifting towards methods that exploit human behavior and are forming strategic alliances to enhance their effectiveness. A key emerging trend is the use of the "ClickFix" (also known as ClearFake) social engineering technique, which manipulates users into executing malicious code themselves. For the fourth consecutive month, the **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** ransomware group was the most active, while the industrials sector and North America remained the primary targets.

---

## Threat Overview
November 2025 saw 583 recorded ransomware incidents, a minor 2% decrease from October. However, the evolution of TTPs points to a more dangerous and adaptive threat environment.

### The Rise of "ClickFix"
The most notable tactical shift is the surge in the **ClickFix** social engineering technique. This method, also known as ClearFake, became the second most common initial access vector in November, behind only traditional phishing.
- **How it Works**: Victims visiting a compromised website are presented with a fake alert (e.g., a fake browser update). The alert instructs them to open their browser's developer tools and paste a snippet of code to 'fix' the issue. This user-executed code then downloads the next-stage malware.
- **Why it's Effective**: It bypasses security controls that scan for malicious downloads or attachments because the user is manually initiating the malicious action using legitimate system tools. Its use surged by 517% in the first half of 2025.

### Threat Actor Collaboration
The report highlights increased collaboration between ransomware groups. The **DragonForce** group, for example, has been observed forming alliances with skilled affiliates from other prominent networks like **Scattered Spider**. This allows them to pool resources, share expertise, and adapt their attack chains more rapidly to different target environments.

### November Statistics
- **Most Active Group**: **Qilin** was responsible for 17% of all attacks.
- **Most Targeted Region**: North America (57% of attacks).
- **Most Targeted Industry**: Industrials/Manufacturing (25% of attacks).

## Technical Analysis
The adoption of **ClickFix** represents a move towards exploiting the human element as a primary vector ([`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204.002/)). By tricking the user into running code, attackers offload the execution step, making detection by automated systems more difficult. This is a significant evolution from simply tricking a user into clicking a link or opening an attachment.

The alliances between groups like **DragonForce** and affiliates from **Scattered Spider** signify a maturing RaaS ecosystem. Instead of competing, some groups are specializing and collaborating, leading to more potent and versatile attack capabilities. This allows a RaaS operator to 'hire' specialists in areas like initial access, lateral movement, or specific software exploitation, creating a more effective overall operation.

## Impact Assessment
The evolving sophistication of ransomware attacks means that organizations face a more persistent and adaptable threat. The impact remains severe:
- **Operational Disruption**: Encryption of critical systems leads to complete business shutdown.
- **Data Breach and Extortion**: Nearly all modern ransomware attacks involve double extortion, where data is stolen before encryption and threatened to be leaked if the ransom is not paid.
- **Increased Defense Costs**: The need to defend against more sophisticated, human-centered attacks requires investment in advanced security tools and continuous user training.

## Detection & Response
- **Detecting ClickFix**: Monitor for the execution of browser developer tools, especially if followed by suspicious script execution or network connections. EDR solutions can be configured to alert on processes like `powershell.exe` or `cmd.exe` being spawned from a browser process.
- **D3FEND Technique - [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**: Analyze user behavior for anomalies. An employee who does not normally use developer tools suddenly accessing them should be a flag for investigation.
- **Threat Intelligence**: Stay informed on the TTPs of top ransomware groups like **Qilin** and **DragonForce**. Use this intelligence to proactively hunt for associated indicators in your environment.

## Mitigation
- **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: This is the primary defense against social engineering attacks like **ClickFix**. Train users to never copy and paste code from a website into their system or developer tools under any circumstances.
- **Execution Prevention ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))**: Use application control policies to restrict the use of scripting languages and developer tools for standard users. If an employee does not need developer tools for their job, they should not be able to access them.
- **Layered Defense**: Maintain a defense-in-depth strategy, including endpoint protection (EPP/EDR), network segmentation, regular backups, and a robust patch management program. No single control is foolproof against these evolving threats.

**Tags:** Ransomware, Qilin, ClickFix, ClearFake, Social Engineering, Threat Intelligence

## Sources
- [Cyber attack methods evolve in November despite attack volume plateauing](https://www.nccgroup.com/uk/our-research/cyber-attack-methods-evolve-in-november-despite-attack-volume-plateauing/) — NCC Group (2025-12-17)
- [Ransomware Attacks Plateau in November But Sophistication Grows](https://www.infosecurity-magazine.com/news/ransomware-attacks-plateau-november/) — Infosecurity Magazine (2025-12-17)

---
Source: https://cyber.netsecops.io/articles/ransomware-tactics-evolve-in-2025-with-focus-on-human-operated-attacks/
