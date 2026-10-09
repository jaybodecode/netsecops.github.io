# Marcus & Millichap Hit by Phishing Attack, Limited Data Accessed

**Severity:** medium | **Category:** Phishing,Data Breach,Incident Response | **Updated:** 2026-04-12 | **Reading time:** 3 min

Marcus & Millichap, a leading commercial real estate brokerage, announced on April 12, 2026, that it recently experienced a cybersecurity incident. The company confirmed that an unauthorized party gained access to one of its systems after a successful phishing attack compromised an employee's credentials. Upon discovery, the firm initiated its incident response plan and engaged external cybersecurity experts. The investigation is ongoing, but the breach appears to be limited, with the accessed data confined to company forms, marketing materials, and general contact information. Marcus & Millichap reports that its business operations have not been disrupted.

## Executive Summary
On April 12, 2026, **[Marcus & Millichap, Inc.](https://www.marcusmillichap.com/)**, a major commercial real estate brokerage firm, publicly disclosed a cybersecurity incident. The company identified unauthorized access to an internal system, which was traced back to a phishing attack that compromised an employee's credentials. The firm has activated its incident response protocol, involving external cybersecurity experts to contain and investigate the breach. The company states that the incident has had no impact on business operations and that the data accessed was limited to non-sensitive materials like forms, templates, and general contact information.

## Threat Overview
The incident at Marcus & Millichap is a classic example of a credential-harvesting phishing attack leading to unauthorized access. The attack chain likely involved an employee receiving a deceptive email, designed to look like a legitimate business communication, which prompted them to enter their login credentials on a malicious website.

- **Initial Access:** The threat actor used a phishing email to steal an employee's credentials, a technique known as [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/).
- **Execution:** The employee unknowingly provided their credentials, which the attacker then used to log in.
- **Persistence & Discovery:** Using the compromised account ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)), the attacker gained access to a company system. They likely performed reconnaissance to understand what data was available.
- **Collection:** The attacker accessed and potentially exfiltrated a limited set of data, including company forms, marketing materials, and contact information.

While the company has downplayed the severity, characterizing the accessed data as non-critical, any unauthorized access represents a significant security failure. The attacker could potentially use the accessed contact information for future, more targeted social engineering attacks against the company's clients or partners.

## Impact Assessment
Based on the company's public statement, the direct business impact appears minimal. Operations are unaffected, and no sensitive client financial data is believed to have been compromised. However, the reputational impact could be more significant. As a brokerage firm dealing in high-value transactions, trust is a critical asset. A public data breach, even a minor one, can erode client confidence. Furthermore, the compromised contact information could be leveraged by the attackers for follow-on phishing campaigns, creating a downstream risk for Marcus & Millichap's business ecosystem. The incident also incurs costs related to the investigation, remediation, and engagement of external cybersecurity experts.

## Detection & Response
Marcus & Millichap's response appears to follow standard industry practice by engaging external experts and initiating an investigation. For other organizations looking to detect and respond to similar threats:

**Detection Strategies:**
- **Email Security:** Implement advanced email filtering to block phishing emails. Look for features like URL rewriting and sandboxing to detect malicious links and attachments.
- **Identity and Access Management (IAM):** Monitor for suspicious login activity, such as logins from unusual geographic locations, impossible travel scenarios, or multiple failed login attempts followed by a success. This aligns with D3FEND's [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis).
- **User Behavior Analytics (UBA):** Use UBA tools to establish a baseline of normal user activity and alert on deviations, such as an employee accessing files or systems they do not typically use.

**Response Actions:**
1.  **Credential Reset:** Immediately force a password reset for the compromised account and any other accounts that may share the same credentials.
2.  **Session Invalidation:** Terminate all active sessions for the compromised user to evict the attacker.
3.  **Log Analysis:** Review access logs from the time of the compromise to determine the full scope of the attacker's activity, including all files and systems they accessed.

## Mitigation
To prevent similar phishing-based compromises, organizations should implement a defense-in-depth strategy:
- **Multi-Factor Authentication (MFA):** The single most effective mitigation against credential theft is MFA. Even if an attacker steals a password, they cannot access the account without the second factor. This is a primary recommendation, aligning with [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
- **User Training:** Continuous security awareness training is crucial. Users should be trained to recognize phishing attempts and know how to report them. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/). Phishing simulation exercises can test and reinforce this training.
- **Principle of Least Privilege:** Ensure that user accounts only have access to the data and systems absolutely necessary for their job function. This limits the potential damage if an account is compromised. This is a core part of [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/).
- **Email Filtering and Web Security:** Deploy robust email security solutions to block malicious emails and web filters to prevent users from accessing known phishing sites.

**Tags:** Phishing, Data Breach, Marcus & Millichap, Real Estate, Credential Theft

## Sources
- [Marcus & Millichap Releases Information Regarding Cybersecurity Incident](https://www.marcusmillichap.com/news-events/press-releases/marcus-millichap-releases-information-regarding-cybersecurity-incident) — Marcus & Millichap (2026-04-12)
- [Marcus & Millichap Reports Cybersecurity Incident](https://www.cpapracticeadvisor.com/2026/04/12/marcus-millichap-reports-cybersecurity-incident/) — CPA Practice Advisor (2026-04-12)

---
Source: https://cyber.netsecops.io/articles/commercial-real-estate-firm-marcus-millichap-discloses-phishing-attack/
