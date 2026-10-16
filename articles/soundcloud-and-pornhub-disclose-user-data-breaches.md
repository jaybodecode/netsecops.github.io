# SoundCloud and Pornhub Confirm User Data Exposure in Separate Breaches, One Via Third-Party

**Severity:** high | **Category:** Data Breach,Supply Chain Attack,Threat Actor | **Updated:** 2025-12-18 | **Reading time:** 5 min

Both SoundCloud and Pornhub have confirmed security incidents exposing user data. SoundCloud suffered a direct breach of an ancillary service dashboard, resulting in the exfiltration of email addresses and public profile information for up to 28 million users (20% of its user base). The company states passwords and financial data were not affected. Separately, Pornhub announced that historical analytics data of some Premium members was exposed due to a breach at its former third-party analytics vendor, Mixpanel. The notorious hacking group ShinyHunters has claimed the Mixpanel breach and is attempting to extort Pornhub, alleging they stole a massive database of user search and watch history.

## Executive Summary
Two major online platforms, **[SoundCloud](https://soundcloud.com/)** and **Pornhub**, have disclosed separate data breaches affecting their users. SoundCloud's incident was a direct compromise of an internal dashboard, exposing email addresses and profile data for approximately 20% of its users, potentially numbering up to 28 million. The company has since contained the breach but faced subsequent DDoS attacks. Pornhub's exposure was the result of a supply-chain attack targeting its former third-party analytics vendor, **[Mixpanel](https://mixpanel.com/)**. The breach exposed historical analytics data of some Premium members. The hacking group **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** has claimed responsibility for the Mixpanel compromise and is now attempting to extort Pornhub with the allegedly stolen data.

## Threat Overview
**SoundCloud Breach:** This was a direct attack targeting an "ancillary service dashboard." The unauthorized access led to the exfiltration of email addresses and public profile information. SoundCloud emphasized that sensitive data like passwords and financial details were not part of the compromised dataset. As part of its incident response, SoundCloud made configuration changes that inadvertently blocked users accessing the service via VPNs. Following the containment, the platform was hit by disruptive Distributed Denial-of-Service (DDoS) attacks.

**Pornhub / Mixpanel Breach:** This incident is a classic example of a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)**. Pornhub's own systems were not breached. Instead, the data was exposed via a compromise at Mixpanel, a company Pornhub had stopped using in 2021. The exposed data was described as a "limited set of analytics events." However, the threat actor, ShinyHunters, claims to have stolen 94GB of data containing over 200 million records of Premium users' activity, including search and watch history, email addresses, keywords, and locations. This same Mixpanel breach has also affected other high-profile companies like OpenAI and CoinTracker.

