# Australian Health Audit Finds Clinicians Routinely Bypass Security Controls

**Severity:** medium | **Category:** Policy and Compliance,Security Operations,Threat Intelligence | **Updated:** 2025-12-21 | **Reading time:** 5 min

An audit of the New South Wales (NSW) healthcare system in Australia has revealed that clinicians are routinely bypassing critical cybersecurity controls, such as password sharing and using personal devices, to save time in high-pressure environments. This widespread "normalisation of non-compliance" creates significant security gaps and increases the risk of cyberattacks in the already heavily targeted healthcare sector, highlighting a critical failure in security culture.

## Executive Summary

An audit of the New South Wales (NSW) Health system in Australia has exposed a deeply rooted cultural issue that undermines its cybersecurity posture. The report reveals a "normalisation of non-compliance" among clinical staff, who routinely bypass fundamental security controls. Practices such as password sharing and using personal devices for work are reportedly commonplace, driven by a desire to save time in high-pressure clinical settings. These findings are particularly alarming given the sensitive nature of patient data and the fact that the Australian healthcare sector is under constant attack from cybercriminals, as evidenced by the recent ransomware attack on the Genea fertility clinic. The audit underscores that technical security investments are being negated by human factors and a lack of security culture.

## Incident Overview

This is not a singular incident but a systemic finding from a security audit. The core issue is the widespread and accepted practice of circumventing security policies by clinical staff at **NSW Health**. Key findings include:

*   **Password Sharing**: Clinicians regularly share login credentials to access systems, completely breaking the principle of individual accountability.
*   **Use of Personal Devices**: Staff use personal mobile devices and applications for work-related tasks, moving sensitive patient data outside the secure, managed environment.
*   **Intentional Bypassing**: The non-compliance is not accidental but intentional, with clinicians making a conscious trade-off between security and perceived efficiency.

This behavior creates a massive, uncontrolled attack surface and renders many technical security controls, such as access logging and multi-factor authentication, ineffective.

## Technical Findings & Analysis

The root cause is not a technical vulnerability but a failure of process, culture, and user experience. The insecure behaviors directly enable several MITRE ATT&CK techniques:

*   **Initial Access**: [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): If one clinician's password is stolen (e.g., via phishing), the attacker effectively gains access to the accounts of every person they shared it with. This multiplies the impact of a single credential compromise.
*   **Defense Evasion**: By using personal devices, staff are evading corporate security monitoring, logging, and endpoint protection that would be present on managed devices.
*   **Collection**: Sensitive patient data is collected and stored on unmanaged, potentially insecure personal devices, making it an easy target for theft or loss.

> The audit highlights a critical lesson: if security controls are too cumbersome and impede critical workflows, users will find a way to bypass them. Security must be designed to be as seamless as possible, especially in high-stakes environments like healthcare.

## Lessons Learned

*   **Security Culture is Paramount**: Technical controls alone are not enough. A strong security culture, where every employee understands their role in protecting data, is essential.
*   **Usability vs. Security**: There is a direct conflict between usability and security in the NSW Health environment. When security measures are too intrusive, staff will prioritize patient care and efficiency over compliance.
*   **Insider Risk**: While the intent is not malicious, these practices create a significant insider risk. A negligent insider can cause as much damage as a malicious one.
*   **Accountability is Broken**: Password sharing makes it impossible to perform accurate incident investigation or hold individuals accountable, as logs will show the legitimate account owner performing actions they did not take.

## Mitigation Recommendations

Addressing this issue requires a multi-pronged approach that focuses on people, processes, and technology.

1.  **Improve Usability and Workflows (Technology)**: 
    *   Implement modern authentication solutions like tap-and-go badges (NFC) or biometric logins that are both secure and fast for clinicians.
    *   Deploy a secure, enterprise-grade messaging and collaboration platform to eliminate the need for staff to use personal apps like WhatsApp for work.
2.  **Mandatory and Continuous Training (People)**: 
    *   Implement role-based security awareness training that explains the *why* behind security policies, using real-world examples from healthcare breaches.
    *   Move beyond annual tick-box training to continuous reinforcement and phishing simulations. This aligns with [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Enforce Policies and Accountability (Process)**:
    *   Establish a zero-tolerance policy for password sharing. Leadership must champion and enforce this from the top down.
    *   Implement technical controls to detect password sharing, such as monitoring for concurrent logins from geographically distant locations.
    *   Strengthen password policies and enforce the use of **[Multi-factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** wherever possible, as recommended by [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
4.  **Secure Managed Devices**: Provide clinicians with fast, secure, and easy-to-use corporate-managed mobile devices (e.g., tablets) that give them the tools they need to do their jobs efficiently without resorting to personal devices.

**Tags:** Healthcare, Compliance, Insider Risk, Password Sharing, Security Culture, Australia

## Sources
- [Critical Australian Cyber Threats: React2Shell RCE, Healthcare Ransomware & Data Breaches](https://www.leansecurity.com.au/blog/daily-threat-briefing-australia-20-december-2025) — Lean Security (2025-12-20)
- [NSW health staff share passwords and sensitive patient data, audit finds](https://www.theguardian.com/australia-news/2023/dec/19/nsw-health-system-cyber-security-audit-staff-sharing-passwords) — The Guardian (2025-12-20)

---
Source: https://cyber.netsecops.io/articles/nsw-health-audit-reveals-widespread-bypass-of-cybersecurity-controls-by-clinicians/
