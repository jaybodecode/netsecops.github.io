# G7 Urges Financial Sector to Prepare for Quantum Computing Threat

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Threat Intelligence | **Updated:** 2026-01-12 | **Reading time:** 5 min

The G7 Cyber Expert Group (CEG), co-chaired by the U.S. Department of the Treasury and the Bank of England, has issued a public statement and roadmap advising the global financial sector to begin a coordinated transition to quantum-resilient technology. The guidance warns that advanced quantum computers will eventually be able to break the public-key cryptography that secures the world's financial transactions. The roadmap encourages financial institutions to start assessing their quantum risks and developing formal plans for migrating to post-quantum cryptography (PQC) standards, such as those being developed by NIST, to counter 'harvest now, decrypt later' attacks.

## Executive Summary
The **[G7](https://en.wikipedia.org/wiki/G7)** Cyber Expert Group (CEG) has issued a significant advisory to the global financial sector, urging immediate preparation for the advent of quantum computing. In a statement released on January 12, 2026, the group, led by the **[U.S. Department of the Treasury](https://home.treasury.gov/)** and the **[Bank of England](https://www.bankofengland.co.uk/)**, released a roadmap to guide financial institutions in their transition to **[Post-Quantum Cryptography (PQC)](https://www.nist.gov/pqc)**. The core concern is that a cryptographically relevant quantum computer (CRQC) will be capable of breaking the asymmetric encryption algorithms (like RSA and ECC) that currently protect virtually all digital financial data and communications. The G7 warns of 'harvest now, decrypt later' attacks, where adversaries are already capturing and storing encrypted data, waiting for the technology to decrypt it. The roadmap provides a framework for organizations to begin inventorying their cryptographic systems, assessing risks, and planning an orderly migration to new, quantum-resilient standards.

## Regulatory Details
The document, titled 'G7 Cyber Expert Group Statement on Planning for the Opportunities and Risks of Quantum Computing,' is not a binding regulation but a strategic roadmap. It outlines a set of principles and recommended actions for both private financial firms and public sector authorities. The key pillars of the guidance include:

- **Governance and Strategy**: Financial institutions should establish clear governance structures to oversee the PQC transition. This includes assigning executive-level responsibility, forming cross-functional teams (involving IT, security, legal, and business units), and developing a formal, board-approved transition strategy.
- **Risk Assessment**: Organizations are urged to conduct comprehensive inventories of their cryptographic systems to identify all instances of public-key cryptography in use. This includes hardware (HSMs), software, and services. They must then assess their specific risk exposure to quantum threats.
- **Transition Planning**: The roadmap advises creating a detailed, milestone-based plan for migrating to PQC. This involves prioritizing the most critical and exposed systems first. The plan should align with the development and standardization of new algorithms by bodies like the U.S. **[National Institute of Standards and Technology (NIST)](https://www.nist.gov/)**.
- **Collaboration**: The CEG emphasizes the need for public-private collaboration, information sharing between financial institutions, and engagement with technology suppliers to ensure a smooth and interoperable transition across the entire ecosystem.

## Affected Organizations
The guidance is directed at the entire global financial ecosystem. This includes:
-   **Financial Institutions**: Banks, investment firms, insurance companies, credit unions, and asset managers of all sizes.
-   **Financial Market Infrastructures**: Payment systems, central securities depositories, and clearing houses.
-   **Technology Suppliers**: Cloud service providers, software vendors, and hardware manufacturers (e.g., HSM producers) that supply the financial sector.
-   **Regulatory and Supervisory Bodies**: Central banks and financial regulators within the G7 nations and beyond are expected to incorporate this guidance into their supervisory frameworks.

## Compliance Requirements
While not yet a mandate, the roadmap signals that future regulatory expectations will require financial firms to demonstrate progress in their PQC transition. Key implicit requirements include:
1.  **Cryptographic Agility**: Firms must develop the capability to replace cryptographic algorithms in their systems with minimal disruption. This means moving away from hard-coded cryptography.
2.  **Inventory Management**: Maintaining a complete and up-to-date inventory of all cryptographic assets (a 'crypto-BOM') will become essential.
3.  **Strategic Planning**: Regulators will expect to see evidence of a formal, documented plan for PQC migration, including timelines and resource allocation.
4.  **Supply Chain Diligence**: Firms will be responsible for ensuring their third-party vendors and service providers are also preparing for the PQC transition.

## Impact Assessment
The transition to PQC represents one of the most significant and complex technological migrations in the history of IT. The impact on financial organizations will be profound:
-   **Financial Costs**: The transition will require substantial investment in research, new hardware (like PQC-capable HSMs), software redevelopment, and skilled personnel.
-   **Operational Complexity**: Replacing cryptographic primitives embedded deep within legacy systems will be a massive undertaking, fraught with operational risk if not managed carefully.
-   **Systemic Risk**: A poorly coordinated transition could lead to interoperability issues between firms, potentially disrupting financial markets. This is why the G7 is advocating for a collaborative approach.
-   **'Harvest Now, Decrypt Later'**: The immediate threat is data theft. Adversaries, particularly nation-states, are believed to be exfiltrating and storing large volumes of encrypted financial data today ([`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/)). This data, which may have a long-term strategic value, could be decrypted in the future once a CRQC is built. This makes the transition an urgent, albeit long-term, priority.

## Mitigation and Guidance
- **Immediate Steps**: Organizations should immediately begin the process of creating a cryptographic inventory. This is the foundational step for any PQC strategy. They should also start raising awareness at the board and executive levels.
- **Follow NIST Standards**: The financial sector should closely follow the PQC standardization process led by NIST. The initial standards (e.g., for CRYSTALS-Kyber and CRYSTALS-Dilithium) provide a solid foundation for planning.
- **Develop Crypto-Agility**: Prioritize architectural changes that make it easier to swap out cryptographic algorithms. This is a key principle of [`M1054 - Software Configuration`](https://attack.mitre.org/mitigations/M1054/).
- **Pilot Projects**: Begin testing PQC algorithms in non-production environments to understand their performance characteristics and integration challenges. This aligns with **[D3FEND's Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Engage with Vendors**: Start conversations with critical technology suppliers about their PQC roadmaps. This is essential for managing supply chain risk.

**Tags:** G7, PQC, Post-Quantum Cryptography, Finance, Banking, NIST, U.S. Treasury, Quantum Computing

## Sources
- [G7 Cyber Expert Group Releases Roadmap for Coordinating the Transition to Post-Quantum Cryptography in the Financial Sector](https://home.treasury.gov/news/press-releases/jy2026) — U.S. Department of the Treasury (2026-01-12)
- [G7 Cyber Expert Group Statement on Planning for the Opportunities and Risks of Quantum Computing](https://home.treasury.gov/system/files/136/G7-CEG-Statement-on-Quantum-September-2024.pdf) — U.S. Department of the Treasury (2026-01-12)

---
Source: https://cyber.netsecops.io/articles/g7-issues-roadmap-for-post-quantum-cryptography-in-financial-sector/
