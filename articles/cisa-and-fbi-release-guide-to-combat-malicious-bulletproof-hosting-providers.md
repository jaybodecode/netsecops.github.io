# CISA and Partners Release Guide to Combat Bulletproof Hosting

**Severity:** informational | **Category:** Policy and Compliance,Threat Intelligence,Security Operations | **Updated:** 2025-11-20 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA), along with the FBI, NSA, and international partners, has published a comprehensive guide to help network defenders and Internet Service Providers (ISPs) combat the threat of bulletproof hosting (BPH) providers. These services knowingly lease infrastructure to cybercriminals for a wide range of malicious activities, including ransomware, phishing, and malware distribution. The guide, 'Bulletproof Defense,' provides actionable recommendations for filtering malicious traffic, enhancing network monitoring, and improving intelligence sharing to disrupt the criminal ecosystem that relies on BPH for anonymity and resilience.

## Executive Summary
On November 19, 2025, the **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, in partnership with the **[FBI](https://www.fbi.gov)**, **[NSA](https://www.nsa.gov)**, and other domestic and international allies, released a new guide titled "Bulletproof Defense: Mitigating Risks from Bulletproof Hosting Providers." This guidance addresses the critical role that Bulletproof Hosting (BPH) providers play in the cybercrime ecosystem by knowingly providing resilient hosting services for malicious infrastructure. The document outlines a series of technical and policy recommendations for Internet Service Providers (ISPs) and network defenders to identify, filter, and report BPH-related activity, aiming to increase the operational costs for cybercriminals and disrupt their campaigns.

---

## Regulatory Details
The guide is not a formal regulation but a set of best-practice recommendations for the public and private sectors. It aims to create a collaborative defense against BPH providers, which are defined as entities that willfully provide infrastructure for malicious activities and are lenient on content policies, resist takedown requests, and often ignore abuse complaints.

### Key Recommendations for Network Defenders:
- **Curate Malicious Resource Lists:** Use threat intelligence feeds to maintain up-to-date lists of malicious IPs, domains, and ASNs associated with BPH providers.
- **Implement Traffic Filtering:** Proactively block or filter inbound and outbound traffic to and from known malicious infrastructure.
- **Enhance Monitoring and Logging:** Maintain robust logs of network traffic, including IP addresses and ASNs, to aid in incident response and forensic analysis.
- **Share Intelligence:** Actively participate in information sharing and analysis centers (ISACs) and other platforms to share and receive timely threat intelligence on BPH activities.

### Key Recommendations for ISPs:
- **Customer Vetting:** Implement more thorough "Know Your Customer" (KYC) processes to prevent BPH operators from leasing infrastructure.
- **Offer Filtering Services:** Provide customers with optional, pre-made filters to block malicious traffic from their networks.
- **Industry Codes of Conduct:** Collaborate on industry-wide standards to prevent the abuse of hosting services.

## Affected Organizations
The guidance is primarily aimed at:
- **Internet Service Providers (ISPs):** Who are in a position to identify and block traffic from BPH providers at a network level.
- **Network Defenders:** Including security teams in public and private sector organizations who can implement the recommendations to protect their own networks.
- **Critical Infrastructure Operators:** Who are frequent targets of threat actors using BPH services.

## Impact Assessment
The proliferation of BPH providers significantly lowers the barrier to entry for cybercriminals. By providing a safe haven for command-and-control (C2) servers, phishing sites, and malware distribution points, BPH services enable a vast range of cyber threats:
- **Ransomware Campaigns:** BPH is used to host C2 servers and data leak sites.
- **Phishing and Scams:** Hosting of fraudulent websites and email infrastructure.
- **Malware Distribution:** Delivery of trojans, stealers, and other malicious payloads.
- **Denial-of-Service (DoS) Attacks:** Staging points for botnets and DoS-for-hire services.

By making it harder for BPH providers to operate, the goal is to disrupt these criminal activities, forcing threat actors onto legitimate hosting platforms where they are more easily identified and subject to law enforcement action.

## Compliance Guidance
While not mandatory, adopting the recommendations in the CISA guide can significantly improve an organization's security posture. A prioritized action plan should include:
1. **Subscribe to Threat Intelligence:** Integrate high-quality threat intelligence feeds that specifically track BPH infrastructure into firewalls, web filters, and SIEM platforms.
2. **Implement Egress Filtering:** Establish strict outbound traffic filtering rules ([D3-OTF](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)) to block connections to known malicious destinations. Deny all traffic by default and only allow what is explicitly required for business operations.
3. **Review Logging Policies:** Ensure that network flow data, DNS queries, and proxy logs are being collected and retained for at least 90-180 days to support threat hunting and incident response.
4. **Engage with Peers:** Join your relevant ISAC or other information-sharing groups to contribute and consume intelligence on emerging threats.

**Tags:** CISA, Bulletproof Hosting, BPH, Threat Intelligence, ISP, Policy

## Sources
- [CISA Releases Guide to Mitigate Risks from Bulletproof Hosting Providers](https://www.cisa.gov/news-events/alerts/2025/11/19/cisa-releases-guide-mitigate-risks-bulletproof-hosting-providers) — CISA (2025-11-19)
- [CISA Unveils Guide to Combat Bulletproof Hosting Cybercrime](https://www.cisa.gov/news-events/news/cisa-unveils-guide-combat-bulletproof-hosting-cybercrime) — CISA (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/cisa-and-fbi-release-guide-to-combat-malicious-bulletproof-hosting-providers/
