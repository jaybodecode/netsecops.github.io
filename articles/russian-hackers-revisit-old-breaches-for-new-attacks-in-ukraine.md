# Russian APTs Re-Exploiting Past Breaches for Renewed Attacks in Ukraine

**Severity:** high | **Category:** Threat Actor,Cyberattack,Security Operations | **Updated:** 2026-04-04 | **Reading time:** 4 min

Ukraine's computer emergency response team, CERT-UA, has issued a warning that Russian state-sponsored hacking groups like APT28 (Fancy Bear) and Void Blizzard are systematically revisiting networks they have previously compromised. This new tactic focuses on checking for persistent access, unpatched vulnerabilities, and still-valid credentials to launch follow-up operations. The attackers are also evolving their social engineering, using direct phone and video calls to build trust before sending malicious files, making their initial access attempts more effective.

## Executive Summary
Ukraine's Computer Emergency Response Team (**[CERT-UA](https://cert.gov.ua/)**) has reported a significant tactical shift by Russian state-sponsored threat actors, including **[APT28 (Fancy Bear)](https://attack.mitre.org/groups/G0007/)** and **Void Blizzard**. In a report dated April 3, 2026, CERT-UA warns that these groups are no longer just conducting "steal-and-go" operations but are now systematically revisiting previously breached networks. This strategy aims to establish and maintain long-term persistence for future espionage, data exfiltration, or disruptive attacks. Concurrently, these APTs are refining their initial access methods, moving away from simple phishing emails to more sophisticated social engineering involving direct voice and video calls to build rapport with targets in the Ukrainian government and military before delivering malware.

## Threat Overview
The core of the new strategy is persistence and re-exploitation. Russian hackers are methodically checking old footholds to see if:
*   Access backdoors are still active.
*   Vulnerabilities exploited in the initial breach were never patched.
*   Stolen credentials (e.g., usernames, passwords, tokens) are still valid.

When access is confirmed, the attackers leverage it for new campaigns, effectively saving the time and resources needed to establish a new beachhead. This indicates a strategic shift towards long-term intelligence gathering and maintaining a constant state of readiness to conduct operations against Ukrainian targets.

Furthermore, the initial access TTPs are evolving. Recognizing that awareness of phishing emails has increased, groups like **APT28** are now engaging in highly personalized social engineering. They initiate contact with targets via phone or video chat applications, impersonating colleagues or officials to build trust. Only after establishing this rapport do they send a malicious file or link through a messaging app, dramatically increasing the probability of execution.

## Technical Analysis
This campaign highlights a focus on the later stages of the attack lifecycle and a refinement of the initial stages.
*   **Resource Development:** [`T1588 - Obtain and Reuse`](https://attack.mitre.org/techniques/T1588/). The core of the new tactic is reusing previously compromised infrastructure, credentials, and access.
*   **Initial Access:** [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/). While traditional phishing is still used, the evolution is towards multi-stage social engineering that combines voice/video (`T1566.003 - Phishing: Voice`) with subsequent malicious file delivery.
*   **Persistence:** The attackers' primary goal is to maintain persistence. This could involve various techniques, such as creating new accounts ([`T1136 - Create Account`](https://attack.mitre.org/techniques/T1136/)), installing backdoors, or leaving behind web shells ([`T1505.003 - Web Shell`](https://attack.mitre.org/techniques/T1505/003/)).
*   **Command and Control:** The long-term nature of these operations suggests the use of stealthy C2 channels that blend in with normal traffic to avoid detection over extended periods.

## Impact Assessment
This tactical shift poses a severe and persistent threat to Ukrainian national security. By maintaining long-term access to government and military networks, Russian APTs can conduct continuous espionage, steal sensitive data at will, and potentially deploy destructive wiper malware or conduct sabotage at moments of strategic importance. The psychological impact is also significant, creating a constant sense of being under siege and forcing defenders to re-investigate old incidents. For organizations, it underscores that incident response is not complete until the root cause is fully remediated and all attacker artifacts are evicted; otherwise, the 

**Tags:** APT28, Fancy Bear, Void Blizzard, Russia, Ukraine, cyberwar, espionage, social engineering, CERT-UA

## Sources
- [Ukraine warns Russian hackers are revisiting past breaches to prepare new attacks](https://therecord.media/ukraine-warns-russian-hackers-are-revisiting-past-breaches) — The Record
- [Regarding the intensification of attacks by the group UAC-0050 on the public sector of Ukraine (ESET: "Stealthy Kapeka")](https://cert.gov.ua/article/6278332) — CERT-UA

---
Source: https://cyber.netsecops.io/articles/russian-hackers-revisit-old-breaches-for-new-attacks-in-ukraine/
