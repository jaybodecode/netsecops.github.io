# French Bank Customers Hit by 'Quishing' Scam Using Fake Physical Cards

**Severity:** medium | **Category:** Phishing,Cyberattack | **Updated:** 2026-01-11 | **Reading time:** 4 min

A highly deceptive phishing campaign, dubbed 'quishing,' is targeting bank customers in France using a blend of physical and digital tactics. Scammers are sending official-looking letters by postal mail that contain a high-quality counterfeit bank card. The letter instructs the recipient to 'activate' the new card by scanning an included QR code. This QR code directs the victim to a fraudulent website designed to mimic their bank's portal, where their banking credentials and personal information are harvested. This hybrid attack method is effective at bypassing traditional email security filters.

## Executive Summary
A sophisticated phishing technique known as "quishing" (QR code phishing) is being deployed against bank customers in France. This novel campaign combines physical mail with digital fraud to enhance its legitimacy and bypass email-based security controls. Victims receive a convincing letter and a high-quality counterfeit bank card via traditional mail. A QR code included in the letter, when scanned, leads to a credential harvesting website masquerading as the bank's official portal. This hybrid approach represents a significant evolution in social engineering tactics, preying on the trust associated with physical mail and tangible objects like bank cards.

## Threat Overview
The "quishing" campaign is a multi-stage social engineering attack designed to steal banking credentials and personal data. Its effectiveness lies in its departure from typical email-based phishing.

**Attack Chain:**
1.  **Physical Delivery:** The attacker sends a well-crafted letter via postal mail, appearing to be from the victim's bank.
2.  **Social Engineering:** The letter and an enclosed, high-quality fake bank card create a strong sense of legitimacy. The letter instructs the user to activate their 'new' card.
3.  **Vector:** The user is directed to scan a QR code instead of calling a number or visiting a known URL. This leverages the convenience and ubiquity of QR codes.
4.  **Redirection:** The QR code resolves to a URL hosting a malicious website. This is a form of [`T1566.001 - Phishing: Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/), where the QR code acts as the malicious 'link'.
5.  **Credential Harvesting:** The malicious website is a pixel-perfect clone of the real bank's login page, prompting the user to enter their username, password, and potentially other personal information to 'activate' the card.

This method is particularly dangerous because it completely bypasses email security gateways, which are designed to detect malicious links and attachments. It relies on exploiting human trust in physical mail.

## Technical Analysis
The technical components of this attack are straightforward but effective when combined with the physical lure.
- **QR Code Generation:** Attackers use standard QR code generators to embed the URL of their phishing site. They can quickly generate new QR codes and deploy new domains to evade blacklisting.
- **Phishing Kit:** The fraudulent websites are likely built using phishing kits that replicate the look and feel of major French banks. These kits are readily available on dark web forums.
- **Data Exfiltration:** Once the victim submits their information on the fake site, the data is sent to an attacker-controlled server for collection and later use in financial fraud or identity theft.

## Impact Assessment
The primary impact is financial loss for the victims. Once attackers have the banking credentials, they can drain accounts, apply for loans, or make fraudulent purchases. The theft of additional personal information can lead to broader identity theft. For the banks, these incidents erode customer trust and can lead to significant costs associated with reimbursing fraud victims and managing the incident response.

## Detection & Response
Defense against this threat relies heavily on user awareness and vigilance.

### Detection for Users
- **URL Verification:** After scanning a QR code, **always** inspect the URL displayed by your phone's browser before proceeding. Look for misspellings, unusual domain extensions (e.g., `.xyz`, `.club` instead of `.fr` or `.com`), or domains that are close but not identical to the real bank's name.
- **Source Verification:** Be suspicious of any unsolicited request to take action on your bank account, regardless of the medium. If you receive a new card you didn't request, call the bank using the phone number on the back of your *old* card or from their official website, not any number provided in the letter.

## Mitigation
Education is the primary mitigation strategy.

### Recommendations for Individuals
1.  **Treat QR Codes Like Links:** Do not blindly trust a QR code, especially one from an unsolicited source. Scrutinize the resulting URL before entering any information.
2.  **Use Official Apps:** Whenever possible, use your bank's official mobile application for account management instead of navigating to websites, even legitimate ones.
3.  **Enable MFA and Alerts:** Ensure multi-factor authentication is enabled on your bank account. Set up transaction alerts to be immediately notified of any suspicious activity. This aligns with [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
4.  **Report Incidents:** If you fall victim to this scam, immediately contact your bank to block your card and accounts. Report the incident to the authorities, such as through France's Perceval platform. This is a form of [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

### Recommendations for Financial Institutions
- **Proactive Communication:** Banks should proactively warn customers about this specific 'quishing' tactic through their official communication channels (apps, websites, statements).
- **Domain Monitoring:** Actively monitor for and initiate takedown requests for newly registered domains that impersonate the bank's brand.

**Tags:** Quishing, QR Code, Social Engineering, Bank Fraud, France, Phishing

## Sources
- [RadioCSIRT English Edition – Your Cybersecurity News for Sunday, January 11, 2026 (Ep. 67)](https://www.radiocsirt.com/p/radiocsirt-english-edition-your-cybersecurity-11012026-ep-67) — RadioCSIRT (2026-01-11)
- [bet365 Reacts to Surge in Reported Scam Using Fake Bank Cards in France](https://www.toyotawhittier.com/news/bet365-reacts-to-surge-in-reported-scam-using-fake-bank-cards-in-france/) (2026-01-11)

---
Source: https://cyber.netsecops.io/articles/french-bank-customers-targeted-in-quishing-scam-with-fake-cards/
