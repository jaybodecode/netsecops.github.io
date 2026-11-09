# AitM Phishing Campaign Targets Microsoft 365 Payroll Data

**Severity:** high | **Category:** Phishing,Threat Actor,Cloud Security | **Updated:** 2026-08-08 | **Reading time:** 6 min

A widespread adversary-in-the-middle (AitM) phishing campaign is targeting hundreds of organizations to compromise Microsoft 365 accounts. The attackers, linked to groups like Storm-2657 and 'Payroll Pirates', use voicemail-themed phishing emails and a complex redirection chain to lead victims to a decoy login page. This AitM setup captures credentials and MFA session tokens in real-time. Post-compromise, the attackers use residential proxies and automated tools to maintain access, enumerate users, and specifically search for and exfiltrate emails related to payroll and finance.

## Executive Summary

A large-scale and financially motivated adversary-in-the-middle (AitM) phishing campaign is actively targeting **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** accounts across hundreds of organizations. The attack is attributed to threat clusters tracked as **Storm-2657** and **Storm-2755** (also known as **Payroll Pirates**). The campaign begins with voicemail-themed phishing emails that lure victims through a multi-stage redirection chain, ultimately landing them on a sophisticated AitM phishing site. This site acts as a proxy, capturing the user's credentials and, critically, their multi-factor authentication (MFA) session token in real-time. After hijacking the account, the attackers use residential proxies to blend in with normal traffic and automated tooling to maintain the session. Their primary goal is to perform reconnaissance within the victim's mailbox, searching for and exfiltrating sensitive emails and documents related to payroll, invoices, and banking, with the ultimate aim of payroll diversion.

---

## Threat Overview

This campaign demonstrates a clear, financially motivated objective executed with sophisticated tools and techniques designed to bypass modern security controls.

