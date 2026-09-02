# Wall Street Giants Targeted in Coordinated AI Vishing Campaign

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-08-08 | **Reading time:** 6 min

A sophisticated voice-phishing (vishing) campaign is targeting major financial firms like Blackstone, KKR, Citadel, and Point72. The threat actor, tracked as UNC6671 (aka BlackFile or Redact), uses AI voice cloning to impersonate IT staff and trick employees into giving up credentials for Microsoft 365 and Okta. The attackers direct victims to adversary-in-the-middle (AitM) phishing sites that capture passwords and MFA tokens in real-time. Several firms have confirmed being targeted, highlighting the growing threat of AI-powered social engineering in the financial sector.

## Executive Summary

A large-scale and sophisticated voice-phishing (vishing) campaign is actively targeting employees at some of the world's largest financial institutions. The targets include private-equity giants **Blackstone** and **KKR**, hedge funds like **Citadel** and **Point72**, and the exchange operator **CME Group**. The financially motivated threat actor, tracked as **[UNC6671](https://www.mandiant.com/resources/blog/unc6671-blackfile-redact-vishing)** (also known as **BlackFile** and now rebranding as **Redact**), is using AI-powered voice cloning technology to impersonate corporate IT helpdesk personnel. The attackers socially engineer employees, directing them to adversary-in-the-middle (AitM) phishing sites designed to steal **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** and **[Okta](https://www.okta.com)** credentials, including real-time MFA tokens. The campaign's success in targeting high-value financial firms underscores the increasing effectiveness of AI-enhanced social engineering attacks.

---

## Threat Overview

This campaign represents a significant evolution in phishing, combining AI technology with proven AitM techniques to bypass modern authentication controls.

- **Threat Actor:** **UNC6671 / BlackFile / Redact**, a financially motivated group.
- **Targets:** High-value employees at major financial firms, including hedge funds, private equity firms, and exchange operators.
- **Attack Vector:** Voice-phishing (vishing). Attackers call employees on their personal mobile phones.
- **Tactic:** The attackers use AI voice cloning to mimic the voices of IT support staff, creating a sense of legitimacy and urgency (e.g., "We need you to approve this security update.").
- **Phishing Infrastructure:** Victims are directed to highly convincing, lookalike login portals for **Microsoft 365** and **Okta**. These are AitM proxies that sit between the user and the real service.
- **Goal:** To steal credentials (username, password) and intercept multi-factor authentication (MFA) tokens or session cookies in real-time, thereby gaining full access to the victim's account.
- **Post-Compromise:** Once access is gained, the group uses automated tools to exfiltrate sensitive data from cloud and SaaS applications.

Firms like **Two Sigma** and **Point72** have confirmed being targeted but stated they thwarted the attempts before significant data loss occurred.

---

## Technical Analysis

The attack's technical sophistication lies in its seamless integration of social engineering and real-time credential capture.

- **AI Voice Cloning:** The use of AI to mimic voices overcomes a traditional vishing hurdle: the caller's voice not sounding familiar or professional. This makes the social engineering aspect far more convincing.
- **Adversary-in-the-Middle (AitM):** This is the key technical component for bypassing MFA. The phishing site is not a static page; it's a reverse proxy. When the victim enters their credentials, the AitM kit forwards them to the real login service (e.g., **Microsoft**). When the real service prompts for an MFA code, the prompt is passed back to the victim. The victim enters their MFA code into the phishing site, which is then captured and used by the attacker to complete the login and steal the resulting session cookie.

### MITRE ATT&CK Mapping

