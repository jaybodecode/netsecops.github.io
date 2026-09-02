# Iranian Hackers Launch Coordinated Password Spray Attacks on Middle East

**Severity:** high | **Category:** Threat Actor,Cyberattack,Phishing | **Updated:** 2026-04-02 | **Reading time:** 6 min

The Iranian APT group Gray Sandstorm is suspected of conducting a large-scale password spray campaign against government and private sector organizations in Israel and the UAE. According to Check Point researchers, the cyberattacks, which began in early March 2026, targeted Microsoft 365 accounts and appear to be coordinated with physical military operations. The timing and targeting of municipalities responsible for damage response suggest the attacks were intended to support kinetic missile and drone strikes, likely for intelligence gathering and Bombing Damage Assessment (BDA). This campaign exemplifies the use of cyber operations in modern hybrid warfare.

## Executive Summary
A widespread password spray campaign targeting **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** accounts has been attributed to an Iranian Advanced Persistent Threat (APT) group, likely **[Gray Sandstorm](https://attack.mitre.org/groups/G0124/)** (also known as SEABORGIUM/COLDIVER). According to research from **[Check Point](https://www.checkpoint.com/)**, the attacks targeted government and private sector entities in Israel and the United Arab Emirates (UAE) starting in early March 2026. The campaign's timing and choice of targets—specifically municipalities responsible for civil defense and damage response—strongly correlate with kinetic military operations (missile and drone strikes) launched by Iran. This suggests the cyberattacks were conducted as part of a hybrid warfare strategy, aimed at gathering intelligence to support and assess the impact of physical military actions.

---

## Threat Overview
The campaign employed password spraying, a brute-force technique where attackers attempt a small number of common passwords against a large number of user accounts. This "low and slow" method is designed to avoid triggering account lockout policies that would occur from repeated failed logins on a single account.

The primary targets were Microsoft 365 accounts belonging to organizations in Israel and the UAE. The focus on municipalities is particularly notable. These organizations are critical for emergency response and damage assessment following a physical attack. By gaining access to their email accounts and internal documents, the attackers could potentially:
- Gather intelligence on emergency response plans.
- Assess the effectiveness and damage of their kinetic strikes (Bombing Damage Assessment - BDA).
- Disrupt coordination efforts of first responders.

This direct correlation between cyber operations and physical military strikes is a clear example of hybrid warfare, where cyber capabilities are used as a force multiplier for conventional military action.

## Technical Analysis
The core TTPs of this campaign are characteristic of **Gray Sandstorm** and other similar APTs focused on credential access:
- **[`T1110.003 - Brute Force: Password Spraying`](https://attack.mitre.org/techniques/T1110/003/):** This was the primary initial access vector used to compromise accounts at scale.
- **[`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/):** Once a correct password was found, the attackers gained access to the legitimate Microsoft 365 cloud account.
- **[`T1589.002 - Gather Victim Identity Information: Email Addresses`](https://attack.mitre.org/techniques/T1589/002/):** The attackers would have first needed to gather lists of valid email addresses for the target organizations to conduct the password spray attack.
- **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/):** After gaining access, the attackers would collect data from sources like Exchange Online (emails) and SharePoint Online (documents).

**Gray Sandstorm** has a documented history of using password spraying as its go-to technique for initial access, making the attribution by Check Point highly plausible.

## Impact Assessment
The impact of this campaign extends beyond a typical data breach, given its connection to military operations:
- **National Security Risk:** The intelligence gathered could provide Iran with critical insights into the civil defense and response capabilities of its adversaries, directly impacting national security.
- **Espionage:** The attackers gain access to sensitive government communications, plans, and data.
- **Foundation for Further Attacks:** Compromised accounts can be used to launch more targeted phishing campaigns against other government entities or to maintain persistent access for future intelligence gathering.
- **Psychological Impact:** Coordinated cyber and physical attacks are designed to create a sense of chaos and demonstrate a sophisticated, multi-domain capability.

## Detection & Response
**Detection:**
- **Authentication Log Analysis:** This is the most effective detection method. Ingest Microsoft Entra ID sign-in logs into a SIEM and monitor for password spray patterns. Look for a high volume of failed login attempts from a single or small group of IP addresses across many different user accounts. This is a key use case for **[D3-ANET: Authentication Event Thresholding](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)**.
- **Impossible Travel Alerts:** Enable and monitor for impossible travel alerts, which trigger when a user account logs in from geographically distant locations in a short period.
- **Anomalous Mailbox Access:** Monitor for unusual mailbox activity, such as a user account accessing the mailbox via an unfamiliar user agent or from an IP address outside of the organization's normal footprint.

**Response:**
- If a password spray attack is detected, immediately force a password reset for all affected accounts.
- Block the source IP addresses of the attack at the firewall or through Conditional Access policies.
- Review mailbox rules and access permissions for any compromised accounts to identify and remove any persistence mechanisms set by the attacker.

## Mitigation
- **Multi-factor Authentication ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)):** This is the single most effective defense against password spraying. Even if the attacker guesses the correct password, they cannot access the account without the second factor. Enforce MFA for all users.
- **Strong Password Policies ([`M1027 - Password Policies`](https://attack.mitre.org/mitigations/M1027/)):** Implement strong password policies that prohibit the use of common or easily guessable passwords. Use a deny-list of known bad passwords.
- **Conditional Access Policies:** Implement Microsoft Entra Conditional Access policies to block or require MFA for logins from untrusted locations or non-compliant devices. This is a form of **[D3-UGLPA: User Geolocation Logon Pattern Analysis](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
- **Audit and Logging ([`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/)):** Ensure that comprehensive logging is enabled for Microsoft 365 and that these logs are ingested into a SIEM for continuous monitoring and alerting.

**Tags:** password spray, Gray Sandstorm, Iran, APT, Microsoft 365, hybrid warfare

## Sources
- [Risky Bulletin: Iranian password sprays came first, then came the missiles](https://risky.biz/bulletin-apr1-2026/) — Risky Business (2026-04-01)

---
Source: https://cyber.netsecops.io/articles/iranian-hackers-launch-coordinated-password-spray-attacks-on-middle-east/
