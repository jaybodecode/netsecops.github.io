# DCSA: Foreign Spies Target US Defense Experts via Email

**Severity:** informational | **Category:** Threat Intelligence,Policy and Compliance | **Updated:** 2026-09-18 | **Reading time:** 3 min

A new report from the Defense Counterintelligence and Security Agency (DCSA) details how foreign intelligence entities (FIEs) are targeting the U.S. defense industrial base. The FY 2025 report found that 'exploitation of experts' was the most common tactic, with email being the top vector for initial contact. Adversaries from the East Asia and Pacific region were responsible for 48% of all reported incidents, using lures like paid consultations and fake job offers to gain access to sensitive U.S. technology and information.

## Executive Summary
The **[Defense Counterintelligence and Security Agency (DCSA)](https://www.dcsa.mil)** released its annual "Targeting U.S. Technologies" report on September 17, 2026, revealing persistent and sophisticated efforts by foreign intelligence entities (FIEs) to compromise the U.S. cleared defense industrial base. The report, analyzing data from fiscal year 2025, highlights that FIEs most commonly attempt to co-opt subject matter experts (28% of incidents) and use email as their primary method for initial contact (30% of attempts). Geographically, entities from the East Asia and Pacific region remain the most significant threat, accounting for nearly half of all collection attempts. The DCSA urges cleared personnel to be vigilant against unsolicited professional and commercial outreach.

---

## Threat Overview
Foreign adversaries are employing a blended approach that combines traditional human intelligence (HUMINT) with cyber-enabled tactics to target cleared U.S. personnel and contractors. Instead of relying solely on technical exploits, FIEs are using social engineering at scale, leveraging professional networking and business opportunities as a pretense to access sensitive and classified information. The DCSA analyzed over 22,000 suspicious contact reports in FY 2025, identifying 2,900 as legitimate attempts by FIEs to gather intelligence.

### Key Tactics and Trends
- **Primary Tactic**: Exploitation of Experts (28% of incidents). FIEs actively seek out and build relationships with cleared experts, researchers, and engineers to gain their specialized knowledge.
- **Primary Vector**: Email (30% of initial contacts). This is followed by academic résumé submissions and web forms, indicating a focus on professional and recruitment channels.
- **Common Lures**: Adversaries use a variety of seemingly legitimate approaches, including:
  - Paid consultations and expert network requests
  - Fake job recruitment and talent acquisition
  - Conference invitations and calls for papers
  - Supplier relationships and business partnership proposals
- **Geographic Threat Source**: The East Asia and Pacific region was the origin of 48% of all incidents, followed by the Near East at 19%.
- **Targeted Technologies**: While broad sectors like Services, Electronics, and Aeronautics were heavily targeted, FIEs also showed strong interest in emerging technologies such as AI, unmanned aircraft systems (UAS), and advanced telecommunications.

## Impact Assessment
The success of these foreign intelligence operations poses a direct threat to U.S. national security and economic competitiveness. The theft of sensitive or classified defense technology can erode the U.S. military's technological advantage, accelerate foreign military modernization, and compromise the integrity of the defense supply chain. For cleared contractors and personnel, falling victim to these schemes can result in loss of security clearance, legal repercussions, and significant reputational damage.

## Detection & Response
- **Vetting Unsolicited Contact**: All cleared personnel should treat any unsolicited professional or commercial offer with skepticism, especially those originating from unknown or foreign entities. Verify the legitimacy of the company, recruiter, and opportunity through independent channels before engaging. This is a key aspect of [D3-OT: Olfactory Testing](https://d3fend.mitre.org/technique/d3f:OlfactoryTesting) (i.e., a 'smell test' for legitimacy).
- **Reporting**: It is critical that all suspicious contacts are reported to the organization's Facility Security Officer (FSO) and through the DCSA's established reporting channels. These reports provide the DCSA with the raw intelligence needed to identify and counter FIE campaigns.
- **Counterintelligence Programs**: Cleared facilities must have robust counterintelligence programs that include regular awareness briefings for all personnel. These briefings should cover the latest FIE tactics, common lures, and reporting procedures.

## Mitigation
- **User Training**: The most critical mitigation is continuous and targeted security training ([M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)). Personnel must be educated on the specific social engineering tactics detailed in the DCSA report so they can recognize and report them.
- **Email Security**: Implement advanced email security gateways that can detect and block spear-phishing attempts. Configure filters to flag emails from high-risk geographic regions or those containing suspicious links or attachments.
- **Limit Public Information**: Advise cleared personnel to be cautious about the amount of detailed professional information they share on public platforms like LinkedIn. FIEs use this information for targeting ([`T1593 - Search Open Websites/Domains`](https://attack.mitre.org/techniques/T1593/)).
- **Travel Security**: Provide pre-travel security briefings for employees traveling to high-risk countries, as FIEs often use conferences and international travel as opportunities for in-person approaches.

**Tags:** espionage, social-engineering, phishing, defense-industrial-base, national-security

## Sources
- [DCSA report: Foreign intelligence entities continue to target U.S. cleared industry with outreach, commercial activity, cyber means](https://www.dcsa.mil/About-Us/News/Article/Article/4603722/dcsa-report-details-foreign-efforts-to-exploit-experts-and-business-ties-to-acc/) — DCSA

---
Source: https://cyber.netsecops.io/articles/dcsa-report-foreign-spies-target-us-defense-industry-via-experts-and-email/
