# Microsoft Details Phishing Campaign Targeting 35,000 Users Globally

**Severity:** high | **Category:** Phishing,Threat Intelligence | **Updated:** 2026-05-20 | **Reading time:** 5 min

Microsoft has detailed a massive, multi-stage credential theft campaign that targeted over 35,000 users across 13,000 organizations in 26 countries. The attacks, which ran from April 14-16, 2026, used sophisticated and urgent lures related to corporate "code of conduct" violations to pressure victims into clicking. The phishing emails led to credential harvesting sites designed to steal authentication tokens. The campaign disproportionately targeted the healthcare (19%) and financial services (18%) sectors, with 92% of all targets located in the United States. The disclosure was part of Microsoft's Q1 2026 email threat analysis, which also highlighted QR code phishing as the fastest-growing attack vector.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)** has shared details on a large-scale, multi-stage **[phishing](https://en.wikipedia.org/wiki/Phishing)** campaign aimed at stealing credentials and authentication tokens. The campaign was highly active between April 14 and April 16, 2026, targeting over 35,000 users at more than 13,000 organizations. The attackers used sophisticated social engineering, with emails warning recipients of supposed "code of conduct" violations to create a sense of urgency. The campaign heavily focused on the United States (92% of targets) and specifically targeted industries like healthcare and financial services. This information was released as part of Microsoft's broader analysis of the Q1 2026 email threat landscape, which saw the detection of 8.3 billion email-based phishing threats in total.

---

## Threat Overview
This was a credential harvesting campaign, not a malware delivery campaign. The attackers' goal was to steal user credentials and session tokens to gain unauthorized access to corporate accounts.

*   **Scale:** The campaign was massive, targeting 35,000+ users in 13,000+ organizations across 26 countries in just three days.
*   **Targeting:** While broad, the campaign showed a clear focus. 92% of targets were in the U.S., with the healthcare (19%), financial services (18%), and professional services/technology (11% each) sectors being the most affected.
*   **Lure:** The attackers used highly credible, enterprise-style HTML email templates. The theme was a purported violation of the company's code of conduct, using display names like "Internal Regulatory COC" to appear official and urgent.
*   **Mechanism:** The emails contained links that redirected users to attacker-controlled credential harvesting pages, designed to steal both passwords and multi-factor authentication (MFA) session tokens.

## Technical Analysis
The success of this campaign relies on several factors:
1.  **Social Engineering:** The "code of conduct" lure is effective because it creates a sense of fear and urgency. An employee accused of a violation is likely to act quickly and emotionally, bypassing normal security scrutiny.
2.  **Credible Templates:** The use of polished HTML templates makes the phishing emails difficult to distinguish from legitimate corporate communications.
3.  **Token Theft:** The focus on stealing authentication tokens is a key tactic for bypassing MFA. By tricking a user into authenticating on their phishing page, the attackers can capture the resulting session token and use it to access the user's account without needing the password or a future MFA prompt. This is a common feature of Adversary-in-the-Middle (AiTM) phishing kits.

### MITRE ATT&CK Techniques Observed:
*   [`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The core of the campaign is tricking users into clicking a malicious link.
*   [`T1598.003 - Phishing for Information: Spearphishing for Credential`](https://attack.mitre.org/techniques/T1598/003/): The specific goal was credential harvesting.
*   [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/): The ultimate goal of capturing the authentication token is to hijack the user's authenticated session.

## Broader Threat Landscape Context
Microsoft's report placed this campaign within a larger trend analysis for Q1 2026:
*   **Link-based attacks dominate:** Nearly 80% of all email threats were link-based credential phishing.
*   **Malware via email is declining:** Malware delivery accounted for only 5-6% of threats.
*   **QR Code Phishing (Quishing) is rising:** This was noted as the fastest-growing new attack vector.
*   **Phishing-as-a-Service (PhaaS) is resilient:** Operators of platforms like **Tycoon 2FA** are adapting their tactics to overcome takedowns and defensive measures.

## Impact Assessment
A successful compromise resulting from this campaign would grant attackers access to a user's corporate email account and potentially other connected Microsoft 365 services. From there, they could:
*   Conduct internal phishing attacks to compromise more accounts.
*   Access and exfiltrate sensitive data from SharePoint, OneDrive, and Teams.
*   Commit business email compromise (BEC) fraud by impersonating the user.
*   Establish long-term persistence within the organization's cloud environment.

Given the targeting of healthcare and financial services, the potential for sensitive data breaches and financial fraud is particularly high.

## Detection & Response
*   **Email Gateway Analysis:** Look for emails with subjects related to "code of conduct," "conduct report," or similar themes, especially from external senders. Analyze links within emails to identify redirects to non-corporate domains.
*   **Web Proxy Logs:** Monitor for users accessing newly registered or uncategorized domains, which are often used for phishing landing pages.
*   **Cloud Security Monitoring:** Use cloud security tools (like Microsoft Defender for Cloud Apps) to monitor for impossible travel alerts, suspicious inbox rules being created, and other signs of account takeover.

## Mitigation
*   **[User Training](https://d3fend.mitre.org/technique/d3f:UserTraining):** Train users to recognize and report phishing attempts. Specifically, teach them to be wary of any email that creates a strong sense of urgency or fear and to always verify the sender and hover over links before clicking.
*   **Phishing-Resistant MFA:** This campaign is designed to bypass standard push-based or OTP-based MFA. The most effective mitigation is to implement phishing-resistant MFA, such as FIDO2-compliant hardware keys or certificate-based authentication. This breaks the AiTM attack chain.
*   **Advanced Email Security:** Deploy email security solutions that include advanced features like URL rewriting and detonation (Safe Links), and impersonation detection.
*   **Web Filtering:** Use web filtering to block access to known phishing domains and newly registered domains.

**Tags:** Credential Theft, Financial Services, Healthcare, Microsoft, Phishing, Token Theft

## Sources
- [Microsoft Details Phishing Campaign Targeting 35,000 Users Across 26 Countries](https://thehackernews.com/2026/05/microsoft-details-phishing-campaign.html) (2026-05-05)
- [Navigating the email threat landscape: Insights from the first quarter of 2026](https://www.microsoft.com/en-us/security/blog/2026/05/05/navigating-the-email-threat-landscape-insights-from-the-first-quarter-of-2026/) (2026-05-05)

---
Source: https://cyber.netsecops.io/articles/microsoft-details-large-scale-phishing-campaign-targeting-35000-users/
