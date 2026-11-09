# Identity Attacks Now Top Ransomware Vector, Eclipsing Exploits

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Phishing | **Updated:** 2026-07-20 | **Reading time:** 4 min

According to the Sophos 'State of Ransomware 2026' report, compromised identities are now the primary root cause of ransomware attacks, accounting for 79% of incidents. For the first time in four years, malicious email and phishing have surpassed software vulnerability exploitation as the top initial access vector. The report, which surveyed over 2,100 victims, highlights a strategic shift by attackers towards identity-based tactics, even as the average total cost to recover from an attack climbs to $1.7 million.

## Executive Summary
A new report from cybersecurity firm **[Sophos](https://www.sophos.com/en-us)** indicates a fundamental shift in the tactics of ransomware operators. The "State of Ransomware 2026" report finds that compromised identities are now the starting point for 79% of all ransomware attacks. For the first time in four years, the primary root cause is not exploited vulnerabilities but rather malicious emails (26%) and **[phishing](https://en.wikipedia.org/wiki/Phishing)** (24%), which together account for half of all initial access events. This trend suggests that while patching is still vital, defensive strategies must evolve to prioritize identity security, email protection, and user awareness to counter the most common attack vectors used by modern ransomware groups.

---

## Threat Overview
The report, based on a survey of 2,100 IT and security leaders whose organizations were hit by ransomware, reveals a clear strategic pivot by threat actors. Exploited vulnerabilities, which were the root cause in 32% of attacks last year, have dropped to just 18%. This decline is offset by the sharp rise in identity-based attacks. Two-thirds of ransomware victims stated that the ransomware incident was also their most significant identity-based attack of the year, underscoring the convergence of these two threat types.

This shift highlights that attackers are finding it more efficient to steal or phish for credentials than to develop or acquire exploits for software flaws. The prevalence of weak passwords, lack of **[Multi-Factor Authentication (MFA)](https://www.nist.gov/itl/glossary/multi-factor-authentication)**, and successful phishing campaigns provide a lower barrier to entry for attackers.

## Technical Analysis
While the report focuses on trends rather than a single actor, the described attack path aligns with common **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** models. The typical TTPs involved are:

1.  **Initial Access**: Primarily achieved through [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/), where users are tricked into revealing credentials or executing a malicious attachment.
2.  **Credential Access**: Once a foothold is gained, attackers use stolen credentials via [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/) to authenticate to systems and services, appearing as legitimate users.
3.  **Discovery & Lateral Movement**: Attackers explore the network, escalate privileges, and move to additional systems, often using legitimate tools like RDP or PowerShell.
4.  **Impact**: The final stage involves [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) and often [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/) as part of a double-extortion strategy.

## Impact Assessment
Despite a drop in median ransom demands ($698,000) and payments ($769,000), the overall financial impact on victims has increased. The average total cost to recover from a ransomware attack has now reached $1.7 million, factoring in downtime, staff hours, device costs, and network improvements.

The report also notes a concerning trend: data was successfully encrypted in 56% of attacks, reversing a two-year decline and indicating that attackers are becoming more effective at bypassing defenses once inside a network. There is also a clear disparity based on organization size, with smaller businesses (100-250 employees) being less successful (34% stopped an attack pre-encryption) than larger enterprises (46% success rate).

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles, as this is a trend report rather than an analysis of a specific campaign.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following general patterns related to identity-driven ransomware attacks:

| Type | Value | Description | Context |
|---|---|---|---|
| event_id | 4768, 4769 | Kerberos authentication events. A high volume of TGS requests (Kerberoasting) can indicate attempts to crack service account credentials. | Windows Security Event Log |
| command_line_pattern | `-EncodedCommand` | PowerShell commands with encoded payloads are a common technique for obfuscating malicious activity after initial access. | EDR, PowerShell Script Block Logging (Event ID 4104) |
| network_traffic_pattern | Impossible travel alerts | A user account logging in from two geographically distant locations in a short time frame is a strong indicator of a compromised identity. | Cloud Security Portal, SIEM |
| log_source | VPN Logs | Monitor for successful VPN connections from unusual countries or at odd hours, followed by RDP or SMB activity. | VPN Concentrator Logs, Firewall Logs |

## Detection & Response
1.  **Identity Threat Detection and Response (ITDR)**: Deploy solutions that monitor for anomalous authentication behavior. This includes impossible travel, MFA fatigue attacks, and logon attempts with known breached credentials. This aligns with **D3FEND User Behavior Analysis**.
2.  **Enhanced Email Security**: Use advanced email gateways that can detect and block sophisticated phishing links and malicious attachments. Sandboxing of attachments and URL rewriting are key capabilities.
3.  **Monitor for Credential Abuse**: Actively hunt for techniques like Kerberoasting and Pass-the-Hash. SIEM rules that correlate failed logons with subsequent successful ones, or detect the use of a single account across multiple systems in a short period, can be effective.

## Mitigation
1.  **Mandate MFA**: The single most effective control against identity-based attacks is phishing-resistant MFA. Prioritize its rollout for all users, especially for remote access (VPN), email, and privileged accounts.
2.  **User Training**: Conduct regular, engaging security awareness training that focuses on identifying modern phishing tactics. Use phishing simulations to test and reinforce learning.
3.  **Principle of Least Privilege**: Ensure user accounts only have the permissions necessary to perform their roles. This limits an attacker's ability to move laterally and access sensitive data even if an account is compromised.
4.  **Email Filtering and Sandboxing**: Implement advanced email security solutions to prevent malicious emails from reaching user inboxes. This is a key preventative control mentioned in the report.

**Tags:** Cyberattack, Identity and Access Management, Phishing, Ransomware, Sophos, Threat Intelligence

## Sources
- [The State of Ransomware 2026: Payments Drop as Encryption Climbs](https://www.sophos.com/en-us/blog/sophos-state-of-ransomware-2026) (2026-07-15)
- [79% of Ransomware Attacks Now Originate from Compromised Identities, Sophos Report Finds](https://www.globenewswire.com/news-release/2026/07/15/3327529/0/en/79-of-ransomware-attacks-now-originate-from-compromised-identities-sophos-report-finds.html) (2026-07-15)
- [Identity Attacks Overtake Exploits as Top Ransomware Cause](https://www.darkreading.com/identity-access-management-security/identity-attacks-overtake-exploits-top-ransomware-cause) (2026-07-15)

---
Source: https://cyber.netsecops.io/articles/identity-attacks-become-top-ransomware-vector-sophos-report/
