# APT Uses AI and QR Codes in Phishing Attack on Taiwan Researchers

**Severity:** high | **Category:** Phishing,Threat Actor,Data Breach | **Updated:** 2026-10-08 | **Reading time:** 6 min

An unidentified Advanced Persistent Threat (APT) group is conducting a sophisticated spear-phishing campaign against Taiwanese research organizations. According to Cisco Talos, the attackers are using what appears to be AI-generated content to create convincing email lures impersonating academic institutions. The campaign also employs QR code phishing ('quishing') and an adversary-in-the-middle (AitM) phishing framework to intercept credentials and bypass multi-factor authentication (MFA). The AitM kit impersonates Google login pages and uses a hybrid HTTP/WebSocket architecture to capture credentials and MFA tokens in real-time.

## Executive Summary
**[Cisco Talos](https://www.talosintelligence.com/)** has uncovered a sophisticated spear-phishing campaign by an unidentified Advanced Persistent Threat (APT) actor targeting research organizations in Taiwan. The operation, observed in mid-2026, combines several advanced techniques, including the suspected use of **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)** to generate highly convincing email lures, **[QR code](https://en.wikipedia.org/wiki/QR_code)** phishing (quishing) to expand the attack surface, and an adversary-in-the-middle (AitM) phishing framework to defeat multi-factor authentication (MFA). The campaign impersonates legitimate academic and policy institutions to gain the trust of targets. The primary goal is to steal credentials and session cookies by intercepting the authentication process in real-time, granting the attackers persistent access to victim accounts.

## Threat Overview
The campaign's lures are themed around legitimate public events and geopolitical topics relevant to the targets. The attackers impersonate reputable institutions such as the Taiwan European Union Centre and the NCCU Institute of International Relations. The phishing emails exhibit a consistent three-part structure and sophisticated rhetoric, leading researchers to assess that the content is generated using an AI model with a reusable prompt template. This allows the threat actor to rapidly produce personalized and credible lures at scale.

The attack is not limited to email. The actor has embedded malicious QR codes into legitimate-looking event posters. When scanned, these QR codes direct victims to the same malicious infrastructure, a technique known as quishing. This hybrid approach allows the campaign to bridge the digital and physical worlds, reaching victims who may not have received the initial email.

The core of the operation is an advanced adversary-in-the-middle (AitM) phishing kit that proxies the legitimate **[Google](https://www.google.com)** authentication flow. When a victim clicks the phishing link or scans the QR code, they are taken to a convincing replica of a Google login page. The AitM framework uses a combination of HTTP and WebSockets to pass the victim's credentials and MFA token (e.g., from an authenticator app) to the real Google service, while simultaneously capturing them for the attacker. This allows the attacker to hijack the authenticated session.

## Technical Analysis
*   **AI-Generated Lures**: The syntactic and structural consistency of the phishing emails across different campaigns and topics strongly suggests the use of a large language model (LLM) for content creation. This represents an evolution in phishing tactics, making lures harder to detect based on common grammatical errors or awkward phrasing.
*   **QR Code Phishing (Quishing)**: By embedding QR codes in posters, the attackers bypass traditional email security gateways. Mobile devices that scan the code are taken directly to the malicious site, often in a browser with fewer security controls than a corporate desktop.
*   **AitM Phishing Framework**: The framework acts as a reverse proxy between the victim and the legitimate service (Google). Its hybrid HTTP/WebSocket architecture allows for real-time, interactive session hijacking. The WebSocket connection likely maintains a persistent channel to the attacker's server, enabling the immediate relay of stolen credentials and MFA tokens as the victim enters them.
*   **Linguistic Analysis**: Cisco Talos's analysis of the phishing kit suggests its user interface was originally developed in Simplified Chinese and later adapted for Traditional Chinese and English, providing a clue to the potential origin of the threat actor.

### MITRE ATT&CK Techniques
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The primary delivery mechanism is through links in targeted emails.
*   [`T1598.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/): The use of QR codes on posters is a form of physical-world phishing that leads to a malicious service.
*   [`T1111 - Two-Factor Authentication Interception`](https://attack.mitre.org/techniques/T1111/): The AitM framework is designed specifically to intercept and bypass MFA.
*   [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): After a successful AitM attack, the actor gains the victim's session cookie, allowing them to access the account without needing to re-authenticate.
*   [`T1589.002 - Email Addresses`](https://attack.mitre.org/techniques/T1589/002/): The attackers gather email addresses of individuals at specific research organizations to conduct their spear-phishing campaign.

## Impact Assessment
A successful attack would grant the APT actor full access to the victim's Google account, including email, documents, and any other connected services. For individuals at research and policy organizations, this could lead to the theft of sensitive, pre-publication research, confidential government communications, and personal information. The stolen access could be used for further intelligence gathering, to launch subsequent attacks against the victim's contacts, or to maintain long-term persistence within the target organization's network. The use of AI to craft lures and AitM to bypass MFA makes this campaign particularly dangerous and effective against even security-conscious users.

## IOCs — Directly from Articles
No specific indicators of compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of AitM phishing activity with the following observables:

| Type | Value | Description |
|---|---|---|
| URL Pattern | Look for URLs that use subdomains to impersonate a brand (e.g., `google.login.example.com`). | AitM kits often use deceptive domain names to trick users. |
| Certificate Subject | Mismatched or generic certificate subjects for a login page. | A legitimate Google login page will have a certificate issued to `accounts.google.com`. An AitM site will not. |
| Network Traffic Pattern | WebSocket connections initiated from a login page. | While not always malicious, the use of WebSockets on a third-party login portal is suspicious and characteristic of some AitM kits. |
| Log Source | `Web Proxy Logs` | Analyze logs for users visiting newly registered domains or domains with low reputation scores that are hosting login pages. |

## Detection & Response
**Detection**:
1.  **URL Analysis**: Deploy email security solutions that can analyze URLs for signs of impersonation and check them against threat intelligence feeds. (D3FEND: [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis))
2.  **Web Filtering**: Block access to newly registered domains and domains categorized as phishing. This can prevent users from reaching the AitM landing page.
3.  **Login Anomaly Detection**: Monitor for impossible travel scenarios, logins from unusual locations or ASNs, and session creations that do not align with the user's typical behavior. (D3FEND: [`D3-UGLPA: User Geolocation Logon Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis))

**Response**:
1.  **Session Revocation**: If a compromise is suspected, immediately revoke all active sessions for the user's account.
2.  **Password Reset**: Force a password reset for the compromised account.
3.  **Account Audit**: Review the user's account for any unauthorized activity, such as new email forwarding rules, OAuth application grants, or data access.

## Mitigation
*   **Phishing-Resistant MFA**: The most effective mitigation against AitM attacks is to implement phishing-resistant MFA, such as FIDO2/WebAuthn security keys. These methods bind the authentication to the origin, preventing credentials from being relayed to a malicious site. (D3FEND: [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication))
*   **User Training**: Educate users about the threat of AitM phishing and QR code attacks. Train them to verify the URL in the address bar before entering credentials and to be suspicious of unsolicited QR codes. (M1017: User Training)
*   **Mobile Device Management (MDM)**: Use MDM solutions to enforce web filtering and threat protection on mobile devices, which are often the target of quishing attacks.

**Tags:** apt, phishing, quishing, ai, mfa, aitm, taiwan, cisco talos

## Sources
- [UAT-11985: AI-assisted event lures delivering real-time Google AitM phishing](https://blog.talosintelligence.com/uat-11985/) — Cisco Talos (2026-10-08)

---
Source: https://cyber.netsecops.io/articles/apt-uses-ai-and-qr-codes-in-phishing-campaign-against-taiwan/
