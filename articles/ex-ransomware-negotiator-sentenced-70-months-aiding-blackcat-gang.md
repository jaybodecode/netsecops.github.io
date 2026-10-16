# Ex-Ransomware Negotiator Sentenced to 70 Months for Acting as 'Double Agent' for BlackCat Gang

**Severity:** medium | **Category:** Policy and Compliance,Threat Actor,Ransomware | **Updated:** 2026-07-10 | **Reading time:** 4 min

Angelo Martino, a former ransomware negotiator for DigitalMint, has been sentenced to 70 months in federal prison for his role in a conspiracy with the notorious BlackCat/Alphv ransomware gang. In 2023, Martino abused his insider position, acting as a 'double agent' by feeding his clients' confidential information to the criminals to help them negotiate higher ransom payments. He was involved in plots to extort $75.3 million from five U.S. organizations, highlighting a disturbing case of corruption within the cybersecurity incident response industry.

## Executive Summary
Angelo Martino, a 41-year-old former ransomware negotiator, has been sentenced to 70 months in federal prison for conspiring with the **[BlackCat](https://attack.mitre.org/groups/G1016/)** (also known as Alphv) ransomware gang. The U.S. Department of Justice revealed that Martino, while working as a security professional, acted as a 'double agent' in 2023. He abused his trusted position by providing confidential information from his own clients to the BlackCat operators, helping them to refine their extortion tactics and demand higher ransoms. Martino was implicated in conspiracies to extort a total of $75.3 million from five U.S. companies. His sentencing marks a significant law enforcement victory against insiders who facilitate cybercrime and underscores the complex ethical challenges within the incident response ecosystem.

---

## Incident Details
In 2023, Angelo Martino, a security professional associated with DigitalMint, engaged in a criminal conspiracy with the BlackCat/Alphv ransomware group, one of the most prolific ransomware-as-a-service (RaaS) operations at the time. Instead of helping his clients recover from attacks, Martino secretly worked against them.

According to federal prosecutors, his betrayal included:
- **Sharing Confidential Information**: Martino provided the BlackCat gang with insider information about his clients, such as their financial status, insurance coverage, and decision-making processes. This allowed the gang to tailor their ransom demands for the maximum possible payout.
- **Targeting Additional Victims**: He conspired with two other cybersecurity professionals to identify and target new victims for the ransomware gang.
- **Facilitating Negotiations**: He actively helped the BlackCat operators in their negotiations, not on behalf of the victim, but to ensure the criminals extracted the highest possible payment.

His actions directly contributed to the extortion of five U.S.-based organizations, with total ransom demands reaching $75.3 million. The conviction and lengthy prison sentence send a clear message to the cybersecurity industry about the severe legal consequences of collaborating with criminal threat actors.

---

## Impact Assessment
The primary victims were the five U.S. companies who were not only hit by ransomware but were also betrayed by the very person they hired to help them. They faced higher financial losses and a more arduous recovery process due to Martino's actions. The broader impact is on the trust between victim organizations and the incident response industry. This case creates suspicion and doubt at a time when trust is most needed. It may cause victim companies to be more hesitant to engage third-party negotiators, potentially leading to poorer outcomes. For the cybersecurity profession, this incident is a significant ethical stain and highlights the potential for corruption when large sums of money are involved.

---

## Lessons Learned

1.  **Thorough Vetting of IR Firms**: Organizations must conduct rigorous due diligence when selecting a third-party incident response or negotiation firm. This includes checking references, verifying certifications, and understanding their ethical guidelines and protocols.
2.  **Insider Threat Programs**: This case is a classic example of a malicious insider threat. Security programs must account for the risk of trusted employees and contractors abusing their access for personal gain.
3.  **Transparency in Negotiations**: While sensitive, there should be clear oversight and transparency in the negotiation process. Decisions should not be left to a single individual. A committee involving legal, executive, and technical leadership should be involved in all major decisions.
4.  **Law Enforcement Collaboration**: Engaging law enforcement early in a ransomware incident is crucial. They can provide resources and, as shown in this case, are committed to pursuing not only the ransomware actors but also their co-conspirators.

---

## Mitigation Recommendations

While this incident is about human betrayal rather than technical failure, standard cybersecurity mitigations are still the best defense, as they prevent the ransomware attack from succeeding in the first place.

- **Prevent Initial Access**: Implement strong controls like phishing-resistant MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)), timely patching ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)), and network security to prevent the initial breach that necessitates a negotiator.
- **Backup and Recovery**: Having robust, tested, and isolated backups ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/)) is the ultimate leverage against ransomware actors, reducing the need to pay a ransom and engage with negotiators, corrupt or otherwise.
- **Develop an IR Plan**: Have a well-documented incident response plan that specifies the roles, responsibilities, and protocols for engaging third parties, including legal counsel and negotiation firms.

**Tags:** Insider Threat, Ransomware, BlackCat, Alphv, Negotiator, DOJ, Cybercrime, Legal

## Sources
- [Ransomware Negotiator Gets 70 Months in Prison for Aiding BlackCat Attacks](https://thehackernews.com/) — The Hacker News (2026-07-09)
- [Former DigitalMint ransomware negotiator who duped clients sentenced to 70 months in jail](https://cyberscoop.com/) — CyberScoop (2026-07-10)

---
Source: https://cyber.netsecops.io/articles/ex-ransomware-negotiator-sentenced-70-months-aiding-blackcat-gang/
