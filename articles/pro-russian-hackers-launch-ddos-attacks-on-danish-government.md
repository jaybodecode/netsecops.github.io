# Pro-Russian Hackers Target Denmark with DDoS Attacks Ahead of Elections

**Severity:** medium | **Category:** Cyberattack,Threat Actor | **Updated:** 2025-11-17 | **Reading time:** 4 min

The pro-Russian hacktivist group NoName057(16) has claimed responsibility for a series of Distributed Denial-of-Service (DDoS) attacks that targeted Danish government websites, political parties, and defense-related entities. The attacks, which occurred just before Denmark's municipal and regional elections, were designed to cause disruption and informational noise. Targets included the Danish Ministry of Transport and the national citizen portal, Borger.dk. While the outages were brief, the incident aligns with a pattern of politically motivated cyber activity by the group against European nations supporting Ukraine.

## Executive Summary
On the eve of its municipal and regional elections, Denmark became the target of a coordinated Distributed Denial-of-Service (DDoS) campaign orchestrated by the pro-Russian hacktivist group **[NoName057(16)](https://malpedia.caad.fkie.fraunhofer.de/actor/noname057_16)**. The attacks aimed to disrupt access to numerous government, political, and defense-related websites, including the Danish Ministry of Transport and the citizen portal Borger.dk. While the attacks caused only temporary outages and no data was compromised, their timing suggests a clear intent to interfere with the democratic process by creating disruption and spreading uncertainty. This incident is consistent with NoName057(16)'s ongoing strategy of launching nuisance-level attacks against countries perceived as hostile to Russian interests.

---

## Threat Overview
NoName057(16) is a politically motivated threat group that emerged following Russia's invasion of Ukraine. Their primary tactic is conducting DDoS attacks against government and critical infrastructure websites in countries that support Ukraine. Their goal is not data theft or financial gain, but disruption, propaganda, and psychological impact.

In this campaign, the group targeted a range of Danish institutions to maximize visibility and disruption around the election period. The list of targets included:
- **Government:** Danish Ministry of Transport, Borger.dk (national citizen portal).
- **Political Parties:** The Conservatives, the Red-Green Alliance.
- **Defense:** Terma (a Danish defense and aerospace company).
- **Media:** The Copenhagen Post (an English-language newspaper).

The attacks were successful in temporarily taking some of these websites offline, demonstrating the group's capability to generate sufficient traffic to overwhelm unprotected or under-protected web services. Danish authorities, including the **Danish Defence Intelligence Service (FE)**, had anticipated such attacks and issued warnings, allowing some entities to take preemptive measures.

## Technical Analysis
The core technique used by NoName057(16) is **[Network Denial of Service](https://attack.mitre.org/techniques/T1498/)**, specifically a Distributed Denial of Service (DDoS) attack. The group operates a volunteer-driven botnet, primarily through a tool called 'DDoSia'. Sympathizers and volunteers download the DDoSia client, which then receives commands from the group's C2 servers, directing the participants' computers to flood a specific target website with traffic.

The attack typically manifests as a Layer 7 (application layer) DDoS, where the botnet generates a massive volume of HTTP/S requests designed to exhaust the target web server's resources (CPU, memory, connections). This is often more effective than simple network-layer floods because it mimics legitimate traffic, making it harder to filter.

The group coordinates its attacks and announces its 'successes' on its Telegram channel, using the platform for recruitment, propaganda, and target designation.

## Impact Assessment
- **Service Disruption:** The primary impact was the temporary unavailability of several public-facing websites. While disruptive, the outages were brief and did not impact the core functioning of the election process or government services.
- **Informational and Psychological Impact:** The main goal of such attacks is to create noise, sow discord, and project an image of power. By attacking on the eve of an election, the group aimed to undermine public confidence in the stability of the country's digital infrastructure.
- **Resource Drain:** Responding to these attacks forces security teams and service providers to divert resources to mitigation efforts, even if the attacks themselves are not technically sophisticated.

## Cyber Observables for Detection
- **Network Traffic Pattern:** A massive, sudden spike in inbound web traffic from a geographically diverse set of IP addresses, often from residential ISPs or cloud providers.
- **Log Source:** Web server logs (e.g., Apache, Nginx, IIS) showing an enormous number of HTTP GET or POST requests for the same page or a small set of pages.
- **User Agent:** Attack traffic may use a limited set of user-agent strings associated with the DDoS tool being used.
- **IP Address:** While IPs are distributed, they may share characteristics, such as originating from countries known for botnet activity.

## Detection & Response
- **Traffic Volume Monitoring:** The most obvious sign of a DDoS attack is a dramatic and sustained increase in traffic volume. Network monitoring tools should be configured to alert on such anomalies. This is a form of **[D3-ISVA: Inbound Session Volume Analysis](https://d3fend.mitre.org/technique/d3f:InboundSessionVolumeAnalysis)**.
- **Error Rate Monitoring:** Monitor web server and application error rates. A sharp increase in HTTP 5xx server errors can indicate that the server is overloaded and unable to handle the request volume.
- **DDoS Mitigation Service:** The most effective response is to route traffic through a cloud-based DDoS mitigation provider (e.g., Cloudflare, Akamai, AWS Shield). These services have the scale and technology to absorb and filter out malicious traffic before it reaches the origin server.
- **Rate Limiting:** Implementing rate limiting on web servers and load balancers can help to slow down application-layer attacks by limiting the number of requests a single IP address can make in a given period.

## Mitigation
- **Use a DDoS Protection Service:** For any public-facing, mission-critical website, subscribing to a professional DDoS protection service is the most effective mitigation. These services are designed to handle large-scale attacks that would overwhelm on-premise defenses.
- **Scalable Infrastructure:** Designing web applications on scalable cloud infrastructure can provide some resilience, allowing the system to automatically scale up to handle traffic spikes. However, this can become costly and is not a substitute for a dedicated protection service.
- **Geoblocking:** If a service is only intended for a specific geographic region (e.g., Denmark), implementing geoblocking to deny traffic from other countries can reduce the attack surface, though this is easily bypassed by attackers using VPNs or proxies.
- **Incident Response Plan:** Have a clear incident response plan for DDoS attacks. This should include contact information for your hosting provider and DDoS mitigation service, and defined procedures for activating mitigation measures.

**Tags:** DDoS, hacktivism, NoName057(16), pro-Russian, Denmark, elections

## Sources
- [17th November – Threat Intelligence Report](https://research.checkpoint.com/2025/17th-november-threat-intelligence-report/) — Check Point Research (2025-11-17)
- [Hacker group brings down The Copenhagen Post website ahead of local elections](https://cphpost.dk/2025-11-17/news/hacker-group-brings-down-the-copenhagen-post-website-ahead-of-local-elections/) — The Copenhagen Post (2025-11-17)
- [DDoSia Targets Denmark: A Clear Look at the Threat](https://socradar.io/ddosia-targets-denmark-a-clear-look-at-the-threat/) — SOCRadar (2025-11-17)
- [Danish political parties hit by cyberattack on election eve](https://www.newindianexpress.com/world/2025/Nov/17/danish-political-parties-hit-by-cyberattack-on-election-eve-315842.html) — The New Indian Express (2025-11-17)

---
Source: https://cyber.netsecops.io/articles/pro-russian-hackers-launch-ddos-attacks-on-danish-government/
