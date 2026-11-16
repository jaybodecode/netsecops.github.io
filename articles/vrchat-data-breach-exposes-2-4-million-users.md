# VRChat Cloud Breach Exposes Data of 2.4 Million Users, Including Login History and Linked Accounts

**Severity:** high | **Category:** Data Breach,Cloud Security | **Updated:** 2026-06-11 | **Reading time:** 4 min

The social virtual reality platform VRChat has disclosed a data breach that exposed the personal information of 2,436,782 users. The incident, which occurred in May 2026, resulted from an unauthorized third party gaining access to the company's cloud environment. Stolen data includes usernames, email addresses, login history with IP addresses, and linked Steam or Meta account IDs. VRChat has confirmed that passwords and financial information were not compromised.

## Executive Summary
**[VRChat Inc.](https://hello.vrchat.com/)**, the developer of the popular social VR platform, has reported a significant data breach impacting 2,436,782 users. In a notification filed with the Maine Attorney General, the company revealed that an unauthorized party accessed its cloud environment between May 10 and May 12, 2026. The attackers exfiltrated a range of user account data, including usernames, email addresses, VRChat+ subscription status, and detailed login history containing IP addresses and hardware identifiers. While sensitive financial data and passwords were not exposed, the stolen information places affected users at a heightened risk of targeted phishing campaigns and other social engineering attacks.

---

## Threat Overview
- **What Happened:** An unauthorized third party gained access to VRChat's cloud environment and exfiltrated user data.
- **Who is Affected:** 2,436,782 VRChat users.
- **When it Happened:** The breach occurred between May 10 and May 12, 2026. The company discovered the intrusion on May 12 and publicly disclosed it on June 10, 2026.
- **Attack Vector:** The specific method of unauthorized access to the cloud environment has not been disclosed, but it points to a potential compromise of cloud credentials or a misconfigured cloud service.

## Technical Analysis
The threat actor's ability to access and exfiltrate data from VRChat's cloud infrastructure suggests a compromise targeting cloud assets. The primary TTPs likely involved were:
- **[`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/):** The attacker may have obtained legitimate credentials for VRChat's cloud environment through phishing, credential stuffing, or by purchasing them on the dark web.
- **[`T1580 - Cloud Infrastructure Discovery`](https://attack.mitre.org/techniques/T1580/):** Once inside, the actor would have performed reconnaissance to identify where valuable user data was stored.
- **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/):** The final step was to exfiltrate the identified user data from cloud storage buckets or databases.

The stolen data includes:
- VRChat usernames and associated email addresses
- VRChat+ subscription status
- Login history (device type, hardware IDs, IP addresses)
- Linked **[Steam](https://store.steampowered.com/)** or **[Meta](https://www.meta.com/)** account user IDs

Crucially, VRChat asserts that passwords, payment card information, and government IDs used for age verification were not accessed.

## Impact Assessment
While the absence of compromised passwords and financial data mitigates the most severe immediate risks, the breach still carries significant consequences. The stolen data combination (username, email, IP address, linked accounts) is highly valuable for cybercriminals. Attackers can use this information to:
- **Conduct targeted phishing attacks:** Emails sent to the compromised addresses, using the victim's VRChat username, will appear highly legitimate.
- **Correlate identities across platforms:** The linked Steam and Meta IDs allow attackers to build a more complete profile of the victim's online presence.
- **Perform credential stuffing attacks:** Although VRChat passwords were not stolen, attackers will use the compromised email addresses to try common passwords on other services.
For VRChat, the breach results in reputational damage and a loss of user trust, which is critical for a social platform.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Detection & Response
Upon discovering the suspicious activity on May 12, VRChat's response included:
1.  Containing the intrusion to prevent further access.
2.  Engaging external cybersecurity experts for a forensic investigation.
3.  Implementing additional security controls to harden their cloud environment.
4.  Reporting the breach to relevant authorities, including the Maine Attorney General.
5.  Preparing to notify affected users electronically starting June 12, 2026.

For users, D3FEND recommends [`User Training`](https://d3fend.mitre.org/technique/d3f:UserTraining) to recognize and report phishing attempts. Users should be suspicious of any unsolicited emails claiming to be from VRChat, even if they contain personal information. Enabling **[multi-factor authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on their VRChat account and any linked accounts is also strongly advised.

## Mitigation
**For VRChat Users:**
- Be vigilant for phishing emails. Do not click on links or download attachments from suspicious messages.
- Enable MFA on your VRChat, Steam, Meta, and email accounts.
- Use a unique, strong password for VRChat and all other online services.

**For VRChat (and other cloud-based organizations):**
- **[`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/):** Enforce MFA on all administrative accounts and access to cloud management consoles.
- **[`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/):** Implement the principle of least privilege for all IAM roles and service accounts. Regularly audit permissions.
- **[`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/):** Implement robust logging and monitoring for cloud environments. Use tools like AWS CloudTrail or Azure Monitor to detect anomalous API calls, unusual data access patterns, and large data egress events.
- **[`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/):** Logically segment cloud networks and restrict access to sensitive data stores to only the specific services that require it.

**Tags:** VRChat, Data Breach, Cloud Security, PII, Social Media, Virtual Reality

## Sources
- [VRChat Data Breach Compromises Over 2.4 Million User Accounts](https://www.claimdepot.com/data-breach/vrchat-2026) — ClaimDepot.com
- [VRChat discloses cloud breach exposing data of 2.4 million users](https://cyberinsider.com/vrchat-discloses-cloud-breach-exposing-data-of-2-4-million-users/) — Cyber Insider
- [Data of 2.4 million VRChat users stolen](https://www.malwarebytes.com/blog/data-breaches/2026/06/data-of-2-4-million-vrchat-users-stolen) — Malwarebytes Labs

---
Source: https://cyber.netsecops.io/articles/vrchat-data-breach-exposes-2-4-million-users/
