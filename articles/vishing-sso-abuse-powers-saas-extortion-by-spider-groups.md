# "Living Within SaaS": Cordial & Snarky Spider Groups Use Vishing, SSO Abuse for Rapid Extortion

**Severity:** high | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2026-05-02 | **Reading time:** 6 min

Two cybercrime groups, Cordial Spider and Snarky Spider, linked to "The Com" ecosystem, are conducting swift data theft and extortion campaigns. They use voice phishing (vishing) and fake Single Sign-On (SSO) pages to steal credentials, gain access to identity providers, and then move laterally across victims' SaaS applications like Google Workspace and Salesforce to exfiltrate data for seven-figure ransoms.

## Executive Summary

Two emerging cybercrime groups, **Cordial Spider** and **Snarky Spider**, are executing rapid data theft and extortion campaigns by "living within" their victims' Software-as-a-Service (SaaS) environments. Linked to the notorious e-crime collective known as **"The Com"**, these actors leverage sophisticated social engineering, including voice phishing (vishing) and adversary-in-the-middle (AiTM) phishing sites, to compromise Single Sign-On (SSO) credentials. Once they gain access to an organization's identity provider (IdP), they pivot seamlessly across interconnected SaaS applications, exfiltrating high-value data for extortion demands that often reach seven figures. These groups primarily target U.S.-based organizations across a wide range of critical sectors.

---

## Threat Overview

Active since at least October 2025, **Cordial Spider** (also tracked as BlackFile, UNC6671) and **Snarky Spider** represent a new evolution in extortion tactics that bypass traditional network perimeter defenses. Their methodology focuses on compromising the user, not the infrastructure. The attack chain begins with highly convincing social engineering, where attackers impersonate IT help desk staff in vishing calls or messages. Victims are directed to spoofed SSO login pages that capture credentials and session tokens.

This initial access is the linchpin of their operation. By compromising a single set of credentials tied to an IdP, the attackers gain the keys to the kingdom, allowing them to access a multitude of SaaS platforms like **[Google Workspace](https://workspace.google.com/)**, **[HubSpot](https://www.hubspot.com/)**, **[Microsoft SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration)**, and **[Salesforce](https://www.salesforce.com/)**. This "live-within-SaaS" approach allows them to operate stealthily, as their activities are often indistinguishable from legitimate user behavior. The groups are known for their speed, quickly exfiltrating data and escalating pressure tactics, which include DDoS attacks and "swatting" if ransom demands are not met.

## Technical Analysis

The attack methodology demonstrates a deep understanding of modern enterprise IT and cloud security weaknesses.

1.  **Initial Access - Social Engineering:** The primary vector is social engineering ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)). The groups use vishing calls, texts, or emails to create a pretext, often impersonating the target's IT support team. This is a form of **[T1648 - Vishing](https://attack.mitre.org/techniques/T1648/)**.

2.  **Credential Theft - AiTM Phishing:** Victims are directed to an adversary-in-the-middle (AiTM) phishing site that perfectly mimics their organization's SSO portal. These sites proxy the connection to the real service, allowing the attackers to steal not just usernames and passwords, but also session cookies and **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)** tokens in real-time ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)).

