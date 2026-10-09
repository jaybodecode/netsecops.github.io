# Sophisticated Phishing Attack Uses PDF Lures and Cloud Services to Steal Dropbox Credentials

**Severity:** medium | **Category:** Phishing,Data Breach | **Updated:** 2026-02-03 | **Reading time:** 5 min

A new, multi-stage phishing campaign is using procurement-themed emails with benign-looking PDF attachments to bypass email security filters. The attack chain redirects victims through a legitimate cloud service, Vercel Blob, before presenting a convincing fake Dropbox login page. The goal is to harvest corporate credentials, which are then exfiltrated to an attacker-controlled Telegram bot. This layered approach is designed to appear legitimate and evade detection by both automated systems and wary users.

## Executive Summary
Security researchers have uncovered a sophisticated phishing campaign that leverages multiple stages and legitimate cloud infrastructure to harvest corporate **[Dropbox](https://www.dropbox.com/)** credentials. The attack, detailed by **[Forcepoint's X-Labs](https://www.forcepoint.com/blog/x-labs)**, begins with a seemingly harmless email containing a PDF attachment. This initial step helps bypass email gateways that scan for malicious links. The PDF contains a link that sends the user through a series of redirections, including leveraging the **[Vercel](https://vercel.com/)** cloud platform, to ultimately land on a pixel-perfect replica of a Dropbox login page. Once credentials are submitted, they are stolen and sent to the attackers via a **[Telegram](https://telegram.org/)** bot, demonstrating a modern and evasive method for credential theft.

---

## Threat Overview
The campaign is a classic example of credential phishing, but with modern evasive techniques. The primary goal is to steal valid login credentials for corporate Dropbox accounts, which can then be used for business email compromise (BEC), data theft, or as a foothold for further network intrusion.

**Attack Chain:**
1.  **Lure:** The target receives a professional-looking email with a subject related to procurement or tenders. The email contains a PDF attachment instead of a direct link.
2.  **Redirection 1 (PDF):** The user opens the PDF and clicks a link within it.
3.  **Redirection 2 (Cloud Service):** The link directs the user to a page hosted on a legitimate service like Vercel Blob. This page often shows a blurred document, prompting the user to click again to log in and view it.
4.  **Phishing Page:** The final click leads to the fake Dropbox login page, hosted on an attacker-controlled domain (e.g., `tovz[.]life`).
5.  **Credential Harvest:** The user enters their email and password. The page simulates an error after a five-second delay to appear authentic.
6.  **Exfiltration:** In the background, the stolen credentials, along with the victim's IP address and location, are sent to the attackers via a Telegram bot.

## Technical Analysis
This campaign's effectiveness lies in its abuse of trust and layered design:
- **PDF Attachments:** Using PDFs as the initial container helps evade many email security solutions that are primarily focused on scanning URLs in the email body.
- **Legitimate Cloud Services:** Leveraging services like Vercel for intermediate redirection makes the traffic appear benign to network security tools. It's difficult for organizations to block entire cloud platforms without causing business disruption.
- **Multi-Stage Redirection:** The multiple hops make it harder for automated URL analysis tools to follow the entire chain to the final malicious page.
- **Telegram for Exfiltration:** Using a legitimate messaging service for C2 and data exfiltration is a common evasive tactic, as the traffic blends in with normal user activity.

### MITRE ATT&CK Techniques
- **[`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/):** The use of a PDF attachment in a targeted email.
- **[`T1598.003 - Spearphishing Link`](https://attack.mitre.org/techniques/T1598/003/):** Although embedded in a PDF, the core of the attack is a malicious link.
- **[`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/):** The user is tricked into clicking links within the PDF and intermediate pages.
- **[`T1539 - Steal Web Session Cookie`](https://attack.mitre.org/techniques/T1539/):** While the report focuses on credentials, such pages often also steal session cookies.
- **[`T1071.001 - Web Protocols`](https://attack.mitre.org/techniques/T1071/001/):** Used for redirection and exfiltration to the Telegram bot API.

## Impact Assessment
The immediate impact is the loss of credentials for a critical cloud service. This can lead to:
- **Data Breach:** Attackers gaining access to sensitive files stored in the compromised Dropbox account.
- **Account Takeover:** The attacker can change the password, locking the legitimate user out.
- **Further Phishing:** The compromised account can be used to send phishing emails to internal colleagues or external partners, leveraging the trust associated with the user's identity.
- **Initial Access:** The credentials may be reused by the employee on other corporate systems, potentially giving the attacker access to the internal network or other cloud applications.

## IOCs
| Type | Value | Description |
|---|---|---|
| domain | `tovz[.]life` | Phishing domain hosting the fake Dropbox login page. |

## Detection & Response
1.  **Email Security:** Deploy advanced email security solutions that can sandbox attachments and analyze links within documents (**URL Analysis**). See **[`D3-UA - URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis)**.
2.  **Endpoint Protection:** EDR solutions can detect Office or PDF reader applications making network connections to suspicious domains.
3.  **Network Monitoring:** Monitor for connections to known phishing domains like `tovz[.]life`. While attackers rotate domains frequently, threat intelligence feeds can help keep blocklists updated.
4.  **Credential Exposure:** Monitor for corporate credentials appearing in public data dumps or on criminal forums.

## Mitigation
1.  **Multi-Factor Authentication (MFA):** This is the single most effective mitigation. Even if the attacker steals the user's password, they cannot log in without the second factor. Enforce MFA on all cloud services, especially file sharing platforms like Dropbox. This is a direct implementation of **[`D3-MFA - Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)**.
2.  **User Training:** Conduct regular, ongoing security awareness training that specifically covers multi-stage phishing attacks. Teach users to be wary of any login prompt that follows a series of unexpected clicks, and to manually type in known URLs like `dropbox.com` instead of clicking links.
3.  **Web Filtering:** Use a web filtering solution to block access to newly registered domains and domains categorized as phishing.
4.  **Limit Cloud Services:** Where possible, restrict the use of non-approved cloud services for business purposes to reduce the attack surface.

**Tags:** phishing, credential theft, Dropbox, Vercel, Telegram

## Sources
- [Attackers Harvest Dropbox Logins Via Fake PDF Lures - Dark Reading](https://www.darkreading.com/cyberattacks-data-breaches/attackers-harvest-dropbox-logins-via-fake-pdf-lures) — Dark Reading (2026-02-02)
- [New phishing attack leverages PDFs and Dropbox - CSO Online](https://www.csoonline.com/article/1297800/new-phishing-attack-leverages-pdfs-and-dropbox.html) — CSO Online (2026-02-03)
- [PDF phishing attack leads to stolen Dropbox credentials | SC Media](https://www.scmagazine.com/brief/phishing/pdf-phishing-attack-leads-to-stolen-dropbox-credentials) — SC Magazine (2026-02-02)

---
Source: https://cyber.netsecops.io/articles/multi-stage-phishing-campaign-uses-pdfs-and-dropbox-lures/
