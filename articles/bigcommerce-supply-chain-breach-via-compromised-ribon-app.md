# BigCommerce Data Breach Caused by Compromised Third-Party App

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Cyberattack | **Updated:** 2026-09-23 | **Reading time:** 4 min

E-commerce platform BigCommerce has disclosed a data breach affecting an undisclosed number of its merchants. The incident was a supply-chain attack originating from a compromised application key for the third-party 'Ribon' and 'Ribon 1.5' apps. Attackers used this key to access customer data between September 13 and 17, 2026. Exposed data includes customer names, emails, phone numbers, and shipping addresses. Financial data was not affected. One victim, Master of Malt, has notified its customers and the UK's ICO.

## Executive Summary

E-commerce platform **[BigCommerce](https://www.bigcommerce.com/)** has notified its merchants of a data breach resulting from a supply-chain attack. The breach did not originate from **[BigCommerce](https://www.bigcommerce.com/)'s** core systems but from a compromised application key belonging to a third-party application, **Ribon**. The attackers leveraged this stolen key to gain unauthorized access to the customer data of merchants using the app. The access occurred over a four-day period from September 13 to September 17, 2026. Exposed information includes customer PII such as names, email addresses, phone numbers, and shipping addresses. Payment card information and account passwords were not compromised. The incident highlights the significant risks associated with third-party integrations in e-commerce ecosystems.

---

## Threat Overview

The incident is a classic example of a supply-chain attack where a trusted third-party vendor becomes the weak link in the security chain. The **Ribon** and **Ribon 1.5** applications, developed by 'Be A Part Of,' are designed to be installed on **[BigCommerce](https://www.bigcommerce.com/)** storefronts to enhance the shopping experience. Threat actors managed to compromise a **[BigCommerce](https://www.bigcommerce.com/)** application key used by **Ribon**. This key granted the application programmatic access to store data.

With the compromised key, the attackers were able to make unauthorized API calls to the **[BigCommerce](https://www.bigcommerce.com/)** platform, targeting the stores that had the **Ribon** app installed. They exfiltrated customer data over a period of four days before the access was detected and revoked. **[BigCommerce](https://www.bigcommerce.com/)** responded by removing the compromised applications from all merchant stores to sever the attacker's access.

---

## Technical Analysis

The attack vector was a compromised API key, a form of credential theft targeting a third-party application integrated into the main platform. This is a common tactic in supply-chain attacks ([`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/)).

1.  **Compromise of Third Party**: The attackers first gained access to the infrastructure or credentials of the **Ribon** application developer. How this was achieved is not specified, but it could have been through phishing, malware, or exploiting a vulnerability in **Ribon's** systems.
2.  **Theft of Credentials**: The attackers stole a **[BigCommerce](https://www.bigcommerce.com/)** application key from **Ribon**. This key acts as a 'password' for the application to authenticate to the **[BigCommerce](https://www.bigcommerce.com/)** API ([`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/)).
3.  **Unauthorized API Access**: Using the stolen key, the attackers made authenticated API requests to **[BigCommerce](https://www.bigcommerce.com/)** to access and exfiltrate data from merchants who had installed the **Ribon** app ([`T1098.004 - Web Services`](https://attack.mitre.org/techniques/T1098/004/)).
4.  **Data Exfiltration**: The attackers extracted customer PII, including full names, email addresses, phone numbers, and shipping addresses, over a four-day period ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)).

The incident was contained when **[BigCommerce](https://www.bigcommerce.com/)** identified the unauthorized activity and revoked the compromised key, effectively cutting off the attackers' access.

---

## Impact Assessment

While **[BigCommerce](https://www.bigcommerce.com/)** stated that a "small number" of merchants were affected, reports from victims like **Master of Malt** suggest the **Ribon** app was installed on hundreds of stores, indicating a potentially wider impact. The primary risk for affected customers is follow-on social engineering attacks. With access to names, email addresses, phone numbers, and shipping details, attackers can craft highly convincing phishing emails or smishing messages (e.g., fake delivery notifications) to trick customers into revealing more sensitive information like passwords or financial details. The breach has also resulted in regulatory scrutiny, with **Master of Malt** reporting the incident to the UK's Information Commissioner's Office (ICO), and potential legal action from affected customers.

---

## IOCs — Directly from Articles

No specific file hashes, domains, or IP addresses were provided in the source articles.

---

## Cyber Observables — Hunting Hints

For organizations using platforms like BigCommerce, security teams may want to hunt for the following patterns to detect similar supply-chain attacks:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| log_source | API Gateway Logs | Monitor for anomalous patterns of API access from third-party applications, such as an unusual volume of requests or access from new IP ranges. | Cloud/Platform Audit Logs | high |
| api_endpoint | `/customers` or `/orders` | Look for excessive `GET` requests to API endpoints that return customer PII, especially if originating from a single API key over a short period. | API access logs | high |
| log_source | Application Installation Logs | Regularly audit all installed third-party applications and their permissions. Correlate installation dates with subsequent spikes in API activity. | E-commerce Platform Admin Logs | medium |
| network_traffic_pattern | Geographically improbable access | Alerts for API key usage from IP addresses that do not align with the known locations of the third-party app developer. | API Gateway/Firewall Logs | medium |

---

## Detection & Response

**Detection:**

*   **API Security Monitoring**: Implement robust monitoring of API traffic. Use behavioral analytics to baseline normal activity for each third-party application and alert on deviations, such as spikes in data retrieval or access from unusual geolocations. This is an application of D3FEND's [`Resource Access Pattern Analysis (D3-RAPA)`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
*   **Log Auditing**: Regularly audit platform logs for application installations, permission changes, and API key generation. Correlate this data with API access logs to identify suspicious activity.
*   **Third-Party Risk Management**: Continuously assess the security posture of third-party vendors and application developers. Inquire about their internal security controls for protecting API keys and other sensitive credentials.

**Response:**

1.  **Revoke Access**: Immediately revoke the compromised API key to terminate the attacker's access.
2.  **Uninstall Application**: Remove the compromised third-party application from all storefronts.
3.  **Impact Analysis**: Work with the platform provider to determine the exact scope of the breach: which data was accessed, which customers were affected, and the timeline of the unauthorized access.
4.  **Notification**: Notify affected merchants and customers in accordance with regulatory requirements (e.g., GDPR, CCPA). Advise them of the specific data exposed and the risks of follow-on phishing attacks.

---

## Mitigation

*   **Principle of Least Privilege**: Grant third-party applications the minimum API permissions necessary for them to function. Regularly review and prune these permissions ([`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/)).
*   **API Key Security**: Rotate API keys regularly. Use IP allowlisting to restrict API access to a known set of IP addresses belonging to the third-party developer. This is a form of D3FEND's [`Inbound Traffic Filtering (D3-ITF)`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering).
*   **Vendor Risk Assessment**: Before integrating a third-party application, conduct a thorough security assessment of the vendor. Evaluate their security policies, development practices, and incident response capabilities ([`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/)).
*   **Contractual Obligations**: Ensure contracts with third-party developers include clauses that require them to maintain strong security controls and notify you immediately in the event of a breach.

**Tags:** API Security, BigCommerce, Data Breach, E-commerce, Master of Malt, Ribon, Supply Chain Attack

## Sources
- [BigCommerce data breach: shoppers warned after third-party app hacked](https://jointheclaim.com/bigcommerce-data-breach-shoppers-warned-after-third-party-app-hacked/) (2026-09-22)
- [BigCommerce warns customers of potential data leaks following cyber incident](https://www.techradar.com/pro/security/bigcommerce-warns-customers-of-potential-data-leaks-following-cyber-incident) (2026-09-22)
- [BigCommerce alerts merchants of data breach linked to Ribon apps](https://www.bleepingcomputer.com/news/security/bigcommerce-alerts-merchants-of-data-breach-linked-to-ribon-apps/) (2026-09-21)

---
Source: https://cyber.netsecops.io/articles/bigcommerce-supply-chain-breach-via-compromised-ribon-app/
