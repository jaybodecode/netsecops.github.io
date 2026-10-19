# Microsoft & Partners Disrupt Major Phishing-as-a-Service Operation

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-10-17 | **Reading time:** 4 min

Microsoft, Health-ISAC, and international partners have disrupted a major Chinese-language Phishing-as-a-Service (PhaaS) marketplace. The operation took down infrastructure for three criminal businesses—YAM Store, CoGUI, and Iron Man—that supplied phishing kits and services to threat actors worldwide, enabling over one billion malicious messages targeting more than 75,000 organizations.

## Executive Summary
On October 15, 2026, **[Microsoft](https://www.microsoft.com/security)**, the **Health Information Sharing and Analysis Center (Health-ISAC)**, and Japan's National Police Agency announced a major disruption against a prolific Chinese-language Phishing-as-a-Service (PhaaS) ecosystem. The coordinated operation seized and redirected domains belonging to three criminal enterprises: **YAM Store** (tracked by Microsoft as **Storm-3119**), **CoGUI**, and **Iron Man** (whose kit is tracked as **Storm-2990**). These services provided the tools and infrastructure for threat actors to launch widespread phishing campaigns, which targeted over 75,000 organizations in more than 150 countries and generated tens of millions of dollars for the operators.

---

## Threat Overview
The disrupted marketplace was a one-stop shop for cybercriminals, significantly lowering the barrier to entry for conducting large-scale phishing attacks. The services offered included:
- **Phishing Kits:** The **CoGUI** and **Iron Man System** kits provided thousands of phishing templates mimicking legitimate login pages for popular services.
- **Infrastructure:** The **YAM Store** served as a central marketplace, selling compromised Microsoft and Google environments for hosting malicious content.
- **Advanced Techniques:** The operators employed sophisticated methods, including using AI to create fake organizations and abusing legitimate services like SharePoint and OneDrive to evade detection. They also utilized device-code phishing techniques to steal authentication tokens, which can bypass some forms of **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)**.

This PhaaS model enabled a global network of criminals to attack a wide range of industries, with a significant focus on healthcare and financial services.

---

## Technical Analysis
The operation's success hinged on a coordinated legal and technical effort to seize the domains used by the criminal infrastructure. The threat actors demonstrated a high level of sophistication:
- **[T1656 - Acquire Infrastructure](https://attack.mitre.org/techniques/T1656/)**: The YAM Store operators acquired and sold compromised cloud environments, providing ready-to-use infrastructure for phishing campaigns.
- **[T1566.002 - Spearphishing Link](https://attack.mitre.org/techniques/T1566/002/)**: The core service was enabling the creation and distribution of malicious links designed to steal credentials.
- **[T1539 - Steal Web Session Cookie](https://attack.mitre.org/techniques/T1539/)**: The use of device-code phishing is a modern technique to steal authentication tokens and session cookies, bypassing MFA prompts by tricking the user into authorizing a session on the attacker's device.
- **[T1587.001 - Malicious Domain](https://attack.mitre.org/techniques/T1587/001/)**: The operators registered and managed a vast network of domains to host their phishing kits and landing pages.

Microsoft's threat intelligence designated the YAM Store operators as **Storm-3119** and the Iron Man kit developers/operators as **Storm-2990**.

---

## Impact Assessment
This takedown represents a significant disruption to the cybercrime supply chain. By removing the infrastructure for YAM Store, CoGUI, and Iron Man, the operation has:
- **Increased Costs for Attackers:** Criminals who relied on these cheap, effective services must now find new providers or develop their own tools, increasing their operational costs and complexity.
- **Prevented Future Attacks:** The seizure of the domains prevents the distribution of over one billion malicious messages that the services were projected to send.
- **Protected Potential Victims:** Over 75,000 organizations, particularly in vulnerable sectors like healthcare, are now safer from attacks originating from this ecosystem.
- **Gathered Intelligence:** The operation likely provided law enforcement and security researchers with valuable intelligence on the operators and their customers, which could lead to future arrests and disruptions.

---

## IOCs — Directly from Articles
No specific domains, IPs, or hashes were provided in the source articles.

---

## Detection & Response
While the primary infrastructure has been disrupted, defenders should remain vigilant for similar PhaaS-enabled attacks.

1.  **Detect Device-Code Phishing:** Monitor Azure AD sign-in logs for an increase in `device_code` grant types. Legitimate use is rare for most users. Correlate these events with user-reported phishing attempts. This can be supported by **[D3-UBA: User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)**.
2.  **Analyze Email Content:** Use email security gateways to scan for links pointing to newly registered domains or using URL shorteners. Analyze for language and templates commonly used in credential phishing.
3.  **Monitor Cloud Sharing:** Implement alerts for anomalous external sharing of files from SharePoint and OneDrive, as these services were abused by the threat actors to host malicious content. This aligns with **[D3-UDTA: User Data Transfer Analysis](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis)**.

---

## Mitigation
Strengthening defenses against phishing is the most effective long-term strategy.

1.  **Phishing-Resistant MFA:** Move towards phishing-resistant MFA methods like FIDO2 security keys or certificate-based authentication. These methods are not susceptible to token theft via device-code phishing. This is the most advanced form of **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
2.  **User Training:** Continuously train users to recognize the signs of phishing, especially modern techniques like MFA-bypass and consent grant attacks. Training should include simulations of device-code phishing flows.
3.  **Restrict Web Content:** Employ web filtering solutions to block access to known malicious domains and newly registered domains that are often used in phishing campaigns.
4.  **Email Gateway Configuration:** Ensure your email security gateway is configured to perform robust link analysis, sandboxing of attachments, and sender reputation checks.

**Tags:** PhaaS, takedown, cybercrime, phishing kit, device-code phishing

## Sources
- [Microsoft, Health-ISAC announce disruption to cybercriminal businesses supplying attacks on healthcare, others](https://www.aha.org/news/headline/2026-10-16-microsoft-health-isac-announce-disruption-cybercriminal-businesses-supplying-attacks-healthcare-others) — American Hospital Association (2026-10-16)
- [Cybersecurity News - October 16, 2026](https://cyberrecaps.com/news/cybersecurity-news-october-16-2026) — Cyber Recaps (2026-10-16)

---
Source: https://cyber.netsecops.io/articles/microsoft-and-partners-disrupt-major-phishing-as-a-service-marketplace/
