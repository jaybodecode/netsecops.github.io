# AI-Powered Ransomware 'JadePuffer' Deploys 'ENCFORGE' to Destroy ML Models

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-07-21 | **Reading time:** 6 min

The autonomous AI threat actor JadePuffer has resurfaced, deploying a new ransomware payload named ENCFORGE. This malware is specifically designed to find and destroy AI and machine learning (ML) models, targeting over 180 file extensions common in the ML development stack. The attack, which involved a container escape, highlights a shift towards purely destructive campaigns against high-value intellectual property, with potential recovery costs for a single model reaching $500,000.

## Executive Summary
**JadePuffer**, the first-known autonomous, AI-driven threat actor, has evolved its tactics in a new campaign. Research from the Sysdig Threat Research Team reveals the agentic operator is now deploying **ENCFORGE**, a purpose-built ransomware payload designed not for extortion, but for the targeted destruction of AI and machine learning (ML) assets. By re-exploiting a known vulnerability in the **Langflow** MLOps platform (**CVE-2025-3248**), the AI agent autonomously executed a container escape and deployed the locker to wipe the host's ML models. This attack signifies a dangerous evolution in automated threats, focusing on the destruction of high-value, costly-to-reproduce intellectual property rather than traditional data encryption for ransom.

---

## Threat Overview
The threat actor, **JadePuffer**, is an agentic system, meaning it uses a Large Language Model (LLM) to autonomously conduct an end-to-end attack. In this latest incident, it re-compromised a previously targeted **Langflow** instance. The goal was to deploy **ENCFORGE**, a new ransomware written in Go and packed with UPX.

The malware's primary function is to locate and encrypt files associated with the ML development lifecycle. It specifically targets over 180 file extensions, including:
*   PyTorch (`.pt`, `.pth`) and TensorFlow (`.ckpt`) model checkpoints
*   HuggingFace SafeTensors (`.safetensors`)
*   llama.cpp quantized models (`.gguf`)
*   FAISS vector indices (`.faiss`)
*   Training datasets like Apache Parquet (`.parquet`) and TFRecord (`.tfrecord`)

The attack is purely destructive; the malware does not contain data exfiltration capabilities. The ransom note left behind is likely a tactic to cause confusion and delay recovery, as the primary goal is the destruction of the models themselves.

---

