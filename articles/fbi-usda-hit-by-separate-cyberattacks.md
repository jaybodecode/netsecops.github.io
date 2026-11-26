# FBI Crime Database and USDA Payment System Breached in Separate Attacks

**Severity:** high | **Category:** Cyberattack,Data Breach,Policy and Compliance | **Updated:** 2026-11-21 | **Reading time:** 6 min

The U.S. government is responding to two separate, significant cyberattacks targeting the Federal Bureau of Investigation (FBI) and the Department of Agriculture (USDA). The FBI is investigating a breach of its National Crime Information Center (NCIC), a critical law enforcement data-sharing network. Concurrently, the USDA was forced to take its farmer payment system offline after a cybersecurity incident, raising concerns about both financial integrity and potential access to sensitive biological research data.

## Executive Summary
On November 21, 2026, the U.S. government confirmed two separate, high-impact cyberattacks against federal agencies. The Federal Bureau of Investigation (FBI) reported an intrusion into its National Crime Information Center (NCIC), a cornerstone of U.S. law enforcement data sharing. In a parallel incident, the U.S. Department of Agriculture (USDA) shut down numerous applications, including a farmer payment system, following a targeted cybersecurity event. These breaches highlight significant vulnerabilities in critical government infrastructure, posing risks to national security, law enforcement operations, and economic stability. The incidents occurred amid growing concerns over federal cybersecurity posture, culminating in the recent replacement of the National Cyber Director.

## Threat Overview
The attacks, while separate, demonstrate a coordinated or coincidental focus on critical U.S. government systems. The first incident involves an unauthorized access to the **[FBI](https://www.fbi.gov)**'s National Crime Information Center (NCIC). The NCIC is an electronic clearinghouse of crime data that can be accessed by virtually every criminal justice agency nationwide, 24/7. It contains information on wanted persons, missing persons, and stolen property, and is used for background checks. A compromise of this system could endanger law enforcement officers, compromise ongoing investigations, and disrupt the justice system. This is the second reported breach of an FBI system in recent months, following a September attack on a jobs website attributed to the 'ShinyHunters' group.

The second incident targeted the **[U.S. Department of Agriculture (USDA)](https://www.usda.gov)**, specifically a system used for processing payments to farmers. The USDA took the system and other applications offline to contain the threat. Former officials expressed grave concern that the compromised payment system could serve as a pivot point for attackers to access more sensitive data, including research on "scary biologic issues," which could potentially be weaponized against the U.S.

## Technical Analysis
Specific technical details and attack vectors for both breaches have not been disclosed. However, based on the nature of the targets, we can assess potential TTPs.

**FBI NCIC Breach:**
*   **Initial Access:** Attackers likely gained access through exploiting a public-facing application ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)) or using compromised credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)). Given the sensitivity, a sophisticated phishing campaign targeting personnel with NCIC access is also a strong possibility.
*   **Execution & Discovery:** Once inside, attackers would need to perform network and system discovery to locate the NCIC database servers. They may have used legitimate administrative tools to blend in with normal traffic.
*   **Data Access:** The primary objective was likely data exfiltration or manipulation. Accessing the NCIC database ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)) would be the key goal.

**USDA Payment System Breach:**
*   **Initial Access:** Similar to the FBI incident, a web application vulnerability or compromised user account is a probable entry point. Financial systems are often targeted with phishing campaigns.
*   **Lateral Movement:** The concern expressed by former officials about attackers using the payment system as a "backdoor" points to lateral movement ([`T1219 - Remote Services`](https://attack.mitre.org/techniques/T1219/)). Attackers could leverage the compromised system's trust relationships to move into other USDA network segments.
*   **Impact:** The immediate impact is financial disruption, but the secondary goal could be accessing and exfiltrating sensitive agricultural or biological research data ([`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/)).

## Impact Assessment
The compromise of these two systems carries severe implications. A breach of the **NCIC** database directly threatens the safety of law enforcement officers who rely on it for real-time threat information during traffic stops and arrests. It could also be used to tamper with warrants or criminal records, undermining the integrity of the entire criminal justice process. For the **USDA**, the attack not only disrupts a critical economic function—payments to farmers—but also exposes a potential pathway to highly sensitive biological research. The theft of such data by a nation-state adversary could have devastating consequences, as noted by the former official who warned, "they could use our own research against us."

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Security teams at government agencies should proactively hunt for related activity. The following patterns could indicate compromise:
*   **Log Source:** VPN logs, Domain Controller logs, Web Application Firewall (WAF) logs.
*   **Anomalous Access:** Monitor for logins to critical systems like NCIC terminals or USDA financial platforms from unusual geographic locations, IP ranges, or at odd hours.
*   **Database Queries:** Audit NCIC and other critical database logs for unusually large or broad queries that deviate from normal user behavior.
*   **Lateral Movement:** Look for suspicious use of remote administration tools (`RDP`, `SSH`, `PsExec`) between network segments, especially from a less sensitive system (like a payment portal) to a high-security research network.

## Detection & Response
*   **User Behavior Analytics (UBA):** Deploy UBA solutions to baseline normal activity for privileged users accessing systems like NCIC and USDA payment networks. Alert on deviations, such as access to unusual data sets or changes in access patterns.
*   **Enhanced Logging:** Ensure comprehensive logging is enabled for all critical applications, databases, and network devices. Logs should be sent to a centralized SIEM for correlation and analysis. Specifically, monitor for changes in user account permissions or the creation of new administrative accounts.
*   **Network Segmentation Monitoring:** Monitor traffic crossing network segments. Any traffic from the USDA's financial network to its research network should be considered highly suspicious and investigated immediately.

## Mitigation
*   **Multi-Factor Authentication (MFA):** Mandate phishing-resistant MFA for all users, especially those with access to critical systems like NCIC or financial platforms. This is a primary defense against credential compromise.
*   **Privileged Access Management (PAM):** Implement PAM solutions to strictly control and monitor access to administrative accounts. Use just-in-time (JIT) access to limit the window of opportunity for attackers.
*   **Network Segmentation:** Enforce strict network segmentation between different agency functions. The USDA's payment systems should be logically and physically isolated from its sensitive research networks to prevent lateral movement.
*   **Continuous Vulnerability Management:** Aggressively scan all internet-facing systems for vulnerabilities and apply patches on a risk-prioritized basis. Critical systems should have a dedicated, rapid patching schedule.

**Tags:** Cyberattack, Data Breach, FBI, USDA, NCIC, National Security, Government

## Sources
- [japantimes.co.jp](https://www.japantimes.co.jp/news/2026/11/21/world/crime-legal/us-fbi-usda-cyberattacks/) — The Japan Times
- [deccanchronicle.com](https://www.deccanchronicle.com/amp/world/americas/fbi-database-hacked-for-second-time-in-months-2006513) — Deccan Chronicle
- [gbcode.rthk.hk](https://gbcode.rthk.hk/TuniS/news.rthk.hk/rthk/en/component/k2/1878711-20261121.htm?spTabChangeable=0) — RTHK
- [cnn.com](https://www.cnn.com/2026/11/20/politics/fbi-hacked-again-target-crime-database) — CNN
- [en.yenisafak.com](https://en.yenisafak.com/world/usda-takes-numerous-applications-offline-after-cybersecurity-incident-reports-say-3725801) — Yeni Şafak

---
Source: https://cyber.netsecops.io/articles/fbi-usda-hit-by-separate-cyberattacks/
