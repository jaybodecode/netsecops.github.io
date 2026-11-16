# Hims & Hers Data Breach: ShinyHunters Steals Support Tickets via Compromised Zendesk Access

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cloud Security | **Updated:** 2026-04-11 | **Reading time:** 5 min

Telehealth company Hims & Hers has disclosed a data breach that exposed customer support tickets. The attackers, reportedly the ShinyHunters extortion group, gained unauthorized access to the company's instance on a third-party customer service platform, identified as Zendesk. The breach, which occurred in early February 2026, was achieved using a compromised Okta single sign-on (SSO) account. Exposed data includes customer names, contact information, and details from their support requests. Medical records were not compromised, and the company is offering free credit monitoring to affected individuals.

## Executive Summary
Telehealth company **[Hims & Hers Health](https://www.hims.com/)** has notified customers of a data breach originating from a compromise of its third-party customer service platform, reported to be **[Zendesk](https://www.zendesk.com/)**. The incident, which took place between February 4 and February 7, 2026, was orchestrated by the notorious **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** extortion group. The attackers reportedly leveraged a compromised **[Okta](https://www.okta.com/)** single sign-on (SSO) account to gain access to the Zendesk instance, where they exfiltrated millions of customer support tickets. The compromised data includes customer names, email addresses, phone numbers, and other personal information contained within the support requests. **Hims & Hers** has confirmed that medical records were not part of this breach and is offering 12 months of credit monitoring to those affected.

---

## Threat Overview
This incident is a prime example of a supply chain attack targeting a SaaS provider to get to their customer's data.

*   **Target:** Hims & Hers Health, a major telehealth provider.
*   **Threat Actor:** ShinyHunters, a well-known data extortion group.
*   **Attack Vector:** The attackers compromised an Okta SSO account. It is unclear if this was an Okta account of a Hims & Hers employee with privileged access or if the compromise originated elsewhere. This highlights the risk of centralized identity providers if not properly secured.
*   **Point of Intrusion:** The compromised Okta account was used to pivot into the company's Zendesk instance, bypassing the need for a separate password.
*   **Data Exfiltrated:** The attackers accessed and acquired customer support tickets, which contained PII such as names, email addresses, phone numbers, and physical addresses.
*   **Timeline:**
    *   February 4-7, 2026: Unauthorized access and data acquisition occurred.
    *   February 5, 2026: Hims & Hers became aware of suspicious activity.
    *   March 3, 2026: Internal investigation concluded, confirming PII exposure.

## Technical Analysis
The attack chain highlights the interconnected risks of modern cloud-based enterprise environments.

1.  **Credential Compromise:** The initial step was gaining control of an Okta SSO account. This could have been through phishing, credential stuffing, or malware.
2.  **Identity Provider as a Key:** The attackers used the compromised Okta identity to seamlessly authenticate to a connected third-party application (Zendesk) without needing a separate exploit for Zendesk itself.
3.  **Abuse of Legitimate Access:** Once inside Zendesk, the attackers likely used legitimate API calls or export functions to exfiltrate the support tickets in bulk.

### MITRE ATT&CK Mapping

| Tactic | Technique ID | Name | Description |
|---|---|---|---|
| Initial Access | [`T1078`](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | The attacker gained access using a compromised Okta SSO account. |
| Credential Access | [`T1606.002`](https://attack.mitre.org/techniques/T1606/002/) | SAML Evasion | Attackers may have manipulated SAML tokens from the compromised Okta session to gain access. |
| Collection | [`T1119`](https://attack.mitre.org/techniques/T1119/) | Automated Collection | The attackers likely used scripts to automatically download millions of support tickets from Zendesk. |
| Exfiltration | [`T1567.002`](https://attack.mitre.org/techniques/T1567/002/) | Exfiltration to Cloud Storage | ShinyHunters exfiltrated the data to their own infrastructure for extortion purposes. |

## Impact Assessment

*   **Privacy Violation:** The breach exposed the personal information of customers seeking healthcare services, which is highly sensitive even if direct medical records were not included.
*   **Reputational Damage:** As a healthcare company, trust is paramount. A breach of this nature can significantly damage customer confidence.
*   **Regulatory Scrutiny:** Hims & Hers will likely face scrutiny from regulators (e.g., FTC, state attorneys general) regarding their data protection and third-party risk management practices.
*   **Target for Future Attacks:** The leaked customer data provides a rich source for future phishing and social engineering campaigns targeting Hims & Hers customers.

## Detection & Response

*   **Impossible Travel Alerts:** Monitor SSO logs (e.g., from Okta) for impossible travel alerts, where a single user account is logged in from geographically distant locations in a short period.
*   **Anomalous SaaS Activity:** Utilize Cloud Access Security Broker (CASB) or SaaS Security Posture Management (SSPM) tools to detect anomalous activity within Zendesk, such as a user exporting an unusually high number of tickets or accessing the platform from an unrecognized device or IP address.
*   **Log Correlation:** Correlate login events from the identity provider (Okta) with activity logs from the service provider (Zendesk) to trace the attacker's actions.

## Mitigation

*   **Enforce Strong MFA:** The most critical mitigation is to enforce phishing-resistant Multi-Factor Authentication (MFA) on all accounts, especially privileged ones, within the identity provider (Okta). This would likely have prevented the initial compromise.
*   **Session Management:** Configure stricter session management policies in Okta, such as shorter session timeouts and re-authentication prompts for sensitive actions.
*   **Least Privilege in SaaS:** Within Zendesk, ensure that user roles are configured with the principle of least privilege. Not all support agents need the ability to export all tickets.
*   **Third-Party Security Review:** Regularly review the security features and logging capabilities of all critical SaaS vendors like Zendesk and ensure they are being fully utilized.

**Tags:** Hims & Hers, Data Breach, ShinyHunters, Zendesk, Okta, SSO, SaaS, Healthcare

## Sources
- [Hims & Hers warns of data breach after Zendesk support ticket breach](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_BKshyISdx7rbWzVvDPaXf4nd1sy6iKggKI6zyfaHNvWo9pD4aU6Ucw-5E6Phslyca_CEDk_o79uFYHveznvXuEJsz4Wa7lsV3AmpglFVL0pnxIq4MQLNI0FJ7mTKp5rwrC9OGMrHkM_xFGRoJRn4CGExTyIwIDmsOjlucjVepMAP2-tl_Rw_whaUKFBdI2tVd6T2PQ==)
- [Were You Affected by the Hims & Hers Data Breach? Here's What Was Exposed—And What You Should Do Now](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG7J4-aHKnht3snNIK0ZW943vzCtWKuA-e2tqxKLfRlmRYIemqx7TF28EygmPiXVonlNTDpCsM8AupH4JiQS7vuRFks-lplDdXDpSUkpPnoR3F8qyKKVIGqe8s988uScVGNyPxieL3nknfxFWxmhX7lZfNZAGhqKZi2EDzSFZTpQdg0q56-P8VWFcSidbkSPUPnMoR1u1EjsTgdXUb2hpm4K1uvFveM_LrAzLRoctGMNrf1LxDiI4w5uw==)

---
Source: https://cyber.netsecops.io/articles/hims-and-hers-reports-data-breach-via-third-party-customer-service-platform/
