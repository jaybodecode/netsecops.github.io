# Identity attacks are root cause of 79% of ransomware incidents: Sophos

**Severity:** medium | **Category:** Ransomware,Threat Intelligence,Phishing | **Updated:** 2026-08-06 | **Reading time:** 4 min

According to the 2026 Sophos State of Ransomware report, identity-based attacks are now the primary root cause for 79% of ransomware incidents, overtaking vulnerability exploitation. Malicious email (26%), phishing (24%), and compromised credentials (23%) are the top three initial access vectors. Alarmingly, 97% of victims who were breached via compromised credentials had multi-factor authentication (MFA) deployed, indicating that attackers are successfully bypassing traditional MFA controls. The findings highlight the need for advanced identity threat detection and phishing-resistant MFA.

## Executive Summary
Analysis of the 2026 **[Sophos](https://www.sophos.com/)** "State of Ransomware" report reveals a fundamental shift in initial access vectors, with identity-based attacks now identified as the root cause in 79% of ransomware incidents. For the first time in four years, exploited vulnerabilities are not the top entry point. Instead, the leading causes are malicious email ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)), phishing ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)), and compromised credentials ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)). A critical finding is that in 97% of cases where compromised credentials were the cause, the victim organization had multi-factor authentication (MFA) deployed, suggesting attackers are routinely bypassing or evading these controls. This underscores the urgent need for organizations to move beyond basic MFA and adopt more advanced Identity Threat Detection and Response (ITDR) capabilities.

## Threat Overview
- **Primary Root Cause:** Identity-based attacks (79% of incidents)
- **Top Initial Access Vectors (IAVs):**
  1.  **Malicious Email:** 26%
  2.  **Phishing:** 24%
  3.  **Compromised Credentials:** 23%
- **Key Finding:** Exploited vulnerabilities are no longer the number one root cause.
- **MFA Evasion:** 97% of victims breached via compromised credentials had MFA in place.

This data indicates a clear strategic shift by attackers. Instead of searching for a rare zero-day, they are focusing on the much larger and more vulnerable human attack surface. Attackers are becoming more adept at social engineering and technical methods to steal credentials and bypass security controls designed to protect them.

## Technical Analysis
Attackers are successfully bypassing MFA through several methods:
1.  **MFA Fatigue / Push-Bombing:** Attackers with a valid username and password repeatedly send MFA push notifications to the user's mobile device, hoping the user will eventually approve one by accident or out of frustration.
2.  **Adversary-in-the-Middle (AiTM) Phishing:** Sophisticated phishing kits are used to create a proxy between the victim and the real login page. The victim enters their credentials and MFA code into the fake site, which are then passed to the real site by the attacker, who captures the session cookie. This cookie allows the attacker to bypass MFA entirely.
3.  **SIM Swapping:** Attackers convince a mobile carrier to transfer a victim's phone number to a SIM card they control, allowing them to intercept SMS-based MFA codes.

The report highlights that defenders can no longer simply "set and forget" MFA. They must assume that determined attackers can find a way around it.

## Impact Assessment
- **Misallocated Defenses:** The report suggests that many organizations are still overly focused on patching vulnerabilities ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)) while underinvesting in identity security. While patching is crucial, it is no longer sufficient on its own.
- **Increased Speed of Attack:** Attackers using compromised credentials can move much faster than those who have to perform reconnaissance to find and exploit a vulnerability. This reduces the defender's time to detect and respond.
- **Need for Advanced Controls:** The failure of traditional MFA in 97% of credential-based breaches demonstrates that organizations must invest in stronger, phishing-resistant MFA (like FIDO2) and ITDR solutions that can detect anomalous identity behavior.

--- 

### IOCs — Directly from Articles
This is a trend report and contains no specific IOCs.

### Cyber Observables — Hunting Hints
To detect identity-based attacks and MFA bypass, hunt for:

| Type | Value | Description | Context |
|---|---|---|---|
| `log_source` | Azure AD Sign-in Logs | Look for sign-ins with `"MfaDetail": "MFA completed in session"` followed by suspicious activity, or sign-ins from geographically impossible locations. | Azure AD / Entra ID logs |
| `event_id` | `500121` | Azure AD error code for "Authentication failed during strong authentication request," indicating a user denied an MFA prompt. A storm of these could be MFA fatigue. | Azure AD / Entra ID logs |
| `user_agent` | Mismatched or unusual user agents | Look for user agents that don't match the expected browser/OS for a user, which could indicate session cookie theft. | Web proxy logs, IdP logs |
| `other` | New MFA device registration | An attacker who gains access may try to register their own device for MFA. Alert on all new MFA device registrations for investigation. | Identity Provider (IdP) audit logs |

## Detection & Response
1.  **Identity Threat Detection and Response (ITDR):** Deploy ITDR solutions that baseline normal user login behavior and alert on anomalies. This includes impossible travel, logins from unfamiliar devices or locations, and unusual privilege escalation. This is a direct application of **[D3-UGLPA: User Geolocation Logon Pattern Analysis](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
2.  **Monitor MFA Events:** Actively monitor for MFA fatigue storms (multiple failed MFA attempts for one user) and alert the security team and the user.
3.  **Session Monitoring:** Monitor for session hijacking indicators, such as a session token being used from a different IP address or user-agent than the one it was issued to.

## Mitigation
1.  **Phishing-Resistant MFA:** The most critical mitigation is to move away from phishable MFA methods like SMS and push notifications. Adopt phishing-resistant methods like FIDO2/WebAuthn security keys. This is an advanced form of **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
2.  **User Training:** While not a panacea, continuous user training on how to spot sophisticated phishing attacks and the dangers of MFA fatigue is still essential. This falls under **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
3.  **Credential Hardening:** Enforce strong password policies, eliminate password reuse, and use credential protection features like Windows Defender Credential Guard.
4.  **Reduce Attack Surface:** As recommended by Sophos CISO Ross McKerchar, organizations must focus on reducing their external attack surface to limit the initial entry points for attackers.

**Tags:** Ransomware, Sophos, Identity, Phishing, MFA, Threat Intelligence, Initial Access

## Sources
- [Sophos State of Ransomware Report: A Step Ahead of Attackers](https://cybermagazine.com/news/sophos-state-of-ransomware-report-a-step-ahead-of-attackers) — Cyber Magazine (2026-07-17)

---
Source: https://cyber.netsecops.io/articles/identity-attacks-drive-majority-of-ransomware-sophos-report-confirms/
