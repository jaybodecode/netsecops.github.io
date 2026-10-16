# Lapsus$ Claims Theft of 4TB of Data from AI Firm Mercor in LiteLLM Supply Chain Attack

**Severity:** critical | **Category:** Supply Chain Attack,Data Breach,Threat Actor | **Updated:** 2026-04-05 | **Reading time:** 6 min

AI recruiting firm Mercor has confirmed it was impacted by a recent supply chain attack targeting the open-source LiteLLM PyPI package. The incident occurred on March 27, when malicious versions `1.82.7` and `1.82.8` of LiteLLM were published for about 40 minutes. Following the incident, the notorious extortion group Lapsus$ claimed responsibility, listing Mercor on its data leak site and alleging the theft of over 4 terabytes of data. Mercor is currently investigating the breach with third-party forensic experts. The attack originated from a compromise of a dependency used in Mercor's CI/CD workflow, highlighting the cascading risks in the software supply chain.

## Executive Summary
The AI recruiting startup **Mercor** has become a high-profile victim of a recent software supply chain attack that targeted the open-source **LiteLLM** project. The company confirmed it was impacted after malicious versions of the **LiteLLM** PyPI package were published on March 27. The incident has been exacerbated by a claim from the notorious extortion group **[Lapsus$](https://attack.mitre.org/groups/G0139/)**, which has listed **Mercor** on its data leak site and boasted of stealing over 4 terabytes of data. This attack underscores the significant and cascading risks of supply chain security, where a brief compromise of one component can lead to a catastrophic breach for downstream users.

---

## Threat Overview
The incident is a multi-layered supply chain attack. The attack chain appears to be as follows:
1.  **Initial Dependency Compromise:** The attack reportedly began with the compromise of **Trivy**, a dependency that **Mercor** used in its CI/CD security scanning pipeline.
2.  **Maintainer Credential Theft:** The threat actor, identified as **TeamPCP**, used credentials stolen from a compromised maintainer to gain publishing rights to the **LiteLLM** PyPI package.
3.  **Malicious Publication:** On March 27, **TeamPCP** published two malicious versions of **LiteLLM**: `1.82.7` and `1.82.8`. These versions were available for download for approximately 40 minutes.
4.  **Downstream Compromise:** **Mercor**, using **LiteLLM** in its environment, pulled one of the malicious versions during this window, leading to a compromise of its systems.
5.  **Extortion and Data Leak:** The **Lapsus$** group subsequently claimed to have exploited this access to exfiltrate 4TB of data from **Mercor** and is now using this claim for extortion.

This incident highlights how quickly a supply chain compromise can be weaponized. The 40-minute window was enough for the malicious package to be integrated into a company's systems, leading to a major data breach.

## Technical Analysis
The attack demonstrates several key TTPs associated with modern supply chain and extortion attacks:
- **[`T1195.002 - Compromise Software Supply Chain: Compromise Software`](https://attack.mitre.org/techniques/T1195/002/):** The core of the attack was the injection of malicious code into the **LiteLLM** PyPI package.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Attackers used a compromised maintainer's credentials to publish the malicious code, a hallmark of groups like **Lapsus$**.
- **[`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/):** **Lapsus$**'s claim of stealing 4TB of data implies the use of large-scale data exfiltration techniques, likely over standard web protocols to blend in with normal traffic.
- **[`T1659 - Content Injection`](https://attack.mitre.org/techniques/T1659/):** Malicious code was injected into the legitimate LiteLLM package.

**Lapsus$** is known for its focus on high-impact data theft and extortion, often gaining initial access through social engineering or compromising developer accounts rather than using sophisticated malware.

## Impact Assessment
For **Mercor**, the impact is severe and multi-faceted:
- **Massive Data Breach:** The alleged theft of 4TB of data could include highly sensitive information, such as client data, candidate PII, proprietary source code, and internal company documents. This poses an immense privacy and security risk.
- **Reputational Damage:** Being publicly named on a leak site by a group like **Lapsus$** causes significant damage to a company's reputation and erodes customer trust, which is particularly damaging for a recruiting firm.
- **Financial Loss:** The costs of forensic investigation, remediation, potential regulatory fines (e.g., GDPR), and potential loss of business will be substantial.
- **Intellectual Property Theft:** The loss of proprietary AI models and source code could be devastating for an AI-focused startup.

The broader impact on the open-source community is a further erosion of trust in public package registries and a stark reminder of the fragility of the software supply chain.

## Detection & Response
**Mercor** has taken the correct initial steps by containing the incident and engaging third-party forensic experts.

For other potential victims:
1.  **Dependency Check:** Immediately check all Python environments and `requirements.txt` files for the malicious **LiteLLM** versions (`1.82.7`, `1.82.8`).
2.  **Log Review:** Analyze CI/CD and server logs from March 27 to see if the malicious packages were downloaded and installed.
3.  **Hunt for Exfiltration:** Monitor network logs for any anomalous large outbound data transfers around the time of the incident. This can be aided by **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

## Mitigation
- **Pin Dependencies:** Do not use floating versions for dependencies in production. Pin all packages to a specific, vetted version in `requirements.txt` or a similar lockfile. This is a critical form of **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Local Package Mirror:** For critical dependencies, consider hosting a private, vetted mirror of the package registry. This prevents malicious updates from being pulled directly from the public internet.
- **CI/CD Security:** Implement security scanning (SCA) in the CI/CD pipeline to check for malicious or vulnerable packages *before* they are installed. However, as this incident shows, the scanner's own dependencies must also be secure.
- **Egress Filtering:** Implement strict egress filtering on build servers and production environments to block unexpected outbound connections, which can prevent data exfiltration. This aligns with **[D3-OTF: Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
- **Enforce MFA:** Mandate MFA for all developer accounts on platforms like GitHub and PyPI to make credential compromise more difficult.

**Tags:** supply chain, Lapsus$, PyPI, LiteLLM, data breach, extortion

## Sources
- [Mercor Hit by LiteLLM Supply Chain Attack](https://www.securityweek.com/mercor-hit-by-litellm-supply-chain-attack/) — SecurityWeek (2026-04-02)

---
Source: https://cyber.netsecops.io/articles/lapsus-claims-theft-of-4tb-of-data-from-ai-firm-mercor-in-supply-chain-attack/
