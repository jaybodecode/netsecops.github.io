# DDoS Attacks Surge 150% with Record-Breaking 12 Tbps Volumes, Gcore Reports

**Severity:** informational | **Category:** Threat Intelligence,Cyberattack | **Updated:** 2026-03-24 | **Reading time:** 5 min

A new report from infrastructure provider Gcore reveals a 150% increase in Distributed Denial-of-Service (DDoS) attacks between Q4 2024 and Q4 2025. Attack volumes have also exploded, reaching a record 12 Terabits per second (Tbps). The report highlights a trend towards faster, cheaper, and more frequent attacks, with 75% of network-layer attacks lasting less than a minute. The technology, financial services, and gaming industries remain the primary targets, while a significant portion of attack traffic originates from Latin America, particularly Mexico and Brazil.

## Executive Summary
A new threat report from global infrastructure provider **[Gcore](https://gcore.com/)** reveals a dramatic escalation in the frequency and power of Distributed Denial-of-Service (DDoS) attacks. Comparing Q4 2024 to Q4 2025, the total number of DDoS attacks observed surged by 150%, from 512,000 to 1.3 million. More alarmingly, the sheer volume of these attacks has grown sixfold, with peak attack power reaching an unprecedented 12 Terabits per second (Tbps). The report underscores that attacks are becoming cheaper to launch, more frequent, and more sophisticated. Key targets remain industries where uptime is critical: technology (34%), financial services (20%), and gaming (19%). The findings point to a highly volatile threat landscape where organizations must be prepared for short, overwhelming bursts of malicious traffic.

---

## Threat Overview
The report, which analyzes DDoS trends from Q3 and Q4 2025, highlights several key shifts in attacker methodology:

- **Massive Volume Increase:** The jump to 12 Tbps attack volumes indicates a massive expansion and evolution of botnet infrastructures. This level of traffic can overwhelm even the largest and most well-prepared organizations.
- **Short, Intense Bursts:** 75% of network-layer (L3/L4) attacks lasted for less than one minute. This 'hit-and-run' tactic is designed to cause maximum disruption by flooding circuits before automated mitigation systems can fully analyze the traffic and apply precise filters. It aims to trigger coarser, more disruptive blocking mechanisms.
- **Longer Application-Layer Attacks:** In contrast, application-layer (L7) attacks are showing a trend towards longer durations. These attacks are more resource-intensive for the attacker but can be more damaging as they tie up server resources (CPU, memory) rather than just network bandwidth.
- **Geographic Concentration:** A significant concentration of attack sources was identified in Latin America, with Mexico and Brazil alone accounting for 55% of the observed malicious activity.

## Technical Analysis
DDoS attacks are becoming more accessible due to the proliferation of DDoS-for-hire or 'booter' services, which make it cheap and easy for even unskilled actors to launch powerful attacks. The evolving TTPs include:

- **Amplification/Reflection Attacks:** Attackers continue to abuse misconfigured public services like DNS, NTP, and CLDAP. They send small queries to these services with a spoofed source IP (the victim's), and the services respond with a much larger amount of data, amplifying the attack traffic. ([`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/)). The 12 Tbps volume is likely the result of a large-scale amplification attack.
- **Botnet-based Attacks:** Large botnets, comprised of compromised servers and IoT devices, are used to generate massive volumes of direct traffic (e.g., TCP SYN floods, UDP floods) aimed at exhausting the network capacity or state tables of firewalls and load balancers.
- **Application-Layer Attacks:** These are more sophisticated attacks that mimic legitimate user traffic, sending a high volume of HTTP GET or POST requests to specific, resource-intensive parts of a web application (e.g., login pages, database search functions). These are harder to distinguish from legitimate traffic and can bring down a service without requiring massive bandwidth. ([`T1499 - Endpoint Denial of Service`](https://attack.mitre.org/techniques/T1499/)).

## Impact Assessment
- **Service Unavailability:** The primary impact of a successful DDoS attack is service unavailability, leading to direct revenue loss, customer churn, and operational downtime.
- **Financial Costs:** Mitigation costs can be high, whether through on-demand scrubbing services or investment in dedicated DDoS protection appliances and cloud services.
- **Reputational Damage:** Frequent downtime can severely damage a company's reputation and brand, particularly in the competitive tech, finance, and gaming sectors.
- **Smokescreen for Other Attacks:** DDoS attacks are often used as a diversion. While the security team is busy fighting the DDoS fire, attackers may be attempting another, more stealthy intrusion, such as a data breach.

## Detection & Response
1.  **Traffic Baselining:** The foundation of DDoS detection is to have a clear baseline of what normal traffic looks like in terms of volume, protocols, and sources. Anomaly detection systems can then alert on significant deviations from this baseline.
2.  **Flow Analysis:** Use network flow data (e.g., NetFlow, sFlow) to quickly identify the characteristics of an attack, such as top source IPs, destination ports, and protocol types.
3.  **Automated Mitigation:** Modern DDoS defense relies on automated systems that can detect an attack and divert traffic to a 'scrubbing center' in the cloud. This center filters out the malicious traffic and forwards only the legitimate traffic to the organization's network.

## Mitigation
1.  **Cloud-Based DDoS Protection:** For most organizations, subscribing to a cloud-based DDoS mitigation service is the most effective strategy. These providers have the massive network capacity and specialized infrastructure required to absorb and filter terabit-scale attacks.
2.  **Hybrid Approach:** A hybrid model, combining an on-premise DDoS mitigation appliance with a cloud-based service, can provide the best of both worlds. The on-premise device handles smaller, more frequent attacks, while the cloud service is activated for large-volume attacks that would saturate the local internet connection.
3.  **Rate Limiting and Filtering:** Configure edge routers and firewalls with rate limiting and access control lists to drop obviously malicious or unwanted traffic before it hits critical servers.
4.  **Application Hardening:** Protect against application-layer attacks by using a Web Application Firewall (WAF), implementing CAPTCHAs on resource-intensive pages, and optimizing application code.

**Tags:** DDoS, Gcore, Threat Intelligence, Botnet, Denial of Service, Gaming

## Sources
- [News alert: DDoS attacks surge 150%—Gcore analysis shows faster, cheaper more frequent attacks](https://securityboulevard.com/2026/03/news-alert-ddos-attacks-surge-150-gcore-analysis-shows-faster-cheaper-more-frequent-attacks/) — Security Boulevard (2026-03-24)

---
Source: https://cyber.netsecops.io/articles/gcore-report-ddos-attacks-surge-150-with-growing-sophistication/
