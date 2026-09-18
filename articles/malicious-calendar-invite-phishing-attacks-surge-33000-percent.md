# Malicious Calendar Invite Phishing Surges Over 30,000%

**Severity:** high | **Category:** Phishing,Malware | **Updated:** 2026-09-18 | **Reading time:** 3 min

Security firm Sublime has reported a staggering 33,000% increase in malicious calendar invite attacks, also known as 'ICS phishing,' between May and September 2026. Attackers are abusing .ics calendar files sent from legitimate services like Gmail to bypass email security filters. These invites, which are often automatically added to a user's calendar, contain malicious links that trick victims into downloading RMM tools like ScreenConnect, leading to device compromise, data theft, and potential ransomware deployment.

## Executive Summary
Security researchers at **[Sublime Security](https://sublime.security/)** have identified an explosive growth in a phishing technique that leverages `.ics` calendar files to deliver malware. This method, dubbed "ICS phishing," has seen a projected 33,000% increase in volume between May and September 2026. Attackers use legitimate email services like **[Gmail](https://www.google.com/gmail/)** to send malicious calendar invitations that often bypass traditional email filters. Because many email clients automatically add these events to the user's calendar, the victim is exposed to the malicious lure in both their inbox and their trusted calendar application, increasing the likelihood of interaction. The ultimate goal is to trick the user into clicking a link and installing a malicious Remote Monitoring and Management (RMM) tool, giving the attacker full control of the endpoint.

---

## Threat Overview
ICS phishing is a highly effective social engineering tactic that abuses the trust users place in their calendar applications. The attack flow is simple but potent:
1.  **Delivery**: An attacker, using a free email account on a trusted provider like Gmail, sends a calendar invitation (`.ics` file) to the target.
2.  **Bypass**: Because the email originates from a reputable source (e.g., `google.com`), it often passes through email security gateways that are primarily focused on sender reputation.
3.  **Placement**: The user's email client (e.g., Microsoft Outlook) automatically processes the invitation and adds the event to their calendar, often without any user interaction.
4.  **Lure**: The user now sees the malicious event, which may contain an urgent subject line (e.g., "Invoice Overdue"), in two trusted places: their inbox and their calendar notifications.
5.  **Compromise**: The event description contains a link. If the user clicks it, they are directed to a site that prompts them to download and install what appears to be legitimate software, but is actually a malicious RMM tool like **[ScreenConnect](https://www.connectwise.com/platform/control)** (now ConnectWise Control).

Once the RMM tool is installed, attackers have persistent remote access to the device, which they can use to deploy secondary payloads like infostealers or ransomware ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
The surge in this attack vector poses a significant threat because it cleverly circumvents both technical controls and user expectations. Users are not accustomed to treating calendar invites with the same suspicion as email attachments. A successful attack leads to a full endpoint compromise, which can result in:
-   Theft of sensitive personal and corporate data.
-   Harvesting of credentials stored on the device.
-   Deployment of ransomware, leading to business disruption.
-   Use of the compromised device as a pivot point for further attacks on the network.

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns:
- **Email Logs**: Search for incoming emails with `.ics` attachments from external, non-business email domains (e.g., `gmail.com`, `yahoo.com`).
- **Calendar Events**: Look for calendar events created by external users that contain suspicious keywords (e.g., "invoice," "payment," "urgent") and shortened or non-standard URLs.
- **Network Traffic**: Monitor for outbound connections from endpoints to known RMM service domains (e.g., screenconnect.com) that are not part of your organization's approved software list.
- **Endpoint Processes**: Monitor for the execution of RMM tool installers or processes, especially if they were downloaded from a browser and initiated by a standard user.

## Detection & Response
- **Email Gateway Configuration**: Configure your email security gateway to specifically inspect the content of `.ics` files for malicious links and to apply stricter filtering to calendar invites from external free-mail providers. This is a form of [D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
- **Disable Auto-Accept**: Advise users or use GPO/MDM policies to disable the automatic processing and acceptance of calendar invitations in their email clients. This forces a manual review of each invite.
- **EDR/EPP**: Ensure endpoint protection is configured to block the installation of unauthorized RMM software. Create detection rules for RMM tools that are not on your corporate allowlist.
- **User Training**: This is critical. Educate users about the threat of ICS phishing. Teach them to be suspicious of any unexpected calendar invite, especially those that create a sense of urgency or come from an unknown sender.

## Mitigation
- **Application Control**: Use application control policies ([D3-EAL: Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)) to prevent the execution of any RMM software that is not explicitly approved for use in your environment.
- **URL Filtering**: Implement web filtering to block access to known malicious domains and file-sharing sites commonly used to host malware.
- **User Awareness**: Reinforce to users that a calendar invite is just another potential delivery vector for a phishing attack and should be treated with the same level of caution as an email.
- **Principle of Least Privilege**: Ensure that standard users do not have local administrator rights on their workstations, which would prevent them from installing most RMM software.

**Tags:** ICS-phishing, social-engineering, RMM, email-security, calendar-attack

## Sources
- [Keep seeing strange meetings and events in your calendar? It might be because calendar-based phishing has jumped 33,000% since May](https://www.techradar.com/pro/security/keep-seeing-strange-meetings-and-events-in-your-calendar-it-might-be-because-calendar-based-phishing-has-jumped-33-000-percent-since-may-and-they-work-even-if-the-email-is-sent-to-spam) — TechRadar Pro
- [These fake, malicious meeting invites are exploding in popularity. Here's how to spot them](https://www.zdnet.com/tech/fake-calendar-invites-malware/) — ZDNet

---
Source: https://cyber.netsecops.io/articles/malicious-calendar-invite-phishing-attacks-surge-33000-percent/