- **[`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/):** The core of the attack is vishing, using voice calls to manipulate victims.
- **[`T1648 - AI-Generated Content`](https://attack.mitre.org/techniques/T1648/):** The use of AI voice cloning falls under this new ATT&CK technique for creating deceptive content.
- **[`T1598.003 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/003/):** The vishing call directs the user to a malicious link.
- **[`T1110.004 - Credential Stuffing`](https://attack.mitre.org/techniques/T1110/004/):** The attackers use an AitM setup to steal credentials in real-time, effectively bypassing MFA.
- **[`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/):** The ultimate goal of the AitM attack is to steal the authenticated session cookie, which allows the attacker to take over the session without needing the password or MFA again.
- **[`T1114 - Email Collection`](https://attack.mitre.org/techniques/T1114/):** Post-compromise, the attackers exfiltrate sensitive data from the user's email account.

---

## Impact Assessment

A successful attack against an employee at a major financial firm can have devastating consequences.
- **Financial Data Theft:** Attackers can gain access to non-public market information, M&A details, trading strategies, and client financial data.
- **Fraud:** Compromised accounts can be used to authorize fraudulent wire transfers or manipulate financial records.
- **Market Manipulation:** Access to pre-release earnings reports or other sensitive information could be used for insider trading or market manipulation.
- **Widespread Compromise:** A single compromised account, especially a privileged one, can be used as a beachhead to move laterally within the firm's network.

---

## IOCs — Directly from Articles

No specific domains, IPs, or other IOCs were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Detecting AitM activity requires looking for subtle anomalies in the authentication process.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | IdP Logs (Okta, Entra ID) | Look for successful logins from unfamiliar IP addresses, ASNs, or geolocations, especially if they occur shortly after a known vishing attempt. | SIEM, Identity Provider logs | high |
| user_agent | Unusual User-Agent strings | AitM phishing kits may use non-standard or unusual User-Agent strings that differ from legitimate browser traffic. | Web proxy logs, IdP logs | low |
| network_traffic_pattern | Mismatched IP geolocation | A user's login IP is in one country, but their VPN or corporate IP is in another. | IdP logs, VPN logs, Firewall logs | medium |
| event_id | Suspicious MFA device registration | Attackers may attempt to register their own device for MFA after compromising an account. Monitor for new MFA device enrollments. | IdP logs | high |

---

## Detection & Response

### Detection
- **User Reporting:** The most effective detection is a well-trained workforce that can recognize and report suspicious calls to the security team.
- **Identity Provider (IdP) Analytics:** Modern IdPs like **Okta** and **Microsoft Entra ID** have built-in risk engines that can detect impossible travel, anomalous device fingerprints, and other signs of session hijacking.
- **Monitor for AitM Phishing Kits:** Security teams can proactively hunt for newly registered domains that impersonate their own brand and use tools that detect the signatures of known AitM phishing kits.

### Response
- **Immediate Session Revocation:** If a compromise is suspected, the first step is to revoke all active sessions for the user's account and force a password reset. This is a key D3FEND technique: **[`User-initiated Compromise Remediation`](https://d3fend.mitre.org/technique/d3f:User-initiatedCompromiseRemediation)**.
- **Account Lockout:** Temporarily lock the account to prevent further unauthorized access while the investigation is underway.
- **Forensic Analysis:** Analyze logs from the IdP, endpoints, and SaaS applications to determine the scope of the compromise and what data was accessed or exfiltrated.

---

## Mitigation

1.  **User Training:** This is the most critical mitigation. Employees must be trained to be suspicious of any unsolicited call, especially those creating urgency and asking for credentials or for them to visit a website. They should be instructed to hang up and call the IT helpdesk back on a known, official number.
2.  **Phishing-Resistant MFA:** The ultimate technical control against AitM attacks is to use phishing-resistant MFA, such as **[FIDO2](https://fidoalliance.org/)** security keys (e.g., YubiKey). These methods tie the authentication to the specific domain, and the browser will not allow the credential to be used on a phishing site, breaking the AitM chain. This is an application of D3FEND's **[`Hardware-based Process Isolation (D3-HBPI)`](https://d3fend.mitre.org/technique/d3f:Hardware-basedProcessIsolation)** at the authentication level.
3.  **Conditional Access Policies:** Implement strict conditional access policies that block logins from non-compliant devices, untrusted locations, or IP addresses associated with anonymous proxies.
4.  **Limit Personal Device Use:** Enforce policies that restrict employees from logging into corporate resources from personal, unmanaged devices, which are harder to monitor and secure.

**Tags:** Vishing, Phishing, AI, Voice Cloning, UNC6671, BlackFile, Wall Street, Finance, AitM

## Sources
- [Hackers hit Wall Street's biggest names with a phone-call scam](https://thenextweb.com/news/vishing-campaign-blackstone-kkr-cme-finance-firms) — The Next Web
- [Top US hedge funds targeted by major vishing campaign — Blackstone, KKR and CME among those under fire](https://www.techradar.com/pro/security/top-us-hedge-funds-targeted-by-major-vishing-campaign-blackstone-kkr-and-cme-among-those-under-fire) — TechRadar
- [Phone-Scam Hackers Now Target Wall Street's Biggest Firms](https://beincrypto.com/phone-scams-wall-street-financial-firms/) — BeInCrypto
- [Major Hedge Funds Face Wave of Voice-Phishing Cyberattack Attempts](https://www.briefs.co/news/major-hedge-funds-face-wave-of-voice-phishing-cyberattack-at/) — Briefs Finance
- [Point72, Citadel among hedge funds hit by AI vishing attacks](https://www.investmentnews.com/fintech/point72-citadel-among-hedge-funds-hit-by-ai-vishing-attacks/267708) — InvestmentNews

---
Source: https://cyber.netsecops.io/articles/wall-street-giants-targeted-in-ai-voice-phishing-campaign/
