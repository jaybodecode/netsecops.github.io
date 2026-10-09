# Vishing Campaign 'PREY-0058' Targets Execs for M365 Data Theft

**Severity:** high | **Category:** Phishing,Data Breach,Cloud Security | **Updated:** 2026-09-14 | **Reading time:** 5 min

A data theft and extortion campaign, tracked as PREY-0058, is targeting corporate executives using a sophisticated attack chain. Attackers use voice phishing (vishing) to impersonate IT help desks, directing victims to an adversary-in-the-middle (AitM) phishing site to steal Microsoft 365 session tokens. The group then uses residential proxies to access cloud accounts (SharePoint, OneDrive) and exfiltrate data for extortion. The campaign shows overlaps with the threat actor UNC6671.

## Executive Summary
A sophisticated and widespread data extortion campaign is targeting high-level corporate employees, including directors and vice presidents. The threat cluster, tracked by **[Arctic Wolf](https://arcticwolf.com/)** as **PREY-0058**, employs a multi-faceted approach that combines voice phishing (vishing), adversary-in-the-middle (AitM) phishing infrastructure, and residential proxies to compromise **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** accounts. The attackers impersonate the victim's IT help desk over the phone, tricking them into authenticating on a malicious site. This allows the threat actors to steal the user's session token, bypass **[MFA](https://www.cisa.gov/mfa)**, and gain access to sensitive data stored in SharePoint, OneDrive, and other cloud services. The exfiltrated data is then used in extortion demands. The campaign's TTPs show a significant overlap with a group **[Mandiant](https://www.mandiant.com/)** tracks as UNC6671.

---

## Threat Overview
The PREY-0058 attack chain is methodical and designed to bypass modern security controls like MFA.

1.  **Initial Contact (Vishing):** The attack begins with a phone call to a targeted executive. The attacker spoofs the company's IT help desk phone number and uses social engineering to create a sense of urgency, such as a required security update or account migration.

2.  **Phishing Lure:** During the call, the victim is directed to a malicious website. These domains are crafted to look legitimate, often using patterns like `<victim organization>.<lure domain>` (e.g., `acme-corp.mfaregister.com`).

3.  **Session Token Theft:** The malicious site is an **[Adversary-in-the-Middle (AitM)](https://www.microsoft.com/en-us/security/business/security-101/what-is-adversary-in-the-middle-aitm-attack)** phishing platform. When the user enters their credentials and completes the MFA prompt (e.g., by tapping 'Approve' on their phone), the AitM framework intercepts the entire authentication flow and captures the resulting session cookie.

4.  **Session Replay and Data Exfiltration:** The attackers immediately use the stolen session cookie to log into the victim's Microsoft 365 account. To evade detection, these logins are routed through residential proxy services like NodeMaven, with IP addresses often geolocated to the victim's region. Once inside, the attackers access and exfiltrate large volumes of data from SharePoint, OneDrive, Exchange Online, and Box.

5.  **Extortion:** After securing the data, the threat actors contact the victim organization, threatening to leak the stolen information unless a ransom is paid.

## Technical Analysis
This campaign is notable for its focus on identity and data, rather than endpoint compromise. The attackers do not deploy malware or attempt traditional lateral movement within the corporate network. Their entire operation is cloud-native, abusing legitimate authentication protocols and cloud services.

The use of residential proxies is a key defense evasion technique. It makes the malicious logins appear to originate from legitimate residential ISPs in the same geographic area as the victim, making IP-based blocking and geofencing policies ineffective.

The overlap with UNC6671 suggests a well-organized and persistent threat actor. This group's tradecraft is specifically designed to circumvent MFA, which many organizations rely on as their primary defense against account takeover.

### MITRE ATT&CK Techniques
*   [`T1566.004 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1566/004/): The initial vishing call to the target.
*   [`T1598.003 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/003/): Directing the user to the malicious AitM site.
*   [`T1649 - Steal or Forge Authentication Tokens`](https://attack.mitre.org/techniques/T1649/): The core of the attack, capturing the session cookie via the AitM site.
*   [`T1114.002 - Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/): Accessing and exfiltrating data from Exchange Online.
*   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): Exfiltrating files from SharePoint and OneDrive.
*   [`T1071.004 - DNS`](https://attack.mitre.org/techniques/T1071/004/): Using residential proxies for C2 and access, which involves DNS lookups.

## Impact Assessment
The campaign targets high-value individuals with access to the most sensitive corporate data. A successful attack can lead to:
*   Breach of confidential business strategies, financial records, and intellectual property.
*   Significant extortion costs.
*   Reputational damage and loss of customer trust if data is leaked.
*   Regulatory fines for data breaches, especially if PII or PHI is involved.

Because the attack bypasses MFA, it undermines confidence in a foundational security control and demonstrates that technical solutions must be paired with continuous user education.

## Detection & Response
*   **Monitor for Impossible Travel:** While attackers use geolocated proxies, alerts for logins from new devices, ASNs, or ISPs, even within the same region, can be valuable. Correlate this with other suspicious activity.
*   **Analyze Session Activity:** Look for Microsoft 365 sessions with anomalous characteristics, such as an unusually high volume of file downloads or access to multiple SharePoint sites in a short period. Microsoft Purview and Defender for Cloud Apps can help detect this.
*   **User-Reported Phishing:** A robust system for employees to report suspicious calls and emails is a critical early warning signal.
*   **Hunt for Lure Domains:** Proactively search DNS and proxy logs for domains matching the patterns used by PREY-0058, such as those containing `mfaregister` or `setpasskey`.

## Mitigation
1.  **Phishing-Resistant MFA:** The most effective technical control is to move towards phishing-resistant MFA, such as FIDO2 security keys or certificate-based authentication. These methods bind the authentication to the hardware and are not susceptible to AitM credential interception.
2.  **User Education:** Conduct ongoing security awareness training focused on vishing. Teach employees, especially executives, to be suspicious of unsolicited calls from 'IT' and to establish a secondary verification channel (e.g., calling the help desk back on a known-good number) before taking any action.
3.  **Conditional Access Policies:** Implement strict Microsoft 365 Conditional Access policies. For example, require logins to come from compliant or hybrid-joined devices. This would block attackers using stolen session tokens on their own machines.
4.  **Limit Session Lifetimes:** Configure shorter session lifetimes and idle timeouts in Microsoft 365 to reduce the window of opportunity for an attacker to use a stolen token.

**Tags:** Vishing, Phishing, AitM, Microsoft 365, Data Breach, Extortion, Session Hijacking

## Sources
- [Fake IT Calls Target Executives in Microsoft 365 Data Theft and Extortion Attacks](https://thehackernews.com/2026/09/microsoft-365-attackers-use-help-desk.html) — The Hacker News (2026-09-07)
- [Widespread Vishing and Data Extortion Campaign (PREY-0058) Targeting Microsoft 365](https://arcticwolf.com/resources/blog/prey-0058-vishing-campaign-targets-microsoft-365/) — Arctic Wolf (2026-09-07)

---
Source: https://cyber.netsecops.io/articles/vishing-campaign-prey-0058-targets-executives-for-microsoft-365-data-theft/
