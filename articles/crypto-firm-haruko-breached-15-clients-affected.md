# Crypto Firm Haruko Breached After Attacker Steals Access Token

**Severity:** high | **Category:** Data Breach,Cyberattack,Cloud Security | **Updated:** 2026-09-22 | **Reading time:** 4 min

London-based crypto infrastructure provider Haruko has suffered a cyberattack affecting 15 of its institutional clients. An attacker exploited an internal vulnerability to steal a user-access token from a process's memory. This token was then used to capture read-only API keys and trading data for clients who had not enabled IP whitelisting. Despite the keys being read-only, some smaller hedge-fund clients reportedly lost funds, suggesting potential security control weaknesses on their end. Haruko has since patched the vulnerability and rotated its secrets.

## Executive Summary

**[Haruko](https://www.haruko.com/)**, a London-based technology provider for institutional crypto trading, has confirmed it was the victim of a targeted cyberattack. The breach resulted in the exposure of sensitive data belonging to 15 of its clients. The attacker exploited a vulnerability in an internal **[Haruko](https://www.haruko.com/)** process to steal a user-access token from memory. This token was then used to access and exfiltrate other data, including read-only exchange API keys for clients who had not enabled IP whitelisting. Although the compromised keys were read-only, the incident reportedly led to financial losses for some smaller clients, highlighting the cascading risks of even limited-permission credential theft.

---

## Threat Overview

The attack on **[Haruko](https://www.haruko.com/)** was a sophisticated, targeted operation focused on stealing sensitive API credentials. **[Haruko](https://www.haruko.com/)'s** platform acts as a portfolio management system, aggregating data from various exchanges and DeFi protocols. The attacker identified and exploited a flaw in one of the company's internal services, allowing them to read data directly from the process's memory. This is a highly advanced technique that bypasses many traditional security controls.

The critical failure point that led to client impact was the lack of IP whitelisting on the affected accounts. This security feature, offered by **[Haruko](https://www.haruko.com/)**, would have restricted the use of the stolen API keys to pre-approved IP addresses. Because the 15 affected clients had not enabled this control, the attacker was able to use the stolen keys from their own infrastructure. The incident underscores the importance of implementing all available security features, especially in the high-stakes environment of cryptocurrency trading.

---

## Technical Analysis

The attack chain involved several advanced steps:

1.  **Initial Access & Vulnerability Exploitation**: The attacker exploited an unspecified vulnerability in one of **[Haruko](https://www.haruko.com/)'s** internal processes. The exact method of initial access is unknown, but the goal was to gain the ability to interact with a running service.
2.  **Credential Access via Memory Scraping**: The attacker was able to read the memory of the compromised process. From this memory space, they extracted a valid user-access token ([`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/)). This token granted them the privileges of the user associated with that session.
3.  **Lateral Movement/Data Access**: Using the stolen token, the attacker was able to access other data held within the same process's memory. This included the read-only API keys that **[Haruko](https://www.haruko.com/)** uses to connect to its clients' exchange accounts ([`T1003.001 - OS Credential Dumping: LSASS Memory`](https://attack.mitre.org/techniques/T1003/001/), though applied to a different process).
4.  **Use of Stolen Credentials**: The attacker then used these stolen API keys to interact with the clients' accounts on various cryptocurrency exchanges. Since IP whitelisting was not enabled for the affected clients, the exchanges accepted the API calls from the attacker's infrastructure ([`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).

While the keys were designated as "read-only," some clients still lost funds. This could be due to several reasons: the keys may have had more permissions than believed, or the attacker may have used the read-only access to gain information (e.g., account balances) to facilitate a separate attack, such as social engineering or exploiting a different vulnerability on the exchange itself.

---

## Impact Assessment

The breach had a direct financial impact on some of **[Haruko](https://www.haruko.com/)'s** clients, with reported losses ranging from $250,000 to $1.2 million. This demonstrates that even the compromise of "read-only" credentials can lead to monetary loss. The incident also carries significant reputational damage for **[Haruko](https://www.haruko.com/)**, as trust is paramount for a firm providing infrastructure for institutional finance. For the affected clients, the exposure of their trading data and API keys necessitates a full security review, credential rotation, and an investigation into how the financial losses occurred. The incident serves as a critical lesson for all institutional crypto participants on the importance of defense-in-depth and enabling all recommended security controls.

---

## IOCs — Directly from Articles

No specific file hashes, domains, or IP addresses were provided in the source articles.

---

## Cyber Observables — Hunting Hints

For firms in the crypto space, security teams may want to hunt for the following to detect similar threats:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | API Gateway / Exchange Logs | Monitor for API key usage from new or unexpected IP addresses or geographical regions. This is the primary indicator that a key has been compromised. | Exchange security logs, SIEM | high |
| other | API Key Permission Audit | Regularly audit the permissions of all API keys. Alert on any keys, especially read-only keys, that are used to perform actions they shouldn't be capable of. | Internal audit scripts, API security tools | high |
| process_name | `(Internal Service Name)` | Monitor internal services for unexpected memory access or crashes, which could indicate an attempt to exploit a memory-related vulnerability. | EDR, Application Performance Monitoring (APM) | medium |
| other | Lack of IP Whitelisting | Proactively identify all external-facing API keys that do not have IP whitelisting enabled. This is a critical security gap. | Configuration management database, security audits | high |

---

## Detection & Response

**Detection:**

*   **API Security**: Deploy API security solutions that can baseline normal usage patterns for each key and alert on anomalies, such as access from new IPs, unusual user agents, or a sudden change in the type or volume of API calls. D3FEND's [`User Geolocation Logon Pattern Analysis (D3-UGLPA)`](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis) is directly applicable here.
*   **Memory Integrity Monitoring**: For critical services, consider solutions that can monitor for unauthorized memory access or process hollowing, although this can be challenging to implement without performance impact.
*   **Configuration Auditing**: Continuously audit security configurations, such as the status of IP whitelisting on API keys, and alert on any configurations that do not meet the security baseline.

**Response:**

1.  **Revoke Credentials**: Immediately revoke the stolen access token and all potentially compromised API keys.
2.  **Force Rotation**: Require all clients to rotate their API keys and server-side secrets.
3.  **Patch Vulnerability**: Identify and patch the internal vulnerability that allowed the memory scraping to occur.
4.  **Enforce Security Controls**: Mandate the use of security features like IP whitelisting for all clients.

---

## Mitigation

*   **Mandate IP Whitelisting**: Do not treat critical security controls like IP whitelisting as optional. Enforce them as a mandatory part of the service for all clients ([`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/)).
*   **Credential Hardening**: Store sensitive credentials like API keys and access tokens in a secure vault (e.g., HashiCorp Vault, AWS Secrets Manager) rather than in process memory where they could be scraped. Implement short-lived tokens that expire quickly ([`M1043 - Credential Access Protection`](https://attack.mitre.org/mitigations/M1043/)).
*   **Process Isolation**: Harden internal services to prevent memory leakage between processes. Use sandboxing or other isolation techniques to limit the blast radius if one component is compromised ([`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/)).
*   **Defense-in-Depth**: Assume that any single security control can fail. The fact that read-only keys led to financial loss shows the need for multiple layers of security, both at the infrastructure provider and the client level.

**Tags:** Haruko, Cryptocurrency, Data Breach, API Security, Access Token, Hedge Fund

## Sources
- [Crypto tech provider Haruko hit by cyberattack affecting 15 clients, some funds lost](https://cryptonews.net/news/security/33462044/) — CryptoNews (2026-09-18)
- [Haruko breach hit 15 non-whitelisted clients via stolen access token](https://www.altcoinbuzz.io/haruko-breach-hit-15-non-whitelisted-clients-via-stolen-access-token) — Altcoin Buzz (2026-09-18)
- [Haruko Cyberattack Hits Certain Clients After Access Token Theft](https://www.crowdfundinsider.com/2026/09/311288-haruko-cyberattack-hits-certain-clients-after-access-token-theft/) — Crowdfund Insider (2026-09-19)
- [Navigating Cybersecurity Risks in Crypto Custody: Lessons From the Haruko Attack](https://goldprice.com/news/navigating-cybersecurity-risks-in-crypto-custody-lessons-from-the-haruko-attack) — GoldPrice.com

---
Source: https://cyber.netsecops.io/articles/crypto-firm-haruko-breached-15-clients-affected/
