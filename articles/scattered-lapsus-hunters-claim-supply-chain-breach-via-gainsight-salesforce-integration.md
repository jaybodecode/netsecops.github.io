# Massive Supply Chain Attack Hits 200+ Companies via Salesforce App; Hacker Group Claims Breach

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Cloud Security | **Updated:** 2025-12-06 | **Reading time:** 6 min

A hacking collective known as Scattered Lapsus$ Hunters has claimed responsibility for a large-scale supply chain attack that compromised the Salesforce data of over 200 organizations. The attack did not exploit a vulnerability in Salesforce itself, but rather abused OAuth tokens from the Gainsight customer-success application. The attackers gained unauthorized access to customer data, prompting Salesforce to revoke all tokens for the app. The group has named high-profile victims like Atlassian, Docusign, and Verizon, highlighting the significant risks of SaaS-to-SaaS integrations.

## Executive Summary

A sophisticated supply chain attack has compromised the **[Salesforce](https://www.salesforce.com/)** data of more than 200 organizations. The threat actor, a collective calling itself **[Scattered Lapsus$ Hunters](https://malpedia.caad.fkie.fraunhofer.de/actor/scattered_spider)**, exploited abused OAuth tokens associated with the **[Gainsight](https://www.gainsight.com/)** application, a popular tool on the Salesforce AppExchange. The incident was not a direct breach of Salesforce's platform but a classic example of a SaaS-to-SaaS attack, where the trusted connection between two cloud services is compromised. Salesforce has responded by revoking affected tokens and temporarily removing the Gainsight app. The attackers have publicly named numerous high-profile companies as victims, including Atlassian, Docusign, F5, and Verizon, creating a widespread security event with significant potential for data exposure across multiple industries.

---

## Threat Overview

The attack, detected by **[Google](https://www.google.com)** Threat Intelligence, involved the abuse of OAuth access and refresh tokens. These tokens, designed to allow Gainsight's application to interact with a customer's Salesforce instance, were compromised and used by the attackers to gain unauthorized access to sensitive customer data stored within Salesforce. The initial vector for the token theft appears to be a prior compromise of Gainsight itself, which the attackers claim was a result of another supply chain attack involving Salesloft/Drift.

**[Scattered Lapsus$ Hunters](https://malpedia.caad.fkie.fraunhofer.de/actor/scattered_spider)**, a group reportedly composed of members from notorious crews like **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)**, **[Scattered Spider](https://attack.mitre.org/groups/G1015/)**, and **[Lapsus$](https://attack.mitre.org/groups/G0139/)**, claimed the attack on their Telegram channel. They alleged the compromise of nearly 300 organizations and threatened to leak data from almost 1,000 organizations when combined with previous breaches. This incident highlights a dangerous trend where attackers pivot from one compromised SaaS provider to another, creating a cascading effect of breaches across the cloud ecosystem.

## Technical Analysis

The attack chain leverages the inherent trust model of **[OAuth 2.0](https://en.wikipedia.org/wiki/OAuth)**, a standard widely used for delegated authorization between cloud services. 

1.  **Initial Compromise**: The threat actors first compromised a SaaS provider (Gainsight). The attackers claim this was achieved by leveraging credentials or tokens stolen from a previous breach of Salesloft/Drift, which counted Gainsight as a customer. This suggests a chained supply chain attack.
2.  **Token Theft**: Once inside Gainsight's environment, the attackers located and exfiltrated OAuth tokens that Gainsight's application used to access its customers' Salesforce instances. These tokens are bearer tokens, meaning anyone possessing them can use them to access the associated resources.
3.  **Unauthorized Access**: The attackers used the stolen OAuth tokens to make API calls directly to the Salesforce environments of Gainsight's customers. This allowed them to bypass traditional authentication methods like passwords and **[MFA](https://www.cisa.gov/mfa)**, as the tokens represented a legitimate, pre-authorized application.
4.  **Data Exfiltration**: With authorized access, the attackers could query and exfiltrate any data the Gainsight application was permitted to access within the victim's Salesforce instance. This could include customer lists, sales data, internal communications, and other sensitive business information.

### MITRE ATT&CK Techniques

*   [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/): The core of the attack, where adversaries stole OAuth tokens to impersonate the Gainsight application.
*   [`T1111 - Two-Factor Authentication Interception`](https://attack.mitre.org/techniques/T1111/): While not a direct interception, the abuse of OAuth tokens effectively bypasses MFA protections on user accounts.
*   [`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/): The attackers used the stolen tokens, which represent a valid (application) account, to access cloud resources.
*   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): The ultimate goal was to exfiltrate data stored within Salesforce cloud objects.
*   [`T1625 - Hijack Session`](https://attack.mitre.org/techniques/T1625/): The use of stolen tokens is a form of session hijacking, allowing the attacker to take over an authorized application's session.
*   [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): The attackers exploited the trusted relationship between organizations and their third-party SaaS providers (Salesforce and Gainsight).

## Impact Assessment

The business impact of this breach is potentially massive and far-reaching. With over 200 organizations compromised, including Fortune 500 companies, the potential for data leakage is severe. The stolen data, originating from Salesforce CRMs, is highly valuable and could include:
*   Customer Personally Identifiable Information (PII)
*   Proprietary sales strategies and pipelines
*   Confidential business contracts and pricing
*   Internal employee information

The public naming of victims like **[Atlassian](https://www.atlassian.com/)**, **[Docusign](https://www.docusign.com/)**, **[F5](https://www.f5.com/)**, **[GitLab](https://about.gitlab.com/)**, **[LinkedIn](https://www.linkedin.com/)**, **[Malwarebytes](https://www.malwarebytes.com/)**, **[SonicWall](https://www.sonicwall.com/)**, and **[Verizon](https://www.verizon.com/)** causes significant reputational damage, regardless of the extent of data loss. For Gainsight, the incident is catastrophic, eroding customer trust and likely leading to significant financial and legal repercussions. For the affected organizations, the breach necessitates costly incident response efforts, customer notifications, and potential regulatory fines under laws like GDPR or CCPA.

## IOCs

No specific file-based or network-based IOCs were provided in the source articles. The primary indicator is the abuse of OAuth tokens, which must be detected through log analysis.

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | Salesforce Event Monitoring | Look for `ApiTotalUsage` or `RestApi` events. | SIEM, Cloud Security Monitoring | high |
| network_traffic_pattern | Anomalous source IPs for OAuth token usage | Correlate Salesforce API access logs with known corporate IP ranges. Any access from unexpected ASNs or geolocations is suspicious. | SIEM, Cloud Access Security Broker (CASB) | high |
| api_endpoint | `/services/data/vXX.X/` | Monitor for unusual activity patterns against Salesforce REST API endpoints, especially from service accounts. | API Security Gateway, WAF, CASB | medium |
| user_account_pattern | Gainsight service account | Monitor the service account associated with the Gainsight integration for anomalous behavior, such as accessing unusual objects or exfiltrating large volumes of data. | Salesforce Shield, CASB | high |

## Detection & Response

Detecting this type of attack requires a focus on API and cloud application security monitoring. 

1.  **Log Analysis**: Security teams must ingest and analyze logs from their SaaS platforms, particularly Salesforce's Event Monitoring logs. Look for anomalous patterns associated with service accounts or third-party applications. Key indicators include:
    *   Access from unusual IP addresses, geolocations, or autonomous systems (ASNs).
    *   A sudden spike in data access or download volume (`ApiTotalUsage` events).
    *   Access to objects or records outside the application's normal operating parameters.

2.  **CASB/SSPM**: A Cloud Access Security Broker (CASB) or SaaS Security Posture Management (SSPM) tool is crucial. These tools can baseline normal application behavior and alert on deviations. They can also provide visibility into OAuth permissions and help identify over-privileged applications. For detection, **[D3-RAPA: Resource Access Pattern Analysis](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)** is a key defensive technique to implement within these platforms.

3.  **Token Lifecycle Management**: Regularly audit all authorized OAuth applications. Revoke tokens for unused or suspicious applications. Implement policies for short-lived refresh tokens where possible. **[D3-ANCI: Authentication Cache Invalidation](https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation)** should be applied by immediately revoking sessions and tokens upon detection of suspicious activity.

## Mitigation

Mitigating SaaS-to-SaaS supply chain attacks requires a multi-layered approach focusing on visibility, control, and incident readiness.

*   **Immediate Action**: Salesforce has already revoked the tokens, which is the correct immediate response. Affected customers should assume their data was accessed and initiate their incident response plans.

*   **Strategic Mitigation**:
    1.  **Principle of Least Privilege**: Scrutinize the permissions granted to all third-party applications. Use SSPM tools to identify and remediate over-privileged OAuth grants. Applications should only have access to the specific data and API endpoints required for their function. This aligns with **[D3-UAP: User Account Permissions](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.
    2.  **Vendor Risk Management**: Enhance third-party risk management programs to include deep dives into the security posture of SaaS vendors, including their own supply chain dependencies.
    3.  **Network Egress Controls**: While difficult with SaaS, where possible, restrict API access to known IP ranges to prevent stolen tokens from being used from unauthorized locations. This is a form of **[D3-ITF: Inbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)** applied to the SaaS provider.
    4.  **Continuous Monitoring**: Implement continuous monitoring of SaaS application activity. Use CASB/SSPM solutions to detect anomalous behavior and enforce security policies automatically.

**Tags:** OAuth, Supply Chain Attack, SaaS, Salesforce, Gainsight, Scattered Lapsus$ Hunters, Data Breach, Token Theft

## Sources
- [Hackers Claim New Mega Breach As Salesforce Investigates Data Thefts](https://www.pcmag.com/news/hackers-claim-new-mega-breach-as-salesforce-investigates-data-thefts) — PCMag (2025-11-21)
- [Scattered LAPSUS$ Hunters Escalate With New Channel and Gainsight Breach](https://www.socradar.com/scattered-lapsus-hunters-escalate-with-new-channel-and-gainsight-breach/) — SOCRadar (2025-11-21)
- [Google says hackers stole data from 200 companies following Gainsight breach](https://maaal.com/google-says-hackers-stole-data-from-200-companies-following-gainsight-breach/) — Maaal (2025-11-22)
- [When OAuth Tokens Turn Toxic: How ShinyHunters Exploited Gainsight to Steal Data from 200+ Companies](https://www.coesecurity.com/when-oauth-tokens-turn-toxic-how-shinyhunters-exploited-gainsight-to-steal-data-from-200-companies/) — COE Security (2025-11-22)

---
Source: https://cyber.netsecops.io/articles/scattered-lapsus-hunters-claim-supply-chain-breach-via-gainsight-salesforce-integration/