## Technical Analysis
**ShinyHunters' TTPs:** ShinyHunters is a well-known threat actor specializing in large-scale data theft for financial gain, often selling stolen databases on dark web forums or using them for extortion. Their involvement suggests the Mixpanel breach was a targeted intrusion aimed at a high-value data aggregator.
*   **MITRE ATT&CK Mapping (ShinyHunters):**
    *   [`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/): Targeting a data analytics firm like Mixpanel is a strategic move to acquire data from many sources at once.
    *   [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): The primary goal is collecting and exfiltrating large databases, often stored in cloud environments.
    *   [`T1658 - Threat Actor-based Extortion`](https://attack.mitre.org/techniques/T1658/): After stealing the data, the group uses it to extort the victims' customers (Pornhub in this case).

**SoundCloud DDoS Attack:** The follow-on DDoS attacks against SoundCloud are a common tactic used by attackers to either distract from the initial intrusion, further disrupt the victim's business, or as a separate extortion attempt.
*   **MITRE ATT&CK Mapping (DDoS):**
    *   [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/): The attackers flooded SoundCloud's services with traffic to make them unavailable to legitimate users.

## Impact Assessment
For SoundCloud users, the primary risk is targeted phishing campaigns using their exposed email addresses and profile information. The subsequent DDoS attacks caused service disruption, impacting user experience and brand reputation. 

For Pornhub users, the potential impact is far more severe due to the highly sensitive nature of the data. If ShinyHunters' claims are true, the exposure of search and watch history linked to email addresses could lead to personal embarrassment, blackmail, and targeted harassment. The incident severely damages user trust, even though Pornhub's direct systems were not at fault. It also serves as a stark reminder of the long-term risk posed by third-party data sharing; data shared with a vendor years ago can still be compromised and come back to haunt a company and its users.

## Cyber Observables for Detection
*   **SoundCloud:** Monitor for widespread login failures or access issues, which were an early indicator of their incident response actions. Monitor network traffic for signs of a DDoS attack, such as a massive influx of traffic from a wide range of IP addresses targeting specific endpoints.
*   **Pornhub/Mixpanel:** Organizations using third-party analytics tools should monitor for any security notifications from their vendors. Regularly review the data shared with third parties and the access permissions granted. Hunt for mentions of your company or stolen data on dark web forums and threat intelligence feeds.

## Detection & Response
1.  **Third-Party Risk Management (TPRM):** Organizations must have a robust TPRM program. This includes vetting the security posture of all vendors before integration, defining data sharing agreements, and having a plan for when a third-party is breached. This aligns with **[D3FEND Decoy Object (D3-DO)](https://d3fend.mitre.org/technique/d3f:DecoyObject)**, where you can seed third-party datasets with decoy records to get early warning if that data appears in a breach.
2.  **DDoS Protection:** Services like SoundCloud must have a DDoS mitigation service in place. These services can absorb and filter malicious traffic, ensuring service availability for legitimate users. This is a form of **[D3FEND Inbound Traffic Filtering (D3-ITF)](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.
3.  **Incident Communication:** Both companies communicated the breaches to their users, which is a critical step in incident response. Clear and timely communication helps users take protective measures and can help manage reputational damage.

## Mitigation
1.  **Vendor Offboarding Process:** When a relationship with a third-party vendor like Mixpanel ends, the offboarding process must include a contractual obligation and verification that all of your company's data has been securely and permanently deleted from their systems.
2.  **Data Minimization:** Only share the absolute minimum amount of user data required for a third-party service to function. Anonymize or pseudonymize data wherever possible. For analytics, it's often not necessary to share raw email addresses; hashed or unique user IDs can suffice.
3.  **Secure Internal Tools:** For the SoundCloud breach, access to internal dashboards must be strictly controlled. Enforce **[Multi-factor Authentication (MFA)](https://www.cisa.gov/mfa)**, use IP allowlisting, and apply the principle of least privilege. This is an application of **[D3FEND User Account Permissions (D3-UAP)](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)**.

**Tags:** Data Breach, Supply Chain Attack, ShinyHunters, Mixpanel, SoundCloud, Pornhub, DDoS, Extortion

## Sources
- [User Data Compromised in SoundCloud Hack](https://www.securityweek.com/user-data-compromised-in-soundcloud-hack/) — SecurityWeek (2025-12-16)
- [Pornhub Data Breach Exposes Premium Member Search and Watch History](https://botcrawl.com/pornhub-data-breach-exposes-premium-member-search-and-watch-history/) — Botcrawl (2025-12-16)
- [Pornhub targeted in extortion attempt following Mixpanel breach exposing user activity](https://securityaffairs.co/165524/data-breach/pornhub-extortion-attempt-mixpanel-breach.html) — Security Affairs (2025-12-16)
- [SoundCloud discloses data breach incident impacting 20% of users](https://cyberinsider.com/soundcloud-discloses-data-breach-incident-impacting-20-of-users/) — Cyber Insider (2025-12-16)

---
Source: https://cyber.netsecops.io/articles/soundcloud-and-pornhub-disclose-user-data-breaches/
