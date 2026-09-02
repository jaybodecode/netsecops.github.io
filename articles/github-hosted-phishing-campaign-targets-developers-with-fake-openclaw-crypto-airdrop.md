# GitHub Phishing Campaign Lures Developers with Fake $5,000 OpenClaw Crypto Airdrop

**Severity:** medium | **Category:** Phishing,Malware | **Updated:** 2026-03-08 | **Reading time:** 4 min

A sophisticated phishing campaign is abusing GitHub to target developers with a fake crypto airdrop for a project named OpenClaw. Attackers create fake accounts, open issue threads, and tag legitimate developers, promising a $5,000 token allocation. The link leads to a convincing clone of the real OpenClaw website with a malicious 'Connect your wallet' button. This button executes a wallet-draining script that steals funds from connected crypto wallets like MetaMask and Trust Wallet. The campaign uses social engineering by targeting developers who have shown interest in the legitimate OpenClaw project.

## Executive Summary
Security researchers have uncovered an active phishing campaign that leverages **[GitHub](https://github.com/)**'s platform to target software developers with a cryptocurrency scam. The attackers impersonate the **OpenClaw** project, creating fake issue threads and tagging developers to lure them with a supposed $5,000 token airdrop. The link provided in the lure directs victims to a well-crafted phishing site that is a near-perfect clone of the legitimate OpenClaw website. The phishing site's sole malicious purpose is to trick users into clicking a "Connect your wallet" button, which triggers a wallet-draining script. This campaign is a prime example of social engineering, as it targets users who have already expressed interest in the project, making the lure more believable.

## Threat Overview
- **Attack Type**: Phishing, Social Engineering, Cryptocurrency Theft.
- **Platform**: GitHub.
- **Lure**: A fake airdrop of $5,000 in "CLAW" tokens from the OpenClaw project.
- **Target**: GitHub developers, particularly those who have starred or shown interest in OpenClaw-related repositories.
- **Malicious Infrastructure**:
  - Phishing Site: `token-claw[.]xyz`
  - C2 Server: `watery-compost[.]today`
  - Attacker Wallet: `0x6981E9EA7023a8407E4B08ad97f186A5CBDaFCf5`

## Technical Analysis
The attack chain is a multi-step process designed to build credibility and evade simple detection:
1.  **Reconnaissance**: Attackers identify targets by searching GitHub for developers who have starred or forked OpenClaw repositories. This makes the subsequent outreach highly targeted.
2.  **Initial Access - [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)**: The attackers create fake GitHub accounts and open a new "Issue" in a repository they control. They then `@mention` dozens of their targeted developers in this issue, causing GitHub to send a notification to each one. The issue contains the phishing lure.
3.  **Execution - [`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/)**: The developer clicks the link in the GitHub notification, which leads to the phishing site `token-claw[.]xyz`.
4.  **Impersonation & Credential Access**: The site impersonates the real OpenClaw project. When the user clicks "Connect your wallet," they are prompted to authorize a connection with their crypto wallet (e.g., MetaMask). This authorization grants the malicious script permissions to interact with their wallet.
5.  **Impact - Theft**: Highly obfuscated JavaScript on the phishing page communicates with the C2 server and executes transactions to drain the victim's wallet of all funds, transferring them to the attacker's wallet address.

## Impact Assessment
- **Financial Loss**: The direct impact is the immediate and irreversible loss of all cryptocurrency assets in the victim's connected wallet.
- **Erosion of Trust**: This type of abuse erodes trust in platforms like GitHub, as legitimate notification and collaboration features are weaponized for malicious purposes.
- **Brand Damage**: The legitimate OpenClaw project suffers reputational damage through impersonation.

## IOCs
| Type | Value | Description |
|---|---|---|
| URL | `token-claw[.]xyz` | Phishing Website |
| Domain | `watery-compost[.]today` | Command-and-Control Server |
| Wallet Address | `0x6981E9EA7023a8407E4B08ad97f186A5CBDaFCf5` | Attacker's cryptocurrency wallet |

## Cyber Observables for Detection
- **GitHub Notifications**: Receiving an unsolicited `@mention` in an issue from an unknown user or repository, especially one promising financial rewards.
- **URL Analysis**: The URL `token-claw[.]xyz` uses a common phishing technique of domain impersonation (cybersquatting). The legitimate domain is `openclaw.ai`.
- **Website Content**: The presence of a "Connect your wallet" button on a site reached via an unsolicited link is a major red flag.

## Detection & Response
1.  **User Awareness**: The primary defense is user awareness. Developers should be trained to be highly suspicious of any unsolicited offers of money or rewards, especially in the crypto space.
2.  **Verify, Then Trust**: Always verify such offers through official, known channels. For example, go directly to the official OpenClaw website or their official Twitter/Discord, rather than clicking a link in a GitHub issue.
3.  **Report Phishing**: Report the phishing issue and the fake user accounts to GitHub to have them taken down.
4.  **Wallet Security**: Use hardware wallets for storing significant amounts of cryptocurrency, as they require physical confirmation for transactions, making them resistant to this type of online attack. Use separate, low-value "hot wallets" for connecting to new applications.

## Mitigation
1.  **User Training**: Educate users, especially developers active in the Web3 space, about the prevalence of these scams. Key advice: "If it seems too good to be true, it is." ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
2.  **URL Scrutiny**: Train users to always scrutinize URLs before entering credentials or connecting a wallet. Look for subtle misspellings or different top-level domains.
3.  **Principle of Least Privilege for Wallets**: Do not use a primary wallet with significant funds to interact with new or untrusted decentralized applications (dApps). Use a dedicated, low-balance wallet for experimentation.
4.  **Revoke Permissions**: Regularly review and revoke token approvals and application permissions from your crypto wallet. Tools like Etherscan's Token Approval Checker can help with this.

**Tags:** Phishing, GitHub, Cryptocurrency, Scam, Wallet Drainer, Social Engineering, OpenClaw

## Sources
- [OpenClaw Developers Targeted in Crypto-Wallet Phishing Attack - OX Security](https://www.ox.security/blog/openclaw-developers-targeted-in-crypto-wallet-phishing-attack) — OX Security (2026-03-08)
- [What CISOs Should Know (And Do) About OpenClaw - Infosecurity Magazine](https://www.infosecurity-magazine.com/news/what-cisos-know-openclaw/) — Infosecurity Magazine (2026-03-08)

---
Source: https://cyber.netsecops.io/articles/github-hosted-phishing-campaign-targets-developers-with-fake-openclaw-crypto-airdrop/
