# Global Coalition Targets 'Bulletproof' Hosting Services Fueling Cybercrime

**Severity:** informational | **Category:** Policy and Compliance,Threat Intelligence,Regulatory | **Updated:** 2025-12-07 | **Reading time:** 4 min

An international coalition of cybersecurity agencies, including the NSA, CISA, and the FBI, has launched a coordinated effort to combat 'bulletproof' hosting (BPH) providers. These services knowingly lease infrastructure to cybercriminals for activities like ransomware and phishing. A new joint advisory urges Internet Service Providers (ISPs) and network defenders to adopt strategies to identify, block, and report these malicious hosts. The guidance focuses on a nuanced approach, including creating high-confidence blocklists and improving 'know your customer' processes, to disrupt the foundational infrastructure of cybercrime.

## Executive Summary

In a significant international effort to disrupt the cybercrime ecosystem, cybersecurity agencies from the United States, United Kingdom, Australia, Canada, the Netherlands, and New Zealand have jointly issued guidance targeting 'bulletproof' hosting (BPH) providers. The advisory, published by the Joint Ransomware Task Force (JRTF), provides actionable recommendations for Internet Service Providers (ISPs), data centers, and network defenders to identify and mitigate the risks posed by these criminal enterprises. BPH providers are a cornerstone of modern cybercrime, knowingly leasing servers and IP addresses to threat actors for malicious operations, including ransomware C2, phishing sites, and botnets, while ignoring abuse complaints. The new guidance aims to make it harder and more expensive for criminals to operate by encouraging a collaborative, multi-faceted approach to dismantling this critical infrastructure.

---

## Policy Details

The joint advisory, titled "Bulletproof Defense: Mitigating Risks from Bulletproof Hosting Providers," was released on November 19, 2025, by a coalition including the **[NSA](https://www.nsa.gov)**, **[CISA](https://www.cisa.gov)**, **[FBI](https://www.fbi.gov)**, and their international counterparts. It defines a BPH provider as an entity that willfully provides infrastructure for malicious activities and resists takedown requests.

The core problem is that BPH providers often operate by reselling infrastructure from legitimate, larger hosting companies. This makes simple IP-based blocking challenging, as it risks impacting legitimate services. Therefore, the guidance advocates for a more intelligence-driven approach.

**Key Recommendations for ISPs and Network Defenders:**
1.  **Develop High-Confidence Lists:** Use threat intelligence feeds, law enforcement data, and internal analysis to create and maintain high-confidence lists of malicious domains, IPs, and ASNs associated with BPH providers.
2.  **Improve Vetting Processes:** Enhance "Know Your Customer" (KYC) and "Know Your Business" (KYB) procedures to identify suspicious clients during onboarding. Red flags include payment in cryptocurrency, use of anonymized contact details, and requests for large blocks of IP space with no clear business purpose.
3.  **Baseline Network Activity:** Monitor for network traffic patterns indicative of malicious hosting, such as "fast flux" DNS, where a domain rapidly cycles through a large number of IP addresses to evade detection.
4.  **Collaborate with Law Enforcement:** Establish clear channels for reporting BPH activity to national and international law enforcement agencies to support coordinated takedown and enforcement actions.

---

## Affected Organizations

The guidance is primarily directed at:
-   **Internet Service Providers (ISPs):** Who are urged to be more proactive in identifying and dropping traffic from malicious sources.
-   **Data Center and Cloud Hosting Providers:** Who are encouraged to strengthen customer vetting and abuse response processes to avoid unwittingly hosting criminal infrastructure.
-   **Network Defenders:** Security teams in all organizations are encouraged to use the guidance to better block and detect traffic to and from BPH providers.

Ultimately, the entire digital ecosystem is affected, as BPH providers are the foundation for a vast range of cyber threats targeting businesses, governments, and individuals.

---

## Impact Assessment

A successful global effort to disrupt BPH providers would have a significant positive impact on cybersecurity:

- **Increased Cost and Friction for Attackers:** By reducing the availability of anonymous, resilient hosting, criminals would be forced to use legitimate providers where they are more easily identified and shut down. This raises their operational costs and risks.
- **Disruption of Criminal Operations:** Taking down BPH infrastructure can simultaneously disrupt numerous criminal campaigns, from ransomware to phishing, that rely on it for command and control or content hosting.
- **Improved Ecosystem Health:** A proactive stance by ISPs and hosting providers would lead to a cleaner, safer internet, reducing the volume of malicious traffic and attacks.
- **Enhanced Public-Private Collaboration:** The initiative fosters stronger collaboration between government agencies, law enforcement, and the private sector, which is essential for tackling a problem as complex as cybercrime infrastructure.

---

## Compliance and Implementation Guidance

For network defenders in enterprises, the advisory provides a framework for action:

1.  **Enrich Threat Intelligence:** Subscribe to high-quality threat intelligence feeds that specifically track BPH providers, malicious ASNs, and known criminal IP ranges. Integrate this data into your firewall, proxy, and DNS filtering solutions.
2.  **Implement Egress Filtering:** Strictly control outbound network traffic. Block connections to known malicious destinations. Forcing DNS requests through a corporate DNS resolver that filters known-bad domains is a highly effective control.
3.  **Hunt for Fast Flux:** Monitor DNS logs for domains exhibiting fast flux characteristics (very low TTLs and rapid changes in associated IP addresses). This can be a strong indicator of a connection to a malicious C2 infrastructure. This is an application of [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
4.  **Block, Don't Just Alert:** For traffic associated with high-confidence indicators of BPH, move from an "alert-only" to a "block" posture. The risk of false positives is low, and the benefit of preventing a connection to a ransomware C2 is high.
5.  **Report Abuse:** When malicious activity is traced back to a specific hosting provider, use their abuse reporting channels. While BPH providers will ignore it, reporting to legitimate providers they resell from can be effective.

**Tags:** Bulletproof Hosting, BPH, CISA, NSA, FBI, Cybercrime Infrastructure, Threat Intelligence

## Sources
- [Cybersecurity Snapshot: Global Agencies Target Criminal “Bulletproof” Hosts, as CSA Unveils Agentic AI Risk Framework](https://www.securityboulevard.com/2025/11/cybersecurity-snapshot-global-agencies-target-criminal-bulletproof-hosts-as-csa-unveils-agentic-ai-risk-framework/) — Security Boulevard (2025-11-21)
- [Bulletproof Defense: Mitigating Risks From Bulletproof Hosting Providers](https://www.cisa.gov/news-events/news/bulletproof-defense-mitigating-risks-bulletproof-hosting-providers) — CISA (2025-11-19)
- [NSA Issues Guidance for ISPs and Network Defenders to Combat Malicious Activity](https://www.infosecurity-magazine.com/news/nsa-isps-network-defenders-guidance/) — Infosecurity Magazine (2025-11-20)
- [Agencies release guide to protect against bulletproof hosting provider cybercrimes](https://www.aha.org/news/headline/2025-11-20-agencies-release-guide-protect-against-bulletproof-hosting-provider) — American Hospital Association (2025-11-20)

---
Source: https://cyber.netsecops.io/articles/global-agencies-launch-effort-against-bulletproof-hosting-providers/
