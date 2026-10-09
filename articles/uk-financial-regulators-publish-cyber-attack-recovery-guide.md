# UK Regulators Issue Cyber Recovery Guide for Financial Firms

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Incident Response | **Updated:** 2025-10-21 | **Reading time:** 4 min

The United Kingdom's top financial regulators—the Bank of England (BoE), the Financial Conduct Authority (FCA), and the Prudential Regulation Authority (PRA)—have jointly published a guide on effective cyber response and recovery practices. The guidance, aimed at all financial firms, emphasizes the critical need for the ability to recover from severe attacks by using immutable backups, maintaining segregated recovery environments, and conducting rigorous testing of both internal and third-party resilience.

## Executive Summary
On October 20, 2025, the **[Bank of England (BoE)](https://www.bankofengland.co.uk/)**, the **[Financial Conduct Authority (FCA)](https://www.fca.org.uk/)**, and the **[Prudential Regulation Authority (PRA)](https://www.bankofengland.co.uk/prudential-regulation)** released a joint publication outlining effective practices for cyber response and recovery. The guidance is intended for all regulated financial firms and financial market infrastructures in the **[United Kingdom](https://en.wikipedia.org/wiki/United_Kingdom)**. It stresses that firms must be prepared for severe but plausible cyberattacks. Key recommendations include the ability to restore critical services from immutable backups, the use of segregated recovery facilities to prevent reinfection, and obtaining assurance that critical third-party vendors can meet the firm's recovery objectives. This publication signals a strong regulatory focus on operational resilience in the face of escalating cyber threats.

## Regulatory Details
The joint publication is not a new set of rules but rather a collection of observations on good practices seen at the most mature firms. The regulators expect firms of all sizes to consider these principles to enhance their resilience. The core themes are:

1.  **Assume Severe Disruption:** Firms should plan for a scenario where their primary production environment is compromised and untrustworthy. Recovery plans should not assume that any part of the production environment can be safely reused.
2.  **Recovery Capabilities:** The most effective practice is the ability to completely rebuild critical applications and infrastructure in a separate, clean environment. This includes restoring data from backups that are immutable or air-gapped, ensuring they cannot be encrypted or deleted by an attacker.
3.  **Segregated Environments:** Mature firms utilize a separate, segregated recovery facility. This environment must be highly resistant to unauthorized access, particularly from an attacker who has control of the production network.
4.  **Third-Party Resilience:** Firms are explicitly reminded that they cannot outsource their regulatory responsibility. They must conduct due diligence and obtain strong assurances that their critical third-party providers (e.g., cloud service providers) have adequate resilience and can support the firm's recovery time objectives (RTOs).
5.  **Testing and Communication:** Firms must regularly test their recovery plans. This includes testing backup restoration, application rebuilding, and crisis communication channels. Pre-defined communication plans for internal and external stakeholders are essential.

## Affected Organizations
The guidance is aimed at all firms regulated by the BoE, FCA, and PRA. This includes banks, building societies, investment firms, insurance companies, and financial market infrastructures (FMIs) operating in the UK. While the observations are drawn from large, complex firms, the regulators state that the underlying principles are applicable to all.

## Compliance Requirements
While not a formal regulation, the publication sets a clear expectation for what regulators consider to be effective practice. Firms should be prepared to demonstrate to regulators how they have considered and implemented these principles. Key actions for firms include:

*   Reviewing and updating incident response and disaster recovery plans to align with a "rebuild from scratch" scenario.
*   Assessing their backup solutions to ensure they are truly immutable or logically air-gapped.
*   Evaluating the security and segregation of their recovery environments.
*   Initiating discussions with critical third-party vendors to get contractual assurances of their resilience capabilities.
*   Scheduling and conducting rigorous, scenario-based tests of their recovery plans.

## Impact Assessment
For financial firms, implementing these practices will require significant investment in technology, processes, and personnel. Firms with legacy infrastructure may face challenges in creating truly segregated recovery environments. There will be increased pressure on cloud and managed service providers to offer provable resilience and transparent recovery capabilities. The guidance will likely lead to more stringent third-party risk management programs and tougher contractual negotiations with vendors. Ultimately, this will increase the baseline for operational resilience across the UK financial sector, making it more robust against systemic cyber threats like ransomware.

## Compliance Guidance
1.  **Gap Analysis:** Conduct a gap analysis of your current recovery capabilities against the practices outlined in the publication.
2.  **Backup Strategy Review:** Immediately assess your backup architecture. Can an attacker with domain admin rights in your production environment delete or encrypt your backups? If so, they are not sufficiently protected. Prioritize implementing immutability or a true air gap.
3.  **Third-Party Due Diligence:** Update your third-party risk management questionnaire to include specific questions about their recovery capabilities, RTOs, and how they segregate customer environments.
4.  **Scenario-Based Testing:** Move beyond simple backup restoration tests. Conduct a full-scale exercise that simulates the complete loss of your primary data center and assumes the network is compromised. Test your ability to rebuild critical services in your recovery site without relying on anything from the production environment.

**Tags:** UK, Finance, Regulatory, Compliance, BankOfEngland, FCA, PRA, IncidentResponse

## Sources
- [Effective practices: Cyber response and recovery capabilities](https://www.bankofengland.co.uk/news/2025/october/effective-practices-cyber-response-and-recovery-capabilities) — Bank of England (2025-10-20)
- [BoE, FCA and PRA joint publication - Effective practices: Cyber response and recovery capabilities](https://www.globalregulationtomorrow.com/2025/10/20/boe-fca-and-pra-joint-publication-effective-practices-cyber-response-and-recovery-capabilities/) — Global Regulation Tomorrow (2025-10-20)

---
Source: https://cyber.netsecops.io/articles/uk-financial-regulators-publish-cyber-attack-recovery-guide/
