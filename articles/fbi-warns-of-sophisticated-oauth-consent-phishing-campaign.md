# FBI Warns of Sophisticated OAuth Consent Phishing Campaign

**Severity:** high | **Category:** Phishing,Threat Intelligence,Cloud Security | **Updated:** 2026-09-02 | **Reading time:** 5 min

The FBI has issued a public service announcement about an ongoing and sophisticated phishing campaign active since late 2025. Attackers are using a technique called 'OAuth consent phishing' to gain persistent, password-independent access to the cloud accounts of prominent individuals, their families, and associates. The campaign involves impersonating officials or journalists to trick targets into granting malicious applications access to their Microsoft or Google accounts.

## Executive Summary
The **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov/)** has issued a Public Service Announcement (PSA) through its **[Internet Crime Complaint Center (IC3)](https://www.ic3.gov)**, warning of a sophisticated and ongoing phishing campaign. Active since late 2025, the campaign targets high-profile individuals and their circles using a technique known as **[OAuth](https://en.wikipedia.org/wiki/OAuth)** consent phishing. This method allows attackers to gain persistent access to a victim's cloud service accounts (e.g., **[Microsoft](https://www.microsoft.com/security)**, **[Google](https://www.google.com/)**) without stealing their password. The FBI urges potential victims to be vigilant and understand that simply changing a password will not revoke the attacker's access.

## Threat Overview
The campaign employs a deceptive social engineering tactic to trick victims into authorizing a malicious application.

1.  **Initial Contact**: Threat actors send a direct message to the target via a commercial messaging application.
2.  **Impersonation**: The attackers impersonate credible figures such as government officials, journalists, or event coordinators.
3.  **The Lure**: The message contains a lure, asking the target to review a document or access a file-sharing service via a provided link.
4.  **Consent Grant**: The link directs the victim to a legitimate OAuth consent screen from a major cloud provider. The screen asks the user to grant permissions (e.g., read emails, access files) to a third-party application controlled by the attacker.
5.  **Persistent Access**: Once the user clicks "Accept," the attacker receives an authorization token. This token grants them persistent access to the victim's account data via APIs, even if the user changes their password.

> This attack vector is particularly insidious because it abuses a legitimate cloud feature. The victim interacts with a real login portal from Google or Microsoft, making the request seem authentic.

## Technical Analysis
The attack leverages the trust inherent in the OAuth 2.0 authorization framework. The primary MITRE ATT&CK techniques involved are:

*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The initial message with the malicious link is a classic spearphishing technique, tailored to the high-profile target.
*   [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/): This is the core of the attack. By tricking the user into granting consent, the attacker effectively steals an application access token, which they can use to access the account's data programmatically.

The persistence mechanism is a key feature. Unlike session hijacking, which can be terminated by a password change, OAuth tokens are independent and remain valid until they expire or are manually revoked by the user.

## Impact Assessment
A successful consent phishing attack grants the threat actor significant access to a victim's digital life. The potential impacts include:

*   **Data Theft**: Attackers can access and exfiltrate emails, contacts, calendars, and files stored in the victim's cloud account.
*   **Espionage**: For high-profile targets like government officials or journalists, this could lead to the theft of sensitive state or corporate secrets.
*   **Further Attacks**: The compromised account can be used as a launchpad to send highly convincing phishing emails to the victim's contacts, expanding the attacker's reach.
*   **Account Lockout**: While not the primary goal, an attacker could potentially alter account settings to lock the legitimate user out.

## IOCs — Directly from Articles
The FBI has not released specific Indicators of Compromise (IOCs), such as malicious application names or domains.

## Cyber Observables — Hunting Hints
Detection efforts should focus on auditing application consents within the cloud environment.

| Type | Value | Description |
| :--- | :--- | :--- |
| log_source | Microsoft Entra ID Audit Logs | Look for Event Type `Consent to application`. Investigate consents granted to unfamiliar or newly created applications. |
| log_source | Google Workspace Admin Audit Log | Monitor for `GRANT_APPLICATION_PERMISSION` events. Scrutinize apps with high-risk permissions. |
| api_endpoint | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | Phishing links will often lead to legitimate authorization endpoints like this one. The key is the `client_id` parameter identifying the malicious app. |
| other | Suspicious App Permissions | Review applications that request broad permissions like `Mail.ReadWrite`, `Files.ReadWrite.All`, or `offline_access`. |

## Detection & Response
Defenders and users need to shift their focus from just password security to application security.

1.  **Audit Application Consents**: Regularly review the applications that have been granted access to user accounts. In Microsoft Entra ID, this can be done in the "Enterprise applications" blade. In Google Workspace, check under "Security > API controls." This aligns with D3FEND's [`Domain Account Monitoring (D3-DAM)`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).
2.  **Revoke Suspicious Tokens**: If a suspicious or unnecessary application is found, immediately revoke its permissions. This is the only way to terminate the attacker's access.
3.  **User Education**: Train users, especially high-profile ones, to be skeptical of any request that leads to an OAuth consent screen. They should carefully examine the application name, the publisher, and the permissions being requested before clicking "Accept."
4.  **Configure Consent Policies**: In enterprise environments, administrators should configure application consent policies to restrict what users can authorize. Options include disabling user consent entirely, allowing consent only for publisher-verified apps, or creating custom policies.

## Mitigation
Mitigation focuses on policy, user awareness, and proactive auditing.

1.  **Least Privilege for Apps**: Implement policies that prevent users from consenting to applications that are not from verified publishers or have not been pre-approved by IT. This is a form of D3FEND's [`Application Configuration Hardening (D3-ACH)`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Regular Audits**: Schedule periodic reviews of all third-party applications integrated with the corporate cloud environment. Remove any that are no longer needed or appear suspicious.
3.  **Targeted Training**: Provide specific training on the dangers of OAuth consent phishing to high-risk employees, such as executives and their assistants.
4.  **Report Incidents**: The FBI urges anyone who believes they are a victim to report the incident to their local FBI field office or the IC3 at `www.ic3.gov`.

**Tags:** Phishing, OAuth, Cloud Security, FBI, IC3, Consent Phishing

## Sources
- [FBI raises alarm over deceptive phishing campaign targeting prominent people](https://cyberscoop.com/fbi-alert-oauth-consent-phishing-campaign/) — Cyberscoop
- [Malicious Cyber Actors Gain Access to Victim Accounts Through Consent Phishing](https://www.ic3.gov/PSA/2026/PSA260901) — IC3

---
Source: https://cyber.netsecops.io/articles/fbi-warns-of-sophisticated-oauth-consent-phishing-campaign/
