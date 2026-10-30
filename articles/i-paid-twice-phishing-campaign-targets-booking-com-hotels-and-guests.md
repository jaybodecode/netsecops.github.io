# Massive 'I Paid Twice' Phishing Scheme Defrauds Booking.com Hotels and Guests

**Severity:** high | **Category:** Phishing,Malware,Cyberattack | **Updated:** 2025-11-07 | **Reading time:** 5 min

A sophisticated global phishing campaign named 'I Paid Twice' is targeting hotels on Booking.com and Expedia, compromising their administrative accounts to defraud guests. Since at least April 2025, attackers have been using social engineering and the PureRAT malware to gain access to hotel systems. Once in, they impersonate hotel staff to send fraudulent payment requests to travelers with upcoming reservations, tricking them into paying a second time via a malicious portal. Security firm Sekoia.io, which discovered the operation, reports that the campaign is highly active and has resulted in financial losses for an unknown number of victims.

## Executive Summary
Cybersecurity researchers at **[Sekoia.io](https://www.sekoia.io/)** have uncovered a large-scale, ongoing phishing operation dubbed "I Paid Twice" that targets both hotel partners and customers of major travel platforms, including **[Booking.com](https://www.booking.com/)** and **[Expedia](https://www.expedia.com/)**. Active since at least April 2025, the campaign uses a multi-stage attack to compromise hotel administrative systems with the **[PureRAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.purerat)** malware. After gaining access to a hotel's Booking.com extranet account, the threat actors leverage legitimate reservation details to send highly convincing fraudulent payment requests to guests. These messages trick travelers into submitting their payment details to a fake portal, resulting in double-charging and significant financial loss. The campaign's infrastructure is resilient, leveraging hundreds of malicious domains and a suspected bulletproof hosting provider in Russia, indicating a well-organized and profitable criminal enterprise.

---

## Threat Overview
The "I Paid Twice" campaign is a classic adversary-in-the-middle attack applied to the hospitality sector. The attack chain begins with a spearphishing email sent to hotel staff, often disguised as an official notification from Booking.com. The email contains a link that leads to a page employing a social engineering tactic called "ClickFix." This technique tricks the user into copying and executing a **[PowerShell](https://attack.mitre.org/techniques/T1059/001/)** command, believing it's a CAPTCHA verification step. This command downloads and executes the PureRAT malware, a Remote Access Trojan (RAT) also known as PureHVNC.

Once PureRAT is active, the attackers gain control over the hotel's computer systems. Their primary goal is to steal credentials for the hotel's Booking.com extranet portal. With these credentials, they log in, impersonate hotel staff, and access the list of upcoming guest reservations. They then contact these guests directly via email or WhatsApp, using authentic booking details (names, dates, room types) to build credibility. The message typically claims a "bank verification issue" or similar problem requires the guest to re-submit their payment information through a provided link. This link leads to a professionally designed phishing page that mimics the Booking.com payment interface, where the victim's credit card details are harvested.

## Technical Analysis
- **Malware:** The core of the operation is **PureRAT** (aka PureHVNC), a RAT-as-a-Service sold by a developer named "PureCoder" since 2021. It provides attackers with remote access, keylogging, credential theft, and file system access capabilities.
- **Delivery:** The initial infection vector is a social engineering lure named "ClickFix," which abuses user trust to execute a malicious PowerShell script. This is a clear example of [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/) where the user is tricked into running the code themselves.
- **Command and Control:** The phishing infrastructure is protected by **[Cloudflare](https://www.cloudflare.com/)** to mask the true origin of the servers. The backend hosting is provided by OPTIMA LLC (AS216341), a Russian provider suspected of offering bulletproof hosting services.

### MITRE ATT&CK TTPs
- **Initial Access:** [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): Emails with malicious links are sent to hotel staff.
- **Execution:** [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/): The "ClickFix" lure tricks users into running a PowerShell download cradle.
- **Persistence & Defense Evasion:** PureRAT likely establishes persistence through common methods like Registry Run Keys ([`T1547.001`](https://attack.mitre.org/techniques/T1547/001/)).
- **Credential Access:** [`T1555.003 - Credentials from Web Browsers`](https://attack.mitre.org/techniques/T1555/003/): PureRAT is used to steal saved credentials for the Booking.com extranet from the hotel's browser.
- **Collection:** [`T1114.001 - Email Collection: Local Email Collection`](https://attack.mitre.org/techniques/T1114/001/): Attackers access guest reservation data from the compromised extranet account.
- **Impersonation:** The attackers use the stolen access and data to impersonate hotel staff in communications with guests, a form of Masquerading ([`T1036`](https://attack.mitre.org/techniques/T1036/)).

## Impact Assessment
The financial and reputational impact of this campaign is significant. Guests who fall victim lose money directly. Hotels suffer severe reputational damage, negative reviews, and potential liability for the breach of their systems. The trust between customers and booking platforms like Booking.com is eroded. Given the global nature of the campaign and the hundreds of malicious domains involved, the total financial losses are likely substantial. The operational disruption for a hotel dealing with a system compromise and angry customers can be immense, requiring costly incident response and customer remediation efforts.

## Cyber Observables for Detection
- **PowerShell Monitoring:** Monitor for PowerShell execution with suspicious arguments, especially those involving `IEX (New-Object Net.WebClient).DownloadString`. **D3FEND Technique:** [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Network Traffic:** Look for outbound network connections from hotel administrative workstations to known malicious domains or IP ranges, such as those associated with AS216341 (OPTIMA LLC). **D3FEND Technique:** [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
- **Endpoint Detection:** EDR solutions should be configured to detect and block the execution of PureRAT/PureHVNC and its associated droppers.

## Mitigation and Recommendations
**For Hotels:**
1.  **User Training:** Train staff to be suspicious of unsolicited emails, especially those that ask for urgent action or involve unusual steps like copying code. Specifically educate them on the "ClickFix" tactic. **D3FEND Technique:** [`D3-UT: User Training`](https://d3fend.mitre.org/technique/d3f:UserTraining).
2.  **MFA on All Accounts:** Enforce **[Multi-Factor Authentication (MFA)](https://en.wikipedia.org/wiki/Multi-factor_authentication)** on all administrative accounts, especially for booking platform extranets. This is the single most effective control to prevent account takeover even if credentials are stolen. **D3FEND Technique:** [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Endpoint Security:** Deploy and maintain a reputable Endpoint Detection and Response (EDR) solution to detect and block malware like PureRAT.
4.  **Restrict PowerShell:** Use application control policies to restrict or heavily monitor the use of PowerShell on workstations that do not require it for administrative tasks. **D3FEND Technique:** [`D3-EAL: Executable Allowlisting`](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting).

**For Travelers:**
- **Verify Payment Requests:** Be extremely wary of any message asking for payment outside of the official booking platform's website or app. Never click links in emails or messages to enter payment details. Instead, log in to your Booking.com account directly to check reservation status.
- **Check the URL:** Before entering payment information, always double-check the URL to ensure it is the legitimate `booking.com` domain.

**Tags:** Phishing, Malware, PureRAT, Booking.com, Hospitality, Social Engineering

## Sources
- [Phishing Campaign “I Paid Twice” Targets Booking.com Hotels and Guests](https://gbhackers.com/i-paid-twice-phishing-campaign/) — GBHackers on Security (2025-11-07)
- [“I Paid Twice” Phishing Campaign Targets Booking.com](https://www.infosecurity-magazine.com/news/i-paid-twice-phishing-booking/) — Infosecurity Magazine (2025-11-06)
- [Hotel’s Compromised Booking.com Account Sparks Phishing Campaign Against Travelers](https://cybersecuritynews.com/booking-com-phishing-campaign/) — Cybersecurity News (2025-11-07)

---
Source: https://cyber.netsecops.io/articles/i-paid-twice-phishing-campaign-targets-booking-com-hotels-and-guests/
