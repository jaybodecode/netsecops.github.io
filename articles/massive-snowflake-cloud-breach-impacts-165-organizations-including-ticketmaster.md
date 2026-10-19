# Snowflake Cloud Platform Breach Hits 165 Customers, Including Ticketmaster and Santander

**Severity:** critical | **Category:** Data Breach,Cloud Security,Cyberattack | **Updated:** 2026-06-21

A major security incident has struck cloud data platform Snowflake, affecting at least 165 of its customers. Attackers leveraged stolen customer credentials to gain access to their Snowflake instances, in some cases bypassing multi-factor authentication. High-profile victims include Ticketmaster and Santander Bank, with massive amounts of customer data reportedly exfiltrated. The incident highlights the persistent threat of credential-based attacks against cloud environments and raises questions about the effectiveness of current MFA implementations.

## Executive Summary

A widespread and damaging security breach has occurred involving the cloud data platform **[Snowflake](https://www.snowflake.com/en/)**, leading to the compromise of sensitive data for at least 165 of its customers. The attack was not a breach of Snowflake's core platform but rather a targeted campaign against its customers using stolen credentials. Threat actors used credentials, likely harvested from infostealer malware infections on non-corporate systems, to log into customer Snowflake instances. High-profile victims confirmed to be affected include **Ticketmaster** and **Santander Bank**. The incident is a stark illustration of the catastrophic impact of credential compromise in the cloud and underscores the limitations of certain forms of multi-factor authentication (MFA) when not properly configured or enforced.

---

## Threat Overview

The attack campaign appears to be focused and systematic. Threat actors have been purchasing large volumes of stolen credentials from infostealer malware logs available on the dark web. They then automated the process of testing these credentials against Snowflake login endpoints. The key failure point was that many of the compromised accounts were not protected by MFA. For accounts that were, some reports suggest the attackers were able to bypass it, though the mechanism is not yet fully clear—it may involve session hijacking or the use of stolen cookies.

Once logged in, the attackers had the same level of access as the legitimate user, allowing them to query databases, access sensitive customer data, and exfiltrate it to their own storage. This incident is part of a broader, alarming trend, with cloud breaches accounting for 45% of all cybersecurity incidents this year. The average cost of such a breach has reached $4.88 million, and with an average containment time of 207 days, attackers have a long window to operate undetected.

---

## Technical Analysis

The attack chain is straightforward but devastatingly effective:

1.  **Credential Acquisition**: Attackers acquire credentials (username/password pairs) from third-party sources, primarily logs from infostealer malware like Vidar, Lumma, or Redline ([`T1589.002`](https://attack.mitre.org/techniques/T1589/002/)). These are often stolen from employees' personal or unmanaged devices.
2.  **Initial Access**: The attackers use automated scripts to perform credential stuffing attacks against Snowflake's login interface ([`T1110.003`](https://attack.mitre.org/techniques/T1110/003/)). They successfully log in to accounts that reuse passwords and are not protected by MFA.
3.  **Defense Evasion (MFA Bypass)**: For some accounts, attackers may have bypassed MFA. This could be through session token theft ([`T1539`](https://attack.mitre.org/techniques/T1539/)) from the same infostealer logs, or by exploiting poorly configured MFA policies that did not apply to all access methods.
4.  **Discovery**: Once inside, attackers perform reconnaissance to understand the data available, listing databases, tables, and schemas ([`T1087.004`](https://attack.mitre.org/techniques/T1087/004/)).
5.  **Exfiltration**: The attackers exfiltrate large volumes of sensitive data from the customer's Snowflake instance to attacker-controlled storage ([`T1537`](https://attack.mitre.org/techniques/T1537/)).

> **Critical Insight**: Snowflake has stated its platform was not breached. The vulnerability lies in customer-side security practices: lack of MFA, poor credential hygiene, and failure to monitor for anomalous access patterns. The incident highlights the shared responsibility model in cloud security.

### MITRE ATT&CK Mapping
| Tactic | Technique ID | Technique Name | Description |
|---|---|---|---|
| Resource Development | `T1589.002` | Gather Victim Identity Information: Credentials | Attackers purchase credentials stolen by infostealer malware. |
| Initial Access | `T1078.004` | Valid Accounts: Cloud Accounts | Attackers log in using the stolen, legitimate customer credentials. |
| Initial Access | `T1110.003` | Brute Force: Password Spraying | The automated testing of stolen credentials against the login portal is a form of credential stuffing/spraying. |
| Defense Evasion | `T1539` | Steal Web Session Cookie | A possible method for bypassing MFA if session cookies were stolen along with passwords. |
| Discovery | `T1087.004` | Account Discovery: Cloud Account | After logging in, attackers enumerate resources and data available to the compromised account. |
| Exfiltration | `T1537` | Transfer Data to Cloud Account | Attackers exfiltrate data from the victim's Snowflake instance to their own cloud storage. |

---

## Impact Assessment

The impact on the 165 affected organizations is catastrophic. They face massive data breaches, involving the personal and financial information of potentially millions of their own customers (as seen with Ticketmaster). The consequences include enormous regulatory fines (e.g., under GDPR or CCPA), costly incident response and forensic efforts, customer lawsuits, and severe, long-lasting reputational damage. For Santander Bank, a financial institution, the breach could undermine customer trust in its security. The incident serves as a wake-up call for all companies using cloud data warehouses, demonstrating that simply migrating data to the cloud without a corresponding uplift in security posture and monitoring is a recipe for disaster.

---

## IOCs — Directly from Articles

No specific IOCs were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams using Snowflake should hunt for the following activity:

| Type | Value | Description | Context |
|---|---|---|---|
| `log_source` | `Snowflake Access History` | Look for logins from unusual IP addresses, user agents, or geographic locations not associated with your workforce. | Snowflake Query History, SIEM |
| `string_pattern` | `CLIENT_IP` | Correlate login IPs against a list of known malicious IPs or non-corporate VPN/proxy services. | Snowflake `LOGIN_HISTORY` view |
| `command_line_pattern` | `COPY INTO @...` | Monitor for large data copy operations to external stages, especially newly created ones. | Snowflake Query History |
| `user_account_pattern` | `(multiple failures, one success)` | A classic sign of credential stuffing: multiple failed login attempts from one IP across many users, followed by a successful login. | Snowflake `LOGIN_HISTORY` view, SIEM alerts |

---

## Detection & Response

**Detection:**
1.  **Monitor Login History**: Continuously analyze Snowflake's `LOGIN_HISTORY` and `QUERY_HISTORY` views. Ingest these logs into a SIEM and build alerts for:
    *   Logins from unexpected IP ranges or ASNs.
    *   Logins from users who have been inactive for a long time.
    *   A user logging in from multiple, geographically impossible locations in a short time.
2.  **Behavioral Analytics (UEBA)**: Implement User and Entity Behavior Analytics to baseline normal user query patterns. Alert on deviations, such as a user who normally queries small marketing tables suddenly attempting to download an entire customer database.
3.  **Data Exfiltration Alerts**: Monitor for the creation of new external stages or large `COPY INTO` commands that indicate mass data exfiltration.

**Response:**
1.  **Force Logout and Reset**: If a compromise is suspected, immediately force a logout of the user session and reset their password.
2.  **Isolate and Disable**: Disable the compromised user account to prevent further access.
3.  **Review Query History**: Analyze the query history for the compromised user to determine exactly what data was accessed and exfiltrated.
4.  **Engage Snowflake Support**: Contact Snowflake support to report the incident and request assistance in the investigation.

---

## Mitigation

**Strategic Mitigation:**
*   **[Multi-factor Authentication (M1032)](https://attack.mitre.org/mitigations/M1032/)**: Enforce phishing-resistant MFA for ALL users, including service accounts. This is the single most critical mitigation. Do not rely on MFA that can be bypassed by session cookie theft.
*   **[Network Segmentation (M1030)](https://attack.mitre.org/mitigations/M1030/)**: Implement network policies in Snowflake to restrict access to a specific allowlist of corporate IP addresses. This would have blocked logins from the attackers' infrastructure.
*   **[Privileged Account Management (M1026)](https://attack.mitre.org/mitigations/M1026/)**: Apply the principle of least privilege. User accounts should only have access to the specific data they need to perform their job. Avoid granting broad access to entire databases.

**Tactical Mitigation:**
1.  **Disable Inactive Users**: Regularly review and disable accounts for users who have left the company or no longer require access.
2.  **Credential Hygiene**: Educate users on the importance of not reusing passwords and using a password manager.
3.  **Monitor for Leaked Credentials**: Use a service to monitor the dark web for credentials belonging to your organization and force password resets when they are found.

**Tags:** MFA, Santander, Snowflake, Ticketmaster, cloud security, credential stuffing, data breach

## Sources
- [Cloud Data Breaches in 2024: A Year in Review](https://www.cloudwize.io/blog/cloud-data-breaches-in-2024-a-year-in-review/)
- [The Cloud Effect: Security Incidents That Shaped 2024](https://www.hyve.com/en-us/insights/the-cloud-effect-security-incidents-that-shaped-2024/)

---
Source: https://cyber.netsecops.io/articles/massive-snowflake-cloud-breach-impacts-165-organizations-including-ticketmaster/
