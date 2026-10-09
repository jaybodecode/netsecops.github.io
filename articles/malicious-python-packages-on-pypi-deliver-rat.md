# Malicious PyPI Packages `spellcheckerpy` & `spellcheckpy` Deliver RAT via Hidden Payload

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-01-28 | **Reading time:** 5 min

A software supply chain attack has been uncovered on the Python Package Index (PyPI), involving two malicious packages named `spellcheckerpy` and `spellcheckpy`. Downloaded over 1,000 times, the packages contained a hidden, dormant payload. A later version update activated the malware, which was designed to fingerprint the compromised developer's system and deploy a Remote Access Trojan (RAT). The attack was cleverly concealed, with the malicious code base64-encoded and hidden inside a Basque language dictionary file. The C2 domain used has been linked to a hosting provider known to service nation-state actors, suggesting a potentially sophisticated adversary.

## Executive Summary
Cybersecurity researchers have discovered a sophisticated software supply chain attack targeting developers via the official **[Python](https://www.python.org/)** Package Index (**[PyPI](https://pypi.org/)**). Two malicious packages, `spellcheckerpy` and `spellcheckpy`, were downloaded over 1,000 times before being removed. The packages employed a multi-stage attack, initially appearing benign. However, an update to version 1.2.0 activated a hidden payload that delivered a Remote Access Trojan (RAT). The malware was obfuscated and concealed within a dictionary file to evade detection. The RAT is capable of system fingerprinting and executing commands from a remote server, whose infrastructure has been associated with nation-state activity. This incident highlights the persistent threat of supply chain attacks against open-source ecosystems.

---

## Threat Overview
The attack represents a classic example of a **[Software Supply Chain Attack](https://attack.mitre.org/techniques/T1195/)**, where threat actors inject malicious code into a legitimate-seeming software component that is then distributed to unsuspecting users. In this case, the attackers typosquatted legitimate package names to fool developers.

The attack unfolded in several stages:
1.  **Initial Infection:** Developers install one of the malicious packages (`spellcheckerpy` or `spellcheckpy`) from PyPI, believing it to be a legitimate spell-checking library.
2.  **Dormant Phase:** The initial versions of the package are dormant and contain no overtly malicious code, allowing them to build a user base and potentially pass initial security scans.
3.  **Activation:** The attackers push an update (version 1.2.0). When a developer updates to this version, the malicious code is activated.
4.  **Payload Execution:** Upon being imported into a project, the malware decodes and executes a payload hidden within a seemingly innocuous data file (a Basque dictionary file).
5.  **Compromise:** The payload acts as a downloader for a full-featured RAT, which establishes a connection to a command-and-control (C2) server, giving the attacker control over the developer's machine.

## Technical Analysis
The key to this attack's stealth was its obfuscation and delayed execution. The malicious Python code was encoded using Base64 and embedded within a large dictionary file (`eu.dic`). This makes it difficult for static analysis tools to flag the package as malicious.

When version 1.2.0 is imported, a script within the package's `__init__.py` file reads the dictionary, extracts the Base64-encoded string, decodes it, and executes it using `exec()`.

The executed payload performs two main functions:
-   **System Fingerprinting:** It collects information about the compromised host, such as its operating system, username, and network configuration. This data is likely sent to the C2 server to help the attacker identify high-value targets.
-   **Command Execution:** It contacts an external C2 domain to receive and execute further commands, effectively turning the compromised machine into a bot.

The C2 domain was reportedly hosted on infrastructure previously associated with nation-state APT groups, raising the possibility that this was not a common cybercrime campaign but a targeted espionage operation.

## Impact Assessment
Compromising a developer's machine is a high-impact event that can lead to a much larger breach:
-   **Credential Theft:** Attackers can steal SSH keys, API tokens, and passwords stored on the developer's machine, giving them access to source code repositories, cloud infrastructure, and production systems.
-   **Code Injection:** The attacker could use the compromised developer's access to inject malicious code into the organization's own software, creating a secondary supply chain attack.
-   **Internal Reconnaissance:** The RAT provides a foothold for the attacker to explore the internal network, identify other targets, and move laterally.

## IOCs
| Type | Value | Description |
|---|---|---|
| File Name | `spellcheckerpy` | Malicious PyPI package name. |
| File Name | `spellcheckpy` | Malicious PyPI package name. |
| Other | PyPI package version `1.2.0` | The specific version that activated the malicious payload. |

## Detection & Response
1.  **Dependency Scanning:** Use software composition analysis (SCA) tools to scan your projects' dependencies. Check for the presence of `spellcheckerpy` or `spellcheckpy` in your `requirements.txt` or other dependency management files.

2.  **Network Log Analysis:** Monitor outbound network traffic from developer workstations and build servers. Look for connections to unknown or suspicious domains, especially from Python processes.

3.  **Endpoint Forensics:** If a malicious package is found, the affected machine must be isolated from the network and a forensic analysis should be conducted to determine the extent of the compromise.

## Mitigation
1.  **Vet Dependencies:** Do not blindly trust open-source packages. Use services like Snyk, Socket, or PyPI's own security advisories to check for known vulnerabilities or malicious packages. Carefully inspect packages with low download counts, recent publication dates, or names that are slight misspellings of popular libraries.

2.  **Pin Versions:** Pin your dependencies to specific, known-good versions in your `requirements.txt` file. This prevents automatic updates to potentially malicious newer versions.

3.  **Use a Private Repository:** For enterprise environments, consider using a private package repository (e.g., Nexus, Artifactory) that acts as a proxy to PyPI. This allows you to vet and approve packages before they are made available to your developers.

**Tags:** PyPI, Python, supply chain attack, malware, RAT, typosquatting

## Sources
- [Cyware Daily Threat Intelligence, January 28, 2026](https://www.cyware.com/cyware-funnel/cyware-daily-threat-intelligence-january-28-2026-f3b1) — Cyware (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/malicious-python-packages-on-pypi-deliver-rat/
