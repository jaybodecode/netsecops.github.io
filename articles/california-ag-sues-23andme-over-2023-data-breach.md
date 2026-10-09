# California Sues 23andMe Over 2023 Breach, Alleging Major Security and Privacy Failures

**Severity:** high | **Category:** Policy and Compliance,Data Breach,Regulatory | **Updated:** 2026-05-29 | **Reading time:** 5 min

California's Attorney General, Rob Bonta, has filed a lawsuit against genetic testing company 23andMe in response to its massive 2023 data breach. The breach, a result of a credential stuffing campaign, ultimately exposed the data of 6.9 million individuals. The lawsuit alleges that 23andMe failed to maintain reasonable security practices, made misleading statements about its security, and violated multiple state privacy laws, including the California Consumer Privacy Act (CCPA) and the Genetic Information Privacy Act. The state is seeking millions of dollars in civil fines for the alleged violations.

## Executive Summary

Genetic testing company **[23andMe](https://www.23andme.com/)** is facing significant legal action from the state of California over its 2023 data breach. Attorney General Rob Bonta has filed a lawsuit alleging the company was negligent in protecting the highly sensitive genetic and personal information of its users. The breach, which stemmed from a large-scale credential stuffing attack, resulted in the compromise of 14,000 accounts and the subsequent scraping of data from 6.9 million users of the 'DNA Relatives' feature. The lawsuit claims **23andMe** violated several key California laws, including the **[California Consumer Privacy Act (CCPA)](https://cppa.ca.gov/)**, by failing to implement reasonable security measures like robust protection against credential stuffing. The state is seeking substantial civil penalties, highlighting the growing legal and financial consequences for companies that fail to protect consumer data in an era of stringent privacy regulations.

---

## Regulatory Details

The lawsuit filed by the California Attorney General's office alleges that **23andMe** violated multiple state laws through its actions and inactions surrounding the 2023 data breach.

- **The Breach Incident**: Occurring over a five-month period in 2023, attackers used credentials stolen from other breaches (credential stuffing) to access approximately 14,000 23andMe accounts. By exploiting the 'DNA Relatives' feature, they were then able to scrape and exfiltrate the data of 6.9 million users.
- **Alleged Violations**:
    1.  **Reasonable Data Security Law**: The suit alleges 23andMe "failed to implement and maintain reasonable and appropriate security procedures and practices." A key argument is that the company should have had better protections against a common attack like credential stuffing.
    2.  **Unfair Competition Law**: The company is accused of making "untrue and misleading statements" about the strength of its security measures before and after the breach.
    3.  **California Consumer Privacy Act (CCPA)**: As the breach involved the personal information of over 850,000 California residents, the alleged failure to provide reasonable security constitutes a violation of the CCPA.
    4.  **Genetic Information Privacy Act (GIPA)**: This law places specific, strict requirements on the handling of genetic data, which the lawsuit claims were violated.

## Affected Organizations

- **Primary**: **23andMe** is the defendant in the lawsuit.
- **Impacted**: 6.9 million individuals who used the 'DNA Relatives' feature, including over 850,000 residents of California.

## Compliance Requirements

The lawsuit underscores several key compliance requirements for businesses operating in California, particularly those handling sensitive data:

- **Implement Reasonable Security**: This is a cornerstone of the CCPA. While not explicitly defined, legal precedent suggests it includes measures to protect against common, foreseeable attacks. For online services, this includes defenses against credential stuffing, such as rate limiting, bot detection, and promoting multi-factor authentication.
- **Accurate Public Statements**: Companies must not misrepresent their security posture. Claims of 'strong' or 'robust' security can be used against a company in court if a breach demonstrates otherwise.
- **Adherence to Sector-Specific Laws**: For 23andMe, compliance with GIPA is non-negotiable. This highlights the need for organizations to be aware of and comply with all relevant industry-specific data protection laws, not just general privacy regulations.

## Impact Assessment

- **For 23andMe**: The company faces millions of dollars in potential fines, significant legal costs, and further damage to its reputation, which was already suffering after the breach disclosure. This lawsuit sets a precedent and could encourage other states or federal agencies to take similar action.
- **For the Industry**: This lawsuit sends a strong message to all companies handling consumer data: compliance with privacy laws is not optional, and 'reasonable security' is an enforceable standard. It specifically puts a spotlight on the responsibility of companies to protect users from the consequences of password reuse, rather than placing the blame solely on the user.

## Enforcement & Penalties

The lawsuit seeks civil fines to resolve the alleged violations. Under the CCPA, penalties can be up to $2,500 per violation, or $7,500 per intentional violation. With over 850,000 affected Californians, the potential fines are substantial. The lawsuit also seeks injunctive relief, which could force 23andMe to implement specific security measures and undergo independent audits.

## Compliance Guidance

This case provides clear guidance for other organizations:

1.  **Defend Against Credential Stuffing**: Do not assume password security is solely the user's problem. Implement technical controls to combat credential stuffing attacks. This is a critical aspect of [`M1027 - Password Policies`](https://attack.mitre.org/mitigations/M1027/) and [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
    - Use a service to check user passwords against known breach lists (e.g., Have I Been Pwned's Pwned Passwords API).
    - Implement rate limiting and IP-based blocking for login attempts.
    - Use CAPTCHAs or other bot detection mechanisms.
    - Strongly encourage or mandate MFA.
2.  **Review Public Statements**: Audit all marketing materials, privacy policies, and public statements to ensure they accurately reflect the company's security posture. Avoid hyperbole.
3.  **Data Minimization**: The 'DNA Relatives' feature, while popular, created a mechanism for mass data scraping. Companies should continuously evaluate features to ensure they don't create unforeseen privacy risks and collect/display only the minimum data necessary.

**Tags:** 23andMe, CCPA, data privacy, lawsuit, credential stuffing, genetic data

## Sources
- [California AG Files Lawsuit Over 23andMe Data Breach](https://www.hipaajournal.com/california-ag-files-lawsuit-over-23andme-data-breach/) — The HIPAA Journal (2026-05-29)
- [California sues 23andMe over data breach that exposed genetic info of millions](https://www.sfchronicle.com/tech/article/california-sues-23andme-data-breach-19493557.php) — San Francisco Chronicle (2026-05-29)

---
Source: https://cyber.netsecops.io/articles/california-ag-sues-23andme-over-2023-data-breach/
