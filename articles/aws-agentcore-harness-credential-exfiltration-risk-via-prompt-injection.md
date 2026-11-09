# AWS AgentCore Default Configs Risk Credential Exfiltration via Prompt Injection

**Severity:** high | **Category:** Cloud Security,Threat Intelligence,Vulnerability | **Updated:** 2026-09-18 | **Reading time:** 16 min

Unit 42 researchers have uncovered a significant security issue in the default configuration of AWS AgentCore Harness, a managed runtime for AI agents. The vulnerability allows an attacker to use prompt injection to manipulate the agent into executing arbitrary commands through its built-in 'shell' tool. This tool, enabled by default with root privileges, operates in the same memory space where credentials from AgentCore Identity are handled in plaintext. Consequently, a successful prompt injection attack can lead to the exfiltration of sensitive credentials, bypassing IAM controls and encryption-at-rest. AWS has reviewed the finding and stated that securing against this is a customer responsibility under the shared responsibility model, advising users to scope allowed tools and use egress filtering.

## Executive Summary

**[Unit 42](https://unit42.paloaltonetworks.com/)** researchers have identified a critical security weakness in the default configuration of **[Amazon Web Services](https://aws.amazon.com/)**' **[AWS AgentCore Harness](https://aws.amazon.com/)**. The issue stems from the harness's built-in `shell` tool, which is enabled by default with root privileges. An attacker can use prompt injection techniques to coerce an AI agent into executing arbitrary commands, allowing for the exfiltration of plaintext credentials managed by **[AgentCore Identity](https://aws.amazon.com/)**. **[AWS](https://aws.amazon.com/)** reviewed the finding and classified it as informative, placing the responsibility on customers to secure their agent environments. The primary mitigations involve explicitly restricting agent tools using the `allowedTools` parameter and implementing strict network egress filtering. This finding highlights the emerging security risks associated with the default configurations of powerful AI agent frameworks.

---

## Vulnerability Details

The vulnerability is not a traditional code flaw but a dangerous default configuration that creates an insecure-by-default state. The **[AWS AgentCore Harness](https://aws.amazon.com/)** is designed to simplify AI agent deployment by managing the underlying infrastructure, including tools for the agent to interact with its environment.

By default, the harness includes two powerful built-in tools: `shell` and `file_operations`. The `shell` tool can execute arbitrary `bash` commands within the agent's runtime environment. Unit 42's research found that this tool executes with `root` privileges.

The core of the problem lies in the intersection of three components:

1.  **Prompt Injection:** An attacker can craft input that tricks the Large Language Model (LLM) powering the agent into executing a malicious command instead of its intended task.
2.  **Default `shell` Tool:** The presence of a root-privileged `shell` tool, available in every session unless explicitly disabled, provides the mechanism for the attacker's command to be executed.
3.  **Shared Memory Space:** The `shell` tool operates within the same memory context where **[AgentCore Identity](https://aws.amazon.com/)** decrypts and handles credentials in plaintext for runtime use. This gives the `shell` tool direct access to sensitive information like API keys and other secrets.

An attacker can therefore construct a prompt that instructs the agent to use the `shell` tool to read these plaintext credentials from memory or environment variables and then exfiltrate them over the network. According to Unit 42, **[AWS](https://aws.amazon.com/)**'s response emphasized that customers are responsible for managing this risk through controls like scoping the `allowedTools` parameter and using network egress filtering.

---

## Affected Systems

The vulnerability affects any deployment of **[AWS AgentCore Harness](https://aws.amazon.com/)** that relies on the default configuration where the `allowedTools` parameter is not explicitly set to restrict access to the built-in `shell` and `file_operations` tools. Any user or organization building AI agents on this platform without applying the principle of least privilege to the agent's toolset is potentially at risk.

---

## Exploitation Status

The report from **[Unit 42](https://unit42.paloaltonetworks.com/)** is based on their own research and proof-of-concept. There is no mention of this specific technique being exploited in the wild at the time of publication. However, prompt injection is a widely known attack vector against LLM-based applications, and the tools to carry out such an attack are readily available. The low complexity and high impact make this a significant risk for unprepared organizations.

---

## Impact Assessment

The potential impact of this vulnerability is severe. Successful exploitation could lead to the complete compromise of the credentials managed by **[AgentCore Identity](https://aws.amazon.com/)**. An attacker gaining these credentials could:

*   Access and exfiltrate sensitive data from connected **[AWS](https://aws.amazon.com/)** services (e.g., S3 buckets, databases).
*   Perform lateral movement within the victim's cloud environment.
*   Modify or destroy cloud resources, causing service disruption and financial loss.
*   Bypass security controls like **[IAM](https://en.wikipedia.org/wiki/AWS_Identity_and_Access_Management)** policies and encryption, as the attack occurs at runtime when credentials are legitimately in use.

Given that the agent harness is designed for autonomous operations, a compromise could persist and cause extensive damage before being detected.

---

## IOCs — Directly from Articles

The source article does not contain specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes.

---

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to identify vulnerable configurations or potential exploitation activity:

| Type | Value | Description |
| --- | --- | --- |
| Configuration Audit | `allowedTools` parameter | Search for **[AWS AgentCore Harness](https://aws.amazon.com/)** configurations where the `allowedTools` parameter is not defined or is overly permissive. |
| Log Analysis | Agent execution logs | Monitor for invocations of the `shell` or `file_operations` tools, especially if their use is not expected. |
| Command Line Analysis | `curl`, `wget`, `nc`, `printenv` | Look for the execution of network utility commands or environment inspection commands by the agent's `shell` process. |
| Network Monitoring | Egress traffic from AgentCore hosts | Baseline normal egress traffic and alert on connections to unusual IP addresses, domains, or high-volume data transfers. |

---

## Detection & Response

Detecting and responding to the abuse of AgentCore Harness requires a multi-layered approach focusing on configuration, logging, and network monitoring.

### Detection Methods
1.  **Configuration Auditing:** Regularly scan AgentCore configurations using infrastructure-as-code (IaC) scanners or custom scripts to find instances where `allowedTools` is not properly restricted. **[Prisma Cloud](https://www.paloaltonetworks.com/prisma/cloud)** can help identify such misconfigurations.
2.  **Log Monitoring:** Ingest **[AWS](https://aws.amazon.com/)** CloudTrail and agent-specific execution logs into a SIEM. Create detection rules to alert on:
    *   Any use of the `shell` tool in production agents where it is not explicitly required.
    *   Suspicious command line arguments passed to the shell, such as those related to network connections (`curl`, `wget`) or credential discovery (`env`, `cat /proc/self/environ`).
    *   D3FEND: [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)
3.  **Network Traffic Analysis:** Deploy network monitoring tools to analyze traffic originating from the AgentCore runtime environment. Establish a baseline of normal network behavior and alert on anomalies, such as connections to unknown external endpoints or unusually large data transfers.
    *   D3FEND: [`D3-NTA - Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)

### Response Actions
If a compromise is suspected, the **[Unit 42 Incident Response team](https://www.paloaltonetworks.com/services/incident-response)** recommends immediate action:
1.  **Isolate:** Immediately disable the compromised agent and revoke its associated IAM credentials.
2.  **Investigate:** Analyze logs to determine the scope of the attacker's actions, including what commands were executed and what data may have been accessed or exfiltrated.
3.  **Remediate:** Apply the mitigation steps below to all AgentCore instances. Rotate all credentials that may have been exposed.

---

## Mitigation

Mitigation focuses on hardening the AgentCore Harness configuration by adhering to the principle of least privilege.

### Immediate Actions
1.  **Restrict Tools:** The most critical step is to explicitly define the `allowedTools` parameter for every agent session. Only grant the specific tools required for the agent's task. If the `shell` or `file_operations` tools are not needed, they should not be in the list. This is a form of application hardening.
    *   D3FEND Countermeasure: [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)

    ```json
    // Example of a secure configuration
    {
      "model": "anthropic.claude-v2",
      "instructions": "You are a helpful assistant.",
      "tools": [
        // Custom tool definitions here
      ],
      "allowedTools": ["my_custom_tool_1", "my_custom_tool_2"]
    }
    ```

2.  **Implement Egress Filtering:** Configure VPC network security groups and NACLs to strictly control outbound network traffic from the AgentCore runtime. Only allow connections to known, trusted endpoints. Deny all other outbound traffic by default.
    *   D3FEND Countermeasure: [`D3-OTF - Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)

### Strategic Improvements
*   **Credential Management:** Whenever possible, use IAM roles with temporary credentials that have narrowly scoped permissions, reducing the impact of a potential credential leak.
*   **Agent Design:** Design agents to be less reliant on broad, powerful tools like a general-purpose shell. Instead, create more granular, purpose-built tools with built-in validation and safety checks.

**Tags:** AWS, AgentCore, AI Security, Cloud Security, Prompt Injection, Credential Exfiltration, Threat Research, Unit 42

## Sources
- [A Vault with a Heap-View: The Uncomfortable Space Between AgentCore Harness and Identity](https://unit42.paloaltonetworks.com/securing-aws-agentcore-harness-credentials/) — Unit 42 (2026-09-18)

---
Source: https://cyber.netsecops.io/articles/aws-agentcore-harness-credential-exfiltration-risk-via-prompt-injection/
