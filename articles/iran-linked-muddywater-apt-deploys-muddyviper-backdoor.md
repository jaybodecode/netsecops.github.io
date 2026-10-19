# Iran-Linked MuddyWater APT Targets Israel with New 'MuddyViper' Backdoor

**Severity:** high | **Category:** Threat Actor,Malware,Cyberattack | **Updated:** 2025-12-02 | **Reading time:** 6 min

The Iranian-affiliated APT group MuddyWater has been observed in a new cyberespionage campaign targeting critical infrastructure and other key sectors in Israel and Egypt. Active from late 2024 to early 2025, the campaign leverages a previously undocumented custom C/C++ backdoor named MuddyViper. The malware is delivered via a loader called Fooder, which in some cases was disguised as the classic Snake game to deceive victims. The group, also known as Mango Sandstorm, used the backdoor for espionage, credential theft, and remote command execution, and showed operational overlap with another Iranian group, Lyceum.

## Executive Summary
**[ESET](https://www.eset.com/)** researchers have uncovered a new cyberespionage campaign attributed to the Iran-aligned advanced persistent threat (APT) group **[MuddyWater](https://attack.mitre.org/groups/G0069/)** (also known as Mango Sandstorm, TA450). The campaign, active between September 2024 and March 2025, targeted a wide range of critical sectors in Israel and Egypt. The threat actors deployed a new, custom C/C++ backdoor named **MuddyViper**, delivered via a loader named **Fooder**. This campaign highlights the group's evolving toolset and its continued focus on intelligence gathering against strategic targets in the Middle East. Evidence also suggests MuddyWater may be acting as an initial access broker for other Iranian APTs, such as **Lyceum**.

---

## Threat Overview
MuddyWater, assessed to be subordinate to Iran's **Ministry of Intelligence and Security (MOIS)**, has a long history of targeting entities in the Middle East, Europe, and North America. This latest campaign focused on organizations in Israel and Egypt across sectors including technology, engineering, local government, manufacturing, and universities. The primary goal appears to be espionage and establishing long-term persistence within target networks.

The initial access vector often involved social engineering, tricking users into executing the `Fooder` loader, which was sometimes disguised as a legitimate-looking application like the classic Snake game.

## Technical Analysis
The attack chain involves several custom tools:
- **Fooder Loader**: A custom loader responsible for deploying the main payload. In some cases, it used reflective loading to execute MuddyViper directly in memory, a technique used to evade detection by security products that scan for malicious files on disk.
- **MuddyViper Backdoor**: A previously unseen backdoor written in C/C++. It provides the attackers with a range of capabilities, including:
  - System information gathering
  - Credential and browser data theft
  - Remote command execution
  - File exfiltration
- **Credential Stealers**: The attackers also deployed several tools to harvest credentials, including **CE-Notes** and **Blub**, which target data from Chromium-based browsers, Firefox, and Opera.
- **Legitimate RMM Tools**: Consistent with past MuddyWater operations, the group also leveraged legitimate Remote Monitoring and Management (RMM) software like `Syncro` and `PDQ` for persistence and lateral movement, blending their traffic with normal administrative activity.

### MITRE ATT&CK Techniques
- **[`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/)**: Victims were tricked into running the Fooder loader disguised as a game.
- **[`T1055.012 - Process Injection: Reflective Code Loading`](https://attack.mitre.org/techniques/T1055/012/)**: The Fooder loader executed the MuddyViper payload directly in memory to avoid disk-based detection.
- **[`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/)**: The use of CE-Notes and Blub to steal credentials from web browsers.
- **[`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/)**: Leveraging legitimate tools like Syncro and PDQ for command and control.
- **[`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/)**: Disguising the initial loader as a benign application (Snake game).

## Impact Assessment
The campaign represents a significant intelligence-gathering effort against critical sectors in Israel and Egypt. The compromise of these networks could provide the Iranian government with sensitive information for strategic advantage. The observed operational overlap with the Lyceum (OilRig) group, where MuddyWater appeared to facilitate initial access, suggests a coordinated and tiered structure among Iranian state-sponsored hacking units, increasing their overall effectiveness and operational capacity.

## Detection & Response
1.  **Monitor for RMM Tools**: Monitor for and alert on the installation and use of legitimate RMM tools like Syncro and PDQ, especially if they are not standard-issue software in your environment.
2.  **Memory Analysis**: Use Endpoint Detection and Response (EDR) tools capable of memory scanning to detect signs of reflective loading and in-memory-only malware.
3.  **Network Traffic Analysis**: Look for C2 communications to infrastructure known to be associated with MuddyWater. Block suspicious outbound connections from sensitive systems.
4.  **Executable Auditing**: Audit the execution of unsigned or unusual executables, particularly those with generic names or icons designed to mimic legitimate software.

Relevant **[D3FEND](https://d3fend.mitre.org/)** techniques:
- **[`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)**: To detect anomalous process behavior, such as a game process making network connections or spawning command shells.
- **[`D3-EDL - Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting)**: To block the execution of known malicious loaders and tools.

## Mitigation
- **[`D3-EAL - Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**: Implement application control policies to prevent the execution of unauthorized software, including unknown games or tools.
- **User Training**: Educate users to be skeptical of unsolicited attachments and executables, even if they appear benign.
- **Restrict RMM Software**: Tightly control and monitor the use of RMM software. If not required for business operations, block it entirely.
- **Network Segmentation**: Segment networks to limit lateral movement, preventing an initial compromise on a less sensitive machine from spreading to critical infrastructure.

**Tags:** MuddyWater, Iran, APT, espionage, MuddyViper, Israel, critical infrastructure

## Sources
- [MuddyWater: Snakes by the riverbank](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-by-the-riverbank/) — ESET (2025-12-02)
- [MuddyWater strikes Israel with advanced MuddyViper malware](https://securityaffairs.co/155122/apt/muddywater-targets-israel-muddyviper.html) — Security Affairs (2025-12-02)
- [Iran-Linked Hackers Hit Israeli Sectors with New MuddyViper Backdoor in Targeted Attacks](https://thehackernews.com/2025/12/iran-linked-hackers-hit-israeli.html) — The Hacker News (2025-12-02)
- [Iran-linked hackers target Israeli, Egyptian critical infrastructure through phishing campaign](https://www.scmagazine.com/news/iran-linked-muddywater-apt-targets-israeli-egyptian-critical-infrastructure) — SC Magazine (2025-12-02)
- [ESET researchers trace new MuddyWater campaign hitting critical sectors in Israel, Egypt](https://industrialcyber.co/threats-risks/eset-researchers-trace-new-muddywater-campaign-hitting-critical-sectors-in-israel-egypt/) — Industrial Cyber (2025-12-03)

---
Source: https://cyber.netsecops.io/articles/iran-linked-muddywater-apt-deploys-muddyviper-backdoor/
