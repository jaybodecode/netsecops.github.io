# Fake Interpol "Cybercrime Investigation" Emails Deliver Custom Ransomware Globally

**Severity:** high | **Category:** Phishing,Ransomware,Data Breach | **Updated:** 2026-07-02 | **Reading time:** 6 min

A global phishing campaign is targeting small and medium-sized businesses by sending emails that convincingly impersonate Interpol's cybercrime unit. The campaign, discovered by Bitdefender, uses social engineering to create a sense of urgency, tricking victims into downloading a password-protected archive from Proton Drive. The archive contains a custom ransomware payload disguised as 'video evidence,' which then encrypts the victim's files. Researchers noted a flaw in the malware, as the decryption key is embedded within the executable itself.

## Executive Summary
Cybersecurity researchers at **[Bitdefender](https://www.bitdefender.com)** have uncovered a widespread and ongoing phishing campaign targeting small businesses across the globe. Threat actors are impersonating the "Cybercrime Investigation Unit" at **[Interpol](https://www.interpol.int/)** to lend legitimacy to their attacks. The campaign uses urgent and intimidating language to trick recipients into believing they are under investigation for fraudulent activity. Victims are directed to download supposed 'evidence' from a password-protected archive hosted on **Proton Drive**. This file, however, is a custom ransomware payload that encrypts the user's data. While the social engineering is effective, the ransomware itself is considered unsophisticated and contains a critical flaw: the decryption key is embedded within the malware, making recovery possible without paying the ransom.

---

## Threat Overview
The attack is a classic example of phishing combined with authority impersonation. It targets a wide range of sectors, including technology, finance, and legal services, in multiple regions like the US, Europe, and Asia. The attack chain is as follows:
1.  **Phishing Email**: The victim receives an email purportedly from Interpol, claiming their organization is under investigation. The email uses a tone of authority and urgency to pressure the recipient into immediate action.
2.  **Lure and Payload Delivery**: The email contains a link to a **Proton Drive** archive and the password to open it. This two-step process can create a false sense of security. The archive is disguised as containing video evidence of the alleged crime.
3.  **Execution**: Inside the archive, the payload is a Windows executable masquerading as a video file. When the victim attempts to open it, the ransomware is executed.
4.  **Encryption and Ransom**: The malware encrypts files on the system's drives and displays a ransom note. Instead of a fixed amount, victims are instructed to negotiate payment via the encrypted messaging app **Tox**.

This campaign leverages the trusted names of Interpol and Proton Drive to bypass both technical defenses and human suspicion.

## Technical Analysis
The attack relies heavily on social engineering ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)) to achieve its goals. The use of a legitimate cloud storage service, Proton Drive, helps the attackers evade email security gateways that might block direct attachments or links to known malicious domains. The password-protected archive further obfuscates the payload from automated scanning.

The ransomware itself is described as custom-built and unsophisticated. The most significant technical detail discovered by Bitdefender is that the malware contains its own decryption routine and the corresponding key. This is a major operational security failure by the attackers. It means that with proper reverse engineering of the malware sample, a decryption tool can be created to recover the files for free. This suggests the threat actor is likely amateur or is using a poorly constructed public-source ransomware kit.

The final stage of the attack, communication via Tox for ransom negotiation, is a common tactic for smaller or less-established cybercrime groups, as it provides anonymity without the need to maintain complex dark web infrastructure.

## Impact Assessment
For a small business without dedicated IT security staff, this attack can be devastating. The impact includes:
-   **Data Unavailability**: Critical business files become inaccessible, halting operations.
-   **Financial Pressure**: Even if the ransom demand is small, it can be a significant burden for an SMB.
-   **Psychological Stress**: The impersonation of a major law enforcement agency like Interpol is designed to cause fear and panic, leading to poor decision-making.

However, the flaw in the ransomware significantly reduces the long-term impact for victims who can obtain a decrypted version or a recovery tool from security vendors. The primary risk is the initial business disruption and the cost of incident response and recovery.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect related activity:

