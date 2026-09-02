# Fidelity Nears $2.5M Settlement for 2024 Data Breach Affecting 77,000 People

**Severity:** medium | **Category:** Data Breach,Policy and Compliance,Regulatory | **Updated:** 2026-07-09 | **Reading time:** 4 min

Financial services giant Fidelity Investments is finalizing a $2.5 million settlement for a class-action lawsuit related to a data breach in August 2024 that impacted approximately 77,000 individuals. The lawsuit alleged that Fidelity failed to adequately secure its network, leading to the breach, and delayed notifying victims for two months. A fairness hearing on July 9, 2026, will determine the final approval of the settlement. Under the terms, affected individuals can claim up to $5,000 for documented losses, while others will receive an estimated pro-rata payment of around $100.

## Executive Summary

**Fidelity Investments**, a major player in the financial services industry, is set to finalize a $2.5 million settlement for a class-action lawsuit stemming from a data breach that occurred in August 2024. The breach affected approximately 77,000 people. A U.S. court is scheduled to hold a Fairness Hearing on July 9, 2026, to grant final approval to the settlement terms. The lawsuit alleged that Fidelity's inadequate security measures led to the breach and that the company delayed notification to affected consumers, some of whose data later appeared on the **[dark web](https://en.wikipedia.org/wiki/Dark_web)**. The settlement provides a compensation framework for victims, with payments up to $5,000 for documented losses.

## Threat Overview

The underlying security incident occurred between August 17 and August 19, 2024. During this period, an unauthorized third party gained access to Fidelity's network and exfiltrated certain personal information of approximately 77,000 individuals. The lawsuit, filed in February 2025, claimed this was a preventable breach resulting from Fidelity's failure to implement adequate cybersecurity measures ([`T1562`](https://attack.mitre.org/techniques/T1562/)). A key point of contention in the lawsuit was the delay in notification; Fidelity allegedly waited two months before informing the victims, potentially violating data breach notification laws and preventing individuals from taking timely steps to protect themselves. The plaintiffs also claimed that some of the stolen personal information was subsequently found for sale or was published on the dark web, a common outcome of data breaches where attackers seek to monetize the stolen data ([`T1657 - Financial Benefit`](https://attack.mitre.org/techniques/T1657/)).

## Regulatory Details

The case highlights the legal and financial consequences of a data breach. The class-action lawsuit consolidates claims from affected individuals into a single legal action. The proposed $2.5 million settlement is intended to compensate victims for their losses and resolve the litigation. The settlement structure includes:
- **Documented Loss Claims**: Class members who can provide proof of out-of-pocket losses directly resulting from the breach (e.g., costs for credit monitoring, fraud resolution) can claim reimbursement up to $5,000.
- **Pro-Rata Payments**: All other class members are eligible for a cash payment, estimated to be around $100 per person. The final amount will depend on the number of claims filed and administrative costs.

The Fairness Hearing on July 9, 2026, is a standard legal procedure where a judge reviews the settlement to ensure it is fair, reasonable, and adequate for the class members it represents before giving it final approval.

## Impact Assessment

For the 77,000 individuals affected, the breach resulted in the exposure of their personal information, putting them at an increased risk of identity theft, financial fraud, and targeted phishing attacks for years to come. The delay in notification exacerbated this risk. For **Fidelity Investments**, the impact is both financial and reputational. The $2.5 million settlement, along with legal fees, represents a direct financial cost. Perhaps more damaging is the erosion of trust among its customers. As a major financial institution, the expectation of robust security is paramount. A breach, followed by a lawsuit alleging inadequate security and delayed notification, can significantly harm the company's brand and its ability to attract and retain clients.

## Compliance Guidance

This incident serves as a critical lesson for all organizations, especially those in regulated industries like finance:
1.  **Implement Robust Security**: Invest in and maintain a comprehensive cybersecurity program based on established frameworks like NIST CSF or ISO 27001. This includes technical controls like MFA, encryption, and EDR, as well as regular security assessments and penetration testing. This aligns with [`M1028 - Operating System Configuration`](https://attack.mitre.org/mitigations/M1028/).
2.  **Timely Notification**: Understand and comply with the complex web of state and federal data breach notification laws. Have a well-practiced incident response plan that includes clear timelines and procedures for notifying affected individuals and regulators. Delays can lead to increased legal liability and regulatory fines.
3.  **Incident Response Readiness**: Maintain a tested incident response plan. When a breach occurs, the ability to quickly identify the scope, contain the damage, and understand what data was taken is crucial for an effective and legally defensible response. This involves having adequate logging and monitoring in place ([`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/)).
4.  **Dark Web Monitoring**: Proactively monitor the dark web for mentions of your company or the appearance of your data. This can provide early warning of a breach or help determine the scope of an incident.

**Tags:** Data Breach, Fidelity Investments, Lawsuit, Settlement, Financial Services, Policy and Compliance

## Sources
- [Fidelity $2.5M data breach settlement: What to know](https://www.mysanantonio.com/business/article/fidelity-investments-lawsuit-settlement-22264831.php) — MySA (2026-07-09)

---
Source: https://cyber.netsecops.io/articles/fidelity-investments-2-5m-settlement-2024-data-breach/
