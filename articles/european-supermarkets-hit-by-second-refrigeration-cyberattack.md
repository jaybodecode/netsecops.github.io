# European Supermarkets Suffer Second Wave of Refrigeration Cyberattacks

**Severity:** high | **Category:** Cyberattack,Industrial Control Systems,Supply Chain Attack | **Updated:** 2026-11-04 | **Reading time:** 5 min

A coordinated cyberattack on November 2, 2026, targeted supermarket refrigeration systems across at least seven European countries, remotely raising temperatures and causing millions of euros in food spoilage. The attack exploited vulnerabilities in internet-connected controllers from Danfoss and Copeland, echoing a similar incident from three weeks prior. This second wave suggests a deliberate campaign to disrupt the European food supply chain, with authorities investigating the incidents as a serious threat to economic stability and consumer confidence.

## Executive Summary
On November 2, 2026, a second wave of coordinated cyberattacks targeted supermarket refrigeration systems across Europe, impacting retailers in at least seven countries including Belgium, Estonia, Ireland, and Sweden. Attackers remotely manipulated internet-connected refrigeration controllers, primarily from vendors **[Danfoss](https://www.danfoss.com/)** and Copeland, forcing them into a defrost mode or raising temperatures to as high as 50°C (122°F). This resulted in widespread food spoilage and significant financial losses, estimated in the tens of millions of euros. The incident mirrors a previous attack on French supermarkets, indicating a persistent campaign targeting the food supply chain. The vulnerability appears to stem from outdated software and the use of default credentials on insecure networks.

## Threat Overview
The attack was a large-scale, synchronized event affecting major supermarket chains such as Ahold Delhaize, Carrefour, and ICA. The threat actors demonstrated a clear understanding of industrial control systems (ICS) used in the retail food sector. By targeting refrigeration controllers, they were able to cause direct physical damage—the destruction of perishable goods—through purely digital means. The attack vector likely involved scanning the public internet for exposed control systems and exploiting known vulnerabilities or weak credentials. The recurrence of this attack highlights a failure to remediate known issues after the initial incident in France, underscoring the challenges of securing operational technology (OT) in distributed environments.

## Technical Analysis
The attackers specifically targeted internet-accessible refrigeration controllers. The primary TTPs appear to be:
- **Initial Access:** [`T0865 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T0865/). The attackers likely scanned for and exploited vulnerabilities in the web interfaces of Danfoss and Copeland controllers exposed to the internet.
- **Initial Access:** [`T0886 - Valid Accounts`](https://attack.mitre.org/techniques/T0886/). A Danfoss spokesperson noted that systems with default passwords were at risk, suggesting attackers used brute-force or credential stuffing with default credentials.
- **Execution:** [`T0854 - Program Download`](https://attack.mitre.org/techniques/T0854/) or similar remote command execution on the controller's firmware to alter settings.
- **Impact:** [`T0822 - Inhibit Response Function`](https://attack.mitre.org/techniques/T0822/). By forcing the units into defrost mode or setting unsafe temperatures, the attackers inhibited the primary function of the refrigeration system.
- **Impact:** [`T0826 - Loss of Productivity and Revenue`](https://attack.mitre.org/techniques/T0826/). The direct consequence was the spoilage of food, leading to immediate financial loss and store disruption.

No specific malware has been identified, suggesting the attacks may have been carried out using built-in device commands and scripts after gaining unauthorized access.

## Impact Assessment
The financial impact is substantial, with one Belgian butcher reporting a €15,000 loss and total damages across Europe expected to be in the tens of millions of euros, similar to the preceding French attack. Beyond direct financial loss, the attack has a significant operational impact, forcing store closures for cleanup and restocking. Strategically, it erodes consumer confidence in the food supply chain and demonstrates the fragility of critical infrastructure sectors that rely on interconnected OT/ICS devices. The European Commissioner for Agriculture has framed this as a deliberate attempt to destabilize the food supply, elevating it from a simple cybercrime to a matter of economic security.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were mentioned in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity or vulnerable systems:

| Type | Value | Description |
|---|---|---|
| url_pattern | `/login.html` | Default login page for many embedded device web interfaces. |
| network_traffic_pattern | Shodan/Censys queries | Search for exposed Danfoss or Copeland controller models on public scanners. |
| log_source | Firewall/VPN logs | Monitor for unusual inbound connections to ports associated with ICS/OT management (e.g., `80`, `443`, `502`, `20000`). |
| command_line_pattern | `defrost_cycle=true` | Hypothetical command parameter that could be seen in device logs if logging is enabled. |

## Detection & Response
- **Network Monitoring:** Implement robust network traffic analysis ([`D3-NTA`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis)) to detect anomalous connections to OT devices. Alert on any external IP addresses attempting to communicate with refrigeration controllers.
- **Log Analysis:** Centralize and monitor logs from controllers, firewalls, and VPNs. Look for multiple failed login attempts followed by a success, or logins from geographically impossible locations.
- **Configuration Auditing:** Regularly audit controller configurations for unauthorized changes, especially to temperature setpoints or operating modes.
- **Response Plan:** Isolate affected network segments immediately upon detection to prevent lateral movement. Engage with OT/ICS incident response specialists and preserve logs and device state for forensic analysis.

## Mitigation
- **Network Isolation:** The most critical mitigation is to remove ICS/OT devices from the public internet. Place controllers behind a firewall on a segmented, private network. Access should be restricted via a secure VPN with **[Multi-factor Authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication)** ([`D3-MFA`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)).
- **Patch Management:** Apply all security updates provided by Danfoss and other OT vendors immediately. Prioritize patching for internet-facing or critical systems.
- **Credential Hardening:** Change all default passwords on controllers and management systems. Implement a strong, unique password policy for all OT accounts.
- **Vendor Guidance:** Follow the specific security recommendations provided by Danfoss and Copeland following the initial attacks.

**Tags:** ICS, OT Security, Refrigeration, Food Supply Chain, Critical Infrastructure, Europe

## Sources
- [Who is hacking Europe's supermarket fridges and freezers, and why?](https://www.theguardian.com/world/2026/nov/02/supermarket-freezers-across-europe-hit-by-second-suspected-cyber-attack) — The Guardian (2026-11-02)
- [Supermarket Fridges Hacked Across Europe In Second Attack In Weeks](https://www.forbes.com/sites/conormurray/2026/11/02/new-wave-of-refrigerator-cyberattacks-roils-european-supermarkets-everything-is-destroyed/) — Forbes (2026-11-02)
- [Over 100 European Stores Hit as Supermarket Fridge Attacks Return](https://thehackernews.com/2026/11/second-wave-of-cyberattacks-hits.html) — The Hacker News (2026-11-03)
- [cphpost.dk](https://cphpost.dk/2026-11-02/news/round-up/danfoss-cooling-systems-involved-in-new-cyberattacks-on-european-supermarkets/) — CPH Post

---
Source: https://cyber.netsecops.io/articles/european-supermarkets-hit-by-second-refrigeration-cyberattack/
