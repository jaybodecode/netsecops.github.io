# VCU Launches Security Campaign After Phishing and Hacking Incidents

**Severity:** medium | **Category:** Phishing,Incident Response,Cyberattack | **Updated:** 2026-08-26 | **Reading time:** 4 min

Following a series of cyberattacks, including a large-scale phishing campaign targeting over 7,000 students and a separate Canvas platform hack, Virginia Commonwealth University (VCU) is responding with a new awareness campaign. Titled "Stop, Verify, Report," the initiative aims to educate its community on how to spot and handle suspicious communications, emphasizing that individual vigilance is a key part of the university's defense strategy.

## Executive Summary

**[Virginia Commonwealth University (VCU)](https://www.vcu.edu/)** has launched a new cybersecurity awareness campaign, "Stop, Verify, Report," in response to a recent wave of cyber incidents targeting its students and platforms. The initiative follows a significant phishing campaign in early August that targeted over 7,000 students and an earlier incident in April where the university's Canvas learning platform was defaced. The campaign aims to arm students and faculty with a simple, memorable framework to combat social engineering attacks, reinforcing the idea that cybersecurity is a shared responsibility.

---

## Incident Timeline

-   **Late April 2026:** The hacking group **ShinyHunters** reportedly breached a third-party service, causing ransom notes to appear on the Canvas login pages for VCU and other universities.
-   **Early August 2026:** A large-scale phishing campaign is launched against VCU students. Over 7,000 students receive emails impersonating the "VCU IT Department."
-   **Attack Details:** The phishing emails created a false sense of urgency, threatening to remove students from their courses unless they immediately provided their login credentials and **Duo** multi-factor authentication codes.
-   **Late August 2026:** In response to the incidents, VCU officially launches the "Stop, Verify, Report" awareness campaign.

---

## Response Actions

VCU's response is a multi-departmental effort involving its Enterprise Marketing and Communications, Information Security Office, Student Affairs, and VCU Police. The core of the response is the "Stop, Verify, Report" campaign:

-   **Stop:** Encourages individuals to pause and think before clicking links or responding to urgent requests for information.
-   **Verify:** Instructs users to independently confirm the legitimacy of a suspicious message through an official, separate communication channel (e.g., calling the IT help desk using a known number).
-   **Report:** Guides users to report all suspicious emails to the university's dedicated phishing analysis address, allowing the security team to investigate and block threats.

In addition to the campaign, VCU has also initiated a "Security Heroes" program to recognize and reward community members who proactively report security issues.

---

## Technical Findings

The primary incident driving the campaign was a classic social engineering attack. The attackers leveraged several techniques:

-   **Impersonation:** Posing as a trusted entity (VCU IT Department).
-   **Urgency:** Creating a time-sensitive threat (removal from courses) to provoke a quick, emotional reaction.
-   **Credential Harvesting:** The goal was to steal usernames and passwords.
-   **MFA Bypass:** Specifically asking for Duo codes indicates the attackers were prepared to immediately use the stolen credentials to bypass multi-factor authentication and gain access to student accounts.

---

## Detection & Response Improvements

The incidents highlight that even with technical controls like MFA in place, attackers are adapting by targeting the human element. VCU's response focuses on strengthening this human firewall.

-   **Detection Gaps:** The initial phishing emails successfully reached thousands of student inboxes, indicating a need for enhanced email filtering and threat intelligence.
-   **Response Playbooks:** The coordinated campaign launch shows that the university has a playbook for communicating security issues and educational materials to its user base.
-   **User-Sourced Intelligence:** The "Report" function is critical, as it turns 7,000+ students into potential sensors for the security team, enabling faster detection and response to new phishing waves.

---

## Lessons Learned

-   **Humans are the New Perimeter:** As technical defenses improve, attackers are increasingly focusing on social engineering to trick individuals into giving up access.
-   **MFA is Not a Silver Bullet:** While essential, MFA can be bypassed through real-time phishing attacks where users are tricked into providing their one-time codes.
-   **Clear, Simple Communication is Key:** The "Stop, Verify, Report" framework is easy to remember and provides actionable guidance, which is more effective than complex technical instructions for a general audience.

---

## Mitigation Recommendations

Based on the incidents, VCU and similar organizations should focus on a defense-in-depth approach that combines technical controls with robust user education.

-   **Continuous User Training (M1017):** The campaign is a good start, but it should be reinforced with regular, mandatory security awareness training, including phishing simulations, for all students and staff.
-   **Enhanced Email Security:** Implement advanced email security gateways with capabilities for impersonation detection, malicious link analysis, and sandboxing of attachments.
-   **MFA Hardening:** Explore the use of phishing-resistant MFA, such as FIDO2 security keys, for high-risk users and systems to mitigate the threat of code-stealing phishing attacks.
-   **Incident Communication Plan:** Maintain and regularly test a clear communication plan for security incidents to ensure that users receive timely, accurate, and actionable information.

**Tags:** Phishing, Social Engineering, Education, Incident Response, Security Awareness, MFA

## Sources
- [VCU implements measures to address past cybersecurity threats](https://commonwealthtimes.org/2026/08/26/vcu-implements-measures-to-address-past-cybersecurity-threats/) — The Commonwealth Times
- [As cyberscams intensify, VCU offers three simple words for protection](https://www.news.vcu.edu/article/as-cyberscams-intensify-vcu-offers-three-simple-words-for-protection) — VCU News

---
Source: https://cyber.netsecops.io/articles/vcu-launches-security-campaign-after-phishing-and-hacking-incidents/
