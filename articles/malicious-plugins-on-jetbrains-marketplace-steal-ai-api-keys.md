# Supply Chain Attack: Malicious JetBrains Plugins Steal AI Provider API Keys from Developers

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-06-19 | **Reading time:** 5 min

A software supply chain attack on the JetBrains Marketplace has been uncovered, involving at least 15 malicious plugins that masqueraded as legitimate AI coding assistants to steal API keys. Active since October 2025, the plugins exfiltrated credentials for services like OpenAI, Anthropic, and Google AI from developers' IDEs. The malware, which had tens of thousands of downloads, sent the stolen keys in plaintext to an attacker-controlled server. JetBrains has since removed the plugins, blocked the publisher, and remotely disabled the malware in affected IDEs, while also planning to enhance its plugin vetting process.

## Executive Summary
A significant software supply chain attack has been identified on the **[JetBrains](https://www.jetbrains.com/)** Marketplace, where at least 15 malicious plugins were found stealing sensitive API keys from developers. These plugins, disguised as AI coding assistants, were downloaded by an estimated 70,000 users. Active since at least October 2025, the plugins covertly exfiltrated API keys for major AI services like **[OpenAI](https://openai.com/)**, Anthropic, and **[Google](https://www.google.com/)** AI. The stolen credentials were sent over unencrypted HTTP to a hardcoded command-and-control (C2) server. In response to the discovery by Aikido Security, JetBrains has taken down the malicious plugins, banned the publisher, and is working to improve its marketplace security. This incident highlights the growing risk of supply chain attacks targeting the developer ecosystem.

## Threat Overview
The attack leveraged the trust developers place in the JetBrains Marketplace ecosystem. The threat actor published 15 plugins with names designed to mimic legitimate AI tools, such as 'CodeGPT AI Assistant' and 'DeepSeek AI Assist'. The attack flow was as follows:
1.  **Deceptive Lure:** The plugins provided their advertised functionality, lulling developers into a false sense of security.
2.  **Credential Entry:** The developer would enter their personal or corporate API key for an AI service (e.g., OpenAI) into the plugin's settings within their IDE (e.g., IntelliJ IDEA, PyCharm).
3.  **Exfiltration:** Upon saving the settings, the plugin would immediately send the API key in a plaintext JSON payload via an unencrypted HTTP POST request to the C2 server at `39.107.60[.]51`.
4.  **Evasion:** To bypass security warnings, some plugins installed a custom trust manager to suppress TLS certificate validation errors, indicating a degree of sophistication.

Researchers also found evidence that the attackers may have been monetizing the stolen keys by reselling access to the AI services through their own plugins.

## Technical Analysis
This attack is a classic example of a trojanized software supply chain attack. By compromising a trusted distribution channel (JetBrains Marketplace), the attackers gained direct access to the developer's local environment. The use of unencrypted HTTP for exfiltration is simple yet effective, as outbound port 80 traffic is often permitted in corporate environments.

The most concerning technical aspect is the direct targeting of developer credentials. Stolen AI API keys can lead to significant financial loss through fraudulent usage, as well as the potential for corporate espionage if the keys provide access to proprietary models or data.

### MITRE ATT&CK Techniques:
- **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/):** The core of the attack, involving the distribution of malicious code through a legitimate software marketplace.
- **[`T1555.005 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/005/):** The plugins acted as a malicious password store, tricking users into entering credentials which were then stolen.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** The use of HTTP for C2 communication and data exfiltration.
- **[`T1552.006 - Stored Plaintext Passwords`](https://attack.mitre.org/techniques/T1552/006/):** The malware exfiltrated the API keys in plaintext, a severe security anti-pattern.
- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** While not the primary vector, the plugins themselves act as a form of social engineering lure.

## Impact Assessment
The impact on affected developers and their employers can be substantial:
- **Financial Loss:** Attackers can use the stolen API keys to rack up enormous bills on AI service accounts, with costs potentially running into thousands of dollars per day.
- **Data Leakage:** If the API keys provided access to fine-tuned models or proprietary datasets hosted on AI platforms, this could lead to a major intellectual property breach.
- **Loss of Trust:** This incident erodes trust in the security of third-party developer tools and marketplaces, potentially slowing down development workflows as organizations implement stricter vetting.
- **Further Compromise:** Stolen keys could be used to interact with internal company services that are integrated with the AI provider, potentially leading to further network intrusion.

## IOCs — Directly from Articles
| Type          | Value         | Description      |
|---------------|---------------|------------------|
| IP Address    | `39.107.60.51`  | C2 Server        |

## Cyber Observables — Hunting Hints
Security teams should hunt for the following to identify potential compromise:
- **Log Source:** Firewall logs, Proxy logs, DNS logs.
- **Observable:** Any outbound network connections from developer workstations or build servers to the IP address `39.107.60[.]51`.
- **Observable:** Unencrypted HTTP POST requests to unknown IP addresses originating from Java processes (`java.exe`), which power JetBrains IDEs.
- **Observable:** Review installed plugins on developer machines for any of the 15 malicious plugins (a full list may be available from JetBrains or Aikido Security).

## Detection & Response
- **Network Monitoring:** Block the C2 IP address `39.107.60[.]51` at the network perimeter. Monitor for any historical connections to this IP.
- **Credential Rotation:** Any developer who used one of the malicious plugins must immediately revoke the compromised API key from the respective AI service provider (OpenAI, Google AI, etc.) and generate a new one.
- **Audit Usage:** Review billing and usage logs from AI service providers for any anomalous activity or unexpected cost spikes.
- **Plugin Audit:** Conduct an audit of all third-party plugins installed in developer IDEs across the organization. Remove any non-essential or unvetted plugins.
- **D3FEND Techniques:** Employ [`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering) to block connections to known-bad IPs and [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) on proxy logs to spot suspicious connections.

