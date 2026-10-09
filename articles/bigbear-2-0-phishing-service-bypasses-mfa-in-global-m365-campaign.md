# 'BigBear 2.0' Phishing Service Bypasses MFA in Global M365 Campaign

**Severity:** high | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2026-09-08 | **Reading time:** 6 min

A large-scale phishing-as-a-service (PhaaS) operation, named 'BigBear 2.0,' is targeting hundreds of organizations globally with Microsoft 365 credential theft attacks. Researched by CloudSEK, the service uses a customized version of the Evilginx2 adversary-in-the-middle (AiTM) framework to bypass multi-factor authentication (MFA) and steal session cookies. The operation, managed by an actor named 'General Boss,' has compromised over 5,000 records across 40+ countries. The framework uses advanced techniques like custom JavaScript to disable FIDO2/WebAuthn and residential proxies to evade detection. IT service providers and MSPs are primary targets, indicating a potential for supply chain attacks.

## Executive Summary
Researchers at **[CloudSEK](https://cloudsek.com/)** have uncovered a large-scale, sophisticated Phishing-as-a-Service (PhaaS) operation named 'BigBear 2.0'. Active since June 2026, the service provides threat actors with a toolkit to conduct adversary-in-the-middle (AiTM) attacks specifically designed to bypass multi-factor authentication (MFA) for **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** accounts. The framework is a customized version of the notorious **[Evilginx2](https://github.com/kgretzky/evilginx2)** toolkit. The operation, allegedly run by an individual known as 'General Boss', has already resulted in the theft of thousands of credential records and session cookies from victims in over 40 countries. The primary targets appear to be IT service providers and MSPs, suggesting a strategic focus on enabling downstream supply chain attacks.

---

## Threat Overview
'BigBear 2.0' operates as a turnkey PhaaS platform. The operator, 'General Boss', manages the infrastructure and leases access to at least five affiliate operators. These affiliates launch phishing campaigns, and the stolen credentials and session cookies are delivered to them in real-time via **[Telegram](https://telegram.org/)** bots.

The attack employs an AiTM technique. The victim receives a phishing email and clicks a link to a malicious server that proxies the legitimate Microsoft login page. The victim enters their credentials and completes their MFA challenge on what appears to be the real site. However, because all traffic is passing through the attacker's server, the framework is able to intercept the username, password, and, most importantly, the session cookie that is generated *after* the successful MFA-authenticated login.

### Technical Analysis
The 'BigBear 2.0' framework includes several advanced features:
- **Custom Evilginx2:** The core of the service is a modified version of Evilginx2.
- **MFA Bypass:** It specializes in session cookie theft to bypass all but the most advanced forms of MFA.
- **FIDO2/WebAuthn Disablement:** The framework uses custom JavaScript injections to attempt to disable or downgrade modern, phishing-resistant MFA methods.
- **Residential Proxies:** It uses geo-matched residential proxy pools to make login attempts appear legitimate and bypass bot detection and location-based Conditional Access policies.
- **Infrastructure:** The operation was observed using 42 VPS nodes, primarily hosted at **[Vultr](https://www.vultr.com/)**.

**MITRE ATT&CK Techniques Observed/Inferred:**
- **Initial Access:** [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)
- **Credential Access:** [`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/), [`T1606.002 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1606/002/)
- **Defense Evasion:** [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/), [`T1611 - Adversary-in-the-Middle`](https://attack.mitre.org/techniques/T1611/)
- **Command and Control:** [`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/)

---

## Impact Assessment
CloudSEK's investigation into the operator's panel revealed the scale of the operation:
- **5,137** credential records exfiltrated.
- **4,148** session cookies stolen.
- **474** complete MFA-bypassed authentications.
- Victims from **3,331** unique IP addresses across more than 40 countries.

The impact of a successful attack is severe:
- **Full Account Takeover:** Attackers gain complete access to the victim's M365 account, including email, files, and connected applications.
- **Supply Chain Risk:** By targeting MSPs, attackers can potentially pivot from a compromised MSP account to attack their downstream clients.
- **Business Email Compromise (BEC):** The compromised account can be used to launch convincing BEC attacks, leading to financial fraud.

## IOCs — Directly from Articles
No specific IOCs like domains or hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for signs of AiTM phishing and session hijacking:

| Type | Value | Description |
|---|---|---|
| log_source | Microsoft Entra ID Sign-in logs | Look for sign-ins with `MFA requirement satisfied by claim in the token` where the IP address, location, or device information is anomalous. This indicates a replayed session token. |
| network_traffic_pattern | Logins from Vultr ASN | The campaign used Vultr hosting. While not definitive, logins from Vultr's ASN (AS20473) to non-admin accounts should be scrutinized. |
| url_pattern | Lookalike domains | Phishing links will use domains that are visually similar to `microsoft.com`, `office.com`, or the target company's domain. |

## Detection & Response
1.  **Monitor Sign-in Logs:** Continuously monitor Microsoft Entra ID (Azure AD) sign-in logs for suspicious activity. Pay close attention to the `MFA detail` and `Conditional Access` policies applied to a login. A successful login that bypasses an expected policy is a major red flag.
2.  **Token Replay Detection:** Look for impossible travel scenarios or session logins from multiple, disparate locations in a short period. Microsoft's Identity Protection has built-in capabilities for this.
3.  **User-Reported Phishing:** Implement a robust process for users to report suspicious emails. Analyze these reports quickly to identify phishing domains and block them at the network perimeter.

## Mitigation
1.  **Phishing-Resistant MFA:** The most effective mitigation is to deploy phishing-resistant MFA, such as FIDO2 security keys. These methods are not vulnerable to AiTM attacks because they bind the session to the hardware and origin, preventing token replay.
2.  **Conditional Access Policies:** Strengthen Conditional Access policies to block logins from known malicious or anonymizing infrastructure (like certain data center IP ranges) and to enforce device compliance. A compliant, managed device is harder to compromise.
3.  **User Training:** Train users to be vigilant about login prompts and to inspect URLs carefully before entering credentials. They should be suspicious of any unexpected requests to re-authenticate.
4.  **Email Security:** Use advanced email security solutions that can detect and block phishing links, including those using lookalike domains and other evasion techniques.

**Tags:** Phishing, PhaaS, MFA Bypass, Adversary-in-the-Middle, AiTM, Evilginx2, Microsoft 365, BigBear 2.0

## Sources
- [Tracking BigBear 2.0 Evilginx2 Phishing Campaign - CloudSEK](https://www.cloudsek.com/blog/tracking-bigbear-2-0-evilginx2-phishing-campaign) — CloudSEK (2026-09-07)

---
Source: https://cyber.netsecops.io/articles/bigbear-2-0-phishing-service-bypasses-mfa-in-global-m365-campaign/
