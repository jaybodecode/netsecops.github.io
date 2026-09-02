# Widespread Phishing Campaign Abuses Microsoft Teams Guest Invites to Target 6,000+ Users

**Severity:** medium | **Category:** Phishing,Cloud Security | **Updated:** 2026-01-27 | **Reading time:** 4 min

A large-scale phishing campaign is abusing Microsoft Teams' guest invitation feature to target thousands of users with fake billing notices. Researchers at Check Point have observed over 12,000 phishing emails sent to more than 6,100 users, primarily in the manufacturing, technology, and education sectors in the United States. Attackers create Teams groups with finance-related names and send guest invitations to targets. The invitation email, which comes from a legitimate Microsoft address, contains obfuscated text that appears to be a billing notification, lending it an air of authenticity and increasing the likelihood that a user will click the malicious link.

## Executive Summary
Security researchers have identified a widespread phishing campaign that cleverly abuses the guest invitation functionality within **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** to bypass security controls and deceive users. The campaign, detailed by **[Check Point](https://www.checkpoint.com/)**, has targeted over 6,100 users across 12,000 observed phishing emails, with a focus on organizations in the U.S. manufacturing, technology, and education sectors. The attackers create Teams groups with names like "Financial Statement" or "Invoice-2026-01" and invite external users as guests. The resulting notification email, sent from a legitimate Microsoft domain, appears to be a trustworthy billing notice, tricking users into engaging with malicious content.

---

## Threat Overview
- **Attack Vector:** Abuse of the Microsoft Teams guest invitation feature.
- **Payload:** The emails contain links that likely lead to credential harvesting pages, malware downloads, or other phishing infrastructure.
- **Social Engineering Tactic:** The campaign relies on the trust users place in emails originating from `microsoft.com`. By embedding the phishing lure within a legitimate service notification, the attackers increase their chances of success.
- **Scale and Targets:** The campaign is significant in scale, with thousands of users targeted, primarily within the United States. The focus on manufacturing, technology, and education suggests a B2B targeting strategy.

## Technical Analysis
The attack unfolds in several steps:
1.  **Setup:** The attacker, using a compromised or newly created Microsoft 365 account, creates a new Team with a name designed to look like a financial document (e.g., `Billing-Notice-Jan-27`).
2.  **Invitation:** The attacker invites the target's email address as a guest to this maliciously named Team. ([`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/)).
3.  **Delivery:** Microsoft's infrastructure automatically sends a legitimate invitation email to the target. The email subject will be something like "You have been added as a guest to [Organization] in Microsoft Teams," and the body will contain the name of the malicious Team.
4.  **Deception:** The user sees an email from a trusted sender (`@microsoft.com`) with a seemingly urgent business purpose. The text within the invitation, controlled by the attacker via the Team name, serves as the phishing lure.
5.  **Exploitation:** If the user clicks the "Open Microsoft Teams" button or any embedded links, they may be redirected to a credential harvesting page designed to look like a Microsoft login portal or prompted to download a malicious file.

This technique is effective because it passes standard email security checks like SPF, DKIM, and DMARC, as the email is genuinely sent by Microsoft.

## Impact Assessment
- **Credential Theft:** The primary goal of such campaigns is often to steal Microsoft 365 credentials, which can be used for Business Email Compromise (BEC), internal phishing, data theft, and lateral movement.
- **Malware Infection:** The links could lead to the download of malware, including ransomware, infostealers, or remote access trojans (RATs).
- **Erosion of Trust:** This type of attack erodes user trust in legitimate collaboration tool notifications, potentially causing them to ignore valid invitations and communications.

## IOCs
No specific technical Indicators of Compromise (IOCs) such as domains or IP addresses have been provided in the source reports.

## Detection & Response
1.  **Monitor for Anomalous Guest Additions:** In Microsoft 365 audit logs, monitor for unusual patterns of guest user invitations, such as a single account adding a large number of external guests in a short period, or guests being added from newly created M365 tenants. Reference D3FEND technique [`Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).
2.  **Email Gateway Rules:** While the emails are legitimate, advanced email security gateways may be able to inspect the content and flag invitations to Teams with suspicious names (e.g., containing keywords like 'invoice', 'payment', 'statement').
3.  **User Education:** This is the most critical defense. Train users to be suspicious of unexpected Teams invitations, even if they come from a Microsoft domain. Teach them to hover over links before clicking and to question why they would be added to a Team by an unknown organization.

## Mitigation
1.  **Restrict Guest Access:** If your organization's business processes do not require it, consider disabling or heavily restricting the ability to invite external guest users in your Microsoft Teams admin center. You can configure an allowlist of trusted domains that are permitted to be added as guests. Reference D3FEND technique [`Domain Trust Policy`](https://d3fend.mitre.org/technique/d3f:DomainTrustPolicy).
2.  **MFA Enforcement:** Enforce **[Multi-factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** for all users. This is the single most effective mitigation against credential theft, as a stolen password alone will not be sufficient for an attacker to gain access.
3.  **Safe Links / URL Protection:** Utilize URL rewriting and time-of-click analysis services (like Microsoft Defender for Office 365's Safe Links) to scan links when a user clicks them, blocking access to known malicious sites.

**Tags:** Phishing, Microsoft Teams, Social Engineering, Cloud Security, Credential Harvesting

## Sources
- [26th January – Threat Intelligence Report](https://research.checkpoint.com/2026/01/26/26th-january-threat-intelligence-report/) — Check Point Research (2026-01-26)
- [26th January – Threat Intelligence Report](https://research.checkpoint.com/2026/01/26/26th-january-threat-intelligence-report/) — Check Point Research (2026-01-26)

---
Source: https://cyber.netsecops.io/articles/microsoft-teams-phishing-campaign-abuses-guest-invitations/
