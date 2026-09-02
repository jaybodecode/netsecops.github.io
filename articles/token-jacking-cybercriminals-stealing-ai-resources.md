# Attackers Hijack AI API Keys to Fuel Gray Market "Transfer Stations"

**Severity:** high | **Category:** Cloud Security,Threat Intelligence,Supply Chain Attack | **Updated:** 2026-09-01 | **Reading time:** 8 min

A new threat dubbed "token jacking" has emerged where attackers steal AI API keys from developers to power illicit "transfer stations." These gray market services resell access to premium AI models at a fraction of the cost, often fueled by stolen credentials. Attackers are using methods like information stealers, phishing, and malicious npm packages to harvest API tokens. The financial impact can be severe, as attackers can consume vast amounts of AI computing resources before the theft is detected, leading to massive bills for the victim organizations. This highlights the urgent need for robust security around AI development environments.

## Executive Summary

**[Unit 42](https://unit42.paloaltonetworks.com/)** has identified an emerging threat trend named **"token jacking,"** where cybercriminals steal API keys (tokens) for artificial intelligence (AI) services. These stolen tokens are used to fuel a gray market of "transfer stations," which resell access to premium AI models at discounted rates. Attackers employ various methods, including malicious **[npm](https://en.wikipedia.org/wiki/Npm_(software))** packages, phishing campaigns, and information stealers, to harvest developer credentials and API keys. The consequences for victim organizations can be financially catastrophic, as attackers can consume vast, unmonitored AI computing resources, leading to exorbitant and unexpected bills. This threat highlights a critical security gap in the rapidly expanding AI development ecosystem, demanding immediate attention to secrets management, usage monitoring, and supply chain security.

---

## Threat Overview

Token jacking is a modern variant of resource hijacking, specifically targeting the burgeoning AI industry. The high cost and regional restrictions associated with frontier AI models have created a lucrative opportunity for criminals. They establish illicit services, referred to as "transfer stations," which act as proxies between end-users and official AI providers like OpenAI or Anthropic.

These transfer stations, often advertised on Chinese-language marketplaces like **[Taobao](https://www.taobao.com/)**, offer access to multiple AI services using anonymously purchased credits. To be profitable, these operators cannot purchase tokens at retail value; instead, they rely on a steady supply of stolen API keys. Once an attacker compromises a developer's API key, they gain potentially unlimited access to that developer's account, which they can then use for their own purposes or resell through the transfer station network. The cyclical billing models and default unlimited usage policies of many AI providers mean that a breach can go unnoticed for weeks, allowing attackers to accumulate massive charges against the victim's account.

---

## Technical Analysis

Attackers employ a multi-pronged approach to acquire AI API tokens. The methods are not novel in themselves but are newly applied to the AI development lifecycle.

### Attack Vectors
1.  **Credential Harvesting:** Attackers use traditional methods like phishing campaigns targeting developers or deploy information-stealing malware to harvest credentials from developer machines. These compromised developer accounts, often sold by access brokers on dark web markets, can be used to generate new API keys.

2.  **Code Repository Mining:** A common and direct method involves scanning public and private code repositories (e.g., GitHub, GitLab) for hardcoded API keys. Developers who improperly secure secrets in configuration files, scripts, or environment files (`.env`) are prime targets.

3.  **Software Supply Chain Attacks:** A more insidious vector involves poisoning open-source packages, particularly on registries like **npm**. Attackers publish malicious packages that unsuspecting developers install. These packages can contain code to steal credentials, environment variables, and API tokens from the developer's machine and any continuous integration/continuous deployment (CI/CD) environments. The report highlights campaigns like **Shai-Hulud** and **Miasma** as examples of large-scale credential theft that could fuel token jacking operations.

### Transfer Station Operation
Transfer stations are typically built on open-source proxy platforms like `new-api` or `one-api`. These platforms are designed to manage multiple AI provider APIs, handle user authentication, and route requests. The operators of these stations simply need to populate the platform with a pool of stolen, legitimate API keys to begin reselling access.

### MITRE ATT&CK Mapping

The tactics, techniques, and procedures (TTPs) associated with token jacking include:

*   [`T1496 - Resource Hijacking`](https://attack.mitre.org/techniques/T1496/): The core objective of the attack is to use stolen AI resources.
*   [`T1134 - Access Token Manipulation`](https://attack.mitre.org/techniques/T1134/): The theft and use of API tokens is a form of access token manipulation.
*   [`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/): Specifically, mining hardcoded keys from code repositories and configuration files.
*   [`T1598 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/): Targeting developers to steal account credentials.
*   [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/): Using information stealers to harvest saved credentials and tokens.
*   [`T1199 - Trusted Relationship`](https://attack.mitre.org/techniques/T1199/): Exploiting the trust developers place in open-source registries like npm to deliver malicious code.
*   [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Using the stolen API keys to authenticate to AI services legitimately.

---

## Impact Assessment

The primary impact of token jacking is financial. Organizations can face bills amounting to tens or even hundreds of thousands of dollars from a single incident. Because many AI platforms bill based on token consumption without hard limits, the financial exposure is significant and immediate. 

Beyond direct financial loss, there are secondary impacts:
*   **Intellectual Property Risk:** If attackers gain access to a developer's environment, they may also be able to access proprietary code, data, and models.
*   **Reputational Damage:** A public breach can damage a company's reputation, particularly if it affects customer-facing services.
*   **Geopolitical Implications:** The report notes that nation-state actors could leverage these cheap, anonymous transfer stations to train and refine their own AI models, effectively subsidizing their AI development with stolen commercial resources.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source article.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns that could indicate token jacking activity:

| Type | Value | Description |
|---|---|---|
| Log Source | Cloud provider audit logs (AWS CloudTrail, Azure Activity Log, etc.) | Monitor for API key creation, deletion, or usage from anomalous IP addresses, user agents, or geolocations. |
| String Pattern | `sk-[a-zA-Z0-9]{48}` | A common regex pattern for OpenAI API keys. Scan code repositories and file systems for this pattern. |
| Command Line Pattern | `npm install [package-name]` | Audit `npm install` commands in CI/CD logs and developer endpoints for packages that are typosquatted, new, or have low download counts. |
| Network Traffic Pattern | Egress traffic from developer environments to unknown endpoints | Monitor for connections from build servers or developer machines to IPs outside of expected ranges, especially those associated with anonymous proxies or cloud providers not used by the organization. |
| File Path | `~/.npmrc`, `~/.docker/config.json`, `.env` | Monitor for unauthorized access or modification of common credential and configuration files in developer environments. |

---

## Detection & Response

Detecting token jacking requires a focus on credential hygiene and anomalous activity monitoring.

1.  **API Usage Monitoring:** Implement robust monitoring of AI service usage. Establish baselines for normal token consumption and alert on significant deviations, off-hours activity, or usage from unexpected geographic locations. Use the billing and monitoring tools provided by AI vendors.

2.  **Secret Scanning:** Continuously scan all code repositories, including private and public ones, for hardcoded secrets like API keys. Tools like `git-secrets` or commercial SaaS platforms can automate this process.

3.  **Honeypot Tokens:** Consider placing decoy API keys (honeypot tokens) in public code repositories. These tokens should have no permissions but should trigger high-priority alerts if used, providing an early warning of scanning and theft activity.

4.  **Endpoint and Network Detection:** Use Endpoint Detection and Response (EDR) to monitor developer workstations for signs of information stealers. Analyze network traffic from developer environments for connections to suspicious domains or large data transfers inconsistent with normal development work. This can be achieved through **[D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)**.

---

## Mitigation

Preventing token jacking involves a combination of technical controls and developer best practices.

1.  **Secrets Management:** The most critical mitigation is to never hardcode API keys or other credentials in source code. Use a dedicated secrets management solution like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault to store and dynamically inject secrets at runtime.

2.  **Least Privilege Access:** Configure API keys with the minimum required permissions. If a key only needs to access one specific model, restrict it to that model. Avoid using master keys with broad permissions in applications.

3.  **Billing and Usage Controls:** Set hard spending limits and billing alerts on all AI service accounts. This acts as a crucial safety net to cap the financial damage if a key is compromised. This is a form of **[D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.

4.  **IP Allowlisting:** Whenever possible, restrict API key usage to a specific set of trusted IP addresses, such as corporate office or production server IPs. This can prevent a stolen key from being used by an attacker in a different location.

5.  **Software Supply Chain Security:** Vet all third-party dependencies. Use tools like `npm audit` and commercial software composition analysis (SCA) tools to identify vulnerabilities or malicious code in open-source packages before they are integrated into projects.

**Tags:** AI Security, API Security, Cloud Security, Credentials Theft, Resource Hijacking, Supply Chain Attack, Token Jacking, npm

## Sources
- [Token Jacking: Cybercriminals Could Be Stealing Your AI Resources](https://unit42.paloaltonetworks.com/ai-token-jacking/) (2026-08-05)

---
Source: https://cyber.netsecops.io/articles/token-jacking-cybercriminals-stealing-ai-resources/
