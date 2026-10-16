# RedVDS Takedown: Microsoft and Law Enforcement Disrupt $40M Cybercrime-as-a-Service Operation

**Severity:** high | **Category:** Cyberattack,Threat Actor,Phishing | **Updated:** 2026-01-17 | **Reading time:** 5 min

In a major international operation, Microsoft's Digital Crimes Unit, alongside law enforcement from the U.S., U.K., and Germany, has disrupted the RedVDS cybercrime-as-a-service (CaaS) platform. The service, operated by a group tracked as Storm-2470, provided criminals with cheap, disposable RDP servers used to launch large-scale phishing, BEC, and fraud campaigns. The operation, which took down key domains like redvds[.]com, has been linked to over $40 million in fraud losses in the U.S. and impacted more than 191,000 organizations globally.

## Executive Summary
**[Microsoft](https://www.microsoft.com/security)**, in collaboration with international law enforcement agencies, has executed a significant takedown of the **RedVDS** cybercrime-as-a-service (CaaS) platform. This 'bulletproof' hosting service provided threat actors with cheap, anonymous, and disposable Windows-based virtual servers, which served as the launchpad for massive phishing campaigns, business email compromise (BEC), and other financial fraud schemes. The operation, led by Microsoft's Digital Crimes Unit and authorities in the U.S., U.K., and Germany, involved seizing critical infrastructure and taking the service's primary domains offline. The RedVDS platform, run by the threat group **Storm-2470**, is estimated to have facilitated over $40 million in fraud losses in the United States and compromised over 191,000 organizations worldwide since September 2025. This action marks a major disruption to the cybercrime ecosystem, forcing numerous threat actors to find new operational infrastructure.

## Threat Overview
The RedVDS service, active since 2019, specialized in offering low-cost (as little as $24/month) Remote Desktop Protocol (RDP) servers with a promise of anonymity and no activity logging. This made it an attractive platform for cybercriminals seeking disposable infrastructure for high-volume attacks. Key characteristics of the operation included:
- **Anonymity:** Provided a shield for criminal activities, making attribution difficult.
- **Scalability:** Enabled attackers to send millions of phishing emails daily.
- **Ease of Use:** A user-friendly portal and Telegram-based management simplified the process for less sophisticated actors.

The service was a key enabler for numerous threat actors, including **Storm-2227** and users of the RaccoonO365 phishing kit. Attackers leveraged RedVDS servers to target a wide range of industries, including legal, construction, real estate, healthcare, and education, on a global scale.

## Technical Analysis
The RedVDS platform was a foundational piece of the cybercrime supply chain, providing infrastructure as a service. Threat actors utilized this platform to conduct attacks mapped to the following **[MITRE ATT&CK](https://attack.mitre.org/)** techniques:
- **[`T1584 - Compromise Infrastructure`](https://attack.mitre.org/techniques/T1584/):** RedVDS itself provided pre-compromised or purpose-built infrastructure for malicious use.
- **[`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/):** The primary use case for RedVDS servers was launching large-scale phishing campaigns to steal credentials and financial information.
- **[`T1534 - Internal Spearphishing`](https://attack.mitre.org/techniques/T1534/):** Once an organization was breached, attackers could use compromised accounts to phish internally.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Credentials stolen via phishing were used to gain unauthorized access to corporate networks and cloud services.
- **[`T1114 - Email Collection`](https://attack.mitre.org/techniques/T1114/):** After gaining access, attackers would collect email data for use in BEC and other fraud schemes.

Attackers using RedVDS also employed a variety of tools to enhance their campaigns, including mailers like `SuperMailer` and `UltraMailer`, and increasingly, generative AI tools like **[ChatGPT](https://openai.com/chatgpt)** to craft more convincing phishing lures.

## Impact Assessment
The disruption of RedVDS has a significant, albeit temporary, impact on the cybercrime economy. 
- **Financial Impact:** The service is directly linked to at least $40 million in fraud losses in the U.S. alone, with the true global figure likely much higher.
- **Scale of Compromise:** Over 191,000 organizations worldwide were targeted or compromised by campaigns originating from RedVDS infrastructure since September 2025.
- **Disruption to Threat Actors:** The takedown forces a wide array of criminal groups to procure new infrastructure, increasing their operational costs and disrupting ongoing campaigns. This provides a window of opportunity for defenders to strengthen their controls.
- **Industries Targeted:** The broad targeting across sectors like healthcare, legal, and construction demonstrates the indiscriminate nature of these large-scale phishing operations.

## IOCs
The following domains associated with the RedVDS service were taken down and are confirmed indicators of compromise:

| Type | Value | Description |
|---|---|---|
| `domain` | `redvds[.]com` | Primary domain for the RedVDS cybercrime service. |
| `domain` | `redvds[.]pro` | Alternate domain for the RedVDS service. |
| `domain` | `vdspanel[.]space` | Domain for the RedVDS management panel. |

## Detection & Response
- **Network Traffic Monitoring:** Monitor for and block traffic to and from the IOC domains listed above. While the domains are seized, historical logs should be reviewed for signs of past communication.
- **Email Security Gateway Analysis ([D3-FA](https://d3fend.mitre.org/technique/d3f:FileAnalysis)):** Analyze email security logs for messages originating from IP addresses associated with known bulletproof hosting providers. Look for high volumes of similar emails from a single source IP.
- **Endpoint Detection and Response (EDR):** Hunt for the presence of tools commonly used by RedVDS customers, such as `SuperMailer`, `UltraMailer`, `BlueMail`, `SquadMailer`, and various email extractor tools on endpoints.
- **Identity and Access Management ([D3-MFA](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)):** Review authentication logs for suspicious sign-in attempts, especially those originating from anonymous VPNs or unusual geolocations. Enforce MFA for all users to mitigate the impact of stolen credentials.

## Mitigation
- **User Training ([M1017](https://attack.mitre.org/mitigations/M1017)):** Continuously train users to recognize and report phishing emails. Simulation exercises can improve resilience against real-world attacks.
- **Multi-Factor Authentication ([M1032](https://attack.mitre.org/mitigations/M1032)):** Implementing MFA is the single most effective control to prevent account takeovers resulting from compromised credentials.
- **Email Filtering and Sandboxing ([M1021](https://attack.mitre.org/mitigations/M1021)):** Deploy advanced email security solutions that can analyze URLs and attachments in a sandbox environment to detect and block malicious content before it reaches the user's inbox.
- **Restrict Web-Based Content:** Use web proxies and DNS filtering to block access to known malicious domains and newly registered domains, which are often used in phishing campaigns.

**Tags:** RedVDS, Microsoft, Cybercrime-as-a-Service, CaaS, Takedown, Phishing, BEC, Storm-2470

## Sources
- [Microsoft takes down cybercrime subscription service RedVDS](https://www.scmagazine.com/news/microsoft-takes-down-cybercrime-subscription-service-redvds) — SC Magazine (2026-01-15)
- [Microsoft Legal Action Disrupts RedVDS Cybercrime Infrastructure Used for Online Fraud](https://thehackernews.com/2026/01/microsoft-legal-action-disrupts-redvds.html) — The Hacker News (2026-01-15)
- [Microsoft Knocks Offline RedVDS Cybercrime Marketplace Linked to $40M in Fraud](https://redmondmag.com/articles/2026/01/15/microsoft-knocks-offline-redvds-cybercrime-marketplace.aspx) — Redmond Magazine (2026-01-15)
- [RedVDS Cybercrime Service Disrupted by Microsoft and Law Enforcement](https://www.securityweek.com/redvds-cybercrime-service-disrupted-by-microsoft-and-law-enforcement/) — SecurityWeek (2026-01-14)

---
Source: https://cyber.netsecops.io/articles/microsoft-and-law-enforcement-dismantle-redvds-cybercrime-as-a-service-platform/
