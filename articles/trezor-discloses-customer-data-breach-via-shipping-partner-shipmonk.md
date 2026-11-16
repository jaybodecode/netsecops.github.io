# Trezor Customer Data Exposed in Shipping Partner Breach

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Cloud Security | **Updated:** 2026-08-13 | **Reading time:** 4 min

Cryptocurrency hardware wallet maker Trezor has disclosed a data breach affecting nearly 14,000 customers. The breach originated from its third-party shipping partner, ShipMonk, whose systems were compromised. The incident exposed customer names, addresses, emails, and phone numbers for orders shipped between May and August 2026. While crypto funds are safe, the leaked data creates a significant risk of targeted phishing attacks against Trezor users.

## Executive Summary
**[Trezor](https://trezor.io/)**, a leading manufacturer of cryptocurrency hardware wallets, has announced a data breach affecting approximately 13,689 of its customers. This incident was not a compromise of **Trezor's** own systems or its hardware wallets. Instead, it was a supply chain attack targeting **Trezor's** third-party shipping and logistics provider, **ShipMonk**. Attackers breached **ShipMonk's** database, exfiltrating the personal contact and order information of customers who had received shipments between May and August 2026. While no cryptocurrency or wallet recovery seeds were compromised, the leaked Personally Identifiable Information (PII) places affected customers at a heightened risk of sophisticated and targeted phishing and physical threats.

## Threat Overview
On August 10, 2026, **ShipMonk** notified **Trezor** of a security breach. An unauthorized party had gained access to a database containing order information for **Trezor** customers. The breach exposed the following data for customers in the United States, United Kingdom, Sweden, Colombia, Brazil, Italy, and Portugal who received orders between May 10, 2026, and August 8, 2026:
- Full Names
- Shipping Addresses
- Email Addresses
- Phone Numbers

The incident affects 11,742 customers with full data exposure and another 1,947 with partial exposure. The primary threat stemming from this breach is not the direct loss of funds, but the potential for highly convincing follow-on attacks. Threat actors can use the leaked data to craft targeted phishing emails, SMS messages (smishing), or even phone calls, impersonating **Trezor**, a bank, or another trusted entity. Their goal would be to trick users into revealing their wallet's 24-word recovery seed, which would grant the attacker full control over the user's crypto assets.

## Technical Analysis
This incident is a classic example of a supply chain attack targeting a weaker link in a company's operational ecosystem.

- **Initial Access ([T1199](https://attack.mitre.org/techniques/T1199/)):** The threat actor targeted and compromised **ShipMonk**, a trusted third-party partner of **Trezor**. The exact method of compromise at **ShipMonk** is not detailed, but it gave the attacker access to their customer database.
- **Collection ([T1530](https://attack.mitre.org/techniques/T1530/)):** Once inside **ShipMonk's** network, the attacker accessed and exfiltrated the database segment containing **Trezor** customer order details.
- **Impact (Secondary):** The primary impact is not on **Trezor** or **ShipMonk** directly, but on the **Trezor** customers. The stolen data becomes a valuable resource for other threat actors specializing in social engineering and phishing ([T1566](https://attack.mitre.org/techniques/T1566/)). The attackers can now correlate a person's name, address, and phone number with the fact that they own a cryptocurrency hardware wallet, making them a high-value target.

## Impact Assessment
The direct impact is the exposure of PII for nearly 14,000 individuals. The indirect, but more severe, impact is the significantly increased risk of financial loss for these individuals through future social engineering attacks. Knowing a person's name, address, and that they own a **Trezor** wallet allows criminals to craft highly personalized and believable scams. This could include emails about a fake security incident requiring them to 'verify' their recovery seed on a malicious website, or even physical threats and home invasions (so-called "$5 wrench attacks"). This incident erodes trust in the security of the broader ecosystem, even when the core product remains secure.

## IOCs — Directly from Articles
No specific IOCs related to the breach at **ShipMonk** were provided.

## Cyber Observables — Hunting Hints
This was a third-party breach, so internal hunting is not applicable. However, **Trezor** customers should be vigilant for:

| Type | Value | Description |
|---|---|---|
| Email Subject | "Urgent Security Alert: Your Trezor Wallet" | Be suspicious of any unsolicited emails claiming to be from Trezor, especially those that create a sense of urgency. |
| URL Pattern | `trezor-support.com`, `trezor-verify.io` | Scrutinize all links in emails. Attackers will use look-alike domains (typosquatting) to host phishing pages. |
| Other | SMS messages or phone calls | Be wary of any unexpected communication about your crypto assets, particularly if it asks for personal information or your recovery seed. |

## Detection & Response
For affected customers, the focus is on personal vigilance:
- **Scrutinize All Communications:** Treat any email, SMS, or phone call regarding your **Trezor** wallet with extreme suspicion. **Trezor** will never ask for your recovery seed.
- **URL and Sender Verification:** Carefully check the sender's email address and hover over all links before clicking to ensure they lead to the official `trezor.io` domain.
- **Enable Two-Factor Authentication (2FA):** Ensure 2FA is enabled on all related accounts, such as email and cryptocurrency exchanges, to mitigate the risk of account takeover.

For companies like **Trezor**, response includes:
- **Transparent Communication:** Promptly and clearly notify affected customers, as **Trezor** has done.
- **Vendor Risk Management:** Re-evaluate the security posture of all third-party vendors with access to customer data.

## Mitigation
- **NEVER Share Your Recovery Seed:** This is the master key to your crypto assets. No legitimate company will ever ask for it. It should only be used on the **Trezor** device itself.
- **Bookmark Official Sites:** Access your accounts by navigating to bookmarked, known-good URLs rather than clicking links in emails.
- **Data Minimization:** For vendors, practice data minimization. Only collect and store the PII that is absolutely necessary for the required duration. **Trezor** could explore options with its partners to purge customer shipping data after a set period.
- **Third-Party Security Audits ([M1016](https://attack.mitre.org/mitigations/M1016/)):** Companies must implement a robust vendor risk management program that includes regular security assessments and audits of all partners who handle sensitive data.

**Tags:** Supply Chain, Data Breach, PII, Cryptocurrency, Phishing

---
Source: https://cyber.netsecops.io/articles/trezor-discloses-customer-data-breach-via-shipping-partner-shipmonk/
