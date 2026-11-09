# GMO Internet Group Offers $1M Bounty After Refusing Ransom Demand

**Severity:** high | **Category:** Incident Response,Data Breach,Cyberattack | **Updated:** 2026-10-28 | **Reading time:** 4 min

Following a breach of its 'Onamae.com Desktop Cloud' service, Japanese tech giant GMO Internet Group has refused to pay a ransom demand of approximately $50 million. Instead, the company has launched a $1 million 'GMO Cybercrime Bounty' program to identify and lead to the arrest of the attackers. GMO is also offering compensation to affected customers and has actively worked to take down the hackers' data leak site.

## Executive Summary
In a decisive response to a cyber extortion attempt, Japan's **[GMO Internet Group](https://www.gmo.jp/en/)** has publicly refused a ransom demand of approximately ¥8 billion (around $50 million) following a security breach of its "Onamae.com Desktop Cloud" service. The company has instead opted for a proactive and public strategy, announcing a reward of up to $1 million for information leading to the arrest of the perpetrators. The incident, which affected a cloud service popular for automated foreign exchange (FX) trading, resulted in unauthorized trades and data theft. GMO is also compensating affected customers and has successfully taken down the attackers' leak site, marking a strong public stance against paying ransoms.

---

## Incident Timeline
- **Prior to Oct 21:** Customers of the Onamae.com Desktop Cloud service begin reporting unauthorized trades in their FX accounts, with one victim reporting losses of ~1.2 million yen.
- **Oct 21, 2026:** The attackers contact GMO Internet Group, demanding a ransom of ~$50 million and threatening to leak stolen customer data and launch ransomware attacks.
- **Post Oct 21:** GMO refuses to engage or pay the ransom.
- **Oct 27, 2026:** The attackers follow through on their threat and begin publishing stolen customer data on a dedicated leak site.
- **Oct 27-28, 2026:** GMO announces its "GMO Cybercrime Bounty" program and customer compensation plan.
- **Oct 28, 2026 (morning):** GMO, in collaboration with other companies, successfully gets the attackers' leak domain and its mirrors suspended.

---

## Response Actions
GMO's handling of this incident is a case study in an alternative, non-payment response strategy:
1.  **Refuse and Resist:** The company made a clear decision not to pay the massive ransom demand, removing the primary financial incentive for the attackers.
2.  **Launch Public Bounty:** By offering a $1 million reward, GMO is attempting to crowdsource intelligence and incentivize insiders or law enforcement informants to come forward. They are seeking information on individuals, servers, IP addresses, or cryptocurrency accounts linked to the attack.
3.  **Customer Compensation:** GMO is proactively addressing customer harm by offering a flat payment of ¥5,000 to all users, additional payments (up to ¥25,000) for those whose data was exposed, and reimbursement for losses from fraudulent trades. This aims to maintain customer trust and mitigate legal liability.
4.  **Disrupt Attacker Infrastructure:** The company actively worked to take down the leak site, disrupting the attackers' ability to publicize the breach and apply pressure.

---

## Technical Findings
The attack targeted the `Onamae.com Desktop Cloud` service, a Windows-based virtual desktop environment often used by retail traders to run automated trading software like **MetaTrader 4 (MT4)** and **MetaTrader 5 (MT5)**. The attackers gained access to these environments, allowing them to execute fraudulent trades and exfiltrate customer data. The exact initial access vector was not disclosed, but it was sufficient to compromise multiple customer instances, leading to both financial theft ([`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/)) and data extortion ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

---

## Lessons Learned
- **Non-Payment is a Viable Strategy:** GMO's response demonstrates that refusing to pay a ransom, while carrying risks like data leakage, can be part of a robust incident response strategy. It avoids funding criminal enterprises and can be paired with other actions.
- **Public Communication and Transparency:** By publicly announcing the breach, the bounty, and the compensation plan, GMO took control of the narrative, positioning itself as a proactive defender of its customers rather than a passive victim.
- **Bounties as an IR Tool:** Using a financial bounty to generate leads is an unconventional but potentially effective tool in identifying anonymous threat actors, especially when traditional forensic methods are challenging.

---

## Mitigation Recommendations
- **For Cloud Service Providers:** Providers of virtual desktop infrastructure (VDI) or similar services must implement strong tenant isolation and robust authentication controls. Regular security audits and penetration tests of the management plane and hypervisor infrastructure are essential.
- **For End Users:** Users of remote desktop and VDI services should always enable **[Multi-Factor Authentication (MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** if available. They should also use unique, strong passwords for these services and monitor their accounts for any suspicious activity.

**Tags:** GMO, Bounty, Ransomware, Incident Response, Data Breach, Japan, Finance

## Sources
- [Japan's GMO Offers $1 Million Bounty to Catch Hackers Behind FX Trading Cloud Breach](https://thehackernews.com/2026/10/japans-gmo-offers-1-million-bounty-to.html) — The Hacker News (2026-10-28)
- [GMO Offers Up to ¥3 Million to Victims of Unauthorized Access; ¥160 Million Bounty to Identify Perpetrators](https://finance.biggo.com/news/4e5fe100-59ec-4842-b821-0a0c64b73540) — BigGo (2026-10-27)
- [GMO Internet to offer up to $1 million reward for info on hackers](https://japantoday.com/category/crime/update4-gmo-internet-to-offer-up-to-1-million-reward-for-info-on-hackers) — Japan Today (2026-10-27)
- [GMO confirms shutdown of hackers' website after data leak — The Japan Times](https://ua.news/en/technologies/gmo-pidtverdila-zakrittia-saitu-khakeriv-pislia-vitoku-danikh-the-japan-times) — UA News (2026-10-28)
- [GMO Offers $1 Million Bounty for Hackers as Japanese Brokers Tighten Logins](https://www.tradingview.com/news/financemagnates:71f81a3dd094b:0-gmo-offers-1-million-bounty-for-hackers-as-japanese-brokers-tighten-logins/) — TradingView (2026-10-28)
- [(Translated) Hackers Release Personal Information, Victims in Anxiety... GMO's Response and Expert Analysis](https://www.youtube.com/watch?v=rNvZ_x_bfLg) — YouTube (2026-10-27)

---
Source: https://cyber.netsecops.io/articles/gmo-internet-group-offers-1m-bounty-to-catch-hackers/
