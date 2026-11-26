# New 'Wazza' Phishkit Uses Advanced Evasion to Target Global Orgs

**Severity:** medium | **Category:** Phishing,Malware | **Updated:** 2026-10-08 | **Reading time:** 5 min

A new and sophisticated phishing kit dubbed 'Wazza' is targeting banking, manufacturing, and government organizations in the US, Europe, and Australia. According to researchers at ANY.RUN, the kit uses a multi-stage routing chain to filter out security scanners, sandboxes, and other automated traffic. This ensures the final phishing page, typically an Adobe-themed lure for Device Code phishing, is only delivered to intended human victims. This advanced evasion complicates detection and increases the workload for security analysts.

## Executive Summary
Security researchers at **ANY.RUN** have discovered a new and sophisticated phishing kit named **Wazza**. This kit is being used in campaigns targeting a wide range of sectors, including banking, manufacturing, and government, with victims identified in the United States, Europe, and Australia. The **Wazza** phishkit distinguishes itself with advanced evasion capabilities, primarily a multi-stage routing infrastructure designed to filter out automated analysis systems. By weeding out security scanners and sandboxes, the attackers ensure their final phishing page is only presented to legitimate human targets, significantly increasing the campaign's effectiveness and complicating detection efforts for security teams.

## Threat Overview
The **Wazza** phishing campaign begins with a standard phishing email. However, the link within the email does not lead directly to the final phishing page. Instead, it directs the victim into a multi-stage routing chain. Each stage in this chain performs checks on the visitor to determine if they are a human using a standard browser or an automated tool.

### Evasion and Filtering
This routing and filtering mechanism is the core of the kit's sophistication. It is designed to identify and block:
*   Security vendor crawlers
*   Automated sandboxes
*   Traffic from VPNs or datacenter IP ranges
*   Non-standard user agents

If a visitor is flagged as non-human or suspicious, they are redirected to a benign page or a dead end. Only visitors who pass all checks are routed to the final malicious payload: an **[Adobe](https://www.adobe.com/)**-themed Device Code phishing page. This type of page is designed to trick the user into authorizing a malicious application to access their account, a technique often used to bypass MFA.

## Technical Analysis
The multi-stage architecture provides several advantages to the attacker:
1.  **Evasion**: It effectively hides the final phishing page from security tools, preventing the malicious domain from being quickly blocklisted.
2.  **Longevity**: By evading detection, the phishing infrastructure can remain operational for longer periods.
3.  **Analyst Frustration**: It significantly increases the time and effort required for security analysts to investigate an alert. An analyst or an automated tool visiting the initial link will not see the malicious content, potentially leading them to dismiss the alert as a false positive. Manual, careful reproduction of a real user's environment is required to trace the full attack chain.

The infrastructure itself, with its multiple domains and endpoints used in the routing chain, provides defenders with additional indicators of compromise (IOCs) if they can successfully trace it.

### MITRE ATT&CK Techniques
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The initial access vector is a link delivered via email.
*   [`T1598.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/002/): The multi-stage routing chain is a form of defense evasion that makes the link appear benign to automated systems.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The ultimate goal of the campaign is to trick users into providing credentials or authorizing device codes to take over their accounts.
*   [`T1649 - Steal or Forge Authentication Tokens`](https://attack.mitre.org/techniques/T1649/): Device Code phishing is specifically designed to steal authentication tokens.

## Impact Assessment
The **Wazza** phishkit poses a significant threat due to its ability to bypass common automated security defenses. This leads to a higher success rate for the phishing emails that reach user inboxes. For the targeted sectors—banking, manufacturing, and government—a successful attack could lead to financial theft, data breaches, and compromise of sensitive government systems. The increased workload on security operations centers (SOCs) and Managed Security Service Providers (MSSPs) is also a notable impact. Analysts must spend more time on each phishing alert, which can lead to burnout and slower response times across the board.

## IOCs — Directly from Articles
No specific indicators of compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect multi-stage phishing like the **Wazza** kit, analysts should look for:

| Type | Value | Description |
|---|---|---|
| URL Pattern | Multiple rapid HTTP redirects (301/302) | A chain of redirects originating from an email link is a common pattern for this type of evasion. |
| Log Source | `Web Proxy / DNS Logs` | Correlate email link clicks with subsequent DNS queries and web requests to identify the full redirection chain. |
| URL Pattern | URLs containing long, randomized query strings | These are often used as session identifiers to track a victim through the filtering stages. |
| Other | Discrepancy in content | A discrepancy between what an automated sandbox sees and what is reported by a user is a strong indicator of an evasive threat. |

## Detection & Response
**Detection**:
1.  **Advanced Email Security**: Use email security gateways with sandboxing capabilities that can attempt to mimic real user behavior to follow redirection chains. (D3FEND: [`D3-DA: Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis))
2.  **Browser Isolation**: Remote Browser Isolation (RBI) technology can render the phishing site in a remote, disposable container, protecting the user from the malicious content regardless of evasion.
3.  **URL Analysis at Click-Time**: Utilize security solutions that re-evaluate the URL's reputation at the time of the user's click, rather than just at the time of email delivery. (D3FEND: [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis))

**Response**:
1.  **Block Infrastructure**: Once the full redirection chain is identified, block all associated domains and IPs at the firewall and web filter.
2.  **User Account Reset**: If a user has interacted with the final phishing page, assume their account is compromised. Revoke active sessions and force a password reset.
3.  **Hunt for Similar IOCs**: Use the identified domains and IPs to hunt for other potential victims within the organization.

## Mitigation
*   **User Training**: Continuously train users to be suspicious of unexpected emails, especially those prompting for login or device authorization. Emphasize that even legitimate-looking services like Adobe can be impersonated.
*   **Phishing-Resistant MFA**: Implement FIDO2/WebAuthn as it is resistant to most forms of phishing, including credential and token theft.
*   **Restrict OAuth Applications**: Configure identity providers to block users from consenting to new or unverified third-party applications, which is a common goal of Device Code phishing.

**Tags:** phishing, wazza, phishkit, evasion, any.run, device code

## Sources
- [Wazza Phishkit Targets Banking, Government, and Manufacturing Across the US, EU, and Australia](https://thehackernews.com/2026/10/wazza-phishkit-targets-banking.html) — The Hacker News (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/wazza-phishkit-targets-banking-and-government-with-advanced-evasion/
