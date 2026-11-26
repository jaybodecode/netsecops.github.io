# Massive Data Leak Exposes Two Billion Credentials from Infostealer Ops

**Severity:** high | **Category:** Data Breach,Malware,Phishing | **Updated:** 2026-11-25 | **Reading time:** 4 min

A cybersecurity researcher has discovered a massive, non-password-protected database on the public internet containing approximately two billion credentials. The discovery, made by Jeremiah Fowler and reported by ExpressVPN, is believed to be an aggregation of data harvested from widespread infostealer malware campaigns. The exposed data includes a vast collection of usernames and passwords in plaintext, posing a severe risk of account takeovers and credential stuffing attacks.

## Executive Summary
On November 24, 2026, cybersecurity researcher **Jeremiah Fowler**, in collaboration with **[ExpressVPN](https://www.expressvpn.com/)**, reported the discovery of a colossal, unsecured database containing roughly two billion sets of credentials. The database was publicly accessible without any password protection or encryption, exposing a massive trove of usernames and passwords in plaintext. Fowler described it as the largest such collection he has ever found. The data is believed to have been aggregated from numerous infostealer malware operations, highlighting the persistent and large-scale threat posed by this class of malware. This incident puts countless individuals and organizations at high risk for account takeover, fraud, and other malicious activities.

---

## Threat Overview
The exposed database is a stark illustration of the downstream effects of **infostealer malware**. This type of malware, such as RedLine, Vidar, or Raccoon, is designed to covertly infect user devices and steal sensitive information, including saved browser credentials, cookies, and cryptocurrency wallet data. The stolen data, often referred to as "logs," is then sold on underground forums or Telegram channels.

The discovered database, containing 8,471 folders of plaintext information, appears to be an aggregation of these logs from multiple sources. This suggests the database owner was likely a criminal entity involved in collecting, consolidating, and possibly reselling stolen data on a massive scale. The fact that such a valuable asset was left unsecured indicates a significant operational security failure on the part of the criminals themselves.

## Technical Analysis
The core issue is the exposure of a non-password-protected database on the public internet. The data within was stored in plaintext, making it trivial for anyone who found it to access and abuse the credentials.

-   **Data Origin:** The credentials were not sourced from a single company breach but are a compilation from thousands or millions of individual devices infected with infostealer malware. This is a key distinction, as the victims are disparate and may not know their devices are compromised.
-   **Data Structure:** The database was organized into 8,471 folders. Approximately 400,000 of these appeared to be from more sophisticated malware that created a separate folder for each victim's machine, containing all the data stolen from that single device.
-   **Scale:** At two billion credentials, this leak is more than 13 times larger than a previous 149-million-record discovery by the same researcher, indicating the industrial scale of credential theft operations.

This incident is a direct result of threat actors successfully executing techniques like [`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/) (specifically from browsers) and [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/).

## Impact Assessment
The impact of this exposure is widespread and severe. With two billion credentials in the wild, the risk of large-scale automated attacks is extremely high.
-   **Credential Stuffing:** Attackers will use the leaked username/password pairs to attempt to log into a wide variety of other online services, exploiting password reuse.
-   **Account Takeover (ATO):** Successful credential stuffing leads to ATO, enabling financial fraud, identity theft, and access to sensitive personal or corporate data.
-   **Phishing and Social Engineering:** The data can be used to craft highly targeted and convincing phishing campaigns.
-   **Corporate Breaches:** If the credentials belong to employees, they can serve as an initial access vector into corporate networks.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Detection & Response
-   **Credential Stuffing Detection:** Organizations should monitor for abnormal login patterns, such as a high rate of failed login attempts from a single IP or a sudden spike in successful logins for multiple accounts from a new location. D3FEND's `[D3-ANET: Authentication Event Thresholding](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)` is a relevant defensive technique.
-   **Have I Been Pwned:** Individuals and organizations should use services like Have I Been Pwned to check if their email addresses and credentials have appeared in known breaches.
-   **Endpoint Security:** Deploy EDR and antivirus solutions capable of detecting and blocking known infostealer malware families.

## Mitigation
> Given the scale of credential exposure from infostealer malware, relying on passwords alone for security is no longer viable. **Multi-factor authentication is the single most effective mitigation.**

1.  **Enforce Multi-Factor Authentication (MFA):** This is the most critical defense. Even if an attacker has a valid username and password, they cannot access the account without the second factor. This aligns with MITRE Mitigation `[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)`.
2.  **Eliminate Password Reuse:** Users must be educated and policies enforced to ensure unique passwords are used for every online service. Password managers can facilitate this.
3.  **Employee Training:** Train employees to be cautious of phishing emails, suspicious downloads, and pirated software, which are common infection vectors for infostealer malware.
4.  **Endpoint Protection:** Ensure all devices, including personal devices used for work (BYOD), are protected with a reputable endpoint security solution that is kept up to date.

**Tags:** Data Breach, Infostealer, Credentials, Password Leak, Jeremiah Fowler

## Sources
- [Two billion credentials exposed in massive data leak: What we know](https://cybermagazine.com/news/expressvpn-how-infostealer-data-exposes-two-billion-logins) — Cyber Magazine (2026-11-25)

---
Source: https://cyber.netsecops.io/articles/two-billion-credentials-exposed-in-massive-infostealer-leak/
