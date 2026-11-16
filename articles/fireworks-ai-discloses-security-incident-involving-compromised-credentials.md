# Fireworks AI Discloses Breach of Customer Environment Variables

**Severity:** medium | **Category:** Data Breach,Cloud Security,Security Operations | **Updated:** 2026-10-10 | **Reading time:** 5 min

AI development platform Fireworks AI has disclosed a security incident where an attacker used compromised internal credentials to access customer secrets. The unauthorized party gained access to environment variables, including API keys, for a limited number of accounts. Fireworks AI detected the activity on October 6, initiated containment, and has since revoked affected API keys and tokens. The company, which operates on a Zero Data Retention (ZDR) model, stated that customer models, datasets, and inference traffic were not accessed.

## Executive Summary
**[Fireworks AI](https://fireworks.ai/)**, a platform for developers using large language models (LLMs), has reported a security incident involving the compromise of internal company credentials. An unauthorized third party leveraged this access to view environment variables for a limited number of customer accounts. These variables contained sensitive secrets, including customer API keys for third-party services. The company detected the intrusion on October 6, 2026, began notifying affected customers on October 7, and has since taken steps to revoke compromised keys and rotate internal credentials. According to Fireworks AI, its investigation has found no evidence that customer models, data, or LLM prompts and outputs were accessed.

## Threat Overview
The incident highlights a classic cloud security risk: the improper handling and exposure of secrets. The attacker, having obtained internal Fireworks AI credentials, was able to access a system that stored or had access to environment variables for customer evaluation jobs. This gave them a direct line to the secrets that customers had configured for use within the Fireworks platform.

Fireworks AI's response was swift upon detection. They initiated containment on the same day (October 6), began notifying the specific customers impacted the next day, and worked with an external cybersecurity firm to investigate. Subsequent actions included rotating all internal employee API keys and revoking user API keys and service-account tokens that were identified as potentially exposed.

## Technical Analysis
The core of this incident is a failure in credential and secrets management. The attacker's initial vector for obtaining the internal credentials was not disclosed, but once obtained, they targeted a high-value resource: the environment variables used by customer workloads.

### MITRE ATT&CK Techniques
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The attacker used legitimate but compromised internal Fireworks AI credentials to access the system. The initial vector for this compromise is unknown.
- **[`T1552.005 - Cloud Instance Metadata API`](https://attack.mitre.org/techniques/T1552/005/):** (Assessed) A common way to access environment variables and secrets in cloud environments is by querying the instance metadata service. The attacker may have used their access to query this service from a compromised host.
- **[`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/):** The ultimate goal and result of the attack was the theft of customer API keys and other secrets stored as environment variables.
- **[`T1098.004 - SSH Authorized Keys`](https://attack.mitre.org/techniques/T1098/004/):** (Assessed) The attacker may have used their initial access to plant SSH keys or other persistence mechanisms, although this was not specified in the report.

## Impact Assessment
For the affected Fireworks AI customers, the primary impact is the exposure of their third-party credentials. If an API key for a service like OpenAI, AWS, or a database was exposed, the attacker could potentially use that key to access the customer's resources on that third-party platform, leading to data breaches or financial loss. Fireworks AI's quick notification was crucial in allowing customers to rotate these keys. The company's "Zero Data Retention" (ZDR) policy was a significant mitigating factor, as it meant that sensitive LLM prompts and outputs were not stored and therefore could not be stolen. The incident still causes reputational damage and highlights the immense trust customers place in platform providers to secure their secrets.

## IOCs — Directly from Articles
No specific IOCs were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect similar incidents in a cloud platform environment, security teams should monitor for:

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `api_endpoint` | `GetSecretValue` or `GetParameters` | Anomalous or excessive calls to secrets management services (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault). | Cloud audit logs (e.g., CloudTrail) | high |
| `log_source` | `Instance Metadata Service Logs` | Any access to the instance metadata service from unexpected processes or users on a host. | EDR logs, host-based logs | medium |
| `user_account_pattern` | `Internal credentials used from external IP` | An internal service account or employee credential being used from an IP address outside of the corporate VPN or known IP ranges. | IAM logs, SIEM | high |
| `command_line_pattern` | `printenv` or `env` | Attackers often use these commands to list environment variables after gaining shell access. | EDR logs, shell history | medium |

## Detection & Response
- **Secrets Detection:** Continuously scan code repositories and running environments for hardcoded secrets. Any discovered secrets should be immediately revoked and replaced with a reference to a secrets manager.
- **Audit Log Analysis:** Ingest and analyze cloud audit logs (like AWS CloudTrail) to monitor all access to secrets management services. Alert on any unusual patterns, such as a single user accessing a large number of different secrets. This is an application of **[D3FEND Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)**.
- **Credential Hygiene:** Enforce strict controls on internal credentials, including mandatory MFA, short-lived sessions, and regular rotation.

## Mitigation
- **Secrets Management as a Service:** Avoid storing secrets in environment variables directly. Instead, use a dedicated secrets management service like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault. Applications should be granted IAM roles that allow them to retrieve secrets at runtime. This prevents secrets from being exposed in plaintext in environment configurations. This is a form of **[D3FEND Credential Hardening](https://d3fend.mitre.org/technique/d3f:CredentialHardening)**.
- **Least Privilege for Workloads:** The service or process that runs customer evaluation jobs should have narrowly scoped IAM permissions. It should only be able to access the specific secrets required for that single job, not a wide range of customer secrets. This limits the blast radius if the service is compromised.
- **Zero Trust Network Access (ZTNA):** Internal systems should not be trusted by default. Access to sensitive internal services that manage customer data or secrets should require strong authentication and authorization for every request, regardless of network location.
- **Proactive Key Rotation:** For affected customers, the primary mitigation is to immediately rotate any credentials that were stored as environment variables on the Fireworks AI platform. It is critical to assume they have been compromised.

**Tags:** API Keys, Secrets Management, Cloud Security, Data Breach, AI

## Sources
- [Fireworks October 2026 security incident](https://fireworks.ai/security/bulletins/october-2026-security-incident) — Fireworks AI (2026-10-10)
- [Security Bulletins](https://fireworks.ai/security/bulletins) — Fireworks AI (2026-10-09)

---
Source: https://cyber.netsecops.io/articles/fireworks-ai-discloses-security-incident-involving-compromised-credentials/
