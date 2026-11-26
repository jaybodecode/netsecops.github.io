# Optimizely Supply-Chain Attack Injects Malicious Code into 178 Major Websites

**Severity:** high | **Category:** Supply Chain Attack,Cyberattack,Malware | **Updated:** 2026-11-17 | **Reading time:** 6 min

A large-scale supply-chain attack compromised 178 organizations, including the BBC, CNN, and Zoom, by injecting malicious JavaScript via the Optimizely web experimentation platform. The malware, served from Optimizely's own CDN, was designed to skim payment card details, steal cryptocurrency, and deliver exploits to iPhones. The incident highlights the significant risks posed by third-party service compromises, allowing attackers to target visitors of trusted, high-traffic websites.

## Executive Summary
On November 16, 2026, a sophisticated supply-chain attack was discovered, affecting 178 globally recognized organizations. Threat actors compromised the **[Optimizely](https://www.optimizely.com/)** Web experimentation platform to inject malicious JavaScript into the websites of major brands like **[CNN](https://www.cnn.com)**, **[BBC](https://www.bbc.co.uk/)**, **[Zoom](https://zoom.us/)**, and **[Salesforce](https://www.salesforce.com/)**. The malware was a multi-purpose toolkit capable of stealing financial information, hijacking cryptocurrency transactions, and deploying exploit kits against vulnerable mobile devices. The attack leveraged the trust placed in third-party scripts, demonstrating a critical vector for widespread compromise. While remediation efforts were swift, the incident exposed thousands of users to data theft and further infection.

---

## Threat Overview
The attack was not a direct breach of the 178 affected companies but a compromise of a shared third-party service, Optimizely. Attackers exploited a weakness in Optimizely's platform to add malicious JavaScript to the projects of their customers. This script was then served to website visitors from Optimizely's legitimate content delivery network (CDN) at `cdn.optimizely.com`, making it difficult to block without disrupting legitimate site functionality. 

Once a visitor's browser loaded an affected page, the malicious script would execute and connect to an attacker-controlled domain, `1688360[.]cc/track.js`, to fetch the primary payload. This payload was a versatile malware with three main functions:
1.  **Payment Card Skimming**: It acted as a web skimmer, capturing credit card details entered into payment forms.
2.  **Cryptocurrency Theft**: It functioned as a crypto clipper, replacing cryptocurrency wallet addresses on webpages and in the user's clipboard with addresses controlled by the attackers. It targeted Bitcoin, Ethereum, Solana, and other popular cryptocurrencies.
3.  **Exploit Delivery**: It delivered exploit kits named **Coruna** and **DarkSword**, which targeted vulnerabilities in older, unpatched versions of iOS and iPadOS.

The attack timeline shows rapid execution, with the malicious script being injected and activated on major sites like bbc.com within a few hours on November 16.

---

## Technical Analysis
The attack chain began with the compromise of customer accounts on the Optimizely platform. The threat actors used this access to inject a malicious script loader into the target websites' Optimizely snippets. This loader was often obfuscated using Base64 encoding to evade initial detection.

The loader's primary function was to fetch the main payload from `1688360[.]cc/track.js`. This external script contained the logic for the skimming, crypto clipping, and exploit delivery operations. The use of a legitimate, trusted CDN for the initial script delivery is a key element of this supply-chain attack, falling under **[MITRE ATT&CK](https://attack.mitre.org/)** technique [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) by abusing the functionality of the Optimizely service.

The subsequent loading of malware onto the visitor's browser is a classic [`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/). The malware itself used [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/) for execution within the browser context. Data theft, including payment card information and cookies, aligns with [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/). The cryptocurrency address swapping is a form of `T1565.002 - Transmitted Data Manipulation`.

---

## Impact Assessment
The business impact of this attack is multi-faceted. For the 178 affected organizations, the primary damage is reputational. Having their websites serve malware erodes customer trust, even if their own servers were not breached. Companies like Salesforce and Equifax had to temporarily disable Optimizely scripts, potentially impacting their marketing and A/B testing operations. 

For end-users who visited the compromised sites, the impact is more direct. They face the risk of financial loss from stolen credit card details and hijacked cryptocurrency payments. The attack reportedly netted the criminals over $7,000 in cryptocurrency in a short period. Furthermore, users with outdated iOS or iPadOS devices were at risk of full device compromise from the **Coruna** and **DarkSword** exploit kits. This could lead to the theft of sensitive personal data, account credentials, and further malware installation.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| Domain | `1688360[.]cc` | Attacker-controlled domain hosting the malicious payload. |
| URL | `1688360[.]cc/track.js` | Malicious JavaScript payload. |
| Domain | `cdn.optimizely.com` | Legitimate CDN used to serve the initial compromised script. |

---

## Cyber Observables — Hunting Hints
Security teams may want to hunt for the following patterns to detect similar activity:
| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| url_pattern | `track.js` | The filename of the main malicious payload. | Web proxy logs, DNS query logs. | high |
| network_traffic_pattern | Outbound connections to `1688360[.]cc` | Network traffic to the known malicious C2 domain. | Firewall logs, NetFlow, SIEM. | high |
| command_line_pattern | `base64 -d` | The malware used Base64 encoding to hide the attacker's domain. | EDR logs, command-line logging. | medium |
| file_name | `*.js` | Monitor for newly added or modified JavaScript files served by third-party marketing/analytics tools. | File Integrity Monitoring on web servers, code repository scanning. | medium |

---

## Detection & Response
Detecting this type of attack requires monitoring the integrity and behavior of third-party scripts loaded on web properties.

1.  **Content Security Policy (CSP)**: Implement a strict CSP to control which domains can execute scripts on your site. This can prevent malicious scripts from unapproved sources from running. This is a D3FEND `D3-ITF: Inbound Traffic Filtering` countermeasure.
2.  **Subresource Integrity (SRI)**: Use SRI for all third-party scripts. This ensures that the browser only loads a script if its content hash matches a predefined value, preventing the execution of modified or malicious versions.
3.  **Network Monitoring**: Monitor outbound network traffic from client browsers (via proxy logs) for connections to known malicious domains or newly observed, suspicious domains. D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is key here.
4.  **Client-Side Security Solutions**: Deploy solutions that specialize in monitoring client-side JavaScript execution in real-time to detect anomalous behavior like data skimming or redirection.

For response, if a compromise is suspected, immediately disable the integration with the compromised third-party service. Isolate affected web properties and begin an investigation to determine the scope of the compromise and which users were impacted.

---

## Mitigation
Preventing supply-chain attacks that abuse third-party scripts requires a defense-in-depth approach.

- **Vendor Risk Management**: Regularly assess the security posture of all third-party vendors, especially those that provide scripts or services integrated into your web properties. This falls under the D3FEND `Harden` category.
- **Restrict Web-Based Content** ([`M1021`](https://attack.mitre.org/mitigations/M1021/)): Use technical controls like CSP and SRI as a primary defense. This is a critical hardening step.
- **Software Updates**: End-users should ensure their browsers and operating systems (especially iOS and iPadOS) are always up to date to protect against exploit kits. This aligns with MITRE Mitigation [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
- **Principle of Least Privilege**: When integrating third-party services, grant them the minimum permissions necessary to function. Avoid giving them overly broad access to modify site content.
- **Regular Audits** ([`M1047`](https://attack.mitre.org/mitigations/M1047/)): Periodically audit all external scripts running on your websites to identify any unauthorized or modified code.

**Tags:** Supply Chain Attack, JavaScript, Magecart, Optimizely, Web Skimming, Cryptocurrency Theft, iOS

## Sources
- [CNN, BBC, Zoom and other sites served malicious code in supply chain attack](https://www.malwarebytes.com/blog/news/2026/11/cnn-bbc-zoom-and-other-sites-served-malicious-code-in-supply-chain-attack) — Malwarebytes (2026-11-16)
- [Cyberattack Hits 178 Organizations; Google Says The Era of Autonomous Attacks Has Arrived!](https://www.tradingview.com/news/coinpedia:1c8c9999d094b:0-cyberattack-hits-178-organizations-google-says-the-era-of-autonomous-attacks-has-arrived/) — TradingView (2026-11-16)
- [Cyberattack hits 178 websites including CNN, BBC, Fox News and Zoom. iPhone users also targeted](https://www.livemint.com/technology/tech-news/cyberattack-hits-178-websites-including-cnn-bbc-fox-news-and-zoom-iphone-users-also-targeted-11794907274632.html) — Livemint (2026-11-17)
- [Cyber Attack on Major Websites: Full List of Companies Affected](https://www.newsweek.com/cyber-attack-websites-affected-12725863) — Newsweek (2026-11-17)
- [World's largest brands infected with malware via Optimizely](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/) — Report URI (2026-11-16)

---
Source: https://cyber.netsecops.io/articles/optimizely-supply-chain-attack-hits-cnn-bbc-zoom/
