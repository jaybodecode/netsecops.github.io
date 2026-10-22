# $2.56M Stolen from Ngrave Wallet Users via Phishing Attack

**Severity:** high | **Category:** Phishing,Cyberattack,Data Breach | **Updated:** 2026-10-22 | **Reading time:** 3 min

Users of the Ngrave hardware wallet have lost approximately $2.56 million in a sophisticated phishing attack. Threat actors compromised a third-party service used for the Ngrave LIQUID companion app's push notifications. They sent fake security alerts that directed users to a counterfeit website, tricking them into entering their 24-word recovery phrases. The stolen assets include Bitcoin, Ethereum, and other cryptocurrencies.

## Executive Summary
On October 22, 2026, Belgian hardware wallet company **[Ngrave](https://www.ngrave.io/)** disclosed a sophisticated phishing attack that resulted in the theft of approximately $2.56 million from its customers. The attackers compromised a third-party push notification provider used by Ngrave's LIQUID companion mobile app. By leveraging this trusted channel, the attackers sent fraudulent security alerts to users, luring them to a convincing phishing website. There, victims were tricked into entering their secret recovery phrases, giving the attackers full control of their crypto assets. The incident highlights the significant risks posed by supply chain vulnerabilities, even when the core hardware device remains secure.

## Threat Overview
The attack, which took place on October 17, 2026, was a highly effective social engineering campaign that abused a trusted communication channel. The threat actors did not breach Ngrave's core systems or the ZERO hardware wallets themselves. Instead, they targeted a weaker link in the supply chain: the third-party service responsible for push notifications.

The attack flow was as follows:
1.  **Compromise Third-Party**: Attackers gained unauthorized access to the push notification provider's systems.
2.  **Send Malicious Push Notification**: They sent a push notification through the official LIQUID app channel, making it appear legitimate. The message falsely warned of a new device synchronization in Moscow.
3.  **Redirect to Phishing Site**: The notification directed users to a counterfeit Ngrave website that was visually identical to the real one.
4.  **Harvest Credentials**: The phishing site prompted users to enter their 24-word recovery phrase (also known as a seed phrase) to 'secure' their account.
5.  **Drain Wallets**: Once the phrase was submitted, automated scripts immediately used it to access the victims' wallets and transfer all funds to attacker-controlled addresses.

## Technical Analysis
This attack is a prime example of **Spearphishing Link** ([`T1566.002`](https://attack.mitre.org/techniques/T1566/002/)) combined with a **Trusted Relationship** ([`T1199`](https://attack.mitre.org/techniques/T1199/)) abuse. The attackers' success hinged on the credibility of the push notification. Because it came from the legitimate app, users were far more likely to trust its contents and follow its instructions. The core of the attack was not a technical exploit against the wallet's cryptography but a psychological manipulation to trick users into voluntarily surrendering their most critical secret.

The recovery phrase is the master key to a crypto wallet; anyone who possesses it has total control over the funds. The attackers' campaign was designed with a single goal: to capture this phrase.

## Impact Assessment
The financial impact was significant, with approximately $2.56 million in cryptocurrency stolen from around 70 different wallet addresses. The stolen assets were spread across multiple blockchains:
- **Bitcoin (BTC)**: ~$1.77 million
- **XRP**: ~$454,000
- **Ethereum (ETH) and related assets**: ~$316,000
- **Stellar (XLM)**: ~$18,000

While the Ngrave ZERO hardware wallet itself was not compromised, the incident causes significant reputational damage and erodes user trust. It serves as a stark reminder that the security of a crypto ecosystem is only as strong as its weakest link, which can often be a third-party service provider or the user themselves.

## IOCs — Directly from Articles
No specific phishing URLs, C2 domains, or wallet addresses were provided in the source articles.

## Detection & Response
For users, detection is extremely difficult once the trusted channel is compromised. The primary defense is user awareness and vigilance.
- **User Response**: Any user who received this notification and entered their recovery phrase should consider their wallet permanently compromised. They should immediately create a new wallet with a new recovery phrase and, if possible, attempt to move any remaining funds before the attackers do.
- **Ngrave's Response**: Ngrave has been investigating the breach at their third-party provider and communicating with affected users. They have stressed that the hardware itself remains secure.

## Mitigation
Mitigation for this type of attack falls into two categories: user-side and vendor-side.

### For Users
1.  **NEVER Enter Your Recovery Phrase Online**: This is the golden rule of self-custody. A recovery phrase should only ever be entered directly into the hardware wallet device itself during a recovery process. No legitimate company will ever ask for it via email, chat, web form, or push notification.
2.  **Verify All Communications**: Be skeptical of all unsolicited security alerts, even if they appear to come from an official source. Manually navigate to the official website or app to check for alerts instead of clicking on links in messages.
3.  **Use a Bookmark**: Always access sensitive websites like crypto exchanges or wallet management pages via a saved bookmark, not through links from emails or other messages.

### For Vendors (like Ngrave)
1.  **Vendor Risk Management**: Implement stringent security reviews and continuous monitoring for all third-party service providers, especially those with access to customer communication channels.
2.  **Secure Communication**: Use end-to-end encryption for push notifications where possible, and include authentication tokens in messages that can be verified by the app to ensure they originated from a legitimate source.

**Tags:** Cryptocurrency, Hardware Wallet, Social Engineering, Seed Phrase, Third-Party Risk

## Sources
- [Hardware Wallet Ngrave Reports $2.5 Million in Crypto Stolen Following Push Notification Phishing Attack](https://www.crowdfundinsider.com/2026/10/319770-phishing-campaign-hijacks-ngrave-push-notifications-drains-about-2-56-million-from-users/) — Crowdfund Insider (2026-10-22)

---
Source: https://cyber.netsecops.io/articles/ngrave-wallet-users-lose-2-5-million-in-phishing-attack/
