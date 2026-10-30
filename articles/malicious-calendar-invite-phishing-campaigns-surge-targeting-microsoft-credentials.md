# Malicious Calendar Invite Phishing Campaigns See Explosive Growth

**Severity:** medium | **Category:** Phishing,Malware,Threat Intelligence | **Updated:** 2026-10-20 | **Reading time:** 5 min

Security researchers are warning of a massive spike in phishing campaigns that abuse calendar invitation features in Microsoft 365 and Google Calendar to steal credentials. One firm noted a surge from a few thousand malicious emails a month in April to over 740,000 in the first two weeks of October 2026. The attacks use .ics calendar files or embedded links to create seemingly legitimate events that direct users to credential harvesting pages, effectively bypassing traditional email security filters.

## Executive Summary
Security vendors are reporting an explosive increase in phishing campaigns that leverage malicious calendar invitations to bypass security controls and steal corporate credentials. Researchers at **[Check Point](https://www.checkpoint.com/)** observed the volume of these attacks skyrocket from a few thousand per month in April 2026 to over 740,000 in the first half of October alone. The attacks are a form of social engineering that abuses trusted features in **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365/)** and **[Google](https://www.google.com)** Calendar. Attackers send emails with malicious `.ics` attachments or embedded links that, when accepted, create a calendar event containing a link to a credential harvesting site, lending the phishing attempt an air of legitimacy.

---

## Threat Overview

This attack vector is not new, but its scale has increased dramatically in recent months. The technique's effectiveness lies in its ability to circumvent traditional security measures and exploit user trust.

*   **Bypassing Security Filters**: Because `.ics` files are legitimate calendar files and the emails often come from legitimate (though compromised or newly created) accounts, they are less likely to be flagged as spam or malicious by email gateways.
*   **Abusing User Trust**: Users are conditioned to trust calendar notifications and events that appear on their schedule. An event for a "Mandatory Security Training" or "Invoice Payment Review" can create a sense of urgency and legitimacy, prompting the user to click the embedded link without suspicion.

One large-scale campaign observed by **Check Point** targeted over 40,000 organizations with more than 300,000 unique phishing emails. Another vendor, Sublime Security, noted a 1,216% month-over-month increase in August, highlighting the rapid adoption of this tactic by threat actors.

---

## Technical Analysis

The attack is executed in a few simple steps:

1.  **Delivery**: An attacker sends an email to the target. The email may contain a malicious `.ics` file as an attachment, or it may be a calendar invitation itself with a malicious link in the event description or location field ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
2.  **User Interaction**: The user opens the email. If it's an attachment, they may click to add it to their calendar. If it's an invitation, their mail client might automatically add a tentative event to their schedule.
3.  **Social Engineering**: The calendar event appears legitimate, often using titles related to finance, HR, or IT. The description or location contains a URL pointing to a credential harvesting page, often disguised as a Microsoft login portal ([`T1204.002 - User Execution: Malicious File`](https://attack.mitre.org/techniques/T1204/002/)).
4.  **Credential Theft**: The user clicks the link, enters their credentials into the fake portal, and the attacker captures their username and password.

In a more advanced variation, Sublime Security observed an attack where a Google Calendar invite led to the installation of a legitimate remote monitoring tool, **ScreenConnect**, which was pre-configured to give the attacker command-and-control access to the victim's machine.

---

## Impact Assessment

While simple, this attack method can have severe consequences. The primary impact is credential compromise, which is often the first step in a more significant attack.

*   **Account Takeover**: Stolen credentials can be used to access the user's email, files, and other corporate resources.
*   **Business Email Compromise (BEC)**: An attacker with access to a corporate mailbox can launch convincing BEC attacks, potentially leading to significant financial loss.
*   **Lateral Movement**: Compromised credentials can be used to access other systems within the corporate network, leading to a wider breach.
*   **Data Exfiltration**: Attackers can use their access to steal sensitive company data, intellectual property, or customer information.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) like domains or sender addresses were provided in the source articles, as they are highly variable in these campaigns.

---

## Cyber Observables — Hunting Hints
Security teams can hunt for this activity by looking for:

| Type | Value | Description |
|---|---|---|
| File Name | `*.ics` | Monitor for a sudden increase in `.ics` attachments from external or unusual senders. |
| URL Pattern | Look for URLs in calendar event descriptions, especially those using URL shorteners or hosted on non-standard domains. | Attackers place the malicious link within the event details. |
| Email Subject | "Invitation:", "Meeting Request" | While common, a surge of these from unknown external senders could indicate a campaign. |

---

## Detection & Response

1.  **Email Gateway Configuration**: Configure email security gateways to scan the contents of `.ics` files for suspicious URLs. Some gateways can be set to quarantine or strip these attachments from external senders. **D3FEND**: [`D3-FA: File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
2.  **URL Analysis**: Employ URL analysis and sandboxing for all links in email bodies and attachments, including calendar invites. **D3FEND**: [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis).
3.  **User Education**: This is the most critical defense. Train users to be suspicious of unexpected calendar invites from external senders, especially those that create a sense of urgency or ask them to click a link to view details.

---

## Mitigation

1.  **User Training**: Conduct regular, targeted training on identifying phishing attempts, with specific modules on calendar-based attacks. Teach users to manually inspect event details and verify the sender before clicking any links.
2.  **Disable Automatic Processing**: In email clients like Outlook, consider disabling the feature that automatically processes meeting requests and adds tentative events to the calendar. This forces users to manually review each invitation.
3.  **Multi-Factor Authentication (MFA)**: Enforce MFA across all services. While it won't stop the initial credential theft, it will prevent the attacker from using the stolen password to access the account.
4.  **Reporting Mechanism**: Provide users with a simple, one-click way to report suspicious emails and calendar events to the security team.

**Tags:** Phishing, Social Engineering, Credential Theft, Microsoft 365, Google Calendar, ICS files, Check Point

## Sources
- [Malicious calendar invites see explosive growth, bypassing security controls](https://www.helpnetsecurity.com/2026/10/20/malicious-calendar-invites/) — Help Net Security (2026-10-20)
- [Fake Calendar Invites Target 40,000 Firms in Microsoft Credential Theft](https://hackread.com/fake-calendar-invites-firms-microsoft-credential-theft/) — HackRead (2026-10-19)

---
Source: https://cyber.netsecops.io/articles/malicious-calendar-invite-phishing-campaigns-surge-targeting-microsoft-credentials/
