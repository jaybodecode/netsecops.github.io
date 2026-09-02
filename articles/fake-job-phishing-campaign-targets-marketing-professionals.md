# Phishing Campaign Lures Marketing Professionals with Fake Jobs at Tesla, Google

**Severity:** medium | **Category:** Phishing,Data Breach | **Updated:** 2025-10-09 | **Reading time:** 4 min

Security firm Cofense has detailed a sophisticated phishing campaign that targets marketing and social media professionals with fake job opportunities from high-profile brands like Tesla, Google, Ferrari, and Red Bull. The campaign uses realistic emails and multi-step credential harvesting portals to trick victims. Unlike typical phishing attacks, the primary goal is to collect detailed resumes and other personally identifiable information (PII). This data can then be used by threat actors to craft more convincing social engineering attacks, bypass security questions, or commit identity theft.

## Executive Summary
Researchers at **[Cofense](https://cofense.com)** have identified an ongoing, sophisticated phishing campaign targeting marketing and social media professionals. Threat actors are impersonating world-renowned brands such as **[Tesla](https://www.tesla.com)**, **[Google](https://www.google.com)**, Ferrari, and Red Bull to lure victims with fake job applications. The campaign's primary objective is not just to steal login credentials but to harvest detailed resumes containing a wealth of Personally Identifiable Information (PII). This information provides attackers with high-quality data for use in future, more targeted social engineering attacks, identity theft, or bypassing knowledge-based authentication.

## Threat Overview
The campaign, active throughout the third quarter of 2024, leverages the strong brand recognition of major companies to build trust with its targets. The attack begins with a well-crafted phishing email, often using spoofed domains to appear legitimate. Victims who click the link are taken through a multi-stage process designed to mimic a real job application portal. This may include a CAPTCHA challenge to filter out security scanners, followed by a fake login page for a legitimate service like Glassdoor or Facebook. The final step is a form to upload a resume, which is the attackers' main prize.

## Technical Analysis
This is a classic social engineering attack with a focus on intelligence gathering rather than immediate financial gain or system access.

### MITRE ATT&CK Techniques
- [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The initial email containing a link to the fake job portal.
- [`T1598.002 - Job Listings`](https://attack.mitre.org/techniques/T1598/002/): The attackers are exploiting the public nature of job seeking to target a specific professional demographic.
- [`T1589.002 - Employee Names`](https://attack.mitre.org/techniques/T1589/002/): The harvested resumes provide attackers with names, contact details, and work histories, which are valuable for future reconnaissance.
- [`T1592.004 - Client-side Code`](https://attack.mitre.org/techniques/T1592/004/): The phishing pages are carefully crafted with HTML and CSS to impersonate real brands.

## Impact Assessment
While this attack may not lead to an immediate network compromise, its long-term impact can be severe. The stolen PII and professional histories can be used to:
-   **Craft highly convincing spearphishing attacks**: An attacker with a target's full resume can create an extremely plausible email from a 'former colleague' or 'recruiter.'
-   **Bypass security questions**: Resumes often contain information like high school, first job, or mother's maiden name, which are common security question answers.
-   **Commit identity theft**: The data can be used to open fraudulent accounts or take over existing ones.
-   **Corporate espionage**: Information about a company's marketing team structure and past projects could be valuable to competitors.
For the individuals targeted, it represents a significant breach of personal privacy. For their employers, it creates an ongoing risk, as these employees are now more vulnerable to future targeted attacks.

## Cyber Observables for Detection
| Type | Value | Description |
|---|---|---|
| url_pattern | `tesla.careers-portal.com` | Example of a suspicious subdomain designed to look legitimate. Monitor for domains that mimic real brands but use generic TLDs or extra words. |
| email_address | `hr@google-jobs.net` | Example of a spoofed sender email address. Train users to inspect the full email address, not just the display name. |
| log_source | `Email Gateway Logs` | Analyze for emails with suspicious links, especially those using URL shorteners or multiple redirects. |

## Detection & Response
1.  **Email Security Gateway**: Use an advanced email security solution that can analyze URLs at time-of-click and detect impersonation tactics. Use D3FEND's [`URL Analysis (D3-UA)`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) to identify malicious links.
2.  **User Training**: This is the most critical defense. Train all employees, especially those in public-facing roles like marketing, to be skeptical of unsolicited job offers. Teach them to verify job openings on the company's official career site before clicking any links or providing information.
3.  **Reporting Mechanism**: Make it easy for employees to report suspicious emails to the security team. This provides valuable, real-time threat intelligence.

## Mitigation
1.  **Verify, Then Trust**: The core mitigation is behavioral. Always manually navigate to a company's official website to verify a job opening instead of clicking a link in an email.
2.  **Limit Public Information**: Advise employees to be mindful of the amount of personal information they share on professional networking sites like LinkedIn, as this data is often used by attackers for targeting.
3.  **Data Minimization on Resumes**: When applying for jobs, consider creating tailored resumes that only include information directly relevant to the position, omitting overly personal details.
4.  **Credential Management**: Never reuse passwords across different sites. If a credential is stolen from a fake portal, the damage is contained if that password is unique.

**Tags:** Phishing, Social Engineering, Credential Harvesting, PII, Cofense

## Sources
- [Phishing Alert: Fake Job Applications Targeting Marketers](https://cofense.com/blog/phishing-alert-fake-job-applications-targeting-marketers/) — Cofense (2025-10-08)
- [Cybersecurity Threat Research Feed – Latest Intelligence Updates](https://securonix.com/blog/threat-research-feed-updates/) — Securonix (2025-10-08)

---
Source: https://cyber.netsecops.io/articles/fake-job-phishing-campaign-targets-marketing-professionals/
