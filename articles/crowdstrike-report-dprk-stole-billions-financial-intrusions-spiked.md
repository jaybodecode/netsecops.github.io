# CrowdStrike: North Korea Stole Billions in Crypto, Financial Sector Attacks Up 43%

**Severity:** critical | **Category:** Threat Actor,Threat Intelligence,Data Breach | **Updated:** 2026-05-21 | **Reading time:** 4 min

CrowdStrike's 2026 Financial Services Threat Landscape Report, released May 20, 2026, details a massive escalation in cyberattacks against the financial sector, driven by North Korean state actors and organized eCrime groups. DPRK-nexus adversaries, such as PRESSURE CHOLLIMA and GOLDEN CHOLLIMA, stole billions in cryptocurrency in 2025, including a single record-breaking theft of $1.46 billion. These groups are now using AI for social engineering and deception. Overall, hands-on-keyboard intrusions against financial firms surged 43% globally, with attackers increasingly exploiting trusted identities and SaaS applications to bypass defenses. The eCrime group MUTANT SPIDER was also a major driver, using vishing campaigns to gain initial access for ransomware operations.

## Executive Summary
The **[CrowdStrike](https://www.crowdstrike.com/)** 2026 Financial Services Threat Landscape Report, released on May 20, 2026, paints a dire picture of the threats facing the global financial sector. The report highlights a 43% global increase in hands-on-keyboard intrusions against financial institutions over the past two years. State-sponsored actors from the Democratic People’s Republic of Korea (DPRK) are leading the charge, having stolen billions in cryptocurrency in 2025. The DPRK group **PRESSURE CHOLLIMA** was responsible for the largest single financial theft ever recorded at $1.46 billion, achieved via a supply chain compromise. Concurrently, organized eCrime syndicates like **MUTANT SPIDER** are scaling their operations, using vishing and a network of initial access brokers to fuel ransomware attacks. Attackers are evolving their tactics, focusing on the exploitation of trusted identities and **[SaaS](https://en.wikipedia.org/wiki/Software_as_a_service)** applications to circumvent traditional security measures.

## Threat Overview
The report identifies several key trends and threat actors targeting the financial industry:

-   **DPRK-Nexus Adversaries:** North Korean groups remain the most formidable state-sponsored financial threat.
    -   **PRESSURE CHOLLIMA:** Conducted a record-breaking $1.46 billion cryptocurrency theft by compromising a software supply chain with a trojanized application.
    -   **GOLDEN CHOLLIMA:** Utilized sophisticated social engineering lures, including fake job recruitment offers, to compromise fintech companies in Southeast Asia and Canada, gaining access to cloud environments and diverting cryptocurrency.
    -   **AI-Powered Deception:** These groups are now using AI to enhance their social engineering campaigns, making them more believable and effective.

-   **eCrime Syndicates:** Financially motivated criminal groups are increasing the volume and sophistication of their attacks.
    -   **MUTANT SPIDER:** A major contributor to the surge in intrusions, this group specializes in vishing (voice phishing) to gain initial access and obtain credentials, which are then sold to ransomware operators.
    -   **Data Leak Sites:** 423 financial services organizations were named on dedicated data leak sites, a 27% increase year-over-year, indicating a rise in successful data exfiltration and extortion campaigns.

## Technical Analysis
Attackers are focusing on identity and trusted relationships to bypass defenses:

-   **[`T1195.002 - Compromise Software Supply Chain`](https://attack.mitre.org/techniques/T1195/002/):** As demonstrated by **PRESSURE CHOLLIMA**, compromising a single piece of software used by many financial institutions can lead to a massive, widespread breach.
-   **[`T1566.003 - Spearphishing via Service`](https://attack.mitre.org/techniques/T1566/003/):** **GOLDEN CHOLLIMA**'s use of recruitment-themed lures on platforms like LinkedIn is a classic example of this technique.
-   **[`T1648 - Vishing`](https://attack.mitre.org/techniques/T1648/):** **MUTANT SPIDER**'s primary initial access method, where they call employees pretending to be IT support to trick them into giving up credentials or MFA codes.
-   **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** The end goal of many of these initial access techniques is to obtain legitimate credentials, which are then used to access SaaS applications and cloud environments, blending in with normal user activity.

## Impact Assessment
The financial impact of these campaigns is staggering, with billions of dollars in cryptocurrency stolen. This not only causes direct financial loss but also undermines trust in the digital asset ecosystem. The 43% increase in hands-on intrusions indicates that attackers are spending more time within victim networks, allowing for deeper compromise and greater data theft. The targeting of SaaS applications is particularly concerning, as these often hold a company's most sensitive data and are managed outside the traditional network perimeter, making them a blind spot for some security teams.

## Detection & Response
-   **Identity Threat Detection and Response (ITDR):** Deploy ITDR solutions to monitor for anomalous authentication events, privilege escalations, and unusual access patterns, especially in cloud and SaaS environments.
-   **Monitor for Vishing Indicators:** Train help desk staff to be aware of vishing tactics. Monitor for an unusual number of MFA push notification rejections or password resets for a single user, as this can indicate a vishing attack in progress.
-   **Supply Chain Auditing:** Regularly audit the security of third-party software and service providers, especially those integrated into critical financial transaction systems.

## Mitigation
-   **Phishing-Resistant MFA:** Implement FIDO2-based MFA to protect against credential theft and vishing-based MFA bypass attempts.
-   **SaaS Security Posture Management (SSPM):** Use SSPM tools to gain visibility into the configuration of SaaS applications, enforce security policies, and detect threats within these environments.
-   **User Training:** Conduct regular, targeted training on social engineering tactics, including vishing and AI-powered spear-phishing. Use simulations to test employee awareness.
-   **Limit Access:** Enforce the principle of least privilege for all accounts, especially in cloud and SaaS environments, to limit the blast radius of a compromised identity.

**Tags:** CrowdStrike, DPRK, North Korea, PRESSURE CHOLLIMA, MUTANT SPIDER, Cryptocurrency, Financial Services, Threat Intelligence, Vishing

## Sources
- [CrowdStrike 2026 Financial Services Threat Landscape Report Reveals DPRK-Nexus Adversaries Stole Billions, Industrialized Cybercrime with AI-Powered Deception](https://www.crowdstrike.com/press-releases/crowdstrike-2026-financial-services-threat-landscape-report-reveals-dprk-nexus-adversaries-stole-billions/) — CrowdStrike (2026-05-20)
- [DPRK Hackers Stole Billions in Crypto and Used AI to Deceive Victims (Fictional)](https://www.infosecurity-magazine.com/news/dprk-hackers-stole-crypto-ai/) — Infosecurity Magazine (2026-05-20)

---
Source: https://cyber.netsecops.io/articles/crowdstrike-report-dprk-stole-billions-financial-intrusions-spiked/
