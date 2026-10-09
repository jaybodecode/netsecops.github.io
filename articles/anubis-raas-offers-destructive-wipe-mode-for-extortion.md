# Anubis RaaS Ups the Ante with Destructive 'Wipe Mode' to Maximize Extortion

**Severity:** high | **Category:** Ransomware,Malware,Threat Actor | **Updated:** 2026-01-23 | **Reading time:** 6 min

A new Ransomware-as-a-Service (RaaS) operation named Anubis is gaining attention for its destructive capabilities. Evolving from a prototype called 'Sphinx,' Anubis offers its affiliates a dual-execution model. In addition to standard encryption, the malware can be run with a `/WIPEMODE` parameter that irreversibly overwrites and destroys victim files, rendering them unrecoverable. This tactic fundamentally changes the extortion negotiation, as paying a ransom cannot restore the data. It indicates a strategy where attackers rely solely on the threat of leaking exfiltrated data for payment, using permanent data destruction as additional leverage. The group is targeting organizations opportunistically across the globe.

## Executive Summary
A new Ransomware-as-a-Service (RaaS) operation named **Anubis** is introducing a disturbing feature that escalates extortion tactics: a built-in data wiper. First seen in late 2024 as a prototype called "Sphinx," the Anubis group now advertises on Russian-language forums, offering a flexible attack model. Affiliates can choose between standard file encryption or executing the malware with a `/WIPEMODE` parameter. This mode does not encrypt files but instead permanently overwrites them with null bytes, making data recovery impossible. This changes the negotiation dynamic, as the promise of a decryption key becomes irrelevant. Instead, the attackers rely on the threat of leaking previously exfiltrated data, using the irreversible destruction as a powerful coercive tool. This hybrid encrypt/wipe/leak model provides attackers with multiple monetization paths and significantly increases pressure on victims.

---

## Threat Overview
Anubis operates as a RaaS platform, providing malware and infrastructure to affiliates who carry out attacks. Its key differentiator is the flexibility of its impact phase.

- **Standard Mode**: The malware behaves like traditional ransomware, encrypting files and demanding a ransom for the decryption key.
- **Wipe Mode**: When executed with the `/WIPEMODE` command-line argument, the malware switches to a destructive function. It traverses the file system and overwrites the content of targeted files, reducing them to zero-byte files but leaving the original filenames intact. This is a purely destructive act.

This dual-mode capability suggests a strategic shift in extortion. Anubis operators can use the wipe mode in several scenarios:
- As a punitive measure if a victim is uncooperative.
- As their primary tactic if they believe the threat of leaking stolen data is sufficient leverage for payment.
- To cause maximum disruption for ideological or other non-financial motives.

The group advertises its services on forums like RAMP and XSS, using aliases such as "superSonic," and targets a wide range of industries opportunistically, including healthcare, construction, and engineering in countries like the U.S., Canada, Australia, and Peru.

> It is important to note this Anubis ransomware is unrelated to the older Anubis Android banking trojan or the Anubis backdoor linked to the FIN7 group.

## Technical Analysis
*   **Execution Parameter**: The switch between encryption and wiping is controlled by the simple `/WIPEMODE` parameter. This makes it easy for even less sophisticated affiliates to deploy the destructive payload.
*   **Wiping Technique**: The wiper function overwrites file contents with null bytes. This is a fast and effective method of data destruction that is generally irreversible through software means. This technique falls under [`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/).
*   **Extortion Model**: The Anubis playbook is not linear. It treats encryption ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)), data theft, and data destruction as interchangeable tools to be deployed based on the situation, maximizing psychological pressure and potential payout.

## Impact Assessment
The inclusion of a wiper function dramatically increases the potential impact of an Anubis attack.
- **Permanent Data Loss**: If the wipe mode is used, there is no possibility of recovering data, even if the ransom is paid. This makes tested, offline backups the only viable recovery path.
- **Increased Pressure**: The threat of permanent data destruction, combined with the threat of leaking stolen data, places victims under extreme pressure during negotiations.
- **Business Continuity Failure**: An attack involving the wiper can be an extinction-level event for organizations without a robust and tested disaster recovery plan.
- **Incident Response Complication**: Responders must quickly determine if the attack was an encryption or wipe event, as this fundamentally changes the response strategy from recovery negotiation to full disaster recovery.

## Detection & Response
1.  **Behavioral Monitoring**: EDR and security monitoring tools should be configured to detect mass file modification activity. A high rate of files being overwritten to zero bytes is a strong indicator of a wiper attack. This aligns with D3FEND's File Analysis ([D3-FA](https://d3fend.mitre.org/technique/d3f:FileAnalysis)).
2.  **Command Line Logging**: Enable and monitor command line process creation (e.g., Windows Event ID 4688) to detect the execution of suspicious binaries with parameters like `/WIPEMODE`.
3.  **Honeypots and Canaries**: Place file canaries (honeypot files) on file shares. An alert on the modification or deletion of these files can provide an early warning of ransomware or wiper activity.
4.  **Isolate and Analyze**: If a wiper attack is suspected, immediately isolate the affected systems to prevent further spread. Secure a sample of the malware for analysis to confirm its behavior.

## Mitigation Recommendations
Given the destructive nature of Anubis, preventative and recovery-focused mitigations are paramount.

1.  **Immutable Backups ([`M1053 - Data Backup`](https://attack.mitre.org/mitigations/M1053/))**: This is the most critical defense against wipers. Maintain multiple, tested backups, with at least one copy being offline (air-gapped) or immutable (unable to be altered or deleted). Regularly test the restoration process.
2.  **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/))**: Segment the network to contain the spread of a ransomware/wiper infection. Prevent lateral movement from workstations to critical servers.
3.  **Application Control ([`M1038 - Execution Prevention`](https://attack.mitre.org/mitigations/M1038/))**: Use application allow-listing to prevent unauthorized executables from running on endpoints and servers.
4.  **Privileged Access Management ([`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/))**: Strictly control and monitor the use of privileged accounts, as these are required to deploy ransomware across a network.

**Tags:** RaaS, Wiper Malware, Data Destruction, Extortion, Double Extortion

## Sources
- [Dark Web Profile: Anubis Ransomware](https://socradar.io/dark-web-profile-anubis-ransomware/) — SOCRadar (2026-01-22)
- [Anubis: A Closer Look at an Emerging Ransomware with Built-in Wiper](https://www.trendmicro.com/en_us/research/25/f/anubis-a-closer-look-at-an-emerging-ransomware-with-built-in-wiper.html) — Trend Micro (2025-01-13)
- [Wipe, leak, extort: The crazy hybrid playbook of Anubis ransomware](https://blog.barracuda.com/2025/07/11/wipe-leak-extort-the-crazy-hybrid-playbook-of-anubis-ransomware/) — Barracuda (2025-07-11)

---
Source: https://cyber.netsecops.io/articles/anubis-raas-offers-destructive-wipe-mode-for-extortion/
