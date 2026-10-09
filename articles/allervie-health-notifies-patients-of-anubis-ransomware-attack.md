# Anubis Ransomware Hits AllerVie Health, Exposing Patient SSNs and Driver's Licenses

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2025-12-22 | **Reading time:** 6 min

AllerVie Health, a Texas-based healthcare provider, began notifying patients on December 22, 2025, of a ransomware attack that exposed highly sensitive personal information. The company detected the intrusion on November 2, 2025, with forensic analysis revealing unauthorized access occurred between October 24 and November 3. The exposed data includes patient names, Social Security numbers, and driver's license numbers. The attack has been linked to the Anubis ransomware group, which allegedly claimed to have stolen data from over 30,000 patients on its dark web leak site. AllerVie is offering complimentary credit monitoring services to affected individuals.

## Executive Summary
**[AllerVie Health](https://www.allervie.com/)**, a provider of allergy and immunology services, has disclosed a data breach resulting from a ransomware attack. The incident, which occurred between late October and early November 2025, compromised highly sensitive patient data, including Social Security numbers and driver's license numbers. The attack has been attributed to the **Anubis ransomware group**, which reportedly exfiltrated data from over 30,000 patients. AllerVie Health began mailing notification letters to affected individuals on December 22, 2025, and is providing identity protection services. This breach highlights the severe risk ransomware poses to the healthcare sector, where stolen PII can lead to medical identity theft and significant patient harm.

## Threat Overview
The incident timeline indicates the attackers had access to AllerVie Health's network for approximately 10 days, from October 24 to November 3, 2025. The company detected the suspicious activity on November 2 and subsequently launched an investigation. The Anubis ransomware group, like many modern ransomware operations, engages in double extortion. They allegedly added AllerVie Health to their dark web leak site, a tactic used to pressure victims into paying a ransom by threatening to publicly release the stolen data. The compromised information is particularly damaging, as it includes key identifiers used for identity theft and financial fraud.

## Technical Analysis
While the specific entry vector was not disclosed, ransomware attacks on healthcare organizations often involve phishing, exploitation of VPN vulnerabilities, or compromised RDP credentials.

### TTPs and MITRE ATT&CK Mapping
- **[`T1021.001 - Remote Services: Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/):** Attackers frequently use compromised RDP credentials to gain initial access and move laterally within healthcare networks.
- **[`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/):** The claim of stealing data from 30,000 patients implies a large-scale data exfiltration phase, likely to a cloud service controlled by the Anubis group.
- **[`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/):** The core of the attack is the deployment of ransomware to encrypt systems and disrupt AllerVie's operations.
- **[`T1003 - OS Credential Dumping`](https://attack.mitre.org/techniques/T1003/):** To escalate privileges and access sensitive data, attackers would likely have attempted to dump credentials from memory or system hives.

## Impact Assessment
The exposure of Social Security numbers and driver's license numbers for over 30,000 patients is a severe event. This data is a complete kit for identity theft, allowing criminals to open new lines of credit, file fraudulent tax returns, and commit medical identity theft. For AllerVie Health, the breach triggers significant regulatory obligations under **[HIPAA](https://www.hhs.gov/hipaa/index.html)**, likely resulting in a substantial investigation by the Department of Health and Human Services and potential fines. The cost of providing credit monitoring to all affected individuals, combined with legal fees and reputational damage, will be substantial. Patient trust in the provider's ability to safeguard their most sensitive information will be deeply eroded.

## Detection & Response
1.  **Monitor Remote Access Logs:** Scrutinize all VPN and RDP logs for suspicious activity, such as logins from unusual geographic locations, multiple failed login attempts followed by a success, or logins outside of normal business hours.
2.  **Detect Credential Dumping:** Use an EDR solution to detect and block processes associated with credential dumping, such as `Mimikatz` or suspicious access to the `LSASS` process.
3.  **Network Egress Monitoring:** As with other double extortion attacks, monitor for and alert on large, anomalous outbound data transfers.
4.  **D3FEND Techniques:** Employ **[D3-LAM: Local Account Monitoring](https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring)** and **[D3-UGLPA: User Geolocation Logon Pattern Analysis](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)** to detect compromised accounts being used for initial access and lateral movement.

## Mitigation
1.  **MFA for All Remote Access:** The single most effective control to prevent attacks leveraging compromised credentials is to enforce multi-factor authentication on all remote access solutions, including VPNs and RDP gateways.
2.  **Data Encryption at Rest:** While this attack involved exfiltration, encrypting sensitive patient data at rest in databases can provide a layer of protection if attackers gain access to the file system but not the database application itself.
3.  **Endpoint Detection and Response (EDR):** Deploy a modern EDR solution across all endpoints and servers. EDR can detect and block the malicious behaviors associated with ransomware, such as process injection and shadow copy deletion, even if the specific malware signature is unknown.
4.  **Regular Security Awareness Training:** Train employees to recognize and report phishing emails, which are a primary initial access vector for ransomware attacks in the healthcare sector.
5.  **D3FEND Countermeasures:** Implement **[D3-MFA: Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** as a top priority. Use **[D3-FE: File Encryption](https://d3fend.mitre.org/technique/d3f:FileEncryption)** to protect sensitive data stored on servers and workstations.

**Tags:** Ransomware, Anubis, Data Breach, Healthcare, HIPAA, SSN

## Sources
- [The State of Ransomware: December 2025](https://www.blackfog.com/the-state-of-ransomware-in-2025/) — BlackFog (2025-12-22)
- [RE: Notice of Data Security Incident](https://www.doj.nh.gov/consumer/security-breaches/documents/allervie-health-20251223.pdf) — New Hampshire Department of Justice (2025-12-22)
- [AllerVie Health Data Breach Leaks Social Security Numbers](https://claimdepot.com/data-breach/allervie-health-data-breach-leaks-social-security-numbers/) — Claim Depot (2025-12-22)

---
Source: https://cyber.netsecops.io/articles/allervie-health-notifies-patients-of-anubis-ransomware-attack/
