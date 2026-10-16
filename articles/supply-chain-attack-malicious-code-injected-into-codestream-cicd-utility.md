# CodeStream CI/CD Utility Compromised in Supply Chain Attack, Developer Secrets Stolen

**Severity:** critical | **Category:** Supply Chain Attack,Security Operations,Threat Intelligence | **Updated:** 2026-07-01 | **Reading time:** 5 min

The popular open-source CI/CD utility 'CodeStream' has been the target of a sophisticated supply chain attack. An unknown threat actor compromised the project's package registry, publishing a malicious version (3.4.1) on June 29, 2026. The tainted version, downloaded over 50,000 times, was designed to scan and exfiltrate sensitive credentials, API keys, and tokens from developer environments for services like AWS, GitHub, and Artifactory. The CodeStream team has released a clean version (3.4.2) and is urging all users to upgrade immediately, rotate all credentials, and audit their systems for compromise.

## Executive Summary

The open-source CI/CD utility **CodeStream** has been compromised in a significant software supply chain attack. On June 29, 2026, an unauthorized actor published a malicious version, `3.4.1`, to the official package registry. This version contained code designed to steal sensitive environment variables, API keys, and other credentials from the systems it was running on. The malicious package was available for 36 hours and was downloaded an estimated 50,000 times before being removed. The developers have released a patched version, `3.4.2`, and are advising all users to upgrade immediately and begin rotating all potentially exposed secrets.

---

## Threat Overview

This incident is a classic software supply chain attack, where attackers compromise the build or distribution process of a trusted piece of software to push malicious code to downstream users. The attack on **CodeStream** is particularly dangerous because CI/CD systems are central to modern software development and are often configured with highly privileged access to other systems.

*   **Attack Vector:** The threat actor gained access to the project's package registry credentials, allowing them to publish new versions of the software.
*   **Malicious Payload:** The code injected into version `3.4.1` was specifically designed to be an info-stealer. It scans the environment variables of the machine it runs on, searching for patterns that match common credential formats for services like **[AWS](https://aws.amazon.com/)**, **[GitHub](https://github.com)**, and **Artifactory**.
*   **Exfiltration:** The stolen credentials were exfiltrated using a DNS-over-HTTPS (DoH) tunnel. This is a stealthy technique that can blend in with legitimate DNS traffic, making it harder to detect on a network level.

## Technical Analysis

The attack's sophistication lies in its targeting of the CI/CD pipeline. By compromising **CodeStream**, the attackers could potentially gain access to the 'crown jewels' of any organization using it: source code, private keys, and cloud infrastructure credentials. The choice to use DoH for exfiltration shows a level of technical competence aimed at evading network-based security controls.

Analysis by **GitHub Security Lab** confirmed the malicious behavior. The injected code would activate upon the execution of the CI/CD utility, perform its scan, and then send the collected data to an attacker-controlled server before continuing with its normal operations, making the malicious activity less obvious.

### MITRE ATT&CK TTPs

*   **Initial Access:** [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/) - Attackers compromised the CodeStream project to attack its users.
*   **Defense Evasion, Persistence, Privilege Escalation, Initial Access:** [`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/) - The core of the attack, compromising a software package to gain access to downstream systems.
*   **Credential Access:** [`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/) - The malware likely searched for SSH keys and other private keys.
*   **Credential Access:** [`T1552.005 - Cloud Instance Metadata API`](https://attack.mitre.org/techniques/T1552/005/) - If running in a cloud environment, the malware could query the metadata service for credentials.
*   **Exfiltration:** [`T1048.003 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1048/003/) - Using DoH as a C2 channel to exfiltrate data.

## Impact Assessment

The potential impact for the 50,000+ downloads is severe. Any organization that downloaded and ran version `3.4.1` must assume that all secrets present in their CI/CD environment have been compromised. This includes:

*   Cloud provider API keys (e.g., AWS, GCP, Azure).
*   Source code repository tokens (e.g., GitHub, GitLab).
*   Package registry credentials (e.g., Artifactory, npm, Docker Hub).
*   Database passwords and other application secrets.

With these secrets, attackers could steal source code, deploy malicious code into production, run up huge cloud bills (e.g., for crypto mining), or pivot deeper into the victim's network.

## IOCs — Directly from Articles

No specific Indicators of Compromise (e.g., file hashes, C2 domains) were mentioned in the source articles.

## Detection & Response

*   **Detection:**
    *   **Version Check:** The first step is to identify any system that has or had **CodeStream** version `3.4.1` installed. This can be done via software inventory tools or by checking package manager logs.
    *   **Network Logs:** Hunt for anomalous DNS traffic, particularly a high volume of DNS queries or DoH traffic to unknown domains from build servers or developer workstations. D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) can help here.
    *   **Cloud Logs:** Review cloud audit logs (e.g., AWS CloudTrail) for any suspicious activity performed using CI/CD service account credentials, such as the creation of new users or access keys.
*   **Response:**
    *   **Upgrade Immediately:** All users must upgrade to version `3.4.2` or later.
    *   **Rotate ALL Secrets:** This is the most critical response step. Assume all credentials in the CI/CD environment are compromised. This includes API keys, tokens, passwords, and SSH keys. This must be done comprehensively.
    *   **Audit for Compromise:** Review logs for any signs of malicious activity dating back to the time the compromised version was installed.

## Mitigation

*   **Dependency Pinning and Verification:** Pin software dependencies to specific, known-good versions. Use checksums or signatures to verify the integrity of downloaded packages before they are used. This would have prevented the malicious version from being automatically pulled.
*   **Least-Privilege for CI/CD:** Grant CI/CD systems only the minimum permissions they need to do their job. Use short-lived credentials where possible (e.g., via OIDC with cloud providers) instead of storing long-lived static secrets in the environment.
*   **Secret Management:** Store secrets in a dedicated vault (e.g., HashiCorp Vault, AWS Secrets Manager) rather than in environment variables, which are easily scraped.
*   **Egress Filtering:** Implement strict network egress filtering on build servers to control where they can send traffic. By default, deny all outbound traffic and only allow connections to known, required services. This would have blocked the DoH exfiltration.

**Tags:** supply chain attack, ci/cd, devsecops, open source, credential theft, github

## Sources
- [CodeStream CI/CD tool hit by supply chain attack, malicious version steals dev secrets](https://www.theregister.com/2026/07/01/codestream_cicd_supply_chain_attack/) — The Register (2026-07-01)
- [Popular CI/CD utility CodeStream compromised in a supply-chain attack](https://securityaffairs.co/wordpress/158394/malware/codestream-supply-chain-attack.html) — Security Affairs (2026-07-01)

---
Source: https://cyber.netsecops.io/articles/supply-chain-attack-malicious-code-injected-into-codestream-cicd-utility/
