# Microsoft Warns of Phishing Campaign Impersonating M365 Notifications

**Severity:** medium | **Category:** Phishing,Threat Intelligence,Cloud Security | **Updated:** 2026-11-17 | **Reading time:** 5 min

Microsoft Threat Intelligence is tracking a high-volume credential phishing campaign that impersonates legitimate Microsoft 365 service health notifications. Detected on November 13, 2026, the emails use social engineering, creating a false sense of urgency by claiming a service outage has occurred and that messages will be deleted unless the user clicks a link to "restore" them. The campaign's primary goal is to steal user credentials for subsequent attacks.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** Threat Intelligence has detected a large-scale, coordinated phishing campaign targeting **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** users worldwide. The campaign, observed on November 13, 2026, uses carefully crafted emails that mimic official Microsoft service health notifications. These emails employ social engineering tactics, such as claiming a service outage has occurred and threatening to delete held messages within 24 hours, to pressure recipients into clicking malicious links. The ultimate goal is credential theft, which can enable threat actors to conduct business email compromise (BEC), access sensitive cloud data, and launch further attacks from within the compromised organization.

---

## Threat Overview
The phishing emails are designed to look like legitimate notifications from Microsoft concerning an Exchange Online incident. They create a false sense of urgency by stating that messages have been placed on hold and will be permanently deleted if the user does not take immediate action. A prominent "RESTORE MESSAGES" button entices the user to click through to a credential harvesting page.

This attack is a classic example of credential phishing, falling under **[MITRE ATT&CK](https://attack.mitre.org/)** technique [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/). The threat actors use social engineering to bypass human scrutiny and trick users into willingly giving up their login credentials.

---

## Technical Analysis
To evade detection and appear more legitimate, the attackers have incorporated several techniques:
- **Diverse Sender Domains**: The emails are sent from a variety of non-Microsoft domains, including `moments-notice[.]com`, `planetmaison[.]com`, and `newbooker[.]com`, to circumvent simple domain-based blocking.
- **Randomized Subjects**: The email subject lines are randomized to make it harder for email security gateways to block the campaign based on a single subject pattern.
- **Tracking Links**: The malicious links are unique per recipient, often using click-tracking services to monitor the campaign's success rate. In multiple observed samples, these links redirected through the domain `reallifeaccounting[.]com` to the final phishing page.

Once a user clicks the link and enters their credentials on the fake Microsoft 365 login page, the attackers capture the username and password. These credentials can then be used to compromise the user's account.

---

## Impact Assessment
A successful attack can have significant consequences. Stolen Microsoft 365 credentials provide a gateway into the heart of an organization's data and communications. Potential impacts include:
- **Business Email Compromise (BEC)**: Attackers can use the compromised mailbox to send fraudulent wire transfer requests or other scam emails to employees, partners, and customers.
- **Data Breach**: The attacker gains access to all data in the user's OneDrive, SharePoint, and Exchange Online, including sensitive corporate documents, PII, and intellectual property.
- **Internal Phishing**: The compromised account can be used as a trusted internal source to launch further phishing attacks against other employees, increasing the likelihood of success.
- **Persistence and Lateral Movement**: The account can be used to access other corporate resources and establish long-term persistence within the network.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| Domain | `moments-notice[.]com` | Sender domain used in the phishing campaign. |
| Domain | `planetmaison[.]com` | Sender domain used in the phishing campaign. |
| Domain | `newbooker[.]com` | Sender domain used in the phishing campaign. |
| Domain | `reallifeaccounting[.]com` | Redirector domain used in the phishing links. |

---

## Cyber Observables — Hunting Hints
Security teams can hunt for this campaign using the following observables:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| string_pattern | "messages have been held" or "will be deleted within 24 hours" | Common phrases used in the body of the phishing emails. | Email logs, SIEM queries on email body content. | high |
| url_pattern | `reallifeaccounting.com` | The redirector domain is a strong indicator of this specific campaign. | Web proxy logs, DNS query logs, email link analysis. | high |
| domain | `moments-notice.com`, `planetmaison.com`, `newbooker.com` | Emails originating from these sender domains should be considered highly suspicious. | Email gateway logs, SIEM. | high |

---

## Detection & Response
- **Email Security Gateways**: Microsoft notes that its Defender for Office 365 blocks these emails. Other secure email gateways (SEGs) should be configured with rules to block the known IOCs and detect the social engineering language used.
- **Link Protection**: Use email security features that rewrite and scan URLs at the time of click to block access to known phishing sites.
- **User Reporting**: Encourage users to report suspicious emails using a tool like the Report Phishing button in Outlook. This provides valuable intelligence to security teams and helps improve automated detections.
- **Account Monitoring**: Monitor for suspicious login activity, such as logins from unusual geographic locations or impossible travel scenarios, which could indicate a compromised account.

---

## Mitigation
- **User Training** ([`M1017`](https://attack.mitre.org/mitigations/M1017/)): This is the primary defense against social engineering. Train users to be skeptical of emails that create a sense of urgency, to hover over links to inspect the destination URL before clicking, and to never enter credentials on a page they were navigated to from an email link.
- **Multi-Factor Authentication (MFA)** ([`M1032`](https://attack.mitre.org/mitigations/M1032/)): MFA is the most effective technical control to prevent account compromise even if a user's credentials are stolen. Phishing-resistant MFA (like FIDO2) is the gold standard.
- **Email Filtering**: Implement and properly configure advanced email filtering solutions to block malicious emails before they reach user inboxes. This aligns with `M1021 - Restrict Web-Based Content`.

**Tags:** Phishing, Microsoft 365, Credential Theft, Social Engineering, BEC, Microsoft

## Sources
- [High-volume phishing campaign uses Microsoft 365 outage lures, target multiple industry sectors](https://www.microsoft.com/en-us/security/blog/2026/11/16/high-volume-phishing-campaign-uses-microsoft-365-outage-lures-target-multiple-industry-sectors-2/) — Microsoft Security (2026-11-16)

---
Source: https://cyber.netsecops.io/articles/microsoft-warns-of-phishing-campaign-impersonating-m365-notifications/
