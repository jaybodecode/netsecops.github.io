# DoJ Dismantles $28M Bank Fraud Ring, Seizes Phishing Database

**Severity:** high | **Category:** Cyberattack,Phishing,Incident Response | **Updated:** 2025-12-23 | **Reading time:** 4 min

The U.S. Department of Justice has seized the domain `web3adspanels.org` and its associated backend database, which were central to a massive bank account takeover fraud operation. The criminal scheme used phishing websites to impersonate financial institutions and harvest victim credentials, leading to attempted losses of approximately $28 million and actual losses of $14.6 million. The action follows an FBI warning about this type of fraud and was coordinated with law enforcement in Estonia and Georgia.

## Executive Summary
The **[U.S. Department of Justice (DoJ)](https://www.justice.gov/)** has announced a significant enforcement action against a large-scale bank account takeover (ATO) fraud ring. Authorities seized the domain `web3adspanels.org` and its backend database, which the criminals used to store thousands of stolen bank login credentials. The operation involved creating sophisticated phishing websites that mimicked legitimate bank login pages to trick victims. The scheme resulted in approximately $14.6 million in actual losses and attempted to steal nearly $28 million. This takedown, led by the U.S. Attorney's Office for the Northern District of Georgia, highlights a successful disruption of a major cybercriminal enterprise and underscores the pervasive threat of phishing.

---

## Threat Overview
The criminal operation was a classic phishing and ATO scheme. Attackers created fraudulent websites that were nearly identical to the real login pages of various U.S. financial institutions. Victims were lured to these sites, likely through phishing emails or malicious ads, and prompted to enter their usernames and passwords. This stolen information was then captured and stored in the backend database hosted at `web3adspanels.org`.

The attackers used the harvested credentials to log into the victims' real bank accounts, where they would drain funds and transfer them to accounts under their control. The **[FBI](https://www.fbi.gov/)**'s Internet Crime Complaint Center (IC3) had previously issued a Public Service Announcement in November 2025 about this specific type of fraud, noting it had received over 5,100 complaints with losses exceeding $262 million since January 2025. The DoJ's operation was a coordinated effort involving international partners in Estonia and Georgia.

---

## Technical Analysis
The core of the criminal infrastructure was the phishing kit and the backend panel. The panel served as a command-and-control center for the operation, allowing the criminals to manage their phishing pages and organize the stolen credentials.

### MITRE ATT&CK Techniques
- **[`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)**: The primary vector for luring victims to the fraudulent websites was likely through links embedded in phishing emails or messages.
- **[`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/)**: Victims were socially engineered to click on a malicious link that redirected them to the credential harvesting page.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)**: The entire scheme culminates in the use of valid, stolen credentials to perform unauthorized actions on the victims' bank accounts.
- **[`T1114.001 - Email Collection: Local Email Collection`](https://attack.mitre.org/techniques/T1114/001/)**: While not explicitly stated, such schemes often involve an initial compromise to steal email contacts for wider phishing campaigns.

---

## Impact Assessment
The financial impact of this operation was substantial, with $14.6 million in confirmed losses and millions more at risk. For the victims, this meant their bank accounts were drained, causing significant financial hardship and distress. The DoJ's seizure of the database and domain is a major disruption to the criminal group, preventing further losses and providing valuable intelligence for ongoing investigations. The case highlights the effectiveness of public-private partnerships and international law enforcement cooperation in combating cybercrime. However, the scale of the losses reported by the IC3 indicates that this type of fraud remains a widespread and persistent threat.

---

## IOCs

| Type | Value | Description |
|---|---|---|
| Domain | `web3adspanels.org` | The primary domain for the backend web panel used to store stolen credentials. |

---

## Detection & Response
For Financial Institutions:
1.  **Threat Intelligence**: Proactively monitor for newly registered domains that impersonate your brand (typosquatting). Services that track phishing kits can provide early warnings.
2.  **Fraud Detection Analytics**: Implement advanced analytics to detect suspicious account activity, such as logins from new devices/locations followed immediately by large transfers.
3.  **D3FEND Techniques**: Use [`D3-UGLPA - User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis) to flag logins from unusual locations and [`D3-ANET - Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding) to detect rapid login attempts.

For Individuals:
1.  **Scrutinize Emails**: Be wary of any unsolicited email asking you to log into your bank account. Check the sender's address carefully.
2.  **Navigate Directly**: Do not click on links in emails. Instead, type your bank's web address directly into your browser or use a trusted bookmark.

---

## Mitigation
1.  **Multi-Factor Authentication (MFA)**: This is the single most effective control against account takeover. Even if an attacker steals a password, they cannot access the account without the second factor. All financial institutions should offer and strongly encourage MFA.
2.  **User Education**: Continuous user awareness training is crucial. Educate customers on how to spot phishing attempts and the importance of not reusing passwords.
3.  **Email Security**: Implement robust email security gateways with anti-phishing technology, including DMARC, DKIM, and SPF, to block malicious emails from reaching users' inboxes.
4.  **D3FEND Countermeasures**: The most effective countermeasure is [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication). Additionally, banks can use [`D3-WSAA - Web Session Activity Analysis`](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis) to detect non-human or suspicious behavior post-login.

**Tags:** account takeover, ATO, phishing, law enforcement, DOJ, financial fraud

## Sources
- [Justice Department Announces Seizure of Stolen-Password Database Used in Bank Account Takeover Fraud](https://www.databreaches.net/justice-department-announces-seizure-of-stolen-password-database-used-in-bank-account-takeover-fraud/) — DataBreaches.net (2025-12-23)
- [US Justice Department disrupts bank phishing operation.](https://thecyberwire.com/newsletters/daily-briefing/14/244) — The CyberWire (2025-12-23)
- [Justice Department Announces Seizure of Stolen-Password Database Used in Bank Account Takeover Fraud](https://www.fbi.gov/news/press-releases) — FBI (2025-12-22)
- [Feds Seize Password Database Used in Massive Bank Account Takeover Scheme](https://www.securityweek.com/news/) — SecurityWeek (2025-12-23)

---
Source: https://cyber.netsecops.io/articles/us-doj-seizes-database-in-28m-bank-account-takeover-scheme/
