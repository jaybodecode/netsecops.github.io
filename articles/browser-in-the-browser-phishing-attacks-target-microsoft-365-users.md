# New Phishing Wave Uses Fake Browser Windows to Target Microsoft 365 Users

**Severity:** high | **Category:** Phishing,Threat Actor,Security Operations | **Updated:** 2026-06-14 | **Reading time:** 4 min

Security researchers from Palo Alto Networks Unit 42 are warning of a new wave of sophisticated phishing attacks targeting Microsoft 365 users with the Browser-in-the-Browser (BitB) technique. These campaigns use meticulously crafted fake login popups that perfectly mimic legitimate browser authentication windows, tricking users into entering their credentials. The fake window is merely an HTML element on the attacker's webpage, allowing them to capture any entered information. This technique is highly effective because it bypasses some traditional phishing cues, such as checking the URL in the address bar, as the fake window can display a legitimate URL.

## Executive Summary
Security researchers at **[Palo Alto Networks Unit 42](https://www.paloaltonetworks.com/unit42)** have identified a new wave of sophisticated phishing campaigns targeting **[Microsoft 365](https://www.microsoft.com/en-us/microsoft-365)** users. These attacks employ the **Browser-in-the-Browser (BitB)** technique, which uses a fake, but highly realistic, browser window rendered inside the actual browser tab to deceive users. This fake window is designed to perfectly mimic a legitimate Microsoft authentication pop-up, tricking users into entering their usernames and passwords. Because the fake pop-up is just HTML and JavaScript within the attacker's webpage, any credentials entered are sent directly to the attacker. This technique is particularly dangerous because it can defeat common user training, as the main browser window can be on a legitimate-looking, but attacker-controlled, domain, and the fake pop-up can display a legitimate URL like `login.microsoftonline.com`.

## Threat Overview
The Browser-in-the-Browser (BitB) attack is a social engineering technique that enhances the credibility of a phishing page.
- **Target**: Users of Microsoft 365, whose credentials provide access to a wealth of sensitive corporate data, including email (Exchange), file storage (SharePoint, OneDrive), and collaboration tools (Teams).
- **Technique**: The attack begins with a standard phishing link. When a user clicks it, they are taken to a webpage controlled by the attacker. This page then uses HTML, CSS, and JavaScript to render a fake browser window on top of the existing page content. 
- **Deception**: This fake window is a pixel-perfect replica of a browser pop-up, complete with a fake address bar, title bar, and even an SSL/TLS padlock icon. The attacker can make the fake address bar display any URL they want, such as `login.microsoftonline.com`, making the prompt appear completely legitimate.

## Technical Analysis
The BitB technique is an evolution of traditional phishing, focusing on psychological manipulation rather than exploiting a technical vulnerability. It leverages the following MITRE ATT&CK techniques:
- [`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/): The attack is initiated via a link sent through email or other means.
- [`T1598.001 - Phishing for Information`](https://attack.mitre.org/techniques/T1598/001/): The ultimate goal is to trick the user into voluntarily giving up their credentials.
- [`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/): The user must click a link to be taken to the phishing page.

The core of the attack is the use of `<iframe>` or `<div>` elements styled with CSS to look exactly like a native window of the user's operating system (e.g., a Chrome window on Windows 11). This is purely a visual trick; there is no actual new browser window created.

## Impact Assessment
- **High Success Rate**: BitB attacks can have a much higher success rate than traditional phishing because they bypass the common advice to 'check the URL in the address bar.' The user sees what they expect to see, even though it's a fabrication.
- **Account Takeover**: A successful attack leads to the compromise of a Microsoft 365 account. This gives the attacker access to the user's email, contacts, and files.
- **Business Email Compromise (BEC)**: The compromised account can be used to launch internal phishing attacks, commit invoice fraud, or escalate privileges within the organization.
- **Data Exfiltration**: Attackers can access and exfiltrate sensitive data from the user's OneDrive and SharePoint sites.

## Detection & Response
Detecting a BitB attack from the user's perspective is difficult but not impossible.
- **Window Behavior**: A key giveaway is that the fake window cannot be moved outside the boundaries of the real browser tab it is rendered in. If you try to drag the 'pop-up' and it gets cut off by the edge of your browser, it's fake.
- **URL Filtering**: Backend detection relies on web security gateways identifying and blocking the initial phishing page. This involves D3FEND's [`URL Analysis`](https://d3fend.mitre.org/technique/d3f:URLAnalysis) to check for newly registered domains and suspicious content.

## Mitigation
Since BitB is a social engineering trick, mitigation relies on a combination of technical controls and advanced user awareness.
1.  **Phishing-Resistant MFA**: The single most effective mitigation is to enforce the use of phishing-resistant Multi-Factor Authentication, such as FIDO2 security keys. With this in place, even if a user is tricked and enters their password, the attacker cannot complete the login without the physical key. This is D3FEND's [`Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
2.  **Advanced User Training**: Train users on the specifics of the BitB technique. Show them examples and teach them the 'drag the window' test to see if a pop-up is legitimate.
3.  **Password Managers**: Using a password manager can help, as it will refuse to autofill credentials if the domain of the real browser tab doesn't match the domain stored in the vault, regardless of what the fake pop-up says.

**Tags:** Phishing, Browser-in-the-Browser, BitB, Microsoft 365, Social Engineering, Unit 42, Credential Theft

## Sources
- [Week in review: Exploited Check Point VPN zero-day, Oracle PeopleSoft servers under attack](https://www.helpnetsecurity.com/2026/06/14/week-in-review-exploited-check-point-vpn-zero-day-oracle-peoplesoft-servers-under-attack/) — Help Net Security (2026-06-14)
- [The Most Dangerous Code in Your Stack Is Code You Never Wrote](https://awards.thehackernews.com/blog/the-danger-in-your-dependencies/) — The Hacker News

---
Source: https://cyber.netsecops.io/articles/browser-in-the-browser-phishing-attacks-target-microsoft-365-users/
