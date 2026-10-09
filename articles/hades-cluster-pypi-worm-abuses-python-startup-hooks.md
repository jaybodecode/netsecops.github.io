# "Hades Cluster" PyPI Worm Abuses Python Startup Hooks for Stealthy Credential Theft

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-06-08 | **Reading time:** 5 min

A novel supply chain attack campaign, dubbed "Hades Cluster," has been discovered on the Python Package Index (PyPI), affecting at least 19 legitimate packages. The malware utilizes a stealthy and unusual technique for execution and persistence by abusing Python's `.pth` startup hook files. This method allows the malware's code to execute automatically whenever the Python interpreter is launched, bypassing common detection methods. The campaign, suspected to be linked to the threat actor TeamPCP, uses the Bun JavaScript runtime to harvest credentials, primarily targeting developers in the scientific research and deep-learning communities.

## Executive Summary
A new and sophisticated supply chain attack campaign named **"Hades Cluster"** has been identified on the **[Python Package Index (PyPI)](https://pypi.org/)**. The campaign, disclosed on June 7, 2026, has compromised at least 19 legitimate packages, mainly within the scientific and deep-learning ecosystems. The malware's novelty lies in its execution and persistence mechanism: it abuses Python's `.pth` startup hook files. This technique allows the malicious code to run automatically every time a Python interpreter starts, evading detection tools that focus on more common infection points like `setup.py`. The malware then uses the **Bun** JavaScript runtime to facilitate credential harvesting. This campaign is believed to be linked to **[TeamPCP](https://www.malpedia.caad.fkie.fraunhofer.de/actor/teampcp)**, the group that recently open-sourced the **Shai-Hulud** worm, suggesting a rapid evolution and proliferation of these attack methods.

---

## Threat Overview
The **Hades Cluster** campaign represents a tactical evolution in **[PyPI](https://pypi.org/)** supply chain attacks. Instead of relying on typosquatting or embedding malicious code directly in a package's `setup.py` file, the attackers are using a more obscure feature of Python's packaging system. This demonstrates a deeper understanding of the target environment and a conscious effort to evade existing security controls.

The attack targets developers, particularly those in data-intensive fields like scientific research and deep learning, who are likely to have access to valuable data, computational resources, and cloud credentials. By compromising their development environments, the attackers can potentially steal sensitive research, gain access to powerful GPU clusters, or pivot into corporate cloud environments.

## Technical Analysis
The core of the attack is the abuse of Python's path configuration (`.pth`) files.

1.  **Initial Access & Execution**: The developer installs a compromised Python package via `pip`. During installation, the package drops a malicious `*-setup.pth` file into the Python `site-packages` directory. This is a form of [`T1195.001 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/001/).
2.  **Persistence**: `.pth` files are processed by Python on startup to add directories to `sys.path`. However, they can also execute arbitrary code if a line starts with `import`. The attackers leverage this to create a startup hook. Every time the developer runs `python`, `pip`, or any tool that uses the Python interpreter, the malicious code in the `.pth` file is executed. This provides a highly effective and stealthy persistence mechanism ([`T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001), adapted for the Python environment).
3.  **Defense Evasion**: This method is inherently evasive. Most security scanners and developers inspect `setup.py` or the package's source code for malicious behavior. The `.pth` file is often overlooked as a simple configuration file, allowing the malware to bypass scrutiny ([`T1036.005 - Masquerading: Match Legitimate Name or Location`](https://attack.mitre.org/techniques/T1036/005/)).
4.  **Credential Access**: Once executed, the startup hook bootstraps the **Bun** JavaScript runtime. This is an unusual choice, likely intended to further obfuscate the malware's actions and use a different toolset than what defenders might be monitoring. The JavaScript payload is then used to perform credential harvesting from the developer's environment, targeting environment variables, configuration files, and other common locations for secrets ([`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/)).

The link to **TeamPCP** and their **Shai-Hulud** worm suggests that open-sourcing malware is leading to rapid innovation and adaptation by other threat actors, creating a more diverse and unpredictable threat landscape.

## Impact Assessment
The impact of this campaign is primarily on the developers and organizations that use the compromised packages. The consequences include:

-   **Theft of Intellectual Property**: Loss of sensitive source code, research data, and proprietary algorithms.
-   **Cloud Account Compromise**: Theft of AWS, GCP, or Azure credentials can lead to substantial financial loss through cryptomining, data theft, or deployment of other malicious infrastructure.
-   **Further Supply Chain Attacks**: A compromised developer machine can be used as a pivot point to inject malicious code into the software their organization produces, propagating the attack to downstream customers.
-   **Erosion of Trust**: Each new PyPI attack erodes trust in the open-source ecosystem, forcing organizations to implement more stringent and costly vetting processes for third-party libraries.

## IOCs — Directly from Articles

No specific package names, hashes, or C2 domains were provided in the source articles.

## Cyber Observables — Hunting Hints

To hunt for this type of attack, security teams should:

| Type | Value | Description | Context |
|---|---|---|---|
| file_path | `site-packages/**/*.pth` | Regularly inspect the contents of all `.pth` files in Python environments. Any file containing more than simple directory paths should be considered highly suspicious. | File system scanning, FIM. |
| process_name | `bun.exe` | The presence of the Bun JavaScript runtime (`bun.exe`) in an environment where it is not expected or officially used is a strong indicator of compromise. | EDR, process monitoring. |
| network_traffic_pattern | `Network connections from python.exe` | Monitor for network connections originating from the main `python.exe` process at startup, before any user script is run. This could indicate a malicious startup hook phoning home. | Host-based firewall logs, EDR network telemetry. |
| command_line_pattern | `import '...'` | Scan `.pth` files for lines starting with `import`, which is the mechanism for code execution. | Static analysis, file content scanning. |

## Detection & Response
-   **File Integrity Monitoring (FIM)**: Deploy FIM on developer workstations and build servers to alert on the creation or modification of `.pth` files.
-   **Behavioral Analysis**: Use EDR to detect the Python interpreter making unexpected network connections on startup or spawning unusual child processes like `bun.exe`.
-   **Dependency Scanning**: Use advanced dependency scanners that can inspect not just the package code but also its installation scripts and metadata for suspicious patterns like the creation of `.pth` files. D3FEND's [`File Analysis (D3-FA)`](https://d3fend.mitre.org/technique/d3f:FileAnalysis) is a relevant concept.

## Mitigation
-   **Isolated Build Environments**: Use ephemeral and isolated environments for software builds. This ensures that any compromise is contained and does not persist or affect the underlying host. This aligns with [`M1048 - Application Isolation and Sandboxing`](https://attack.mitre.org/mitigations/M1048/).
-   **Vet Dependencies**: Do not blindly trust packages from public repositories. Use a private package registry that proxies PyPI and allows for a vetting and approval process before packages are made available to developers.
-   **Least Privilege Execution**: Run development and build processes with the minimum necessary permissions. They should not have access to sensitive credentials or the ability to write to system-wide directories if not required.
-   **Audit `.pth` Files**: As a specific countermeasure, organizations can implement scripts that audit all Python environments and flag any `.pth` file that contains executable code.

**Tags:** Hades Cluster, PyPI, Python, Supply Chain Attack, TeamPCP, Credential Theft, Startup Hooks

## Sources
- [Hades Cluster PyPI Worm Abuses Python Startup Hooks : r/cybersecurity](https://www.reddit.com/r/cybersecurity/comments/1u06m8r/hades_cluster_pypi_worm_abuses_python_startup/) — Reddit (2026-06-08)

---
Source: https://cyber.netsecops.io/articles/hades-cluster-pypi-worm-abuses-python-startup-hooks/
