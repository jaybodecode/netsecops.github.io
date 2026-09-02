# FBI and SSU Warn of Russian Intelligence Campaign Stealing Signal and WhatsApp Backup Keys

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-07-02 | **Reading time:** 5 min

The FBI, CISA, and the Security Service of Ukraine (SSU) have issued a joint advisory detailing a persistent phishing campaign by Russian intelligence services. The operation has evolved to specifically target the backup recovery keys of Signal and WhatsApp users, using social engineering to trick high-value targets into disclosing their keys. A compromised key allows attackers to restore and access the victim's entire message history, posing a significant espionage risk.

## Executive Summary
On June 28, 2026, the U.S. **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov/)**, **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/)**, and the **[Security Service of Ukraine (SSU)](https://ssu.gov.ua/)** released an updated joint advisory warning of a sophisticated phishing campaign attributed to **[Russian Intelligence Services](https://en.wikipedia.org/wiki/GRU_(G.U.))**. The campaign targets high-value individuals in Ukraine, Europe, and the U.S., including government officials and military personnel. A significant evolution in the attackers' tactics is the direct targeting of backup recovery keys for secure messaging apps like **[Signal](https://signal.org/)** and **WhatsApp**. The threat actors use carefully crafted SMS and in-app messages to impersonate support staff and trick users into divulging their keys. This campaign does not exploit a technical vulnerability but relies entirely on social engineering to bypass end-to-end encryption by gaining access to decrypted message backups.

## Threat Overview
- **Attacker:** Russian Intelligence Services, with specific activity clusters tracked as **[Star Blizzard](https://attack.mitre.org/groups/G1017/)** (also known as Callisto Group, SEABORGIUM), `UNC5792` (UAC-0195), and `UNC4221` (UAC-0185).
- **Victims:** High-value targets, including government officials, military personnel, and activists, primarily in Ukraine but also extending to Europe and the United States.
- **Attack Vector:** The campaign is a classic **[phishing](https://en.wikipedia.org/wiki/Phishing)** operation ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) delivered via SMS and in-app messages.
- **Objective:** The primary goal is espionage through the theft of sensitive communications. By obtaining a Signal 30-digit backup recovery key, attackers can restore a victim's entire message history to a device they control, gaining access to all past private and group chats.

## Technical Analysis
The attack is simple but effective, preying on user trust and a sense of urgency:
1.  **Impersonation:** Attackers send messages pretending to be from official support channels for Signal or WhatsApp. They may use spoofed sender IDs or create convincing bot profiles.
2.  **Social Engineering:** The messages create a pretext for action. Common lures include warnings of a required security update, claims that user data is at risk, or notifications of a failed login attempt.
3.  **Information Elicitation:** The user is instructed to take an action that involves revealing their credentials. In this campaign, the specific ask is for the user to provide their backup recovery key or account PIN, as described in [`T1598.003 - Phishing for Information: Credentials`](https://attack.mitre.org/techniques/T1598/003/).
4.  **Account/Data Compromise:** Once the attacker has the recovery key, they can install Signal on a new device and use the "Restore from backup" feature. This downloads the encrypted backup from the cloud (e.g., iCloud/Google Drive) and decrypts it using the stolen key, giving the attacker a complete copy of the victim's message history up to the last backup.

> It is critical to understand that this attack does not break the encryption of Signal or WhatsApp. It bypasses it by tricking the legitimate user into handing over the key to their decrypted data.

## Impact Assessment
The impact of a successful attack is severe, particularly for the targeted individuals. For government and military personnel, the compromise of their secure communications can lead to the leakage of classified information, operational plans, and intelligence sources. This poses a significant national security risk. For activists and journalists, it can expose their networks, endanger their contacts, and undermine their work. The campaign demonstrates that even with strong end-to-end encryption, the human element remains a primary target for sophisticated nation-state actors.

## Detection & Response
Detection is challenging as the attack occurs outside of enterprise security controls. However, organizations can:
- **Educate High-Risk Users:** Provide targeted security training to individuals likely to be targeted, focusing on the specific TTPs used in this campaign.
- **Monitor for Public Leaks:** Use threat intelligence services to monitor for any discussion of compromised accounts or data related to the organization.
- **Encourage Reporting:** Establish a clear and safe channel for users to report any suspicious messages or potential compromises.

If a user suspects they have been compromised, they should:
1.  **Immediately Change PIN:** If a Signal PIN is set, change it immediately.
2.  **Disable and Re-enable Backups:** Disabling backups may prevent further access, and creating a new backup with a new key will invalidate the old one.
3.  **Re-register Signal:** Re-registering the Signal account on the legitimate user's phone can de-register other linked devices.

## Mitigation
Mitigation is entirely focused on user awareness and behavior:
- **NEVER Share Recovery Keys or PINs:** This is the golden rule. Legitimate support services will never ask for this information.
- **Enable Registration Lock:** In Signal, enable the Registration Lock feature (a PIN), which requires the PIN to be entered when registering a new device. This provides an additional layer of protection against account takeover.
- **Scrutinize Unsolicited Messages:** Treat all unsolicited messages with suspicion, especially those that create a sense of urgency or ask for sensitive information.
- **Verify Sender Identity:** Do not trust the display name. If a message claims to be from an official source, independently verify it through a known, legitimate channel.

**Tags:** Phishing, Russian Intelligence, Signal, WhatsApp, Espionage, Social Engineering, FBI, CISA, SSU

## Sources
- [Ukraine Says Russian Intelligence Used Fake Support Texts to Steal Messaging Credentials](https://thehackernews.com/2026/06/ukraine-says-russian-intelligence-used.html) — The Hacker News (2026-06-27)
- [FBI Warns Russian Hackers Are Targeting Signal Backup Recovery Keys](https://securityboulevard.com/2026/06/fbi-warns-russian-hackers-are-targeting-signal-backup-recovery-keys/) — Security Boulevard (2026-06-28)

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-russian-campaign-targeting-signal-backup-keys/
