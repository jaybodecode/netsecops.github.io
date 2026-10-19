# Silent Ransom Group Claims Phishing Attack on Law Firm Jones Day, Demands $13M

**Severity:** high | **Category:** Data Breach,Phishing,Threat Actor | **Updated:** 2026-04-09 | **Reading time:** 5 min

The prominent global law firm Jones Day has disclosed it was the victim of a targeted phishing attack that resulted in unauthorized access to files for ten clients. The Silent Ransom Group (SRG), a sophisticated threat actor believed to be a splinter group from the notorious Conti syndicate, has claimed responsibility. The group allegedly published negotiation chats demanding a US$13 million ransom to prevent the public leak of stolen confidential client data and internal communications, highlighting the persistent targeting of the legal sector by high-stakes extortion groups.

## Executive Summary

Global law firm **[Jones Day](https://www.jonesday.com)** announced on April 7, 2026, that it had suffered a cyberattack originating from a phishing campaign. The firm stated that an unauthorized third party gained access to a limited number of files related to 10 clients. Responsibility for the attack has been claimed by the **Silent Ransom Group (SRG)**, a threat actor also known as Luna Moth and considered a descendant of the Conti ransomware syndicate. The group has reportedly demanded a US$13 million ransom and has begun leaking supposed negotiation chats to apply pressure, underscoring the high-value targeting of legal firms and their sensitive client data.

---

## Threat Overview

This incident is a targeted data theft and extortion attack, not a traditional ransomware deployment where files are encrypted. The **Silent Ransom Group**, also tracked as Luna Moth, Chatty Spider, and UNC3753, specializes in data theft for extortion without the encryption component. This makes the attack faster and stealthier, as it avoids the noisy process of file encryption that often triggers security alerts.

The attack on Jones Day began with a successful phishing attack, which likely provided the initial foothold. Following the data exfiltration, SRG engaged in double extortion tactics:
1.  **Data Theft:** The primary objective was to steal sensitive data, in this case, confidential client files and internal communications.
2.  **Extortion:** The group then threatened to publicly release the stolen data unless a large ransom was paid. They created a post on their leak site and published alleged negotiation chats with Jones Day demanding $13 million.

The FBI has previously warned that this group has been systematically targeting U.S.-based law firms since 2023, recognizing them as repositories of highly sensitive and valuable information.

## Technical Analysis

The attack chain highlights the group's sophistication and focus on social engineering.
- **Initial Access:** The attack started with [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/). This could have been a simple link to a credential harvesting page or a malicious attachment that installed a backdoor.
- **Data Exfiltration:** Once inside, the actors located and exfiltrated valuable data. This likely involved [`T1020 - Automated Exfiltration`](https://attack.mitre.org/techniques/T1020/) or [`T1537 - Transfer Data to Cloud Account`](https://attack.mitre.org/techniques/T1537/), where data is moved to attacker-controlled cloud storage.
- **Extortion:** The final phase is psychological, using a public leak site and media attention to pressure the victim into paying the ransom, a form of [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/) (in the sense of destroying confidentiality).

Some reports on SRG's broader TTPs mention a unique tactic involving social engineering calls followed by an operative visiting the victim's office in person, posing as IT support to physically plug in a device and steal data. It is not confirmed if this tactic was used against Jones Day.

## Impact Assessment

The impact on a law firm like Jones Day is multi-faceted and severe, even if only a limited number of files were accessed:
- **Client Trust and Reputational Damage:** The core asset of a law firm is confidentiality. A breach, regardless of size, erodes client trust and can damage the firm's reputation for discretion and security.
- **Legal and Regulatory Liability:** Jones Day faces potential legal action from the 10 affected clients and regulatory scrutiny. A breach of attorney-client privilege is a serious matter.
- **Financial Loss:** The direct costs include incident response, forensic investigation, client notifications, and potentially the $13 million ransom if paid. Indirect costs stem from reputational harm and loss of business.
- **Compromise of Legal Strategy:** The stolen data could contain sensitive information about litigation, mergers, or other confidential client matters, which could be used to the detriment of those clients.

## IOCs

No specific technical Indicators of Compromise (IOCs) have been publicly released.

## Detection & Response

Detecting data theft without encryption is challenging and requires a focus on data movement and user behavior.

1.  **Data Loss Prevention (DLP):** DLP solutions can detect and block the exfiltration of large volumes of data that match predefined patterns for sensitive information (e.g., documents marked 'attorney-client privileged').
2.  **User and Entity Behavior Analytics (UEBA):** UEBA tools can baseline normal user activity and alert on anomalies, such as a user account suddenly accessing and downloading hundreds of files from a document management system it doesn't normally interact with.
3.  **Phishing Detection:** Advanced email security solutions that can detect and block sophisticated phishing lures are critical for preventing the initial access.

**D3FEND Reference:** Key detection techniques are [`D3-UDTA - User Data Transfer Analysis`](https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis) to spot anomalous data egress and [`D3-RAPA - Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis) to detect unusual file access patterns.

## Mitigation

Mitigating this threat requires a combination of technical controls and security awareness.

- **Phishing-Resistant MFA:** The most effective defense against phishing is to deploy phishing-resistant Multi-Factor Authentication (MFA), such as FIDO2 security keys, for all critical applications, especially email and document management systems. This is a core part of [`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/).
- **Security Awareness Training:** Train all employees to recognize and report sophisticated phishing and social engineering attempts. This is crucial under [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
- **Principle of Least Privilege:** Ensure users only have access to the data and systems they absolutely need to perform their jobs. This limits the amount of data a compromised account can access.
- **Network Egress Filtering:** Strictly control and monitor outbound network traffic. Block connections to known malicious domains and consider a default-deny policy for outbound traffic from user workstations, allowing only what is necessary for business.

**D3FEND Reference:** Implementing [`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication) is the most impactful countermeasure against the initial access vector.

**Tags:** Data Breach, Phishing, Ransomware, Silent Ransom Group, Conti, Jones Day, Legal

## Sources
- [Ransomware group claims hack of legal giant Jones Day](https://www.cyberdaily.au/security/10667-ransomware-group-claims-hack-of-legal-giant-jones-day) — Cyber Daily (2026-04-08)
- [Cybercrime News For Apr. 8, 2026. Law Firm Says Hackers Accessed Clients' Data. WCYB Digital Radio.](https://www.youtube.com/watch?v=J84dJ4535jQ) — YouTube (2026-04-08)

---
Source: https://cyber.netsecops.io/articles/silent-ransom-group-targets-law-firm-jones-day-phishing-attack/
