# Unit 42 Exposes 'Smishing Deluge' from China and 'Jingle Thief' Gift Card Fraud

**Severity:** medium | **Category:** Phishing,Threat Intelligence,Cloud Security | **Updated:** 2025-10-24 | **Reading time:** 5 min

Researchers at Palo Alto Networks' Unit 42 have detailed two distinct and significant cybercrime operations. The first, a massive smishing campaign dubbed 'The Smishing Deluge,' is attributed to a China-based threat actor and is flooding mobile users globally with malicious SMS messages. The second campaign, named 'Jingle Thief,' is a sophisticated cloud-based operation focused on automating the theft and monetization of gift cards. These findings, highlighted in Unit 42's October Threat Bulletin, showcase the diverse tactics of modern criminals, from large-scale social engineering to highly targeted financial fraud.

## Executive Summary
**[Palo Alto Networks' Unit 42](https://www.paloaltonetworks.com/unit42)** research team has brought to light two disparate but significant cybercrime campaigns, showcasing the diverse portfolio of modern threat actors. On October 23, 2025, the team detailed "The Smishing Deluge," a large-scale SMS phishing (**[smishing](https://en.wikipedia.org/wiki/Smishing)**) operation with origins in China, which is sending waves of malicious texts to a global victim base. A day prior, Unit 42 exposed "Jingle Thief," a more niche but sophisticated fraud campaign that leverages cloud infrastructure to automate the theft and exploitation of gift card balances. These campaigns demonstrate a threat landscape characterized by both high-volume, low-sophistication social engineering and targeted, automated financial fraud, requiring a multi-faceted defensive approach.

---

## Threat Overview
This week's research from Unit 42 provides a snapshot of two parallel tracks in the cybercrime economy. 

### Campaign 1: The Smishing Deluge
*   **Threat:** A massive, ongoing smishing campaign.
*   **Attribution:** Linked to a threat actor based in China.
*   **Vector:** Malicious SMS text messages sent to a global audience.
*   **Objective:** The primary goal is social engineering. The messages trick recipients into clicking malicious links, which can lead to credential harvesting websites, malware downloads, or other forms of fraud.
*   **Scale:** Described as a "deluge," indicating a very high volume of messages being sent to maximize the number of potential victims.

### Campaign 2: Jingle Thief
*   **Threat:** An automated gift card fraud campaign.
*   **Vector:** A sophisticated operation leveraging cloud infrastructure.
*   **Objective:** The direct theft and monetization of funds stored on gift cards. This likely involves techniques like credential stuffing attacks on retail websites to take over accounts with stored gift cards, or brute-forcing gift card numbers and PINs.
*   **Infrastructure:** The use of cloud services allows the attackers to scale their operation, using vast pools of IP addresses to bypass rate limiting and anti-bot protections.

---

## Technical Analysis

### The Smishing Deluge TTPs
This campaign relies on classic social engineering tactics, amplified by the scale of mobile messaging.
*   **Initial Access:** The attack begins with an SMS message containing a fraudulent premise (e.g., a fake package delivery notification, a bank alert, a prize winning) and a URL-shortened link ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
*   **Execution:** The user clicks the link, which directs them to a malicious website controlled by the attacker. This site is often a pixel-perfect clone of a legitimate site (e.g., a postal service, a bank login page).
*   **Collection:** The user is prompted to enter sensitive information, such as login credentials, personal information, or credit card details ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/) or [`T1111 - Two-Factor Authentication Interception`](https://attack.mitre.org/techniques/T1111/)).

### Jingle Thief TTPs
This campaign is more technical and automated.
*   **Reconnaissance & Resource Development:** Attackers likely acquire lists of compromised email/password combinations from other breaches to use in credential stuffing attacks ([`T1589.002 - Email Addresses`](https://attack.mitre.org/techniques/T1589/002/)).
*   **Initial Access (to victim accounts):** The cloud-based infrastructure launches a high-volume credential stuffing attack against retail websites, attempting to find valid logins ([`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/)).
*   **Execution & Collection:** Once an account is compromised, an automated script logs in, scrapes the gift card balance, and either uses it to purchase goods or sells the card details on a dark web marketplace ([`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/)).

---

## Impact Assessment
*   **Smishing Deluge:** The primary impact is widespread credential theft and financial fraud against individuals. For corporations, this can lead to compromised corporate accounts if employees use the same passwords for personal and work services.
*   **Jingle Thief:** This results in direct financial loss for both consumers and the targeted retail companies, who often have to reimburse customers for the stolen funds. It also causes reputational damage and a loss of customer trust.

---

## Detection & Response
*   **For Smishing:** Mobile device management (MDM) solutions can be configured to block known malicious domains. Network-level DNS filtering can prevent devices on a corporate network from reaching phishing sites. User training is the most critical defense.
*   **For Gift Card Fraud:** Retailers must implement robust anti-bot and anti-fraud solutions. This includes detecting and blocking credential stuffing attacks, enforcing **[MFA](https://www.cisa.gov/mfa)** on customer accounts, and monitoring for rapid, automated gift card balance checks. This aligns with **[D3FEND's Authentication Event Thresholding (D3-ANET)](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)**.

---

## Mitigation
*   **Individuals:** Be highly suspicious of unsolicited text messages. Never click links or provide personal information in response to an SMS. Manually type the URL of the legitimate service into your browser instead.
*   **Organizations:**
    1.  **User Training:** Continuously educate employees about the dangers of smishing and phishing ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
    2.  **MFA Everywhere:** Enforce MFA on all corporate accounts to mitigate the impact of stolen credentials ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)).
    3.  **Credential Stuffing Protection:** For public-facing applications, implement CAPTCHA, rate limiting, and services that detect and block credential stuffing attacks.
    4.  **DNS Filtering:** Use a DNS security service to block access to known malicious and newly registered domains ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/)).

**Tags:** Smishing, Phishing, Fraud, Gift Card, Unit 42, Cloud Security, China

## Sources
- [Unit 42 - Latest Cybersecurity Research](https://www.paloaltonetworks.com/unit42/latest-research) — Unit 42 (2025-10-23)

---
Source: https://cyber.netsecops.io/articles/palo-alto-networks-uncovers-smishing-and-gift-card-fraud-campaigns/
