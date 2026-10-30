# FDD Urges NIST, NSA to Evaluate New Anti-Ransomware Tech

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Ransomware | **Updated:** 2026-10-30 | **Reading time:** 4 min

On October 30, 2026, the Foundation for Defense of Democracies (FDD) urged NIST and the NSA to evaluate 'vaultless, keyless pseudonymization' as a safeguard against ransomware and data breaches. The think tank argues that this technology, which replaces sensitive data with non-sensitive tokens, could render stolen data valueless to attackers, addressing the vulnerability of data when it is decrypted for use. The FDD is advocating for a shift in cybersecurity policy to focus on making data less damaging when breaches inevitably occur.

## Executive Summary
The **[Foundation for Defense of Democracies (FDD)](https://www.fdd.org/)**, a Washington D.C.-based think tank, has publicly called on the **[National Institute of Standards and Technology (NIST)](https://www.nist.gov)** and the **[National Security Agency (NSA)](https://www.nsa.gov)** to formally evaluate an emerging data protection technology: vaultless, keyless pseudonymization. In a statement on October 30, 2026, the FDD argued that traditional encryption, while essential, leaves a critical gap. Data is vulnerable when decrypted for processing, creating opportunities for theft. The proposed technology aims to mitigate this by replacing raw sensitive data with pseudonymized tokens that have no intrinsic value if stolen, thus neutralizing the impact of data breaches and ransomware attacks.

## Regulatory Details
The FDD's proposal is not a new regulation but a call for U.S. standards bodies (NIST and NSA) to vet and potentially standardize a new approach to data protection. The core idea is to shift the focus from solely preventing intrusions to also minimizing the damage when intrusions succeed.

- **Problem Addressed**: Conventional encryption protects data at rest and in transit, but not in use. When data is decrypted for an application, AI model, or third-party vendor to use, it becomes vulnerable. Ransomware and data theft attacks often target data in this exposed state.
- **Proposed Solution**: 'Vaultless, keyless pseudonymization' replaces sensitive data elements with irreversible tokens. The original data is never stored in a central vault that could be compromised. Authorized applications can restore the data on-demand through a secure process, but the stolen tokens themselves are useless to an attacker.

## Affected Organizations
This initiative would primarily affect:
- **U.S. Government Agencies**: NIST and the NSA would be responsible for the evaluation.
- **Technology Vendors**: Companies that offer tokenization, pseudonymization, and other data protection solutions would be subject to increased scrutiny and would need to align with any new standards.
- **All Industries**: If adopted as a standard or best practice, organizations across all sectors (especially healthcare, finance, and critical infrastructure) would be encouraged or required to adopt such technologies to protect sensitive data.

## Compliance Requirements
If NIST and the NSA were to develop a standard based on this technology, future compliance requirements could include:
- **Data De-valuation**: Mandating that sensitive data be pseudonymized or tokenized before being processed by applications, particularly in cloud and multi-vendor environments.
- **Proof of Irreversibility**: Requiring vendors to provide independent verification that their tokenization process cannot be reversed by an unauthorized party.
- **Downstream Data Revocation**: Demonstrating the ability to programmatically revoke access to data, even after it has been shared with third parties.

## Impact Assessment
The FDD argues that this approach could fundamentally change the economics of cybercrime. If stolen data is worthless, the incentive for data theft and double-extortion ransomware diminishes. For businesses, this could mean:
- **Reduced Breach Impact**: A breach would still be a security incident, but it would not necessarily be a catastrophic data loss event.
- **Safer Data Sharing**: Organizations could more safely share data with partners and leverage cloud-based AI/ML services without exposing raw sensitive information.
- **Increased Vendor Scrutiny**: A push for greater transparency from technology vendors about how they handle customer data.

## Compliance Guidance
While no formal guidance exists yet, the FDD's push suggests organizations should begin thinking about their data protection strategies beyond encryption.
1.  **Data Discovery and Classification**: Identify where your most sensitive data resides and how it is used.
2.  **Evaluate Data-in-Use Protection**: Assess the risk to data when it is actively being processed. Are there opportunities to use tokenization or pseudonymization instead of live data?
3.  **Vendor Due Diligence**: When procuring new software or cloud services, ask detailed questions about how the vendor protects data-in-use. Does raw data ever enter their environment? Can they prove it?
4.  **Monitor NIST/NSA Publications**: Keep an eye on any future guidance or frameworks released by these agencies regarding advanced data protection techniques.

**Tags:** fdd, nist, nsa, pseudonymization, tokenization, data protection, ransomware

## Sources
- [FDD urges NIST, NSA to evaluate vaultless, keyless pseudonymization as safeguard against ransomware attacks](https://industrialcyber.co/ransomware/fdd-urges-nist-nsa-to-evaluate-vaultless-keyless-pseudonymization-as-safeguard-against-ransomware-attacks/) — Industrial Cyber (2026-10-30)

---
Source: https://cyber.netsecops.io/articles/fdd-urges-nist-nsa-to-evaluate-vaultless-keyless-pseudonymization/
