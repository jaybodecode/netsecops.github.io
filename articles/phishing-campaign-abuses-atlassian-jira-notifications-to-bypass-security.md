# Attackers Abuse Atlassian Jira Notifications in Large-Scale Phishing Campaign to Bypass Email Filters

**Severity:** high | **Category:** Phishing,Cyberattack,Cloud Security | **Updated:** 2026-02-18 | **Reading time:** 4 min

A widespread and ongoing phishing campaign is abusing the legitimate notification features of Atlassian's Jira platform to deliver malicious links to government and corporate targets worldwide. By creating tasks or comments in Jira, attackers trigger legitimate notification emails sent from Atlassian's own servers. These emails, bearing valid digital signatures, bypass most email security filters and appear trustworthy to recipients. The 'low and slow' campaign aims to harvest credentials and deliver malware by luring users to click on links within the seemingly benign project updates. The tactic highlights a growing trend of threat actors abusing trusted SaaS platforms to conduct their attacks.

## Executive Summary
Security researchers have uncovered a large-scale phishing campaign that cleverly weaponizes the notification system of **[Atlassian](https://www.atlassian.com/)** Jira. Threat actors are abusing the trusted nature of this widely used project management tool to bypass email security controls and deliver malicious payloads to government and corporate entities globally. The attack involves the actor using a legitimate Jira instance to generate project invitations or comments, which in turn send notification emails from Atlassian's authentic servers. Because these emails are legitimate, they pass SPF/DKIM/DMARC checks and are delivered to users' inboxes, appearing as a trustworthy business communication. The goal of this 'digital Trojan Horse' campaign is credential harvesting and malware delivery.

---

## Threat Overview
The campaign's methodology is simple yet highly effective. It exploits the inherent trust that both email security systems and human users place in notifications from major SaaS platforms.

1.  **Setup**: The attackers gain control of a legitimate Jira instance, either by compromising an existing one or creating their own.
2.  **Lure Generation**: They create a new Jira project or comment on an existing ticket, crafting the content to be enticing. For example, the ticket might be titled 'Urgent Document Review' or 'Q1 Bonus Information'.
3.  **Weaponized Invitation**: The attacker then uses Jira's built-in functionality to 'invite' or 'mention' the target's email address in the ticket.
4.  **Trusted Delivery**: Atlassian's infrastructure automatically generates and sends a notification email to the target. This email originates from a legitimate `atlassian.net` domain, is signed with a valid DKIM signature, and passes all standard email authentication checks.
5.  **Execution**: The user receives what appears to be a legitimate Jira notification. They click the link to 'view the task,' which directs them to a credential harvesting page or a site that drops malware.

This 'low and slow' attack is difficult to detect with traditional methods because it doesn't involve spoofed domains or suspicious email headers.

## Technical Analysis
### MITRE ATT&CK TTPs
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The core of the attack is delivering a malicious link to the user.
*   [`T1136 - Create Account`](https://attack.mitre.org/techniques/T1136/): Attackers may create accounts on public-facing Jira instances to stage their attacks.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): If an existing Jira instance is compromised, the attackers use valid accounts to create the malicious tickets.
*   [`T1204.002 - Malicious Link`](https://attack.mitre.org/techniques/T1204/002/): The attack relies on the user's execution by clicking the link in the trusted email.

## Impact Assessment
The abuse of trusted SaaS platforms for phishing has a significant impact:
*   **High Success Rate**: Because the emails bypass technical filters and appear legitimate, users are far more likely to click the malicious links.
*   **Credential Theft**: The primary goal is often to steal corporate credentials, which can then be used for business email compromise (BEC), ransomware deployment, or further network intrusion.
*   **Malware Delivery**: The links can also lead to the download of malware, providing the attacker with a persistent foothold in the target's network.
*   **Detection Evasion**: The campaign is difficult for security teams to block at the network perimeter, shifting the burden of detection onto endpoint and user behavior analysis.

## Detection & Response
*   **Link Analysis**: Utilize email security solutions with advanced URL analysis capabilities that can scan the final destination of links, even those originating from trusted sources like Atlassian. This is a form of D3FEND's [`D3-UA - URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis).
*   **User Training**: This is the most critical defense. Train users to be suspicious of unexpected notifications, even from trusted services. They should ask themselves, 'Was I expecting to be added to a Jira project?' and verify unexpected requests out-of-band.
*   **Jira Configuration Review**: For organizations using Jira, review public-facing project settings. Disable anonymous access and consider restricting who can create new projects or invite external users.
*   **Browser Isolation**: Use remote browser isolation (RBI) technology to open links from external emails in a sandboxed environment, preventing any malicious code from reaching the user's endpoint.

## Mitigation
*   **Enhanced User Awareness**: Go beyond standard phishing training. Specifically educate users on the tactic of abusing trusted SaaS platforms like Jira, SharePoint, and Google Docs. Teach them to hover over links to see the true destination and to be wary of any unexpected request for action.
*   **Application Hardening**: For your own Jira instance, enforce MFA for all users. Restrict the ability to create public projects and invite external collaborators to a limited set of trusted administrators. This is an example of D3FEND's [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
*   **Email Gateway Rules**: While difficult, it may be possible to create custom email gateway rules that flag or quarantine Jira notifications related to projects or instances not affiliated with your organization. This requires careful rule tuning to avoid blocking legitimate communications.

**Tags:** Phishing, Atlassian, Jira, SaaS Security, Credential Harvesting, Email Security

## Sources
- [Spam Campaign Abuses Atlassian Jira, Targets Government and Corporate Entities](https://gurucul.com/blog/spam-campaign-abuses-atlassian-jira-targets-government-and-corporate-entities) — Gurucul (2026-02-18)
- [Jira Notification System Abused in Large-Scale Phishing Campaign](https://www.securityweek.com/jira-abuse-phishing-campaign-targets-gov-corp/) — SecurityWeek (2026-02-18)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-abuses-atlassian-jira-notifications-to-bypass-security/
