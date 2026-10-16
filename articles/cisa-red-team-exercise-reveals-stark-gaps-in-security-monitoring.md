# CISA Red Team Exercise Reveals Stark Gaps in Security Monitoring

**Severity:** medium | **Category:** Security Operations,Incident Response,Threat Intelligence | **Updated:** 2026-08-30 | **Reading time:** 4 min

A CISA red team assessment of two critical infrastructure organizations produced dramatically different outcomes, as detailed in an advisory, 'A Tale of Two SOCs.' A water utility quickly detected and neutralized the intrusion, while a government services entity failed to detect any malicious activity, including domain-level compromise. The exercise highlights that poorly configured security tools and alert fatigue can render a security operations center (SOC) ineffective, underscoring the importance of well-tuned and responsive security operations.

## Executive Summary
The **[U.S. Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)** has published an advisory, "A Tale of Two SOCs" (AA26-237A), detailing the results of two parallel red team exercises against critical infrastructure organizations. The report serves as a powerful case study on the difference between having security tools and having effective security operations. One organization, a water utility, demonstrated a mature defensive posture by rapidly detecting and containing the CISA red team. The other, a government services entity, was completely compromised without generating a single alert, blinded by thousands of false positives from poorly configured tools. The findings provide crucial lessons for all organizations on the importance of security operations maturity.

## Incident Timeline
The advisory details two concurrent but separate red team engagements.

### Organization A: Government Services and Facilities Sector
-   **Initial Access:** The CISA red team exploited default credentials on a web application.
-   **Execution & Persistence:** They used this access to send an internal phishing email, compromising four workstations. They established persistence by abusing misconfigured **[Active Directory Certificate Services (AD CS)](https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/active-directory-certificate-services-overview)** templates, a technique similar to 'Certighost'.
-   **Discovery & Lateral Movement:** The team found cleartext credentials, including static **[Amazon Web Services (AWS)](https://aws.amazon.com/)** access keys, on file shares. This allowed them to move laterally to business-critical systems and cloud resources.
-   **Defense Evasion:** The red team gained access to the security team's email inbox to monitor for detection but found no signs of their activity being noticed.
-   **Outcome:** **Total Failure of Detection.** The organization's Security Operations Center (SOC) was overwhelmed with thousands of false-positive alerts from misconfigured tools, which completely masked the real, sophisticated intrusion. The red team achieved all its objectives, including domain-level compromise.

### Organization B: Water and Wastewater Systems Sector
-   **Initial Access:** The CISA red team attempted to gain initial access using similar TTPs.
-   **Detection & Response:** The organization's SOC detected the initial access attempts within one hour.
-   **Containment:** The SOC team correctly identified the access vector, isolated the affected systems, and began remediation procedures.
-   **Outcome:** **Successful Defense.** The red team was unable to achieve its objectives. The SOC's quick and effective response neutralized the threat before any significant impact could occur.

## Technical Findings
The primary technical gap at Organization A was not a lack of tools, but a failure to properly implement and manage them. The SOC was effectively non-functional due to alert fatigue. Key misconfigurations included:
-   **Default Credentials:** A simple but high-impact failure.
-   **AD CS Misconfiguration:** A common but complex vulnerability that allows for privilege escalation.
-   **Credential Storage:** Storing credentials and access keys in cleartext on file shares.

In contrast, Organization B demonstrated effective use of its security stack, with well-tuned alerts, clear escalation procedures, and an empowered team capable of taking decisive action.

## Detection & Response
The report emphasizes that effective detection and response is a combination of people, process, and technology:
1.  **Alert Tuning:** Security tools must be tuned to reduce false positives, allowing analysts to focus on real threats. This is a crucial aspect of implementing **[D3FEND](https://d3fend.mitre.org/)**'s detection techniques like [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
2.  **Hypothesis-Driven Hunting:** Instead of passively waiting for alerts, mature SOCs actively hunt for threats based on intelligence and hypotheses about attacker behavior.
3.  **Integrated Tooling:** A well-integrated security stack (e.g., EDR, NDR, SIEM) provides a holistic view, making it easier to connect disparate events into a coherent attack chain.

## Lessons Learned
-   **Technology is Not a Panacea:** Owning security tools is meaningless if they are not properly configured and monitored by a skilled team.
-   **Alert Fatigue is a Threat:** An overwhelming volume of low-fidelity alerts is as dangerous as no alerts at all, as it desensitizes analysts and hides real attacks.
-   **Fundamentals Matter:** Failures in basic cybersecurity hygiene, such as managing default credentials and securing secrets, provide easy entry points for attackers.

## Mitigation Recommendations
Based on the findings, CISA recommends that organizations:
1.  **Invest in People and Process:** Prioritize hiring, training, and retaining skilled security analysts. Develop and drill clear incident response playbooks.
2.  ** Harden Active Directory:** Specifically audit and correct AD CS misconfigurations and other common AD vulnerabilities.
3.  **Implement Secrets Management:** Eliminate the storage of cleartext credentials. Use secure vaults for managing passwords, API keys, and other secrets.
4.  **Conduct Adversary Emulation:** Regularly test defenses with red team exercises or breach and attack simulation (BAS) tools to identify gaps in a controlled manner.

**Tags:** cisa, red team, soc, security operations, incident response, alert fatigue, active directory

## Sources
- [CISA Red Team Compromised Two Critical Infrastructure Orgs, One Detected Nothing](https://thehackernews.com/2026/08/cisa-red-team-compromised-two-critical.html) — The Hacker News (2026-08-26)
- [this week in security — august 30 2026 edition](https://this.weekinsecurity.com/this-week-in-security-august-30-2026-edition/) — This Week In Security (2026-08-30)

---
Source: https://cyber.netsecops.io/articles/cisa-red-team-exercise-reveals-stark-gaps-in-security-monitoring/
