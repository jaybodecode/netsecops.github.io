# Oregon DEQ Kept Data Breach of 4,800 People Secret for Nine Months

**Severity:** high | **Category:** Data Breach,Incident Response,Regulatory | **Updated:** 2026-01-13 | **Reading time:** 4 min

The Oregon Department of Environmental Quality (DEQ) confirmed on January 13, 2026, that a cyberattack in April 2025 exposed the personal data of approximately 4,800 people. The agency opted not to issue a broad public disclosure, citing that Oregon law did not require it, and instead began sending notification letters to affected individuals in late December 2025, over eight months after the incident. The initial attack, which the Rhysida ransomware gang later claimed, caused significant operational disruption. The delay in notification has drawn criticism and raises questions about the agency's transparency and incident response process.

## Executive Summary
The **[Oregon Department of Environmental Quality (DEQ)](https://www.oregon.gov/deq)** has acknowledged a data breach that occurred in April 2025, exposing the personal information of approximately 4,800 individuals. The confirmation, which came on January 13, 2026, was made only in response to media inquiries, nine months after the initial cyberattack. The agency defended its decision not to make a public announcement, stating that Oregon law only required direct notification to the affected individuals, a process that began in late December 2025. The initial incident forced the shutdown of DEQ's network and vehicle inspection stations. The **[Rhysida](https://malpedia.caad.fkie.fraunhofer.de/actor/rhysida)** ransomware group claimed responsibility at the time, although the state disputed some of the gang's claims. The lengthy delay in disclosure highlights significant issues in the agency's incident response and public transparency.

## Incident Timeline
- **April 9, 2025:** A cyberattack hits the Oregon DEQ, forcing network shutdowns and operational disruptions.
- **Post-April 2025:** The Rhysida ransomware gang claims responsibility, alleging the theft of 2.5 TB of data and posting samples of sensitive documents. DEQ officials dispute the claims and state no ransom was demanded.
- **Late December 2025:** DEQ begins sending notification letters to the approximately 4,800 individuals whose data was confirmed to be exposed.
- **January 13, 2026:** In response to media questions, DEQ publicly confirms the data breach for the first time.

## Threat Overview
The incident began as a disruptive cyberattack that evolved into a confirmed data breach with a severely delayed notification process.

- **Victim:** Oregon Department of Environmental Quality (DEQ).
- **Claimed Attacker:** Rhysida ransomware group.
- **Impact:** Personal information of ~4,800 individuals exposed. The data was reportedly from "older records." The initial attack also caused significant operational downtime for the agency.
- **Controversy:** The primary issue is the nine-month gap between the incident and public acknowledgment, and the decision to forgo a public announcement in favor of private notifications that were themselves delayed.

## Impact Assessment
- **For Affected Individuals:** The 4,800 people whose data was leaked were unaware of their exposure for over eight months, leaving them vulnerable to identity theft and fraud without the ability to take protective measures like credit freezes. The leaked data reportedly included highly sensitive information like passports and Social Security cards.
- **For Oregon DEQ:** The agency faces a significant loss of public trust. The handling of the incident, particularly the lack of transparency, raises questions about its commitment to protecting citizen data and its incident response capabilities. While the agency may have complied with the letter of Oregon law, the decision has resulted in public criticism and reputational damage.
- **Regulatory & Legal:** The justification that state law did not require public disclosure is a key point of contention. While technically true, best practices for incident response often call for broader public notification to maintain trust and provide a warning to the general public. The incident may lead to reviews of Oregon's data breach notification laws.

## Detection & Response
DEQ's response highlights several critical gaps.

- **Initial Response:** The agency successfully detected the initial intrusion and took steps to contain it by shutting down its network. This indicates some level of detection capability.
- **Forensics and Notification Delay:** The lengthy period between the attack in April and the start of notifications in December suggests a prolonged forensic investigation or a deprioritization of the notification process. A nine-month timeline is exceptionally long by modern cybersecurity standards.
- **Communication Strategy:** The decision to avoid public disclosure, while legally permissible, was a strategic failure. It created an information vacuum and gave the impression the agency was hiding the breach. A proactive, transparent communication strategy, even with incomplete information, is generally more effective at managing public perception and trust.

## Mitigation
This incident provides several lessons for public sector organizations.

- **Data Retention Policies:** The DEQ stated the leaked data was from "older records." This highlights the importance of robust data retention and minimization policies. Data that is no longer needed for business or legal reasons should be securely destroyed to reduce the attack surface. (D3FEND: [`D3-DDP: Data Destruction Policy`](https://d3fend.mitre.org/technique/d3f:DataDestructionPolicy))
- **Incident Response Planning:** Incident response plans must include clear timelines and criteria for both individual and public notification. Plans should go beyond minimum legal requirements and incorporate best practices for maintaining public trust.
- **Transparency:** In the event of a breach, a default posture of transparency is crucial. Timely, accurate, and consistent communication can mitigate reputational damage, even when the news is bad.
- **Supply Chain Security:** The incident began shortly after the agency warned its own staff about a hijacked link in a press release. This initial vector, if related, underscores the need to secure all communication channels and third-party services that could be used to launch an attack.

**Tags:** Incident Response, Data Breach Notification, Transparency, Government, Ransomware

## Sources
- [Oregon DEQ data breach leaked thousands of people's information, but the agency hasn't told the public](https://www.klcc.org/politics-government/2026-01-13/oregon-deq-data-breach-leaked-thousands-of-peoples-information-but-the-agency-hasnt-told-the-public) — KLCC (2026-01-13)
- [Oregon DEQ data breach leaked thousands of people’s information, but the agency hasn’t told the public](https://www.opb.org/article/2026/01/13/oregon-deq-data-breach-leaked-thousands-of-peoples-information-but-the-agency-hasnt-told-the-public/) — OPB (2026-01-13)
- [Oregon’s environmental agency shuts down network after cyberattack](https://therecord.media/oregon-deq-shuts-down-network-cyberattack) — The Record (2026-01-13)
- [Oregon DEQ Conducts Forensic Investigation in Cyber Attack](https://www.govtech.com/security/oregon-deq-conducts-forensic-investigation-in-cyber-attack) — GovTech (2026-01-13)
- [DEQ works to resolve cyber attack](https://www.deq.state.or.us/news/deq-works-to-resolve-cyber-attack/) — Oregon DEQ (2026-01-13)

---
Source: https://cyber.netsecops.io/articles/oregon-deq-data-breach-of-4800-people-kept-secret-for-nine-months/
