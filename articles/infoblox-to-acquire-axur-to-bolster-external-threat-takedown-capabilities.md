# Infoblox to Acquire Axur, Expanding into AI-Powered External Threat Disruption

**Severity:** informational | **Category:** Threat Intelligence,Phishing,Other | **Updated:** 2026-01-17 | **Reading time:** 3 min

Infoblox, a leader in DNS security and network services, has announced a definitive agreement to acquire Axur, a company specializing in AI-driven external threat detection and takedown. The acquisition will extend Infoblox's preemptive security offerings, enabling customers to combat threats like phishing, brand abuse, and credential theft that originate outside the corporate network. By integrating Axur's rapid takedown capabilities with its own DNS-level controls, Infoblox aims to significantly reduce the uptime of active cyberattacks.

## Executive Summary
**[Infoblox](https://www.infoblox.com/)**, a prominent player in DDI (DNS, DHCP, and IPAM) and DNS-layer security, has announced its intent to acquire **Axur**, a global provider of AI-powered external threat intelligence and mitigation. The acquisition, expected to close in spring 2026, represents a strategic expansion for Infoblox, moving its security focus beyond the network perimeter to proactively address threats on the public internet. Axur's platform specializes in automatically discovering and taking down malicious infrastructure, including phishing sites, fake social media profiles, and fraudulent mobile apps. By combining this capability with Infoblox's core DNS security, the merged entity will offer a comprehensive solution that can both block access to malicious sites and actively work to remove them from the internet, drastically shortening attack lifecycles.

## Threat Overview
The acquisition directly addresses the modern threat landscape where attacks often begin outside the organization's control. These external threats include:
- **Phishing and Spear Phishing:** Attackers create fake websites and send emails to lure victims into revealing credentials.
- **Brand Abuse:** Malicious actors create fake social media accounts or websites that impersonate a company's brand to defraud customers.
- **Data and Credential Theft:** Stolen data is often posted or sold on external forums and marketplaces.
- **AI-Scaled Campaigns:** Generative AI is used to create highly convincing phishing sites and social media profiles at an unprecedented scale.

Axur's technology is designed to continuously scan the public internet (including websites, social media, app stores, and dark web forums) to identify these threats. Its AI-driven platform can reportedly detect new phishing activity in under four minutes and achieves a takedown success rate of nearly 99%.

## Technical and Strategic Analysis
The combination of Infoblox and Axur creates a powerful security synergy:
1.  **External Detection (Axur):** The process begins with Axur's AI engine discovering a new phishing site or instance of brand impersonation on the internet.
2.  **Internal Blocking (Infoblox):** Simultaneously, the malicious domain identified by Axur is fed into the Infoblox threat intelligence platform. This allows all Infoblox customers to immediately block DNS requests for that domain, preventing their users from accessing the malicious site. This aligns with D3FEND's **[DNS Denylisting (D3-DNSDL)](https://d3fend.mitre.org/technique/d3f:DNSDenylisting)**.
3.  **External Takedown (Axur):** While the internal block is active, Axur's automated system initiates the takedown process with the relevant hosting providers, registrars, and authorities to have the malicious content removed from the internet.

This two-pronged approach—**Block and Takedown**—significantly reduces the median uptime of an attack from days to mere hours, minimizing the window for potential victims to be compromised.

## Impact Assessment
- **For Customers:** The acquisition will provide Infoblox customers with a more holistic security solution that extends protection beyond their own network. It offers a proactive way to dismantle the infrastructure used to attack them, rather than just passively blocking it.
- **For the Market:** This move signals a trend in the cybersecurity industry towards integrated platforms that combine internal controls with external threat surface management. It puts pressure on other DNS security and threat intelligence providers to offer similar external takedown capabilities.
- **For Infoblox:** The acquisition expands Infoblox's Total Addressable Market (TAM) and strengthens its narrative as a comprehensive, preemptive security provider. It allows the company to move up the value chain from a network infrastructure player to a strategic security partner.

## Mitigation and Security Value
The integrated solution provides multiple layers of mitigation against external threats:
- **Preemptive Defense:** By actively seeking out and dismantling threats, the solution helps stop attacks before they can be launched at scale against an organization's employees or customers.
- **Reduced Attacker ROI:** Rapidly taking down malicious infrastructure increases the cost and effort for attackers, making the organization a less attractive target.
- **Brand Protection:** Proactively removing fake websites and social media profiles protects a company's reputation and prevents customer fraud.
- **Defense in Depth:** The combination of DNS-level blocking and active takedown provides a robust, multi-layered defense against phishing and other web-based threats.

**Tags:** Infoblox, Axur, Acquisition, M&A, Threat Intelligence, Phishing, Brand Protection, AI

## Sources
- [Infoblox Expands Its Preemptive Security Offering to Combat Brand Abuse, Credential Exposure and External Threats with Planned Acquisition of Axur](https://www.infoblox.com/company/press-releases/infoblox-expands-its-preemptive-security-offering-to-combat-brand-abuse-credential-exposure-and-external-threats-with-planned-acquisition-of-axur/) — Infoblox (2026-01-14)
- [Infoblox to buy Axur to bolster AI-powered threat defence](https://securitybrief.com.au/story/infoblox-to-buy-axur-to-bolster-ai-powered-threat-defence) — SecurityBrief Australia (2026-01-15)
- [Infoblox deepens exposure management through Axur](https://www.techzine.eu/news/security/120612/infoblox-deepens-exposure-management-through-axur/) — Techzine Europe (2026-01-14)
- [Endpoint Security and Network Monitoring News for the Week of January 16th: Asimily, OneSpan, Infoblox, and More](https://www.solutionsreview.com/endpoint-security/endpoint-security-and-network-monitoring-news-for-the-week-of-january-16th-asimily-onespan-infoblox-and-more/) — Solutions Review (2026-01-16)

---
Source: https://cyber.netsecops.io/articles/infoblox-to-acquire-axur-to-bolster-external-threat-takedown-capabilities/
