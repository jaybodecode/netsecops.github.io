# Phishing Campaign Abuses NPM and UNPKG CDN to Steal Credentials

**Severity:** medium | **Category:** Phishing,Supply Chain Attack,Malware | **Updated:** 2025-10-06 | **Reading time:** 4 min

A sophisticated phishing campaign, dubbed "Beamglea," is abusing the public NPM registry and the trusted unpkg.com CDN to host and deliver credential-stealing malware. Researchers at Socket discovered over 175 malicious, disposable NPM packages created solely to serve a malicious JavaScript file. Attackers send HTML lures to victims that load the script from the reputable unpkg.com domain, bypassing traditional domain-based security filters. This technique, which has targeted over 135 organizations in Europe, represents a dangerous evolution in supply chain abuse, turning developer infrastructure into a tool for direct phishing attacks.

## Executive Summary
A novel and alarming phishing technique has been identified that repurposes trusted software supply chain infrastructure for credential theft. Dubbed the "Beamglea" campaign, threat actors are publishing hundreds of disposable packages to the **[NPM](https://www.npmjs.com/)** registry, not to infect developer builds, but to abuse the **unpkg.com** Content Delivery Network (CDN). By embedding a script tag in an HTML lure that points to a malicious JavaScript file hosted on the trusted `unpkg.com` domain, attackers can bypass email gateways and browser security controls that block unknown or suspicious domains. This ecosystem-level abuse has already targeted over 135 organizations, primarily in Europe, marking a significant shift in how threat actors leverage open-source platforms.

---

## Threat Overview
The attack, discovered by researchers at Socket and Snyk, does not follow the typical supply chain attack pattern of poisoning a dependency. Instead, it uses the supply chain as a delivery mechanism for a classic phishing attack. The attackers publish numerous small, randomly named packages (e.g., `redirect-[a-z0-9]{6}`) to NPM. Each package contains a malicious JavaScript file, `beamglea.js`. The unpkg.com CDN, which automatically mirrors all public NPM packages, then makes this malicious file available over HTTPS from its trusted domain. The attackers send targets an HTML file attachment, which, when opened, executes the script from `unpkg.com`. The script then redirects the user to an attacker-controlled phishing page, pre-filling the victim's email address to enhance the lure's legitimacy.

## Technical Analysis
The campaign's effectiveness lies in its clever abuse of legitimate services:

- **Infrastructure Abuse ([`T1584 - Compromise Infrastructure`](https://attack.mitre.org/techniques/T1584/)):** The threat actors are not compromising NPM or unpkg, but are abusing their intended functionality. They use NPM as free, anonymous hosting and unpkg as a free, trusted CDN.
- **Phishing ([`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/)):** The initial vector is a business-themed email with an HTML attachment. This avoids direct links in the email body that might be scanned.
- **Trusted Domain for Payload Delivery:** The core of the technique is the `<script>` tag within the HTML file pointing to the malicious `beamglea.js` file on `unpkg.com`. Since `unpkg.com` is a legitimate and widely used service, it is highly unlikely to be on any blocklist, allowing the payload to be fetched and executed.
- **Credential Theft:** The executed JavaScript redirects the browser to a phishing landing page designed to harvest user credentials (e.g., for Microsoft 365, Google Workspace).
- **Reconnaissance ([`T1592 - Gather Victim Host Information`](https://attack.mitre.org/techniques/T1592/)):** The script pre-fills the victim's email on the phishing page, a simple but effective social engineering trick to lower the victim's guard.

## Impact Assessment
This technique poses a significant threat to organizations for several reasons:
- **Bypasses Security Controls:** It effectively neutralizes security solutions that rely on domain reputation and blocklists, as the malicious payload is delivered from a trusted source.
- **Scalability and Anonymity:** The use of disposable NPM packages allows attackers to quickly rotate their infrastructure at no cost, making takedowns difficult.
- **Erosion of Trust:** This abuse of critical open-source infrastructure erodes trust in the ecosystem and forces security teams to reconsider which services they implicitly trust.
- **Targeted Attacks:** The campaign has been observed targeting specific organizations in the technology, industrial, and energy sectors, indicating a degree of targeting beyond opportunistic phishing.

## Cyber Observables for Detection
Detection focuses on the local execution of the HTML lure and the subsequent network traffic.

| Type | Value | Description |
|---|---|---|
| file_name | `beamglea.js` | The name of the malicious JavaScript payload. |
| url_pattern | `unpkg.com/redirect-[a-z0-9]{6}/` | The URL pattern used to fetch the malicious script from the CDN. |
| command_line_pattern | `*.html` | Monitor for local execution of HTML files opened from email attachments. |
| network_traffic_pattern | Browser process making a connection to unpkg.com immediately followed by a redirect to an unknown/uncategorized domain. | This sequence of events is highly suspicious. |

## Detection & Response
- **Email Gateway Configuration:** Configure email gateways to block or quarantine HTML attachments, or to strip active script content from them. This is a high-fidelity way to block this initial vector.
- **Endpoint Monitoring:** Use EDR to monitor for browser processes that are spawned to open local HTML files, especially those originating from an email client's attachment directory. Alert on this behavior.
- **Proxy Log Analysis:** Analyze web proxy logs for connections to `unpkg.com` that match the `redirect-*` package pattern. While unpkg is legitimate, this specific pattern is indicative of the Beamglea campaign.
- **D3FEND Techniques:** Implement [`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering) at the email gateway to block HTML attachments. Use [`D3-UA: URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) on traffic to detect redirects to known phishing infrastructure following a connection to unpkg.

## Mitigation
- **User Training:** Educate users about the dangers of opening HTML attachments from external sources, even if they appear to be simple documents.
- **Browser Security:** Deploy browser isolation technologies that can open attachments in a sandboxed environment, preventing any malicious scripts from accessing the local system or internal network.
- **Content Disarm and Reconstruction (CDR):** Use a CDR solution at the email gateway to automatically strip all active content (like JavaScript) from HTML attachments, rendering them inert.
- **Supply Chain Security (Vendor Side):** For services like NPM and unpkg, implementing more robust detection for disposable, suspicious packages and rate-limiting new account publications could help mitigate this abuse.
- **D3FEND Countermeasures:** The most effective countermeasure is [`D3-EDL: Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting) applied to email attachments, where policies are set to block potentially active content like `.html` and `.js` files from untrusted senders.

**Tags:** Phishing, Supply Chain Attack, NPM, CDN Abuse, Credential Theft

## Sources
- [Massive NPM Supply-Chain Attack Infects Developers During Package Installs](https://socket.dev/blog/massive-npm-supply-chain-attack-infects-developers-during-package-installs) — Socket (2025-10-05)
- [Phishing Campaign Leverages NPM and UNPKG CDN for Credential Theft](https://snyk.io/blog/npm-unpkg-supply-chain-phishing/) — Snyk (2025-10-06)

---
Source: https://cyber.netsecops.io/articles/novel-phishing-attack-abuses-npm-and-unpkg-cdn-for-credential-theft/
