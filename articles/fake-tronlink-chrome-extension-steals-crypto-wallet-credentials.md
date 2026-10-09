# Fake TronLink Chrome Extension Deploys Double-Layer Phishing to Steal Crypto Keys

**Severity:** high | **Category:** Phishing,Malware,Cloud Security | **Updated:** 2026-05-10 | **Reading time:** 5 min

Security firm SlowMist has uncovered a malicious Google Chrome extension that impersonates the official TronLink crypto wallet to steal users' funds. The fake extension uses Unicode obfuscation to spoof the real extension's name and executes a two-layer phishing attack. It tricks TRON users into entering their sensitive mnemonic phrases, private keys, and passwords on a convincing fake interface. The stolen credentials are then immediately exfiltrated to a Telegram bot controlled by the attackers, giving them full access to drain the victim's wallet.

## Executive Summary
Security researchers at **SlowMist** have identified a malicious **[Google](https://www.google.com)** Chrome extension targeting users of the TRON cryptocurrency. The extension impersonates the legitimate **TronLink** wallet and employs a multi-stage phishing attack to steal users' most sensitive credentials, including mnemonic phrases and private keys. By using deceptive techniques like Unicode obfuscation and a high-fidelity fake interface, the extension tricks users into surrendering complete control of their wallets. The stolen data is exfiltrated in real-time to a Telegram bot, allowing attackers to immediately drain the victim's assets. This campaign highlights the persistent threat of malicious browser extensions in the cryptocurrency space.

## Threat Overview
The attack relies on a counterfeit Chrome extension with the malicious ID `ekjidonhjmneoompmjbjofpjmhklpjdd`. The attackers use several tactics to deceive users:
- **Brand Spoofing:** The extension is designed to look exactly like the official TronLink wallet.
- **Unicode Obfuscation:** The extension's name uses Unicode characters to appear identical to the real "TronLink," making it difficult for users to spot the fake in the Chrome Web Store or their extension list.
- **Two-Layer Phishing:** Once installed, the extension does not act maliciously right away. Instead, it loads a remote `iframe` that presents a pop-up designed to look like the real TronLink interface, asking the user to "import" or "recover" their wallet.

This interface is a phishing page that prompts the user to enter their mnemonic phrase (seed phrase), private key, or Keystore file and password. Once this information is submitted, it is stolen.

## Technical Analysis
The attack is a sophisticated form of credential harvesting tailored for cryptocurrency users.
1.  **Distribution:** The malicious extension is distributed, likely through the official Chrome Web Store by evading Google's automated checks, or via third-party sites. This is a form of [`T1195.001 - Compromise Software Supply Chain: Compromise Software Distribution`](https://attack.mitre.org/techniques/T1195/001/).
2.  **Impersonation & Evasion:** The use of Unicode obfuscation is a defense evasion technique to trick the user.
3.  **Credential Harvesting ([`T1598 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/)):** The core of the attack is the fake interface that phishes for the user's wallet secrets.
4.  **Exfiltration ([`T1071.001 - Application Layer Protocol: Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)):** The stolen credentials are exfiltrated via same-origin API calls from the extension's code to a Telegram bot. Using Telegram for C2 and data exfiltration is a common tactic for its ease of use and anonymity.

## Impact Assessment
Users who install the fake extension and enter their credentials face catastrophic and irreversible consequences.
- **Total Loss of Funds:** Once the attacker has the mnemonic phrase or private key, they have complete control over the wallet and can transfer all cryptocurrency assets to their own accounts. Due to the nature of blockchain, these transactions are irreversible.
- **Compromise of All Associated Assets:** A single mnemonic phrase can control multiple accounts and assets (e.g., TRC-20 tokens, NFTs) on the TRON blockchain. All of these are compromised.

## IOCs — Directly from Articles
| Type   | Value                                    | Description                               |
| :----- | :--------------------------------------- | :---------------------------------------- |
| Domain | `tronfind-api[.]tronfindexplorer[.]com`  | Infrastructure domain used by the malware |
| Domain | `trx-scan-explorer[.]org`                | Infrastructure domain used by the malware |
| Other  | `ekjidonhjmneoompmjbjofpjmhklpjdd`         | Malicious Chrome Extension ID             |

## Cyber Observables — Hunting Hints
- **Extension ID:** Users can check their installed Chrome extensions against the malicious ID `ekjidonhjmneoompmjbjofpjmhklpjdd`.
- **Network Traffic:** Monitor for any network connections from the browser to the IOC domains `tronfind-api.tronfindexplorer.com` or `trx-scan-explorer.org`.
- **Developer Tools:** Advanced users can inspect the source code of their browser extensions using Chrome's Developer Tools to look for suspicious code, such as `iframes` loading from remote sources or API calls to Telegram.

## Detection & Response
- **Extension Removal:** Any user who has installed this extension must uninstall it immediately.
- **Asset Migration:** If a user has entered their mnemonic phrase or private key into the fake extension, that wallet must be considered fully compromised. They must **immediately** create a new, secure wallet and transfer all assets from the compromised wallet to the new one before the attacker does. The compromised wallet should never be used again.

## Mitigation
- **Install from Official Sources:** Only install browser extensions from links on the official product website (e.g., tronlink.org). Do not rely on searching the Chrome Web Store, as this can lead to malicious, typosquatted results.
- **Check Extension Details:** Before installing, verify the extension ID, number of users, and reviews. A low user count or suspicious reviews can be a red flag.
- **Use a Hardware Wallet:** The most secure way to manage cryptocurrency is with a hardware wallet. This keeps your private keys offline, and even if your computer is compromised with malware, the keys cannot be stolen.
- **Be Skeptical of Prompts:** Be extremely wary of any extension or application that asks you to enter your mnemonic phrase or private key. Legitimate wallets will only ask for this during the initial setup or recovery on a new device.

**Tags:** Cryptocurrency, Phishing, Malware, Chrome Extension, TronLink, TRON, SlowMist

## Sources
- [SlowMist Discloses Phishing Campaign Involving Fake TronLink Chrome Extension That Steals Wallet Credentials Such as Mnemonics and Private Keys](https://www.techflowpost.com/slowmist_discloses_phishing_campaign_involving_fake_tronlink_chrome_extension_that_steals_wallet_credentials_such_as_mnemonics_and_private_keys_18635.html) — TechFlow (2026-05-10)
- [SlowMist reveals a phishing campaign involving fake Chrome extensions that can steal wallet credentials such as seed phrases and private keys.](https://www.bitget.com/news/detail/12560603995874) — Bitget (2026-05-10)

---
Source: https://cyber.netsecops.io/articles/fake-tronlink-chrome-extension-steals-crypto-wallet-credentials/
