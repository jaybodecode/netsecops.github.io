# IT Professional Jailed for 7 Years in Australia for 'Evil Twin' Wi-Fi Attacks on Flights

**Severity:** high | **Category:** Cyberattack,Phishing,Threat Intelligence | **Updated:** 2025-11-28 | **Reading time:** 5 min

An Australian IT professional, Michael Clapsis, has been sentenced to seven years and four months in prison for conducting sophisticated 'evil twin' Wi-Fi attacks. Using a Wi-Fi Pineapple device, he created rogue Wi-Fi hotspots at airports and on flights to trick travelers into entering their credentials into a phishing portal. Clapsis then used this access to infiltrate the online accounts of multiple women, stealing thousands of private images and videos. The Australian Federal Police (AFP) investigation began after airline staff reported a suspicious network. Clapsis also attempted to obstruct the investigation by deleting evidence and abusing his IT privileges at work to spy on meetings between his employer and the AFP.

## Executive Summary
On November 28, 2025, Michael Clapsis, a 44-year-old IT professional from West Australia, was sentenced to seven years and four months in prison for a series of cybercrimes centered around **'evil twin' Wi-Fi attacks**. Using a **[Wi-Fi Pineapple](https://en.wikipedia.org/wiki/Wi-Fi_Pineapple)** device, Clapsis created malicious Wi-Fi networks mimicking legitimate free services at airports and on domestic flights. He used these networks to harvest credentials through a phishing portal, which he then used to access the private online accounts of women to steal intimate photos and videos. The investigation by the **[Australian Federal Police (AFP)](https://www.afp.gov.au/)** also revealed attempts to destroy evidence and abuse of his employment position to spy on the investigation. The case highlights the tangible dangers of using public Wi-Fi and the effectiveness of man-in-the-middle attacks.

---

## Threat Overview
The attacker, Michael Clapsis, leveraged a portable hacking device, a Wi-Fi Pineapple, to execute his attacks. He set up rogue wireless access points with names that spoofed legitimate free Wi-Fi services at major Australian airports (Perth, Melbourne, Adelaide) and on airplanes. This is a classic man-in-the-middle (MitM) attack. When victims connected to the malicious network, they were presented with a captive portal, a phishing page disguised as a legitimate login screen, prompting them to enter their email or social media credentials. 

Clapsis harvested these credentials to gain unauthorized access to his victims' cloud storage, social media, and email accounts. The primary motive was the theft of personal and intimate data, specifically photos and videos of women. The investigation, which began in April 2024, culminated in his arrest and subsequent guilty plea to 15 charges, including unauthorized data access and obstruction of justice.

---

## Technical Analysis
The core of the attack revolves around several MITRE ATT&CK techniques:

- **[`T1557.002 - ARP Poisoning`](https://attack.mitre.org/techniques/T1557/002/):** While the articles specify an 'evil twin' setup, the Wi-Fi Pineapple can use various techniques to force clients to connect, including ARP poisoning to redirect traffic from a legitimate access point.
- **[`T1557.003 - Evil Twin Access Point`](https://attack.mitre.org/techniques/T1557/003/):** This is the primary technique. Clapsis created a Wi-Fi network with an SSID identical or similar to a trusted network, tricking users' devices into connecting automatically or manually.
- **[`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/):** The captive portal served to victims was essentially a phishing page, designed to trick them into volunteering their credentials.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/):** By capturing credentials from the phishing portal, the attacker effectively dumped credentials for various online services.
- **[`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/):** Clapsis used the stolen credentials to log into victims' accounts.
- **[`T1040 - Network Sniffing`](https://attack.mitre.org/techniques/T1040/):** The Wi-Fi Pineapple allows the operator to monitor all traffic from connected devices, potentially capturing unencrypted data.
- **[`T1070.004 - File Deletion`](https://attack.mitre.org/techniques/T1070/004/):** Clapsis attempted to cover his tracks by deleting 1,752 items from a data storage application, an act of evidence tampering.

---

## Impact Assessment
The impact on the victims is severe, involving a profound violation of privacy and the theft of highly sensitive, personal data. This type of crime can lead to significant emotional and psychological distress. Beyond the direct victims, the incident erodes public trust in the security of free Wi-Fi services, particularly in travel hubs like airports and on airlines. 

For the organizations involved (airports, airlines), there is reputational damage, even if their own networks were not breached. The incident highlights a security gap in the public environment they control. Clapsis's additional actions—spying on his employer's meetings with the AFP—demonstrate a severe insider threat risk, causing further damage to his former employer's reputation and security posture.

---

## Cyber Observables for Detection
Detecting evil twin attacks requires specialized wireless monitoring.

| Type | Value | Description |
|---|---|---|
| network_traffic_pattern | Unencrypted login pages | Monitor for HTTP traffic to major login portals (Google, Facebook, etc.) that should be HTTPS. |
| other | Rogue APs | Use a Wireless Intrusion Prevention System (WIPS) to detect unauthorized access points broadcasting SSIDs of legitimate networks. |
| other | BSSID anomalies | Detect multiple access points with the same SSID but different BSSIDs (MAC addresses) in close proximity, especially if one has a much stronger signal. |
| certificate_subject | Self-signed certificates | Alerts on captive portals using self-signed or untrusted SSL certificates. |

---

## Detection & Response
For individuals, detection is difficult. Key signs include unexpected login prompts for Wi-Fi, browser warnings about invalid certificates, and slow network performance.

For organizations like airports and airlines:
1.  **Deploy a Wireless Intrusion Prevention System (WIPS):** A WIPS can automatically detect and sometimes neutralize rogue access points. It can identify evil twins by analyzing signal strength, MAC addresses, and other wireless characteristics. This is a form of **D3FEND's** [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
2.  **User Education:** Clearly communicate the exact name (SSID) of the official Wi-Fi network. Advise users to be suspicious of similarly named networks and to ensure their devices do not auto-connect to open networks.
3.  **Encourage VPN Use:** Contrary to CISA's recent advice for personal use, for connecting to untrusted public networks, a reputable **[VPN](https://en.wikipedia.org/wiki/Virtual_private_network)** is a crucial defense. It creates an encrypted tunnel, making traffic sniffing ineffective. This aligns with **D3FEND's** [`Encrypted Tunnels`](https://d3fend.mitre.org/technique/d3f:EncryptedTunnels).

**Response:** If a rogue AP is detected, the immediate response is to locate the device and the operator, as the AFP did in this case. Physical security and law enforcement are key components of the response.

---

## Mitigation
**For Individuals:**
1.  **Be Skeptical of Public Wi-Fi:** Avoid connecting to open, unsecured Wi-Fi networks. If you must connect, use a trusted VPN service to encrypt your traffic.
2.  **Disable Auto-Connect:** Turn off the setting on your devices that automatically connects to known or open Wi-Fi networks.
3.  **Verify Captive Portals:** If presented with a login page, check the URL carefully. Look for the HTTPS lock icon. If in doubt, do not enter your credentials.
4.  **Use Cellular Data:** When possible, use your mobile data plan instead of public Wi-Fi, as it is significantly more secure.

**For Organizations:**
1.  **Secure Guest Networks:** If providing public Wi-Fi, use security protocols like WPA3 and a secure, clearly branded captive portal with a valid SSL certificate.
2.  **Regular Wireless Sweeps:** Conduct regular physical and virtual sweeps of the premises to detect unauthorized wireless devices.

**Tags:** Evil Twin, Wi-Fi Pineapple, Man-in-the-Middle, Phishing, Cybercrime, Australia

## Sources
- [Michael Clapsis: IT guru jailed for seven years for creating fake WiFi on flights, stealing intimate images](https://www.thewest.com.au/news/courts-wa/michael-clapsis-it-guru-jailed-for-seven-years-for-creating-fake-wifi-on-flights-stealing-intimate-images-c-16982842) — The West Australian (2025-11-27)
- [ThreatsDay Bulletin: Wi-Fi Hack, npm Worm, DeFi Theft, Phishing Blasts— and 15 More Stories](https://thehackernews.com/2025/12/threatsday-bulletin-wi-fi-hack-npm-worm.html) — The Hacker News (2025-12-04)
- [Australian Man Gets Seven Years for Running “Evil Twin” Wi-Fi](https://infosecurity-magazine.com/news/australian-man-evil-twin-wifi/) — Infosecurity Magazine (2025-12-01)

---
Source: https://cyber.netsecops.io/articles/australian-hacker-jailed-evil-twin-wifi-attacks/
