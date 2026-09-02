# McKesson Discloses Breach After ShinyHunters Claims Patient Data Theft

**Severity:** high | **Category:** Data Breach,Threat Actor,Cloud Security | **Updated:** 2026-09-01 | **Reading time:** 5 min

U.S. healthcare giant McKesson has confirmed a cybersecurity incident involving unauthorized network access and data exfiltration. The ShinyHunters extortion group has claimed responsibility, alleging the theft of approximately one terabyte of data, including 284 million patient-related records, from a Snowflake environment. The breach was discovered on August 25, 2026, with the data exfiltration reportedly occurring over the preceding four days. McKesson has acknowledged the incident in an SEC filing but has not yet determined its full material impact. The investigation is ongoing, and the company has warned customers of potential service degradation.

## Executive Summary
On August 25, 2026, U.S. healthcare and pharmaceutical distributor **[McKesson](https://www.mckesson.com)** discovered a significant cybersecurity incident involving unauthorized access to its network. The notorious extortion group **ShinyHunters** has claimed responsibility, asserting they exfiltrated approximately 1 terabyte of data, including what they claim are 284 million patient-related records. The data was reportedly stolen from a **[Snowflake](https://www.snowflake.com)** cloud data environment. McKesson has confirmed the breach and data exfiltration in an 8-K filing with the SEC but stated the full impact is still under investigation. The company has engaged cybersecurity experts and is working to determine the scope of the compromised data, which involves third-party applications.

## Threat Overview
**What Happened:** An unauthorized third party gained access to McKesson's network and exfiltrated a large volume of data. The threat actor, identified as **ShinyHunters**, claims the stolen data includes sensitive patient-related information.

**Attacker:** The **ShinyHunters** group, a well-known financially motivated extortion group active for several years, is responsible. They are known for large-scale data breaches and selling stolen data on dark web forums.

**Victim:** **McKesson**, a Fortune 500 company, is one of the largest healthcare service providers and pharmaceutical distributors in the United States. Its services are integral to a vast network of hospitals, pharmacies, and clinics.

**Attack Vector:** The initial access vector has not been disclosed. However, the data was exfiltrated from a **Snowflake** data warehouse, indicating the attackers likely compromised credentials or exploited a vulnerability related to a third-party application with access to this environment. The exfiltration reportedly occurred over four days, from August 21 to August 25, 2026.

## Technical Analysis
While specific TTPs for this attack are not yet public, **ShinyHunters**' historical campaigns often involve exploiting vulnerabilities in public-facing applications or using stolen credentials obtained from infostealer malware logs. The targeting of a cloud data platform like **Snowflake** is a common pattern for data theft groups.

### MITRE ATT&CK Techniques (Assessed)
- **Initial Access:**
  - [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): A likely vector, given the compromise of third-party applications.
  - [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Compromised credentials for the cloud environment or a connected application are a high-probability access method.
- **Collection:**
  - [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): The core of the attack, involving accessing and staging data within the **Snowflake** environment.
- **Exfiltration:**
  - [`T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage`](https://attack.mitre.org/techniques/T1567/002/): Threat actors often exfiltrate data to their own cloud storage buckets to avoid detection.
  - [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/): Data may have been exfiltrated using non-standard protocols to bypass security controls.

## Impact Assessment
The potential impact is severe. While **ShinyHunters** clarified the 284 million figure refers to records, not unique patients, the breach could still affect a massive number of individuals. The exfiltrated data, if it contains patient information, could lead to widespread identity theft, fraud, and targeted phishing campaigns. For McKesson, the incident poses significant reputational damage, regulatory fines under **[HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)**, and potential legal action. The intermittent service degradation mentioned by the company could also disrupt the supply of medicines and medical supplies to its healthcare partners, creating a ripple effect across the U.S. healthcare system.

## IOCs — Directly from Articles
No specific Indicators of Compromise (IOCs) such as IP addresses, domains, or file hashes were provided in the source articles.

## Cyber Observables — Hunting Hints
The following patterns could indicate related activity, particularly for organizations using Snowflake:
- **Log Source:** Snowflake access history logs, cloud provider (AWS/Azure/GCP) flow logs, and identity provider (e.g., Okta, Azure AD) logs.
- **Detection Pattern:** Look for anomalous login activity to the Snowflake environment from unfamiliar IP ranges, ASNs, or geolocations.
- **Detection Pattern:** Monitor for large-volume data read operations (`SELECT *`) or data unloading commands (`COPY INTO @...`) executed by service accounts or user accounts that do not typically perform such actions.
- **Detection Pattern:** Scrutinize the creation of new data shares or external stages in Snowflake, as these can be used for exfiltration.
- **Command Line Pattern:** Check for usage of Snowflake's command-line tool, `snowsql`, from unauthorized systems.

## Detection & Response
- **Cloud Security Posture Management (CSPM):** Regularly audit Snowflake security configurations, including network policies, user roles, and permissions. Ensure least-privilege access is enforced.
- **Log Analysis:** Ingest and analyze Snowflake logs in a SIEM. Create alerts for high-volume data access, logins from suspicious locations, and privilege escalation events. This aligns with D3FEND's **[User Geolocation Logon Pattern Analysis (D3-UGLPA)](https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis)**.
- **Identity and Access Management (IAM):** Enforce **[Multi-factor Authentication (MFA)](https://www.nist.gov/itl/glossary/multi-factor-authentication)** on all accounts with access to sensitive data environments. Monitor for unusual session activity.
- **Data Loss Prevention (DLP):** Deploy DLP solutions that can monitor and flag large data transfers out of the corporate network or cloud environments.

## Mitigation
- **Access Control:** Strictly limit and monitor access to sensitive data in cloud platforms. Use network policies in Snowflake to restrict access to trusted IP ranges.
- **Credential Management:** Rotate credentials for all service accounts and applications that connect to the Snowflake environment. Avoid using long-lived static credentials.
- **Third-Party Risk Management:** Vet the security posture of all third-party applications and vendors that have access to sensitive data. This is a key aspect of **[Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
- **Incident Response Plan:** Ensure the incident response plan includes specific playbooks for cloud data breaches, including steps to isolate compromised accounts, revoke access, and engage the cloud provider's security team.

**Tags:** Data Breach, Data Exfiltration, Extortion, Healthcare, ShinyHunters, Snowflake

## Sources
- [McKesson discloses breach after ShinyHunters claims patient data theft](https://www.bleepingcomputer.com/news/security/mckesson-discloses-breach-after-shinyhunters-claims-patient-data-theft/) (2026-08-28)

---
Source: https://cyber.netsecops.io/articles/mckesson-discloses-breach-shinyhunters-claims-patient-data-theft/