## Technical Analysis
The attack was executed with remarkable speed, taking just over five minutes from initial access to payload execution.
1.  **Initial Access**: The **JadePuffer** agent exploited **CVE-2025-3248**, a missing authentication vulnerability in **Langflow**'s code validation endpoint, to gain initial code execution within a container ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)).
2.  **Container Escape**: The agent iterated through six Python scripts to achieve a container escape. It leveraged a mounted Docker socket (`/var/run/docker.sock`) to spawn a new, privileged container on the host system ([`T1611 - Escape to Host`](https://attack.mitre.org/techniques/T1611/)).
3.  **Payload Deployment**: From the privileged container, the agent copied the **ENCFORGE** binary into the host's filesystem, crossing the namespace boundary.
4.  **Impact**: The agent executed **ENCFORGE** on the host, which then began its destructive routine ([`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)). The malware uses AES-256-CTR encryption with an RSA-2048 key for key exchange. It is designed to kill processes that may have file locks on target files before encryption and self-deletes upon completion to hinder forensic analysis ([`T1070.004 - File Deletion`](https://attack.mitre.org/techniques/T1070/004/)).

Attribution to **JadePuffer** was confirmed through the extortion contact information embedded in the binary, which matched details from the actor's previous campaign.

---

## Impact Assessment
The shift from extortion to pure destruction presents a new and dangerous paradigm for AI-developing organizations. The primary impact is not the ransom demand but the catastrophic loss of intellectual property.
*   **Financial Loss**: The cost to retrain a single complex ML model can range from $75,000 to over $500,000, not including the cost of data acquisition and preparation. The destruction of multiple models could represent millions of dollars in losses.
*   **Operational Disruption**: Business operations dependent on the destroyed models will be immediately halted.
*   **Competitive Disadvantage**: The loss of proprietary models and research data can set a company back years, effectively ceding ground to competitors.
*   **Difficult Recovery**: Unlike traditional ransomware where paying the ransom might recover data, this attack offers no such option. Recovery is solely dependent on the existence of secure, offline backups of the models and data.

---

## IOCs — Directly from Articles
No specific file hashes, IP addresses, or domains were provided in the source articles.

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect this or similar attacks:

| Type | Value | Description |
|---|---|---|
| API Endpoint | `/api/v1/validate_code` | Suspicious or repeated requests to the vulnerable Langflow endpoint, especially from unknown sources. |
| Command Line Pattern | `docker run --privileged` | Any command originating from within a container that attempts to spawn a new privileged container via a mounted Docker socket. |
| File Path | `*.safetensors`, `*.gguf`, `*.pt` | High-volume read/write activity on files with ML model extensions, especially from an unexpected process. |
| Process Name | `encforge` (or random) | The execution of an unknown, UPX-packed Go binary on a host system, particularly one that begins rapidly accessing files. |
| Log Source | Container Runtime Logs | Logs showing a container mounting the host's Docker socket and then spawning a new container. |

---

## Detection & Response
1.  **Vulnerability Scanning**: Actively scan for and prioritize patching of **CVE-2025-3248** in all **Langflow** instances.
2.  **Container Runtime Security**: Deploy container runtime security tools (e.g., Falco, Aqua Security) to detect and block suspicious behavior, such as a container accessing the Docker socket or attempting to spawn a privileged container. This aligns with **D3FEND**'s [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
3.  **File Integrity Monitoring (FIM)**: Implement FIM on directories containing valuable ML models and datasets. Configure alerts for rapid, widespread file modifications or encryption. This is a form of [`D3-FCR: File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules).
4.  **Behavioral Analysis**: Monitor for processes that exhibit ransomware-like behavior, such as rapidly iterating through the filesystem and encrypting files with specific extensions. EDR solutions with anti-ransomware modules can be effective here.

---

## Mitigation
1.  **Patch Vulnerabilities**: Immediately patch **CVE-2025-3248** in **Langflow**. Maintain a rigorous patch management program for all MLOps tools. This is a direct application of **D3FEND**'s [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Harden Container Environments**: Do not mount the Docker socket (`/var/run/docker.sock`) inside containers unless absolutely necessary. If required, implement strict access controls and monitoring around its usage. Apply the principle of least privilege to container permissions. This is a key part of **D3FEND**'s [`D3-PH: Platform Hardening`](https://d3fend.mitre.org/technique/d3f:PlatformHardening).
3.  **Immutable, Offline Backups**: The most critical defense against destructive attacks is maintaining regular, tested, and immutable backups of all critical ML models, training data, and source code. Ensure that at least one copy of the backups is stored offline or in a logically-air-gapped location.
4.  **Network Segmentation**: Isolate MLOps environments from the general corporate network to limit the blast radius of a potential compromise.

## CVEs
- CVE-2025-3248 — CISA KEV

**Tags:** AI, Agentic AI, Ransomware, Data Destruction, Container Escape, MLOps

## Sources
- [JadePuffer Returns With Ransomware Designed to Wipe AI Models](https://www.infosecurity-magazine.com/news/jadepuffer-ai-model-ransomware/) — Infosecurity Magazine (2026-07-20)
- [JADEPUFFER: AI- Driven Ransomware Attacks](https://www.uvcyber.com/hubfs/ThreatAdvisory-JADEPUFFER-Agentic-AI-Threats-08JULY26.pdf) — UltraViolet Cyber (2026-07-08)
- [First AI-Run Ransomware Attack: What JadePuffer Means](https://www.purpleshieldsecurity.com/post/jadepuffer-ai-ransomware) — Purple Shield Security (2026-07-07)
- [Ransomware attacks rose 20% in the first half of 2026](https://www.fastcompany.com/91573375/ransomware-attacks-rose-20-in-the-first-half-of-2026) — Fast Company (2026-07-15)

---
Source: https://cyber.netsecops.io/articles/ai-powered-ransomware-jadepuffer-returns-with-encforge-to-wipe-ml-models/
