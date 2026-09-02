# Phishing Attacks Spike 28% as AI-Powered, Multi-Channel Campaigns Bypass Security

**Severity:** high | **Category:** Phishing,Cyberattack,Threat Intelligence | **Updated:** 2026-07-02 | **Reading time:** 7 min

Phishing attacks have increased by 28% in Q2 2026, with a 52% rise in malicious emails bypassing secure email gateways (SEGs). Attackers are leveraging AI to automate and personalize campaigns, including deepfakes and AI chatbots, leading to a surge in 'payloadless' attacks. Microsoft remains the most impersonated brand. The threat has expanded beyond email to include SMS (smishing), QR codes (quishing), and collaboration platforms like Microsoft Teams, demanding a more comprehensive, multi-layered defense strategy.

## Executive Summary

The volume and sophistication of phishing attacks have surged dramatically in the second quarter of 2026, posing a significant challenge to enterprise security. A new report from Egress reveals a 28% quarter-over-quarter increase in phishing emails, with a concerning 52.2% rise in malicious emails successfully bypassing traditional Secure Email Gateways (SEGs). This escalation is fueled by threat actors' widespread adoption of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** to automate, scale, and personalize their campaigns. Attackers are using multi-channel tactics, extending their reach beyond email to SMS (smishing), QR codes (quishing), and enterprise collaboration platforms. **[Microsoft](https://www.microsoft.com/security)** remains the most impersonated brand, highlighting the continued focus on exploiting user trust in major technology providers.

---

## Threat Overview

The modern phishing landscape is characterized by three key trends: AI-driven automation, brand impersonation at scale, and multi-channel delivery.

**AI-Powered Attacks**: Cybercriminals are using AI toolkits, readily available on the dark web, to craft highly convincing and personalized phishing lures. This includes generating flawless text, creating deepfake audio and video, and deploying AI chatbots to impersonate trusted individuals like executives or IT support. This has led to a sharp increase in "payloadless" attacks—those that rely purely on social engineering to trick a user into taking an action, such as wiring funds or revealing credentials. These attacks now account for nearly 19% of all phishing attempts.

**Brand Impersonation**: Attackers continue to abuse the trust users place in well-known brands. Microsoft is the most impersonated brand, featured in 38% of all brand phishing attempts, followed by **[Google](https://www.google.com)** at 11%. These campaigns often take the form of large-scale "commodity attacks" that spoof popular brands with fake promotions or security alerts, leading to massive spikes in phishing attempts for targeted organizations.

**Multi-Channel Expansion**: The attack surface is no longer limited to email. Threat actors are diversifying their delivery methods, using SMS for "smishing," QR codes for "quishing," and direct messaging on platforms like **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)** and LinkedIn. This approach bypasses email-centric security controls and catches users in environments where they may be less guarded.

---

## Technical Analysis

The evolution of phishing tactics demonstrates a clear effort to circumvent specific layers of security.

