# Shinyhunters Ransomware Targets Zara and Aman Resorts with Data Theft Claims

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-04-19 | **Reading time:** 5 min

The Shinyhunters ransomware group has resurfaced, claiming responsibility for cyberattacks against luxury hotel chain Aman Resorts and global fashion retailer Zara. On April 19, 2026, the group alleged it had stolen over 500,000 Salesforce records containing PII from Aman Resorts and compromised Zara's Google BigQuery data, attributing the latter to a vulnerability in the Anodot.com platform. Shinyhunters has issued a 'Pay or Leak' ultimatum to both companies, setting an April 21 deadline to establish contact before the allegedly stolen data is published. These claims, if verified, represent significant data breaches at two major international brands.

## Executive Summary
The ransomware group **Shinyhunters** has claimed responsibility for significant data breaches at two prominent international companies: luxury hotel operator **[Aman Resorts](https://www.aman.com)** and fashion giant **[Zara](https://www.zara.com)**. In posts made on April 19, 2026, the group asserted it had exfiltrated sensitive data from both organizations and issued a public ultimatum. For Aman Resorts, Shinyhunters claims to possess 500,000 customer records from a compromised **[Salesforce](https://www.salesforce.com)** instance. For Zara, the group alleges access to the company's **[Google BigQuery](https://cloud.google.com/bigquery)** data, reportedly gained via a vulnerability in the **Anodot.com** business intelligence platform. The threat actor has set a deadline of April 21, 2026, for both companies to negotiate, threatening to leak the stolen data and cause further digital disruption if their demands are not met. These incidents highlight the continued threat of data extortion attacks against high-profile consumer brands.

## Threat Overview
Shinyhunters is a known threat actor with a history of data breaches and extortion, although their recent activity has been less frequent. These new claims suggest a resurgence of the group or an actor using their name. The attacks appear to be financially motivated, following the double extortion model where data is exfiltrated before any potential encryption.

-   **Attack on Aman Resorts:** The group claims to have targeted Aman Resorts' Salesforce environment, a common repository for sensitive customer data, including Personally Identifiable Information (PII). The exfiltration of 500,000 records, if true, represents a major breach of customer privacy for the high-end hotel chain.
-   **Attack on Zara:** The claimed compromise of Zara's Google BigQuery data warehouse suggests a breach of a critical data analytics and business intelligence system. Shinyhunters implicates a third-party platform, Anodot.com, as the entry point, pointing towards a potential supply chain vector or a vulnerability in an integrated service.

The group's TTPs in this case are centered on data theft ([`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)) and public extortion via a leak site, a hallmark of many ransomware and data extortion gangs.

## Technical Analysis
While specific technical details of the intrusions are not available, the claims allow for some analysis based on the targeted platforms.

-   **Salesforce Compromise (Aman Resorts):** Access to a Salesforce instance could be achieved through several methods, including: 
    -   Phishing for employee credentials ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
    -   Exploiting misconfigured permissions or public-facing Salesforce sites.
    -   Using stolen session cookies or tokens ([`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/)).
    -   Compromise of a connected third-party application with excessive permissions.
-   **BigQuery Compromise (Zara):** Access to Google BigQuery would likely require compromised Google Cloud Platform (GCP) credentials. The attackers' claim implicating Anodot.com suggests they may have exploited a vulnerability in that platform to steal service account keys or user credentials that had access to Zara's BigQuery datasets ([`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)).

The overall strategy is Data from Information Repositories ([`T1213`](https://attack.mitre.org/techniques/T1213/)) followed by Data Exfiltration over C2 Channel ([`T1041`](https://attack.mitre.org/techniques/T1041/)).

## Impact Assessment
If the claims are substantiated, the impact on both companies would be severe.
-   **Aman Resorts:** The theft of 500,000 PII records from a luxury brand that caters to a wealthy clientele could lead to significant reputational damage, regulatory fines under GDPR and other privacy laws, and potential targeted attacks against its customers.
-   **Zara:** The compromise of a BigQuery data warehouse could expose sensitive business intelligence, sales data, customer analytics, and internal corporate information. This could impact competitive advantage and strategic planning.
-   **For both companies:** The public nature of the extortion demand creates immediate brand damage and pressure from customers and regulators. The incidents will necessitate costly forensic investigations, legal counsel, and potential credit monitoring services for affected individuals.

## IOCs
No specific IOCs were provided in the source articles.

## Detection & Response
**Detection Strategies:**
1.  **Cloud Security Posture Management (CSPM):** For the BigQuery incident, a CSPM tool could have detected misconfigurations, public-facing datasets, or overly permissive IAM roles associated with service accounts like the one potentially used by Anodot.com.
2.  **SaaS Security Monitoring:** For the Salesforce incident, organizations need tools that monitor for anomalous activity within SaaS platforms, such as mass data exports, unusual user login locations, or permission escalations. This is a form of **[Cloud Activity Log Analysis](https://d3fend.mitre.org/technique/d3f:CloudActivityLogAnalysis)**.
3.  **Data Loss Prevention (DLP):** Monitoring for large-scale data exfiltration from cloud environments. DLP solutions can be configured to alert when a volume of data exceeding a certain threshold is moved out of the corporate cloud environment. This is related to **[User Data Transfer Analysis (D3-UDTA)](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**.

**Response Actions:**
-   Both companies should immediately launch an internal investigation, with the help of third-party experts, to validate the attackers' claims.
-   If claims are credible, identify and contain the access vector, revoking compromised credentials and severing malicious connections.
-   Notify relevant data protection authorities and law enforcement as required by law.
-   Prepare for public communication and customer notification.

## Mitigation
-   **Multi-Factor Authentication (MFA):** Enforce MFA on all accounts, especially for critical cloud and SaaS platforms like Salesforce and Google Cloud Platform (**[M1032 - Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032/)**).
-   **Third-Party Application Auditing:** Regularly audit all third-party applications connected to core systems (like Salesforce AppExchange apps or services with GCP access). Ensure they operate under the principle of least privilege (**[M1054 - Software Configuration](https://attack.mitre.org/mitigations/M1054/)**).
-   **Cloud IAM Best Practices:** Implement strict Identity and Access Management (IAM) policies in cloud environments. Avoid using long-lived static credentials and favor short-lived tokens and service accounts with narrowly scoped permissions.
-   **Data Classification and Encryption:** Classify data based on sensitivity and ensure that the most critical information is encrypted at rest and in transit, with tightly controlled access policies (**[M1041 - Encrypt Sensitive Information](https://attack.mitre.org/mitigations/M1041/)**).

**Tags:** Shinyhunters, Ransomware, Data Breach, Salesforce, BigQuery, Extortion

## Sources
- [Victim: Aman Resorts (aman.com)](https://ransomware.live/victim/aman-com/) — Ransomware.live (2026-04-19)
- [Victim: Zara (zara.com)](https://ransomware.live/victim/zara-com/) — Ransomware.live (2026-04-19)

---
Source: https://cyber.netsecops.io/articles/shinyhunters-ransomware-claims-attacks-on-zara-and-aman-resorts/
