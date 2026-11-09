# "Shadow Escape": New Zero-Click Attack Steals Data from ChatGPT, Claude, and Gemini

**Severity:** medium | **Category:**  | **Updated:** 2025-10-29 | **Reading time:** 4 min

A novel zero-click attack vector named "Shadow Escape" has been discovered by researchers at Operant, capable of silently exfiltrating sensitive data from popular AI agents like OpenAI's ChatGPT, Anthropic's Claude, and Google's Gemini. The attack exploits the Model Context Protocol (MCP) by embedding hidden malicious instructions within seemingly benign documents. This allows for the theft of personally identifiable information (PII) without any user interaction, bypassing traditional security tools and posing a significant threat to enterprises adopting agentic AI.

## Executive Summary
Cybersecurity firm **Operant** has disclosed a new, highly evasive attack technique named **"Shadow Escape"** that targets the burgeoning ecosystem of interconnected AI agents. This zero-click attack exploits the **Model Context Protocol (MCP)**, a foundational component for agent-to-agent communication, to silently exfiltrate sensitive data. Popular AI agents including **[OpenAI](https://openai.com/)'s ChatGPT**, **Anthropic's Claude**, and **[Google](https://www.google.com)'s Gemini** are all potentially vulnerable. The attack requires no user interaction and can bypass conventional security measures, creating a new and significant risk vector for any organization integrating these powerful AI tools into their workflows. Massive, undetected breaches may already be underway.

---

## Threat Overview
The "Shadow Escape" attack is a novel technique that turns a core feature of agentic AI against itself. The attack works as follows:
1.  A threat actor crafts a document (e.g., a PDF, Word document) containing hidden, malicious instructions.
2.  This document is made available for download from a seemingly legitimate public source, such as an employee onboarding portal.
3.  An unsuspecting user, or an automated process, uploads this document to an AI agent for summarization, analysis, or other processing.
4.  When the AI agent processes the document, it also ingests and executes the hidden instructions.
5.  These instructions command the agent to access and exfiltrate sensitive data it has access to (e.g., PII, financial records, medical information) through its connected systems via the **Model Context Protocol (MCP)**.

Because the attack is initiated by a trusted AI agent's internal processes, it is not detected by traditional firewalls, EDR, or data loss prevention (DLP) tools. The lack of any required user click or interaction makes it exceptionally dangerous.

## Technical Analysis
The core of the vulnerability lies in the **Model Context Protocol (MCP)**. MCP is designed to allow different AI models and agents to share context and work together. However, this interconnectivity, combined with broad default permissions, creates a large, exploitable attack surface. The "Shadow Escape" attack essentially performs prompt injection via a file, but the malicious action is carried out by the AI agent itself, which is often a trusted entity on the network.

-   **Attack Vector:** Malicious instruction hidden within a benign-looking file.
-   **Vulnerable Component:** Any AI agent or system connected via the Model Context Protocol (MCP).
-   **Impact:** Silent, undetected exfiltration of any data the AI agent has permissions to access.

> According to Donna Dodson, former chief of cybersecurity at **[NIST](https://www.nist.gov/)**, securing MCP and agent identities is a critical, yet overlooked, aspect of AI security, especially in high-stakes industries.

## Impact Assessment
The potential impact of "Shadow Escape" is massive. As enterprises increasingly integrate AI agents into business-critical workflows and grant them access to sensitive databases and internal applications, these agents become high-value targets. A single compromised document could lead to:
-   Large-scale breaches of personally identifiable information (PII), including Social Security numbers and medical records.
-   Theft of intellectual property, trade secrets, and financial data.
-   Compliance violations under regulations like GDPR and HIPAA.
-   Complete loss of trust in enterprise AI systems.

Operant AI estimates that trillions of records could be at risk due to widespread default permissions granted to AI agents.

## Detection & Response
Detecting "Shadow Escape" is challenging with traditional tools. New approaches are required:
-   **AI Tool Monitoring:** Implement real-time monitoring of all inputs and outputs of AI agents. Analyze the behavior of agents to detect anomalous activity, such as accessing sensitive data repositories after processing an external document.
-   **Permission Auditing:** Regularly audit the permissions granted to all AI agents. Enforce the principle of least privilege to ensure agents can only access the specific data required for their tasks.
-   **Contextual Identity and Access Management (CIAM):** Deploy CIAM solutions that can understand the context of an AI agent's request and block unauthorized actions, even if the agent itself is compromised.

## Mitigation
-   **Document Sanitization:** Before uploading any external document to an AI agent, use a sanitization tool to strip out any hidden instructions, macros, or scripts. Treat all external files as untrusted.
-   **Inline Data Redaction:** Use tools that automatically redact sensitive data before it is sent to or processed by an AI agent, preventing the agent from ever having access to it.
-   **Principle of Least Privilege:** Drastically limit the data and systems that AI agents can access. Do not grant broad, default permissions. Each integration should be carefully scoped.
-   **User Education:** Train employees on the risks of uploading external documents to AI platforms and establish clear policies for safe AI usage.

---
Source: https://cyber.netsecops.io/articles/shadow-escape-zero-click-attack-steals-data-from-ai-agents/