*   **Bypassing SEGs**: The 52.2% increase in SEG bypass indicates that attackers are successfully evading signature-based and reputation-based detection. They achieve this through techniques like using newly registered domains, abusing legitimate hosting services (e.g., SharePoint, Box), and crafting payloadless emails that contain no obvious malicious indicators for a gateway to block ([`T1566.002`](https://attack.mitre.org/techniques/T1566/002/)).
*   **AI for Social Engineering**: AI is used to overcome common red flags in phishing emails, such as grammatical errors. It allows for the rapid generation of contextually relevant and personalized content, making it much harder for users to spot fakes ([`T1598.001`](https://attack.mitre.org/techniques/T1598/001/)).
*   **Multi-Channel Attack Chain**: A typical multi-channel attack might start with an email that directs a user to scan a QR code. The QR code leads to a smishing message on their phone, which contains the final phishing link. This breaks the analysis chain for security tools that only inspect one channel.
*   **Collaboration Platform Abuse**: On platforms like Teams or Slack, attackers can join public channels or send direct messages that appear as internal communications, leveraging the inherent trust within the platform to deliver malicious links or files ([`T1598.003`](https://attack.mitre.org/techniques/T1598/003/)).

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Technique Name | Description |
|---|---|---|---|
| Initial Access | `T1566` | Phishing | The overarching tactic used in these campaigns across multiple sub-techniques. |
| Initial Access | `T1566.002` | Spearphishing Link | The primary method of delivering the final payload, often via email, SMS, or direct message. |
| Initial Access | `T1598.001` | Spearphishing Voice | AI-generated deepfake voice calls (vishing) are an emerging component of these campaigns. |
| Initial Access | `T1598.003` | Phishing for Information: Spearphishing via Service | Attackers use services like Microsoft Teams, LinkedIn, and SMS to deliver phishing lures. |
| Defense Evasion | `T1071.001` | Web Protocols | Abusing legitimate services and using HTTPS for phishing sites to evade network filtering. |

---

## Impact Assessment

The surge in sophisticated phishing poses a direct threat to organizations of all sizes. Successful attacks can lead to credential theft, ransomware deployment, data breaches, and significant financial loss from Business Email Compromise (BEC). The increasing effectiveness of these attacks means that a higher percentage are reaching end-users, placing immense pressure on human vigilance as the last line of defense. The operational impact includes increased workload for security teams investigating alerts, higher costs for incident response, and a potential loss of productivity if collaboration platforms are compromised or need to be restricted.

---

## IOCs — Directly from Articles

No specific IOCs were provided, as the articles discuss general trends rather than a single campaign.

---

## Cyber Observables — Hunting Hints

Security teams can hunt for signs of sophisticated phishing by looking for behavioral anomalies:

| Type | Value | Description | Context |
|---|---|---|---|
| `log_source` | `Email Gateway Logs` | Search for high volumes of emails from newly registered domains or those with high SPF/DKIM/DMARC failure rates that were still delivered. | SIEM, Email Security Platform |
| `url_pattern` | `teams.microsoft.com/l/message/` | Monitor for external users sending messages with links to internal users on collaboration platforms. | Microsoft 365 Audit Logs |
| `log_source` | `Mobile Device Management (MDM)` | Analyze logs for a spike in users visiting known malicious or uncategorized websites from mobile devices. | MDM/UEM Platform |
| `command_line_pattern` | `(no link/attachment)` | Create alerts for emails with urgent language, requests for financial transactions, or credential updates that have no links or attachments (potential payloadless BEC). | DLP, Email Security Rules |

---

## Detection & Response

**Detection:**
1.  **Integrated Cloud Email Security (ICES)**: Augment or replace traditional SEGs with API-based email security solutions that have a post-delivery view of the inbox. These tools can analyze internal traffic and retract malicious emails that were initially deemed safe.
2.  **Cross-Platform Analysis**: Deploy security solutions that can correlate activity across email, collaboration platforms, and endpoints. A user clicking a link in Teams that leads to a credential harvesting page should be detected as a single, high-priority event.
3.  **URL Analysis at Time-of-Click**: Implement URL protection that rewrites links and analyzes their destination in real-time whenever a user clicks, protecting against links that are benign when scanned by a gateway but are later weaponized.
4.  **Behavioral AI**: Use security tools that leverage AI to baseline normal communication patterns and flag anomalies, such as an executive suddenly emailing from a personal account or a user accessing a login page they've never visited before.

**Response:**
1.  **Automated Remediation**: Automate the process of finding and removing all instances of a reported phishing email from every user's inbox to prevent further clicks.
2.  **User-Centric Workflows**: When a user reports a phishing email, automatically check if they clicked the link or entered credentials and trigger appropriate downstream actions, like a password reset or device isolation.

---

## Mitigation

**Strategic Mitigation:**
*   **[Multi-factor Authentication (M1032)](https://attack.mitre.org/mitigations/M1032/)**: Enforce phishing-resistant MFA (e.g., FIDO2/WebAuthn) across all applications. This is the single most effective control against credential theft from phishing.
*   **[User Training (M1017)](https://attack.mitre.org/mitigations/M1017/)**: Implement continuous security awareness training that includes simulations of modern, multi-channel, and payloadless attacks. Training should educate users on how to report suspicious activity on all platforms, not just email.
*   **Zero Trust Architecture**: Adopt a Zero Trust mindset. Assume that a breach is inevitable and design security controls that verify every access request, regardless of where it originates.

**Tactical Mitigation:**
1.  **Configure Collaboration Platforms**: Tightly control guest and external user access in platforms like Microsoft Teams and Slack. Disable features that are not required for business.
2.  **DMARC Enforcement**: Implement and enforce a DMARC policy of `p=reject` to prevent direct domain spoofing.
3.  **Mobile Threat Defense (MTD)**: Deploy MTD solutions on corporate and BYOD mobile devices to protect against smishing and other mobile-based threats.

**Tags:** phishing, AI, smishing, quishing, Microsoft, brand impersonation, cybersecurity, multi-channel attack

## Sources
- [Phishing attacks surge in 2024 as cybercriminals adopt AI tools and multi-channel tactics](https://www.techradar.com/pro/phishing-attacks-surge-in-2024-as-cybercriminals-adopt-ai-tools-and-multi-channel-tactics) — TechRadar Pro
- [Most prolific phishing campaign of 2024](https://professionalsecurity.co.uk/products/cyber/most-prolific-phishing-campaign-of-2024/) — Professional Security Magazine
- [The 5 Most Dangerous Phishing Attacks of 2024–2025 and How Businesses Can Fight Back.](https://medium.com/@cybersecurity_77841/the-5-most-dangerous-phishing-attacks-of-2024-2025-and-how-businesses-can-fight-back-cb5384cd6e5a) — Medium

---
Source: https://cyber.netsecops.io/articles/phishing-attacks-surge-as-ai-and-multi-channel-tactics-overwhelm-defenses/
