# Cybercrime Automation: Attacker Handoff Time Plummets from 8 Hours to 22 Seconds

**Severity:** informational | **Category:** Threat Intelligence,Security Operations,Phishing | **Updated:** 2026-03-24 | **Reading time:** 6 min

The 2025 Google M-Trends report from Mandiant reveals a stunning increase in the efficiency of cybercriminal operations. The time between an initial network compromise and the handoff to a secondary attacker, such as a ransomware group, has plummeted from eight hours in 2022 to just 22 seconds in 2025. This points to highly integrated and automated partnerships in the cybercrime ecosystem. The report also highlights a surge in voice-based phishing (vishing) as a top initial access vector, while noting that global median dwell time has risen to 14 days, skewed by long-running espionage campaigns.

## Executive Summary
The 2025 M-Trends report, published by **[Google](https://cloud.google.com/blog/topics/threat-intelligence)**'s **[Mandiant](https://www.mandiant.com/)** division, paints a picture of a hyper-efficient and specialized cybercrime ecosystem. The most startling finding is the dramatic reduction in the 'initial access to secondary attacker handoff' time, which has collapsed from approximately eight hours in 2022 to a mere 22 seconds in 2025. This indicates a move towards automated deployment of secondary payloads, where initial access brokers (IABs) have pre-arranged partnerships with ransomware groups. The report also identifies a significant rise in social engineering, with voice phishing (vishing) becoming a leading initial access vector, especially for cloud intrusions. Despite this speed, the overall median dwell time (compromise to detection) increased to 14 days, largely due to long-running cyber espionage campaigns.

---

## Threat Overview
This report analyzes trends from over 500,000 hours of Mandiant incident response engagements in 2025. Key findings include:

- **Handoff Acceleration:** The time from an IAB gaining access to a ransomware affiliate deploying their payload is now near-instantaneous (22 seconds). This suggests a shift from manual sales on forums to automated, API-driven partnerships between criminal groups.
- **Rise of Vishing:** While exploits remain the top initial infection vector (32%), social engineering is gaining fast. Voice phishing (vishing) surged to become the second-leading method at 11% overall and the #1 method for cloud intrusions (23%).
- **Evolving Ransomware Tactics:** Ransomware groups like **[Akira](https://attack.mitre.org/groups/G1024/)** and **[Qilin](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-131a)** are becoming more destructive. They are now systematically targeting and destroying backup infrastructure, identity services (like Active Directory), and virtualization platforms to cripple recovery efforts and increase pressure on victims.
- **Increased Dwell Time:** The global median dwell time rose from 10 days in 2024 to 14 days in 2025. This increase is not due to slower detection of ransomware but is skewed by long-tail cyber espionage campaigns and the persistent activity of North Korean IT workers operating under false identities, who had a median dwell time of 122 days.

## Technical Analysis
The 22-second handoff time is a game-changer for defenders. It means that by the time an alert for an initial compromise is generated, a ransomware payload may already be executing. This is likely achieved through:
- **Automated Deployment:** The IAB's initial access malware (e.g., an infostealer or loader) is configured to immediately download and execute the secondary payload (e.g., Cobalt Strike beacon) from the ransomware affiliate's infrastructure as soon as it establishes a foothold.
- **Integrated Infrastructure:** IABs and ransomware groups may be sharing infrastructure or using a common C2 platform that facilitates the rapid transfer of control over the compromised host.

The surge in vishing ([`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/)) involves attackers calling employees, often posing as IT support, and tricking them into revealing credentials, approving an MFA prompt, or navigating to a malicious website. This bypasses many email-based security controls.

The tactic of targeting backup and virtualization infrastructure ([`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/), [`T1562.001 - Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)) is a direct response to organizations getting better at recovering from backups. By destroying the means of recovery, attackers aim to make paying the ransom the only viable option.

## Impact Assessment
- **Shrinking Response Window:** The dramatic reduction in handoff time means that prevention and automated blocking are more critical than ever. The window for manual human intervention at the initial access stage has effectively closed.
- **Identity as the New Perimeter:** The rise of vishing and other social engineering tactics reinforces that human users are often the weakest link. Security strategies must be identity-centric, focusing on protecting credentials and verifying user actions.
- **Increased Destructiveness:** Attacks are no longer just about encryption. The deliberate targeting of recovery systems means that even if a ransom is not paid, the cost and time to rebuild from scratch will be significantly higher.
- **Divergent Threats:** The split in dwell times shows that organizations face two distinct types of threats: the fast, noisy 'smash-and-grab' of ransomware and the slow, quiet, persistent intrusion of nation-state espionage.

## Detection & Response
1.  **Automated Response:** With a 22-second handoff, detection must be tied to an automated response. For example, an EDR detection of a known loader should automatically trigger a host isolation action via a SOAR playbook.
2.  **Monitor for Vishing Indicators:** While difficult, organizations can monitor for signs of vishing campaigns, such as employees calling IT helpdesks about suspicious calls or multiple MFA prompts from a single user account in a short period.
3.  **Protect Recovery Infrastructure:** Treat backup servers and virtualization management platforms as Tier 0 assets. Monitor them for any anomalous access, and ensure they are segmented from the general network.

## Mitigation
1.  **Assume Compromise, Automate Containment:** Shift the security mindset from pure prevention to rapid containment. Invest in EDR and SOAR technologies that can automatically isolate compromised hosts from the network.
2.  **Phish-Resistant MFA:** The rise of vishing and MFA fatigue makes phish-resistant MFA (like FIDO2) a critical control for all users.
3.  **Harden Backup Architecture:** Ensure backups are immutable or stored offline/air-gapped. Access to backup management consoles should be strictly controlled and monitored.
4.  **Continuous Employee Training:** Training must evolve to cover vishing and other social engineering tactics. Employees should be empowered with a clear process for reporting suspicious calls or requests.

**Tags:** M-Trends, Mandiant, Google, Threat Intelligence, Ransomware, Vishing, Dwell Time, Initial Access Broker

## Sources
- [Cybercrime groups speed up initial access handoff through planning, coordination | Cybersecurity Dive](https://www.cybersecuritydive.com/news/cybercrime-initial-access-handoff-mandiant/711204/) — Cybersecurity Dive (2026-03-24)
- [SecurityWeek: Cybersecurity News, Insights and Analysis](https://www.securityweek.com/) — SecurityWeek (2026-03-24)

---
Source: https://cyber.netsecops.io/articles/google-m-trends-report-initial-access-handoff-shrinks-to-22-seconds/