| Type | Value | Description |
|---|---|---|
| Email Subject Pattern | `(Investigation|Suspicious Activity|Fraudulent)` | Hunt for email subjects containing keywords related to legal or criminal investigations, especially those claiming to be from law enforcement. |
| URL Pattern | `drive.proton.me` | While Proton Drive is a legitimate service, an increase in emails containing links to it from external sources could be a sign of this campaign. |
| File Name | `evidence.zip`, `video_evidence.exe` | Look for files with names suggesting they are evidence, especially if they are executables disguised as other file types. |
| Network Traffic Pattern | Outbound connections to `tox.chat` | Monitor for network traffic related to the Tox P2P messaging protocol, as this is the specified channel for ransom negotiation. |

## Detection & Response
1.  **Email Filtering**: Enhance email security gateways to flag or quarantine emails impersonating law enforcement agencies. Use DMARC, DKIM, and SPF to validate sender identity. Implement rules to warn users about emails containing links to file-sharing services combined with passwords in the email body.
2.  **Endpoint Protection**: Use an EDR or next-gen antivirus solution capable of behavioral analysis to detect the ransomware's encryption activity when it executes. This aligns with D3FEND's **[File Analysis (D3-FA)](https://d3fend.mitre.org/technique/d3f:FileAnalysis)**.
3.  **Incident Response Plan**: If a system is infected, immediately isolate it from the network to prevent lateral spread. Secure a sample of the malware for analysis by a cybersecurity firm or vendor, as they may be able to extract the key and create a decryptor.
4.  **User Reporting**: Encourage users to report any suspicious emails, especially those that create a sense of pressure or fear.

## Mitigation
1.  **User Training**: This is the most critical mitigation. Train employees to recognize the tactics of authority impersonation and social engineering. Specifically teach them that law enforcement agencies like Interpol will not initiate contact about a criminal investigation via a generic email with a link to a cloud archive.
2.  **Block Executables from Archives**: Configure endpoint security or email gateways to block users from running executables that originate from downloaded ZIP or other archive files.
3.  **Application Allowlisting**: Implement application allowlisting to prevent unauthorized executables from running. This would stop the custom ransomware payload from executing even if a user downloads and opens it, a core principle of D3FEND's **[Executable Allowlisting (D3-EAL)](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
4.  **Regular Backups**: Maintain regular, tested, and offline backups of all critical data. This ensures that even if a successful attack occurs, the business can restore its files without considering paying a ransom.

**Tags:** Interpol, Phishing, Ransomware, Social Engineering, Proton Drive, Bitdefender

## Sources
- [Cybercriminals Pose as Interpol in Phishing Emails to Infect Victims With Ransomware](https://www.infosecurity-magazine.com/news/cybercriminals-pose-interpol/) — Infosecurity Magazine (2026-07-02)
- [Fake Interpol investigation emails target small businesses with ransomware](https://www.bitdefender.com/en-us/blog/hotforsecurity/fake-interpol-emails-serve-ransomware) — Bitdefender (2026-07-01)
- [Fake Interpol Investigation Emails Push Ransomware at Small Businesses Globally](https://hackread.com/fake-interpol-investigation-emails-ransomware-small-businesses/) — HackRead (2026-07-01)
- ['Interpol' emails spread custom ransomware with decryption key left inside](https://www.scworld.com/news/interpol-emails-spread-custom-ransomware-with-decryption-key-left-inside) — SC Magazine (2026-07-02)
- [Attackers Using Fake Interpol Warning in Ransomware Attacks on SMBs](https://securityboulevard.com/2026/07/attackers-using-fake-interpol-warning-in-ransomware-attacks-on-smbs/) — Security Boulevard (2026-07-01)
- [No, Interpol isn't Investigating You: That 'Evidence' is Ransomware](https://securitypointbreak.com/2026/07/01/no-interpol-isnt-investigating-you-that-evidence-is-ransomware/) — Security Point Break (2026-07-01)
- [Fake Interpol investigation emails deliver custom ransomware worldwide](https://cyberinsider.com/fake-interpol-investigation-emails-deliver-custom-ransomware-worldwide/) — Cyber Insider (2026-07-01)

---
Source: https://cyber.netsecops.io/articles/global-phishing-campaign-impersonates-interpol-to-deliver-custom-ransomware/
