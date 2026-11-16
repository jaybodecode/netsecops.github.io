# 26 Malicious 'FakeWallet' Crypto Apps Found on Apple App Store, Stealing Seed Phrases

**Severity:** high | **Category:** Malware,Mobile Security,Phishing | **Updated:** 2026-04-25 | **Reading time:** 6 min

A coordinated malware campaign dubbed "FakeWallet" has been discovered on Apple's official App Store, involving 26 fraudulent applications that impersonated popular cryptocurrency wallets. Active since at least fall 2025, these malicious apps were designed to steal users' sensitive recovery phrases, seed phrases, and private keys. The campaign primarily targeted users in China, where many legitimate wallet apps are restricted, but posed a global risk. The apps, which mimicked well-known wallets like MetaMask and Coinbase, have since been removed by Apple following disclosure from Kaspersky researchers.

## Executive Summary

Security researchers at **[Kaspersky](https://www.kaspersky.com)** have uncovered a significant malware campaign on **[Apple](https://www.apple.com/)**'s App Store, identifying 26 malicious applications collectively known as **FakeWallet**. These apps successfully bypassed Apple's review process and were available for download since at least the fall of 2025. The apps were designed to impersonate legitimate, popular cryptocurrency wallets such as **[MetaMask](https://metamask.io/)**, **[Coinbase](https://www.coinbase.com/)**, and Trust Wallet. Their sole purpose was to deceive users into entering their recovery phrases or private keys, which were then exfiltrated to attacker-controlled servers, giving the criminals full control over the victims' crypto assets. While the campaign appeared to focus on the Chinese market, the apps were globally available. Apple has since removed the fraudulent applications.

---

## Threat Overview

The FakeWallet campaign represents a sophisticated effort to abuse the trust users place in the official App Store ecosystem. The threat actors created applications that closely mimicked the branding and user interface of well-known crypto wallets, including **[Bitpie](https://bitpie.com/)**, **[TokenPocket](https://www.tokenpocket.pro/)**, and **[Ledger](https://www.ledger.com/)**.

The campaign was particularly effective in China, where government restrictions prevent many official crypto wallet apps from being listed on the regional App Store. This created a demand vacuum that the attackers exploited. According to researchers, upon launch, some of the fake apps would redirect users to web pages that appeared to be part of the App Store but instead distributed trojanized versions of the wallet software.

The core malicious functionality involved intercepting the user's secret recovery phrase or private key during the wallet import or creation process. Once this sensitive data was captured, it was sent to the attackers, allowing them to drain the associated wallets of all funds.

---

## Technical Analysis

The FakeWallet campaign employed several techniques to achieve its goals and evade detection:

1.  **Masquerading:** The primary technique was masquerading ([`T1036 - Masquerading`](https://attack.mitre.org/techniques/T1036/)), where the malicious apps used icons, names, and descriptions nearly identical to their legitimate counterparts to fool users.
2.  **Malicious App Delivery:** The attackers successfully delivered a malicious application via a legitimate app store, a technique tracked as [`T1476 - Deliver Malicious App via Other Means`](https://attack.mitre.org/techniques/T1476/). This bypass of Apple's vetting process is a significant component of the campaign's success.
3.  **Credential Theft:** The core of the attack is stealing the application access token, in this case, the crypto wallet's seed phrase, which is a form of [`T1644 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1644/). The apps presented a seemingly legitimate interface for importing an existing wallet, which was simply a form to capture and exfiltrate the user's secrets.
4.  **Social Engineering:** The campaign relied on social engineering ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) by exploiting user trust in the App Store and their desire to access popular but regionally unavailable applications.

> This incident serves as a stark reminder that no app store is completely immune to malicious applications. The curation and review process is a significant deterrent, but determined attackers can still find ways to circumvent it.

---

## Impact Assessment

The direct impact on victims is the total and irreversible loss of their cryptocurrency assets. Once a private key or seed phrase is compromised, the attacker has complete control and can transfer all funds to their own wallets. The broader impact includes a significant erosion of trust in the security of mobile app ecosystems, even highly curated ones like Apple's App Store. It highlights the persistent risk to cryptocurrency users and the need for extreme caution when managing digital assets on mobile devices. For Apple, it represents a reputational blow and may lead to a re-evaluation of its app review policies, especially for financial and cryptocurrency-related applications.

---

## IOCs — Directly from Articles

While 26 specific apps were identified, their names were not listed in the provided source articles.

---

## Cyber Observables — Hunting Hints

Users can hunt for these types of malicious apps with the following methods:

| Type | Value | Description |
|---|---|---|
| other | `Developer Name Mismatch` | When searching for a popular wallet, check if the developer name matches the official company. Scammers often use generic or misspelled developer names. |
| other | `Low Review Count / Fake Reviews` | Malicious apps may have very few reviews or a cluster of generic, five-star reviews posted around the same time. |
| url_pattern | `Redirects outside App Store` | Be suspicious if an app, after installation, immediately tries to open a web browser to a page that asks for downloads or sensitive information. |

---

## Detection & Response

For users, detection is primarily a manual process of vigilance before downloading.
*   **Verify the Developer:** Always check the developer name listed under the app title and ensure it is the official creator of the wallet (e.g., 'MetaMask' should be from 'ConsenSys Software Inc.').
*   **Check the Official Website:** Legitimate crypto projects will always link to their official mobile apps from their website. Use this as the authoritative source rather than searching the App Store directly.
*   **Review Scrutiny:** Read reviews carefully, looking for reports of theft or suspicious behavior.

Apple has already responded by removing the 26 identified apps from the App Store. Users who have downloaded any suspicious wallet app should immediately transfer any funds to a new, secure wallet (preferably a hardware wallet) whose seed phrase has never been entered digitally, and then delete the malicious app.

---

## Mitigation

Protecting against this threat requires a combination of user awareness and best practices for cryptocurrency security:

1.  **Use Hardware Wallets:** The most secure way to store cryptocurrency is on a hardware wallet. The private keys never leave the device, making them immune to this type of software-based theft.
2.  **Never Enter Seed Phrases Digitally:** A seed phrase should be written down on paper and stored securely offline. It should never be typed into a computer or mobile device, stored in a password manager, or photographed.
3.  **Source Verification:** Only download applications from links provided on the official product website. Do not rely on App Store search results alone.
4.  **User Education:** Users need to be educated about the critical importance of the seed phrase and the common tactics used by scammers to steal it. This is a form of [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) in a preventative context.

**Tags:** FakeWallet, Apple, App Store, Malware, Cryptocurrency, MetaMask, Coinbase, Scam

## Sources
- [26 FakeWallet Apps Found on Apple App Store Targeting Crypto Seed Phrases](https://thehackernews.com/2026/04/26-fakewallet-apps-found-on-apple-app.html) — The Hacker News (2026-04-24)
- [Dozens of Malicious Crypto Apps Land in Apple App Store](https://www.securityboulevard.com/2026/04/dozens-of-malicious-crypto-apps-land-in-apple-app-store/) — Security Boulevard (2026-04-24)
- [26 Fake Crypto Wallet Apps Found on Apple App Store](https://www.youtube.com/watch?v=YOUR_VIDEO_ID) — YouTube (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/26-malicious-fakewallet-apps-discovered-on-apple-app-store/
