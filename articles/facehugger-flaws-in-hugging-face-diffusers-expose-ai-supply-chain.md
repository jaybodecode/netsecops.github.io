# 'FaceHugger' Flaws in Hugging Face Diffusers Bypass Security Controls

**Severity:** high | **Category:** Vulnerability,Supply Chain Attack,Other | **Updated:** 2026-08-04 | **Reading time:** 5 min

Three high-severity vulnerabilities, dubbed 'FaceHugger,' have been discovered in Hugging Face's popular Diffusers library for AI models. The flaws (CVE-2026-44513, CVE-2026-44827, CVE-2026-45804) allow a malicious AI model to bypass a key security feature, `trust_remote_code=false`, and execute arbitrary code on a developer's machine. This poses a significant AI supply chain risk, as loading a seemingly benign model could lead to a system compromise. Hugging Face has patched the vulnerabilities in Diffusers version 0.38.0 and users are urged to update.

## Executive Summary

Security researchers have identified three high-severity vulnerabilities, collectively named 'FaceHugger,' in **[Hugging Face](https://huggingface.co/)'s** popular open-source Diffusers library. This library, downloaded millions of times monthly, is a cornerstone for developers working with generative AI models. The vulnerabilities allow a maliciously crafted AI model repository to bypass the `trust_remote_code` security mechanism, which is designed to prevent untrusted code execution. Successful exploitation enables arbitrary code execution on the machine that loads the model, creating a critical **[AI](https://en.wikipedia.org/wiki/Artificial_intelligence)** supply chain risk. An attacker could publish a malicious model that, when used by a developer or in a production pipeline, compromises the underlying system. **[Hugging Face](https://huggingface.co/)** has addressed the flaws in Diffusers version 0.38.0, and all users are advised to upgrade immediately.

---

## Vulnerability Details

The core issue behind the 'FaceHugger' flaws is the ability to circumvent the `trust_remote_code=false` setting in the `DiffusionPipeline.from_pretrained` function. This setting is a developer's primary defense against malicious code embedded within model repositories.

The three vulnerabilities are:
-   **CVE-2026-44513 (CVSS 8.8)**: A code injection flaw where the `custom_pipeline` feature can be abused to load and execute code even when `trust_remote_code` is set to false.
-   **CVE-2026-44827 (CVSS 8.8)**: A code injection bug related to a string-formatting quirk. A repository containing a file named `None.py` is not properly checked by the security mechanism, allowing its code to be executed.
-   **CVE-2026-45804 (CVSS 7.5)**: A race condition where an attacker can modify a model repository's configuration on the Hugging Face Hub between the time it is cloned and the time the code is loaded, injecting malicious code that is then executed.

These vulnerabilities mean that a simple, common command to load an **[AI](https://en.wikipedia.org/wiki/Artificial_intelligence)** model can become an initial access vector for an attacker.

---

## Affected Systems

The vulnerabilities affect any developer, researcher, or organization using a vulnerable version of the **[Hugging Face](https://huggingface.co/)** Diffusers library (versions prior to 0.38.0). Given the library's popularity (over 8 million downloads in July 2026 alone), the potential scope of impact is massive. This includes:
-   Individual developers' machines.
-   Corporate research environments.
-   CI/CD pipelines that build or test AI-powered applications.
-   Production systems that dynamically load models from the Hugging Face Hub.

---

## Exploitation Status

The vulnerabilities were responsibly disclosed by researchers at Zafran Labs. There is no public evidence of these flaws being exploited in the wild. However, the public disclosure of the technical details increases the risk that malicious actors will attempt to create and publish poisoned models to trap unsuspecting developers. The ease of publishing models on the Hugging Face Hub makes this a scalable attack vector.

---

## Impact Assessment

The 'FaceHugger' vulnerabilities represent a significant threat to the security of the AI ecosystem.
-   **AI Supply Chain Compromise**: Similar to attacks on software package repositories like PyPI or NPM, this allows attackers to poison a core component of the AI development lifecycle. A compromised model can lead to a breach of the entire development environment.
-   **Data Theft and Espionage**: Once an attacker achieves code execution, they can steal sensitive data, including proprietary code, API keys, and internal research.
-   **Pivot to Production Systems**: If a malicious model is loaded in a production environment, it could lead to a full compromise of the application and its underlying infrastructure.
-   **Erosion of Trust**: Such vulnerabilities can erode trust in open-source AI communities and repositories like the Hugging Face Hub, which are vital for innovation and collaboration.

> This is a stark reminder that AI models are not just data; they are often bundled with executable code, and the toolchains used to handle them must be secure.

---

## IOCs — Directly from Articles

No specific indicators of compromise were mentioned, as the vulnerabilities were not observed being exploited in the wild.

---

## Cyber Observables — Hunting Hints

To detect potential exploitation, security teams can monitor for:

| Type | Value | Description |
|---|---|---|
| `file_name` | `None.py` | The presence of a file with this exact name within a downloaded Hugging Face model repository is a strong indicator of an attempt to exploit CVE-2026-44827. |
| `network_traffic_pattern` | Unexpected outbound network connections from a Python process | After loading a model, the Python process should not be making unexpected network calls. This could indicate a malicious payload communicating with a C2 server. |
| `process_name` | Spawning of shells (`sh`, `bash`, `cmd.exe`, `powershell.exe`) from a Python process | A Python script loading an AI model should not be spawning shells. This is a major red flag for code execution. |

---

## Detection & Response

1.  **Dependency Scanning**: Use software composition analysis (SCA) tools to scan projects for vulnerable versions of the `diffusers` library and flag them for immediate update. This is an application of **[D3FEND Application Framework Hardening (D3-AFH)](https://d3fend.mitre.org/technique/d3f:ApplicationFrameworkHardening)**.
2.  **Behavioral Monitoring**: Use EDR or other process monitoring tools to watch the behavior of Python processes that load models. Alert on suspicious activities like file system modifications outside of the model cache, unexpected network connections, or child process creation (especially shells).
3.  **Audit Model Sources**: Before loading any new model from a public repository, vet the source. Check the reputation of the publisher, examine the files in the repository for suspicious code (like `None.py`), and review any linked code.

---

## Mitigation

1.  **Update the Library**: The primary mitigation is to update the `diffusers` library to version 0.38.0 or newer. This can be done via pip: `pip install --upgrade diffusers`. This is a direct application of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Run in Sandboxed Environments**: When experimenting with untrusted models, always do so in a sandboxed and isolated environment, such as a container or a dedicated virtual machine with no access to sensitive data or networks. This is a form of **[D3FEND Execution Isolation (D3-EI)](https://d3fend.mitre.org/technique/d3f:ExecutionIsolation)**.
3.  **Vet Custom Code**: If you must use a model that requires `trust_remote_code=true`, manually review the code in the repository before running it. Do not blindly trust code from unknown sources.

## CVEs
- CVE-2026-44513 (CVSS 8.8)
- CVE-2026-44827 (CVSS 8.8)
- CVE-2026-45804 (CVSS 7.5)

**Tags:** Hugging Face, AI, Machine Learning, Supply Chain Attack, Vulnerability, CVE-2026-44513

## Sources
- [Hugging Face Diffusers Flaws Could Let Model Repositories Execute Arbitrary Code](https://thehackernews.com/2026/08/hugging-face-diffusers-flaws-could-let.html) — The Hacker News (2026-08-03)
- [Bugs in Hugging Face Diffusers Bypass Custom Code Safeguard](https://www.infosecurity-magazine.com/news/hugging-face-diffusers-trust/) — Infosecurity Magazine (2026-07-28)
- [Hugging Face Diffusers Flaws Could Let Model Repositories Execute Arbitrary Code](https://www.reddit.com/r/SecOpsDaily/comments/1ve77az/hugging_face_diffusers_flaws_could_let_model/) — Reddit (2026-08-03)

---
Source: https://cyber.netsecops.io/articles/facehugger-flaws-in-hugging-face-diffusers-expose-ai-supply-chain/
