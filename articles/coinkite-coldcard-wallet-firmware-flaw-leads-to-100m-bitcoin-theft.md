# Coldcard Wallet Flaw Leads to Theft of Over $100M in Bitcoin

**Severity:** critical | **Category:** Vulnerability,Cyberattack | **Updated:** 2026-08-27 | **Reading time:** 4 min

A five-year-old firmware vulnerability in Coinkite's popular Coldcard hardware wallets has been exploited by multiple hacking groups, leading to the theft of an estimated $100-130 million in Bitcoin. A build error caused the devices to use a weak random number generator, allowing attackers to guess private keys and drain wallets without physical access. Coinkite has issued an emergency patch and urges users to migrate funds.

## Executive Summary
A critical firmware vulnerability, dormant for five years, in **[Coinkite](https://coinkite.com/)'s** Coldcard hardware wallets has resulted in one of the largest cryptocurrency thefts of 2026, with losses estimated between $102 million and $130 million. The flaw, introduced in a March 2021 firmware release, caused a significant weakening of the random seed generation process. This allowed multiple, distinct hacking groups to brute-force the private keys of affected wallets and steal the Bitcoin stored within. The attack did not require any physical access to the devices, undermining the core security promise of a hardware wallet.

## Vulnerability Details
The vulnerability was a result of a build configuration error in the Coldcard firmware. Under certain conditions, the firmware would fail to use the device's secure, hardware-based entropy source for generating the 128-bit seed phrase. Instead, it fell back to a much weaker software-based pseudorandom number generator (PRNG). This error catastrophically reduced the effective key strength from 128 bits to as low as 40 bits.

A reduction to 40 bits of entropy means there are only 2^40 (about one trillion) possible keys. While this is a large number, it is well within the capabilities of a modern, distributed cracking effort. Attackers were able to systematically generate keys, check them against the Bitcoin blockchain for a balance, and drain any wallets they successfully guessed.

## Affected Systems
- **Product:** **[Coinkite](https://coinkite.com/)** Coldcard hardware wallets
- **Versions:** Any wallet that had a seed phrase generated on a device running firmware released between March 2021 and the emergency patch in July/August 2026.

## Exploitation Status
The flaw has been actively and widely exploited since late July 2026. Researchers at Galaxy Research have observed multiple distinct hacking groups participating in the theft, suggesting the vulnerability's details may have been privately traded or discovered independently. The attacks occurred in waves, with one notable event seeing nearly 1,200 addresses drained in under an hour. The victims reportedly include high-profile users such as federal investigators and cybersecurity firms.

## Impact Assessment
This incident has a devastating financial impact, with over $100 million in Bitcoin stolen. More importantly, it severely damages trust in a product line that was considered among the most secure in the industry. It demonstrates the catastrophic consequences of a single, subtle flaw in cryptographic implementations. For users, the promise of "cold storage" was broken, as their funds were stolen without their devices ever being physically touched or connected to the internet. The incident serves as a stark reminder that even the most secure hardware is only as strong as its underlying software and generation process.

## Cyber Observables — Hunting Hints
For users and exchanges, identifying compromised wallets is key.

| Type | Value | Description |
|---|---|---|
| Blockchain Transaction | Outgoing transaction from a long-dormant wallet | A sudden transaction from a wallet that has not been active for a long time could be a sign of a compromised key. |
| Blockchain Transaction | Sweeping transactions | Multiple wallets being emptied in rapid succession to a common set of addresses. |
| Other | Wallet creation date | Wallets created with affected firmware versions between March 2021 and July 2026 are at risk. |

## Detection Methods
Detection of this vulnerability is not possible from the user's end after the fact, other than by observing that their funds are missing. The vulnerability is in the initial generation of the seed phrase. The only reliable method of detection is to know the firmware version and date the wallet was created.

## Remediation Steps
**[Coinkite](https://coinkite.com/)** has issued emergency firmware patches, but this is only a partial solution.

> **CRITICAL WARNING:** Simply updating the firmware on an existing wallet does NOT fix the problem. If the seed phrase was generated with the weak firmware, it is permanently vulnerable.

1.  **Immediate Fund Migration:** Any user who generated a seed phrase on a Coldcard wallet between March 2021 and August 2026 MUST assume their wallet is compromised.
2.  **Create a New Wallet:** Users must update their device to the latest patched firmware.
3.  **Generate a New Seed:** After updating, users must generate a completely new seed phrase on the secure device.
4.  **Transfer Funds:** Users must then transfer all funds from their old, vulnerable wallet to the new, secure wallet address. This is the only way to secure the funds.

**Tags:** cryptocurrency, Bitcoin, hardware wallet, Coldcard, Coinkite, vulnerability, PRNG

## Sources
- [Over $100 Million In Bitcoin Stolen By ‘Numerous’ Hackers—How A Software Bug Made It Possible](https://www.forbes.com/sites/tylerroush/2026/08/04/over-100-million-in-bitcoin-stolen-by-numerous-hackers-how-a-software-bug-made-it-possible/) — Forbes (2026-08-11)
- [Hack of supposedly safe bitcoin tool tests faith of the devoted](https://www.japantimes.co.jp/business/2026/08/07/tech/bitcoin-hack-safety-cryptocurrencies/) — The Japan Times (2026-08-07)
- [Coldcard Hardware Wallet Flaw Linked to $130 Million Bitcoin Theft](https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html) — The Hacker News
- [The Largest Hardware Wallet Exploit of 2026: Inside the USD 116 Million Coldcard Hack](https://www.trmlabs.com/resources/blog/the-largest-hardware-wallet-exploit-of-2026-inside-the-usd-116-million-coldcard-hack) — TRM Labs

---
Source: https://cyber.netsecops.io/articles/coinkite-coldcard-wallet-firmware-flaw-leads-to-100m-bitcoin-theft/
