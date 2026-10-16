# Data of 17.5 Million Instagram Users Leaked on Hacker Forum After Scraping Attack

**Severity:** high | **Category:** Data Breach,Phishing | **Updated:** 2026-01-10 | **Reading time:** 6 min

The personal data of approximately 17.5 million Instagram users has been leaked on the BreachForums hacking forum. The data, posted by a user named 'Solonik,' was allegedly obtained via automated data scraping from public APIs. The leaked information includes full names, email addresses, phone numbers, and user IDs, exposing the affected individuals to a high risk of targeted phishing, identity theft, and SIM swapping attacks. Following the leak, users have reported a surge in fraudulent password reset attempts. As of January 10, 2026, Instagram's parent company, Meta, has not formally acknowledged the incident.

## Executive Summary
A dataset containing the personally identifiable information (PII) of an estimated 17.5 million **[Instagram](https://www.instagram.com/)** users has been leaked on the notorious hacker forum, BreachForums. The data, posted by a threat actor known as "Solonik," appears to have been collected through large-scale data scraping of Instagram's public-facing APIs rather than a direct breach of **[Meta](https://about.facebook.com/meta/)**'s internal systems. The leaked information includes full names, email addresses, phone numbers, and user IDs. This exposure places millions of users at immediate risk of sophisticated phishing campaigns, SIM swapping, and identity theft. The incident is compounded by a reported spike in fraudulent password reset attempts against Instagram accounts, indicating that malicious actors are actively exploiting the leaked data.

---

## Breach Overview
- **Source of Leak:** A threat actor named "Solonik" on BreachForums.
- **Data Size:** Approximately 17.5 million user records.
- **Data Contents:** Full names, email addresses, phone numbers, Instagram user IDs, and partial addresses.
- **Method:** The data was reportedly obtained via **data scraping**, an automated technique used to harvest large amounts of information from websites and APIs. This suggests a potential weakness in Instagram's rate-limiting or anti-bot protections that allowed the actor to query so many profiles.
- **Date of Leak:** The data appeared on BreachForums on January 7, 2026.

Following the leak, there has been a noticeable increase in malicious activity targeting Instagram users, particularly a wave of unsolicited password reset notifications. This indicates that other threat actors are using the email addresses and phone numbers from the leak to try to hijack accounts.

---

## Technical Analysis
Data scraping is the primary technique behind this incident. It is distinct from a "hack" in that it doesn't necessarily involve bypassing security controls to access non-public data. Instead, it automates the process of collecting data that is already publicly or semi-publicly available.

- **API Abuse:** The scraper likely exploited a legitimate or poorly documented API endpoint that returns user profile information. By automating requests to this API with millions of different user IDs, the actor could compile the massive dataset.
- **Failure of Protective Measures:** The scale of this scraping operation suggests a failure of Instagram's defensive measures. Effective anti-scraping technologies typically include:
  - **Rate Limiting:** Restricting the number of requests a single IP address or API key can make in a given time.
  - **Bot Detection:** Using behavioral analysis and fingerprinting to identify and block automated scripts.
  - **Data Obfuscation:** Limiting the amount of PII returned by public-facing APIs.

### MITRE ATT&CK TTPs
| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Collection | [`T1593.002`](https://attack.mitre.org/techniques/T1593/002/) | Search Open Technical Databases | The threat actor likely enumerated user IDs and scraped data via a public API. |
| Credential Access | [`T1555`](https://attack.mitre.org/techniques/T1555/) | Credentials from Password Stores | Following the leak, other actors are using the data to attempt account takeovers. |
| Initial Access | [`T1566`](https://attack.mitre.org/techniques/T1566/) | Phishing | The leaked PII is ideal for crafting highly targeted and convincing phishing emails. |

---

## Impact Assessment
- **Increased Phishing and Scams:** With access to names, emails, and phone numbers, attackers can launch highly personalized phishing campaigns (spear-phishing) that are more likely to succeed.
- **SIM Swapping Attacks:** The availability of phone numbers linked to specific individuals increases the risk of SIM swapping, where an attacker tricks a mobile carrier into transferring a victim's phone number to a new SIM card, allowing them to intercept MFA codes sent via SMS.
- **Identity Theft:** The combination of PII can be used to impersonate victims, open fraudulent accounts, or as a starting point for more comprehensive identity theft.
- **Account Takeover:** The surge in password reset attempts shows that the data is being actively used to try to gain control of Instagram accounts for spam, fraud, or to demand a ransom.
- **Reputational Damage to Meta:** The incident raises questions about the effectiveness of Instagram's privacy safeguards and its responsibility to protect user data, even if it is publicly accessible.

---

## IOCs
- **Threat Actor:** `Solonik`
- **Forum:** `BreachForums`

---

## Cyber Observables for Detection
For platform providers like Meta:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| network_traffic_pattern | High-volume API requests from a single source | A single IP or a small pool of IPs making an abnormally high number of requests to user profile API endpoints. | API gateway and WAF logs. | high |
| other | Sequential user ID enumeration | API requests that appear to be iterating through user IDs in a sequential or predictable pattern. | Application-level logging. | high |

---

## Detection & Response

### Recommendations for Instagram Users
1.  **Enable Strong MFA:** The single most important action is to enable multi-factor authentication on your Instagram account. **Crucially, use an authenticator app (like Google Authenticator or Authy) instead of SMS-based MFA**, as this protects against SIM swapping attacks.
2.  **Change Your Password:** Create a new, unique, and strong password for your Instagram account.
3.  **Be Vigilant:** Treat all unsolicited emails or messages, especially those related to your Instagram account, with extreme suspicion. Never click on password reset links you did not request yourself. Manually navigate to instagram.com to reset your password if you are concerned.
4.  **Review Account Security:** Check your Instagram account's login activity (`Settings > Security > Login Activity`) for any unrecognized sessions and log them out.

---

## Mitigation

### For Platform Providers (like Meta)
1.  **Strengthen Anti-Scraping Controls:** Implement more sophisticated bot detection and stricter, adaptive rate limiting on all public-facing APIs that return user data. This is a form of **[D3FEND Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
2.  **Data Minimization:** Review all API endpoints to ensure they only return the minimum data necessary for their function. Do not expose sensitive data like full email addresses or phone numbers through public APIs if possible.
3.  **Proactive Monitoring:** Actively monitor for and disrupt large-scale scraping operations, rather than waiting for the data to appear on hacker forums.
4.  **Transparent Communication:** Promptly and clearly communicate with users when a large-scale scraping incident is confirmed to have exposed their data, and provide clear guidance on protective measures.

**Tags:** Data Leak, Data Scraping, Instagram, Meta, BreachForums, PII, Phishing, SIM Swapping

## Sources
- [Instagram Data Breach Exposes Millions To Cyber Threats](https://www.grandpinnacletribune.com/2026/01/10/instagram-data-breach-exposes-millions-to-cyber-threats/) — Grand Pinnacle Tribune (2026-01-10)
- [17.5 Million Instagram Accounts Exposed in Major Data Leak](https://www.cyberpress.com/17-5-million-instagram-accounts-exposed-in-major-data-leak/) — Cyberpress (2026-01-10)

---
Source: https://cyber.netsecops.io/articles/instagram-data-leak-exposes-17-5-million-users/
