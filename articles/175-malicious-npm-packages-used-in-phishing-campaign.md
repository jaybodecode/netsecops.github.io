# 175 Malicious NPM Packages Target Developers in Widespread Phishing Attack

**Severity:** high | **Category:** Supply Chain Attack,Malware,Phishing | **Updated:** 2025-10-11 | **Reading time:** 5 min

A significant software supply chain attack has been identified on the npm open-source repository, where researchers discovered 175 malicious packages that were downloaded approximately 26,000 times. These packages were trojanized to execute credential phishing attacks against developers, aiming to steal logins and API keys. The campaign, which primarily targeted the technology and energy sectors, often used typosquatting techniques to mimic legitimate packages. This incident highlights the critical need for organizations to implement stringent dependency vetting and runtime security monitoring to defend against attacks targeting the software development lifecycle.

## Executive Summary
Security researchers have uncovered a large-scale credential phishing campaign targeting developers through the **[npm](https://www.npmjs.com/)** open-source package repository. The campaign involved 175 malicious packages, which were downloaded a total of 26,000 times. These packages were designed to steal developer credentials and API keys upon installation, posing a severe **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** risk. The attackers used techniques like typosquatting to trick developers into installing the malicious code. The primary targets were organizations in the technology and energy sectors. This incident underscores the vulnerability of the open-source ecosystem and the need for robust security measures in the software development lifecycle (SDLC).

---

## Threat Overview
The attack leveraged the inherent trust developers place in open-source repositories. Threat actors published 175 packages to npm with names closely resembling popular, legitimate packages (a technique known as typosquatting). These packages contained malicious scripts, often within `post-install` hooks, that would execute automatically after a developer installed them using `npm install`. The scripts were designed to phish for sensitive information, such as developer login credentials for services like GitHub or AWS, private API keys, and other secrets stored in the development environment. Once stolen, these credentials could be used for further malicious activities, including injecting malicious code into private repositories, accessing sensitive corporate data, or moving laterally within the victim's network.

---

## Technical Analysis
The core of this attack is the abuse of package manager automation and social engineering. The malicious code was typically obfuscated and embedded within installation scripts.

### MITRE ATT&CK Techniques
*   [`T1195.002 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/002/): The primary technique involved publishing malicious packages to a public repository to compromise developer environments.
*   [`T1059.007 - JavaScript/JScript`](https://attack.mitre.org/techniques/T1059/007/): The malicious logic was executed via JavaScript code within npm's `package.json` scripts.
*   [`T1552.006 - Stored Information`](https://attack.mitre.org/techniques/T1552/006/): The malware likely searched for credentials and API keys stored in configuration files, environment variables, or other common locations on a developer's machine.
*   [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Once harvested, the stolen credentials were exfiltrated to an attacker-controlled server.

---

## Impact Assessment
The impact of this campaign extends far beyond the initial 26,000 downloads. A single compromised developer account can serve as a gateway into an entire organization's software supply chain. Attackers could use stolen credentials to:
*   Commit malicious code to private source code repositories.
*   Publish new malicious versions of legitimate internal or public packages.
*   Access and exfiltrate sensitive intellectual property and customer data.
*   Pivot from the development environment into production systems.

This creates a cascading risk that can lead to widespread breaches, affecting both the compromised organization and its customers.

---

## Detection & Response
Detecting malicious packages requires a proactive approach to dependency management.

1.  **Dependency Auditing**: Regularly run `npm audit` and use third-party Software Composition Analysis (SCA) tools to scan for known vulnerabilities and malicious packages in project dependencies. This can be supported by **[D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis)** to inspect package contents.
2.  **Runtime Monitoring**: Implement endpoint detection and response (EDR) on developer workstations to monitor for suspicious process behavior, such as an `npm install` process making unexpected network connections or accessing sensitive files (`.env`, `.aws/credentials`).
3.  **Network Traffic Analysis**: Monitor egress traffic from development environments for connections to known malicious domains or unusual data uploads, which could indicate credential exfiltration. This aligns with **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

If a malicious package is discovered, the immediate response is to remove it from all projects, rotate all potentially compromised credentials, and perform a forensic analysis of the affected systems.

---

## Mitigation
Preventing these attacks requires a shift towards a more security-conscious development culture.

1.  **Scoped Registries**: Configure npm to use a private or scoped registry that proxies and vets packages from the public repository. This allows security teams to maintain an allowlist of approved packages.
2.  **Code Signing and Integrity Checks**: Enforce policies that require package signature verification to ensure the integrity and authenticity of dependencies. Use lockfiles (`package-lock.json`) to pin dependency versions and prevent unexpected updates.
3.  **Developer Training**: Educate developers on the risks of typosquatting and the importance of verifying package names before installation. Promote a culture of skepticism towards unfamiliar packages.
4.  **Secrets Management**: Prohibit the storing of secrets in source code or local configuration files. Use a dedicated secrets management solution like HashiCorp Vault or AWS Secrets Manager.

**Tags:** npm, open-source, dependency confusion, typosquatting, credential theft

## Sources
- [Top 5 Cybersecurity News Stories October 10, 2025](https://diesec.com/blog/top-5-cybersecurity-news-stories-october-10-2025) — DIESEC (2025-10-10)
- [Snake Keylogger Uses Weaponized Emails and PowerShell to Steal Sensitive Data](https://gbhackers.com/snake-keylogger-malware/) — GBHackers on Security (2025-10-11)

---
Source: https://cyber.netsecops.io/articles/175-malicious-npm-packages-used-in-phishing-campaign/
