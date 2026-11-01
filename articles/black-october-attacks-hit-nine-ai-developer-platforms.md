# 'Black October' Attacks Steal API Keys from Nine AI Dev Platforms

**Severity:** high | **Category:** Cyberattack,Cloud Security,Data Breach | **Updated:** 2026-11-01 | **Reading time:** 5 min

A coordinated wave of attacks dubbed "Black October" has compromised at least nine AI developer platforms, including Northflank, Railway, and Lightning AI. Security researchers at Wiz, who identified the campaign, report that attackers targeted environment variables to steal API keys and other secrets. This technique, termed "LLMJacking," allows threat actors to hijack expensive AI model services for their own use, leading to significant fraudulent charges for victims. Northflank confirmed the breach after being alerted by Wiz, noting that multiple customers had reported unauthorized use of their AI API keys. The campaign highlights a critical credential crisis in AI infrastructure, with some attacks employing "agent swarm" tactics and resulting in at least one platform, Zeabur, shutting down permanently.

## Executive Summary

In a widespread campaign dubbed "Black October," security researchers at **[Wiz](https://www.wiz.io)** have identified a series of targeted attacks against at least nine AI developer platforms. The list of victims includes **Northflank**, **Railway**, **OpenCode**, **Warp**, **Lightning AI**, **Fireworks AI**, **Andromeda**, **Zeabur**, and **CommandCode**. The attackers' primary objective was to steal API keys and other credentials stored as environment variables on these platforms. This stolen access was then used to make unauthorized calls to expensive AI model services, a technique Wiz has named "LLMJacking." The financial impact is substantial, with over $100,000 in fraudulent AI service usage documented. The campaign was sophisticated, with some victims reporting "agent swarm" attacks, and led to severe consequences, including the complete shutdown of the Zeabur platform.

## Threat Overview

The attacks, which took place throughout October 2026, represent a systematic assault on the AI development supply chain. Threat actors focused on a common vulnerability point: the storage of sensitive credentials, particularly AI service API keys, within the environment variables of cloud-based development platforms. On October 30, 2026, Northflank publicly disclosed a breach after being alerted by Wiz, confirming that attackers had accessed and abused customer AI API keys. The coordinated nature of the attacks, while not definitively linked to a single threat actor, suggests a shared methodology targeting a specific weakness in the AI ecosystem. The term "LLMJacking" has been coined to describe this new threat pattern of hijacking resources for Large Language Model (LLM) computation, similar to traditional cryptojacking.

## Technical Analysis

The core of the attack involved gaining access to the developer platforms and reading environment variables where users stored their credentials for services like OpenAI, Anthropic, or others. The method of initial access to the platforms was not detailed but could range from exploiting platform vulnerabilities to using stolen developer credentials.

Once the API keys were stolen, attackers used them to run their own AI workloads, billing the cost to the legitimate key owners. Several victims, including Fireworks, OpenCode, and Warp, reported signs of an "agent swarm" attack, which may imply the use of multiple autonomous AI agents to carry out tasks, possibly for model training, inference, or further attacks. Other victims noted the activity seemed related to "distillation," a process for training smaller, more efficient AI models by learning from a larger one.

### MITRE ATT&CK Techniques

- [`T1552.005 - Cloud Instance Metadata API`](https://attack.mitre.org/techniques/T1552/005/): While not explicitly stated, accessing environment variables in cloud platforms is analogous to querying metadata services for credentials.
- [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/): The primary goal was to steal API keys, which are a form of application access token.
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): The stolen API keys represent valid accounts for AI services, which the attackers then abused.
- [`T1496 - Resource Hijacking`](https://attack.mitre.org/techniques/T1496/): This is the essence of "LLMJacking"—hijacking computational resources (in this case, expensive AI services) for the attacker's benefit.

## Impact Assessment

The "Black October" campaign has had a severe impact on the victims and the broader AI development community. Direct financial losses exceeded $100,000 in fraudulent charges from abused API keys. For the affected platforms, the reputational damage is significant, and for at least one, **Zeabur**, the attack was fatal, forcing it to cease operations. The incidents expose a systemic "credential crisis" in AI infrastructure, where the convenience of storing secrets in environment variables creates a single point of failure. This will likely force a re-evaluation of security best practices for MLOps and AI development, pushing for more secure secret management solutions like dedicated vaults.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were mentioned in the source articles.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to detect LLMJacking activity:

| Type | Value | Description |
|---|---|---|
| `api_endpoint` | `/v1/chat/completions` | Monitor for unusual usage patterns or sources for common AI API endpoints. |
| `log_source` | `Cloud provider billing alerts` | Set up aggressive billing alerts for AI services to detect sudden, unexpected cost spikes. |
| `log_source` | `Cloud Trail / Audit Logs` | Look for anomalous enumeration or reading of environment variables or secrets manager services. |
| `user_account_pattern` | `newly created service accounts` | Attackers may create new service accounts with stolen credentials to run their workloads. Monitor for accounts with no clear business purpose. |

## Detection & Response

1.  **Monitor AI Service Usage:** Implement robust monitoring and alerting on the usage of AI service API keys. Look for anomalies in the volume of requests, geographic source, or types of models being accessed. D3FEND's [`Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis) is key here.
2.  **Billing Alerts:** Configure immediate alerts for cost thresholds on all cloud services, especially powerful AI models. A sudden spike in cost is often the first indicator of a compromised key.
3.  **Credential Scanning:** Regularly scan code repositories and development environments for hardcoded credentials and secrets stored in insecure locations like environment variables.
4.  **Audit Log Analysis:** Ingest and analyze audit logs from developer platforms and cloud providers. Search for unauthorized access to or enumeration of secrets and environment variables. This aligns with D3FEND's [`System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis).

## Mitigation

1.  **Secure Secret Management:** The most critical mitigation is to stop storing secrets in environment variables. Use dedicated secret management tools (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) that provide features like temporary credentials, fine-grained access control, and detailed audit trails. This is a form of D3FEND's [`Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **API Key Scoping and Rotation:** Restrict API keys to specific IP addresses, models, or usage quotas where possible. Implement automated key rotation policies to limit the window of opportunity for stolen keys.
3.  **Principle of Least Privilege:** Ensure that processes and services only have access to the specific secrets they absolutely require. Avoid using broadly-scoped credentials.
4.  **Vendor Security Assessment:** When using third-party developer platforms, carefully evaluate their security posture and how they handle customer secrets.

**Tags:** Black October, LLMJacking, AI, Cloud Security, API Security, Data Breach, Wiz, Northflank

## Sources
- [Northflank security breach leads to abuse of customers' AI API keys](https://www.bleepingcomputer.com/news/security/northflank-security-breach-leads-to-abuse-of-customers-ai-api-keys/) — BleepingComputer (2026-10-31)
- [Black October for AI developer platforms](https://www.wiz.io/blog/black-october-for-ai-developer-platforms) — Wiz (2026-10-31)
- [Black October LLMJacking Wave Exposes AI Infrastructure's Credential Crisis](https://futurumgroup.com/insights/black-october-llmjacking-wave-exposes-ai-infrastructures-credential-crisis/) — The Futurum Group (2026-10-31)

---
Source: https://cyber.netsecops.io/articles/black-october-attacks-hit-nine-ai-developer-platforms/
