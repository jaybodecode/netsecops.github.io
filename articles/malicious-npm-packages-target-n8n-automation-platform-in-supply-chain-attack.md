# Supply Chain Attack: Malicious npm Packages Steal Credentials from n8n Automation Platform

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cloud Security | **Updated:** 2026-01-12 | **Reading time:** 5 min

A novel supply chain attack discovered by Endor Labs is targeting users of the n8n workflow automation platform. Attackers are publishing malicious packages to the npm registry, disguised as legitimate 'community nodes' for popular services. When an unsuspecting user installs one of these nodes and enters their credentials (e.g., OAuth tokens, API keys), the malicious code exfiltrates the entire credential store from the n8n instance to an attacker-controlled server. This gives the attackers access to all services connected to the victim's n8n workflows, such as Salesforce and Stripe, creating a significant risk of widespread data breaches and financial fraud.

## Executive Summary

Security researchers at **[Endor Labs](https://www.endorlabs.com/)** have uncovered a sophisticated **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** targeting users of **[n8n](https://n8n.io/)**, a popular open-source workflow automation platform. The attack leverages the public **[npm](https://www.npmjs.com/)** registry to distribute malicious packages that masquerade as legitimate 'community nodes' for services like Google Ads. Once installed, these nodes trick users into entering sensitive credentials, which are then exfiltrated along with all other credentials stored within the n8n environment. This attack vector is particularly dangerous because n8n platforms often act as centralized vaults for API keys and tokens to numerous enterprise systems. The lack of sandboxing or a vetting process for community nodes in n8n's architecture allows the malicious code to execute with full trust, giving attackers a powerful gateway into a victim's critical business applications.

## Threat Overview

The attack preys on the trust inherent in the n8n ecosystem. The n8n platform allows users to extend its functionality by installing 'community nodes' from the npm registry. These nodes provide integrations with third-party services.

The attackers' methodology is as follows:
1.  **Creation of Malicious Node**: The attackers create an npm package that appears to be a useful community node for a popular service (e.g., Google Ads).
2.  **Publication to npm**: The package is published to the public npm registry with a deceptive name (e.g., `n8n-nodes-hfgjf-irtuinvcm-lasdqewriit`), often using typosquatting or confusing names to appear legitimate.
3.  **Installation by Victim**: An n8n administrator, seeking to integrate the service, installs the malicious package into their n8n instance.
4.  **Credential Prompt**: The malicious node presents a standard-looking configuration interface, prompting the user to enter their API keys, OAuth tokens, or other credentials for the service.
5.  **Credential Exfiltration**: When the user saves the credentials, the malicious code within the node activates. It not only captures the newly entered credentials but also accesses and decrypts the entire n8n credential store, which contains secrets for all other configured integrations (e.g., **[Salesforce](https://www.salesforce.com/)**, **[Stripe](https://stripe.com/)**). All stolen credentials are then sent to an attacker-controlled command-and-control (C2) server.

This attack vector bypasses traditional endpoint security by targeting the trusted, server-side automation platform itself.

## Technical Analysis

This attack represents an evolution in supply chain threats, moving from targeting individual developer machines to compromising central automation hubs. The core of the vulnerability lies in n8n's architecture, which inherently trusts any installed node.

-   **Initial Access**: The entry point is social engineering, tricking an n8n user into installing a malicious npm package. This aligns with [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/), where the 'drive-by' is the act of installing the package.
-   **Execution**: The malicious JavaScript code within the node is executed by the n8n server's Node.js runtime. Since there is no sandboxing, the code runs with the full permissions of the n8n application.
-   **Credential Access**: The code is specifically designed to access n8n's internal functions for handling credentials. It can read and decrypt all secrets stored in the n8n database, a clear example of [`T1552.001 - Credentials in Files`](https://attack.mitre.org/techniques/T1552/001/) or, more broadly, `T1552 - Unsecured Credentials`.
-   **Exfiltration**: The stolen credentials are exfiltrated over the network to a C2 server controlled by the attacker, mapping to [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/).

The report notes that this campaign is separate from the recently disclosed RCE vulnerability **[CVE-2026-21858](https://nvd.nist.gov/vuln/detail/CVE-2026-21858)**, but the existence of over 100,000 vulnerable n8n servers highlights the large potential attack surface.

## Impact Assessment

The impact of a successful attack is severe. By stealing the entire credential store, attackers gain access to a wide range of an organization's most critical applications. This could lead to:
-   **Major Data Breaches**: Attackers could access and exfiltrate sensitive customer data from CRM systems like Salesforce.
-   **Financial Fraud**: Access to payment platforms like Stripe could allow attackers to process fraudulent transactions or steal financial data.
-   **Further Compromise**: Stolen credentials for cloud providers (AWS, GCP, Azure) or other services could be used to pivot deeper into the victim's network and infrastructure.
-   **Business Disruption**: Attackers could disrupt or manipulate automated business workflows, causing operational chaos.

The attack turns a tool designed for efficiency into a single point of catastrophic failure.

## Detection & Response

-   **Egress Traffic Monitoring**: The most effective detection method is to monitor outbound network traffic from the n8n server. Any connections to unknown or suspicious IP addresses or domains should be investigated immediately. This is an application of **[D3FEND's Outbound Traffic Filtering (D3-OTF)](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)**.
-   **npm Package Auditing**: Before installing any community node, security teams should perform due diligence. Check the package's download statistics, age, publisher reputation, and look for signs of obfuscated code. Use tools like `npm audit` and other open-source scanners to analyze package dependencies.
-   **Credential Usage Auditing**: Monitor the usage of credentials stored in n8n. Look for anomalous activity, such as API calls originating from unexpected IP addresses, which could indicate that the credentials have been stolen and are being used by an attacker. This aligns with **[D3FEND's Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)**.

## Mitigation

-   **Restrict Node Installation**: Implement strict policies on who can install new nodes in n8n and from where. Maintain an internal allowlist of vetted and approved community nodes. This is a form of [`M1033 - Limit Software Installation`](https://attack.mitre.org/mitigations/M1033/).
-   **Network Segmentation**: Isolate the n8n server in a segmented network zone. Use firewall rules to strictly control its outbound network access, only allowing connections to the specific, known API endpoints of the services it needs to integrate with. Deny all other outbound traffic by default. This is a critical use of **[D3FEND's Network Isolation (D3-NI)](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)**.
-   **Use Dedicated Credential Vaults**: Instead of storing all credentials directly in n8n, consider integrating it with a dedicated secrets management solution (e.g., HashiCorp Vault, AWS Secrets Manager). This centralizes credential management and provides better auditing and access control, though the risk of a compromised n8n instance accessing the vault still needs to be managed.

## CVEs
- CVE-2026-21858

**Tags:** n8n, npm, Supply Chain Attack, Credential Theft, Endor Labs, Workflow Automation, CVE-2026-21858

## Sources
- [Malicious npm packages target the n8n automation platform in a supply chain attack](https://www.csoonline.com/article/1310153/malicious-npm-packages-target-the-n8n-automation-platform-in-a-supply-chain-attack.html) — CSO Online (2026-01-12)
- [n8mare on auth street: supply chain attack targets n8n ecosystem | Blog](https://www.endorlabs.com/blog/n8mare-on-auth-street-supply-chain-attack-targets-n8n-ecosystem) — Endor Labs (2026-01-12)

---
Source: https://cyber.netsecops.io/articles/malicious-npm-packages-target-n8n-automation-platform-in-supply-chain-attack/
