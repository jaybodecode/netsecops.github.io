# Capcom Data Breach Exposes Data of Over 11 Million Users

**Severity:** high | **Category:** Data Breach,Cyberattack,Threat Intelligence | **Updated:** 2026-10-23 | **Reading time:** 6 min

Japanese gaming company Capcom has confirmed a significant data breach of its CAPCOM ID membership service, impacting over 11.7 million customer accounts. The incident, detected on October 19, 2026, resulted in the unauthorized access and theft of user data including email addresses, IP addresses, and login information. While financial data was not compromised, Capcom is warning all users to be vigilant against phishing attempts. The company has notified authorities and is in the process of contacting affected individuals.

## Executive Summary
On October 22, 2026, Japanese video game giant **[Capcom](https://www.capcom.com/)** confirmed a major data breach affecting its **[CAPCOM ID](https://cid.capcom.com/)** membership service. The breach, detected on October 19, compromised the personal information of over 11.7 million users. Exposed data includes email addresses, IP addresses, and login metadata. While credit card information was not affected, the scale of the breach exposes a large user base to follow-on phishing and social engineering attacks. Capcom has reported the incident to Japanese authorities and is notifying affected users while urging caution regarding suspicious communications.

---

## Threat Overview
**What Happened:** Unauthorized actors gained access to the database of Capcom's CAPCOM ID service, a centralized authentication system for its games and online services.

**When:** The suspicious activity was detected on October 19, 2026. The breach was publicly disclosed on October 22, 2026, after an initial investigation.

**Who is Affected:** Over 11.7 million registered users of the CAPCOM ID service. The company has a global user base for its popular franchises like *Resident Evil* and *Street Fighter*.

**What Data Was Exposed:**
- For 11.7 million users: Email addresses, account creation dates, last login timestamps, number of logins, and the IP address of the last login.
- For a subset of 43 accounts: Dates of birth, gender, nicknames, and countries.
- For 196 accounts: Passwords were illicitly changed by the attackers, but Capcom has since reset them.

Capcom has emphasized that no credit card data was compromised, as payment processing is handled by third-party services. The primary attack vector has not been disclosed, but the incident follows a 2020 ransomware attack on the company that exploited a legacy VPN device.

---

## Technical Analysis
The exact TTPs used in this breach have not been publicly detailed by Capcom. However, based on the type of data exfiltrated, the attack likely involved the compromise of a web application or database server connected to the CAPCOM ID service. Potential attack vectors could include SQL injection, exploitation of an unpatched vulnerability in the web framework, or the use of stolen credentials for a privileged account.

**Analyst Assessment:** The attackers' actions, such as changing passwords for a small number of accounts, suggest an attempt to take over high-value accounts or test the extent of their access. The exfiltration of metadata like IP addresses and login timestamps indicates a reconnaissance effort, potentially to build profiles of users for targeted phishing campaigns.

### MITRE ATT&CK Techniques Potentially Used:
- **Initial Access:**
  - [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): A likely vector if an unpatched vulnerability existed in the CAPCOM ID portal.
- **Credential Access:**
  - [`T1187 - Forced Authentication`](https://attack.mitre.org/techniques/T1187/): Could have been used to capture credentials if a system was misconfigured.
- **Collection:**
  - [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): If the user database was stored in a cloud environment.
  - [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/): Accessing and extracting data from the primary user database.
- **Exfiltration:**
  - [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Data could have been funneled out through a command-and-control channel.

---

## Impact Assessment
The primary impact is the heightened risk of targeted **[phishing](https://en.wikipedia.org/wiki/Phishing)** campaigns against the 11.7 million affected users. Attackers can use the stolen email addresses and the context of the Capcom breach to craft highly convincing emails designed to steal further personal information, login credentials for other services, or deploy malware. The exposure of IP addresses could also aid in geolocation and more sophisticated targeting. For Capcom, the breach causes significant reputational damage, particularly following the 2020 ransomware incident, and may lead to regulatory fines under data protection laws like GDPR, even though the company is headquartered in Japan.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as malicious IP addresses, domains, or file hashes were provided in the source articles.

---

## Cyber Observables — Hunting Hints
The following patterns could indicate related malicious activity targeting Capcom users:
- **Email Subject Lines:** Look for emails with subjects like "CAPCOM ID Security Alert," "Your Capcom Account Requires Verification," or "Resident Evil Special Offer Following Breach." Attackers will leverage the breach news.
- **Sender Domains:** Monitor for emails from domains that are look-alikes of `capcom.com`, such as `capcom-security.com`, `capcom-support.net`, or using character substitutions.
- **URL Patterns:** Phishing links may contain `capcom` as a subdomain (e.g., `capcom.security-update.com`) to appear legitimate.

---

## Detection & Response
- **For Users:**
  1.  Treat all unsolicited emails, even those appearing to be from Capcom, with extreme suspicion.
  2.  Do not click on links or download attachments from these emails. Navigate directly to the official CAPCOM ID website (`cid.capcom.com`) to make any account changes.
  3.  Enable **[Multi-Factor Authentication (MFA)](https://www.cisa.gov/mfa)** on your Capcom account and any other online account that uses the same email address.
  4.  Monitor for any unusual activity on your accounts.
- **For Organizations:**
  1.  **Email Gateway Filtering:** Implement strict email filtering rules to block known phishing indicators and look-alike domains related to this breach.
  2.  **User Awareness:** Alert employees, especially if corporate emails were used for personal services, about the breach and the expected phishing campaigns. Use this as a real-world training example.
  3.  **D3FEND Techniques:** Employ [`D3-UA - URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) to scan and detonate links in incoming emails to identify malicious destinations.

---

## Mitigation
- **For Users:**
  1.  **Password Hygiene:** While Capcom stated passwords were not breached (except for 196 accounts), it is a best practice to have a unique, strong password for every service. If the email and password combination used for Capcom is reused elsewhere, change those passwords immediately.
  2.  **Be Vigilant:** Be aware that attackers now know your email is associated with a gaming account. Expect targeted attacks related to gaming, virtual items, and account trading.
- **For Organizations (General Best Practices):**
  1.  **D3FEND Hardening:** Implement [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) on all public-facing applications to minimize the attack surface.
  2.  **Data Minimization:** Collect and retain only the user data that is strictly necessary for the service to function.
  3.  **Network Segmentation:** Isolate databases containing sensitive user information from public-facing web servers. Access should be strictly controlled through an application layer with robust authentication and authorization checks.

**Tags:** data breach, gaming, phishing, account security, PII

## Sources
- [Capcom confirms data breach affecting 11.7 million accounts](https://www.bleepingcomputer.com/news/security/capcom-confirms-data-breach-affecting-117-million-accounts/) — BleepingComputer (2026-10-22)
- [Capcom confirms a data breach has affected over 11 million people, with emails, IP addresses, and birthdays caught up in the mix](https://www.pcgamer.com/hardware/capcom-confirms-a-data-breach-has-affected-over-11-million-people-with-emails-ip-addresses-and-birthdays-caught-up-in-the-mix/) — PC Gamer (2026-10-22)
- [Resident Evil Developer Capcom Issues Phishing Warning After Data Breach Hits Over 11 Million Customer Accounts](https://www.ign.com/articles/resident-evil-developer-capcom-issues-phishing-warning-after-data-breach-hits-over-11-million-customer-accounts) — IGN (2026-10-22)

---
Source: https://cyber.netsecops.io/articles/capcom-data-breach-exposes-data-of-11-million-users/
