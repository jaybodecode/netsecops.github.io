# Healthcare Sector Faces Surge in Social Engineering & Vishing Attacks

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-09-25 | **Reading time:** 5 min

The healthcare and pharmaceutical industries are under siege from a wave of sophisticated social-engineering attacks, particularly voice phishing (vishing). A Health-ISAC advisory warns that threat actors, including the notorious group ShinyHunters, are using aggressive phone tactics and medical-themed domains to trick employees into giving up credentials. The campaigns aim to cause operational downtime, which is becoming a primary extortion tactic against clinical environments.

## Executive Summary
Cybersecurity researchers and the **[Health Information Sharing and Analysis Center (Health-ISAC)](https://h-isac.org/)** are sounding the alarm over a significant increase in social-engineering attacks targeting the healthcare and pharmaceutical sectors. Threat actors, including the well-known group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**, are employing aggressive voice phishing (vishing) campaigns to manipulate employees into compromising their credentials and multi-factor authentication (MFA) protections. These attacks leverage medical-themed impersonation domains to appear legitimate and often involve belligerent phone calls to pressure targets. The trend indicates a strategic shift by attackers to use operational downtime as a key pressure point for extortion, recognizing the critical nature of clinical workflows.

---

## Threat Overview
The recent campaigns represent a targeted effort against a vulnerable and high-value sector. According to Health-ISAC, over a dozen of its member organizations have been impacted in the last two months. Attackers are moving beyond simple email phishing to direct, interactive social engineering over the phone ([`T1598 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/)).

The goal is to trick an employee, often in IT help desk or support roles, into initiating a password or MFA reset. The attacker, posing as a legitimate user, directs the target to a malicious domain designed to capture credentials or session tokens. The use of "belligerent" tactics suggests attackers are using intimidation and creating a sense of urgency to force compliance.

Researchers at **[Unit 42](https://unit42.paloaltonetworks.com/)** have linked the domain `my-passkeys[.]com` to **The Com**, an underground cybercrime network, suggesting it is part of the infrastructure used in these attacks. This sustained focus on healthcare indicates that threat actors view the sector's reliance on constant uptime as a powerful lever for extortion.

## Technical Analysis
The attack chain is centered on human manipulation rather than technical exploits:

1.  **Reconnaissance**: Attackers gather contact information for employees, likely from professional networking sites like LinkedIn or from previous data breaches.
2.  **Infrastructure Setup**: Malicious domains are registered that impersonate legitimate services (e.g., `my-passkeys[.]com`). These domains host phishing kits designed to harvest credentials and MFA tokens ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
3.  **Initial Contact (Vishing)**: The attacker calls the target, impersonating a user in distress. They use social engineering to create a pretext for an urgent password or MFA reset.
4.  **Credential Theft**: The target is directed to the malicious site, where they enter their credentials. If MFA is in place, the attacker may attempt to capture a one-time code or trick the user into approving a push notification (**MFA Fatigue**).
5.  **Initial Access**: With compromised credentials, the attacker gains access to the organization's network, VPN, or cloud applications ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)).

## Impact Assessment
The primary impact of these attacks is operational disruption. For healthcare organizations, any system downtime can directly affect patient care, leading to canceled appointments, delayed procedures, and potential risks to patient safety. This makes the sector uniquely susceptible to extortion tactics that threaten downtime. While data theft remains a concern, the immediate threat of disrupting clinical workflows is a powerful weapon. The targeting of over a dozen Health-ISAC members indicates a widespread and systematic campaign that poses a significant risk to the entire healthcare and pharmaceutical supply chain.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| `domain` | `my-passkeys[.]com` | Phishing domain associated with 'The Com' network targeting healthcare. |

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| `url_pattern` | `*/my-passkeys[.]com/*` | Any network traffic or proxy logs showing connections to this known malicious domain. |
| `log_source` | `VPN/SSO Authentication Logs` | Look for multiple failed login attempts followed by a successful login and a password reset from the same account. |
| `log_source` | `Help Desk Ticketing System` | Review tickets for password resets that were initiated via phone call and seem unusual or urgent. |
| `certificate_subject` | `CN=*passkey*` or `CN=*sso*` | Search Certificate Transparency logs for newly registered domains containing keywords related to passwords, MFA, SSO, or passkeys, especially if they are typosquats of legitimate services. |

## Detection & Response
*   **Enhanced Monitoring**: Monitor for unusual MFA activity, such as multiple push notifications sent to a user in a short period (MFA fatigue) or MFA registration for a new device shortly after a password reset. D3FEND's [`D3-ANET: Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding) can help detect such patterns.
*   **Help Desk Protocol**: Implement strict identity verification protocols for all help desk requests, especially those made over the phone that involve password or MFA resets. This should involve callback verification to a registered number or the use of pre-established security questions.
*   **Network Blocking**: Proactively block known malicious domains and IPs associated with these phishing campaigns at the firewall, proxy, and DNS levels. Use [`D3-DNSDL: DNS Denylisting`](https://d3fend.mitre.org/technique/d3f:DNSDenylisting).

## Mitigation
*   **User Training**: Conduct regular, targeted security awareness training that specifically addresses vishing and social engineering tactics. Use simulations to train employees to recognize and report suspicious phone calls.
*   **Phishing-Resistant MFA**: Where possible, transition from push-based or SMS-based MFA to more secure, phishing-resistant methods like FIDO2/WebAuthn security keys. This is a key application of [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
*   **Restrict Access**: Enforce the principle of least privilege. Ensure that user accounts only have access to the data and systems necessary for their job roles to limit the impact of a compromised account.

**Tags:** social engineering, vishing, healthcare, pharmaceutical, ShinyHunters, Health-ISAC, MFA fatigue

## Sources
- [Threat groups ramp up social-engineering attacks against healthcare sector](https://www.cybersecuritydive.com/news/threat-groups-social-engineering-attacks-healthcare/831383/) — Cybersecurity Dive (2026-09-25)
- [Healthcare Cyberattacks Are Changing: Downtime Is the New Pressure Point](https://www.esecurityplanet.com/news/healthcare-downtime-september-2026/) — eSecurityPlanet (2026-09-24)

---
Source: https://cyber.netsecops.io/articles/social-engineering-attacks-target-healthcare-pharmaceutical-sectors/
