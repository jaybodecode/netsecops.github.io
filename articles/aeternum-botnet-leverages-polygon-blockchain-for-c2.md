# Aeternum Botnet Uses Polygon Blockchain for Resilient C2

**Severity:** high | **Category:** Malware,Threat Intelligence | **Updated:** 2026-08-11 | **Reading time:** 18 min

A C++ botnet loader named Aeternum is leveraging the public Polygon blockchain for its command-and-control (C2) infrastructure, creating a highly resilient and decentralized threat. Infected devices query public Remote Procedure Call (RPC) endpoints to retrieve commands stored on-chain in smart contracts. This method makes C2 takedowns extremely difficult. The loader also employs anti-evasion techniques, including VM detection. Analysis of the loader reveals a flawed encryption scheme for C2 payloads and its ability to download and execute secondary malware, such as the XMRig cryptominer.

## Executive Summary

Researchers have analyzed a C++ botnet loader named **[Aeternum](https://malpedia.caad.fkie.fraunhofer.de/details/win.aeternum)** that utilizes the public **[Polygon](https://polygon.technology/)** blockchain for a decentralized and highly resilient command-and-control (C2) infrastructure. Instead of connecting to traditional servers, infected Windows systems query public Remote Procedure Call (RPC) endpoints to read instructions from smart contracts deployed by the threat actors. This architecture makes the botnet's C2 nearly impossible to dismantle through conventional takedown methods. The loader, which advertises itself as `Aeternum C2 BotNet Loader`, also incorporates anti-analysis features and is used to deliver secondary payloads, including cryptominers like **[XMRig](https://github.com/xmrig/xmrig)**.

## Threat Overview

The core innovation of the **Aeternum** botnet is its complete reliance on a public blockchain for C2 operations. Threat actors issue commands by writing data to smart contracts on the **Polygon** network. Infected hosts, acting as bots, periodically poll public RPC gateways to fetch these commands. This design offers several advantages to the attackers: high availability, censorship resistance, and anonymity, all at a low operational cost. The malware sample analyzed (`Build.exe`) is a 32-bit UPX-packed Windows executable that establishes persistence, performs reconnaissance, and then begins communicating with the blockchain to await instructions.

## Technical Analysis

The Aeternum loader (`SHA256: 5bfb25b8255b61e5ffdf6804451534bcfa9f1dfd225e6c8cdcefb5f50d846898`) executes in stages, first unpacking itself and then deobfuscating internal strings and configuration data.

### String Deobfuscation

The malware hides critical strings, such as JSON object templates for RPC requests, using a simple XOR-based encryption scheme. The encrypted data follows a recognizable pattern: `\x00\x00\x00[ENC bytes]\x00[KEY bytes]\x00\x00\x00`. A script can parse the binary for this pattern, extract the key, and decrypt the embedded information.

### Blockchain C2 Communication

1.  **JSON-RPC Request**: The loader sends an HTTP POST request to a **Polygon** RPC endpoint (e.g., `polygon-rpc.com`). The request is a JSON-RPC call to the `eth_call` method.
2.  **Smart Contract Call**: The JSON payload specifies the target smart contract address in the `to` field and the function to call in the `data` field. The malware calls the `getDomain()` method, identified by its function selector `0xb68d1809`.
3.  **Payload Retrieval and Decryption**: The RPC endpoint returns the data from the smart contract. While some commands are in plaintext, others are encrypted. The analysis revealed a critical flaw in the encryption: a weak, self-salting password scheme condemned by **[NIST](https://www.nist.gov/)** SP 800-132. The decryption key is derived from the smart contract address itself, allowing researchers to decrypt the payload using the contract address and the returned data. An example decrypted command is `all:url:<URI for putty.exe>`, instructing the bot to download a file.

### Secondary Payloads

The loader has been observed downloading both legitimate and malicious files. In one case, it downloaded a legitimate installer for **[PuTTY](https://www.putty.org/)** (likely for testing) and a malicious `DotNetZip.dll` from a **[GitHub](https://github.com/)** repository. The ultimate goal is to deliver malware like the **XMRig** cryptominer, though the architecture allows for any payload to be deployed.

### MITRE ATT&CK Techniques

- [`T1568.003 - Dynamic Resolution: Cloud-Based Dynamic DNS`](https://attack.mitre.org/techniques/T1568/003/): Using a public blockchain as a decentralized and dynamic C2 resolution mechanism.
- [`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/): Downloading secondary payloads from sources like GitHub.
- [`T1027 - Obfuscated Files or Information`](https://attack.mitre.org/techniques/T1027/): Using UPX packing and a custom XOR-based string encryption scheme.
- [`T1497 - Virtualization/Sandbox Evasion`](https://attack.mitre.org/techniques/T1497/): The malware includes checks to detect if it is running in a virtual machine or analysis environment.
- [`T1059.003 - Command and Scripting Interpreter: Windows Command Shell`](https://attack.mitre.org/techniques/T1059/003/): Used to execute downloaded payloads.

## Impact Assessment

Aeternum represents a significant step forward in the development of resilient malware. By decentralizing its C2 on a public blockchain, the botnet is largely immune to traditional infrastructure takedown efforts that target servers and domains. This makes it a persistent threat that can be repurposed to deliver various malicious payloads, from resource-stealing cryptominers to destructive ransomware. The low cost and high resilience of this model are likely to be adopted by other threat actors, posing a long-term challenge for the cybersecurity community.

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| File Hash (SHA256) | `5bfb25b8255b61e5ffdf6804451534bcfa9f1dfd225e6c8cdcefb5f50d846898` | SHA256 hash of the Aeternum loader sample `Build.exe`. |

## Cyber Observables — Hunting Hints

The following patterns may help identify Aeternum activity:

| Type | Value | Description | Context |
|---|---|---|---|
| Domain | `polygon-rpc.com` | A public RPC endpoint for the Polygon blockchain used for C2. | DNS logs, proxy logs. Monitor for repeated POST requests. |
| File Name | `Build.exe` | The name of the initial Aeternum loader sample. | EDR alerts, file system monitoring. |
| File Name | `DotNetZip.dll` | A malicious DLL observed being downloaded as a secondary payload. | EDR alerts, file system monitoring. |
| Network Traffic Pattern | `"method":"eth_call"` | Part of the JSON-RPC request sent to the Polygon endpoint. | Deep packet inspection, network traffic analysis. |
| Hex Pattern | `0xb68d1809` | The 4-byte function selector for the `getDomain()` method in the smart contract call. | Deep packet inspection, network security monitoring. |

## Detection & Response

Detecting Aeternum requires a focus on behavioral and network anomalies.

1.  **Network Traffic Analysis**: Monitor for HTTP POST requests to known public blockchain RPC endpoints (e.g., `polygon-rpc.com`). While legitimate applications may use these, a pattern of repeated requests from numerous endpoints within an organization could indicate a widespread botnet infection. Use D3FEND's [`Network Traffic Analysis (D3-NTA)`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to inspect the JSON-RPC payload for suspicious characteristics, such as calls to the `eth_call` method with the `getDomain()` function selector (`0xb68d1809`).

2.  **Endpoint Detection**: Use an EDR solution to monitor for the execution of unsigned or UPX-packed executables. Create detection rules for the loader's persistence mechanisms and its specific string deobfuscation patterns. [`Process Analysis (D3-PA)`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) can help identify the chain of execution from the initial loader to the downloaded secondary payloads.

3.  **Threat Hunting**: Proactively hunt for downloads from public code repositories like GitHub, especially for files that are later executed by `cmd.exe` or `powershell.exe`. Hunt for the specific string encryption pattern (`\x00\x00\x00...`) in suspicious binaries on disk.

## Mitigation

- **Application Control**: Implement application allowlisting policies, such as Windows Defender Application Control, to prevent the execution of unauthorized and unsigned executables like the Aeternum loader. This is a form of D3FEND's [`Executable Allowlisting (D3-EAL)`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).

- **Egress Filtering**: While blocking all blockchain RPC endpoints may be impractical, organizations can restrict or closely monitor outbound connections to them. Create policies that alert on systems making frequent JSON-RPC calls, which is not typical behavior for most corporate workstations. Block direct downloads from untrusted sources like raw GitHub content URLs.

- **Endpoint Hardening**: Ensure endpoint security solutions are configured to detect and block packed executables and scripts that exhibit anti-VM or anti-debugging behavior. This aligns with [`Application Hardening (D3-AH)`](https://d3fend.mitre.org/technique/d3f:ApplicationHardening).

**Tags:** botnet, loader, blockchain, C2, Polygon, smart contract, malware analysis, cryptominer

## Sources
- [The Permanent Threat: Analyzing Aeternum’s Blockchain-Based C2 Operations and Communications](https://unit42.paloaltonetworks.com/aeternum-blockchain-c2-analysis/) — Unit 42 (2026-08-10)

---
Source: https://cyber.netsecops.io/articles/aeternum-botnet-leverages-polygon-blockchain-for-c2/