## Mitigation
1.  **Plugin Vetting:** Establish a corporate policy for vetting and approving third-party IDE plugins. Maintain an internal allowlist of trusted plugins.
2.  **Principle of Least Privilege:** When generating API keys, grant them the minimum scope of permissions necessary for their function. Use short-lived keys for development and testing where possible.
3.  **Secrets Management:** Avoid storing API keys directly in IDE settings. Use a dedicated secrets management solution (e.g., HashiCorp Vault, AWS Secrets Manager) and have the IDE retrieve them at runtime.
4.  **Network Egress Filtering:** Implement stricter egress filtering rules for developer environments, denying outbound connections by default and only allowing traffic to approved services and domains.
5.  **Developer Education:** Train developers on the risks of third-party plugins and the importance of verifying the publisher and permissions before installation.

**Tags:** JetBrains, Supply Chain Attack, API Keys, Malware, OpenAI, DevSecOps, IDE

## Sources
- [Top 5 Cybersecurity News Stories June 19, 2026](https://diesec.com/2026/06/top-5-cybersecurity-news-stories-june-19-2026/) — DieSec (2026-06-19)
- [JetBrains plug-ins steal API keys from AI services](https://www.techzine.eu/news/devops/142221/jetbrains-plug-ins-steal-api-keys-from-ai-services/) — Techzine (2026-06-18)
- [JetBrains Marketplace Ecosystem Security Update: Addressing Malicious Third-Party AI Plugins](https://blog.jetbrains.com/platform/2026/06/marketplace-ecosystem-security-update-malicious-ai-plugins/) — JetBrains (2026-06-18)
- [Attackers Exploit JetBrains Plugins To Steal AI Provider Keys](https://www.opensourceforu.com/2026/06/attackers-exploit-jetbrains-plugins-to-steal-ai-provider-keys/) — Open Source For U (2026-06-19)

---
Source: https://cyber.netsecops.io/articles/malicious-plugins-on-jetbrains-marketplace-steal-ai-api-keys/
