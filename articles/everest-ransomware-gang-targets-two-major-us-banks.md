# Everest Ransomware Claims Attacks on Citizens and Frost Banks

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-04-22 | **Reading time:** 5 min

The Everest ransomware gang has listed two major U.S. financial institutions, Citizens Financial Group and Frost Bank, on its dark web leak site. The group claims to have stolen sensitive customer data, including Social Security numbers and financial details, and has threatened to release it. Citizens Bank confirmed a breach involving a third-party vendor, stating that while some customer information was involved, most of the data was masked. The full impact on Frost Bank remains unconfirmed.

## Executive Summary

The **Everest** ransomware gang has claimed responsibility for cyberattacks against two prominent U.S. banks: **[Citizens Financial Group](https://www.citizensbank.com/)** and **Frost Bank**. On April 20, 2026, both financial institutions were listed on the gang's dark web extortion site, with the threat actors setting a six-day deadline for the public release of allegedly stolen data. **Citizens Bank** has acknowledged a data security incident originating from a third-party vendor, but downplayed the severity, stating most data was for testing purposes. The claims regarding **Frost Bank**, which involve records for 250,000 clients, have not been officially confirmed but represent a significant threat to the financial sector.

## Threat Overview

This incident highlights the persistent threat of ransomware gangs to the financial services industry and their increasing reliance on supply chain attacks. **Everest** is using a double-extortion tactic, not only encrypting data but also stealing it and threatening public release to pressure victims into paying. 

For **Citizens Bank**, the attack vector was a third-party vendor, demonstrating how vulnerabilities in the supply chain can impact even well-defended organizations. The bank stated that only a "very limited set of customer information was involved." 

For **Frost Bank**, the unverified claim is much larger, with **Everest** alleging possession of PII and financial data for 250,000 clients, including Social Security numbers (SSNs), income, and investment details. This type of data is highly valuable on the dark web and poses a severe risk of fraud and identity theft to customers.

## Technical Analysis

While the specific TTPs for this attack are not detailed, the pattern is consistent with modern ransomware operations:

1.  **Initial Access**: For **Citizens Bank**, the vector was a compromised third-party vendor, a classic supply chain attack ([`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/)). For **Frost Bank**, the vector is unknown but could range from phishing to exploiting an unpatched vulnerability.
2.  **Data Exfiltration**: Before deploying the ransomware, groups like **Everest** move laterally through the network to identify and exfiltrate valuable data. This involves techniques like [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/) and [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/).
3.  **Impact**: The final stage is data encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)) and posting the victim's name on their leak site to apply public pressure.

> The attack on Citizens Bank via a third-party vendor is a critical reminder that an organization's security is only as strong as its weakest partner. Robust vendor risk management is non-negotiable.

## Impact Assessment

*   **For Customers**: A breach of this nature could lead to widespread financial fraud, identity theft, and targeted phishing attacks. The exposure of SSNs, TINs, and detailed financial records is particularly damaging.
*   **For the Banks**: The incidents result in significant reputational damage, regulatory fines, and costs associated with incident response, customer notifications, and credit monitoring. An attack on a third party does not absolve the primary organization of responsibility for protecting its customer data.
*   **For the Financial Sector**: Successful attacks on major banks can erode public trust in the stability and security of the financial system.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source articles.

## Cyber Observables — Hunting Hints

To detect ransomware precursor activity, security teams should hunt for:

| Type | Value | Description |
| :--- | :--- | :--- |
| Network Traffic Pattern | Large, anomalous outbound data flows to unknown destinations. | This is a strong indicator of data exfiltration before ransomware deployment. |
| Process Activity | Execution of `vssadmin.exe delete shadows` or `wbadmin delete catalog`. | Attackers disable volume shadow copies to prevent easy recovery. |
| Command-Line Pattern | `net stop <service_name>` for security tools (AV, EDR). | Attackers attempt to disable endpoint security before running the encryptor. |
| Log Source | Third-party connection logs | Monitor and baseline traffic from third-party vendors, alerting on unusual access patterns or data transfers. |

## Detection & Response

*   **Detection**: Deploy EDR solutions with anti-ransomware behavioral modules that can detect and terminate processes attempting to rapidly encrypt files or delete backups. Monitor for the execution of common reconnaissance commands (`whoami`, `net group`, etc.) and lateral movement tools. Use canaries or honeyfiles—bait files that trigger an alert if modified or encrypted.
*   **Response**: Isolate affected systems immediately. Disconnect network access for compromised third-party vendors. Activate the incident response plan, which should include engaging legal counsel and forensic investigators. Do not reboot or delete anything until a forensic image can be taken. Refer to CISA's guidance on ransomware and avoid paying the ransom, as it does not guarantee data recovery and fuels the criminal ecosystem.

## Mitigation

1.  **Vendor Risk Management**: Implement a stringent third-party risk management program. This includes security questionnaires, audits, and contractual requirements for vendors who handle sensitive data. This is a key part of [`M1016 - Vulnerability Scanning`](https://attack.mitre.org/mitigations/M1016/) applied to the supply chain.
2.  **Offline Backups**: Maintain immutable, offline backups of all critical data. This is the most effective defense against data encryption attacks and is a core component of [`M1053 - Data Backup and Recovery`](https://attack.mitre.org/mitigations/M1053/).
3.  **Network Segmentation**: Segment networks to prevent ransomware from spreading from one part of the organization to another. A flat network is a ransomware operator's playground. See [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
4.  **Endpoint Security**: Deploy and properly configure advanced EDR and anti-malware solutions. Ensure they are set to block, not just alert, on suspicious behaviors.

**Tags:** Ransomware, Everest, Banking, Finance, Data Breach, Third Party Risk

## Sources
- [Two major US banks targeted — Citizens Bank confirms breach, Frost Bank allegedly hit](https://cybernews.com/news/two-major-us-banks-targeted-citizens-bank-confirms-breach-frost-bank-allegedly-hit/) — Cybernews (2026-04-22)
- [Citizens Bank, Frost Bank Targeted by Everest Ransomware Gang](https://www.securityweek.com/citizens-bank-frost-bank-targeted-by-everest-ransomware-gang/) — SecurityWeek (2026-04-22)

---
Source: https://cyber.netsecops.io/articles/everest-ransomware-gang-targets-two-major-us-banks/
