# Nikkei Slack Breach Exposes Data of 17,000 Users via Stolen Credentials

**Severity:** high | **Category:** Data Breach,Cyberattack,Malware | **Updated:** 2025-11-11 | **Reading time:** 4 min

Japanese media giant Nikkei Inc., owner of the Financial Times, has disclosed a significant data breach affecting its internal Slack workspace. An attacker gained access using authentication credentials stolen from an employee's personal computer, which was infected with infostealer malware. The incident, which was detected in September 2025, exposed the names, email addresses, and chat histories of 17,368 employees and business partners. The breach highlights the persistent threat of infostealer malware and the security risks associated with credentials stored in web browsers.

## Executive Summary
**[Nikkei Inc.](https://www.nikkei.co.jp/)**, a major Japanese publishing house and owner of the **Financial Times**, has revealed it suffered a data breach after an unauthorized actor gained access to its internal **[Slack](https://slack.com/)** workspace. The attacker leveraged credentials and session tokens stolen by infostealer malware from an employee's personal computer. The breach compromised the personal information and chat histories of 17,368 registered users, including employees and partners. The incident underscores the critical importance of endpoint security and protecting against credential harvesting attacks, which can bypass traditional network defenses.

---

## Threat Overview
The attack vector was an employee's personal computer infected with infostealer malware in August 2025. This type of malware is specifically designed to harvest sensitive information stored on a device, including login credentials, cookies, and session tokens saved in web browsers. By stealing a valid session token for Slack, the attacker was able to log into Nikkei's workspace (`nikkeidevs.slack.com`) and impersonate the legitimate employee, bypassing MFA and other login-time security controls. The breach was detected by Nikkei's internal security team in September 2025, about a month after the initial computer infection.

---

## Technical Analysis
1.  **Initial Compromise**: An employee's personal computer was infected with an unspecified infostealer malware. This likely occurred through a phishing email, a malicious download, or a compromised website.

2.  **Credential Access** ([`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/)): The infostealer scanned the computer's web browsers for stored data, successfully exfiltrating authentication credentials, cookies, and active session tokens for Nikkei's Slack workspace.

3.  **Initial Access & Defense Evasion** ([`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)): The attacker used the stolen session token to gain access to the `nikkeidevs.slack.com` workspace. This technique, often called session hijacking or pass-the-cookie, allows an attacker to take over an authenticated session without needing the password.

4.  **Collection** ([`T1114.001 - Email Collection: Local Email Collection`](https://attack.mitre.org/techniques/T1114/001/)): Once inside, the attacker had access to the data within the Slack workspace. This included user profiles and the full chat history of all channels the compromised user was a member of.

---

## Impact Assessment
The breach exposed the data of 17,368 individuals. The compromised information includes:
- Full names
- Company email addresses
- Complete Slack chat histories

While Nikkei stated that no information related to journalistic sources was confirmed to be leaked, the exposure of internal communications is a significant security event. The compromised data could be used for:
- **Spear-phishing attacks**: The names, emails, and conversational context could be used to craft highly convincing phishing campaigns against other Nikkei employees or partners.
- **Corporate Espionage**: The chat histories, especially from developer channels (`nikkeidevs`), could contain proprietary information, code snippets, API keys, or strategic project discussions.
- **Reputational Damage**: The public disclosure of a breach can damage the company's reputation for security and data protection.

In response, Nikkei implemented a company-wide password reset, revoked compromised tokens, and reported the incident to Japan's Personal Information Protection Commission.

---

## Detection & Response
- **Behavioral Analytics**: Monitor for anomalous Slack account activity, such as logins from unusual geographic locations, IP addresses, or user agents. A sudden change in a user's typical activity patterns could indicate a hijacked session.
- **Endpoint Detection**: Deploy EDR solutions on all endpoints, including personal devices in a BYOD environment, to detect and block infostealer malware.
- **Log Analysis**: Review Slack audit logs for suspicious activity, such as large-scale data downloads or unusual channel access patterns.

---

## Mitigation
- **Endpoint Security**: Enforce the use of EDR and antivirus software on all devices that access corporate resources, including personal devices.
- **User Training**: Educate employees about the dangers of infostealer malware and the importance of not saving work credentials in personal browser profiles.
- **Credential Hygiene**: Discourage or disable the saving of passwords and session tokens in web browsers through group policy or MDM settings.
- **Session Management**: Implement stricter session timeout policies for sensitive applications like Slack. Some security platforms offer continuous authentication checks that can help detect hijacked sessions.
- **MFA**: While session hijacking can bypass MFA at login, having MFA enabled is still a critical layer of defense against password-based attacks.

**Tags:** data breach, infostealer, Slack, credential theft, media, session hijacking

## Sources
- [Nikkei data breach exposes personal data of over 17,000 staff](https://www.computerweekly.com/news/366622435/Nikkei-data-breach-exposes-personal-data-of-over-17000-staff) — ComputerWeekly (2025-11-10)
- [Japanese Media Giant Nikkei Suffers Slack Breach Through Infostealer Malware: 17,000 Users Exposed](https://breached.vc/Thread-Japanese-Media-Giant-Nikkei-Suffers-Slack-Breach-Through-Infostealer-Malware) — Breached.vc (2025-11-10)

---
Source: https://cyber.netsecops.io/articles/nikkei-discloses-slack-breach-exposing-data-of-17000-users/
