# Adware with Fangs: 25,000 Systems Exposed to $10 Supply Chain Hijack by Dragon Boss Solutions

**Severity:** critical | **Category:** Supply Chain Attack,Malware,Threat Intelligence | **Updated:** 2026-04-15 | **Reading time:** 4 min

Security firm Huntress has exposed a dangerous operation where adware signed by 'Dragon Boss Solutions' went far beyond typical potentially unwanted programs (PUPs). The software, found on over 25,000 endpoints, used SYSTEM privileges to disable antivirus products and establish persistence. Critically, it used an unregistered domain for updates, `chromsterabrowser[.]com`, which could have been purchased for $10 by any attacker to push ransomware or other malware to all infected systems, including those in government, healthcare, and critical infrastructure networks. Huntress defensively registered the domain to prevent a widespread supply chain attack.

## Executive Summary
Researchers at **[Huntress](https://www.huntress.com/blog)** have uncovered a high-risk threat masquerading as a common adware or Potentially Unwanted Program (PUP). The software, digitally signed by a UAE-based entity named **Dragon Boss Solutions**, was installed on at least 25,000 systems across 124 countries. While initially appearing as a simple browser hijacker, its capabilities evolved to include aggressive defense evasion techniques. Using a PowerShell payload with SYSTEM privileges, the software systematically disabled security products, blocked their update servers, and established persistence. The most alarming discovery was a critical flaw in its update mechanism: the software attempted to fetch updates from `chromsterabrowser[.]com`, a domain that was unregistered. This created a trivial but catastrophic supply chain risk, as any malicious actor could have registered the domain for about $10 and delivered malware to the entire botnet, which included universities, government agencies, and OT networks.

---

## Threat Overview
The operation demonstrates a dangerous evolution from adware to a potent backdoor. The software, once installed, executed a series of malicious actions to entrench itself on the host and eliminate security controls.

**Key TTPs:**
1.  **Defense Evasion:** A PowerShell script with `SYSTEM` privileges was used to disable a wide range of cybersecurity products. It would terminate their processes, modify the `hosts` file to block communication with update and telemetry servers, and delete registry keys to prevent reinstallation.
2.  **Persistence:** The malware established persistence through multiple methods, including Windows Management Instrumentation (WMI) event subscriptions and scheduled tasks, ensuring it would survive reboots and removal attempts.
3.  **Supply Chain Vulnerability:** The core of the threat lay in its insecure update process. The hardcoded update domain, `chromsterabrowser[.]com`, was not registered by the developers. This is a classic example of a dangling domain/subdomain takeover vulnerability. An attacker could simply purchase the domain and configure it to serve a malicious payload in response to the update check-in requests from all 25,000+ infected hosts.

## Impact Assessment
Huntress's quick action in registering the domain and sinkholing the traffic prevented a potentially devastating attack. The scale of the infection was vast, with 23,565 unique IPs connecting to the sinkhole in just 24 hours. The compromised hosts were not just consumer devices; the analysis identified numerous high-value targets:
- **221** Universities and colleges
- **41** Operational Technology (OT) networks (including electric utilities)
- **35** Government entities
- **3** Healthcare organizations

A successful supply chain hijack could have led to widespread ransomware deployment, data theft, or espionage across sensitive sectors. The fact that the adware had already disabled local security tools means that any follow-on attack would have had a very high chance of success.

## IOCs
| Type | Value | Description |
|---|---|---|
| domain | `chromsterabrowser[.]com` | Unregistered update domain used by the malware. Now sinkholed by Huntress. |
| domain | `worldwidewebframework3[.]com` | Another C2 domain associated with the campaign. |

## Detection and Response
- **Check for IOCs:** Scan network logs for any connections to the domains listed above. Search file systems and registry for artifacts related to Dragon Boss Solutions software.
- **Review Disabled Services:** On endpoints, check for disabled or non-functioning antivirus and EDR services. Investigate any unauthorized modifications to the `hosts` file (located at `C:\Windows\System32\drivers\etc\hosts`).
- **Hunt for Persistence:** Use tools to inspect WMI event subscriptions and scheduled tasks for suspicious entries created by the adware.
- **Remove the PUP:** If the software is detected, a thorough removal is required, which may involve manual deletion of files, registry keys, and persistence mechanisms, followed by the re-installation of security tools.

## Mitigation
- **Application Allowlisting:** Implement application control policies to prevent the execution of unauthorized or untrusted software, including PUPs and adware.
- **PowerShell Logging:** Enable enhanced PowerShell logging (Module Logging, Script Block Logging) to capture and analyze the execution of potentially malicious scripts.
- **DNS Sinkholing:** Organizations can proactively sinkhole suspicious or known-bad domains at their own DNS resolvers to prevent connections.
- **Supply Chain Scrutiny:** This incident serves as a reminder that even seemingly low-risk software can introduce significant supply chain vulnerabilities. Vet all software, even if it is digitally signed.

**Tags:** Adware, Supply Chain Attack, Huntress, Dragon Boss Solutions, PUP, PowerShell, Defense Evasion

## Sources
- [$10 Domain Could Have Handed Hackers 25k Endpoints, Including in OT and Gov Networks](https://www.securityweek.com/10-domain-could-have-handed-hackers-25k-endpoints-including-in-ot-and-gov-networks/) — SecurityWeek
- [When PUPs Grow Fangs: Dragon Boss Solutions' $10 Supply Chain Risk](https://www.huntress.com/blog/pups-grow-fangs-dragon-boss-solutions-supply-chain-risk) — Huntress
- [Trusted adware app left 25,000+ systems open to a $10 supply-chain hijack](https://cybernews.com/security/trusted-adware-app-left-25000-systems-open-to-a-10-supply-chain-hijack/) — Cybernews
- [Adware Campaign Exposes 25,000 Endpoints to Supply Chain Hijack](https://www.infosecurity-magazine.com/news/adware-exposes-25000-endpoints/) — Infosecurity Magazine

---
Source: https://cyber.netsecops.io/articles/huntress-uncovers-adware-campaign-exposing-25000-systems-to-supply-chain-attack/
