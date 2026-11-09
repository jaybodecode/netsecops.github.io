# Polymarket Loses $2.7M in Supply Chain Attack via DebugBear

**Severity:** high | **Category:** Supply Chain Attack,Cyberattack,Data Breach | **Updated:** 2026-10-30 | **Reading time:** 5 min

The prediction market platform Polymarket suspended trading on October 29, 2026, after a supply chain attack involving a compromised third-party script from DebugBear resulted in approximately $2.71 million in unauthorized withdrawals. Attackers injected malicious JavaScript into DebugBear's Real User Monitoring (RUM) script, allowing them to hijack active user sessions on Polymarket's international site. The malicious code executed trades and transferred funds without stealing user credentials. Polymarket has pledged to reimburse all affected users.

## Executive Summary
On October 29, 2026, the international prediction market **[Polymarket](https://polymarket.com/)** experienced a significant security incident, resulting in the theft of approximately $2.71 million from user accounts. The attack was a sophisticated supply chain compromise originating from a third-party service provider, **[DebugBear](https://www.debugbear.com/)**, a website performance monitoring firm. Attackers injected malicious JavaScript into DebugBear's Real User Monitoring (RUM) script, which was loaded by Polymarket's frontend. This script hijacked active, authenticated user sessions to liquidate positions and exfiltrate funds. Polymarket quickly halted trading, isolated the issue, and has committed to making all affected users whole. The incident highlights the critical risks associated with third-party scripts and the need for robust supply chain security monitoring.

## Threat Overview
The attack began when users of Polymarket.com started reporting unauthorized withdrawals from their accounts. The investigation traced the root cause to a malicious update to a JavaScript file served by DebugBear. This script, intended for performance monitoring, was altered to include code that specifically targeted Polymarket users.

- **Attack Vector**: The primary vector was a **[Supply Chain Attack](https://en.wikipedia.org/wiki/Software_supply_chain)** ([`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/)). The attackers did not breach Polymarket directly but instead compromised one of its upstream dependencies.
- **Mechanism**: The malicious script executed within the context of a user's authenticated browser session. It did not steal passwords or private keys. Instead, it used the existing session's authority to interact with the platform's trading functions, selling off user positions and transferring the resulting funds to attacker-controlled wallets.
- **Attribution**: The threat actors behind the compromise of DebugBear and the subsequent attack on Polymarket remain unidentified.

## Technical Analysis
The attack's sophistication lies in its ability to abuse trust and functionality rather than brute-forcing access. The malicious JavaScript was designed to be stealthy and effective.

1.  **Compromise**: The attackers first gained access to DebugBear's infrastructure, allowing them to modify the RUM script.
2.  **Injection**: A malicious payload was prepended or embedded within the legitimate `rum.js` script.
3.  **Execution**: When a logged-in Polymarket user loaded the page, their browser fetched and executed the compromised script.
4.  **Action on Objectives**: The script would detect the active session, access the trading portfolio, and programmatically execute sell orders or transfer tokens. This is a form of session hijacking, leveraging the trust the Polymarket application had in the user's browser session.

### MITRE ATT&CK Techniques
- [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/): The core of the attack involved compromising a third-party software provider (DebugBear) to distribute malicious code.
- [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/): Malicious JavaScript was the payload used to carry out the unauthorized actions.
- [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/): Users were compromised simply by visiting the legitimate Polymarket website, which loaded the malicious third-party script.
- [`T1496 - Resource Hijacking`](https://attack.mitre.org/techniques/T1496/): The attack hijacked the user's session and financial resources (account funds) for the attacker's benefit.

## Impact Assessment
The direct financial impact was the theft of approximately $2.71 million, as reported by blockchain security firm GoPlus. Polymarket's swift response to halt trading likely prevented further losses. The reputational damage to both Polymarket and DebugBear is significant. For Polymarket, it raises questions about its vendor risk management processes. For DebugBear, it severely undermines the trustworthiness of its service. Polymarket's promise to fully reimburse victims will mitigate some user-facing financial harm but represents a substantial cost to the company.

## IOCs — Directly from Articles
No specific file hashes, domains, or IP addresses were mentioned in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity:
| Type | Value | Description | Context |
|---|---|---|---|
| `url_pattern` | `*/rum.js` | The compromised script from DebugBear. Monitoring for unexpected changes is key. | File Integrity Monitoring, Web Proxy Logs |
| `network_traffic_pattern` | Outbound connections from client browsers to unexpected crypto wallets/exchanges. | The malicious script would initiate fund transfers. | Network Security Monitoring, EDR |
| `string_pattern` | `sell_position`, `transfer_funds` | API calls or function names within JavaScript that might be used maliciously. | Source Code Analysis, Dynamic Analysis |

## Detection & Response
Detecting this type of attack is challenging as it leverages legitimate, trusted channels.

- **Detection**: Implementing **Subresource Integrity (SRI)** is a primary defense. SRI allows a website to verify that a third-party script has not been tampered with by checking its hash. Monitoring for changes in the behavior of third-party scripts, such as new network connections or unexpected DOM manipulation, can also provide signals. D3FEND techniques like [`D3-WSAA: Web Session Activity Analysis`](https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis) are critical for spotting anomalous in-session behavior.
- **Response**: Polymarket's response was appropriate: they quickly identified the issue, halted operations to prevent further damage, removed the compromised dependency, and communicated transparently with users. DebugBear advised all customers to immediately remove the RUM script snippet from their sites.

## Mitigation
- **Subresource Integrity (SRI)**: This is the most direct technical control. Websites should include an `integrity` attribute in their `<script>` tags for all third-party resources. This ensures the browser only executes the script if it matches a known, trusted hash.
- **Content Security Policy (CSP)**: A strict CSP can limit the domains from which scripts can be loaded and to which network requests can be made, potentially blocking the exfiltration step.
- **Vendor Risk Management**: Organizations must rigorously vet third-party code and services. This includes reviewing their security practices and having contractual obligations for security incidents.
- **Sandboxing**: Where possible, third-party scripts should be run in a sandboxed environment (e.g., an iframe with restricted permissions) to limit their access to the main application's data and functions. This aligns with D3FEND's [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).

**Tags:** supply chain attack, cryptocurrency, session hijacking, javascript, RUM, web security

## Sources
- [Polymarket Halts Trading After Supply Chain Attack Siphons Millions](https://www.securityweek.com/2-million-drained-from-polymarket-traders-in-new-supply-chain-attack/) — SecurityWeek (2026-10-30)

---
Source: https://cyber.netsecops.io/articles/polymarket-halts-trading-after-supply-chain-attack-siphons-millions/
