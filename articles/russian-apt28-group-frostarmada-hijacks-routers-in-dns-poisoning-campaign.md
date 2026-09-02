# Russian APT28 Hijacks Routers in DNS Poisoning Campaign

**Severity:** high | **Category:** Threat Actor,Cyberattack,Phishing | **Updated:** 2026-07-29 | **Reading time:** 5 min

A cyberespionage campaign named FrostArmada, attributed to the Russian APT group Forest Blizzard (also known as APT28 or Fancy Bear), has been detailed. The attackers compromised gateway routers, particularly in hospitality Wi-Fi networks, and used DNS poisoning to intercept traffic. This Man-in-the-Middle attack allowed them to steal Microsoft credentials and OAuth tokens from users, leveraging the compromised infrastructure to efficiently target a wide range of organizations.

## Executive Summary
Details have emerged about a sophisticated cyberespionage campaign dubbed **FrostArmada**, attributed to the Russian state-sponsored threat group **[Forest Blizzard](https://attack.mitre.org/groups/G0007/)** (more widely known as **[APT28](https://attack.mitre.org/groups/G0007/)** or Fancy Bear). The campaign involved compromising network gateway routers, especially in hospitality environments like hotels and conference centers, to conduct **[DNS poisoning](https://en.wikipedia.org/wiki/DNS_spoofing)** attacks. By modifying the DNS settings on these routers, the attackers established a Man-in-the-Middle (MitM) position, allowing them to intercept web traffic from users on the Wi-Fi network. This position was leveraged to harvest **[Microsoft](https://www.microsoft.com/security)** credentials and OAuth tokens as users attempted to log into legitimate services, providing the attackers with access to a wide array of corporate accounts.

---

## Threat Overview
**Threat Actor**: **Forest Blizzard (APT28)** is a highly skilled Russian General Staff Main Intelligence Directorate (GRU) threat group known for targeting governments, military, and security organizations for intelligence gathering. Their TTPs are often stealthy and sophisticated.

**Attack Vector**: The core of the FrostArmada campaign is the compromise of edge network devices ([`T1189 - Drive-by Compromise`](https://attack.mitre.org/techniques/T1189/)) and subsequent DNS manipulation. By targeting routers in public or semi-public locations, the attackers can efficiently target a diverse and high-value set of victims with a single infrastructure compromise. This is a highly effective technique for credential harvesting at scale.

---

## Technical Analysis
The attack chain for the FrostArmada campaign is as follows:
1.  **Initial Compromise**: The attackers gain access to gateway routers in hospitality locations. This could be achieved by exploiting known vulnerabilities in the router firmware or by using default or weak credentials.
2.  **Persistence and Modification** ([`T1547.001 - Registry Run Keys / Startup Folder`](https://attack.mitre.org/techniques/T1547/001/)): Once on the router, the attackers modify its DNS configuration. They change the DNS server settings to point all DNS queries from connected clients to an attacker-controlled DNS server.
3.  **Man-in-the-Middle** ([`T1557 - Man-in-the-Middle`](https://attack.mitre.org/techniques/T1557/)): When a user on the compromised Wi-Fi network attempts to browse to a site like `login.microsoftonline.com`, their DNS query is sent to the malicious server. The server responds with the IP address of an attacker-controlled phishing server instead of the legitimate Microsoft IP.
4.  **Credential Harvesting** ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)): The user's browser is directed to the phishing server, which presents a pixel-perfect clone of the Microsoft login page. The unsuspecting user enters their credentials and potentially an MFA token, which are captured by the attackers.
5.  **OAuth Token Theft**: In addition to passwords, the attackers also intercept and steal OAuth access tokens. These tokens can provide persistent access to a user's cloud applications (like email and file storage) even if the user later changes their password.

The campaign was reportedly disrupted in April 2026 through a joint operation.

---

## Impact Assessment
This campaign poses a significant threat, especially to business travelers and government employees:
- **Corporate Espionage**: By stealing credentials and OAuth tokens, APT28 can gain long-term access to corporate email accounts, cloud storage (SharePoint, OneDrive), and other sensitive resources to gather intelligence.
- **Wide-Ranging Victimology**: Compromising a single router at a major conference could yield credentials for employees from hundreds of different high-value organizations in government, defense, technology, and finance.
- **Difficult to Detect**: From the user's perspective, the attack is nearly invisible. The browser's address bar shows the correct URL, and the login page looks legitimate. The compromise is on the network infrastructure, not the user's device, making it hard for endpoint security to detect.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided in the source articles.

---

## Cyber Observables — Hunting Hints
For individuals and organizations, detecting this attack is challenging. However, some hints include:
- **Certificate Warnings**: While sophisticated attackers use valid, albeit malicious, SSL certificates, sometimes errors can occur. Any browser certificate warning when connecting to a major service like Microsoft 365 on a public Wi-Fi should be treated as a red flag.
- **DNS Server Inspection**: On a corporate laptop, security software could check the DNS servers assigned by the DHCP lease. If they are not well-known public DNS servers (like 8.8.8.8) or the expected corporate DNS servers, it could indicate a problem.
- **Corporate Account Logins**: Security teams should monitor for corporate account logins from IP addresses associated with hotels and public Wi-Fi hotspots, correlating them with travel schedules where possible.

---

## Detection & Response
1.  **DNS over HTTPS (DoH)**: For corporate devices, configuring browsers and operating systems to use DoH can prevent local network DNS servers from intercepting and manipulating DNS queries. The DNS requests are encrypted and sent over HTTPS to a trusted resolver.
2.  **VPN Usage**: Mandate that all employees use a trusted corporate VPN when connecting to any untrusted network, including hotel and conference Wi-Fi. This encrypts all traffic, preventing local network MitM attacks.
3.  **Account Login Auditing**: Regularly audit Microsoft 365 and other cloud service sign-in logs for suspicious activity, such as logins from unexpected locations or multiple failed MFA attempts. This is a core part of **[Domain Account Monitoring (D3-DAM)](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)**.

---

## Mitigation
1.  **User Training**: Train employees, especially frequent travelers, about the dangers of public Wi-Fi and the importance of using a VPN. This aligns with **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
2.  **FIDO2/Passwordless Authentication**: Transitioning to phishing-resistant authentication methods like FIDO2 security keys can mitigate the risk of credential theft, as the credential cannot be phished in the same way a password can.
3.  **Router Security (for Hospitality)**: Hospitality providers should ensure their routers are running the latest firmware, have strong, non-default administrative passwords, and have their management interfaces isolated from the guest network. This is **[M1028 - Operating System Configuration](https://attack.mitre.org/mitigations/M1028/)** applied to network devices.

**Tags:** APT28, Forest Blizzard, Fancy Bear, DNS Poisoning, Man-in-the-Middle, Cyberespionage, Russia

## Sources
- [DNS Poisoning Campaign Makes Hospitality Wi-Fi Spots Inhospitable](https://www.technewsworld.com/story/dns-poisoning-campaign-makes-hospitality-wi-fi-spots-inhospitable-180463.html) — TechNewsWorld (2026-07-29)

---
Source: https://cyber.netsecops.io/articles/russian-apt28-group-frostarmada-hijacks-routers-in-dns-poisoning-campaign/
