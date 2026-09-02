# Ransomware Attacks Hit 2026 High in July, NCC Group Reports

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Threat Actor | **Updated:** 2026-08-26 | **Reading time:** 4 min

According to a new threat report from NCC Group, global ransomware activity surged in July 2026, reaching the highest monthly volume of the year. The report recorded 894 cases, a 22% increase from June. The Industrials sector and organizations in North America and Europe remained the top targets. The report also notes the appearance of a new group, 'CRPxO,' and the continued dominance of established actors.

## Executive Summary

Global ransomware attacks reached a 2026 peak in July, with 894 publicly reported cases, according to the monthly threat intelligence report from **[NCC Group](https://www.nccgroup.com/)**. This figure represents a significant 22% increase from June 2026 and is the highest monthly total recorded this year. The data underscores a persistent and escalating threat landscape, with the Industrials sector continuing to be the most heavily targeted industry. Geographically, North America and Europe remain the epicenters of ransomware activity, collectively accounting for 70% of all attacks.

---

## Threat Overview

July's surge in ransomware activity brings the total number of attacks closer to the all-time monthly highs seen in early 2025, indicating that threat actors are operating with high efficiency and success. The key findings from the report include:

-   **Total Attacks:** 894 cases in July, a 22% month-over-month increase.
-   **Top Targeted Industry:** The Industrials sector was the most victimized, representing 28% of all attacks. This includes manufacturing, engineering, and construction firms, which are often prime targets due to their low tolerance for operational downtime.
-   **Top Targeted Regions:** North America (41%) and Europe (29%) were the most affected regions, consistent with trends throughout the year.

---

## Threat Actor Analysis

The report highlights the activities of both established and emerging ransomware groups:

-   **Established Actors:** One prominent group, identified as "**The Gentlemen**," was highly active, claiming responsibility for 15% of all attacks recorded in July. The continued dominance of such groups demonstrates the effectiveness of the Ransomware-as-a-Service (RaaS) model.
-   **New Entrants:** A new group named "**CRPxO**" emerged in July, claiming 36 victims. NCC Group notes that such claims from new groups should be treated with caution, as they often exaggerate their impact to build a reputation in the cybercriminal underground.

NCC Group also speculates on the future of ransomware, noting the potential for AI-driven agents like **JADEPUFFER** to automate and scale attacks, possibly contributing to future increases in attack volume.

---

## Impact Assessment

The sustained high volume of ransomware attacks has a significant impact on businesses and critical infrastructure worldwide. The consequences of an attack include:

-   **Financial Loss:** Costs associated with ransom payments, recovery efforts, legal fees, and regulatory fines.
-   **Operational Disruption:** Significant downtime for critical business systems, leading to lost revenue and productivity.
-   **Data Breach:** Double-extortion tactics, where attackers not only encrypt data but also steal it and threaten to leak it publicly, have become standard practice.
-   **Reputational Damage:** Loss of customer trust and damage to the company's brand.

The heavy targeting of the Industrials sector is particularly concerning, as it can lead to disruptions in manufacturing and supply chains with real-world consequences.

---

## Detection & Response

Organizations must adopt a proactive stance to defend against ransomware.

-   **Detection:** Deploy EDR/XDR solutions to detect common ransomware TTPs, such as the disabling of security tools, mass file encryption, and deletion of volume shadow copies. Monitor for lateral movement using tools like Cobalt Strike and Brute Ratel.
-   **Response:** An effective incident response plan is crucial. This should include steps to isolate affected systems, engage incident response specialists, and restore from secure, offline backups. The decision to pay a ransom should be carefully considered with legal counsel, as it does not guarantee data recovery and funds criminal enterprises.

---

## Mitigation

A multi-layered defense strategy is essential to mitigate the risk of a successful ransomware attack.

-   **Patch Management (M1051):** Promptly patch vulnerabilities in internet-facing systems, which are a primary initial access vector for ransomware groups.
-   **Multi-factor Authentication (M1032):** Enforce MFA on all remote access services (VPNs, RDP), email accounts, and critical system logins.
-   **Network Segmentation (M1030):** Segment networks to prevent the rapid lateral movement of ransomware. Isolate critical systems from the general corporate network.
-   **Backups:** Maintain regular, tested, and offline/immutable backups of critical data. This is the most important tool for recovery without paying a ransom.
-   **User Training (M1017):** Educate employees to recognize and report phishing emails, which remain a common entry point for ransomware attacks.

**Tags:** Ransomware, Threat Intelligence, NCC Group, Industrials, Double Extortion

## Sources
- [NCC Group Monthly Threat Pulse - Review of July 2026](https://www.nccgroup.com/newsroom/ncc-group-monthly-threat-pulse-review-of-july-2026/) — NCC Group

---
Source: https://cyber.netsecops.io/articles/ransomware-attacks-hit-2026-high-in-july-ncc-group-reports/
