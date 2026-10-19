# Warning: Malicious ChatGPT Chrome Extensions Steal Session Tokens to Hijack Accounts

**Severity:** medium | **Category:** Malware,Phishing,Cloud Security | **Updated:** 2026-02-02 | **Reading time:** 4 min

Researchers have identified 16 malicious Google Chrome extensions that masquerade as helpful tools for OpenAI's ChatGPT. Once installed, these extensions inject malicious scripts into the ChatGPT web application. The scripts are designed to monitor outbound requests, intercept sensitive data such as authorization details and session tokens, and exfiltrate them to an attacker-controlled server. This allows the attackers to hijack active user sessions, granting them full access to the victim's account and chat history.

## Executive Summary
Security researchers have discovered a malicious campaign targeting users of **[OpenAI's](https://openai.com/)** **[ChatGPT](https://chat.openai.com/)** service through deceptive **[Google Chrome](https://www.google.com/chrome/)** extensions. At least 16 extensions, advertised as legitimate enhancers for ChatGPT, were found to contain malicious code. Upon installation, these extensions inject scripts into the ChatGPT web interface to steal user session tokens and authorization details. This information enables attackers to hijack user sessions, providing them with complete access to the victim's account, including their entire chat history. This could lead to the exposure of sensitive personal or corporate information that users may have discussed with the AI. The incident underscores the security risks associated with browser extensions and the need for user vigilance.

## Threat Overview
The attack preys on the popularity of ChatGPT and the desire of users to enhance its functionality. Attackers publish extensions on the Chrome Web Store that promise useful features but secretly harbor malicious intent. The core of the attack is the abuse of the permissive security model for browser extensions, which often allows them to read and modify data on websites the user visits. In this case, the extensions specifically target `chat.openai.com`.

## Technical Analysis
The attack mechanism is a form of session hijacking facilitated by a malicious browser extension.

1.  **Distribution**: The malicious extensions are distributed via the Google Chrome Web Store, often mimicking the functionality of legitimate tools. This initial step relies on social engineering to convince users to install the extension.
2.  **Execution**: Once installed, the extension uses its permissions to inject a malicious JavaScript payload into the ChatGPT web application. This is a primary function of [`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/).
3.  **Credential Access**: The injected script monitors the web page's activity, specifically looking for authorization data in HTTP requests or local storage. It intercepts the user's session token, which is used by the browser to maintain an authenticated session with the ChatGPT server. This is a form of [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/).
4.  **Exfiltration**: The stolen session token and other authorization details are then sent to a remote server controlled by the attacker ([`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/)).
5.  **Impersonation**: With the session token, the attacker can now make requests to the ChatGPT API as the victim, effectively hijacking their session and gaining access to all their data.

## Impact Assessment
The impact of a hijacked ChatGPT session can be severe. Many users input sensitive, confidential, or proprietary information into ChatGPT, including source code, business plans, personal identifiable information (PII), and internal company documents. An attacker with access to this chat history could leverage it for extortion, corporate espionage, or identity theft. They could also continue the conversations as the user, potentially tricking the user's colleagues or contacts. The breach of privacy is significant, and for corporate users, it could represent a major data leak.

## Cyber Observables for Detection
*   **Extension Audit**: The primary observable is the presence of one of the 16 known malicious extensions installed in the browser.
*   **Network Traffic**: Anomalous outbound network requests from the `chat.openai.com` web page to unknown domains could indicate data exfiltration by a malicious script.
*   **Account Activity**: Unusual activity in the user's ChatGPT account, such as new chats they don't recognize, could be a sign of a hijacked session.

## Detection & Response
1.  **Review Browser Extensions**: All users, especially those who use ChatGPT, should immediately audit their installed Chrome extensions. Navigate to `chrome://extensions`, carefully review each extension and its permissions, and remove any that are unfamiliar, unnecessary, or overly permissive.
2.  **Monitor for Malicious Extensions**: Enterprise security teams can use browser management tools or EDR solutions to get an inventory of installed extensions across their fleet and compare it against a blocklist of known malicious extension IDs.
3.  **Log Out of Sessions**: If a user suspects their session may have been hijacked, they should immediately log out of their OpenAI account on all devices. This will invalidate the existing session tokens, including any that may have been stolen.
4.  **Review Account History**: Users should review their ChatGPT chat history for any conversations they did not initiate.

## Mitigation
1.  **Limit Extension Installation**: Be highly selective about installing browser extensions. Only install extensions from well-known, reputable developers. Read reviews and carefully check the requested permissions before installation ([`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/)).
2.  **Principle of Least Privilege**: When installing an extension, check if it asks for permissions that seem excessive for its stated function (e.g., a simple color-changing extension should not need to read data on all websites).
3.  **Corporate Policy**: Enterprises should establish a policy that either blocks the installation of all browser extensions by default or only allows installation from a pre-approved allowlist.
4.  **Data Minimization**: Treat AI chatbots like any other public cloud service. Avoid inputting highly sensitive or confidential information that could cause significant damage if exposed ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).

**Tags:** browser extension, session hijacking, ChatGPT, data theft, Chrome, malware

## Sources
- [2nd February – Threat Intelligence Report](https://research.checkpoint.com/2026/02/02/2nd-february-threat-intelligence-report/) — Check Point Research (2026-02-02)
- [Malwarebytes Makes ChatGPT Smarter About Scams, Malware and Online Risk](https://www.malwarebytes.com/blog/news/2026/02/malwarebytes-makes-chatgpt-smarter-about-scams-malware-and-online-risk) — Malwarebytes (2026-02-02)

---
Source: https://cyber.netsecops.io/articles/malicious-chatgpt-chrome-extensions-hijack-user-sessions/
