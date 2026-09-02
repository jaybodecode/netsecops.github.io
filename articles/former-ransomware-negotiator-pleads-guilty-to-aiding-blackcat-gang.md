# Ransomware Negotiator Admits to Conspiring with BlackCat Gang

**Severity:** high | **Category:** Threat Actor,Ransomware,Policy and Compliance | **Updated:** 2026-05-01

Angelo Martino, a former ransomware negotiator, has pleaded guilty to conspiring with the notorious BlackCat (ALPHV) ransomware gang. Martino abused his position at a crypto brokerage firm, using his insider knowledge of his clients' negotiating strategies and insurance limits to help BlackCat maximize their extortion demands. He also conspired to deploy ransomware against victims, leading to multi-million dollar ransom payments. Law enforcement has seized $10 million in illicit proceeds.

## Executive Summary

In a stark example of a malicious insider threat, Angelo Martino, a 41-year-old former ransomware negotiator, has pleaded guilty to federal charges of conspiring with the **[BlackCat (ALPHV)](https://attack.mitre.org/groups/G1016/)** ransomware gang. While employed at **DigitalMint**, a crypto broker that helps victims pay ransoms, Martino secretly fed the attackers sensitive information about his own clients. This included details about their insurance coverage and internal negotiation limits, allowing **BlackCat** to extort higher payments. Martino also admitted to actively conspiring in ransomware attacks, betraying the trust of the companies he was hired to help. Authorities have seized approximately $10 million in assets from Martino.

## Threat Overview

This case highlights a dangerous evolution of the insider threat, where a trusted security professional actively colludes with a major ransomware group. Martino's role was twofold:

1.  **Aiding Extortion**: While negotiating on behalf of victims, he acted as an informant for **BlackCat**. By revealing a company's true ability to pay (e.g., their cyber insurance limit), he ensured the gang would not settle for a lower amount, thus maximizing the criminals' profit.
2.  **Conspiring in Attacks**: Beyond just passing information, Martino admitted to actively conspiring with others to deploy ransomware against U.S. victims, effectively becoming part of the criminal enterprise himself.

The scheme resulted in massive payouts from victims in hospitality, financial services, and non-profit sectors, with some ransoms reaching over $25 million.

## Technical Analysis

While this is primarily a story of human betrayal, it intersects with the ransomware TTPs of the **BlackCat** group.

*   **Insider Knowledge**: Martino's contribution maps to the reconnaissance and resource development phases of an attack. His intel allowed **BlackCat** to bypass much of the uncertainty in the negotiation process.
*   **Ransomware Deployment**: As a conspirator, Martino was involved in attacks that used standard **BlackCat** methods, which typically involve gaining access via compromised credentials or vulnerabilities, lateral movement, data exfiltration ([`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/)), and finally, data encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).
*   **Money Laundering**: After a victim paid a $1.2 million ransom in Bitcoin, the group, including Martino, laundered the funds through a series of transactions ([`T1136 - Create Account`](https://attack.mitre.org/techniques/T1136/)), a common tactic to obscure the flow of illicit cryptocurrency.

> This case demonstrates that the 'human element' in cybersecurity is not just about user error; it can also be about malicious intent from those in positions of trust. It fundamentally changes the threat model for incident response.

## Impact Assessment

*   **For Victims**: The companies betrayed by Martino suffered greater financial losses than they might have otherwise. They were negotiating against an opponent who held all the cards.
*   **For the IR Industry**: The case damages the trust between victim organizations and third-party incident response and negotiation firms. Companies will now need to apply greater scrutiny to the partners they hire in a crisis.
*   **Legal Precedent**: The successful prosecution and significant asset seizure send a strong message to any other individuals considering colluding with cybercriminals.

## IOCs — Directly from Articles

No technical Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints

Detecting this type of insider threat is extremely difficult and relies more on behavioral and procedural controls than technical indicators. However, some patterns might be observable:

| Type | Value | Description |
| :--- | :--- | :--- |
| Other | Unusually short or efficient ransom negotiations. | If a negotiator consistently settles at or near the top of a known insurance limit, it could be a red flag. |
| Other | Communication with known threat actor infrastructure. | An IR team member communicating with non-sanctioned C2s or dark web forums would be a major indicator. |
| Financial | Unexplained wealth or financial transactions. | Law enforcement likely used financial analysis to track Martino's illicit gains. |

## Detection & Response

*   **Detection**: Detection is less about logs and more about process. Organizations should use multiple, independent parties for different aspects of incident response (e.g., separate firms for forensics, negotiation, and legal counsel) to create checks and balances. Conduct thorough background checks on all third-party IR personnel.
*   **Response**: In a negotiation, never reveal your upper limit or insurance coverage to your negotiator. Treat it as privileged information shared only with legal counsel. If collusion is suspected, immediately engage law enforcement and a new, vetted IR partner.

## Mitigation

1.  **Due Diligence**: Conduct extreme due diligence when selecting a third-party incident response or negotiation firm. Check references, a history of successful engagements, and their standing in the security community.
2.  **Compartmentalize Information**: During an incident, strictly compartmentalize information. The negotiation team does not need to know the full technical details from the forensics team, and vice versa. Your maximum payment authority should be known only to executive leadership and legal counsel.
3.  **Involve Law Enforcement**: Engage law enforcement (such as the FBI) early in a major ransomware incident. They have resources and intelligence that can help identify and pursue the actors, as demonstrated in this case.
4.  **Internal Controls**: For IR firms, implement strict internal controls, codes of conduct, and regular audits to prevent this type of malicious activity. This includes monitoring employee communications and financial activities where legally permissible.

**Tags:** ALPHV, BlackCat, Cybercrime, DOJ, Insider Threat, Ransomware

## Sources
- [Former Ransomware Negotiator Pleads Guilty to Working For BlackCat Cyber Gang](https://www.infosecurity-magazine.com/news/former-ransomware-negotiator-guilty/) (2026-04-22)
- [Ransomware negotiator admits role in attacks he was hired to resolve](https://www.helpnetsecurity.com/2026/04/21/ransomware-negotiator-blackcat/) (2026-04-21)

---
Source: https://cyber.netsecops.io/articles/former-ransomware-negotiator-pleads-guilty-to-aiding-blackcat-gang/
