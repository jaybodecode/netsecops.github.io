# Taiwan's Government Issues Warning on Cybersecurity Risks of Chinese Mobile Apps

**Severity:** medium | **Category:** Policy and Compliance,Mobile Security,Data Breach | **Updated:** 2026-05-27 | **Reading time:** 4 min

Taiwan's Ministry of Digital Affairs (MODA) has issued a public warning about the significant cybersecurity and data privacy risks associated with four popular Chinese-made mobile apps: Amap, bilibili, iQIYI, and BIMOBIMO. An investigation by the Administration for Cyber Security (ACS) found that the apps request extensive, often unnecessary, permissions and transmit user data back to China. Officials warned that under Chinese law, the parent companies could be compelled to turn this data over to Beijing, posing a national security risk.

## Executive Summary
Taiwan's Ministry of Digital Affairs (MODA) has officially warned its citizens about the cybersecurity risks posed by four popular Chinese-made mobile applications: the navigation app **Amap**, video platforms **bilibili** and **iQIYI**, and messaging app **BIMOBIMO**. An analysis by MODA's Administration for Cyber Security (ACS) revealed that these applications request an excessive number of permissions, collect vast amounts of user data, and transmit that data to servers in **[China](https://en.wikipedia.org/wiki/China)**. The ministry highlighted that this activity poses a national security risk, as Chinese national security laws could compel the app developers to surrender data on Taiwanese users to the Chinese government.

---

## Regulatory Details
The warning from MODA is not a ban, but a strong advisory based on technical findings and legal analysis. The core of the issue lies in the intersection of the apps' technical behavior and China's legal framework.

*   **Technical Findings:** The ACS tested the apps against 15 indicators across four categories: reading data from other apps, collecting/sharing user data, accessing device info, and monitoring user activity. Amap was found to be the most aggressive, exhibiting 11 risk behaviors on Android and 8 on iOS. These included continuous location tracking (even when the app was closed), and access to contacts, media, and the microphone.
*   **Legal Framework:** The ACS cited China's Cybersecurity Law and National Intelligence Law, which legally obligate Chinese companies and citizens to cooperate with state intelligence and security agencies. This means any data collected by these apps, regardless of the user's location, could be accessed by the Chinese government upon request.

---

## Affected Systems
*   **Applications:**
    *   `Amap` (Navigation)
    *   `bilibili` (Video Streaming)
    *   `iQIYI` (Video Streaming)
    *   `BIMOBIMO` (Messaging)
*   **Platforms:** Android and iOS devices where these apps are installed.

---

## Impact Assessment
The primary impact is on user privacy and national security. For individuals, the risk is the large-scale collection of personal data, including location history, contact lists, and private communications, which can be used for profiling or monitoring. For **[Taiwan](https://en.wikipedia.org/wiki/Taiwan)** as a nation, the aggregated data from millions of users could provide the Chinese government with valuable intelligence on population movements, social networks, and public sentiment, posing a significant national security threat.

---

## Cyber Observables — Hunting Hints
The following patterns may help identify risky applications on mobile devices:

| Type | Value | Description |
| :--- | :--- | :--- |
| API Endpoint | Continuous location services access | Mobile device management (MDM) or security software can monitor for apps that persistently access GPS data even when in the background. |
| Network Traffic | Data transmission when app is closed | Monitor for apps that continue to send data to external servers even when they are not in the foreground. |
| Certificate Subject | App certificates signed by Chinese entities | While not inherently malicious, this can be a data point for risk assessment. |
| Permission Request | Excessive or unnecessary permissions | Audit apps that request access to contacts, microphone, or storage when it is not core to their function. |

---

## Detection Methods
*   **Mobile Device Management (MDM):** MDM solutions can be configured to detect and flag or block the installation of these specific applications on corporate devices.
*   **Mobile App Vetting:** Use mobile application security testing (MAST) tools to analyze app behavior, including data transmission and permission usage, before allowing them in an enterprise environment.
*   **Network Analysis:** On a test device, use a network proxy like Burp Suite or Wireshark to monitor the data being transmitted by the application, including the destination and content of the traffic.

---

## Remediation Steps
*   **User Education:** The primary mitigation offered by MODA is public awareness. Users should understand the risks associated with these apps and the trade-offs they are making between functionality and privacy.
*   **App Removal:** Individuals concerned about their data privacy and security should uninstall these applications from their devices.
*   **Permission Management:** For users who choose to keep the apps, they should go into their device's settings and revoke all non-essential permissions. This includes limiting location access to "only while using the app" and denying access to contacts, microphone, and files.
*   **Alternative Apps:** Encourage the use of alternative applications that have a stronger privacy focus and are not subject to Chinese national security laws.
*   **D3FEND:** While D3FEND is primarily for enterprise networks, the principle of [`D3-EDL - Executable Denylisting`](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting) can be applied through MDM policies to block these apps on managed devices.

**Tags:** taiwan, china, mobile security, data privacy, amap, bilibili, moda, national security

## Sources
- [MODA warns of cybersecurity risks in Chinese-made apps](https://focustaiwan.tw/sci-tech/202605270014) — Focus Taiwan (2026-05-27)
- [Cybersecurity gaps leave Israeli emergency agencies exposed, state comptroller warns](https://www.jns.org/cybersecurity-gaps-leave-israeli-emergency-agencies-exposed-state-comptroller-warns/) — Jewish News Syndicate (2026-05-27)

---
Source: https://cyber.netsecops.io/articles/taiwan-warns-of-cybersecurity-risks-in-chinese-made-apps/
