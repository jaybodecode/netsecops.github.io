# Qilin & Akira Ransomware Strike Austrian Water Utility, US Firms

**Severity:** high | **Category:** Ransomware,Cyberattack | **Updated:** 2025-11-08 | **Reading time:** 4 min

The Qilin and Akira ransomware gangs have claimed new victims. On November 8, 2025, Qilin targeted an Austrian water association (Wasserverband Wulkatal) and a US HR firm (SHRM New Mexico). Simultaneously, Akira attacked US manufacturer Mold In Graphic Systems, claiming to have stolen 15GB of data. Both groups are using double-extortion tactics.

## Executive Summary
Two prolific ransomware-as-a-service (RaaS) groups, **[Qilin](https://malpedia.caad.fkie.fraunhofer.de/actor/qilin)** and **[Akira](https://malpedia.caad.fkie.fraunhofer.de/details/win.akira)**, have continued their aggressive campaigns, claiming responsibility for attacks on multiple organizations in Europe and the United States. On November 8, 2025, the Qilin group listed Wasserverband Wulkatal, an Austrian water association, and SHRM New Mexico, a US-based HR organization, on its data leak site. Concurrently, the Akira ransomware gang claimed an attack on Mold In Graphic Systems, a US manufacturing company. Both groups are employing double-extortion tactics, threatening to publicly release stolen data if their ransom demands are not met. These incidents highlight the persistent and indiscriminate threat posed by major ransomware operations to organizations of all sizes and sectors, including critical infrastructure.

---

## Threat Overview
**Qilin Ransomware Attacks:**
*   **Victim:** Wasserverband Wulkatal (Austrian water association).
*   **Impact:** Qilin has threatened a 'full leak' of stolen data, indicating a successful data exfiltration. An attack on a water utility is particularly concerning as it targets critical infrastructure, potentially impacting public services.
*   **Victim:** SHRM New Mexico (US human resources organization).
*   **Impact:** The group has also threatened to release data from this HR firm, which likely contains sensitive employee information from multiple client companies.

**Akira Ransomware Attack:**
*   **Victim:** Mold In Graphic Systems (US manufacturing company).
*   **Impact:** The Akira gang claims to have exfiltrated 15GB of corporate data. The stolen data allegedly includes sensitive employee PII (driver's licenses, credit card scans), contracts, and non-disclosure agreements (NDAs). The group is threatening to leak this data on its dark web blog.

Both Qilin and Akira are known for their double-extortion strategy: **Data Encrypted for Impact ([`T1486`](https://attack.mitre.org/techniques/T1486/))** combined with data exfiltration and the threat of public release to pressure victims into payment.

---

## Technical Analysis
While the specific initial access vectors for these attacks were not disclosed, Qilin and Akira are known to use common and effective TTPs:

*   **Initial Access:** Both groups frequently gain access through **phishing campaigns ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/))**, exploitation of vulnerabilities in public-facing applications like VPNs ([`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/)), and the use of stolen credentials.
*   **Post-Exploitation:** Once inside a network, they often deploy tools like **[Cobalt Strike](https://attack.mitre.org/software/S0154/)** for reconnaissance, lateral movement, and privilege escalation.
*   **Data Exfiltration:** Before deploying the ransomware, the actors exfiltrate large volumes of sensitive data to cloud storage services or their own infrastructure ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)).
*   **Impact:** Finally, they execute the ransomware payload to encrypt files across the network, often leaving a ransom note on each affected system with instructions for payment.

---

## Impact Assessment
These attacks demonstrate the broad impact of modern ransomware operations. The targeting of an Austrian water association by Qilin is a serious threat to critical infrastructure, potentially disrupting essential services. For the other victims, the impact includes severe business disruption, financial loss from ransom payments and recovery efforts, and significant reputational damage. The exfiltration of sensitive corporate and employee data creates long-term risks of fraud and regulatory penalties under data protection laws like GDPR and CCPA. The public naming of victims on leak sites adds immense pressure on leadership to pay the ransom to avoid further public embarrassment and data exposure.

---

## Detection & Response
*   **Precursor Detection:** Monitor for common ransomware precursors, such as Cobalt Strike beacons, suspicious PowerShell execution, and attempts to disable security software. This aligns with D3FEND's [`D3-PA: Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
*   **Data Staging and Exfiltration:** Use network monitoring and DLP tools to detect signs of data staging (e.g., large archives being created on servers) and anomalous data egress to unusual destinations. This is a key part of D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
*   **File Encryption:** Configure EDR and file integrity monitoring tools to detect and alert on rapid, large-scale file modification and encryption activity, which is a hallmark of a ransomware attack in progress.

---

## Mitigation
*   **Secure Remote Access:** Enforce **Multi-Factor Authentication (MFA) ([`M1032`](https://attack.mitre.org/mitigations/M1032/))** on all remote access points, especially VPNs and RDP.
*   **Patch Management ([`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/)):** Prioritize patching of internet-facing systems and critical vulnerabilities known to be exploited by ransomware groups.
*   **Immutable Backups:** Maintain regular, offline, and immutable backups of critical data. Test backup restoration procedures frequently to ensure they can be relied upon in an emergency. This is the core of D3FEND's [`D3-FR: File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration).
*   **Network Segmentation ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)):** Segment your network to prevent ransomware from spreading laterally from the initial point of compromise to the entire organization.

**Tags:** Qilin Ransomware, Akira Ransomware, Double Extortion, Critical Infrastructure

## Sources
- [Qilin Ransomware Strikes Wasserverband Wulkatal in Austria](https://www.dexpose.io/qilin-ransomware-strikes-wasserverband-wulkatal-in-austria) — DeXpose (2025-11-08)
- [Akira Ransomware Targets Mold In Graphic Systems](https://www.dexpose.io/akira-ransomware-targets-mold-in-graphic-systems) — DeXpose (2025-11-08)
- [Qilin Targets SHRM New Mexico in Ransomware Attack](https://www.dexpose.io/qilin-targets-shrm-new-mexico-in-ransomware-attack) — DeXpose (2025-11-08)
- [Cyber Brief: supply chain surge, CBO breach, cloud identity failures](https://www.secarma.co.uk/cyber-brief-supply-chain-surge-cbo-breach-cloud-identity-failures/) — Secarma (2025-11-07)

---
Source: https://cyber.netsecops.io/articles/qilin-and-akira-ransomware-claim-new-high-profile-victims/
