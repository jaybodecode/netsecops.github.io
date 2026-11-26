# FBI: North Korea's Kimsuky APT Using 'Quishing' to Bypass MFA

**Severity:** high | **Category:** Phishing,Threat Actor,Policy and Compliance | **Updated:** 2026-01-09 | **Reading time:** 6 min

The U.S. Federal Bureau of Investigation (FBI) has issued a formal advisory warning that the North Korean state-sponsored threat group Kimsuky (also known as APT43) is actively using malicious QR codes in spear-phishing emails. This tactic, dubbed 'quishing,' is designed to bypass traditional email security by tricking users into scanning the code with a personal mobile device. The goal is to harvest credentials and session tokens from high-value targets in government, academic institutions, and think tanks, effectively bypassing multi-factor authentication (MFA) through session hijacking.

## Executive Summary
The U.S. **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov)** has released a security advisory detailing an evolving tactic used by the North Korean state-sponsored hacking group **[Kimsuky](https://attack.mitre.org/groups/G0094/)** (also known as APT43, Emerald Sleet). The group is embedding malicious Quick Response (QR) codes in spear-phishing emails to steal credentials and bypass security controls. This technique, known as "quishing," targets U.S. and foreign government entities, academic institutions, and think tanks. By luring victims to scan a QR code with a mobile device, the attackers shift the interaction from a secured corporate environment to a less-protected personal one, facilitating credential harvesting and session hijacking that can circumvent multi-factor authentication (MFA).

---

## Threat Overview
The quishing attack chain employed by Kimsuky is designed to be both deceptive and technically evasive:
1.  **Spear-Phishing:** The attackers send a targeted email, often spoofing a legitimate entity like a government advisor or embassy employee.
2.  **The Lure:** The email contains a malicious QR code, either as an embedded image or a PDF attachment. The message entices the user to scan the code to access a document, questionnaire, or secure drive.
3.  **Evasion & Context Shift:** Because the malicious destination is a QR code image, it bypasses many automated URL scanning and sandboxing tools in email gateways. When the user scans the code, they are forced to use their personal mobile device, moving the attack surface outside the protected corporate network.
4.  **Redirection & Harvesting:** The QR code directs the mobile browser through a series of attacker-controlled redirectors that fingerprint the device and user. The final destination is a convincing phishing page designed to harvest credentials (e.g., a fake Microsoft 365 login page).
5.  **MFA Bypass:** The primary goal is often not just the password but the session token generated after a successful login. By capturing this token, attackers can perform session replay attacks to gain access to cloud services without needing the password or a fresh MFA prompt.

## Technical Analysis
Quishing is effective because it exploits both human psychology and technical security gaps. Users are generally less suspicious of QR codes than they are of hyperlinks. The shift to a mobile device breaks the chain of security controls present on a corporate laptop, such as endpoint protection, network filtering, and browser extensions.

The FBI's advisory highlights that this is a **high-confidence, MFA-resilient intrusion vector**. Standard MFA implementations can be bypassed if the attacker successfully hijacks an authenticated session. Once they have access to a victim's account and mailbox, Kimsuky actors establish persistence and use the compromised identity to launch secondary spear-phishing attacks against the victim's contacts, lending legitimacy to their follow-on campaigns.

### MITRE ATT&CK Techniques
- [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/): When the QR code is delivered in a PDF.
- [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The QR code functions as a malicious link.
- [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/): Using a compromised account for secondary attacks.
- [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): The primary method for bypassing MFA.
- [`T1556.006 - Multi-Factor Authentication`](https://attack.mitre.org/technique/T1556/006/): The attack specifically targets MFA-protected accounts.

## Impact Assessment
The impact of a successful quishing attack against targeted individuals can be severe:
- **Credential Compromise:** Loss of usernames and passwords for critical accounts.
- **Cloud Account Takeover:** Hijacking of email, collaboration, and cloud storage accounts (e.g., Microsoft 365, Google Workspace).
- **Espionage:** Access to sensitive government, policy, or research documents.
- **Further Infiltration:** Use of the compromised account as a trusted pivot point to attack other individuals and organizations.

## Detection & Response
- **User Behavior Analysis ([D3-UBA](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)):** Monitor cloud and identity logs for anomalous session activity. Look for logins from impossible-travel scenarios, unusual user-agents, or session usage from multiple IP addresses or geolocations simultaneously.
- **Email Content Analysis:** While difficult, advanced email security solutions may be able to use computer vision to identify and analyze QR codes within email bodies and attachments.
- **Incident Response:** If a quishing attack is suspected, immediately trigger an incident response playbook that includes revoking all active user sessions, forcing a password reset, and reviewing mailbox rules and account activity for signs of persistence or secondary phishing.

## Mitigation
- **User Training ([M1017](https://attack.mitre.org/mitigations/M1017/)):** This is the most critical defense. Educate users to be highly suspicious of any unsolicited QR codes received via email, especially those asking for credentials or access to documents. Emphasize that a QR code is just a link and should be treated with the same caution.
- **Phishing-Resistant MFA:** Move towards phishing-resistant MFA methods like FIDO2/WebAuthn, which bind the authentication to the hardware and origin, making session token theft ineffective.
- **Mobile Device Management (MDM):** If possible, enforce security policies on mobile devices that access corporate resources, including the use of approved browsers with security features and endpoint protection.
- **Restrict Web-Based Content ([M1021](https://attack.mitre.org/mitigations/M1021/)):** Use DNS filtering and web proxies on both corporate and managed mobile devices to block access to known malicious domains and newly registered domains.

**Tags:** quishing, QR code, phishing, Kimsuky, APT43, FBI, MFA bypass, North Korea

## Sources
- [FBI Warns North Korean Hackers Using Malicious QR Codes in Spear-Phishing](https://thehackernews.com/2026/01/fbi-warns-north-korean-hackers-using.html) — The Hacker News (2026-01-09)
- [FBI warns of attacks by North Korean cyber threat group using malicious QR codes | AHA News](https://www.aha.org/news/headline/2026-01-09-fbi-warns-attacks-north-korean-cyber-threat-group-using-malicious-qr-codes) — American Hospital Association (2026-01-09)

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-north-korean-quishing-campaigns-using-malicious-qr-codes/
