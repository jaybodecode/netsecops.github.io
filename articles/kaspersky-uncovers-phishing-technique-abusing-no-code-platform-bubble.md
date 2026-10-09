# Phishers Abuse No-Code Platform 'Bubble' to Bypass Email Security Filters

**Severity:** medium | **Category:** Phishing,Threat Intelligence,Cloud Security | **Updated:** 2026-04-01 | **Reading time:** 5 min

Security researchers at Kaspersky have identified a novel phishing technique that abuses the legitimate no-code development platform, Bubble.io. Attackers are creating malicious web applications on the platform that act as redirectors. Because these apps are hosted on Bubble's trusted domain (*.bubble.io), they are more likely to bypass email security filters that block links to known malicious sites. Phishing emails, often targeting Microsoft 365 users, contain a link to the Bubble-hosted app, which then forwards the victim to a credential harvesting page. This 'trust abuse' tactic makes it harder for both users and automated defenses to spot the attack, and is expected to be adopted by Phishing-as-a-Service (PhaaS) operators.

## Executive Summary
Cybercriminals are exploiting the legitimate no-code platform **[Bubble.io](https://bubble.io/)** to create malicious applications that serve as redirectors in sophisticated phishing campaigns. According to research from **[Kaspersky](https://www.kaspersky.com)**, this technique allows attackers to host their initial phishing link on a trusted domain (`*.bubble.io`), significantly increasing the likelihood of bypassing email security gateways. The phishing emails typically impersonate well-known services like **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)**, luring victims to click a link that leads to the Bubble-hosted application. This app then silently redirects the user to a final credential harvesting page. This abuse of a legitimate platform's reputation represents a growing trend in phishing and is difficult to defend against, as blocking the entire `bubble.io` domain would disrupt legitimate business applications.

---

## Threat Overview
This phishing technique is a form of 'trust abuse'. Attackers are not hacking Bubble's platform; they are using its features as intended to build a simple application. However, the application's sole purpose is malicious. The attack chain is as follows:

1.  **Email Delivery:** A user receives a phishing email, often appearing as a notification from Microsoft 365, with a call to action (e.g., 'Review Document', 'Verify Account').
2.  **Initial Click:** The link in the email points to a URL like `[malicious-app-name].bubble.io`.
3.  **Redirection:** Because `bubble.io` is a reputable domain, email filters are less likely to block the link. When the user visits the page, the Bubble-hosted app uses JavaScript or an HTML meta refresh to automatically redirect the browser to a different, attacker-controlled website.
4.  **Credential Harvesting:** The final destination is a pixel-perfect replica of a legitimate login page (e.g., Microsoft 365). The user, having been passed through a trusted domain, may be less suspicious and enter their credentials, which are then captured by the attacker.

This method is an evolution of open redirect abuse and is particularly effective against security solutions that rely heavily on domain reputation for filtering.

## Technical Analysis
The core of the technique is the abuse of the platform's functionality. Attackers sign up for a Bubble account and create a one-page application. Within this page, they embed a simple piece of JavaScript code or an HTML tag to perform the redirection. 

Example JavaScript for redirection:
```javascript
window.location.replace("http://malicious-phishing-site.com");
```

This is a classic example of [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/) combined with [`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/). The use of a legitimate service as an intermediary is a defense evasion technique ([`T1127.001 - Trusted Developer Utilities Proxy Execution`](https://attack.mitre.org/techniques/T1127/001/)). Kaspersky researchers note that this tactic will likely be integrated into Phishing-as-a-Service (PhaaS) kits, which would automate the creation of these Bubble redirector apps and scale the attack to a massive level.

## Impact Assessment
*   **Increased Phishing Success Rate:** By bypassing automated filters, more phishing emails reach user inboxes, increasing the chances of a successful compromise.
*   **Credential Theft:** The primary impact is the theft of user credentials, particularly for high-value targets like Microsoft 365 accounts, which can lead to Business Email Compromise (BEC), data breaches, and further internal phishing.
*   **MFA Bypass:** Many PhaaS kits that could adopt this technique also include Adversary-in-the-Middle (AiTM) capabilities to steal session cookies and bypass multi-factor authentication.
*   **Damage to Platform Reputation:** Legitimate platforms like Bubble suffer reputational damage when their services are abused for malicious purposes, and they must expend resources to identify and shut down the malicious applications.

## Cyber Observables for Detection
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| url_pattern | `*.bubble.io` | While not inherently malicious, a sudden influx of emails with links to this domain could be an indicator of a campaign. | Email gateway logs, web proxy logs. | low |
| log_source | `Web Proxy Logs` | Look for a pattern of users being quickly redirected from a `bubble.io` URL to a completely different, often newly registered, domain. | SIEM correlation of proxy logs. | medium |
| string_pattern | `window.location.replace` | In an email context, URLs that lead to pages with immediate JavaScript redirects are suspicious. | Advanced email sandboxing, URL analysis tools. | high |

## Detection & Response
1.  **URL Analysis:** Use email security solutions that can 'detonate' URLs in a sandbox to follow the full redirect chain and analyze the final landing page for phishing indicators. Simple domain reputation is not enough.
2.  **User Training:** This is a critical defense. Train users to be suspicious of any login request and to manually verify the domain in the address bar of the final login page before entering credentials. They should be taught that even if the initial link seems legitimate, the final destination is what matters.
3.  **Report Abuse:** Security teams and users should report malicious Bubble applications to the platform so they can be taken down.

## Mitigation
*   **Enhanced Email Security:** Deploy advanced email security solutions that perform deep URL analysis and sandboxing, rather than just relying on blocklists. This aligns with [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis).
*   **Phishing-Resistant MFA:** The most effective technical control against credential phishing is the use of phishing-resistant MFA, such as FIDO2 security keys. This prevents credential theft even if a user is tricked into visiting the malicious site ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
*   **Browser Security:** Use browser security extensions or DNS filtering services that maintain blocklists of known phishing landing pages, providing a last line of defense if the user clicks the link.
*   **User Awareness:** Continuously train users on how to spot phishing attacks, emphasizing the importance of checking the final URL before entering credentials and being wary of unexpected requests.

**Tags:** Phishing, Kaspersky, Bubble.io, Microsoft 365, Credential Harvesting, Trust Abuse, PhaaS

## Sources
- [Kaspersky Warns of a New Phishing Technique](https://www.itnewsafrica.com/2026/04/kaspersky-warns-of-a-new-phishing-technique/) — IT News Africa (2026-04-01)
- [This popular app builder is being abused to trick users - here's what we know](https://www.techradar.com/pro/security/this-popular-app-builder-is-being-abused-to-trick-users-heres-what-we-know) — TechRadar Pro (2026-03-31)
- [Bubble's role in phishing scams](https://www.kaspersky.com/blog/bubble-phishing-scams/49887/) — Kaspersky (2026-03-31)
- [Risky Biz News: Russia to use custom crypto-algorithm for its 5G network](https://riskybiznews.substack.com/p/risky-biz-news-russia-to-use-custom) — Risky Biz News (2026-03-31)

---
Source: https://cyber.netsecops.io/articles/kaspersky-uncovers-phishing-technique-abusing-no-code-platform-bubble/
