# ShinyHunters Hits Salesforce Again, Breaching Customers via Gainsight App

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Threat Actor | **Updated:** 2025-11-21 | **Reading time:** 6 min

Salesforce has disclosed a significant data breach affecting its customers, stemming from a compromised connection with the Gainsight customer success application. The notorious cybercrime group ShinyHunters, also tracked as UNC6240, has claimed responsibility for the attack, stating they exploited OAuth tokens to gain unauthorized access to approximately 285 additional Salesforce instances. In response, Salesforce has revoked credentials and removed the Gainsight apps from its AppExchange. The incident highlights the growing risk of supply chain attacks targeting trusted third-party SaaS integrations to pivot into major enterprise environments.

## Executive Summary

On November 19, 2025, **[Salesforce](https://www.salesforce.com/)** disclosed a security incident where customer data was exposed due to a compromise of the third-party **[Gainsight](https://www.gainsight.com/)** application. The threat actor, identified as the prolific cybercrime group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** (also known as UNC6240), exploited OAuth tokens to gain unauthorized access to Salesforce customer environments. This supply chain attack did not exploit a vulnerability in the Salesforce platform itself but rather abused the trusted connection between the two SaaS platforms. In response, Salesforce revoked all associated credentials and temporarily delisted Gainsight's apps from its AppExchange. This incident underscores the critical risk posed by third-party application integrations and the sophisticated tactics used by threat actors to abuse authentication mechanisms.

---

## Threat Overview

The attack was initiated by compromising the **Gainsight** customer success management (CSM) application, which integrates with Salesforce environments. The threat actors, **ShinyHunters**, leveraged this access to exploit the OAuth authentication tokens that govern the connection between Gainsight and its customers' Salesforce instances. By compromising these tokens, the attackers were able to move laterally from the third-party application into the primary Salesforce environments of numerous organizations.

**ShinyHunters** claimed to have accessed approximately 285 Salesforce customer instances through this method. This campaign is the latest in a series of similar attacks targeting the Salesforce ecosystem, following a pattern of abusing trusted SaaS-to-SaaS connections. The attack vector highlights a significant and growing threat surface for enterprises that rely on a web of interconnected cloud applications. The initial compromise of Gainsight's systems allowed the threat actor to bypass traditional perimeter defenses and operate with the privileges of a legitimate, integrated application.

---

## Technical Analysis

The core of this attack revolves around the abuse of the **[OAuth](https://en.wikipedia.org/wiki/OAuth)** 2.0 authorization framework. OAuth is widely used to grant applications access to resources on behalf of a user without sharing credentials. In this case, Gainsight applications were granted persistent access to customer Salesforce data via access and refresh tokens.

**Attack Chain:**
1.  **Initial Compromise:** The exact method used to compromise Gainsight is not publicly detailed, but it likely involved compromising credentials or infrastructure with access to their Salesforce integration secrets.
2.  **Token Theft:** The attackers stole the OAuth access and refresh tokens associated with Gainsight's applications. These tokens are bearer tokens, meaning anyone who possesses them can use them to access the associated resources.
3.  **Unauthorized Access:** Using the stolen tokens, **ShinyHunters** made API calls to the Salesforce environments of Gainsight's customers. This access would appear legitimate, as it originated from what looked like the trusted Gainsight application.
4.  **Data Exfiltration:** The attackers then used this unauthorized API access to exfiltrate data from the compromised Salesforce instances.

This attack methodology maps to several MITRE ATT&CK techniques:
- [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/): The primary technique used to gain access to the Salesforce environments.
- [`T1111 - Two-Factor Authentication Interception`](https://attack.mitre.org/techniques/T1111/): While not explicitly stated, compromising OAuth tokens effectively bypasses MFA protections that would otherwise protect direct user logins.
- [`T1550 - Use Alternate Authentication Material`](https://attack.mitre.org/techniques/T1550/): The attackers used the stolen tokens as their authentication material.
- [`T1098.001 - Additional Cloud Credentials`](https://attack.mitre.org/techniques/T1098/001/): The compromised tokens represent a form of cloud credential.
- [`T1213 - Data from Information Repositories`](https://attack.mitre.org/techniques/T1213/): The ultimate goal of accessing and exfiltrating data from Salesforce.

---

## Impact Assessment

The business impact of this breach is significant for the affected Salesforce customers. The exposed data could include sensitive customer information, sales pipelines, contact details, and other proprietary business data stored within their CRM. The potential consequences include:

- **Financial Loss:** Direct costs associated with incident response, legal fees, and potential regulatory fines.
- **Reputational Damage:** Loss of customer trust and damage to brand reputation.
- **Competitive Disadvantage:** If stolen data, such as sales strategies or customer lists, is sold or leaked, it could be used by competitors.
- **Regulatory Scrutiny:** Organizations subject to regulations like GDPR or CCPA may face investigations and penalties for the data exposure, even if the breach originated with a third party.
- **Operational Disruption:** Salesforce's action to revoke tokens and delist the apps, while necessary, caused immediate operational disruption for legitimate users of the Gainsight application.

This incident forces organizations to re-evaluate their third-party risk management programs, especially concerning SaaS applications with deep integrations and privileged access to critical data repositories.

---

## IOCs

| Type | Value | Description |
|---|---|---|
| `ip_address_v4` | `3.239.45.43` | Malicious IP address observed by Obsidian Security. |
| `user_agent` | `Python/3.11 aiohttp/3.13.1` | User agent associated with the attacker's tools. |

---

## Cyber Observables for Detection

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `api_endpoint` | `/services/oauth2/token` | Salesforce OAuth token endpoint. Monitor for anomalous requests or requests from unusual IPs. | API Gateway Logs, Cloud Trail | high |
| `log_source` | `Salesforce Event Monitoring` | Specifically monitor `Login` and `API` event types for suspicious activity. | SIEM, Salesforce Shield | high |
| `network_traffic_pattern` | `Unusual geographic source for API calls` | Look for API access from IP ranges inconsistent with the third-party vendor's known infrastructure. | Firewall Logs, VPC Flow Logs | medium |
| `command_line_pattern` | `curl -H "Authorization: Bearer [TOKEN]"` | Hunt for command-line history on potentially compromised developer or admin workstations that might handle tokens. | EDR Logs, Shell History | low |
| `user_account_pattern` | `API-only user accounts` | Closely monitor the activity of service accounts used for integrations for any deviation from baseline behavior. | IAM Logs, SIEM | high |

---

## Detection & Response

**Detection:**
- **Monitor Salesforce Logs:** Utilize Salesforce Event Monitoring (part of Salesforce Shield) to analyze `Login`, `API`, `RestApi`, and `ReportExport` event types. Look for logins from the specified malicious IP (`3.239.45.43`) or user agent (`Python/3.11 aiohttp/3.13.1`).
- **Analyze API Usage:** Baseline normal API usage patterns for integrated third-party applications. Alert on significant deviations, such as an unusual volume of `ReportExport` events, access to objects outside the application's normal scope, or activity outside of normal business hours.
- **Third-Party App Auditing:** Regularly audit all connected applications in the Salesforce environment. Review their permissions and access levels. Tools like **[Obsidian Security](https://www.obsidiansecurity.com/)** specialize in detecting this type of SaaS-to-SaaS attack.
- **D3FEND Techniques:** Implement [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to identify anomalous API calls and [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis) to baseline and detect deviations in the behavior of integration accounts.

**Response:**
1.  **Revoke Credentials:** Immediately revoke all OAuth tokens and credentials associated with the suspected compromised application. Salesforce has already done this for Gainsight, but this is a critical first step in any similar incident.
2.  **Investigate Activity:** Analyze historical logs to determine the scope of the compromise. Identify which records were accessed, modified, or exfiltrated by the threat actor.
3.  **Notify Affected Parties:** Based on the investigation, notify affected customers and regulatory bodies as required by law.
4.  **Review Third-Party Integrations:** Conduct a full audit of all third-party applications connected to your critical SaaS platforms. Re-evaluate the business need and permissions for each.

---

## Mitigation

**Strategic Mitigation:**
- **Principle of Least Privilege:** Ensure that third-party applications are granted the absolute minimum permissions necessary to perform their function. Avoid granting broad `Read/Write All` permissions.
- **Third-Party Risk Management (TPRM):** Enhance vendor security reviews. Scrutinize the security practices of any vendor whose application will have API access to critical data.
- **D3FEND Hardening:** Apply [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by restricting the IP ranges from which third-party applications can connect to your Salesforce instance, if the vendor supports it.

**Tactical Mitigation:**
1.  **Regular Token Rotation:** While refresh tokens are long-lived, enforce policies for periodic review and re-authorization of third-party applications.
2.  **IP Whitelisting:** If the third-party application uses a predictable set of source IPs, configure Salesforce to only allow API access from those addresses.
3.  **Use Scoped API Tokens:** When granting access, use tokens with narrow scopes that limit access to specific data types and API functions.
4.  **Implement SaaS Security Posture Management (SSPM):** Deploy SSPM tools to continuously monitor for misconfigurations, excessive permissions, and anomalous activity across interconnected SaaS applications.

**Tags:** OAuth, SaaS Security, Third-Party Risk, API Security, Supply Chain, UNC6240

## Sources
- [Salesforce investigating campaign targeting customer environments connected to Gainsight app](https://www.cybersecuritydive.com/news/salesforce-gainsight-breach-shinyhunters/733365/) — Cybersecurity Dive (2025-11-20)
- [Threat actors have reportedly launched yet another campaign involving an application connected to Salesforce](https://www.databreaches.net/threat-actors-have-reportedly-launched-yet-another-campaign-involving-an-application-connected-to-salesforce/) — DataBreaches.net (2025-11-20)
- [Hundreds of Salesforce customers hit by yet another third-party vendor breach](https://www.cyberscoop.com/salesforce-gainsight-breach-shinyhunters/) — Cyberscoop (2025-11-20)
- [Obsidian Security Customer Alert on Salesforce-Gainsight Data Breach](https://www.obsidiansecurity.com/blog/salesforce-gainsight-data-breach/) — Obsidian Security (2025-11-20)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-implicated-in-salesforce-data-breach-via-gainsight-app/
