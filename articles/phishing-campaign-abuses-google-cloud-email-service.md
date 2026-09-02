# Living Off the Cloud: Phishing Campaign Abuses Google Cloud Service to Bypass Security Filters

**Severity:** medium | **Category:** Phishing,Cloud Security,Cyberattack | **Updated:** 2025-12-28 | **Reading time:** 5 min

A widespread and sophisticated phishing campaign is abusing Google Cloud's own Application Integration service to send malicious emails that appear to come from a legitimate Google address ("noreply-application-integration@google.com"). This technique allows the emails to bypass standard security filters like SPF and DMARC. The campaign, which sent nearly 9,400 emails in two weeks, impersonates routine notifications to trick users into clicking links that lead to credential harvesting pages, demonstrating how attackers are increasingly weaponizing trusted cloud platforms.

## Executive Summary
A novel phishing campaign discovered in December 2025 is successfully bypassing email security controls by abusing a legitimate feature in **[Google Cloud's](https://cloud.google.com/)** Application Integration service. Threat actors are exploiting the service's "Send Email" task to dispatch malicious emails from the trusted, Google-owned domain `noreply-application-integration@google.com`. Because these emails originate from Google's infrastructure, they pass SPF and DMARC authentication checks, making them appear legitimate and significantly increasing their delivery rate. The campaign has already targeted thousands of users globally with emails designed to mimic routine business notifications, luring them to credential harvesting sites. This "living off the land" tactic highlights a growing trend of attackers misusing trusted cloud services to evade detection.

---

## Threat Overview
- **Technique:** Abuse of the "Send Email" task within Google Cloud's Application Integration service.
- **Vector:** Phishing emails sent from `noreply-application-integration@google.com`.
- **Advantage:** Emails pass DMARC/SPF checks, bypassing many email gateways and gaining user trust.
- **Scale:** 9,394 phishing emails sent to ~3,200 customers across the U.S., APAC, Europe, Canada, and Latin America in a 14-day period.
- **Lure:** Emails are crafted to look like official notifications (e.g., voicemail alerts, file access requests for a "Q4" document) and use Google's styling to appear authentic.
- **Goal:** Trick users into clicking malicious links that lead to credential harvesting pages or malware downloads.

## Technical Analysis
This attack is a prime example of Enterprise Application Abuse, a sub-technique of [`T1102 - Web Service`](https://attack.mitre.org/techniques/T1102/). The attackers are not compromising Google's infrastructure; they are using a publicly available feature for malicious purposes.

**Attack Chain:**
1.  **Setup:** The attacker creates a Google Cloud project and configures an Application Integration workflow.
2.  **Configuration:** Within the workflow, they use the legitimate "Send Email" task. This task is intended for developers to send automated notifications from their applications.
3.  **Weaponization:** The attacker configures the task to send emails to a list of external target addresses. They customize the email body and subject to create a convincing phishing lure.
4.  **Execution:** The attacker triggers the integration, causing Google's own servers to send the phishing emails on their behalf.
5.  **Evasion:** The emails arrive in the victim's inbox from a trusted Google source, bearing all the digital signatures of a legitimate email. This defeats many conventional anti-phishing checks that rely on sender reputation and domain authentication.

## Impact Assessment
The impact of this campaign is **medium** to **high**. While it doesn't involve a vulnerability in Google Cloud itself, its effectiveness in bypassing security controls is significant. The high credibility of the sender address (`google.com`) dramatically increases the likelihood that users will click the malicious link. A successful attack can lead to:
- Widespread credential compromise across an organization.
- Business Email Compromise (BEC) attacks launched from the stolen accounts.
- Malware and ransomware infections.
- Unauthorized access to sensitive corporate data.

This tactic forces security teams to look beyond simple sender verification and scrutinize the content and intent of emails even from trusted sources.

## Detection & Response
**Detection Strategies:**
1.  **Email Gateway Rules:** While the sender is trusted, email security gateways can be configured to flag or quarantine emails from `noreply-application-integration@google.com` that contain suspicious links or language. This requires more advanced content analysis.
2.  **URL Analysis (D3-UA):** Use email security solutions that can follow links to their final destination at time-of-click to identify credential harvesting pages, even if the initial link appears benign.
3.  **User Training (M1017):** This campaign underscores the importance of user education. Train users to be suspicious of unexpected requests, even from seemingly legitimate senders. They should be taught to hover over links to inspect the destination URL and to be wary of generic greetings or urgent calls to action.

**Response:**
- If a user clicks a link and enters credentials, initiate an immediate password reset and check for any unauthorized forwarding rules or account changes.
- Report the phishing email to Google to help them identify and shut down the malicious Application Integration project.

## Mitigation
**Strategic Recommendations:**
1.  **Restrict Web-Based Content (M1021):** Use a secure email gateway and web proxy to block access to known malicious domains and newly registered domains, which are often used for phishing landing pages. This provides a safety net if a user clicks a malicious link.
2.  **Multi-factor Authentication (M1032):** Enforce MFA for all applications. This is the single most effective control for mitigating the impact of stolen credentials. Even if a user is tricked into giving up their password, the attacker cannot log in without the second factor.
3.  **Application Allowlisting (for cloud services):** In mature environments, organizations can configure their Google Cloud Organization Policy to restrict the use of certain services, like Application Integration, to only authorized projects. This can prevent shadow IT abuse.
4.  **Security Awareness:** Focus training on the tactics of modern phishing. Emphasize that trust should not be based on the sender's email address alone, but on the context and content of the message.

**Tags:** Phishing, Google Cloud, Cloud Security, Email Security, DMARC, SPF, Living off the Land

## Sources
- [Cybercriminals Abuse Google Cloud Email Feature in Multi-Stage Phishing Campaign](https://thehackernews.com/2026/01/cybercriminals-abuse-google-cloud-email-feature.html) — The Hacker News (2025-12-27)
- [Abusing Google Cloud’s Application Integration for Phishing Campaigns](https://research.checkpoint.com/2026/01/abusing-google-cloud-for-phishing/) — Check Point Research (2025-12-27)

---
Source: https://cyber.netsecops.io/articles/phishing-campaign-abuses-google-cloud-email-service/
