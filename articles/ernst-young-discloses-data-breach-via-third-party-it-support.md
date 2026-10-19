# Ernst & Young Discloses Data Breach via Third-Party Support System

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cloud Security | **Updated:** 2026-07-29

Global professional services firm Ernst & Young (EY) has disclosed a data breach that occurred via a compromised third-party IT service management platform. Between March and April 2026, an unauthorized actor gained access to the system and downloaded documents containing sensitive personal and financial data from client tax support tickets. EY has secured the platform and notified authorities, but the full number of affected clients has not been disclosed.

## Executive Summary
Global consulting and accounting giant **[Ernst & Young](https://www.ey.com)** (EY) has reported a data breach resulting from the compromise of a third-party IT service management platform. The breach, which occurred between late March and mid-April 2026, allowed an unauthorized third party to access and download sensitive client documents. These documents, which were attached to IT support tickets related to tax services, contained personal and financial information. This incident is a classic example of a **supply chain attack**, where a trusted vendor becomes the weak link in a security chain.

## Threat Overview
The attack targeted an external Information Technology Service Management (ITSM) platform used by EY's IT staff to manage and resolve support requests for its tax practice. Clients and EY personnel would submit tickets, sometimes attaching documents with sensitive data needed for tax preparation. An investigation revealed that an attacker gained access to this platform and exfiltrated documents associated with an undisclosed number of EY clients.

### Incident Timeline
- **March 28, 2026**: Unauthorized access to the third-party platform began.
- **April 12, 2026**: Unauthorized access ended.
- **April 23, 2026**: EY's security team detected anomalous activity and launched an investigation.

## Technical Analysis
This was a supply chain attack that exploited the trust relationship between EY and its third-party service provider. The technical details of how the third-party platform itself was compromised are not public, but the attack on EY's data followed this pattern:

- **Initial Access**: The attacker gained access to the third-party platform, likely through stolen credentials or by exploiting a vulnerability in the platform's software. This is a form of [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/).
- **Data Access**: Once inside the platform, the attacker had access to the data stored within it. They specifically targeted support tickets and their attachments, a technique that can be mapped to [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/).
- **Exfiltration**: The attacker downloaded the documents containing sensitive client data. The method is not specified, but it would likely be via [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/) or direct download through the compromised web application.

## Impact Assessment
The breach exposes sensitive personal and financial information of EY's tax clients, putting them at risk of fraud and identity theft. For EY, the incident causes significant reputational damage and undermines client trust. It also highlights a critical challenge for large organizations: securing data that is handled by a sprawling network of third-party vendors and cloud services. The financial impact will include the costs of the investigation, client notifications, potential credit monitoring services for affected individuals, and potential regulatory fines.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
To detect similar supply chain breaches, organizations should focus on monitoring third-party service access:
| Type | Value | Description |
|---|---|---|
| log_source | Cloud Access Security Broker (CASB) Logs | Monitor for anomalous access patterns to sanctioned third-party applications, such as logins from unrecognized IP addresses or bulk data downloads. |
| user_account_pattern | Service account activity | Look for service accounts used for third-party integrations performing actions outside their normal baseline, such as accessing data they don't typically touch. |
| network_traffic_pattern | API traffic to third-party services | Baseline normal API usage and alert on significant spikes in data volume or error rates, which could indicate misuse. |

## Detection & Response
EY's security team detected the breach by identifying "anomalous activity." This highlights the importance of behavioral analysis.
- **D3FEND: User Geolocation Logon Pattern Analysis (D3-UGLPA)**: Monitor logins to third-party platforms for access from impossible-travel scenarios or untrusted geographic locations.
- **D3FEND: Web Session Activity Analysis (D3-WSAA)**: Analyze session data for third-party applications to detect unusual actions, such as a single user downloading an abnormally large number of documents.
- **Incident Response Plan**: Have a specific playbook for supply chain incidents that includes steps for isolating the third-party connection, communicating with the vendor, and assessing the scope of data exposure.

## Mitigation
- **Third-Party Risk Management (TPRM)**: Implement a robust TPRM program that includes thorough security vetting of all vendors before onboarding and regular security assessments thereafter.
- **Data Minimization**: Ensure that only the minimum necessary data is shared with or stored in third-party systems. Avoid uploading documents with excessive sensitive information to support ticketing systems.
- **D3FEND: Multi-factor Authentication (D3-MFA)**: Mandate that all third-party services used by the organization support and enforce MFA for all user accounts.
- **Contractual Obligations**: Include specific cybersecurity requirements, breach notification timelines, and right-to-audit clauses in all third-party contracts.

**Tags:** data breach, ernst & young, ey, supply chain, tax data, third-party risk

## Sources
- [Ernst & Young (EY) Investigates Data Breach Involving Third-Party Support Tickets](https://securityaffairs.com/195550/data-breach/ernst-young-ey-investigates-data-breach-involving-third-party-support-tickets.html) (2026-07-17)

---
Source: https://cyber.netsecops.io/articles/ernst-young-discloses-data-breach-via-third-party-it-support/
