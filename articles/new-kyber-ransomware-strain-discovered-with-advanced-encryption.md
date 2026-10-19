# New 'KYBER' Ransomware Emerges with Advanced Encryption and Data-Driven Extortion Model

**Severity:** high | **Category:** Ransomware,Malware,Threat Intelligence | **Updated:** 2025-11-01 | **Reading time:** 4 min

Cybersecurity researchers at CYFIRMA have identified a new ransomware strain named KYBER, which employs a sophisticated hybrid encryption scheme including the post-quantum Kyber1024 algorithm. The ransomware, discovered on underground forums, follows a double-extortion model, threatening to leak stolen data if victims do not establish contact within two weeks. KYBER targets Windows systems in English-speaking countries, with a focus on high-value sectors like Aerospace & Defense and technology. Researchers warn it may evolve into a full-fledged Ransomware-as-a-Service (RaaS) operation.

## Executive Summary
A new and sophisticated ransomware family, named **KYBER**, has been discovered by researchers at **[CYFIRMA](https://www.cyfirma.com/)**. The malware distinguishes itself by using an advanced hybrid encryption scheme that combines `AES-256-CTR`, `X25519`, and the quantum-resistant `Kyber1024` algorithm, making decryption without the private key computationally infeasible. The operators are already engaging in double extortion, claiming to exfiltrate significant amounts of data before encryption and threatening to publish it on a leak blog. The campaign appears to be in its early stages but shows signs of evolving into a structured, data-driven extortion operation, with the potential to become a scalable Ransomware-as-a-Service (RaaS) threat.

## Threat Overview
KYBER ransomware targets Windows environments, including network shares and removable drives. Upon execution, it encrypts files, appending a random extension like `.#~~~`, and drops a ransom note named `ReadMeForDecrypt.txt`. The note details the encryption method and instructs the victim to make contact within one to two weeks to prevent their data from being leaked. The attackers offer to decrypt three small files for free to prove their capability. The primary targets are currently organizations in English-speaking regions such as the United States, Western Europe, and Australia, with a focus on industries like Aerospace & Defense, government contractors, and technology firms.

## Technical Analysis
KYBER's most notable feature is its advanced cryptographic implementation.
-   **Encryption Scheme**: It uses a hybrid approach. The `Kyber1024` algorithm, a candidate in the NIST Post-Quantum Cryptography standardization process, is likely used for key encapsulation to protect the symmetric keys. The `X25519` elliptic-curve algorithm is also used, likely for key exchange. The actual file contents are encrypted with the fast and secure `AES-256-CTR` symmetric cipher.
-   **Impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/))**: The ransomware systematically traverses local drives, removable media, and mapped network shares to encrypt files.
-   **Exfiltration ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/))**: Before encryption, the malware exfiltrates sensitive data to attacker-controlled infrastructure. The exact tools used for exfiltration are not yet known but are a key part of its data-driven extortion model.
-   **Command and Control**: Communication with the attackers for negotiation is likely handled via a Tor-based portal, a standard practice for modern ransomware groups.

## Impact Assessment
The emergence of KYBER represents a concerning evolution in the ransomware landscape. The use of a post-quantum algorithm, while possibly more of a marketing gimmick at this stage, demonstrates a growing sophistication among threat actors. If KYBER transitions to a RaaS model as predicted, it could quickly proliferate and become a widespread threat. For victims, the combination of robust encryption and data theft presents a difficult dilemma. The loss of access to critical files can halt business operations, while the public leak of sensitive data can lead to severe reputational damage, regulatory fines, and loss of competitive advantage.

## Detection & Response
-   **File-Based Detection**: Use antivirus and EDR solutions to detect the KYBER ransomware executable by signature. Monitor for the creation of files with the name `ReadMeForDecrypt.txt` or files with unusual extensions like `.#~~~`. This can be done with file content rules ([`D3-FCR`](https://d3fend.mitre.org/technique/d3f:FileContentRules)).
-   **Behavioral Detection**: Monitor for processes performing rapid, widespread file modification and renaming operations, a hallmark of ransomware activity. Process analysis ([`D3-PA`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)) is key here.
-   **Network Monitoring**: Watch for large, unexpected outbound data transfers, which could indicate pre-encryption data exfiltration.

## Mitigation
Standard ransomware defenses are effective against KYBER.
1.  **Immutable Backups**: This is the most critical defense. Maintain offline, air-gapped, or immutable backups of all critical data. Regularly test the restoration process to ensure recovery is possible.
2.  **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**: Segment the network to prevent the ransomware from spreading from a compromised workstation to critical servers and backup systems.
3.  **Least Privilege Access ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/))**: Ensure user and service accounts have only the minimum permissions necessary. This can limit the scope of files a ransomware process can encrypt.
4.  **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/))**: Train users to recognize and report phishing emails, which are a common initial access vector for ransomware.

**Tags:** KYBER, Ransomware, Malware, Post-Quantum Cryptography, Data Extortion, RaaS

## Sources
- [Weekly Intelligence Report – 31 October 2025](https://www.cyfirma.com/outofband/weekly-intelligence-report-31-october-2025/) — CYFIRMA (2025-10-31)
- [Daily Cyber News – October 31st, 2025](https://dailycyber.news/) — Daily Cyber News (2025-10-31)

---
Source: https://cyber.netsecops.io/articles/new-kyber-ransomware-strain-discovered-with-advanced-encryption/
