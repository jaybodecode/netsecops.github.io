# Metabase, Gitea Exploits Active; Chrome Patches 327 Flaws

**Published:** 2026-08-26 | **Articles:** 8

This daily summary highlights critical security updates and new threats impacting organizations. 

**Critical Vulnerabilities Under Active Exploitation:** 

*   **Metabase Zero-Day (CVE-2026-72898):** This SQL injection vulnerability, now on CISA's KEV list, allows for full administrator privileges. Affected versions are v0.58.0 through v1.63.4. Patched versions include v1.63.5 and later. Recommendations include network segmentation and WAF usage.
*   **Gitea RCE (CVE-2026-60004):** Also added to CISA's KEV catalog, this critical flaw allows arbitrary code execution with repository write access. Federal agencies must patch by August 28; all users should upgrade immediately.

**Microsoft Defender Bypass:** 

*   **'ShieldBreak' (CVE-2026-69414):** A local privilege escalation vulnerability has been identified that bypasses a previous Microsoft Defender patch. Microsoft rates its exploitation as 'more likely.' Defenders should monitor `MsMpEng.exe` for unusual child processes and file modifications, and implement enhanced EDR/XDR monitoring for privilege escalation behaviors.

**New Threats and Advisories:** 

*   **'SLEEPWALKER' Backdoor:** A new, stealthy Windows backdoor has been discovered. It remains dormant until triggered by a specific network packet, then executes commands via a custom bytecode language.
*   **Google Chrome 152:** This update addresses 327 vulnerabilities, including 10 critical flaws, primarily use-after-free memory corruption issues. Immediate updates are strongly advised.
*   **US Treasury Quantum Task Force:** The U.S. Treasury has formed a task force to accelerate the financial sector's transition to post-quantum cryptography (PQC) to prepare for future quantum computing threats.
*   **VCU Security Campaign:** Following phishing and hacking incidents, Virginia Commonwealth University has launched an awareness campaign, "Stop, Verify, Report," to educate its community on identifying and handling suspicious communications.
*   **Ransomware Surge:** NCC Group reports that global ransomware activity reached a 2026 high in July, with 894 cases recorded, a 22% increase from June. The Industrials sector and organizations in North America and Europe remain primary targets.

## Articles in this publication
- [Critical Metabase Zero-Day Under Active Exploitation](https://cyber.netsecops.io/articles/critical-metabase-zero-day-under-active-exploitation/) (critical)
  A critical CVSS 10.0 unauthenticated SQL injection zero-day in Metabase is being actively exploited, allowing full admin access. Laptop maker Framework is a confirmed victim, with customer PII stolen. All users of self-hosted Metabase are urged to upgrade immediately as attackers can take over instances and steal data from connected databases.
- [New 'ShieldBreak' Exploit Bypasses Microsoft Defender Patch](https://cyber.netsecops.io/articles/shieldbreak-zero-day-exploit-bypasses-microsoft-defender-patch/) (high)
  A security researcher has released 'ShieldBreak,' a proof-of-concept exploit for a new zero-day vulnerability that bypasses Microsoft's patch for the 'RoguePlanet' flaw (CVE-2026-50656). The exploit allows a local, low-privileged user to gain full SYSTEM privileges on fully updated Windows 10, Windows 11, and Windows Server 2025 systems running Microsoft Defender. The public release of the PoC creates a significant risk, as there is currently no official patch for this bypass.
- [Google Chrome 152 Patches 327 Flaws, Including 10 Critical Bugs](https://cyber.netsecops.io/articles/google-chrome-152-patches-327-vulnerabilities-10-critical/) (high)
  Google has released Chrome 152 for Windows, macOS, and Linux, a major security update that addresses 327 vulnerabilities. The patch includes fixes for 10 critical flaws, the majority of which are use-after-free memory corruption issues in components like ANGLE, Aura, and Chromecast that could lead to arbitrary code execution if exploited. Users are strongly advised to update their browsers immediately to protect against potential attacks.
- [Stealthy "SLEEPWALKER" Backdoor Waits for Magic Packet to Strike](https://cyber.netsecops.io/articles/sleepwalker-passive-windows-backdoor-activated-by-magic-packet/) (high)
  A sophisticated and previously undocumented Windows backdoor named "SLEEPWALKER" has been discovered. The malware remains completely inert in memory, exhibiting no command-and-control traffic. It passively sniffs network packets, waiting for a specially crafted "magic packet" to trigger its execution. Once activated, it runs commands from a custom bytecode language, demonstrating capabilities consistent with a well-resourced threat actor targeting high-value systems.
- [US Treasury Forms Task Force to Guard Finance Sector from Quantum Threats](https://cyber.netsecops.io/articles/us-treasury-launches-task-force-to-secure-finance-from-quantum-threats/) (informational)
  The U.S. Department of the Treasury has announced the formation of a Quantum-Readiness Task Force. This public-private initiative aims to accelerate the financial sector's transition to post-quantum cryptography (PQC) to defend against the future threat of quantum computers breaking current encryption standards. The task force will address sector alignment, vendor readiness, and risks from emerging technologies, tackling the 'harvest now, decrypt later' threat.
- [CISA Warns of Actively Exploited Gitea RCE Flaw (CVE-2026-60004)](https://cyber.netsecops.io/articles/cisa-warns-of-actively-exploited-gitea-rce-flaw-cve-2026-60004/) (critical)
  CISA has added a critical remote code execution (RCE) vulnerability in Gitea, CVE-2026-60004, to its Known Exploited Vulnerabilities (KEV) catalog, confirming it is under active attack. The 9.8 CVSS flaw allows an attacker with repository write access—easily obtained on default installations—to execute arbitrary code. Federal agencies are mandated to patch by August 28, and all users are urged to upgrade immediately.
- [VCU Launches Security Campaign After Phishing and Hacking Incidents](https://cyber.netsecops.io/articles/vcu-launches-security-campaign-after-phishing-and-hacking-incidents/) (medium)
  Following a series of cyberattacks, including a large-scale phishing campaign targeting over 7,000 students and a separate Canvas platform hack, Virginia Commonwealth University (VCU) is responding with a new awareness campaign. Titled "Stop, Verify, Report," the initiative aims to educate its community on how to spot and handle suspicious communications, emphasizing that individual vigilance is a key part of the university's defense strategy.
- [Ransomware Attacks Hit 2026 High in July, NCC Group Reports](https://cyber.netsecops.io/articles/ransomware-attacks-hit-2026-high-in-july-ncc-group-reports/) (high)
  According to a new threat report from NCC Group, global ransomware activity surged in July 2026, reaching the highest monthly volume of the year. The report recorded 894 cases, a 22% increase from June. The Industrials sector and organizations in North America and Europe remained the top targets. The report also notes the appearance of a new group, 'CRPxO,' and the continued dominance of established actors.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-08-26/
