# 19 Malicious Chrome & Edge Extensions Caught Stealing Crypto Wallets

**Severity:** high | **Category:** Malware,Phishing,Cloud Security | **Updated:** 2026-08-31 | **Reading time:** 5 min

A large-scale malware campaign dubbed 'Superior' has been uncovered, involving 19 malicious browser extensions for Google Chrome and Microsoft Edge. These extensions, some with tens of thousands of users, were designed to steal cryptocurrency wallet secrets, credentials for exchanges like Binance and Coinbase, and other sensitive data. The threat actors either published new extensions or pushed malicious updates to existing, trusted ones.

## Executive Summary
Security researchers have identified a coordinated malware campaign, tracked as "Superior," involving 18 **[Google Chrome](https://www.google.com/chrome/)** extensions and one **[Microsoft Edge](https://www.microsoft.com/en-us/edge)** extension. Active since at least February 2024, this campaign aimed to steal cryptocurrency assets and user credentials on a large scale. The threat actors employed a dual strategy: creating new, seemingly benign extensions and compromising existing popular extensions to push malicious updates to a pre-existing user base. The most popular extension, "Enable Right Click & Copy — Smart Unlock + OCR," had amassed around 80,000 users. The extensions deployed a modular payload capable of draining crypto wallets, harvesting hardware wallet seed phrases, and stealing credentials for major crypto exchanges.

---

## Threat Overview
The "Superior" campaign represents a significant supply chain threat within the browser extension ecosystem. By either creating new extensions or buying and updating legitimate ones, the attackers bypassed initial user skepticism. Once installed, the extensions used a modular framework to deploy various malicious payloads. The primary targets were users of cryptocurrency.

Key payloads included:
- A multi-chain wallet drainer targeting EVM-compatible (e.g., Ethereum), Solana, and Tron wallets.
- A hardware wallet seed phrase harvester that presented fake recovery pages mimicking **Ledger** and **Trezor** interfaces.
- Credential stealers for major cryptocurrency exchanges, including **Binance**, **Coinbase**, and **Kraken**.
- Modules for stealing Facebook and LinkedIn session cookies and exfiltrating browser history.

## Technical Analysis
The malware's sophistication lies in its ability to bypass web security controls and maintain persistence.

1.  **Initial Access & Persistence**: Users install the malicious extension from the official Chrome or Edge web stores, believing it to be legitimate. This corresponds to [`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/). The extension persists within the browser, executing whenever the browser is active.
2.  **Defense Evasion**: A key technique was the removal of a website's Content Security Policy (CSP) headers. This allows the extension to inject arbitrary, malicious JavaScript into any webpage the user visits, a form of [`T1185 - Browser Session Hijacking`](https://attack.mitre.org/techniques/T1185/).
3.  **Command and Control**: The extensions established a persistent WebSocket connection to a C2 server. This allows for real-time, bidirectional communication, enabling the exfiltration of stolen data and the delivery of new commands or payloads, mapping to [`T1572 - Protocol Tunneling`](https://attack.mitre.org/techniques/T1572/).
4.  **Credential Access & Collection**: The injected scripts were responsible for various forms of theft. They could capture form data as it was entered ([`T1056.001 - Keylogging`](https://attack.mitre.org/techniques/T1056/001/)), present fake login/recovery pages to harvest credentials, and steal session cookies to take over active user sessions.

> The abuse of the extension update mechanism is particularly dangerous, as it turns a trusted application into a weapon against its existing user base, who are unlikely to scrutinize a routine update.

## Impact Assessment
The direct impact is financial loss for victims whose cryptocurrency wallets were drained or whose exchange accounts were compromised. The theft of hardware wallet seed phrases is particularly devastating, as it gives attackers permanent access to all assets secured by that phrase. Beyond crypto, the theft of social media credentials and browser history exposes victims to identity theft, blackmail, and further targeted attacks. The campaign erodes trust in the browser extension model, a critical component of the modern web experience.

## IOCs — Directly from Articles
While specific C2 domains were not listed, the name of the most prominent malicious extension was provided:

- `Enable Right Click & Copy — Smart Unlock + OCR`

## Cyber Observables — Hunting Hints
Security teams and advanced users can hunt for signs of such malicious extensions:

| Type | Value | Description |
|---|---|---|
| Network Traffic Pattern | Persistent WebSocket connections to unknown domains | Malicious extensions often maintain a constant C2 connection via WebSockets. |
| Browser Behavior | Disabled Content Security Policy (CSP) | Check browser developer tools to see if CSP headers are being unexpectedly stripped from websites. |
| File Path | `~/.config/google-chrome/Default/Extensions/` | Monitor for newly installed or modified browser extension files in user profiles. |
| API Endpoint | `chrome.webRequest.onHeadersReceived` | Extensions using this API with `blocking` permissions can modify security headers like CSP. |

## Detection & Response
- **Endpoint Monitoring**: Use EDR or advanced endpoint tools to monitor network connections originating from browser processes. Alert on persistent WebSocket connections to newly observed or untrusted domains.
- **Extension Auditing**: For enterprise environments, periodically audit installed browser extensions. Use tools that can analyze extension permissions and identify those requesting excessive rights (e.g., access to all websites, ability to modify requests).
- **User Reporting**: Encourage users to report any suspicious browser behavior, such as unexpected pop-ups on trusted sites or prompts for wallet recovery phrases outside of the hardware wallet's official application.

## Mitigation
- **D3FEND: Executable Allowlisting (D3-EAL)**: In corporate environments, use browser management policies to create an allowlist of approved extensions, preventing users from installing unvetted ones. This is a direct countermeasure against [`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/).
- **User Education**: Train users to be skeptical of extensions, even those in official stores. Teach them to review permissions before installation and to be wary of extensions that require access to all website data.
- **Principle of Least Privilege**: Users should regularly review and remove any extensions they no longer use. When installing new extensions, they should question why an extension needs the permissions it requests.

**Tags:** Malware, Browser Extension, Chrome, Edge, Cryptocurrency, Credential Theft, Wallet Drainer

## Sources
- [19 Chrome and Edge Extensions Found With Wallet-Stealing and Crypto-Draining Code](https://thehackernews.com/2026/08/19-chrome-and-edge-extensions-found.html) — The Hacker News (2026-08-28)
- [19 Chrome and Edge extensions caught harvesting crypto wallet seeds](https://cyberinsider.com/19-chrome-and-edge-extensions-caught-harvesting-crypto-wallet-seeds/) — Cyber Insider (2026-08-28)
- [19 Chrome and Edge Extensions Deliver a Wallet Drainer and Credential-Stealing Payloads](https://daily.dev/posts/19-chrome-and-edge-extensions-deliver-a-wallet-drainer-and-credential-stealing-payloads-jdmspmwbi) — daily.dev (2026-08-27)
- [19 Chrome and Edge Extensions Deliver a Wallet Drainer and Credential-Stealing Payloads](https://socket.dev/blog/chrome-edge-extension-wallet-drainer) — Socket (2026-08-27)
- [Chrome Extensions Caught Stealing Crypto Wallets](https://es.tradingview.com/news/u_today:461838749094b:0-chrome-extensions-caught-stealing-crypto-wallets/) — TradingView (2026-08-28)

---
Source: https://cyber.netsecops.io/articles/malicious-browser-extensions-steal-crypto-wallets-and-credentials/
