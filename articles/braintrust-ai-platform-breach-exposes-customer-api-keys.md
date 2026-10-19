# Braintrust AI Platform Breach Exposes Customer API Keys in AWS Account

**Severity:** high | **Category:** Cloud Security,Data Breach,Supply Chain Attack | **Updated:** 2026-05-11

Braintrust, a platform for evaluating AI models, suffered a security breach on May 4, 2026, after detecting unauthorized access to an Amazon Web Services (AWS) account. The compromised account stored sensitive customer API keys, creating a significant supply chain risk. Braintrust immediately notified customers, advising them to rotate all keys stored on the platform. While only one customer has been confirmed as directly affected, three others are investigating suspicious activity, highlighting the critical risk of third-party platforms holding secrets for the burgeoning AI ecosystem.

## Executive Summary
**[Braintrust](https://www.braintrustdata.com/)**, a platform for evaluating and monitoring artificial intelligence models, has disclosed a security incident involving unauthorized access to one of its **[Amazon Web Services (AWS)](https://aws.amazon.com/)** accounts. The breach, detected on May 4, 2026, exposed sensitive API keys belonging to its customers. These keys are used to connect to various cloud-based AI services, making this a significant **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** risk for the AI development community. In response, Braintrust has urged all customers to immediately rotate any API keys stored within its platform. The incident underscores the critical importance of secure secret management and vendor risk assessment in the rapidly expanding AI industry.

## Threat Overview
On May 4, 2026, Braintrust's security team identified suspicious activity within one of its AWS cloud environments. The investigation revealed that an unauthorized actor had gained access to an account that contained customer API keys. These keys are essentially passwords that grant programmatic access to third-party AI services (like OpenAI, Anthropic, etc.) and cloud platforms.

Upon discovery, Braintrust initiated its incident response protocol, which included:
- Locking down the compromised AWS account.
- Rotating all internal credentials and secrets.
- Conducting a full audit of access across related systems.

Customer notifications began on May 5, with the strong recommendation to revoke and regenerate all API keys that had been entrusted to the Braintrust platform. While Braintrust reports that only one customer was directly affected by the unauthorized access, three other customers have reported suspicious spikes in their AI service usage, which are now under investigation.

## Technical Analysis
While the initial access vector was not disclosed, the nature of the breach strongly points to the use of compromised credentials. This aligns with the MITRE ATT&CK technique [`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/). In this scenario, an attacker obtains legitimate credentials for a cloud account (through phishing, infostealers, or other means) and uses them to access the environment, appearing as a legitimate user and bypassing perimeter defenses.

Once inside the AWS account, the attacker likely performed discovery actions to locate and exfiltrate the stored API keys. The goal would be to abuse these keys to perform actions on behalf of Braintrust's customers, such as:
- Incurring large costs by making expensive AI model API calls (**Financial Theft**).
- Stealing proprietary data or models from the customers' AI service accounts (**Data Theft**).
- Using the compromised access to pivot into the customers' own cloud environments.

The suspicious usage spikes reported by other customers suggest attackers may have already begun to abuse the stolen keys.

## Impact Assessment
The impact of this breach extends beyond Braintrust to its entire customer base:
- **Supply Chain Risk:** Braintrust's customers are now at risk of having their own AI service accounts compromised using the stolen keys. This could lead to financial loss, data breaches, and operational disruption for them.
- **Financial Loss:** The direct abuse of AI API keys can be extremely costly. Attackers can rack up huge bills in a short amount of time, as seen in the suspicious usage spikes.
- **Data Exfiltration:** Attackers could use the keys to access and steal sensitive data that customers were processing with their AI models.
- **Erosion of Trust:** The incident damages trust in third-party AI development platforms, particularly those that require access to sensitive secrets like API keys.

## IOCs — Directly from Articles
No specific technical Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints
Customers of Braintrust and similar platforms should proactively hunt for signs of compromise:
- **Cloud Cost Anomalies:** Monitor cloud and AI service provider billing dashboards for any sudden, unexplained spikes in usage or cost. This is often the first indicator of API key abuse.
- **API Log Auditing:** Review API access logs from AI providers (e.g., OpenAI, Anthropic, AWS Bedrock) for requests originating from unexpected IP addresses or geographic locations.
- **Unusual Model Usage:** Look for API calls to models that your organization does not typically use, or a high volume of calls at unusual times (e.g., overnight, weekends).
- **CloudTrail Log Analysis:** In AWS, monitor CloudTrail logs for suspicious activity related to secrets management services (e.g., Secrets Manager, Parameter Store) or IAM role usage.

## Detection & Response
- **API Key Rotation:** The primary and most urgent response action is to revoke all API keys that were stored in Braintrust and generate new ones. This immediately invalidates the stolen credentials.
- **Usage Monitoring (D3FEND: [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)):** Implement real-time monitoring and alerting on API usage. Set thresholds for cost and call volume, and trigger alerts for any significant deviation from the established baseline.
- **Credential Scanning:** Use tools to scan code repositories and other assets for hardcoded API keys to ensure they are not inadvertently exposed.

## Mitigation
- **Secrets Management:** Avoid storing raw API keys in third-party platforms whenever possible. Use dedicated secrets management solutions (e.g., HashiCorp Vault, AWS Secrets Manager) that provide temporary, scoped credentials and robust audit trails.
- **Least Privilege Principle:** When creating API keys, grant them the minimum permissions necessary to perform their function. For example, a key for a specific AI model should not have access to all models or administrative functions.
- **IP Allowlisting:** If the service provider supports it, restrict API key usage to a specific list of trusted IP addresses, such as your application's egress IPs.
- **Vendor Security Assessment:** Thoroughly vet the security practices of any third-party vendor before entrusting them with sensitive secrets or data. Inquire specifically about how they store, encrypt, and audit access to customer credentials.

**Tags:** AI, API Keys, AWS, Braintrust, Cloud Security, Data Breach, Supply Chain Attack

## Sources
- [Braintrust AWS Data Breach Prompts Urgent API Key Rotation for AI Platform Customers](https://rescana.com/blogs/braintrust-aws-data-breach-prompts-urgent-api-key-rotation-for-ai-platform-customers) (2026-05-10)
- [Braintrust security incident raises concerns over AI supply chain risks](https://securityaffairs.co/wordpress/162981/data-breach/braintrust-security-incident-ai-supply-chain.html) (2026-05-09)
- [JDownloader site hacked to replace installers with Python RAT malware](https://www.bleepingcomputer.com/news/security/jdownloader-site-hacked-to-replace-installers-with-python-rat-malware/) (2026-05-09)
- [Rapid7 links Chaos ransomware campaign to Iranian state-sponsored MuddyWater espionage operation](https://www.industrialcyber.co/management-strategy/rapid7-links-chaos-ransomware-campaign-to-iranian-state-sponsored-muddywater-espionage-operation/) (2026-05-10)

---
Source: https://cyber.netsecops.io/articles/braintrust-ai-platform-breach-exposes-customer-api-keys/
