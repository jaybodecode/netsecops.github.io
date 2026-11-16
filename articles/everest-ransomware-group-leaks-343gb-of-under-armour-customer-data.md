# Everest Ransomware Group Leaks 343GB of Under Armour Customer Data

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-01-25 | **Reading time:** 5 min

The Russia-linked Everest ransomware group has leaked 343 GB of data allegedly stolen from global sportswear brand Under Armour. The massive data dump, which occurred on January 24, 2026, followed a failed extortion attempt. The leaked data is reported to contain the personally identifiable information (PII) of millions of customers, highlighting the 'double extortion' tactic where data publication is the primary threat. Under Armour has not yet commented on the incident.

## Executive Summary
The **Everest** ransomware group, a threat actor with reported links to Russia, has published 343 GB of data allegedly exfiltrated from the systems of **[Under Armour](https://www.underarmour.com/)**. The data was leaked on the group's dark web site on January 24, 2026, after the apparel company presumably refused to pay an extortion demand. The leaked data is said to contain a significant volume of personally identifiable information (PII) belonging to millions of Under Armour customers. This incident is a classic example of the double extortion model, where the threat of public data exposure is used as the primary lever for payment, regardless of whether systems were encrypted. The breach poses a significant risk of fraud and identity theft for the affected customers.

---

## Threat Overview
This incident highlights the continued targeting of large, consumer-facing brands by ransomware groups. These organizations are attractive targets due to the vast amounts of customer data they hold, which can be monetized or used for extortion.

### Threat Actor: Everest
- **Type:** Ransomware and data extortion group.
- **Ties:** Often linked to Russian cybercrime circles.
- **Modus Operandi:** Known for a 'double extortion' strategy: they exfiltrate large amounts of sensitive data before deploying ransomware. If the victim refuses to pay, they leak the stolen data publicly or sell it to other criminals. In some cases, they focus solely on the data theft and extortion aspect.

## Technical Analysis
While the specific vector for the Under Armour breach is unknown, Everest and similar groups use a variety of TTPs to gain access and exfiltrate data.

### Potential MITRE ATT&CK Techniques
- **[`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/):** Exploiting vulnerabilities in web servers, VPNs, or other internet-facing systems is a common entry point.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Using credentials purchased from dark web markets or obtained via phishing/infostealers.
- **[`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/):** Using tools like `rclone` to transfer large volumes of stolen data to attacker-controlled cloud storage accounts.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/):** Dumping credentials from memory to escalate privileges and move laterally to access data servers.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** While the focus here is the leak, Everest is a ransomware group and may have also encrypted systems.

## Impact Assessment
The public release of 343 GB of customer data could have devastating consequences for Under Armour and its customers:
*   **For Customers:** Millions of individuals are now at an elevated risk of identity theft, targeted phishing campaigns, and financial fraud. The exposure of PII can have long-lasting personal security implications.
*   **For Under Armour:**
    *   **Regulatory Fines:** The company faces the prospect of massive fines under data protection regulations like GDPR and CCPA, which can be calculated as a percentage of global revenue.
    *   **Reputational Damage:** A breach of this magnitude severely damages customer trust and brand loyalty, which can take years to rebuild.
    *   **Financial Costs:** In addition to fines, the company will incur substantial costs related to incident response, forensic investigation, customer notification, credit monitoring services, and potential class-action lawsuits.

## Cyber Observables for Detection
To detect data exfiltration on this scale, security teams should monitor for:

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Sustained, high-volume egress traffic | A continuous, large data transfer from a database or file server to an external IP over hours or days is a major red flag. |
| command_line_pattern | `tar -czf` or `zip -r` | Use of archiving commands on production servers to package large amounts of data before exfiltration. |
| process_name | `rclone.exe`, `megasync.exe` | Execution of popular cloud sync tools on servers where they have no business purpose. |
| log_source | Database Audit Logs | A high volume of read operations from a single service account across multiple tables could indicate data dumping. |

## Detection & Response
*   **Detection:** Deploy a Data Loss Prevention (DLP) solution capable of monitoring and alerting on large outbound data transfers containing PII. Use Network Detection and Response (NDR) tools to baseline normal network traffic and alert on anomalies indicative of exfiltration. Monitor critical servers for the presence and execution of unexpected data compression or synchronization tools. **D3FEND** technique [`D3-UDTA: User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis) is designed for this purpose.
*   **Response:** Once a leak is public, the response shifts to crisis management. The priority is to confirm the authenticity of the data, determine the scope of the breach through forensics, and fulfill legal and regulatory notification requirements. The company must be transparent with affected customers and provide support, such as credit monitoring services.

## Mitigation
1.  **Data Discovery and Classification:** You cannot protect what you do not know you have. Implement tools and processes to continuously discover, classify, and tag sensitive data (especially PII) across the entire enterprise.
2.  **Robust Access Controls:** Enforce the principle of least privilege. Database service accounts should have restricted permissions, and access to sensitive data repositories should be tightly controlled and audited.
3.  **Egress Traffic Filtering:** As with the Nike incident, strict outbound traffic filtering is a powerful control. Block all outbound traffic from critical data servers by default, only allowing connections to specific, required systems.
4.  **Network Segmentation:** Isolate networks containing sensitive customer data from the general corporate network to make it harder for an attacker to pivot from a compromised endpoint to a critical database.

**Tags:** Everest, ransomware, data leak, Under Armour, PII, double extortion

## Sources
- [Ransomware Victims Daily Report 1/24/2026](https://www.purpleops.io/blog/ransomware-victims-daily-report-1-24-2026) — Purple Ops (2026-01-24)

---
Source: https://cyber.netsecops.io/articles/everest-ransomware-group-leaks-343gb-of-under-armour-customer-data/
