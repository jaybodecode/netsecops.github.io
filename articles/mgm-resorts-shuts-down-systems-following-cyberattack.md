# MGM Resorts Shuts Down Systems to Contain Unspecified Cyberattack

**Severity:** high | **Category:** Cyberattack,Incident Response,Ransomware | **Updated:** 2026-09-24 | **Reading time:** 5 min

MGM Resorts International has proactively shut down some of its computer systems to contain a cyberattack detected on September 23, 2026. The move has caused operational disruptions across its properties. Details regarding the nature of the attack, the threat actor involved, and whether data was compromised have not yet been disclosed as the investigation is ongoing.

## Executive Summary
On September 23, 2026, **[MGM Resorts International](https://www.mgmresorts.com)**, a global leader in hospitality and entertainment, announced it had identified a cyberattack within its technology environment. In response, the company took immediate containment measures by shutting down certain computer systems. This proactive step has led to operational disruptions, though the full extent is not yet public. The company is currently investigating the incident with the assistance of cybersecurity experts. The identity of the attackers and the scope of any potential data exfiltration remain unknown at this time.

---

## Threat Overview
The incident at MGM Resorts is a developing cyberattack with limited public information. The company's decision to shut down systems indicates a serious event, likely aimed at preventing the spread of malware, such as ransomware, or stopping active data exfiltration. The initial access vector and the specific systems affected have not been disclosed. Such attacks on hospitality giants are often financially motivated, targeting payment systems, customer databases containing personal information and loyalty program data, or aiming for wide-scale disruption via ransomware.

---

## Technical Analysis
While details are unconfirmed, attacks on large enterprises like MGM often follow a common pattern involving credential theft, lateral movement, and data encryption or exfiltration. Based on typical TTPs used in such incidents, the attack may have involved:

### Potential MITRE ATT&CK Techniques (Analyst Assessment)
- **[T1566 - Phishing](https://attack.mitre.org/techniques/T1566/):** A likely initial access vector, targeting an employee with a malicious email to steal credentials.
- **[T1078 - Valid Accounts](https://attack.mitre.org/techniques/T1078/):** Once initial credentials are stolen, attackers use them to log in and appear as legitimate users.
- **[T1046 - Network Service Discovery](https://attack.mitre.org/techniques/T1046/):** After gaining access, attackers would scan the network to identify critical systems like reservation databases, domain controllers, and backup servers.
- **[T1486 - Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486/):** If this is a ransomware attack, the final stage would involve encrypting critical systems to disrupt operations and demand a ransom.
- **[T1537 - Transfer Data to Cloud Account](https://attack.mitre.org/techniques/T1537/):** Many modern extortion groups steal data before encryption. Attackers could be exfiltrating customer PII or financial data to a cloud storage account.

---

## Impact Assessment
The shutdown of systems at a company of MGM's scale can have cascading operational and financial impacts:
- **Operational Disruption:** Inability to process new hotel reservations, check-ins, or casino payments. Digital room keys and other guest services may be affected. This directly impacts revenue and customer experience.
- **Data Breach:** Potential compromise of sensitive customer data, including names, contact information, passport details, and credit card numbers. This could lead to regulatory fines and class-action lawsuits.
- **Reputational Damage:** A major cyberattack can erode customer trust, impacting future bookings and brand loyalty.
- **Financial Loss:** Costs associated with incident response, system restoration, potential ransom payments, regulatory fines, and lost business can amount to tens or hundreds of millions of dollars.

---

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) are available at this time.

---

## Cyber Observables — Hunting Hints
Security teams at similar organizations can hunt for precursor activity. The following patterns could indicate related activity:
| Type | Value | Description |
|---|---|---|
| log_source | VPN/Identity Provider Logs | Look for anomalous login patterns, such as logins from unusual geolocations or multiple failed logins followed by a success for a single account. |
| process_name | `powershell.exe`, `psexec.exe`, `wmic.exe` | Monitor for execution of legitimate tools often abused by attackers for lateral movement and reconnaissance. |
| network_traffic_pattern | Large outbound data transfers from reservation or CRM databases | Unusual data flows to external cloud storage providers (e.g., Mega, Dropbox) can indicate data exfiltration. |
| event_id | Windows Event ID 4625 | A high volume of failed logon attempts can be a sign of a brute-force or password-spraying attack. |

---

## Detection & Response
MGM's immediate response to shut down systems is a key part of the 'Evict' phase of incident response.

- **Detection:** Organizations should deploy an EDR solution to detect malicious processes and behavioral anomalies. SIEM systems should be configured to correlate logs from various sources (network, endpoint, identity) to detect attack sequences. This aligns with **D3FEND** techniques like [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).
- **Response:** The primary goal after detection is containment. MGM's action to isolate systems is a textbook example. Following isolation, the focus shifts to investigation (forensics to determine root cause and scope), eradication (removing the attacker's presence), and recovery (safely restoring systems from backups). This process involves **D3FEND**'s [`D3-NI - Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation) and [`D3-FR - File Restoration`](https://d3fend.mitre.org/technique/d3f:FileRestoration).

---

## Mitigation
To prevent similar attacks, hospitality organizations should prioritize:
1.  **Multi-Factor Authentication (MFA):** Implement MFA on all remote access points, administrative accounts, and critical applications to protect against credential theft.
2.  **Network Segmentation:** Segment networks to separate critical systems (e.g., property management systems, payment gateways) from the general corporate network. This limits an attacker's ability to move laterally.
3.  **Immutable Backups:** Maintain offline and immutable backups of critical data and systems. Regularly test the restoration process to ensure a swift recovery from a ransomware attack.
4.  **Incident Response Plan:** Develop and regularly test a comprehensive incident response plan. Tabletop exercises can ensure that all stakeholders know their roles and responsibilities during a crisis.

**Tags:** Cyberattack, Incident Response, Hospitality, MGM

## Sources
- [MGM Resorts Cyber Attack Disrupts Operations](https://cypro.co.uk/insights/cyber-bulletins/mgm-resorts-cyber-attack-disrupts-operations/) — Cypro (2026-09-23)

---
Source: https://cyber.netsecops.io/articles/mgm-resorts-shuts-down-systems-following-cyberattack/
