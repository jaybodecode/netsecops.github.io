# Critical Zero-Days in PyTorch Scanner 'PickleScan' Create AI Supply Chain Risk

**Severity:** critical | **Category:** Vulnerability,Supply Chain Attack,Cloud Security | **Updated:** 2025-12-04 | **Reading time:** 5 min

Security firm JFrog has disclosed three critical zero-day vulnerabilities in PickleScan, a popular open-source tool used to scan Python pickle files for malware, particularly within the PyTorch AI framework. The flaws, collectively rated with a CVSS score of 9.3, allow an attacker to craft a malicious AI model that bypasses PickleScan's security checks. When this seemingly safe model is loaded by a user, it can lead to arbitrary code execution. This discovery, announced on December 3, 2025, highlights a significant software supply chain risk for the AI/ML community, as attackers could distribute weaponized models that evade standard security scanning.

## Executive Summary
On December 3, 2025, the **[JFrog](https://jfrog.com/)** security research team revealed the discovery of three critical zero-day vulnerabilities in **PickleScan**, a widely adopted open-source tool for detecting malicious Python pickle files. These vulnerabilities carry a **CVSS score of 9.3 (Critical)** and introduce a severe software supply chain risk for the Artificial Intelligence and Machine Learning (AI/ML) ecosystem. An attacker can exploit these flaws to create a malicious AI model, often used with the **[PyTorch](https://pytorch.org/)** framework, that PickleScan will incorrectly flag as safe. When an unsuspecting developer or organization loads this trojanized model, it can trigger arbitrary code execution on their system. This attack vector allows for the covert distribution of malware through public model repositories, bypassing a key security control in the MLOps pipeline.

---

## Vulnerability Details
The vulnerabilities lie in the logic of PickleScan itself. The tool is designed to statically analyze a `pickle` file—a common format for serializing Python objects, heavily used for saving and loading AI models—to identify dangerous opcodes that could lead to code execution. The flaws discovered by JFrog represent bypass techniques, where a specially crafted pickle file can be constructed to appear benign to PickleScan's scanner while still containing a malicious payload that is executed upon deserialization by a standard Python pickle loader.

This creates a dangerous gap in the security supply chain: an organization may believe it is safely handling untrusted models by scanning them with PickleScan, but in reality, it remains vulnerable to exploitation. The end result is **arbitrary code execution** on the machine that loads the model, which could be a developer's workstation, a training server, or a production inference server.

## Affected Systems
- **Product:** PickleScan (all versions prior to a potential patch)
- **Ecosystem:** Any individual or organization that uses PickleScan to vet untrusted `pickle` files or PyTorch models (`.pt` files).

This is not a vulnerability in PyTorch itself, but in a security tool designed to protect its users. However, the vast popularity of PyTorch makes the impact of a faulty scanner particularly widespread.

## Exploitation Status
These are zero-day vulnerabilities, meaning they were not publicly known before JFrog's disclosure and no patches were available at the time of announcement. While there is no public evidence of active exploitation in the wild, the disclosure of the technical details means that threat actors could quickly weaponize these bypass techniques. The risk is especially high for organizations that automatically pull and deploy models from public repositories like Hugging Face.

## Impact Assessment
This vulnerability represents a critical threat to the security of the AI/ML software supply chain. A successful exploit could lead to:
- **Compromise of Development Environments:** Attackers could gain control of researcher or developer machines, stealing proprietary code, data, or credentials.
- **Production Server Takeover:** If a malicious model is deployed to production, the attacker could compromise the inference servers, potentially stealing sensitive input data, manipulating model outputs, or using the servers as a pivot point into the broader corporate network.
- **AI Model Poisoning or Backdooring:** An attacker could use the code execution vulnerability to subtly alter the behavior of the model itself, creating a backdoor that is triggered by specific inputs.

This undermines the trust in shared AI models and highlights the immaturity of security tooling in the rapidly evolving MLOps space.

## Detection Methods
- **Static Analysis Limitations:** The core issue is that static analysis tools like PickleScan can be bypassed. Relying solely on them for security is insufficient.
- **Dynamic Analysis (Sandboxing):** The most effective way to detect a malicious model is to load it in a heavily sandboxed and monitored environment. Observe the model's behavior during loading and inference for suspicious activities like network connections, file system access, or process creation. This is an application of D3FEND's [`D3-DA: Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
- **Model Provenance:** Whenever possible, only use models from trusted, verified sources. Check for digital signatures or other attestations of a model's origin.

## Remediation Steps
1.  **Assume Untrusted Models are Malicious:** Until a patched version of PickleScan or a more robust alternative is available, organizations should treat all AI models from untrusted sources as potentially malicious.
2.  **Use Sandboxing:** Do not load or deserialize untrusted pickle files on production systems or sensitive developer workstations. Use isolated, ephemeral environments (e.g., containers with no network access and read-only file systems) for initial model inspection.
3.  **Seek Alternatives:** Explore alternative model formats that have a safer deserialization process, such as `safetensors`.
4.  **Monitor for Updates:** Keep a close watch on the PickleScan project repository for any patches or mitigation guidance from the maintainers.

**Tags:** Zero-Day, AI Security, MLOps, PyTorch, PickleScan, JFrog, Supply Chain Attack, RCE

## Sources
- [3 Zero Day Vulnerabilities Found in PickleScan - Australian Cyber Security Magazine](https://www.mysecuritymedia.com/3-zero-day-vulnerabilities-found-in-picklescan/) — Australian Cyber Security Magazine (2025-12-03)
- [Cybersecurity Roundup: Partnerships, Funding, and Emerging Threats – December 3, 2025](https://www.hipther.com/2025/12/03/cybersecurity-roundup-partnerships-funding-and-emerging-threats-december-3-2025/) — Hipther (2025-12-03)

---
Source: https://cyber.netsecops.io/articles/jfrog-uncovers-critical-zero-days-in-pytorch-scanning-tool-picklescan/
