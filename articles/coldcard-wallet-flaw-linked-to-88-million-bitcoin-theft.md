# COLDCARD Wallet RNG Flaw Linked to $88.6 Million Bitcoin Theft

**Severity:** high | **Category:** Vulnerability,Data Breach,Other | **Updated:** 2026-08-11

A firmware vulnerability in COLDCARD Bitcoin hardware wallets is the suspected cause of a theft totaling approximately $88.6 million in Bitcoin. The flaw, which caused the device to use a weak pseudorandom number generator (PRNG) for creating recovery seeds, allowed attackers to predict and reconstruct private keys. The theft occurred in automated sweeps just before the vulnerability was publicly disclosed. Users of affected devices are urged to generate new seeds on patched firmware and transfer their funds immediately, as simply updating the device does not secure existing, compromised wallets.

## Executive Summary

An estimated $88.6 million worth of **[Bitcoin](https://en.wikipedia.org/wiki/Bitcoin)** has been stolen from 4,585 wallet addresses, with the theft strongly linked to a critical firmware vulnerability in **[COLDCARD](https://coldcard.com/)** hardware wallets. The flaw, an integration error in the device's random number generation (RNG) process, was introduced in 2021. It caused affected wallets to generate recovery seeds using a weak, deterministic software-based pseudorandom number generator (PRNG) instead of the intended secure hardware RNG. This significantly reduced the seed's entropy, making it possible for attackers to predict and reconstruct the private keys offline. The largest theft, a $70.2 million sweep, occurred just 30 hours before the manufacturer, Coinkite, publicly disclosed the bug. Users who created wallets on affected devices are at extreme risk and must take immediate action to secure their funds.

---

## Vulnerability Details

The core of the vulnerability was a coding error that affected the generation of wallet recovery seeds. Instead of using the secure STM32 hardware-based RNG, the firmware defaulted to a PRNG known as Yasmarang. This software-based generator is not cryptographically secure and produces a predictable sequence of numbers.

-   **Affected Devices**: Potentially includes **[COLDCARD](https://coldcard.com/)** Mk2, Mk3, Mk4, and Q models.
-   **Vulnerable Action**: Creating a new wallet seed on a device with the flawed firmware.
-   **Attack Vector**: The attack is performed offline. An attacker can generate a large list of weak seeds produced by the flawed PRNG and then scan the **[Bitcoin](https://en.wikipedia.org/wiki/Bitcoin)** blockchain to find addresses that match these predictable seeds and contain funds.

Once a match is found, the attacker can reconstruct the private key and has full control to "sweep" or transfer the funds to their own wallet. This explains the automated, large-scale nature of the theft.

---

## Exploitation Status

The vulnerability was actively and successfully exploited on a massive scale. Digital asset research firm Galaxy Research tracked the on-chain activity, identifying three major waves of theft:
1.  **Initial Wave (July 30, 2026)**: A 41-minute automated sweep drained 1,082.65 BTC (worth $70.2 million) from 1,196 addresses.
2.  **Subsequent Waves**: Two more sweeps brought the total stolen funds to 1,367.05 BTC (worth $88.6 million) from 4,585 addresses.

The timing of the largest attack, just before public disclosure, suggests the attacker may have independently discovered the flaw or learned of it through non-public channels. The attacker's tools appeared to prioritize wallets with the highest balances first.

---

## Impact Assessment

This incident has a severe impact on the victims and the broader cryptocurrency community.
-   **Direct Financial Loss**: Victims have lost a combined total of nearly $89 million in assets, with little to no chance of recovery.
-   **Erosion of Trust in Hardware Wallets**: Hardware wallets are considered the gold standard for secure cryptocurrency storage. A vulnerability of this magnitude in a popular and respected brand like **[COLDCARD](https://coldcard.com/)** undermines user confidence in the entire product category.
-   **Systemic Risk**: The flaw highlights the critical importance of secure random number generation in all cryptographic applications. A single point of failure in this process can render an entire security system useless.

> This is a catastrophic failure of a core security promise. Simply updating the firmware is not a fix for affected users. The original sin was the creation of a weak seed, and any funds associated with that seed remain vulnerable forever until moved.

---

## IOCs — Directly from Articles

No specific attacker-controlled wallet addresses or other indicators were provided in the source articles.

---

## Cyber Observables — Hunting Hints

For security researchers analyzing this event, the primary observables are on the blockchain itself:

| Type | Value | Description |
|---|---|---|
| `other` | On-chain transaction graph | Analyzing the flow of funds from the 4,585 compromised addresses to the attacker's consolidation wallets. |
| `other` | Common address patterns | Searching the blockchain for other addresses that may have been generated by the weak Yasmarang PRNG. |
| `other` | Timing of transactions | Correlating large-scale fund movements with the vulnerability disclosure timeline can identify related thefts. |

---

## Detection Methods

For users, detection is about determining if their wallet was created with the flawed firmware.

1.  **Check Firmware Version and Creation Date**: Users should check the firmware version of their **[COLDCARD](https://coldcard.com/)** and the date they created their wallet seed. Coinkite's advisory provides the specific range of vulnerable firmware versions.
2.  **Use a Verification Tool**: If available, a trusted third-party or manufacturer-provided tool could be used to check if a user's public address falls within the set of predictable addresses generated by the weak PRNG. This should be done with extreme caution to avoid phishing scams.

---

## Remediation Steps

**Updating the firmware alone is NOT sufficient.** The recovery seed itself is compromised.

1.  **Generate a New Seed**: The absolute first step is to obtain a **[COLDCARD](https://coldcard.com/)** with patched firmware (or another trusted hardware wallet) and generate a completely new, secure recovery seed.
2.  **Transfer All Funds**: Immediately create new addresses from the new, secure seed and transfer all **[Bitcoin](https://en.wikipedia.org/wiki/Bitcoin)** and other assets from the old, compromised addresses to the new ones. This transaction will be public on the blockchain.
3.  **Prioritize High-Value Wallets**: Since the attacker's tools targeted high-value wallets first, users with significant holdings should act with extreme urgency.
4.  **Abandon the Old Seed**: Never use the old, compromised recovery seed or any of its associated private keys again. It must be considered permanently insecure.

**Tags:** Bitcoin, COLDCARD, Cryptocurrency, Hardware Wallet, RNG, Vulnerability

## Sources
- [COLDCARD wallet RNG flaw likely linked to $88 million Bitcoin theft](https://www.bleepingcomputer.com/news/security/coldcard-wallet-rng-flaw-likely-linked-to-88-million-bitcoin-theft/) (2026-08-02)
- [Coldcard RNG Flaw Linked to Suspected $88.6M Bitcoin Theft](https://www.esecurityplanet.com/threats/news-coldcard-rng-flaw-bitcoin-theft/) (2026-08-03)
- [Everything You Need to Know About the Coldcard Bitcoin Wallet Hack](https://www.altcoinbuzz.io/coldcard-bitcoin-wallet-hack-explained) (2026-08-03)
- [Coldcard Hardware Wallet Flaw Linked to $70 Million Bitcoin Theft in 41 Minutes](https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html)

---
Source: https://cyber.netsecops.io/articles/coldcard-wallet-flaw-linked-to-88-million-bitcoin-theft/
