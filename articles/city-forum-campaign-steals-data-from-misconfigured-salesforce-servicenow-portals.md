# 'City-Forum' Campaign Steals Data from Misconfigured SaaS Portals

**Severity:** high | **Category:** Cloud Security,Cyberattack,Data Breach | **Updated:** 2026-08-13 | **Reading time:** 4 min

An ongoing data theft campaign dubbed 'City-Forum' is targeting misconfigured Salesforce Experience Cloud and ServiceNow portals worldwide. The attackers use custom tools to systematically scrape and exfiltrate data left accessible to unauthenticated guest users. The campaign, active since at least March 2025, does not exploit a platform vulnerability but rather customer-side misconfigurations. The actor has developed novel techniques to attack modern Salesforce LWR sites, indicating a high level of sophistication.

## Executive Summary
A sophisticated and long-running data theft campaign, named **'City-Forum'** by **[Reco](https://www.reco.ai/)**, is actively targeting organizations by exploiting common misconfigurations in their **[Salesforce](https://www.salesforce.com/)** Experience Cloud and **[ServiceNow](https://www.servicenow.com/)** portals. Active since at least March 2025, the campaign does not leverage a vulnerability in the SaaS platforms themselves, but rather capitalizes on overly permissive guest user access settings configured by customers. The threat actor uses a custom toolset to enumerate and exfiltrate sensitive data exposed to anonymous users. The campaign is notable for its advanced methodology, including a novel technique for scraping data from modern Salesforce Lightning Web Runtime (LWR) sites, and has impacted a wide range of industries globally.

## Threat Overview
The **'City-Forum'** campaign is orchestrated by a single threat actor operating from the IP address `158.220.87.79` (hosted by Contabo in Germany). The attacks are systematic and automated, targeting public-facing SaaS portals.

- **Targeted Platforms:** Salesforce Experience Cloud (both older Aura and modern LWR frameworks) and ServiceNow Service Portals.
- **Attack Vector:** The core of the attack is exploiting misconfigurations that allow unauthenticated guest users to access data they should not be able to see.
- **Industries Affected:** Telecommunications, banking, financial services, enterprise software, and public-sector organizations.

## Technical Analysis
The actor demonstrates a deep understanding of the targeted SaaS platforms.

**Salesforce Attacks:**
- The attacker probes for data exposed via the older Aura framework, a known technique.
- Crucially, they have developed a novel method for **Lightning Web Runtime (LWR) sites**. This involves sending GraphQL requests directly to the UI API to scrape data, a technique not found in public Salesforce exploitation tools. This shows a high level of sophistication and custom development.
- The actor also searches for self-registration endpoints, which, if misconfigured, could be abused to create an authenticated account with even greater access privileges ([T1136.001](https://attack.mitre.org/techniques/T1136/001/)).

**ServiceNow Attacks:**
- The attacker uses the platform's standard search API to discover and retrieve records from knowledge bases and service catalogs that are improperly exposed to anonymous users.
- A key challenge for defenders is that ServiceNow logs do not record the specific search terms used by guest users, making it extremely difficult to determine the exact scope of data exfiltration after an incident.

This is a data theft campaign ([T1530](https://attack.mitre.org/techniques/T1530/)) focused on reconnaissance and collection, likely to sell the data or use it for further attacks.

## Impact Assessment
Organizations that misconfigure their SaaS portals are at risk of significant data leakage. The exposed data can include customer PII, internal support tickets, knowledge base articles with sensitive information, and other business data. This can lead to regulatory fines (e.g., under GDPR or CCPA), reputational damage, and provide intelligence for more targeted follow-on attacks like spear-phishing. The stealthy nature of the attacks, especially on ServiceNow where search terms aren't logged for guests, means a breach could go unnoticed for a long time, and its full scope may never be known.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| ip_address_v4 | `158.220.87.79` | The single server IP address, hosted by Contabo, used in the City-Forum campaign. |
| domain | `city-forum.com` | A domain associated with the threat actor. |

## Cyber Observables — Hunting Hints
Security teams should hunt for the following patterns:

| Type | Value | Description |
|---|---|---|
| Log Source | Salesforce Event Monitoring | Look for an unusually high volume of API requests from a single IP address, especially targeting guest user-accessible endpoints. |
| Log Source | ServiceNow Transaction Logs | Monitor for a high volume of search queries from unauthenticated guest user sessions originating from the IOC IP address. |
| API Endpoint | `/s/sfsites/aura`, `/s/sfsites/lwc` | These are common Salesforce API endpoints. A high volume of requests from an unknown source is suspicious. |
| API Endpoint | `/api/now/sp/search` | The ServiceNow search API endpoint. Monitor for anomalous usage patterns from guest users. |

## Detection & Response
- **SaaS Security Posture Management (SSPM):** Deploy an SSPM tool to continuously scan Salesforce and ServiceNow environments for misconfigurations, such as overly permissive guest user profiles, public-facing sensitive data, and insecure self-registration settings. This is a form of D3FEND's **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Log Analysis:** Ingest and analyze logs from Salesforce (Event Monitoring) and ServiceNow. While ServiceNow guest search logs are limited, look for high-volume activity from the IOC IP (`158.220.87.79`) or other suspicious sources.
- **IP Blocking:** Block the identified attacker IP address at the network perimeter or within the SaaS platform's access control settings.

## Mitigation
- **Audit Guest User Access ([M1054](https://attack.mitre.org/mitigations/M1054/)):** The most critical mitigation is to conduct a thorough review of guest user profiles in both Salesforce and ServiceNow. Disable guest user access entirely if not required. If it is required, ensure permissions are restricted to the absolute minimum necessary public information.
- **Secure Self-Registration:** If self-registration is enabled on a portal, ensure it does not automatically grant excessive permissions. Implement CAPTCHA and email verification to prevent automated abuse.
- **Data Classification:** Identify and classify sensitive data within your SaaS platforms and ensure that sharing rules and object permissions prevent this data from ever being accessible to a guest or unauthenticated user.
- **Regular Posture Assessments:** Do not treat SaaS security as a one-time setup. Regularly review and audit your Salesforce and ServiceNow configurations as the platforms and your business needs evolve.

**Tags:** SaaS, Salesforce, ServiceNow, Misconfiguration, Data Theft, Cloud Security

## Sources
- ["City-Forum" data-theft attacks target Salesforce, ServiceNow portals](https://www.bleepingcomputer.com/news/security/city-forum-data-theft-attacks-target-salesforce-servicenow-portals/) — BleepingComputer (2026-08-12)
- [Long-running Data Theft Campaign Targeting Salesforce, ServiceNow](https://www.darkreading.com/cyberattacks-data-breaches/long-running-data-theft-campaign-salesforce-servicenow) — Dark Reading (2026-08-12)
- [Stealthy 'City-Forum' Attacks Target Salesforce and ServiceNow With Custom Toolset](https://www.securityweek.com/stealthy-city-forum-attacks-target-salesforce-and-servicenow-with-custom-toolset/) — SecurityWeek (2026-08-12)
- [City-Forum extracts data from Salesforce and ServiceNow](https://www.techzine.eu/news/security/143579/city-forum-extracts-data-from-salesforce-and-servicenow/) — TechZine (2026-08-13)

---
Source: https://cyber.netsecops.io/articles/city-forum-campaign-steals-data-from-misconfigured-salesforce-servicenow-portals/
