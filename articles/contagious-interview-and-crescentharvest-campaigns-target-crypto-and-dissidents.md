# New 'Contagious Interview' and 'CrescentHarvest' Campaigns Target Crypto Wallets and Iranian Dissidents

**Severity:** high | **Category:** Threat Actor,Malware,Phishing | **Updated:** 2026-02-18 | **Reading time:** 5 min

Two distinct and sophisticated cyber threat campaigns were reported on February 18, 2026. The first, dubbed 'Contagious Interview,' is a financially motivated operation targeting MetaMask browser wallets. It uses injected malicious code to surgically alter transaction data in real-time, redirecting cryptocurrency to attacker-controlled wallets. The second campaign, 'CrescentHarvest,' is attributed to an Iranian threat actor and focuses on cyber-espionage against political dissidents and protestors. This campaign uses phishing to deploy surveillance malware designed to harvest sensitive communications. Both campaigns highlight a trend towards precision-targeted, stealthy attacks for financial gain and political suppression.

## Executive Summary
On February 18, 2026, researchers detailed two new, highly targeted cyber campaigns demonstrating advanced stealth and precision. The 'Contagious Interview' campaign is a sophisticated financial theft operation that compromises **[MetaMask](https://metamask.io/)** crypto wallets by injecting malicious code into the browser. This code manipulates transaction data just before user approval, redirecting funds to attacker wallets. The second campaign, 'CrescentHarvest,' is a cyber-espionage operation attributed to an Iranian state-sponsored actor. It specifically targets political protestors and dissidents with surveillance malware delivered via phishing, aiming to monitor and suppress opposition activities. While their goals differ—one financial, one political—both campaigns showcase a move towards surgical, hard-to-detect attack methodologies.

---

## Threat Overview

### 'Contagious Interview' Campaign
This is a financially motivated campaign focused on stealing cryptocurrency from users of the MetaMask browser wallet. The attack is not a brute-force or broad-spectrum attack, but a surgical manipulation.
*   **Attack Vector**: The initial vector is likely social engineering (as hinted by the name 'Contagious Interview'), tricking the user into installing a malicious browser extension or running malicious code.
*   **Mechanism**: Once active, the malicious code hooks into the browser's processes. When the user initiates a legitimate transaction in their MetaMask wallet, the code intercepts the transaction data *after* the user has reviewed it but *before* it is signed. It swaps the destination wallet address with one controlled by the attacker.
*   **Impact**: The user, believing they are sending funds to a legitimate address, approves the transaction, which is then irrevocably sent to the attacker. This is a form of Adversary-in-the-Middle (AitM) attack at the client level.

### 'CrescentHarvest' Campaign
This is a politically motivated cyber-espionage campaign attributed to an Iranian threat actor.
*   **Targets**: The campaign specifically targets Iranian political dissidents, protestors, and activists.
*   **Attack Vector**: The primary delivery method is phishing, likely via email or social media, with lures tailored to the interests of the target demographic.
*   **Payload**: The phishing links or attachments deliver a sophisticated surveillance malware. This malware is designed to harvest sensitive data from the compromised device, including emails, chat logs from secure messaging apps, location data, and microphone recordings.
*   **Impact**: The goal is to identify, monitor, and suppress opposition movements by compromising the communications and operational security of activists.

## Technical Analysis
### MITRE ATT&CK TTPs

**Contagious Interview:**
*   [`T1176 - Browser Extensions`](https://attack.mitre.org/techniques/T1176/): A likely vector for injecting the malicious code into the browser environment.
*   [`T1114 - Email Collection`](https://attack.mitre.org/techniques/T1114/): The malicious code intercepts and manipulates data within the browser session, a form of client-side data manipulation.
*   [`T1649 - Steal or Forge Authentication Tokens`](https://attack.mitre.org/techniques/T1649/): While not stealing tokens, it manipulates the data that a token would be used to sign, achieving a similar outcome.

**CrescentHarvest:**
*   [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): The primary initial access vector.
*   [`T1219 - Remote Access Software`](https://attack.mitre.org/techniques/T1219/): The surveillance malware acts as a Remote Access Trojan (RAT).
*   [`T1056.001 - Keylogging`](https://attack.mitre.org/techniques/T1056/001/): A common feature of such surveillance malware.
*   [`T1125 - Video Capture`](https://attack.mitre.org/techniques/T1125/): May include screen recording or capturing webcam data.

## Impact Assessment
*   **Contagious Interview**: Poses a direct financial threat to cryptocurrency users. It undermines trust in web-based wallet technologies and demonstrates that even careful users can be defrauded if their browser environment is compromised.
*   **CrescentHarvest**: Represents a serious threat to human rights and personal safety. The surveillance of dissidents can lead to arrests, persecution, and the chilling of free speech and political opposition.

## Detection & Response
*   **For 'Contagious Interview'**: Detection is extremely difficult for the end-user. It requires security software that can detect malicious browser extensions or memory injection. Some advanced EDR solutions may detect this. The best defense is prevention.
*   **For 'CrescentHarvest'**: Standard anti-phishing and anti-malware defenses apply. EDR solutions can detect the installation and execution of the surveillance malware. Network monitoring may spot C2 traffic from the compromised device.

## Mitigation
*   **For 'Contagious Interview'**: 
    1.  **Use Hardware Wallets**: For significant crypto holdings, always use a hardware wallet. This ensures that the transaction is signed on a separate, secure device, preventing the browser from being able to manipulate the final transaction data.
    2.  **Browser Security**: Be extremely cautious about installing browser extensions. Only install well-known extensions from official stores and review their permissions carefully. D3FEND's [`D3-ACH - Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) applies here.
*   **For 'CrescentHarvest'**:
    1.  **User Training**: High-risk individuals like activists must be trained to identify sophisticated phishing attempts.
    2.  **Endpoint Security**: Use a reputable EDR or antivirus solution on all devices.
    3.  **Compartmentalization**: Use separate devices or virtual machines for sensitive activities to limit the impact of a compromise.

**Tags:** Cryptocurrency, MetaMask, Cyberespionage, Iran, Malware, Phishing

## Sources
- [Daily Cybersecurity Roundup, February 18, 2026](https://www.cyware.com/news/daily-cybersecurity-roundup-february-18-2026-6a9b3c4d) — Cyware Social (2026-02-18)
- [New Campaigns Target MetaMask Users and Iranian Dissidents](https://thehackernews.com/2026/02/new-campaigns-target-metamask-and-iranian-dissidents.html) — The Hacker News (2026-02-18)

---
Source: https://cyber.netsecops.io/articles/contagious-interview-and-crescentharvest-campaigns-target-crypto-and-dissidents/
