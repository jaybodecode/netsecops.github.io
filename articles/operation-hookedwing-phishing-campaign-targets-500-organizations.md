# Report Details "Operation HookedWing," a Four-Year Phishing Campaign Targeting 500+ Organizations

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-05-11

A newly detailed report from SOCRadar has exposed "Operation HookedWing," a persistent and sophisticated phishing campaign that has been active for over four years. The campaign has successfully stolen more than 2,000 user credentials from over 500 organizations, with a focus on critical infrastructure, aviation, government, and financial sectors. The threat actors have continuously evolved their tactics, using a mix of GitHub domains, compromised servers, and lures in both English and French to trick victims into surrendering their Microsoft Outlook credentials on convincing, personalized landing pages.

## Executive Summary
A long-running and adaptive **[phishing](https://en.wikipedia.org/wiki/Phishing)** campaign, dubbed "Operation HookedWing," has been systematically targeting organizations in critical sectors for over four years. A new report from threat intelligence firm **SOCRadar** reveals the campaign has compromised more than 500 organizations and stolen over 2,000 sets of user credentials. The operation demonstrates persistence and sophistication, evolving its infrastructure and lures over time to maintain effectiveness. The attackers have shown a strategic interest in high-value targets across aviation, government, energy, and finance, indicating a goal that may extend beyond simple credential theft to espionage or enabling more significant future attacks.

## Threat Overview
"Operation HookedWing" has been active since at least 2022, targeting a wide array of industries with high geopolitical significance. The campaign's primary objective is credential harvesting, specifically targeting Microsoft Outlook and other corporate login credentials.

The attackers' tactics, techniques, and procedures (TTPs) have evolved:
- **2022-2024:** The campaign primarily used **[GitHub](https://github.com/)** domains for hosting phishing pages, with English-language lures themed around Microsoft and Outlook.
- **2024-2025:** The operation expanded to include French-language content, broadening its target base.
- **2025-Present:** The actors have diversified their infrastructure beyond GitHub, using obfuscated domain names and a wider variety of phishing themes.

SOCRadar has identified two dozen command-and-control (C2) servers and over 100 GitHub domains associated with the campaign's infrastructure.

## Technical Analysis
The attack chain for Operation HookedWing is a classic, yet effective, phishing flow:
1.  **Lure:** Victims receive a spear-phishing email designed to create a sense of urgency or authority, often impersonating an internal department like HR. This aligns with [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/).
2.  **Redirect:** The email contains a link that directs the user to an intermediary site, often a GitHub repository or a compromised server.
3.  **Credential Harvesting:** The final landing page is a high-fidelity clone of a Microsoft Outlook login portal. It is often personalized with the victim's company logo or email address to enhance legitimacy, a technique known as [`T1598.003 - Phishing for Information: Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/).
4.  **Exfiltration:** Once the victim enters their credentials, the data (email, password, IP address, geolocation) is captured and sent to an attacker-controlled C2 server.

The use of legitimate services like GitHub for hosting phishing kits is a common tactic ([`T1584.004 - Compromise Infrastructure: Web Services`](https://attack.mitre.org/techniques/T1584/004/)) to bypass security filters that block known-bad domains.

## Impact Assessment
The theft of over 2,000 credentials from 500+ organizations in critical sectors has significant implications:
- **Initial Access for Major Attacks:** Stolen credentials are a primary vector for initial access into corporate networks. They can be used to facilitate ransomware attacks, business email compromise (BEC) fraud, or state-sponsored espionage.
- **Data Breaches:** Valid credentials grant attackers access to sensitive corporate data, including emails, intellectual property, and customer information stored in cloud services like Microsoft 365.
- **Lateral Movement:** Once inside a network, an attacker can use the compromised account to move laterally, escalate privileges, and gain deeper access.
- **Monetization:** The stolen credentials can be sold on dark web marketplaces to other cybercriminals.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) such as domains or IP addresses were provided in the summary articles.

## Cyber Observables — Hunting Hints
- **Network Traffic:** Monitor for outbound connections from the network to newly registered or uncategorized domains, which are often used for phishing C2.
- **GitHub Access:** While legitimate, a sudden spike in employees accessing diverse or unusual GitHub pages (especially `*.github.io` domains) could warrant investigation.
- **Email Gateway Logs:** Search for emails with common phishing keywords related to password expiry, account verification, or shared documents, especially those containing links to URL shorteners or public code repositories.
- **Login Auditing:** Look for a pattern of successful logins from unusual geographic locations or IP ranges shortly after a user clicks on a link in an email.

## Detection & Response
- **Email Security:** Employ advanced email security solutions that can analyze links at time-of-click (URL rewriting) and detect impersonation attempts.
- **User Training (D3FEND: [`D3-UT - User Training`](https://d3fend.mitre.org/technique/d3f:UserTraining)):** Continuously train users to identify and report phishing emails. Emphasize skepticism towards urgent requests for credentials, even if they appear to come from an internal source.
- **Multi-Factor Authentication (MFA) (D3FEND: [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)):** MFA is the single most effective defense against credential theft. Even if an attacker steals a password, they cannot access the account without the second factor.
- **Credential Exposure Monitoring:** Use services to monitor dark web marketplaces and paste sites for company credentials that may have been stolen and put up for sale.

## Mitigation
- **Enforce MFA:** Mandate the use of phishing-resistant MFA (like FIDO2) for all users, especially for access to critical systems and cloud services like Microsoft 365.
- **Block Access to Uncategorized Websites:** Configure web proxies and firewalls to block access to websites that have not been categorized by a reputation service, as these are often used in phishing campaigns.
- **Regular Phishing Simulations:** Conduct regular phishing simulation exercises to test and improve user awareness and reporting.
- **Principle of Least Privilege:** Ensure user accounts only have access to the data and systems necessary for their job function, limiting the potential damage if an account is compromised.

**Tags:** Credential Theft, Critical Infrastructure, GitHub, Operation HookedWing, Phishing, SOCRadar

## Sources
- [Over 500 Organizations Hit in Years-Long Phishing Campaign](https://www.securityweek.com/over-500-organizations-hit-in-years-long-phishing-campaign/) (2026-05-10)

---
Source: https://cyber.netsecops.io/articles/operation-hookedwing-phishing-campaign-targets-500-organizations/
