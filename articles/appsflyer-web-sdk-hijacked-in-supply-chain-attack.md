# AppsFlyer Web SDK Hijacked in Supply-Chain Attack to Deploy Crypto-Stealing Malware

**Severity:** high | **Category:** Supply Chain Attack,Malware,Cyberattack | **Updated:** 2026-03-15 | **Reading time:** 5 min

The widely used AppsFlyer Web SDK was compromised in a software supply-chain attack reported on March 14, 2026. For a brief period, the official SDK hosted on 'websdk.appsflyer.com' was replaced with a malicious version that delivered a crypto-stealing JavaScript payload. The malware was designed to intercept cryptocurrency wallet addresses entered by users on any of the thousands of websites integrating the SDK, replacing them with attacker-controlled addresses to divert funds. AppsFlyer confirmed that a domain registrar incident on March 10 led to the compromise. The company has since resolved the issue and stated that its mobile SDK and customer data were not affected. The event highlights the significant downstream risk of supply-chain attacks targeting popular third-party scripts.

## Executive Summary
A significant software supply-chain attack targeted **[AppsFlyer](https://www.appsflyer.com/)**, a leading marketing analytics firm whose tools are used by over 100,000 applications and websites. On March 14, 2026, it was reported that the company's official Web SDK, hosted at `websdk.appsflyer.com`, had been temporarily hijacked. Attackers replaced the legitimate JavaScript SDK with a malicious version designed to steal cryptocurrency. The malicious script would automatically activate on any website that loaded the compromised SDK. When an end-user on one of these sites attempted to copy a cryptocurrency wallet address, the script would intercept the clipboard action and replace the legitimate address with one belonging to the attackers. AppsFlyer attributed the compromise to a 'domain registrar incident' on March 10 and has since secured the domain and restored the legitimate SDK. This incident is a classic example of a **[T1195.002 - Compromise Software Supply Chain: Compromise Software Distribution](https://attack.mitre.org/techniques/T1195/002/)** attack, demonstrating how a single compromise can affect thousands of downstream victims.

---

## Threat Overview
*   **Target:** The **AppsFlyer Web SDK**, a third-party JavaScript library integrated into thousands of websites for marketing analytics.
*   **Attack Vector:** The attackers compromised the distribution point of the SDK. AppsFlyer stated this was due to a 'domain registrar incident,' which could imply several scenarios:
    *   Compromise of AppsFlyer's account at their domain registrar, allowing attackers to change DNS records.
    *   DNS hijacking or BGP hijacking to redirect traffic intended for `websdk.appsflyer.com` to an attacker-controlled server.
*   **Malicious Payload:** A JavaScript-based cryptocurrency stealer. It specifically targets clipboard events to perform address swapping.
*   **Impact:** Any user performing a cryptocurrency transaction on a website using the compromised SDK was at risk of having their funds stolen. The attack was widespread but transient, lasting only for the duration of the hijack.

---

## Technical Analysis
The malware's functionality is known as 'clippering' or clipboard hijacking. Here's how it worked:
1.  A user visits a website that legitimately includes the AppsFlyer SDK (e.g., `<script src="https://websdk.appsflyer.com/...">`).
2.  Due to the DNS hijack, the browser fetches the malicious JavaScript from an attacker-controlled server instead of the real one.
3.  The malicious script executes in the user's browser and adds an event listener to the webpage.
4.  When the user copies a string that matches the pattern of a cryptocurrency wallet address (e.g., a long alphanumeric string starting with 'bc1', '0x', etc.), the script intercepts the copy event.
5.  It then replaces the content of the user's clipboard with a hardcoded wallet address belonging to the attacker.
6.  When the user pastes the address into their wallet or exchange to send funds, they unknowingly paste the attacker's address, diverting the transaction.

This is a stealthy form of theft as the user interface of the webpage appears normal, and many users do not double-check the pasted address before confirming a transaction.

---

## Impact Assessment
The primary victims of this attack were the end-users of the websites that integrated the AppsFlyer SDK. The financial losses depend on how many users performed cryptocurrency transactions during the compromise window. For AppsFlyer's customers (the websites), the impact is reputational damage and potential loss of user trust. For AppsFlyer itself, the incident is a major security failure that undermines trust in its platform, even though its core systems were not breached. It highlights the critical responsibility of SaaS providers to secure not just their applications, but their entire delivery infrastructure, including DNS.

---

## Detection & Response
Detecting this as a downstream victim (a website using the SDK) is very difficult.
1.  **Subresource Integrity (SRI):** The most effective defense is to use Subresource Integrity. When including a third-party script, an integrity hash is added to the script tag: `<script src="..." integrity="sha256-Abc123...">`. If the content of the script ever changes (as it did in this attack), the hash will not match, and the browser will refuse to execute it. This would have completely blocked the attack.
2.  **Content Security Policy (CSP):** A strict CSP can limit the domains from which scripts can be loaded, but in this case, since the legitimate domain itself was hijacked, a basic CSP would not have helped. However, a more advanced CSP could be used to restrict connections to attacker-controlled wallet APIs if the malware made external calls.
3.  **Incident Response:** AppsFlyer's response involved regaining control of their domain, replacing the malicious file with the legitimate one, and communicating with customers. Downstream websites should have immediately audited their sites to see if they were loading the SDK and informed their users of the potential risk.

---

## Mitigation
1.  **For SaaS Providers (like AppsFlyer):**
    *   **Registrar Lock and 2FA:** Secure domain registrar accounts with the highest level of security, including registrar lock (which prevents unauthorized transfers or DNS changes) and multi-factor authentication.
    *   **DNSSEC:** Implement DNSSEC to ensure the integrity of DNS responses and prevent DNS spoofing.
2.  **For Websites Using Third-Party Scripts:**
    *   **Implement Subresource Integrity (SRI):** This is the single most important mitigation for this attack class. Always generate and use an integrity hash for third-party scripts.
    *   **Vendor All Your Scripts:** A more extreme but secure approach is to host a local copy of all third-party scripts on your own infrastructure. This gives you full control but means you are responsible for manually updating them. This is a form of **[D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation)** for your dependencies.

**Tags:** JavaScript, Cryptocurrency, Clipboard Hijacking, DNS Hijacking, Subresource Integrity

## Sources
- [AppsFlyer Web SDK hijacked to spread crypto-stealing JavaScript code](https://www.bleepingcomputer.com/news/cryptocurrency/appsflyer-web-sdk-hijacked-to-spread-crypto-stealing-javascript-code/) — BleepingComputer (2026-03-14)
- [AppsFlyer Web SDK hijacked to spread crypto-stealing JavaScript code](https://jedar.net/en/appsflyer-web-sdk-hijacked-to-spread-crypto-stealing-javascript-code/) — Jedar (2026-03-14)

---
Source: https://cyber.netsecops.io/articles/appsflyer-web-sdk-hijacked-in-supply-chain-attack/
