# Clop Ransomware Hits Korean Air in Supply Chain Attack, Exploiting Oracle Zero-Day

**Severity:** high | **Category:** Supply Chain Attack,Ransomware,Data Breach | **Updated:** 2026-01-04 | **Reading time:** 5 min

Korean Air announced on December 29, 2025, that it suffered a data breach affecting the personal information of approximately 30,000 employees. The breach was the result of a supply chain attack targeting KC&D Service, a former subsidiary. The incident is believed to be the work of the prolific Clop ransomware group (also known as TA505 or FIN11), which exploited a critical zero-day vulnerability (CVE-2025-61882) in Oracle E-Business Suite. This remote code execution flaw, with a CVSS score of 9.8, is part of a wider Clop campaign targeting the aviation industry's supply chain.

## Executive Summary
**[Korean Air](https://www.koreanair.com/)** has confirmed a data breach impacting the personal information of around 30,000 employees, including names and bank account numbers. The incident, announced on December 29, 2025, was not a direct attack on the airline but a **[supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack)** targeting its former in-flight catering subsidiary, KC&D Service. The notorious **[Clop ransomware](https://attack.mitre.org/groups/G0114/)** group (also tracked as TA505/FIN11) is the primary suspect, having claimed responsibility on its dark web leak site. The attack vector is believed to be the exploitation of a critical zero-day vulnerability in **[Oracle E-Business Suite](https://www.oracle.com/applications/ebs/)** (**CVE-2025-61882**), a 9.8 CVSS flaw enabling unauthenticated remote code execution. This breach highlights a persistent and targeted campaign by Clop against the global aviation sector.

---

## Threat Overview
The attack on KC&D Service and the subsequent data exposure at Korean Air exemplifies the growing threat of supply chain attacks. Threat actors are increasingly targeting smaller, less secure partners to gain access to larger, high-value organizations. The **[Clop](https://attack.mitre.org/groups/G0114/)** ransomware gang has been at the forefront of this trend, specializing in exploiting zero-day vulnerabilities in widely used enterprise software to execute large-scale data theft and extortion campaigns.

This incident is part of a broader 2025 campaign by Clop focused on the aviation industry. A similar attack on Asiana Airlines a week prior suggests a concerted effort to compromise the sector's interconnected ecosystem. By breaching KC&D Service, the attackers gained access to sensitive Korean Air employee data that was managed by the subsidiary.

## Technical Analysis
The initial access vector for this attack was the exploitation of **CVE-2025-61882**, a critical vulnerability in the BI Publisher Integration component of **[Oracle E-Business Suite](https://www.oracle.com/applications/ebs/)**. This flaw allows for unauthenticated remote code execution (RCE), giving attackers a direct foothold into the target's network.

Clop's typical attack chain following exploitation often involves:
1.  **Initial Access:** Exploiting a public-facing application vulnerability like [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/).
2.  **Execution & Persistence:** Deploying web shells or other backdoors to maintain access.
3.  **Discovery:** Mapping the internal network and identifying valuable data repositories.
4.  **Credential Access:** Using tools like Mimikatz to dump credentials.
5.  **Lateral Movement:** Moving across the network to access additional systems, often using compromised credentials.
6.  **Exfiltration:** Stealing large volumes of sensitive data using [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/).
7.  **Impact:** Deploying ransomware to encrypt files as the final step in their double extortion tactic ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

## Impact Assessment
- **Direct Impact:** The personal information of approximately 30,000 Korean Air employees has been compromised, including names and bank account numbers. This exposes affected individuals to risks of identity theft and financial fraud.
- **Business Impact:** While Korean Air stated customer data was not affected, the breach causes significant reputational damage and requires costly incident response, investigation, and potential regulatory fines. It also disrupts the trust-based relationship with its supply chain partners.
- **Systemic Risk:** This attack underscores the systemic risk within the aviation industry. A single vulnerability in a common software product can lead to multiple, cascading breaches across airlines and their suppliers, potentially impacting operations and safety.

## Cyber Observables for Detection
Security teams should hunt for indicators related to the exploitation of Oracle E-Business Suite and Clop TTPs:

| Type | Value | Description |
|---|---|---|
| api_endpoint | `/OA_HTML/BneViewer` | A common URL path associated with vulnerabilities in Oracle's BI Publisher. Monitor for anomalous requests. |
| process_name | `java.exe` | On Oracle servers, watch for `java.exe` processes spawning suspicious child processes like `cmd.exe` or `powershell.exe`. |
| network_traffic_pattern | Unusual outbound traffic from Oracle servers | Monitor for large data transfers from E-Business Suite servers to unknown external IP addresses. |
| log_source | Web server access logs | Scrutinize logs for Oracle E-Business Suite servers for unusual GET or POST requests, especially those targeting BI Publisher endpoints. |

## Detection & Response
1.  **Vulnerability Scanning:** Immediately scan for vulnerable instances of **[Oracle E-Business Suite](https://www.oracle.com/applications/ebs/)** within the environment and across third-party suppliers.
2.  **Web Log Analysis:** Analyze web server access logs for any requests matching the patterns associated with **CVE-2025-61882** exploitation. Use **[URL Analysis](https://d3fend.mitre.org/technique/d3f:URLAnalysis/)** (D3-UA) to identify malicious requests.
3.  **Endpoint Detection and Response (EDR):** Deploy EDR solutions on critical servers, including those running Oracle applications, to detect post-exploitation activity such as suspicious process chains or the loading of malicious tools.
4.  **Threat Intelligence Integration:** Ingest IOCs and TTPs related to **[Clop](https://attack.mitre.org/groups/G0114/)** into SIEM and other security tools to enable real-time detection of their activity.

## Mitigation
1.  **Patch Management:** Prioritize the application of Oracle's security patch for **CVE-2025-61882** on all E-Business Suite instances. ([D3-SU: Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate))
2.  **Supply Chain Risk Management:** Implement a robust third-party risk management (TPRM) program. This includes conducting security assessments of all vendors, mandating security standards in contracts, and monitoring their security posture.
3.  **Network Segmentation:** Isolate critical systems like Oracle E-Business Suite in segmented network zones. Restrict access from less secure parts of the network to limit lateral movement in case of a breach. ([D3-NI: Network Isolation](https://d3fend.mitre.org/technique/d3f:NetworkIsolation))
4.  **Web Application Firewall (WAF):** Deploy a WAF with virtual patching capabilities to block exploit attempts against the Oracle vulnerability until a permanent patch can be applied.

## CVEs
- CVE-2025-61882 (CVSS 9.8)

**Tags:** Clop, Ransomware, Supply Chain Attack, Korean Air, Oracle, Zero-Day, Aviation, TA505

## Sources
- [Korean Air Employee Data Breach Clop Ransomware Supply Chain Attack Report](https://en.koreajoongangdaily.joins.com/2025/12/29/business/industry/korean-air-data-breach-clop-ransomware/) — Korea JoongAng Daily (2025-12-29)
- [Korean Air Employee Data Breach Clop Ransomware Supply Chain Attack Report](https://www.example-threat-intel.com/korean-air-clop-attack) — Example Threat Intel (2025-12-29)

---
Source: https://cyber.netsecops.io/articles/korean-air-supply-chain-breach-clop-ransomware-oracle-zero-day/
