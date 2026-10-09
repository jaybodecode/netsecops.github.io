# SEC Busts $14M AI-Powered Crypto Scam That Used Deepfakes

**Severity:** high | **Category:** Phishing,Regulatory,Threat Intelligence | **Updated:** 2025-12-25 | **Reading time:** 4 min

The U.S. Securities and Exchange Commission (SEC) has charged seven entities for their involvement in a sophisticated cryptocurrency investment scam that defrauded retail investors of over $14 million. The scheme, which ran for a year, used social media ads featuring deepfake videos of financial professionals to lure victims into private messaging groups. Inside these groups, fraudsters posing as experts used AI-generated investment tips to build trust before directing victims to fraudulent trading platforms. When investors tried to withdraw funds, they were hit with advance fee demands, compounding their losses.

## Executive Summary
The U.S. Securities and Exchange Commission (**[SEC](https://www.sec.gov/)**) announced on December 24, 2025, that it has filed charges against seven entities for orchestrating a crypto asset investment scam that stole over $14 million from U.S. retail investors. The elaborate fraud leveraged modern technology, including **[deepfake](https://en.wikipedia.org/wiki/Deepfake)** videos and AI-generated content, to create a veneer of legitimacy. The scheme involved three fake trading platforms—Morocoin Tech Corp., Berge Blockchain Technology Co., and Cirkor Inc.—and four associated "investment clubs." Victims were lured through social media, manipulated in chat groups, and ultimately defrauded on the sham platforms.

## Threat Overview
The scam operated through a multi-stage process designed to exploit investor interest in both cryptocurrency and artificial intelligence. 
1.  **Lure**: The fraudsters ran social media advertisements, some containing deepfake videos of well-known financial figures, to attract potential investors.
2.  **Groom**: Interested individuals were directed to group chats on messaging apps like WhatsApp. In these groups, the scammers posed as financial professionals and used AI-generated investment "tips" to build credibility and create a sense of an exclusive, successful community.
3.  **Deceive**: Victims were persuaded to open accounts and deposit funds onto one of three fraudulent trading platforms (`h5.morocoin[.]top`, `www.bergev[.]org`, `www.cirkortrading[.]com`). These platforms falsely claimed to be licensed and offered non-existent investment products, such as "Security Token Offerings" from legitimate companies.
4.  **Extract**: When investors attempted to withdraw their supposed profits, the platform operators demanded exorbitant "advance fees" or taxes, a classic advance-fee fraud tactic to extract more money before disappearing.

## Technical Analysis
This operation was primarily a social engineering campaign enhanced by modern technology. The key TTPs include:
- **[`T1583.001 - Acquire Infrastructure: Domains`](https://attack.mitre.org/techniques/T1583/001/)**: The attackers registered and set up fraudulent websites to act as their trading platforms.
- **[`T1566.002 - Phishing: Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)**: Social media ads and messages contained links directing users to the malicious platforms and chat groups.
- **[`T1598.003 - Phish for Information: Spearphishing via Service`](https://attack.mitre.org/techniques/T1598/003/)**: The entire operation was conducted through social media and messaging services, abusing these platforms to build trust and deliver fraudulent information.
- **Social Engineering**: The use of AI-generated tips and deepfake videos represents an evolution in social engineering, making the scam more convincing and harder to detect for the average person.

## Impact Assessment
The primary impact was the direct financial loss of over $14 million for retail investors across the United States. The scheme specifically targeted individuals with an interest in emerging technologies, exploiting their enthusiasm and potential lack of deep technical knowledge. Beyond the financial loss, such scams erode public trust in both the cryptocurrency market and the legitimate use of artificial intelligence in finance. The SEC's action aims to not only seek restitution but also to raise public awareness about this growing form of fraud.

| Type | Value | Description |
|---|---|---|
| domain | `h5.morocoin[.]top` | Fraudulent crypto trading platform. |
| domain | `www.bergev[.]org` | Fraudulent crypto trading platform. |
| domain | `www.cirkortrading[.]com` | Fraudulent crypto trading platform. |

## Detection & Response
Detecting these scams requires a high degree of skepticism from potential investors. Key red flags include:
- Unsolicited investment offers on social media.
- The use of deepfake videos or claims of celebrity endorsement.
- High-pressure tactics and promises of guaranteed, outsized returns.
- Being added to unfamiliar WhatsApp or Telegram groups for investment advice.
- Platforms that demand fees, taxes, or other payments before allowing withdrawals.

Response for victims involves immediately ceasing all contact and payments, reporting the incident to law enforcement (like the FBI's IC3) and regulatory bodies (like the SEC), and reporting the fraudulent accounts/ads to the social media platforms.

## Mitigation
The most critical mitigation for this type of threat is public awareness and education.
- **[`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)**: Investors should be educated on the hallmarks of investment fraud. This includes verifying the registration and licensing of any trading platform or financial professional through official channels (e.g., SEC's IAPD database), being wary of social media investment schemes, and understanding that there are no guaranteed returns in investing.
- **Due Diligence**: Always research investment opportunities independently. Do not rely on information provided in unsolicited messages or private chat groups.
- **Technology Awareness**: Users should be aware of the existence and capabilities of deepfakes and AI-generated content and maintain a healthy skepticism of online videos and communications, especially when money is involved.

**Tags:** Crypto Scam, SEC, AI, Deepfake, Phishing, Investment Fraud, WhatsApp

## Sources
- [SEC Files Charges Over $14 Million Crypto Scam Using Fake AI-Themed Investment Tips](https://thehackernews.com/2025/12/sec-files-charges-over-14-million.html) — The Hacker News (2025-12-24)
- [Multi-million investment scam nets SEC charges against crypto firms, investment clubs](https://www.scmagazine.com/news/multi-million-investment-scam-nets-sec-charges-against-crypto-firms-investment-clubs) — SC Magazine (2025-12-24)
- [SEC Charges Crypto Firms in $14m Investment Scam](https://www.infosecurity-magazine.com/news/sec-charges-crypto-firms-14m/) — Infosecurity Magazine (2025-12-24)

---
Source: https://cyber.netsecops.io/articles/sec-charges-seven-firms-in-14m-ai-themed-crypto-investment-scam/
