# ‘Diesel Vortex’ Phishing Ring Steals Over 1,600 Credentials from US & European Logistics Firms

**Severity:** high | **Category:** Phishing,Threat Actor,Cyberattack | **Updated:** 2026-02-28 | **Reading time:** 5 min

A financially motivated threat group dubbed 'Diesel Vortex' has been identified targeting the freight and logistics industry in the United States and Europe since September 2025. The campaign utilized a Phishing-as-a-Service (PaaS) model, complete with call centers and typosquatted domains mimicking platforms like DAT Truckstop and Penske Logistics. The actors employed a 'Dual-Domain Deception' technique to bypass browser warnings and used vishing and Telegram to capture MFA codes. An exposed .git repository led investigators to the group's infrastructure, revealing the theft of 1,649 unique credentials and evidence of financial fraud, including double-brokering and EFS check fraud. The group is believed to be Armenian-speaking with ties to Russian infrastructure.

## Executive Summary
A highly organized, financially motivated threat group tracked as **Diesel Vortex** has been conducting a large-scale phishing campaign against the freight and logistics sectors in the United States and Europe since at least September 2025. The operation successfully stole 1,649 unique credentials by targeting users of critical industry platforms like **[DAT Truckstop](https://www.truckstop.com/)**, **[Penske Logistics](https://www.penskelogistics.com/)**, and **[Electronic Funds Source (EFS)](https://www.efsllc.com/)**. The attackers leveraged a sophisticated Phishing-as-a-Service (PaaS) kit, employing advanced tactics such as typosquatted domains, voice phishing (vishing) to bypass **[MFA](https://en.wikipedia.org/wiki/Multi-factor_authentication)**, and a 'Dual-Domain Deception' technique to evade detection. The discovery of an exposed `.git` repository provided critical intelligence, leading to the takedown of the group's infrastructure in a coordinated effort involving **[Cloudflare](https://www.cloudflare.com/)** and **[Google](https://www.google.com/)'s Threat Intelligence Group**.

---

## Threat Overview
The **Diesel Vortex** campaign represents a significant threat to the supply chain and transportation industries. The group's primary motive is financial gain, achieved by compromising accounts on freight exchanges and fuel card systems. This access is then used to commit fraud, such as 'double-brokering'—where stolen carrier identities are used to take control of legitimate shipments, which are then diverted and stolen. The investigation uncovered 35 confirmed instances of EFS check fraud stemming from the compromised credentials.

The operation was notable for its professionalism and technical sophistication. It included a full-service PaaS model with a call center and email support, 52 typosquatted domains that were near-perfect clones of legitimate portals, and the use of **[Telegram](https://telegram.org/)** bots for real-time communication and MFA code theft. The actors are assessed to be Armenian-speaking with links to Russian infrastructure, indicating a transnational criminal enterprise.

## Technical Analysis
The campaign's success hinged on a combination of social engineering and technical evasion techniques designed to defeat both human and automated defenses.

### Attack Chain & TTPs
1.  **Resource Development ([`T1586.002 - Email Accounts`](https://attack.mitre.org/techniques/T1586/002/)):** The group targeted over 75,000 email contacts, likely gathered from industry lists or previous breaches.
2.  **Phishing ([`T1566.002 - Spearphishing Link`](https://attack.mitre.org/techniques/T1566/002/)):** Victims received spearphishing emails containing links to one of 52 typosquatted domains.
3.  **User Execution ([`T1204.001 - Malicious Link`](https://attack.mitre.org/techniques/T1204/001/)):** The user clicks the link, leading them to a convincing phishing page.
4.  **Defense Evasion ([`T1608.005 - Link Target Manipulation`](https://attack.mitre.org/techniques/T1608/005/)):** The attackers used a 'Dual-Domain Deception' technique. A seemingly clean domain loaded the actual phishing kit from a separate, malicious domain within a hidden iframe. This helps bypass some browser-based phishing detection that only analyzes the primary URL.
5.  **Credential Access ([`T1598.003 - Spearphishing Voice`](https://attack.mitre.org/techniques/T1598/003/)):** If a user entered credentials, the system would prompt for an MFA code. The PaaS kit likely triggered an alert to the attackers, who would then engage in vishing (a phone call) or use Telegram to socially engineer the victim into providing the real-time MFA code.
6.  **Valid Accounts ([`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/)):** With credentials and the MFA code, the attackers gained full access to the victim's account on the targeted platform.
7.  **Impact ([Financial Theft]):** The attackers used this access to divert payments, steal cargo through double-brokering, and commit check fraud.

> The exposure of the group's `.git` repository was a critical operational security failure. It allowed researchers to reconstruct the phishing kit's source code and access a 36.6MB SQL database, providing a comprehensive view of the campaign's scale and victims.

## Impact Assessment
The **Diesel Vortex** campaign has had a direct and severe financial impact on the freight and logistics industry.

*   **Direct Financial Loss:** The theft of cargo and funds through double-brokering and check fraud represents millions of dollars in losses for affected carriers and shippers.
*   **Operational Disruption:** Compromised accounts on platforms like DAT Truckstop can lead to significant disruption of logistics planning and execution, causing delays and contractual penalties.
*   **Supply Chain Risk:** The ability to divert cargo poses a broader risk to the integrity of the supply chain, potentially affecting the delivery of critical goods.
*   **Erosion of Trust:** Such campaigns erode trust in the digital platforms that are essential for the modern logistics industry.

## Detection & Response
Detecting this campaign requires a multi-layered approach focusing on email security, web traffic analysis, and user awareness.

### Detection Strategies
*   **Email Security Gateway:** Use advanced email filtering to detect and block emails from typosquatted domains and those containing suspicious links. Analyze email headers for signs of spoofing.
*   **Web Proxy/DNS Filtering:** Block access to known phishing domains. Monitor DNS logs for queries to newly registered or suspicious-looking domains that mimic company or partner brands. D3FEND's [`D3-DNSDL: DNS Denylisting`](https://d3fend.mitre.org/technique/d3f:DNSDenylisting) is essential.
*   **User Behavior Analytics (UBA):** Monitor for anomalous login behavior, such as logins from unexpected locations or multiple failed MFA attempts followed by a success, which could indicate a real-time phishing attack.

### Response Actions Taken
*   A coordinated takedown effort involving GitLab, **Cloudflare**, and **Google** dismantled the phishing infrastructure.
*   The exposed database allowed for victim notification.

## Mitigation
Defending against sophisticated phishing requires technical controls and continuous user education.

### Tactical Recommendations
*   **Phishing-Resistant MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)):** While Diesel Vortex bypassed some MFA, organizations should prioritize the adoption of phishing-resistant MFA methods like FIDO2/WebAuthn, which are not susceptible to real-time credential and session relay attacks.
*   **User Training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)):** Conduct regular, realistic phishing simulation and training. Specifically educate users on vishing tactics and the danger of sharing MFA codes over the phone or chat, even if the person seems legitimate.
*   **Restrict Web-Based Content ([`M1021 - Restrict Web-Based Content`](https://attack.mitre.org/mitigations/M1021/)):** Implement strict web filtering to block access to uncategorized or newly registered domains. This can prevent users from ever reaching the phishing page.
*   **Brand Monitoring:** Proactively monitor for typosquatted domains that mimic your organization's or your key partners' websites and initiate takedown procedures immediately upon discovery.

**Tags:** phishing-as-a-service, vishing, MFA bypass, typosquatting, credential theft, supply chain, freight, logistics

## Sources
- [Russian cybercrime ring targeted freight firms in US, Europe, report says](https://www.freightwaves.com/news/russian-cybercrime-ring-targeted-freight-firms-in-us-europe-report-says) — FreightWaves (2026-02-27)
- [Ankura CTIX FLASH Update – February 27, 2026](https://www.ankura.com/insights/ankura-ctix-flash-update-february-27-2026/) — Ankura (2026-02-27)

---
Source: https://cyber.netsecops.io/articles/diesel-vortex-phishing-campaign-targets-us-european-logistics-firms/
