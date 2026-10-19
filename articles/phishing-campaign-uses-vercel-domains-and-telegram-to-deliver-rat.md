# Novel Phishing Attack Abuses Vercel and Telegram to Deliver RATs

**Severity:** medium | **Category:** Phishing,Malware,Threat Actor | **Updated:** 2026-01-30 | **Reading time:** 5 min

A novel phishing campaign, observed between November 2025 and January 2026, is abusing trusted `*.vercel.app` domains to bypass email security filters and deliver malware. The attack, detailed by Cloudflare, uses financial lures like fake invoices to trick victims into clicking. A unique feature is its Telegram-gated payload delivery, which requires interaction with a Telegram bot to receive the final payload. This technique effectively filters out automated sandboxes and security researchers, ensuring the malware is only delivered to genuine targets. The campaign's ultimate goal is to install GoTo Resolve, a legitimate remote access tool, which is then abused by attackers for persistent access and control.

## Executive Summary
A sophisticated phishing campaign is leveraging the trusted reputation of the **[Vercel](https://vercel.com/)** cloud platform and the **[Telegram](https://telegram.org/)** messaging service to deliver a Remote Access Trojan (RAT). According to a report from **[Cloudflare](https://www.cloudflare.com/)**, attackers are hosting phishing pages on `*.vercel.app` subdomains to bypass email security gateways. The campaign uses financial-themed lures to entice victims. A key innovation is the use of a Telegram-gated mechanism, where the victim must interact with a Telegram channel or bot to download the final payload. This acts as a human-verification step, effectively evading automated analysis systems. The payload is an installer for **GoTo Resolve**, a legitimate remote access tool, which is then abused by the attackers to gain persistent control over the victim's machine.

---

## Threat Overview
The campaign, active from late 2025 to early 2026, demonstrates a growing trend of attackers abusing legitimate cloud services to enhance their operations. The attack chain is as follows:

1.  **Phishing Email**: The victim receives an email with a financial lure, such as an 'overdue invoice' or 'shipping notification'. The email contains a link to a page hosted on a `*.vercel.app` domain.
2.  **Trusted Domain Abuse**: Because `vercel.app` is a legitimate and widely used domain, the URL is less likely to be flagged as malicious by email security filters. This is an example of [`T1588.002 - Tool`](https://attack.mitre.org/techniques/T1588/002/) where attackers abuse a legitimate tool/service.
3.  **Telegram Gating**: The Vercel landing page instructs the user to join a Telegram channel or interact with a bot to receive their document. This step is crucial for evasion. Automated sandboxes and URL scanners typically do not have Telegram clients and cannot proceed past this stage.
4.  **Payload Delivery**: Once the user joins the Telegram channel, they are provided with a link to download the payload, which is the **GoTo Resolve** installer.
5.  **RAT Installation**: The user, believing they are downloading a document, installs the legitimate remote access software. The attackers, who orchestrated the setup, now have full remote access to the machine.

This multi-stage, multi-platform approach significantly increases the attack's complexity and its ability to evade detection.

---

## Technical Analysis
This campaign combines several techniques to achieve its goals:

*   **Initial Access**: [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/). The attack begins with a standard phishing email.
*   **Defense Evasion**: The use of Vercel domains is a form of Masquerading, specifically [`T1036.007 - Double File Extension`](https://attack.mitre.org/techniques/T1036/007/) at a conceptual level, by hiding behind a trusted service. The Telegram gating is a sophisticated form of [`T1480.001 - Environmental Keying`](https://attack.mitre.org/techniques/T1480/001/), as the payload is only delivered if the 'environment' (a human with a Telegram account) is correct.
*   **Command and Control**: The attackers abuse a legitimate remote access tool, **GoTo Resolve**, for C2. This is a classic Living off the Land (LotL) technique, falling under [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/). By using a legitimate, signed application, they bypass EDR/antivirus detections that look for known malicious RATs.

> The use of Telegram as a filter is a clever evolution. It forces a human interaction that automated systems cannot replicate, ensuring a higher quality of victim and a lower rate of detection for the attackers' payload infrastructure.

---

## Impact Assessment
While the initial payload is a legitimate tool, the impact is equivalent to a full RAT infection.

*   **Persistent Access**: Attackers gain persistent, on-demand remote access to the compromised system.
*   **Data Theft**: They can exfiltrate any files, documents, or credentials from the machine.
*   **Further Compromise**: The compromised machine can be used as a pivot point to attack other systems on the internal network.
*   **Spying**: Attackers can monitor user activity, log keystrokes, and capture screenshots.
*   **Ransomware Deployment**: The access could be sold to or used by ransomware groups to deploy their payloads.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| `url_pattern` | `*.vercel.app` | While many Vercel sites are legitimate, outbound traffic to newly created or suspicious-looking Vercel subdomains should be scrutinized. |
| `process_name` | `GoToResolve.exe` | The installation or execution of GoTo Resolve (or similar remote access tools like AnyDesk, TeamViewer) in an environment where it is not standard software is a major red flag. |
| `network_traffic_pattern` | `Outbound traffic to api.telegram.org` | While not inherently malicious, an employee's machine making API calls to Telegram, especially if initiated from a browser after visiting a Vercel link, could be part of this attack chain. |
| `log_source` | `Email Gateway Logs` | Hunt for emails containing `*.vercel.app` links, especially those with financial keywords like 'invoice', 'payment', or 'shipping'. |

---

## Detection & Response

*   **Application Control**: Use application allowlisting to prevent users from installing unauthorized software, including legitimate remote access tools like GoTo Resolve.
*   **Network Filtering**: Block or alert on outbound connections to `api.telegram.org` from corporate workstations if Telegram is not an approved business application. While this may have business impact, it can be effective.
*   **EDR Monitoring**: Monitor for the installation of any remote access software. Create alerts for when these tools are installed outside of a standard IT deployment process.
*   **D3FEND Techniques**: **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)** is the most effective defense here, as it would prevent the unauthorized GoTo Resolve installer from running. **[Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** can also be used to block the C2 traffic from the abused tool.

**Response**:
If an unauthorized remote access tool is found, isolate the host, uninstall the software, and investigate system logs and network traffic to determine what actions the attacker took.

---

## Mitigation

1.  **User Education**: Train users to be suspicious of emails that require them to perform unusual actions, such as joining a Telegram channel to view a document. This is a major red flag.
2.  **Restrict Software Installation**: Remove local administrator rights from standard users to prevent them from installing unauthorized applications.
3.  **Email Security**: While the attackers are attempting to bypass filters, a well-configured email gateway may still flag suspicious language or sender reputation. Implement robust anti-phishing controls.
4.  **Block Unnecessary Services**: If Telegram is not used for business purposes, consider blocking it at the network perimeter. Similarly, create policies to block other file-sharing and messaging platforms that are not sanctioned by the organization.

**Tags:** Phishing, RAT, Evasion, Vercel, Telegram, GoTo Resolve, Living off the Land

## Sources
- [ThreatsDay Bulletin: New RCEs, Darknet Busts, Kernel Bugs & 25+ More Stories](https://thehackernews.com/2026/01/threatsday-bulletin-new-rces-darknet.html) — The Hacker News (2026-01-29)
- [Cloudflare ThreatsDay Bulletin January 2026](https://www.cloudflare.com/learning/security/threats/threats-day-january-2026/) — Cloudflare (2026-01-29)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-uses-vercel-domains-and-telegram-to-deliver-rat/