### Attack Chain
1.  **Initial Lure:** The attack begins with a phishing email, often disguised as a voicemail notification.
2.  **Redirection Chain:** The link in the email does not lead directly to the phishing site. Instead, it initiates a six-stage redirection chain that leverages legitimate services like **[Google Meet](https://meet.google.com/)** and **[Amazon S3](https://aws.amazon.com/s3/)** to evade email security filters.
3.  **AitM Phishing:** The final destination is an AitM phishing page that perfectly mimics the **Microsoft** login portal. This page acts as a reverse proxy between the victim and **Microsoft**.
4.  **Credential and Session Theft:** The AitM proxy captures the user's username, password, and the MFA session cookie after the user successfully authenticates.
5.  **Evasion:** The attackers use residential proxies for their post-compromise activities, making their malicious sign-ins difficult to distinguish from legitimate remote user traffic.
6.  **Automated Persistence:** Automated tools are used to maintain the hijacked session, refreshing it every eight hours to avoid expiration.
7.  **Reconnaissance and Exfiltration:** The attackers use the **[Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview)** to search the compromised mailbox for keywords like "payroll," "invoice," "payment," and "banking." They also enumerate users to identify others in finance and HR departments for further targeting.

---

## Technical Analysis

The combination of AitM phishing, residential proxy usage, and API-based reconnaissance makes this a highly effective campaign.

- **AitM Phishing:** This is the key technique for bypassing MFA. By proxying the entire login flow, the attackers can steal the session cookie, which is the 'key' that proves the user has already completed an MFA-protected login.
- **Residential Proxies:** Using IP addresses from legitimate residential ISPs allows the attackers' traffic to blend in. Blocking an entire residential IP range is not feasible for most organizations, as it would block legitimate customers or remote employees.
- **Microsoft Graph API Abuse:** Instead of manually browsing the mailbox, the attackers use the **Graph API** to programmatically and rapidly search for high-value information. This is faster, stealthier, and less likely to be noticed by the user.

### MITRE ATT&CK Mapping

- **[`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/):** The initial email with the malicious link.
- **[`T1110.004 - Credential Stuffing`](https://attack.mitre.org/techniques/T1110/004/):** The use of an AitM proxy to defeat MFA and steal session tokens.
- **[`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/):** The primary goal of the AitM phishing page.
- **[`T1090.002 - External Proxy`](https://attack.mitre.org/techniques/T1090/002/):** Use of residential proxies to obscure the origin of the attack.
- **[`T1114.002 - Remote Email Collection`](https://attack.mitre.org/techniques/T1114/002/):** Using the **Graph API** to search for and exfiltrate emails.
- **[`T1078.004 - Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/):** The attackers use the compromised cloud account to conduct their operations.

---

## Impact Assessment

The campaign has targeted hundreds of organizations across healthcare, education, manufacturing, and government, primarily in the U.S., Canada, and Europe.

- **Payroll Diversion:** The ultimate goal of the "Payroll Pirates" is to use the information gathered to socially engineer HR/payroll staff into changing an employee's direct deposit information, diverting their salary to an attacker-controlled account.
- **Business Email Compromise (BEC):** The stolen information about invoices and payments can be used to launch sophisticated BEC attacks, tricking the company or its clients into sending payments to fraudulent accounts.
- **Data Breach:** The exfiltration of emails containing sensitive financial and employee PII constitutes a data breach, with associated regulatory and notification requirements.

---

## IOCs — Directly from Articles

No specific IOCs were provided in the source articles.

---

## Cyber Observables — Hunting Hints

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Entra ID Sign-in Logs | Look for successful logins from residential ISP ASNs, especially if the user is not expected to be working from home. | Microsoft Entra ID Sign-in Logs | medium |
| user_agent | `Microsoft Graph` | Correlate logins from suspicious IPs with subsequent high-volume API access using the Microsoft Graph User-Agent. | Entra ID Logs, Cloud App Security Logs | high |
| command_line_pattern | `Search-Mailbox` or Graph API search queries | Monitor for mailbox searches with keywords like 'payroll', 'invoice', 'payment', 'direct deposit'. | Microsoft 365 Unified Audit Log | high |
| network_traffic_pattern | Redirection through Google Meet/S3 | Analyze email headers and links for patterns involving legitimate services used as redirectors. | Email gateway logs, URL analysis tools | medium |

---

## Detection & Response

### Detection
1.  **Enhanced Email Filtering:** Use email security gateways that can perform sandboxing and analysis of URLs to detect the multi-stage redirection chain.
2.  **Entra ID Identity Protection:** Enable and monitor alerts from **Entra ID Identity Protection**, which can detect risky sign-ins, impossible travel, and other anomalies associated with account takeover.
3.  **Audit Log Monitoring:** Create specific detection rules in your SIEM to alert on suspicious **Graph API** usage, such as an application enumerating all users or performing keyword searches across many mailboxes. This is an application of D3FEND's **[`Domestic User Activity Analysis`](https://d3fend.mitre.org/technique/d3f:DomesticUserActivityAnalysis)**.

### Response
- Upon detecting a compromised account, immediately revoke all session tokens for the user, reset their password, and investigate all activity from the time of compromise. Check for changes to mailbox rules (e.g., forwarding rules) and MFA settings.

---

## Mitigation

1.  **Phishing-Resistant MFA:** As with other AitM campaigns, the most effective technical mitigation is the adoption of phishing-resistant MFA, such as **[FIDO2](https://fidoalliance.org/)** security keys. This breaks the AitM attack chain.
2.  **User Training:** Train users to be suspicious of voicemail-themed emails and to verify the authenticity of any login prompts, especially those that follow a series of redirects.
3.  **Conditional Access Policies:** Implement Conditional Access policies that block sign-ins from legacy authentication protocols and require logins to come from trusted locations or compliant devices.
4.  **Limit API Permissions:** Review permissions granted to third-party applications and scripts that use the **Graph API**. Enforce the principle of least privilege to limit what an attacker can do even if they gain control of an application.

**Tags:** AitM, Phishing, Microsoft 365, Payroll Pirates, Storm-2657, Storm-2755, BEC, Session Hijacking

## Sources
- [Microsoft 365 AitM Phishing Hijacks Accounts to Collect Payroll and Finance Emails](https://thehackernews.com/2026/08/microsoft-365-aitm-phishing-hijacks.html) — The Hacker News
- [Payroll Pirates: Strange New Tides in Business Email Compromise](https://arcticwolf.com/resources/blog/payroll-pirates-strange-new-tides-in-business-email-compromise/) — Arctic Wolf

---
Source: https://cyber.netsecops.io/articles/microsoft-365-aitm-phishing-campaign-targets-payroll-and-finance-data/
