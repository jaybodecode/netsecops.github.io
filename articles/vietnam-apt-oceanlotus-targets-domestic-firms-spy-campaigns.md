# Vietnam's OceanLotus APT Pivots to Domestic Spying, Hits Construction and Finance Sectors

**Severity:** high | **Category:** Threat Actor,Supply Chain Attack,Cyberattack | **Updated:** 2026-06-11 | **Reading time:** 4 min

The Vietnam-aligned threat group OceanLotus (also known as APT32) has shifted its focus to domestic espionage, targeting a Vietnamese construction firm and stock market investors. According to research from ESET, the group conducted a year-long intrusion and a sophisticated supply-chain attack compromising the FireAnt MetaKit stock trading software. Both campaigns leveraged the group's signature SPECTRALVIPER backdoor to exfiltrate data, suggesting a potential alignment with state anti-corruption efforts.

## Executive Summary
**[OceanLotus](https://attack.mitre.org/groups/G0050/)** (also known as APT32 or SeaLotus), a sophisticated threat actor aligned with Vietnamese state interests, has pivoted its operations to focus on domestic targets. A new report from cybersecurity firm **[ESET](https://www.eset.com/us/)** details two major espionage campaigns conducted between mid-2024 and March 2026. The first was a prolonged intrusion against a major Vietnamese construction corporation. The second was a stealthy supply-chain attack that compromised the update mechanism of FireAnt MetaKit, a popular stock investment application, to selectively deploy malware. In both operations, OceanLotus used its custom **SPECTRALVIPER** backdoor, signaling a strategic shift from foreign targets to domestic entities that may align with Vietnam's national priorities.

---

## Threat Overview
ESET uncovered two distinct, long-running campaigns attributed to OceanLotus:
1.  **Construction Firm Espionage (Mid-2024 – Feb 2026):** The APT group maintained persistent access to the network of a major Vietnamese infrastructure and transport construction company for over a year. The initial access vector is suspected to be the exploitation of an RCE vulnerability in a public-facing Microsoft SQL server.
2.  **FireAnt MetaKit Supply-Chain Attack (Oct 2025 – Mar 2026):** OceanLotus compromised the update server for the FireAnt MetaKit software. By replacing a legitimate update with a malicious one, they were able to deliver their backdoor to a select group of stock market investors. The attack was successful because the software's update process used unencrypted HTTP and lacked digital signature verification, allowing the attackers to perform a man-in-the-middle style attack on the update process.

## Technical Analysis
OceanLotus employed a range of sophisticated TTPs across these campaigns:
- **Initial Access:** The group likely used [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) against the construction firm's SQL server. For the FireAnt campaign, they used [`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/) by tampering with the update mechanism.
- **Execution & Persistence:** The primary payload, SPECTRALVIPER, was loaded using [`T1574.002 - DLL Side-Loading`](https://attack.mitre.org/techniques/T1574/002/). The backdoor was executed by a legitimate, signed executable, making it difficult for basic security tools to detect.
- **Command and Control (C2):** The SPECTRALVIPER backdoor communicated with a C2 server using a domain, `financemachinelearning[.]com`, specifically chosen to blend in with legitimate financial data traffic and evade detection by network security monitoring.
- **Targeting:** The supply-chain attack was highly targeted. Instead of deploying the backdoor to all FireAnt users, OceanLotus selectively infected only a small subset, indicating a focus on high-value individuals within the Vietnamese financial sector.

## Impact Assessment
These campaigns represent a significant strategic shift for OceanLotus, moving from foreign corporate and government targets to domestic ones. This could indicate the group is being tasked with supporting national policy, such as Vietnam's anti-corruption drive, by gathering intelligence on domestic companies and influential individuals. The supply-chain attack, in particular, demonstrates a high level of sophistication and patience, posing a severe risk to any organization or individual using the compromised software. The potential for data exfiltration could lead to insider trading, economic espionage, or blackmail.

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| Domain | `financemachinelearning[.]com` | Command-and-control server used in the FireAnt supply-chain attack. |

## Detection & Response
Security teams should focus on detecting the TTPs used by OceanLotus:
1.  **Network Monitoring:** Monitor for and block any outbound connections to the known C2 domain `financemachinelearning[.]com`. Use D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to hunt for suspicious C2-like traffic patterns.
2.  **Endpoint Detection:** Deploy EDR solutions to detect DLL side-loading. Monitor for legitimate applications loading unsigned or anomalously named DLLs from non-standard directories.
3.  **Software Integrity:** Use file integrity monitoring or application control solutions to verify the integrity of application updates, especially for third-party software. Look for changes in file hashes of core application components.
4.  **Log Analysis:** For the suspected initial vector, monitor MS SQL server logs for signs of exploitation or unusual queries. For D3FEND, this aligns with [`Database-level Policy Enforcement`](https://d3fend.mitre.org/technique/d3f:Database-levelPolicyEnforcement).

## Mitigation
Organizations can take several steps to defend against these types of attacks:
- **[`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/):** Ensure all public-facing applications, such as Microsoft SQL servers, are promptly patched to prevent initial access via known vulnerabilities.
- **[`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/):** Use outbound traffic filtering to block connections to known malicious domains and untrusted IP addresses.
- **Application Control:** Implement application control policies, such as those using AppLocker or Windows Defender Application Control, to prevent the execution of unauthorized or unsigned DLLs. This corresponds to D3FEND's [`Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).
- **Vendor Risk Management:** For supply-chain threats, organizations should assess the security practices of their software vendors, prioritizing those who use secure update mechanisms (e.g., HTTPS, code signing).

**Tags:** OceanLotus, APT32, SPECTRALVIPER, Supply Chain Attack, Espionage, Vietnam, Threat Actor

## Sources
- [Vietnam-aligned OceanLotus pivots to spy on domestic targets as it takes a more selective approach abroad, ESET Research finds](https://sg.finance.yahoo.com/news/vietnam-aligned-oceanlotus-pivots-spy-090000947.html) — Yahoo Finance
- [OceanLotus Hits Vietnam Investors With SPECTRALVIPER in FireAnt Attack](https://thehackernews.com/2026/06/oceanlotus-hits-vietnam-investors-with.html) — The Hacker News
- [OceanLotus Targets Stock Investors in FireAnt MetaKit Supply-Chain Hack](https://gbhackers.com/oceanlotus-targets-stock-investors/) — GBHackers on Security

---
Source: https://cyber.netsecops.io/articles/vietnam-apt-oceanlotus-targets-domestic-firms-spy-campaigns/
