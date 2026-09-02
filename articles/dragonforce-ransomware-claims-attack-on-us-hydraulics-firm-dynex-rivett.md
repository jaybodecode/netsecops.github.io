# Dragonforce Ransomware Claims Attack on U.S. Hydraulics Firm Dynex/Rivett

**Severity:** high | **Category:** Ransomware,Threat Actor,Cyberattack | **Updated:** 2026-03-19 | **Reading time:** 3 min

The Dragonforce ransomware group has claimed responsibility for a cyberattack against Dynex/Rivett Inc., a U.S.-based manufacturer of hydraulic systems. In a post on March 18, 2026, the group announced the attack and threatened to publish a 'full leak' of stolen data if the company does not make contact to negotiate. This incident employs a typical double-extortion tactic, where data is both encrypted and stolen to maximize pressure on the victim to pay a ransom. The nature and volume of the exfiltrated data have not been specified.

## Executive Summary
On March 18, 2026, the **Dragonforce** ransomware group added U.S. hydraulic systems manufacturer **Dynex/Rivett Inc.** to its list of victims. The group posted a claim of a successful cyberattack and issued a public ultimatum, threatening to leak a 'full leak' of stolen data unless the company engages in negotiations. This incident follows the standard double-extortion model, where threat actors combine data encryption with data exfiltration to increase their leverage for a ransom payment. The attack underscores the continued targeting of the manufacturing and industrial sectors by ransomware gangs seeking to exploit the high cost of operational downtime.

---

## Threat Overview
*   **Threat Actor:** Dragonforce, a ransomware group employing double-extortion tactics.
*   **Victim:** Dynex/Rivett Inc., a U.S.-based company in the hydraulic components and systems industry.
*   **Tactic:** The group claims to have exfiltrated sensitive data and is using the threat of a public leak to extort a ransom payment. This is a classic double-extortion strategy ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) and [`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)).
*   **Status:** The data has not yet been leaked, as the threat is conditional on the company's failure to contact the attackers.

## Technical Analysis
While specific details of the intrusion are not available, a typical ransomware attack on a manufacturing company like Dynex/Rivett would likely follow this pattern:
1.  **Initial Access:** Common vectors include exploiting vulnerabilities in public-facing services like VPNs or RDP ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), or through successful phishing campaigns ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)).
2.  **Credential Access & Discovery:** Once inside, the attackers would use tools like Mimikatz or conduct Kerberoasting ([`T1558 - Steal or Forge Kerberos Tickets`](https://attack.mitre.org/techniques/T1558/)) to escalate privileges and discover critical assets like domain controllers, file servers, and backup systems.
3.  **Data Exfiltration:** Before deploying the ransomware, the actors would identify and exfiltrate valuable data, such as intellectual property, financial records, and employee information, to a cloud storage provider under their control.
4.  **Impact:** The final step is the deployment of the Dragonforce ransomware payload across the network, encrypting servers and workstations to disrupt business and manufacturing operations.

## Impact Assessment
A successful ransomware attack on a manufacturer like Dynex/Rivett can have severe consequences:
*   **Operational Disruption:** Encryption of systems controlling manufacturing processes, inventory, and shipping can halt production entirely, leading to significant revenue loss and supply chain delays.
*   **Data Breach:** The public leak of stolen data can expose sensitive intellectual property (e.g., product designs, manufacturing processes), employee PII, and confidential customer information.
*   **Financial Costs:** The victim faces costs from ransom payments (if they choose to pay), incident response and recovery efforts, legal fees, and potential regulatory fines.
*   **Reputational Damage:** A public breach can damage the company's reputation with customers and partners.

## Detection & Response
1.  **Monitor for Ransomware Precursors:** Use EDR and SIEM solutions to detect early-stage attacker activity, such as the use of credential dumping tools, lateral movement via RDP, or large-scale data staging on internal servers.
2.  **Network Egress Monitoring (D3FEND: User Data Transfer Analysis):** Monitor outbound network traffic for large, anomalous data transfers, which could indicate data exfiltration in progress.
3.  **Backup Integrity:** Regularly check the integrity and accessibility of backups. Ensure backups are isolated from the primary network (offline or immutable) to prevent them from being encrypted by the attackers.

## Mitigation
1.  **Secure Internet-Facing Systems:** Harden all internet-facing devices. Apply patches promptly, disable unused ports, and enforce strong password and MFA policies on all remote access services (VPN, RDP).
2.  **Network Segmentation:** Segment the network to separate IT systems from Operational Technology (OT) systems. This can prevent a ransomware attack on the corporate network from spreading to the factory floor.
3.  **Immutable Backups:** Maintain multiple copies of critical data, with at least one copy stored offline or in an immutable storage location. Regularly test the restoration process.
4.  **User Training:** Train employees to recognize and report phishing emails, which are a primary initial access vector for ransomware attacks.

**Tags:** Ransomware, Dragonforce, Double Extortion, Manufacturing, Data Leak

## Sources
- [Dragonforce Ransomware Attack on Dynex/Rivett Inc.](https://dexpose.io/dragonforce-ransomware-attack-on-dynex-rivett-inc-dexpose-2/) — DeXpose (2026-03-18)
- [Dragonforce Ransomware Attack on Dynex/Rivett Inc. - DeXpose](https://www.google.com/search?q=Dragonforce+Ransomware+Attack+on+Dynex/Rivett+Inc.+-+DeXpose&sca_esv=3f52a78b31d2be18&sxsrf=ACQVn08_yVjTUn6xV-hI-5x3n1kL0u3Hhg%3A1708453489814&ei=hPDRZZz3H4-fvr0PzN-qgAc&ved=0ahUKEwimyY_o6bmEAxWPT98KHcwrCnAQ4dUDCBA&uact=5&oq=Dragonforce+Ransomware+Attack+on+Dynex/Rivett+Inc.+-+DeXpose&gs_lp=Egxnd3Mtd2l6LXNlcnAiPERyYWdvbmZvcmNlIFJhbnNvbXdhcmUgQXR0YWNrIG9uIER5bmV4L1JpdmV0dCBJbmMuIC0gRGVYcG9zZUiYF1AAWABwAHgAkAEAmAF2oAF2qgEDMC4xuAEDyAEA-AEB-AECiAIB&sclient=gws-wiz-serp) — DeXpose (2026-03-18)

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-claims-attack-on-us-hydraulics-firm-dynex-rivett/
