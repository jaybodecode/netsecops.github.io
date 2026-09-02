# Ransomware Roundup: Qilin, Gammax, Genesis, and Others Claim Victims

**Severity:** high | **Category:** Ransomware,Threat Intelligence,Cyberattack | **Updated:** 2026-08-01 | **Reading time:** 5 min

A wave of ransomware attacks has been claimed by various groups, highlighting the persistent and widespread nature of the threat. Qilin hit Belgian logistics firm ADPO, Gammax targeted Panama's AguAseo, Genesis breached Danish software company Boyum IT, 'CMD' struck Australia's Contact Group, and 'Unsafe' targeted U.S. firm Blue Vista Capital Management.

## Executive Summary
A surge of activity on ransomware data leak sites on July 31, 2026, saw multiple threat actor groups claim responsibility for attacks on a diverse range of companies across the globe. The victims span industries from logistics and finance to software and construction, demonstrating that no sector is immune. The claims from groups including **Qilin**, **Gammax**, **Genesis**, **CMD**, and **Unsafe** all follow the standard double extortion playbook: publicize the breach to pressure victims into paying a ransom to prevent data leakage and obtain a decryption key. This roundup summarizes the latest wave of victims added to these groups' dark web portals.

---

## Threat Overview
The following is a breakdown of the recent claims made by various ransomware gangs:

### Qilin Ransomware vs. ADPO
*   **Threat Actor:** **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)**
*   **Victim:** **ADPO**, a logistics and chemical supply chain company.
*   **Geography:** Belgium
*   **Details:** Qilin, a prominent ransomware-as-a-service (RaaS) group, listed ADPO on its leak site. The attack is part of a recent string of campaigns by the group, which also claimed attacks on financial and energy firms in the Philippines and Turkey. The listing suggests data was exfiltrated and ADPO is being extorted.

### Gammax Ransomware vs. AguAseo
*   **Threat Actor:** **Gammax**
*   **Victim:** **AguAseo**, an environmental services company.
*   **Geography:** Panama
*   **Details:** The Gammax group added AguAseo to its leak portal, signaling a successful breach and data theft. The attack on a public service provider highlights the risk to critical and essential services.

### Genesis Ransomware vs. Boyum IT Solutions
*   **Threat Actor:** **Genesis**
*   **Victim:** **Boyum IT Solutions**, a software company specializing in solutions for SAP Business One.
*   **Geography:** Denmark
*   **Details:** The Genesis group claimed the attack on Boyum IT. Given the victim's specialization, the stolen data could be highly valuable, potentially including information about Boyum's enterprise customers, creating a supply chain risk.

### 'CMD' Group vs. Contact Group
*   **Threat Actor:** **CMD**
*   **Victim:** **Contact Group**, a building services and electrical contracting company.
*   **Geography:** Australia
*   **Details:** The emerging 'CMD' hacking group listed Contact Group on its leak site. The breach of a company in the construction sector shows the indiscriminate nature of these attacks.

### 'Unsafe' Group vs. Blue Vista Capital Management
*   **Threat Actor:** **Unsafe**
*   **Victim:** **Blue Vista Capital Management**, a real estate investment firm.
*   **Geography:** United States
*   **Details:** The 'Unsafe' group claimed the breach, likely involving sensitive financial records, investor data, and deal information from the U.S.-based investment firm.

---

## Technical Analysis
All these incidents leverage the **double extortion** model, which has become the dominant strategy for ransomware gangs. The general attack lifecycle can be mapped to MITRE ATT&CK:

1.  **Initial Access:** Typically through phishing, exploitation of unpatched public-facing services, or stolen credentials.
2.  **Reconnaissance & Lateral Movement:** Once inside, actors use tools like Active Directory scanners and PsExec to map the network and move to high-value targets.
3.  **Data Exfiltration ([`T1567.002 - Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/)):** Before encryption, large amounts of sensitive data are compressed and uploaded to cloud storage services controlled by the attacker.
4.  **Impact ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)):** The ransomware payload is deployed, encrypting files across the network.
5.  **Extortion:** The victim is presented with a ransom note, and if they refuse to pay, their name is added to the public leak site as a pressure tactic.

---

## Impact Assessment
This wave of attacks demonstrates the global and industry-agnostic nature of the ransomware threat. The collective impact includes:
*   **Systemic Risk:** The targeting of supply chain entities (ADPO, Boyum IT) creates a ripple effect, where the breach of one company can impact its entire customer base.
*   **Critical Services Disruption:** The attack on an environmental services firm (AguAseo) shows the potential for ransomware to disrupt essential public services.
*   **Economic Loss:** All victims face significant costs related to downtime, recovery, incident response, and potential ransom payments.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise were provided for these attacks in the source articles.

## Cyber Observables — Hunting Hints
Security teams should hunt for common ransomware precursors, which are often more detectable than the ransomware payload itself.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| `process_name` | `rclone.exe`, `megacmd.exe` | Legitimate sync tools often abused by ransomware groups to exfiltrate data. Their presence on servers is highly suspicious. | EDR telemetry, Process execution logs | high |
| `command_line_pattern` | `vssadmin delete shadows /all /quiet` | Command used to delete Volume Shadow Copies to prevent easy file recovery. A hallmark of ransomware. | EDR telemetry, Windows Event ID 4688 | high |
| `network_traffic_pattern` | Large, sustained outbound data transfers to cloud storage providers. | This pattern is highly indicative of data exfiltration prior to encryption. | Firewall logs, Netflow, DLP alerts | high |

---

## Detection & Response
*   **Monitor Leak Sites:** Threat intelligence services can monitor ransomware leak sites for mentions of a company or its partners, providing an early warning of a breach.
*   **Behavioral Analytics:** Use EDR/XDR to detect the TTPs of ransomware, such as credential dumping, lateral movement, and file encryption patterns.
*   **Immutable Backups:** The most critical response capability is having clean, isolated, and tested backups to restore from, making the encryption aspect of the attack moot.

---

## Mitigation
Foundational cybersecurity hygiene is the best defense against ransomware:
1.  **Patch Management:** Prioritize patching of internet-facing systems and critical vulnerabilities.
2.  **MFA:** Enforce multi-factor authentication on all remote access points (VPN, RDP) and critical internal systems.
3.  **Network Segmentation:** Isolate critical assets and backups from the general corporate network to contain the blast radius of an attack.
4.  **User Training:** Train employees to identify and report phishing emails, a primary initial access vector.
5.  **Principle of Least Privilege:** Ensure user and service accounts only have the permissions necessary to perform their functions.

**Tags:** Ransomware, Qilin, Gammax, Genesis, CMD, Unsafe, Data Leak

## Sources
- [Recent Data Breaches in 2026](https://www.breachsense.com/breaches/) — BreachSense (2026-07-31)

---
Source: https://cyber.netsecops.io/articles/ransomware-roundup-qilin-gammax-genesis-cmd-unsafe-claims/
