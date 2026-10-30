# New 'Sicarii Ransomware' RaaS Emerges, Targeting U.S. Manufacturing

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2026-01-30 | **Reading time:** 5 min

A new ransomware-as-a-service (RaaS) operation named 'Sicarii Ransomware' has been discovered by researchers at CYFIRMA. Active since late 2025, the group is targeting the manufacturing sector in the United States. The malware encrypts victim files using AES-GCM and appends a '.sicarii' extension to them. In addition to encryption, the malware is capable of collecting system information and credentials from infected hosts, suggesting a double-extortion tactic may be part of their playbook. Tactical recommendations to defend against this threat include enhanced monitoring, maintaining offline backups, and strengthening network segmentation.

## Executive Summary
Cybersecurity researchers at **[CYFIRMA](https://www.cyfirma.com/)** have identified a new ransomware-as-a-service (RaaS) operation named **Sicarii Ransomware**. The group, which has been active since at least late 2025, was discovered during monitoring of underground forums. The **Sicarii** operation is currently focused on targeting organizations in the manufacturing sector within the United States. The malware payload encrypts files using AES-GCM and appends the `.sicarii` extension. Notably, the malware also includes capabilities to collect system information and credentials, indicating a likely double-extortion model where data is both encrypted and exfiltrated for leverage. The emergence of a new RaaS group highlights the persistent and evolving nature of the ransomware threat.

---

## Threat Overview
**Sicarii Ransomware** operates on a RaaS model, where the core developers provide the malware and infrastructure to affiliates, who then carry out the attacks in exchange for a share of the ransom payments. This model allows for rapid scaling of attack volume.

*   **Threat Actor**: The group calls itself **Sicarii**, a name with historical connotations of assassins.
*   **Targeting**: Current intelligence indicates a specific focus on the U.S. manufacturing industry. This sector is often targeted due to its low tolerance for downtime and the potential for significant disruption.
*   **Malware**: The ransomware binary is designed for Windows systems. It encrypts files and appends the `.sicarii` extension. It also has information-stealing capabilities.

Initial access vectors are not specified but are likely to include common methods such as phishing, exploitation of vulnerable public-facing services (like RDP or VPNs), or purchase of access from initial access brokers.

---

## Technical Analysis
The **Sicarii** malware performs several actions upon execution:

1.  **Credential and Information Gathering**: Before encryption, the malware collects system information (e.g., OS version, hostname, user details) and searches for stored credentials. This data is likely exfiltrated to the attackers. This aligns with [`T1005 - Data from Local System`](https://attack.mitre.org/techniques/T1005/) and [`T1552 - Unsecured Credentials`](https://attack.mitre.org/techniques/T1552/).
2.  **Defense Evasion**: Like most modern ransomware, it will likely attempt to stop security-related services and processes and delete Volume Shadow Copies to prevent easy recovery. This is a form of [`T1489 - Service Stop`](https://attack.mitre.org/techniques/T1489/) and [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/).
3.  **Encryption**: The core function is file encryption using the AES-GCM symmetric encryption algorithm. GCM (Galois/Counter Mode) provides both confidentiality and authenticity, making it a strong choice. This is the final impact, [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).
4.  **Ransom Note**: After encryption, a ransom note is dropped on the system, providing instructions on how to contact the attackers and pay the ransom.

The inclusion of data gathering capabilities strongly suggests a double-extortion strategy. The attackers will threaten to leak the stolen data on a dedicated leak site if the ransom is not paid.

---

## Impact Assessment
A successful attack by **Sicarii Ransomware** can have a devastating impact on a manufacturing organization.

*   **Operational Halt**: Encryption of critical systems, such as those controlling production lines, enterprise resource planning (ERP), or logistics, can bring all manufacturing operations to a complete standstill.
*   **Financial Loss**: The financial impact includes the cost of the ransom (if paid), revenue lost during downtime, and the significant expense of incident response and system restoration.
*   **Data Breach**: The exfiltration of data constitutes a data breach. If this data includes intellectual property (e.g., product designs, chemical formulas) or employee PII, the long-term damage can be severe.
*   **Supply Chain Disruption**: A halt in production at one manufacturing company can have a cascading effect on its customers and suppliers, causing broader supply chain disruption.

---

## Cyber Observables for Detection

Defenders should hunt for indicators associated with ransomware activity.

| Type | Value | Description |
|---|---|---|
| `file_name` | `*.*.sicarii` | The file extension appended to encrypted files. The presence of files with this pattern is a definitive indicator of compromise. |
| `command_line_pattern` | `vssadmin.exe delete shadows /all /quiet` | A common command used by ransomware to delete backups. This is a high-confidence indicator. |
| `process_name` | `(Ransomware binary)` | Monitor for the execution of new, unsigned executables in user profiles or temporary directories. |
| `network_traffic_pattern` | `Large outbound data transfer` | A spike in outbound data transfer prior to encryption activity can indicate data exfiltration for double extortion. |

---

## Detection & Response

*   **Behavioral Detection**: Use an EDR solution with anti-ransomware capabilities. These tools are designed to detect and block the characteristic behaviors of ransomware, such as mass file encryption, regardless of the specific malware family.
*   **File Canaries**: Place decoy files (canaries) on file shares and critical servers. Configure alerts to trigger immediately if these files are modified or encrypted, providing an early warning of an attack.
*   **Data Exfiltration Monitoring**: Monitor network egress points for unusually large data uploads to cloud storage providers or other unexpected destinations.
*   **D3FEND Techniques**: The most effective detection is through **[File Content Rules (D3-FCR)](https://d3fend.mitre.org/technique/d3f:FileContentRules)** and **[Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** in an EDR. These can identify the rapid file modification behavior and terminate the malicious process.

**Response**:
Upon detection of ransomware activity, immediately isolate the affected hosts from the network to prevent its spread. Activate the incident response plan and engage with third-party experts if necessary. Do not power off the machine until a decision is made about forensic evidence collection.

---

## Mitigation

Standard ransomware defenses are effective against new groups like **Sicarii**.

1.  **Offline/Immutable Backups**: This is the most critical defense. Maintain a robust backup strategy with offline, air-gapped, or immutable copies of critical data. Regularly test the restoration process.
2.  **Network Segmentation**: Segment the network to separate critical manufacturing (OT) environments from the corporate (IT) network. This can prevent a ransomware attack on the IT side from crippling production.
3.  **Secure Remote Access**: Harden all remote access points. Enforce multi-factor authentication (MFA) on all VPN and RDP connections. Do not expose RDP directly to the internet.
4.  **Patch Management**: Promptly patch vulnerabilities in public-facing systems and software, as these are common entry points for ransomware affiliates.
5.  **User Training**: Train users to recognize and report phishing emails, which are a primary initial access vector.

**Tags:** Ransomware, RaaS, Double Extortion, Manufacturing, AES-GCM

## Sources
- [Weekly Intelligence Report – 30 January 2026](https://www.cyfirma.com/outofband/weekly-intelligence-report-30-january-2026/) — CYFIRMA (2026-01-30)
- [New Sicarii ransomware ramps up attacks in January](https://www.bleepingcomputer.com/news/security/new-sicarii-ransomware-ramps-up-in-january/) — BleepingComputer (2026-01-30)

---
Source: https://cyber.netsecops.io/articles/new-sicarii-ransomware-raas-operation-identified-in-the-wild/
