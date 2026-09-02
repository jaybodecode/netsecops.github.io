# Insider Threat Shocker: Cybersecurity Pros Indicted for Wielding ALPHV/BlackCat Ransomware

**Severity:** high | **Category:** Ransomware,Threat Actor,Incident Response | **Updated:** 2025-11-03 | **Reading time:** 4 min

In a severe breach of trust, two cybersecurity professionals, Ryan Clifford Goldberg and Kevin Tyler Martin, have been indicted for allegedly conducting ALPHV/BlackCat ransomware attacks against at least five U.S. companies. The individuals, who held roles in incident response and ransomware negotiation, are accused of conspiring to extort nearly $1.3 million from a Florida medical company. This case highlights a critical insider threat risk within the cybersecurity industry itself, where trusted professionals abuse their knowledge and access for criminal gain.

## Executive Summary
A federal grand jury has indicted two cybersecurity professionals, **Ryan Clifford Goldberg** and **Kevin Tyler Martin**, on charges of conspiracy and extortion for allegedly using the **[ALPHV/BlackCat](https://malpedia.caad.fkie.fraunhofer.de/details/win.blackcat)** ransomware to attack U.S. businesses. At the time of the attacks, Goldberg was an incident response manager at cybersecurity firm Sygnia, and Martin was a ransomware negotiator at crypto broker DigitalMint. The indictment alleges they, along with an unnamed co-conspirator, targeted at least five companies and successfully extorted nearly $1.3 million from a Florida-based medical company. This case represents a profound betrayal of trust and exposes a dangerous form of insider threat, where individuals tasked with defending against cyberattacks become the perpetrators. Both men face up to 50 years in prison if convicted.

---

## Incident Timeline
- **May 2023 - April 2025**: The period during which the alleged conspiracy took place.
- **May 2023**: The conspirators successfully extort nearly $1.3 million from a Florida-based medical company using ALPHV/BlackCat ransomware. Goldberg allegedly receives a $200,000 share.
- **June 17, 2025**: During an interview with the **[FBI](https://www.fbi.gov)**, Ryan Clifford Goldberg allegedly confesses to his involvement in the scheme.
- **October 2, 2025**: A federal grand jury indicts Goldberg and Martin.
- **October 14, 2025**: Kevin Tyler Martin is arrested and later freed on bond.

## Response Actions
Both employers took swift action upon learning of the allegations. **Sygnia** stated that it terminated Goldberg's employment 'immediately upon learning of the situation.' **DigitalMint** confirmed that the co-conspirator was no longer with the company and that the criminal conduct occurred outside its corporate infrastructure, with no client data being compromised. Kevin Tyler Martin has been prohibited from working in the cybersecurity field as a condition of his release pending trial.

## Technical Findings
The conspirators allegedly leveraged their insider knowledge of the ransomware ecosystem. An unnamed co-conspirator, who worked at DigitalMint with Martin, reportedly obtained an affiliate account with the ALPHV/BlackCat ransomware-as-a-service (RaaS) operation. This gave them access to the malware and infrastructure needed to launch attacks. They targeted a range of industries, including healthcare, pharmaceuticals, engineering, and manufacturing, demonstrating a clear intent to profit from their crimes. The use of their professional expertise to select victims and potentially handle negotiations represents a sophisticated abuse of their trusted positions.

## Impact Assessment
The primary impact was on the victim organizations, one of which suffered a financial loss of nearly $1.3 million, in addition to operational disruption and recovery costs. However, the broader impact is the significant reputational damage to the cybersecurity incident response industry. This case undermines the trust that victim organizations place in third-party responders and negotiators. It raises critical questions about vetting, oversight, and ethical standards for professionals in sensitive cybersecurity roles. For the employers, Sygnia and DigitalMint, the incident causes immense reputational harm, despite their quick response to terminate the employees.

## Lessons Learned
- **Insider Threat is a Critical Risk**: Even in the cybersecurity industry, trusted insiders with privileged knowledge can pose a significant threat. This goes beyond traditional employees to include contractors and partners.
- **Vetting is Crucial**: Rigorous background checks and continuous vetting for individuals in high-trust roles, such as incident response and ransom negotiation, are paramount.
- **Need for Oversight**: Companies must implement strong internal controls, separation of duties, and auditing to monitor the activities of employees in sensitive positions. This includes monitoring for conflicts of interest and unauthorized use of company resources or access.

## Mitigation Recommendations
1.  **Enhanced Employee Screening**: Implement comprehensive pre-employment and recurring background checks for all personnel in sensitive roles. This should include checks for criminal history, financial distress, and other potential motivators for criminal activity. This aligns with the principles of [`M1018 - User Account Management`](https://attack.mitre.org/mitigations/M1018/).
2.  **Robust Code of Conduct and Ethics Training**: Enforce a strict code of conduct and provide regular, mandatory ethics training that specifically addresses the misuse of skills, tools, and information. This relates to [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).
3.  **Implement 'Two-Person' Rule**: For highly sensitive operations like ransom negotiations or critical incident response actions, require the involvement of at least two authorized individuals to ensure oversight and prevent unilateral malicious actions.
4.  **Auditing and Monitoring**: Implement and regularly review audit logs for access to sensitive client information, negotiation platforms, and cryptocurrency wallets. Use **[D3-LAM: Local Account Monitoring](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)** to detect anomalous behavior by privileged users.

**Tags:** Insider Threat, ALPHV, BlackCat, Ransomware, Indictment, Incident Response, Cybersecurity Ethics

## Sources
- [Prosecutors allege incident response pros used ALPHV/BlackCat to commit string of ransomware attacks](https://cyberscoop.com/alphv-blackcat-ransomware-incident-response-indictment/) — CyberScoop (2025-11-03)
- [US Traces Ransomware Attacks to 2 People Working for Cybersecurity Firms](https://www.pcmag.com/news/us-traces-ransomware-attacks-to-2-people-working-for-cybersecurity-firms) — PCMag (2025-11-03)
- [Former ransomware negotiators allegedly targeted US firms with ALPHV/BlackCat](https://www.helpnetsecurity.com/2025/11/04/alphv-blackcat-ransomware-negotiators/) — Help Net Security (2025-11-04)

---
Source: https://cyber.netsecops.io/articles/incident-responders-indicted-for-alphv-blackcat-ransomware-attacks/
