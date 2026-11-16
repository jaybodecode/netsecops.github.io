# New CSS Attacks Bypass Webmail Defenses to Steal Credentials, Tokens

**Severity:** medium | **Category:** Vulnerability,Threat Intelligence | **Updated:** 2026-08-09 | **Reading time:** 4 min

Research presented at Black Hat USA 2026 reveals a new class of attacks using Cascading Style Sheets (CSS) to compromise major webmail platforms like Outlook and Gmail. The technique allows a specially crafted HTML email to break out of its security sandbox and interact with the trusted webmail UI. This can be used to capture passwords, exfiltrate sensitive tokens, hijack UI elements, and manipulate connected AI assistants, all without using JavaScript.

## Executive Summary

At the Black Hat USA 2026 conference, PortSwigger researcher Gareth Heyes unveiled a novel and alarming class of attacks that leverage Cascading Style Sheets (CSS) to break the security boundaries of major webmail services. The research demonstrates that a malicious HTML email can escape its container and manipulate the trusted user interface of webmail clients like **[Microsoft](https://www.microsoft.com/security)** Outlook and **[Google](https://www.google.com)** Gmail. These attacks, which do not rely on JavaScript, can be used to create convincing phishing overlays to steal passwords, exfiltrate API tokens, and hijack UI elements, including those for integrated AI assistants. The findings challenge the long-held assumption that sanitized CSS is safe and highlight fundamental flaws in how many webmail clients render untrusted content.

## Vulnerability Details

*   **Vulnerability Type:** CSS Injection / Sandbox Escape
*   **Attack Vector:** Maliciously crafted HTML email
*   **Prerequisites:** Victim must open the malicious email in a vulnerable webmail client.
*   **Impact:** Credential theft, token exfiltration, UI redressing, session hijacking.

The core of the attack lies in the gap between the CSS properties that a webmail's sanitizer allows and how a modern web browser actually interprets and renders those properties. Attackers can abuse legitimate, 'allow-listed' CSS features to cause content within the email body to be rendered outside of its intended boundaries, overlaying the trusted webmail UI.

For example, an attacker could use CSS properties like `position: fixed` combined with other tricks to place a fake password input field directly over the legitimate webmail interface. When the user interacts with what they believe is a legitimate prompt, they are actually typing their credentials into the attacker's form within the email.

## Affected Systems

The research demonstrated successful attacks against a wide array of popular webmail services, indicating a systemic problem rather than a single vendor issue.

*   **[Microsoft Outlook](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook)**
*   **[Gmail](https://mail.google.com/)**
*   **Fastmail**
*   **[Proton Mail](https://proton.me/mail)**
*   **[Yahoo Mail](https://mail.yahoo.com/)**
*   **AOL Mail**

## Exploitation Status

This is security research presented at a conference, not evidence of active in-the-wild exploitation. However, with the public disclosure of these techniques, it is highly probable that threat actors will attempt to replicate and weaponize them for phishing and credential theft campaigns.

### Proof-of-Concept Attacks:
*   **Outlook Password Theft:** A demonstration against Outlook on Firefox showed an attack that spoofed a Microsoft sign-in screen, capturing the victim's password and exfiltrating it.
*   **Gmail/Claude Token Theft:** Another PoC showed how an email could manipulate the UI of a Gmail integration with Anthropic's Claude AI to trick the user into leaking a Slack token.

These attacks represent a significant evolution of phishing, moving beyond simple fake login pages to interactive attacks within the trusted context of the user's own inbox.

## Impact Assessment

The impact of these techniques, if widely adopted by attackers, would be substantial. They undermine a fundamental security assumption of webmail clients. Users are trained to trust the UI of their email provider (the buttons, links, and prompts outside the email body). By allowing malicious content to break out and overlay this trusted UI, these attacks can create phishing lures that are nearly indistinguishable from legitimate requests. This could lead to a significant increase in successful credential theft, account takeovers, and the compromise of data from services connected to the email account.

## Cyber Observables — Hunting Hints

Detecting these attacks from a user or SOC perspective is extremely difficult, as they are designed to look legitimate. Defense must primarily come from the webmail providers themselves.

| Type | Value | Description |
|---|---|---|
| other | Emails with unusually complex or large CSS blocks | While not a definitive indicator, emails with extensive or obfuscated stylesheets could be suspicious. |
| other | UI elements that behave unexpectedly or seem out of place | Users should be suspicious of any login prompts or pop-ups that appear within the webmail interface after opening an email. |

## Detection & Response

Detection for end-users is challenging. The primary advice is user awareness:

*   **Be Suspicious of In-App Prompts:** Treat any unexpected password prompts, login requests, or permission pop-ups that appear immediately after opening an email with extreme suspicion, even if they look like they are part of the webmail interface.
*   **Use a Password Manager:** A password manager will not auto-fill credentials into a fake form, which can be a strong signal that something is wrong.

For webmail providers, detection involves re-evaluating their sanitization process. This includes **[Static Analysis (D3-SA)](https://d3fend.mitre.org/technique/d3f:StaticAnalysis)** of incoming HTML/CSS to identify potentially dangerous patterns that current sanitizers might miss.

## Remediation Steps

The researcher, Gareth Heyes, provided several recommendations for webmail providers to remediate these flaws:

1.  **Use Sandboxed iframes ([M1048](https://attack.mitre.org/mitigations/M1048/)):** The most robust solution is to render the entire email body inside a sandboxed `<iframe>`. The `sandbox` attribute can be used to disable scripting, prevent top-level navigation, and block other dangerous capabilities, creating a much stronger security boundary.
2.  **Stricter CSS Sanitization:** Re-evaluate and tighten the CSS allow-list. Remove any properties that can be abused to affect layout outside the email's container. This is a complex task, as many properties can be combined in unexpected ways.
3.  **Content Security Policy (CSP):** Implement a strict CSP on the webmail application to help mitigate the impact of any content that does manage to escape its sandbox.

For users, there is no direct remediation other than remaining vigilant and waiting for providers to patch their services.

**Tags:** CSS, Webmail, Black Hat, Phishing, Credential Theft, UI Redressing

## Sources
- [New CSS Attacks Can Break Webmail Defenses to Steal Passwords and Tokens](https://thehackernews.com/2026/08/new-css-attacks-can-break-webmail.html) — The Hacker News (2026-08-08)
- [Webmail CSS Attacks Expose a New Risk for AI-Powered Email Tools](https://securityaffairs.com/196899/hacking/webmail-css-attacks-expose-a-new-risk-for-ai-powered-email-tools.html) — Security Affairs
- [New CSS Attacks Expose Major Webmail Flaws at Black Hat](https://jqjo.com/2026-08-08/us/technology/en/New-CSS-Attacks-Expose-Major-Webmail-Flaws-at-Black-Hat/1334788)
- [New CSS Attacks Can Break Webmail Defenses to Steal Passwords and Tokens](https://www.reddit.com/r/SecOpsDaily/comments/1vis4bd/new_css_attacks_can_break_webmail_defenses_to/) — Reddit

---
Source: https://cyber.netsecops.io/articles/novel-css-attacks-on-webmail-services-unveiled-at-black-hat-usa/
