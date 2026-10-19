# Critical RCE Flaws in AI Engines From Meta, NVIDIA, Microsoft Discovered

**Severity:** critical | **Category:** Vulnerability,Cloud Security,Other | **Updated:** 2025-11-16 | **Reading time:** 6 min

Security researchers have discovered critical remote code execution (RCE) vulnerabilities in widely used AI inference servers from major tech companies, including Meta, NVIDIA, and Microsoft, as well as open-source projects like vLLM. The vulnerabilities stem from the unsafe use of Python's 'pickle' module for data deserialization and exposed ZeroMQ (ZMQ) messaging endpoints. Exploitation could allow attackers to take full control of AI models and servers, posing a significant risk to enterprise AI infrastructure. Some flaws, termed 'Shadow Vulnerabilities,' remain unpatched in production environments.

## Executive Summary
Critical remote code execution (RCE) vulnerabilities have been found in popular AI inference engines, affecting frameworks developed by **[Meta](https://www.meta.com/)**, **[NVIDIA](https://www.nvidia.com/)**, **[Microsoft](https://www.microsoft.com/)**, and several open-source projects. Research from Oligo Security identified systemic weaknesses related to insecure data deserialization via Python's `pickle` module and insecurely exposed ZeroMQ (ZMQ) messaging endpoints. Successful exploitation of these flaws could allow a remote attacker to execute arbitrary code on the AI server, leading to model theft, data poisoning, or a pivot into the broader corporate network. The discovery also highlights the issue of "Shadow Vulnerabilities"—known but unpatched flaws that persist in widely used code forks, such as in Microsoft's Sarathi-Serve, creating a hidden attack surface.

---

## Vulnerability Details
The core of the vulnerabilities lies in two primary insecure-by-default development practices common in the fast-moving AI space:

1.  **Insecure Deserialization with `pickle`:** Many AI frameworks use Python's `pickle` module to serialize and deserialize data, including AI models and configurations. The `pickle` module is notoriously unsafe because it can execute arbitrary code when deserializing a maliciously crafted object. If an inference server accepts pickled data from an untrusted source, an attacker can send a malicious pickle payload to achieve RCE. This is a classic example of [`T1574 - Hijack Execution Flow`](https://attack.mitre.org/techniques/T1574/).

2.  **Exposed ZeroMQ (ZMQ) Endpoints:** ZMQ is a high-performance asynchronous messaging library used for communication between different components of the AI stack. The researchers found that many frameworks expose ZMQ endpoints to the network without any authentication (e.g., HMAC or TLS). An attacker who can connect to this endpoint can use functions like `recv_pyobj()` to send a malicious Python object (often a pickled object), again leading to RCE.

## Affected Systems
The vulnerabilities impact a wide range of popular AI/ML frameworks and servers, including:
- **Proprietary Frameworks:** From vendors like Meta, NVIDIA, and Microsoft.
- **Open-Source Projects:**
  - `vLLM`
  - `SGLang`
  - `Modular`
- **Unpatched Forks:** Microsoft's `Sarathi-Serve` is cited as an example of a project that inherited these vulnerabilities and remains unpatched, creating a "Shadow Vulnerability."

## Exploitation Status
While the source articles do not mention active in-the-wild exploitation, the public disclosure and the ease of exploitation make it highly likely that threat actors will begin targeting these systems. The vulnerabilities are straightforward to exploit for an attacker with network access to the vulnerable endpoints. Many of the core open-source projects have released patches, but the risk remains high for downstream applications and unmaintained forks.

## Impact Assessment
A successful RCE attack on an AI inference server can have devastating consequences:
- **Model Theft:** Attackers can steal proprietary, high-value AI models.
- **Data Poisoning:** Malicious actors could manipulate the model's behavior or poison the training data, compromising the integrity of AI-driven decisions.
- **Denial of Service:** Attackers could crash the AI service, disrupting business operations that rely on it.
- **Network Pivot:** The compromised server can be used as a beachhead to attack other systems within the organization's network.
- **Data Exfiltration:** Access to the server could expose sensitive data that is being processed by the AI model.

## Cyber Observables for Detection
- **Network Traffic:** Monitor for network traffic to and from AI servers on ZMQ ports (e.g., TCP/5555, 5556) that is not encrypted with TLS.
- **Log Analysis:** Look for error messages in application logs related to deserialization failures or unexpected object types, which could indicate an exploitation attempt.
- **Process Monitoring:** On AI servers, monitor for processes spawning unexpected child processes (e.g., a Python web service spawning a shell).

## Detection Methods
1.  **Code Scanning (SAST):** Use static application security testing (SAST) tools to scan Python codebases for unsafe usage of `pickle.load()` or `pickle.loads()` with data from untrusted sources. This is a form of [`File Analysis (D3-FA)`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
2.  **Network Scanning:** Scan internal and external networks for open ZMQ ports and investigate any services that do not enforce authentication.
3.  **Dependency Analysis:** Use Software Composition Analysis (SCA) tools to identify if your projects are using vulnerable versions of frameworks like `vLLM`.

## Remediation Steps
**For Developers:**
1.  **Avoid `pickle`:** Do not use `pickle` to deserialize data from untrusted or unauthenticated sources. Use safer serialization formats like JSON for data interchange.
2.  **Secure ZMQ:** Implement strong authentication mechanisms for all ZMQ communications. Use the built-in CurveZMQ or TLS to encrypt traffic and authenticate clients.

**For Organizations:**
1.  **Patch Immediately:** Update all affected AI frameworks (vLLM, SGLang, etc.) to the latest patched versions. This is a critical [`Software Update (D3-SU)`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) action.
2.  **Audit Forks:** If your organization uses forks of open-source AI projects (like Sarathi-Serve), audit them for these vulnerabilities and apply the necessary fixes manually.
3.  **Network Segmentation:** Isolate AI inference servers in a segmented network and use firewalls to restrict access to their communication ports only to trusted clients.

**Tags:** AI, Machine Learning, RCE, Insecure Deserialization, pickle, vLLM, NVIDIA, Meta, Microsoft

## Sources
- [Critical RCE Flaws in AI Inference Engines Expose Meta, Nvidia, and Microsoft Frameworks](https://thehackernews.com/2025/11/critical-rce-flaws-in-ai-inference.html) — The Hacker News (2025-11-17)
- [In Other News: Deepwatch Layoffs, macOS Vulnerability, Amazon AI Bug Bounty](https://www.securityweek.com/in-other-news-deepwatch-layoffs-macos-vulnerability-amazon-ai-bug-bounty/) — SecurityWeek (2025-11-14)

---
Source: https://cyber.netsecops.io/articles/critical-rce-flaws-in-ai-inference-engines-expose-major-tech-frameworks/