3.  **Defense Evasion & Persistence:** Upon gaining access, the attackers move to solidify their foothold. They have been observed disabling MFA for the compromised account and deleting security alerts within the SaaS platforms to avoid detection ([`T1562.007 - Disable or Modify Cloud Firewall`](https://attack.mitre.org/techniques/T1562/007/)).

4.  **Lateral Movement & Discovery:** With control of the IdP, the attackers pivot to connected SaaS applications ([`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)). They explore platforms like SharePoint, Salesforce, and Google Drive to identify and access sensitive financial data, customer lists, and intellectual property.

5.  **Exfiltration:** High-value data is exfiltrated for extortion purposes ([`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/)).

6.  **Anonymization:** To obscure their location and blend in with normal traffic, the groups heavily rely on residential proxy networks such as **Mullvad**, **Oxylabs**, and **Infatica**. This makes IP-based blocking and geolocation analysis ineffective.

## Impact Assessment

The primary impact is financial, stemming from seven-figure ransom demands. However, the operational disruption and reputational damage are also severe. By exfiltrating sensitive data, the attackers create a double-extortion scenario, threatening to leak the data if the ransom is not paid. The targeting of critical sectors like aviation, finance, and legal services means a successful attack can have wide-ranging consequences. The use of aggressive tactics like DDoS attacks and swatting demonstrates a willingness to cause maximum disruption and psychological distress to force payment.

## IOCs — Directly from Articles

No specific file-based or network-based IOCs were provided in the source articles. The threat relies on behavior and social engineering.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect related activity:

*   **Anomalous Logins:** Monitor for logins to SaaS platforms originating from known residential proxy IP ranges (e.g., Mullvad, Oxylabs, Infatica, 9Proxy). Correlate with impossible travel alerts.
*   **MFA Changes:** Alert on any user-initiated MFA de-registration or re-enrollment, especially if it occurs shortly after a login from an unusual location.
*   **SaaS Alert Deletion:** Monitor audit logs in platforms like Microsoft 365 for the deletion of security alerts or the modification of alerting rules.
*   **Anomalous Data Access:** Use CASB or SSPM tools to baseline normal data access patterns and alert on unusual activity, such as a single user downloading large volumes of data from multiple SaaS applications in a short period.

## Detection & Response

**Detection:**
*   Implement **[D3-UBA: User Behavior Analytics](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** to detect deviations from normal user activity, such as logins from new locations, unusual access times, or bulk data downloads.
*   Monitor IdP logs for suspicious authentication events. Look for repeated failed logins followed by a success from a new IP/region, which could indicate a successful AiTM phishing attack.
*   Deploy a Cloud Access Security Broker (CASB) to gain visibility into cross-SaaS application activity and enforce data loss prevention (DLP) policies.

**Response:**
1.  If a compromise is suspected, immediately trigger a session revocation for the affected user across all SaaS applications.
2.  Force a password reset and re-enrollment of MFA for the user.
3.  Analyze IdP and SaaS audit logs to determine the scope of the attacker's access and what data was exfiltrated.
4.  Block known malicious IP ranges associated with residential proxies, though this is a cat-and-mouse game.

## Mitigation

*   **Phishing-Resistant MFA:** The most critical mitigation is to implement phishing-resistant MFA, such as FIDO2 security keys. These methods are not susceptible to AiTM phishing attacks as they bind the authentication to the user's device and the legitimate domain. This is a form of **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
*   **User Training:** Conduct continuous, realistic social engineering and vishing training for all employees. Emphasize the importance of verifying IT requests through established, out-of-band channels.
*   **Restrict SaaS Permissions:** Apply the principle of least privilege to SaaS applications. Users should only have access to the data and functions they absolutely need. Regularly review and prune permissions.
*   **Conditional Access Policies:** Implement strict conditional access policies in your IdP. For example, block logins from anonymizing services or require stronger authentication for access from untrusted networks. This aligns with **[D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.

**Tags:** vishing, phishing, SaaS, SSO, extortion, Cordial Spider, Snarky Spider, The Com

## Sources
- [Cybercrime Groups Using Vishing and SSO Abuse in Rapid SaaS Extortion Attacks](https://thehackernews.com/2026/05/cybercrime-groups-using-vishing-and.html) — The Hacker News (2026-05-01)
- [2 threat groups linked to The Com target critical infrastructure with data theft](https://www.scmagazine.com/brief/threat-intelligence/2-threat-groups-linked-to-the-com-target-critical-infrastructure-with-data-theft) — SC Magazine (2026-05-01)
- [Two new extortion crews are speedrunning the Scattered Spider playbook](https://cyberscoop.com/cordial-spider-snarky-spider-crowdstrike-saas-vishing/) — CyberScoop (2026-04-30)
- [BlackFile Group Targets Retail and Hospitality with Vishing Attacks](https://www.infosecurity-magazine.com/news/blackfile-group-vishing-attacks/) — Infosecurity Magazine (2026-04-27)

---
Source: https://cyber.netsecops.io/articles/vishing-sso-abuse-powers-saas-extortion-by-spider-groups/
