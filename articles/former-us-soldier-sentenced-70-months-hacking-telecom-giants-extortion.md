# Ex-US Soldier 'kiberphant0m' Jailed for Hacking Telecom Giants

**Severity:** medium | **Category:** Threat Actor,Policy and Compliance,Data Breach | **Updated:** 2026-09-28 | **Reading time:** 5 min

Cameron John Wagenius, a 22-year-old former U.S. Army soldier, has been sentenced to 70 months in federal prison for a large-scale hacking and extortion campaign. Operating as 'kiberphant0m', Wagenius targeted at least 10 organizations, including major telecommunications firms like AT&T, while on active duty. He and his co-conspirators stole vast amounts of customer data, partly through attacks exploiting the Snowflake cloud platform, and attempted to extort over $1 million from victims. Wagenius also attempted to sell stolen data to a foreign intelligence service. He was ordered to pay nearly $295,000 in restitution for charges including conspiracy to commit wire fraud and aggravated identity theft.

## Executive Summary
**[Cameron John Wagenius](https://www.justice.gov/opa/pr/us-army-soldier-sentenced-prison-hacking-and-extortion-scheme-targeting-major-us-companies)**, a 22-year-old former U.S. Army soldier, has been sentenced to 70 months in federal prison for orchestrating a significant cybercrime campaign. Operating under the aliases 'kiberphant0m' and 'cyb3rph4nt0m', Wagenius targeted at least 10 U.S. companies, including major telecommunications providers like **[AT&T](https://www.att.com/)**, stealing sensitive customer and business data. The attacks, conducted between April 2023 and December 2024 while he was on active duty, involved exploiting vulnerabilities and stolen credentials, including attacks related to the 2024 **[Snowflake](https://www.snowflake.com/en/)** data breaches. Wagenius and his co-conspirators attempted to extort over $1 million from their victims and even tried to sell stolen data to a foreign intelligence service. The sentence includes nearly $295,000 in restitution and highlights a severe breach of trust by a member of the armed forces.

---

## Threat Overview
The cybercrime campaign led by Cameron John Wagenius was extensive and sophisticated. While on active duty in South Korea and at Fort Cavazos, Texas, he engaged in a conspiracy to hack into corporate networks, steal data, and extort his victims.

**Attack Methodology:**
*   **Initial Access:** The group gained access by stealing login credentials. They developed and used a custom tool named 'SSH Brute' for brute-forcing SSH servers ([T1110.001 - Password Guessing](https://attack.mitre.org/techniques/T1110/001/)). They also exploited weaknesses related to the Snowflake cloud data platform, which was the vector for a series of major breaches in 2024.
*   **Data Theft:** Once inside the networks, they exfiltrated hundreds of thousands of sensitive records. This included customer PII, non-content call and text history, and other proprietary telecommunication data ([T1530 - Data from Cloud Storage Object](https://attack.mitre.org/techniques/T1530/)).
*   **Extortion:** The group then contacted the victim companies, demanding over $1 million in total. They threatened to leak the stolen data on notorious cybercrime forums like BreachForums and XSS.is if the ransom was not paid ([T1658 - Extortion](https://attack.mitre.org/techniques/T1658/)).

## Technical Analysis
The operation demonstrates several key TTPs:
*   **[T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/):** The core of the campaign relied on obtaining and using legitimate credentials to access corporate systems and cloud environments like Snowflake.
*   **[T1110 - Brute Force](https://attack.mitre.org/techniques/T1110/):** The development and use of the 'SSH Brute' tool shows a commitment to this common but often effective access method.
*   **[T1213 - Data from Information Repositories](https://attack.mitre.org/techniques/T1213/):** The attackers specifically targeted and exfiltrated data from large databases and cloud storage repositories.
*   **Insider Threat (by association):** While Wagenius was an external threat to the companies, his status as a U.S. soldier committing these crimes represents a form of insider threat to the military, abusing his position and access for criminal gain.

His attempt to sell data to a foreign intelligence service elevates the case from simple cybercrime to an act with potential national security implications.

## Impact Assessment
The impact on the victim organizations was significant, involving financial costs, reputational damage, and regulatory scrutiny. The theft of sensitive customer PII and call data from telecommunications giants like AT&T and **[Verizon](https://www.verizon.com/)** constitutes a major privacy breach. The restitution order of nearly $300,000 likely only covers a fraction of the total cost incurred by the victims for incident response, legal fees, and customer notifications. For the U.S. Army, the actions of one of its soldiers engaging in such widespread criminal activity while on active duty represent a serious security and disciplinary failure.

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were listed as Indicators of Compromise in the source articles.

## Cyber Observables — Hunting Hints
To detect activity similar to the 'kiberphant0m' campaign, organizations should monitor for:

| Type | Value | Description |
|---|---|---|
| log_source | SSH server logs | Monitor for a high volume of failed login attempts from a single IP address, indicative of a brute-force attack. |
| log_source | Cloud data platform logs (e.g., Snowflake) | Audit for unusual or excessive data access patterns, especially large data exports initiated by a single user account. |
| user_account_pattern | Compromised user accounts | Monitor for user accounts logging in from multiple, geographically disparate locations in a short time (impossible travel). |
| other | Dark Web monitoring | Proactively monitor cybercrime forums like BreachForums for mentions of your company's name or data. |

## Detection & Response
1.  **Cloud Security Posture Management (CSPM):** For platforms like Snowflake, use CSPM tools to detect misconfigurations, excessive permissions, and anomalous data access patterns. This aligns with **[D3FEND Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)**.
2.  **Brute-Force Protection:** Implement account lockout policies after a set number of failed login attempts on all external-facing services, including SSH. **[D3FEND Account Locking (D3-AL)](https://d3fend.mitre.org/technique/d3f:AccountLocking)** is a key control.
3.  **Threat Intelligence:** Subscribe to threat intelligence services that monitor dark web forums to get early warnings if your company's data appears for sale.

## Mitigation
1.  **Strong Password Policies and MFA:** Enforce strong, unique passwords and, most importantly, mandate MFA for all accounts, especially those with access to sensitive data platforms like Snowflake. This is the most effective defense against credential-based attacks.
2.  **Limit Public Exposure:** Reduce the attack surface by ensuring that services like SSH are not exposed to the public internet unless absolutely necessary. If required, access should be restricted to known, trusted IP addresses.
3.  **Cloud Data Governance:** Implement strict data governance and access controls within cloud data platforms. Use role-based access control (RBAC) to enforce the principle of least privilege.

**Tags:** insider threat, extortion, hacking, telecom, Snowflake, data theft, sentencing

## Sources
- [Former US soldier gets nearly six-year sentence for hacking, extorting telecoms](https://therecord.media/hacker-telecom-army-sentenced) — The Record
- [US soldier gets 70 months in prison for extorting 10 tech, telecom firms](https://www.bleepingcomputer.com/news/security/us-soldier-gets-70-months-in-prison-for-extorting-10-tech-telecom-firms/) — BleepingComputer
- [US Army soldier linked to Snowflake breaches gets 70 months for extortion](https://www.helpnetsecurity.com/2026/09/28/us-army-soldier-snowflake-breaches-extortion/) — Help Net Security

---
Source: https://cyber.netsecops.io/articles/former-us-soldier-sentenced-70-months-hacking-telecom-giants-extortion/
