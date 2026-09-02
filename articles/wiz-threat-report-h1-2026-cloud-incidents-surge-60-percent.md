# Cloud Incidents Jump 60% in H1 2026, Driven by Doubling of Supply-Chain Attacks

**Severity:** high | **Category:** Threat Intelligence,Cloud Security,Supply Chain Attack | **Updated:** 2026-08-07 | **Reading time:** 4 min

A new threat report from Wiz, published August 6, 2026, reveals a 60% increase in notable cloud incidents in the first half of 2026 compared to late 2025. This surge was primarily driven by a more than 100% rise in software supply-chain attacks from groups like TeamPCP and North Korean actors. The report also highlights AI infrastructure as an emerging, high-value target for threat actors.

## Executive Summary
A new threat landscape report from **[Wiz](https://www.wiz.io/)** Research reveals a dramatic escalation in cloud-based threats during the first half of 2026. Published on August 6, the report documents a 60% increase in significant cloud incidents compared to the second half of 2025. The primary catalyst for this surge was a doubling in the proportion of software supply-chain attacks, which grew from 10% to 25% of all major incidents. Multiple threat actor groups, including the financially motivated **TeamPCP** and state-sponsored actors from North Korea, were observed conducting simultaneous campaigns against open-source ecosystems like npm and PyPI. The report also identifies AI infrastructure as a new and lucrative attack surface and details the emergence of a new cloud-native extortion gang, **JINX-0163**.

---

## Threat Overview
The H1 2026 report paints a picture of a rapidly evolving and increasingly aggressive cloud threat landscape. Key findings include:

-   **Supply-Chain Attacks Double**: The most significant trend was the explosion of supply-chain attacks. At least five distinct campaigns were active, targeting npm, PyPI, Composer, VSCode extensions, and Jenkins plugins. **TeamPCP** focused on poisoning developer packages for credential theft, while North Korean actors were also highly active, notably trojanizing the popular `axios` package.

-   **AI Infrastructure as a Target**: As organizations race to adopt AI, their security practices are lagging. Wiz observed attackers exploiting vulnerabilities in AI tools like **Langflow** to deploy cryptominers, demonstrating that AI environments are now a distinct and targeted attack surface.

-   **Rise of Cloud-Native Extortion**: A new extortion group, **JINX-0163**, has emerged. This group specializes in targeting non-human identities, such as cloud service accounts and IAM roles. By compromising these machine identities, they gain broad access to a victim's cloud environment and then demand a ransom.

---

## Technical Analysis
The report details several distinct TTPs used by these threat actors:

-   **TeamPCP**: This group used typosquatting and package poisoning in the npm and PyPI ecosystems. They would upload malicious packages with names similar to legitimate ones, tricking developers into installing them. The packages contained malware designed to steal developer credentials. This aligns with **[T1195.002 - Compromise Software Supply Chain](https://attack.mitre.org/techniques/T1195/002/)**.

-   **North Korean Actors**: These state-sponsored actors also engaged in supply chain attacks, including modifying legitimate packages like `axios` to include malicious code. Their motives are likely a combination of espionage and financial gain.

-   **JINX-0163**: This group focuses on **[T1078.004 - Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/)**, but specifically targets non-human identities. They likely scan for misconfigured IAM roles or exposed service account keys to gain their initial foothold, then escalate privileges within the cloud environment.

-   **AI Infrastructure Attacks**: The attack on **Langflow** involved exploiting a Remote Code Execution (RCE) vulnerability to deploy a cryptominer. This demonstrates the use of **[T1190 - Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/)** against a new class of targets.

---

## Impact Assessment
The surge in these attacks has a multi-faceted impact. The doubling of supply-chain attacks places immense pressure on software development life cycles, forcing organizations to invest heavily in dependency scanning and verification. A single compromised package can lead to a breach. The targeting of AI infrastructure introduces new risks; beyond cryptomining, attackers could steal proprietary models, poison training data, or use the powerful compute resources for their own malicious purposes. The emergence of cloud-native extortion groups like JINX-0163 that bypass traditional user-focused security highlights the critical need for robust Cloud Infrastructure Entitlement Management (CIEM) to secure non-human identities.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

---

## Cyber Observables — Hunting Hints
Based on the report, security teams should hunt for:

| Type | Value | Description | Context |
| :--- | :--- | :--- | :--- |
| Log Source | CloudTrail, Azure Activity Logs | Anomalous activity from IAM roles or service accounts, such as unexpected privilege escalation or data access. | SIEM, Cloud Security Posture Management (CSPM). |
| Process Name | `xmrig`, `kinsing` | Common cryptomining processes running on servers, especially those hosting AI models. | EDR, process monitoring on cloud VMs. |
| File Path | `~/.npmrc`, `~/.pypirc` | Unauthorized access to these files on developer machines or build servers indicates credential theft attempts. | File Integrity Monitoring (FIM). |
| DNS Query | DNS requests for typosquatted domains from build servers. | An indicator of a malicious package being installed. | DNS logs, network sensors. |

---

## Detection & Response
1.  **CIEM**: Deploy a Cloud Infrastructure Entitlement Management (CIEM) solution to gain visibility into and manage the permissions of all identities, both human and non-human. This is critical for detecting the activity of groups like JINX-0163.
2.  **Supply Chain Security**: Use Software Composition Analysis (SCA) tools to scan for malicious or vulnerable dependencies in all codebases. Implement policies to block builds that contain high-risk packages.
3.  **Cloud Workload Protection**: Deploy a Cloud Workload Protection Platform (CWPP) to monitor for malicious processes (like cryptominers) and file modifications on cloud virtual machines and containers.
4.  **AI Security Posture**: Regularly assess the security of AI/ML environments, including the applications that serve models (like Langflow) and the permissions of the underlying infrastructure.

---

## Mitigation
1.  **Least Privilege for Non-Human Identities**: Drastically limit the permissions of service accounts and IAM roles to the absolute minimum required for their function. This is a core principle of **MITRE Mitigation M1026: Privileged Account Management**.
2.  **Dependency Vetting**: Establish a formal process for vetting and approving open-source dependencies before they can be used in development. Maintain a private registry of approved packages.
3.  **Harden AI Infrastructure**: Treat AI/ML platforms as critical, production-level applications. Apply regular patching, harden configurations, and place them behind web application firewalls (WAFs).
4.  **Package Download Cooldown**: As recommended by Wiz, consider implementing policies that prevent the immediate download of newly published or updated packages, providing a time buffer for the security community to identify malicious software.

**Tags:** cloud security, Wiz, threat report, supply chain attack, TeamPCP, JINX-0163, AI security

## Sources
- [Cloud Threat Highlights: H1 2026](https://www.wiz.io/blog/cloud-threat-highlights-h1-2026) — Wiz (2026-08-06)
- [Surging Cloud Threats: Are Supply Chain Attacks the New Norm?](https://futurumgroup.com/insights/surging-cloud-threats-are-supply-chain-attacks-the-new-norm/) — The Futurum Group (2026-08-07)

---
Source: https://cyber.netsecops.io/articles/wiz-threat-report-h1-2026-cloud-incidents-surge-60-percent/
