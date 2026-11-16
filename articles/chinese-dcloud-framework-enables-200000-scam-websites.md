# Over 200,000 Scam Sites Powered by Legitimate Chinese DCloud Framework, Infoblox Reports

**Severity:** high | **Category:** Phishing,Cyberattack,Threat Intelligence | **Updated:** 2026-06-28 | **Reading time:** 4 min

Cybersecurity firm Infoblox has uncovered a massive network of over 200,000 fraudulent websites being powered by a legitimate Chinese open-source framework called DCloud Uni-App. Threat actors are creating and selling scam templates built with the toolkit, enabling a wide array of investment scams, fake gambling sites, brand impersonations, and "pig-butchering" schemes on a global scale. The abuse of this legitimate tool allows scammers to rapidly deploy convincing and functional fraudulent applications.

## Executive Summary
Research from cybersecurity firm **[Infoblox](https://www.infoblox.com/)** has exposed the large-scale abuse of **DCloud Uni-App**, a legitimate Chinese open-source development framework. Threat actors are leveraging this cross-platform toolkit to build and deploy a staggering 200,000+ fraudulent websites and applications. These operations span a wide range of malicious activities, including fake cryptocurrency exchanges, fraudulent investment platforms, brand impersonation phishing sites, and elaborate "pig-butchering" romance scams. The report highlights a thriving underground market where developers sell scam templates created with Uni-App, allowing even low-skilled criminals to launch sophisticated fraudulent campaigns. This represents a significant industrialization of online fraud, making it harder for defenders to distinguish between legitimate and malicious applications built with the same underlying technology.

## Threat Overview
- **Attacker:** Hundreds of different threat actors and groups involved in financial fraud.
- **Methodology:** The abuse of the legitimate **DCloud Uni-App** framework. This framework allows developers to write code once (using Vue.js) and deploy it across various platforms, including iOS, Android, and web browsers, making it highly efficient for scammers.
- **Infrastructure:** Infoblox identified over 236,000 second-level domains associated with this activity. The coordinated nature of some domain registrations suggests a degree of centralization, possibly with certain entities providing infrastructure-as-a-service to scammers.
- **Types of Scams:**
  - **Investment Fraud:** Fake platforms promising high returns, such as the `RainbowEx` crypto scam.
  - **Pig Butchering:** Long-term scams where trust is built with a victim before they are lured into a fraudulent investment.
  - **Brand Impersonation:** Phishing sites that mimic legitimate companies to steal credentials or financial information.
  - **Elaborate Frauds:** High-effort scams like the `Lightning Shared Scooter Co. (LSSC)`, which set up physical storefronts in the U.S. to appear legitimate while bilking investors out of millions.

## Technical Analysis
The use of the Uni-App framework provides several advantages to scammers:
1.  **Rapid Deployment:** Scammers can purchase pre-made templates and quickly deploy a functional, professional-looking fraudulent app or website. This is an abuse of [`T1588.002 - Obtain Capabilities: Tool`](https://attack.mitre.org/techniques/T1588/002/).
2.  **Cross-Platform Capability:** A single codebase can be used to target users on mobile and web platforms simultaneously, maximizing the potential victim pool.
3.  **Evasion:** Because Uni-App is a legitimate and widely used framework, it is difficult for security tools to block the framework itself. Detection must rely on behavioral analysis, domain reputation, and content analysis rather than blacklisting the underlying technology.
4.  **Centralized Control:** In some cases, such as the `Yuechi Sharing Technology Ltd. (YST)` operation, the Uni-App frontend connects to a broader network of backend servers shared by multiple scam sites, indicating a **[Ransomware-as-a-Service](https://en.wikipedia.org/wiki/Ransomware_as_a_service)**-like model for fraud, or "Scam-as-a-Service."

## Impact Assessment
The primary impact is massive financial loss for individuals worldwide. The sheer scale of over 200,000 sites indicates that these campaigns are likely responsible for billions of dollars in theft annually. The LSSC scam alone resulted in millions of dollars in losses in the U.S. This industrialization of fraud also erodes public trust in online investments and e-commerce. For security teams, it creates a significant challenge in differentiating legitimate apps from malicious ones, increasing the noise and complexity of threat detection.

## Detection & Response
- **Domain Reputation:** Monitor for newly registered domains (NRDs) with patterns similar to those used by the scammers (e.g., using certain keywords, TLDs, or registration services). This is a form of **[D3FEND DNS Analysis](https://d3fend.mitre.org/technique/d3f:DNSAnalysis)**.
- **Content Analysis:** Scan websites for common phrases, images, and structural elements found in the scam templates. This can be used to build a signature-based detection system.
- **User Education:** The most effective defense is to educate users on the red flags of investment scams: promises of guaranteed high returns, pressure to invest quickly, and requests to use cryptocurrency.
- **Reporting:** Encourage users to report scam sites to authorities and domain registrars to facilitate takedowns.

## Mitigation
1.  **Threat Intelligence:** Subscribe to threat intelligence feeds that track fraudulent domains and infrastructure. Use this data to populate blocklists in web filters, firewalls, and DNS security solutions, aligning with [`M1037 - Filter Network Traffic`](https://attack.mitre.org/mitigations/M1037/).
2.  **DNS Security:** Deploy DNS filtering solutions that can block access to known malicious or newly registered domains before a user can connect to them.
3.  **Browser Security:** Encourage the use of modern browsers with built-in phishing and malware protection, which leverage data from services like Google Safe Browsing.
4.  **User Awareness Training:** Conduct regular training on how to spot investment scams, phishing attempts, and pig-butchering tactics, as per [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** Scam, Phishing, Investment Fraud, Pig Butchering, Infoblox, DCloud, Threat Intelligence

## Sources
- [Chinese Framework Powers 200,000 Scam Sites](https://www.securityweek.com/chinese-framework-powers-200000-scam-sites/) — SecurityWeek (2026-06-27)
- [Chinese Framework Behind 200,000 Scam Sites: Cybersecurity Threat Unveiled](https://www.news4hackers.com/chinese-framework-behind-200000-scam-sites-cybersecurity-threat-unveiled/) — News4Hackers (2026-06-27)

---
Source: https://cyber.netsecops.io/articles/chinese-dcloud-framework-enables-200000-scam-websites/
