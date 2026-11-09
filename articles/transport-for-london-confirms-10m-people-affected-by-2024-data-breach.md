# Transport for London Confirms 2024 Breach by 'Scattered Spiders' Affected 10 Million People

**Severity:** high | **Category:** Data Breach,Threat Actor,Cyberattack | **Updated:** 2026-03-10 | **Reading time:** 5 min

Transport for London (TfL) has officially confirmed the massive scale of a cyberattack that occurred in August 2024. The breach, attributed to the notorious hacking group 'Scattered Spiders', affected approximately 10 million people. The attackers stole a database containing sensitive personal information, including names, email addresses, phone numbers, and home addresses. The financial impact of the incident is estimated to be around £39 million ($52 million USD), highlighting the severe consequences of the attack long after its initial discovery.

## Executive Summary
On March 9, 2026, new details emerged confirming the full scale of a major cyberattack against **[Transport for London (TfL)](https://tfl.gov.uk/)** that originally took place in August 2024. The breach is now confirmed to have affected approximately 10 million people. The attack has been attributed to the hacking group known as **Scattered Spiders**, a financially motivated threat actor known for its social engineering prowess. The attackers successfully exfiltrated a database containing a significant amount of customer Personally Identifiable Information (PII). The estimated financial damage from the incident is reported to be £39 million (approx. $52 million USD), encompassing response, recovery, and other associated costs.

---

## Incident Timeline
- **August 2024:** The initial cyberattack occurs. **Scattered Spiders** gains unauthorized access to TfL's systems and exfiltrates a customer database.
- **March 9, 2026:** Reports emerge confirming the full scope of the breach, including the number of affected individuals and the estimated financial damages.

## Threat Overview
- **Threat Actor:** **Scattered Spiders** (also associated with UNC3944, ScatterSwine). This group is known for its expertise in social engineering, SIM swapping, and credential theft, often targeting large corporations.
- **Victim:** **Transport for London (TfL)**, the local government body responsible for most of the transport network in London.
- **Impact:**
    - **10 million** individuals affected.
    - **£39 million** in estimated damages.
    - **Data Stolen:** A database containing full names, email addresses, phone numbers, and home addresses.

While the exact initial access vector was not detailed in the report, **Scattered Spiders** typically uses techniques like [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/) and social engineering to harvest credentials, often targeting IT help desks to gain access to privileged accounts.

## Impact Assessment
The theft of this data from 10 million people creates a massive risk of follow-on attacks. The combination of names, emails, phone numbers, and home addresses is a powerful toolkit for criminals. This data can be used for:
- **Identity Theft:** Opening fraudulent accounts or taking out loans in victims' names.
- **Sophisticated Phishing and Smishing:** Crafting highly convincing and personalized scam emails and text messages.
- **SIM Swapping:** Using the personal data to convince mobile carriers to transfer a victim's phone number to an attacker-controlled SIM card, allowing them to intercept MFA codes and take over online accounts.
- **Physical Security Risks:** The exposure of home addresses linked to individuals creates potential real-world safety concerns.

For TfL, the £39 million in damages reflects the immense cost of responding to a breach of this magnitude, including forensic investigation, system remediation, regulatory fines, legal fees, and customer support.

## Detection & Response
- **Monitor for Credential Stuffing:** Organizations should anticipate that the breached credentials will be used in credential stuffing attacks against other online services. Monitor for high volumes of failed logins from unusual sources.
- **Social Engineering Awareness:** Security operations teams should be on high alert for social engineering attempts targeting help desks and IT staff, which is a key TTP of **Scattered Spiders**.
- **Identity Verification:** Implement stronger identity verification processes for password resets and account changes to defend against attackers using stolen PII.

## Mitigation Recommendations
- **Phishing-Resistant MFA:** Enforce phishing-resistant MFA (e.g., FIDO2) for all employees, especially privileged users and IT staff, to protect against credential theft.
- **Data Minimization:** Organizations should regularly review the data they collect and store, and only retain what is absolutely necessary. Storing large databases of sensitive PII creates a high-value target for attackers.
- **Network Segmentation:** Proper network segmentation can help contain a breach and prevent attackers from moving laterally from a compromised system to a critical database server.
- **Security Awareness Training:** Train employees to recognize and report social engineering attempts, and establish clear protocols for handling requests for sensitive information or account resets.

**Tags:** Data Breach, Scattered Spiders, TfL, Social Engineering, PII, UK

## Sources
- [Cybercrime News For Mar. 9, 2026. Iran Hacks U.S. Bank, Airport, Tech Networks. WCYB Digital Radio.](https://www.youtube.com/watch?v=Jcjz3_Y-dJk) — YouTube (2026-03-09)
- [Week of March 9, 2026 - Cybersecurity Headlines](https://www.mass.gov/doc/cybersecurity-headlines-march-9-2026/download) — Mass.gov (2026-03-09)

---
Source: https://cyber.netsecops.io/articles/transport-for-london-confirms-10m-people-affected-by-2024-data-breach/
