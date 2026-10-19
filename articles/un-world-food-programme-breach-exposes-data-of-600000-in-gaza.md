# UN World Food Programme Breach Exposes Data of 600,000 Gaza Households

**Severity:** high | **Category:** Data Breach | **Updated:** 2026-06-09 | **Reading time:** 4 min

The United Nations World Food Programme (WFP) confirmed a data breach of its aid registration system for Palestine, exposing the personal data of approximately 600,000 households in Gaza. The attack, which occurred on May 14, compromised names, ID numbers, phone numbers, and location data, placing a highly vulnerable population at further risk.

## Executive Summary
The **[United Nations World Food Programme (WFP)](https://www.wfp.org/)** has confirmed a major data breach affecting its self-registration application for aid in Palestine. The incident, which occurred on May 14, 2026, exposed the sensitive personal data of approximately 600,000 Palestinian households in Gaza. The compromised information includes full names, national ID numbers, phone numbers, and specific location details. This breach is potentially the largest known compromise of humanitarian beneficiary data and places an already extremely vulnerable population in an active conflict zone at significant risk of harm, harassment, and exploitation.

---

## Threat Overview
On May 14, 2026, an unauthorized party gained access to the WFP's self-registration application (SRA) specifically used for Palestine. The WFP provides critical food and cash assistance to about 1.6 million people in Gaza each month. The SRA is the system used by households to register for this aid.

The WFP took 17 days to send a notification to affected individuals, which was done via Telegram on May 31. The agency stated that upon discovering the intrusion, it shut down the platform to contain the threat and has since implemented enhanced security controls. The WFP has clarified that its global beneficiary management system, SCOPE, was not affected. The method of intrusion and the identity of the threat actor have not been publicly disclosed.

## Impact Assessment
The impact of this breach is catastrophic due to the context. The victims are civilians and aid recipients in an active and intense conflict zone. The exposure of their personal data creates severe risks:

- **Physical Harm**: The leaked data, including names, IDs, and specific location information, could be used by parties in the conflict to target individuals or families.
- **Harassment and Intimidation**: Individuals could be targeted for harassment based on their status as aid recipients.
- **Fraud and Exploitation**: The data can be used to exploit a desperate population through scams or identity theft.
- **Erosion of Trust in Humanitarian Aid**: Such breaches can cause vulnerable populations to lose trust in aid organizations, potentially preventing them from seeking life-saving assistance in the future.
- **Chilling Effect**: The fear of data exposure may deter people from registering for aid, leaving them without essential support.

This incident underscores the critical need for robust cybersecurity measures for humanitarian organizations, which are increasingly becoming targets for cyberattacks.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IPs, domains, hashes) were provided in the source articles.

## Cyber Observables — Hunting Hints
For a breach of a web application handling sensitive registrations, hunting would focus on web and database logs:

| Type | Value | Description |
|---|---|---|
| Log Source | `Web Application Firewall (WAF) Logs` | Look for signs of common web attacks like SQL Injection, Cross-Site Scripting (XSS), or insecure direct object reference (IDOR) targeting the registration application. |
| Log Source | `Web Server Access Logs` | Analyze logs for unusual patterns, such as a single IP address making a huge number of requests to enumerate user data, or accessing administrative endpoints. |
| Log Source | `Database Logs` | Monitor for anomalous database queries, especially those that select and export large numbers of records from the user registration table. |

## Detection & Response
1.  **Web Application Monitoring**: Implement continuous monitoring of web applications that handle sensitive data. Use a WAF to detect and block common attack patterns. This is an application of **[D3-ITF: Inbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.
2.  **Timely Notification**: The 17-day delay in notification is a significant issue. Organizations must have a response plan that enables rapid communication with affected individuals, especially when their physical safety is at risk.
3.  **Data Minimization**: Collect and retain only the absolute minimum data necessary to provide the service. Regularly review and purge data that is no longer needed.

## Mitigation
1.  **[M1054 - Software Configuration](https://attack.mitre.org/mitigations/M1054/)**: Securely configure all web applications and servers. This includes following hardening guides, disabling unnecessary services, and ensuring proper access controls are in place.
2.  **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**: Regularly patch all components of the web application stack, including the web server, application framework, and any third-party libraries, to protect against known vulnerabilities.
3.  **[M1041 - Encrypt Sensitive Information](https://attack.mitre.org/mitigations/M1041/)**: All sensitive data (names, IDs, locations) should be encrypted both in transit (using TLS) and at rest (in the database). Consider field-level encryption for the most critical data elements.
4.  **[M1047 - Audit](https://attack.mitre.org/mitigations/M1047/)**: Implement comprehensive logging and auditing for the application. Log all access to sensitive records and configure alerts for anomalous activity, such as a single user accessing an unusually large number of records.

**Tags:** Data Breach, United Nations, WFP, Humanitarian Aid, Gaza, PII

## Sources
- [World Food Programme reports data breach affecting Palestinian beneficiaries](https://www.scworld.com/brief/world-food-programme-reports-data-breach-affecting-palestinian-beneficiaries) — SC Magazine (2026-06-04)
- [UN food agency investigates breach exposing data of Gaza aid recipients](https://therecord.media/un-food-agency-investigates-gaza-aid-breach) — The Record (2026-06-04)
- [World Food Programme Data Breach Exposes 600,000 Gaza Households](https://www.safestate.com/post/world-food-programme-data-breach-exposes-600-000-gaza-households) — SafeState (2026-06-05)
- [Cyber-attack targets Gaza aid recipients](https://countervortex.org/blog/cyber-attack-targets-gaza-aid-recipients/) — CounterVortex (2026-06-08)

---
Source: https://cyber.netsecops.io/articles/un-world-food-programme-breach-exposes-data-of-600000-in-gaza/
