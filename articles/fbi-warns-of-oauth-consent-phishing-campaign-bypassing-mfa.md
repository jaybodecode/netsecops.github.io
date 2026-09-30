# FBI Warns of OAuth Consent Phishing Campaign Bypassing MFA

**Severity:** high | **Category:** Phishing,Threat Intelligence,Cloud Security | **Updated:** 2026-09-30 | **Reading time:** 5 min

The FBI's Internet Crime Complaint Center (IC3) has issued a public service announcement about a sophisticated 'OAuth consent phishing' campaign targeting high-profile individuals since late 2025. Attackers use social engineering to trick victims into granting a malicious application permissions to their cloud accounts (e.g., Google, Microsoft). This provides the attacker with persistent access that bypasses both passwords and multi-factor authentication (MFA), as access is token-based. Changing the account password does not revoke this access.

## Executive Summary
The **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov/)** has issued a public service announcement (PSA) through its Internet Crime Complaint Center (**[IC3](https://www.ic3.gov)**) warning of an ongoing and sophisticated phishing campaign that abuses the **[OAuth](https://en.wikipedia.org/wiki/OAuth)** 2.0 protocol. The technique, known as "consent phishing," targets prominent individuals by tricking them into granting malicious third-party applications access to their email and cloud service accounts. Once consent is granted, the attacker gains persistent access via an authorization token, effectively bypassing conventional security measures like password changes and even multi-factor authentication (MFA). The FBI urges users to be extremely cautious when granting permissions to any application, no matter how legitimate the request may seem.

## Threat Overview
The campaign, active since late 2025, begins with social engineering. Threat actors impersonate public figures, journalists, or government officials and contact targets via email or messaging apps. They use a pretext, such as reviewing a document or verifying an identity, to lure the victim into clicking a link. This link leads to a legitimate OAuth consent screen from a major provider like Google or Microsoft, asking the user to grant permissions to a seemingly benign application.

If the user clicks "Accept," they are not giving away their password. Instead, they are authorizing the attacker's malicious application to access their account data (e.g., read/send emails, access files) on their behalf. This access is persistent and will survive password resets. The only way to sever the connection is to manually review the account's security settings and revoke the token granted to the malicious application.

## Technical Analysis
This attack abuses the legitimate, intended functionality of the OAuth 2.0 authorization framework.

1.  **Registration:** The attacker registers a malicious application with an OAuth 2.0 provider, such as Google or Microsoft Azure AD.
2.  **Social Engineering:** The attacker crafts a phishing email or message with a link to the OAuth consent endpoint, including their application's client ID ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)).
3.  **Trick User Consent:** The victim clicks the link and is presented with a real consent screen from the provider. Trusting the provider (Google/Microsoft), the user grants the requested permissions (e.g., `Mail.Read`, `Files.ReadWrite.All`).
4.  **Token Theft & Access:** The provider gives the attacker's application an access token. The attacker can now use this token to access the victim's data via API calls, completely bypassing the need for a password or MFA ([`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/)).
5.  **Persistence:** This access remains valid until the user manually revokes the application's permission in their account settings.

## Impact Assessment
*   **MFA Bypass:** This is the most significant impact. Organizations that rely on MFA as a primary defense are vulnerable if users are tricked into granting consent.
*   **Persistent Access:** Attackers gain long-term, stealthy access to a victim's most sensitive data, including emails, contacts, and files stored in services like OneDrive or Google Drive.
*   **Account Takeover:** With access to email, attackers can perform password resets for other services, leading to a complete takeover of the victim's digital life.
*   **High-Profile Targeting:** The focus on prominent individuals means the potential for espionage, blackmail, or the theft of highly valuable intellectual property or state secrets is significant.

## IOCs — Directly from Articles
No specific application names, IP addresses, or domains were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Detection for this threat shifts from network indicators to cloud audit logs:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | `Cloud Audit Logs (e.g., Azure AD, Google Workspace)` | Look for events related to 'Add application consent' or 'Add delegated permission grant'. | SIEM, Cloud security portals | high |
| api_endpoint | `/oauth2/v2.0/authorize` | The Microsoft Identity Platform endpoint for authorization. High numbers of requests from untrusted sources are suspicious. | Web proxy logs, Firewall logs | low |
| other | `Unverified Publisher` | In Microsoft environments, applications from an 'unverified publisher' on the consent screen should be treated as high risk. | User-reported phishing attempts | high |
| other | `Anomalous API usage` | A spike in API calls from a newly-consented application is a strong indicator of malicious activity. | Cloud Access Security Broker (CASB) logs | medium |

## Detection & Response
1.  **Audit OAuth Consents:** Regularly audit all OAuth applications that have been granted permissions in your environment. In Azure AD, this can be done via the "Enterprise applications" blade. Look for applications with high-risk permissions (e.g., `Mail.ReadWrite`, `User.Read.All`) that are not recognized or approved ([`D3-AZET: Authorization Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthorizationEventThresholding)).
2.  **Monitor for New App Consents:** Create alerts in your SIEM or cloud security platform for every time a user grants consent to a new application. This allows for rapid review and revocation if the application is malicious.
3.  **User-Reported Phishing:** Encourage users to report any suspicious emails or messages, especially those asking them to grant permissions or 'verify' their account. This is often the earliest indicator of a consent phishing campaign.

## Mitigation
Mitigation requires a combination of technical controls and user education.
1.  **Configure Consent Settings:** In Microsoft 365 and Google Workspace, administrators can configure user consent settings. The most secure posture is to disable user consent entirely and require an administrator to review and approve any new application. This aligns with [`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/).
2.  **User Training:** Educate users about the dangers of OAuth consent phishing. Specifically, teach them to scrutinize the permissions an application is requesting before clicking "Accept." They should ask, "Why does this document viewer need to send email on my behalf?" ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)).
3.  **Application Vetting:** For organizations that cannot disable user consent, develop a process to vet and approve a list of known-good applications. Use technical controls to block or warn users when they attempt to grant consent to an unapproved application.
4.  **Regularly Review Permissions:** Instruct users on how to periodically review the applications connected to their accounts and revoke any they do not recognize or no longer use.

**Tags:** phishing, oauth, mfa bypass, fbi, ic3, cloud security, account takeover

## Sources
- [Malicious Cyber Actors Gain Access to Victim Accounts Through Consent Phishing](https://www.ic3.gov/PSA/2026/PSA260901) — FBI IC3 (2026-09-01)
- [Attackers are going after prominent individuals through OAuth phishing, FBI warns](https://www.helpnetsecurity.com/2026/09/02/oauth-consent-phishing-fbi-warning/) — Help Net Security (2026-09-02)
- [FBI warns of consent phishing campaign targeting prominent individuals](https://cyberscoop.com/fbi-alert-oauth-consent-phishing-campaign/) — CyberScoop (2026-09-05)
- [(TLP:CLEAR) FBI Warns of OAuth Consent Phishing Targeting User Accounts](https://www.waterisac.org/tlpclear-fbi-warns-of-oauth-consent-phishing-targeting-user-accounts) — WaterISAC (2026-09-05)
- [FBI Warning: OAuth Consent Phishing Bypasses Password Resets](https://hoodline.com/2026/09/fbi-warns-a-password-reset-won-t-save-your-hacked-email-in-new-scam/) — Hoodline (2026-09-06)

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-oauth-consent-phishing-campaign-bypassing-mfa/
