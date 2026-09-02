# Phishing Attack on Bozeman School District Exposes SSNs of Over 2,600 Staff

**Severity:** medium | **Category:** Data Breach,Phishing,Cloud Security | **Updated:** 2026-06-04 | **Reading time:** 4 min

Bozeman School District #7 in Montana is notifying 2,617 current and former staff members of a data breach that exposed their names and Social Security numbers. The incident stemmed from a social-engineered phishing campaign that gave an unauthorized party access to the district's network for over a month, between February and March 2026. The district has completed its forensic review and is offering identity monitoring services to those affected. Student data was reportedly not compromised in this incident.

## Executive Summary

**Bozeman School District #7** in Montana has disclosed a data breach resulting from a successful **[phishing](https://en.wikipedia.org/wiki/Phishing)** campaign. The incident led to the compromise of the names and Social Security numbers (SSNs) of 2,617 current and former staff members. An unauthorized party had access to the district's network for approximately five weeks between February and March 2026. The district has since secured its network, completed a forensic investigation, and begun notifying the affected individuals, offering them 12 months of credit and identity monitoring services through **[Experian](https://www.experian.com/)** IdentityWorks.

---

## Threat Overview

The breach was initiated by a social engineering phishing attack that successfully compromised account credentials, allowing an unauthorized party to gain access to the school district's network. The period of unauthorized access was lengthy, lasting from February 19, 2026, to March 27, 2026.

The district discovered the intrusion around March 26, 2026, and immediately launched an investigation. The forensic review, which concluded on May 1, 2026, confirmed that files containing staff members' names and SSNs were accessed. Importantly, the district has stated that student data was not impacted by this specific breach. This incident is separate from a previous breach in 2024 that affected the district through a third-party vendor, **PowerSchool**.

---

## Technical Analysis

The attack followed a classic phishing-to-data-theft pattern:

1.  **Initial Access**: Achieved via a phishing email that tricked a user into revealing their credentials.
2.  **Persistence and Discovery**: The attacker used the stolen credentials to access the network and remained undetected for over a month, giving them ample time to explore the network and locate valuable data.
3.  **Collection and Exfiltration**: The attacker identified and accessed files containing the sensitive PII of staff members.

This attack maps to the following **[MITRE ATT&CK](https://attack.mitre.org/)** techniques:
*   [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The likely initial access vector that led to credential compromise.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The attacker used legitimate credentials to access and move within the network.
*   [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/): The attacker collected sensitive data from the compromised systems.

---

## Impact Assessment

*   **For Affected Staff**: The 2,617 individuals whose SSNs were compromised are now at a significantly increased risk of identity theft, financial fraud, and other related crimes. This risk is lifelong.
*   **For the School District**: The district faces reputational damage and the costs associated with the investigation, notification, and provision of identity monitoring services. It also highlights a potential need for improved security awareness training and technical controls.
*   **For the Education Sector**: This incident is another example of how school districts, which often have limited cybersecurity budgets but hold valuable PII, are attractive targets for cybercriminals.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source articles.

---

## Cyber Observables — Hunting Hints

Security teams in educational institutions should hunt for signs of compromise:

| Type | Value | Description |
|---|---|---|
| Log Pattern | Logins from unusual geographic locations or at odd hours for staff accounts. | A common indicator of compromised credentials. |
| Network Traffic Pattern | Large data transfers from internal file servers to a single internal workstation. | Could indicate an attacker staging data for exfiltration. |
| Endpoint Activity | Use of administrative tools (e.g., PowerShell, PsExec) on standard user workstations. | May indicate lateral movement. |

---

## Detection & Response

1.  **Authentication Log Monitoring**: Ingest authentication logs into a SIEM and create alerts for impossible travel, logins from unfamiliar locations, and multiple failed login attempts followed by a success.
2.  **User and Entity Behavior Analytics (UEBA)**: Deploy UEBA tools to establish a baseline of normal user activity and automatically flag deviations that could indicate a compromised account.
3.  **Data Loss Prevention (DLP)**: Implement DLP solutions to detect and block the unauthorized exfiltration of files containing sensitive data like SSNs.

---

## Mitigation

1.  **Security Awareness Training**: The most critical mitigation for phishing is continuous and engaging security awareness training for all staff. This should include regular phishing simulations to test and reinforce learning.
2.  **Multi-Factor Authentication (MFA)**: Enforce **[MFA](https://www.nist.gov/topics/cryptography/multi-factor-authentication-mfa)** on all accounts, especially for email and remote access. MFA is highly effective at preventing attackers from using stolen credentials.
3.  **Email Filtering**: Use an advanced email security gateway to block phishing emails before they reach users' inboxes.
4.  **Principle of Least Privilege**: Ensure that user accounts only have access to the data and systems absolutely necessary for their job functions to limit the blast radius of a compromised account.

**Tags:** Data Breach, Phishing, Education, Social Security Number, Bozeman

## Sources
- [Bozeman School District #7 Data Breach Investigation | Almeida Law Group](https://www.almeidalawgroup.com/data-breach-news/bozeman-school-district-7-data-breach-investigation/) — Almeida Law Group (2026-06-04)

---
Source: https://cyber.netsecops.io/articles/bozeman-school-district-breach-exposes-staff-ssns/
