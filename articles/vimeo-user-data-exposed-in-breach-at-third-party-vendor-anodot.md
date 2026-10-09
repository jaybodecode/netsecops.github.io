# Vimeo Data Exposed in Supply-Chain Attack on Vendor Anodot; ShinyHunters Implicated

**Severity:** high | **Category:** Supply Chain Attack,Data Breach,Threat Actor | **Updated:** 2026-05-07 | **Reading time:** 4 min

Video hosting platform Vimeo has confirmed a data breach that exposed user and customer data as a result of a supply-chain attack on its analytics vendor, Anodot. The attackers reportedly stole authentication tokens from Anodot and used them to access customer environments, including Vimeo's Snowflake and BigQuery instances. The exposed Vimeo data includes technical information, video titles, metadata, and some customer email addresses. Vimeo has stressed that no video content, login credentials, or payment information was compromised. The notorious extortion group ShinyHunters has been linked to the broader campaign, also listing Rockstar Games as a victim of the Anodot compromise.

## Executive Summary

Video hosting platform **[Vimeo](https://vimeo.com)** has disclosed a security incident where user and customer data was exposed due to a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** targeting its third-party analytics vendor, **Anodot**. Attackers compromised Anodot and stole authentication tokens, which they then used to gain unauthorized access to the cloud data environments of Anodot's customers, including Vimeo's Snowflake and BigQuery instances. The notorious extortion group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** has claimed responsibility, listing Vimeo on its leak site. Exposed data includes video metadata and some customer emails, but not video content or payment details. Vimeo has since disabled the Anodot integration and all associated credentials.

---

## Threat Overview

This incident is a classic supply chain attack where a less-secure third-party vendor becomes the entry point into a more secure primary target. 

- **Victim**: Vimeo
- **Attack Vector**: Compromise of third-party vendor, Anodot.
- **Method**: Attackers stole authentication tokens from Anodot, which granted access to customer data warehouses.
- **Threat Actor**: ShinyHunters claimed the attack.
- **Exposed Data**: 
    - Technical information
    - Video titles and metadata
    - Some customer email addresses
- **Data Not Exposed**: Uploaded video content, user credentials, payment card information.

ShinyHunters listed Vimeo on its data leak site and claimed to have data from the company's Snowflake and BigQuery instances. This campaign was not isolated to Vimeo; gaming giant Rockstar Games was also identified as a victim of the same Anodot compromise, highlighting the widespread impact of a single vendor breach.

---

## Technical Analysis

The core of this attack was the theft and misuse of authentication tokens. By compromising the central analytics platform (Anodot), the attackers gained a powerful pivot point. Anodot, by design, would have had persistent, trusted access tokens to its customers' data warehouses (like Snowflake and BigQuery) in order to perform its analytics functions. 

Once the attackers stole these tokens from Anodot, they could directly query the customers' data warehouses, bypassing the primary target's direct perimeter defenses. This is a highly effective technique because the access requests made with the stolen tokens would appear to originate from a legitimate, trusted third-party service.

### MITRE ATT&CK Techniques
- **[`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/)**: The central technique of the attack, where tokens were stolen from the vendor, Anodot.
- **[`T1625 - Steal or Forge Cloud Credentials`](https://attack.mitre.org/techniques/T1625/)**: A broader classification of the token theft, specifically targeting cloud service access.
- **[`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/)**: Attackers used the stolen tokens to directly access and exfiltrate data from Vimeo's Snowflake and BigQuery cloud data warehouses.
- **[`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)**: The attackers exploited the trusted relationship between Vimeo and its vendor, Anodot, to gain access.

---

## Impact Assessment

For Vimeo, the impact is primarily reputational. While the company emphasizes that the most sensitive data was not exposed, any unauthorized access to user data erodes trust. The incident also incurs costs for incident response, forensic investigation, and legal review. 

This attack serves as a powerful case study on the systemic risk posed by supply chain vulnerabilities. The compromise of a single vendor, Anodot, had a cascading effect on multiple high-profile customers. It forces organizations to re-evaluate their third-party risk management programs and the level of trust and access granted to vendors.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints

Organizations can hunt for signs of similar third-party token compromise:

| Type | Value | Description |
| --- | --- | --- |
| `log_source` | `Snowflake/BigQuery Audit Logs` | Monitor for queries originating from vendor service accounts that are unusual in volume, frequency, or target tables. |
| `cloud_observable` | `Access from non-standard IP ranges` | Look for API calls from a vendor's service account originating from IP addresses outside of the vendor's known ASN or IP range. |
| `user_agent` | `Unusual User-Agent strings` | An attacker using a stolen token with a script may use a different User-Agent than the legitimate vendor application. |

---

## Detection & Response

Vimeo's response was appropriate:
1.  **Disable Credentials**: Immediately revoking all credentials and tokens associated with the compromised vendor (Anodot) is the critical first step to stop the bleeding.
2.  **Remove Integration**: Disconnecting the service entirely ensures no further access is possible.
3.  **Investigate and Notify**: Launching a forensic investigation and notifying customers and law enforcement are key components of responsible disclosure.

For detection, organizations should focus on **[`D3-CUA - Cloud User Activity Analysis`](https://d3fend.mitre.org/technique/d3f:CloudUserActivityAnalysis)**, specifically monitoring the behavior of third-party service accounts for anomalies.

---

## Mitigation

1.  **Third-Party Risk Management (TPRM)**: Conduct rigorous security assessments of all vendors, especially those with access to sensitive data or systems.
2.  **Least Privilege for Vendors**: Grant vendors the absolute minimum level of access required for their function. Use read-only roles where possible and scope access to specific datasets, not the entire warehouse.
3.  **Token and Key Rotation**: Enforce regular rotation of all API keys and tokens used by third-party services.
4.  **IP-Based Access Controls**: Where possible, restrict access for vendor service accounts to a known, allow-listed set of IP addresses belonging to the vendor.
5.  **Contractual Obligations**: Ensure vendor contracts include strong security requirements, liability clauses, and mandatory breach notification timelines.

**Tags:** Anodot, Data Breach, ShinyHunters, Snowflake, Supply Chain Attack, Third-Party Risk, Vimeo

## Sources
- [Video site Vimeo blames security incident on Anodot breach](https://www.recordedfuture.com/news/articles/video-site-vimeo-blames-security-incident-on-anodot-breach) (2026-04-28)
- [Video service Vimeo confirms Anodot breach exposed user data](https://www.bleepingcomputer.com/news/security/video-service-vimeo-confirms-anodot-breach-exposed-user-data/) (2026-04-28)
- [Vimeo confirms customer data accessed following Anodot breach](https://www.scmagazine.com/brief/vimeo-confirms-customer-data-accessed-following-anodot-breach) (2026-04-29)
- [Anodot third-party security incident](https://vimeo.com/blog/post/anodot-third-party-security-incident/) (2026-04-27)
- [Video Service Vimeo Confirms Anodot Breach Exposed User Data](https://securityboulevard.com/2026/04/video-service-vimeo-confirms-anodot-breach-exposed-user-data/) (2026-04-29)

---
Source: https://cyber.netsecops.io/articles/vimeo-user-data-exposed-in-breach-at-third-party-vendor-anodot/
